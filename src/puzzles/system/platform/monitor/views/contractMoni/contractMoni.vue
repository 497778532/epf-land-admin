<template>
    <epf-container title="合同监控台">
        <div class="filter_wrap_left">
            <div class="switchHeight_box_chart">
                <div class="switchHeight_box_title" style="width:28%;">合同签订分布（地域分布）</div>
                <div style="width:21%;display:flex;">
                    <span class="switchHeight_box_search" style="width:45%;">合同类型：</span>
                    <el-select
                      size="small"
                      v-model="filterData.contractTrans"
                      placeholder="全部"
                      @change="circulationSelect(dictionary.flow_mode,filterData.contractTrans,$event)"
                      style="width:55%;"
                      >
                      <el-option
                          v-for="item in dictionary.flow_mode"
                          :ref="item.zhCn"
                          :id="item.id"
                          :dictKey="item.dictKey"
                          :label="item.zhCn"
                          :value="item.zhCn"
                          :key="item.dictKey"
                      ></el-option>
                    </el-select>
                </div>
                <div style="width:21%;display:flex;">
                    <span class="switchHeight_box_search" style="width:45%;">分析角度：</span>
                    <el-select v-model="filterData.analyze" style="width:55%;" @change="analyzeSelect">
                      <el-option
                          v-for="item in analyzeList"
                          :key="item.value"
                          :label="item.label"
                          :value="item"
                      ></el-option>
                    </el-select>
                </div>
                <div style="width:30%;display:flex;">
                    <el-select v-model="filterData.time" style="width:36%;margin: 0 12px;" @change="timeSelect">
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
                    v-if="filterData.time==''||filterData.time=='本月'||filterData.time=='本周'||filterData.time=='本季'||filterData.time=='本年度'"
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
                    <el-breadcrumb-item v-if="isBu">
                    <el-button type="text" @click="toNationwide" style="color:#ffa000;">全国</el-button>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item v-if="isProvince">
                    <el-button type="text" style="color:#ffa000;">{{breadcrumbName}}</el-button>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div id="chinaChart" style="height:540px;width:100%;margin:5px 0;" ref="mapChart"></div>
                <div
                style="width:100%;height:313px;margin-bottom:6px;border:1px solid #e1e0e0;padding:18px 30px 0;"
                >
                <div class="chart_big_tilte_left">合同签订汇总</div>
                <tractRank
                    :contractMessage="contractType"
                    :analyzeMessage="analyzeType"
                    :timeStartMessage="start"
                    :timeEndMessage="end"
                    ref="tractRankC"
                ></tractRank>
            </div>
        </div>
        <div class="filter_wrap_right">
            <div class="switchHeight_box_top">
                <tractType
                    :contractMessage="contractType"
                    :analyzeMessage="analyzeType"
                    :timeStartMessage="start"
                    :timeEndMessage="end"
                    ref="tractTypeC"
                ></tractType>
            </div>
            <div class="switchHeight_box_center">
                <tractUse
                    :contractMessage="contractType"
                    :analyzeMessage="analyzeType"
                    :timeStartMessage="start"
                    :timeEndMessage="end"
                    ref="tractUseC"
                ></tractUse>
            </div>
            <div class="switchHeight_box_bottom">
                <tractRate
                    :contractMessage="contractType"
                    :analyzeMessage="analyzeType"
                    :timeStartMessage="start"
                    :timeEndMessage="end"
                    ref="tractRateC"
                ></tractRate>
            </div>
        </div>
    </epf-container>
</template>

