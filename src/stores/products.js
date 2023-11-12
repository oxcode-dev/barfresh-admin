import { defineStore, acceptHMRUpdate } from 'pinia'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../firebase.config';

export const useProductsStore = defineStore("products", {
  persist: true,
  state: () => {
    return {
      products: [],
    };
  },

  actions: {
    async fetchProducts() {
      const productsCollectionRef = collection(db, "products")

      try{

        const data = await getDocs(productsCollectionRef)
        const products = data.docs.map(doc => ({...doc.data(), id: doc.id}))

        this.products = products
      }
      catch(error) {
        console.log(error)
      }
    },

    async addProduct(product) {
      // return console.log(product)
      try{
        const productsCollectionRef = collection(db, "products")
        // eslint-disable-next-line no-unused-vars
        let result = await addDoc(productsCollectionRef, product)
        // console.log(result, product)
        this.fetchProducts()
      }
      catch(error) {
        console.log(error)
      }

    },

    async updateProduct (product, id) {
      try{
        const productDoc = doc(db, "products", id)
        // eslint-disable-next-line no-unused-vars
        let result = await updateDoc(productDoc, product)
        this.fetchProducts()
      }
      catch(error) {
        console.log(error)
      }
    },

    async deleteProduct (id) {
      try{
        const productDoc = doc(db, "products", id)
        await deleteDoc(productDoc)
        this.fetchProducts()
      }
      catch(error) {
        console.log(error)
      }
    }
  },

  getters: {
    getProducts: (state) => state.products,
  },

});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductsStore, import.meta.hot))
}