<template>
    <div>
      <el-container class="el-container-dialog">
            <!--<el-aside width="150px">
                <p>上传头像</p>
                <el-upload
                        class="avatar-uploader"
                        action="/epf-document/document/upload"
                        name="files"
                        :show-file-list="false"
                        :http-request="userUploadFile"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" width="150px">
                    <i v-else-if="!imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-aside>-->
            <el-main>
                <el-form :model="singleuser" status-icon :rules="validations" ref="validations" label-width="160px" class="demo-ruleForm"  v-loading="loading">
                  <table  style="width: 100%;" border="0">
                    <tr>
                      <td  style="width: 50%;">
                        <el-form-item label='账号' prop="username">
                          <el-input v-model="singleuser.username" auto-complete="off" style="width:300px;"/>
                        </el-form-item>
                      </td>
                      <td  style="width: 50%;text-align: center;" rowspan="2" >
                        <p  style="padding-left: 180px;">
                          <el-upload
                            :disabled='edit'
                            class="avatar-uploader"
                            action="/epf-document/document/upload"
                            name="files"
                            :show-file-list="false"
                            :http-request="userUploadFile"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" width="150px">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          </el-upload>
                        </p>
                        <p>上传头像</p>
                      </td>
                    </tr>
                    <tr>
                      <td >
                        <el-form-item label='姓名' prop="realname">
                          <el-input v-model="singleuser.realname" auto-complete="off" style="width:300px;"/>
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <td >
                        <el-form-item label='手机号' prop="telPhone">
                          <el-input v-model="singleuser.telPhone" auto-complete="off" style="width:300px;"/>
                        </el-form-item>
                      </td>
                      <td >
                        <el-form-item label='性别' prop="sex">
                          <el-switch
                            style="margin-left:20px;margin-top: 15px;"
                            v-model="singleuser.sex"
                            active-color="#13ce66"
                            inactive-color="#b9ccfd"
                            active-value="0"
                            inactive-value="1"
                            active-text="女"
                            inactive-text="男">
                          </el-switch>
                        </el-form-item>

                      </td>
                    </tr>
                    <tr>
                      <td >
                        <el-form-item label='所属单位' prop="deptName">
                          <el-input v-model="singleuser.deptName" auto-complete="off" style="width:300px;"/>
                        </el-form-item>
                      </td>
                      <td >
                        <el-form-item label='职称' prop="industryType">
                          <el-input v-model="singleuser.industryType" auto-complete="off" style="width:300px;"/>
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <td >
                        <el-form-item label='岗位' prop="position">
                          <el-input v-model="singleuser.position" auto-complete="off" style="width:300px;"/>
                        </el-form-item>
                      </td>
                      <td >
                        <el-form-item label='邮箱' prop="email">
                          <el-input v-model="singleuser.email" auto-complete="off" :disabled='edit'
                                    style="width:300px;"></el-input>
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <td >
                        <el-form-item label="隶属区域"  prop="regionalsId">
                          <!--<el-cascader  style="width:300px;"
                                        :options="regionData"
                                        v-model="singleuser.regional"
                                        @change="regionDataChange"
                                        :props="{ multiple: false, checkStrictly: true,value: 'regionCode',label: 'regionName',children: 'children'}"
                                        clearable/>-->
                              <el-select v-model="mineRegion" placeholder="请选择隶属区域" multiple collapse-tags   style="width:300px;"  >
                                <el-option :value="mineRegion" style="height: auto">
                                  <!-- default-expand-all  这是默认展开所有树数据-->
                                  <el-tree :data="regionData" show-checkbox check-strictly node-key="id"
                                           :default-expanded-keys="[defaultCode]"
                                           ref="treeForm" highlight-current
                                           :props="{ multiple: false, value: 'regionCode',label: 'regionName',children: 'children'}"
                                           @check-change="regionCheckChange"></el-tree>
                                </el-option>
                              </el-select>
                        </el-form-item>
                      </td>
                      <td >
                        <el-form-item label='所属机构' prop="orgName" >
                          <!--<div class="block">
                            <el-cascader
                              :options="orgCasOptions"
                              v-model="singleuser.orgId"
                              :props="{checkStrictly: true, checkStrictly: true,value: 'id',label: 'name',children: 'children' }"
                              @change="orgIdsSelected"
                              style="width:300px;"
                              clearable></el-cascader>
                          </div>-->
                            <el-select v-model="mineOrg" placeholder="请选择隶属区域" multiple collapse-tags   style="width:300px;"  >
                              <el-option :value="mineOrg" style="height: auto">
                                <!-- default-expand-all  这是默认展开所有树数据-->
                                <el-tree :data="orgCasOptions" show-checkbox check-strictly node-key="id"
                                         :default-expanded-keys="[defaultOrgid]"
                                         ref="tree" highlight-current
                                         :props="{ multiple: false,checkStrictly: true, value: 'id',label: 'name',children: 'children'}"
                                         @check-change="orgIdsSelected"></el-tree>
                              </el-option>
                            </el-select>
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <el-form-item label='地址' prop="industryType" >
                          <el-input v-model="singleuser.address" auto-complete="off" style="width:96%;"/>
                        </el-form-item>
                      </td>
                    </tr>
                  </table>
                </el-form>
            </el-main>
        </el-container>
        <div align="middle">
            <el-button type="primary" @click="editUser" >保存</el-button>
            <el-button @click="close">取 消</el-button>
        </div>
    </div>
