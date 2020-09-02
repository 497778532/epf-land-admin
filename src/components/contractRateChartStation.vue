<template>
  <div id="contractRate">
    <div class="chart_big_tilte">签订/失效对比</div>
    <ul class="chart_tab_tilte">
      <li @click="turnJE" :class="{active:cur3==0}">金额</li>
      <i style="margin:0 15px;">丨</i>
      <li @click="turnMJ" :class="{active:cur3==1}">面积</li>
      <i style="margin:0 15px;">丨</i>
      <li @click="turnZS" :class="{active:cur3==2}" style="margin-right:15px;">宗数</li>
    </ul>
    <div class="chart_tab_content">
      <!-- <div
        id="contractRateChart"
        style="width:100%;height:215px;margin:15px 0;"
        ref="contractChart"
      ></div> -->
      <doublePie height="210px" width="90%" :PieData="PieData" id="contractRateChart"/> 
    </div>
  </div>
</template>

<script>
import axios from "axios";
import echarts from "echarts";
import { setTimeout } from "timers";
import doublePie from '@/components/charts/doublepie'
export default {
  props: [
    "contractMessage",
    "analyzeMessage",
    "timeStartMessage",
    "timeEndMessage"
  ],
  components:{ doublePie },
  data() {
    return {
      cityCode: "",
      cur3: 0, //默认选中第一个tab

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
      PieData:[
        {
          name: '已签订',
          data:[
            {name:'成交1',value:'1130'},
            {name:'流拍1',value:'910'},
          ],
        },
        {
          name: '已失效',
          data:[
            {name:'成交2',value:'130'},
            {name:'流拍2',value:'9180'},
          ],
        },
      ]
    };
  },
  methods: {
    haveCity(code){
      this.cityCode = code;
      this.contractRateDrawLine();
    },
    turnJE() {
      this.cur3 = 0;
      this.analyzeData = "JE";
      this.contractRateDrawLine();
    },
    turnMJ() {
      this.cur3 = 1;
      this.analyzeData = "MJ";
      this.contractRateDrawLine();
    },
    turnZS() {
      this.cur3 = 2;
      this.analyzeData = "ZS";
      this.contractRateDrawLine();
    },

    contractRateDrawLine() {
          // this.PieData=[
          //   {
          //     name: '已签订',
          //     data:[
          //       {name:'已签订',value:Math.random()*50},
          //       {name:'已失效',value:Math.random()*150},
          //     ],
          //   },
          //   {
          //     name: '已失效',
          //     data:[
          //       {name:'已签订',value:Math.random()*250},
          //       {name:'已失效',value:Math.random()*150},
          //     ],
          //   },
          // ]
      this.$nextTick(() => {
        setTimeout(() => {
          document.getElementById("contractRateChart").style.width = 100 + "%";
          let contractRateChart = echarts.init(
            document.getElementById("contractRateChart")
          );
          contractRateChart.resize(); //直接加这句即可
        }, 0);
        let contractRateChart = echarts.init(
          document.getElementById("contractRateChart")
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
          `/epf-monitor/monitor/contact/queryContactCountByType`,
          params
        ).then(res => {
          console.log(res);
          let chartData = res.result;

          var okData = (chartData !='' && chartData != null) ? ((res.result.okRate != '' && res.result.okRate != null )? res.result.okRate : 0) : 0; //已签订数据
          var unokData = (chartData !='' && chartData != null) ? ((res.result.unokRate != '' && res.result.unokRate != null) ? res.result.unokRate : 0) : 0; //已失效数据
          console.log(okData);
          console.log(unokData);
          this.PieData=[
            {
              name: '已签订',
              data:[
                {name:'已签订',value:okData},
                {name:'已失效',value:unokData},
              ],
            },
            {
              name: '已失效',
              data:[
                {name:'已签订',value:unokData},
                {name:'已失效',value:okData},
              ],
            },
          ]

          // 绘制图表

          contractRateChart.setOption({
            title: [
              {
                text: "已签订",
                x: "21%",
                y: "45%",
                textStyle: {
                  fontWeight: "bolder",
                  color: "#666666",
                  fontSize: "14"
                }
              },
              {
                text: "已失效",
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
            color: ["#f6f6f5"],
            series: [
              {
                name: "已签订",
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
                    value: okData,
                    name: "已签订",
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
                    value: unokData,
                    name: "已失效",
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
                name: "已失效",
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
                    value: unokData,
                    name: "已失效",
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
                    value: okData,
                    name: "已签订",
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
          });
        });
      });
    },
    initEchart() {
      window.addEventListener("resize", () => {
        let contractRateChart = echarts.init(
          document.getElementById("contractRateChart")
        );
        document.getElementById("contractRateChart").style.width = 100 + "%";
        contractRateChart.resize();
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.contractRateDrawLine();
    }, 1000);
    this.initEchart();;
  },
  destroyed() {
    window.removeEventListener(
      "resize",
      () => {
        let contractRateChart = echarts.init(
          document.getElementById("contractRateChart")
        );
        document.getElementById("contractRateChart").style.width = 100 + "%";
        contractRateChart.resize();
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
      this.contractRateDrawLine();
    },
    analyzeMessage(val) {
      this.analyzeData = val;
      //console.log(this.analyzeData);
      if (this.analyzeData == "JE") {
        this.cur3 = 0;
      } else if (this.analyzeData == "MJ") {
        this.cur3 = 1;
      } else if (this.analyzeData == "ZS") {
        this.cur3 = 2;
      }
      this.contractRateDrawLine();
    },
    timeStartMessage(val) {
      this.timeStartData = val;
      console.log(this.timeStartData);
      this.contractRateDrawLine();
    },
    timeEndMessage(val) {
      this.timeEndData = val;
      console.log(this.timeEndData);
      this.contractRateDrawLine();
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
