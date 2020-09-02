<template>
  <!-- <div>新增现场勘查记录</div> -->
  <div id="followUpTrackAdd">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="新增现场勘查记录" name="fourth">
        <el-form
          :model="followData"
          ref="followData"
          class="exploration"
          id="exploration"
          label-width="160px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="踏勘日期：" prop="explorDate">
                <el-date-picker
                  v-model="followData.explorDate"
                  type="date"
                  placeholder="请选择日期"
                  value-format="yyyy-MM-dd"
                  style="width:80%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="投产情况描述：">
              <el-input
                type="textarea"
                maxlength="1000"
                minlength="0"
                show-word-limit
                autosize
                v-model="followData.operaInfo"
                placeholder="可针对土地的其他信息进行补充说明"
                style="width:90%;height:160px;"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="项目情况描述：">
              <el-input
                type="textarea"
                maxlength="1000"
                minlength="0"
                show-word-limit
                autosize
                v-model="followData.projectInfo"
                placeholder="可针对土地的其他信息进行补充说明"
                style="width:90%;height:160px;"
              ></el-input>
            </el-form-item>
          </el-row>

          <el-row>
            <el-form-item label="踏勘图：" prop="landImg">
              <el-upload
                action="http://192.168.1.126:8081/epf-document/document/upload/"
                ref="photoUploaderThree"
                list-type="picture-card"
                multiple
                :http-request="prospect_first_photoUploadFile"
                :on-preview="prospect_handlePictureCardPreview"
                :on-remove="prospect_file_List_Remove"
                :before-upload="prospect_beforeAvatarUploadImg"
                :on-success="prospect_first_UploadSuccess"
                :on-error="prospect_upLoadError"
                :file-list="followData.prospectFileList"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="prospectDialogVisible">
                <img width="100%" :src="prospectDialogImageUrl" alt />
              </el-dialog>
              <p style="font-size:14px;color:#999999;">
                <img src alt style="margin-top:10px;" />
                说明：支持JPG.PNG.GIF格式，允许多张上传，图片每张最大6M
              </p>
            </el-form-item>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div class="footBox">
      <div class="button_bg" @click="saveTrack()">保存</div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
