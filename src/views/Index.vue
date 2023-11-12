<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Layout>
    <main class="text-red-600">
      <!-- <pre>{{ getAuthUserDetail }}</pre> -->
      <!-- <pre>{{ usersDetail }}</pre> -->
      <pre>{{ user }}</pre>


      <!-- {{ imageArray }} -->
    </main>
  </Layout>
</template>

<script setup>
import Layout from '../layout/index.vue'
import { onMounted, computed, ref as vueRef} from 'vue'
import { useUsersStore }from '../stores/users'
import { useAuthStore } from '../stores/auth';
import { auth } from '../firebase.config';

const user = computed(() => auth.currentUser || {})

const authStore = useAuthStore()
const getAuthUserDetail = computed(() => authStore.getAuthUserDetail || [])

const usersStore = useUsersStore()
const usersDetail = computed(() => usersStore.getUsers || [])

onMounted(() => {
  usersStore.fetchUsers()
})

</script>