<template>
  <!-- 
    @name: 数据发布服务--编辑弹框
   	@description: 主要是编辑数据发布服信息
  -->
  <div v-if="advertData&&advertData!==null" id="tenantry-edit">
    <el-form :model="advertData" label-width="80px" ref="advertData" size="small">
      <EPF-switchTitle titles_h='接口请求' :shutOff='false'>
        <div style="margin-top:20px">
          <el-row>
            <el-col :span="4">
              <el-form-item label="请求类型">
                {{advertData.method}}
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="请求路径">
                {{advertData.protocol}}://{{advertData.address}}:{{advertData.port}}{{advertData.path}}
              </el-form-item>
            </el-col>
            
          </el-row>

        </div>
      </EPF-switchTitle>
      <EPF-switchTitle titles_h='请求参数'>
        <div style="margin-top:20px">
         
          <div class="interface">
            <el-row v-for="(item,index) in advertData.plist" :key="index">
              <el-col  :span="4">
                {{advertData.plist[index].name}}
              </el-col>
              <el-col :span="14">
                <el-form-item :label="advertData.plist[index].code+'='">
                  <el-input v-model="pm[advertData.plist[index].code]"></el-input>
                </el-form-item>
                
              </el-col>
              <el-col  :span="4">
                <el-form-item  >
                  {{advertData.plist[index].type}}
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>

      </EPF-switchTitle>
      <EPF-switchTitle titles_h='响应结果'>
        <div>
          <json-viewer :value="res"></json-viewer>
        </div>

      </EPF-switchTitle>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: center">
      <el-button type="primary" @click="saveBanner('advertData')">提交</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
import JsonViewer from 'vue-json-viewer'
export default {
  name: "tenantry-edit",
   components: {
    JsonViewer
  },
  props: {
    advertData: Object,
    res:Object,
  },
  data() {
    return {
      
      region:'',// 审核状态
      edit: false,
      rules: {},
      disabled: false,
      pm:{},
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    saveBanner(formName) {debugger
      let _this= this;
      var paramas={};
      paramas=_this.pm;
      var url = _this.advertData.path;

      var mt=_this.advertData.method;
      if(mt=='get'){
        _this.$get(url,paramas ).then(res => {
              _this.res=res;
            });
      }else if(mt=='post'){
       _this.$post(url,paramas ).then(res => {
              _this.res=res;
            });
      }else{
        _this.$post(url,paramas ).then(res => {
              _this.res=res;
            });
      
      }
    },
    addInterface(){
      this.advertData.plist.push({"name":"","code":"","type":""});
    }
  }
};
</script>

<style scoped>
  .el-select{
    width: 100%;
  }
  .interface{
    max-height: 150px;
    overflow: auto;
  }
</style>