</template>

<script>
    import { Rules } from '../../components/rules'
    import orgCas from "../../components/orgCas";
    export default {
        name: "edit",
        components: {
            orgCas
        },
        props: {
            modelParam: {type: Object, default: null},
        },
        data() {
            return {
                formLabelWidth:'150px',
                singleuser: {},
                validations: Rules.USER,
                imageUrl: '',
                dicts:{userTypes: []},
                modelParams: {"multiple": true, "checkStrictly": true,values: []},
                orgCasOptions:[],// 机构级联选择加载
                orgIds: '',
                neetedit: false,
                neetorg: false,
                changesend: '',
                regionData: [],
                loading: false,
                edit:false,
              mineRegion: '',
              getRegionalCode: '',
              defaultCode: '1',
              mineOrg: '',
              defaultOrgid: '',
              checkedId: '',
              checkedOrgId: '',
              getOrgId: ''
            }
        },
        created(){
            this.initialUserObject();
        },
        methods: {
            initialUserObject(){
                this.loading=true;
                   let that=this;
                  let getuserId= this.modelParam["userId"];
                  that.$post(that.$API.EPF_ADMIN.USER.queryUserDataByuserId,{userId: getuserId}).then(r => {
                    that.loading=false;
                    that.singleuser=r.data.userdata;
                    that.loadorgtree(that.singleuser.regional,that.singleuser.orgId);
                    that.dicts["userTypes"] = r.data.userTypes;
                    that.regionData=r.data.regionData;
                    that.imageUrl ="/api"+this.$API.EPF_DOCUMENT.IMAGESRC +that.singleuser.headerIcon;
                    that.checktreeDataCopy(that.singleuser.regional,that.singleuser.regionName,that.singleuser.orgId,that.singleuser.orgname);
                 });
            },
            userUploadFile(files) {
              const file = files.file;
              const formData = new FormData();
              formData.append("files", file);
              this.$useAppend("/epf-document/document/upload", formData).then(res => {
                console.log(res);
                files.onProgress(file);
                if (res.state != "SUCCESS") {
                  this.$message.error("图片上传失败，请重新上传");
                  return null;
                }
                this.singleuser["headerIcon"] = res.data[0].id;
                this.imageUrl = "/api"+this.$API.EPF_DOCUMENT.IMAGESRC + res.data[0].id;
                files.onSuccess(res);
              });
            },
            handleAvatarSuccess(res, file) {
              if (res.state == "FAILURE") {
                this.$message.error("上传失败!");
                return;
              }
              this.imageUrl = this.getImgUrl(res.data[0].id);
              this.singleuser["headerIcon"] = res.data[0].id;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === "image/jpeg";
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                  this.$message.error("上传头像图片只能是 JPG 格式!");
                }
                if (!isLt2M) {
                  this.$message.error("上传头像图片大小不能超过 2MB!");
                }
                return isJPG && isLt2M;
            },
            editUser(){
                let _this=this;
                 delete _this.singleuser.createTime;
                 delete _this.singleuser.updateTime;
                 delete _this.singleuser.org;
                 delete _this.singleuser.permissions;
                 delete _this.singleuser.region;
                 delete _this.singleuser.roles;
                this.$refs['validations'].validate((valid) => {
                    if (valid) {
                        _this.$post(_this.$API.EPF_ADMIN.USER.EDIT,_this.singleuser).then(res => {
                          debugger
                          let result=eval('('+res.result+')')
                          if (result.code != '0') {
                            _this.$message.error(result.msg);//失败
                            return;
                          }
                          _this.$message.success(result.msg);
                          _this.close();
                        });
                    }
                });
            },
            close(){
              this.$emit('closeDialog', this.singleuser);
              this.$emit('refreshData', this.singleuser);
            },
            handleChange(value) {
                this.singleuser.orgId = value[value.length - 1];
            },
          regionCheckChange(data, checked, node) {
            let arrLabel = [];
            let getregionCode="";
            if(checked === true) {//该if,主要验证只提供单选问题
              this.checkedId = data.id;
              this.$refs.treeForm.setCheckedKeys([data.id]);
            } else {
              if (this.checkedId == data.id) {
                this.$refs.treeForm.setCheckedKeys([data.id]);
                arrLabel.length === 0;
                this.singleuser["regional"] ="";
                getregionCode="";
              }
            }
            if (checked) {//加载机构树数据
              arrLabel.push(data.regionName);
              this.singleuser["regional"] =data.regionCode;
              getregionCode=data.regionCode;
              this.mineRegion = arrLabel;
              this.orgCascaderOptions=[];
              if(getregionCode!=""){
                this.$post(this.$API.EPF_ADMIN.ORG.OrgTree,{regionalsId: getregionCode}).then(r => {
                  debugger
                  this.orgCasOptions=r.data.ztreeJson;
                  if(r.data.ztreeJson.length!=0){
                    this.defaultOrgid=r.data.ztreeJson[0].id;//设置默认打开第一级树结构数据
                  }
                });
              }
            }
          },
          orgIdsSelected(data, checked, node) {
            let arrLabel = [];
            if(checked === true) {//该if,主要验证只提供单选问题
              this.checkedOrgId=data.id;
              this.$refs.tree.setCheckedKeys([data.id]);
              this.getOrgId=data.id;
              arrLabel.push(data.name);
            }else {
              if (this.checkedOrgId == data.id) {
                this.$refs.tree.setCheckedKeys([data.id]);
                this.getOrgId="";
                arrLabel = [];
              }
            }
            this.mineOrg = arrLabel;
            this.singleuser["orgId"] =this.getOrgId;
          },
          loadorgtree(regional,orgId){
            this.$post(this.$API.EPF_ADMIN.ORG.OrgTree,{regionalsId: regional}).then(r => {
                this.orgCasOptions=r.data.ztreeJson;
                if(orgId!=null&&orgId!=""){
                  this.defaultOrgid=orgId;
                }else if(r.data.ztreeJson.length!=0){
                   this.defaultOrgid=r.data.ztreeJson[0].id;//设置默认打开第一级树结构数据
                }
            });
          },
          checktreeDataCopy(regional,regionalName,orgId,orgName){
            let that=this;
            let arrLabel1 = [];
            let arrLabel2 = [];
            that.$get(that.$API.EPF_ADMIN.ORG.GET,{id: orgId}).then(r => {
              debugger;
              that.orgCasOptions=r.orgName;
              arrLabel2.push(r.orgName);
              that.mineOrg = arrLabel2;
              that.$refs.tree.setCheckedKeys([orgId]);
            });
            arrLabel1.push(regionalName);
            that.mineRegion = arrLabel1;
            that.$refs.treeForm.setCheckedKeys([regional]);

          }
        }
    }
</script>

<style scoped>
    .el-container {
        height: 300px;
        overflow: auto;
    }


    .avatar-uploader {
        border: 1px dashed #d9d9d9;
        width: 120px;
        border-radius: 10px;
        height: 120px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }

    .oper {
        float: right;
        font-weight: normal;
    }

    .oper span {
        display: inline-block;
    }

    

    
</style>
<style>
    .filter_wrap .el-input--small .el-input__inner {
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

    .usemngtable {
        width: 100%;
    }

    .usemngtable td {
        border: 1px solid #b6b6b6;
        line-height: 28px;
    }
    .el-container-dialog{
      height: 460px !important;
    }
</style>
