import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut
} from 'firebase/auth';

// Firebase configuration
// Project: TradeNest
// Project ID: tradenest-1de29
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyCPgFjEilBFAOlPojmktROW4SuN-iox50s",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "tradenest-1de29.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "tradenest-1de29",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "tradenest-1de29.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "487640794407",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:487640794407:web:920e38abfd9ae2b03c5502",
  measurementId: "G-N93FHPNV7H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Configure providers
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Authentication functions
export const firebaseAuth = {
  // Register with email/password
  registerWithEmail: async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Send verification email
    await sendEmailVerification(userCredential.user);
    return userCredential.user;
  },

  // Login with email/password
  loginWithEmail: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  // Login with Google
  loginWithGoogle: async () => {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  },

  // Login with Facebook
  loginWithFacebook: async () => {
    const result = await signInWithPopup(auth, facebookProvider);
    return result.user;
  },

  // Logout
  logout: async () => {
    await signOut(auth);
  },

  // Get current user
  getCurrentUser: () => {
    return auth.currentUser;
  },

  // Send email verification
  sendVerificationEmail: async (user) => {
    await sendEmailVerification(user);
  }
};

export { auth };
export default app;
