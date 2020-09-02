<template>
  <!-- <div>编辑用地后续跟踪</div> -->
  <div id="followUpTrackAdd" :view-id="newRender">
    <div class="detail_top">
      <p class="detail_top_title">详情页</p>
      <table width="100%" border="1" cellpadding="0" cellspacing="0" bordercolor="#dcdfe6">
        <tr height="50px">
          <td>
            <span class="left_text">地块编号：</span>
            {{trackDetail.goodsNo}}
          </td>
          <td>
            <span class="left_text">土地用途：</span>
            {{trackDetail.firstClassUseName}}-{{trackDetail.secondClassUseName}}
          </td>
          <td>
            <span class="left_text">建设状态：</span>
            {{trackDetail.constrStatusName}}
          </td>
        </tr>
        <tr height="50px">
          <td>
            <span class="left_text">所在区域：</span>
            {{trackDetail.cantonProvinceName}}-{{trackDetail.cantonCityName}}-{{trackDetail.cantonAreaName}}
          </td>
          <td>
            <span class="left_text">交易方式：</span>
            {{trackDetail.transTypeName}}
          </td>
          <td>
            <span class="left_text">成交时间：</span>
            {{trackDetail.endTransTime}}
          </td>
        </tr>
      </table>
    </div>
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
                      <el-input v-model="followData.goodsId" style="width:80%;" :disabled="true"></el-input>
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
                        v-model="followData.constrStatusName"
                        placeholder="请选择建设状态"
                        @change="constrStatusSelect(dictionary.constr_status,followData.constrStatusName,$event)"
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
                    <el-form-item label="所在区域：">
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
                    <el-form-item label="交易方式：">
                      <el-input
                        style="width:80%;"
                        :disabled="true"
                        v-model="landData.transTypeName"
                      >{{landData.transTypeName}}</el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="建筑面积：">
                      <el-input style="width:80%;" :disabled="true" v-model="landData.buildArea">
                        {{landData.buildArea}}
                        <i slot="suffix" class="itext">m²</i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="竞得人：">
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
                    <el-form-item label="成交时间：">
                      <el-input
                        style="width:80%;"
                        :disabled="true"
                        v-model="landData.endTransTime"
                      >{{landData.endTransTime}}</el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="土地用途：">
                      <el-input
                        style="width:80%;"
                        :disabled="true"
                        v-model="landData.useName"
                      >{{landData.useName}}</el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="成交价：">
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
                    <el-form-item label="土地坐落：">
                      <el-input
                        style="width:80%;"
                        :disabled="true"
                        v-model="landData.location"
                      >{{landData.location}}</el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="土地类型：">
                      <el-input
                        style="width:80%;"
                        :disabled="true"
                        v-model="landData.landCharName"
                      >{{landData.landCharName}}</el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="起拍价：">
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
                    <el-form-item label="公告编号：">
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
              :before-upload="location_beforeAvatarUploadImg"
              :on-success="location_first_UploadSuccess"
              :on-error="location_upLoadError"
              :file-list="locationFileList"
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
            <!-- <ul class="imgaeBox">
              <li v-for="(item,index) in followData.goodsFileList" :key="index" class="imageLi">
                <img :src="item.url" alt :onerror="defaultImg" />
              </li>
            </ul>-->
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
              :file-list="goodsFileList"
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
        <div class="addRecordBtn" @click="handleClickAdd">
          <i class="el-icon-circle-plus-outline"></i>添加勘探记录
        </div>
        <el-timeline style="margin:35px 0;">
          <el-timeline-item
            color="#ffa000"
            size="large"
            v-for="(item,index) in recordData"
            :key="index"
          >
            <el-collapse accordion>
              <el-collapse-item>
                <template slot="title">
                  <div class="timeline_main">
                    <span class="timeline_title">踏勘日期：</span>
                    <span class="timeline_content">{{item.explorDate}}</span>
                    <span class="toTaKan" @click.stop="toTaKan(item.id)">编辑</span>
                  </div>
                  <div class="timeline_main">
                    <span class="timeline_title">投产情况描述：</span>
                    <span class="timeline_content" v-if="flexibleOpen==true">{{item.operaInfo}}</span>
                    <span
                      class="timeline_content"
                      style="display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:1;"
                      v-if="flexibleOpen==false"
                    >{{item.operaInfo}}</span>
                  </div>
                </template>

                <div class="timeline_main">
                  <span class="timeline_title">项目情况描述：</span>
                  <span class="timeline_content">{{item.projectInfo}}</span>
                </div>
                <div class="timeline_main">
                  <span class="timeline_title">踏勘图：</span>
                  <span class="timeline_content">
                    <ul>
                      <li class="imgContain" v-for="(key,i) in item.prospectList" :key="i">
                        <img :src="key.url" alt :onerror="defaultImg" />
                      </li>
                    </ul>
                  </span>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-timeline-item>
        </el-timeline>
        <div style="text-align:right;margin:22px 0px;">
          <el-pagination
            background
            layout="total,prev, pager, next,sizes,jumper"
            :page-sizes="[1,5,10,15,20]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
            :current-page="currentPage"
            :page-size="pageSize"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="footBox">
      <div class="button_bg" @click="saveTrack()">保存</div>
    </div>
  </div>
