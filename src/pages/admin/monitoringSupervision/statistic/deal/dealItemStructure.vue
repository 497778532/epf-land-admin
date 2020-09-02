<template>
  <!-- <div>项目交易结构分析</div> -->
  <div class="page-body">
    <div class="filter_wrap">
      <div
        class="switchHeight_box"
        :style="{
          overflow: !flexibleOpen ? 'hidden' : '',
          height: !flexibleOpen ? '73px' : 'auto'
        }"
      >
        <el-form :model="filterData" label-width="115px">
          <el-row type="flex" justify="start" class="ant-row ant-row-start">
            <el-col
              class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-16 ant-col-lg-16 ant-col-xl-16 ant-col-xxl-12"
              style="padding-left: 8px; padding-right: 8px;"
            >
              <el-form-item label="行政区域：">
                <div style="display: flex;justify-items: flex-start;">
                  <el-select
                    v-model="filterData.cantonProvinceName"
                    size="small"
                    placeholder="全部"
                    style="min-width:168px;margin-right:8px;"
                    @change="
                      provinceSelect(
                        dictionary.administrative_regions,
                        filterData.cantonProvinceName,
                        $event
                      )
                    "
                    :disabled="provinceCheck"
                  >
                    <el-option
                      v-for="(item, index) in dictionary.administrative_regions"
                      :ref="item.regionName"
                      :id="item.id"
                      :regionCode="item.regionCode"
                      :label="item.regionName"
                      :value="item.regionName"
                      :key="index"
                    ></el-option>
                  </el-select>
                  <el-select
                    v-model="filterData.cantonCityName"
                    size="small"
                    placeholder="全部"
                    style="min-width:168px;margin-right:8px;"
                    @change="
                      citySelect(
                        dictionary.cantonCity,
                        filterData.cantonCityName,
                        $event
                      )
                    "
                    :disabled="cityCheck"
                  >
                    <el-option
                      v-for="(item, index) in dictionary.cantonCity"
                      :ref="item.regionName"
                      :id="item.id"
                      :regionCode="item.regionCode"
                      :label="item.regionName"
                      :value="item.regionName"
                      :key="index"
                    ></el-option>
                  </el-select>
                  <el-select
                    v-model="filterData.cantonAreaName"
                    size="small"
                    placeholder="全部"
                    style="min-width:168px;"
                    @change="
                      areaSelect(
                        dictionary.cantonArea,
                        filterData.cantonAreaName,
                        $event
                      )
                    "
                    :disabled="AreaCheck"
                  >
                    <el-option
                      v-for="(item, index) in dictionary.cantonArea"
                      :ref="item.regionName"
                      :id="item.id"
                      :regionCode="item.regionCode"
                      :label="item.regionName"
                      :value="item.regionName"
                      :key="index"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
            <el-col
              class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-13 ant-col-xl-13 ant-col-xxl-12"
              style="padding-left: 8px; padding-right: 8px;"
              v-if="flexibleOpen"
            >
              <el-form-item label="用途：">
                <div style="display: flex;justify-items: flex-start;">
                  <el-select
                    v-model="filterData.firstClassUseName"
                    placeholder="全部"
                    style="min-width:190px;margin-right:9px;"
                    @change="
                      firstClassUseSelect(
                        dictionary,
                        filterData.firstClassUseName,
                        $event
                      )
                    "
                  >
                    <el-option
                      v-for="item in dictionary.land_use"
                      :ref="item.zhCn"
                      :dictKey="item.dictKey"
                      :id="item.id"
                      :label="item.zhCn"
                      :value="item.zhCn"
                      :key="item.id"
                    ></el-option>
                  </el-select>
                  <el-select
                    v-model="filterData.secondClassUseName"
                    placeholder="全部"
                    style="min-width:190px;"
                    @change="
                      secondClassUseSelect(
                        dictionary,
                        filterData.secondClassUseName,
                        $event
                      )
                    "
                  >
                    <el-option
                      v-for="(item, index) in dictionary.land_use_second"
                      :ref="item.zhCn"
                      :label="item.zhCn"
                      :dictKey="item.dictKey"
                      :value="item.zhCn"
                      :key="index"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
            <el-col
              class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-8 ant-col-xl-8 ant-col-xxl-6"
              style="padding-left: 8px; padding-right: 8px;"
              v-if="flexibleOpen"
            >
              <el-form-item label="土地性质：">
                <el-select
                  size="small"
                  v-model="filterData.landCharName"
                  placeholder="全部"
                  @change="
                    landCharSelect(
                      dictionary.land_nature,
                      filterData.landCharName,
                      $event
                    )
                  "
                >
                  <el-option
                    v-for="(item, index) in dictionary.land_nature"
                    :ref="item.zhCn"
                    :id="item.id"
                    :dictKey="item.dictKey"
                    :label="item.zhCn"
                    :value="item.zhCn"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-12 ant-col-xxl-8"
              style="padding-left: 8px; padding-right: 8px;"
              v-if="flexibleOpen"
            >
              <el-form-item label="交易时间：">
                <el-date-picker
                  v-model="dealTime"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col
              class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-8 ant-col-xl-8 ant-col-xxl-6"
              style="padding-left: 8px; padding-right: 8px;"
              v-if="flexibleOpen"
            >
              <el-form-item label="对比类型：">
                <el-select v-model="filterData.analyze" @change="analyzeSelect">
                  <el-option
                    v-for="item in analyzeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-8 ant-col-xl-8 ant-col-xxl-8"
              style="padding-left: 8px; padding-right: 8px;"
              v-if="flexibleOpen"
            >
              <el-form-item label="交易方式：">
                <el-select
                  size="small"
                  v-model="filterData.transMode"
                  placeholder="全部"
                >
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="委托交易" value="1"></el-option>
                  <el-option label="自行交易" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-8 ant-col-lg-6 ant-col-xl-6 ant-col-xxl-6"
              style="padding-left: 8px; padding-right: 8px;"
            >
              <el-form-item label-width="0">
                <div class="button_bg" @click="searchList()">查询</div>
                <div class="button_default" @click="resetFilter()">
                  重置
                </div>
                <span
                  class="flexibleSwitch"
                  @click="flexibleOpen = !flexibleOpen"
                >
                  {{ flexibleOpen ? "收起" : "展开" }}
                  <i
                    :class="
                      flexibleOpen
                        ? 'el-icon-caret-top'
                        : 'el-icon-caret-bottom'
                    "
                  ></i>
                </span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        style="margin:20px;width:100%;height:100%;"
      >
        <el-tab-pane
          label="转让"
          name="transfer"
          style="width:100%;height:100%;"
          lazy
        >
          <div
            id="structureTChart"
            style="width:100%;height:400px;margin-bottom:75px;"
          ></div>
        </el-tab-pane>
        <el-tab-pane
          label="出租"
          name="rent"
          style="width:100%;height:100%;"
          lazy
        >
          <div
            id="structureRChart"
            style="width:100%;height:400px;margin-bottom:75px;"
          ></div>
        </el-tab-pane>
        <el-tab-pane
          label="抵押"
          name="mortgage"
          style="width:100%;height:100%;"
          lazy
        >
          <div
            id="structureMChart"
            style="width:100%;height:400px;margin-bottom:75px;"
          ></div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