import qs from "qs";
import baseURL1 from "../../../../../../utils/config";
export default {
  name: "recordAdd",
  data() {
    return {
      followData: {
        id: this.createId(),
        goodsTrackId: "",
        explorDate: "", //勘探日期
        operaInfo: "", //投产情况
        projectInfo: "", //项目进度

        prospectImg: "", //勘探图
        prospectpId: "", //勘探图
        prospectPhotoFirstUpload: true, //勘探图
        // imgThree: "", //勘探图
        prospectFileList: [] //勘探图
      },

      imgThreeUrlId: [],

      prospectDialogImageUrl: "",
      prospectDialogVisible: false,

      baseUrl: baseURL1.imgUrl,

      txtPutVal: 0,
      txtItemVal: 0,

      activeName: "fourth",
      id: ""
    };
  },
  methods: {
    ...mapActions(["setTabsList"]),

    handleClick(tab, event) {
      console.log(tab, event);
    },

    // 踏勘图方法
    prospect_first_photoUploadFile(files) {
      //土地图片上传
      const file = files.file;
      const formData = new FormData();
      formData.append("files", file);
      if (this.followData.prospectpId) {
        console.log("第二张图片上传");
        formData.append("pId", this.followData.prospectpId);
        this.photoUploadProspect(formData, files, file);
        return;
      }
      if (
        !this.followData.prospectpId &&
        this.followData.prospectPhotoFirstUpload
      ) {
        //第一张图片上传
        console.log("第一张图片上传");
        this.followData.prospectPhotoFirstUpload = false;
        this.photoUploadProspect(formData, files, file, "first");
        return;
      }
      if (
        this.followData.prospectpId &&
        !this.followData.prospectPhotoFirstUpload
      ) {
        //之后的图片上传携带id
        console.log("之后的图片上传携带id");
        this.photoUploadProspect(formData, files, file);
        return;
      }
    },
    photoUploadProspect(formData, files, file, count) {
      //图片上传方法
      const that = this;
      this.$useAppend("/epf-document/document/upload", formData, function(
        event
      ) {
        //进度条
        file.percent = (event.loaded / event.total) * 100;
        files.onProgress(file);
      }).then(res => {
        console.log("这是照片上传的返回", res);
        if (res.state != "SUCCESS") {
          if (count == "first") {
            // 第一张上传出错
            that.followData.prospectPhotoFirstUpload = true;
            return null;
          }
          return null;
        }
        if (!that.followData.prospectpId) {
          that.followData.prospectpId = res.data[0].pId;
          //   that.followData.imgThree = res.data[0].id;
          that.followData.prospectImg = res.data[0].id;
        }
        if (
          that.followData.prospectpId &&
          !that.followData.prospectPhotoFirstUpload
        ) {
          that.$refs.photoUploaderThree.submit();
        }
        that.imgThreeUrlId.push(res.data[0].id);
        files.onSuccess(res);
      });
    },
    prospect_handlePictureCardPreview(file) {
      this.prospectDialogImageUrl = file.url;
      this.prospectDialogVisible = true;
    },
    prospect_file_List_Remove(file, fileList) {
      console.log(file, fileList);
      for (let i = 0; i < this.imgThreeUrlId; i++) {
        if (this.imgThreeUrlId[i] == file.response.data.data[0].id) {
          this.imgThreeUrlId.splice(i, 1);
        }
      }
    },
    prospect_beforeAvatarUploadImg(file) {
      //上传图片格式验证
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isLt6M = file.size / 1024 / 1024 < 6;
      if (!isPNG && !isJPG && !isGIF) {
        this.$message.error("上传土地照片只能是 PNG/jpeg/gif 格式!");
        return false;
      }
      if (!isLt6M) {
        this.$message.error("上传土地照片大小不能超过 6MB!");
        return false;
      }
    },
    prospect_first_UploadSuccess(res, file, fileList) {
      console.log("进入成功函数");
      if (!this.followData.prospectpId) {
        console.log("进入一");
        this.followData.prospectpId = res.data[0].pId;
      }
      this.followData.prospectFileList = fileList;
      for (let i = 0; i < this.followData.prospectFileList.length; i++) {
        console.log("进入二", this.followData.prospectFileList[i].url);
        this.followData.prospectFileList[i].url =
          this.baseUrl + this.imgThreeUrlId[i];
        console.log(this.followData.prospectFileList[i].url);
      }
    },
    prospect_upLoadError(err, file, fileList) {
      //上传失败回调
      this.$message.error("文件上传失败");
    },

    createId() {
      let that = this;
      this.$get("/epf-trade/api/createId", {}).then(res => {
        that.followData["id"] = res.id;
      });
    },

    //保存现场勘查记录新增内容
    saveTrack() {
      let params = this.followData;
      params["goodsTrackId"] = this.$route.query.id;
      this.$post(
        "/epf-monitor/monitor/goodTrack/addGoodTrackRecord",
        params
      ).then(res => {
        console.log(res);
        if (res.code != "0") {
          this.$message.error(res.msg); //失败
          return;
        }
        let title = "修改用地后续跟踪";
        let routerPath = `/system/platform/track/views/landTrack/edit`;
        let itemObj = {url:routerPath,menuname:title}
        //将当前点击的选项添加到vuex中
        this.$router.push({path:routerPath} );
        this.$store.commit("ADD_TAB", itemObj)
        this.$message.success("添加成功");
      });
    }
  }
};
</script>

<style scoped>
#followUpTrackAdd {
  padding: 20px;
}
.editor {
  margin-top: 15px;
}
.editorHeader {
  height: 50px;
  background-color: #f6f7fb;
  font-size: 14px;
  color: #000;
  line-height: 50px;
  margin-top: 40px;
  padding-left: 15px;
}
.icon_th {
  width: 3px;
  height: 12px;
  background-color: #ffa000;
  display: inline-block;
  margin: 0 12px 0 22px;
}
.editorHeader .text {
  margin-left: 10px;
}
#followUpTrackAdd .footBox {
  display: flex;
  justify-content: center;
}
#followUpTrackAdd .footBox .button_bg {
  width: 80px;
  height: 32px;
  background-color: #ffa000;
  border-radius: 2px;
  text-align: center;
  line-height: 36px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  margin-top: 25px;
}
#followUpTrackAdd .exploration {
  margin-top: 40px;
}
i.itext {
  display: flex;
  align-items: center;
  font-size: 12px;
}
</style>

<style>
#followUpTrackAdd .el-tabs--border-card {
  border: none;
}
#followUpTrackAdd .el-tabs__header {
  background-color: #f5f7fa;
  height: 50px;
  border: none;
}
#followUpTrackAdd .el-tabs__item {
  border: none;
  height: 50px;
  line-height: 50px;
  width: 170px;
  text-align: center;
}

#followUpTrackAdd .el-tabs--border-card > .el-tabs__header .el-tabs__nav {
  border: none;
}
#followUpTrackAdd .el-tabs__content .el-tabs__header {
  background-color: #fff;
  margin-top: 20px;
}
#basicInfo {
  margin-top: 40px;
}
.tox-statusbar {
  background-color: #f0f0ee !important;
}
.locationImg {
  padding: 30px 0;
}
#followUpTrackAdd .el-tabs__content {
  padding: 0 30px;
}
#followUpTrackAdd_down .el-tabs__content {
  padding: 0;
}
</style>
