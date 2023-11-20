<template>
    <div ref="target">
        <div
            :class="`fixed z-[500] bottom-4 right-2 transition-transform duration-[0.8s] ease-[ease-in-out] 
                ${active ? 'translate-y-[-10%]' : 'translate-y-[130%]'}`
        ">
            <div
                class="relative block w-full max-w-lg rounded-lg bg-red-500 px-4 py-2 text-white"
            >
                <div class="absolute top-4 left-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                </div>
                <div class="ml-10 pl-2 mr-12">
                    <p class="block text-sm font-medium leading-snug tracking-normal text-white antialiased">
                        Are you want to delete this item?
                    </p>
                    <div class="mt-2 space-x-2">
                        <button class="p-2 py-1 border border-white rounded-md text-sm bg-white text-red-600" @click="submitFn">Yes</button>
                        <button 
                            @click="onClose"
                            class="p-2 py-1 border border-white rounded-md text-sm"
                        >
                            No
                        </button>
                    </div>
                </div>
                <div
                    class="absolute top-3 right-3 w-max rounded-lg transition-all hover:bg-white hover:bg-opacity-20"
                >
                    <div @click.prevent="() => onClose(false)" role="button" class="w-max rounded-lg p-1">
                        <svg xmlns="http://www.w3.org/2000/svg"  class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// import vClickOutside from 'v-click-outside'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
const props = defineProps({
    active: {
        type: Boolean,
        default: () => true,
    },
    message: {
        type: String,
        default: () => null
    },
    submitFn: {
        type: Function
    }
})

const emit = defineEmits(['close'])

const onClose = () => {
    if (props.active) {
        emit('close', false)
    }
}

const target = ref(null)

onClickOutside(target, () => {
    onClose()
    // console.log(event)
})
</script>