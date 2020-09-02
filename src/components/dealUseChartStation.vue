<template>
  <div id="dealUse">
    <div class="chart_big_tilte">交易用途对比统计（{{analyzeTitle}}）</div>
    <ul class="chart_tab_tilte">
      <li @click="turnTransfer" :class="{active:cur==0}">转让</li>
      <i style="margin:0 15px;">丨</i>
      <li @click="turnRent" :class="{active:cur==1}">出租</li>
      <i style="margin:0 15px;">丨</i>
      <li @click="turnMortgage" :class="{active:cur==2}" style="margin-right:15px;">抵押</li>
    </ul>
    <div class="chart_tab_content">
      <div id="dealUseChart" style="width:100%;height:190px;margin:15px 0;" ref="dealChart"></div>
      <div class="sum_box_big2">
        <div class="sum_dealbox">
          <span v-if="(this.typeData=='transfer'||this.typeData=='')&&this.analyzeData=='JE'">
            <img src="../../static/css/img/monitor/钱.png" alt class="img_icon" />
            ¥{{transferAmountSum}}万元
          </span>
          <span v-if="(this.typeData=='transfer'||this.typeData=='')&&this.analyzeData=='MJ'">
            <img
              src="../../static/css/img/monitor/地块2.png"
              alt
              class="img_icon"
              style="width:18px;height:18px;"
            />
            {{transferAreaSum}}万平方米
          </span>
          <span v-if="(this.typeData=='transfer'||this.typeData=='')&&this.analyzeData=='ZS'">
            <img src="../../static/css/img/monitor/组68.png" alt class="img_icon" />
            {{transferNumberSum}}宗
          </span>
          <span v-if="this.typeData=='rent'&&this.analyzeData=='JE'">
            <img src="../../static/css/img/monitor/钱.png" alt class="img_icon" />
            ¥{{rentAmountSum}}万元
          </span>
          <span v-if="this.typeData=='rent'&&this.analyzeData=='MJ'">
            <img
              src="../../static/css/img/monitor/地块2.png"
              alt
              class="img_icon"
              style="width:18px;height:18px;"
            />
            {{rentAreaSum}}万平方米
          </span>
          <span v-if="this.typeData=='rent'&&this.analyzeData=='ZS'">
            <img src="../../static/css/img/monitor/组68.png" alt class="img_icon" />
            {{rentNumberSum}}宗
          </span>
          <span v-if="this.typeData=='mortgage'&&this.analyzeData=='JE'">
            <img src="../../static/css/img/monitor/钱.png" alt class="img_icon" />
            ¥{{mortgageAmountSum}}万元
          </span>
          <span v-if="this.typeData=='mortgage'&&this.analyzeData=='MJ'">
            <img
              src="../../static/css/img/monitor/地块2.png"
              alt
              class="img_icon"
              style="width:18px;height:18px;"
            />
            {{mortgageAreaSum}}万平方米
          </span>
          <span v-if="this.typeData=='mortgage'&&this.analyzeData=='ZS'">
            <img src="../../static/css/img/monitor/组68.png" alt class="img_icon" />
            {{mortgageNumberSum}}宗
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import echarts from "echarts";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  props: [
    "dealMessage",
    "analyzeMessage",
    "timeStartMessage",
    "timeEndMessage"
  ],
  data() {
    return {
      cityCode: "",
      cur: 0, //默认选中第一个tab
      analyzeTitle: "金额",

      typeData: "",
      analyzeData: "",
      timeStartData: "",
      timeEndData: "",

      params: {
        cantonProvince: "",
        startDate: "",
        endDate: ""
      },

      //交易用途对比统计数据
      transferAmountSum: "", //转让金额总和
      transferAreaSum: "", //转让面积总和
      transferNumberSum: "", //转让宗数总和
      rentAmountSum: "", //出租金额总和
      rentNumberSum: "", //出租宗数总和
      rentAreaSum: "", //出租面积总和
      mortgageAmountSum: "", //抵押金额总和
      mortgageAreaSum: "", //抵押面积总和
      mortgageNumberSum: "" //抵押宗数总和
    };
  },
  methods: {
    haveCity(code){
      this.cityCode = code;
      this.dealUseDrawLine();
    },
    turnTransfer() {
      this.cur = 0;
      this.typeData = "transfer";
      this.dealUseDrawLine();
    },
    turnRent() {
      this.cur = 1;
      this.typeData = "rent";
      this.dealUseDrawLine();
    },
    turnMortgage() {
      this.cur = 2;
      this.typeData = "mortgage";
      this.dealUseDrawLine();
    },
    dealUseDrawLine() {
      this.$nextTick(() => {
        setTimeout(() => {
          document.getElementById("dealUseChart").style.width = 100 + "%";
          let dealUseChart = echarts.init(
            document.getElementById("dealUseChart")
          );
          dealUseChart.resize(); //直接加这句即可
        }, 0);
        let dealUseChart = echarts.init(
          document.getElementById("dealUseChart")
        );

        //请求数据
        let params = this.params;
        params["startDate"] = this.timeStartData;
        params["endDate"] = this.timeEndData;
        params["cantonProvince"] = sessionStorage.getItem("dealProvince");
        params["cantonCity"] = this.cityCode;

        this.$get(
          `/epf-monitor/monitor/trans/queryUseContrast`,
          params
        ).then(res => {
          console.log(res);
          if (res.code == "0") {
            let chartData = res.result;

            var transferAmountSeriesData = []; //转让金额图表数据
            var transferAreaSeriesData = []; //转让面积图表数据
            var transferNumberSeriesData = []; //转让宗数图表数据

            var rentAmountSeriesData = []; //出租金额图表数据
            var rentAreaSeriesData = []; //出租面积图表数据
            var rentNumberSeriesData = []; //出租宗数图表数据

            var mortgageAmountSeriesData = []; //抵押金额图表数据
            var mortgageAreaSeriesData = []; //抵押面积图表数据
            var mortgageNumberSeriesData = []; //抵押宗数图表数据

            var controlData = []; //控件名数组

            var transferAmountData = []; //转让金额求和数组
            var transferAreaData = []; //转让面积求和数组
            var transferNumberData = []; //转让宗数求和数组

            var rentAmountData = []; //出租金额求和数组
            var rentAreaData = []; //出租面积求和数组
            var rentNumberData = []; //出租宗数求和数组

            var mortgageAmountData = []; //抵押金额求和数组
            var mortgageAreaData = []; //抵押面积求和数组
            var mortgageNumberData = []; //抵押宗数求和数组

            for (var key in chartData) {
              transferAmountSeriesData.push({
                value: chartData[key].transferAmount,
                name: chartData[key].firstClassUseName
              }); //转让金额
              transferAreaSeriesData.push({
                value: chartData[key].transferArea,
                name: chartData[key].firstClassUseName
              }); //转让面积
              transferNumberSeriesData.push({
                value: chartData[key].transferNumber,
                name: chartData[key].firstClassUseName
              }); //转让宗数

              rentAmountSeriesData.push({
                value: chartData[key].rentAmount,
                name: chartData[key].firstClassUseName
              }); //出租金额
              rentAreaSeriesData.push({
                value: chartData[key].rentArea,
                name: chartData[key].firstClassUseName
              }); //出租面积
              rentNumberSeriesData.push({
                value: chartData[key].rentNumber,
                name: chartData[key].firstClassUseName
              }); //出租宗数

              mortgageAmountSeriesData.push({
                value: chartData[key].mortgageAmount,
                name: chartData[key].firstClassUseName
              }); //抵押金额
              mortgageAreaSeriesData.push({
                value: chartData[key].mortgageArea,
                name: chartData[key].firstClassUseName
              }); //抵押面积
              mortgageNumberSeriesData.push({
                value: chartData[key].mortgageNumber,
                name: chartData[key].firstClassUseName
              }); //抵押宗数

              controlData.push(chartData[key].firstClassUseName);

              transferAmountData.push(chartData[key].transferAmount);
              transferAreaData.push(chartData[key].transferArea);
              transferNumberData.push(chartData[key].transferNumber);

              rentAmountData.push(chartData[key].rentAmount);
              rentNumberData.push(chartData[key].rentNumber);
              rentAreaData.push(chartData[key].rentArea);

              mortgageAmountData.push(chartData[key].mortgageAmount);
              mortgageAreaData.push(chartData[key].mortgageArea);
              mortgageNumberData.push(chartData[key].mortgageNumber);
            }
            function sum(arr) {
              return eval(arr.join("+"));
            }

            this.transferAmountSum = sum(transferAmountData).toFixed(2); //转让金额总和
            this.transferAreaSum = sum(transferAreaData).toFixed(2); //转让面积总和
            this.transferNumberSum = sum(transferNumberData); //转让宗数总和

            this.rentAmountSum = sum(rentAmountData).toFixed(2); //出租金额总和
            this.rentNumberSum = sum(rentNumberData); //出租宗数总和
            this.rentAreaSum = sum(rentAreaData).toFixed(2); //出租面积总和

            this.mortgageAmountSum = sum(mortgageAmountData).toFixed(2); //抵押金额总和
            this.mortgageAreaSum = sum(mortgageAreaData).toFixed(2); //抵押面积总和
            this.mortgageNumberSum = sum(mortgageNumberData); //抵押宗数总和

            //控件分组
            var controlData1 = [];
            var controlData2 = [];
            for (var i = 0; i < controlData.length / 2; i++) {
              controlData1[i] = controlData[i * 2];
              controlData2[i] = controlData[i * 2 + 1];
            }

            console.log(this.transferAmountSum);
            console.log(this.transferAreaSum);
            console.log(this.transferNumberSum);
            console.log(11111111111111111111111111111111111111);
            console.log(this.rentAmountSum);
            console.log(this.rentAreaSum);
            console.log(this.rentNumberSum);
            console.log(11111111111111111111111111111111111111);
            console.log(this.mortgageAmountSum);
            console.log(this.mortgageAreaSum);
            console.log(this.mortgageNumberSum);
            console.log(11111111111111111111111111111111111111);

            var analyzeName = "";
            if (this.analyzeData == "JE") {
              analyzeName = "金额";
            } else if (this.analyzeData == "MJ") {
              analyzeName = "面积";
            } else if (this.analyzeData == "ZS") {
              analyzeName = "宗数";
            }
            // 绘制图表
            function lookDealUseData(useTypeData) {
              dealUseChart.setOption({
                tooltip: {
                  trigger: "item",
                  formatter: "{a} <br/>{b} : {c} "
                },
                legend: [
                  {
                    orient: "vertical",
                    data: controlData,
                    width:200,
                    right: "7%",
                    align: "left",
                    top: "middle",
                    itemWidth: 14,
                    itemHeight: 14,
                    formatter: function(name) {
                      var total = 0;
                      var target;
                      for (var i = 0, l = useTypeData.length; i < l; i++) {
                        total += useTypeData[i].value;
                        if (useTypeData[i].name == name) {
                          target = useTypeData[i].value;
                        }
                      }
                      var a = target !=0 ? ((target / total) * 100).toFixed(2) : 0;
                      return (
                        name + " " + a + "%"
                      );
                    },
                    itemGap: 15,
                    textStyle: {
                      color: "#666666",
                      fontSize: 14
                    }
                  },
                  // {
                  //   orient: "vertical",
                  //   data: controlData2,
                  //   right: "0%",
                  //   align: "left",
                  //   top: "middle",
                  //   itemWidth: 14,
                  //   itemHeight: 14,
                  //   formatter: function(name) {
                  //     var total = 0;
                  //     var target;
                  //     for (var i = 0, l = useTypeData.length; i < l; i++) {
                  //       total += useTypeData[i].value;
                  //       if (useTypeData[i].name == name) {
                  //         target = useTypeData[i].value;
                  //       }
                  //     }
                  //     var a = target !=0 ? ((target / total) * 100).toFixed(2) : 0;
                  //     return (
                  //       name + " " + a + "%"
                  //     );
                  //   },
                  //   itemGap: 15,
                  //   textStyle: {
                  //     color: "#666666",
                  //     fontSize: 14
                  //   }
                  // }
                ],
                color: [
                  "#35bece",
                  "#4cd39f",
                  "#8880f5",
                  "#73acf3",
                  "#ff7169",
                  "#ffba6d",
                  "#428fef",
                  "#ff7f9f"
                ],
                series: [
                  {
                    name: analyzeName,
                    type: "pie",
                    clockwise: false, //饼图的扇区是否是顺时针排布
                    minAngle: 2, //最小的扇区角度（0 ~ 360）
                    radius: ["50%", "80%"],
                    center: ["20%", "50%"],
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
                    data: useTypeData
                  }
                ]
              });
            }

            if (this.analyzeData == "JE") {
              if (this.typeData == "transfer" || this.typeData == "") {
                lookDealUseData(transferAmountSeriesData);
              } else if (this.typeData == "rent") {
                lookDealUseData(rentAmountSeriesData);
              } else if (this.typeData == "mortgage") {
                lookDealUseData(mortgageAmountSeriesData);
              }
            } else if (this.analyzeData == "MJ") {
              if (this.typeData == "transfer" || this.typeData == "") {
                lookDealUseData(transferAreaSeriesData);
              } else if (this.typeData == "rent") {
                lookDealUseData(rentAreaSeriesData);
              } else if (this.typeData == "mortgage") {
                lookDealUseData(mortgageAreaSeriesData);
              }
            } else if (this.analyzeData == "ZS") {
              if (this.typeData == "transfer" || this.typeData == "") {
                lookDealUseData(transferNumberSeriesData);
              } else if (this.typeData == "rent") {
                lookDealUseData(rentNumberSeriesData);
              } else if (this.typeData == "mortgage") {
                lookDealUseData(mortgageNumberSeriesData);
              }
            }
          } else {
            this.$message.error(res.msg); //失败
            return;
          }
        });
        // setTimeout(function() {
        //   dealUseChart.on("mouseover", function(params) {
        //     if (params.name == controlData1[0]) {
        //       dealUseChart.dispatchAction({
        //         type: "highlight",
        //         seriesIndex: 0,
        //         dataIndex: 0
        //       });
        //     } else {
        //       dealUseChart.dispatchAction({
        //         type: "downplay",
        //         seriesIndex: 0,
        //         dataIndex: 0
        //       });
        //     }
        //   });

        //   dealUseChart.on("mouseout", function(params) {
        //     dealUseChart.dispatchAction({
        //       type: "highlight",
        //       seriesIndex: 0,
        //       dataIndex: 0
        //     });
        //   });
        //   dealUseChart.dispatchAction({
        //     type: "highlight",
        //     seriesIndex: 0,
        //     dataIndex: 0
        //   });
        // }, 2000);
      });
    },
    initEchart() {
      window.addEventListener("resize", () => {
        let dealUseChart = echarts.init(
          document.getElementById("dealUseChart")
        );
        document.getElementById("dealUseChart").style.width = 100 + "%";
        dealUseChart.resize();
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.dealUseDrawLine();
    }, 1000);
    this.initEchart();
  },
  destroyed() {
    window.removeEventListener(
      "resize",
      () => {
        let dealUseChart = echarts.init(
          document.getElementById("dealUseChart")
        );
        document.getElementById("dealUseChart").style.width = 100 + "%";
        dealUseChart.resize();
      },
      20
    );
  },
  created() {
    this.typeData = this.dealMessage == '' ? 'transfer' : this.dealMessage;
    this.analyzeData = this.analyzeMessage;
    this.timeStartData = this.timeStartMessage;
    this.timeEndData = this.timeEndMessage;
    console.log(this.typeData);
    //console.log(this.analyzeData);
    console.log(this.timeStartData);
    console.log(this.timeEndData);
  },
  watch: {
    dealMessage(val) {
      this.typeData = val;
      console.log(this.typeData);
      if (this.typeData == "transfer" || this.typeData == "") {
        this.cur = 0;
      } else if (this.typeData == "rent") {
        this.cur = 1;
      } else if (this.typeData == "mortgage") {
        this.cur = 2;
      }
      this.dealUseDrawLine();
    },
    analyzeMessage(val) {
      this.analyzeData = val;
      //console.log(this.analyzeData);
      if (this.analyzeData == "JE") {
        this.analyzeTitle = "金额";
      } else if (this.analyzeData == "MJ") {
        this.analyzeTitle = "面积";
      } else if (this.analyzeData == "ZS") {
        this.analyzeTitle = "宗数";
      }
      this.dealUseDrawLine();
    },
    timeStartMessage(val) {
      this.timeStartData = val;
      console.log(this.timeStartData);
      this.dealUseDrawLine();
    },
    timeEndMessage(val) {
      this.timeEndData = val;
      console.log(this.timeEndData);
      this.dealUseDrawLine();
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
.sum_box_big2 {
  display: flex;
  width: 100%;
  justify-content: center;
  position: relative;
  bottom: 14px;
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
.sum_dealbox {
  padding: 8px;
  width: 40%;
  height: 60px;
  box-sizing: border-box;
  border: 1px solid #f6f6f5;
  background-color: #fff;
}
.sum_dealbox span {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f5;
  font-size: 14px;
}
.img_icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>
