<template>
  <div id="contractUse">
    <div class="chart_big_tilte">分用途合同类型签订对比</div>
    <ul class="chart_tab_tilte">
      <li @click="turnJE" :class="{active:cur2==0}">金额</li>
      <i style="margin:0 15px;">丨</i>
      <li @click="turnMJ" :class="{active:cur2==1}">面积</li>
      <i style="margin:0 15px;">丨</i>
      <li @click="turnZS" :class="{active:cur2==2}" style="margin-right:15px;">宗数</li>
    </ul>
    <div class="chart_tab_content">
      <!-- <div id="contractUseChart" style="width:100%;height:270px;margin:15px 0;" ref="contractChart"></div> -->
      <barChart ref="contractChart" height="270px" width="90%"  style="margin:15px 0"
      :barChartData="barChartData"
      :conUseUnitName="unitName"
      id="contractUseChart"/> 
    </div>
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
      cur2: 0, //默认选中第一个tab

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
          mortgageData:[],
          firstClassUseNameData:[]
        }
      ],
      unitName:"单位：万元",
    };
  },
  methods: {
    haveCity(code){
      this.cityCode = code;
      this.contractUseDrawLine();
    },
    turnJE() {
      this.cur2 = 0;
      this.analyzeData = "JE";
      this.contractUseDrawLine();
    },
    turnMJ() {
      this.cur2 = 1;
      this.analyzeData = "MJ";
      this.contractUseDrawLine();
    },
    turnZS() {
      this.cur2 = 2;
      this.analyzeData = "ZS";
      this.contractUseDrawLine();
    },

    contractUseDrawLine() {
      this.$nextTick(() => {
        setTimeout(() => {
          document.getElementById("contractUseChart").style.width = 100 + "%";
          let contractUseChart = echarts.init(
            document.getElementById("contractUseChart")
          );
          contractUseChart.resize(); //直接加这句即可
        }, 0);
        let contractUseChart = echarts.init(
          document.getElementById("contractUseChart")
        );

        //请求数据
        let params = this.params;
        params["flowType"] = this.typeData;
        params["explanType"] = this.analyzeData;
        params["startDate"] = this.timeStartData;
        params["endDate"] = this.timeEndData;
        params["cantonProvince"] = sessionStorage.getItem("tractProvince");
        params["cantonCity"] = this.cityCode;

        this.$get(
          `/epf-monitor/monitor/contact/queryLandUse1Stat`,
          params
        ).then(res => {
          console.log(res);
          let chartData = res.result;
          console.log(chartData);

          var zrAllData = []; //转让图表数据
          var czAllData = []; //出租图表数据
          var dyAllData = []; //抵押图表数据
          var firstClassUseNameData = []; //x轴用途名称图表数据
          var allData = []; //所有数据
          for (var key in chartData) {
            zrAllData.push(chartData[key].zrData); //转让
            czAllData.push(chartData[key].czData); //出租
            dyAllData.push(chartData[key].dyData); //抵押
            firstClassUseNameData.push(chartData[key].firstClassUseName); //x轴用途名称
            allData.push(
              chartData[key].zrData,
              chartData[key].czData,
              chartData[key].dyData
            ); //x轴用途名称
          }

          var maxZrAllData = Math.max.apply(Math, zrAllData); //转让最大值
          var maxCzAllData = Math.max.apply(Math, czAllData); //出租最大值
          var maxDyAllData = Math.max.apply(Math, dyAllData); //抵押最大值
          var maxAllData = Math.max.apply(Math, allData); //全部最大值

          // var unitName = "";
          if (this.analyzeData == "JE") {
            this.unitName = "单位：万元";
          } else if (this.analyzeData == "MJ") {
            this.unitName = "单位：万平方米";
          } else if (this.analyzeData == "ZS") {
            this.unitName = "单位：宗";
          }

          // 绘制图表
          function lookContractUse(
            maxData,
            transferName,
            transferData,
            rentName,
            rentData,
            mortgageName,
            mortgageData
          ) {
            contractUseChart.setOption({
              color: ["#3398DB"],
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  // 坐标轴指示器，坐标轴触发有效
                  type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              legend: {
                left: "30%",
                top: "2%",
                data: ["转让", "出租", "抵押"],
                itemWidth: 14,
                itemHeight: 14
              },
              grid: {
                left: "5%",
                right: "12%",
                bottom: "5%",
                top: "15%",
                containLabel: true
              },
              xAxis: [
                {
                  name: "用途名",
                  type: "category",
                  data: firstClassUseNameData,
                  axisTick: {
                    alignWithLabel: true,
                    show: false //不要刻度
                  },
                  axisLine: {
                    show: false //不要x轴
                  },
                  axisLabel: {
                    //坐标轴刻度标签的相关设置。
                    formatter: function(params) {
                      var newParamsName = "";
                      var paramsNameNumber = params.length;
                      var provideNumber = 4;
                      var rowNumber = Math.ceil(
                        paramsNameNumber / provideNumber
                      );
                      if (paramsNameNumber > provideNumber) {
                        for (var p = 0; p < rowNumber; p++) {
                          var tempStr = "";
                          var start = p * provideNumber;
                          var end = start + provideNumber;
                          if (p == rowNumber - 1) {
                            tempStr = params.substring(start, paramsNameNumber);
                          } else {
                            tempStr = params.substring(start, end) + "\n";
                          }
                          newParamsName += tempStr;
                        }
                      } else {
                        newParamsName = params;
                      }
                      return newParamsName;
                    }
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
            this.barChartData = [{firstClassUseNameData,maxData:maxZrAllData,transferName:"转让",transferData:zrAllData, rentName:"", rentData:"", mortgageName:"", mortgageData:""}]
            // lookContractUse(maxZrAllData, "转让", zrAllData, "", "", "", "");
          } else if (this.typeData == "rent") {
            this.barChartData = [{firstClassUseNameData,maxData:maxCzAllData,transferName:"",transferData:"", rentName:"出租", rentData:czAllData, mortgageName:"", mortgageData:""}]
            // lookContractUse(maxCzAllData, "", "", "出租", czAllData, "", "");
          } else if (this.typeData == "mortgage") {
            this.barChartData = [{firstClassUseNameData,maxData:maxDyAllData,transferName:"",transferData:"", rentName:"", rentData:"", mortgageName:"抵押", mortgageData:dyAllData}]
            // lookContractUse(maxDyAllData, "", "", "", "", "抵押", dyAllData);
          } else {
            this.barChartData = [{firstClassUseNameData,maxData:maxAllData,transferName:"转让",transferData:zrAllData, rentName:"出租", rentData:"czAllData", mortgageName:"抵押", mortgageData:"dyAllData"}]
            // lookContractUse(
            //   maxAllData,
            //   "转让",
            //   zrAllData,
            //   "出租",
            //   czAllData,
            //   "抵押",
            //   dyAllData
            // );
          }
        });
      });
    },
    initEchart() {
      window.addEventListener("resize", () => {
        let contractUseChart = echarts.init(
          document.getElementById("contractUseChart")
        );
        document.getElementById("contractUseChart").style.width = 100 + "%";
        contractUseChart.resize();
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.contractUseDrawLine();
    }, 1000);
    this.initEchart();
  },
  destroyed() {
    window.removeEventListener(
      "resize",
      () => {
        let contractUseChart = echarts.init(
          document.getElementById("contractUseChart")
        );
        document.getElementById("contractUseChart").style.width = 100 + "%";
        contractUseChart.resize();
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
      this.contractUseDrawLine();
    },
    analyzeMessage(val) {
      this.analyzeData = val;
      //console.log(this.analyzeData);
      if (this.analyzeData == "JE") {
        this.cur2 = 0;
      } else if (this.analyzeData == "MJ") {
        this.cur2 = 1;
      } else if (this.analyzeData == "ZS") {
        this.cur2 = 2;
      }
      this.contractUseDrawLine();
    },
    timeStartMessage(val) {
      this.timeStartData = val;
      console.log(this.timeStartData);
      this.contractUseDrawLine();
    },
    timeEndMessage(val) {
      this.timeEndData = val;
      console.log(this.timeEndData);
      this.contractUseDrawLine();
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
