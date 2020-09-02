<template>
  <!-- <div>合同合同鉴证</div> -->
  <div class="page-body">
    <div class="filter_wrap">
      <div class="dsDetailInfo_box">
        <div class="publish_main">
          <div class="publish_main_title">
            <div class="publish_title_icon f-left"></div>
            <h2 class="title f-left">{{title}}</h2>
          </div>
          <div class="publish_main_cont">
            <el-form ref="formData" :model="formData" :rules="rules" label-width="120px">
              <el-form-item label="合同编号：">
                <el-input v-model="formData.code" style="width:490px" :disabled="true"></el-input>
                <el-button type="primary" @click="preview()" style="margin-left:8px;height:40px;">预览</el-button>
              </el-form-item>
              <el-form-item label="合同统一编码：">
                <el-input v-model="formData.recordNo" style="width:490px" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="签字版合同：">
                <div v-if="tableType">
                  <div v-if="tableSignData">
                    <div v-for="(item,index) in tableSignData" :key="index">
                      <a :href="baseUrl + item.id">
                        <span style="color: #4671d5;">{{item.name}}</span>
                      </a>
                      <a :href="baseUrl + item.id" style="margin-left:10px;">
                        <el-button slot="trigger" size="small" type="primary">查看</el-button>
                      </a>
                    </div>
                  </div>
                  <div v-else>无</div>
                </div>
                <div v-else>
                  <!-- <a :href="baseUrl + signId"> -->
                  <span style="float:left;margin:0 10px;">{{contractInfoName}}</span>
                  <!-- </a> -->
                  <el-button
                    size="small"
                    type="primary"
                    v-if="contractInfoName"
                    @click="viewFile(uploadSignData)"
                  >查看</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    v-if="contractInfoName"
                    @click="deleteFile(0,signId,pId)"
                  >删除</el-button>
                  <el-upload
                    v-else
                    class="avatar-uploader"
                    action="/epf-document/document/upload"
                    style="float:left;"
                    name="files"
                    ref="photoUploader"
                    :show-file-list="false"
                    :http-request="userUploadFile"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <el-button slot="trigger" size="small" type="primary">上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
              <el-form-item label="鉴证说明：" prop="explain">
                <el-input
                  type="textarea"
                  :disabled="tableType"
                  maxlength="200"
                  minlength="0"
                  show-word-limit
                  autosize
                  v-model="formData.explain"
                  placeholder="请输入备注说明，200字以内"
                  style="width:60%;height:120px;"
                ></el-input>
              </el-form-item>
              <el-form-item label="合同鉴证附件：">
                <EPF-annexList
                  @isAux='isAuxFun'
                  :tableType="tableType"
                  :tableNmae="tableNmae"
                  :belong="belong"
                  :areaCode="areaCode"
                  :fileSize="6"
                  :fileType="fileType"
                  :annexType="annexType"
                  v-if="belong!==''"
                ></EPF-annexList>
                <div style="clear: both;"></div>
              </el-form-item>
              <el-button type="warning" plain style="width: 98px;" @click="cancal()">取消</el-button>
              <el-button
                type="warning"
                style="width: 98px;"
                @click="confirm('formData')"
                v-if="record == 'record'"
              >确认鉴证</el-button>
              <el-button type="warning" style="width: 98px;" @click="cancal()" v-else>确定</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="附件预览"
      :visible.sync="dialogVisible"
      :modal="false"
      width="50%"
      center
      :before-close="handleClose"
    >
      <iframe :src="src" width="pixels" style="width:100%;height:600px;"></iframe>
    </el-dialog>
  </div>
