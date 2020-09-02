<template>
  <div class="page-body" id="basicInformationManager">
    <div class="filter_wrap">
      <div class="button_bg" @click="getCheckedKeys" style="float: right">保存</div>
      <div class="switchHeight_box">
        <el-row>
          <el-form :model="InfoConfigBase">

            <el-form-item label='平台logo' :label-width="formLabelWidth" prop="logoUrl">
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
                <el-form-item label='平台名称' :label-width="formLabelWidth" prop="name">
                  <el-input v-model="InfoConfigBase.name" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label='显示标题' :label-width="formLabelWidth">
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

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label='英文名称' :label-width="formLabelWidth" prop="nameEn">
                  <el-input v-model="InfoConfigBase.nameEn" auto-complete="off" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label='主办单位' :label-width="formLabelWidth" prop="sponsor">
                  <el-input v-model="InfoConfigBase.sponsor" auto-complete="off" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label='承办单位' :label-width="formLabelWidth" prop="undertake">
                  <el-input v-model="InfoConfigBase.undertake" auto-complete="off" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label='技术支持' :label-width="formLabelWidth" prop="techSupport">
                  <el-input v-model="InfoConfigBase.techSupport" auto-complete="off" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label='鉴证字号' :label-width="formLabelWidth" prop="filingNumber">
                  <el-input v-model="InfoConfigBase.filingNumber" auto-complete="off" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label='地    址' :label-width="formLabelWidth" prop="address">
                  <el-input  type="textarea" v-model="InfoConfigBase.address" auto-complete="off" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label='电    话' :label-width="formLabelWidth" prop="telphone">
                  <el-input v-model="InfoConfigBase.telphone" auto-complete="off" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label='版权信息' :label-width="formLabelWidth" prop="allRights">
                  <el-input v-model="InfoConfigBase.allRights" auto-complete="off" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label='服务热线' :label-width="formLabelWidth" prop="hotline">
                  <el-input v-model="InfoConfigBase.hotline" auto-complete="off" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label='工作时段' :label-width="formLabelWidth" prop="worktime">
                  <el-input v-model="InfoConfigBase.worktime" auto-complete="off" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label='客服电话' :label-width="formLabelWidth" prop="servicePhone">
                  <el-input v-model="InfoConfigBase.servicePhone" auto-complete="off" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label='QQ号码' :label-width="formLabelWidth" prop="qq">
                  <el-input v-model="InfoConfigBase.qq" auto-complete="off" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label='城市名称' :label-width="formLabelWidth" prop="cityName">
                  <el-input v-model="InfoConfigBase.cityName" auto-complete="off" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label='位置X坐标' :label-width="formLabelWidth" prop="coordinateX">
                  <el-input v-model="InfoConfigBase.coordinateX" auto-complete="off" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label='位置Y坐标' :label-width="formLabelWidth" prop="coordinateY">
                  <el-input v-model="InfoConfigBase.coordinateY" auto-complete="off" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label='ICP证' :label-width="formLabelWidth" prop="icpCard">
                  <el-input v-model="InfoConfigBase.icpCard" auto-complete="off" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label='办公时间' :label-width="formLabelWidth" prop="officeHours">
                  <el-input v-model="InfoConfigBase.officeHours" auto-complete="off" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label='业务信箱' :label-width="formLabelWidth" prop="businessMail">
                  <el-input v-model="InfoConfigBase.businessMail" auto-complete="off" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label='单位简介' :label-width="formLabelWidth" prop="introduction">
                  <el-input type="textarea" v-model="InfoConfigBase.introduction" auto-complete="off" :rows="5"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label='版本号' :label-width="formLabelWidth" prop="version">
                  <el-input v-model="InfoConfigBase.version" auto-complete="off" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label='欢迎语' :label-width="formLabelWidth" prop="helloWord">
                  <el-input v-model="InfoConfigBase.helloWord" auto-complete="off" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
        <div class="activity-dialog"
             v-loading="loading"
             element-loading-text="数据加载中"
             element-loading-background="rgba(255, 255, 255,0.95)"  >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import transferTable from "@/components/transferTable";

  export default {
    name:'basicInformationManager',
    components: {
      transferTable
    },

    data() {
      return {
        formLabelWidth:"80px",
        loading:true,
        defaultImg: 'this.src="' + require('../../../../assets/logo.png') + '"',//默认图片
        InfoConfigBase:{},
        imageUrl:'',

      };
    },
    created() {
      this.getlogList();
      this.headers = {'token':sessionStorage.getItem('token') }
    },
  mounted(){
    this.$bus.$on('themChange',val => {
        this.theme_BackgroundColor = val.menuBackgroundColor
        this.theme_TextColor = val.textColor
    })
  },
    methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log("=====res===",res)
      this.InfoConfigBase.logoUrl = res.data[0].id
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      /*if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }*/
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
      getCheckedKeys(){
        let that = this;
        if(that.InfoConfigBase.createTime != null){
           that.InfoConfigBase.createTime = that.InfoConfigBase.createTime.substring(0,10)
        }
       if(that.InfoConfigBase.lastUpdateTime != null){
         that.InfoConfigBase.lastUpdateTime = that.InfoConfigBase.lastUpdateTime.substring(0,10)
       }
        this.InfoConfigBase.tenantCode=sessionStorage.getItem('userTenantCode');
        that.$post('/epf-cms/cms/basics/updateInformation',this.InfoConfigBase).then(res => {
          if(res.code != '0'){
            that.$message.error(res.msg);//失败
            return
          }
          // that.dialogFormVisible = false;
          this.$message.success("更新成功");
          that.getlogList();
        });
      },
      getlogList() {
        var params={tenantCode:sessionStorage.getItem('userTenantCode')}
        this.$get('/epf-cms/cms/basics/getInformationList',params).then(res => {
          if(res.code != '0'){
            this.$message.error(res.msg);//失败
            this.loading=false;
            return;
          }
          this.InfoConfigBase = res.information;
          //图片回显
          this.loading=false;
          this.imageUrl = '/api/epf-document/document/downloadById?id='+res.information.logoUrl;

        })
      },
    }
  };
