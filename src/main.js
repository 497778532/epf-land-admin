// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'es6-promise/auto'
// import Es6Promise from 'es6-promise'
// require('es6-promise').polyfill()
// Es6Promise.polyfill()
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

import ElementUI, { Alert } from 'element-ui'
import Axios from 'axios'
import { get, post, useAppend, deletes, put } from './utils/http'
import NProgress from 'nprogress'
import VDistpicker from 'v-distpicker'
import Print from 'vue-print-nb'
import {
  MessageBox
} from 'element-ui'
import { validateNum} from "@/utils/checkFormNum.js";
import { NumToChinese,Division } from "@/utils/numToChinese.js";

Vue.use(Print);  //注册
Vue.use(ElementUI)

import App from './App'
import store from './store'
import router from './router'

//可关闭标题插件
import switchTitle from './components/switchTitle/switchTitle'
//附件清单插件
import annexList from './components/annexList/annexList'


//动态路由
import _router from './promission'
import '@/assets/font-awesome-4.7.0/css/font-awesome.min.css'
import '@/assets/css/main.css'
import '@/assets/css/scrollbar.css'
import '@/assets/css/reset.css'
import '@/assets/css/changeElStyle.css'
import '@/assets/css/umi.css'
import 'nprogress/nprogress.css'
import 'animate.css'
import "@/assets/css/base.less";
import animated from 'animate.css'
import globalComponents from './utils/componentsAll'


import DropdownPlugin from './m/dropdown'
import NavbarPlugin from './m/navbar'
import ContextMenuPlugin from './m/context-menu'
import MButton from '@/m/button'
import MSwitch from '@/m/switch'
import MAlert from '@/m/alert'
import MCheckbox from '@/m/checkbox'
import MInput from '@/m/input'
import MLoading from '@/m/loading'
import Mkeyboard from '@/m/keyboard'
import MNumberkeyboard from '@/m/number-keyboard'
import MBox from '@/m/box'
import MBackTop from '@/m/back-top'
import MLoader from '@/m/loader'
import MContainer from '@/m/container'
// 引入自定义组件
import commonComponents from "./components/common/common";
import rightmenu from './components/common/rightMenu//index.js'
const pkg = require('../package.json')

import bus from './utils/bus';
import '@/assets/css/common.css'
import tinymceVue from '@tinymce/tinymce-vue'



//自定义全局组件
import container from './components/container/container'
import contractFiltrate from './components/contractFiltrate/contractFiltrate'
//  基座API
import BASICS_API from './api/api'


//  挂载方法与变量至原型
Vue.prototype.$API = BASICS_API
Vue.prototype.validateNum = validateNum
Vue.prototype.NumToChinese = NumToChinese
Vue.prototype.Division=Division



Vue.use(switchTitle)
Vue.use(annexList)
Vue.use(container)
Vue.use(contractFiltrate)
Vue.use(globalComponents)
Vue.use(DropdownPlugin)
Vue.use(NavbarPlugin)
Vue.use(ContextMenuPlugin)
Vue.use(MButton)
Vue.use(MSwitch)
Vue.use(MAlert)
Vue.use(MCheckbox)
Vue.use(MInput)
Vue.use(MLoading)
Vue.use(Mkeyboard)
Vue.use(MNumberkeyboard)
Vue.use(MBox)
Vue.use(MBackTop)
Vue.use(MLoader)
Vue.use(MContainer)
//自定义组件名
Vue.component('epf-container',container)
Vue.component('contractFiltrate',contractFiltrate)

Vue.component('v-distpicker', VDistpicker)
Vue.component('tinymceEditor', tinymceVue)
Vue.component('EPF-switchTitle', switchTitle)
Vue.component('EPF-annexList',annexList)

Vue.use(animated)
Vue.use(commonComponents)
Vue.use(rightmenu)

var whiteList = ['demo', 'login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  let token = sessionStorage.getItem('token')
  if (!token && whiteList.indexOf(to.name) === -1) {
    app && app.$message.warning('未授权，请登陆授权后继续')
    NProgress.done()
    return next({ name: 'login' })
  } else { // 已登录的情况下刷新
    if (token && !store.state.routerData) {
      _router.setNeedRouter()
      NProgress.done()
      return next()
    }
  }
  NProgress.done()
  return next()
})

router.afterEach(transition => {
  setTimeout(() => {
    NProgress.done()
  })
})

router.onError(() => {
  router.push({ path: '/500' })
})


window.APP_INFO = {
  projectName: pkg.name,
  version: pkg.version,
  description: pkg.description,
  author: pkg.author,
  appName: pkg.app && pkg.app.name || pkg.appName,
  dependencies: pkg.dependencies,
  engines: pkg.engines,
  license: pkg.license
}

// status < 500 不会抛错误
Axios.defaults.validateStatus = status => {
  return status < 500
}
// 设置请求token
Axios.interceptors.request.use(config => {
  var token = sessionStorage.getItem('token')
  config.headers['token'] = sessionStorage.getItem('token')
  // console.log(config)
  return config
})

// 接口错误拦截
Axios.interceptors.response.use(res => {
   let result=res.data;
   debugger
  if (result.code == 403) {
    MessageBox.confirm('需要重新登录，是否前往？','token已失效!', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      closeOnClickModal:false,
      closeOnPressEscape:false,
    }).then(() => {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      router.push({ name: 'login' })
      return Promise.reject(new Error('身份过期'))
    }).catch(() => {})
  } else {
    return res.data
  }
}, err => {
  app.$notify.error({
    title: '服务错误',
    message: '服务器响应错误 ' + err.message
  })
  return Promise.reject(err)
})

Vue.prototype.$bus = bus
Vue.prototype.$http = Axios
Vue.http = Axios

//  封装好的axios
// Vue.get = get
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$put = put
Vue.prototype.$useAppend = useAppend


Vue.config.productionTip = false

/* eslint-disable no-new */
var app = new Vue({
  mode: 'history',
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

window.app = app

