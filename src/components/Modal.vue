<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <teleport to="body">
        <transition leave-active-class="duration-200">
            <div v-show="show" style="z-index: 1000" class="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0" scroll-region>
                <transition enter-active-class="ease-out duration-300"
                        enter-from-class="opacity-0"
                        enter-to-class="opacity-100"
                        leave-active-class="ease-in duration-200"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0">
                    <div v-show="show" class="fixed inset-0 transform transition-all" @click="close">
                        <div class="absolute inset-0 bg-gray-500 opacity-50"></div>
                    </div>
                </transition>

                <transition enter-active-class="ease-out duration-300"
                    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div class="flex flex-col justify-center">
                        <div v-show="show" class="mb-8 mt-6 sm:mt-12 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full sm:mx-auto" :class="maxWidthClass">
                            <slot v-if="show"></slot>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </teleport>
</template>

<script setup>
import { watchEffect, computed} from 'vue'
const props = defineProps({
    maxWidth: {
        default: '2xl'
    },
    show: {
        default: false
    },
    closeable: {
        default: true
    }
})

watchEffect(() => {
    if (props.show) {
        document.body.classList.add('overflow-hidden')
    }
    else {
        document.body.classList.remove('overflow-hidden')
    }
})

const emit = defineEmits(['close'])

const close = () => {
    if (props.closeable) {
        emit('close')
    }
}

const maxWidthClass = computed(() => {
    return  {
        'sm': 'max-w-sm',
        'md': 'max-w-md',
        'lg': 'max-w-lg',
        'xl': 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
    }[props.maxWidth]
})

const closeOnEscape = (e) => {
    if (e.key === 'Escape' && props.show) {
        close()
    }
}
</script>
