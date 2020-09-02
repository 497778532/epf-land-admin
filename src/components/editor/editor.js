import editor from "./editor.vue"
const switch_T = {
    install: function(Vue){
        Vue.component("editor", switch_T)
    }
}
export default editor