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

const collection_invoice = "invoices";

export const getInvoices = () => {
    const invoice_ref = collection(db, collection_invoice);
    const q = query(invoice_ref);
    return getDocs(q).then(datas =>{
        let invoices = [];;
        datas.forEach((data)=>{
            invoices.push({... data.data(), id:data.id});
        });
        return invoices;
    })
}
