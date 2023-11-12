<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <main>
        <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <div class="flex justify-center my-4">
                    <img src="@/assets/logo.png" class="w-20" />
                </div>
                <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                    <form @submit.prevent="submit" class="px-5 py-7">
                        <p v-if="error" class="text-xs text-red-500 pb-4">
                            {{ error }}
                        </p>
                        <div>
                            <label class="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                            <input required v-model="form.email" type="email" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                        </div>
                        
                        <div>
                            <label class="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                            <input type="password" required v-model="form.password" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                        </div>
                        
                        <button :disabled="isLoading" type="submit" class="transition duration-200 bg-green-700 hover:bg-green-600 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                            <span v-if="!isLoading">
                                <span class="inline-block mr-2">{{ isLogin ? 'Login' : 'Sign Up' }}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            <span v-else>
                                Loading...
                            </span>
                        </button>
                    </form>
                    
                    <div class="py-5 sm:px-4 sm:text-sm text-xs">
                        <div class="grid grid-cols-2 gap-1">
                            <div class="text-center sm:text-left whitespace-nowrap">
                                <button class="transition duration-200 px-3 py-4 cursor-pointer font-normal rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block align-text-top">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                    </svg>
                                    <span class="inline-block ml-1">Forgot Password</span>
                                </button>
                            </div>
                            <div class="text-center sm:text-right whitespace-nowrap">
                                <button type="button" @click="switchForm" class="transition duration-200 px-2 py-4 cursor-pointer font-normal rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block align-text-bottom	">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    <span v-if="!isLogin" class="inline-block ml-1">Login</span>
                                    <span v-else class="inline-block ml-1">Create an Account</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { auth } from '../firebase.config';
import { onAuthStateChanged } from "firebase/auth";
import router from "../router";
import { useAuthStore } from "../stores/auth";
import { useFirebaseAuth } from "../composables/useFirebaseAuth";

const authStore = useAuthStore()

const isLogin = ref(true)

const {error, isLoading, handleSignIn, handleSignUp} = useFirebaseAuth()

const form = ref({
    email: null,
    password: null,
})


const switchForm = () => {
    isLogin.value = !isLogin.value
    error.value = ''
    form.value = {
        email: null,
        password: null,
    }
}

async function submit() {
    if(isLogin.value) {
        handleSignIn(form.value.email, form.value.password)
    }
    else {
        handleSignUp(form.value.email, form.value.password)
    }
}

onBeforeMount(() => {
    onAuthStateChanged(auth, (user) => {
        if(user && user.uid !== '') {
            authStore.saveAuthUser(user)
            router.push('/')
        }
    })
})
</script>