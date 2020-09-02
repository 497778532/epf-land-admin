<template>
<!-- 建设用地用途供需对比（面积） -->
  <div :id="id" :style="{ height: height, width: width }" />
</template>
<script>
import echarts from "echarts";
// import resize from './mixins/resize'
import {EleResize} from '@/assets/js/esresize.js'

export default {
// mixins: [resize],
  props: {
    id: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "200px"
    },
    height: {
      type: String,
      default: "260px"
    },
    barChartData:{
      type: Array,
    },
    // 区域交易排名
    rankProvinceDataName:{
      type: String,
    },
    rankProvinceData:{
      type: Array,
    },
    rankUnitName:{
      type: String,
    },
    // 各市(区)供需对比分析（面积）
    areaCantonName:{
      type: String,
    },
    areaCantonData:{
       type: Array,
    },
    // 合同签订汇总
    contractCantonData:{
      type: Array,
    },
    contractCantonName:{
      type: String,
    },
    contractUnitName:{
      type: String,
    },
    // 分用途合同类型签订对比
    conUseUnitName:{
      type: String,
    }
  },
  data() {
    return {
      chart: null,
      chartOption:{
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          right: "12%",
          top: "0%",
          data: '',
          itemWidth: 14,
          itemHeight: 14
        },
        grid: {
          left: "5%",
          right: "",
          bottom: "5%",
          top: "15%",
          containLabel: true
        },
        xAxis: [
          {
            name: "",
            type: "category",
            data: '',
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
            name: "",
            type: "value",
            // interval: '',
            // max: '',
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
            name: '',
            type: "bar",
            barWidth: "8px",
            data: [],
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
            name: '',
            type: "bar",
            barWidth: "8px",
            data: [],
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
      }
    };
  },
  methods: {
    initEchart() {
      //console.log(this.id)
      //console.log(this.barChartData)
      this.chart = echarts.init(document.getElementById(this.id))
      let resizeDiv = document.getElementById(this.id)
      //console.log(this.chart)
      let self = this
      // 各市(区)供需对比分析（面积）areaContChart
      // 建设用地用途供需对比（面积）useContChart
      if(this.id == "useContChart" || this.id == "areaContChart"){
        this.chartOption.series[0].name = '供给'
        this.chartOption.series[1].name = '需求'
        this.chartOption.yAxis[0].name = this.barChartData[0].yAxisName
        this.chartOption.legend.data = ["供给", "需求"]
        this.chartOption.series[0].data = this.barChartData[0].sellData
        this.chartOption.series[1].data = this.barChartData[0].purchaseData
      }
      if(this.id == 'useContChart'){
        this.chartOption.xAxis[0].data = this.barChartData[0].firstClassUseNameData
        this.chartOption.xAxis[0].name = '用途名'
        this.chartOption.grid.right = "11%"
        //console.log(this.chartOption.grid.right)
      }
      if(this.id == "areaContChart"){
        this.chartOption.xAxis[0].data = this.areaCantonData;
        this.chartOption.xAxis[0].name = this.areaCantonName
        this.chartOption.grid.right = "9%"
        this.chartOption.xAxis[0].axisLabel= {
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
    // 区域交易排名rankChart
     if(this.id == 'rankChart'){
        this.chartOption.legend.data = ["转让", "出租", "抵押"]
        this.chartOption.grid.right="12%"
        this.chartOption.legend.right = "4%",
        this.chartOption.grid = {left: "2%", right: "8%", bottom: "5%",top: "20%",containLabel: true};
        this.chartOption.xAxis[0].axisLabel = {}
        this.chartOption.xAxis[0].name = this.rankProvinceDataName;
        this.chartOption.xAxis[0].data = this.rankProvinceData
        this.chartOption.yAxis[0].name = this.rankUnitName;
      }
    //  分用途合同类型签订对比contractUseChart
    if(this.id == "contractUseChart"){
      this.chartOption.xAxis[0].data = this.barChartData[0].firstClassUseNameData
      this.chartOption.xAxis[0].name = '用途名'
      this.chartOption.xAxis[0].axisLabel = {}
      this.chartOption.grid.right="9.5%"
      this.chartOption.yAxis[0].name = this.conUseUnitName;
    }
    // 合同签订汇总collectChart
     if(this.id == 'collectChart'){
        this.chartOption.legend.data = ["转让", "出租", "抵押"]
        this.chartOption.grid.right="5.5%"
        this.chartOption.xAxis[0].data = this.contractCantonData;
        this.chartOption.xAxis[0].name = this.contractCantonName;
        this.chartOption.yAxis[0].name = this.contractUnitName;
     }
    if(this.id == "collectChart" || this.id == "contractUseChart" || this.id == "rankChart"){
       this.chartOption.series[0].name = '转让'
      this.chartOption.series[1].name = '出租'
      this.chartOption.series[0].data = this.barChartData[0].transferData
      this.chartOption.series[1].data = this.barChartData[0].rentData
      this.chartOption.series[2] = {
          name: "抵押",
          type: "bar",
          barWidth: "8px",
          data: this.barChartData[0].mortgageData,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0,0,0,1,
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
        }
    }

      //console.log(this.chartOption)
      //console.log(this.chart)
      this.chart.setOption(this.chartOption,true)
      EleResize.on(resizeDiv,()=>this.chart.resize())
      // window.addEventListener("resize", this.chart.resize());
      // document.getElementById(this.id).style.width = 100 + "%";
      // window.onresize = () => {this.chart.resize();}


    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.initEchart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
  //观察option的变化
  barChartData(newVal, oldVal){
    if (this.barChartData) {
      this.initEchart();
    }
  }
},
};
</script>