</template>
<script>
import Axios from "axios";
import qs from "qs";
import { mapActions } from "vuex";
import configApi from "../../../../config/index";
import baseURL1 from "../../../utils/config";
import EPFAnnexList from "@/components/annexList/annexList.vue";
export default {
  components: { EPFAnnexList },
  data() {
    return {
      baseUrl: "", //地址前缀
      fileList: null,
      title: "合同鉴证",
      // 文件上传
      tableNmae: ["序号", "文件名", "文件", "操作"],
      belong: "",
      areaCode: "",
      fileType: ["rar", "zip", "doc", "docx", "pdf", "jpg", "png"],
      annexType: "HT_HTBAFJ",
      tableType: false,
      formData: {
        code: "",
        recordNo: "",
        explain: "",
        recordId: ""
      },
      rules: {
        explain: [
          { required: true, message: "鉴证说明不能为空", trigger: "blur" }
        ]
      },
      fileList: [],
      disabled: false,
      isAuxFlag: false,
      contractInfoName: null,
      recordId: null,
      tableSignData: null,
      pId: null,
      href: "", //预览地址
      TidParameters: "",
      src: "",
      dialogVisible: false,
      uploadSignData: null
    };
  },
  created() {
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    let token = sessionStorage.getItem("token");
    this.record = this.$route.query.record;
    var that = this;
    Axios.post(
      "/api/epf-contract/transContract/selectByContactId",
      qs.stringify({
        token: token,
        contactId: this.$route.query.contractId
      })
    ).then(res => {
      if (res.code == "0000") {
        this.formData = res.data;
        this.areaCode = res.data.cantonCode;
        if (this.record == "record") {
          this.tableType = false;
          this.title = "合同鉴证";
          var that = this;
          Axios.get(
            "/api/epf-supply/api/createId",
            qs.stringify({ token: token })
          ).then(res => {
            that.belong = res.id;
          });
        } else if (this.record == "recordDetail") {
          this.tableType = true;
          this.title = "合同鉴证详情";
          this.belong = res.data.recordFileId;
          this.signId = res.data.signId;
          this.$get("/epf-document/document/getOneGroupFilsById", {
            id: res.data.signId
          }).then(files => {
            this.tableSignData = files.fileList;
          });
          // id--17e4f899-65e1-4678-b46c-eb8f23b1aa01
          // pid--6c78cdb1-57fc-4f0c-8b43-fd53eaa0f2bc
          // pdfId:4b38500b-f699-455a-a0a5-3b5289a119c8
        }
      }
    });
  },
  watch: {
    belong(newVal, oldVal) {
      this.belong = newVal;
    }
  },
  methods: {
    ...mapActions(["setTabsList", "deleteTab", "removeTab"]),
    isAuxFun(value){
				this.isAuxFlag = value;
		},
    viewFile(data) {
      //文件预览
      var api = configApi.dev.proxyTable["/api"].target; //仅限于开发环境，生产环境需要调整下
      const url = `/api/epf-document/onlinePreview?url=${api},${data.id}.${data.extName}`;
      this.src = url;
      this.dialogVisible = true;
    },
    handleClose() {
      //关闭弹窗回调
      this.src = "";
      this.dialogVisible = false;
    },
    //  开始上传
    userUploadFile(files) {
      const file = files.file;
      const formData = new FormData();
      formData.append("files", file);
      this.$useAppend("/epf-document/document/upload", formData).then(res => {
        files.onProgress(file);
        if (res.state != "SUCCESS") {
          this.$message.error("文件上传失败，请重新上传");
          return null;
        }
        this.contractInfoName = res.data[0].name;
        this.signId = res.data[0].id;
        this.pId = res.data[0].pdfId;
        this.uploadSignData = res.data[0];
        // this.usermanageInfo.iconImg = res.data[0].id;
        // this.imageUrl =
        //   "/api/epf-document/document/downloadById?id=" + res.data[0].id;
        files.onSuccess(res);
      });
    },
    deleteFile(index, tid, fid) {
      //删除按钮
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteFunction(index, tid, fid);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteFunction(index, tid, fid) {
      let token = sessionStorage.getItem("token");
      Axios.post(
        "/api/epf-document/document/deleteByFolder",
        qs.stringify({
          token: token,
          id: tid,
          fdId: fid
        })
      ).then(res => {
        console.log("===deleteByFolder=====", res);
        if (res.state == "SUCCESS") {
          this.contractInfoName = null;
          this.signId = null;
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleAvatarSuccess(res, file) {
      if (res.state == "FAILURE") {
        this.$message.error("上传失败!");
        return;
      }
      // this.imageUrl = this.getImgUrl(res.data[0].id);
      // this.singleuser.iconImg = res.data[0].id;
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg/png";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      // return isJPG && isLt2M;
    },
    preview() {
      if (this.$route.query.contractType == "transfer") {
        let routerPath = `/transferContractTemplate?contractId=${this.$route.query.contractId}&contractView=1`;
        let title = "合同预览";
        let tabObj = { title, routerPath };
        this.setTabsList(tabObj);
        this.$router.push({
          path: "/transferContractTemplate",
          query: {
            contractId: this.$route.query.contractId,
            contractView: 1
          }
        });
      }else if(this.$route.query.contractType == "rental"){
      	let routerPath = `/rentalContractTemplate?contractId=${this.$route.query.contractId}&contractView=1`;
        let title = "合同预览";
        let tabObj = { title, routerPath };
        this.setTabsList(tabObj);
        this.$router.push({
          path: "/rentalContractTemplate",
          query: {
            contractId: this.$route.query.contractId,
            contractView: 1
          }
        });
      }else if(this.$route.query.contractType == "mortgage"){
      	let routerPath = `/mortgageContractTemplate?contractId=${this.$route.query.contractId}&contractView=1`;
        let title = "合同预览";
        let tabObj = { title, routerPath };
        this.setTabsList(tabObj);
        this.$router.push({
          path: "/mortgageContractTemplate",
          query: {
            contractId: this.$route.query.contractId,
            contractView: 1
          }
        });
      }
    },
    cancal() {
      this.$bus.$emit("refreshPage", ["home"]);
      this.$bus.$emit("closeTabsItem", this.$route.name);
    },
    confirm(formName) {
      if (!this.isAuxFlag) {
        this.$message.error("请检查您的附件清单信息是否上传完整！");
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          let token = sessionStorage.getItem("token");
          Axios.post(
            "/api/epf-contract/transContract/changeRecord",
            qs.stringify({
              token: token,
              recordId: this.formData.recordId,
              status: "record_status-001",
              message: this.formData.explain,
              recordFileId: this.belong,
              signId: this.signId ? this.signId : null
            })
          ).then(res => {
            console.log(res);
            this.$message({ message: "鉴证成功", type: "success" });
            // this.$bus.$emit("refreshPage", ["home"]);
            this.$bus.$emit("closeTabsItem", this.$route.name);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {
    //其他组件需要关闭标签页
    this.$bus.$on("closeTabsItem", val => {
      console.log(val);
      this.removeTab(val);
      this.refresh();
    });
    //刷新指定页面
    // this.$bus.$on("refreshPage", val => {
    //   this.needRefresh.push(...val);
    //   this.needRefresh = Array.from(new Set(this.needRefresh));
    // });
  }
};
</script>
<style lang="scss" scoped>
.text_red {
  color: red;
  margin-right: 5px;
  cursor: auto;
}
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.filter_wrap {
  .dsDetailInfo_box {
    .publish_main {
      @include size(100%, auto);
      box-sizing: border-box;
      padding: 0 24px;
      &_title {
        @include size(100%, 56px);
        background: #f5f7fa;
        box-sizing: border-box;
        padding: 0 24px;
        margin-top: 25px;
        .publish_title_icon {
          @include size(6px, 21px);
          background: #ffca73;
          border-radius: 3px;
          margin-top: 18px;
          margin-right: 12px;
        }
        .title {
          font-size: 16px;
          color: #333333;
          font-weight: bold;
          line-height: 56px;
        }
        .fold {
          font-size: 14px;
          color: #999999;
          line-height: 56px;
          cursor: pointer;
          span {
            margin-right: 10px;
          }
        }
      }
      &_cont {
        box-sizing: border-box;
        margin-top: 25px;
        &_title {
          @include size(100%, 53px);
          box-sizing: border-box;
          padding: 0 23px;
          font-size: 15px;
          color: #606266;
          line-height: 53px;
          background-color: #f5f7fa;
        }
        .toolsTitlestate {
          color: #606266;
          font-size: 14px;
          font-weight: normal;
        }
      }
    }
  }
}
.publish_main_cont {
  .recordInfo {
    display: flex;
    margin-top: 10px;
    .recordInfoLf {
      @include size(150px, 50px);
      line-height: 50px;
      text-align: right;
      box-sizing: border-box;
      padding-right: 20px;
    }
  }
}
.operation {
  @include size(50%, auto);
  margin-left: -3px;
  .search_input {
    @include size(82px, 36px);
    background-color: #ffa000;
    border-radius: 3px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    cursor: pointer;
    margin-right: 24px;
    display: inline-block;
    // margin-left: 50px;
  }
  .submit_input {
    background: #fff;
    border: solid 1px #ffa000;
    color: #ffa000;
  }
}
</style>
<style>
#publishLandMapDialog .el-dialog .el-dialog__body {
  padding-top: 0px;
}
#publishLandMapDialog .el-dialog .el-dialog__header {
  padding-top: 10px;
  padding-bottom: 0px;
  text-align: center;
}

.filter_wrap .el-input--small .el-input__inner {
  height: 34px;
}
.filter_wrap .el-row {
  margin-bottom: 10px;
}
.filter_wrap .distpicker-address-wrapper select {
  width: 117px;
  height: 34px;
  font-size: 14px;
  line-height: 34px;
  padding: 0 10px;
}
.filter_wrap .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.filter_wrap .el-date-editor.el-input .el-input__icon {
  line-height: 30px;
  color: #8dc4f7;
}
.el-table th,
.el-table tr {
  /* border:1px solid #ebeef5; */
}
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
.el-form-item__label {
  width: 120px;
}
</style>

