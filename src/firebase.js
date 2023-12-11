import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_API,
  authDomain: import.meta.env.VITE_FIRE_DOMAIN,
  projectId: import.meta.env.VITE_FIRE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIRE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIRE_SENDERID,
  appId: import.meta.env.VITE_FIRE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
