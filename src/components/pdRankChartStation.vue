<template>
    <!-- 各市(区)供需对比分析（面积） -->
  <div id="pdRank">
    <!-- <div id="areaContChart" style="width:100%;height:260px;" ref="gxChart"></div> -->
    <barChart ref="gxChart" height="260px" width="90%" 
    :barChartData="barChartData"
    :areaCantonName="cantonName"
    :areaCantonData="cantonData"
    id="areaContChart"/> 
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
      barChartData:[
         {
          yAxisName:"单位：万平方米",
          sellName:"供给",
          sellData:[],
          purchaseName:"需求",
          purchaseData:[],
        }
      ],
      params: {
        cantonProvince: "",
        grxlType: "",
        startDate: "",
        endDate: ""
      },
      cantonName:"城市",
      cantonData:[],
    };
  },
  methods: {
    haveCity(code){
      this.cityCode = code;
      this.areaContDrawLine();
    },
    areaContDrawLine() {
      this.$nextTick(() => {
        document.getElementById("areaContChart").style.width = 100 + "%";
        let areaContChart = echarts.init(
          document.getElementById("areaContChart")
        );
        areaContChart.resize(); //直接加这句即可

        //请求数据
        let params = this.params;
        params["grxlType"] = this.analyzeData;
        params["startDate"] = this.timeStartData;
        params["endDate"] = this.timeEndData;
        params["cantonProvince"] = sessionStorage.getItem("pdProvince");
        // params["cantonProvince"] = sessionStorage.getItem("regional");
        params["cantonCity"] = this.cityCode; 
        console.log("===========this.params========",this.params)

        this.$get(
          `/epf-monitor/monitor/sellPurc/getGxCompareInfo`,
          params
        ).then(res => {
          console.log(res);
          let chartData = res.result;
          console.log(chartData);

          var gjAreaSeriesData = []; //供给面积图表数据
          var xqAreaSeriesData = []; //需求面积图表数据
          var cantonProvinceNameData = []; //x轴省份名称图表数据
          var cantonCityNameData = []; //x轴城市名称图表数据
          var allAreaData = []; //所有面积
          // gjAreaSeriesData = chartData.map(item=>{return item.gjArea})
          // xqAreaSeriesData = chartData.map(item=>{return item.xqArea})
          // cantonProvinceNameData = chartData.map(item=>{return item.cantonProvinceName})
          // cantonCityNameData = chartData.map(item=>{return item.cantonCityName})
          // allAreaData = gjAreaSeriesData.concat(xqAreaSeriesData)
          for (var key in chartData) {
            gjAreaSeriesData.push(chartData[key].gjArea); //供给面积
            xqAreaSeriesData.push(chartData[key].xqArea); //需求面积
            cantonProvinceNameData.push(chartData[key].cantonProvinceName); //x轴省份名称
            cantonCityNameData.push(chartData[key].cantonCityName); //x轴城市名称
            allAreaData.push(chartData[key].totalArea); //所有面积
          }

          var maxAllAreaData = Math.max.apply(Math, allAreaData); //全部面积最大值
          var maxGjAreaData = Math.max.apply(Math, gjAreaSeriesData); //供给面积最大值
          var maxXqAreaData = Math.max.apply(Math, xqAreaSeriesData); //需求面积最大值

          // var cantonName = "";
          // var cantonData = [];
          // if (sessionStorage.getItem("regional")) {
          if (sessionStorage.getItem("pdProvince")) {
            this.cantonName = "城市";
            this.cantonData = cantonCityNameData;
          } else {
            this.cantonName = "省份";
            this.cantonData = cantonProvinceNameData;
          }

          // 绘制图表

          function lookHistogramArea(
            maxData,
            sellName,
            sellData,
            purchaseName,
            purchaseData
          ) {
            areaContChart.setOption({
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
                data: ["供给", "需求"],
                itemWidth: 14,
                itemHeight: 14
              },
              grid: {
                left: "5%",
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
                  },
                  axisLabel: {
                    interval: 0, //强制文字产生间隔
                    rotate: 45, //文字逆时针旋转45°
                    textStyle: {
                      //文字样式
                      color: "#888",
                      fontSize: 12,
                      fontFamily: "Microsoft YaHei"
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

        // if (this.analyzeData == "ALL") {
        //     this.barChartData = [ maxAllAreaData,"供给",gjAreaSeriesData,"需求",xqAreaSeriesData ]
        //   } else if (this.analyzeData == "SELL") {
        //     this.barChartData = [ maxGjAreaData, "供给", gjAreaSeriesData, "", "" ]
        //   } else if (this.analyzeData == "PURCHASE") {
        //     this.barChartData = [ maxXqAreaData, "", "", "需求", xqAreaSeriesData ]
        //   }
        if (this.analyzeData == "ALL") {
            this.barChartData = [ {yAxisName:"单位：万平方米",sellName:"供给",sellData:gjAreaSeriesData,purchaseName:"需求",purchaseData:xqAreaSeriesData }]
          } else if (this.analyzeData == "SELL") {
            this.barChartData = [ {yAxisName:"单位：万平方米",sellName:"供给",sellData:gjAreaSeriesData,purchaseName:"",purchaseData:"" }]
          } else if (this.analyzeData == "PURCHASE") {
            this.barChartData = [ {yAxisName:"单位：万平方米",sellName:"",sellData:"", purchaseName:"需求",purchaseData:xqAreaSeriesData } ]
          }
        });
      });
    },
    initEchart() {
      window.addEventListener("resize", () => {
        let areaContChart = echarts.init(
          document.getElementById("areaContChart")
        );
        document.getElementById("areaContChart").style.width = 100 + "%";
        areaContChart.resize();
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.areaContDrawLine();
    }, 1000);
    this.initEchart();
  },
  destroyed() {
    window.removeEventListener(
      "resize",
      () => {
        let areaContChart = echarts.init(
          document.getElementById("areaContChart")
        );
        document.getElementById("areaContChart").style.width = 100 + "%";
        areaContChart.resize();
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
      console.log('this.analyzeData',this.analyzeData);
      this.areaContDrawLine();
    },
    timeStartMessage(val) {
      this.timeStartData = val;
      console.log('this.timeStartData',this.timeStartData);
      this.areaContDrawLine();
    },
    timeEndMessage(val) {
      this.timeEndData = val;
      console.log('this.timeEndData',this.timeEndData);
      this.areaContDrawLine();
    }
  }
};
</script>

<style>
</style>
