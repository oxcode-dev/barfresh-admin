import { defineStore, acceptHMRUpdate } from 'pinia'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../firebase.config';

export const useFaqsStore = defineStore("faqs", {
  persist: true,
  state: () => {
    return {
      faqs: [],
    };
  },

  actions: {
    async fetchFaqs() {
      const faqsCollectionRef = collection(db, "faqs")

      try{

        const data = await getDocs(faqsCollectionRef)
        const faqs = data.docs.map(doc => ({...doc.data(), id: doc.id}))

        this.faqs = faqs
      }
      catch(error) {
        console.log(error)
      }
    },

    async addFaqs(faq) {
      try{
        const faqsCollectionRef = collection(db, "faqs")
        // eslint-disable-next-line no-unused-vars
        let result = await addDoc(faqsCollectionRef, faq)
        // console.log(result.id, faq)
        this.fetchFaqs()
      }
      catch(error) {
        console.log(error)
      }

    },

    async updateFaqs (faq, id) {
      try{
        const faqsDoc = doc(db, "faqs", id)
        // eslint-disable-next-line no-unused-vars
        let result = await updateDoc(faqsDoc, faq)
        this.fetchFaqs()
      }
      catch(error) {
        console.log(error)
      }
    },

    async deleteFaqs (id) {
      try{
        const faqsDoc = doc(db, "faqs", id)
        await deleteDoc(faqsDoc)
        this.fetchFaqs()
      }
      catch(error) {
        console.log(error)
      }
    }
  },

  getters: {
    getFaqs: (state) => state.faqs,
  },

});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFaqsStore, import.meta.hot))
}