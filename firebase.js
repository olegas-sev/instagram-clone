// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyAbEiMTn4k6h9P20IkIJ-ePhWwltvgsJ2k",
    authDomain: "instagram-clone-ec9d5.firebaseapp.com",
    projectId: "instagram-clone-ec9d5",
    storageBucket: "instagram-clone-ec9d5.appspot.com",
    messagingSenderId: "407332689874",
    appId: "1:407332689874:web:efd7a2803ee1f50e7e5a0b"
};

// Initialize Firebase
// if getApps has an empty array which means the firebase isnt initialiazed yet then we run initializeApp function to run our config, if the getApps arrays already has an initialized value then we just run it with function getApp()
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {app, db, storage};