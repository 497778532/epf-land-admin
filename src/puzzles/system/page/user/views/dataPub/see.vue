<template>
  <!-- 
    @name: 数据发布服务--查看弹框
   	@description: 主要是查看数据发布服信息
  -->
  <div v-if="advertData&&advertData!==null">
    <el-form :model="advertData" label-width="80px" ref="advertData" size="small">
      <EPF-switchTitle titles_h='接口映射设置' :shutOff='false'>
        <div style="margin-top:20px">
          <el-row>
            <el-col :offset="1" :span="9">
              <el-form-item label="映射地址" prop="mapAddress">
                <el-input v-model="advertData.mapAddress" :readonly="edit" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :offset="1" :span="9">
              <el-form-item label="状态">
                <el-select
                  size="small" 
                  v-model="advertData.status" 
                  placeholder="请选择状态"
                  disabled
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
                <el-input v-model="advertData.refProject" :readonly="edit" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :offset="1" :span="9">
              <el-form-item label="接口名称" prop="name">
                <el-input v-model="advertData.name" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :offset="1" :span="9">
              <el-form-item label="IP地址" prop="address">
                <el-input v-model="advertData.address" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :offset="1" :span="9">
              <el-form-item label="端口" prop="port">
                <el-input v-model="advertData.port" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :offset="1" :span="9">
              <el-form-item label="接口路径" prop="path">
                <el-input v-model="advertData.path" disabled></el-input>
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
                  disabled
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
                <el-input type="textarea" maxlength="125" v-model="advertData.remarks" placeholder="请输入" disabled></el-input>
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
              <el-col :offset="1" :span="9">
                <el-form-item label="参数名称" >
                  <el-input disabled v-model="advertData.plist[index].name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :offset="1" :span="9">
                <el-form-item label="参数标识" >
                  <el-input disabled v-model="advertData.plist[index].code"></el-input>
                </el-form-item>
              </el-col>
              <el-col :offset="1" :span="9">
                <el-form-item label="参数类型" >
                  <el-select
                      disabled
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
      <el-button type="primary" @click="saveBanner('advertData')" disabled>保 存</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "tenantry-edit",
  props: {
    advertData: Object
  },
  data() {
    return {
      advertData: {
        ranks: "",
        status: "",
        telPhone:"",
        email:"",
        contacter:"",
        address:"",
        code:"",
        name:""
      },
      region:'',// 审核状态
      edit: false,
      rules: {
      },
      disabled: false,
      interfaces:this.advertData.plist // 添加接口数组
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
          that
            // /epf-admin/admin/Tenantry/add
            .$post(that.$API.EPF_GATEWAY.GW_ROUTES_SAVE, that.advertData)
            .then(res => {
              if (res.code != "0") {
                that.$message.error(res.msg); //失败
                that.disabled = false;
                return;
              }
              that.disabled = false;
              that.$message.success("保存成功！");
              // that.getTenantryManage(that.searchAdvert);
            });
        } else {
          this.$message.error("请确保信息填写正确");
          return false;
        }
      });
    },
    addInterface(){
      this.advertData.plist.push({});
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
