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

const collection_customer = "customers";

export const getCustomers = () => {
    const customer_ref = collection(db, collection_customer);
    const q = query(customer_ref);
    return getDocs(q).then(datas =>{
        let customers = [];;
        datas.forEach((data)=>{
            customers.push({... data.data(), id:data.id});
        });
        return customers;
    })
}