// This is a simpler version of the admin setup script that doesn't require the Firebase Admin SDK
// You can run this directly in your browser console when logged in as the user you want to make an admin

// Run this in your browser console when logged in as the user you want to make an admin
async function setAdminRole() {
  // Get the current user
  const auth = firebase.auth();
  const currentUser = auth.currentUser;
  
  if (!currentUser) {
    console.error('No user is currently logged in');
    return;
  }
  
  console.log('Current user:', currentUser.email);
  
  // Update the user document in Firestore
  const db = firebase.firestore();
  const userRef = db.collection('users').doc(currentUser.uid);
  
  try {
    await userRef.update({
      role: 'admin',
      updatedAt: new Date().toISOString()
    });
    
    console.log(`Successfully set ${currentUser.email} as admin in Firestore`);
    console.log('Please log out and log back in for the changes to take effect');
    
    return true;
  } catch (error) {
    console.error('Error updating user role:', error);
    return false;
  }
}

// To use this script:
// 1. Log in to your application with the user you want to make an admin
// 2. Open the browser console (F12 or right-click > Inspect > Console)
// 3. Paste this entire script into the console
// 4. Run the function by typing: setAdminRole()
// 5. Log out and log back in for the changes to take effect
