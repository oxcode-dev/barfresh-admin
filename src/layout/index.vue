<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="absolute h-screen w-full bg-slate-100 overflow-hidden">
        <section class="h-full">
            <div class="opacity-75 z-[510] h-full w-full bg-gray-700 fixed" :class="showSidebar ? 'flex sm:hidden' : 'hidden'" @click="showSidebar = false"></div>
            <aside 
                :class="showSidebar ? 'flex' : 'hidden sm:flex'" 
                class="h-full w-[270px] border-r shadow-md bg-slate-100 z-[550] fixed top-0"
            >
                <a href="#" class="md:hidden absolute right-6 top-4" @click="showSidebar = false">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </a>
                <Sidebar class="w-full" />
            </aside>
            <main class="px-0 w-full md:w-auto">
                <div class="md:pl-[320px] z-[500] right-2 w-full h-24 top-4 px-6 md:px-4 md:pr-8" :class="!showSidebar ? 'absolute' : 'fixed'">
                    <div class="bg-white w-full h-full rounded-lg relative">
                        <a href="#" class="md:hidden absolute left-4 top-10" @click="showSidebar = true">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" /></svg>
                        </a>
                        <Header></Header>
                    </div>
                </div>
                <div class="md:pl-[310px] pt-32 overflow-y-auto h-screen md:px-10 md:pl-2 px-4 pr-8">
                    <div class="mt-6 mb-16">
                        <slot></slot>
                    </div>
                </div>
            </main>
        </section>
    </div>
</template>

<script setup>
import Sidebar from './sidebar.vue';
import Header from './header.vue';
import { ref } from 'vue';

const showSidebar = ref(false)
</script>