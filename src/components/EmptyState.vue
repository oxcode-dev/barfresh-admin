<template>
    <div class="w-full flex flex-col justify-center py-4 md:py-12 object-contain">
        <img 
            class="w-auto h-28 sm:h-48 object-contain px-12" 
            :src="img"
        />
        <div class="w-full md:max-w-xl mx-auto my-2 md:my-8 flex flex-col justify-center">
            <h2 class="sm:my-3 text-center text-lg md:text-2xl">
                No Data Found!
            </h2>
            <div class="text-center pb-5 pt-2 text-gray-500 text-sm">
                <p>
                    Whoops... Data is not available.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const img = ref('https://cdn.icon-icons.com/icons2/2483/PNG/512/empty_data_icon_149938.png')
</script>