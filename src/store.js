import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        hasBooted: false,
        pixyHasFinishedHisPresentation: false
    }),
    actions: {
        boot() {
            this.hasBooted = true
        },

        finishPixyPresentation() {
            this.pixyHasFinishedHisPresentation = true
        }
    },
    persist: true
})