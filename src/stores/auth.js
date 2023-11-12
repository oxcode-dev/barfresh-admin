import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAuthStore = defineStore("auth", {
  persist: true,
  state: () => {
    return {
     auth: {},
    };
  },

  actions: {
    saveAuthUser(auth) {
      this.auth = auth
    }, 
    clearAuthUser() {
      this.auth = {}
    }
  },

  getters: {
    getAuthUser: (state) => state.auth,
    getAuthUserDetail: (state) => {
      if(state.auth && state.auth.email){
        return {
          displayName: state?.auth?.displayName || '',
          email: state?.auth?.email || '',
          photoURL: state?.auth?.photoURL || '',
          emailVerified: state?.auth?.emailVerified || false,
          uid: state?.auth?.uid || '',
        }
      }
      return {}
    }
  },

});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}