import qs from "qs";
import { mapActions, mapState } from "vuex";
import echarts from "echarts";

export default {
  name: "dealItemStructure",
  data() {
    return {
      flexibleOpen: false,
      //根据权限锁定省市
      provinceCheck: false,
      cityCheck: false,
      AreaCheck: false,
      activeName: "transfer",
      typeName: "transfer",
      dealTime: "",
      analyzeList: [
        {
          value: "JE",
          label: "金额"
        },
        {
          value: "MJ",
          label: "面积"
        },
        {
          value: "ZS",
          label: "宗数"
        }
      ],

      params: {
        cantonProvince: "",
        cantonCity: "",
        cantonArea: "",
        landChar: "",
        firstClassUse: "",
        secondClassUse: "",
        noticeDateBegin: "",
        noticeDateEnd: "",
        analyze: "面积",
        circulation: "",

        transMode: "" //交易方式
      },

      filterData: {
        cantonProvinceName: "", //省
        cantonProvince: "",
        cantonCityName: "", //市
        cantonCity: "",
        cantonAreaName: "", //区
        cantonArea: "",
        landCharName: "", //土地性质
        landChar: "",
        firstClassUseName: "", //一级土地用途
        firstClassUse: "",
        secondClassUseName: "", //二级土地用途
        secondClassUse: "",
        landTrans: "", //交易类型
        circulation: "",
        dealTime: "", //交易时间
        analyze: "面积", //对比类型

        transMode: "" //交易方式
      },
      dicRequest: ["flow_mode", "trans_status", "land_nature", "land_use"], //字典码请求
      dictionary: {
        //字典码结果
        flow_mode: "",
        trans_status: "",
        land_nature: "",
        land_use: "",
        administrative_regions: "",
        cantonCity: "",
        cantonArea: "",
        land_use_second: ""
      },
      dicNum: 0, //字典循环下标

      //日期选择器
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      dictObj: {
        dictKey: "",
        id: "",
        zhCn: "全部"
      }
    };
  },
  methods: {
    ...mapActions(["setTabsList"]),

    handleClick(val) {
      if (val.name == this.typeName) {
        return;
      }
      this.typeName = val.name;
      if (this.activeName == "transfer") {
        this.typeName = "transfer";
        const that = this;
        that.structureTDrawLine();
      } else if (this.activeName == "rent") {
        this.typeName = "rent";
        const that = this;
        that.structureRDrawLine();
      } else if (this.activeName == "mortgage") {
        this.typeName = "mortgage";
        const that = this;
        that.structureMDrawLine();
      }
    },

    structureTDrawLine() {
      this.$nextTick(() => {
        setTimeout(() => {
          let structureTChart = echarts.init(
            document.getElementById("structureTChart")
          );
          document.getElementById("structureTChart").style.width = 100 + "%";
          structureTChart.resize(); //直接加这句即可
        }, 0);
        let structureTChart = echarts.init(
          document.getElementById("structureTChart")
        );

        //请求数据
        let params = this.params;
        this.dealTime
          ? (params["noticeDateBegin"] = this.dealTime[0])
          : (params["noticeDateBegin"] = "");
        this.dealTime
          ? (params["noticeDateEnd"] = this.dealTime[1])
          : (params["noticeDateEnd"] = "");
        params["circulation"] = "transfer";
        params["analyze"] = this.filterData.analyze;

        // this.$get(`/epf-monitor/statistics/trans/queryGroupByClassUse`,params).then(res => {
        this.$get(
          `/epf-monitor/statistics/trans/queryGroupByClassUse`,
          params
        ).then(res => {
          console.log(res);
          let chartData = res.result;

          var controlData = []; //控件名数组

          var amountSeriesData = []; //金额图表数据
          var areaSeriesData = []; //面积图表数据
          var numberSeriesData = []; //宗数图表数据

          if (chartData == "" || chartData == null || chartData == []) {
            controlData.push("暂无数据");
            amountSeriesData.push({
              value: 0,
              name: "暂无数据"
            });
            areaSeriesData.push({
              value: 0,
              name: "暂无数据"
            });
            numberSeriesData.push({
              value: 0,
              name: "暂无数据"
            });
          } else {
            for (var key in chartData) {
              if (chartData[key].secondClassUse) {
                controlData.push(chartData[key].secondClassUseName);
              } else if (chartData[key].firstClassUse) {
                controlData.push(chartData[key].firstClassUseName);
              }

              if (chartData[key].secondClassUse) {
                amountSeriesData.push({
                  value: chartData[key].transPrice,
                  name: chartData[key].secondClassUseName
                });
              } else if (chartData[key].firstClassUse) {
                amountSeriesData.push({
                  value: chartData[key].transPrice,
                  name: chartData[key].firstClassUseName
                });
              }

              if (chartData[key].secondClassUse) {
                areaSeriesData.push({
                  value: chartData[key].areaSum,
                  name: chartData[key].secondClassUseName
                });
              } else if (chartData[key].firstClassUse) {
                areaSeriesData.push({
                  value: chartData[key].areaSum,
                  name: chartData[key].firstClassUseName
                });
              }

              if (chartData[key].secondClassUse) {
                numberSeriesData.push({
                  value: chartData[key].resulCount,
                  name: chartData[key].secondClassUseName
                });
              } else if (chartData[key].firstClassUse) {
                numberSeriesData.push({
                  value: chartData[key].resulCount,
                  name: chartData[key].firstClassUseName
                });
              }
            }
          }
          console.log(controlData);

          var analyzeName = "";
          var unitName = "";
          var seriesData = []; //图表数据
          if (this.filterData.analyze == "金额") {
            analyzeName = "金额";
            unitName = "万元";
            seriesData = amountSeriesData;
          } else if (this.filterData.analyze == "面积") {
            analyzeName = "面积";
            unitName = "万平方米";
            seriesData = areaSeriesData;
          } else if (this.filterData.analyze == "宗数") {
            analyzeName = "宗数";
            unitName = "宗";
            seriesData = numberSeriesData;
          }

          console.log(seriesData);

          // 绘制图表

          structureTChart.setOption({
            tooltip: {
              trigger: "item",
              formatter: "{b} <br/>{a} : {c} " + unitName
            },
            legend: [
              {
                data: controlData,
                top: "2%",
                itemWidth: 14,
                itemHeight: 14,

                formatter: function(name) {
                  var total = 0;
                  var target;
                  for (var i = 0, l = seriesData.length; i < l; i++) {
                    total += seriesData[i].value;
                    if (seriesData[i].name == name) {
                      target = seriesData[i].value;
                    }
                  }
                  var a = target != 0 ? ((target / total) * 100).toFixed(2) : 0;
                  return name + " " + a + "%";
                },
                itemGap: 50,
                textStyle: {
                  color: "#666666",
                  fontSize: 14
                }
              }
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
                center: ["50%", "55%"],
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
                    // formatter: "{text|{b}}\n{rate|{d}%}",
                    formatter: `{text|{b}(${analyzeName})}\n{rate|{d}%}`,
                    rich: {
                      text: {
                        color: "#666",
                        fontSize: 18,
                        align: "center",
                        verticalAlign: "middle",
                        padding: 8
                      },
                      rate: {
                        color: "#333",
                        fontSize: 21,
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
                data: seriesData
              }
            ]
          });
        });
      });
    },
    structureRDrawLine() {
      this.$nextTick(() => {
        setTimeout(() => {
          let structureRChart = echarts.init(
            document.getElementById("structureRChart")
          );
          document.getElementById("structureRChart").style.width = 100 + "%";
          structureRChart.resize(); //直接加这句即可
        }, 0);
        let structureRChart = echarts.init(
          document.getElementById("structureRChart")
        );

        //请求数据
        let params = this.params;
        this.dealTime
          ? (params["noticeDateBegin"] = this.dealTime[0])
          : (params["noticeDateBegin"] = "");
        this.dealTime
          ? (params["noticeDateEnd"] = this.dealTime[1])
          : (params["noticeDateEnd"] = "");
        params["circulation"] = "rent";
        params["analyze"] = this.filterData.analyze;

        // this.$get(`/epf-monitor/statistics/trans/queryGroupByClassUse`,params).then(res => {
        this.$get(
          `/epf-monitor/statistics/trans/queryGroupByClassUse`,
          params
        ).then(res => {
          console.log(res);
          let chartData = res.result;

          var controlData = []; //控件名数组

          var amountSeriesData = []; //金额图表数据
          var areaSeriesData = []; //面积图表数据
          var numberSeriesData = []; //宗数图表数据

          if (chartData == "" || chartData == null || chartData == []) {
            controlData.push("暂无数据");
            amountSeriesData.push({
              value: 0,
              name: "暂无数据"
            });
            areaSeriesData.push({
              value: 0,
              name: "暂无数据"
            });
            numberSeriesData.push({
              value: 0,
              name: "暂无数据"
            });
          } else {
            for (var key in chartData) {
              if (chartData[key].secondClassUse) {
                controlData.push(chartData[key].secondClassUseName);
              } else if (chartData[key].firstClassUse) {
                controlData.push(chartData[key].firstClassUseName);
              }

              if (chartData[key].secondClassUse) {
                amountSeriesData.push({
                  value: chartData[key].transPrice,
                  name: chartData[key].secondClassUseName
                });
              } else if (chartData[key].firstClassUse) {
                amountSeriesData.push({
                  value: chartData[key].transPrice,
                  name: chartData[key].firstClassUseName
                });
              }

              if (chartData[key].secondClassUse) {
                areaSeriesData.push({
                  value: chartData[key].areaSum,
                  name: chartData[key].secondClassUseName
                });
              } else if (chartData[key].firstClassUse) {
                areaSeriesData.push({
                  value: chartData[key].areaSum,
                  name: chartData[key].firstClassUseName
                });
              }

              if (chartData[key].secondClassUse) {
                numberSeriesData.push({
                  value: chartData[key].resulCount,
                  name: chartData[key].secondClassUseName
                });
              } else if (chartData[key].firstClassUse) {
                numberSeriesData.push({
                  value: chartData[key].resulCount,
                  name: chartData[key].firstClassUseName
                });
              }
            }
          }

          var analyzeName = "";
          var unitName = "";
          var seriesData = []; //图表数据
          if (this.filterData.analyze == "金额") {
            analyzeName = "金额";
            unitName = "万元";
            seriesData = amountSeriesData;
          } else if (this.filterData.analyze == "面积") {
            analyzeName = "面积";
            unitName = "万平方米";
            seriesData = areaSeriesData;
          } else if (this.filterData.analyze == "宗数") {
            analyzeName = "宗数";
            unitName = "宗";
            seriesData = numberSeriesData;
          }

          // 绘制图表

          structureRChart.setOption({
            tooltip: {
              trigger: "item",
              formatter: "{b} <br/>{a} : {c} " + unitName
            },
            legend: [
              {
                data: controlData,
                top: "2%",
                itemWidth: 14,
                itemHeight: 14,

                formatter: function(name) {
                  var total = 0;
                  var target;
                  for (var i = 0, l = seriesData.length; i < l; i++) {
                    total += seriesData[i].value;
                    if (seriesData[i].name == name) {
                      target = seriesData[i].value;
                    }
                  }
                  var a = target != 0 ? ((target / total) * 100).toFixed(2) : 0;
                  return name + " " + a + "%";
                },
                itemGap: 50,
                textStyle: {
                  color: "#666666",
                  fontSize: 14
                }
              }
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
                center: ["50%", "55%"],
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
                    // formatter: "{text|{b}}\n{rate|{d}%}",
                    formatter: `{text|{b}(${analyzeName})}\n{rate|{d}%}`,
                    rich: {
                      text: {
                        color: "#666",
                        fontSize: 18,
                        align: "center",
                        verticalAlign: "middle",
                        padding: 8
                      },
                      rate: {
                        color: "#333",
                        fontSize: 21,
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
                data: seriesData
              }
            ]
          });
        });
      });
    },
    structureMDrawLine() {
      this.$nextTick(() => {
        setTimeout(() => {
          let structureMChart = echarts.init(
            document.getElementById("structureMChart")
          );
          document.getElementById("structureMChart").style.width = 100 + "%";
          structureMChart.resize(); //直接加这句即可
        }, 0);
        let structureMChart = echarts.init(
          document.getElementById("structureMChart")
        );

        //请求数据
        let params = this.params;
        this.dealTime
          ? (params["noticeDateBegin"] = this.dealTime[0])
          : (params["noticeDateBegin"] = "");
        this.dealTime
          ? (params["noticeDateEnd"] = this.dealTime[1])
          : (params["noticeDateEnd"] = "");
        params["circulation"] = "mortgage";
        params["analyze"] = this.filterData.analyze;

        // this.$get(`/epf-monitor/statistics/trans/queryGroupByClassUse`,params).then(res => {
        this.$get(
          `/epf-monitor/statistics/trans/queryGroupByClassUse`,
          params
        ).then(res => {
          console.log(res);
          let chartData = res.result;

          var controlData = []; //控件名数组

          var amountSeriesData = []; //金额图表数据
          var areaSeriesData = []; //面积图表数据
          var numberSeriesData = []; //宗数图表数据

          if (chartData == "" || chartData == null || chartData == []) {
            controlData.push("暂无数据");
            amountSeriesData.push({
              value: 0,
              name: "暂无数据"
            });
            areaSeriesData.push({
              value: 0,
              name: "暂无数据"
            });
            numberSeriesData.push({
              value: 0,
              name: "暂无数据"
            });
          } else {
            for (var key in chartData) {
              if (chartData[key].secondClassUse) {
                controlData.push(chartData[key].secondClassUseName);
              } else if (chartData[key].firstClassUse) {
                controlData.push(chartData[key].firstClassUseName);
              }

              if (chartData[key].secondClassUse) {
                amountSeriesData.push({
                  value: chartData[key].transPrice,
                  name: chartData[key].secondClassUseName
                });
              } else if (chartData[key].firstClassUse) {
                amountSeriesData.push({
                  value: chartData[key].transPrice,
                  name: chartData[key].firstClassUseName
                });
              }

              if (chartData[key].secondClassUse) {
                areaSeriesData.push({
                  value: chartData[key].areaSum,
                  name: chartData[key].secondClassUseName
                });
              } else if (chartData[key].firstClassUse) {
                areaSeriesData.push({
                  value: chartData[key].areaSum,
                  name: chartData[key].firstClassUseName
                });
              }

              if (chartData[key].secondClassUse) {
                numberSeriesData.push({
                  value: chartData[key].resulCount,
                  name: chartData[key].secondClassUseName
                });
              } else if (chartData[key].firstClassUse) {
                numberSeriesData.push({
                  value: chartData[key].resulCount,
                  name: chartData[key].firstClassUseName
                });
              }
            }
          }
          var analyzeName = "";
          var unitName = "";
          var seriesData = []; //图表数据
          if (this.filterData.analyze == "金额") {
            analyzeName = "金额";
            unitName = "万元";
            seriesData = amountSeriesData;
          } else if (this.filterData.analyze == "面积") {
            analyzeName = "面积";
            unitName = "万平方米";
            seriesData = areaSeriesData;
          } else if (this.filterData.analyze == "宗数") {
            analyzeName = "宗数";
            unitName = "宗";
            seriesData = numberSeriesData;
          }

          // 绘制图表

          structureMChart.setOption({
            tooltip: {
              trigger: "item",
              formatter: "{b} <br/>{a} : {c} " + unitName
            },
            legend: [
              {
                data: controlData,
                top: "2%",
                itemWidth: 14,
                itemHeight: 14,

                formatter: function(name) {
                  var total = 0;
                  var target;
                  for (var i = 0, l = seriesData.length; i < l; i++) {
                    total += parseInt(seriesData[i].value);
                    if (seriesData[i].name == name) {
                      target = seriesData[i].value;
                    }
                  }
                  var a = target != 0 ? ((target / total) * 100).toFixed(2) : 0;
                  return name + " " + a + "%";
                },
                itemGap: 50,
                textStyle: {
                  color: "#666666",
                  fontSize: 14
                }
              }
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
                center: ["50%", "55%"],
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
                    // formatter: "{text|{b}}\n{rate|{d}%}",
                    formatter: `{text|{b}(${analyzeName})}\n{rate|{d}%}`,
                    rich: {
                      text: {
                        color: "#666",
                        fontSize: 18,
                        align: "center",
                        verticalAlign: "middle",
                        padding: 8
                      },
                      rate: {
                        color: "#333",
                        fontSize: 21,
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
                data: seriesData
              }
            ]
          });
        });
      });
    },
    initEchart() {
      window.addEventListener("resize", () => {
        let structureTChart = echarts.init(
          document.getElementById("structureTChart")
        );
        document.getElementById("structureTChart").style.width = 100 + "%";
        structureTChart.resize();
        let structureRChart = echarts.init(
          document.getElementById("structureRChart")
        );
        document.getElementById("structureRChart").style.width = 100 + "%";
        structureRChart.resize();
        let structureMChart = echarts.init(
          document.getElementById("structureMChart")
        );
        document.getElementById("structureMChart").style.width = 100 + "%";
        structureMChart.resize();
      });
    },
    resetFilter() {
      this.dealTime = "";
      for (let item in this.filterData) {
        // this.filterData[item] = "";
        if (
          (this.provinceCheck && item == "cantonProvince") ||
          (this.provinceCheck && item == "cantonProvinceName")
        ) {
          continue;
        } else if (
          (this.cityCheck && item == "cantonCity") ||
          (this.cityCheck && item == "cantonCityName")
        ) {
          continue;
        } else if (
          (this.AreaCheck && item == "cantonArea") ||
          (this.AreaCheck && item == "cantonAreaName")
        ) {
          continue;
        } else {
          this.filterData[item] = "";
        }
        this.filterData.analyze = "金额";
        // this.filterData.circulation = "transfer";
      }
    },
    searchList() {
      this.params = this.filterData;
      this.params["status"] = this.filterData.trans_status;
      if (this.dealTime) {
        this.params["noticeDateBegin"] = this.dealTime[0];
        this.params["noticeDateEnd"] = this.dealTime[1];
      }
      if (this.activeName == "transfer") {
        this.params["circulation"] = "transfer";
        const that = this;
        that.structureTDrawLine();
      } else if (this.activeName == "rent") {
        this.params["circulation"] = "rent";
        const that = this;
        that.structureRDrawLine();
      } else if (this.activeName == "mortgage") {
        this.params["circulation"] = "mortgage";
        const that = this;
        that.structureMDrawLine();
      }
      const that = this;
      that.structureTDrawLine();
      that.structureRDrawLine();
      that.structureMDrawLine();
    },

    //字典选择
    analyzeSelect(val) {
      this.filterData.analyze = val.label;
      this.params.analyze = val.label;
      console.log(this.filterData.analyze);
    },
    provinceSelect(dic, cantonCode, event) {
      this.filterData.cantonAreaName = "";
      this.filterData.cantonArea = "";
      this.cantonArea = "";
      this.filterData.cantonCityName = "";
      this.filterData.cantonCity = "";
      this.cantonCity = "";
      let pId = this.$refs[cantonCode][0].$attrs.id;
      this.filterData.cantonProvince = this.$refs[
        cantonCode
      ][0].$attrs.regionCode;

      this.$get(
        // `/epf-monitor/dictionaries/getDictsByCodeOrParentId?code=administrative_regions&parentId=${pId}`,
        `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,

        {}
      ).then(res => {
        console.log(res);
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonCity = res.dictionariesList;
          this.dictionary.cantonCity.unshift(this.dictObj);
          return;
        }
        this.dictionary.cantonCity = "";
      });
    },
    citySelect(dic, cantonCity, event) {
      this.filterData.cantonArea = "";
      this.filterData.cantonAreaName = "";
      this.cantonArea = "";
      let pId = this.$refs[cantonCity][0].$attrs.id;
      this.filterData.cantonCity = this.$refs[cantonCity][0].$attrs.regionCode;
      this.$get(
        // `/epf-monitor/dictionaries/getDictsByCodeOrParentId?code=administrative_regions&parentId=${pId}`,
        `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,

        {}
      ).then(res => {
        console.log(res);
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonArea = res.dictionariesList;
          this.dictionary.cantonArea.unshift(this.dictObj);
          return;
        }
        this.dictionary.cantonArea = "";
      });
    },
    areaSelect(dic, cantonCity, event) {
      this.filterData.cantonArea = this.$refs[cantonCity][0].$attrs.regionCode;
    },
    firstClassUseSelect(dic, firstClassUse, event) {
      this.filterData.secondClassUse = "";
      this.filterData.secondClassUseName = "";
      this.dictionary.land_use_second = "";
      let pId = this.$refs[firstClassUse][0].$attrs.id;
      this.filterData.firstClassUse = this.$refs[
        firstClassUse
      ][0].$attrs.dictKey;
      this.$get(
        `/epf-monitor/dictionaries/getDictsByCodeOrParentId?code=land_use&parentId=${pId}`,
        {}
      ).then(res => {
        console.log(res);
        if (res.dictionariesList.length != 0) {
          this.dictionary.land_use_second = res.dictionariesList;
          this.dictionary.land_use_second.unshift(this.dictObj);
          return;
        }
        this.dictionary.land_use_second = "";
      });
    },
    secondClassUseSelect(dic, firstClassUse, event) {
      this.filterData.secondClassUse = this.$refs[
        firstClassUse
      ][0].$attrs.dictKey;
    },
    circulationSelect(dic, circulationName, event) {
      this.filterData.circulation = this.$refs[
        circulationName
      ][0].$attrs.dictKey;
    },
    landCharSelect(dic, landCharName, event) {
      this.filterData.landChar = this.$refs[landCharName][0].$attrs.dictKey;
    },
    statusSelect(dic, trans_statusName, event) {
      this.filterData.trans_status = this.$refs[
        trans_statusName
      ][0].$attrs.dictKey;
    }
  },
  created() {
    const that = this;
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == "land_use") {
          this.$get(
            `/epf-monitor/dictionaries/getDictsByCodeOrParentId?code=${item}`,
            { parentId: 0 }
          ).then(res => {
            resolve(res);
          });
        } else {
          this.$get(
            `/epf-monitor/dictionaries/getDictEbyDictGroup/${item}`,
            {}
          ).then(res => {
            resolve(res);
          });
        }
      });
      return reqFun;
    });
    Promise.all(reqArr).then(res => {
      console.log(res);
      let dicArr = res.map(item => {
        console.log(item);
        let dicArr = item.dictionariesList.map(item => {
          return {
            dictKey: item.dictKey,
            zhCn: item.zhCn,
            id: item.id
          };
        });
        return dicArr;
      });
      console.log(dicArr);
      dicArr.forEach(function(item, index) {
        item.unshift(that.dictObj);
      });
      for (let item in this.dictionary) {
        console.log(this.dicNum);
        this.dictionary[item] = dicArr[this.dicNum];
        // console.log(dicArr[this.dicNum])
        this.dicNum++;
      }
      this.dicFinsh = true;
      console.log("字典结果", this.dictionary);
    });
    // @name: 行政区域
    // @description: 主要是getAreaByCodeOrParentId接口返回字段修改zhCn -> regionName，dictKey->regionCode
    // @author: gaojie
    // @chageTime:2020-3-3
    this.$get(
      `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000`,
      {}
    ).then(res => {
      this.dictionary.administrative_regions = res.dictionariesList;
    });

    if (sessionStorage.getItem("org_level") == "org_level-003") {
      this.provinceCheck = true;
      this.params.cantonProvince = sessionStorage.getItem("jgProvinceCode");
      this.params.cantonProvinceName = sessionStorage.getItem("jgProvince");
    } else if (sessionStorage.getItem("org_level") == "org_level-005") {
      this.provinceCheck = true;
      this.cityCheck = true;
      this.params.cantonProvince = sessionStorage.getItem("jgProvinceCode");
      this.params.cantonProvinceName = sessionStorage.getItem("jgProvince");
      this.params.cantonCity = sessionStorage.getItem("jgCityCode");
      this.params.cantonCityName = sessionStorage.getItem("jgCity");
    } else if (sessionStorage.getItem("org_level") == "org_level-004") {
      this.provinceCheck = true;
      this.cityCheck = true;
      this.AreaCheck = true;
      this.params.cantonProvince = sessionStorage.getItem("jgProvinceCode");
      this.params.cantonProvinceName = sessionStorage.getItem("jgProvince");
      this.params.cantonCity = sessionStorage.getItem("jgCityCode");
      this.params.cantonCityName = sessionStorage.getItem("jgCity");
      this.params.cantonArea = sessionStorage.getItem("jgAreaCode");
      this.params.cantonAreaName = sessionStorage.getItem("jgArea");
    }
  },
  mounted() {
    this.$nextTick(function() {
      setTimeout(() => {
        this.structureTDrawLine();
        this.structureRDrawLine();
        this.structureMDrawLine();
      }, 1000);
      this.initEchart();
    });

    setTimeout(() => {
      if (sessionStorage.getItem("org_level") == "org_level-003") {
        this.filterData.cantonProvince = sessionStorage.getItem(
          "jgProvinceCode"
        );
        this.filterData.cantonProvinceName = sessionStorage.getItem(
          "jgProvince"
        );
        this.provinceSelect("", this.filterData.cantonProvinceName, "");
      } else if (sessionStorage.getItem("org_level") == "org_level-005") {
        this.filterData.cantonProvince = sessionStorage.getItem(
          "jgProvinceCode"
        );
        this.filterData.cantonProvinceName = sessionStorage.getItem(
          "jgProvince"
        );
        this.provinceSelect("", this.filterData.cantonProvinceName, "");
        setTimeout(() => {
          this.filterData.cantonCity = sessionStorage.getItem("jgCityCode");
          this.filterData.cantonCityName = sessionStorage.getItem("jgCity");
          this.citySelect("", this.filterData.cantonCityName, "");
        }, 800);
      } else if (sessionStorage.getItem("org_level") == "org_level-004") {
        this.filterData.cantonProvince = sessionStorage.getItem(
          "jgProvinceCode"
        );
        this.filterData.cantonProvinceName = sessionStorage.getItem(
          "jgProvince"
        );
        // this.provinceSelect('',this.filterData.cantonProvinceName,'')
        // setTimeout(()=>{
        this.filterData.cantonCity = sessionStorage.getItem("jgCityCode");
        this.filterData.cantonCityName = sessionStorage.getItem("jgCity");
        // this.citySelect('',this.filterData.cantonCityName,'')
        // setTimeout(()=>{
        this.filterData.cantonArea = sessionStorage.getItem("jgAreaCode");
        this.filterData.cantonAreaName = sessionStorage.getItem("jgArea");
        //   },800)
        // },800)
      }
    }, 500);
  },
  destroyed() {
    window.removeEventListener("resize", () => {
      let structureTChart = echarts.init(
        document.getElementById("structureTChart")
      );
      document.getElementById("structureTChart").style.width = 100 + "%";
      structureTChart.resize();
      let structureRChart = echarts.init(
        document.getElementById("structureRChart")
      );
      document.getElementById("structureRChart").style.width = 100 + "%";
      structureRChart.resize();
      let structureMChart = echarts.init(
        document.getElementById("structureMChart")
      );
      document.getElementById("structureMChart").style.width = 100 + "%";
      structureMChart.resize();
    });
  },
  watch: {
    typeName(val, oldVal) {
      //普通的watch监听
      if (val == "transfer") {
        this.structureTDrawLine();
      } else if (val == "rent") {
        this.structureRDrawLine();
      } else if (val == "mortgage") {
        this.structureMDrawLine();
      }
    }
    //     "params.analyze"(val){
    // if (this.activeName== "transfer") {
    //         this.structureTDrawLine();
    //       } else if (this.activeName== "rent") {
    //         this.structureRDrawLine();
    //       } else if (this.activeName== "mortgage") {
    //         this.structureMDrawLine();
    //       }
    //     }
  }
};
</script>
<style scoped lang="scss">
.active {
  /deep/ .el-date-editor .el-range-separator {
    line-height: 25px;
  }
  /deep/ .el-date-editor .el-range__icon {
    line-height: 25px;
  }
}
.oper {
  float: right;
  font-weight: normal;
}
.oper span {
  display: inline-block;
  width: 80px;
  height: 32px;
  background-color: #ffa000;
  border-radius: 2px;
  margin-right: 16px;
  text-align: center;
  line-height: 32px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.oper span:nth-child(2) {
  border: solid 1px #d3d4d6;
  color: #606266;
  background: #fff;
}
.toolsTitleBox .oper span:nth-child(2) {
  border: solid 1px #d3d4d6;
  color: #fff;
  background: #ffa000;
}
.toolsTitleBox .oper span:nth-child(3) {
  border: solid 1px #d3d4d6;
  color: #606266;
  background: #fff;
}
.operCycle {
  font-weight: normal;
}
.operCycle .derive {
  float: right;
  width: 80px;
  height: 40px;
  background-color: #ffa000;
  border-radius: 2px;
  margin-right: 16px;
  margin-top: 12px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.dialogBtn_box {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.titleHoverStyle:hover {
  color: #4772d5 !important;
}
</style>
<style>
.el-input--small .el-input__inner {
  height: 32px;
}
</style>
