<template>
    <form @submit.prevent="onSubmit" class="flex flex-col max-w-md bg-red-500 m-auto h-80 my-12 p-6 rounded-lg">
        <label class="text-white text-lg">Username</label>
        <input type="email" v-model="username.value" :ref="username.ref" class="h-10 focus:outline-none px-2 py-2.5 mb-2 bg-white rounded" />
        <p class="text-white" v-if="username.error">{{ username.error.message }}</p>
        <label class="text-white text-lg">Password</label>
        <input v-model="password.value" :ref="password.ref" type="password" class="h-10 focus:outline-none px-2 py-2.5 mb-2 bg-white rounded" />
        <p class="text-white" v-if="password.error">{{ password.error.message }}</p>
        <button type="submit" class="text-white bg-blue-600 rounded py-2 my-3">submit</button>
    </form>
</template>

<script setup>
import { useForm } from 'vue-hooks-form'

const { useField, errors, validateFields } = useForm({
    defaultValues: {
        username: 'info@talent1.com',
        password: 'word1223'
    },
    'validateMode': 'submit'
})
const username = useField('username', {
    rule: { required: true },
    // validator: (rule, value) => {
    //     var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //     if (value !== 'Bob') {
    //     // if(!value.match(validRegex)) {
    //         return new Error('username must be Bob!')
    //     }
    //     console.log(rule, value)
    //     return true
    // },
})
const password = useField('password', {
    rule: {
        required: true,
        min: 6,
        max: 10,
    },
})

const onSubmit = async() => {
    await validateFields()
    console.log(username.value, errors)
}

</script>