import { initializeApp } from "firebase/app"; 
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
  } 
from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
  } 
from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDaSosHgiHMIbMzmGduMZ-1f6I9sOQzrPk",
  authDomain: "crwn-clothing-db-f2242.firebaseapp.com",
  projectId: "crwn-clothing-db-f2242",
  storageBucket: "crwn-clothing-db-f2242.firebasestorage.app",
  messagingSenderId: "841562250164",
  appId: "1:841562250164:web:7d1d6e04f87aa48628f0e1"
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

const auth = getAuth();
const signInWithGooglePopup = () => signInWithPopup(auth, provider);
const db = getFirestore();


const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  console.log(userAuth.uid);
  const userDocRef = doc( db, "Users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  
  console.log(userSnapshot);
  console.log( userSnapshot.exists() );

  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName: displayName,
        email: email,
        createdAt: createdAt,
        ...additionalInformation
      });
    }catch(error){
      console.log("Error creating the user for some reason.", error.message);
    };
  };

  return(
    userDocRef
  );

};




export const createUserAuthEmail = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserAuthEmail = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);


export{
  auth,
  db,
  createUserDocumentFromAuth,
  signInWithGooglePopup
};