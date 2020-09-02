<template>
  <!-- <div>供需监控台</div> -->
  <div class="page-body">
    <div class="main_wrap">
      <div class="filter_wrap_left">
        <div class="switchHeight_box_chart" style="justify-content:space-between;">
          <div class="switchHeight_box_title" style="flex:1;">供需热度分布（地域分布）</div>
          <div style="display:flex;flex:1;">
            <span class="switchHeight_box_search" style="width:45%;">分析类型：</span>
            <el-select v-model="filterData.analyze" style="width:55%;" @change="analyzeSelect">
              <el-option
                v-for="item in analyzeList"
                :key="item.value"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
          </div>
          <div style="display:flex;flex:1.5;">
          	<el-select v-model="filterData.time" style="width:45%;margin: 0 12px;" @change="timeSelect">
              <el-option
                v-for="item in timeList"
                :key="item.value"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
            <span
              class="switchHeight_box_search"
              style="width:55%;"
              v-if="filterData.time==''||filterData.time=='本月'||filterData.time=='本季'||filterData.time=='本年度'"
            >{{start}}～{{end}}</span>
            <span class="switchHeight_box_search" style="width:55%;" v-if="filterData.time=='全部'"></span>
            <span
              class="switchHeight_box_search"
              style="width:55%;"
              v-if="filterData.time=='自定义'"
            >{{inputTime}}:</span>
          </div>
          <el-dialog
            title="请输入自定义日期"
            :visible.sync="customDialogVisible"
            width="40%"
            :modal="false"
            style="font-size:14px;"
           >
            <el-input v-model="inputTime" clearable></el-input>
            <p style="font-size:12px;color:#ff0000;">*请按格式输入，如：2001-02-01～2008-10-11</p>
            <span slot="footer" class="dialog-footer">
              <el-button @click="customDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="sureTime()">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div style="height:15px;">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item> 
              <!-- v-if="isBu" -->
              <el-button type="text" @click="toNationwide" style="color:#ffa000;">全国</el-button>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="isProvince">
              <el-button type="text" style="color:#ffa000;">{{breadcrumbName}}</el-button>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 地图 -->
        <div id="pdChinaChart" style="height:540px;width:100%;margin:5px 0;" ref="mapChart"></div>
        <div
          style="width:100%;height:313px;margin-bottom:6px;border:1px solid #e1e0e0;padding:18px 30px 0;"
        >
          <div class="chart_big_tilte_left">区域供需对比分析（面积）</div>
          <pdRank
            :analyzeMessage="analyzeType"
            :timeStartMessage="start"
            :timeEndMessage="end"
            ref="pdRankC"
          ></pdRank>
        </div>
      </div>
      <div class="filter_wrap_right">
        <pdIndex
          :analyzeMessage="analyzeType"
          :timeStartMessage="start"
          :timeEndMessage="end"
          ref="pdIndexC"
        ></pdIndex>
        <div class="switchHeight_box_center">
          <pdUse
            :analyzeMessage="analyzeType"
            :timeStartMessage="start"
            :timeEndMessage="end"
            ref="pdUseC"
          ></pdUse>
        </div>
        <div class="switchHeight_box_bottom">
          <pdLine
            :analyzeMessage="analyzeType"
            :timeStartMessage="start"
            :timeEndMessage="end"
            ref="pdLineC"
          ></pdLine>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import echarts from "echarts";
