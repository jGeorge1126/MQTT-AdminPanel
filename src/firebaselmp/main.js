import {initializeApp} from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "API KEY",
    authDomain: "ride-move.firebaseapp.com",
    databaseURL: "DatabaseURL",
    projectId: "ProjectID",
    storageBucket: "StorageBucket",
    messagingSenderId: "MessagingSenderID",
    appId: "APP ID",
    measurementId: "MeasurementID"
  };



const firebase = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

const storage = getStorage(firebase);
let isLogin = false;

onAuthStateChanged(auth, (user)=>{
    if(user){
        isLogin = true;
    }
    else{
        isLogin = false;
    }
});
export const useAuth = ()=>{
   return isLogin;
}

export default {firebase, storage};

