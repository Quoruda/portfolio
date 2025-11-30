import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        hasBooted: false,
        pixyHasFinishedHisPresentation: false,
        hasClickedProfile: false
    }),
    actions: {
        boot() {
            this.hasBooted = true
        },

        finishPixyPresentation() {
            this.pixyHasFinishedHisPresentation = true
        },

        markProfileAsClicked() {
            this.hasClickedProfile = true
        }
    },
    persist: true
})