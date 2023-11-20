<!-- eslint-disable vue/valid-template-root -->
<template>
    <Modal :show="show" @close="close" max-width="md">
        <div class="px-4 py-2">
            <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">
                    {{ props.review && props.review.id ? 'Edit Review' : 'Add Review' }}
                </h2>
                <button @click="close" v-html="closeIcon"></button>
            </div>
            <div class="my-6">
                <form @submit.prevent="submit">
                    <div>
                        <label class="font-semibold text-sm text-gray-600 pb-1 block">Name</label>
                        <input required v-model="form.name" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                    </div>

                    <div>
                        <label class="font-semibold text-sm text-gray-600 pb-1 block">Comment</label>
                        <textarea required v-model="form.comment" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"></textarea>
                    </div>

                    <div class="mb-4">
                        <label class="font-semibold text-sm text-gray-600 pb-1 block">Rating</label>
                        <star-rating :increment="0.5" star-size="30" :rating="form.rate" @update:rating ="setRating" :show-rating="false" />
                    </div>

                    <button :disabled="isLoading" type="submit" class="transition duration-200 bg-green-700 hover:bg-green-600 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                        <span>{{ isLoading ? 'Loading...' : 'Submit' }}</span>
                    </button>
                </form>
            </div>
        </div>
    </Modal>
</template>

<script setup>
import Modal from '../components/Modal.vue';
import StarRating from 'vue-star-rating'
import { ref } from 'vue';
import { useReviewsStore } from '../stores/reviews';
import { serverTimestamp } from 'firebase/firestore';

const reviewsStore = useReviewsStore()
const closeIcon = ref(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`)
const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
    },
    review: {
        type: Object,
        default: () => {}
    }
})
const emit = defineEmits(['close', 'alert'])
const form = ref(props.review.id ? JSON.parse(JSON.stringify(props.review)) : {
    name: '',
    rate: 0,
    comment: '',
    product_id: '',
    // created_at: '',
})

const isLoading = ref(false)

const setRating = rating => form.value.rate = rating

const close = () => {
    if (props.show) {
        emit('close', false)
    }
}

const submit = async() => {
    if(form.value.name && form.value.rate > 0) {
        isLoading.value = true
        if(props.review && props.review.id) {
            await reviewsStore.updateReview(form.value, props.review.id)
        }
        else {
            form.value.created_at = serverTimestamp()
            await reviewsStore.addReview(form.value)
        }
        isLoading.value = false
        emit('alert', true)
        close()
    }
}

</script>