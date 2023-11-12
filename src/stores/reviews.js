import { defineStore, acceptHMRUpdate } from 'pinia'
import 
  { addDoc, collection, deleteDoc, doc, getDocs, getDoc, updateDoc, getCountFromServer, query, orderBy, startAfter, limit, } 
from 'firebase/firestore'
import { db } from '../firebase.config';

export const useReviewsStore = defineStore("reviews", {
  persist: true,
  state: () => {
    return {
      reviews: [],
      reviews_count: 0,
      lastItem: null,
      firstItem: {},
    };
  },

  actions: {
    async countAllReviews() {
      const coll = collection(db, "reviews");
      const snapshot = await getCountFromServer(coll);
      this.reviews_count = snapshot.data().count;
    },

    async fetchReviews() {
      const reviewCollectionRef = collection(db, "reviews")

      try{

        const data = await getDocs(reviewCollectionRef)
        const reviews = data.docs.map(doc => ({...doc.data(), id: doc.id}))

        this.reviews = reviews
      }
      catch(error) {
        console.log(error)
      }
    },

    async getReviewsFirstPage (orderByParam='name', limitNumber=5) {
      const reviewCollectionRef = collection(db, "reviews")
      try {
        if(this.reviews.length === 0){
          const first = query(reviewCollectionRef, orderBy(orderByParam), limit(limitNumber));
          const data = await getDocs(first);
          this.lastItem = data.docs[data.docs.length-1]?.id || null;
          this.reviews = data.docs.map(doc => ({...doc.data(), id: doc.id}))
        }
        else {
          if(this.lastItem) {
            const dataDoc = doc(db, "reviews", this.lastItem);
            const result = await getDoc(dataDoc);
            // console.log(result)
  
            const next = query(reviewCollectionRef, orderBy(orderByParam), startAfter(result), limit(limitNumber));
            const data = await getDocs(next);
            this.lastItem = data.docs[data.docs.length-1]?.id || null;

            this.reviews = data.docs.map(doc => ({...doc.data(), id: doc.id}))
          }
        }
      }
      catch(error) {
        console.log(error)
      }
    },

    async addReview(review) {
      try{
        const reviewCollectionRef = collection(db, "reviews")
        await addDoc(reviewCollectionRef, review)
        this.fetchReviews()
      }
      catch(error) {
        console.log(error)
      }

    },

    async updateReview (review, id) {
      try{
        const reviewDoc = doc(db, "reviews", id)
        await updateDoc(reviewDoc, review)
        this.fetchReviews()
      }
      catch(error) {
        console.log(error)
      }
    },

    async deleteReview (id) {
      try{
        const reviewDoc = doc(db, "reviews", id)
        await deleteDoc(reviewDoc)
        this.fetchReviews()
      }
      catch(error) {
        console.log(error)
      }
    }
  },

  getters: {
    getReviews: (state) => state.reviews,
    getReviewsCount: (state) => state.reviews_count,
  },

});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useReviewsStore, import.meta.hot))
}