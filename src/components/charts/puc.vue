<template>
  <div :id="id" :style="{ height: height, width: width }" />
</template>
<script>
import echarts from "echarts";
// import resize from './mixins/resize'

export default {
// mixins: [resize],
  props: {
    id: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "260px"
    },
    pucChartData:{
      type: Array,
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
            name: "单位：万平方米",
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
            data: '',
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
            data: '',
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
      this.chart = echarts.init(document.getElementById(this.id))
      let self = this
      if(this.id == 'useContChart'){
        this.chartOption.xAxis[0].data = this.pucChartData.map(item=>{return item.firstClassUseName})
        this.chartOption.xAxis[0].name = '用途名'
      }else{
        var cantonProvinceNameData = this.pucChartData.map(item=>{return item.cantonProvinceName})
        var cantonCityNameData = this.pucChartData.map(item=>{return item.cantonCityName})  
        var cantonName = "";
        if (sessionStorage.getItem("pdProvince")) {
            cantonName = "城市";
            this.chartOption.xAxis[0].data = cantonCityNameData;
          } else {
            cantonName = "省份";
            this.chartOption.xAxis[0].data = cantonProvinceNameData;
        }
        this.chartOption.xAxis[0].name = cantonName
      }
      this.chartOption.series[0].name = '供给'
      this.chartOption.series[1].name = '需求'
      this.chartOption.series[0].data = this.pucChartData.map(item=>{return item.gjArea})
      this.chartOption.series[1].data = this.pucChartData.map(item=>{return item.xqArea})
      console.log(this.chartOption)
      this.chart.setOption(this.chartOption,true)
      // window.addEventListener("resize", this.chart.resize);
      document.getElementById(this.id).style.width = 100 + "%";
      window.onresize = () => {this.chart.resize();}
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
  pucChartData(newVal, oldVal){
    if (this.pucChartData) {
      this.initEchart();
    }
  }
},
};
</script>
