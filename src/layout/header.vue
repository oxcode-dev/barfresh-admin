<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="flex items-center justify-end px-4 py-4">
        <div class="flex items-center space-x-8">
            <router-link to="/" class="relative hidden">
                <sup class="absolute right-1 top-1 border border-white bg-red-500 p-1 rounded-full"></sup>
                <span class="text-gray-400" v-html="notificationIcon"></span>
            </router-link>
            <div>
                <router-link to="/profile">
                    <img :src="authUser?.photoURL || avatar" class="w-16  rounded-full" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore()
const authUser = computed(() => authStore.getAuthUserDetail || {})

const avatar = ref('https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg')
const notificationIcon = ref(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>`)

</script>