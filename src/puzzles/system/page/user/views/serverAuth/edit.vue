<template>
  <!--
    @name: 数据发布服务--编辑弹框
   	@description: 主要是编辑数据发布服信息
  -->
  <div id="deployCenter-edit">

      <el-form
        :model="advertData"
        :rules="rules"
        ref="advertData"
        label-position="left"
      >
        <el-row style="margin-left:20px">
          <el-col :span="12">
            <el-form-item label-width="4em" label="服务名" prop="application">
              <el-input v-model="advertData.application" placeholder="请输入application" disabled style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label-width="4em" label="配置名" prop="name">
              <el-input v-model="advertData.name" placeholder="请输入name" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-left:20px">
          <el-col :span="12">
              <el-form-item label-width="3em" label="键" prop="key1">
                <el-select v-model="advertData.key1" style="margin-left:20px;width:75%" class="select-cs" placeholder="鉴权类型">
                  <el-option
                    v-for="item in listType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label-width="4em" label="值" prop="value1">
              <el-input v-model="advertData.value1" placeholder="请输入value1" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-left:20px">
          <el-col :span="12">
            <el-form-item label-width="4em" label="配置" prop="profile">
              <el-input v-model="advertData.profile" placeholder="请输入配置" disabled style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label-width="4em" label="标签" prop="label">
              <el-input v-model="advertData.label" placeholder="请输入标签" disabled style="width:80%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-left:20px" v-if="isType">
          <el-col :span="12">
            <el-form-item label-width="3em" label="分类" prop="profile">
              <el-select v-model="advertData.type" style="margin-left:20px;width:75%" disabled class="select-cs" placeholder="请选择分类">
                <el-option
                  v-for="item in listType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- <el-form-item label-width="4em" label="标签" prop="label">
              <el-input v-model="advertData.label" placeholder="请输入label" disabled style="width:80%"></el-input>
            </el-form-item> -->
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
  name: "deployCenter-edit",
  props: {
    advertData: Object
  },
  data() {
    return {

      rules: {
      },
      disabled: false,
      isType:false,
      listType:[{value:'epf.service.requestPwd',label:'加密'},{value:'epf.service.requestPwdKey',label:'解密'}],
    };
  },
  created () {
    let that = this
    if(that.advertData.application=="epf-common"){
      that.isType = true
    }
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    saveChangeData (){
      debugger
      let that = this;
      delete that.advertData.configList;
      this.$post('/epf-admin/editDeploy', that.advertData).then(res => {
        if (res.code != "0") {
          this.$message.error(res.msg); //失败
          return;
        }
        that.$emit("cancel");
        that.$message.success("保存成功")
      }).catch(error => { });
    },

  }
};
</script>

<style scoped>
  .el-select{
    width: 100%;
  }
  .interface{
    max-height: 100px;
    overflow: auto;
  }
  .button-cs{
    display:inline-block;
  }
</style>
