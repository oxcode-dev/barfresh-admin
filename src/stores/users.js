import { defineStore, acceptHMRUpdate } from 'pinia'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../firebase.config';

export const useUsersStore = defineStore("users", {
  persist: true,
  state: () => {
    return {
     users: [],
    };
  },

  actions: {
    async fetchUsers() {
      const userCollectionRef = collection(db, "users")

      try{

        const data = await getDocs(userCollectionRef)
        const users = data.docs.map(doc => ({...doc.data(), id: doc.id}))

        this.users = users
      }
      catch(error) {
        console.log(error)
      }
    },

    async addUser(user) {
      // let user = {
      //   "phone": "+2349032455090",
      //   "created_at": new Date(),
      //   "address": "Michael",
      //   "name": "DJ Gala",
      //   "id": "ufTIrrYRDRwutrSgayTf"
      // }

      try{
        const userCollectionRef = collection(db, "users")
        await addDoc(userCollectionRef, user)
      }
      catch(error) {
        console.log(error)
      }

    },

    async updateUser (user, id) {
      try{
        const userDoc = doc(db, "users", id)
        await updateDoc(userDoc, user)
      }
      catch(error) {
        console.log(error)
      }
    },

    async deleteUser (id) {
      try{
        const userDoc = doc(db, "users", id)
        await deleteDoc(userDoc)
      }
      catch(error) {
        console.log(error)
      }
    }
  },

  getters: {
    getUsers: (state) => state.users,
  },

});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot))
}