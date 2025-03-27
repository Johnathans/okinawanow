// This script helps create an admin user in Firestore
// Run this in your browser console when logged in

async function createAdminUser() {
  // Get the current user
  const auth = firebase.auth();
  const currentUser = auth.currentUser;
  
  if (!currentUser) {
    console.error('No user is currently logged in');
    return;
  }
  
  console.log('Current user:', currentUser.email);
  
  // Get Firestore instance
  const db = firebase.firestore();
  
  // Check if user document exists
  const userRef = db.collection('users').doc(currentUser.uid);
  const userDoc = await userRef.get();
  
  if (userDoc.exists) {
    console.log('User document exists, updating role to admin');
    
    // Update existing document
    await userRef.update({
      role: 'admin',
      updatedAt: new Date().toISOString()
    });
  } else {
    console.log('User document does not exist, creating new admin user document');
    
    // Create new document
    await userRef.set({
      displayName: currentUser.displayName || '',
      email: currentUser.email,
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  console.log('Admin user created/updated successfully');
  console.log('Please log out and log back in for the changes to take effect');
  
  return true;
}

// Run the function
createAdminUser();
