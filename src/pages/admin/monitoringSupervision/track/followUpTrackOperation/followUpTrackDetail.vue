<template>
  <!-- <div>用地后续跟踪详情</div> -->
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
            {{trackDetail.constrStatus}}
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
    <el-tabs v-model="activeTabs" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="宗地" name="first">
        <div id="followUpTrackAdd_down">
          <el-tabs v-model="basicInfo">
            <el-tab-pane label="基本资料" name="info">
              <div class="table_th" style="margin-top:35px;">
                <i class="icon_th"></i>地块建设情况
              </div>
              <table width="100%" border="1" cellpadding="0" cellspacing="0" bordercolor="#dcdfe6">
                <tr height="50px">
                  <td>
                    <span class="left_text special_text_6">地块编号：</span>
                    {{followData.goodsId}}
                  </td>
                  <td>
                    <span class="left_text special_text_8">合同约定竣工日期：</span>
                    {{followData.completionTime}}
                  </td>
                  <td>
                    <span class="left_text special_text_8">合同约定开工日期：</span>
                    {{followData.startUpTime}}
                  </td>
                </tr>
                <tr height="50px">
                  <td>
                    <span class="left_text special_text_6">联系人：</span>
                    {{followData.contacts}}
                  </td>
                  <td>
                    <span class="left_text special_text_8">联系人电话：</span>
                    {{followData.contactTele}}
                  </td>
                  <td>
                    <span class="left_text special_text_8">实际开工日期：</span>
                    {{followData.autualStartUpTime}}
                  </td>
                </tr>
                <tr height="50px">
                  <td>
                    <span class="left_text special_text_6">实际竣工日期：</span>
                    {{followData.autualComplTime}}
                  </td>
                  <td>
                    <span class="left_text special_text_8">建设状态：</span>
                    {{followData.constrStatus}}
                  </td>
                  <td></td>
                </tr>
                <tr height="50px">
                  <td colspan="3">
                    <span class="left_text special_text_6">备注：</span>
                    {{followData.otherNotes}}
                  </td>
                </tr>
              </table>

              <div class="table_th" style="margin-top:35px;">
                <i class="icon_th"></i>地块基本情况
              </div>
              <table
                width="100%"
                border="1"
                cellpadding="0"
                cellspacing="0"
                bordercolor="#dcdfe6"
                style="margin-bottom:35px;"
              >
                <tr height="50px">
                  <td>
                    <span class="left_text special_text_4">所在区域：</span>
                    {{followData.cantonName}}
                  </td>
                  <td>
                    <span class="left_text special_text_4">交易方式：</span>
                    {{followData.transTypeName}}
                  </td>
                  <td>
                    <span class="left_text special_text_4">建筑面积：</span>
                    {{followData.buildArea}}m²
                  </td>
                </tr>
                <tr height="50px">
                  <td>
                    <span class="left_text special_text_4">竞得人：</span>
                    {{followData.winner}}
                  </td>
                  <td>
                    <span class="left_text special_text_4">成交时间：</span>
                    {{followData.endTransTime}}
                  </td>
                  <td>
                    <span class="left_text special_text_4">土地用途：</span>
                    {{followData.useName}}
                  </td>
                </tr>
                <tr height="50px">
                  <td>
                    <span class="left_text special_text_4">成交价：</span>
                    {{followData.transPrice}}万元
                  </td>
                  <td>
                    <span class="left_text special_text_4">土地坐落：</span>
                    {{followData.location}}
                  </td>
                  <td>
                    <span class="left_text special_text_4">土地类型：</span>
                    {{followData.landCharName}}
                  </td>
                </tr>
                <tr height="50px">
                  <td>
                    <span class="left_text special_text_4">起拍价：</span>
                    {{followData.beginPrice}}万元
                  </td>
                  <td>
                    <span v-if="followData.circulation=='transfer'" class="left_text">
                      转让面积：{{followData.area}}m²
                    </span>
                      <span v-if="followData.circulation=='rent'" class="left_text">
                      出租面积：{{followData.area}}m²
                    </span>
                         <span v-if="followData.circulation=='mortgage'" class="left_text">
                      抵押面积：{{followData.area}}m²
                    </span>
                    <!-- <span
                      class="left_text special_text_4"
                      v-if="followData.circulation=='transfer'"
                    >转让面积：{{followData.area}}m²
                    </span> -->
                
                    <!-- <span
                      class="left_text special_text_4"
                      v-if="followData.circulation=='rent'"
                    >出租面积：{{followData.area}}m²
                    </span> -->
                  
                    <!-- <span
                      class="left_text special_text_4"
                      v-if="followData.circulation=='mortgage'"
                    >抵押面积：{{followData.area}}m²
                    </span> -->
          
                  </td>
                  <td>
                    <span class="left_text special_text_4">公告编号：</span>
                    {{followData.noticeNo}}
                  </td>
                </tr>
                <tr height="50px">
                  <td>
                    <span
                      class="left_text special_text_4"
                      v-if="followData.circulation=='transfer'"
                    >剩余使用年限：</span>
                    {{followData.years}}年
                    <span
                      class="left_text special_text_4"
                      v-if="followData.circulation=='rent'"
                    >出租年限：</span>
                    {{followData.years}}年
                    <span
                      class="left_text special_text_4"
                      v-if="followData.circulation=='mortgage'"
                    >抵押年限：</span>
                    {{followData.years}}年
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              </table>
            </el-tab-pane>
            <el-tab-pane label="地块现场描述" name="target">
              <div class="table_th" style="margin-top:35px;">
                <i class="icon_th"></i>地块现场描述
              </div>
              <el-input
                type="textarea"
                maxlength="1000"
                minlength="0"
                autosize
                v-model="goodsInfo.content"
                style="width:100%;height:300px;margin-bottom:35px;"
                :disabled="true"
              ></el-input>
            </el-tab-pane>
            <el-tab-pane label="周边配套设施描述" name="zhoubian">
              <div class="table_th" style="margin-top:35px;">
                <i class="icon_th"></i>市场道路状况
              </div>
              <el-input
                type="textarea"
                maxlength="1000"
                minlength="0"
                autosize
                v-model="municiInfo.content"
                style="width:100%;height:300px;"
                :disabled="true"
              ></el-input>
              <div class="table_th" style="margin-top:35px;">
                <i class="icon_th"></i>公共交通状况
              </div>
              <el-input
                type="textarea"
                maxlength="1000"
                minlength="0"
                autosize
                v-model="publicInfo.content"
                style="width:100%;height:300px;"
                :disabled="true"
              ></el-input>
              <div class="table_th" style="margin-top:35px;">
                <i class="icon_th"></i>其他配套
              </div>
              <el-input
                type="textarea"
                maxlength="1000"
                minlength="0"
                autosize
                v-model="otherInfo.content"
                style="width:100%;height:300px;margin-bottom:35px;"
                :disabled="true"
              ></el-input>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-tab-pane>
      <el-tab-pane label="位置图" name="second">
        <el-form class="locationImg" id="locationImg">
          <el-form-item prop="locationImg">
            <ul class="imgaeBox">
              <li v-for="(item,index) in locationFileList" :key="index" class="imageLi">
                <img :src="item.url" alt :onerror="defaultImg" />
              </li>
            </ul>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="地块图" name="third">
        <el-form class="locationImg" id="blockChart">
          <el-form-item prop="goodsImg">
            <ul class="imgaeBox">
              <li v-for="(item,index) in goodsFileList" :key="index" class="imageLi">
                <img :src="item.url" alt :onerror="defaultImg" width="200px" />
              </li>
            </ul>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="现场勘查记录" name="fourth">
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
            <!-- <div :style="{'height':switchHeight,'overflow':'hidden'}">
              <div class="timeline_main">
                <span class="timeline_title">踏勘日期：</span>
                <span class="timeline_content">{{item.explorDate}}</span>
              </div>
              <div class="timeline_main">
                <span class="timeline_title">投产情况描述：</span>
                <span class="timeline_content" v-if="flexibleOpen==true">{{item.operaInfo}}</span>
                <span
                  class="timeline_content"
                  style="display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:1;"
                  v-if="flexibleOpen==false"
                >{{item.operaInfo}}</span>

                <span
                  class="flexibleSwitch"
                  @click="flexSwitch(item)"
                  style="width:120px;text-align:center;color:#4671d5;"
                >
                  {{flexibleOpen?'收起':'展开'}}
                  <i
                    :class="flexibleOpen?'el-icon-caret-top':'el-icon-caret-bottom'"
                  ></i>
                </span>
              </div>
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
            </div>-->
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
  </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";
