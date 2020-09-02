<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" >
    {{PieData}}
  </div>
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
    PieData: {
      type: Array,
    },
  },
  data() {
    return {
      chart: null,
      chartOption: {
        title: [
          {
            text: "宗数",
            x: "21%",
            y: "45%",
            textStyle: {
              fontWeight: "bolder",
              color: "#666666",
              fontSize: "14"
            }
          },
          {
            text: "面积",
            x: "71%",
            y: "45%",
            textStyle: {
              fontWeight: "bolder",
              color: "#666666",
              fontSize: "14"
            }
          }
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: ["#ecf0f5"],
        series: [
          {
            name: "宗数",
            type: "pie",
            center: ["25%", "50%"],
            radius: ["50%", "70%"],
            clockwise: false, //饼图的扇区是否是顺时针排布

            itemStyle: {
              normal: {
                label: {
                  show: true
                },
                labelLine: {
                  show: true
                }
              }
            },
            data: [
              {
                value: 50,
                name: "成交",
                label: {
                  normal: {
                    // \n\n可让文字居于牵引线上方，很关键
                    //  {b}  代表显示的内容标题
                    // {c}代表数据
                    // formatter: ' {b}：{d}% \n\n',
                    formatter: " {d}% \n {b} ",
                    padding: [0, -30],
                    textStyle: {
                      color: "#5a86e7", // 改变标示文字的颜色
                      fontWeight: "normal",
                      fontSize: 12,
                      lineHeight: 20
                    }
                  }
                },
                labelLine: {
                  normal: {
                    length: 15,
                    length2: 25,
                    lineStyle: {
                      color: "#5a86e7"
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#779ae9" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#87b4f1" // 100% 处的颜色
                        }
                      ]
                    },
                    label: {
                      show: true
                    },
                    labelLine: {
                      show: true
                    }
                  }
                }
              },
              {
                value: 30,
                name: "流拍",
                label: {
                  normal: {
                    formatter: " {d}% \n {b} ",
                    padding: [0, -30],
                    textStyle: {
                      color: "#b8b8b8", // 改变标示文字的颜色
                      fontWeight: "normal",
                      fontSize: 12,
                      lineHeight: 20
                    }
                  }
                },
                labelLine: {
                  normal: {
                    length: 15,
                    length2: 25,
                    lineStyle: {
                      color: "#e9e8ef"
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    label: {
                      show: true
                    },
                    labelLine: {
                      show: true
                    }
                  }
                }
              }
            ]
          },
          {
            name: "面积",
            type: "pie",

            center: ["75%", "50%"],
            radius: ["50%", "70%"],
            clockwise: false, //饼图的扇区是否是顺时针排布
            itemStyle: {
              normal: {
                label: {
                  show: true
                },
                labelLine: {
                  show: true
                }
              }
            },
            data: [
              {
                value: 63,
                name: "成交",
                label: {
                  normal: {
                    formatter: " {d}% \n {b} ",
                    padding: [0, -30],
                    textStyle: {
                      color: "#ffae67", // 改变标示文字的颜色
                      fontWeight: "normal",
                      fontSize: 12,
                      lineHeight: 20
                    }
                  }
                },
                labelLine: {
                  normal: {
                    length: 15,
                    length2: 25,
                    lineStyle: {
                      color: "#ffae67"
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#ffa060" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#ffbd6e" // 100% 处的颜色
                        }
                      ]
                    },
                    label: {
                      show: true
                    },
                    labelLine: {
                      show: true
                    }
                  }
                }
              },
              {
                value: 455,
                name: "流拍",
                label: {
                  normal: {
                    formatter: " {d}% \n {b} ",
                    padding: [0, -30],
                    textStyle: {
                      color: "#b8b8b8", // 改变标示文字的颜色
                      fontWeight: "normal",
                      fontSize: 12,
                      lineHeight: 20
                    }
                  }
                },
                labelLine: {
                  normal: {
                    length: 15,
                    length2: 25,
                    lineStyle: {
                      color: "#e9e8ef"
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    label: {
                      show: true
                    },
                    labelLine: {
                      show: true
                    }
                  }
                }
              }
            ]
          }
        ]
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

      for(let i=0;i<this.chartOption.title.length;i++){
        for(let j=0;j<this.PieData.length;j++){
          if(i==j){
            this.chartOption.title[i].text = this.PieData[j].name
          }
        }
      }
      for(let i=0;i<this.chartOption.series.length;i++){
        for(let j=0;j<this.PieData.length;j++){
          if(i==j){
            this.chartOption.series[i].name = this.PieData[j].name
          }
          for(let k=0;k<this.chartOption.series[i].data.length;k++){
            for(let z=0;z<this.PieData[j].data.length;z++){
               if(k==z){
                 this.chartOption.series[i].data[k].value=this.PieData[j].data[z].value
                 this.chartOption.series[i].data[k].name=this.PieData[j].data[z].name
               }
            }
          }
        }
      }
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