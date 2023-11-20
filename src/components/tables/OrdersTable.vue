<!-- eslint-disable vue/valid-template-root -->
<template>
    <div class="flex flex-col">
        <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div class="py-2 inline-block min-w-full">
                <div class="overflow-hidden">
                    <table class="min-w-full">
                        <thead class="bg-white border-b">
                            <tr>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Biller Name
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Date
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Total
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-gray-100 border-b" v-for="(option, key) in orders" :key="key">
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap block">
                                    <router-link class="w-full h-full" :to="`/orders/${option.id}`">
                                        {{ option?.name || 'N/A' }}
                                    </router-link>
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <router-link :to="`/orders/${option.id}`" class="w-full h-full">
                                        <span>{{ convertTimestamp(option.created_at) }}</span>
                                    </router-link>
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <router-link :to="`/orders/${option.id}`" class="h-full w-full">
                                        £ {{ option?.total || 0 }}
                                    </router-link>
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <router-link :to="`/orders/${option.id}`"  class="w-full h-full">
                                        {{ option?.status || 'N/A' }}
                                    </router-link>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useFirebaseDB } from '../../composables/useFirebaseDB'

const { convertTimestamp } = useFirebaseDB()


const props = defineProps({
    orders: Array,
})
</script>
