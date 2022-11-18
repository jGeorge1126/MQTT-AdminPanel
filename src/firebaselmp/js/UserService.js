import firebase, {auth, db} from '../main';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    FacebookAuthProvider,
    OAuthProvider,
    signInWithPopup,
    signOut,
    RecaptchaVerifier,
    signInWithPhoneNumber
    } from 'firebase/auth';
import { 
    collection,
    doc, 
    addDoc,
    updateDoc, 
    setDoc, 
    getDocs, 
    getDoc, 
    deleteDoc,
    query,
    where,
    limit
    } from 'firebase/firestore';

    const collection_user = "users";

const getUser = (id) => {
    return getDoc(doc(db, collection_user, id));
}

export const updateUser = (id, firstname, lastname) => {
    return updateDoc(doc(db, collection_user, id), {
        firstname: firstname,
        lastname: lastname
    });
}

export const logInWithEmailAndPassword =  (email, password) => {
    let token = '';
    let userId = 0;

    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            userId = userCredential.user.uid;
            return userCredential.user.getIdToken();
        })
        .then((idtoken)=>{
            token = idtoken;
            return getUser(userId);
        })
        .then((data)=>{
            console.log("sa: ", data);
            data = {...data.data(), id: data.id};
            return {profile:data, error:'', token: token};
        })
        .catch((error) => {
            return {profile:'', error: error.code, token:''};
        });
}

export const logOut = ()=>{
    signOut(auth).then(() => {
        console.log('Signed Out');
        return true;
    }).catch((error) => {
        console.error('Sign Out Error', error);
        return false;
    });
}
