<template>
  <div id="contractType">
    <div class="chart_big_tilte">合同签订类型对比分析</div>
    <ul class="chart_tab_tilte">
      <li @click="turnJE" :class="{active:cur==0}">金额</li>
      <i style="margin:0 15px;">丨</i>
      <li @click="turnMJ" :class="{active:cur==1}">面积</li>
      <i style="margin:0 15px;">丨</i>
      <li @click="turnZS" :class="{active:cur==2}" style="margin-right:15px;">宗数</li>
    </ul>
    <div class="chart_tab_content">
      <div
        id="contractTypeChart"
        style="width:100%;height:190px;margin:15px 0;"
        ref="contractChart"
      ></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import echarts from "echarts";
export default {
  props: [
    "contractMessage",
    "analyzeMessage",
    "timeStartMessage",
    "timeEndMessage"
  ],
  data() {
    return {
      cityCode:"",
      cur: 0, //默认选中第一个tab

      typeData: "",
      analyzeData: "",
      timeStartData: "",
      timeEndData: "",

      params: {
        cantonProvince: "",
        explanType: "",
        startDate: "",
        endDate: ""
      }
    };
  },
  methods: {
    haveCity(code){
      this.cityCode = code;
      this.contractTypeDrawLine();
    },
    turnJE() {
      this.cur = 0;
      this.analyzeData = "JE";
      this.contractTypeDrawLine();
    },
    turnMJ() {
      this.cur = 1;
      this.analyzeData = "MJ";
      this.contractTypeDrawLine();
    },
    turnZS() {
      this.cur = 2;
      this.analyzeData = "ZS";
      this.contractTypeDrawLine();
    },
    contractTypeDrawLine() {
      this.$nextTick(() => {
        setTimeout(() => {
          document.getElementById("contractTypeChart").style.width = 100 + "%";
          let contractTypeChart = echarts.init(
            document.getElementById("contractTypeChart")
          );
          contractTypeChart.resize(); //直接加这句即可
        }, 0);
        let contractTypeChart = echarts.init(
          document.getElementById("contractTypeChart")
        );

        //请求数据
        let params = this.params;
        params["explanType"] = this.analyzeData;
        params["startDate"] = this.timeStartData;
        params["endDate"] = this.timeEndData;
        params["cantonProvince"] = sessionStorage.getItem("tractProvince");
        params["cantonCity"] = this.cityCode;

        this.$get(
          `/epf-monitor/monitor/contact/groupLandByLandType`,
          params
        ).then(res => {
          console.log(res);
          let chartData = res.result;
          console.log(chartData);

          var zrData = res.result.zrData; //转让数据
          var czData = res.result.czData; //出租数据
          var dyData = res.result.dyData; //抵押数据

          var zrProportion = res.result.zrRate; //转让占比
          var czProportion = res.result.czRate; //出租占比
          var dyProportion = res.result.dyRate; //抵押占比

          var zrProportion2 = zrProportion / 100; //转让占比
          var czProportion2 = czProportion / 100; //出租占比
          var dyProportion2 = dyProportion / 100; //抵押占比

          // var allData = [];
          // allData.push(res.result.zrData, res.result.czData, res.result.dyData); //全部数据
          // function sum(arr) {
          //   return eval(arr.join("+"));
          // }
          // var allDataSum = sum(allData); //抵押金额总和

          // //占比

          // var zrProportion2 = zrData / allDataSum;
          // var czProportion2 = czData / allDataSum;
          // var dyProportion2 = dyData / allDataSum;

          //暴力取整
          // var zrProportion = parseInt((zrData / allDataSum)* 100) ;
          // var czProportion = parseInt((czData / allDataSum)* 100) ;
          // var dyProportion = parseInt((dyData / allDataSum)* 100) ;

          // var zrProportion = (zrData / allDataSum) * 100;
          // var czProportion = (czData / allDataSum) * 100;
          // var dyProportion = (dyData / allDataSum) * 100;

          // var spot1 = String(zrProportion).indexOf(".") + 1; //获取小数点的位置
          // var count1 = String(zrProportion).length - spot1; //获取小数点后的个数
          // var spot2 = String(czProportion).indexOf(".") + 1; //获取小数点的位置
          // var count2 = String(czProportion).length - spot2; //获取小数点后的个数
          // var spot3 = String(dyProportion).indexOf(".") + 1; //获取小数点的位置
          // var count3 = String(dyProportion).length - spot3; //获取小数点后的个数
          // if (spot1 > 0) {
          //   if (count1 > 3) {
          //     zrProportion = +zrProportion.toPrecision(2);
          //   }
          // }

          // if (spot2 > 0) {
          //   if (count2 > 3) {
          //     czProportion = +czProportion.toPrecision(2);
          //   }
          // }

          // if (spot3 > 0) {
          //   if (count3 > 3) {
          //     dyProportion = +dyProportion.toPrecision(2);
          //   }
          // }

          console.log(zrProportion);
          console.log(czProportion);
          console.log(dyProportion);
          console.log(zrProportion2);
          console.log(czProportion2);
          console.log(dyProportion2);

          var unitName = "";
          if (this.analyzeData == "JE") {
            unitName = "万元";
          } else if (this.analyzeData == "MJ") {
            unitName = "万平方米";
          } else if (this.analyzeData == "ZS") {
            unitName = "宗";
          }

          // 绘制图表
          function lookContractType(
            dyName,
            dyLocation,
            dySize,
            dyP2,
            dyP,
            dyD,
            dyColor,
            zrName,
            zrLocation,
            zrSize,
            zrP2,
            zrP,
            zrD,
            zrColor,
            czName,
            czLocation,
            czSize,
            czP2,
            czP,
            czD,
            czColor
          ) {
            contractTypeChart.setOption({
              tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
              },
              series: [
                {
                  name: dyName,
                  type: "gauge",
                  center: [dyLocation, "50%"], // 默认全局居中
                  radius: dySize,
                  axisLine: {
                    show: false,
                    lineStyle: {
                      // 属性lineStyle控制线条样式
                      color: [
                        [
                          dyP2,
                          new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            {
                              offset: 0,
                              color: "#ffa864"
                            },
                            {
                              offset: 1,
                              color: "#ffbd6e"
                            }
                          ])
                        ],
                        [1, "#f6f6f5"]
                      ],
                      width: 18
                    }
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
                    formatter: `{a|${dyP}%}\n{b|抵押}\n{x|¥${dyD}${unitName}}\n`,
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
                        color: dyColor,
                        fontSize: 14
                      }
                    }
                  },
                  data: [
                    {
                      value: dyD
                      // label: {
                      //   textStyle: {
                      //     fontSize: 10,
                      //     color: "#333333"
                      //   }
                      // }
                    }
                  ]
                },
                {
                  name: zrName,
                  type: "gauge",
                  center: [zrLocation, "50%"], // 默认全局居中
                  radius: zrSize,
                  axisLine: {
                    show: false,
                    lineStyle: {
                      // 属性lineStyle控制线条样式
                      color: [
                        [
                          zrP2,
                          new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            {
                              offset: 0,
                              color: "#5882e6"
                            },
                            {
                              offset: 1,
                              color: "#6a9eef"
                            }
                          ])
                        ],
                        [1, "#f6f6f5"]
                      ],
                      width: 18
                    }
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
                    formatter: `{a|${zrP}%}\n{b|转让}\n{x|¥${zrD}${unitName}}\n`,
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
                        color: zrColor,
                        fontSize: 14
                      }
                    }
                  },
                  data: [
                    {
                      value: zrD
                    }
                  ]
                },
                {
                  name: czName,
                  type: "gauge",
                  center: [czLocation, "50%"], // 默认全局居中
                  radius: czSize,
                  axisLine: {
                    show: false,
                    lineStyle: {
                      // 属性lineStyle控制线条样式
                      color: [
                        [
                          czP2,
                          new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            {
                              offset: 0,
                              color: "#45dae5"
                            },
                            {
                              offset: 1,
                              color: "#11e5d9"
                            }
                          ])
                        ],
                        [1, "#f6f6f5"]
                      ],
                      width: 18
                    }
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
                    formatter: `{a|${czP}%}\n{b|出租}\n{x|¥${czD}${unitName}}\n`,
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
                        color: czColor,
                        fontSize: 14
                      }
                    }
                  },
                  data: [
                    {
                      value: czD
                    }
                  ]
                }
              ]
            });
          }

          if (this.typeData == "transfer") {
            lookContractType(
              "",
              "",
              "",
              "",
              "",
              "",
              "transparent",
              "转让",
              "50%",
              "80%",
              zrProportion2,
              zrProportion,
              zrData,
              "#666666",
              "",
              "",
              "",
              "",
              "",
              "",
              "transparent"
            );
          } else if (this.typeData == "rent") {
            lookContractType(
              "",
              "",
              "",
              "",
              "",
              "",
              "transparent",
              "",
              "",
              "",
              "",
              "",
              "",
              "transparent",
              "出租",
              "50%",
              "80%",
              czProportion2,
              czProportion,
              czData,
              "#666666"
            );
          } else if (this.typeData == "mortgage") {
            lookContractType(
              "抵押",
              "50%",
              "80%",
              dyProportion2,
              dyProportion,
              dyData,
              "#666666",
              "",
              "",
              "",
              "",
              "",
              "",
              "transparent",
              "",
              "",
              "",
              "",
              "",
              "",
              "transparent"
            );
          } else {
            lookContractType(
              "抵押",
              "17%",
              "80%",
              dyProportion2,
              dyProportion,
              dyData,
              "#666666",
              "转让",
              "50%",
              "80%",
              zrProportion2,
              zrProportion,
              zrData,
              "#666666",
              "出租",
              "83%",
              "80%",
              czProportion2,
              czProportion,
              czData,
              "#666666"
            );
          }
        });
      });
    },

    initEchart() {
      window.addEventListener("resize", () => {
        let contractTypeChart = echarts.init(
          document.getElementById("contractTypeChart")
        );
        document.getElementById("contractTypeChart").style.width = 100 + "%";
        contractTypeChart.resize();
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.contractTypeDrawLine();
    }, 1000);
    this.initEchart();
  },
  destroyed() {
    window.removeEventListener(
      "resize",
      () => {
        let contractTypeChart = echarts.init(
          document.getElementById("contractTypeChart")
        );
        document.getElementById("contractTypeChart").style.width = 100 + "%";
        contractTypeChart.resize();
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
      this.contractTypeDrawLine();
    },
    analyzeMessage(val) {
      this.analyzeData = val;
      //console.log(this.analyzeData);
      if (this.analyzeData == "JE") {
        this.cur = 0;
      } else if (this.analyzeData == "MJ") {
        this.cur = 1;
      } else if (this.analyzeData == "ZS") {
        this.cur = 2;
      }
      this.contractTypeDrawLine();
    },
    timeStartMessage(val) {
      this.timeStartData = val;
      console.log(this.timeStartData);
      this.contractTypeDrawLine();
    },
    timeEndMessage(val) {
      this.timeEndData = val;
      console.log(this.timeEndData);
      this.contractTypeDrawLine();
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
