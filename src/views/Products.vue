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
            
            <EmptyCard
                v-if="products.length === 0"
            />

            <ProductForm
                :show="showForm"
                :product="selectedProduct"
                v-if="showForm"
                @close="showForm = $event"
            />
        </main>
    </Layout>
</template>

<script setup>
import Layout from '../layout/index.vue'
import { computed, onBeforeMount, ref } from 'vue' //*321*00# *321*02*080# 09059672002 08076009888
import { useProductsStore } from '../stores/products'
import ProductsTable from '../components/tables/ProductsTable.vue';
import EmptyCard from '../components/EmptyCard.vue';
import ProductForm from '../forms/ProductForm.vue'

const productsStore = useProductsStore()
const products = computed(() => productsStore.getProducts || [])

const showForm = ref(false)
const selectedProduct = ref({})

function handleSelectProduct (option={}) {
    selectedProduct.value = option
    showForm.value = true
}

function handleDeleteProduct(option) {
    if(confirm('Are you sure, you want to delete this product?')) {
        productsStore.deleteProduct(option.id)
    }
}

onBeforeMount(() => {
    productsStore.fetchProducts()
})
</script>