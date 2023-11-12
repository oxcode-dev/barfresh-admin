<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Layout>
        <div class="flex flex-wrap h-full sm:h-[calc(100vh-200px)] sm:overflow-hidden">
            <div class="w-full sm:w-1/3 h-full">
                <div class="mr-4 bg-white rounded-lg py-4 h-full px-4 w-full">
                    <nav class="py-6 w-full">
                        <a 
                            v-for="(nav, key) in navs" :key="key"
                            href="#" @click.prevent="tab = key"
                            class="hover:text-green-700 hover:bg-green-100 w-full px-6 inline-flex py-4"
                            :class="tab === key ? 'text-green-700 bg-green-100' : 'text-slate-500'"
                        >
                            {{ nav }}
                        </a>
                    </nav>
                </div>
            </div>
            <div class="w-full sm:w-2/3 h-full mb-4">
                <div class="ml-4 bg-white overflow-y-auto rounded-lg py-4 h-full px-6">
                    <ChangePasswordForm v-if="tab === 0" />
                    <ChangeUserEmailForm v-if="tab === 1" />
                    <DeleteUserForm v-if="tab === 2" />
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import Layout from '../layout/index.vue'
import { ref } from 'vue';
import ChangePasswordForm from '../forms/ChangePasswordForm.vue'
import DeleteUserForm from '../forms/DeleteUserForm.vue'
import ChangeUserEmailForm from '../forms/ChangeUserEmailForm.vue';

const tab = ref(0)
const navs = ref(['Change Password', 'Update Email', 'Delete Account'])
</script>