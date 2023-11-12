<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Layout>
        <main class="rounded-lg bg-white text-slate-500 px-4 py-4">
            <div class="flex items-center justify-between px-2">
                <h2 class="text-2xl font-semibold text-slate-800">Order</h2>
                <!-- <button @click="handleSelectFaqs({})" class="px-4 bg-green-700 text-white py-1.5 rounded">Add</button> -->
            </div>

            <div>
                <div class="my-8">
                    <div class="bg-gray-200 py-3 px-4">
                        <p>Order Summary</p>
                    </div>
                    <div>
                        <dl class="py-2 px-4 space-y-3">
                            <div class="flex space-x-4">
                                <dt class="w-1/4 sm:w-24">Date</dt>
                                <dd class="text-gray-500 w-3/4 sm:w-auto">{{ datetimeFormat(selectedOrder?.created_at) || 'N/A' }}</dd>
                            </div>
                            <div class="flex space-x-4">
                                <dt class="w-1/4 sm:w-24">Status</dt>
                                <div>
                                    <div v-if="!toggleStatusForm" class="flex items-center space-x-2 pb-2">
                                        <dd class="text-gray-500 w-3/4 sm:w-auto">{{ selectedOrder?.status || 'N/A' }}</dd>
                                        <button 
                                            @click="toggleStatusForm = !toggleStatusForm" 
                                            v-html="PencilIcon" 
                                            class="w-6 h-6 bg-blue-600 text-white rounded p-1"
                                        ></button>
                                    </div>

                                    <div v-else class="flex items-center space-x-2">
                                        <select v-model="status" class="border rounded-md py-2 px-2 text-sm">
                                            <option
                                                v-for="(option, key) in statuses" 
                                                :key="key" :value="option"
                                            >
                                                {{ option }}
                                            </option>
                                        </select>
                                        <div class="space-x-2">
                                            <button 
                                                @click="editStatus(option)" 
                                                v-html="SubmitIcon" 
                                                class="w-6 h-6 bg-green-600 text-white rounded p-1"
                                            ></button>
                                            <button 
                                                @click="toggleStatusForm = !toggleStatusForm" 
                                                v-html="CloseIcon" class="w-6 h-6 bg-red-600 text-white rounded p-1">
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>
                <div class="my-8">
                    <div class="bg-gray-200 py-3 px-4">
                        <p>Buyer Information</p>
                    </div>
                    <div>
                        <dl class="py-2 px-4 space-y-3">
                            <div class="flex space-x-4">
                                <dt class="w-1/4 sm:w-24">Name</dt>
                                <dd class="text-gray-500 w-3/4 sm:w-auto">{{ selectedOrder?.name || 'N/A' }}</dd>
                            </div>
                            <div class="flex space-x-4">
                                <dt class="w-1/4 sm:w-24">Email</dt>
                                <dd class="text-gray-500 w-3/4 sm:w-auto">{{ selectedOrder?.email || 'N/A' }}</dd>
                            </div>
                            <div class="flex space-x-4">
                                <dt class="w-1/4 sm:w-24">Phone</dt>
                                <dd class="text-gray-500 w-3/4 sm:w-auto">{{ selectedOrder?.phone || 'N/A' }}</dd>
                            </div>
                            <div class="flex space-x-4">
                                <dt class="w-1/4 sm:w-24">Address</dt>
                                <dd class="text-gray-500 w-3/4 sm:w-auto">{{ selectedOrder?.address || 'N/A' }}</dd>
                            </div>
                            <div class="flex space-x-4">
                                <dt class="w-1/4 sm:w-24">City</dt>
                                <dd class="text-gray-500 w-3/4 sm:w-auto">{{ selectedOrder?.city || 'N/A' }}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div class="my-8">
                    <div class="bg-gray-200 py-3 px-4">
                        <p>Products</p>
                    </div>
                    <div class="w-full hidden sm:inline-block rounded-lg overflow-hidden">
                        <table class="leading-normal w-full">
                            <thead>
                                <tr>
                                    <th class="px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                                    <th class="px-5 py-3 border-b-2 border-gray-200 text-center font-semibold text-gray-600 tracking-wider">
                                        <h2 class="text-base">Price</h2>
                                    </th>
                                    <th class="px-5 py-3 border-b-2 border-gray-200 text-center font-semibold text-gray-600 tracking-wider">
                                        <h2 class="text-base">Quantity</h2>
                                    </th>
                                    <th class="px-5 py-3 border-b-2 border-gray-200 text-center font-semibold text-gray-600 tracking-wider">
                                        <h2 class="text-base">Total</h2>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, key) in orderItems" :key="key">
                                    <td class="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                                        <div class="flex items-center space-x-4 sm:space-x-6">
                                            <div class="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-auto">
                                                <img class="w-full object-cover h-full rounded-lg" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.2&amp;w=160&amp;h=160&amp;q=80" alt="" />
                                            </div>
                                            <div class="ml-3 flex flex-col">
                                                <a class="text-gray-700 whitespace-no-wrap text-sm ms:text-lg" href="/store/qhijYaI8qkPdxAiTf3cj">
                                                    {{ getProductDetails(item.product_id).name }}
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-5 py-4 border-b border-gray-200 bg-white text-lg text-center">
                                        <p class="text-gray-900 whitespace-no-wrap">£ {{ item?.price || 0 }}</p>
                                    </td>
                                    <td class="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                                        <div class="inline-flex space-x-6">
                                            <p class="text-lg">{{ item?.quantity || 0 }}</p>
                                        </div>
                                    </td>
                                    <td class="px-5 py-4 border-b border-gray-200 bg-white text-lg text-center">
                                        <p class="text-gray-900 whitespace-no-wrap">£ {{ (item?.price * item?.quantity) || 0 }}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="sm:hidden">
                        <div class="flex items-start space-x-4 border-t py-4 px-2">
                            <div class="flex-shrink-0 w-16 sm:h-auto mt-1.5">
                                <img class="w-full object-cover h-full rounded-lg" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.2&amp;w=160&amp;h=160&amp;q=80" alt="" />
                            </div>
                            <div class="ml-3 w-full relative">
                                <a class="text-gray-700 whitespace-no-wrap font-medium text-base" href="/store/qhijYaI8qkPdxAiTf3cj">Voluptatem ut dolore Soap</a>
                                <p class="text-gray-500 whitespace-no-wrap">£ 610</p>
                                <div class="space-x-2 flex items-center w-full">
                                    <div class="flex space-x-3 items-center text-sm text-gray-500">
                                        <span>qty: </span>
                                        <span>1</span>
                                    </div>
                                </div>
                                <div class="absolute bottom-1 right-0">
                                    <p class="text-gray-900 whitespace-no-wrap font-semibold text-xl">£ 610</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end py-8">
                        <div class="">
                            <div class="py-2 flex justify-end items-center space-x-4 text-gray-500">
                                <h6 class="font-medium text-sm">Subtotal</h6>
                                <h6 class="font-medium text-xl">£ {{ selectedOrder?.total_amount || 0 }}</h6>
                            </div>
                            <div class="py-2 flex justify-end items-center space-x-4 text-gray-500">
                                <h6 class="font-medium text-sm">Shipping cost</h6>
                                <h6 class="font-medium text-xl">£ {{ selectedOrder?.shipping_cost || 0 }}</h6>
                            </div>
                            <div class="py-2 flex justify-end items-end space-x-3">
                                <h3 class="uppercase font-semibold text-lg">Total</h3>
                                <h1 class="uppercase font-bold text-4xl">£ {{ selectedOrder?.total || 0 }}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>       
    </Layout>