import Bus from "../../../../../utils/bus";
import qs from "qs";
import baseURL1 from "../../../../../utils/config";
export default {
  name: "followUpTrackDetail",
  data() {
    return {
      id: "",
      currentTabs: "first",
      activeTabs: "first",
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
      goodsImgId: "",
      prospectImg: "",
      followData: {
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

        cantonName: "",
        useName: "",

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

        prospectPhotoFirstUpload: true, //地块图
        // imgThree: "", //地块图
        prospectFileList: [] //地块图
      },

      recordData: [],

      baseUrl: baseURL1.imgUrl,

      paramsRecord: {
        id: ""
      },

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
      },
      prospectFileList: [],
      locationFileList: [],
      goodsFileList: [],
      location: true,
      goodsFile: true,
      prospect: true
      // isViewHtml:false,
      // dialogVisible:false,
    };
  },
  methods: {
    ...mapActions(["setTabsList"]),
    ...mapMutations("monitoringSupervision", ["to_true"]),
    handleClick(val) {
      // if (val.name == this.currentTabs) {
      //   return;
      // }
      // this.currentTabs = val.name;
      // if (this.activeTabs == "first") {
      //   this.getList();
      // } else if (this.activeTabs == "second") {
      //   if (this.location) {
      //     if (this.followData.locationImg) {
      //       this.imgAxios(this.followData.locationImg, this.locationFileList);
      //     }
      //     this.location = false;
      //   }
      // } else if (this.activeTabs == "third") {
      //   if (this.goodsFile) {
      //     if (this.followData.goodsImg) {
      //       this.imgAxios(this.followData.goodsImg, this.goodsFileList);
      //     }
      //     this.goodsFile = false;
      //   }
      // } else if (this.activeTabs == "fourth") {
      // }
    },
    
    flexSwitch(item) {
      console.log(item);
      this.flexibleOpen = !this.flexibleOpen;
      this.switchHeight = this.flexibleOpen
        ? (this.switchHeight = "auto")
        : (this.switchHeight = 80 + "px");
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
        this.followData.cantonName =
          res.result.cantonProvinceName +
          "-" +
          res.result.cantonCityName +
          "-" +
          res.result.cantonAreaName;
        this.followData.useName =
          res.result.firstClassUseName + "-" + res.result.secondClassUseName;

        if (this.followData.locationImg) {
          this.imgAxios(this.followData.locationImg, this.locationFileList);
        }
        if (this.followData.goodsImg) {
          this.imgAxios(this.followData.goodsImg, this.goodsFileList);
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
      } else {
        this.$message.error(res.msg); //失败
        return;
      }
    },
    async imgAxios(id, array) {
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
            url: this.baseUrl + filesData[index].id,
            status: "success",
            name: filesData[index].name
          });
        }
      }
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
          //  let prospectList=[]
          item["prospectList"] = [];
          if (item.prospectImg) {
            that.imgAxios(item.prospectImg, item.prospectList);
          }
        });
        // console.log(this.recordData);
        // console.log(this.recordData);
      } else {
        this.$message.error(res.msg); //失败
        return;
      }
    },
    removeTAG(str) {
      return str.replace(/<[^>]+>/g, "");
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
    }
  },
  created() {
    this.getList();
    this.getFollowMessage();
    // this.baseUrl = baseURL1.baseURL1 +'/epf-document/document/downloadById?id='
  },
  computed: {
    ...mapState("track", ["trackDetail"]),
    newRender: function() {
      this.id = this.trackDetail.id;
      this.getList(this.trackDetail.id);
    }
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
#followUpTrackAdd .el-collapse-item__header{
  display: block;
  height: 90px;
  line-height: 90px;

}
#followUpTrackAdd .el-collapse-item__arrow{
  position: absolute;
  right: 0;
  top:50%
}

#followUpTrackAdd .imgaeBox li img {
    width: 146px;
    height: 146px;
}
</style>
