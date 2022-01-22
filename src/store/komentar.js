import axios from "axios"
export const komentar = {
    state: () => ({
       komentar:[],
       komen:{}
    }),

    actions: {
        loadKomentar({commit}){
            axios.get('/komentar').then((response) => {
                commit('setKomentar', response.data)
            })
        },
        getKomentarArray({commit, state}, id){
            let index = state.komentar.map(k => k.id).indexOf(id);
            commit('setKomen', state.komentar[index])
        }
    },

    mutations: {
        setKomentar(state, data){
            state.komentar = data
        },
        setPushKomentar(state, data){
            state.komentar.push(data)
        },
        setKomen(state, data){
            state.komen = data
        }
    },

    getters: {
        getKomentar(state){
            return state.komentar
        },
        getKomen(state){
            return state.komen
        }
    }
}