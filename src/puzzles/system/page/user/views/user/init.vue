<template>
    <div>
        <el-container>
            <el-aside width="150px">
                <p>上传头像</p>
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
                    <i v-else-if="!imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-aside>
            <el-main>
                <el-form :model="singleuser" :rules="validations" ref="validations" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label='用户数'>
                        <el-input v-model="singleuser.initCounts" auto-complete="off" style="width:300px;"
                                  type="number"/>
                    </el-form-item>
                    <el-form-item label='账号前缀' prop="username">
                        <el-input v-model="singleuser.username" auto-complete="off" style="width:300px;"/>
                    </el-form-item>
                    <el-form-item label='姓名前缀' prop="realname">
                        <el-input v-model="singleuser.realname" auto-complete="off" style="width:300px;"/>
                    </el-form-item>
                    <el-form-item label='性别' prop="sex">
                      <el-switch
                        style="margin-left:20px;"
                        v-model="singleuser.sex"
                        active-color="#13ce66"
                        inactive-color="#b9ccfd"
                        active-value="0"
                        inactive-value="1"
                        active-text="女"
                        inactive-text="男">
                      </el-switch>
                    </el-form-item>
                    <el-form-item label="隶属区域"  prop="regionalsId">
                      <el-cascader auto-complete="off" style="width:300px;"
                                   :options="regionData"
                                   v-model="singleuser.regionalsId"
                                   @change="regionDataChange"
                                   :props="{ multiple: false, checkStrictly: true,value: 'id',label: 'zhCn',children: 'children'}"
                                   clearable/>
                    </el-form-item>
                    <el-form-item label='所属机构' prop="orgName" >
                      <div class="block">
                        <el-cascader
                          :options="orgCascaderOptions"
                          v-model="singleuser.orgId"
                          :props="{checkStrictly: true, checkStrictly: true,value: 'id',label: 'name',children: 'children' }"
                          @change="orgIdsSelected"
                          style="width:300px;"
                          clearable></el-cascader>
                      </div>
                    </el-form-item>
                    <el-form-item label='类型' prop="usetype">
                        <el-select v-model="singleuser.usetype" placeholder="请选择用户类型" style="width:300px;">
                            <el-option v-for="userType of dicts.userTypes" :key="userType.id" :label="userType.zhCn"
                                       :value="userType.dictValue" style="width:100%;"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label='状态' prop="userstate">
                        <el-tooltip :content="singleuser.userstate=='1'?'已禁用':'正常'" placement="top">
                            <el-switch
                                    style="margin-left:20px;"
                                    v-model="singleuser.userstate"
                                    inactive-color="#13ce66"
                                    active-color="#ff4949"
                                    active-value="1"
                                    inactive-value="0">
                            </el-switch>
                        </el-tooltip>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
        <div align="middle">
            <el-button type="primary" @click="initUser">保存</el-button>
            <el-button @click="close">取 消</el-button>
        </div>
    </div>
</template>

<script>
    import { Rules } from '../../components/rules'

    export default {
        name: "init",
        props: {
            modelParam: {type: Object, default: null},
        },
        data() {
            return {
                singleuser: {},
                validations: Rules.USER,
                imageUrl: '',
                rules: {},
                dicts: {userTypes: [],},
                userAdd: {disabled: true},
                regionData: [],
                orgCascaderOptions:[],// 机构级联选择加载
            }
        },
        created() {
            this.initialUserObject();
        },
        methods: {
            initialUserObject() {
                /* this.singleuser["orgName"] = this.modelParam["org"]["name"];
                 this.singleuser["orgId"] = this.modelParam["org"]["id"];
                 this.$post(this.$API.EPF_ADMIN.USER.INIT).then(r => {
                     this.dicts["userTypes"] = r.data.userTypes;
                 });*/
                this.$post(this.$API.EPF_ADMIN.USER.INIT,{userId: '123'}).then(r => {
                    this.dicts["userTypes"] = r.data.userTypes;
                    this.tenantItems=r.data.tenantry;
                    this.regionData=r.data.regionData;
                });
            },
            userUploadFile(files) {
                const file = files.file;
                const formData = new FormData();
                formData.append("files", file);
                this.$useAppend(this.$API.EPF_DOCUMENT.UPLOAD, formData).then(res => {
                    files.onProgress(file);
                    this.usermanageInfo.iconImg = res.data[0].id;
                    this.imageUrl = this.$API.EPF_DOCUMENT.IMAGESRC + "?id=" + res.data[0].id;
                    files.onSuccess(res);
                });
            },
            handleAvatarSuccess(res, file) {
                if (res.state == "FAILURE") {
                    this.$message.error("上传失败!");
                    return;
                }
                this.imageUrl = this.getImgUrl(res.data[0].id);
                this.user.iconImg = res.data[0].id;
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
            initUser() {
                let _this = this;
                this.$refs['validations'].validate((valid) => {
                    if (valid) {
                        _this.singleuser["tenantCode"] = sessionStorage.getItem("tenantCode");
                        _this.$post(_this.$API.EPF_ADMIN.USER.INIT, _this.singleuser).then(r => {
                            _this.$message.success(r.data.msg);
                            _this.close();
                        });
                    }
                });
            },
            close() {
                this.$emit('closeDialog', this.singleuser);
                this.$emit('refreshData', this.modelParam["org"]);
            },
            regionDataChange(value){
                this.singleuser["regionalsId"] = value[value.length - 1];
                this.$post(this.$API.EPF_ADMIN.ORG.OrgTree,{regionalsId: value[value.length - 1]}).then(r => {
                    this.orgCascaderOptions=r.data.ztreeJson[0];
                });
            },
            orgIdsSelected(data){
                this.singleuser["orgId"] = data[data.length - 1];
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
</style>
