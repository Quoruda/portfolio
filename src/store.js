import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        hasBooted: false,
    }),
    actions: {
        boot() {
            this.hasBooted = true
        }
    },
    persist: true
})