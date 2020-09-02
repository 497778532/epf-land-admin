<template>
  <!-- <div>交易用途分析</div> -->
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
                  ></el-option> </el-select
              ></el-form-item>
            </el-col>
            <el-col
              class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-8 ant-col-xl-8 ant-col-xxl-6"
              style="padding-left: 8px; padding-right: 8px;"
              v-if="flexibleOpen"
            >
              <el-form-item label="交易状态：">
                <el-select
                  size="small"
                  v-model="filterData.trans_statusName"
                  placeholder="全部"
                  @change="
                    statusSelect(
                      dictionary.flow_mode,
                      filterData.trans_statusName,
                      $event
                    )
                  "
                  disabled
                >
                  <el-option
                    v-for="(item, index) in dictionary.trans_status"
                    :ref="item.zhCn"
                    :id="item.id"
                    :dictKey="item.dictKey"
                    :label="item.zhCn"
                    :value="item.zhCn"
                    :key="index"
                    v-show="item.zhCn != '未公告' && item.zhCn != '已公告'"
                  ></el-option>
                </el-select>
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
              class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-8 ant-col-xl-8 ant-col-xxl-6"
              style="padding-left: 8px; padding-right: 8px;"
              v-if="flexibleOpen"
            >
              <el-form-item label="交易类型：">
                <el-select
                  size="small"
                  v-model="filterData.landTrans"
                  placeholder="全部"
                  @change="
                    circulationSelect(
                      dictionary.flow_mode,
                      filterData.landTrans,
                      $event
                    )
                  "
                >
                  <el-option
                    v-for="(item, index) in dictionary.flow_mode"
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
                  v-model="submitTime"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd"
                ></el-date-picker
              ></el-form-item>
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
                  <el-option label="自行交易" value="2"></el-option> </el-select
              ></el-form-item>
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
        style="margin:20px;height:100%;"
      >
        <el-tab-pane
          label="图形"
          name="graph"
          style="width:100%;height:100%; position: relative;"
        >
          <div class="toolsTitleBox" style="background-color:#fff;border:0;">
            <div class="operCycle">
              <div style="display:flex;">
                <!-- <span style="margin-left:10px;width:90%;display:flex;flex-wrap:wrap;">
                  <div style="display:flex;">
                    <div style="display:flex;flex:2;margin-left:20px;">交易用途对比：</div>
                    <div
                      style="display:flex;justify-content:flex-start;flex-wrap:wrap;flex:18;"
                      ref="changeBox"
                    >
                      <div style="display:flex;justify-content:flex-start;flex:15;">
                        <el-checkbox-group
                          v-model="checkedTypes"
                          v-if="lookFirstList==true"
                          
                        >
                          <el-checkbox
                            v-for="(item,index) in dictionary.land_use"
                            :ref="item.zhCn"
                            :label="item.dictKey"
                            :dictKey="item.dictKey"
                            :value="item.zhCn"
                            :key="index"
                            @change="handleCheckedTypesChange"
                          >{{item.zhCn}}</el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox-group
                          v-model="checkedTypes.dictKey"
                         
                          v-if="lookSecondList==true"
                        >
                          <el-checkbox
                            v-for="(item,index) in dictionary.land_use_second"
                            :label="item.zhCn"
                            :value="item.dictkey"
                            :key="index"
                          >{{item.zhCn}}</el-checkbox>
                        </el-checkbox-group>
                      </div>
                    </div>
                  </div>
                </span>-->
              </div>
            </div>
          </div>
          <div
            id="purposeChart"
            style="width:1400px;height:550px;margin-bottom:75px;margin-top:80px;"
          ></div>
        </el-tab-pane>
        <!-- <el-tab-pane label="列表" name="list" style="width:100%;height:100%;">
          <div class="toolsTitleBox">
            <span class="toolsTitle">数据列表</span>
          </div>
          <el-table
            ref="multipleTable"
            :data="dealListData"
            v-loading="loading"
            element-loading-text="数据加载中"
            element-loading-background="rgba(255, 255, 255,0.95)"
            style="width: 100%;min-height:80px;"
            border
          >
            <el-table-column label="序号" min-width="100" align="center">
              <template slot-scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column label="需求行政区域" min-width="200">
              <template slot-scope="scope">
                <span>{{scope.row.cantonProvinceName}}/{{scope.row.cantonCityName}}/{{scope.row.cantonAreaName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="用途" min-width="300">
              <template slot-scope="scope">
                <span>{{scope.row.firstClassUseName}}/{{scope.row.secondClassUseName}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="demandName" label="业务类型" min-width="90"></el-table-column>
            <el-table-column prop="insertTime" label="时间" min-width="400"></el-table-column>
            <el-table-column prop="price" label="金额（万元）" min-width="230"></el-table-column>
            <el-table-column prop="area" label="面积（万平方米）" min-width="290" fixed="right"></el-table-column>
          </el-table>
          <div style="text-align:right;margin:22px 0px;">
            <el-pagination
              background
              layout="total,prev, pager, next,sizes,jumper"
              :page-sizes="[5,10,15,20]"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :total="totalRecord"
              :current-page="currentPage"
              :page-size="pageSize"
            ></el-pagination>
          </div>
        </el-tab-pane>-->
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
  name: "dealPurpose",
  data() {
    return {
      flexibleOpen:false,
      //根据权限锁定省市
      provinceCheck: false,
      cityCheck: false,
      AreaCheck: false,
      activeName: "graph",
      currentName: "graph",

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
      //页码
      currentPage: 1,
      totalPage: 1,
      totalRecord: 1,
      pageNo: 1,
      pageSize: 5,

      selection: [],
      useName: "",
      useData: "",

      loading: true,

      checkedTypes: [],
      // checkedTypes: [{
      //   dictKey: "",
      //   id: "",
      //   zhCn: "全部"
      // }],
      checkedDictKey: [
        {
          dictKey: "",
          id: "",
          zhCn: "全部"
        }
      ],

      isIndeterminateType: true,
      checkAll: true,
      isIndeterminate: true,

      timeCycle: "MOUTH", //对比周期
      timeCycleName: "MOUTH",
      submitTime: "", //发布时间

      cycleList: [
        {
          value: "MOUTH",
          label: "月"
        },
        {
          value: "SEASON",
          label: "季"
        },
        {
          value: "YEAR",
          label: "年"
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
        status: "", //trans_status-004:交易中
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
        trans_statusName: "已成交", //交易状态
        trans_status: "trans_status-007", //trans_status-004:交易中
        submitTime: "",
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
      //项目交易结构分析--列表
      dealListData: [],
      subListData: [],

      dictObj: {
        dictKey: "",
        id: "",
        zhCn: "全部"
      },
      lookFirstList: true,
      lookSecondList: false,

      noSameList: [],
      isCheck: "",

      legendNameData: [],
      legendNameSelectedData: [],
      requestNoList: [],
      checked: true,
      totalChecked: { 全部: true }
    };
  },
  methods: {
    ...mapActions(["setTabsList"]),
    resetFilter() {
      this.submitTime = "";
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
        this.filterData.analyze = "面积";
        this.filterData.trans_status = "";
        this.filterData.circulation = "";
        this.filterData.trans_statusName = "已成交";
        this.filterData.trans_status = "trans_status-007";
      }
      // this.filterData.isExport = false;
      this.searchList();
    },
    searchList() {
      this.params = this.filterData;
      this.params["status"] = this.filterData.trans_status;
      if (this.submitTime) {
        this.params["noticeDateBegin"] = this.submitTime[0];
        this.params["noticeDateEnd"] = this.submitTime[1];
      }
      if (this.filterData.firstClassUse == "") {
        this.lookFirstList = true;
        this.lookSecondList = false;
      }
      if (
        this.filterData.firstClassUse != "" &&
        this.filterData.secondClassUse == ""
      ) {
        this.lookFirstList = false;
        this.lookSecondList = true;
      }
      if (
        this.filterData.firstClassUse != "" &&
        this.filterData.secondClassUse != ""
      ) {
        this.lookFirstList = false;
        this.lookSecondList = true;
      }
      if (this.activeName == "graph") {
        const that = this;
        that.purposeDrawLine();
      } else if (this.activeName == "list") {
        const that = this;
        that.getList();
      }
    },
    toggleCycle(item) {
      this.timeCycleName = item.value;
      console.log(this.timeCycle);
    },
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

    handleCheckedTypesChange(val) {
      console.log(val);
      this.isCheck = val;
    },
    handleClick(val) {
      if (val.name == this.currentName) {
        return;
      }
      this.currentName = val.name;
      if (this.activeName == "graph") {
        this.purposeDrawLine();
      } else if (this.activeName == "list") {
        const that = this;
        that.getList();
      }
    },
    getList() {},

    async purposeDrawLine() {
      setTimeout(() => {
        let purposeChart = echarts.init(
          document.getElementById("purposeChart")
        );
        document.getElementById("purposeChart").style.width = 100 + "%";
        purposeChart.resize(); //直接加这句即可
      }, 0);
      let purposeChart = echarts.init(document.getElementById("purposeChart"));

      console.log(this.checkedTypes);

      var provinceData = []; //x轴省份数据

      //循环开始
      //请求数据
      let params = this.params;
      this.submitTime
        ? (params["noticeDateBegin"] = this.submitTime[0])
        : (params["noticeDateBegin"] = "");
      this.submitTime
        ? (params["noticeDateEnd"] = this.submitTime[1])
        : (params["noticeDateEnd"] = "");
      params["analyze"] = this.filterData.analyze;
      params["firstClassUse"] = this.filterData.firstClassUse;
      params["secondClassUse"] = this.filterData.secondClassUse;
      params["status"] = this.filterData.trans_status;
      // let res = await this.$get(`/epf-monitor/statistics/trans/queryGroupByCantonAndClassUse`,params);
      let res = await this.$get(
        `/epf-monitor/statistics/trans/queryGroupByCantonAndClassUse`,
        params
      );
      console.log(res);
      let chartData = res.result;
      console.log(chartData);

      var areaName = "";
      var UseNameData = [];
      var UseNoData = [];
      for (var key in chartData) {
        if (chartData[key].cantonProvince) {
          if (chartData[key].cantonCity) {
            if (chartData[key].cantonArea) {
              provinceData.push(chartData[key].cantonAreaName);
              areaName = "地区";
            } else {
              provinceData.push(chartData[key].cantonCityName);
              areaName = "城市";
            }
          } else {
            provinceData.push(chartData[key].cantonProvinceName);
            areaName = "省份";
          }
        }
        if (chartData[key].firstClassUse) {
          UseNameData.push(chartData[key].firstClassUseName);
          UseNoData.push(chartData[key].firstClassUse);
        } else if (chartData[key].secondClassUse) {
          UseNameData.push(chartData[key].secondClassUseName);
          UseNoData.push(chartData[key].secondClassUse);
        }
      }
      console.log(UseNameData);
      console.log(UseNoData);

      let set1 = new Set(provinceData);
      let newProvinceData = Array.from(set1);
      console.log(newProvinceData);
      //  if(this.filterData.firstClassUse==""){

      //     let set2 = new Set(UseNameData);
      //     let newUseNameData = Array.from(set2);
      //     console.log(newUseNameData);
      //  }else{
      //     let newUseNameData = UseNameData;
      //     console.log(newUseNameData);
      //  }
      let set2 = new Set(UseNameData);
      let newUseNameData = Array.from(set2);
      console.log(newUseNameData);
      let set3 = new Set(UseNoData);
      let newUseNoData = Array.from(set3);
      console.log(newUseNoData);

      if (this.filterData.firstClassUse == "") {
        var legendObj = new Object();
        var arr = newUseNameData;
        for (var x in arr) {
          legendObj[arr[x]] = this.checked;
        }
      } else {
        if (this.filterData.secondClassUse == "") {
          var legendObj = new Object();
          var arr = newUseNameData;
          for (var x in arr) {
            legendObj[arr[x]] = this.checked;
          }
        } else {
          var legendObj = new Object();
          var arr = newUseNameData;
          for (var x in arr) {
            legendObj[arr[x]] = this.checked;
          }
          for (var item in legendObj) {
            if (item == this.filterData.secondClassUseName) {
              // delete legendObj[item]
              legendObj[item] = true;
            } else {
              legendObj[item] = false;
            }
          }
        }
      }
      // if (this.filterData.firstClassUse != "") {
      //   if (this.filterData.secondClassUse != "") {
      //     var legendObj = new Object();
      //     var arr = newUseNameData;
      //     for (var x in arr) {
      //       legendObj[arr[x]] = this.checked;
      //     }
      //     for (var item in legendObj) {
      //       if (item == this.filterData.secondClassUseName) {
      //         // delete legendObj[item]
      //         legendObj[item] = true;
      //       } else {
      //         legendObj[item] = false;
      //       }
      //     }
      //      console.log(legendObj);
      // this.legendNameSelectedData = legendObj;
      //   }
      // }
      console.log(legendObj);
      this.legendNameSelectedData = legendObj;

      console.log(this.legendNameSelectedData);

      var arrKong = Array.apply(null, { length: newProvinceData.length }).fill(
        0
      );
      console.log(arrKong);

      if (this.filterData.firstClassUse == "") {
        var dataALLList = [];
        var allAmountData = [];
        var allAreaData = [];
        var allNumberData = [];

        for (var i = 0; i < newUseNoData.length; i++) {
          console.log(chartData);
          var AmountData = []; //金额图表数据
          var AreaData = []; //面积图表数据
          var NumberData = []; //宗数图表数据
          var analyzeData = []; //分析类型图表数据

          var Data = [];
          var Temp = chartData.filter(function(j) {
            return j.firstClassUse.includes(newUseNoData[i]);
          });
          Data = Temp;
          console.log(Data);

          for (var key in Data) {
            AmountData.push(Data[key].transPrice);
            AreaData.push(Data[key].areaSum);
            NumberData.push(Data[key].resulCount);
          }
          var AmountDataMax = Math.max.apply(Math, AmountData);
          var AreaDataMax = Math.max.apply(Math, AreaData);
          var NumberDataMax = Math.max.apply(Math, NumberData);

          console.log(AmountData);
          console.log(AreaData);
          console.log(NumberData);
          console.log(AmountDataMax);
          console.log(AreaDataMax);
          console.log(NumberDataMax);

          if (this.filterData.analyze == "金额") {
            analyzeData = AmountData;
          } else if (this.filterData.analyze == "面积") {
            analyzeData = AreaData;
          } else if (this.filterData.analyze == "宗数") {
            analyzeData = NumberData;
          }

          console.log(analyzeData);

          dataALLList.push({
            value: analyzeData,
            name: newUseNameData[i]
          });
          // dataALLList.push(analyzeData);

          allAmountData.push(AmountData);
          allAreaData.push(AreaData);
          allNumberData.push(NumberData);

          console.log(dataALLList);

          console.log(allAmountData);
          console.log(allAreaData);
          console.log(allNumberData);
        }
      } else {
        if (this.filterData.secondClassUse == "") {
          var dataALLList = [];
          var allAmountData = [];
          var allAreaData = [];
          var allNumberData = [];

          for (var i = 0; i < newUseNoData.length; i++) {
            console.log(chartData);
            var AmountData = []; //金额图表数据
            var AreaData = []; //面积图表数据
            var NumberData = []; //宗数图表数据
            var analyzeData = []; //分析类型图表数据

            var Data = [];
            var Temp = chartData.filter(function(j) {
              return j.secondClassUse.includes(newUseNoData[i]);
            });
            Data = Temp;
            console.log(Data);

            for (var key in Data) {
              AmountData.push(Data[key].transPrice);
              AreaData.push(Data[key].areaSum);
              NumberData.push(Data[key].resulCount);
            }

            var AmountDataMax = Math.max.apply(Math, AmountData);
            var AreaDataMax = Math.max.apply(Math, AreaData);
            var NumberDataMax = Math.max.apply(Math, NumberData);

            console.log(AmountData);
            console.log(AreaData);
            console.log(NumberData);
            console.log(AmountDataMax);
            console.log(AreaDataMax);
            console.log(NumberDataMax);

            if (this.filterData.analyze == "金额") {
              analyzeData = AmountData;
            } else if (this.filterData.analyze == "面积") {
              analyzeData = AreaData;
            } else if (this.filterData.analyze == "宗数") {
              analyzeData = NumberData;
            }

            console.log(analyzeData);

            dataALLList.push({
              value: analyzeData,
              name: newUseNameData[i]
            });
            // dataALLList.push(analyzeData);

            allAmountData.push(AmountData);
            allAreaData.push(AreaData);
            allNumberData.push(NumberData);

            console.log(dataALLList);

            console.log(allAmountData);
            console.log(allAreaData);
            console.log(allNumberData);
          }
        } else {
          var dataALLList = [];
          var allAmountData = [];
          var allAreaData = [];
          var allNumberData = [];

          for (var i = 0; i < newUseNoData.length; i++) {
            var AmountData = []; //金额图表数据
            var AreaData = []; //面积图表数据
            var NumberData = []; //宗数图表数据
            var analyzeData = []; //分析类型图表数据

            var Data = [];
            var Temp = chartData.filter(function(j) {
              return j.secondClassUse.includes(newUseNoData[i]);
            });
            Data = Temp;
            console.log(Data);

            for (var key in Data) {
              AmountData.push(Data[key].transPrice);
              AreaData.push(Data[key].areaSum);
              NumberData.push(Data[key].resulCount);
            }

            var AmountDataMax = Math.max.apply(Math, AmountData);
            var AreaDataMax = Math.max.apply(Math, AreaData);
            var NumberDataMax = Math.max.apply(Math, NumberData);

            console.log(AmountData);
            console.log(AreaData);
            console.log(NumberData);
            console.log(AmountDataMax);
            console.log(AreaDataMax);
            console.log(NumberDataMax);

            if (this.filterData.analyze == "金额") {
              analyzeData = AmountData;
            } else if (this.filterData.analyze == "面积") {
              analyzeData = AreaData;
            } else if (this.filterData.analyze == "宗数") {
              analyzeData = NumberData;
            }

            console.log(analyzeData);

            dataALLList.push({
              value: analyzeData,
              name: newUseNameData[i]
            });
            // dataALLList.push(analyzeData);

            allAmountData.push(AmountData);
            allAreaData.push(AreaData);
            allNumberData.push(NumberData);

            console.log(dataALLList);

            console.log(allAmountData);
            console.log(allAreaData);
            console.log(allNumberData);
          }
        }
      }

      function sum(arr) {
        return eval(arr.join("+"));
      }

      //山西省
      var shanXiAmountData = []; //山西省所有用途金额图表数据
      var shanXiAreaData = []; //山西省所有用途面积图表数据
      var shanXiNumberData = []; //山西省所有用途宗数图表数据

      var shanXiData = [];
      var shanXiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("140000");
      });
      shanXiData = shanXiData.concat(shanXiTemp);

      for (var key in shanXiData) {
        shanXiAmountData.push(shanXiData[key].transPrice);
        shanXiAreaData.push(shanXiData[key].areaSum);
        shanXiNumberData.push(shanXiData[key].resulCount);
      }

      var shanXiAmountSum = 0;
      var shanXiAreaSum = 0;
      var shanXiNumberSum = 0;

      shanXiAmountSum ? 0 : (shanXiAmountSum = sum(shanXiAmountData));
      shanXiAreaSum ? 0 : (shanXiAreaSum = sum(shanXiAreaData));
      shanXiNumberSum ? 0 : (shanXiNumberSum = sum(shanXiNumberData));

      if (shanXiData == "") {
        shanXiAmountSum = 0;
        shanXiAreaSum = 0;
        shanXiNumberSum = 0;
      }

      console.log(shanXiData);
      console.log(shanXiAmountData);
      console.log(shanXiAreaData);
      console.log(shanXiNumberData);
      console.log(shanXiAmountSum);
      console.log(shanXiAreaSum);
      console.log(shanXiNumberSum);
      //内蒙古自治区
      var neiMengGuAmountData = []; //内蒙古自治区所有用途金额图表数据
      var neiMengGuAreaData = []; //内蒙古自治区所有用途面积图表数据
      var neiMengGuNumberData = []; //内蒙古自治区所有用途宗数图表数据

      var neiMengGuData = [];
      var neiMengGuTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("150000");
      });
      neiMengGuData = neiMengGuData.concat(neiMengGuTemp);

      for (var key in neiMengGuData) {
        neiMengGuAmountData.push(neiMengGuData[key].transPrice);
        neiMengGuAreaData.push(neiMengGuData[key].areaSum);
        neiMengGuNumberData.push(neiMengGuData[key].resulCount);
      }

      var neiMengGuAmountSum = 0;
      var neiMengGuAreaSum = 0;
      var neiMengGuNumberSum = 0;

      neiMengGuAmountSum ? 0 : (neiMengGuAmountSum = sum(neiMengGuAmountData));
      neiMengGuAreaSum ? 0 : (neiMengGuAreaSum = sum(neiMengGuAreaData));
      neiMengGuNumberSum ? 0 : (neiMengGuNumberSum = sum(neiMengGuNumberData));

      if (neiMengGuData == "") {
        neiMengGuAmountSum = 0;
        neiMengGuAreaSum = 0;
        neiMengGuNumberSum = 0;
      }

      console.log(neiMengGuData);
      console.log(neiMengGuAmountData);
      console.log(neiMengGuAreaData);
      console.log(neiMengGuNumberData);
      console.log(neiMengGuAmountSum);
      console.log(neiMengGuAreaSum);
      console.log(neiMengGuNumberSum);
      //山东省
      var shanDongAmountData = []; //山东省所有用途金额图表数据
      var shanDongAreaData = []; //山东省所有用途面积图表数据
      var shanDongNumberData = []; //山东省所有用途宗数图表数据

      var shanDongData = [];
      var shanDongTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("370000");
      });
      shanDongData = shanDongData.concat(shanDongTemp);

      for (var key in shanDongData) {
        shanDongAmountData.push(shanDongData[key].transPrice);
        shanDongAreaData.push(shanDongData[key].areaSum);
        shanDongNumberData.push(shanDongData[key].resulCount);
      }

      var shanDongAmountSum = 0;
      var shanDongAreaSum = 0;
      var shanDongNumberSum = 0;

      shanDongAmountSum ? 0 : (shanDongAmountSum = sum(shanDongAmountData));
      shanDongAreaSum ? 0 : (shanDongAreaSum = sum(shanDongAreaData));
      shanDongNumberSum ? 0 : (shanDongNumberSum = sum(shanDongNumberData));

      if (shanDongData == "") {
        shanDongAmountSum = 0;
        shanDongAreaSum = 0;
        shanDongNumberSum = 0;
      }

      console.log(shanDongData);
      console.log(shanDongAmountData);
      console.log(shanDongAreaData);
      console.log(shanDongNumberData);
      console.log(shanDongAmountSum);
      console.log(shanDongAreaSum);
      console.log(shanDongNumberSum);
      //天津市
      var tianJinAmountData = []; //天津市所有用途金额图表数据
      var tianJinAreaData = []; //天津市所有用途面积图表数据
      var tianJinNumberData = []; //天津市所有用途宗数图表数据

      var tianJinData = [];
      var tianJinTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("120000");
      });
      tianJinData = tianJinData.concat(tianJinTemp);

      for (var key in tianJinData) {
        tianJinAmountData.push(tianJinData[key].transPrice);
        tianJinAreaData.push(tianJinData[key].areaSum);
        tianJinNumberData.push(tianJinData[key].resulCount);
      }

      var tianJinAmountSum = 0;
      var tianJinAreaSum = 0;
      var tianJinNumberSum = 0;

      tianJinAmountSum ? 0 : (tianJinAmountSum = sum(tianJinAmountData));
      tianJinAreaSum ? 0 : (tianJinAreaSum = sum(tianJinAreaData));
      tianJinNumberSum ? 0 : (tianJinNumberSum = sum(tianJinNumberData));

      if (tianJinData == "") {
        tianJinAmountSum = 0;
        tianJinAreaSum = 0;
        tianJinNumberSum = 0;
      }
      //河北省
      var heBeiAmountData = []; //河北省所有用途金额图表数据
      var heBeiAreaData = []; //河北省所有用途面积图表数据
      var heBeiNumberData = []; //河北省所有用途宗数图表数据

      var heBeiData = [];
      var heBeiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("130000");
      });
      heBeiData = heBeiData.concat(heBeiTemp);

      for (var key in heBeiData) {
        heBeiAmountData.push(heBeiData[key].transPrice);
        heBeiAreaData.push(heBeiData[key].areaSum);
        heBeiNumberData.push(heBeiData[key].resulCount);
      }

      var heBeiAmountSum = 0;
      var heBeiAreaSum = 0;
      var heBeiNumberSum = 0;

      heBeiAmountSum ? 0 : (heBeiAmountSum = sum(heBeiAmountData));
      heBeiAreaSum ? 0 : (heBeiAreaSum = sum(heBeiAreaData));
      heBeiNumberSum ? 0 : (heBeiNumberSum = sum(heBeiNumberData));

      if (heBeiData == "") {
        heBeiAmountSum = 0;
        heBeiAreaSum = 0;
        heBeiNumberSum = 0;
      }
      //江苏省
      var jiangSuAmountData = []; //江苏省所有用途金额图表数据
      var jiangSuAreaData = []; //江苏省所有用途面积图表数据
      var jiangSuNumberData = []; //江苏省所有用途宗数图表数据

      var jiangSuData = [];
      var jiangSuTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("320000");
      });
      jiangSuData = jiangSuData.concat(jiangSuTemp);

      for (var key in jiangSuData) {
        jiangSuAmountData.push(jiangSuData[key].transPrice);
        jiangSuAreaData.push(jiangSuData[key].areaSum);
        jiangSuNumberData.push(jiangSuData[key].resulCount);
      }

      var jiangSuAmountSum = 0;
      var jiangSuAreaSum = 0;
      var jiangSuNumberSum = 0;

      jiangSuAmountSum ? 0 : (jiangSuAmountSum = sum(jiangSuAmountData));
      jiangSuAreaSum ? 0 : (jiangSuAreaSum = sum(jiangSuAreaData));
      jiangSuNumberSum ? 0 : (jiangSuNumberSum = sum(jiangSuNumberData));

      if (jiangSuData == "") {
        jiangSuAmountSum = 0;
        jiangSuAreaSum = 0;
        jiangSuNumberSum = 0;
      }
      //浙江省
      var zheJiangAmountData = []; //浙江省所有用途金额图表数据
      var zheJiangAreaData = []; //浙江省所有用途面积图表数据
      var zheJiangNumberData = []; //浙江省所有用途宗数图表数据

      var zheJiangData = [];
      var zheJiangTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("330000");
      });
      zheJiangData = zheJiangData.concat(zheJiangTemp);

      for (var key in zheJiangData) {
        zheJiangAmountData.push(zheJiangData[key].transPrice);
        zheJiangAreaData.push(zheJiangData[key].areaSum);
        zheJiangNumberData.push(zheJiangData[key].resulCount);
      }

      var zheJiangAmountSum = 0;
      var zheJiangAreaSum = 0;
      var zheJiangNumberSum = 0;

      zheJiangAmountSum ? 0 : (zheJiangAmountSum = sum(zheJiangAmountData));
      zheJiangAreaSum ? 0 : (zheJiangAreaSum = sum(zheJiangAreaData));
      zheJiangNumberSum ? 0 : (zheJiangNumberSum = sum(zheJiangNumberData));

      if (zheJiangData == "") {
        zheJiangAmountSum = 0;
        zheJiangAreaSum = 0;
        zheJiangNumberSum = 0;
      }
      //河南省
      var heNanAmountData = []; //河南省所有用途金额图表数据
      var heNanAreaData = []; //河南省所有用途面积图表数据
      var heNanNumberData = []; //河南省所有用途宗数图表数据

      var heNanData = [];
      var heNanTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("410000");
      });
      heNanData = heNanData.concat(heNanTemp);

      for (var key in heNanData) {
        heNanAmountData.push(heNanData[key].transPrice);
        heNanAreaData.push(heNanData[key].areaSum);
        heNanNumberData.push(heNanData[key].resulCount);
      }

      var heNanAmountSum = 0;
      var heNanAreaSum = 0;
      var heNanNumberSum = 0;

      heNanAmountSum ? 0 : (heNanAmountSum = sum(heNanAmountData));
      heNanAreaSum ? 0 : (heNanAreaSum = sum(heNanAreaData));
      heNanNumberSum ? 0 : (heNanNumberSum = sum(heNanNumberData));

      if (heNanData == "") {
        heNanAmountSum = 0;
        heNanAreaSum = 0;
        heNanNumberSum = 0;
      }
      //湖北省
      var huBeiAmountData = []; //湖北省所有用途金额图表数据
      var huBeiAreaData = []; //湖北省所有用途面积图表数据
      var huBeiNumberData = []; //湖北省所有用途宗数图表数据

      var huBeiData = [];
      var huBeiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("420000");
      });
      huBeiData = huBeiData.concat(huBeiTemp);

      for (var key in huBeiData) {
        huBeiAmountData.push(huBeiData[key].transPrice);
        huBeiAreaData.push(huBeiData[key].areaSum);
        huBeiNumberData.push(huBeiData[key].resulCount);
      }

      var huBeiAmountSum = 0;
      var huBeiAreaSum = 0;
      var huBeiNumberSum = 0;

      huBeiAmountSum ? 0 : (huBeiAmountSum = sum(huBeiAmountData));
      huBeiAreaSum ? 0 : (huBeiAreaSum = sum(huBeiAreaData));
      huBeiNumberSum ? 0 : (huBeiNumberSum = sum(huBeiNumberData));

      if (huBeiData == "") {
        huBeiAmountSum = 0;
        huBeiAreaSum = 0;
        huBeiNumberSum = 0;
      }
      //湖南省
      var huNanAmountData = []; //湖南省所有用途金额图表数据
      var huNanAreaData = []; //湖南省所有用途面积图表数据
      var huNanNumberData = []; //湖南省所有用途宗数图表数据

      var huNanData = [];
      var huNanTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("430000");
      });
      huNanData = huNanData.concat(huNanTemp);

      for (var key in huNanData) {
        huNanAmountData.push(huNanData[key].transPrice);
        huNanAreaData.push(huNanData[key].areaSum);
        huNanNumberData.push(huNanData[key].resulCount);
      }

      var huNanAmountSum = 0;
      var huNanAreaSum = 0;
      var huNanNumberSum = 0;

      huNanAmountSum ? 0 : (huNanAmountSum = sum(huNanAmountData));
      huNanAreaSum ? 0 : (huNanAreaSum = sum(huNanAreaData));
      huNanNumberSum ? 0 : (huNanNumberSum = sum(huNanNumberData));

      if (huNanData == "") {
        huNanAmountSum = 0;
        huNanAreaSum = 0;
        huNanNumberSum = 0;
      }
      //广东省
      var guangDongAmountData = []; //广东省所有用途金额图表数据
      var guangDongAreaData = []; //广东省所有用途面积图表数据
      var guangDongNumberData = []; //广东省所有用途宗数图表数据

      var guangDongData = [];
      var guangDongTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("440000");
      });
      guangDongData = guangDongData.concat(guangDongTemp);

      for (var key in guangDongData) {
        guangDongAmountData.push(guangDongData[key].transPrice);
        guangDongAreaData.push(guangDongData[key].areaSum);
        guangDongNumberData.push(guangDongData[key].resulCount);
      }

      var guangDongAmountSum = 0;
      var guangDongAreaSum = 0;
      var guangDongNumberSum = 0;

      guangDongAmountSum ? 0 : (guangDongAmountSum = sum(guangDongAmountData));
      guangDongAreaSum ? 0 : (guangDongAreaSum = sum(guangDongAreaData));
      guangDongNumberSum ? 0 : (guangDongNumberSum = sum(guangDongNumberData));

      console.log(guangDongData);
      console.log(guangDongAmountData);
      console.log(guangDongAreaData);
      console.log(guangDongNumberData);
      console.log(guangDongAmountSum);
      console.log(guangDongAreaSum);
      console.log(guangDongNumberSum);

      if (guangDongData == "") {
        guangDongAmountSum = 0;
        guangDongAreaSum = 0;
        guangDongNumberSum = 0;
      }
      //重庆省
      var chongQingAmountData = []; //重庆省所有用途金额图表数据
      var chongQingAreaData = []; //重庆省所有用途面积图表数据
      var chongQingNumberData = []; //重庆省所有用途宗数图表数据

      var chongQingData = [];
      var chongQingTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("500000");
      });
      chongQingData = chongQingData.concat(chongQingTemp);

      for (var key in chongQingData) {
        chongQingAmountData.push(chongQingData[key].transPrice);
        chongQingAreaData.push(chongQingData[key].areaSum);
        chongQingNumberData.push(chongQingData[key].resulCount);
      }

      var chongQingAmountSum = 0;
      var chongQingAreaSum = 0;
      var chongQingNumberSum = 0;

      chongQingAmountSum ? 0 : (chongQingAmountSum = sum(chongQingAmountData));
      chongQingAreaSum ? 0 : (chongQingAreaSum = sum(chongQingAreaData));
      chongQingNumberSum ? 0 : (chongQingNumberSum = sum(chongQingNumberData));

      if (chongQingData == "") {
        chongQingAmountSum = 0;
        chongQingAreaSum = 0;
        chongQingNumberSum = 0;
      }
      //四川省
      var siChuanAmountData = []; //四川省所有用途金额图表数据
      var siChuanAreaData = []; //四川省所有用途面积图表数据
      var siChuanNumberData = []; //四川省所有用途宗数图表数据

      var siChuanData = [];
      var siChuanTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("510000");
      });
      siChuanData = siChuanData.concat(siChuanTemp);

      for (var key in siChuanData) {
        siChuanAmountData.push(siChuanData[key].transPrice);
        siChuanAreaData.push(siChuanData[key].areaSum);
        siChuanNumberData.push(siChuanData[key].resulCount);
      }

      var siChuanAmountSum = 0;
      var siChuanAreaSum = 0;
      var siChuanNumberSum = 0;

      siChuanAmountSum ? 0 : (siChuanAmountSum = sum(siChuanAmountData));
      siChuanAreaSum ? 0 : (siChuanAreaSum = sum(siChuanAreaData));
      siChuanNumberSum ? 0 : (siChuanNumberSum = sum(siChuanNumberData));

      if (siChuanData == "") {
        siChuanAmountSum = 0;
        siChuanAreaSum = 0;
        siChuanNumberSum = 0;
      }
      //云南省
      var yunNanAmountData = []; //云南省所有用途金额图表数据
      var yunNanAreaData = []; //云南省所有用途面积图表数据
      var yunNanNumberData = []; //云南省所有用途宗数图表数据

      var yunNanData = [];
      var yunNanTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("530000");
      });
      yunNanData = yunNanData.concat(yunNanTemp);

      for (var key in yunNanData) {
        yunNanAmountData.push(yunNanData[key].transPrice);
        yunNanAreaData.push(yunNanData[key].areaSum);
        yunNanNumberData.push(yunNanData[key].resulCount);
      }

      var yunNanAmountSum = 0;
      var yunNanAreaSum = 0;
      var yunNanNumberSum = 0;

      yunNanAmountSum ? 0 : (yunNanAmountSum = sum(yunNanAmountData));
      yunNanAreaSum ? 0 : (yunNanAreaSum = sum(yunNanAreaData));
      yunNanNumberSum ? 0 : (yunNanNumberSum = sum(yunNanNumberData));

      if (yunNanData == "") {
        yunNanAmountSum = 0;
        yunNanAreaSum = 0;
        yunNanNumberSum = 0;
      }
      //青海省
      var qingHaiAmountData = []; //青海省所有用途金额图表数据
      var qingHaiAreaData = []; //青海省所有用途面积图表数据
      var qingHaiNumberData = []; //青海省所有用途宗数图表数据

      var qingHaiData = [];
      var qingHaiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("630000");
      });
      qingHaiData = qingHaiData.concat(qingHaiTemp);

      for (var key in qingHaiData) {
        qingHaiAmountData.push(qingHaiData[key].transPrice);
        qingHaiAreaData.push(qingHaiData[key].areaSum);
        qingHaiNumberData.push(qingHaiData[key].resulCount);
      }

      var qingHaiAmountSum = 0;
      var qingHaiAreaSum = 0;
      var qingHaiNumberSum = 0;

      qingHaiAmountSum ? 0 : (qingHaiAmountSum = sum(qingHaiAmountData));
      qingHaiAreaSum ? 0 : (qingHaiAreaSum = sum(qingHaiAreaData));
      qingHaiNumberSum ? 0 : (qingHaiNumberSum = sum(qingHaiNumberData));

      if (qingHaiData == "") {
        qingHaiAmountSum = 0;
        qingHaiAreaSum = 0;
        qingHaiNumberSum = 0;
      }
      //新疆省
      var xinJiangAmountData = []; //新疆省所有用途金额图表数据
      var xinJiangAreaData = []; //新疆省所有用途面积图表数据
      var xinJiangNumberData = []; //新疆省所有用途宗数图表数据

      var xinJiangData = [];
      var xinJiangTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("650000");
      });
      xinJiangData = xinJiangData.concat(xinJiangTemp);

      for (var key in xinJiangData) {
        xinJiangAmountData.push(xinJiangData[key].transPrice);
        xinJiangAreaData.push(xinJiangData[key].areaSum);
        xinJiangNumberData.push(xinJiangData[key].resulCount);
      }

      var xinJiangAmountSum = 0;
      var xinJiangAreaSum = 0;
      var xinJiangNumberSum = 0;

      xinJiangAmountSum ? 0 : (xinJiangAmountSum = sum(xinJiangAmountData));
      xinJiangAreaSum ? 0 : (xinJiangAreaSum = sum(xinJiangAreaData));
      xinJiangNumberSum ? 0 : (xinJiangNumberSum = sum(xinJiangNumberData));

      if (xinJiangData == "") {
        xinJiangAmountSum = 0;
        xinJiangAreaSum = 0;
        xinJiangNumberSum = 0;
      }
      //台湾省
      var taiWanAmountData = []; //台湾省所有用途金额图表数据
      var taiWanAreaData = []; //台湾省所有用途面积图表数据
      var taiWanNumberData = []; //台湾省所有用途宗数图表数据

      var taiWanData = [];
      var taiWanTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("710000");
      });
      taiWanData = taiWanData.concat(taiWanTemp);

      for (var key in taiWanData) {
        taiWanAmountData.push(taiWanData[key].transPrice);
        taiWanAreaData.push(taiWanData[key].areaSum);
        taiWanNumberData.push(taiWanData[key].resulCount);
      }

      var taiWanAmountSum = 0;
      var taiWanAreaSum = 0;
      var taiWanNumberSum = 0;

      taiWanAmountSum ? 0 : (taiWanAmountSum = sum(taiWanAmountData));
      taiWanAreaSum ? 0 : (taiWanAreaSum = sum(taiWanAreaData));
      taiWanNumberSum ? 0 : (taiWanNumberSum = sum(taiWanNumberData));

      if (taiWanData == "") {
        taiWanAmountSum = 0;
        taiWanAreaSum = 0;
        taiWanNumberSum = 0;
      }
      //香港
      var xiangGangAmountData = []; //香港所有用途金额图表数据
      var xiangGangAreaData = []; //香港所有用途面积图表数据
      var xiangGangNumberData = []; //香港所有用途宗数图表数据

      var xiangGangData = [];
      var xiangGangTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("810000");
      });
      xiangGangData = xiangGangData.concat(xiangGangTemp);

      for (var key in xiangGangData) {
        xiangGangAmountData.push(xiangGangData[key].transPrice);
        xiangGangAreaData.push(xiangGangData[key].areaSum);
        xiangGangNumberData.push(xiangGangData[key].resulCount);
      }

      var xiangGangAmountSum = 0;
      var xiangGangAreaSum = 0;
      var xiangGangNumberSum = 0;

      xiangGangAmountSum ? 0 : (xiangGangAmountSum = sum(xiangGangAmountData));
      xiangGangAreaSum ? 0 : (xiangGangAreaSum = sum(xiangGangAreaData));
      xiangGangNumberSum ? 0 : (xiangGangNumberSum = sum(xiangGangNumberData));

      if (xiangGangData == "") {
        xiangGangAmountSum = 0;
        xiangGangAreaSum = 0;
        xiangGangNumberSum = 0;
      }
      //澳门
      var aoMenAmountData = []; //澳门所有用途金额图表数据
      var aoMenAreaData = []; //澳门所有用途面积图表数据
      var aoMenNumberData = []; //澳门所有用途宗数图表数据

      var aoMenData = [];
      var aoMenTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("820000");
      });
      aoMenData = aoMenData.concat(aoMenTemp);

      for (var key in aoMenData) {
        aoMenAmountData.push(aoMenData[key].transPrice);
        aoMenAreaData.push(aoMenData[key].areaSum);
        aoMenNumberData.push(aoMenData[key].resulCount);
      }

      var aoMenAmountSum = 0;
      var aoMenAreaSum = 0;
      var aoMenNumberSum = 0;

      aoMenAmountSum ? 0 : (aoMenAmountSum = sum(aoMenAmountData));
      aoMenAreaSum ? 0 : (aoMenAreaSum = sum(aoMenAreaData));
      aoMenNumberSum ? 0 : (aoMenNumberSum = sum(aoMenNumberData));

      if (aoMenData == "") {
        aoMenAmountSum = 0;
        aoMenAreaSum = 0;
        aoMenNumberSum = 0;
      }
      //北京市
      var beiJingAmountData = []; //北京市所有用途金额图表数据
      var beiJingAreaData = []; //北京市所有用途面积图表数据
      var beiJingNumberData = []; //北京市所有用途宗数图表数据

      var beiJingData = [];
      var beiJingTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("110000");
      });
      beiJingData = beiJingData.concat(beiJingTemp);

      for (var key in beiJingData) {
        beiJingAmountData.push(beiJingData[key].transPrice);
        beiJingAreaData.push(beiJingData[key].areaSum);
        beiJingNumberData.push(beiJingData[key].resulCount);
      }

      var beiJingAmountSum = 0;
      var beiJingAreaSum = 0;
      var beiJingNumberSum = 0;

      beiJingAmountSum ? 0 : (beiJingAmountSum = sum(beiJingAmountData));
      beiJingAreaSum ? 0 : (beiJingAreaSum = sum(beiJingAreaData));
      beiJingNumberSum ? 0 : (beiJingNumberSum = sum(beiJingNumberData));

      if (beiJingData == "") {
        beiJingAmountSum = 0;
        beiJingAreaSum = 0;
        beiJingNumberSum = 0;
      }
      //辽宁省
      var liaoNingAmountData = []; //辽宁省所有用途金额图表数据
      var liaoNingAreaData = []; //辽宁省所有用途面积图表数据
      var liaoNingNumberData = []; //辽宁省所有用途宗数图表数据

      var liaoNingData = [];
      var liaoNingTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("210000");
      });
      liaoNingData = liaoNingData.concat(liaoNingTemp);

      for (var key in liaoNingData) {
        liaoNingAmountData.push(liaoNingData[key].transPrice);
        liaoNingAreaData.push(liaoNingData[key].areaSum);
        liaoNingNumberData.push(liaoNingData[key].resulCount);
      }

      var liaoNingAmountSum = 0;
      var liaoNingAreaSum = 0;
      var liaoNingNumberSum = 0;

      liaoNingAmountSum ? 0 : (liaoNingAmountSum = sum(liaoNingAmountData));
      liaoNingAreaSum ? 0 : (liaoNingAreaSum = sum(liaoNingAreaData));
      liaoNingNumberSum ? 0 : (liaoNingNumberSum = sum(liaoNingNumberData));

      if (liaoNingData == "") {
        liaoNingAmountSum = 0;
        liaoNingAreaSum = 0;
        liaoNingNumberSum = 0;
      }
      //吉林省
      var jiLinAmountData = []; //吉林省所有用途金额图表数据
      var jiLinAreaData = []; //吉林省所有用途面积图表数据
      var jiLinNumberData = []; //吉林省所有用途宗数图表数据

      var jiLinData = [];
      var jiLinTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("220000");
      });
      jiLinData = jiLinData.concat(jiLinTemp);

      for (var key in jiLinData) {
        jiLinAmountData.push(jiLinData[key].transPrice);
        jiLinAreaData.push(jiLinData[key].areaSum);
        jiLinNumberData.push(jiLinData[key].resulCount);
      }

      var jiLinAmountSum = 0;
      var jiLinAreaSum = 0;
      var jiLinNumberSum = 0;

      jiLinAmountSum ? 0 : (jiLinAmountSum = sum(jiLinAmountData));
      jiLinAreaSum ? 0 : (jiLinAreaSum = sum(jiLinAreaData));
      jiLinNumberSum ? 0 : (jiLinNumberSum = sum(jiLinNumberData));

      if (jiLinData == "") {
        jiLinAmountSum = 0;
        jiLinAreaSum = 0;
        jiLinNumberSum = 0;
      }
      //黑龙江省
      var heiLongJiangAmountData = []; //黑龙江省所有用途金额图表数据
      var heiLongJiangAreaData = []; //黑龙江省所有用途面积图表数据
      var heiLongJiangNumberData = []; //黑龙江省所有用途宗数图表数据

      var heiLongJiangData = [];
      var heiLongJiangTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("230000");
      });
      heiLongJiangData = heiLongJiangData.concat(heiLongJiangTemp);

      for (var key in heiLongJiangData) {
        heiLongJiangAmountData.push(heiLongJiangData[key].transPrice);
        heiLongJiangAreaData.push(heiLongJiangData[key].areaSum);
        heiLongJiangNumberData.push(heiLongJiangData[key].resulCount);
      }

      var heiLongJiangAmountSum = 0;
      var heiLongJiangAreaSum = 0;
      var heiLongJiangNumberSum = 0;

      heiLongJiangAmountSum
        ? 0
        : (heiLongJiangAmountSum = sum(heiLongJiangAmountData));
      heiLongJiangAreaSum
        ? 0
        : (heiLongJiangAreaSum = sum(heiLongJiangAreaData));
      heiLongJiangNumberSum
        ? 0
        : (heiLongJiangNumberSum = sum(heiLongJiangNumberData));

      if (heiLongJiangData == "") {
        heiLongJiangAmountSum = 0;
        heiLongJiangAreaSum = 0;
        heiLongJiangNumberSum = 0;
      }
      //上海市
      var shangHaiAmountData = []; //上海市所有用途金额图表数据
      var shangHaiAreaData = []; //上海市所有用途面积图表数据
      var shangHaiNumberData = []; //上海市所有用途宗数图表数据

      var shangHaiData = [];
      var shangHaiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("310000");
      });
      shangHaiData = shangHaiData.concat(shangHaiTemp);

      for (var key in shangHaiData) {
        shangHaiAmountData.push(shangHaiData[key].transPrice);
        shangHaiAreaData.push(shangHaiData[key].areaSum);
        shangHaiNumberData.push(shangHaiData[key].resulCount);
      }

      var shangHaiAmountSum = 0;
      var shangHaiAreaSum = 0;
      var shangHaiNumberSum = 0;

      shangHaiAmountSum ? 0 : (shangHaiAmountSum = sum(shangHaiAmountData));
      shangHaiAreaSum ? 0 : (shangHaiAreaSum = sum(shangHaiAreaData));
      shangHaiNumberSum ? 0 : (shangHaiNumberSum = sum(shangHaiNumberData));

      if (shangHaiData == "") {
        shangHaiAmountSum = 0;
        shangHaiAreaSum = 0;
        shangHaiNumberSum = 0;
      }
      //安徽省
      var anHuiAmountData = []; //安徽省所有用途金额图表数据
      var anHuiAreaData = []; //安徽省所有用途面积图表数据
      var anHuiNumberData = []; //安徽省所有用途宗数图表数据

      var anHuiData = [];
      var anHuiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("340000");
      });
      anHuiData = anHuiData.concat(anHuiTemp);

      for (var key in anHuiData) {
        anHuiAmountData.push(anHuiData[key].transPrice);
        anHuiAreaData.push(anHuiData[key].areaSum);
        anHuiNumberData.push(anHuiData[key].resulCount);
      }

      var anHuiAmountSum = 0;
      var anHuiAreaSum = 0;
      var anHuiNumberSum = 0;

      anHuiAmountSum ? 0 : (anHuiAmountSum = sum(anHuiAmountData));
      anHuiAreaSum ? 0 : (anHuiAreaSum = sum(anHuiAreaData));
      anHuiNumberSum ? 0 : (anHuiNumberSum = sum(anHuiNumberData));

      if (anHuiData == "") {
        anHuiAmountSum = 0;
        anHuiAreaSum = 0;
        anHuiNumberSum = 0;
      }
      //福建省
      var fuJianAmountData = []; //福建省所有用途金额图表数据
      var fuJianAreaData = []; //福建省所有用途面积图表数据
      var fuJianNumberData = []; //福建省所有用途宗数图表数据

      var fuJianData = [];
      var fuJianTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("350000");
      });
      fuJianData = fuJianData.concat(fuJianTemp);

      for (var key in fuJianData) {
        fuJianAmountData.push(fuJianData[key].transPrice);
        fuJianAreaData.push(fuJianData[key].areaSum);
        fuJianNumberData.push(fuJianData[key].resulCount);
      }

      var fuJianAmountSum = 0;
      var fuJianAreaSum = 0;
      var fuJianNumberSum = 0;

      fuJianAmountSum ? 0 : (fuJianAmountSum = sum(fuJianAmountData));
      fuJianAreaSum ? 0 : (fuJianAreaSum = sum(fuJianAreaData));
      fuJianNumberSum ? 0 : (fuJianNumberSum = sum(fuJianNumberData));

      if (fuJianData == "") {
        fuJianAmountSum = 0;
        fuJianAreaSum = 0;
        fuJianNumberSum = 0;
      }
      //江西省
      var jiangXiAmountData = []; //江西省所有用途金额图表数据
      var jiangXiAreaData = []; //江西省所有用途面积图表数据
      var jiangXiNumberData = []; //江西省所有用途宗数图表数据

      var jiangXiData = [];
      var jiangXiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("360000");
      });
      jiangXiData = jiangXiData.concat(jiangXiTemp);

      for (var key in jiangXiData) {
        jiangXiAmountData.push(jiangXiData[key].transPrice);
        jiangXiAreaData.push(jiangXiData[key].areaSum);
        jiangXiNumberData.push(jiangXiData[key].resulCount);
      }

      var jiangXiAmountSum = 0;
      var jiangXiAreaSum = 0;
      var jiangXiNumberSum = 0;

      jiangXiAmountSum ? 0 : (jiangXiAmountSum = sum(jiangXiAmountData));
      jiangXiAreaSum ? 0 : (jiangXiAreaSum = sum(jiangXiAreaData));
      jiangXiNumberSum ? 0 : (jiangXiNumberSum = sum(jiangXiNumberData));

      if (jiangXiData == "") {
        jiangXiAmountSum = 0;
        jiangXiAreaSum = 0;
        jiangXiNumberSum = 0;
      }
      //广西
      var guangXiAmountData = []; //广西所有用途金额图表数据
      var guangXiAreaData = []; //广西所有用途面积图表数据
      var guangXiNumberData = []; //广西所有用途宗数图表数据

      var guangXiData = [];
      var guangXiTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("450000");
      });
      guangXiData = guangXiData.concat(guangXiTemp);

      for (var key in guangXiData) {
        guangXiAmountData.push(guangXiData[key].transPrice);
        guangXiAreaData.push(guangXiData[key].areaSum);
        guangXiNumberData.push(guangXiData[key].resulCount);
      }

      var guangXiAmountSum = 0;
      var guangXiAreaSum = 0;
      var guangXiNumberSum = 0;

      guangXiAmountSum ? 0 : (guangXiAmountSum = sum(guangXiAmountData));
      guangXiAreaSum ? 0 : (guangXiAreaSum = sum(guangXiAreaData));
      guangXiNumberSum ? 0 : (guangXiNumberSum = sum(guangXiNumberData));

      if (guangXiData == "") {
        guangXiAmountSum = 0;
        guangXiAreaSum = 0;
        guangXiNumberSum = 0;
      }
      //海南省
      var haiNanAmountData = []; //海南省所有用途金额图表数据
      var haiNanAreaData = []; //海南省所有用途面积图表数据
      var haiNanNumberData = []; //海南省所有用途宗数图表数据

      var haiNanData = [];
      var haiNanTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("460000");
      });
      haiNanData = haiNanData.concat(haiNanTemp);

      for (var key in haiNanData) {
        haiNanAmountData.push(haiNanData[key].transPrice);
        haiNanAreaData.push(haiNanData[key].areaSum);
        haiNanNumberData.push(haiNanData[key].resulCount);
      }

      var haiNanAmountSum = 0;
      var haiNanAreaSum = 0;
      var haiNanNumberSum = 0;

      haiNanAmountSum ? 0 : (haiNanAmountSum = sum(haiNanAmountData));
      haiNanAreaSum ? 0 : (haiNanAreaSum = sum(haiNanAreaData));
      haiNanNumberSum ? 0 : (haiNanNumberSum = sum(haiNanNumberData));

      if (haiNanData == "") {
        haiNanAmountSum = 0;
        haiNanAreaSum = 0;
        haiNanNumberSum = 0;
      }
      //贵州省
      var guiZhouAmountData = []; //贵州省所有用途金额图表数据
      var guiZhouAreaData = []; //贵州省所有用途面积图表数据
      var guiZhouNumberData = []; //贵州省所有用途宗数图表数据

      var guiZhouData = [];
      var guiZhouTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("520000");
      });
      guiZhouData = guiZhouData.concat(guiZhouTemp);

      for (var key in guiZhouData) {
        guiZhouAmountData.push(guiZhouData[key].transPrice);
        guiZhouAreaData.push(guiZhouData[key].areaSum);
        guiZhouNumberData.push(guiZhouData[key].resulCount);
      }

      var guiZhouAmountSum = 0;
      var guiZhouAreaSum = 0;
      var guiZhouNumberSum = 0;

      guiZhouAmountSum ? 0 : (guiZhouAmountSum = sum(guiZhouAmountData));
      guiZhouAreaSum ? 0 : (guiZhouAreaSum = sum(guiZhouAreaData));
      guiZhouNumberSum ? 0 : (guiZhouNumberSum = sum(guiZhouNumberData));

      if (guiZhouData == "") {
        guiZhouAmountSum = 0;
        guiZhouAreaSum = 0;
        guiZhouNumberSum = 0;
      }
      //西藏
      var xiZangAmountData = []; //西藏所有用途金额图表数据
      var xiZangAreaData = []; //西藏所有用途面积图表数据
      var xiZangNumberData = []; //西藏所有用途宗数图表数据

      var xiZangData = [];
      var xiZangTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("540000");
      });
      xiZangData = xiZangData.concat(xiZangTemp);

      for (var key in xiZangData) {
        xiZangAmountData.push(xiZangData[key].transPrice);
        xiZangAreaData.push(xiZangData[key].areaSum);
        xiZangNumberData.push(xiZangData[key].resulCount);
      }

      var xiZangAmountSum = 0;
      var xiZangAreaSum = 0;
      var xiZangNumberSum = 0;

      xiZangAmountSum ? 0 : (xiZangAmountSum = sum(xiZangAmountData));
      xiZangAreaSum ? 0 : (xiZangAreaSum = sum(xiZangAreaData));
      xiZangNumberSum ? 0 : (xiZangNumberSum = sum(xiZangNumberData));

      if (xiZangData == "") {
        xiZangAmountSum = 0;
        xiZangAreaSum = 0;
        xiZangNumberSum = 0;
      }
      //陕西省
      var shanXIAmountData = []; //陕西省所有用途金额图表数据
      var shanXIAreaData = []; //陕西省所有用途面积图表数据
      var shanXINumberData = []; //陕西省所有用途宗数图表数据

      var shanXIData = [];
      var shanXITemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("610000");
      });
      shanXIData = shanXIData.concat(shanXITemp);

      for (var key in shanXIData) {
        shanXIAmountData.push(shanXIData[key].transPrice);
        shanXIAreaData.push(shanXIData[key].areaSum);
        shanXINumberData.push(shanXIData[key].resulCount);
      }

      var shanXIAmountSum = 0;
      var shanXIAreaSum = 0;
      var shanXINumberSum = 0;

      shanXIAmountSum ? 0 : (shanXIAmountSum = sum(shanXIAmountData));
      shanXIAreaSum ? 0 : (shanXIAreaSum = sum(shanXIAreaData));
      shanXINumberSum ? 0 : (shanXINumberSum = sum(shanXINumberData));

      if (shanXIData == "") {
        shanXIAmountSum = 0;
        shanXIAreaSum = 0;
        shanXINumberSum = 0;
      }
      //甘肃省
      var ganSuAmountData = []; //甘肃省所有用途金额图表数据
      var ganSuAreaData = []; //甘肃省所有用途面积图表数据
      var ganSuNumberData = []; //甘肃省所有用途宗数图表数据

      var ganSuData = [];
      var ganSuTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("620000");
      });
      ganSuData = ganSuData.concat(ganSuTemp);

      for (var key in ganSuData) {
        ganSuAmountData.push(ganSuData[key].transPrice);
        ganSuAreaData.push(ganSuData[key].areaSum);
        ganSuNumberData.push(ganSuData[key].resulCount);
      }

      var ganSuAmountSum = 0;
      var ganSuAreaSum = 0;
      var ganSuNumberSum = 0;

      ganSuAmountSum ? 0 : (ganSuAmountSum = sum(ganSuAmountData));
      ganSuAreaSum ? 0 : (ganSuAreaSum = sum(ganSuAreaData));
      ganSuNumberSum ? 0 : (ganSuNumberSum = sum(ganSuNumberData));

      if (ganSuData == "") {
        ganSuAmountSum = 0;
        ganSuAreaSum = 0;
        ganSuNumberSum = 0;
      }
      //宁夏
      var ningXiaAmountData = []; //宁夏所有用途金额图表数据
      var ningXiaAreaData = []; //宁夏所有用途面积图表数据
      var ningXiaNumberData = []; //宁夏所有用途宗数图表数据

      var ningXiaData = [];
      var ningXiaTemp = chartData.filter(function(i) {
        return i.cantonProvince.includes("640000");
      });
      ningXiaData = ningXiaData.concat(ningXiaTemp);

      for (var key in ningXiaData) {
        ningXiaAmountData.push(ningXiaData[key].transPrice);
        ningXiaAreaData.push(ningXiaData[key].areaSum);
        ningXiaNumberData.push(ningXiaData[key].resulCount);
      }

      var ningXiaAmountSum = 0;
      var ningXiaAreaSum = 0;
      var ningXiaNumberSum = 0;

      ningXiaAmountSum ? 0 : (ningXiaAmountSum = sum(ningXiaAmountData));
      ningXiaAreaSum ? 0 : (ningXiaAreaSum = sum(ningXiaAreaData));
      ningXiaNumberSum ? 0 : (ningXiaNumberSum = sum(ningXiaNumberData));

      if (ningXiaData == "") {
        ningXiaAmountSum = 0;
        ningXiaAreaSum = 0;
        ningXiaNumberSum = 0;
      }

      var kongAmountData = [];
      var kongAreaData = [];
      var kongNumberData = [];
      var allAmountData = kongAmountData.concat(
        neiMengGuAmountSum,
        tianJinAmountSum,
        heBeiAmountSum,
        shanXiAmountSum,
        jiangSuAmountSum,
        zheJiangAmountSum,
        shanDongAmountSum,
        heNanAmountSum,
        huBeiAmountSum,
        huNanAmountSum,
        guangDongAmountSum,
        chongQingAmountSum,
        siChuanAmountSum,
        yunNanAmountSum,
        qingHaiAmountSum,
        xinJiangAmountSum,
        taiWanAmountSum,
        xiangGangAmountSum,
        aoMenAmountSum,
        beiJingAmountSum,
        liaoNingAmountSum,
        jiLinAmountSum,
        heiLongJiangAmountSum,
        shangHaiAmountSum,
        anHuiAmountSum,
        fuJianAmountSum,
        jiangXiAmountSum,
        guangXiAmountSum,
        haiNanAmountSum,
        guiZhouAmountSum,
        xiZangAmountSum,
        shanXIAmountSum,
        ganSuAmountSum,
        ningXiaAmountSum
      );
      var allAreaData = kongAreaData.concat(
        neiMengGuAreaSum,
        tianJinAreaSum,
        heBeiAreaSum,
        shanXiAreaSum,
        jiangSuAreaSum,
        zheJiangAreaSum,
        shanDongAreaSum,
        heNanAreaSum,
        huBeiAreaSum,
        huNanAreaSum,
        guangDongAreaSum,
        chongQingAreaSum,
        siChuanAreaSum,
        yunNanAreaSum,
        qingHaiAreaSum,
        xinJiangAreaSum,
        taiWanAreaSum,
        xiangGangAreaSum,
        aoMenAreaSum,
        beiJingAreaSum,
        liaoNingAreaSum,
        jiLinAreaSum,
        heiLongJiangAreaSum,
        shangHaiAreaSum,
        anHuiAreaSum,
        fuJianAreaSum,
        jiangXiAreaSum,
        guangXiAreaSum,
        haiNanAreaSum,
        guiZhouAreaSum,
        xiZangAreaSum,
        shanXIAreaSum,
        ganSuAreaSum,
        ningXiaAreaSum
      );
      var allNumberData = kongNumberData.concat(
        neiMengGuNumberSum,
        tianJinNumberSum,
        heBeiNumberSum,
        shanXiNumberSum,
        jiangSuNumberSum,
        zheJiangNumberSum,
        shanDongNumberSum,
        heNanNumberSum,
        huBeiNumberSum,
        huNanNumberSum,
        guangDongNumberSum,
        chongQingNumberSum,
        siChuanNumberSum,
        yunNanNumberSum,
        qingHaiNumberSum,
        xinJiangNumberSum,
        taiWanNumberSum,
        xiangGangNumberSum,
        aoMenNumberSum,
        beiJingNumberSum,
        liaoNingNumberSum,
        jiLinNumberSum,
        heiLongJiangNumberSum,
        shangHaiNumberSum,
        anHuiNumberSum,
        fuJianNumberSum,
        jiangXiNumberSum,
        guangXiNumberSum,
        haiNanNumberSum,
        guiZhouNumberSum,
        xiZangNumberSum,
        shanXINumberSum,
        ganSuNumberSum,
        ningXiaNumberSum
      );

      var allAmountDataMax = Math.max.apply(Math, allAmountData);
      var allAreaDataMax = Math.max.apply(Math, allAreaData);
      var allNumberDataMax = Math.max.apply(Math, allNumberData);

      // var useNAMEData = []; //住宅用地宗数图表数据

      // for (var key in chartData) {
      //   useNAMEData.push(chartData[key].firstClassUseName);
      // }
      // console.log(useNAMEData);
      // var useNAMENewData = [...new Set(useNAMEData)];
      // console.log(useNAMENewData);

      //循环结束

      // let set = new Set(provinceData);
      // let newProvinceData = Array.from(set);
      // console.log(newProvinceData);

      console.log(allAmountData);
      console.log(allAreaData);
      console.log(allNumberData);
      console.log(allAmountDataMax);
      console.log(allAreaDataMax);
      console.log(allNumberDataMax);

      var unitName = "";
      var maxData = "";
      if (this.filterData.analyze == "金额") {
        unitName = "单位：万元";
        maxData = allAmountDataMax;
      } else if (this.filterData.analyze == "面积") {
        unitName = "单位：万平方米";
        maxData = allAreaDataMax;
      } else if (this.filterData.analyze == "宗数") {
        unitName = "单位：宗";
        maxData = allNumberDataMax;
      }

      console.log(maxData);

      console.log(dataALLList);
      var series = [];
      for (var i = 0; i < dataALLList.length; i++) {
        series.push({
          name: dataALLList[i].name, //用地
          stack: "one",
          type: "bar",
          barWidth: "40px",
          data: dataALLList[i].value
        });
      }

      // 绘制图表
      var option = {
        color: [
          "#35bece",
          "#56e6e8",
          "#8d80ed",
          "#5587e3",
          "#80a6ed",
          "#8055e3",
          "#feb55e",
          "#fed55e",
          "#ff9f00",
          "#a5f240",
          "#690d59",
          "#d101c2",
          "#417d76",
          "#cff935",
          "#38c530"
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "10%",
          containLabel: true
        },
        legend: [
          {
            left: "10%",
            top: "0%",
            itemGap: 30,
            data: ["全部"],
            selected: this.totalChecked
          },
          {
            x: "center",
            top: "0%",
            itemGap: 30,
            data: newUseNameData,
            selected: this.legendNameSelectedData
          }
        ],
        xAxis: [
          {
            name: areaName,
            type: "category",
            data: newProvinceData,
            axisTick: {
              alignWithLabel: true,
              show: false //不要刻度
            },
            axisLine: {
              show: false //不要x轴
            }
          }
        ],
        dataZoom: [
          {
            type: "inside",
            show: true,
            xAxisIndex: [0],
            start: 0, //默认为1
            end: 100
          }
        ],
        yAxis: [
          {
            name: unitName,
            type: "value",
            interval: Math.ceil(maxData / 5),
            max: Math.ceil(maxData),
            splitLine: {
              //网格线
              lineStyle: {
                type: "dashed" //设置网格线类型 dotted：虚线   solid:实线
              },
              show: true //隐藏或显示
            },
            axisTick: {
              alignWithLabel: true,
              show: false //不要刻度
            },
            axisLine: {
              show: false //不要x轴
            }
          }
        ],
        series: [
          {
            name: "全部", //用地
            stack: "one",
            type: "bar",
            barWidth: "40px"
          }
        ].concat(series)
      };
      purposeChart.setOption(option, true);
      purposeChart.on("legendselectchanged", obj => {
        if (obj.name == "全部") {
          for (var item in obj.selected) {
            if (obj.selected["全部"] == true) {
              this.checked = true;
              obj.selected[item] == true;
              this.totalChecked = { 全部: true };
            } else if (obj.selected["全部"] == false) {
              this.checked = false;
              obj.selected[item] == false;
              this.totalChecked = { 全部: false };
            }
          }
        }
      });
    },
    initEchart() {
      window.addEventListener("resize", () => {
        let purposeChart = echarts.init(
          document.getElementById("purposeChart")
        );
        document.getElementById("purposeChart").style.width = 100 + "%";
        purposeChart.resize();
      });
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
      this.dictionary.trans_status.splice(1, 1);
      console.log(this.dictionary.land_use);
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
    this.getList();
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.purposeDrawLine();
      }, 1000);
    });
    this.initEchart();

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
  watch: {
    //     checkedTypes: function(val, oldVal) {
    //       // this.selection = this.checkedTypes;
    //       // console.log(this.selection);
    //       let a=oldVal,b=val,c = [...a, ...b],d = new Set(c),e = Array.from(d),f = [...e.filter(_=>!a.includes(_)),...e.filter(_=>!b.includes(_))]
    // console.log(f);

    // // this.noSameList=f.map((item)=>item).join('');
    // this.noSameList=f;

    // console.log(this.noSameList);
    //  this.purposeDrawLine();
    //     },
    checkAll(val) {
      if (val == true) {
        this.useName = "";
        this.checkMore = true;
      } else if (val == false) {
        this.checkMore = false;
      }
    },
    //    useName(val){
    // if (this.activeName == "graph") {
    //         this.purposeDrawLine();
    //       } else if (this.activeName == "list") {
    //         this.getList();
    //       }
    //    },
    selection() {
      if (this.activeName == "graph") {
        this.purposeDrawLine();
      } else if (this.activeName == "list") {
        this.getList();
      }
    },
    timeCycleName(val) {
      if (this.activeName == "graph") {
        this.purposeDrawLine();
      } else if (this.activeName == "list") {
        this.getList();
      }
    },
    checked(val) {
      this.purposeDrawLine();
    }
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
  width: 100%;
  display: flex;
  flex-direction: column;
}
.operCycle .derive {
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
  margin-left: auto;
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
.page-body .el-input__inner {
  height: 32px;
}
</style>
