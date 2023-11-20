<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Layout>
        <main class="rounded-lg bg-white text-slate-500 px-4 py-4">
            <div class="flex items-center justify-between px-2">
                <h2 class="text-2xl font-semibold text-slate-800">Orders</h2>
                <!-- <button @click="handleSelectFaqs({})" class="px-4 bg-green-700 text-white py-1.5 rounded">Add</button> -->
            </div>
            <OrdersTable
                :orders="orders"
            />
        </main>
    </Layout>
</template>
  
<script setup>
import Layout from '../../layout/index.vue'
import { onBeforeMount, computed } from 'vue'
import { useOrdersStore } from '../../stores/orders'
import OrdersTable from '../../components/tables/OrdersTable.vue'

const ordersStore = useOrdersStore()

const orders = computed(() => ordersStore.getOrders || [])

onBeforeMount(() => {
    ordersStore.fetchOrders()
})
  
</script>