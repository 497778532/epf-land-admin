import Vue from 'vue'
const state = {
    collectDetail: {}
}
const mutations = {
    to_detail(state, rows) {
        state.collectDetail = rows;
    },
}


export default {
    namespaced: true,
  state,
  mutations,
}