</script>
<style scoped>
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
  
  .oper {
    float: right;
    font-weight: normal;
  }
  .oper span {
    display: inline-block;
    width: 80px;
    height: 32px;

    border-radius: 2px;
    margin-right: 10px;
    text-align: center;
    line-height: 36px;
    font-size: 14px;
    cursor: pointer;
    border: solid 1px #d3d4d6;
    color: #606266;
    background-color: #dbf0ec;
  }
  .oper span:nth-child(4) {
    color: #fff;
    background-color: #ffa000;
  }
 
  
</style>
<style>
  .filter_wrap .switchHeight_box .el-input__inner {
    height: 34px;
  }
  .filter_wrap .el-row {
    margin-bottom: 10px;
  }
  .filter_wrap .distpicker-address-wrapper select {
    width: 148px;
    height: 34px;
    font-size: 14px;
    line-height: 34px;
    padding: 0 10px;
  }

  .filter_wrap .el-date-editor.el-input .el-input__icon {
    line-height: 30px;
    color: #8dc4f7;
  }
  .filter_wrap .el-input__prefix,
  .el-input__suffix {
    width: 25px;
    font-size: 16px;
    right: 8px;
  }
  .el-table th,
  .el-table tr {
    /* border:1px solid #ebeef5; */
  }
  .el-table__body tr td:nth-child(2) .cell {
    color: rgb(70, 113, 213);
  }
  .el-textarea .el-textarea__inner {
    width: 100%;
    height: 100% !important;
  }
  .usemngtable{  width: 100%;}
  .usemngtable td{

    border:1px solid #b6b6b6;
    line-height:28px;

  }

  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
