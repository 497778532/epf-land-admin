<template>
  <div id="followUpTrackAdd">
    <epf-container title="新增用地后续跟踪">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="宗地" name="first">
                <div id="followUpTrackAdd_down">
                    <el-tabs v-model="basicInfo">
                        <el-tab-pane label="基本资料" name="info">
                            <el-form
                                :model="followData"
                                ref="followData"
                                label-width="160px"
                                class="demo-ruleForm"
                                id="basicInfo"
                                :rules="rules"
                            >
                                <el-row>
                                <el-col :span="8">
                                    <el-form-item label="地块编号：" prop="goodsId">
                                    <el-input
                                        v-model="followData.goodsId"
                                        placeholder="请输入地块编号"
                                        style="width:80%;"
                                        @blur="getMessage"
                                    ></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="合同约定竣工日期：" prop="completionTime">
                                    <el-date-picker
                                        v-model="followData.completionTime"
                                        type="date"
                                        placeholder="请选择日期"
                                        value-format="yyyy-MM-dd"
                                        style="width:80%"
                                    ></el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="合同约定开工日期：" prop="startUpTime">
                                    <el-date-picker
                                        v-model="followData.startUpTime"
                                        type="date"
                                        placeholder="请选择日期"
                                        value-format="yyyy-MM-dd"
                                        style="width:80%"
                                    ></el-date-picker>
                                    </el-form-item>
                                </el-col>
                                </el-row>
                                <el-row>
                                <el-col :span="8">
                                    <el-form-item label="联系人：" prop="contacts">
                                    <el-input
                                        v-model="followData.contacts"
                                        placeholder="请输入联系人"
                                        style="width:80%;"
                                    ></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="联系人电话：" prop="contactTele">
                                    <el-input
                                        v-model="followData.contactTele"
                                        placeholder="请输入联系人电话"
                                        style="width:80%;"
                                    ></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="实际开工日期：" prop="autualStartUpTime">
                                    <el-date-picker
                                        v-model="followData.autualStartUpTime"
                                        type="date"
                                        placeholder="请选择日期"
                                        value-format="yyyy-MM-dd"
                                        style="width:80%"
                                    ></el-date-picker>
                                    </el-form-item>
                                </el-col>
                                </el-row>
                                <el-row>
                                <el-col :span="8">
                                    <el-form-item label="实际竣工日期：" prop="autualComplTime">
                                    <el-date-picker
                                        v-model="followData.autualComplTime"
                                        type="date"
                                        placeholder="请选择日期"
                                        value-format="yyyy-MM-dd"
                                        style="width:80%"
                                    ></el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="建设状态：" prop="constrStatus">
                                    <el-select
                                        size="small"
                                        v-model="followData.constrStatus"
                                        placeholder="请选择建设状态"
                                        @change="constrStatusSelect(dictionary.constr_status,followData.constrStatus,$event)"
                                        style="width:80%"
                                    >
                                        <el-option
                                        v-for="(item,index) in dictionary.constr_status"
                                        :ref="item.zhCn"
                                        :id="item.id"
                                        :dictKey="item.dictKey"
                                        :label="item.zhCn"
                                        :value="item.zhCn"
                                        :key="index"
                                        ></el-option>
                                    </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="所在区域：" v-if="isSee==true">
                                    <el-input
                                        style="width:80%;"
                                        :disabled="true"
                                        v-model="landData.cantonName"
                                    >{{landData.cantonName}}</el-input>
                                    </el-form-item>
                                </el-col>
                                </el-row>
                                <el-row>
                                <el-col :span="8">
                                    <el-form-item label="交易方式：" v-if="isSee==true">
                                    <el-input
                                        style="width:80%;"
                                        :disabled="true"
                                        v-model="landData.transTypeName"
                                    >{{landData.transTypeName}}</el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="建筑面积：" v-if="isSee==true">
                                    <el-input style="width:80%;" :disabled="true" v-model="landData.buildArea">
                                        {{landData.buildArea}}
                                        <i slot="suffix" class="itext">m²</i>
                                    </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="竞得人：" v-if="isSee==true">
                                    <el-input
                                        style="width:80%;"
                                        :disabled="true"
                                        v-model="landData.winner"
                                    >{{landData.winner}}</el-input>
                                    </el-form-item>
                                </el-col>
                                </el-row>
                                <el-row>
                                <el-col :span="8">
                                    <el-form-item label="成交时间：" v-if="isSee==true">
                                    <el-input
                                        style="width:80%;"
                                        :disabled="true"
                                        v-model="landData.endTransTime"
                                    >{{landData.endTransTime}}</el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="土地用途：" v-if="isSee==true">
                                    <el-input
                                        style="width:80%;"
                                        :disabled="true"
                                        v-model="landData.useName"
                                    >{{landData.useName}}</el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="成交价：" v-if="isSee==true">
                                    <el-input style="width:80%;" :disabled="true" v-model="landData.transPrice">
                                        <i slot="prefix" class="itext">¥</i>
                                        {{landData.transPrice}}
                                        <i
                                        slot="suffix"
                                        class="itext"
                                        >万</i>
                                    </el-input>
                                    </el-form-item>
                                </el-col>
                                </el-row>
                                <el-row>
                                <el-col :span="8">
                                    <el-form-item label="土地坐落：" v-if="isSee==true">
                                    <el-input
                                        style="width:80%;"
                                        :disabled="true"
                                        v-model="landData.location"
                                    >{{landData.location}}</el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="土地类型：" v-if="isSee==true">
                                    <el-input
                                        style="width:80%;"
                                        :disabled="true"
                                        v-model="landData.landCharName"
                                    >{{landData.landCharName}}</el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="起拍价：" v-if="isSee==true">
                                    <el-input style="width:80%;" :disabled="true" v-model="landData.beginPrice">
                                        <i slot="prefix" class="itext">¥</i>
                                        {{landData.beginPrice}}
                                        <i
                                        slot="suffix"
                                        class="itext"
                                        >万</i>
                                    </el-input>
                                    </el-form-item>
                                </el-col>
                                </el-row>
                                <el-row>
                                <el-col :span="8">
                                    <el-form-item label="转让面积：" v-if="landData.circulation=='transfer'">
                                    <el-input style="width:80%;" :disabled="true" v-model="landData.area">
                                        {{landData.area}}
                                        <i slot="suffix" class="itext">m²</i>
                                    </el-input>
                                    </el-form-item>
                                    <el-form-item label="出租面积：" v-if="landData.circulation=='rent'">
                                    <el-input style="width:80%;" :disabled="true" v-model="landData.area">
                                        {{landData.area}}
                                        <i slot="suffix" class="itext">m²</i>
                                    </el-input>
                                    </el-form-item>
                                    <el-form-item label="抵押面积：" v-if="landData.circulation=='mortgage'">
                                    <el-input style="width:80%;" :disabled="true" v-model="landData.area">
                                        {{landData.area}}
                                        <i slot="suffix" class="itext">m²</i>
                                    </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="公告编号：" v-if="isSee==true">
                                    <el-input
                                        style="width:80%;"
                                        :disabled="true"
                                        v-model="landData.noticeNo"
                                    >{{landData.noticeNo}}</el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="剩余使用年限：" v-if="landData.circulation=='transfer'">
                                    <el-input style="width:80%;" :disabled="true" v-model="landData.years">
                                        {{landData.years}}
                                        <i slot="suffix" class="itext">年</i>
                                    </el-input>
                                    </el-form-item>
                                    <el-form-item label="出租年限：" v-if="landData.circulation=='rent'">
                                    <el-input style="width:80%;" :disabled="true" v-model="landData.years">
                                        {{landData.years}}
                                        <i slot="suffix" class="itext">年</i>
                                    </el-input>
                                    </el-form-item>
                                    <el-form-item label="抵押年限：" v-if="landData.circulation=='mortgage'">
                                    <el-input style="width:80%;" :disabled="true" v-model="landData.years">
                                        {{landData.years}}
                                        <i slot="suffix" class="itext">年</i>
                                    </el-input>
                                    </el-form-item>
                                </el-col>
                                </el-row>
                                <el-row>
                                <el-form-item label="其他说明：">
                                    <el-input
                                    type="textarea"
                                    maxlength="1000"
                                    minlength="0"
                                    show-word-limit
                                    autosize
                                    v-model="followData.otherNotes"
                                    placeholder="可针对土地的其他信息进行补充说明"
                                    style="width:90%;height:160px;"
                                    ></el-input>
                                </el-form-item>
                                </el-row>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="地块现场描述" name="target">
                        <goodsEditor class="editor" :goodsInfo="goodsInfo"></goodsEditor>
                        </el-tab-pane>
                        <el-tab-pane label="周边配套设施描述" name="zhoubian">
                        <div class="editorHeader">
                            <span class="icon_th"></span>
                            <span class="text">市场道路状况</span>
                        </div>
                        <municiEditor class="editor" :municiInfo="municiInfo"></municiEditor>
                        <div class="editorHeader">
                            <span class="icon_th"></span>
                            <span class="text">公共交通状况</span>
                        </div>
                        <publicEditor class="editor" :publicInfo="publicInfo"></publicEditor>
                        <div class="editorHeader">
                            <span class="icon_th"></span>
                            <span class="text">其他配套</span>
                        </div>
                        <editor class="editor" :otherInfo="otherInfo"></editor>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-tab-pane>
            <el-tab-pane label="位置图" name="second">
                <el-form class="locationImg" id="locationImg">
                <el-form-item prop="locationImg">
                    <el-upload
                    action="http://192.168.1.200:8081/epf-document/document/upload/"
                    ref="photoUploaderOne"
                    list-type="picture-card"
                    multiple
                    :http-request="location_first_photoUploadFile"
                    :on-preview="location_handlePictureCardPreview"
                    :on-remove="location_file_List_Remove"
                    :before-upload="location_file_List_Remove"
                    :on-success="location_first_UploadSuccess"
                    :on-error="location_upLoadError"
                    :file-list="followData.locationFileList"
                    >
                    <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="locationDialogVisible">
                    <img width="100%" :src="locationDialogImageUrl" alt />
                    </el-dialog>
                    <p style="font-size:14px;color:#999999;">
                    <img src alt style="margin-top:10px;" />
                    说明：支持JPG.PNG.GIF格式，允许多张上传，图片每张最大6M
                    </p>
                </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="地块图" name="third">
                <el-form class="locationImg" id="blockChart">
                <el-form-item prop="goodsImg">
                    <el-upload
                    action="http://192.168.1.200:8081/epf-document/document/upload/"
                    ref="photoUploaderTwo"
                    list-type="picture-card"
                    multiple
                    :http-request="goods_first_photoUploadFile"
                    :on-preview="goods_handlePictureCardPreview"
                    :on-remove="goods_file_List_Remove"
                    :before-upload="goods_beforeAvatarUploadImg"
                    :on-success="goods_first_UploadSuccess"
                    :on-error="goods_upLoadError"
                    :file-list="followData.goodsFileList"
                    >
                    <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="goodsDialogVisible">
                    <img width="100%" :src="goodsDialogImageUrl" alt />
                    </el-dialog>
                    <p style="font-size:14px;color:#999999;">
                    <img src alt style="margin-top:10px;" />
                    说明：支持JPG.PNG.GIF格式，允许多张上传，图片每张最大6M
                    </p>
                </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="现场勘查记录" name="fourth">
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
                    <el-form-item label="踏勘图：" prop="prospectImg">
                    <el-upload
                        action="http://192.168.1.200:8081/epf-document/document/upload/"
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
    </epf-container>
  </div>
