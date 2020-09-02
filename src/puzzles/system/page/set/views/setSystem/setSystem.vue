<template>
  <epf-container title='系统信息配置'>
    <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
      <div class="epf_toolbar">
        <button class="epf_btn epf_btn_bg"
          @click="getCheckedKeys">
          保 存
        </button>
      </div>
      <div class="epf_fr_content contents" :style="{height:boxHeight - 55 +'px'}">
        <el-form
          :model="InfoConfigBase"
          label-width="80px"
          v-loading="loading"
          element-loading-text="数据加载中"
          element-loading-background="rgba(255, 255, 255,0.95)">
          <el-form-item label='平台logo'  prop="logoUrl">
            <el-upload
              class="avatar-uploader"
              action="/api/epf-document/document/upload"
              name="files"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" :onerror="defaultImg">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-row :gutter="50" v-if="InfoConfigBase">
            <el-col :span="12">
              <el-form-item label='后台名称'  prop="name">
                <el-input v-model="InfoConfigBase.name" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label='显示标题' >
                <el-tooltip :content="InfoConfigBase.isShowTitle=='1'?'不显示':'显示'" placement="top">
                  <el-switch
                    v-model="InfoConfigBase.isShowTitle"
                    active-color="#ff4949"
                    inactive-color="#13ce66"
                    active-value="1"
                    inactive-value="0">
                  </el-switch>
                </el-tooltip>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50" v-if="InfoConfigBase">
            <el-col :span="12">
              <el-form-item label='门户名称'  prop="name">
                <el-input v-model="InfoConfigBase.homeName" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label='显示门户标题' >
                <el-tooltip :content="InfoConfigBase.isShowHomeTitle=='1'?'不显示':'显示'" placement="top">
                  <el-switch
                    v-model="InfoConfigBase.isShowTitle"
                    active-color="#ff4949"
                    inactive-color="#13ce66"
                    active-value="1"
                    inactive-value="0">
                  </el-switch>
                </el-tooltip>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label='英文名称'  prop="nameEn">
                <el-input v-model="InfoConfigBase.nameEn" auto-complete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label='主办单位'  prop="sponsor">
                <el-input v-model="InfoConfigBase.sponsor" auto-complete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label='承办单位'  prop="undertake">
                <el-input v-model="InfoConfigBase.undertake" auto-complete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label='技术支持'  prop="techSupport">
                <el-input v-model="InfoConfigBase.techSupport" auto-complete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label='鉴证字号'  prop="filingNumber">
                <el-input v-model="InfoConfigBase.filingNumber" auto-complete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label='地    址'  prop="address">
                <el-input  type="textarea" v-model="InfoConfigBase.address" auto-complete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label='电    话'  prop="telphone">
                <el-input v-model="InfoConfigBase.telphone" auto-complete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label='版权信息'  prop="allRights">
                <el-input v-model="InfoConfigBase.allRights" auto-complete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label='客服电话'  prop="servicePhone">
                <el-input v-model="InfoConfigBase.servicePhone" auto-complete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label='QQ号码'  prop="qq">
                <el-input v-model="InfoConfigBase.qq" auto-complete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label='城市名称'  prop="cityName">
                <el-input v-model="InfoConfigBase.cityName" auto-complete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label='位置X坐标'  prop="coordinateX">
                <el-input v-model="InfoConfigBase.coordinateX" auto-complete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label='位置Y坐标'  prop="coordinateY">
                <el-input v-model="InfoConfigBase.coordinateY" auto-complete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label='ICP证'  prop="icpCard">
                <el-input v-model="InfoConfigBase.icpCard" auto-complete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label='办公时间'  prop="officeHours">
                <el-input v-model="InfoConfigBase.officeHours" auto-complete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label='业务信箱'  prop="businessMail">
                <el-input v-model="InfoConfigBase.businessMail" auto-complete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label='单位简介'  prop="introduction">
                <el-input type="textarea" v-model="InfoConfigBase.introduction" auto-complete="off" :rows="5"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label='版本号'  prop="version">
                <el-input v-model="InfoConfigBase.version" auto-complete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </epf-container>
</template>

<script>
export default {
  name: "setSystem",
  data() {
    return {
      boxHeight: 700,
      loading:true,
      defaultImg:`this.src=${require('../../../../../../assets/logo.png')}`, //默认图片
      InfoConfigBase:{},
      imageUrl:'', // 图片路径
      headers:'', // 获取token
      docid:'',
    }
  },
  created() {
    this.boxHeight = window.innerHeight - 250
    this.getlogList();
    this.headers = {'token':sessionStorage.getItem('token') }
  },
  methods: {
    // 图片上传
    handleAvatarSuccess(res, file) {
      console.log(res);
      if(res.state=="SUCCESS"){
        this.docid=res.data[0].id
      }
      
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 图片上传规格
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    // 保存
    getCheckedKeys(){
      let _this = this;
      this.InfoConfigBase.tenantCode=sessionStorage.getItem('userTenantCode');
      this.InfoConfigBase.logoUrl=this.docid;
      _this.$post(_this.$API.EPF_CMS.UP_DATA_INFOR_MATION,this.InfoConfigBase).then(res => {
        if(res.code != '0'){
          _this.$message.error(res.msg);
          return
        }
        this.$message.success("更新成功");
        _this.getlogList();
      });
    },
    // 回显数据
    getlogList() {
      var params={tenantCode:sessionStorage.getItem('userTenantCode')}
      this.$post(this.$API.EPF_CMS.GET_INFOR_MATION_LIST,params).then(res => {
        console.log('123',res)
        if(res.code != '0'){
          this.$message.error(res.msg);//失败
          this.loading=false
          return;
        }
        this.InfoConfigBase = res.information;
        //图片回显
        this.docid=res.information.logoUrl
        this.loading=false
        this.imageUrl = '/api/epf-document/document/downloadById?id='+res.information.logoUrl;
      }).catch(res => {
        this.loading=false
      })
    },
  }
}
</script>
<style lang="less" scoped>
.contents{
  padding: 45px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
