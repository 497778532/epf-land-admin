<template>
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane v-for="item in data" :key="item.name" :lazy="true" :label="item.name" :name="item.name">
      <Java :value="item.content" :height="height" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Java from '@/components/JavaEdit/index'
export default {
  name: 'Preview',
  components: { Java },
  data() {
    return {
      data: null, height: '', activeName: 'Entity'
    }
  },
  created() {
    var that=this;
    this.height = document.documentElement.clientHeight - 180 + 'px'
    var tableName = that.$route.query.tableName
    that.$post('/epf-generator/api/generator/' + tableName + '/1').then(data => {
      that.data = data
    }).catch(() => {
      that.$router.go(-1)
    })
  }
}
</script>
