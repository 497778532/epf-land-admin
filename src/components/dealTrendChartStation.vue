<template>
  <div id="dealArea">
    <div class="chart_big_tilte">交易趋势分析图</div>
    <ul class="chart_tab_tilte">
      <li @click="turnAmount" :class="{active:cur3==0}">金额</li>
      <i style="margin:0 15px;">丨</i>
      <li @click="turnArea" :class="{active:cur3==1}">面积</li>
      <i style="margin:0 15px;">丨</i>
      <li @click="turnNumber" :class="{active:cur3==2}" style="margin-right:15px;">宗数</li>
    </ul>
    <div class="chart_tab_content">
      <lineChart height="210px" width="100%" :lineData="lineData" id="deallineChart"/>   
    </div>
  </div>
</template>

<script>
import axios from "axios";
import echarts from "echarts";
import lineChart from '@/components/charts/line'
export default {
  props: [
    "dealMessage",
    "analyzeMessage",
    "timeStartMessage",
    "timeEndMessage"
  ],
  components:{ lineChart },
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
        startDate: "",
        endDate: ""
      },
      lineData:[
        {
          name: '装让',
          color:'#7fbdf8',
          data:[211, 112, 321, 543, 121, 532, 321],
          XAxis:['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          yAxisName:"单位：万平方米"
        },
        {
          name: '出租',
          color:'#1ac6b7',
          data:[220, 182, 191, 234, 290, 330, 310],
          XAxis:['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          yAxisName:"单位：万平方米"
        },
        {
          name: '抵押',
          color:'#ffa060',
          data:[150, 232, 201, 154, 190, 330, 410],
          XAxis:['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          yAxisName:"单位：万平方米"
        },
      ]
    };
  },
  methods: {
    haveCity(code){
      this.cityCode = code;
      this.dealTrendDrawLine();
    },
    turnAmount() {
      this.cur3 = 0;
      this.analyzeData = "JE";
      this.dealTrendDrawLine();
    },
    turnArea() {
      this.cur3 = 1;
      this.analyzeData = "MJ";
      this.dealTrendDrawLine();
    },
    turnNumber() {
      this.cur3 = 2;
      this.analyzeData = "ZS";
      this.dealTrendDrawLine();
    },
    dealTrendDrawLine() {
        //请求数据
        let params = this.params;
        params["startDate"] = this.timeStartData;
        params["endDate"] = this.timeEndData;
        params["cantonProvince"] = sessionStorage.getItem("dealProvince");
        params["cantonCity"] = this.cityCode;

        this.$get(
          `/epf-monitor/monitor/trans/queryTrendAnalysis`,
          params
        ).then(res => {
          console.log(res);
          let chartData = res.result;

          var transferAmountSeriesData = []; //转让金额图表数据
          var rentAmountSeriesData = []; //出租金额图表数据
          var mortgageAmountSeriesData = []; //抵押金额图表数据

          var transferAreaSeriesData = []; //转让面积图表数据
          var rentAreaSeriesData = []; //出租面积图表数据
          var mortgageAreaSeriesData = []; //抵押面积图表数据

          var transferNumberSeriesData = []; //转让宗数图表数据
          var rentNumberSeriesData = []; //出租宗数图表数据
          var mortgageNumberSeriesData = []; //抵押宗数图表数据

          var yearMonthData = []; //x轴时间名称图表数据

          var allAmountData = []; //全部金额数据
          var allAreaData = []; //全部面积数据
          var allNumberData = []; //全部宗数数据

          for (var key in chartData) {
            transferAmountSeriesData.push(chartData[key].transferAmount); //转让金额
            rentAmountSeriesData.push(chartData[key].rentAmount); //出租金额
            mortgageAmountSeriesData.push(chartData[key].mortgageAmount); //抵押金额

            transferAreaSeriesData.push(chartData[key].transferArea); //转让面积
            rentAreaSeriesData.push(chartData[key].rentArea); //出租面积
            mortgageAreaSeriesData.push(chartData[key].mortgageArea); //抵押面积

            transferNumberSeriesData.push(chartData[key].transferNumber); //转让宗数
            rentNumberSeriesData.push(chartData[key].rentNumber); //出租宗数
            mortgageNumberSeriesData.push(chartData[key].mortgageNumber); //抵押宗数

            yearMonthData.push(chartData[key].yearMonth); //x轴时间名称

            allAmountData.push(
              chartData[key].transferAmount,
              chartData[key].rentAmount,
              chartData[key].mortgageAmount
            ); //全部金额
            allAreaData.push(
              chartData[key].transferArea,
              chartData[key].rentArea,
              chartData[key].mortgageArea
            ); //全部面积
            allNumberData.push(
              chartData[key].transferNumber,
              chartData[key].rentNumber,
              chartData[key].mortgageNumber
            ); //全部宗数
          }
          var maxTransferAmountData = Math.max.apply(
            Math,
            transferAmountSeriesData
          ); //全部转让金额最大值
          var maxRentAmountData = Math.max.apply(Math, rentAmountSeriesData); //全部出租金额最大值
          var maxMortgageAmountData = Math.max.apply(
            Math,
            mortgageAmountSeriesData
          ); //全部抵押金额最大值

          var maxTransferAreaData = Math.max.apply(
            Math,
            transferAreaSeriesData
          ); //全部转让面积最大值
          var maxRentAreaData = Math.max.apply(Math, rentAreaSeriesData); //全部出租面积最大值
          var maxMortgageAreaData = Math.max.apply(
            Math,
            mortgageAreaSeriesData
          ); //全部抵押面积最大值

          var maxTransferNumberData = Math.max.apply(
            Math,
            transferNumberSeriesData
          ); //全部转让宗数最大值
          var maxRentNumberData = Math.max.apply(Math, rentNumberSeriesData); //全部出租宗数最大值
          var maxMortgageNumberData = Math.max.apply(
            Math,
            mortgageNumberSeriesData
          ); //全部抵押宗数最大值

          var maxAmountData = Math.max.apply(Math, allAmountData); //全部金额最大值
          var maxAreaData = Math.max.apply(Math, allAreaData); //全部面积最大值
          var maxNumberData = Math.max.apply(Math, allNumberData); //全部宗数最大值

          console.log(transferAmountSeriesData);
          console.log(rentAmountSeriesData);
          console.log(mortgageAmountSeriesData);
          console.log(11111111111111111111111111111111111111);
          console.log(transferAreaSeriesData);
          console.log(rentAreaSeriesData);
          console.log(mortgageAreaSeriesData);
          console.log(11111111111111111111111111111111111111);
          console.log(transferNumberSeriesData);
          console.log(rentNumberSeriesData);
          console.log(mortgageNumberSeriesData);
          console.log(11111111111111111111111111111111111111);

          var unitName = "";
          if (this.analyzeData == "JE") {
            unitName = "单位：万元";
          } else if (this.analyzeData == "MJ") {
            unitName = "单位：万平方米";
          } else if (this.analyzeData == "ZS") {
            unitName = "单位：宗";
          }
          if (this.typeData == "transfer") {
            if (this.analyzeData == "JE") {
              this.lineData=[
                {
                  name: '转让',
                  color:'#7fbdf8',
                  data:transferAmountSeriesData,
                  XAxis:yearMonthData,
                  yAxisName:unitName
                },
              ]
            } else if (this.analyzeData == "MJ") {
              this.lineData=[
                {
                  name: '转让',
                  color:'#7fbdf8',
                  data:transferAreaSeriesData,
                  XAxis:yearMonthData,
                  yAxisName:unitName
                },
              ]
            } else if (this.analyzeData == "ZS") {
              this.lineData=[
                {
                  name: '转让',
                  color:'#7fbdf8',
                  data:transferNumberSeriesData,
                  XAxis:yearMonthData,
                  yAxisName:unitName
                },
              ]
            }
          } else if (this.typeData == "rent") {
            if (this.analyzeData == "JE") {
              this.lineData=[
                {
                  name: '出租',
                  color:'#1ac6b7',
                  data:rentAmountSeriesData,
                  XAxis:yearMonthData,
                  yAxisName:unitName
                },
              ]
            } else if (this.analyzeData == "MJ") {
              this.lineData=[
                {
                  name: '出租',
                  color:'#1ac6b7',
                  data:rentAreaSeriesData,
                  XAxis:yearMonthData,
                  yAxisName:unitName
                },
              ]
            } else if (this.analyzeData == "ZS") {
              this.lineData=[
                {
                  name: '出租',
                  color:'#1ac6b7',
                  data:rentNumberSeriesData,
                  XAxis:yearMonthData,
                  yAxisName:unitName
                },
              ]
            }
          } else if (this.typeData == "mortgage") {
            if (this.analyzeData == "JE") {
              this.lineData=[
                {
                  name: '抵押',
                  color:'#ffa060',
                  data:mortgageAmountSeriesData,
                  XAxis:yearMonthData,
                  yAxisName:unitName
                },
              ]
            } else if (this.analyzeData == "MJ") {
              this.lineData=[
                {
                  name: '抵押',
                  color:'#ffa060',
                  data:mortgageAreaSeriesData,
                  XAxis:yearMonthData,
                  yAxisName:unitName
                },
              ]
            } else if (this.analyzeData == "ZS") {
              this.lineData=[
                {
                  name: '抵押',
                  color:'#ffa060',
                  data:mortgageNumberSeriesData,
                  XAxis:yearMonthData,
                  yAxisName:unitName
                },
              ]
            }
          } else if (this.typeData == "") {
            if (this.analyzeData == "JE") {
              this.lineData=[
                {
                  name: '转让',
                  color:'#7fbdf8',
                  data:transferAmountSeriesData,
                  XAxis:yearMonthData,
                  yAxisName:unitName
                },
                {
                  name: '出租',
                  color:'#2ac6b7',
                  data:rentAmountSeriesData,
                  XAxis:yearMonthData,
                  yAxisName:unitName
                },
                {
                  name: '抵押',
                  color:'#ffa060',
                  data:mortgageAmountSeriesData,
                  XAxis:yearMonthData,
                  yAxisName:unitName
                },
              ]
            } else if (this.analyzeData == "MJ") {
              this.lineData=[
                {
                  name: '转让',
                  color:'#7fbdf8',
                  data:transferAreaSeriesData,
                  XAxis:yearMonthData,
                  yAxisName:unitName
                },
                {
                  name: '出租',
                  color:'#2ac6b7',
                  data:rentAreaSeriesData,
                  XAxis:yearMonthData,
                  yAxisName:unitName
                },
                {
                  name: '抵押',
                  color:'#ffa060',
                  data:mortgageAreaSeriesData,
                  XAxis:yearMonthData,
                  yAxisName:unitName
                },
              ]

            } else if (this.analyzeData == "ZS") {
              this.lineData=[
                {
                  name: '转让',
                  color:'#7fbdf8',
                  data:transferNumberSeriesData,
                  XAxis:yearMonthData,
                  yAxisName:unitName
                },
                {
                  name: '出租',
                  color:'#2ac6b7',
                  data:rentNumberSeriesData,
                  XAxis:yearMonthData,
                  yAxisName:unitName
                },
                {
                  name: '抵押',
                  color:'#ffa060',
                  data:mortgageNumberSeriesData,
                  XAxis:yearMonthData,
                  yAxisName:unitName
                },
              ]}
          }

          // 绘制图表
          function lookTrendData(
            maxData,
            transferName,
            transferData,
            rentName,
            rentData,
            mortgageName,
            mortgageData
           ) {
            dealTrendChart.setOption({
              title: {
                textStyle: {
                  align: "center",
                  color: "#333",
                  fontSize: 20
                },
                top: "3%",
                left: "10%"
              },
              backgroundColor: "#fff",
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
                left: "30%",
                top: "0%",
                data: ["转让", "出租", "抵押"]
              },
              xAxis: [
                {
                  name: "时间",
                  nameLocation: "end",
                  nameTextStyle: {
                    color: "#333",
                    fontSize: 12,
                    padding: 10
                  },
                  data: yearMonthData,
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
                }
              ],
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
                  name: unitName,
                  type: "value",
                  interval: Math.ceil(maxData / 5),
                  max: Math.ceil(maxData),
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
              series: [
                {
                  name: transferName,
                  type: "line",
                  yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                  smooth: true, //平滑曲线显示
                  showAllSymbol: false, //显示所有图形。
                  symbol: "circle", //标记的图形为实心圆
                  symbolSize: 2, //标记的大小
                  color: "#7fbdf8",
                  itemStyle: {
                    //折线拐点标志的样式
                    normal: {
                      lineStyle: {
                        width: 3, // 0.1的线条是非常细的了
                        color: "#7fbdf8" //
                      }
                    }
                  },
                  lineStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#436cd1"
                      },
                      {
                        offset: 1,
                        color: "#7ab5f4"
                      }
                    ])
                  },
                  data: transferData
                },
                {
                  name: rentName,
                  type: "line",
                  yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                  smooth: true, //平滑曲线显示
                  showAllSymbol: false, //显示所有图形。
                  symbol: "circle", //标记的图形为实心圆
                  symbolSize: 2, //标记的大小
                  color: "#1ac6b7",
                  itemStyle: {
                    //折线拐点标志的样式
                    normal: {
                      lineStyle: {
                        width: 3, // 0.1的线条是非常细的了
                        color: "#1ac6b7" //
                      }
                    }
                  },
                  lineStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#1ac6b7"
                      },
                      {
                        offset: 1,
                        color: "#01e8d4"
                      }
                    ])
                  },
                  data: rentData
                },
                {
                  name: mortgageName,
                  type: "line",
                  yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                  smooth: true, //平滑曲线显示
                  showAllSymbol: false, //显示所有图形。
                  symbol: "circle", //标记的图形为实心圆
                  symbolSize: 2, //标记的大小
                  color: "#ffa060",
                  itemStyle: {
                    //折线拐点标志的样式
                    normal: {
                      lineStyle: {
                        width: 3, // 0.1的线条是非常细的了
                        color: "#ffa060" //
                      }
                    }
                  },
                  lineStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#ffbc6e"
                      },
                      {
                        offset: 1,
                        color: "#ffa060"
                      }
                    ])
                  },
                  data: mortgageData
                }
              ]
            });
          }

          // if (this.typeData == "transfer") {
          //   if (this.analyzeData == "JE") {
          //     lookTrendData(
          //       maxTransferAmountData,
          //       "转让",
          //       transferAmountSeriesData,
          //       "",
          //       "",
          //       "",
          //       ""
          //     );
          //   } else if (this.analyzeData == "MJ") {
          //     lookTrendData(
          //       maxTransferAreaData,
          //       "转让",
          //       transferAreaSeriesData,
          //       "",
          //       "",
          //       "",
          //       ""
          //     );
          //   } else if (this.analyzeData == "ZS") {
          //     lookTrendData(
          //       maxTransferNumberData,
          //       "转让",
          //       transferNumberSeriesData,
          //       "",
          //       "",
          //       "",
          //       ""
          //     );
          //   }
          // } else if (this.typeData == "rent") {
          //   if (this.analyzeData == "JE") {
          //     lookTrendData(
          //       maxRentAmountData,
          //       "",
          //       "",
          //       "出租",
          //       rentAmountSeriesData,
          //       "",
          //       ""
          //     );
          //   } else if (this.analyzeData == "MJ") {
          //     lookTrendData(
          //       maxRentAreaData,
          //       "",
          //       "",
          //       "出租",
          //       rentAreaSeriesData,
          //       "",
          //       ""
          //     );
          //   } else if (this.analyzeData == "ZS") {
          //     lookTrendData(
          //       maxRentNumberData,
          //       "",
          //       "",
          //       "出租",
          //       rentNumberSeriesData,
          //       "",
          //       ""
          //     );
          //   }
          // } else if (this.typeData == "mortgage") {
          //   if (this.analyzeData == "JE") {
          //     lookTrendData(
          //       maxMortgageAmountData,
          //       "",
          //       "",
          //       "",
          //       "",
          //       "抵押",
          //       mortgageAmountSeriesData
          //     );
          //   } else if (this.analyzeData == "MJ") {
          //     lookTrendData(
          //       maxMortgageAreaData,
          //       "",
          //       "",
          //       "",
          //       "",
          //       "抵押",
          //       mortgageAreaSeriesData
          //     );
          //   } else if (this.analyzeData == "ZS") {
          //     lookTrendData(
          //       maxMortgageNumberData,
          //       "",
          //       "",
          //       "",
          //       "",
          //       "抵押",
          //       mortgageNumberSeriesData
          //     );
          //   }
          // } else if (this.typeData == "") {
          //   if (this.analyzeData == "JE") {
          //     lookTrendData(
          //       maxAmountData,
          //       "转让",
          //       transferAmountSeriesData,
          //       "出租",
          //       rentAmountSeriesData,
          //       "抵押",
          //       mortgageAmountSeriesData
          //     );
          //   } else if (this.analyzeData == "MJ") {
          //     lookTrendData(
          //       maxAreaData,
          //       "转让",
          //       transferAreaSeriesData,
          //       "出租",
          //       rentAreaSeriesData,
          //       "抵押",
          //       mortgageAreaSeriesData
          //     );
          //   } else if (this.analyzeData == "ZS") {
          //     lookTrendData(
          //       maxNumberData,
          //       "转让",
          //       transferNumberSeriesData,
          //       "出租",
          //       rentNumberSeriesData,
          //       "抵押",
          //       mortgageNumberSeriesData
          //     );
          //   }
          // }
        // });
      });
    },
  },
  mounted() {
    this.dealTrendDrawLine();
  },
  created() {
    this.typeData = this.dealMessage;
    this.analyzeData = this.analyzeMessage;
    this.timeStartData = this.timeStartMessage;
    this.timeEndData = this.timeEndMessage;
  },
  watch: {
    dealMessage(val) {
      this.typeData = val;
      console.log(this.typeData);
      this.dealTrendDrawLine();
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
      this.dealTrendDrawLine();
    },
    timeStartMessage(val) {
      this.timeStartData = val;
      console.log(this.timeStartData);
      this.dealTrendDrawLine();
    },
    timeEndMessage(val) {
      this.timeEndData = val;
      console.log(this.timeEndData);
      this.dealTrendDrawLine();
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
