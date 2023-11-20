<!-- eslint-disable vue/valid-template-root -->
<template>
    <Modal :show="show" @close="close" max-width="md">
        <div class="px-4 py-2">
            <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">
                    {{ props.category && props.category.id ? 'Edit Category' : 'Add Category' }}
                </h2>
                <button @click="close" v-html="closeIcon"></button>
            </div>
            <div class="my-6">
                <form @submit.prevent="submit">
                    <div>
                        <label class="font-semibold text-sm text-gray-600 pb-1 block">Name</label>
                        <input required v-model="form.name" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
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
import { useCategoriesStore } from '../stores/categories';
import { slugify } from '../helpers/index.js';

const categoriesStore = useCategoriesStore()
const closeIcon = ref(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`)
const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
    },
    category: {
        type: Object,
        default: () => {}
    }
})
const emit = defineEmits(['close', 'alert'])
const form = ref(props.category.id ? JSON.parse(JSON.stringify(props.category)) : {
    name: '',
})

const slugifyName = computed(() => slugify(form.value.name))

const isLoading = ref(false)

const close = () => {
    if (props.show) {
        emit('close', false)
    }
}

const submit = async() => {
    if(form.value.name) {
        isLoading.value = true
        form.value.slug = slugifyName.value
        if(props.category && props.category.id) {
            await categoriesStore.updateCategory(form.value, props.category.id)
        }
        else {
            await categoriesStore.addCategory(form.value)
        }
        isLoading.value = false
        emit('alert', true)
        close()
    }
}

</script>