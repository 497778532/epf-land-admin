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
        // backgroundColor: "#062a44",
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [ 
          {
            name: "抵押",
            type: "gauge",
            center: ["50%", "50%"], // 默认全局居中
            radius: "50%",
            axisLine: {
              show: true,
              lineStyle: {
                  color: [
                    [0, '#ffa864'],
                    [1, '#00FFFF'],
                  ],
                  // color: new echarts.graphic.LinearGradient(
                  //     0, 0, 0, 1,       //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                  //     [
                  //         {offset: 0, color: '#000'},
                  //         {offset: 0.5, color: '#888'},
                  //         {offset: 1, color: '#ddd'}
                  //     ]                //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                  // ),
                  width: 18,
              },
              // lineStyle: {
              //   // 属性lineStyle控制线条样式
              //   color: [
              //     [
              //       '50%',
              //       new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              //         {
              //           offset: 0,
              //           // color: "#ffa864"
              //           color: "#00FFFF"
              //         },
              //         {
              //           offset: 1,
              //           // color: "#ffbd6e"
              //           color: "#00FFFF"
              //         }
              //       ])
              //     ],
              //     [1, "#f6f6f5"]
              //   ],
              //   width: 18
              // }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            pointer: {
              show: false,
              length: "0",
              width: "0"
            },
            detail: {
              offsetCenter: [0, "85%"],
              formatter: `{a|80%}\n{b|抵押}\n{x|¥300万元}\n`,
              // formatter: `{a|${dyP}%}\n{b|抵押}\n{x|¥${dyD}${unitName}}\n`,
              rich: {
                a: {
                  color: "#333333",
                  lineHeight: 35,
                  fontSize: 26,
                  fontWeight: 550
                },
                b: {
                  color: "#666666",
                  fontSize: 14,
                  padding: [10, 0, 10, 0]
                },
                x: {
                  color: "#666666",
                  fontSize: 14
                }
              }
            },
            data: [
              {
                value: 20
                // label: {
                //   textStyle: {
                //     fontSize: 10,
                //     color: "#333333"
                //   }
                // }
              }
            ]
          },
          // {
          //   name: "抵押",
          //   type: "gauge",
          //   center: ["17%", "50%"], // 默认全局居中
          //   radius: "80%",
          //   // axisLine: {
          //   //   show: false,
          //   //   lineStyle: {
          //   //     // 属性lineStyle控制线条样式
          //   //     color: [
          //   //       [
          //   //         50,
          //   //         new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          //   //           {
          //   //             offset: 0,
          //   //             color: "#ffa864"
          //   //           },
          //   //           {
          //   //             offset: 1,
          //   //             color: "#ffbd6e"
          //   //           }
          //   //         ])
          //   //       ],
          //   //       [1, "#f6f6f5"]
          //   //     ],
          //   //     width: 18
          //   //   }
          //   // },
          //   splitLine: {
          //     show: false
          //   },
          //   axisTick: {
          //     show: false
          //   },
          //   axisLabel: {
          //     show: false
          //   },
          //   pointer: {
          //     show: false,
          //     length: "0",
          //     width: "0"
          //   },
          //   // detail: {
          //   //   offsetCenter: [0, "85%"],
          //   //   // formatter: `{a|${dyP}%}\n{b|抵押}\n{x|¥${dyD}${unitName}}\n`,
          //   //   rich: {
          //   //     a: {
          //   //       color: "#333333",
          //   //       lineHeight: 35,
          //   //       fontSize: 26,
          //   //       fontWeight: 550
          //   //     },
          //   //     b: {
          //   //       color: "#666666",
          //   //       fontSize: 14,
          //   //       padding: [10, 0, 10, 0]
          //   //     },
          //   //     x: {
          //   //       color: "#666666",
          //   //       fontSize: 14
          //   //     }
          //   //   }
          //   // },
          //   data: [
          //     {
          //       value: 20
          //       // label: {
          //       //   textStyle: {
          //       //     fontSize: 10,
          //       //     color: "#333333"
          //       //   }
          //       // }
          //     }
          //   ]
          // },
          // {
          //   name: "转让",
          //   type: "gauge",
          //   center: ["50%", "50%"], // 默认全局居中
          //   radius: "80%",
          //   axisLine: {
          //     show: false,
          //     lineStyle: {
          //       // 属性lineStyle控制线条样式
          //       color: [
          //         [
          //           80,
          //           new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          //             {
          //               offset: 0,
          //               color: "#5882e6"
          //             },
          //             {
          //               offset: 1,
          //               color: "#6a9eef"
          //             }
          //           ])
          //         ],
          //         [1, "#f6f6f5"]
          //       ],
          //       width: 18
          //     }
          //   },
          //   splitLine: {
          //     show: false
          //   },
          //   axisTick: {
          //     show: false
          //   },
          //   axisLabel: {
          //     show: false
          //   },
          //   pointer: {
          //     show: false,
          //     length: "0",
          //     width: "0"
          //   },
          //   // detail: {
          //   //   offsetCenter: [0, "85%"],
          //   //   // formatter: `{a|${zrP}%}\n{b|转让}\n{x|¥${zrD}${unitName}}\n`,
          //   //   rich: {
          //   //     a: {
          //   //       color: "#333333",
          //   //       lineHeight: 35,
          //   //       fontSize: 26,
          //   //       fontWeight: 550
          //   //     },
          //   //     b: {
          //   //       color: "#666666",
          //   //       fontSize: 14,
          //   //       padding: [10, 0, 10, 0]
          //   //     },
          //   //     x: {
          //   //       color: "#666666",
          //   //       fontSize: 14
          //   //     }
          //   //   }
          //   // },
          //   data: [
          //     {
          //       value: 50
          //     }
          //   ]
          // },
          // {
          //   name: "出租",
          //   type: "gauge",
          //   center: ["83%", "50%"], // 默认全局居中
          //   radius: "80%",
          //   axisLine: {
          //     show: false,
          //     lineStyle: {
          //       // 属性lineStyle控制线条样式
          //       color: [
          //         [
          //           70,
          //           new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          //             {
          //               offset: 0,
          //               color: "#45dae5"
          //             },
          //             {
          //               offset: 1,
          //               color: "#11e5d9"
          //             }
          //           ])
          //         ],
          //         [1, "#f6f6f5"]
          //       ],
          //       width: 18
          //     }
          //   },
          //   splitLine: {
          //     show: false
          //   },
          //   axisTick: {
          //     show: false
          //   },
          //   axisLabel: {
          //     show: false
          //   },
          //   pointer: {
          //     show: false,
          //     length: "0",
          //     width: "0"
          //   },
          //   // detail: {
          //   //   offsetCenter: [0, "85%"],
          //   //   // formatter: `{a|${czP}%}\n{b|出租}\n{x|¥${czD}${unitName}}\n`,
          //   //   rich: {
          //   //     a: {
          //   //       color: "#333333",
          //   //       lineHeight: 35,
          //   //       fontSize: 26,
          //   //       fontWeight: 550
          //   //     },
          //   //     b: {
          //   //       color: "#666666",
          //   //       fontSize: 14,
          //   //       padding: [10, 0, 10, 0]
          //   //     },
          //   //     x: {
          //   //       color: "#666666",
          //   //       fontSize: 14
          //   //     }
          //   //   }
          //   // },
          //   data: [
          //     {
          //       value: 80
          //     }
          //   ]
          // }
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

      // for(let i=0;i<this.chartOption.title.length;i++){
      //   for(let j=0;j<this.PieData.length;j++){
      //     if(i==j){
      //       this.chartOption.title[i].text = this.PieData[j].name
      //     }
      //   }
      // }
      // for(let i=0;i<this.chartOption.series.length;i++){
      //   for(let j=0;j<this.PieData.length;j++){
      //     if(i==j){
      //       this.chartOption.series[i].name = this.PieData[j].name
      //     }
      //     for(let k=0;k<this.chartOption.series[i].data.length;k++){
      //       for(let z=0;z<this.PieData[j].data.length;z++){
      //          if(k==z){
      //            this.chartOption.series[i].data[k].value=this.PieData[j].data[z].value
      //            this.chartOption.series[i].data[k].name=this.PieData[j].data[z].name
      //          }
      //       }
      //     }
      //   }
      // }
      this.chart.setOption(this.chartOption,true)
      // window.addEventListener("resize", this.chart.resize);
      document.getElementById(this.id).style.width = 100 + "%";
      window.onresize = () => {this.chart.resize();}
    }
  },
  watch: {
    //观察option的变化
    PieData(newVal, oldVal){
      if (this.PieData) {
        this.initChart();
      }
    }
  },
}
</script>