<template>
  <!-- <div>需求统计</div> -->
  <div class="page-body">
    <div class="filter_wrap">
      <div
        class="switchHeight_box"
        :style="{
          overflow: !flexibleOpen ? 'hidden' : '',
          height: !flexibleOpen ? '73px' : 'auto'
        }"
      >
        <el-form :model="useFilterData" label-width="115px">
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
                        dictionaryCode.administrative_regions,
                        filterData.cantonProvinceName,
                        $event
                      )
                    "
                    :disabled="provinceCheck"
                  >
                    <el-option
                      v-for="(item,
                      index) in dictionaryCode.administrative_regions"
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
                        dictionaryCode.cantonCity,
                        filterData.cantonCityName,
                        $event
                      )
                    "
                    :disabled="cityCheck"
                  >
                    <el-option
                      v-for="(item, index) in dictionaryCode.cantonCity"
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
                        dictionaryCode.cantonArea,
                        filterData.cantonAreaName,
                        $event
                      )
                    "
                    :disabled="AreaCheck"
                  >
                    <el-option
                      v-for="(item, index) in dictionaryCode.cantonArea"
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
                    size="small"
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
                    size="small"
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
              class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-6 ant-col-xl-8 ant-col-xxl-8"
              style="padding-left: 8px; padding-right: 8px;"
              v-if="flexibleOpen"
            >
              <el-form-item label="发布时间：">
                <el-date-picker
                  size="small"
                  v-model="publishTime"
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
              class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-8 ant-col-lg-8 ant-col-xl-8 ant-col-xxl-6"
              style="padding-left: 8px; padding-right: 8px;"
              v-if="flexibleOpen"
            >
              <el-form-item label="需求类型：">
                <el-select
                  size="small"
                  v-model="filterData.purchasr"
                  placeholder="全部"
                  @change="
                    purchasrSelect(
                      dictionary.purchasr_demand,
                      filterData.purchasr,
                      $event
                    )
                  "
                  style="width:80%;"
                >
                  <el-option
                    v-for="(item, index) in dictionary.purchasr_demand"
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

      <div class="switchHeight_box" style="padding-top:0">
        <el-tabs>
          <div class="toolsTitleBox">
            <span class="toolsTitle">需求统计列表</span>
            <span class="button_export"
              ><a :href="href" style="color: #ffa000;">导出</a></span
            >
          </div>
          <el-table
            ref="multipleTable"
            :data="demandData"
            v-loading="loading"
            element-loading-text="数据加载中"
            element-loading-background="rgba(255, 255, 255,0.95)"
            style="width: 100%;min-height:80px;"
            border
            tooltip-effect="dark"
            :summary-method="getSummaries"
            show-summary
          >
            <el-table-column label="序号" min-width="85" align="center">
              <template slot-scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column label="行政区域" min-width="315">
              <template slot-scope="scope">
                <span
                  >{{ scope.row.cantonProvinceName
                  }}<span v-show="cityShow"
                    >/{{ scope.row.cantonCityName
                    }}<span v-show="areaShow"
                      >/{{ scope.row.cantonAreaName }}</span
                    ></span
                  ></span
                >
              </template>
            </el-table-column>
            <el-table-column label="用途" min-width="470">
              <template slot-scope="scope">
                <span>{{ scope.row.firstClassUseName }}</span>
                <span v-if="scope.row.secondClassUseName != ''">/</span>
                <span v-if="scope.row.secondClassUseName != ''">{{
                  scope.row.secondClassUseName
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="demandName"
              label="需求类型"
              min-width="250"
            ></el-table-column>
            <el-table-column
              prop="price"
              label="需求金额（万元）"
              min-width="250"
            ></el-table-column>
            <el-table-column
              prop="area"
              label="面积（万平方米）"
              min-width="250"
              fixed="right"
            ></el-table-column>
          </el-table>
          <div style="text-align:right;margin:22px 0px;">
            <el-pagination
              background
              layout="total,prev, pager, next,sizes,jumper"
              :page-sizes="[5, 10, 15, 20]"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :total="totalRecord"
              :current-page="currentPage"
              :page-size="pageSize"
            ></el-pagination>
          </div>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";

export default {
  name: "demandStatistic",
  data() {
    return {
      flexibleOpen: false,
      //根据权限锁定省市
      provinceCheck: false,
      cityCheck: false,
      AreaCheck: false,
      cityShow: false,
      areaShow: false,
      //需求统计列表
      demandData: [],

      priceSum: "",
      areaSum: "",
      publishTime: "",
      params: {
        cantonProvince: "",
        cantonCity: "",
        cantonArea: "",
        firstClassUse: "",
        secondClassUse: "",
        publishTimeBegin: "",
        publishTimeEnd: "",
        demand: "",
        isExport: false //导出
      },

      //导出
      href: "/epf-monitor/monipurchase/queryGroupByCantonAndUse?isExport=true",

      //页码
      currentPage: 1,
      pageNo: 1, //页码
      pageSize: 5, //每页条数
      totalPage: 1,
      totalRecord: 1,

      loading: true,

      filterData: {
        cantonProvinceName: "", //省
        cantonProvince: "",
        cantonCityName: "", //市
        cantonCity: "",
        cantonAreaName: "", //区
        cantonArea: "",
        firstClassUseName: "", //一级土地用途
        firstClassUse: "",
        secondClassUseName: "", //二级土地用途
        secondClassUse: "",
        demand: "",
        purchasr: "",
        isExport: false //导出
      },
      dicRequest: [
        "flow_mode",
        "trans_status",
        "land_nature",
        "land_use",
        "purchasr_demand"
      ], //字典码请求
      dictionary: {
        //字典码结果
        flow_mode: "",
        trans_status: "",
        land_nature: "",
        land_use: "",
        purchasr_demand: "",
        // administrative_regions: "",
        // cantonCity: "",
        // cantonArea: "",
        land_use_second: ""
      },
      dictionaryCode: {
        administrative_regions: "",
        cantonCity: "",
        cantonArea: ""
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
    //获取列表
    getList(val) {
      this.loading = true;
      let params = this.params;
      params["page"] = this.pageNo;
      params["rows"] = this.pageSize;
      this.publishTime
        ? (params["publishTimeBegin"] = this.publishTime[0])
        : (params["publishTimeBegin"] = "");
      this.publishTime
        ? (params["publishTimeEnd"] = this.publishTime[1])
        : (params["publishTimeEnd"] = "");
      this.$get(
        `/epf-monitor/monipurchase/queryGroupByCantonAndUse`,
        params
      ).then(res => {
        console.log(res);
        if (res.code == "0") {
          this.demandData = res.pager.results;
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
          this.loading = false;
          this.href = `/api/epf-monitor/monipurchase/queryGroupByCantonAndUse?isExport=true&cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&demand=${this.params.demand}&publishTimeBegin=${this.params.publishTimeBegin}&publishTimeEnd=${this.params.publishTimeEnd}`;
          if (
            (this.params.cantonCity != "" && this.params.cantonCity != null) ||
            this.params.cantonCityName == "全部"
          ) {
            this.cityShow = true;
          } else {
            this.cityShow = false;
          }

          if (
            (this.params.cantonArea != "" && this.params.cantonArea != null) ||
            this.params.cantonAreaName == "全部"
          ) {
            this.areaShow = true;
          } else {
            this.areaShow = false;
          }
        } else {
          this.loading = false;
          this.$message.error(res.msg); //失败
          return;
        }
      });
    },
    getListSum(val) {
      let params = this.params;
      params["page"] = this.pageNo;
      params["rows"] = this.pageSize;
      this.publishTime
        ? (params["publishTimeBegin"] = this.publishTime[0])
        : (params["publishTimeBegin"] = "");
      this.publishTime
        ? (params["publishTimeEnd"] = this.publishTime[1])
        : (params["publishTimeEnd"] = "");

      this.$get(
        `/epf-monitor/monipurchase/queryGroupByCantonAndUseSum`,
        params
      ).then(res => {
        console.log(res);
        if (res.code == "0") {
          this.priceSum = res.result.priceSum;
          this.areaSum = res.result.areaSum;
        } else {
          this.$message.error(res.msg); //失败
          return;
        }
      });
    },
    resetFilter() {
      this.cityShow = false;
      this.areaShow = false;
      this.publishTime = "";
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
      }
      this.filterData.isExport = false;
      //可看到全国数据
      // this.getList();
      //可看到用户所在区域数据
      this.getCodeData();
      this.getListSum();
    },
    //获取当前用户所在的区域的ID-------------------------目前sessionStorage存的是省份
    getCodeData() {
      let regional = sessionStorage.getItem("regional");
      //设置请求的地址
      let url = `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000`;
      if (regional) {
        this.regional = regional;
        url = `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000&code=${regional}`;
      }
      this.$get(url, {}).then(res => {
        console.log(res);
        this.dictionaryCode.administrative_regions = res.dictionariesList;
        this.filterData.cantonProvinceName = res.dictionariesList[0].regionName;
        this.params["cantonProvince"] = res.dictionariesList[0].regionCode;
        this.getList(this.params);
        // 获取当前用户所在的下一级信息
        let url = "";
        if (this.regional) {
          url = `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${this.regional}`;
        }
        this.$get(url, {}).then(res => {
          console.log(res);
          if (res.dictionariesList.length != 0) {
            let obj = {
              regionCode: "",
              regionName: "全部",
              id: "0"
            };
            this.dictionaryCode.cantonCity = res.dictionariesList;
            this.dictionaryCode.cantonCity.unshift(obj);
            return;
          }
          this.dictionaryCode.cantonCity = "";
        });
      });
    },
    searchList() {
      this.params = this.filterData;
      this.params["demand"] = this.filterData.demand;
      if (this.publishTime) {
        this.params["publishTimeBegin"] = this.publishTime[0];
        this.params["publishTimeEnd"] = this.publishTime[1];
      }
      this.getList();
      this.getListSum();
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
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        } else if (index == 4) {
          sums[index] = this.priceSum;
        } else if (index === 5) {
          sums[index] = this.areaSum;
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },
    //字典选择
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
          this.dictionaryCode.cantonArea = res.dictionariesList;
          this.dictionaryCode.cantonArea.unshift(this.dictObj);
          return;
        }
        this.dictionaryCode.cantonArea = "";
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
    purchasrSelect(dic, purchasr, event) {
      this.filterData.demand = this.$refs[purchasr][0].$attrs.dictKey;
    }
  },
  created() {
    const that = this;
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == "land_use") {
          this.$get(
            // `/epf-monitor/dictionaries/getDictsByCodeOrParentId?code=${item}`,
            `/epf-monitor/dictionaries/getDictsByCodeOrParentId?code=${item}`,
            { parentId: 0 }
          ).then(res => {
            resolve(res);
          });
        } else {
          this.$get(
            // `/epf-monitor/dictionaries/getDictEbyDictGroup/${item}`,
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
    // 显示所在区域
    this.getCodeData();
    //显示全国省份
    // this.$get(`/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000`,{}).then(res => {
    //   this.dictionary.administrative_regions = res.dictionariesList;
    // })

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
    this.getListSum();
  },
  mounted() {
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

.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
<style>
/* .filter_wrap .el-input--small .el-input__inner {
  height: 40px;
}
.filter_wrap .el-row {
  margin-bottom: 10px;
}
.filter_wrap .distpicker-address-wrapper select {
  width: 148px;
  height: 32px;
  font-size: 14px;
  line-height: 32px;
  padding: 0 10px;
} */

.filter_wrap .el-date-editor.el-input .el-input__icon {
  line-height: 32px;
  color: #8dc4f7;
}
.filter_wrap .el-input__prefix,
.el-input__suffix {
  width: 25px;
  font-size: 16px;
}
/* .el-table th,
.el-table tr {
  border:1px solid #ebeef5;
} */
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
.el-input__inner {
  height: 32px;
}
</style>
