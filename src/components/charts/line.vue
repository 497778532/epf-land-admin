<template>
<!-- 全国供需及交易对比分析（面积） -->
  <div :id="id" :class="className" :style="{height:height,width:width}" >
 
  </div>
</template>

<script>
import echarts from 'echarts'
import {EleResize} from '@/assets/js/esresize.js'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200px'
    },
    lineData: {
      type: Array,
    },
  },
  data() {
    return {
      chart: null,
      chartOption: {
        title: {
          textStyle: {
            align: "center",
            color: "#333",
            fontSize: 20
          },
          top: "3%",
          left: "10%"
        },
        grid: {
          left: "5%",
          right: "12%",
          bottom: "5%",
          top: "15%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          right: "5%",
          top: "0%",
          data: ["供给", "交易", "需求"]
        },
        dataZoom: [
          {
            type: "inside",
            show: true,
            xAxisIndex: [0],
            start: 0, //默认为1
            end: 50
          }
        ],
        xAxis: {
          name: "时间",
          nameLocation: "end",
          nameTextStyle: {
            color: "#333",
            fontSize: 12,
            padding: 10
          },
          data: ['A', 'B', 'C', 'D', 'E', 'F'],
          axisLabel: {
            show: true,
            textStyle: {
              color: "#333" //X轴文字颜色
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#ddd6d0"
            }
          }
        },
        yAxis: [
          {
            type: "value",
            axisLabel: {
              show: true,
              textStyle: {
                color: "#ebf8ac"
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#FFFFFF"
              }
            }
          },
          {
            name: "单位：万平方米",
            type: "value",
            // interval: Math.ceil(maxData / 5),
            // max: Math.ceil(maxData),
            position: "left",
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed" //设置网格线类型 dotted：虚线   solid:实线
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true
            }
          }
        ],
        series: null
      }
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
    // initEchart() {
    //   window.addEventListener("resize", () => {
    //     let pdChinaChart = echarts.init(
    //       document.getElementById("pdChinaChart")
    //     );
    //     document.getElementById("pdChinaChart").style.width = 100 + "%";
    //     pdChinaChart.resize();
    //   });
    // },
  methods: {
    initChart() {
      // console.log("======document.getElementById(this.id).style.width",document.getElementById(this.id).style.width)
      // if(this.chart){
        // this.chart = echarts.init(document.getElementById(this.id),{height:this.height,width:'95%'})
        this.chart = echarts.init(document.getElementById(this.id))
        let resizeDiv = document.getElementById(this.id)
      // }else{
      //   this.chart.clear();
      // }
      // document.getElementById(this.id).style.width = 95 + "%";
      let self = this
      this.chartOption.xAxis.data = this.lineData[0].XAxis
      this.chartOption.yAxis[1].name = this.lineData[0].yAxisName
      this.chartOption.legend.data = this.lineData.map(e=>{return e.name})
      this.chartOption.series = this.lineData.map((e,index)=>{
        return {
          name:e.name,
          type: "line",
          yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
          smooth: true, //平滑曲线显示
          showAllSymbol: true, //显示所有图形。
          symbol: "circle", //标记的图形为实心圆
          symbolSize: 2, //标记的大小
          color: e.color,
          itemStyle: {
            //折线拐点标志的样式
            normal: {
              lineStyle: {
                width: 3, // 0.1的线条是非常细的了
                color: e.color //
              }
            }
          },
          data: e.data
        }
      })
      this.chart.setOption(this.chartOption,true)
      // let listener = function(){
      //   this.chart.resize()
      // }
      EleResize.on(resizeDiv,()=>this.chart.resize())
      // window.addEventListener("resize", this.chart.resize());
      // document.getElementById('charts').style.width = 95 + "%";
      // window.onresize = () => {this.chart.resize();}
    }
  },
  watch: {
    //观察option的变化
    lineData(newVal, oldVal){
      if (this.lineData) {
        this.initChart();
      }
    },
  },
}
</script>