</template>
<script>
import goodsEditor from "./goodsEditor";
import municiEditor from "./municiEditor";
import publicEditor from "./publicEditor";
import editor from "./editor";
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";
import Bus from "../../../../../utils/bus";
import qs from "qs";
import baseURL1 from "../../../../../utils/config";
export default {
  name: "followUpTrackEditor",
  components: {
    // 引入组件
    goodsEditor,
    municiEditor,
    publicEditor,
    editor
  },
  data() {
    return {
      id: "",

      //展开收起
      switchHeight: 80 + "px",
      flexibleOpen: false,
      //  defaultImg:require('../../../../../assets/bg.png') ,
      defaultImg:
        'this.src="' +
        require("../../../../../assets/images/homeHeadImg.jpg") +
        '"', //默认图地址

      //页码
      currentPage: 1,
      pageNo: 1, //页码
      pageSize: 5, //每页条数
      totalPage: 1,
      totalRecord: 1,

      activeIndex: "",

      dicRequest: ["constr_status"],
      //字典码请求
      dictionary: {
        //字典码结果
        constr_status: ""
      },
      goodsFileList: [],
      locationFileList: [],
      dicNum: 0, //字典循环下标

      followData: {
        followDataId: "",
        goodsId: "", //地块编号
        completionTime: "", //竣工时间
        startUpTime: "", //开工时间
        contacts: "", //联系人
        contactTele: "", //联系人电话
        autualStartUpTime: "", //实际开工时间
        autualComplTime: "", //实际竣工时间
        constrStatus: "", //建设状态
        constrStatusName: "",
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
        locationFileList: [],

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
        prospectPhotoFirstUpload: true, //地块图
        // imgThree: "", //地块图
        prospectFileList: [] //地块图
      },

      recordData: [],

      rules: {
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

      paramsRecord: {
        id: ""
      },

      landData: {
        cantonName: "",
        useName: ""
      },

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
    ...mapActions(["setTabsList"]),

    handleClick(tab, event) {
      console.log(tab, event);
    },

    flexSwitch(index) {
      console.log(index);
      this.activeIndex = index;
    },
    async imgAxios(id, array, array2, key) {
      const { fileList } = await axios.get(
        "/api/epf-document/document/getOneGroupFilsById",
        {
          params: {
            id: id
          }
        }
      );

      let filesData = fileList;
      for (let index = 0; index < filesData.length; index++) {
        // if(index=0){
        //   debugger;
        //   this.followData[key]=filesData[0].pId
        // };
        if (
          filesData[index].extName == "png" ||
          filesData[index].extName == "jpeg" ||
          filesData[index].extName == "PNG" ||
          filesData[index].extName == "jpg" ||
          filesData[index].extName == "JPG" ||
          filesData[index].extName == "jifi" ||
          filesData[index].extName == "gif"
        ) {
          array.push({
            name: filesData[index].name,
            url: this.baseUrl + filesData[index].id
          });
          if (array2) {
            array2.push(filesData[index].id);
          }
        }
      }
      if (key) {
        this.followData[key] = filesData[0].pId;
      }
      // this.locationFileList = array;
    },
    // 位置图方法
    location_first_photoUploadFile(files) {
      //土地图片上传
      const file = files.file;
      console.log(this.followData.locationPhotoFirstUpload);
      const formData = new FormData();
      debugger;
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
        //之后的图片上传携带id
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
        if (!that.followData.locationpId) {
          that.followData.locationpId = res.data[0].pId;
          that.followData.locationImg = res.data[0].id;
          // that.followData.imgOne = res.data[0].id;
        } else {
          that.followData.locationpId = that.followData.locationImg;
        }
        if (
          that.followData.locationImg &&
          !that.followData.locationPhotoFirstUpload
        ) {
          that.$refs.photoUploaderOne.submit();
        }
        that.imgOneUrlId.push(res.data[0].id);
        files.onSuccess(res);
      });
    },
    location_handlePictureCardPreview(file) {
      this.locationDialogImageUrl = file.url;
      this.locationDialogVisible = true;
    },
    location_file_List_Remove(file, fileList, array) {
      const id = file.url.split("?")[1].split("=")[1];
      this.$post("/epf-document/document/deleteById", { id: id }).then(res => {
        if (res.state === "SUCCESS") {
          this.$message.warning(res.msg);
          queryFiles(this.parentId);
        } else {
          this.$message.warning(res.msg);
        }
      });
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
      console.log(this.followData);
      if (!this.followData.locationpId) {
        console.log("进入一");
        this.followData.locationpId = res.data[0].pId;
      }
      this.followData.locationFileList = fileList;
      for (let i = 0; i < this.followData.locationFileList.length; i++) {
        this.followData.locationFileList[i].url =
          this.baseUrl + this.imgOneUrlId[i];
        console.log(this.followData.locationFileList[i].url);
      }
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
      const id = file.url.split("?")[1].split("=")[1];
      this.$post("/epf-document/document/deleteById", { id: id }).then(res => {
        if (res.state === "SUCCESS") {
          this.$message.warning(res.msg);
        } else {
          this.$message.warning(res.msg);
        }
      });
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
      if (!this.followData.goodspId) {
        console.log("进入一");
        this.followData.goodspId = res.data[0].pId;
      }
      this.followData.goodsFileList = fileList;
      for (let i = 0; i < this.followData.goodsFileList.length; i++) {
        console.log("进入二", this.followData.goodsFileList[i].url);
        this.followData.goodsFileList[i].url =
          this.baseUrl + this.imgTwoUrlId[i];
        console.log(this.followData.goodsFileList[i].url);
      }
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
    toTaKan(id) {
      let title = "修改现场勘查记录";
      let routerPath = "/recordAmend";
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({ path: routerPath, query: { id: id } });
    },

    //获取原有信息
    async getList() {
      let id = this.trackDetail.id;
      let res = await this.$post(
        `/epf-monitor/monitor/goodTrack/getTrackDetall`,
        { id: id }
      );
      console.log(res);
      if (res.code == "0") {
        this.followData = res.result;
        this.followData.goodsId = res.result.goodsNo;

        this.followData.goodspId = "";
        this.followData["locationPhotoFirstUpload"] = true;
        this.followData["goodsPhotoFirstUpload"] = true;
        this.getMessage();
        if (this.followData.locationImg) {
          this.followData["locationFileList"] = [];
          this.followData["locationpId"] = "";
          this.imgAxios(
            this.followData.locationImg,
            this.locationFileList,
            this.imgOneUrlId,
            "locationpId"
          );
        }
        if (this.followData.goodsImg) {
          this.followData["goodsFileList"] = [];
          this.imgAxios(
            this.followData.goodsImg,
            this.goodsFileList,
            this.imgTwoUrlId,
            "goodspId"
          );
        }
        if (res.result.goodsFieldDesc) {
          this.goodsInfo.content = this.removeTAG(res.result.goodsFieldDesc);
        }
        if (res.result.municiRoadsDesc) {
          this.municiInfo.content = this.removeTAG(res.result.municiRoadsDesc);
        }
        if (res.result.publicTransDesc) {
          this.publicInfo.content = this.removeTAG(res.result.publicTransDesc);
        }
        if (res.result.otherNotes) {
          this.otherInfo.content = this.removeTAG(res.result.otherNotes);
        }
        console.log(this.followData);
      } else {
        this.$message.error(res.msg); //失败
        return;
      }
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
          this.landData = res.result;

          this.landData.cantonName =
            res.result.cantonProvinceName +
            "-" +
            res.result.cantonCityName +
            "-" +
            res.result.cantonAreaName;
          this.landData.useName =
            res.result.firstClassUseName + "-" + res.result.secondClassUseName;

          console.log(this.followData);
        } else {
          this.$message.error(res.msg); //失败
          return;
        }
      });
    },
    removeTAG(str) {
      return str.replace(/<[^>]+>/g, "");
    },
    //根据id获取跟踪记录
    async getFollowMessage() {
      let params = this.paramsRecord;
      params["id"] = this.trackDetail.id;
      params["page"] = this.pageNo;
      params["rows"] = this.pageSize;
      let res = await this.$post(
        `/epf-monitor/monitor/goodTrack/getTrackRecord`,
        params
      );
      console.log(res);
      if (res.code == "0") {
        const that = this;
        this.recordData = res.pager.results;
        this.pageNo = res.pager.pageNo;
        this.pageSize = res.pager.pageSize;
        this.totalPage = res.pager.totalPage;
        this.totalRecord = res.pager.totalRecord;
        this.recordData.forEach(function(item, index) {
          if (item.prospectImg) {
            item["prospectList"] = [];
            that.imgAxios(item.prospectImg, item.prospectList);
          }
        });
        console.log(that.recordData);
      } else {
        this.$message.error(res.msg); //失败
        return;
      }
    },
    handleSizeChange(val) {
      //每页条数改变时触发
      this.pageSize = val; //显示条数改变
      this.getFollowMessage();
    },
    handleCurrentChange(val) {
      //当前页发生改变时触发
      this.pageNo = val; //页码改变
      this.getFollowMessage();
    },
    //修改现场勘查记录
    handleClickEditor(item) {},
    //新增现场勘查记录
    handleClickAdd() {
      let title = "新增现场勘查记录";
      let routerPath = "/recordAdd";
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({
        path: routerPath,
        query: { id: this.trackDetail.id }
      });
    },

    //保存用地用地后续跟踪修改内容
    saveTrack() {
      this.followData.goodsFieldDesc = this.goodsInfo.content;
      this.followData.municiRoadsDesc = this.municiInfo.content;
      this.followData.publicTransDesc = this.publicInfo.content;
      this.followData.otherNotes = this.otherInfo.content;
      let params = this.followData;
      delete params["createTime"]; //即可删除createTime属性
      delete params["updateTime"]; //即可删除updateTime属性
      console.log(params);
      this.$post(
        "/epf-monitor/monitor/goodTrack/updateGoodTrackById",
        params
      ).then(res => {
        console.log(res);
        if (res.code != "0") {
          this.$message.error(res.msg); //失败
          return;
        }
        console.log(this.followData);
        let title = "用地后续跟踪";
        let routerPath = "/followUpTrack";
        this.$bus.$emit("closeTabsItem", this.$route.name);
        let tabObj = { title, routerPath };
        this.setTabsList(tabObj);
        Bus.$emit("followUpTrackSave", true);
        this.$router.push({ path: routerPath });
        this.$message.success("修改成功");
      });
    },
    //字典结果
    constrStatusSelect(dic, constrStatusName, event) {
      this.followData.constr_status = this.$refs[
        constrStatusName
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
    this.followData.followDataId = this.$route.query.id;
    this.getList();
    this.getFollowMessage();
  },
  watch: {
    followUpTrackEditor:function (newd,old) {

      this.id = this.trackDetail.id;
      this.getFollowMessage(this.trackDetail.id);
      this.activeName = "fourth";
      console.log(this.recordData)
      this.followUpTrackEditor=!this.followUpTrackEditor
      debugger
    }
    
  },
  computed: {
    ...mapState("track", ["trackDetail"]),
    ...mapState("monitoringSupervision", ["followUpTrackEditor"]),
    newRender: function() {
      this.id = this.trackDetail.id;
      this.getList(this.trackDetail.id);
      this.getFollowMessage(this.trackDetail.id);
    }
  },
  mounted() {
    // Bus.$on("followUpTrackEditorSave", val => {
    //   this.id = this.trackDetail.id;
    //   this.getFollowMessage(this.trackDetail.id);
    //   this.activeName = "fourth";
    // });
  }
};
</script>

