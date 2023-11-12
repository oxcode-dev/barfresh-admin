<!-- eslint-disable vue/valid-template-root -->
<template>
    <Modal :show="show" @close="close" max-width="md">
        <div class="px-4 py-2">
            <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">
                    {{ props.faqs && props.faqs.id ? 'Edit Faqs' : 'Add Faqs' }}
                </h2>
                <button @click="close" v-html="closeIcon"></button>
            </div>
            <div class="my-6">
                <form @submit.prevent="submit">
                    <div>
                        <label class="font-semibold text-sm text-gray-600 pb-1 block">Question</label>
                        <input required v-model="form.question" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                    </div>

                    <div>
                        <label class="font-semibold text-sm text-gray-600 pb-1 block">Answer</label>
                        <textarea required v-model="form.answer" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"></textarea>
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
import { ref } from 'vue';
import { useFaqsStore } from '../stores/faqs';

const faqsStore = useFaqsStore()
const closeIcon = ref(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`)
const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
    },
    faqs: {
        type: Object,
        default: () => {}
    }
})
const emit = defineEmits(['close'])
const form = ref(props.faqs.id ? JSON.parse(JSON.stringify(props.faqs)) : {
    answer: '',
    question: '',
})

const isLoading = ref(false)

const close = () => {
    if (props.show) {
        emit('close', false)
    }
}

const submit = async() => {
    if(form.value.question && form.value.answer) {
        isLoading.value = true
        if(props.faqs && props.faqs.id) {
            await faqsStore.updateFaqs(form.value, props.faqs.id)
            isLoading.value = false
            close()
        }
        else {
            await faqsStore.addFaqs(form.value)
            isLoading.value = false
            close()
        }
    }
}

</script>