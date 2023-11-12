import { defineStore, acceptHMRUpdate } from 'pinia'

export const useCounterStore = defineStore("counter", {
  state: () => {
    return {
     count: 0,
    };
  },

  persist: true,
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot))
}