</template>
  
<script setup>
import Layout from '../../layout/index.vue'
import { onBeforeMount, computed, ref } from 'vue'
import { useOrdersStore } from '../../stores/orders'
import { useProductsStore } from '../../stores/products'
import { useRoute } from 'vue-router'
import { isEmpty, o_O } from '../../helpers'
import { useFirebaseDB } from '../../composables/useFirebaseDB'

const ordersStore = useOrdersStore()
const productsStore = useProductsStore()

const toggleStatusForm = ref(false)
const route = useRoute()
const {id} = route.params
const orders = computed(() => ordersStore.getOrders || [])
const orderItems = ref([])

const products = computed(() => productsStore.getProducts || [])
const selectedOrder = computed(() => orders.value.find(n => n.id === id) || {})
const status = ref(selectedOrder.value?.status || '')

const { getDataWhereKeyValue, convertTimestamp, updateData } = useFirebaseDB()

function datetimeFormat(timestamp) {
    if(!isEmpty(timestamp)) {
        return convertTimestamp(timestamp)
    }
	return 'Date not specified'
}

const getProductDetails = product_id => {
    return product_id ? products.value.find(n => n.id === product_id) : {}
}

let fetchOrderItems = async() => {
    let [error, data] = await o_O(getDataWhereKeyValue('order_items', 'order_id', id))
    // console.log(error, data) 
    if(error) return console.log(error, data)
    orderItems.value = data
}

// let statuses = ref([ 'pending', 'Awaiting Shipment', 'Shipped', 'Cancelled', 'Declined', 'Delivered'])
let statuses = ref([ 'Ordered', 'Awaiting Shipment', 'In Transit', 'Cancelled', 'Declined', 'Out for delivery', 'Delivered'])
const PencilIcon = ref(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>`)
const CloseIcon = ref(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`)
const SubmitIcon = ref(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>`)

const editStatus = async() => {
    if(selectedOrder.value.status !== status.value) {
        let form = {status: status.value}
        let [error, data] = await o_O(updateData('orders', form, id))
        if(error) return console.log(error, data)
        ordersStore.fetchOrders()
        alert('Successfully Updated')
        toggleStatusForm.value = false
    }
}

onBeforeMount(() => {
    fetchOrderItems()
    productsStore.fetchProducts()
})
</script>