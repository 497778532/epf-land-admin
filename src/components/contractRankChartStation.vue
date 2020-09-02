<template>
  <div id="contractRank">
    <!-- <div id="collectChart" style="width:100%;height:260px;" ref="contractChart"></div> -->
    <barChart ref="contractChart" height="260px" width="88%" 
    :barChartData="barChartData"
    :contractCantonName="cantonName"
    :contractCantonData="cantonData"
    :contractUnitName="unitName"
    id="collectChart"/> 
  </div>
</template>

<script>
import axios from "axios";
import echarts from "echarts";
import barChart from '@/components/charts/bar'
export default {
  components:{ barChart },
  props: [
    "contractMessage",
    "analyzeMessage",
    "timeStartMessage",
    "timeEndMessage"
  ],
  data() {
    return {
      cityCode: "",
      typeData: "",
      analyzeData: "",
      timeStartData: "",
      timeEndData: "",

      params: {
        cantonProvince: "",
        explanType: "",
        startDate: "",
        endDate: "",
        flowType: ""
      },
       barChartData:[
        {
          maxData:"",
          transferName:"转让",
          transferData:[],
          rentName:"出租",
          rentData:[],
          mortgageName:"抵押",
          mortgageData:[]
        }
      ],
      cantonName:"省份",
      cantonData:[],
      unitName:"单位：万元",
    };
  },
  methods: {
    haveCity(code){
      this.cityCode = code;
      this.contractRankDrawLine();
    },
    contractRankDrawLine() {
      this.$nextTick(() => {
        document.getElementById("collectChart").style.width = 100 + "%";
        let collectChart = echarts.init(
          document.getElementById("collectChart")
        );
        collectChart.resize(); //直接加这句即可

        //请求数据
        let params = this.params;
        params["flowType"] = this.typeData;
        params["explanType"] = this.analyzeData;
        params["startDate"] = this.timeStartData;
        params["endDate"] = this.timeEndData;
        params["cantonProvince"] = sessionStorage.getItem("tractProvince");
        params["cantonCity"] = this.cityCode;

        this.$get(
          `/epf-monitor/monitor/contact/contactBarhotMap`,
          params
        ).then(res => {
          console.log(res);
          let chartData = res.result;
          console.log(chartData);

          var zrSeriesData = []; //转让图表数据
          var czSeriesData = []; //出租图表数据
          var dySeriesData = []; //抵押图表数据
          var cantonProvinceNameData = []; //x轴省份名称图表数据
          var cantonCityNameData = []; //x轴城市名称图表数据
          var allData = []; //总数据
          for (var key in chartData) {
            zrSeriesData.push(chartData[key].zrData); //转让数据
            czSeriesData.push(chartData[key].czData); //出租数据
            dySeriesData.push(chartData[key].dyData); //抵押数据
            cantonProvinceNameData.push(chartData[key].cantonProvinceName); //x轴省份名称
            cantonCityNameData.push(chartData[key].cantonCityName); //x轴城市名称
            allData.push(
              chartData[key].zrData,
              chartData[key].czData,
              chartData[key].dyData
            ); //总数据
          }

          var maxZrSeriesData = Math.max.apply(Math, zrSeriesData); //转让数据最大值
          var maxCzSeriesData = Math.max.apply(Math, czSeriesData); //出租数据最大值
          var maxDySeriesData = Math.max.apply(Math, dySeriesData); //抵押数据最大值
          var maxAllData = Math.max.apply(Math, allData); //总数据最大值

          // var unitName = "";
          if (this.analyzeData == "JE") {
            this.unitName = "单位：万元";
          } else if (this.analyzeData == "MJ") {
            this.unitName = "单位：万平方米";
          } else if (this.analyzeData == "ZS") {
            this.unitName = "单位：宗";
          }

          // var cantonName = "";
          // var cantonData = [];
          if (sessionStorage.getItem("tractProvince")) {
            this.cantonName = "城市";
            this.cantonData = cantonCityNameData;
          } else {
            this.cantonName = "省份";
            this.cantonData = cantonProvinceNameData;
          }

          // 绘制图表
          function lookContractRank(
            maxData,
            transferName,
            transferData,
            rentName,
            rentData,
            mortgageName,
            mortgageData
          ) {
            collectChart.setOption({
              color: ["#3398DB"],
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  // 坐标轴指示器，坐标轴触发有效
                  type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              legend: {
                right: "8%",
                data: ["转让", "出租", "抵押"],
                itemWidth: 14,
                itemHeight: 14
              },
              grid: {
                left: "3%",
                right: "7%",
                bottom: "5%",
                top: "20%",
                containLabel: true
              },
              xAxis: [
                {
                  name: cantonName,
                  type: "category",
                  data: cantonData,
                  axisTick: {
                    alignWithLabel: true,
                    show: false //不要刻度
                  },
                  axisLine: {
                    show: false //不要x轴
                  }
                }
              ],
              dataZoom: [
                {
                  type: "inside",
                  show: true,
                  xAxisIndex: [0],
                  start: 0, //默认为1
                  end: 100
                }
              ],
              yAxis: [
                {
                  name: unitName,
                  type: "value",
                  interval: Math.ceil(maxData / 5),
                  max: Math.ceil(maxData),
                  splitLine: {
                    //网格线
                    lineStyle: {
                      type: "dashed" //设置网格线类型 dotted：虚线   solid:实线
                    },
                    show: true //隐藏或显示
                  },
                  axisTick: {
                    alignWithLabel: true,
                    show: false //不要刻度
                  },
                  axisLine: {
                    show: false //不要x轴
                  }
                }
              ],
              series: [
                {
                  name: transferName,
                  type: "bar",
                  barWidth: "8px",
                  data: transferData,
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: "#78b4f6" // 高处的颜色
                          },
                          {
                            offset: 1,
                            color: "#5781e5" // 低处的颜色
                          }
                        ],
                        false
                      ),
                      barBorderRadius: [30, 30, 0, 0]
                    }
                  }
                },
                {
                  name: rentName,
                  type: "bar",
                  barWidth: "8px",
                  data: rentData,
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: "#1ac6b7" // 高处的颜色
                          },
                          {
                            offset: 1,
                            color: "#01e8d4" // 低处的颜色
                          }
                        ],
                        false
                      ),
                      barBorderRadius: [30, 30, 0, 0]
                    }
                  }
                },
                {
                  name: mortgageName,
                  type: "bar",
                  barWidth: "8px",
                  data: mortgageData,
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: "#ffbd6f" // 高处的颜色
                          },
                          {
                            offset: 1,
                            color: "#ff9f60" // 低处的颜色
                          }
                        ],
                        false
                      ),
                      barBorderRadius: [30, 30, 0, 0]
                    }
                  }
                }
              ]
            });
          }

          if (this.typeData == "transfer") {
            this.barChartData = [{maxData:maxZrSeriesData,transferName:"转让",transferData:zrSeriesData,rentName:"",rentData:"",mortgageName:"",mortgageData:""}]
            // lookContractRank(
            //   maxZrSeriesData,
            //   "转让",
            //   zrSeriesData,
            //   "",
            //   "",
            //   "",
            //   ""
            // );
          } else if (this.typeData == "rent") {
            this.barChartData = [{maxData:maxCzSeriesData,transferName:"",transferData:"",rentName:"出租",rentData:czSeriesData,mortgageName:"",mortgageData:""}]
            // lookContractRank(
            //   maxCzSeriesData,
            //   "",
            //   "",
            //   "出租",
            //   czSeriesData,
            //   "",
            //   ""
            // );
          } else if (this.typeData == "mortgage") {
            this.barChartData = [{maxData:maxDySeriesData,transferName:"",transferData:"",rentName:"",rentData:"",mortgageName:"抵押",mortgageData:"dySeriesData"}]
            // lookContractRank(
            //   maxDySeriesData,
            //   "",
            //   "",
            //   "",
            //   "",
            //   "抵押",
            //   dySeriesData
            // );
          } else {
            this.barChartData = [{maxData:maxAllData,transferName:"转让",transferData:zrSeriesData,rentName:"出租",rentData:czSeriesData,mortgageName:"抵押",mortgageData:dySeriesData}]
            // lookContractRank(
            //   maxAllData,
            //   "转让",
            //   zrSeriesData,
            //   "出租",
            //   czSeriesData,
            //   "抵押",
            //   dySeriesData
            // );
          }
        });
      });
    },
    initEchart() {
      window.addEventListener("resize", () => {
        let collectChart = echarts.init(
          document.getElementById("collectChart")
        );
        document.getElementById("collectChart").style.width = 100 + "%";
        collectChart.resize();
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.contractRankDrawLine();
    }, 1000);
    this.initEchart();
  },
  destroyed() {
    window.removeEventListener(
      "resize",
      () => {
        let collectChart = echarts.init(
          document.getElementById("collectChart")
        );
        document.getElementById("collectChart").style.width = 100 + "%";
        collectChart.resize();
      },
      20
    );
  },
  created() {
    this.typeData = this.contractMessage;
    this.analyzeData = this.analyzeMessage;
    this.timeStartData = this.timeStartMessage;
    this.timeEndData = this.timeEndMessage;
    console.log(this.typeData);
    //console.log(this.analyzeData);
    console.log(this.timeStartData);
    console.log(this.timeEndData);
  },
  watch: {
    contractMessage(val) {
      this.typeData = val;
      console.log(this.typeData);
      this.contractRankDrawLine();
    },
    analyzeMessage(val) {
      this.analyzeData = val;
      //console.log(this.analyzeData);
      if (this.analyzeData == "JE") {
        this.cur3 = 0;
      } else if (this.analyzeData == "MJ") {
        this.cur3 = 1;
      } else if (this.analyzeData == "ZS") {
        this.cur3 = 2;
      }
      this.contractRankDrawLine();
    },
    timeStartMessage(val) {
      this.timeStartData = val;
      console.log(this.timeStartData);
      this.contractRankDrawLine();
    },
    timeEndMessage(val) {
      this.timeEndData = val;
      console.log(this.timeEndData);
      this.contractRankDrawLine();
    }
  }
};
</script>

<style>
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
</style>