<script>
import axios from "axios";
import echarts from "echarts";
import moment from "moment";
import tractType from "@/components/contractTypeChartStation";
import tractUse from "@/components/contractUseChartStation";
import tractRate from "@/components/contractRateChartStation";
import tractRank from "@/components/contractRankChartStation";
import "../../../../../../../static/map/js/china";
require("echarts/lib/chart/map");
// 图例
require("echarts/lib/component/legend");
// 提示框
require("echarts/lib/component/tooltip");
// 地图geo
require("echarts/lib/component/geo");
export default {
  name: "contractStation",
  components: {
    tractType,
    tractUse,
    tractRate,
    tractRank
  },
  data() {
    return {
      code_city:'',
      areaList:'',
      isBu: true,
      filterData: {
        analyze: "金额", //分析角度
        contractTrans: "全部", //合同类型
        time: "本年度" //时间
      },
      time: "本年度",

      params: {
        cantonProvince: "",
        explanType: "",
        startDate: "",
        endDate: "",
        flowType: ""
      },
      dicRequest: ["flow_mode"], //字典码请求
      dictionary: { flow_mode: "" }, //字典码结果
      dicNum: 0, //字典循环下标

      contractType: "",
      analyzeType: "JE",
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

      analyzeList: [
        {
          value: "JE",
          label: "金额"
        },
        {
          value: "MJ",
          label: "面积"
        },
        {
          value: "ZS",
          label: "宗数"
        }
      ],
      timeList: [
        {
          value: "选项1",
          label: "本月"
        },
        {
          value: "选项2",
          label: "本周"
        },
        {
          value: "选项3",
          label: "本季"
        },
        {
          value: "选项4",
          label: "本年度"
        },
        {
          value: "选项5",
          label: "全部"
        },
        {
          value: "选项6",
          label: "自定义"
        }
      ],

      breadcrumbName: "",
      isProvince: false,

      //交易热度分布(地域分布)
      chart: null,
      timeFn: null,
      mapCode: "",
      pro: {
        内蒙古: "../../../../../../../static/map/json/province/neimenggu.json",
        天津: "../../../../../../../static/map/json/province/tianjin.json",
        河北: "../../../../../../../static/map/json/province/hebei.json",
        山西: "../../../../../../../static/map/json/province/shanxi.json",
        江苏: "../../../../../../../static/map/json/province/jiangsu.json",
        浙江: "../../../../../../../static/map/json/province/zhejiang.json",
        山东: "../../../../../../../static/map/json/province/shandong.json",
        河南: "../../../../../../../static/map/json/province/henan.json",
        湖北: "../../../../../../../static/map/json/province/hubei.json",
        湖南: "../../../../../../../static/map/json/province/hunan.json",
        广东: "../../../../../../../static/map/json/province/guangdong.json",
        重庆: "../../../../../../../static/map/json/province/chongqing.json",
        四川: "../../../../../../../static/map/json/province/sichuan.json",
        云南: "../../../../../../../static/map/json/province/yunnan.json",
        新疆: "../../../../../../../static/map/json/province/xinjiang.json",
        青海: "../../../../../../../static/map/json/province/qinghai.json",
        香港: "../../../../../../../static/map/json/province/xianggang.json",
        澳门: "../../../../../../../static/map/json/province/aomen.json",
        北京: "../../../../../../../static/map/json/province/beijing.json",
        辽宁: "../../../../../../../static/map/json/province/liaoning.json",
        吉林: "../../../../../../../static/map/json/province/jilin.json",
        黑龙江: "../../../../../../../static/map/json/province/heilongjiang.json",
        上海: "../../../../../../../static/map/json/province/shanghai.json",
        安徽: "../../../../../../../static/map/json/province/anhui.json",
        福建: "../../../../../../../static/map/json/province/fujian.json",
        江西: "../../../../../../../static/map/json/province/jiangxi.json",
        广西: "../../../../../../../static/map/json/province/guangxi.json",
        海南: "../../../../../../../static/map/json/province/hainan.json",
        贵州: "../../../../../../../static/map/json/province/guizhou.json",
        西藏: "../../../../../../../static/map/json/province/xizang.json",
        陕西: "../../../../../../../static/map/json/province/shanxi.json",
        甘肃: "../../../../../../../static/map/json/province/gansu.json",
        宁夏: "../../../../../../../static/map/json/province/ningxia.json",
        台湾: "../../../../../../../static/map/json/province/taiwan.json"
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

      const weekStartDate = moment()
        .week(moment().week())
        .startOf("week")
        .format("YYYY-MM-DD"); //本周开始时间
      const weekEndDate = moment()
        .week(moment().week())
        .endOf("week")
        .format("YYYY-MM-DD"); //本周结束时间

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
      } else if (this.filterData.time == "本周" || this.time == "本周") {
        this.start = weekStartDate;
        this.end = weekEndDate;
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
    circulationSelect(dic, entrustAgency, event) {
      this.filterData.entrustAgency = this.$refs[
        entrustAgency
      ][0].$attrs.dictKey;
      this.filterData.entrustAgencyId = this.$refs[
        entrustAgency
      ][0].$attrs.dictId;
      this.filterData.trustOrgId = this.$refs[entrustAgency][0].$attrs.dictKey;
      this.contractType = this.filterData.entrustAgency;
    },
    async loadMap(mapCode, name) {

      if(sessionStorage.getItem("org_level") != 'org_level-001'){
        this.isProvince = true;
        this.breadcrumbName = name;
        this.isBu = false;
      }

      setTimeout(() => {
        document.getElementById("chinaChart").style.width = 100 + "%";
        this.chart = echarts.init(this.$refs.mapChart);
        this.chart.resize(); //直接加这句即可
      }, 0);

      //请求数据
      let params = this.params;
      params["flowType"] = this.contractType;
      params["explanType"] = this.analyzeType;
      params["startDate"] = this.start;
      params["endDate"] = this.end;
      params["cantonProvince"] = sessionStorage.getItem("tractProvince");
      params["cantonCity"] = this.code_city;

      let mapRes = await this.$get(
        `/epf-monitor/monitor/contact/hotMap`,
        params
      );
      console.log(mapRes);

      //  for (var key in mapRes.result) {
      //       if (mapRes.result[key].cantonProvince == "null") {
      //         mapRes.result[key].cantonProvince = "";
      //       }
      //       if (mapRes.result[key].cantonCity == "null") {
      //         mapRes.result[key].cantonCity = "";
      //       }
      //     }

      let chartData = mapRes.result;
      console.log(chartData);

      var valueAllData = [];
      for (var key in chartData) {
        valueAllData.push(chartData[key].totalData);
      }

      var valueAllDataMax = Math.max.apply(Math, valueAllData);
      console.log(valueAllData);
      //console.log(valueAllDataMax);

      function getData(Data, analyzeType, contractType, AllData, shengM) {
        if (analyzeType == "JE") {
          if (contractType == "transfer") {
            for (var key in Data) {
              AllData.push({
                name: shengM,
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "转让",
                analyzeTypeName: "金额"
              });
            }
          } else if (contractType == "rent") {
            for (var key in Data) {
              AllData.push({
                name: shengM,
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "出租",
                analyzeTypeName: "金额"
              });
            }
          } else if (contractType == "mortgage") {
            for (var key in Data) {
              AllData.push({
                name: shengM,
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "抵押",
                analyzeTypeName: "金额"
              });
            }
          } else {
            for (var key in Data) {
              AllData.push({
                name: shengM,
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "全部",
                analyzeTypeName: "金额"
              });
            }
          }
        } else if (analyzeType == "MJ") {
          if (contractType == "transfer") {
            for (var key in Data) {
              AllData.push({
                name: shengM,
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "转让",
                analyzeTypeName: "面积"
              });
            }
          } else if (contractType == "rent") {
            for (var key in Data) {
              AllData.push({
                name: shengM,
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "出租",
                analyzeTypeName: "面积"
              });
            }
          } else if (contractType == "mortgage") {
            for (var key in Data) {
              AllData.push({
                name: shengM,
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "抵押",
                analyzeTypeName: "面积"
              });
            }
          } else {
            for (var key in Data) {
              AllData.push({
                name: shengM,
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "全部",
                analyzeTypeName: "面积"
              });
            }
          }
        } else if (analyzeType == "ZS") {
          if (contractType == "transfer") {
            for (var key in Data) {
              AllData.push({
                name: shengM,
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "转让",
                analyzeTypeName: "宗数"
              });
            }
          } else if (contractType == "rent") {
            for (var key in Data) {
              AllData.push({
                name: shengM,
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "出租",
                analyzeTypeName: "宗数"
              });
            }
          } else if (contractType == "mortgage") {
            for (var key in Data) {
              AllData.push({
                name: shengM,
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "抵押",
                analyzeTypeName: "宗数"
              });
            }
          } else {
            for (var key in Data) {
              AllData.push({
                name: shengM,
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "全部",
                analyzeTypeName: "宗数"
              });
            }
          }
        }
      }

      function getCityData(Data, analyzeType, contractType, AllData) {
        if (analyzeType == "JE") {
          if (contractType == "transfer") {
            for (var key in Data) {
              AllData.push({
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                name: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "转让",
                analyzeTypeName: "金额"
              });
            }
          } else if (contractType == "rent") {
            for (var key in Data) {
              AllData.push({
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                name: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "出租",
                analyzeTypeName: "金额"
              });
            }
          } else if (contractType == "mortgage") {
            for (var key in Data) {
              AllData.push({
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                name: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "抵押",
                analyzeTypeName: "金额"
              });
            }
          } else {
            for (var key in Data) {
              AllData.push({
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                name: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "全部",
                analyzeTypeName: "金额"
              });
            }
          }
        } else if (analyzeType == "MJ") {
          if (contractType == "transfer") {
            for (var key in Data) {
              AllData.push({
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                name: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "转让",
                analyzeTypeName: "面积"
              });
            }
          } else if (contractType == "rent") {
            for (var key in Data) {
              AllData.push({
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                name: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "出租",
                analyzeTypeName: "面积"
              });
            }
          } else if (contractType == "mortgage") {
            for (var key in Data) {
              AllData.push({
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                name: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "抵押",
                analyzeTypeName: "面积"
              });
            }
          } else {
            for (var key in Data) {
              AllData.push({
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                name: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "全部",
                analyzeTypeName: "面积"
              });
            }
          }
        } else if (analyzeType == "ZS") {
          if (contractType == "transfer") {
            for (var key in Data) {
              AllData.push({
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                name: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "转让",
                analyzeTypeName: "宗数"
              });
            }
          } else if (contractType == "rent") {
            for (var key in Data) {
              AllData.push({
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                name: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "出租",
                analyzeTypeName: "宗数"
              });
            }
          } else if (contractType == "mortgage") {
            for (var key in Data) {
              AllData.push({
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                name: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "抵押",
                analyzeTypeName: "宗数"
              });
            }
          } else {
            for (var key in Data) {
              AllData.push({
                value: Data[key].totalData,
                order: Data[key].order,
                zrData: Data[key].zrData,
                czData: Data[key].czData,
                dyData: Data[key].dyData,
                cantonProvinceName: Data[key].cantonProvinceName,
                cantonProvince: Data[key].cantonProvince,
                cantonCityName: Data[key].cantonCityName,
                name: Data[key].cantonCityName,
                cantonCity: Data[key].cantonCity,
                analysisTypeName: "全部",
                analyzeTypeName: "宗数"
              });
            }
          }
        }
      }

      var analyzeType = this.analyzeType;
      var contractType = this.contractType;

      //北京数据
      var beiJingAllData = [];

      var beiJingData = [];
      var beiJingTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("110000");
      });
      beiJingData = beiJingData.concat(beiJingTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(beiJingData, analyzeType, contractType, beiJingAllData);
      } else {
        getData(beiJingData, analyzeType, contractType, beiJingAllData, "北京");
      }
      console.log(beiJingAllData);

      //山东数据
      var shanDongAllData = [];

      var shanDongData = [];
      var shanDongTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("370000");
      });
      shanDongData = shanDongData.concat(shanDongTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(shanDongData, analyzeType, contractType, shanDongAllData);
      } else {
        getData(
          shanDongData,
          analyzeType,
          contractType,
          shanDongAllData,
          "山东"
        );
      }

      //河北数据
      var heBeiAllData = [];

      var heBeiData = [];
      var heBeiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("130000");
      });
      heBeiData = heBeiData.concat(heBeiTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(heBeiData, analyzeType, contractType, heBeiAllData);
      } else {
        getData(heBeiData, analyzeType, contractType, heBeiAllData, "河北");
      }

      //贵州数据
      var guiZhouAllData = [];

      var guiZhouData = [];
      var guiZhouTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("520000");
      });
      guiZhouData = guiZhouData.concat(guiZhouTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(guiZhouData, analyzeType, contractType, guiZhouAllData);
      } else {
        getData(guiZhouData, analyzeType, contractType, guiZhouAllData, "贵州");
      }

      //内蒙古数据
      var neiMengGuAllData = [];

      var neiMengGuData = [];
      var neiMengGuTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("150000");
      });
      neiMengGuData = neiMengGuData.concat(neiMengGuTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(neiMengGuData, analyzeType, contractType, neiMengGuAllData);
      } else {
        getData(
          neiMengGuData,
          analyzeType,
          contractType,
          neiMengGuAllData,
          "内蒙古"
        );
      }

      //天津数据
      var tianJinAllData = [];

      var tianJinData = [];
      var tianJinTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("120000");
      });
      tianJinData = tianJinData.concat(tianJinTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(tianJinData, analyzeType, contractType, tianJinAllData);
      } else {
        getData(tianJinData, analyzeType, contractType, tianJinAllData, "天津");
      }

      //山西数据
      var shanXiAllData = [];

      var shanXiData = [];
      var shanXiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("140000");
      });
      shanXiData = shanXiData.concat(shanXiTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(shanXiData, analyzeType, contractType, shanXiAllData);
      } else {
        getData(shanXiData, analyzeType, contractType, shanXiAllData, "山西");
      }

      //江苏数据
      var jiangSuAllData = [];

      var jiangSuData = [];
      var jiangSuTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("320000");
      });
      jiangSuData = jiangSuData.concat(jiangSuTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(jiangSuData, analyzeType, contractType, jiangSuAllData);
      } else {
        getData(jiangSuData, analyzeType, contractType, jiangSuAllData, "江苏");
      }

      //浙江数据
      var zheJiangAllData = [];

      var zheJiangData = [];
      var zheJiangTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("330000");
      });
      zheJiangData = zheJiangData.concat(zheJiangTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(zheJiangData, analyzeType, contractType, zheJiangAllData);
      } else {
        getData(
          zheJiangData,
          analyzeType,
          contractType,
          zheJiangAllData,
          "浙江"
        );
      }

      //河南数据
      var heNanAllData = [];

      var heNanData = [];
      var heNanTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("410000");
      });
      heNanData = heNanData.concat(heNanTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(heNanData, analyzeType, contractType, heNanAllData);
      } else {
        getData(heNanData, analyzeType, contractType, heNanAllData, "河南");
      }

      //湖北数据
      var huBeiAllData = [];

      var huBeiData = [];
      var huBeiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("420000");
      });
      huBeiData = huBeiData.concat(huBeiTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(huBeiData, analyzeType, contractType, huBeiAllData);
      } else {
        getData(huBeiData, analyzeType, contractType, huBeiAllData, "湖北");
      }

      //湖南数据
      var huNanAllData = [];

      var huNanData = [];
      var huNanTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("430000");
      });
      huNanData = huNanData.concat(huNanTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(huNanData, analyzeType, contractType, huNanAllData);
      } else {
        getData(huNanData, analyzeType, contractType, huNanAllData, "湖南");
      }

      //广东数据
      var guangDongAllData = [];

      var guangDongData = [];
      var guangDongTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("440000");
      });
      guangDongData = guangDongData.concat(guangDongTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(guangDongData, analyzeType, contractType, guangDongAllData);
      } else {
        getData(
          guangDongData,
          analyzeType,
          contractType,
          guangDongAllData,
          "广东"
        );
      }

      //重庆数据
      var chongQingAllData = [];

      var chongQingData = [];
      var chongQingTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("500000");
      });
      chongQingData = chongQingData.concat(chongQingTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(chongQingData, analyzeType, contractType, chongQingAllData);
      } else {
        getData(
          chongQingData,
          analyzeType,
          contractType,
          chongQingAllData,
          "重庆"
        );
      }

      //四川数据
      var siChuanAllData = [];

      var siChuanData = [];
      var siChuanTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("510000");
      });
      siChuanData = siChuanData.concat(siChuanTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(siChuanData, analyzeType, contractType, siChuanAllData);
      } else {
        getData(siChuanData, analyzeType, contractType, siChuanAllData, "四川");
      }

      //云南数据
      var yunNanAllData = [];

      var yunNanData = [];
      var yunNanTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("530000");
      });
      yunNanData = yunNanData.concat(yunNanTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(yunNanData, analyzeType, contractType, yunNanAllData);
      } else {
        getData(yunNanData, analyzeType, contractType, yunNanAllData, "云南");
      }

      //青海数据
      var qingHaiAllData = [];

      var qingHaiData = [];
      var qingHaiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("630000");
      });
      qingHaiData = qingHaiData.concat(qingHaiTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(qingHaiData, analyzeType, contractType, qingHaiAllData);
      } else {
        getData(qingHaiData, analyzeType, contractType, qingHaiAllData, "青海");
      }

      //新疆数据
      var xinJiangAllData = [];

      var xinJiangData = [];
      var xinJiangTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("650000");
      });
      xinJiangData = xinJiangData.concat(xinJiangTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(xinJiangData, analyzeType, contractType, xinJiangAllData);
      } else {
        getData(
          xinJiangData,
          analyzeType,
          contractType,
          xinJiangAllData,
          "新疆"
        );
      }

      //台湾数据
      var taiWanAllData = [];

      var taiWanData = [];
      var taiWanTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("710000");
      });
      taiWanData = taiWanData.concat(taiWanTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(taiWanData, analyzeType, contractType, taiWanAllData);
      } else {
        getData(taiWanData, analyzeType, contractType, taiWanAllData, "台湾");
      }

      //香港数据
      var xiangGangAllData = [];

      var xiangGangData = [];
      var xiangGangTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("810000");
      });
      xiangGangData = xiangGangData.concat(xiangGangTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(xiangGangData, analyzeType, contractType, xiangGangAllData);
      } else {
        getData(
          xiangGangData,
          analyzeType,
          contractType,
          xiangGangAllData,
          "香港"
        );
      }

      //澳门数据
      var aoMenAllData = [];

      var aoMenData = [];
      var aoMenTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("820000");
      });
      aoMenData = aoMenData.concat(aoMenTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(aoMenData, analyzeType, contractType, aoMenAllData);
      } else {
        getData(aoMenData, analyzeType, contractType, aoMenAllData, "澳门");
      }

      //辽宁数据
      var liaoNingAllData = [];

      var liaoNingData = [];
      var liaoNingTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("210000");
      });
      liaoNingData = liaoNingData.concat(liaoNingTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(liaoNingData, analyzeType, contractType, liaoNingAllData);
      } else {
        getData(
          liaoNingData,
          analyzeType,
          contractType,
          liaoNingAllData,
          "辽宁"
        );
      }

      //吉林数据
      var jiLinAllData = [];

      var jiLinData = [];
      var jiLinTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("220000");
      });
      jiLinData = jiLinData.concat(jiLinTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(jiLinData, analyzeType, contractType, jiLinAllData);
      } else {
        getData(jiLinData, analyzeType, contractType, jiLinAllData, "吉林");
      }

      //黑龙江数据
      var heiLongJiangAllData = [];

      var heiLongJiangData = [];
      var heiLongJiangTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("230000");
      });
      heiLongJiangData = heiLongJiangData.concat(heiLongJiangTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(
          heiLongJiangData,
          analyzeType,
          contractType,
          heiLongJiangAllData
        );
      } else {
        getData(
          heiLongJiangData,
          analyzeType,
          contractType,
          heiLongJiangAllData,
          "黑龙江"
        );
      }

      //上海数据
      var shangHaiAllData = [];

      var shangHaiData = [];
      var shangHaiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("310000");
      });
      shangHaiData = shangHaiData.concat(shangHaiTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(shangHaiData, analyzeType, contractType, shangHaiAllData);
      } else {
        getData(
          shangHaiData,
          analyzeType,
          contractType,
          shangHaiAllData,
          "上海"
        );
      }

      //安徽数据
      var anHuiAllData = [];

      var anHuiData = [];
      var anHuiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("340000");
      });
      anHuiData = anHuiData.concat(anHuiTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(anHuiData, analyzeType, contractType, anHuiAllData);
      } else {
        getData(anHuiData, analyzeType, contractType, anHuiAllData, "安徽");
      }

      //福建数据
      var fuJianAllData = [];

      var fuJianData = [];
      var fuJianTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("350000");
      });
      fuJianData = fuJianData.concat(fuJianTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(fuJianData, analyzeType, contractType, fuJianAllData);
      } else {
        getData(fuJianData, analyzeType, contractType, fuJianAllData, "福建");
      }

      //江西数据
      var jiangXiAllData = [];

      var jiangXiData = [];
      var jiangXiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("360000");
      });
      jiangXiData = jiangXiData.concat(jiangXiTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(jiangXiData, analyzeType, contractType, jiangXiAllData);
      } else {
        getData(jiangXiData, analyzeType, contractType, jiangXiAllData, "江西");
      }

      //广西数据
      var guangXiAllData = [];

      var guangXiData = [];
      var guangXiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("450000");
      });
      guangXiData = guangXiData.concat(guangXiTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(guangXiData, analyzeType, contractType, guangXiAllData);
      } else {
        getData(guangXiData, analyzeType, contractType, guangXiAllData, "广西");
      }

      //海南数据
      var haiNanAllData = [];

      var haiNanData = [];
      var haiNanTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("460000");
      });
      haiNanData = haiNanData.concat(haiNanTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(haiNanData, analyzeType, contractType, haiNanAllData);
      } else {
        getData(haiNanData, analyzeType, contractType, haiNanAllData, "海南");
      }

      //西藏数据
      var xiZangAllData = [];

      var xiZangData = [];
      var xiZangTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("540000");
      });
      xiZangData = xiZangData.concat(xiZangTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(xiZangData, analyzeType, contractType, xiZangAllData);
      } else {
        getData(xiZangData, analyzeType, contractType, xiZangAllData, "西藏");
      }

      //陕西数据
      var shanXIAllData = [];

      var shanXIData = [];
      var shanXITemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("610000");
      });
      shanXIData = shanXIData.concat(shanXITemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(shanXIData, analyzeType, contractType, shanXIAllData);
      } else {
        getData(shanXIData, analyzeType, contractType, shanXIAllData, "陕西");
      }

      //甘肃数据
      var ganSuAllData = [];

      var ganSuData = [];
      var ganSuTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("620000");
      });
      ganSuData = ganSuData.concat(ganSuTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(ganSuData, analyzeType, contractType, ganSuAllData);
      } else {
        getData(ganSuData, analyzeType, contractType, ganSuAllData, "甘肃");
      }

      //宁夏数据
      var ningXiaAllData = [];

      var ningXiaData = [];
      var ningXiaTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("640000");
      });
      ningXiaData = ningXiaData.concat(ningXiaTemp);

      if (sessionStorage.getItem("tractProvince")) {
        getCityData(ningXiaData, analyzeType, contractType, ningXiaAllData);
      } else {
        getData(ningXiaData, analyzeType, contractType, ningXiaAllData, "宁夏");
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
      if (sessionStorage.getItem("tractProvince")) {
        if (sessionStorage.getItem("tractProvince") == "150000") {
          mapName = "内蒙古";
        } else if (sessionStorage.getItem("tractProvince") == "120000") {
          mapName = "天津";
        } else if (sessionStorage.getItem("tractProvince") == "130000") {
          mapName = "河北";
        } else if (sessionStorage.getItem("tractProvince") == "140000") {
          mapName = "山西";
        } else if (sessionStorage.getItem("tractProvince") == "320000") {
          mapName = "江苏";
        } else if (sessionStorage.getItem("tractProvince") == "330000") {
          mapName = "浙江";
        } else if (sessionStorage.getItem("tractProvince") == "370000") {
          mapName = "山东";
        } else if (sessionStorage.getItem("tractProvince") == "410000") {
          mapName = "河南";
        } else if (sessionStorage.getItem("tractProvince") == "420000") {
          mapName = "湖北";
        } else if (sessionStorage.getItem("tractProvince") == "430000") {
          mapName = "湖南";
        } else if (sessionStorage.getItem("tractProvince") == "440000") {
          mapName = "广东";
        } else if (sessionStorage.getItem("tractProvince") == "500000") {
          mapName = "重庆";
        } else if (sessionStorage.getItem("tractProvince") == "510000") {
          mapName = "四川";
        } else if (sessionStorage.getItem("tractProvince") == "530000") {
          mapName = "云南";
        } else if (sessionStorage.getItem("tractProvince") == "630000") {
          mapName = "青海";
        } else if (sessionStorage.getItem("tractProvince") == "650000") {
          mapName = "新疆";
        } else if (sessionStorage.getItem("tractProvince") == "710000") {
          mapName = "台湾";
        } else if (sessionStorage.getItem("tractProvince") == "810000") {
          mapName = "香港";
        } else if (sessionStorage.getItem("tractProvince") == "820000") {
          mapName = "澳门";
        } else if (sessionStorage.getItem("tractProvince") == "110000") {
          mapName = "北京";
        } else if (sessionStorage.getItem("tractProvince") == "210000") {
          mapName = "辽宁";
        } else if (sessionStorage.getItem("tractProvince") == "220000") {
          mapName = "吉林";
        } else if (sessionStorage.getItem("tractProvince") == "230000") {
          mapName = "黑龙江";
        } else if (sessionStorage.getItem("tractProvince") == "310000") {
          mapName = "上海";
        } else if (sessionStorage.getItem("tractProvince") == "340000") {
          mapName = "安徽";
        } else if (sessionStorage.getItem("tractProvince") == "350000") {
          mapName = "福建";
        } else if (sessionStorage.getItem("tractProvince") == "450000") {
          mapName = "广西";
        } else if (sessionStorage.getItem("tractProvince") == "360000") {
          mapName = "江西";
        } else if (sessionStorage.getItem("tractProvince") == "460000") {
          mapName = "海南";
        } else if (sessionStorage.getItem("tractProvince") == "520000") {
          mapName = "贵州";
        } else if (sessionStorage.getItem("tractProvince") == "540000") {
          mapName = "西藏";
        } else if (sessionStorage.getItem("tractProvince") == "610000") {
          mapName = "陕西";
        } else if (sessionStorage.getItem("tractProvince") == "620000") {
          mapName = "甘肃";
        } else if (sessionStorage.getItem("tractProvince") == "640000") {
          mapName = "宁夏";
        }
      } else {
        mapName = "china";
      }

      const that = this;
      if(mapCode.indexOf('../') == -1){
        return
      }
      const data = await axios.get(mapCode);
      if (data) {
        this.chart = echarts.init(this.$refs.mapChart);
        echarts.registerMap(name, data);
        var option = {
          title: {
            text: "合同签订热度",
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
              let order, zrData, czData, dyData;
              if (params.data) {
                order = params.data.order;
                zrData = params.data.zrData;
                czData = params.data.czData;
                dyData = params.data.dyData;
              } else {
                // 为了防止没有定义数据的时候报错写的
                order = 0;
                zrData = 0;
                czData = 0;
                dyData = 0;
              }
              //       let htmlStr = `
              //   <div style='font-size:18px;'> ${params.name}</div>
              //   <p style='text-align:left;margin-top:10px;'>
              //     排名：${order}<br/>
              //     转让：${zrData}<br/>
              //     出租：${czData}<br/>
              //     抵押：${dyData}<br/>
              //   </p>
              // `;
              //       return htmlStr;
              if (params.data) {
                if (params.data.analyzeTypeName == "金额") {
                  if (params.data.analysisTypeName == "转让") {
                    let htmlStr = `
          <div style='font-size:18px;'> ${params.name}</div>
          <p style='text-align:left;margin-top:10px;'>
	          排名：${order}<br/>
	          转让金额：${zrData} 万元<br/>
          </p>
        `;
                    return htmlStr;
                  } else if (params.data.analysisTypeName == "出租") {
                    let htmlStr = `
          <div style='font-size:18px;'> ${params.name}</div>
          <p style='text-align:left;margin-top:10px;'>
	          排名：${order}<br/>
	          出租金额：${czData} 万元<br/>
          </p>
        `;
                    return htmlStr;
                  } else if (params.data.analysisTypeName == "抵押") {
                    let htmlStr = `
          <div style='font-size:18px;'> ${params.name}</div>
          <p style='text-align:left;margin-top:10px;'>
	          排名：${order}<br/>
	          抵押金额：${dyData} 万元<br/>
          </p>
        `;
                    return htmlStr;
                  } else if (params.data.analysisTypeName == "全部") {
                    let htmlStr = `
          <div style='font-size:18px;'> ${params.name}</div>
          <p style='text-align:left;margin-top:10px;'>
	          排名：${order}<br/>
	          转让金额：${zrData} 万元<br/>
	          出租金额：${czData} 万元<br/>
	          抵押金额：${dyData} 万元<br/>
          </p>
        `;
                    return htmlStr;
                  }
                } else if (params.data.analyzeTypeName == "面积") {
                  if (params.data.analysisTypeName == "转让") {
                    let htmlStr = `
          <div style='font-size:18px;'> ${params.name}</div>
          <p style='text-align:left;margin-top:10px;'>
	          排名：${order}<br/>
	          转让面积：${zrData} 万平方米<br/>
          </p>
        `;
                    return htmlStr;
                  } else if (params.data.analysisTypeName == "出租") {
                    let htmlStr = `
          <div style='font-size:18px;'> ${params.name}</div>
          <p style='text-align:left;margin-top:10px;'>
	          排名：${order}<br/>
	          出租面积：${czData} 万平方米<br/>
          </p>
        `;
                    return htmlStr;
                  } else if (params.data.analysisTypeName == "抵押") {
                    let htmlStr = `
          <div style='font-size:18px;'> ${params.name}</div>
          <p style='text-align:left;margin-top:10px;'>
	          排名：${order}<br/>
	          抵押面积：${dyData} 万平方米<br/>
          </p>
        `;
                    return htmlStr;
                  } else if (params.data.analysisTypeName == "全部") {
                    let htmlStr = `
          <div style='font-size:18px;'> ${params.name}</div>
          <p style='text-align:left;margin-top:10px;'>
	          排名：${order}<br/>
	          转让面积：${zrData} 万平方米<br/>
	          出租面积：${czData} 万平方米<br/>
	          抵押面积：${dyData} 万平方米<br/>
          </p>
        `;
                    return htmlStr;
                  }
                } else if (params.data.analyzeTypeName == "宗数") {
                  if (params.data.analysisTypeName == "转让") {
                    let htmlStr = `
          <div style='font-size:18px;'> ${params.name}</div>
          <p style='text-align:left;margin-top:10px;'>
	          排名：${order}<br/>
	          转让宗数：${zrData} 宗<br/>
          </p>
        `;
                    return htmlStr;
                  } else if (params.data.analysisTypeName == "出租") {
                    let htmlStr = `
          <div style='font-size:18px;'> ${params.name}</div>
          <p style='text-align:left;margin-top:10px;'>
	          排名：${order}<br/>
	          出租宗数：${czData} 宗<br/>
          </p>
        `;
                    return htmlStr;
                  } else if (params.data.analysisTypeName == "抵押") {
                    let htmlStr = `
          <div style='font-size:18px;'> ${params.name}</div>
          <p style='text-align:left;margin-top:10px;'>
	          排名：${order}<br/>
	          抵押宗数：${dyData} 宗<br/>
          </p>
        `;
                    return htmlStr;
                  } else if (params.data.analysisTypeName == "全部") {
                    let htmlStr = `
          <div style='font-size:18px;'> ${params.name}</div>
          <p style='text-align:left;margin-top:10px;'>
	          排名：${order}<br/>
	          转让宗数：${zrData} 宗<br/>
	          出租宗数：${czData} 宗<br/>
	          抵押宗数：${dyData} 宗<br/>
          </p>
        `;
                    return htmlStr;
                  }
                }
              }
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
        this.chart.setOption(option);
        this.chart.on("click", function(params) {
          if(sessionStorage.getItem("org_level") == 'org_level-001' && params.data){
            sessionStorage.setItem("tractProvince", params.data.cantonProvince);
            that.getCode(params.data.cantonProvince)
          }
          
          clearTimeout(this.timeFn);
          this.timeFn = setTimeout(function() {
            // const name = params.name;
            // const mapCode = that.pro[name];
            const name = params.name;
            const code = that.pro[name] ? '' : that.getAreaCode(name)
            const mapCode = that.pro[name] ? that.pro[name] : code
            console.log(mapCode, name);
            if (!mapCode) {
              return;
            }
            that.loadMap(mapCode, name);
            that.$refs.tractRankC.haveCity(code);
            that.$refs.tractTypeC.haveCity(code);
            that.$refs.tractUseC.haveCity(code);
            that.$refs.tractRateC.haveCity(code);
            // that.$refs.tractRankC.contractRankDrawLine();
            // that.$refs.tractTypeC.contractTypeDrawLine();
            // that.$refs.tractUseC.contractUseDrawLine();
            // that.$refs.tractRateC.contractRateDrawLine();
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
        sessionStorage.removeItem("tractProvince");
        clearTimeout(this.timeFn);
        that.loadMap("../../../../../../../static/map/json/china.json", "china");
        // that.$refs.tractRankC.contractRankDrawLine();
        // that.$refs.tractTypeC.contractTypeDrawLine();
        // that.$refs.tractUseC.contractUseDrawLine();
        // that.$refs.tractRateC.contractRateDrawLine();
        that.$refs.tractRankC.haveCity('');
        that.$refs.tractTypeC.haveCity('');
        that.$refs.tractUseC.haveCity('');
        that.$refs.tractRateC.haveCity('');
        that.isProvince = false;
        that.breadcrumbName = "";
      });
    },
    initEchart() {
      window.addEventListener("resize", () => {
        let chinaChart = echarts.init(document.getElementById("chinaChart"));
        document.getElementById("chinaChart").style.width = 100 + "%";
        chinaChart.resize();
      });
    },
    changeMap() {
      if (sessionStorage.getItem("pdProvince")) {
        if (sessionStorage.getItem("pdProvince") == "150000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/neimenggu.json",
            "内蒙古"
          );
        } else if (sessionStorage.getItem("pdProvince") == "120000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/tianjin.json",
            "天津"
          );
        } else if (sessionStorage.getItem("pdProvince") == "130000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/hebei.json",
            "河北"
          );
        } else if (sessionStorage.getItem("pdProvince") == "140000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/shanxi.json",
            "山西"
          );
        } else if (sessionStorage.getItem("pdProvince") == "320000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/jiangsu.json",
            "江苏"
          );
        } else if (sessionStorage.getItem("pdProvince") == "330000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/zhejiang.json",
            "浙江"
          );
        } else if (sessionStorage.getItem("pdProvince") == "370000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/shandong.json",
            "山东"
          );
        } else if (sessionStorage.getItem("pdProvince") == "410000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/henan.json",
            "河南"
          );
        } else if (sessionStorage.getItem("pdProvince") == "420000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/hubei.json",
            "湖北"
          );
        } else if (sessionStorage.getItem("pdProvince") == "430000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/hunan.json",
            "湖南"
          );
        } else if (sessionStorage.getItem("pdProvince") == "440000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/guangdong.json",
            "广东"
          );
        } else if (sessionStorage.getItem("pdProvince") == "500000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/chongqing.json",
            "重庆"
          );
        } else if (sessionStorage.getItem("pdProvince") == "510000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/sichuan.json",
            "四川"
          );
        } else if (sessionStorage.getItem("pdProvince") == "530000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/yunnan.json",
            "云南"
          );
        } else if (sessionStorage.getItem("pdProvince") == "630000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/qinghai.json",
            "青海"
          );
        } else if (sessionStorage.getItem("pdProvince") == "650000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/xinjiang.json",
            "新疆"
          );
        } else if (sessionStorage.getItem("pdProvince") == "710000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/taiwan.json",
            "台湾"
          );
        } else if (sessionStorage.getItem("pdProvince") == "810000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/xianggang.json",
            "香港"
          );
        } else if (sessionStorage.getItem("pdProvince") == "820000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/aomen.json",
            "澳门"
          );
        } else if (sessionStorage.getItem("pdProvince") == "110000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/beijing.json",
            "北京"
          );
        } else if (sessionStorage.getItem("pdProvince") == "210000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/liaoning.json",
            "辽宁"
          );
        } else if (sessionStorage.getItem("pdProvince") == "220000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/jilin.json",
            "吉林"
          );
        } else if (sessionStorage.getItem("pdProvince") == "230000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/heilongjiang.json",
            "黑龙江"
          );
        } else if (sessionStorage.getItem("pdProvince") == "310000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/shanghai.json",
            "上海"
          );
        } else if (sessionStorage.getItem("pdProvince") == "340000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/anhui.json",
            "安徽"
          );
        } else if (sessionStorage.getItem("pdProvince") == "350000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/fujian.json",
            "福建"
          );
        } else if (sessionStorage.getItem("pdProvince") == "450000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/guangxi.json",
            "广西"
          );
        } else if (sessionStorage.getItem("pdProvince") == "360000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/jiangxi.json",
            "江西"
          );
        } else if (sessionStorage.getItem("pdProvince") == "460000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/hainan.json",
            "海南"
          );
        } else if (sessionStorage.getItem("pdProvince") == "520000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/guizhou.json",
            "贵州"
          );
        } else if (sessionStorage.getItem("pdProvince") == "540000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/xizang.json",
            "西藏"
          );
        } else if (sessionStorage.getItem("pdProvince") == "610000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/shanxi.json",
            "陕西"
          );
        } else if (sessionStorage.getItem("pdProvince") == "620000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/gansu.json",
            "甘肃"
          );
        } else if (sessionStorage.getItem("pdProvince") == "640000") {
          this.loadMap(
            "../../../../../../../static/map/json/province/ningxia.json",
            "宁夏"
          );
        }
      } else {
        this.loadMap("../../../../../../../static/map/json/china.json", "china");
      }
    },
    toNationwide() {
      sessionStorage.removeItem("tractProvince");
      this.loadMap("../../../../../../../static/map/json/china.json", "china");
      // this.$refs.tractRankC.contractRankDrawLine();
      // this.$refs.tractTypeC.contractTypeDrawLine();
      // this.$refs.tractUseC.contractUseDrawLine();
      // this.$refs.tractRateC.contractRateDrawLine();
      this.$refs.tractRankC.haveCity('');
      this.$refs.tractTypeC.haveCity('');
      this.$refs.tractUseC.haveCity('');
      this.$refs.tractRateC.haveCity('');
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
        if(a[i].zhCn == name){
          this.code_city = a[i].dictKey
          return a[i].dictKey
        }
      }
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

    // sessionStorage.setItem("tractProvince", "140000");//一开始默认山西地图
  },
  watch: {
    contractType(val) {
      console.log(val);
      this.changeMap();
    },
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
        let chinaChart = echarts.init(document.getElementById("chinaChart"));
        document.getElementById("chinaChart").style.width = 100 + "%";
        chinaChart.resize();
      },
      20
    );

    if(sessionStorage.getItem("org_level") == 'org_level-001'){
      sessionStorage.removeItem("tractProvince");
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

      var totalArr = { dictKey: "", id: "", zhCn: "全部" };
      this.dictionary.flow_mode.unshift(totalArr);
      console.log(this.dictionary.flow_mode);
      this.dicFinsh = true;
      console.log("字典结果", this.dictionary);
    });

    if(sessionStorage.getItem('tractProvince')){
      this.getCode(sessionStorage.getItem('tractProvince'))
    }
    if(sessionStorage.getItem('jgCityCode')){
      this.code_city = sessionStorage.getItem('jgCityCode')
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
    .switchHeight_box_center {
        transition: 0.5s;
        background: #fff;
        width: 100%;
        height: 350px;
        margin-bottom: 25px;
        padding: 25px 22px 0;
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
        height: 280px;
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
    .chart_tab_content .cur {
        width: 100%;
    }
    .sum_box_big {
        display: flex;
        width: 100%;
        justify-content: space-between;
        position: relative;
        bottom: 14px;
        }
    .sum_box {
        padding: 8px;
        width: 30%;
        height: 60px;
        box-sizing: border-box;
        border: 1px solid #f6f6f5;
        background-color: #fff;
    }
    .sum_box span {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f6f6f5;
        font-size: 14px;
    }
</style>
<style>
    .el-input--small .el-input__inner {
        height: 40px;
    }
</style>