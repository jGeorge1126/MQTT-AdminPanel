import {initializeApp} from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC6iia2353HlEK8Xzp8u0xPAg_pjlTHqFM",
    authDomain: "ride-move.firebaseapp.com",
    databaseURL: "https://ride-move-default-rtdb.firebaseio.com",
    projectId: "ride-move",
    storageBucket: "ride-move.appspot.com",
    messagingSenderId: "257318589642",
    appId: "1:257318589642:web:8f453933ac8c3a22235033",
    measurementId: "G-FXK8V2Y03F"
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

