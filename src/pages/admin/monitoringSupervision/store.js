import Vue from 'vue'
const state = {
    myDetail: {}
}
const mutations = {
    to_detail(state, rows) {
        state.myDetail = rows;
    },
}


export default {
    namespaced: true,
    state,
    mutations
}