<style scoped>
#followUpTrackAdd {
  padding: 20px;
}
.detail_top {
  box-sizing: border-box;
  padding: 35px 25px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  margin-bottom: 20px;
  background: #fff;
}
.detail_top_title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 30px;
}
.left_text {
  color: #666;
  margin-left: 10px;
}
.addRecordBtn {
  display: flex;
  justify-content: center;
  width: 150px;
  height: 40px;
  background-color: #ffa000;
  border-radius: 5px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  margin: 30px 0;
}
.addRecordBtn .el-icon-circle-plus-outline {
  display: flex;
  width: 20px;
  height: 20px;
  background-color: #ffa000;
  margin-right: 10px;
  color: #fff;
  font-size: 20px;
  line-height: 40px;
  cursor: pointer;
}

.timeline_main {
  display: flex;
  line-height: 34px;
  margin-bottom: 15px;
}
.timeline_title {
  width: 120px;
  text-align: right;
  color: #666;
}
.timeline_content {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}
.table_th {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  /* border-bottom: 1px solid transparent; */
  background-color: #f5f7fa;
  text-align: left;
  line-height: 50px;
  font-weight: bolder;
}
.icon_th {
  width: 3px;
  height: 12px;
  background-color: #ffa000;
  display: inline-block;
  margin: 0 12px 0 22px;
  border-radius: 3px;
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
.special_text_4 {
  width: 80px;
  text-align: right;
  display: inline-block;
}
.special_text_6 {
  width: 110px;
  text-align: right;
  display: inline-block;
}
.special_text_8 {
  width: 130px;
  text-align: right;
  display: inline-block;
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
#followUpTrackAdd .imgContain {
  width: 150px;
  height: 100px;
  margin-right: 20px;
  display: inline-block;
}
#followUpTrackAdd .imgContain img {
  width: 100%;
  height: 100%;
}
#followUpTrackAdd .imageLi {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  border: 1px solid #666;
  margin-right: 20px;
  display: inline-block;
}
#followUpTrackAdd .imageLi img {
  width: 100%;
  height: 100%;
}
li {
  list-style: none;
}
#followUpTrackAdd .toTaKan {
  width: 50px;
  height: 28px;
  background-color: #ffa000;
  border-radius: 3px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  margin-right: 10px;
  line-height: 30px;
  cursor: pointer;
  float: right;
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
#followUpTrackAdd .el-collapse-item__header {
  display: block;
  height: 90px;
  line-height: 90px;
  border-bottom: none;
}

#followUpTrackAdd .el-collapse {
  border: none;
}
#followUpTrackAdd .el-collapse-item__arrow {
  position: absolute;
  right: 0;
  top: 50%;
}

#followUpTrackAdd .imgaeBox li img {
  width: 146px;
  height: 146px;
}
/* #followUpTrackAdd .editor{
  position: absolute;
  right:0;
  top:0
} */
</style>