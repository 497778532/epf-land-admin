<template>
<!-- 供需对比（面积） -->
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'

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
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    piechartData: {
      type: Array,
    },
  },
  data() {
    return {
      chart: null,
      chartOption: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}  ({d}%)"
        },
        color: '#5984e7',
        legend: {
          top: "5%",
          right: "4%",
          data: ["供给", "需求"],
          itemWidth: 14,
          itemHeight: 14,
          formatter: function(name) {
            return "" + name;
          }
        },
        series:{
            name: "面积",
            type: "pie",
            clockwise: false, //饼图的扇区是否是顺时针排布
            minAngle: 2, //最小的扇区角度（0 ~ 360）
            radius: ["45%", "70%"],
            center: ["50%", "60%"],
            avoidLabelOverlap: false,
            itemStyle: {
              //图形样式(间隙颜色和大小)
              normal: {
                borderColor: "#ffffff",
                borderWidth: 3
              }
            },
            label: {
              normal: {
                show: false,
                position: "center",
                formatter: "{text|{b}}\n{rate|{d}%}",
                rich: {
                  text: {
                    color: "#666",
                    fontSize: 10,
                    align: "center",
                    verticalAlign: "middle",
                    padding: 8
                  },
                  rate: {
                    color: "#333",
                    fontSize: 16,
                    fontWeight: 550,
                    align: "center",
                    verticalAlign: "middle"
                  }
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: 24
                }
              }
            },
            data:this.piechartData,
            // data:[
            //   {
            //     name: "供给",
            //     value: sellAreaSumData,
            //     itemStyle: {
            //       normal: {
            //         color: {
            //           // 完成的圆环的颜色
            //           colorStops: [
            //             {
            //               offset: 0,
            //               color: "#779ae9" // 0% 处的颜色
            //             },
            //             {
            //               offset: 1,
            //               color: "#87b4f1" // 100% 处的颜色
            //             }
            //           ]
            //         },
            //         label: {
            //           show: true
            //         },
            //         labelLine: {
            //           show: true
            //         }
            //       }
            //     }
            //   },
            //   {
            //     name: "",
            //     value: "",
            //     itemStyle: {
            //       normal: {
            //         color: {
            //           // 完成的圆环的颜色
            //           colorStops: [
            //             {
            //               offset: 0,
            //               color: "#ffa060" // 0% 处的颜色
            //             },
            //             {
            //               offset: 1,
            //               color: "#ffbd6e" // 100% 处的颜色
            //             }
            //           ]
            //         },
            //         label: {
            //           show: true
            //         },
            //         labelLine: {
            //           show: true
            //         }
            //       }
            //     }
            //   }
            // ]
          },
        animationEasing: 'elasticOut',
        animationEasingUpdate: 'elasticOut',
        animationDelay(idx) {
          return idx * 20
        },
        animationDelayUpdate(idx) {
          return idx * 20
        }
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
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      let self = this
      this.chartOption.color = this.piechartData.map(e=>{return e.color})
      this.chartOption.legend.data = this.piechartData.map(e=>{return e.name})

      this.chartOption.series.data = this.piechartData
      // console.log("--------this.chartOption----",this.chartOption)
      this.chart.setOption(this.chartOption,true)
      // window.addEventListener("resize", this.chart.resize);
      document.getElementById(this.id).style.width = 100 + "%";
      window.onresize = () => {this.chart.resize();}
    }
  },
  watch: {
    //观察option的变化
    piechartData(newVal, oldVal){
      if (this.piechartData) {
        this.initChart();
      }
    }
  },
}
</script>