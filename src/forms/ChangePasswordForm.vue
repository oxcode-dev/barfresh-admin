<template>
    <div>
        <form @submit.prevent="handleUpdatePassword">
            <h2 class="pb-6 py-4 text-2xl">
                Change Password
            </h2>
            <div class="my-1 pt-2">
                <label class="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                <input type="password" required v-model="form.password" class="border rounded-lg px-3 py-3 mt-1 mb-5 text-sm w-full" />
            </div>

            <div class="my-1">
                <label class="font-semibold text-sm text-gray-600 pb-1 block">Confirm New Password</label>
                <input type="password" required v-model="form.password_confirm" class="border rounded-lg px-3 py-3 mt-1 mb-5 text-sm w-full" />
            </div>

            <button :disabled="isLoading" type="submit" class="transition duration-200 bg-green-700 hover:bg-green-600 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 text-white w-full py-3 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                <span>
                    {{ isLoading ? 'Loading...' : 'Change Password' }}
                </span>
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFirebaseAuth } from '../composables/useFirebaseAuth';

const form = ref({
    password: null,
    password_confirm: null,
})

const { isLoading, handleChangePassword} = useFirebaseAuth()

const handleUpdatePassword = () => {
    let regex = /^(?=.*[0-9])[a-zA-Z0-9]{6,16}$/;
    // let regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if(!regex.test(form.value.password)){
        return alert('Password length must be at least 6 characters, including UPPER/lowercase, and number.')
    }

    if(form.value.password !== form.value.password_confirm) {
        return alert("Passwords don't match")
    }

    if(form.value.password === form.value.password_confirm) {
        handleChangePassword(form.value.password) 
        form.value = {
            password: null,
            password_confirm: null,
        }
    }
}
</script>