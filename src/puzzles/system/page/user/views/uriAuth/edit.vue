<template>
  <div id="deployCenter-edit">

    <el-form
      :model="advertData"
      :rules="rules"
      ref="addDeploy"
      label-position="left"
    >
      <el-row style="margin-left:20px">
        <el-col :span="12">
          <el-form-item label-width="4em" label="服务名" prop="application">
            <el-select v-model="advertData.applicationName" style="margin-left:20px;width:75%" class="select-cs" placeholder="服务名">
              <el-option
                v-for="item in listApps"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="4em" label="URI" prop="name">
            <el-input v-model="advertData.uri" placeholder="请输入name" style="width:80%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-left:20px">
        <el-col :span="12">
          <el-form-item label-width="4em" label="版本号" prop="version">
            <el-input v-model="advertData.version" placeholder="请输入版本号"  style="width:80%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="4em" label="权限" prop="label">
            <el-select v-model="advertData.permissionStatus" style="margin-left:20px;width:75%" class="select-cs" placeholder="鉴权类型">
              <el-option
                v-for="item in perStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>


    <div slot="footer" class="dialog-footer" style="text-align: center">
      <el-button type="primary" @click="saveChangeData">保存</el-button>
      <el-button @click="cancel">关闭</el-button>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'

  export default {
    name: 'deployCenter-edit',
    props: {
      advertData: Object
    },
    data () {
      return {
        rules: {},
        disabled: false,
        isType: false,
        perStatus:[{value:'0',label:'禁用'},{value:'1',label:'鉴权'},{value:'2',label:'放行'}],
        listApps:[],
      }
    },
    created () {
      this.listApps=this.advertData.listApps;
    },
    methods: {
      cancel () {
        this.$emit('cancel')
      },
      saveChangeData () {
        let that = this;
        this.$post('/epf-admin/appUri/edit', that.advertData).then(res => {
          if (res.code != '0') {
            this.$message.error(res.msg) //失败
            return
          }
          that.$emit('cancel')
          that.$message.success('保存成功')
        }).catch(error => {
        })
      },

    }
  }
</script>

<style scoped>
  .el-select {
    width: 100%;
  }

  .interface {
    max-height: 100px;
    overflow: auto;
  }

  .button-cs {
    display: inline-block;
  }
</style>
