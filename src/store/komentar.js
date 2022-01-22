import axios from "axios"
export const komentar = {
    state: () => ({
       komentar:[],
    }),

    actions: {
        loadKomentar({commit}){
            axios.get('/komentar').then((response) => {
                commit('setKomentar', response.data)
            })
        }
    },

    mutations: {
        setKomentar(state, data){
            state.komentar = data
        },
        setPushKomentar(state, data){
            state.komentar.push(data)
        }
    },

    getters: {
        getKomentar(state){
            return state.komentar
        }
    }
}