import moment from "moment";
import pdLine from "@/components/pdLineChartStation";
import pdUse from "@/components/pdUseChartStation";
import pdIndex from "@/components/pdIndexChartStation";
import pdRank from "@/components/pdRankChartStation";
import "../../../../../../static/map/js/china";
require("echarts/lib/chart/map");
// 图例
require("echarts/lib/component/legend");
// 提示框
require("echarts/lib/component/tooltip");
// 地图geo
require("echarts/lib/component/geo");
export default {
  name: "provideDemandStation",
  components: {
    pdLine,
    pdUse,
    pdIndex,
    pdRank
  },
  data() {
    return {
      code_city:'',
      areaList:'',
      isBu: true,
      filterData: {
        analyze: "全部",
        time: "本年度"
      },
      time: "本年度",
      params: {
        cantonProvince: "",
        grxlType: "",
        startDate: "",
        endDate: ""
      },
      analyzeType: "ALL",
      start: moment()
        .month(moment().month())
        .startOf("year")
        .format("YYYY-MM-DD"), //开始日期时间
      end: moment()
        .month(moment().month())
        .endOf("year")
        .format("YYYY-MM-DD"), //结束日期时间
      inputTime: "",
      customDialogVisible: false,

      timeList: [
        {
          value: "选项1",
          label: "本月"
        },
        {
          value: "选项2",
          label: "本季"
        },
        {
          value: "选项3",
          label: "本年度"
        },
        {
          value: "选项4",
          label: "全部"
        },
        {
          value: "选项5",
          label: "自定义"
        }
      ],
      analyzeList: [
        {
          value: "ALL",
          label: "全部"
        },
        {
          value: "SELL",
          label: "供给"
        },
        {
          value: "PURCHASE",
          label: "需求"
        }
      ],

      breadcrumbName: "",
      isProvince: false,

      //交易热度分布(地域分布)
      chart: null,
      timeFn: null,
      mapCode: "",
      pro: {
        内蒙古: "../../../../../../static/map/json/province/neimenggu.json",
        天津: "../../../../../../static/map/json/province/tianjin.json",
        河北: "../../../../../../static/map/json/province/hebei.json",
        山西: "../../../../../../static/map/json/province/shanxi.json",
        江苏: "../../../../../../static/map/json/province/jiangsu.json",
        浙江: "../../../../../../static/map/json/province/zhejiang.json",
        山东: "../../../../../../static/map/json/province/shandong.json",
        河南: "../../../../../../static/map/json/province/henan.json",
        湖北: "../../../../../../static/map/json/province/hubei.json",
        湖南: "../../../../../../static/map/json/province/hunan.json",
        广东: "../../../../../../static/map/json/province/guangdong.json",
        重庆: "../../../../../../static/map/json/province/chongqing.json",
        四川: "../../../../../../static/map/json/province/sichuan.json",
        云南: "../../../../../../static/map/json/province/yunnan.json",
        新疆: "../../../../../../static/map/json/province/xinjiang.json",
        青海: "../../../../../../static/map/json/province/qinghai.json",
        香港: "../../../../../../static/map/json/province/xianggang.json",
        澳门: "../../../../../../static/map/json/province/aomen.json",
        北京: "../../../../../../static/map/json/province/beijing.json",
        辽宁: "../../../../../../static/map/json/province/liaoning.json",
        吉林: "../../../../../../static/map/json/province/jilin.json",
        黑龙江: "../../../../../../static/map/json/province/heilongjiang.json",
        上海: "../../../../../../static/map/json/province/shanghai.json",
        安徽: "../../../../../../static/map/json/province/anhui.json",
        福建: "../../../../../../static/map/json/province/fujian.json",
        江西: "../../../../../../static/map/json/province/jiangxi.json",
        广西: "../../../../../../static/map/json/province/guangxi.json",
        海南: "../../../../../../static/map/json/province/hainan.json",
        贵州: "../../../../../../static/map/json/province/guizhou.json",
        西藏: "../../../../../../static/map/json/province/xizang.json",
        陕西: "../../../../../../static/map/json/province/shanxi.json",
        甘肃: "../../../../../../static/map/json/province/gansu.json",
        宁夏: "../../../../../../static/map/json/province/ningxia.json",
        台湾: "../../../../../../static/map/json/province/taiwan.json"
      }
    };
  },
  methods: {
    analyzeSelect(val) {
      this.filterData.analyze = val.label;
      this.analyzeType = val.value;
    },
    timeSelect(val) {
      this.filterData.time = val.label;
      this.time = val.label;

      const startDate = moment().format("YYYY-MM-DD"); //当前时间

      const monthStartDate = moment()
        .month(moment().month())
        .startOf("month")
        .format("YYYY-MM-DD"); //本月开始时间
      const monthEndDate = moment()
        .month(moment().month())
        .endOf("month")
        .format("YYYY-MM-DD"); //本月结束时间
      const yearStartDate = moment()
        .year(moment().year())
        .startOf("year")
        .format("YYYY-MM-DD"); //本年度开始时间
      const yearEndDate = moment()
        .year(moment().year())
        .endOf("year")
        .format("YYYY-MM-DD"); //本年度结束时间

      //本季时间
      let currentQuarter = moment().quarter(); // 当前是第几季度
      let currentYear = moment().year(); // 当前是第几年
      const quarterStartDate = moment(moment(currentYear + "-01-01").toDate())
        .quarter(currentQuarter)
        .format("YYYY-MM-DD"); //当前季度的开始时间
      let endMonth = 3 * parseInt(currentQuarter); //当前季度最后一个月
      /* 对月数进行格式化 */
      if (endMonth < 10) {
        endMonth = "0" + endMonth;
      } else {
        endMonth += "";
      }
      let endMonthDays = moment(
        new Date(currentYear + "-" + endMonth)
      ).daysInMonth(); // 末尾月天数
      let endDays = currentYear + "-" + endMonth + "-" + endMonthDays; //完整年月日整合
      const quarterEndDate = moment(new Date(endDays)).format("YYYY-MM-DD"); // 当前季度的结束时间

      if (this.filterData.time == "本月" || this.time == "本月") {
        this.start = monthStartDate;
        this.end = monthEndDate;
      } else if (this.filterData.time == "本季" || this.time == "本季") {
        this.start = quarterStartDate;
        this.end = quarterEndDate;
      } else if (this.filterData.time == "本年度" || this.time == "本年度") {
        this.start = yearStartDate;
        this.end = yearEndDate;
      } else if (this.filterData.time == "全部" || this.time == "全部") {
        this.start = "";
        this.end = "";
      } else {
        this.customDialogVisible = true;
      }
    },
    sureTime() {
      var data = this.inputTime;
      if(data.indexOf("～") < 0 && data.indexOf("~") < 0 ){
        this.$message.error("请输入正确时间格式!")
        return
      }
      this.customDialogVisible = false;
      var str = ''
      if(data.indexOf("～") > 0){
        str = data.split("～");
        this.start = str[0];
        this.end = str[1];
      }else if(data.indexOf("~") > 0){
        str = data.split("~");
        this.start = str[0];
        this.end = str[1];
      }
    },
    async loadMap(mapCode, name) {
      if(sessionStorage.getItem("org_level") != 'org_level-001'){
        this.isProvince = true;
        this.breadcrumbName = name;
        this.isBu = false;
      }
      
      setTimeout(() => {
        document.getElementById("pdChinaChart").style.width = 100 + "%";
        this.chart = echarts.init(this.$refs.mapChart);
        this.chart.resize(); //直接加这句即可
      }, 0);

      //请求数据
      let params = this.params;
      params["grxlType"] = this.analyzeType;
      params["startDate"] = this.start;
      params["endDate"] = this.end;
      // params["cantonProvince"] = sessionStorage.getItem("pdProvince");
      params["cantonProvince"] = sessionStorage.getItem("pdProvince");
      params["cantonCity"] = this.code_city;

      let mapRes = await this.$get(
        `/epf-monitor/monitor/sellPurc/hotMap`,
        params
      );
      console.log(mapRes);

      let chartData = mapRes.result;
      console.log(chartData);

      var valueAllData = [];
      for (var key in chartData) {
        valueAllData.push(chartData[key].totalArea);
      }

      var valueAllDataMax = Math.max.apply(Math, valueAllData);
      console.log(valueAllData);
      //console.log(valueAllDataMax);

      // for(var i in chartData){
      // 	for(var j in chartData[i]){
      // 		if(j == 'totalArea'){
      // 			chartData[i]['value'] = chartData[i][j]
      // 			delete chartData[i]['totalArea']
      // 		}
      // 	}
      // }
      // console.log(chartData);

      function getData(Data, AllData, shengM) {
        for (var key in Data) {
          AllData.push({
            name: shengM,
            value: Data[key].totalArea,
            order: Data[key].order,
            zrArea: Data[key].zrArea,
            czArea: Data[key].czArea,
            cantonProvinceName: Data[key].cantonProvinceName,
            cantonProvince: Data[key].cantonProvince,
            cantonCityName: Data[key].cantonCityName,
            cantonCity: Data[key].cantonCity
          });
        }
      }

      function getCityData(Data, AllData) {
        for (var key in Data) {
          AllData.push({
            value: Data[key].totalArea,
            order: Data[key].order,
            zrArea: Data[key].zrArea,
            czArea: Data[key].czArea,
            cantonProvinceName: Data[key].cantonProvinceName,
            cantonProvince: Data[key].cantonProvince,
            cantonCityName: Data[key].cantonCityName,
            name: Data[key].cantonCityName,
            cantonCity: Data[key].cantonCity
          });
        }
      }

      //北京数据
      var beiJingAllData = [];

      var beiJingData = [];
      var beiJingTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("110000");
      });
      beiJingData = beiJingData.concat(beiJingTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(beiJingData, beiJingAllData);
      } else {
        getData(beiJingData, beiJingAllData, "北京");
      }
      console.log(beiJingAllData);

      //山东数据
      var shanDongAllData = [];

      var shanDongData = [];
      var shanDongTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("370000");
      });
      shanDongData = shanDongData.concat(shanDongTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(shanDongData, shanDongAllData);
      } else {
        getData(shanDongData, shanDongAllData, "山东");
      }

      //河北数据
      var heBeiAllData = [];

      var heBeiData = [];
      var heBeiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("130000");
      });
      heBeiData = heBeiData.concat(heBeiTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(heBeiData, heBeiAllData);
      } else {
        getData(heBeiData, heBeiAllData, "河北");
      }

      //贵州数据
      var guiZhouAllData = [];

      var guiZhouData = [];
      var guiZhouTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("520000");
      });
      guiZhouData = guiZhouData.concat(guiZhouTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(guiZhouData, guiZhouAllData);
      } else {
        getData(guiZhouData, guiZhouAllData, "贵州");
      }

      //内蒙古数据
      var neiMengGuAllData = [];

      var neiMengGuData = [];
      var neiMengGuTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("150000");
      });
      neiMengGuData = neiMengGuData.concat(neiMengGuTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(neiMengGuData, neiMengGuAllData);
      } else {
        getData(neiMengGuData, neiMengGuAllData, "内蒙古");
      }

      //天津数据
      var tianJinAllData = [];

      var tianJinData = [];
      var tianJinTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("120000");
      });
      tianJinData = tianJinData.concat(tianJinTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(tianJinData, tianJinAllData);
      } else {
        getData(tianJinData, tianJinAllData, "天津");
      }

      //山西数据
      var shanXiAllData = [];

      var shanXiData = [];
      var shanXiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("140000");
      });
      shanXiData = shanXiData.concat(shanXiTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(shanXiData, shanXiAllData);
      } else {
        getData(shanXiData, shanXiAllData, "山西");
      }

      //江苏数据
      var jiangSuAllData = [];

      var jiangSuData = [];
      var jiangSuTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("320000");
      });
      jiangSuData = jiangSuData.concat(jiangSuTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(jiangSuData, jiangSuAllData);
      } else {
        getData(jiangSuData, jiangSuAllData, "江苏");
      }

      //浙江数据
      var zheJiangAllData = [];

      var zheJiangData = [];
      var zheJiangTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("330000");
      });
      zheJiangData = zheJiangData.concat(zheJiangTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(zheJiangData, zheJiangAllData);
      } else {
        getData(zheJiangData, zheJiangAllData, "浙江");
      }

      //河南数据
      var heNanAllData = [];

      var heNanData = [];
      var heNanTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("410000");
      });
      heNanData = heNanData.concat(heNanTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(heNanData, heNanAllData);
      } else {
        getData(heNanData, heNanAllData, "河南");
      }

      //湖北数据
      var huBeiAllData = [];

      var huBeiData = [];
      var huBeiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("420000");
      });
      huBeiData = huBeiData.concat(huBeiTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(huBeiData, huBeiAllData);
      } else {
        getData(huBeiData, huBeiAllData, "湖北");
      }

      //湖南数据
      var huNanAllData = [];

      var huNanData = [];
      var huNanTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("430000");
      });
      huNanData = huNanData.concat(huNanTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(huNanData, huNanAllData);
      } else {
        getData(huNanData, huNanAllData, "湖南");
      }

      //广东数据
      var guangDongAllData = [];

      var guangDongData = [];
      var guangDongTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("440000");
      });
      guangDongData = guangDongData.concat(guangDongTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(guangDongData, guangDongAllData);
      } else {
        getData(guangDongData, guangDongAllData, "广东");
      }

      //重庆数据
      var chongQingAllData = [];

      var chongQingData = [];
      var chongQingTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("500000");
      });
      chongQingData = chongQingData.concat(chongQingTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(chongQingData, chongQingAllData);
      } else {
        getData(chongQingData, chongQingAllData, "重庆");
      }

      //四川数据
      var siChuanAllData = [];

      var siChuanData = [];
      var siChuanTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("510000");
      });
      siChuanData = siChuanData.concat(siChuanTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(siChuanData, siChuanAllData);
      } else {
        getData(siChuanData, siChuanAllData, "四川");
      }

      //云南数据
      var yunNanAllData = [];

      var yunNanData = [];
      var yunNanTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("530000");
      });
      yunNanData = yunNanData.concat(yunNanTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(yunNanData, yunNanAllData);
      } else {
        getData(yunNanData, yunNanAllData, "云南");
      }

      //青海数据
      var qingHaiAllData = [];

      var qingHaiData = [];
      var qingHaiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("630000");
      });
      qingHaiData = qingHaiData.concat(qingHaiTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(qingHaiData, qingHaiAllData);
      } else {
        getData(qingHaiData, qingHaiAllData, "青海");
      }

      //新疆数据
      var xinJiangAllData = [];

      var xinJiangData = [];
      var xinJiangTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("650000");
      });
      xinJiangData = xinJiangData.concat(xinJiangTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(xinJiangData, xinJiangAllData);
      } else {
        getData(xinJiangData, xinJiangAllData, "新疆");
      }

      //台湾数据
      var taiWanAllData = [];

      var taiWanData = [];
      var taiWanTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("710000");
      });
      taiWanData = taiWanData.concat(taiWanTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(taiWanData, taiWanAllData);
      } else {
        getData(taiWanData, taiWanAllData, "台湾");
      }

      //香港数据
      var xiangGangAllData = [];

      var xiangGangData = [];
      var xiangGangTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("810000");
      });
      xiangGangData = xiangGangData.concat(xiangGangTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(xiangGangData, xiangGangAllData);
      } else {
        getData(xiangGangData, xiangGangAllData, "香港");
      }

      //澳门数据
      var aoMenAllData = [];

      var aoMenData = [];
      var aoMenTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("820000");
      });
      aoMenData = aoMenData.concat(aoMenTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(aoMenData, aoMenAllData);
      } else {
        getData(aoMenData, aoMenAllData, "澳门");
      }

      //辽宁数据
      var liaoNingAllData = [];

      var liaoNingData = [];
      var liaoNingTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("210000");
      });
      liaoNingData = liaoNingData.concat(liaoNingTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(liaoNingData, liaoNingAllData);
      } else {
        getData(liaoNingData, liaoNingAllData, "辽宁");
      }

      //吉林数据
      var jiLinAllData = [];

      var jiLinData = [];
      var jiLinTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("220000");
      });
      jiLinData = jiLinData.concat(jiLinTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(jiLinData, jiLinAllData);
      } else {
        getData(jiLinData, jiLinAllData, "吉林");
      }

      //黑龙江数据
      var heiLongJiangAllData = [];

      var heiLongJiangData = [];
      var heiLongJiangTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("230000");
      });
      heiLongJiangData = heiLongJiangData.concat(heiLongJiangTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(heiLongJiangData, heiLongJiangAllData);
      } else {
        getData(heiLongJiangData, heiLongJiangAllData, "黑龙江");
      }

      //上海数据
      var shangHaiAllData = [];

      var shangHaiData = [];
      var shangHaiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("310000");
      });
      shangHaiData = shangHaiData.concat(shangHaiTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(shangHaiData, shangHaiAllData);
      } else {
        getData(shangHaiData, shangHaiAllData, "上海");
      }

      //安徽数据
      var anHuiAllData = [];

      var anHuiData = [];
      var anHuiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("340000");
      });
      anHuiData = anHuiData.concat(anHuiTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(anHuiData, anHuiAllData);
      } else {
        getData(anHuiData, anHuiAllData, "安徽");
      }

      //福建数据
      var fuJianAllData = [];

      var fuJianData = [];
      var fuJianTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("350000");
      });
      fuJianData = fuJianData.concat(fuJianTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(fuJianData, fuJianAllData);
      } else {
        getData(fuJianData, fuJianAllData, "福建");
      }

      //江西数据
      var jiangXiAllData = [];

      var jiangXiData = [];
      var jiangXiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("360000");
      });
      jiangXiData = jiangXiData.concat(jiangXiTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(jiangXiData, jiangXiAllData);
      } else {
        getData(jiangXiData, jiangXiAllData, "江西");
      }

      //广西数据
      var guangXiAllData = [];

      var guangXiData = [];
      var guangXiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("450000");
      });
      guangXiData = guangXiData.concat(guangXiTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(guangXiData, guangXiAllData);
      } else {
        getData(guangXiData, guangXiAllData, "广西");
      }

      //海南数据
      var haiNanAllData = [];

      var haiNanData = [];
      var haiNanTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("460000");
      });
      haiNanData = haiNanData.concat(haiNanTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(haiNanData, haiNanAllData);
      } else {
        getData(haiNanData, haiNanAllData, "海南");
      }

      //西藏数据
      var xiZangAllData = [];

      var xiZangData = [];
      var xiZangTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("540000");
      });
      xiZangData = xiZangData.concat(xiZangTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(xiZangData, xiZangAllData);
      } else {
        getData(xiZangData, xiZangAllData, "西藏");
      }

      //陕西数据
      var shanXIAllData = [];

      var shanXIData = [];
      var shanXITemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("610000");
      });
      shanXIData = shanXIData.concat(shanXITemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(shanXIData, shanXIAllData);
      } else {
        getData(shanXIData, shanXIAllData, "陕西");
      }

      //甘肃数据
      var ganSuAllData = [];

      var ganSuData = [];
      var ganSuTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("620000");
      });
      ganSuData = ganSuData.concat(ganSuTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(ganSuData, ganSuAllData);
      } else {
        getData(ganSuData, ganSuAllData, "甘肃");
      }

      //宁夏数据
      var ningXiaAllData = [];

      var ningXiaData = [];
      var ningXiaTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("640000");
      });
      ningXiaData = ningXiaData.concat(ningXiaTemp);

      if (sessionStorage.getItem("pdProvince")) {
        getCityData(ningXiaData, ningXiaAllData);
      } else {
        getData(ningXiaData, ningXiaAllData, "宁夏");
      }

      var mapAllData = [];
      var kongData = [];
      for (var i = 0; i < beiJingAllData.length; i++) {
        mapAllData.push(beiJingAllData[i]);
      }
      for (var i = 0; i < shanDongAllData.length; i++) {
        mapAllData.push(shanDongAllData[i]);
      }
      for (var i = 0; i < heBeiAllData.length; i++) {
        mapAllData.push(heBeiAllData[i]);
      }
      for (var i = 0; i < guiZhouAllData.length; i++) {
        mapAllData.push(guiZhouAllData[i]);
      }
      for (var i = 0; i < neiMengGuAllData.length; i++) {
        mapAllData.push(neiMengGuAllData[i]);
      }
      for (var i = 0; i < tianJinAllData.length; i++) {
        mapAllData.push(tianJinAllData[i]);
      }
      for (var i = 0; i < shanXiAllData.length; i++) {
        mapAllData.push(shanXiAllData[i]);
      }
      for (var i = 0; i < jiangSuAllData.length; i++) {
        mapAllData.push(jiangSuAllData[i]);
      }
      for (var i = 0; i < zheJiangAllData.length; i++) {
        mapAllData.push(zheJiangAllData[i]);
      }
      for (var i = 0; i < heNanAllData.length; i++) {
        mapAllData.push(heNanAllData[i]);
      }
      for (var i = 0; i < huBeiAllData.length; i++) {
        mapAllData.push(huBeiAllData[i]);
      }
      for (var i = 0; i < huNanAllData.length; i++) {
        mapAllData.push(huNanAllData[i]);
      }
      for (var i = 0; i < guangDongAllData.length; i++) {
        mapAllData.push(guangDongAllData[i]);
      }
      for (var i = 0; i < chongQingAllData.length; i++) {
        mapAllData.push(chongQingAllData[i]);
      }
      for (var i = 0; i < siChuanAllData.length; i++) {
        mapAllData.push(siChuanAllData[i]);
      }
      for (var i = 0; i < yunNanAllData.length; i++) {
        mapAllData.push(yunNanAllData[i]);
      }
      for (var i = 0; i < qingHaiAllData.length; i++) {
        mapAllData.push(qingHaiAllData[i]);
      }
      for (var i = 0; i < xinJiangAllData.length; i++) {
        mapAllData.push(xinJiangAllData[i]);
      }
      for (var i = 0; i < taiWanAllData.length; i++) {
        mapAllData.push(taiWanAllData[i]);
      }
      for (var i = 0; i < xiangGangAllData.length; i++) {
        mapAllData.push(xiangGangAllData[i]);
      }
      for (var i = 0; i < aoMenAllData.length; i++) {
        mapAllData.push(aoMenAllData[i]);
      }
      for (var i = 0; i < liaoNingAllData.length; i++) {
        mapAllData.push(liaoNingAllData[i]);
      }
      for (var i = 0; i < jiLinAllData.length; i++) {
        mapAllData.push(jiLinAllData[i]);
      }
      for (var i = 0; i < heiLongJiangAllData.length; i++) {
        mapAllData.push(heiLongJiangAllData[i]);
      }
      for (var i = 0; i < shangHaiAllData.length; i++) {
        mapAllData.push(shangHaiAllData[i]);
      }
      for (var i = 0; i < anHuiAllData.length; i++) {
        mapAllData.push(anHuiAllData[i]);
      }
      for (var i = 0; i < fuJianAllData.length; i++) {
        mapAllData.push(fuJianAllData[i]);
      }
      for (var i = 0; i < jiangXiAllData.length; i++) {
        mapAllData.push(jiangXiAllData[i]);
      }
      for (var i = 0; i < guangXiAllData.length; i++) {
        mapAllData.push(guangXiAllData[i]);
      }
      for (var i = 0; i < haiNanAllData.length; i++) {
        mapAllData.push(haiNanAllData[i]);
      }
      for (var i = 0; i < xiZangAllData.length; i++) {
        mapAllData.push(xiZangAllData[i]);
      }
      for (var i = 0; i < shanXIAllData.length; i++) {
        mapAllData.push(shanXIAllData[i]);
      }
      for (var i = 0; i < ganSuAllData.length; i++) {
        mapAllData.push(ganSuAllData[i]);
      }
      for (var i = 0; i < ningXiaAllData.length; i++) {
        mapAllData.push(ningXiaAllData[i]);
      }

      var mapAllData = kongData.concat(
        neiMengGuAllData,
        tianJinAllData,
        heBeiAllData,
        shanXiAllData,
        jiangSuAllData,
        zheJiangAllData,
        shanDongAllData,
        heNanAllData,
        huBeiAllData,
        huNanAllData,
        guangDongAllData,
        chongQingAllData,
        siChuanAllData,
        yunNanAllData,
        qingHaiAllData,
        xinJiangAllData,
        taiWanAllData,
        xiangGangAllData,
        aoMenAllData,
        beiJingAllData,
        liaoNingAllData,
        jiLinAllData,
        heiLongJiangAllData,
        shangHaiAllData,
        anHuiAllData,
        fuJianAllData,
        jiangXiAllData,
        guangXiAllData,
        haiNanAllData,
        guiZhouAllData,
        xiZangAllData,
        shanXIAllData,
        ganSuAllData,
        ningXiaAllData
      );
      console.log(mapAllData);

      var mapName = "";
      var regoinData = [];
      this.$get(`/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000`,{}).then(res => {
        regoinData = res.dictionariesList;
      })
      // zhCn -> regionName，dictKey->regionCode
      if (sessionStorage.getItem("pdProvince")) {
        regoinData.filter(e=>{
          if(e.regionCode == sessionStorage.getItem("pdProvince")){
            mapName = e.regionName
          }else{
            mapName = "china";
          }
        })
      }
      console.log("===chinamapName===",mapName)
      const that = this;
      if(mapCode.indexOf('../') == -1){
        return
      }
      const data = await axios.get(mapCode);
      if (data) {
        this.returnLastStep()
        this.chart = echarts.init(this.$refs.mapChart);
        echarts.registerMap(name, data);
        var option = {
          title: {
            text: "供需热度指数",
            bottom: 80,
            left: 10,
            textStyle: {
              color: "#666",
              fontSize: 14
            }
          },
          tooltip: {
            // 鼠标移到图里面的浮动提示框
            formatter: function(params, ticket, callback) {
              // params.data 就是series配置项中的data数据遍历
              console.log(params.data);
              let order, zrArea, czArea;
              if (params.data) {
                order = params.data.order;
                zrArea = params.data.zrArea;
                czArea = params.data.czArea;
              } else {
                // 为了防止没有定义数据的时候报错写的
                order = 0;
                zrArea = 0;
                czArea = 0;
              }
              let htmlStr = `
                <div style='font-size:18px;'> ${params.name}</div>
                <p style='text-align:left;margin-top:10px;'>
                  排名：${order}<br/>
                  转让面积：${zrArea} 万平方米<br/>
                  出租面积：${czArea} 万平方米<br/>
                </p>
              `;
              return htmlStr;
            }
            // backgroundColor:"#ff7f50",//提示标签背景颜色
            // textStyle:{color:"#fff"} //提示标签字体颜色
          },

          visualMap: {
            //颜色的设置  dataRange

            itemWidth: 14,
            itemHeight: 14,
            bottom: 60,
            left: 10,
            inverse: "true", //控制高低的位置
            orient: "horizontal", //控制导航的方向
            splitList: [
              {
                start: Math.ceil((valueAllDataMax / 5) * 4),
                end: Math.ceil((valueAllDataMax / 5) * 5),
                color: "#5984e6"
              },
              {
                start: Math.ceil((valueAllDataMax / 5) * 3),
                end: Math.ceil((valueAllDataMax / 5) * 4),
                color: "#7a9deb"
              },
              {
                start: Math.ceil((valueAllDataMax / 5) * 2),
                end: Math.ceil((valueAllDataMax / 5) * 3),
                color: "#c7defb"
              },
              {
                start: Math.ceil((valueAllDataMax / 5) * 1),
                end: Math.ceil((valueAllDataMax / 5) * 2),
                color: "#b9d6f9"
              },
              { end: Math.ceil((valueAllDataMax / 5) * 1), color: "#b9d6f9" }
            ],
            //  min: 0,
            //  max: 2500,
            //  calculable : true,//颜色呈条状
            text: ["高", "低"] // 文本，默认为数值文本
          },
          geo: {
            // 这个是重点配置区(阴影设置)
            map: mapName, // 表示中国地图
            roam: false, //禁止缩放
            show: true, //是否显示阴影
            zoom: 1,
            label: {
              normal: {
                show: false, // 是否显示对应地名
                textStyle: {
                  color: "rgba(0,0,0,0.4)"
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: "#76aff4", //地图边界线的颜色
                areaColor: null, //地图整体区域的颜色
                shadowColor: "rgba(0, 0, 0, 0.2)",
                shadowBlur: 10,
                shadowOffsetX: 10
              },
              emphasis: {
                areaColor: null, //鼠标滑过的颜色

                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          },
          series: [
            {
              name: "MAP",
              type: "map",
              mapType: name,
              // selectedMode: false, //是否允许选中多个区域
              selectedMode : 'single',
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              data: mapAllData
            }
          ]
        };
        console.log('series====',option.series);
        this.chart.setOption(option);
        this.chart.on("click", function(params) {
          console.log('供需监控台地图点击',params)
          
          if(
            // sessionStorage.getItem("org_level") == 'org_level-001' && 
          params.data){
            sessionStorage.setItem("pdProvince", params.data.cantonProvince);
            that.getCode(params.data.cantonProvince)
          }
          
          clearTimeout(this.timeFn);
          this.timeFn = setTimeout(function() {
            const name = params.name;
            const code = that.pro[name] ? '' : that.getAreaCode(name)
            const mapCode = that.pro[name] ? that.pro[name] : code
            console.log(mapCode, name);
            if (!mapCode) {
              return;
            }
            that.loadMap(mapCode, name);
           
            console.log("======================"+code)
            that.$refs.pdRankC.haveCity(code);
            that.$refs.pdIndexC.haveCity(code);
            that.$refs.pdUseC.haveCity(code);
            that.$refs.pdLineC.haveCity(code);
            // that.$refs.pdRankC.areaContDrawLine();
            // that.$refs.pdIndexC.typeContDrawLine();
            // that.$refs.pdUseC.useContDrawLine();
            // that.$refs.pdLineC.timeContDrawLine();
            that.isProvince = true;
            that.breadcrumbName = name;
          }, 250);
        });
      } else {
        alert("无法加载该地图");
      }
    },
    returnLastStep: function() {
      const that = this;
      this.chart = echarts.init(this.$refs.mapChart);

      // 绑定双击事件，返回全国地图
      this.chart.on("dblclick", function(params) {
        //当双击事件发生时，清除单击事件，仅响应双击事件
        sessionStorage.removeItem("pdProvince");
        this.code_city = '';
        clearTimeout(this.timeFn);
        that.loadMap("../../../../../../static/map/json/china.json", "china");
        that.$refs.pdRankC.haveCity('');
        that.$refs.pdIndexC.haveCity('');
        that.$refs.pdUseC.haveCity('');
        that.$refs.pdLineC.haveCity('');
        // that.$refs.pdRankC.areaContDrawLine();
        // that.$refs.pdIndexC.typeContDrawLine();
        // that.$refs.pdUseC.useContDrawLine();
        // that.$refs.pdLineC.timeContDrawLine();
        that.isProvince = false;
        that.breadcrumbName = "";
      });
    },

    initEchart() {
      window.addEventListener("resize", () => {
        let pdChinaChart = echarts.init(
          document.getElementById("pdChinaChart")
        );
        document.getElementById("pdChinaChart").style.width = 100 + "%";
        pdChinaChart.resize();
      });
    },
    // initEchart() {
    //   window.addEventListener("resize", () => {
    //     this.chart = echarts.init(this.$refs.mapChart);
    //     document.getElementById("pdChinaChart").style.width = 100 + "%";
    //     this.chart.resize(); //直接加这句即可
    //   });
    // },
    changeMap() {
      if (sessionStorage.getItem("pdProvince")) {
        if (sessionStorage.getItem("pdProvince") == "150000") {
          this.loadMap(
            "../../../../../../static/map/json/province/neimenggu.json",
            "内蒙古"
          );
        } else if (sessionStorage.getItem("pdProvince") == "120000") {
          this.loadMap(
            "../../../../../../static/map/json/province/tianjin.json",
            "天津"
          );
        } else if (sessionStorage.getItem("pdProvince") == "130000") {
          this.loadMap(
            "../../../../../../static/map/json/province/hebei.json",
            "河北"
          );
        } else if (sessionStorage.getItem("pdProvince") == "140000") {
          this.loadMap(
            "../../../../../../static/map/json/province/shanxi.json",
            "山西"
          );
        } else if (sessionStorage.getItem("pdProvince") == "320000") {
          this.loadMap(
            "../../../../../../static/map/json/province/jiangsu.json",
            "江苏"
          );
        } else if (sessionStorage.getItem("pdProvince") == "330000") {
          this.loadMap(
            "../../../../../../static/map/json/province/zhejiang.json",
            "浙江"
          );
        } else if (sessionStorage.getItem("pdProvince") == "370000") {
          this.loadMap(
            "../../../../../../static/map/json/province/shandong.json",
            "山东"
          );
        } else if (sessionStorage.getItem("pdProvince") == "410000") {
          this.loadMap(
            "../../../../../../static/map/json/province/henan.json",
            "河南"
          );
        } else if (sessionStorage.getItem("pdProvince") == "420000") {
          this.loadMap(
            "../../../../../../static/map/json/province/hubei.json",
            "湖北"
          );
        } else if (sessionStorage.getItem("pdProvince") == "430000") {
          this.loadMap(
            "../../../../../../static/map/json/province/hunan.json",
            "湖南"
          );
        } else if (sessionStorage.getItem("pdProvince") == "440000") {
          this.loadMap(
            "../../../../../../static/map/json/province/guangdong.json",
            "广东"
          );
        } else if (sessionStorage.getItem("pdProvince") == "500000") {
          this.loadMap(
            "../../../../../../static/map/json/province/chongqing.json",
            "重庆"
          );
        } else if (sessionStorage.getItem("pdProvince") == "510000") {
          this.loadMap(
            "../../../../../../static/map/json/province/sichuan.json",
            "四川"
          );
        } else if (sessionStorage.getItem("pdProvince") == "530000") {
          this.loadMap(
            "../../../../../../static/map/json/province/yunnan.json",
            "云南"
          );
        } else if (sessionStorage.getItem("pdProvince") == "630000") {
          this.loadMap(
            "../../../../../../static/map/json/province/qinghai.json",
            "青海"
          );
        } else if (sessionStorage.getItem("pdProvince") == "650000") {
          this.loadMap(
            "../../../../../../static/map/json/province/xinjiang.json",
            "新疆"
          );
        } else if (sessionStorage.getItem("pdProvince") == "710000") {
          this.loadMap(
            "../../../../../../static/map/json/province/taiwan.json",
            "台湾"
          );
        } else if (sessionStorage.getItem("pdProvince") == "810000") {
          this.loadMap(
            "../../../../../../static/map/json/province/xianggang.json",
            "香港"
          );
        } else if (sessionStorage.getItem("pdProvince") == "820000") {
          this.loadMap(
            "../../../../../../static/map/json/province/aomen.json",
            "澳门"
          );
        } else if (sessionStorage.getItem("pdProvince") == "110000") {
          this.loadMap(
            "../../../../../../static/map/json/province/beijing.json",
            "北京"
          );
        } else if (sessionStorage.getItem("pdProvince") == "210000") {
          this.loadMap(
            "../../../../../../static/map/json/province/liaoning.json",
            "辽宁"
          );
        } else if (sessionStorage.getItem("pdProvince") == "220000") {
          this.loadMap(
            "../../../../../../static/map/json/province/jilin.json",
            "吉林"
          );
        } else if (sessionStorage.getItem("pdProvince") == "230000") {
          this.loadMap(
            "../../../../../../static/map/json/province/heilongjiang.json",
            "黑龙江"
          );
        } else if (sessionStorage.getItem("pdProvince") == "310000") {
          this.loadMap(
            "../../../../../../static/map/json/province/shanghai.json",
            "上海"
          );
        } else if (sessionStorage.getItem("pdProvince") == "340000") {
          this.loadMap(
            "../../../../../../static/map/json/province/anhui.json",
            "安徽"
          );
        } else if (sessionStorage.getItem("pdProvince") == "350000") {
          this.loadMap(
            "../../../../../../static/map/json/province/fujian.json",
            "福建"
          );
        } else if (sessionStorage.getItem("pdProvince") == "450000") {
          this.loadMap(
            "../../../../../../static/map/json/province/guangxi.json",
            "广西"
          );
        } else if (sessionStorage.getItem("pdProvince") == "360000") {
          this.loadMap(
            "../../../../../../static/map/json/province/jiangxi.json",
            "江西"
          );
        } else if (sessionStorage.getItem("pdProvince") == "460000") {
          this.loadMap(
            "../../../../../../static/map/json/province/hainan.json",
            "海南"
          );
        } else if (sessionStorage.getItem("pdProvince") == "520000") {
          this.loadMap(
            "../../../../../../static/map/json/province/guizhou.json",
            "贵州"
          );
        } else if (sessionStorage.getItem("pdProvince") == "540000") {
          this.loadMap(
            "../../../../../../static/map/json/province/xizang.json",
            "西藏"
          );
        } else if (sessionStorage.getItem("pdProvince") == "610000") {
          this.loadMap(
            "../../../../../../static/map/json/province/shanxi.json",
            "陕西"
          );
        } else if (sessionStorage.getItem("pdProvince") == "620000") {
          this.loadMap(
            "../../../../../../static/map/json/province/gansu.json",
            "甘肃"
          );
        } else if (sessionStorage.getItem("pdProvince") == "640000") {
          this.loadMap(
            "../../../../../../static/map/json/province/ningxia.json",
            "宁夏"
          );
        }
      } else {
        this.loadMap("../../../../../../static/map/json/china.json", "china");
      }
    },
    toNationwide() {
      this.code_city = '';
      sessionStorage.removeItem("pdProvince");
      this.loadMap("../../../../../../static/map/json/china.json", "china");
      // this.$refs.pdRankC.areaContDrawLine();
      // this.$refs.pdIndexC.typeContDrawLine();
      // this.$refs.pdUseC.useContDrawLine();
      // this.$refs.pdLineC.timeContDrawLine();
      this.$refs.pdRankC.haveCity('');
      this.$refs.pdIndexC.haveCity('');
      this.$refs.pdUseC.haveCity('');
      this.$refs.pdLineC.haveCity('');
      this.isProvince = false;
      this.breadcrumbName = "";
    },
    getCode(pId){
      // let pId = pId
      this.$get(
        `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        console.log(res);
        if (res.dictionariesList.length != 0) {
          this.areaList = res.dictionariesList;
          return;
        }
        this.areaList = "";
      });
    },
    getAreaCode(name){
      let a = this.areaList;
      for(var i = 0; i < a.length; i++){
        if(a[i].regionName == name){
          this.code_city = a[i].regionCode
          return a[i].regionCode
        }
      }
    }
  },
  created(){
    if(sessionStorage.getItem("pdProvince")){
      this.getCode(sessionStorage.getItem("pdProvince"))
    }
    if(sessionStorage.getItem('jgCityCode')){
      this.code_city = sessionStorage.getItem('jgCityCode')
    }
  },
  mounted() {
    this.$nextTick(function() {
      setTimeout(() => {
        this.changeMap();
      }, 1000);
    });
    this.initEchart();
    
    if(sessionStorage.getItem("org_level") == 'org_level-001'){
      this.returnLastStep();
      this.toNationwide();
    }
    
    // sessionStorage.setItem("pdProvince", "140000");//一开始默认山西地图
  },
  watch: {
    analyzeType(val) {
      console.log(val);
      this.changeMap();
    },
    time(val) {
      console.log(val);
      this.changeMap();
    }
  },
  destroyed() {
    window.removeEventListener(
      "resize",
      () => {
        let pdChinaChart = echarts.init(
          document.getElementById("pdChinaChart")
        );
        document.getElementById("pdChinaChart").style.width = 100 + "%";
        pdChinaChart.resize();
      },
      20
    );

    if(sessionStorage.getItem("org_level") == 'org_level-001'){
      sessionStorage.removeItem("pdProvince");
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  }
};
</script>

<style scoped>
.main_wrap {
  width: 100%;
  height: 100%;
}
.filter_wrap_left {
  box-sizing: border-box;
  padding: 20px 22px 0 22px;
  width: 59%;
  height: 950px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  float: left;
  background: #fff;
}
.filter_wrap_right {
  box-sizing: border-box;
  width: 39.5%;
  height: 100%;
  float: right;
}
.switchHeight_box_chart {
  width: 100%;
  display: flex;
  /* justify-content: space-between; */
}
.switchHeight_box_search {
  font-size: 12px;
  font-weight: bold;
  color: #747474;
  height: 40px;
  word-break: break-all;
  white-space: normal;
  display: flex;
  justify-content: center;
  align-items: center;
}
.switchHeight_box_title {
  font-size: 16px;
  font-weight: bolder;
  height: 40px;
  word-break: break-all;
  white-space: normal;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.switchHeight_box_top {
  transition: 0.5s;
  background: #fff;
  width: 100%;
  height: 270px;
  margin-bottom: 25px;
  padding: 25px 22px 14px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  position: relative;
}
.switchHeight_box_top_gx {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.switchHeight_box_center {
  transition: 0.5s;
  background: #fff;
  width: 100%;
  height: 340px;
  margin-bottom: 25px;
  padding: 32px 22px 0;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  position: relative;
}
.switchHeight_box_bottom {
  transition: 0.5s;
  background: #fff;
  width: 100%;
  height: 290px;
  padding: 25px 22px 0;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  position: relative;
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
.chart_big_tilte {
  font-size: 16px;
  font-weight: bolder;
  position: absolute;
  top: 25px;
  left: 22px;
}
.chart_big_tilte_left {
  font-size: 16px;
  font-weight: bolder;
  top: 25px;
  left: 22px;
}
ul li {
  margin: 0;
  padding: 0;
  list-style: none;
}

.chart_tab_tilte {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  color: #808080;
}
.chart_tab_tilte li {
  /* padding: 0 25px; */
  text-align: center;
  cursor: pointer;
}
.chart_tab_tilte .active {
  color: #ffa000;
  border-bottom: 2px solid #ffa000;
}
.chart_tab_content {
  width: 100%;
}
.switchHeight_box_top_left {
  transition: 0.5s;
  background: #fff;
  width: 50%;
  height: 270px;
  margin-bottom: 25px;
  padding: 25px 22px 14px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  position: relative;
}
.switchHeight_box_top_right {
  transition: 0.5s;
  background: #fff;
  width: 47%;
  height: 270px;
  margin-bottom: 25px;
  padding: 25px 22px 0;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  position: relative;
}
.chart_tab_content .cur {
  width: 100%;
}
.sum_box_big_right {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 40px 0 25px 0;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
}
.sum_box_right {
  padding: 10px 8px;
  width: 80%;
  height: 80px;
  box-sizing: border-box;
  border: 1px solid #f6f6f5;
  background-color: #fff;
}
.sum_box_right .span_big {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f5;
  font-size: 14px;
}
.span_small {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  flex: 2;
}
.span_small_first {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.pd_icon {
  width: 30px;
  height: 32px;
}
</style>
<style>
.el-input--small .el-input__inner {
  height: 40px;
}
</style>
