<template>
  <el-menu
    :mode="mode"
    :collapse="collapse"
    class="leftMenu"
    :backgroundColor="backgroundColor"
    :textColor="textColor"
    :activeTextColor="activeTextColor"
    :defaultActive="defaultActive"
    :defaultOpeneds="defaultOpeneds"
    :uniqueOpened="uniqueOpened"
    :menuTrigger="menuTrigger"
    @open="open"
    @close="close"
    @select="select"
  >
    <template v-for="item in menus">
      <template>
        <el-submenu
          v-if="item.childMenu.length!= 0 && item.menuType=='zuobiancaidan'"
          :key="item.id"
          :index="item.id"
          :title="item.menuname"
        >
          <template slot="title">
            <i v-if="item.iconCls" :class="item.iconCls"></i>
            <span slot="title" :style="{fontSize:fontSize}">
              {{item.menuname}}
            </span>
          </template>
          <menu-list :menus="item.childMenu"></menu-list>
        </el-submenu>
        <el-menu-item
          v-else-if="item.menuType=='zuobiancaidan'"
          :key="item.id"
          :index="item.resourceId?item.resourceId:item.url"
          :route="toRoute(item)"
          :title="item.menuname"
        >
          <i v-if="item.iconCls" :class="item.iconCls"></i>
          <span slot="title" :style="{fontSize:fontSize}">
            {{item.menuname}}
          </span>
        </el-menu-item>
      </template>
    </template>
    <!-- 由于缩小侧边栏问题，不能直接使用menu-list组件 -->
    <!-- <menu-list :menus="menus"></menu-list> -->
  </el-menu>
</template>
<script type="text/javascript">
import { mapActions, mapState } from "vuex";
import menuList from "./chunk";
export default {
  name: "VMenu",
  props: {
    mode: {
      type: String,
      default: "vertical"
    },
    collapse: {
      type: Boolean,
      default: false
    },
    backgroundColor: String,
    textColor: String,
    activeTextColor: String,
    defaultActive: String,
    defaultOpeneds: Array,
    uniqueOpened: Boolean,
    menuTrigger: String,
    router: Boolean,
    menus: {
      type: Array,
      required: true
    }
  },
  data(){
    return{
      fontSize:'12px'
    }
  },
  created(){
    this.$bus.$on("setFontSize", res => {
      //设置字体尺寸
      this.fontSize = res;
    });
  },
  components: {
    menuList
  },
  methods: {
    ...mapActions(["setTabsList"]),
    isArr(v) {
      return Object.prototype.toString.call(v) === "[object Array]";
    },
    toRoute(item) {
      localStorage.setItem(item.resourceId, JSON.stringify(item.childButton));
      console.log("item", item);

      return {
        name: item.menuname,
        path: item.url,
        params: { menuId: item.id }
      };
    },
    open(index) {
      this.$emit("open", index);
    },
    close(index) {
      this.$emit("close", index);
    },
    select(index, tabs, event) {
      console.log("点击的路由", event);
      let title = event.$attrs.title;
      let routerPath = index;
      let params = event.$options.propsData.route.params;
      let tabObj = { title, routerPath, params };

      // 将当前点击的选项添加到vuex中
      this.setTabsList(tabObj);
      this.$router.push({ path: routerPath, params: params });
      // this.$bus.$emit('clickMenu')
      this.$emit("select", index, params);
    }
  },
  watch: {
    menus: {
      handler(newValue, oldValue) {
        console.log("left", newValue);
      },
      deep: true
    }
  }
};
</script>
<style type="text/css">
.el-menu.side-menu {
  border-right: none;
}
.el-menu .fa {
  font-size: 15px;
  margin-right: 0px;
  display: inline-block;
  width: 23px;
  text-align: center;
  color: inherit;
}
.leftMenu .el-menu-item.is-active {
  background-color: #282f32;
}
</style>
