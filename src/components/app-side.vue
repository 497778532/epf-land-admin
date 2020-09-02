<template>
  <v-menu 
    class="side-menu"
    :collapse="collapse"
    :default-active="defaultActive"
    :menus="menus"
    :background-color="theme.MenuBg"
    :text-color="theme.MenuColor"
    :active-text-color="theme.MenuActiveColor">
  </v-menu>
</template>
<script type="text/javascript">
import VMenu from './vmenu'
import Bus from '../utils/bus.js'
export default {
  props: {
    collapse: Boolean,
  },
  components: {
    VMenu
  },
  data () {
    return {
      menus: [],
      defaultActive: 'home',
      test: 'asdfasdf',
      busType: 'watch',
      localMenuDown: false,
      theme: {
        NavBg: "#282f32", //导航背景色
        NavColor: "#ffffff", //导航字体颜色
        NavActiveColor: "#fea200", //导航字体焦点颜色
        MenuBg: "#282f32", //菜单背景色
        MenuColor: "#ffffff", //菜单字体颜色
        MenuActiveColor: "#fea200" //菜单字体焦点颜色
      },
      
    }
  },
  watch: {
    $route () {
      this.setCurrentRoute()
    },
    localMenuDown: {
      handler: function (newValue) {
        this.getMenu()
      }
    }
  },
  mounted () {
    this.$bus.$on('describe', val => {
      this.busType = 'describe'
      this.getMenu(val)
    })
    this.$bus.$on('menuData', val => {
      this.localMenuDown = true
    })
    this.$bus.$on('setTheme',(res)=>{
      this.theme = res
    })
  },
  methods: {
    getMenu (val) {
      let activeIndex = 0
      if (localStorage.getItem('menuData') === null || localStorage.getItem('menuData') === '') {
        this.busType = 'watch'
        return null
      }
      if (localStorage.getItem('menuData')) {
        let res = JSON.parse(localStorage.getItem('menuData'))
        let newVal = val == undefined ? 'supplyDemand' : val
        res.menus.map((item, index) => {
          if (item.url == newVal) {
            activeIndex = index
          }
        })
        this.menus = res.menus[activeIndex]['childMenu']
        return null
      }
    },
    setCurrentRoute () {
      this.defaultActive = this.$route.name
    }
  },
  created () {
    this.setCurrentRoute()
    this.getMenu()
  }
}
</script>
<style type="text/css" scoped>
.el-menu.side-menu {
  border-right: none;
}
.el-menu .fa {
  font-size: 18px;
  margin-right: 7px;
  display: inline-block;
  width: 23px;
  text-align: center;
}
.el-menu.side-menu .el-menu-item.is-active {
  border-right: solid 3px #fea200;
  min-width: 188px !important;
}
.el-menu--inline .el-menu-item-group .el-menu-item-group__title {
  padding: 0 !important;
}
</style>
