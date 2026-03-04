import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAA50A5QcJFlqbcg6G34APG3W7a-E-Rw9w",
  authDomain: "freelanceai-c516f.firebaseapp.com",
  projectId: "freelanceai-c516f",
  storageBucket: "freelanceai-c516f.firebasestorage.app",
  messagingSenderId: "1081577075602",
  appId: "1:1081577075602:web:57a55be761b113f6f7c74b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);