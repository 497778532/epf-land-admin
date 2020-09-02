<template>
  <div id="pdUse">
    <div class="chart_big_tilte">建设用地用途供需对比（面积）</div>
    <!-- <div id="useContChart" style="width:100%;height:270px;margin:15px 0;" ref="gxChart"></div> -->
      <barChart ref="gxChart" height="270px" width="90%"
      id="useContChart"  
      :barChartData="barChartData"
      style="margin:15px 0;"/>   
  </div>
</template>

<script>
import axios from "axios";
import echarts from "echarts";
import barChart from '@/components/charts/bar'
export default {
  components:{ barChart },
  props: ["analyzeMessage", "timeStartMessage", "timeEndMessage"],
  data() {
    return {
      cityCode: "",
      analyzeData: "",
      timeStartData: "",
      timeEndData: "",
      params: {
        cantonProvince: "",
        grxlType: "",
        startDate: "",
        endDate: ""
      },
      barChartData:[
        {
          yAxisName:"单位：万平方米",
          sellName:"供给",
          purchaseName:"需求",
          firstClassUseNameData:[],
          sellData:[],
          purchaseData:[],
        }
      ],
    };
  },
  methods: {
    haveCity(code){
      this.cityCode = code;
      this.useContDrawLine();
    },
    useContDrawLine() {
      this.$nextTick(() => {
        setTimeout(() => {
          document.getElementById("useContChart").style.width = 100 + "%";
          let useContChart = echarts.init(
            document.getElementById("useContChart")
          );
          useContChart.resize(); //直接加这句即可
        }, 0);
        let useContChart = echarts.init(
          document.getElementById("useContChart")
        );

        //请求数据
        let params = this.params;
        params["grxlType"] = this.analyzeData;
        params["startDate"] = this.timeStartData;
        params["endDate"] = this.timeEndData;
        console.log("====sessionStorage.getItem('pdProvince')",sessionStorage.getItem("pdProvince"))
        params["cantonProvince"] = sessionStorage.getItem("pdProvince");
        // params["cantonProvince"] = sessionStorage.getItem("regional");
        params["cantonCity"] = this.cityCode;

        this.$get(
          `/epf-monitor/monitor/sellPurc/getGxjsydInfo`,
          params
        ).then(res => {
          console.log(res);
          let chartData = res.result;
          console.log(chartData)
          
          var gjAreaSeriesData = []; //供给面积图表数据
          var xqAreaSeriesData = []; //需求面积图表数据
          var firstClassUseNameData = []; //x轴用途名称图表数据
          var allAreaData = []; //所有面积
          gjAreaSeriesData = chartData.map(item=>{return item.gjArea})
          xqAreaSeriesData = chartData.map(item=>{return item.xqArea})
          firstClassUseNameData = chartData.map(item=>{return item.firstClassUseName})
          allAreaData = gjAreaSeriesData.concat(xqAreaSeriesData)
          for (var key in this.chartData) {
            gjAreaSeriesData.push(this.chartData[key].gjArea); //供给面积
            xqAreaSeriesData.push(this.chartData[key].xqArea); //需求面积
            firstClassUseNameData.push(this.chartData[key].firstClassUseName); //x轴用途名称
            allAreaData.push(this.chartData[key].gjArea, chartData[key].xqArea); //所有面积
          }

          var maxAllAreaData = Math.max.apply(Math, allAreaData); //全部面积最大值
          var maxGjAreaData = Math.max.apply(Math, gjAreaSeriesData); //供给面积最大值
          var maxXqAreaData = Math.max.apply(Math, xqAreaSeriesData); //需求面积最大值

          // 绘制图表
          function lookGXarea(
            maxData,
            sellName,
            sellData,
            purchaseName,
            purchaseData
          ) {
            useContChart.setOption({
              color: ["#3398DB"],
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  // 坐标轴指示器，坐标轴触发有效
                  type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              legend: {
                right: "10%",
                top: "0%",
                data: ["供给", "需求"],
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
                  name: "单位：万平方米",
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
                  name: sellName,
                  type: "bar",
                  barWidth: "8px",
                  data: sellData,
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
                  name: purchaseName,
                  type: "bar",
                  barWidth: "8px",
                  data: purchaseData,
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

          if (this.analyzeData == "ALL") {
            this.barChartData = [ {yAxisName:"单位：万平方米",sellName:"供给",sellData:gjAreaSeriesData,purchaseName:"需求",purchaseData:xqAreaSeriesData,firstClassUseNameData:firstClassUseNameData}]
          } else if (this.analyzeData == "SELL") {
            this.barChartData = [ {yAxisName:"单位：万平方米", sellName:"供给",sellData:gjAreaSeriesData,purchaseName:"",purchaseData:"",firstClassUseNameData:firstClassUseNameData}]
          } else if (this.analyzeData == "PURCHASE") {
            this.barChartData = [ {yAxisName:"单位：万平方米", sellName:"", sellData:"", purchaseName:"需求",purchaseData:xqAreaSeriesData,firstClassUseNameData:firstClassUseNameData} ]
          }
        })
      });
    },
  },
  mounted() {
    setTimeout(() => {
      this.useContDrawLine();
    }, 1000);
    // this.initEchart();
  },
  destroyed() {
    window.removeEventListener(
      "resize",
      () => {
        let useContChart = echarts.init(
          document.getElementById("useContChart")
        );
        document.getElementById("useContChart").style.width = 100 + "%";
        useContChart.resize();
      },
      20
    );
  },
  created() {
    this.analyzeData = this.analyzeMessage;
    this.timeStartData = this.timeStartMessage;
    this.timeEndData = this.timeEndMessage;
    console.log(this.analyzeData);
    console.log(this.timeStartData);
    console.log(this.timeEndData);
  },
  watch: {
    analyzeMessage(val) {
      this.analyzeData = val;
      console.log(this.analyzeData);
      this.useContDrawLine();
    },
    timeStartMessage(val) {
      this.timeStartData = val;
      console.log(this.timeStartData);
      this.useContDrawLine();
    },
    timeEndMessage(val) {
      this.timeEndData = val;
      console.log(this.timeEndData);
      this.useContDrawLine();
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
