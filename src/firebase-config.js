import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnx5YsWUWJl2MlDDBnkC3YeOqyGXaO680",
  authDomain: "quizapp-85796.firebaseapp.com",
  projectId: "quizapp-85796",
  storageBucket: "quizapp-85796.appspot.com",
  messagingSenderId: "717855035865",
  appId: "1:717855035865:web:924c7ee9dbfb585d1d49c8",
  measurementId: "G-HVZM5ZLDHV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
