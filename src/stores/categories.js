import { defineStore, acceptHMRUpdate } from 'pinia'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../firebase.config';

export const useCategoriesStore = defineStore("categories", {
  persist: true,
  state: () => {
    return {
     categories: [],
    };
  },

  actions: {
    async fetchCategories() {
      const categoryCollectionRef = collection(db, "categories")

      try{

        const data = await getDocs(categoryCollectionRef)
        const categories = data.docs.map(doc => ({...doc.data(), id: doc.id}))

        this.categories = categories
      }
      catch(error) {
        console.log(error)
      }
    },

    async addCategory(category) {
      try{
        const categoryCollectionRef = collection(db, "categories")
        // eslint-disable-next-line no-unused-vars
        let result = await addDoc(categoryCollectionRef, category)
        this.fetchCategories()
      }
      catch(error) {
        console.log(error)
      }

    },

    async updateCategory (category, id) {
      try{
        const categoryDoc = doc(db, "categories", id)
        // eslint-disable-next-line no-unused-vars
        let result = await updateDoc(categoryDoc, category)
        this.fetchCategories()
      }
      catch(error) {
        console.log(error)
      }
    },

    async deleteCategory (id) {
      try{
        const categoryDoc = doc(db, "categories", id)
        await deleteDoc(categoryDoc)
        this.fetchCategories()
      }
      catch(error) {
        console.log(error)
      }
    }
  },

  getters: {
    getCategories: (state) => state.categories,
  },

});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoriesStore, import.meta.hot))
}