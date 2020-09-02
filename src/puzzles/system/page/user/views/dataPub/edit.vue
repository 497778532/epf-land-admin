<template>
  <!-- 
    @name: 数据发布服务--编辑弹框
   	@description: 主要是编辑数据发布服信息
  -->
  <div v-if="advertData&&advertData!==null" id="tenantry-edit">
    <el-form :model="advertData" label-width="80px" ref="advertData" size="small">
      <EPF-switchTitle titles_h='接口映射设置' :shutOff='false'>
        <div style="margin-top:20px">
          <el-row>
            <el-col :offset="1" :span="9">
              <el-form-item label="映射地址" prop="code">
                <el-input v-model="advertData.mapAddress" :readonly="edit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :offset="1" :span="9">
              <el-form-item label="状态">
                <el-select
                  size="small" 
                  v-model="advertData.status" 
                  placeholder="请选择状态"
                  :disabled="true"
                  >
                  <el-option label="待审核" value="0"></el-option>
                  <el-option label="审核通过" value="1"></el-option>
                  <el-option label="审核不通过" value="2"></el-option>
                  <el-option label="禁用" value="3"></el-option>
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
                <el-input v-model="advertData.refProject" :readonly="edit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :offset="1" :span="9">
              <el-form-item label="接口名称" prop="name">
                <el-input v-model="advertData.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :offset="1" :span="9">
              <el-form-item label="IP地址" prop="address">
                <el-input v-model="advertData.address"></el-input>
              </el-form-item>
            </el-col>
            <el-col :offset="1" :span="9">
              <el-form-item label="端口" prop="port">
                <el-input v-model="advertData.port"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :offset="1" :span="9">
              <el-form-item label="接口路径" prop="path">
                <el-input v-model="advertData.path"></el-input>
              </el-form-item>
            </el-col>
            <el-col :offset="1" :span="9">
              <el-form-item label="请求类型" prop="method">
                <el-select
                  size="small" 
                  v-model="advertData.method" 
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
                  v-model="advertData.protocol" 
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
                <el-input type="textarea" maxlength="125" v-model="advertData.remarks" placeholder="请输入"></el-input>
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
            <el-row v-for="(item,index) in advertData.plist" :key="index">
              <el-col  :span="9">
                <el-form-item label="参数名称" >
                  <el-input v-model="advertData.plist[index].name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="参数标识" >
                  <el-input v-model="advertData.plist[index].code"></el-input>
                </el-form-item>
              </el-col>
              <el-col  :span="7">
                <el-form-item label="参数类型" >
                  <el-select
                      size="small" 
                      v-model="advertData.plist[index].type" 
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
      <el-button type="primary" @click="saveBanner('advertData')">保 存</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: "tenantry-edit",
  props: {
    advertData: Object
  },
  data() {
    return {
      
      region:'',// 审核状态
      edit: false,
      rules: {
      },
      disabled: false,
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    saveBanner(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          that.disabled = true;
          var paramas={};
          paramas=that.advertData;
          var list="";
          if(that.advertData.plist!=null &&that.advertData.plist.length>0){
            
             for(var i=0;i<that.advertData.plist.length;i++){
              var k=1;
             for(var j in that.advertData.plist[i]) {
               
                  console.log(j,":",that.advertData.plist[i][j]);
                  if(k!=1){
                      list +="&";
                  }
                  list +=j+"="+that.advertData.plist[i][j];
                  k=0;
              }
              list +=",";
            }
            
          }
          paramas["status"]="0"
          paramas["listparamas"]=list;
          delete paramas['updateTime'];
          delete paramas['createTime'];
          delete paramas['createBy'];
          delete paramas['updateBy'];
          delete paramas['paramList'];
          delete paramas['plist'];
          that.$post(that.$API.EPF_GATEWAY.GW_ROUTES_SAVE,paramas ).then(res => {
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
    max-height: 100px;
    overflow: auto;
  }
</style>
