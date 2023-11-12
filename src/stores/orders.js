import { defineStore, acceptHMRUpdate } from 'pinia'
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase.config';

export const useOrdersStore = defineStore("orders", {
  persist: true,
  state: () => {
    return {
      orders: [],
      order_items: [],
    };
  },

  actions: {
    async fetchOrders() {
      const ordersCollectionRef = collection(db, "orders")

      try{

        const data = await getDocs(ordersCollectionRef)
        const orders = data.docs.map(doc => ({...doc.data(), id: doc.id}))

        this.orders = orders
      }
      catch(error) {
        console.log(error)
      }
    },

    async fetchOrderItems(order) {
      const ordersCollectionRef = query(collection(db, 'order_items'), where('order_id', '==', order));

      try{

        const data = await getDocs(ordersCollectionRef)
        const items = data.docs.map(doc => ({...doc.data(), id: doc.id}))

        return items
        // this.order_items = items
      }
      catch(error) {
        console.log(error)
      }
    },

    async addOrder(order) {
      try{
        const ordersCollectionRef = collection(db, "orders")
        // eslint-disable-next-line no-unused-vars
        let result = await addDoc(ordersCollectionRef, order)
        // console.log(result.id, order)
        this.fetchOrders()
      }
      catch(error) {
        console.log(error)
      }

    },

    async updateOrder (order, id) {
      try{
        const orderDoc = doc(db, "orders", id)
        // eslint-disable-next-line no-unused-vars
        let result = await updateDoc(orderDoc, order)
        this.fetchOrders()
      }
      catch(error) {
        console.log(error)
      }
    },

    async deleteOrders (id) {
      try{
        const orderDoc = doc(db, "orders", id)
        await deleteDoc(orderDoc)
        this.fetchOrders()
      }
      catch(error) {
        console.log(error)
      }
    }
  },

  getters: {
    getOrders: (state) => state.orders,
    getOrderItems: (state) => state.order_items,
  },

});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrdersStore, import.meta.hot))
}