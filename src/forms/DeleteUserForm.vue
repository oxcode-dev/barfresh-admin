<template>
    <div>
        <form @submit.prevent="deleteUser">
            <h2 class="pb-6 py-4 text-2xl">
                Delete Account
            </h2>
            <div class="my-1 pt-2 pb-8 space-y-4">
                <p>Are you sure you want to completely delete your account? This process cannot be reversed.</p>
                <p>Kindly provided your email address to confirm delete.</p>
            </div>

            <div class="my-1">
                <label class="font-semibold text-sm text-gray-600 pb-1 block">Email</label>
                <input type="email" required v-model="form.email" class="border rounded-lg px-3 py-3 mt-1 mb-5 text-sm w-full" />
            </div>

            <button :disabled="isLoading" type="submit" class="transition duration-200 bg-green-700 hover:bg-green-600 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 text-white w-full py-3 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                <span>
                    {{ isLoading ? 'Loading...' : 'Delete Account' }}
                </span>
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { auth } from '../firebase.config';
import { useFirebaseAuth } from '../composables/useFirebaseAuth';

const form = ref({
    email: null,
})

const { isLoading, handleDeleteUser} = useFirebaseAuth()

const user = auth.currentUser;

const deleteUser = () => {
    if(user.email === form.value.email){
       handleDeleteUser()
    }
}

</script>