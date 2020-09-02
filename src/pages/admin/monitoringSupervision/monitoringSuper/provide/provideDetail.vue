<template>
  <!-- <div>供给监测详情</div> -->
  <div class="page-body" :view-id="newRender">
    <div class="filter_wrap" style="margin-bottom:20px;">
      <div class="switchHeight_box">
        <p class="table_title">供给详情页</p>
        <table
          width="100%"
          border="1"
          cellpadding="0"
          cellspacing="0"
          bordercolor="#dcdfe6"
          style="table-layout:fixed;"
        >
          <tr height="50px">
            <td width="37%">
              <span class="left_text">流转方式：</span>
              {{provideData.circulationName}}
            </td>
            <td width="37%">
              <span class="left_text">标题：</span>
              {{provideData.title}}
            </td>
            <td width="26%">
              <span class="left_text special_text">所属行政区域：</span>
              {{provideData.cantonProvinceName}} {{provideData.cantonCityName}} {{provideData.cantonAreaName}}
            </td>
          </tr>
          <tr height="50px">
            <td>
              <span class="left_text">土地性质：</span>
              {{provideData.landCharName}}
            </td>
            <td>
              <span class="left_text">土地类型：</span>
              {{provideData.landTypeName}}
            </td>
            <td>
              <span class="left_text special_text">使用权类型：</span>
              {{provideData.useTypeName}}
            </td>
          </tr>
          <tr height="50px">
            <td>
              <span class="left_text">面积：</span>
              {{provideData.area}}m²
            </td>
            <td>
              <span class="left_text">土地用途：</span>
              {{provideData.firstClassUseName}}-{{provideData.secondClassUseName}}
            </td>
            <td>
              <span class="left_text special_text">年限：</span>
              {{provideData.years}}年
            </td>
          </tr>
          <tr height="50px">
            <td>
              <span class="left_text">交易中心：</span>
              {{provideData.trustOrgName}}
            </td>
            <td>
              <span class="left_text">使用权截止日期：</span>
              {{provideData.endDate}}
            </td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="bottom_filter_wrap">
      <el-tabs type="border-card">
        <el-tab-pane label="地块基本信息">
          <div class="main_content">
            <table
              width="100%"
              border="1"
              cellpadding="0"
              cellspacing="0"
              bordercolor="#dcdfe6"
              style="table-layout:fixed;border-collapse=collapse"
            >
              <tr height="50px">
                <td width="35%">
                  <span class="left_text special_text">权证号类型：</span>
                  {{provideData.warrantNumTypeName}}
                </td>
                <td width="40%">
                  <span class="left_text special_text">权证号：</span>
                  {{provideData.warrantNum}}
                </td>
                <td width="25%">
                  <span class="left_text special_text">登记机构：</span>
                  {{provideData.registrationName}}
                </td>
              </tr>
              <tr height="50px">
                <td>
                  <span class="left_text special_text">是否连同地上建筑物、其他附着物：</span>
                  {{provideData.adjunct | newAdjunct}}
                </td>
                <td>
                  <span class="left_text special_text">不动产单元号：</span>
                  {{provideData.unitNum}}
                </td>
                <td>
                  <span class="left_text special_text">建筑面积：</span>
                  {{provideData.buildArea}}m²
                </td>
              </tr>
              <tr height="50px">
                <td>
                  <span class="left_text special_text" v-if="provideData.useType == 'transfer2'">划拨决定书号：</span>
                  <span class="left_text special_text" v-if="provideData.useType == 'tosell'">建设用地使用权出让合同号：</span>
                  {{provideData.decisionNum}}
                </td>
                <td>
                  <span class="left_text special_text">建筑结构：</span>
                  {{provideData.buildingStructureName}}
                </td>
                <td>
                  <span class="left_text special_text">建筑绿化率：</span>
                  <!-- {{provideData.greenSpaceRate}} -->
                  <span v-if="provideData.greenSpaceRate||provideData.greenSpaceRateSymbol1||provideData.greenSpaceRate2||provideData.greenSpaceRateSymbol2">{{provideData.greenSpaceRate}}{{provideData.greenSpaceRateSymbol1}}建筑密度{{provideData.greenSpaceRateSymbol2}}{{provideData.greenSpaceRate2}}</span>
                  <span v-else>0</span>
                </td>
              </tr>
              <tr height="50px">
                <td style="border-bottom:1px solid #fff;">
                  <span class="left_text special_text">建筑限高：</span>
                  {{provideData.heightLimit}}米
                </td>
                <td style="border-bottom:1px solid #fff;">
                  <span class="left_text special_text">建筑密度：</span>
                  <!-- {{provideData.buildingDensity}} -->
                  <span v-if="provideData.buildingDensity||provideData.buildingDensitySymbol1||provideData.buildingDensity2||provideData.buildingDensitySymbol2">{{provideData.buildingDensity}}{{provideData.buildingDensitySymbol1}}建筑密度{{provideData.buildingDensitySymbol2}}{{provideData.buildingDensity2}}</span>
                  <span v-else>0</span>
                </td>
                <!-- <td style="border-bottom:1px solid #fff;">
                  <p v-if="isShow">
                    <span class="left_text special_text">使用权截止日期：</span>
                    {{provideData.endDate}}
                  </p>
                </td> -->
                <td style="border-bottom:1px solid #fff;">
                  <span class="left_text special_text">容积率：</span>
                  <span v-if="provideData.plotRatio||provideData.plotRatioSymbol1||provideData.plotRatio2||provideData.plotRatioSymbol2">{{provideData.plotRatio}}{{provideData.plotRatioSymbol1}}容积率{{provideData.plotRatioSymbol2}}{{provideData.plotRatio2}}</span>
                  <span v-else>0</span>
                  <!-- {{provideData.buildingDensity}} -->
                </td>
              </tr>
            </table>
            <table
              width="100%"
              border="1"
              cellpadding="0"
              cellspacing="0"
              bordercolor="#dcdfe6"
              style="table-layout:fixed;"
            >
              <tr height="50px">
                <td width="55%">
                  <span class="left_text special_text">房屋建设工程是否完成投资总额的25%以上：</span>
                  {{provideData.isPercent==0?'是':'否'}}
                </td>
                <!-- <td width="45%">
                  <span class="left_text special_text">土地成片开发是否形成工业用地或其他建设用地条件：</span>
                  {{provideData.isDevelope==0?'是':'否'}}
                </td> -->
              </tr>
              <tr height="50px">
                <td width="55%">
                  <span class="left_text special_text">土地坐落：</span>
                  {{provideData.location}}
                </td>
                <td width="45%">
                  <span class="left_text special_text_place">地图标注：</span>
                  {{provideData.coordinate}}
                  <i class="el-icon-location"></i>
                </td>
              </tr>
              <tr height="50px">
                <td>
                  <span class="left_text special_text">东至：</span>
                  {{provideData.east}}
                </td>
                <td>
                  <span class="left_text special_text_place">西至：</span>
                  {{provideData.west}}
                </td>
              </tr>
              <tr height="50px">
                <td>
                  <span class="left_text special_text">南至：</span>
                  {{provideData.south}}
                </td>
                <td>
                  <span class="left_text special_text_place">北至：</span>
                  {{provideData.north}}
                </td>
              </tr>
              <tr height="130px">
                <td colspan="2">
                  <div class="resource_box">
                    <span class="left_text special_text">土地照片：</span>
                    <ul class="resources">
                      <li v-for="(item,index) in provideImgList" :key="index">
                        <img :src="item.url" alt class="resource_content" />
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr height="130px">
                <td colspan="2">
                  <div class="resource_box">
                    <span class="left_text special_text">土地视频：</span>

                    <li v-for="(item,index) in provideViedoList" :key="index">
                      <video :src="item.url" class="resource_content" controls="controls"></video>
                    </li>

                    <!-- <video src="/static/css/img/616162f6a2bed012d255d9f37ea0ce80.mp4" class="resource_content"></video> -->
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="供给人信息">
          <div class="main_content">
            <table
              width="100%"
              border="1"
              cellpadding="0"
              cellspacing="0"
              bordercolor="#dcdfe6"
              style="table-layout:fixed;"
            >
              <tr height="50px">
                <td width="35%">
                  <span class="left_text">权属人性质：</span>
                  <!-- special_text_people -->
                  {{provideData.ownerShipNatureName}}
                </td>
                <td width="35%">
                  <span class="left_text ">名称：</span>
                  {{provideData.ownerShip}}
                </td>
                <td width="30%">
                  <span class="left_text">证件种类：</span>
                  {{provideData.identificationTypeName}}
                </td>
              </tr>
              <tr height="50px">
                <td>
                  <span class="left_text">证件号：</span>
                  {{provideData.identificationNum}}
                </td>
                <td>
                  <span class="left_text">地址：</span>
                  {{provideData.address}}
                </td>
                <td>
                  <span class="left_text">权属人联系电话：</span>
                  {{provideData.phone}}
                </td>
              </tr>
              <tr height="50px">
                <td>
                  <span class="left_text">联系人/代理人：</span>
                  {{provideData.contact}}
                </td>
                <td>
                  <span class="left_text">联系人/代理人身份证号：</span>
                  {{provideData.idCard}}
                </td>
                <td>
                  <span class="left_text">联系人/代理人联系电话：</span>
                  {{provideData.contactPhone}}
                </td>
              </tr>
              <tr height="50px">
                <td colspan="3">
                  <span class="left_text">联系人/代理人联系地址：</span>
                  {{provideData.contactAddress}}
                </td>
              </tr>
            </table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="附件清单">
          <div class="main_content">
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              :header-cell-style="{background:'#fff',color:'#999',height:'48px'}"
            >
              <el-table-column prop="num" label="序号" width="115" align="center">
                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
              </el-table-column>
              <el-table-column prop="tname" label="文件名称" width="360"></el-table-column>
              <el-table-column label="文件">
                <template slot-scope="scope">
                   <span v-if="scope.row.files?scope.row.files.length>0:false">
                       {{scope.row.files[0].fname}}
                   </span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.files?scope.row.files.length>0:false"  @click="handleClick(scope.row.files[0].fid)" type="text" size="small">下载</el-button>
                  <el-button v-if="scope.row.files?scope.row.files.length>0:false"  @click="preview(scope.row.files[0])" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import baseURL1 from "../../../../../utils/config";
