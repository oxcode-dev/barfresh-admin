<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <main class="text-red-600 w-[400px] mx-auto my-8">
        <input type="file" ref="input" @change="uploadImage" />
        <button @click="uploadFile" class="block my-10 py-2 text-center px-2 bg-red-600 text-white">Upload</button>


        <div class="flex flex-col">
            <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div class="py-2 inline-block min-w-full">
                    <div class="overflow-hidden">
                        <table class="min-w-full">
                            <thead class="bg-white border-b">
                                <tr>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        #
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        First
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Last
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Handle
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-gray-100 border-b">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Mark
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Otto
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        @mdo
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
  
<script setup>
import { ref as vueRef} from 'vue'
import { storage } from '../firebase.config';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    // listAll,
    // list,
} from "firebase/storage";
import { v4 } from 'uuid';
  
const input = vueRef(null)
const imageArray = vueRef(null)
  
const uploadImage = (e) => {
    imageArray.value = e.target.files[0]
    // console.log(imageArray)
    // const image = e.target.files[0];
    // const reader = new FileReader();
    // reader.readAsDataURL(image);
    // reader.onload = e =>{
    //     // this.previewImage = e.target.result;
    //     console.log(e.target.result);
    // };
}
  
// const imagesListRef = ref(storage, "images/");

const uploadFile = () => {

    if (imageArray.value === null) return;

    const imageRef = ref(storage, `images/${imageArray.value.name + v4()}`);
    uploadBytes(imageRef, imageArray.value).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            console.log(url)
            // setImageUrls((prev) => [...prev, url]);
        });
    });
};
  
</script>