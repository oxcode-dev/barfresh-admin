<!-- eslint-disable vue/valid-template-root -->
<template>
    <Modal :show="show" @close="close" max-width="md">
        <div class="px-4 py-2">
            <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">
                    {{ props.product && props.product.id ? 'Edit Product' : 'Add Product' }}
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
                        <label class="font-semibold text-sm text-gray-600 pb-1 block">Category</label>
                        <select required v-model="form.category_id" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full">
                            <option 
                                v-for="(category, key) in categories" :key="key"
                                :value="category.id"
                            >
                                {{ category.name }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="font-semibold text-sm text-gray-600 pb-1 block">Price</label>
                        <input required type="number" v-model.number="form.price" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                    </div>

                    <div>
                        <label class="font-semibold text-sm text-gray-600 pb-1 block">Discount</label>
                        <input required type="number" v-model.number="form.discount" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                    </div>

                    <div>
                        <label class="font-semibold text-sm text-gray-600 pb-1 block">Quantity</label>
                        <input required type="number" v-model.number="form.quantity" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                    </div>

                    <div>
                        <label class="font-semibold text-sm text-gray-600 pb-1 block">Description</label>
                        <textarea required v-model="form.description" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"></textarea>
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
import { computed, ref } from 'vue';
import { useProductsStore } from '../stores/products';
import { useCategoriesStore } from '../stores/categories';
import { serverTimestamp } from 'firebase/firestore';

const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()

const categories = computed(() => categoriesStore.getCategories || [])

const closeIcon = ref(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`)
const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
    },
    product: {
        type: Object,
        default: () => {}
    }
})
const emit = defineEmits(['close'])
const form = ref(props.product.id ? JSON.parse(JSON.stringify(props.product)) : {
    name: '',
    quantity: '',
    price: null,
    discount: null,
    category_id: null,
    description: '',
    created_at: '',
    updated_at: '',
})

const isLoading = ref(false)

const close = () => {
    if (props.show) {
        emit('close', false)
    }
}

const submit = async() => {
    if(form.value.name && form.value.price) {
        isLoading.value = true
        if(props.product && props.product.id) {
            form.value.updated_at = serverTimestamp()
            await productsStore.updateProduct(form.value, props.product.id)
            isLoading.value = false
            close()
        }
        else {
            form.value.created_at = serverTimestamp()
            form.value.updated_at = serverTimestamp()
            await productsStore.addProduct(form.value)
            isLoading.value = false
            close()
        }
    }
}

</script>