import configApi from '../../../../../../config/index'
export default {
  name: "provideDetail",
  data() {
    return {
      provideImgList: [],
      provideViedoList: [],
      isShow: true,
      baseUrl: baseURL1.imgUrl,
      tableData: [
        {
          fileName: "不动产证",
          file: "不动产证.pdf"
        },
        {
          fileName: "身份证",
          file: "身份证.pdf"
        },
        {
          fileName: "营业执照",
          file: "营业执照.pdf"
        }
      ],
      provideData: {
        circulationName: "转让",
        tSellNo: "2017017196398345",
        title:"发布地源测试",
        cantonProvinceName: "山西省",
        cantonCityName: "太原市",
        cantonAreaName: "小店区",
        landCharName: "国有建设用地",
        landTypeName: "司法处置用地",
        useTypeName: "作家出资",
        area: "33",
        firstClassUseName: "公共服务与公共建设用地",
        secondClassUseName: "人工草地",
        years: "20",
        warrantNumTypeName: "不动产权证号",
        warrantNum: "晋(2017)太原市不动产权第0018158号",
        adjunct: "1",
        registration: "不动产权证号",
        unitNum: "晋(2017)太原市不动产权第0018158号",
        buildArea: "35",
        decisionNum: "晋(2017)太原市不动产权第0018158号",
        buildingStructureName: "砖泥结构",
        greenSpaceRate: ">20%",
        heightLimit: "20",
        buildingDensity: ">60%",
        endDate: "2019-02-03",
        location: "山西省太原市小店区龙城大街75号鸿泰国际商务楼汤如意1层第5号",
        coordinate:
          "城市位于东经111度30分～113度09分，北纬37度27分～38度25分之间。",
        east: "东至坞城路",
        south: "南至坞城路",
        west: "西至坞城路",
        north: "北至坞城路",
        ownerShipNatureName: "个人",
        ownerShip: "晋太原市不动产权第号晋太原市不动产权第号",
        identificationTypeName: "身份证",
        identificationNum: "14070219910756892",
        address:
          "晋(2017)太原市不动产权第0018158号晋(2017)太原市不动产权第0018158号",
        phone: "152-3510-0125",
        contact: "张小红",
        idCard: "14782519871206087043",
        contactPhone: "152-3541-1258",
        contactAddress:
          "山西省太原市小店区龙城大街75号鸿泰国际商务楼汤如意1层第5号"
      },
      id: ""
      // tableData:[],
    };
  },
  filters: {
    newAdjunct(value) {
      if (value == "1") {
        return (value = "是");
      }
      return (value = "否");
    }
  },
  created() {
    this.getData();
  },
  methods: {
    //获取详情数据
    getFuJian() {
      this.$get(
        "/epf-document/docTemplete/getTempleteTreeByArea?id=0&belong=" +
          this.$route.query.id +
          "&areaCode=" +
          this.provideData.cantonProvince,
        {}
      ).then(res => {
        let resData = JSON.parse(res.ztreeJson);
        for (let i = 0; i < resData.length; i++) {
          if (resData[i].code.indexOf("LAND") != -1) {
            this.tableData = resData[i].childData;
          }
        }
        console.log(this.tableData);
      });
    },
    getData() {
      let id = this.$route.query.id;
      // this.$post(`/epf-monitor/monitor/moniSell/detail`, {
      this.$post(`/epf-monitor/monisell/detail`, {
        id: id
      }).then(res => {
        console.log(res);
        if (res.code == "0") {
          this.provideData = res.moniSell;
          // console.log(this.provideData);
          if (this.provideData.img) {
            this.imgAxios(
              this.provideData.img,
              this.provideImgList,
              this.provideViedoList
            );
          }
          this.getFuJian();
          if (
            this.provideData.useTypeName == "出让" ||
            this.provideData.useTypeName == "划拨"
          ) {
            this.isShow = false;
          } else {
            this.isShow = true;
          }
        } else {
          this.$message.error(res.msg); //失败
          return;
        }
      });
    },
    handleClick(id){
       window.open(baseURL1.baseURL1 +'/epf-document/document/downloadById?id='+id, '_self');
    },
    preview(data){ //文件预览
        var api=configApi.dev.proxyTable["/api"].target;//仅限于开发环境，生产环境需要调整下
        const url = `/api/epf-document/onlinePreview?url=${api},${data.fid}.${data.ftype}`
        // this.src = url
        // this.dialogVisible = true
        window.open(url)
      },
    async imgAxios(id, array, array2) {
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
        if (filesData[index].extName == "mp4") {
          array2.push({
            url: this.baseUrl + filesData[index].id,
            status: "success",
            name: filesData[index].name
          });
        }
      }
    }
  },
  computed: {
    newRender: function() {
      this.id = this.$route.query.id;
      this.getData(this.$route.query.id);
    }
  }
};
</script>

<style>

.bottom_filter_wrap {
  box-sizing: border-box;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  height: 100%;
}
.table_title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 30px;
}
.left_text {
  font-size: 14px;
  color: #999;
  margin-left: 10px;
}
.special_text {
  width: 100px;
  text-align: left;
}
.special_text_place {
  width: 70px;
  text-align: right;
  display: inline-block;
}
.special_text_people {
  width: 160px;
  text-align: right;
  display: inline-block;
}

.main_content {
  padding: 28px 28px 60px 28px;
  height: 100%;
}
.resource_box {
  display: flex;
}
.resources {
  display: flex;
}
.resources li {
  margin-right: 20px;
  width: 130px;
  height: 90px;
  box-sizing: border-box;
  border: 1px dashed #dcdfe6;
  display: inline-block;
  border-radius: 3px;
}
.resource_content {
  width: 130px;
  height: 90px;
  display: inline-block;
  border-radius: 3px;
}
</style>

