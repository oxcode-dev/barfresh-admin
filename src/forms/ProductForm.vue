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

                    <div>
                        <div class="relative h-24 border border-dashed rounded flex justify-center items-center">
                            <img class="absolute w-full h-full object-contain opacity-40" :src="imagePreview" v-if="imagePreview" />
                            <div class="text-center text-gray-800 inline-flex flex-col items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                                <span>Upload an Image</span>
                            </div>
                            <input 
                                type="file" class="absolute w-full h-full cursor-pointer opacity-0 " 
                                ref="input" @change="uploadImage"
                            />
                        </div>
                    </div>

                    <button :disabled="isLoading" type="submit" class="transition duration-200 bg-green-700 hover:bg-green-600 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block mt-6">
                        <span>{{ isLoading ? 'Loading...' : 'Submit' }}</span>
                    </button>
                </form>
            </div>
        </div>
    </Modal>
</template>

<script setup>
import Modal from '../components/Modal.vue';
import { computed, ref as vueRef } from 'vue';
import { useProductsStore } from '../stores/products';
import { useCategoriesStore } from '../stores/categories';
import { serverTimestamp } from 'firebase/firestore';
import { storage } from '../firebase.config';
import {
    ref, uploadBytes, getDownloadURL, deleteObject,
} from "firebase/storage";
import { v4 } from 'uuid';

const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()

const categories = computed(() => categoriesStore.getCategories || [])

const closeIcon = vueRef(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`)
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
const emit = defineEmits(['close', 'alert'])
const form = vueRef(props.product.id ? JSON.parse(JSON.stringify(props.product)) : {
    name: '',
    quantity: '',
    price: null,
    discount: null,
    category_id: null,
    description: '',
    created_at: '',
    updated_at: '',
    image: '',
})

const isLoading = vueRef(false)

const close = () => {
    if (props.show) {
        emit('close', false)
    }
}

const imageArray = vueRef(null)
const preview = vueRef(props.product?.image || null)
const uploadImage = (e) => {
    imageArray.value = e.target.files[0]
    var reader = new FileReader();
    reader.onload = function(){
      preview.value = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
}
const imagePreview = computed(() => preview.value)

const submit = async() => {
    if(form.value.name && form.value.price) {
        isLoading.value = true
        if (imageArray.value !== null) {
            const imageRef = ref(storage, `products/${imageArray.value.name + v4()}`);
            await uploadBytes(imageRef, imageArray.value).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    form.value.image = url
                    if(props.product && props.product.image) {
                        const deleteImageRef = ref(storage, props.product.image);
                        deleteObject(deleteImageRef)
                            .catch(error => console.log(error))
                    }
                    handleSubmit()
                    // return console.log(url, imageUrl.value)
                });
            });
        }
        else {
            handleSubmit()
        }
    }
}

const handleSubmit = async() => {
    if(props.product && props.product.id) {
        form.value.updated_at = serverTimestamp()
        await productsStore.updateProduct(form.value, props.product.id)  
    }
    else {
        form.value.created_at = serverTimestamp()
        form.value.updated_at = serverTimestamp()
        await productsStore.addProduct(form.value)
    }
    isLoading.value = false
    emit('alert', true)
    close()
}

</script>