import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';

// Webhook signing secret from Clerk Dashboard
const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

async function handler(request: Request) {
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await request.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const wh = new Webhook(webhookSecret || '');

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, ...userData } = evt.data;
    
    try {
      const userRef = doc(db, 'users', id);
      await setDoc(userRef, {
        ...userData,
        updatedAt: new Date().toISOString(),
      }, { merge: true });

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error saving user data to Firestore:', error);
      return NextResponse.json({ error: 'Failed to save user data' }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const eventType = payload.type;
    const { id, email_addresses, first_name, last_name } = payload.data;

    switch (eventType) {
      case 'user.created':
      case 'user.updated':
        // Update user in Firestore
        await setDoc(doc(db, 'users', id), {
          email: email_addresses[0]?.email_address,
          firstName: first_name,
          lastName: last_name,
          role: 'user', // default role
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }, { merge: true });
        break;

      case 'user.deleted':
        // Delete user from Firestore
        await deleteDoc(doc(db, 'users', id));
        break;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export const GET = handler;
export const PUT = handler;
