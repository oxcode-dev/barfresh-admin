<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Layout>
        <main class="rounded-lg bg-white text-slate-500 px-4 py-4">
            <div class="flex items-center justify-between px-2">
                <h2 class="text-2xl font-semibold text-slate-800">FAQs</h2>
                <button @click="handleSelectFaqs({})" class="px-4 bg-green-700 text-white py-1.5 rounded">Add</button>
            </div>
            <FaqsTable
                :faqs="faqs"
                :editFaqs="handleSelectFaqs"
                :deleteFaqs="deleteFaqs"
            />
        </main>

        <FaqsForm 
            :show="showForm" 
            :faqs="selectedFaqs"
            @close="showForm = $event"
            v-if="showForm"
        />
    </Layout>
</template>
  
<script setup>
import Layout from '../layout/index.vue'
import { onBeforeMount, computed, ref} from 'vue'
import { useFaqsStore } from '../stores/faqs'
import FaqsTable from '../components/tables/FaqsTable.vue'
import FaqsForm from '../forms/FaqsForm.vue'

const faqsStore = useFaqsStore()

const faqs = computed(() => faqsStore.getFaqs || [])
const showForm = ref(false)
const selectedFaqs = ref({})

function handleSelectFaqs (option={}) {
    selectedFaqs.value = option
    showForm.value = true
}

function deleteFaqs(option) {
    if(confirm('Are you sure, you want to delete this faqs?')) {
        faqsStore.deleteFaqs(option.id)
    }
}

onBeforeMount(() => {
    faqsStore.fetchFaqs()
})
  
</script>