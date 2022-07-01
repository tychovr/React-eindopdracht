// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore, where, getDocs, query } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYOEiw2c2GEGBJQOC0MP7cqr5bsWVYFyo",
  authDomain: "vehicle-leasing.firebaseapp.com",
  projectId: "vehicle-leasing",
  storageBucket: "vehicle-leasing.appspot.com",
  messagingSenderId: "727717717591",
  appId: "1:727717717591:web:4e3109233db5d853872512",
  measurementId: "G-R85V8F9004"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  
try {
  const response = await signInWithPopup(auth, googleProvider);
  const user = response.user;
  const q = query(collection(db, "users"), where("uid", "==", user.uid));
  const docs = await getDocs(q);
  if (docs.docs.length === 0) {
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: user.displayName,
      authProvider: "google",
      email: user.email,
    });
  }
} catch (err) {
  console.error(err);
}}

const logIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const signUp = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const logOut = () => {
  signOut(auth);
};

// Initialize Firebase
export { auth, db, logIn, signUp, logOut, signInWithGoogle };