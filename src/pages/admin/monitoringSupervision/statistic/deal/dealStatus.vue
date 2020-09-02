<template>
  <!-- <div>交易状态对比</div> -->
  <div class="page-body">
    <el-tabs
      v-model="activeTabs"
      type="border-card"
      @tab-click="handleBigClick"
    >
      <!-- 转让交易状态对比 -->
      <el-tab-pane label="转让交易状态对比" name="transfer" lazy>
        <div class="filter_wrap">
          <dealSearch @filterInfo="getFilterData"></dealSearch>
          <el-tabs
            v-model="activeName"
            @tab-click="handleSmallClick"
            style="margin:25px 20px;height:100%;"
          >
            <el-tab-pane
              label="图形"
              name="graph"
              style="width:100%;height:100%; position: relative;"
              lazy
            >
              <div
                class="toolsTitleBox"
                style="background-color:#fff;border:0;"
              >
                <span></span>
                <span class="button_export"
                  ><a :href="href" style="color: #ffa000;">导出</a></span
                >
              </div>
              <div style="display:flex;justify-content:space-around;">
                <div
                  id="transferFailureChart"
                  style="width:40%;height:320px;border:1px solid #e3e4e6;margin:25px 0 200px 80px;"
                  ref="transferChart1"
                ></div>
                <div
                  id="transferSuccessChart"
                  style="width:40%;height:320px;border:1px solid #e3e4e6;margin:25px 80px 200px 0;"
                  ref="transferChart2"
                ></div>
              </div>
            </el-tab-pane>
            <el-tab-pane
              label="列表"
              name="list"
              style="width:100%;height:100%;margin-top:20px;"
            >
              <div class="toolsTitleBox">
                <span class="toolsTitle">数据列表</span>
                <span class="button_export">
                  <a :href="href" style="color: #ffa000;">导出</a></span
                >
              </div>
              <el-table
                ref="multipleTable"
                :data="dealData"
                v-loading="loading"
                element-loading-text="数据加载中"
                element-loading-background="rgba(255, 255, 255,0.95)"
                style="width: 100%;min-height:80px;"
                border
              >
                <el-table-column label="序号" min-width="100" align="center">
                  <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column label="行政区域" min-width="285">
                  <template slot-scope="scope">
                    <!-- <span>{{scope.row.cantonProvinceName}}/{{scope.row.cantonCityName}}/{{scope.row.cantonAreaName}}</span> -->
                    <span v-if="scope.row.cantonProvince == 'all'">全部</span>
                    <span v-if="scope.row.cantonProvince != 'all'">{{
                      scope.row.cantonProvinceName
                    }}</span>
                    <span v-if="scope.row.cantonCity != 'all'">/</span>
                    <span v-if="scope.row.cantonCity != 'all'">{{
                      scope.row.cantonCityName
                    }}</span>
                    <span v-if="scope.row.cantonArea != 'all'">/</span>
                    <span v-if="scope.row.cantonArea != 'all'">{{
                      scope.row.cantonAreaName
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="土地性质" min-width="200">
                  <template slot-scope="scope">
                    <span v-if="scope.row.landCharName == 'null'">全部</span>
                    <span v-if="scope.row.landCharName != 'null'">{{
                      scope.row.landCharName
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="用途" min-width="200">
                  <template slot-scope="scope">
                    <!-- <span>{{scope.row.firstClassUseName}}/{{scope.row.secondClassUseName}}</span> -->
                    <span v-if="scope.row.firstClassUse == 'all'">全部</span>
                    <span v-if="scope.row.firstClassUse != 'all'">{{
                      scope.row.firstClassUseName
                    }}</span>
                    <span v-if="scope.row.secondClassUse != 'all'">/</span>
                    <span v-if="scope.row.secondClassUse != 'all'">{{
                      scope.row.secondClassUseName
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="statusName"
                  label="交易状态"
                  min-width="150"
                ></el-table-column>
                <el-table-column
                  prop="sumCount"
                  label="宗数"
                  min-width="150"
                ></el-table-column>
                <el-table-column
                  prop="amount"
                  label="金额（万元）"
                  min-width="150"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.statusName == '流拍'">-</span>
                    <span v-else>{{ scope.row.amount }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="sumArea"
                  label="面积（万平方米）"
                  min-width="150"
                  fixed="right"
                ></el-table-column>
              </el-table>
              <div style="text-align:right;margin:22px 0px;">
                <el-pagination
                  background
                  layout="total,prev, pager, next,sizes,jumper"
                  :page-sizes="[1, 5, 10, 15, 20]"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :total="totalRecord"
                  :current-page="currentPage"
                  :page-size="pageSize"
                ></el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-tab-pane>
      <!-- 出租交易状态对比 -->
      <el-tab-pane label="出租交易状态对比" name="rent" lazy>
        <div class="filter_wrap">
          <dealSearch @filterInfo="getFilterData"></dealSearch>
          <el-tabs
            v-model="activeName"
            @tab-click="handleSmallClick"
            style="margin:25px 20px;height:100%;"
          >
            <el-tab-pane
              label="图形"
              name="graph"
              style="width:100%;height:100%; position: relative;"
              lazy
            >
              <div
                class="toolsTitleBox"
                style="background-color:#fff;border:0;"
              >
                <span></span>
                <span class="button_export">
                  <a :href="href" style="color: #ffa000;">导出</a>
                </span>
              </div>
              <div style="display:flex;justify-content:space-around;">
                <div
                  id="rentFailureChart"
                  style="width:40%;height:320px;border:1px solid #e3e4e6;margin:25px 0 200px 80px;"
                  ref="rentChart1"
                ></div>
                <div
                  id="rentSuccessChart"
                  style="width:40%;height:320px;border:1px solid #e3e4e6;margin:25px 80px 200px 0;"
                  ref="rentChart2"
                ></div>
              </div>
            </el-tab-pane>
            <el-tab-pane
              label="列表"
              name="list"
              style="width:100%;height:100%;margin-top:20px;"
            >
              <div class="toolsTitleBox">
                <span class="toolsTitle">数据列表</span>
                <span class="button_export">
                  <a :href="href" style="color: #ffa000;">导出</a></span
                >
              </div>
              <el-table
                ref="multipleTable"
                :data="dealData"
                v-loading="loading"
                element-loading-text="数据加载中"
                element-loading-background="rgba(255, 255, 255,0.95)"
                style="width: 100%;min-height:80px;"
                border
              >
                <el-table-column label="序号" min-width="100" align="center">
                  <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column label="行政区域" min-width="285">
                  <template slot-scope="scope">
                    <!-- <span>{{scope.row.cantonProvinceName}}/{{scope.row.cantonCityName}}/{{scope.row.cantonAreaName}}</span> -->
                    <span v-if="scope.row.cantonProvince == 'all'">全部</span>
                    <span v-if="scope.row.cantonProvince != 'all'">{{
                      scope.row.cantonProvinceName
                    }}</span>
                    <span v-if="scope.row.cantonCity != 'all'">/</span>
                    <span v-if="scope.row.cantonCity != 'all'">{{
                      scope.row.cantonCityName
                    }}</span>
                    <span v-if="scope.row.cantonArea != 'all'">/</span>
                    <span v-if="scope.row.cantonArea != 'all'">{{
                      scope.row.cantonAreaName
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="土地性质" min-width="200">
                  <template slot-scope="scope">
                    <span v-if="scope.row.landCharName == 'null'">全部</span>
                    <span v-if="scope.row.landCharName != 'null'">{{
                      scope.row.landCharName
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="用途" min-width="200">
                  <template slot-scope="scope">
                    <!-- <span>{{scope.row.firstClassUseName}}/{{scope.row.secondClassUseName}}</span> -->
                    <span v-if="scope.row.firstClassUse == 'all'">全部</span>
                    <span v-if="scope.row.firstClassUse != 'all'">{{
                      scope.row.firstClassUseName
                    }}</span>
                    <span v-if="scope.row.secondClassUse != 'all'">/</span>
                    <span v-if="scope.row.secondClassUse != 'all'">{{
                      scope.row.secondClassUseName
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="statusName"
                  label="交易状态"
                  min-width="150"
                ></el-table-column>
                <el-table-column
                  prop="sumCount"
                  label="宗数"
                  min-width="150"
                ></el-table-column>
                <el-table-column
                  prop="amount"
                  label="金额（万元）"
                  min-width="150"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.statusName == '流拍'">-</span>
                    <span v-else>{{ scope.row.amount }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="sumArea"
                  label="面积（万平方米）"
                  min-width="150"
                  fixed="right"
                ></el-table-column>
              </el-table>
              <div style="text-align:right;margin:22px 0px;">
                <el-pagination
                  background
                  layout="total,prev, pager, next,sizes,jumper"
                  :page-sizes="[1, 5, 10, 15, 20]"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :total="totalRecord"
                  :current-page="currentPage"
                  :page-size="pageSize"
                ></el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import dealSearch from "@/components/dealSearch";
import Axios from "axios";
import qs from "qs";
import { mapActions, mapState } from "vuex";
import echarts from "echarts";

export default {
  name: "dealStatus",
  components: {
    dealSearch
  },
  data() {
    return {
      activeTabs: "transfer",
      currentTabs: "transfer",

      activeName: "graph",
      currentName: "graph",

      circulationName: "transfer",

      loading: true,

      dealData: [],
      searchInfo: {},
      dealTimeB: "",
      dealTimeE: "",

      params: {
        cantonProvince: "",
        cantonCity: "",
        cantonArea: "",
        landChar: "",
        firstClassUse: "",
        secondClassUse: "",
        circulation: "",
        noticeDateBegin: "",
        noticeDateEnd: "",
        status: "",
        isChart: "",
        isExport: false, //导出

        transMode: "" //交易方式
      },

      //导出
      href:
        // "/epf-monitor/statistics/trans/queryFlowPattingRatioList?isExport=true",
        "/epf-monitor/statistics/trans/queryFlowPattingRatioList?isExport=true",
      //页码
      currentPage: 1,
      pageNo: 1, //页码
      pageSize: 5, //每页条数
      totalPage: 1,
      totalRecord: 1
    };
  },
  methods: {
    ...mapActions(["setTabsList"]),

    handleSizeChange(val) {
      //每页条数改变时触发
      this.pageSize = val; //显示条数改变
      this.getList();
    },
    handleCurrentChange(val) {
      //当前页发生改变时触发
      this.pageNo = val; //页码改变
      this.getList();
    },
    handleBigClick(val) {
      console.log(val);
      if (val.name == this.currentTabs) {
        return;
      }
      this.currentTabs = val.name;
      this.dealData = [];
      if (this.activeTabs == "transfer") {
        this.circulationName = "transfer";
        this.activeName = "graph";
        this.transferDrawLine();
      } else if (this.activeTabs == "rent") {
        this.circulationName = "rent";
        this.activeName = "graph";
        this.rentDrawLine();
      }
    },
    handleSmallClick(val) {
      if (val.name == this.currentName) {
        return;
      }
      this.currentName = val.name;
      if (this.activeName == "graph") {
        if (this.activeTabs == "transfer") {
          this.circulationName = "transfer";
          const that = this;
          that.transferDrawLine();
        } else if (this.activeTabs == "rent") {
          this.circulationName = "rent";
          const that = this;
          that.rentDrawLine();
        }
      } else if (this.activeName == "list") {
        if (this.activeTabs == "transfer") {
          this.circulationName = "transfer";
          const that = this;
          that.getList();
        } else if (this.activeTabs == "rent") {
          this.circulationName = "rent";
          const that = this;
          that.getList();
        }
      }
    },
    getFilterData(val) {
      console.log(val);

      this.dealTimeB = val.noticeDateBegin;
      this.dealTimeE = val.noticeDateEnd;

      this.params = val;
      if (this.activeName == "graph") {
        if (this.activeTabs == "transfer") {
          this.circulationName = "transfer";
          const that = this;
          that.transferDrawLine();
        } else if (this.activeTabs == "rent") {
          this.circulationName = "rent";
          const that = this;
          that.rentDrawLine();
        }
      } else if (this.activeName == "list") {
        if (this.activeTabs == "transfer") {
          this.circulationName = "transfer";
          const that = this;
          that.getList();
        } else if (this.activeTabs == "rent") {
          this.circulationName = "rent";
          const that = this;
          that.getList();
        }
      }
    },
    getList(val) {
      this.loading = true;
      let params = this.params;
      params["page"] = this.pageNo;
      params["rows"] = this.pageSize;
      params["circulation"] = this.circulationName;
      this.dealTimeB
        ? (params["noticeDateBegin"] = this.dealTimeB)
        : (params["noticeDateBegin"] = "");
      this.dealTimeE
        ? (params["noticeDateEnd"] = this.dealTimeE)
        : (params["noticeDateEnd"] = "");
      params["isChart"] = false;
      // this.$get(`/epf-monitor/statistics/trans/queryFlowPattingRatioList`,params).then(res => {
      this.$get(
        `/epf-monitor/statistics/trans/queryFlowPattingRatioList`,
        params
      ).then(res => {
        console.log(res);
        if (res.code == "0") {
          this.dealData = res.pager.results;
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
          this.loading = false;
          // this.href = `api/epf-monitor/statistics/trans/queryFlowPattingRatioList?isExport=true&cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&landChar=${this.params.landChar}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&circulation=${this.circulationName}&noticeDateBegin=${this.params.noticeDateBegin}&noticeDateEnd=${this.params.noticeDateEnd}`;
          this.href = `api/epf-monitor/statistics/trans/queryFlowPattingRatioList?isExport=true&cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&landChar=${this.params.landChar}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&circulation=${this.circulationName}&noticeDateBegin=${this.params.noticeDateBegin}&noticeDateEnd=${this.params.noticeDateEnd}`;
        } else {
          this.loading = false;
          this.$message.error(res.msg); //失败
          return;
        }
      });
    },
    transferDrawLine() {
      this.$nextTick(() => {
        setTimeout(() => {
          let transferFailureChart = echarts.init(
            document.getElementById("transferFailureChart")
          );
          document.getElementById("transferFailureChart").style.width =
            40 + "%";
          transferFailureChart.resize(); //直接加这句即可
        }, 0);
        setTimeout(() => {
          let transferSuccessChart = echarts.init(
            document.getElementById("transferSuccessChart")
          );
          document.getElementById("transferSuccessChart").style.width =
            40 + "%";
          transferSuccessChart.resize(); //直接加这句即可
        }, 0);
        let transferFailureChart = echarts.init(
          document.getElementById("transferFailureChart")
        );
        let transferSuccessChart = echarts.init(
          document.getElementById("transferSuccessChart")
        );

        //请求数据
        let params = this.params;
        params["circulation"] = this.circulationName;
        this.dealTimeB
          ? (params["noticeDateBegin"] = this.dealTimeB)
          : (params["noticeDateBegin"] = "");
        this.dealTimeE
          ? (params["noticeDateEnd"] = this.dealTimeE)
          : (params["noticeDateEnd"] = "");
        params["isChart"] = true;

        // this.$get(`/epf-monitor/statistics/trans/queryFlowPattingRatioList`, params).then(res => {
        // this.href = `api/epf-monitor/statistics/trans/queryFlowPattingRatioList?isExport=true&cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&landChar=${this.params.landChar}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&circulation=${this.circulationName}&noticeDateBegin=${this.params.noticeDateBegin}&noticeDateEnd=${this.params.noticeDateEnd}`;
        this.$get(
          `/epf-monitor/statistics/trans/queryFlowPattingRatioList`,
          params
        ).then(res => {
          this.href = `api/epf-monitor/statistics/trans/queryFlowPattingRatioList?isExport=true&cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&landChar=${this.params.landChar}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&circulation=${this.circulationName}&noticeDateBegin=${this.params.noticeDateBegin}&noticeDateEnd=${this.params.noticeDateEnd}`;
          let chartData = res.result;
          console.log(chartData);

          if (chartData == "") {
            var lpAmountdata = 0; //流拍金额图表数据
            var lpAreadata = 0; //流拍面积图表数据
            var lpNumberdata = 0; //流拍宗数图表数据
            var cjAmountdata = 0; //成交金额图表数据
            var cjAreadata = 0; //成交面积图表数据
            var cjNumberdata = 0; //成交宗数图表数据
          } else {
            var lpAllData = [];

            var lpData = [];
            var lpTemp = chartData.filter(function(i) {
              return i.statusName.includes("流拍");
            });
            lpData = lpData.concat(lpTemp);

            for (var key in lpData) {
              lpAllData.push({
                cantonProvinceName: lpData[key].cantonProvinceName,
                cantonProvince: lpData[key].cantonProvince,
                cantonCityName: lpData[key].cantonCityName,
                cantonCity: lpData[key].cantonCity,
                cantonArea: lpData[key].cantonArea,
                cantonAreaName: lpData[key].cantonAreaName,
                circulation: lpData[key].circulation,
                circulationName: lpData[key].circulationName,
                firstClassUse: lpData[key].firstClassUse,
                firstClassUseName: lpData[key].firstClassUseName,
                secondClassUse: lpData[key].secondClassUse,
                secondClassUseName: lpData[key].secondClassUseName,
                landChar: lpData[key].landChar,
                landCharName: lpData[key].landCharName,
                status: lpData[key].status,
                statusName: lpData[key].statusName,
                amount: lpData[key].amount,
                sumArea: lpData[key].sumArea,
                sumCount: lpData[key].sumCount
              });
            }
            console.log(lpAllData);

            if (lpAllData == "") {
              var lpAmountdata = 0; //流拍金额图表数据
              var lpAreadata = 0; //流拍面积图表数据
              var lpNumberdata = 0; //流拍宗数图表数据
            } else {
              var lpAmountdata = lpAllData[0].amount; //流拍金额图表数据
              var lpAreadata = lpAllData[0].sumArea; //流拍面积图表数据
              var lpNumberdata = lpAllData[0].sumCount; //流拍宗数图表数据
            }

            console.log(lpAmountdata);
            console.log(lpAreadata);
            console.log(lpNumberdata);

            var cjAllData = [];

            var cjData = [];
            var cjTemp = chartData.filter(function(i) {
              return i.statusName.includes("成交");
            });
            cjData = cjData.concat(cjTemp);

            for (var key in cjData) {
              cjAllData.push({
                cantonProvinceName: cjData[key].cantonProvinceName,
                cantonProvince: cjData[key].cantonProvince,
                cantonCityName: cjData[key].cantonCityName,
                cantonCity: cjData[key].cantonCity,
                cantonArea: cjData[key].cantonArea,
                cantonAreaName: cjData[key].cantonAreaName,
                circulation: cjData[key].circulation,
                circulationName: cjData[key].circulationName,
                firstClassUse: cjData[key].firstClassUse,
                firstClassUseName: cjData[key].firstClassUseName,
                secondClassUse: cjData[key].secondClassUse,
                secondClassUseName: cjData[key].secondClassUseName,
                landChar: cjData[key].landChar,
                landCharName: cjData[key].landCharName,
                status: cjData[key].status,
                statusName: cjData[key].statusName,
                amount: cjData[key].amount,
                sumArea: cjData[key].sumArea,
                sumCount: cjData[key].sumCount
              });
            }
            console.log(cjAllData);

            if (cjAllData == "") {
              var cjAmountdata = 0; //成交金额图表数据
              var cjAreadata = 0; //成交面积图表数据
              var cjNumberdata = 0; //成交宗数图表数据
            } else {
              var cjAmountdata = cjAllData[0].amount; //成交金额图表数据
              var cjAreadata = cjAllData[0].sumArea; //成交面积图表数据
              var cjNumberdata = cjAllData[0].sumCount; //成交宗数图表数据
            }

            console.log(cjAmountdata);
            console.log(cjAreadata);
            console.log(cjNumberdata);
          }

          // 绘制图表
          transferFailureChart.setOption({
            title: [
              {
                text: "流拍面积：" + lpAreadata + "万平方米",
                x: "60%",
                y: "40%",
                textStyle: {
                  fontWeight: "normal",
                  color: "#adadad",
                  fontSize: "14"
                }
              },
              // {
              //   text: "流拍金额：" + lpAmountdata + "万",
              //   x: "60%",
              //   y: "50%",
              //   textStyle: {
              //     fontWeight: "normal",
              //     color: "#adadad",
              //     fontSize: "14"
              //   }
              // },
              {
                text: "流拍宗数：" + lpNumberdata + "宗",
                x: "60%",
                y: "50%",
                textStyle: {
                  fontWeight: "normal",
                  color: "#adadad",
                  fontSize: "14"
                }
              }
            ],
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color: ["#e9e8ef"],
            // legend: {
            //   data: ["宗数", "金额"],
            //   formatter: function(name) {
            //     return "" + name;
            //   }
            // },
            series: [
              {
                name: "面积",
                type: "pie",
                clockWise: false,
                radius: ["50%", "70%"], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
                center: ["30%", "50%"], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
                itemStyle: {
                  normal: {
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
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
                        fontSize: 18,
                        fontWeight: "bolder",
                        align: "center",
                        verticalAlign: "middle",
                        padding: 8
                      },
                      rate: {
                        color: "#70a8f2",
                        fontSize: 15,
                        fontWeight: "bolder",
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
                hoverAnimation: true,
                data: [
                  {
                    value: lpAreadata,
                    name: "流拍面积",
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
                          show: true,
                          textStyle: {
                            fontWeight: "normal",
                            color: "#999",
                            fontSize: "20"
                          }
                        },
                        labelLine: {
                          show: true
                        },
                        barBorderRadius: [30, 30, 0, 0]
                      }
                    }
                  },
                  {
                    value: cjAreadata,
                    name: "成交面积",
                    labelLine: {
                      show: false
                    }
                  }
                ]
              }
            ]
          });

          // 绘制图表
          transferSuccessChart.setOption({
            title: [
              {
                text: "成交面积：" + cjAreadata + "万平方米",
                x: "60%",
                y: "40%",
                textStyle: {
                  fontWeight: "normal",
                  color: "#adadad",
                  fontSize: "14"
                }
              },
              {
                text: "成交金额：" + cjAmountdata + "万",
                x: "60%",
                y: "50%",
                textStyle: {
                  fontWeight: "normal",
                  color: "#adadad",
                  fontSize: "14"
                }
              },
              {
                text: "成交宗数：" + cjNumberdata + "宗",
                x: "60%",
                y: "60%",
                textStyle: {
                  fontWeight: "normal",
                  color: "#adadad",
                  fontSize: "14"
                }
              }
            ],
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color: ["#e9e8ef"],
            // legend: {
            //   data: ["宗数", "金额"],
            //   formatter: function(name) {
            //     return "" + name;
            //   }
            // },
            series: [
              {
                name: "面积",
                type: "pie",
                clockWise: false,
                radius: ["50%", "70%"], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
                center: ["30%", "50%"], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
                itemStyle: {
                  normal: {
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
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
                        fontSize: 18,
                        fontWeight: "bolder",
                        align: "center",
                        verticalAlign: "middle",
                        padding: 8
                      },
                      rate: {
                        color: "#ffa060",
                        fontSize: 15,
                        fontWeight: "bolder",
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
                hoverAnimation: true,
                data: [
                  {
                    value: cjAreadata,
                    name: "成交面积",
                    itemStyle: {
                      normal: {
                        color: {
                          // 完成的圆环的颜色
                          colorStops: [
                            {
                              offset: 0,
                              color: "#ffbe6e" // 0% 处的颜色
                            },
                            {
                              offset: 1,
                              color: "#ffa060" // 100% 处的颜色
                            }
                          ]
                        },
                        label: {
                          show: true,
                          textStyle: {
                            fontWeight: "normal",
                            color: "#999",
                            fontSize: "20"
                          }
                        },
                        labelLine: {
                          show: true
                        },
                        barBorderRadius: [30, 30, 0, 0]
                      }
                    }
                  },
                  {
                    value: lpAreadata,
                    name: "流拍面积",
                    labelLine: {
                      show: false
                    }
                  }
                ]
              }
            ]
          });
        });
        setTimeout(function() {
          transferFailureChart.on("mouseover", function(params) {
            console.log(params);
            if (params.name == "流拍面积") {
              transferFailureChart.dispatchAction({
                type: "highlight",
                seriesIndex: 0,
                dataIndex: 0
              });
            } else {
              transferFailureChart.dispatchAction({
                type: "downplay",
                seriesIndex: 0,
                dataIndex: 0
              });
            }
          });

          transferFailureChart.on("mouseout", function(params) {
            transferFailureChart.dispatchAction({
              type: "highlight",
              seriesIndex: 0,
              dataIndex: 0
            });
          });
          transferFailureChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: 0
          });
        }, 2000);

        setTimeout(function() {
          transferSuccessChart.on("mouseover", function(params) {
            console.log(params);
            if (params.name == "成交面积") {
              transferSuccessChart.dispatchAction({
                type: "highlight",
                seriesIndex: 0,
                dataIndex: 0
              });
            } else {
              transferSuccessChart.dispatchAction({
                type: "downplay",
                seriesIndex: 0,
                dataIndex: 0
              });
            }
          });

          transferSuccessChart.on("mouseout", function(params) {
            transferSuccessChart.dispatchAction({
              type: "highlight",
              seriesIndex: 0,
              dataIndex: 0
            });
          });
          transferSuccessChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: 0
          });
        }, 2000);
      });
    },
    rentDrawLine() {
      this.$nextTick(() => {
        setTimeout(() => {
          let rentFailureChart = echarts.init(
            document.getElementById("rentFailureChart")
          );
          document.getElementById("rentFailureChart").style.width = 40 + "%";
          rentFailureChart.resize(); //直接加这句即可
        }, 0);
        setTimeout(() => {
          let rentSuccessChart = echarts.init(
            document.getElementById("rentSuccessChart")
          );
          document.getElementById("rentSuccessChart").style.width = 40 + "%";
          rentSuccessChart.resize(); //直接加这句即可
        }, 0);
        let rentFailureChart = echarts.init(
          document.getElementById("rentFailureChart")
        );
        let rentSuccessChart = echarts.init(
          document.getElementById("rentSuccessChart")
        );

        //请求数据
        let params = this.params;
        params["circulation"] = this.circulationName;
        this.dealTimeB
          ? (params["noticeDateBegin"] = this.dealTimeB)
          : (params["noticeDateBegin"] = "");
        this.dealTimeE
          ? (params["noticeDateEnd"] = this.dealTimeE)
          : (params["noticeDateEnd"] = "");
        params["isChart"] = true;

        // this.$get(`/epf-monitor/statistics/trans/queryFlowPattingRatioList`,params).then(res => {
        this.$get(
          `/epf-monitor/statistics/trans/queryFlowPattingRatioList`,
          params
        ).then(res => {
          let chartData = res.result;
          console.log(chartData);
          // this.href = `api/epf-monitor/statistics/trans/queryFlowPattingRatioList?isExport=true&cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&landChar=${this.params.landChar}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&circulation=${this.circulationName}&noticeDateBegin=${this.params.noticeDateBegin}&noticeDateEnd=${this.params.noticeDateEnd}`;
          this.href = `api/epf-monitor/statistics/trans/queryFlowPattingRatioList?isExport=true&cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&landChar=${this.params.landChar}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&circulation=${this.circulationName}&noticeDateBegin=${this.params.noticeDateBegin}&noticeDateEnd=${this.params.noticeDateEnd}`;

          if (chartData == "") {
            var lpAmountdata = 0; //流拍金额图表数据
            var lpAreadata = 0; //流拍面积图表数据
            var lpNumberdata = 0; //流拍宗数图表数据
            var cjAmountdata = 0; //成交金额图表数据
            var cjAreadata = 0; //成交面积图表数据
            var cjNumberdata = 0; //成交宗数图表数据
          } else {
            var lpAllData = [];

            var lpData = [];
            var lpTemp = chartData.filter(function(i) {
              return i.statusName.includes("流拍");
            });
            lpData = lpData.concat(lpTemp);

            for (var key in lpData) {
              lpAllData.push({
                cantonProvinceName: lpData[key].cantonProvinceName,
                cantonProvince: lpData[key].cantonProvince,
                cantonCityName: lpData[key].cantonCityName,
                cantonCity: lpData[key].cantonCity,
                cantonArea: lpData[key].cantonArea,
                cantonAreaName: lpData[key].cantonAreaName,
                circulation: lpData[key].circulation,
                circulationName: lpData[key].circulationName,
                firstClassUse: lpData[key].firstClassUse,
                firstClassUseName: lpData[key].firstClassUseName,
                secondClassUse: lpData[key].secondClassUse,
                secondClassUseName: lpData[key].secondClassUseName,
                landChar: lpData[key].landChar,
                landCharName: lpData[key].landCharName,
                status: lpData[key].status,
                statusName: lpData[key].statusName,
                amount: lpData[key].amount,
                sumArea: lpData[key].sumArea,
                sumCount: lpData[key].sumCount
              });
            }
            console.log(lpAllData);

            if (lpAllData == "") {
              var lpAmountdata = 0; //流拍金额图表数据
              var lpAreadata = 0; //流拍面积图表数据
              var lpNumberdata = 0; //流拍宗数图表数据
            } else {
              var lpAmountdata = lpAllData[0].amount; //流拍金额图表数据
              var lpAreadata = lpAllData[0].sumArea; //流拍面积图表数据
              var lpNumberdata = lpAllData[0].sumCount; //流拍宗数图表数据
            }

            console.log(lpAmountdata);
            console.log(lpAreadata);
            console.log(lpNumberdata);

            var cjAllData = [];

            var cjData = [];
            var cjTemp = chartData.filter(function(i) {
              return i.statusName.includes("成交");
            });
            cjData = cjData.concat(cjTemp);

            for (var key in cjData) {
              cjAllData.push({
                cantonProvinceName: cjData[key].cantonProvinceName,
                cantonProvince: cjData[key].cantonProvince,
                cantonCityName: cjData[key].cantonCityName,
                cantonCity: cjData[key].cantonCity,
                cantonArea: cjData[key].cantonArea,
                cantonAreaName: cjData[key].cantonAreaName,
                circulation: cjData[key].circulation,
                circulationName: cjData[key].circulationName,
                firstClassUse: cjData[key].firstClassUse,
                firstClassUseName: cjData[key].firstClassUseName,
                secondClassUse: cjData[key].secondClassUse,
                secondClassUseName: cjData[key].secondClassUseName,
                landChar: cjData[key].landChar,
                landCharName: cjData[key].landCharName,
                status: cjData[key].status,
                statusName: cjData[key].statusName,
                amount: cjData[key].amount,
                sumArea: cjData[key].sumArea,
                sumCount: cjData[key].sumCount
              });
            }
            console.log(cjAllData);

            if (cjAllData == "") {
              var cjAmountdata = 0; //成交金额图表数据
              var cjAreadata = 0; //成交面积图表数据
              var cjNumberdata = 0; //成交宗数图表数据
            } else {
              var cjAmountdata = cjAllData[0].amount; //成交金额图表数据
              var cjAreadata = cjAllData[0].sumArea; //成交面积图表数据
              var cjNumberdata = cjAllData[0].sumCount; //成交宗数图表数据
            }

            console.log(cjAmountdata);
            console.log(cjAreadata);
            console.log(cjNumberdata);
          }

          // 绘制图表
          rentFailureChart.setOption({
            title: [
              {
                text: "流拍面积：" + lpAreadata + "万平方米",
                x: "60%",
                y: "40%",
                textStyle: {
                  fontWeight: "normal",
                  color: "#adadad",
                  fontSize: "14"
                }
              },
              // {
              //   text: "流拍金额：" + lpAmountdata + "万",
              //   x: "60%",
              //   y: "50%",
              //   textStyle: {
              //     fontWeight: "normal",
              //     color: "#adadad",
              //     fontSize: "14"
              //   }
              // },
              {
                text: "流拍宗数：" + lpNumberdata + "宗",
                x: "60%",
                y: "50%",
                textStyle: {
                  fontWeight: "normal",
                  color: "#adadad",
                  fontSize: "14"
                }
              }
            ],
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color: ["#e9e8ef"],
            // legend: {
            //   data: ["宗数", "金额"],
            //   formatter: function(name) {
            //     return "" + name;
            //   }
            // },
            series: [
              {
                name: "面积",
                type: "pie",
                clockWise: false,
                radius: ["50%", "70%"], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
                center: ["30%", "50%"], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
                itemStyle: {
                  normal: {
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
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
                        fontSize: 18,
                        fontWeight: "bolder",
                        align: "center",
                        verticalAlign: "middle",
                        padding: 8
                      },
                      rate: {
                        color: "#70a8f2",
                        fontSize: 15,
                        fontWeight: "bolder",
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
                hoverAnimation: true,
                data: [
                  {
                    value: lpAreadata,
                    name: "流拍面积",
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
                          show: true,
                          textStyle: {
                            fontWeight: "normal",
                            color: "#999",
                            fontSize: "20"
                          }
                        },
                        labelLine: {
                          show: true
                        },
                        barBorderRadius: [30, 30, 0, 0]
                      }
                    }
                  },
                  {
                    value: cjAreadata,
                    name: "成交面积",
                    labelLine: {
                      show: false
                    }
                  }
                ]
              }
            ]
          });

          // 绘制图表
          rentSuccessChart.setOption({
            title: [
              {
                text: "成交面积：" + cjAreadata + "万平方米",
                x: "60%",
                y: "40%",
                textStyle: {
                  fontWeight: "normal",
                  color: "#adadad",
                  fontSize: "14"
                }
              },
              {
                text: "成交金额：" + cjAmountdata + "万",
                x: "60%",
                y: "50%",
                textStyle: {
                  fontWeight: "normal",
                  color: "#adadad",
                  fontSize: "14"
                }
              },
              {
                text: "成交宗数：" + cjNumberdata + "宗",
                x: "60%",
                y: "60%",
                textStyle: {
                  fontWeight: "normal",
                  color: "#adadad",
                  fontSize: "14"
                }
              }
            ],
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color: ["#e9e8ef"],
            // legend: {
            //   data: ["宗数", "金额"],
            //   formatter: function(name) {
            //     return "" + name;
            //   }
            // },
            series: [
              {
                name: "面积",
                type: "pie",
                clockWise: false,
                radius: ["50%", "70%"], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
                center: ["30%", "50%"], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
                itemStyle: {
                  normal: {
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
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
                        fontSize: 18,
                        fontWeight: "bolder",
                        align: "center",
                        verticalAlign: "middle",
                        padding: 8
                      },
                      rate: {
                        color: "#ffa060",
                        fontSize: 15,
                        fontWeight: "bolder",
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
                hoverAnimation: true,
                data: [
                  {
                    value: cjAreadata,
                    name: "成交面积",
                    itemStyle: {
                      normal: {
                        color: {
                          // 完成的圆环的颜色
                          colorStops: [
                            {
                              offset: 0,
                              color: "#ffbe6e" // 0% 处的颜色
                            },
                            {
                              offset: 1,
                              color: "#ffa060" // 100% 处的颜色
                            }
                          ]
                        },
                        label: {
                          show: true,
                          textStyle: {
                            fontWeight: "normal",
                            color: "#999",
                            fontSize: "20"
                          }
                        },
                        labelLine: {
                          show: true
                        },
                        barBorderRadius: [30, 30, 0, 0]
                      }
                    }
                  },
                  {
                    value: lpAreadata,
                    name: "流拍面积",
                    labelLine: {
                      show: false
                    }
                  }
                ]
              }
            ]
          });
        });
        setTimeout(function() {
          rentFailureChart.on("mouseover", function(params) {
            console.log(params);
            if (params.name == "流拍面积") {
              rentFailureChart.dispatchAction({
                type: "highlight",
                seriesIndex: 0,
                dataIndex: 0
              });
            } else {
              rentFailureChart.dispatchAction({
                type: "downplay",
                seriesIndex: 0,
                dataIndex: 0
              });
            }
          });

          rentFailureChart.on("mouseout", function(params) {
            rentFailureChart.dispatchAction({
              type: "highlight",
              seriesIndex: 0,
              dataIndex: 0
            });
          });
          rentFailureChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: 0
          });
        }, 2000);

        setTimeout(function() {
          rentSuccessChart.on("mouseover", function(params) {
            console.log(params);
            if (params.name == "成交面积") {
              rentSuccessChart.dispatchAction({
                type: "highlight",
                seriesIndex: 0,
                dataIndex: 0
              });
            } else {
              rentSuccessChart.dispatchAction({
                type: "downplay",
                seriesIndex: 0,
                dataIndex: 0
              });
            }
          });

          rentSuccessChart.on("mouseout", function(params) {
            rentSuccessChart.dispatchAction({
              type: "highlight",
              seriesIndex: 0,
              dataIndex: 0
            });
          });
          rentSuccessChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: 0
          });
        }, 2000);
      });
    },

    initEchart() {
      window.addEventListener("resize", () => {
        let transferFailureChart = echarts.init(
          document.getElementById("transferFailureChart")
        );
        document.getElementById("transferFailureChart").style.width = 40 + "%";
        transferFailureChart.resize();
        let transferSuccessChart = echarts.init(
          document.getElementById("transferSuccessChart")
        );
        document.getElementById("transferSuccessChart").style.width = 40 + "%";
        transferSuccessChart.resize();
        let rentFailureChart = echarts.init(
          document.getElementById("rentFailureChart")
        );
        document.getElementById("rentFailureChart").style.width = 40 + "%";
        rentFailureChart.resize();
        let rentSuccessChart = echarts.init(
          document.getElementById("rentSuccessChart")
        );
        document.getElementById("rentSuccessChart").style.width = 40 + "%";
        rentSuccessChart.resize();
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.transferDrawLine();
      this.rentDrawLine();
    }, 1000);
    this.initEchart();
  },
  destroyed() {
    window.removeEventListener("resize", () => {
      let transferFailureChart = echarts.init(
        document.getElementById("transferFailureChart")
      );
      document.getElementById("transferFailureChart").style.width = 40 + "%";
      transferFailureChart.resize();
      let transferSuccessChart = echarts.init(
        document.getElementById("transferSuccessChart")
      );
      document.getElementById("transferSuccessChart").style.width = 40 + "%";
      transferSuccessChart.resize();
      let rentFailureChart = echarts.init(
        document.getElementById("rentFailureChart")
      );
      document.getElementById("rentFailureChart").style.width = 40 + "%";
      rentFailureChart.resize();
      let rentSuccessChart = echarts.init(
        document.getElementById("rentSuccessChart")
      );
      document.getElementById("rentSuccessChart").style.width = 40 + "%";
      rentSuccessChart.resize();
    });
  },
  created() {
    if (sessionStorage.getItem("org_level") == "org_level-003") {
      this.params.cantonProvince = sessionStorage.getItem("jgProvinceCode");
      this.params.cantonProvinceName = sessionStorage.getItem("jgProvince");
    } else if (sessionStorage.getItem("org_level") == "org_level-005") {
      this.params.cantonProvince = sessionStorage.getItem("jgProvinceCode");
      this.params.cantonProvinceName = sessionStorage.getItem("jgProvince");
      this.params.cantonCity = sessionStorage.getItem("jgCityCode");
      this.params.cantonCityName = sessionStorage.getItem("jgCity");
    } else if (sessionStorage.getItem("org_level") == "org_level-004") {
      this.params.cantonProvince = sessionStorage.getItem("jgProvinceCode");
      this.params.cantonProvinceName = sessionStorage.getItem("jgProvince");
      this.params.cantonCity = sessionStorage.getItem("jgCityCode");
      this.params.cantonCityName = sessionStorage.getItem("jgCity");
      this.params.cantonArea = sessionStorage.getItem("jgAreaCode");
      this.params.cantonAreaName = sessionStorage.getItem("jgArea");
    }

    this.getList();
  },
  watch: {
    activeTabs(val) {
      console.log(val);
      if (this.activeTabs == "transfer") {
        this.circulationName = "transfer";
        this.activeName = "graph";
        this.transferDrawLine();
      } else if (this.activeTabs == "rent") {
        this.circulationName = "rent";
        this.activeName = "graph";
        this.rentDrawLine();
      }
    },
    activeName(val) {
      console.log(val);
      if (this.activeName == "graph") {
        if (this.activeTabs == "transfer") {
          this.circulationName = "transfer";
          this.transferDrawLine();
        } else if (this.activeTabs == "rent") {
          this.circulationName = "rent";
          this.rentDrawLine();
        }
      } else if (this.activeName == "list") {
        if (this.activeTabs == "transfer") {
          this.circulationName = "transfer";
          this.getList();
        } else if (this.activeTabs == "rent") {
          this.circulationName = "rent";
          this.getList();
        }
      }
    }
  }
};
</script>
<style scoped>
.oper {
  float: right;
  font-weight: normal;
}
.oper a {
  display: inline-block;
  width: 80px;
  height: 32px;
  background-color: #ffa000;
  border-radius: 2px;
  margin-right: 40px;
  text-align: center;
  line-height: 36px;
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
  height: 32px;
  background-color: #ffa000;
  border-radius: 2px;
  margin-right: 16px;
  margin-top: 12px;
  text-align: center;
  line-height: 32px;
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
