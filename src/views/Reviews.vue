<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Layout>
        <main class="rounded-lg bg-white text-slate-500 px-4 py-4">
            <div class="flex items-center justify-between px-2">
                <h2 class="text-2xl font-semibold text-slate-800">Reviews</h2>
                <button @click="handleSelectReview({})" class="px-4 bg-green-700 text-white py-1.5 rounded">Add</button>
            </div>

            <ReviewsTable
                :reviews="allReviews"
                :editReview="handleSelectReview"
                :deleteReview="handleDeleteReview"
            />

            <div class="flex justify-between items-center py-3 px-2">
                <div>
                    <p v-html="pageTitle"></p>
                </div>
                <div class="flex space-x-4">
                    <button v-if="currentPage > 1" @click="handlePrevPage(currentPage - 1)" class="rounded-lg bg-gray-100 text-gray-600 px-2 py-1 w-20 border text-sm">
                        Prev
                    </button>
                    <button v-if="currentPage < pages" @click="handleNextPage(currentPage + 1)" class="rounded-lg bg-gray-100 text-gray-600 px-2 py-1 w-20 border text-sm">
                        Next
                    </button>
                </div>
            </div>
        </main>

        <ReviewForm 
            :show="showForm" 
            :review="selectedReview"
            @close="showForm = $event"
            @alert="showAlert = $event"
            v-if="showForm"
        />

        <NotificationBar 
            :active="showAlert"
            @close="showAlert = $event"
        />
        <ConfirmPromptBar 
            :active="showDialog"
            :submit-fn="deleteReview"
            @close="showDialog = $event"
        />
    </Layout>
</template>
  
<script setup>
import Layout from '../layout/index.vue'
import { onBeforeMount, computed, ref} from 'vue'
import { useReviewsStore } from '../stores/reviews'
import ReviewForm from '../forms/ReviewForm.vue';
import ReviewsTable from '../components/tables/ReviewsTable.vue';
import NotificationBar from '../components/NotificationBar.vue';
import ConfirmPromptBar from '../components/ConfirmPromptBar.vue';
import { db } from '../firebase.config';
import 
  { collection, doc, getDocs, getDoc, getCountFromServer, query, orderBy, startAfter, endBefore, limit, limitToLast } 
from 'firebase/firestore'

const reviewsStore = useReviewsStore()
const reviewCollectionRef = collection(db, "reviews")

const showForm = ref(false)
const showAlert = ref(false)
const showDialog = ref(false)
const selectedReview = ref({})

function handleSelectReview (review={}) {
    selectedReview.value = review
    showForm.value = true
}

async function handleDeleteReview(option) {
    selectedReview.value = option
    showDialog.value = true
}

async function deleteReview () {
    await reviewsStore.deleteReview(selectedReview.value.id)
    showDialog.value = false
    showAlert.value = true
    selectedReview.value = {}
    getReviews()
}

const orderByParam = ref('created_at')
const limitNumber = ref(10)
const limitOrder = ref('desc')
const lastItemId = ref(null)
const firstItemId = ref(null)
const allReviews = ref([])
const currentPage = ref(1)
const getTotalReviews = ref(1)
const pages = ref(1)
const pageTitle = computed(() => `<span>Page <em>${currentPage.value}</em> of ${pages.value}</span>`)

const countAllReviews = async() => {
    const coll = collection(db, "reviews");
    const snapshot = await getCountFromServer(coll);
    getTotalReviews.value = snapshot.data().count;
    pages.value = Math.ceil(getTotalReviews.value/limitNumber.value)
}

const getReviews = async () => {
    const first = query(reviewCollectionRef, orderBy(orderByParam.value, limitOrder.value), limit(limitNumber.value));
    const data = await getDocs(first);
    lastItemId.value = data.docs[data.docs.length-1]?.id || null;
    allReviews.value = data.docs.map(doc => ({...doc.data(), id: doc.id}))
}

const handleNextPage = async(selectedPage) => {
    if(lastItemId.value && selectedPage <= pages.value) {
        const dataDoc = doc(db, "reviews", lastItemId.value);
        const result = await getDoc(dataDoc);

        const next = query(reviewCollectionRef, orderBy(orderByParam.value, limitOrder.value), startAfter(result), limit(limitNumber.value));
        const data = await getDocs(next);
        
        lastItemId.value = selectedPage === pages.value ? null : data.docs[data.docs.length-1]?.id || null;
        firstItemId.value = selectedPage === 1 ? null : data.docs[0]?.id || null;
        currentPage.value = selectedPage

        allReviews.value = data.docs.map(doc => ({...doc.data(), id: doc.id}))
    }
}

const handlePrevPage = async(selectedPage) => {
    if(firstItemId.value && selectedPage >= 1) {
        const dataDoc = doc(db, "reviews", firstItemId.value);
        const result = await getDoc(dataDoc);

        const prev = query(reviewCollectionRef, orderBy(orderByParam.value, limitOrder.value), endBefore(result), limitToLast(limitNumber.value));
        const data = await getDocs(prev);
        
        currentPage.value = selectedPage
        lastItemId.value = selectedPage === pages.value ? null : data.docs[data.docs.length-1]?.id || null;
        firstItemId.value = selectedPage === 1 ? null : data.docs[0]?.id || null;

        allReviews.value = data.docs.map(doc => ({...doc.data(), id: doc.id}))
    }
}

onBeforeMount(() => {
    getReviews()
    countAllReviews()
})
  
</script>