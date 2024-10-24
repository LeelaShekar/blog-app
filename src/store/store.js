import { defineStore } from 'pinia';
 

const noteAppStore = defineStore('note', {
    state:  () => {
        return {
            noteDetails:{},
            loginDetails: {}
        }
    },
    getters : {
        getNoteDetails: (state) => state.noteDetails,
        getLoginDetails : (state) => state.loginDetails
    },
    actions : {
        updateNoteDetails (noteDetails) {
          
            this.noteDetails = noteDetails
            console.log( this.noteDetails)
        },

        submitLoginForm (loginDetails){ 
                this.loginDetails = loginDetails
        }
    }
})

export default noteAppStore;