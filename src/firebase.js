import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth"; 
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDmDdcXWbB4KfZQ81tiCLrv9sxcsO8uypI",
  authDomain: "netflix-clone-4d759.firebaseapp.com",
  projectId: "netflix-clone-4d759",
  storageBucket: "netflix-clone-4d759.firebasestorage.app",
  messagingSenderId: "656992423047",
  appId: "1:656992423047:web:09d5c08ed611a8edacfc22",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence).catch(console.error);

export async function signup(name, email, password) {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(cred.user, { displayName: name });
    await addDoc(collection(db, "users"), {
      uid: cred.user.uid,
      name: name || "",
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code?.split("/")[1]?.split("-").join(" ") || "signup failed");
    throw error;
  }
}

export async function login(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(error.code?.split("/")[1]?.split("-").join(" ") || "login failed");
    throw error;
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    toast.error("sign out failed");
    throw error;
  }
}

