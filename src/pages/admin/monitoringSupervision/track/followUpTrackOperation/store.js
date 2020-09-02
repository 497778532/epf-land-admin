import Vue from 'vue'
const state = {
    trackDetail: {}
}
const mutations = {
    to_detail(state, rows) {
        state.trackDetail = rows;
    },
}


export default {
    namespaced: true,
  state,
  mutations,
}