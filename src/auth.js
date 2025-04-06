   // src/auth.js
   import { auth } from './firebase';
   import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

   // Register User
   export const registerUser = async (email, password) => {
     try {
       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
       console.log('User registered:', userCredential.user);
     } catch (error) {
       console.error('Error registering user:', error.message);
     }
   };

   // Login User
   export const loginUser = async (email, password) => {
     try {
       const userCredential = await signInWithEmailAndPassword(auth, email, password);
       console.log('User logged in:', userCredential.user);
     } catch (error) {
       console.error('Error logging in:', error.message);
     }
   };