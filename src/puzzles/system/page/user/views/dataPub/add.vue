<template>
  <!-- 
    @name: 数据发布服务--新增弹框
   	@description: 主要是新增数据发布服信息
  -->
  <div v-if="gwRoutesData&&gwRoutesData!==null" id="tenantry-edit">
    <el-form :model="gwRoutesData" label-width="80px" ref="gwRoutesData" size="small">
      <EPF-switchTitle titles_h='接口映射设置' :shutOff='false'>
        <div style="margin-top:20px">
          <el-row>
            <el-col :offset="1" :span="9">
              <el-form-item label="映射地址" prop="mapAddress">
                <el-input v-model="gwRoutesData.mapAddress" :readonly="edit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :offset="1" :span="9">
              <el-form-item label="状态">
                <el-select
                  size="small" 
                  v-model="gwRoutesData.status" 
                  placeholder="请选择状态"
                  :disabled="true">
                  <el-option label="待审核" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

        </div>
      </EPF-switchTitle>
      <EPF-switchTitle titles_h='接口源信息'>
        <div style="margin-top:20px">
          <el-row>
            <el-col :offset="1" :span="9">
              <el-form-item label="所属项目" prop="refProject">
                <el-input v-model="gwRoutesData.refProject" :readonly="edit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :offset="1" :span="9">
              <el-form-item label="接口名称" prop="name">
                <el-input v-model="gwRoutesData.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :offset="1" :span="9">
              <el-form-item label="IP地址" prop="address">
                <el-input v-model="gwRoutesData.address"></el-input>
              </el-form-item>
            </el-col>
            <el-col :offset="1" :span="9">
              <el-form-item label="端口" prop="port">
                <el-input v-model="gwRoutesData.port"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :offset="1" :span="9">
              <el-form-item label="接口路径" prop="path">
                <el-input v-model="gwRoutesData.path"></el-input>
              </el-form-item>
            </el-col>
            <el-col :offset="1" :span="9">
              <el-form-item label="请求类型" prop="method">
                <el-select
                  size="small" 
                  v-model="gwRoutesData.method" 
                  placeholder="请选择请求类型"
                  >
                  <el-option label="get" value="get"></el-option>
                  <el-option label="post" value="post"></el-option>
                  <el-option label="put" value="put"></el-option>
                  <el-option label="delete" value="delete"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="1" :span="9">
              <el-form-item label="协议类型">
                <el-select
                  size="small" 
                  v-model="gwRoutesData.protocol" 
                  placeholder="请选择协议"
                  >
                  <el-option label="https" value="https"></el-option>
                  <el-option label="http" value="http"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :offset="1" :span="19">
              <el-form-item label="接口描述">
                <el-input type="textarea" maxlength="125" v-model="gwRoutesData.remarks" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :offset="1" :span="9">
                <el-form-item label="接口参数">
                  <el-button @click="addInterface">+添加</el-button>
                </el-form-item>
            </el-col>
          </el-row>
          <div class="interface">
            <el-row v-for="(item,index) in interfaces" :key="index">
              <el-col  :span="7">
                <el-form-item label="参数名称" >
                  <el-input v-model="interfaces[index].name" ></el-input>
                </el-form-item>
              </el-col>
              <el-col  :span="7">
                <el-form-item label="参数标识" >
                  <el-input v-model="interfaces[index].code"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="参数类型" >
                  
                  <el-select
                      size="small" 
                      v-model="interfaces[index].type" 
                      placeholder="参数类型"
                      >
                    <el-option label="int" value="int"></el-option>
                    <el-option label="string" value="string"></el-option>
                    <el-option label="date" value="date"></el-option>
                    <el-option label="float" value="float"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>

      </EPF-switchTitle>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: center">
      <el-button type="primary" @click="saveGwRoutes('gwRoutesData')">保 存</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: "tenantry-edit",

  data() {
    return {
      gwRoutesData: {status:"0"},
      region:'',// 审核状态
      edit: false,
      rules: {
      },
      disabled: false,
      interfaces:[] // 添加接口数组
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    saveGwRoutes(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          that.disabled = true;
          var paramas={};
          var paramas=that.gwRoutesData;
          var list="";
          if(that.interfaces!=null &&that.interfaces.length>0){
            for(var i=0;i<that.interfaces.length;i++){
              var k=1;
             for(var j in that.interfaces[i]) {
               
                  console.log(j,":",that.interfaces[i][j]);
                  if(k!=1){
                      list +="&";
                  }
                  list +=j+"="+that.interfaces[i][j];
                  k=0;
              }
              list +=",";
            }
          }
          paramas["listparamas"]=list;
          that.$post(that.$API.EPF_GATEWAY.GW_ROUTES_SAVE, paramas).then(res => {
              if (res.code != "0") {
                that.$message.error(res.msg); //失败
                that.disabled = false;
                return;
              }
              that.disabled = false;
              that.$message.success("保存成功！");
              this.$emit("cancel");
              // that.getTenantryManage(that.searchAdvert);
            });
        } else {
          this.$message.error("请确保信息填写正确");
          return false;
        }
      });
    },
    addInterface(){
      this.interfaces.push({"name":"","code":"","type":""});
    }
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
</style>
