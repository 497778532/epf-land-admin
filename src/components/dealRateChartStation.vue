<template>
  <div id="dealRate">
    <div class="chart_big_tilte">交易成功率对比图</div>
    <ul class="chart_tab_tilte">
      <li @click="turnTransfer" :class="{active:cur2==0}">转让</li>
      <i style="margin:0 15px;">丨</i>
      <li @click="turnRent" :class="{active:cur2==1}">出租</li>
      <i style="margin:0 15px;">丨</i>
      <li @click="turnMortgage" :class="{active:cur2==2}" style="margin-right:15px;">抵押</li>
    </ul>
    <div class="chart_tab_content">
      <!--:lineData="lineData" <div id="dealRateChart" style="width:100%;height:215px;margin:15px 0;" ref="rateChart"></div> -->
      <doublePie height="215px" width="90%"  :PieData="PieData" id="rateChart"/>   
    </div>
  </div>
</template>

<script>
import axios from "axios";
import echarts from "echarts";
import doublePie from '@/components/charts/doublepie'
export default {
  props: [
    "dealMessage",
    "analyzeMessage",
    "timeStartMessage",
    "timeEndMessage"
  ],
  components:{ doublePie },
  data() {
    return {
      cityCode: "",
      cur2: 0, //默认选中第一个tab

      typeData: "",
      analyzeData: "",
      timeStartData: "",
      timeEndData: "",

      params: {
        cantonProvince: "",
        startDate: "",
        endDate: "",
        analysisType: "" //交易类型
      },
      PieData:[
        {
          name: '宗数',
          data:[
            {name:'成交',value:'1130'},
            {name:'流拍',value:'910'},
          ],
        },
        {
          name: '面积',
          data:[
            {name:'成交',value:'130'},
            {name:'流拍',value:'9180'},
          ],
        },
      ]
    };
  },
  methods: {
    haveCity(code){
      this.cityCode = code;
      this.rateDrawLine();
    },
    turnTransfer() {
      this.cur2 = 0;
      this.typeData = "transfer";
      this.rateDrawLine();
    },
    turnRent() {
      this.cur2 = 1;
      this.typeData = "rent";
      this.rateDrawLine();
    },
    turnMortgage() {
      this.cur2 = 2;
      this.typeData = "mortgage";
      this.rateDrawLine();
    },
    rateDrawLine() {
      // this.$nextTick(() => {
      //   setTimeout(() => {
      //     document.getElementById("dealRateChart").style.width = 100 + "%";
      //     let dealRateChart = echarts.init(
      //       document.getElementById("dealRateChart")
      //     );
      //     dealRateChart.resize(); //直接加这句即可
      //   }, 0);
      //   let dealRateChart = echarts.init(
      //     document.getElementById("dealRateChart")
      //   );

        // 请求数据
        let params = this.params;
        params["analysisType"] = this.typeData;
        params["startDate"] = this.timeStartData;
        params["endDate"] = this.timeEndData;
        params["cantonProvince"] = sessionStorage.getItem("dealProvince");
        params["cantonCity"] = this.cityCode;

        this.$get(
          `/epf-monitor/monitor/trans/queryFlowPattingRatio`,
          params
        ).then(res => {
          let chartData = res.result;
          console.log(chartData);

          var unflowPattingAmountData = res.result[0].unflowPattingResult; //未流拍金额数据
          var flowPattingAmountData = res.result[0].flowPattingResult; //流拍金额数据
          var unflowPattingAreaData = res.result[0].unflowPattingArea; //未流拍面积数据
          var flowPattingAreaData = res.result[0].flowPattingArea; //流拍面积数据
          console.log(unflowPattingAmountData);
          console.log(flowPattingAmountData);
          console.log(unflowPattingAreaData);
          console.log(flowPattingAreaData);
          this.PieData = [
            {
              name: '宗数',
              data:[
                {name:'成交',value:unflowPattingAmountData},
                {name:'流拍',value:flowPattingAmountData},
              ],
            },
            {
              name: '面积',
              data:[
                {name:'成交',value:unflowPattingAreaData},
                {name:'流拍',value:flowPattingAreaData},
              ],
            },
          ]

          // 绘制图表

          // dealRateChart.setOption({
          //   title: [
          //     {
          //       text: "宗数",
          //       x: "21%",
          //       y: "45%",
          //       textStyle: {
          //         fontWeight: "bolder",
          //         color: "#666666",
          //         fontSize: "14"
          //       }
          //     },
          //     {
          //       text: "面积",
          //       x: "71%",
          //       y: "45%",
          //       textStyle: {
          //         fontWeight: "bolder",
          //         color: "#666666",
          //         fontSize: "14"
          //       }
          //     }
          //   ],
          //   tooltip: {
          //     trigger: "item",
          //     formatter: "{a} <br/>{b} : {c} ({d}%)"
          //   },
          //   color: ["#ecf0f5"],
          //   series: [
          //     {
          //       name: "宗数",
          //       type: "pie",
          //       center: ["25%", "50%"],
          //       radius: ["50%", "70%"],
          //       clockwise: false, //饼图的扇区是否是顺时针排布

          //       itemStyle: {
          //         normal: {
          //           label: {
          //             show: true
          //           },
          //           labelLine: {
          //             show: true
          //           }
          //         }
          //       },
          //       data: [
          //         {
          //           value: unflowPattingAmountData,
          //           name: "成交",
          //           label: {
          //             normal: {
          //               // \n\n可让文字居于牵引线上方，很关键
          //               //  {b}  代表显示的内容标题
          //               // {c}代表数据
          //               // formatter: ' {b}：{d}% \n\n',
          //               formatter: " {d}% \n {b} ",
          //               padding: [0, -30],
          //               textStyle: {
          //                 color: "#5a86e7", // 改变标示文字的颜色
          //                 fontWeight: "normal",
          //                 fontSize: 12,
          //                 lineHeight: 20
          //               }
          //             }
          //           },
          //           labelLine: {
          //             normal: {
          //               length: 15,
          //               length2: 25,
          //               lineStyle: {
          //                 color: "#5a86e7"
          //               }
          //             }
          //           },
          //           itemStyle: {
          //             normal: {
          //               color: {
          //                 // 完成的圆环的颜色
          //                 colorStops: [
          //                   {
          //                     offset: 0,
          //                     color: "#779ae9" // 0% 处的颜色
          //                   },
          //                   {
          //                     offset: 1,
          //                     color: "#87b4f1" // 100% 处的颜色
          //                   }
          //                 ]
          //               },
          //               label: {
          //                 show: true
          //               },
          //               labelLine: {
          //                 show: true
          //               }
          //             }
          //           }
          //         },
          //         {
          //           value: flowPattingAmountData,
          //           name: "流拍",
          //           label: {
          //             normal: {
          //               formatter: " {d}% \n {b} ",
          //               padding: [0, -30],
          //               textStyle: {
          //                 color: "#b8b8b8", // 改变标示文字的颜色
          //                 fontWeight: "normal",
          //                 fontSize: 12,
          //                 lineHeight: 20
          //               }
          //             }
          //           },
          //           labelLine: {
          //             normal: {
          //               length: 15,
          //               length2: 25,
          //               lineStyle: {
          //                 color: "#e9e8ef"
          //               }
          //             }
          //           },
          //           itemStyle: {
          //             normal: {
          //               label: {
          //                 show: true
          //               },
          //               labelLine: {
          //                 show: true
          //               }
          //             }
          //           }
          //         }
          //       ]
          //     },
          //     {
          //       name: "面积",
          //       type: "pie",

          //       center: ["75%", "50%"],
          //       radius: ["50%", "70%"],
          //       clockwise: false, //饼图的扇区是否是顺时针排布
          //       itemStyle: {
          //         normal: {
          //           label: {
          //             show: true
          //           },
          //           labelLine: {
          //             show: true
          //           }
          //         }
          //       },
          //       data: [
          //         {
          //           value: unflowPattingAreaData,
          //           name: "成交",
          //           label: {
          //             normal: {
          //               formatter: " {d}% \n {b} ",
          //               padding: [0, -30],
          //               textStyle: {
          //                 color: "#ffae67", // 改变标示文字的颜色
          //                 fontWeight: "normal",
          //                 fontSize: 12,
          //                 lineHeight: 20
          //               }
          //             }
          //           },
          //           labelLine: {
          //             normal: {
          //               length: 15,
          //               length2: 25,
          //               lineStyle: {
          //                 color: "#ffae67"
          //               }
          //             }
          //           },
          //           itemStyle: {
          //             normal: {
          //               color: {
          //                 // 完成的圆环的颜色
          //                 colorStops: [
          //                   {
          //                     offset: 0,
          //                     color: "#ffa060" // 0% 处的颜色
          //                   },
          //                   {
          //                     offset: 1,
          //                     color: "#ffbd6e" // 100% 处的颜色
          //                   }
          //                 ]
          //               },
          //               label: {
          //                 show: true
          //               },
          //               labelLine: {
          //                 show: true
          //               }
          //             }
          //           }
          //         },
          //         {
          //           value: flowPattingAreaData,
          //           name: "流拍",
          //           label: {
          //             normal: {
          //               formatter: " {d}% \n {b} ",
          //               padding: [0, -30],
          //               textStyle: {
          //                 color: "#b8b8b8", // 改变标示文字的颜色
          //                 fontWeight: "normal",
          //                 fontSize: 12,
          //                 lineHeight: 20
          //               }
          //             }
          //           },
          //           labelLine: {
          //             normal: {
          //               length: 15,
          //               length2: 25,
          //               lineStyle: {
          //                 color: "#e9e8ef"
          //               }
          //             }
          //           },
          //           itemStyle: {
          //             normal: {
          //               label: {
          //                 show: true
          //               },
          //               labelLine: {
          //                 show: true
          //               }
          //             }
          //           }
          //         }
          //       ]
          //     }
          //   ]
          // });
        });
    //   });
    },
    // initEchart() {
    //   window.addEventListener("resize", () => {
    //     let dealRateChart = echarts.init(
    //       document.getElementById("dealRateChart")
    //     );
    //     document.getElementById("dealRateChart").style.width = 100 + "%";
    //     dealRateChart.resize();
    //   });
    // }
  },
  mounted() {
    // setTimeout(() => {
      this.rateDrawLine();
    // }, 1000);
    // this.initEchart();;
  },
  // destroyed() {
  //   window.removeEventListener(
  //     "resize",
  //     () => {
  //       let dealRateChart = echarts.init(
  //         document.getElementById("dealRateChart")
  //       );
  //       document.getElementById("dealRateChart").style.width = 100 + "%";
  //       dealRateChart.resize();
  //     },
  //     20
  //   );
  // },
  created() {
    this.typeData = this.dealMessage == '' ? 'transfer' : this.dealMessage;
    this.analyzeData = this.analyzeMessage;
    this.timeStartData = this.timeStartMessage;
    this.timeEndData = this.timeEndMessage;
    // console.log(this.typeData);
    // //console.log(this.analyzeData);
    // console.log(this.timeStartData);
    // console.log(this.timeEndData);
  },
  watch: {
    dealMessage(val) {
      this.typeData = val;
      console.log(this.typeData);
      if (this.typeData == "transfer" || this.typeData == "") {
        this.cur2 = 0;
      } else if (this.typeData == "rent") {
        this.cur2 = 1;
      } else if (this.typeData == "mortgage") {
        this.cur2 = 2;
      }
      this.rateDrawLine();
    },
    analyzeMessage(val) {
      this.analyzeData = val;
      //console.log(this.analyzeData);
      this.rateDrawLine();
    },
    timeStartMessage(val) {
      this.timeStartData = val;
      console.log(this.timeStartData);
      this.rateDrawLine();
    },
    timeEndMessage(val) {
      this.timeEndData = val;
      console.log(this.timeEndData);
      this.rateDrawLine();
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
