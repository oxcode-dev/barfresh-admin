<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Layout>
    <main>
      <div class="rounded-lg bg-white text-slate-500 px-4 py-4">
        <div>
          <h2 class="text-xl font-semibold text-slate-800">Dashboard</h2>
        </div>
      </div>

      <div class="my-8">
        <div class="flex flex-wrap w-full">
          <div class="w-full sm:w-1/3 lg:w-1/3" v-for="(option, key) in tabs" :key="key">
            <div class="bg-white m-2 h-32 rounded-md p-4 text-slate-500">
              <div class="flex flex-col space-y-2 items-center justify-center">
                <span v-html="option.svg"></span>
                <p class="text-sm">{{ option?.title || 'N/A' }}</p>
                <h2 class="text-2xl font-semibold text-slate-800">{{ option?.count || 0 }}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="my-8">
        <div class="rounded-lg bg-white text-slate-500 px-4 py-4">
          <div class="flex justify-between">
            <h2 class="text-slate-800">Orders</h2>
            <router-link to="/orders">
              <span class="text-sm hover:underline">View All</span>
            </router-link>
          </div>
          <OrdersTable :orders="selectedOrders" />
        </div>
      </div>
    </main>
  </Layout>
</template>

<script setup>
import Layout from '../layout/index.vue'
import { onBeforeMount, computed, ref } from 'vue'
import { useOrdersStore } from '../stores/orders'
import OrdersTable from '../components/tables/OrdersTable.vue'
import { useFirebaseDB } from '../composables/useFirebaseDB'
import { o_O } from '../helpers'

const ordersStore = useOrdersStore()

const orders = computed(() => ordersStore.getOrders || [])
const selectedOrders = computed(() => orders.value.slice(0,10))

const tabs = ref([
  {
    title: 'Orders',
    count: 0,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" /></svg>`
  },  
  {
    title: 'Products',
    count: 0,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>`
  },
  {
    title: 'Reviews',
    count: 0,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>`
  },
])

const { getTotalData } = useFirebaseDB()

const getTotalOrders = async() => {
  let [error, data] = await o_O(getTotalData('orders'))
  if(error) return console.log(error)

  tabs.value.find(n => n.title === 'Orders').count = data
}

const getTotalProducts = async() => {
  let [error, data] = await o_O(getTotalData('products'))
  if(error) return console.log(error)

  tabs.value.find(n => n.title === 'Products').count = data
}

const getTotalReviews = async() => {
  let [error, data] = await o_O(getTotalData('reviews'))
  if(error) return console.log(error)

  tabs.value.find(n => n.title === 'Reviews').count = data
}

onBeforeMount(() => {
  ordersStore.fetchOrders()
  getTotalOrders()
  getTotalProducts()
  getTotalReviews()
})

</script>