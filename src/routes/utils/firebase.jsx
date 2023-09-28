// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, getDocs, query } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { JobLists } from "../../JobLists";
import Jobs from "../../Jobs";
import { getStorage } from "firebase/storage";
import { JobListsEmployment } from "../../JobListsEmployment";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy33WLVCQRONqLp4O5X-l1Tcck0sTqFHA",
  authDomain: "devlink-cd494.firebaseapp.com",
  projectId: "devlink-cd494",
  storageBucket: "devlink-cd494.appspot.com",
  messagingSenderId: "357542937311",
  appId: "1:357542937311:web:f91688ea03909abe55df6a",
  measurementId: "G-0D4RD0DNGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

const firestore = firebase.firestore();

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const addAllCollectionAndDocument = async (collectionKey, objectsToAdd) =>{
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)
  objectsToAdd.forEach((object) =>{
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object)
  })
 await batch.commit()
 console.log('Transaction is successful!')
}

export const addCollectionAndDocument = async (collectionKey, objectToAdd) =>{
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)
  const docRef = doc(collectionRef, objectToAdd.title.toLowerCase());
  batch.set(docRef, objectToAdd)
  await batch.commit()
  console.log('Transaction is successful!')
}

export const DeleteCollectionAndDocument = async (collectionKey, objectToDelete) =>{
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)
  const docRef = doc(collectionRef, objectToDelete.title.toLowerCase());
  batch.delete(docRef)
  await batch.commit()
  console.log('Transaction is successful!')
}

export const fetchStaffAndDocuments = async () => {
  const collectionRef = collection(db, 'jobs');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const staffMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const data = docSnapshot.data();
    const items = { ...data, title: data.title };
    acc[items.title.toLowerCase()] = items;
    return acc;
  }, {});
  for (const jobs in staffMap) {
    JobLists.push(staffMap[jobs]);
  }
  console.log(JobLists);
  return staffMap;
};

export const fetchStaffAndDocumentsEmp = async () => {
  const collectionRef = collection(db, 'employmentJobs');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const staffMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const data = docSnapshot.data();
    const items = { ...data, title: data.title };
    acc[items.title.toLowerCase()] = items;
    return acc;
  }, {});
  for (const jobs in staffMap) {
    JobListsEmployment.push(staffMap[jobs]);
  }
  console.log(JobListsEmployment);
  return staffMap;
};

export const createUserDocFromAuth = async (userAuth, additionalData) =>{
    const userDocRef = doc (db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshop = await getDoc(userDocRef);  
    console.log(userSnapshop);
    console.log(userSnapshop.exists());

    if (!userSnapshop.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        }
        catch (error) { console.log('error creating ', error.messagage); }
    }

    return userDocRef;
}

export const getUserDocByUsername = async (username) => {
  try {
    const userDocs = await firestore.collection('users').where('email', '==', username).get();
    if (userDocs.empty) {
      console.log('No user document found for username:', username);
      return null;
    } else {
      const userDoc = userDocs.docs[0];
      console.log('User document found for username:', username);
      return userDoc;
    }
  } catch (error) {
    console.error('Error getting user document:', error);
    throw error;
  }
};
