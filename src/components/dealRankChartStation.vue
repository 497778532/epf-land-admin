<template>
  <div id="dealRank">
    <!-- <div id="rankChart" style="width:100%;height:260px;" ref="dealChart"></div> -->
    <barChart ref="dealChart" height="260px" width="90%" 
    :barChartData="barChartData"
    :rankProvinceDataName="provinceDataName"
    :rankProvinceData="provinceData"
    :rankUnitName="unitName"
    id="rankChart"/> 
  </div>
</template>

<script>
import axios from "axios";
import echarts from "echarts";
import barChart from '@/components/charts/bar'
export default {
  components:{ barChart },
  props: [
    "dealMessage",
    "analyzeMessage",
    "timeStartMessage",
    "timeEndMessage"
  ],
  data() {
    return {
      cityCode: "",
      typeData: "transfer",
      analyzeData: "JE",
      timeStartData: "",
      timeEndData: "",

      // isHave: false,
      isHave: true,

      params: {
        cantonProvince: "",
        startDate: "",
        endDate: "",
        analysisType: "" //交易类型
      },
      provinceData:["北京","上海","天津","重庆","辽宁"],
      provinceDataName:"省份",
      unitName:"单位：万元",
      barChartData:[
        {
          maxData:"",
          transferName:"转让",
          transferData:[67876,673467,67456,674577,67657],
          rentName:"出租",
          rentData:[453454,56765,6578657,764589,34533],
          mortgageName:"抵押",
          mortgageData:[765677,56455,76745,76845,34352]
        }
      ]
    };
  },
  methods: {
    haveCity(code){
      this.cityCode = code;
      this.rankDrawLine();
    },
    rankDrawLine() {
      // this.$nextTick(() => {
        // document.getElementById("rankChart").style.width = 100 + "%";
        // let rankChart = echarts.init(document.getElementById("rankChart"));
        // rankChart.resize(); //直接加这句即可

        //请求数据
        let params = this.params;
        params["analysisType"] = this.typeData;
        params["startDate"] = this.timeStartData;
        params["endDate"] = this.timeEndData;
        params["cantonProvince"] = sessionStorage.getItem("dealProvince");
        params["cantonCity"] = this.cityCode;

        this.$get(
          `/epf-monitor/monitor/trans/queryMapDistribution`,
          params
        ).then(res => {
          console.log(res);
          let chartData = res.result;

          for (var key in chartData) {
            this.isHave = chartData[key].hasOwnProperty("cantonCity");
          }
          console.log(this.isHave);

          var transferAmountSeriesData = []; //转让金额图表数据
          var transferAreaSeriesData = []; //转让面积图表数据
          var transferNumberSeriesData = []; //转让宗数图表数据

          var rentAmountSeriesData = []; //出租金额图表数据
          var rentAreaSeriesData = []; //出租面积图表数据
          var rentNumberSeriesData = []; //出租宗数图表数据

          var mortgageAmountSeriesData = []; //抵押金额图表数据
          var mortgageAreaSeriesData = []; //抵押面积图表数据
          var mortgageNumberSeriesData = []; //抵押宗数图表数据

          var amountData = []; //总金额
          var sumAreaData = []; //总面积
          var sumNumberData = []; //总宗数

          var cantonProvinceData = []; //地域--省份数据
          var cantonCityData = []; //地域--城市数据

          for (var key in chartData) {
            transferAmountSeriesData.push(chartData[key].transferAmount); //转让金额
            transferAreaSeriesData.push(chartData[key].transferArea); //转让面积
            transferNumberSeriesData.push(chartData[key].transferNumber); //转让宗数

            rentAmountSeriesData.push(chartData[key].rentAmount); //出租金额
            rentAreaSeriesData.push(chartData[key].rentArea); //出租面积
            rentNumberSeriesData.push(chartData[key].rentNumber); //出租宗数

            mortgageAmountSeriesData.push(chartData[key].mortgageAmount); //抵押金额
            mortgageAreaSeriesData.push(chartData[key].mortgageArea); //抵押面积
            mortgageNumberSeriesData.push(chartData[key].mortgageNumber); //抵押宗数

            amountData.push(chartData[key].amount); //总金额
            sumAreaData.push(chartData[key].sumArea); //总面积
            sumNumberData.push(chartData[key].sumNumber); //总宗数

            cantonProvinceData.push(chartData[key].cantonProvinceName); //地域--省份数据
            cantonCityData.push(chartData[key].cantonCityName); //地域--省份数据
          }

          console.log(transferAmountSeriesData);
          console.log(transferAreaSeriesData);
          console.log(transferNumberSeriesData);
          console.log(11111111111111111111111111111111111111);
          console.log(rentAmountSeriesData);
          console.log(rentAreaSeriesData);
          console.log(rentNumberSeriesData);
          console.log(11111111111111111111111111111111111111);
          console.log(mortgageAmountSeriesData);
          console.log(mortgageAreaSeriesData);
          console.log(mortgageNumberSeriesData);
          console.log(11111111111111111111111111111111111111);
          console.log(amountData);
          console.log(sumAreaData);
          console.log(sumNumberData);
          console.log(11111111111111111111111111111111111111);

          //总数据排序(从大到小)
          //总金额
          var allAmountRankData = chartData.sort(function(x, y) {
            return x["rank"] > y["rank"] ? 1 : -1;
          }); //升序排序
          console.log(allAmountRankData);

          var transferAmountRankSeriesData = []; //转让金额图表数据
          var rentAmountRankSeriesData = []; //出租金额图表数据
          var mortgageAmountRankSeriesData = []; //抵押金额图表数据
          var amountRankData = []; //总金额
          var cantonProvinceAmountRankData = []; //地域--省份数据
          var cantonCityAmountRankData = []; //地域--城市数据

          for (var key in allAmountRankData) {
            transferAmountRankSeriesData.push(
              allAmountRankData[key].transferAmount
            ); //转让金额
            rentAmountRankSeriesData.push(allAmountRankData[key].rentAmount); //出租金额
            mortgageAmountRankSeriesData.push(
              allAmountRankData[key].mortgageAmount
            ); //抵押金额
            amountRankData.push(allAmountRankData[key].amount); //总金额
            cantonProvinceAmountRankData.push(
              allAmountRankData[key].cantonProvinceName
            ); //地域--省份数据
            cantonCityAmountRankData.push(
              allAmountRankData[key].cantonCityName
            ); //地域--城市数据
           
          }

          console.log(transferAmountRankSeriesData);
          console.log(rentAmountRankSeriesData);
          console.log(mortgageAmountRankSeriesData);
          console.log(amountRankData);
          console.log(cantonProvinceAmountRankData);
          console.log(cantonCityAmountRankData);

          //总面积
          var allAreaRankData = chartData.sort(function(x, y) {
            return x["rankArea"] > y["rankArea"] ? 1 : -1;
          }); //升序排序
          console.log(allAreaRankData);

          var transferAreaRankSeriesData = []; //转让金额图表数据
          var rentAreaRankSeriesData = []; //出租金额图表数据
          var mortgageAreaRankSeriesData = []; //抵押金额图表数据
          var areaRankData = []; //总金额
          var cantonProvinceAreaRankData = []; //地域--省份数据
          var cantonCityAreaRankData = []; //地域--城市数据

          for (var key in allAreaRankData) {
            transferAreaRankSeriesData.push(allAreaRankData[key].transferArea); //转让金额
            rentAreaRankSeriesData.push(allAreaRankData[key].rentArea); //出租金额
            mortgageAreaRankSeriesData.push(allAreaRankData[key].mortgageArea); //抵押金额
            areaRankData.push(allAreaRankData[key].sumArea); //总金额
            cantonProvinceAreaRankData.push(
              allAreaRankData[key].cantonProvinceName
            ); //地域--省份数据
            cantonCityAreaRankData.push(allAreaRankData[key].cantonCityName); //地域--城市数据
          }

          console.log(transferAreaRankSeriesData);
          console.log(rentAreaRankSeriesData);
          console.log(mortgageAreaRankSeriesData);
          console.log(areaRankData);
          console.log(cantonProvinceAreaRankData);
          console.log(cantonCityAreaRankData);

          //总宗数
          var allNumberRankData = chartData.sort(function(x, y) {
            return x["rankNumber"] > y["rankNumber"] ? 1 : -1;
          }); //升序排序
          console.log(allNumberRankData);

          var transferNumberRankSeriesData = []; //转让金额图表数据
          var rentNumberRankSeriesData = []; //出租金额图表数据
          var mortgageNumberRankSeriesData = []; //抵押金额图表数据
          var numberRankData = []; //总金额
          var cantonProvinceNumberRankData = []; //地域--省份数据
          var cantonCityNumberRankData = []; //地域--城市数据

          for (var key in allNumberRankData) {
            transferNumberRankSeriesData.push(
              allNumberRankData[key].transferNumber
            ); //转让金额
            rentNumberRankSeriesData.push(allNumberRankData[key].rentNumber); //出租金额
            mortgageNumberRankSeriesData.push(
              allNumberRankData[key].mortgageNumber
            ); //抵押金额
            numberRankData.push(allNumberRankData[key].sumNumber); //总金额
            cantonProvinceNumberRankData.push(
              allNumberRankData[key].cantonProvinceName
            ); //地域--省份数据
            cantonCityNumberRankData.push(
              allNumberRankData[key].cantonCityName
            ); //地域--城市数据
          }

          console.log(transferNumberRankSeriesData);
          console.log(rentNumberRankSeriesData);
          console.log(mortgageNumberRankSeriesData);
          console.log(numberRankData);
          console.log(cantonProvinceNumberRankData);
          console.log(cantonCityNumberRankData);

          //取数组最大值
          var maxTransferAmountData = Math.max.apply(
            Math,
            transferAmountSeriesData
          ); //转让金额数据最大值
          var maxTransferAreaData = Math.max.apply(
            Math,
            transferAreaSeriesData
          ); //转让面积数据最大值
          var maxTransferNumberData = Math.max.apply(
            Math,
            transferNumberSeriesData
          ); //转让宗数数据最大值

          var maxRentAmountData = Math.max.apply(Math, rentAmountSeriesData); //出租金额数据最大值
          var maxRentAreaData = Math.max.apply(Math, rentAreaSeriesData); //出租面积数据最大值
          var maxRentNumberData = Math.max.apply(Math, rentNumberSeriesData); //出租宗数数据最大值

          var maxMortgageAmountData = Math.max.apply(
            Math,
            mortgageAmountSeriesData
          ); //抵押金额数据最大值
          var maxMortgageAreaData = Math.max.apply(
            Math,
            mortgageAreaSeriesData
          ); //抵押面积数据最大值
          var maxMortgageNumberData = Math.max.apply(
            Math,
            mortgageNumberSeriesData
          ); //抵押宗数数据最大值

          var maxAmountData = Math.max.apply(Math, amountData); //总金额数据最大值
          var maxAreaData = Math.max.apply(Math, sumAreaData); //总面积数据最大值
          var maxNumberData = Math.max.apply(Math, sumNumberData); //总宗数数据最大值

          // var unitName = "";
          if (this.analyzeData == "JE") {
            this.unitName = "单位：万元";
          } else if (this.analyzeData == "MJ") {
            this.unitName = "单位：万平方米";
          } else if (this.analyzeData == "ZS") {
            this.unitName = "单位：宗";
          }

          // var provinceData = "";
          // var provinceDataName = [];
          if (this.isHave == true) {
            this.provinceDataName = "城市";
            if (this.analyzeData == "JE") {
              if (
                this.typeData == "transfer" ||
                this.typeData == "rent" ||
                this.typeData == "mortgage"
              ) {
                this.provinceData = cantonCityData;
              } else {
                this.provinceData = cantonCityAmountRankData;
              }
            } else if (this.analyzeData == "MJ") {
              if (
                this.typeData == "transfer" ||
                this.typeData == "rent" ||
                this.typeData == "mortgage"
              ) {
                this.provinceData = cantonCityData;
              } else {
                this.provinceData = cantonCityAreaRankData;
              }
            } else if (this.analyzeData == "ZS") {
              if (
                this.typeData == "transfer" ||
                this.typeData == "rent" ||
                this.typeData == "mortgage"
              ) {
                this.provinceData = cantonCityData;
              } else {
                this.provinceData = cantonCityNumberRankData;
              }
            }
          } else {
            this.provinceDataName = "省份";
            if (this.analyzeData == "JE") {
              if (
                this.typeData == "transfer" ||
                this.typeData == "rent" ||
                this.typeData == "mortgage"
              ) {
                this.provinceData = cantonProvinceData;
              } else {
                this.provinceData = cantonProvinceAmountRankData;
              }
            } else if (this.analyzeData == "MJ") {
              if (
                this.typeData == "transfer" ||
                this.typeData == "rent" ||
                this.typeData == "mortgage"
              ) {
                this.provinceData = cantonProvinceData;
              } else {
                this.provinceData = cantonProvinceAreaRankData;
              }
            } else if (this.analyzeData == "ZS") {
              if (
                this.typeData == "transfer" ||
                this.typeData == "rent" ||
                this.typeData == "mortgage"
              ) {
                this.provinceData = cantonProvinceData;
              } else {
                this.provinceData = cantonProvinceNumberRankData;
              }
            }
          }

          // 绘制图表
          // function lookRankData(
          //   maxData,
          //   transferName,
          //   transferData,
          //   rentName,
          //   rentData,
          //   mortgageName,
          //   mortgageData
          // ) {
          //   rankChart.setOption({
          //     color: ["#3398DB"],
          //     tooltip: {
          //       trigger: "axis",
          //       axisPointer: {
          //         // 坐标轴指示器，坐标轴触发有效
          //         type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          //       }
          //     },
          //     legend: {
          //       right: "8%",
          //       data: ["转让", "出租", "抵押"],
          //       itemWidth: 14,
          //       itemHeight: 14
          //     },
          //     grid: {
          //       left: "4%",
          //       right: "8%",
          //       bottom: "5%",
          //       top: "20%",
          //       containLabel: true
          //     },
          //     xAxis: [
          //       {
          //         name: this.provinceDataName,
          //         type: "category",
          //         data: this.provinceData,
          //         axisTick: {
          //           alignWithLabel: true,
          //           show: false //不要刻度
          //         },
          //         axisLine: {
          //           show: false //不要x轴
          //         }
          //       }
          //     ],
          //     dataZoom: [
          //       {
          //         type: "inside",
          //         show: true,
          //         xAxisIndex: [0],
          //         start: 0, //默认为1
          //         end: 100
          //       }
          //     ],
          //     yAxis: [
          //       {
          //         name: this.unitName,
          //         type: "value",
          //         interval: Math.ceil(maxData / 6),
          //         max: Math.ceil(maxData),
          //         splitLine: {
          //           //网格线
          //           lineStyle: {
          //             type: "dashed" //设置网格线类型 dotted：虚线   solid:实线
          //           },
          //           show: true //隐藏或显示
          //         },
          //         axisTick: {
          //           alignWithLabel: true,
          //           show: false //不要刻度
          //         },
          //         axisLine: {
          //           show: false //不要x轴
          //         }
          //       }
          //     ],
          //     series: [
          //       {
          //         name: transferName,
          //         type: "bar",
          //         barWidth: "8px",
          //         data: transferData,
          //         itemStyle: {
          //           normal: {
          //             color: new echarts.graphic.LinearGradient(
          //               0,
          //               0,
          //               0,
          //               1,
          //               [
          //                 {
          //                   offset: 0,
          //                   color: "#78b4f6" // 高处的颜色
          //                 },
          //                 {
          //                   offset: 1,
          //                   color: "#5781e5" // 低处的颜色
          //                 }
          //               ],
          //               false
          //             ),
          //             barBorderRadius: [30, 30, 0, 0]
          //           }
          //         }
          //       },
          //       {
          //         name: rentName,
          //         type: "bar",
          //         barWidth: "8px",
          //         data: rentData,
          //         itemStyle: {
          //           normal: {
          //             color: new echarts.graphic.LinearGradient(
          //               0,
          //               0,
          //               0,
          //               1,
          //               [
          //                 {
          //                   offset: 0,
          //                   color: "#1ac6b7" // 高处的颜色
          //                 },
          //                 {
          //                   offset: 1,
          //                   color: "#01e8d4" // 低处的颜色
          //                 }
          //               ],
          //               false
          //             ),
          //             barBorderRadius: [30, 30, 0, 0]
          //           }
          //         }
          //       },
          //       {
          //         name: mortgageName,
          //         type: "bar",
          //         barWidth: "8px",
          //         data: mortgageData,
          //         itemStyle: {
          //           normal: {
          //             color: new echarts.graphic.LinearGradient(
          //               0,
          //               0,
          //               0,
          //               1,
          //               [
          //                 {
          //                   offset: 0,
          //                   color: "#ffbd6f" // 高处的颜色
          //                 },
          //                 {
          //                   offset: 1,
          //                   color: "#ff9f60" // 低处的颜色
          //                 }
          //               ],
          //               false
          //             ),
          //             barBorderRadius: [30, 30, 0, 0]
          //           }
          //         }
          //       }
          //     ]
          //   });
          // }
          if (this.analyzeData == "JE") {
            if (this.typeData == "transfer") {
              this.barChartData = [{maxData:maxTransferAmountData, transferName:"转让",transferData:transferAmountSeriesData, rentName:"",rentData:"",mortgageName:"",mortgageData:""}]
              // lookRankData(
              //   maxTransferAmountData,
              //   "转让",
              //   transferAmountSeriesData,
              //   "",
              //   "",
              //   "",
              //   ""
              // );
            } else if (this.typeData == "rent") {
              this.barChartData = [ {maxData:maxTransferAmountData, transferName:"",transferData:"",rentName:"出租", rentData:rentAmountSeriesData,mortgageName:"",mortgageData:""}]
              // lookRankData(
              //   maxRentAmountData,
              //   "",
              //   "",
              //   "出租",
              //   rentAmountSeriesData,
              //   "",
              //   ""
              // );
            } else if (this.typeData == "mortgage") {
              this.barChartData = [ {maxData:maxMortgageAmountData,transferName:"",transferData:"",rentName:"",rentData:"",mortgageName:"抵押",mortgageData:mortgageAmountSeriesData}]
              // lookRankData(
              //   maxMortgageAmountData,
              //   "",
              //   "",
              //   "",
              //   "",
              //   "抵押",
              //   mortgageAmountSeriesData
              // );
            } else {
               this.barChartData = [ {maxData:maxAmountData,transferName:"转让",transferData:transferAmountRankSeriesData,rentName:"出租",rentData:rentAmountRankSeriesData,mortgageName:"抵押",mortgageData:mortgageAmountRankSeriesData}]
              // lookRankData(
              //   maxAmountData,
              //   "转让",
              //   transferAmountRankSeriesData,
              //   "出租",
              //   rentAmountRankSeriesData,
              //   "抵押",
              //   mortgageAmountRankSeriesData
              // );
            }
          } else if (this.analyzeData == "MJ") {
            if (this.typeData == "transfer") {
               this.barChartData = [ {maxData:maxTransferAreaData,transferName:"转让",transferData:transferAreaSeriesData,rentName:"",rentData:"",mortgageName:"",mortgageData:""}]
              // lookRankData(
              //   maxTransferAreaData,
              //   "转让",
              //   transferAreaSeriesData,
              //   "",
              //   "",
              //   "",
              //   ""
              // );
            } else if (this.typeData == "rent") {
              this.barChartData = [ {maxData:maxRentAreaData,transferName:"",transferData:"",rentName:"出租",rentData:rentAreaSeriesData,mortgageName:"",mortgageData:""}]
              // lookRankData(
              //   maxRentAreaData,
              //   "",
              //   "",
              //   "出租",
              //   rentAreaSeriesData,
              //   "",
              //   ""
              // );
            } else if (this.typeData == "mortgage") {
              this.barChartData = [ {maxData:maxMortgageAreaData,transferName:"",transferData:"",rentName:"",rentData:"",mortgageName:"抵押",mortgageData:mortgageAreaSeriesData}]
              // lookRankData(
              //   maxMortgageAreaData,
              //   "",
              //   "",
              //   "",
              //   "",
              //   "抵押",
              //   mortgageAreaSeriesData
              // );
            } else {
              this.barChartData = [ {maxData:maxAreaData,transferName:"转让",transferData:transferAreaRankSeriesData,rentName:"出租",rentData:rentAreaRankSeriesData,mortgageName:"抵押",mortgageData:mortgageAreaRankSeriesData}]
              // lookRankData(
              //   maxAreaData,
              //   "转让",
              //   transferAreaRankSeriesData,
              //   "出租",
              //   rentAreaRankSeriesData,
              //   "抵押",
              //   mortgageAreaRankSeriesData
              // );
            }
          } else {
            if (this.typeData == "transfer") {
              this.barChartData = [ {maxData:maxTransferNumberData,transferName:"转让",transferData:transferNumberSeriesData,rentName:"",rentData:"",mortgageName:"",mortgageData:""}]
              // lookRankData(
              //   maxTransferNumberData,
              //   "转让",
              //   transferNumberSeriesData,
              //   "",
              //   "",
              //   "",
              //   ""
              // );
            } else if (this.typeData == "rent") {
              this.barChartData = [ {maxData:maxRentNumberData,transferName:"",transferData:"",rentName:"出租",rentData:rentNumberSeriesData,mortgageName:"",mortgageData:""}]
              // lookRankData(
              //   maxRentNumberData,
              //   "",
              //   "",
              //   "出租",
              //   rentNumberSeriesData,
              //   "",
              //   ""
              // );
            } else if (this.typeData == "mortgage") {
              this.barChartData = [ { maxData:maxMortgageNumberData,transferName:"",transferData:"",rentName:"",rentData:"",mortgageName:"抵押",mortgageData:mortgageNumberSeriesData}]
              // lookRankData(
              //   maxMortgageNumberData,
              //   "",
              //   "",
              //   "",
              //   "",
              //   "抵押",
              //   mortgageNumberSeriesData
              // );
            } else {
              this.barChartData = [ {maxData:maxNumberData,transferName:"转让",transferData:transferNumberRankSeriesData,rentName:"出租",rentData:rentNumberRankSeriesData,mortgageName:"抵押",mortgageData:mortgageNumberRankSeriesData}]
              // lookRankData(
              //   maxNumberData,
              //   "转让",
              //   transferNumberRankSeriesData,
              //   "出租",
              //   rentNumberRankSeriesData,
              //   "抵押",
              //   mortgageNumberRankSeriesData
              // );
            }
          }
        });
      // });
    },
    // initEchart() {
    //   window.addEventListener("resize", () => {
    //     let rankChart = echarts.init(document.getElementById("rankChart"));
    //     document.getElementById("rankChart").style.width = 100 + "%";
    //     rankChart.resize();
    //   });
    // }
  },
  // mounted() {
  //   setTimeout(() => {
  //     this.rankDrawLine();
  //   }, 1000);
  //   this.initEchart();
  // },
  // destroyed() {
  //   window.removeEventListener(
  //     "resize",
  //     () => {
  //       let rankChart = echarts.init(document.getElementById("rankChart"));
  //       document.getElementById("rankChart").style.width = 100 + "%";
  //       rankChart.resize();
  //     },
  //     20
  //   );
  // },
  created() {
    this.typeData = this.dealMessage;
    this.analyzeData = this.analyzeMessage;
    this.timeStartData = this.timeStartMessage;
    this.timeEndData = this.timeEndMessage;
    console.log(this.typeData);
    //console.log(this.analyzeData);
    console.log(this.timeStartData);
    console.log(this.timeEndData);
  },
  watch: {
    dealMessage(val) {
      this.typeData = val;
      console.log(this.typeData);
      this.rankDrawLine();
    },
    analyzeMessage(val) {
      this.analyzeData = val;
      //console.log(this.analyzeData);
      this.rankDrawLine();
    },
    timeStartMessage(val) {
      this.timeStartData = val;
      console.log(this.timeStartData);
      this.rankDrawLine();
    },
    timeEndMessage(val) {
      this.timeEndData = val;
      console.log(this.timeEndData);
      this.rankDrawLine();
    },
    isHave(val) {
      this.rankDrawLine();
    }
  }
};
</script>

<style>
</style>