</template>
<script>
import goodsEditor from "./goodsEditor";
import municiEditor from "./municiEditor";
import publicEditor from "./publicEditor";
import editor from "./editor";
import { mapActions, mapState } from "vuex";
import baseURL1 from "../../../../../../utils/config";
export default {
  name: "followUpTrackAdd",
  components: {
    // 引入组件
    goodsEditor,
    municiEditor,
    publicEditor,
    editor
  },
  data() {
    return {
      dicRequest: ["constr_status"],
      //字典码请求
      dictionary: {
        //字典码结果
        constr_status: ""
      },
      dicNum: 0, //字典循环下标

      followData: {
        followDataId: this.createId(),
        goodsId: "", //地块编号
        completionTime: "", //竣工时间
        startUpTime: "", //开工时间
        contacts: "", //联系人
        contactTele: "", //联系人电话
        autualStartUpTime: "", //实际开工时间
        autualComplTime: "", //实际竣工时间
        constrStatus: "", //建设状态
        constr_status: "",
        otherNotes: "", //其他说明
        goodsFieldDesc: "", //地块描述
        municiRoadsDesc: "", //市政道路状况
        publicTransDesc: "", //公共交通
        otherDesc: "", //其他配套

        locationImg: "", //位置图
        locationpId: "", //位置图
        locationPhotoFirstUpload: true, //位置图
        // imgOne: "", //位置图
        locationFileList: [], //位置图

        goodsImg: "", //地块图
        goodspId: "", //地块图
        goodsPhotoFirstUpload: true, //地块图
        // imgTwo: "", //地块图
        goodsFileList: [], //地块图

        explorDate: "", //勘探日期
        operaInfo: "", //投产情况
        projectInfo: "", //项目进度

        prospectImg: "", //勘探图
        prospectpId: "", //勘探图
        prospectPhotoFirstUpload: true, //勘探图
        // imgThree: "", //勘探图
        prospectFileList: [] //勘探图
      },

      rules: {
        goodsId: [
          {
            required: true,
            message: "请先输入正确的地块编号获取相关的信息",
            trigger: "blur"
          }
        ],
        completionTime: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        startUpTime: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        autualStartUpTime: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        autualComplTime: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        constrStatus: [
          { required: true, message: "请选择建设状态", trigger: "change" }
        ]
      },

      imgOneUrlId: [],
      imgTwoUrlId: [],
      imgThreeUrlId: [],

      locationDialogImageUrl: "",
      locationDialogVisible: false,

      goodsDialogImageUrl: "",
      goodsDialogVisible: false,

      prospectDialogImageUrl: "",
      prospectDialogVisible: false,

      baseUrl: baseURL1.imgUrl,

      params: {
        goodsNo: ""
      },

      landData: {
        cantonName: "",
        useName: ""
      },
      isSee: false,

      txtBasicVal: 0,
      txtPutVal: 0,
      txtItemVal: 0,

      // blockChart: {
      //   fileList: []
      // },

      activeName: "first",
      basicInfo: "info",

      goodsInfo: {
        content: ""
      },
      municiInfo: {
        content: ""
      },
      publicInfo: {
        content: ""
      },
      otherInfo: {
        content: ""
      }
      // isViewHtml:false,
      // dialogVisible:false,
    };
  },
  methods: {

    handleClick(tab, event) {
      console.log(tab, event);
    },

    // 位置图方法
    location_first_photoUploadFile(files) {
      debugger;
      const file = files.file;
      const formData = new FormData();
      formData.append("files", file);
      if (this.followData.locationpId) {
        console.log("第二张图片上传");
        formData.append("pId", this.followData.locationpId);
        this.photoUploadLocation(formData, files, file);
        return;
      }
      if (
        !this.followData.locationpId &&
        this.followData.locationPhotoFirstUpload
      ) {
        //第一张图片上传
        console.log("第一张图片上传");
        this.followData.locationPhotoFirstUpload = false;
        this.photoUploadLocation(formData, files, file, "first");
        return;
      }
      if (
        this.followData.locationpId &&
        !this.followData.locationPhotoFirstUpload
      ) {
        console.log("之后的图片上传携带id");
        this.photoUploadLocation(formData, files, file);
        return;
      }
    },
    photoUploadLocation(formData, files, file, count) {
  
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
            that.followData.locationPhotoFirstUpload = true;
            return null;
          }
          return null;
        }
            debugger;
        if (!that.followData.locationpId) {
          that.followData.locationpId = res.data[0].pId;
          that.followData.locationImg = res.data[0].id;
          // that.followData.imgOne = res.data[0].id;
        }
        if (
          that.followData.locationpId &&
          !that.followData.locationPhotoFirstUpload
        ) {
          that.$refs.photoUploaderOne.submit();
        }
        that.imgOneUrlId.push(res.data[0].id);
        files.onSuccess(res);
      });
    },
    location_handlePictureCardPreview(file) {
      debugger;
      this.locationDialogImageUrl = file.url;
      this.locationDialogVisible = true;
    },
    location_file_List_Remove(file, fileList) {
      // const id = file.url.split("?")[1].split("=")[1];
      // this.$post("/epf-document/document/deleteById", { id: id }).then(res => {
      //   if (res.state === "SUCCESS") {
      //     this.$message.warning(res.msg);
      //     queryFiles(this.parentId);
      //   } else {
      //     this.$message.warning(res.msg);
      //   }
      // });
    },
    location_beforeAvatarUploadImg(file) {
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
    location_first_UploadSuccess(res, file, fileList) {
      console.log("进入成功函数");
      // if (!this.ruleForm.pId) {
      //   console.log("进入一");
      //   this.ruleForm.pId = res.data[0].pId;
      // }
      // this.ruleForm.fileList = fileList;
      // for (let i = 0; i < this.ruleForm.fileList.length; i++) {
      //   console.log("进入二", this.ruleForm.fileList[i].url);
      //   this.ruleForm.fileList[i].url = this.baseUrl + this.imgUrlId[i];
      //   console.log(this.ruleForm.fileList[i].url);
      // }
      // console.log(this.ruleForm);
    },
    location_upLoadError(err, file, fileList) {
      //上传失败回调
      this.$message.error("文件上传失败");
    },

    // 地块图方法
    goods_first_photoUploadFile(files) {
      //土地图片上传
      const file = files.file;
      const formData = new FormData();
      formData.append("files", file);
      if (this.followData.goodspId) {
        console.log("第二张图片上传");
        formData.append("pId", this.followData.goodspId);
        this.photoUploadGoods(formData, files, file);
        return;
      }
      if (!this.followData.goodspId && this.followData.goodsPhotoFirstUpload) {
        //第一张图片上传
        console.log("第一张图片上传");
        this.followData.goodsPhotoFirstUpload = false;
        this.photoUploadGoods(formData, files, file, "first");
        return;
      }
      if (this.followData.goodspId && !this.followData.goodsPhotoFirstUpload) {
        //之后的图片上传携带id
        console.log("之后的图片上传携带id");
        this.photoUploadGoods(formData, files, file);
        return;
      }
    },
    photoUploadGoods(formData, files, file, count) {
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
            that.followData.goodsPhotoFirstUpload = true;
            return null;
          }
          return null;
        }
        debugger
        if (!that.followData.goodspId) {
          that.followData.goodspId = res.data[0].pId;
          that.followData.goodsImg = res.data[0].id;
          // that.followData.imgTwo = res.data[0].id;
        }
        if (
          that.followData.goodspId &&
          !that.followData.goodsPhotoFirstUpload
        ) {
          that.$refs.photoUploaderTwo.submit();
        }
        that.imgTwoUrlId.push(res.data[0].id);
        files.onSuccess(res);
      });
    },
    goods_handlePictureCardPreview(file) {
      this.goodsDialogImageUrl = file.url;
      this.goodsDialogVisible = true;
    },
    goods_file_List_Remove(file, fileList) {
      console.log(file, fileList);
      for (let i = 0; i < this.imgTwoUrlId; i++) {
        if (this.imgTwoUrlId[i] == file.response.data.data[0].id) {
          this.imgTwoUrlId.splice(i, 1);
        }
      }
    },
    goods_beforeAvatarUploadImg(file) {
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
    goods_first_UploadSuccess(res, file, fileList) {
      console.log("进入成功函数");
      // if (!this.followData.goodspId) {
      //   console.log("进入一");
      //   this.followData.goodspId = res.data[0].pId;
      // }
      // this.followData.goodsFileList = fileList;
      // for (let i = 0; i < this.followData.goodsFileList.length; i++) {
      //   console.log("进入二", this.followData.goodsFileList[i].url);
      //   this.followData.goodsFileList[i].url =
      //     this.baseUrl + this.imgTwoUrlId[i];
      //   console.log(this.followData.goodsFileList[i].url);
      // }
    },
    goods_upLoadError(err, file, fileList) {
      //上传失败回调
      this.$message.error("文件上传失败");
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
          that.followData.prospectImg = res.data[0].id;
          // that.followData.imgThree = res.data[0].id;
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
      // if (!this.followData.prospectpId) {
      //   console.log("进入一");
      //   this.followData.prospectpId = res.data[0].pId;
      // }
      // this.followData.prospectFileList = fileList;
      // for (let i = 0; i < this.followData.prospectFileList.length; i++) {
      //   console.log("进入二", this.followData.prospectFileList[i].url);
      //   this.followData.prospectFileList[i].url =
      //     this.baseUrl + this.imgThreeUrlId[i];
      //   console.log(this.followData.prospectFileList[i].url);
      // }
    },
    prospect_upLoadError(err, file, fileList) {
      //上传失败回调
      this.$message.error("文件上传失败");
    },

    createId() {
      let that = this;
      this.$get("/epf-trade/api/createId", {}).then(res => {
        that.followData["followDataId"] = res.id;
      });
    },

    //根据地块编号回显数据
    getMessage(val) {
      let params = this.params;
      params["goodsNo"] = this.followData.goodsId;
      this.$post(
        `/epf-monitor/monitor/goodTrack/getGoodsInfoByGoodsNo`,
        params
      ).then(res => {
        console.log(res);
        if (res.code == "0") {
          this.isSee = true;
          this.landData = res.result;

          this.landData.cantonName =
            res.result.cantonProvinceName +
            "-" +
            res.result.cantonCityName +
            "-" +
            res.result.cantonAreaName;
          this.landData.useName =
            res.result.firstClassUseName + "-" + res.result.secondClassUseName;

          console.log(this.landData);
        } else {
          this.isSee = false;
          this.$message.error(res.msg); //失败
          return;
        }
      });
    },

    //保存用地用地后续跟踪新增内容
    saveTrack: function() {
      this.followData.goodsFieldDesc = this.goodsInfo.content;
      this.followData.municiRoadsDesc = this.municiInfo.content;
      this.followData.publicTransDesc = this.publicInfo.content;
      this.followData.otherNotes = this.otherInfo.content;
        debugger
      this.$post(
        "/epf-monitor/monitor/goodTrack/addGoodTrack",
        this.followData
      ).then(res => {
        console.log(res);
        if (res.code != "0") {
          this.$message.error(res.msg); //失败
          return;
        }
        console.log(this.followData);
        let title = "用地后续跟踪";
        let routerPath = `/system/platform/track/views/landTrack/landTrack`;
        let itemObj = {url:routerPath,menuname:title}
        //将当前点击的选项添加到vuex中
        this.$router.push({path:routerPath} );
        this.$store.commit("ADD_TAB", itemObj)
        this.$message.success("添加成功");
      });
    },


    //字典结果
    constrStatusSelect(dic, constrStatus, event) {
      this.followData.constr_status = this.$refs[
        constrStatus
      ][0].$attrs.dictKey;
    }
  },
  created() {
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == "administrative_regions" || item == "land_use") {
          this.$get(
            `/epf-trade/dictionaries/getDictsByCodeOrParentId?code=${item}`,
            { parentId: 0 }
          ).then(res => {
            resolve(res);
          });
        } else {
          this.$get(
            `/epf-trade/dictionaries/getDictEbyDictGroup/${item}`,
            {}
          ).then(res => {
            resolve(res);
          });
        }
      });
      return reqFun;
    });
    Promise.all(reqArr).then(res => {
      console.log(res);
      let dicArr = res.map(item => {
        console.log(item);
        let dicArr = item.dictionariesList.map(item => {
          return {
            dictKey: item.dictKey,
            zhCn: item.zhCn,
            id: item.id
          };
        });
        return dicArr;
      });
      console.log(dicArr);
      for (let item in this.dictionary) {
        console.log(this.dicNum);
        this.dictionary[item] = dicArr[this.dicNum];
        // console.log(dicArr[this.dicNum])
        this.dicNum++;
      }
      this.dicFinsh = true;
      console.log("字典结果", this.dictionary);
    });
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
