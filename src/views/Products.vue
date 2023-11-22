<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Layout>
        <main class="rounded-lg bg-white text-slate-500 px-4 py-4">
            <div class="flex items-center justify-between px-2">
                <h2 class="text-2xl font-semibold text-slate-800">Products</h2>
                <button @click="handleSelectProduct({})" class="px-4 bg-green-700 text-white py-1.5 rounded">Add</button>
            </div>

            <ProductsTable
                v-if="products.length > 0"
                :products="products"
                :edit-product="handleSelectProduct"
                :delete-product="handleDeleteProduct"
            />

            <ProductForm
                :show="showForm"
                :product="selectedProduct"
                v-if="showForm"
                @close="showForm = $event"
                @alert="showAlert = $event"
            />

            <NotificationBar 
                :active="showAlert"
                @close="showAlert = $event"
            />
            <ConfirmPromptBar 
                :active="showDialog"
                :submit-fn="deleteProduct"
                @close="showDialog = $event"
            />
        </main>
    </Layout>
</template>

<script setup>
import Layout from '../layout/index.vue'
import { computed, onBeforeMount, ref } from 'vue'
//*321*00# *321*02*080# 09059672002 08076009888
import { useProductsStore } from '../stores/products'
import ProductsTable from '../components/tables/ProductsTable.vue';
import NotificationBar from '../components/NotificationBar.vue';
import ConfirmPromptBar from '../components/ConfirmPromptBar.vue';
import ProductForm from '../forms/ProductForm.vue'

const productsStore = useProductsStore()
const products = computed(() => productsStore.getProducts || [])

const showForm = ref(false)
const showAlert = ref(false)
const showDialog = ref(false)
const selectedProduct = ref({})

function handleSelectProduct (option={}) {
    selectedProduct.value = option
    showForm.value = true
}

async function handleDeleteProduct(option) {
    selectedProduct.value = option
    showDialog.value = true
}

async function deleteProduct () {
    await productsStore.deleteProduct(selectedProduct.value.id)
    showDialog.value = false
    showAlert.value = true
    selectedProduct.value = {}
}

onBeforeMount(() => {
    productsStore.fetchProducts()
})
</script>