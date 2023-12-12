import { initializeApp } from "firebase/app";
import { GithubAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

//파이어베이스 인증
const auth = getAuth();

//구글 인증 객체
const googleAuth = new GoogleAuthProvider();

//깃허브 인증 객체
const githubAuth = new GithubAuthProvider();

//fire store db 사용
const db = getFirestore();

export { auth, googleAuth, db, githubAuth };
