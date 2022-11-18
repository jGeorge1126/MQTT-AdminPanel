import firebase, {auth, db} from '../main';
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
    limit,
    orderBy
    } from 'firebase/firestore';

const collection_userAgreement = "userAgreement";

export const getUserAgreementById = async(id) => {
    return (await getDoc(doc(db, collection_userAgreement, id))).data();
}

export const getUserAgreements = () => {
    const userAgreement_ref = collection(db, collection_userAgreement);
    const q = query(userAgreement_ref);
    return getDocs(q).then(datas =>{
        let userAgreements = [];
        datas.forEach((data)=>{
            userAgreements.push({... data.data(), id:data.id});
        });
        return userAgreements;
    })
}

export const createUserAgreement = (title, description) => {
    return addDoc(collection(db, collection_userAgreement), {
        title,
        description
    });
}

export const updateUserAgreement = (id, title, description) => {
    return updateDoc(doc(db, collection_userAgreement, id), {
        title: title,
        description: description
    });
}

export const deleteUserAgreement = (id) => {
    return deleteDoc(doc(db, collection_userAgreement, id));
}
