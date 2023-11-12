import { ref } from "vue";
import 
  { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc, getCountFromServer, query, where, Timestamp, } 
from 'firebase/firestore'
import { db } from '../firebase.config';

export const useFirebaseDB = () => {
    const data_count = ref(0)
    const data = ref([])

    const getDataWithId = async (table, id) => {
      const dataDoc = doc(db, table, id);
      const result = await getDoc(dataDoc);
      return result
      // console.log(result.exists(), result)
    }

    const getTotalData = async(table) => {
      const collectionRef = collection(db, table);
      const snapshot = await getCountFromServer(collectionRef);
      data_count.value = snapshot.data().count;
    }

    const getAllData = async (table) =>  {
      const collectionRef = collection(db, table)

      try{
        const result = await getDocs(collectionRef)
        data.value = result.docs.map(doc => ({...doc.data(), id: doc.id}))
      }
      catch(error) {
        console.log(error)
      }
    }

    const getDataWhereKeyValue = async(table, key, value, operator='==') => {
      const collectionRef = query(collection(db, table), where(key, operator, value));
      // const collectionRef = query(collection(db, table), where("capital", "==", true));
      try {
          const result = await getDocs(collectionRef)
          return result.docs.map(doc => ({...doc.data(), id: doc.id}))
      }
      catch(error){
          console.log(error)
          return error
      }
    }

    const addData = async (table, data) => {
      try{
        const collectionRef = collection(db, table)
        await addDoc(collectionRef, data)
      }
      catch(error) {
        console.log(error)
      }
    }

    const updateData = async (table, data, id) => {
      try{
        const dataDoc = doc(db, table, id)
        await updateDoc(dataDoc, data)
      }
      catch(error) {
        console.log(error)
      }
    }

    const deleteData = async (table, id) => {
      try{
        const dataDoc = doc(db, table, id)
        await deleteDoc(dataDoc)
      }
      catch(error) {
        console.log(error)
      }
    }

    function convertTimestamp(timestamp) {
      let date = new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate();
      return date.toLocaleString()
    }

    return { 
      data_count, data, getTotalData, getAllData, addData, updateData, 
      deleteData, getDataWithId, getDataWhereKeyValue, convertTimestamp
    }
}