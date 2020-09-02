<template>
<el-menu-item-group>
<template v-for="item in menus">
  <!-- <template v-if="isArr(item)">
  <el-menu-item-group
    :title="typeof item[0] === 'string' ? item[0] : ''"
    >
    <el-menu-item
      v-for="(val, index) in item[1]"
      :key="index"
      :index="val.id + ''"
      :route="toRoute(val)"
      >
      <i v-if="val.icon" :class="val.icon"></i>
      <span slot="title">{{val.label}}11</span>
    </el-menu-item>
  </el-menu-item-group>
  </template> -->
  <template>
    <el-submenu
      v-if="item.submenu"
      :key="item.id"
      :index="item.id + ''"
      >
      <template slot="title">
        <i v-if="item.icon" :class="item.icon"></i>
        <span slot="title">{{item.label}}11</span>
      </template>
      <menu-list :menus="item.submenu"></menu-list>
    </el-submenu>
    <el-menu-item
      v-else
      :key="item.id"
      :index="item.id + ''"
      :route="toRoute(item)"
      >
      <i v-if="item.icon" :class="item.icon"></i>
      <span slot="title">{{item.label}}11</span>
    </el-menu-item>
  </template>
</template>
</el-menu-item-group>
</template>
<script type="text/javascript">
export default {
  name: 'menu-list',
  props: {
    menus: Array
  },
  mounted(){
    console.log(123);
  },
  methods: {
    isArr (v) {
      return Object.prototype.toString.call(v) === '[object Array]'
    },
    toRoute (item) {
     return { name: item.menuname, path:item.url,params:{menuId:item.id}}
    }
  }
}
</script>
