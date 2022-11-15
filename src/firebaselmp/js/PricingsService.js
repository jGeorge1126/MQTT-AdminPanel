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

const collection_pricing = "pricings";

export const getPricings = () => {
    const pricing_ref = collection(db, collection_pricing);
    const q = query(pricing_ref);
    return getDocs(q).then(datas =>{
        let pricings = [];
        datas.forEach((data)=>{
            pricings.push({... data.data(), id:data.id});
        });
        return pricings;
    })
}

export const createPricing = (plan, usageTime, cost) => {
    return addDoc(collection(db, collection_pricing),{
        plan,
        usageTime,
        cost
    });
}