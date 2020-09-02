<template>
  <!-- <div>项目交易汇总分析</div> -->
  <div class="page-body">
    <div class="filter_wrap">
      <div
        class="switchHeight_box"
        :style="{
          overflow: !flexibleOpen ? 'hidden' : '',
          height: !flexibleOpen ? '73px' : 'auto'
        }"
        v-if="!closeSelectPlace"
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
              class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-8 ant-col-xl-8 ant-col-xxl-8"
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
              <el-form-item label="交易状态：">
                <el-select
                  size="small"
                  v-model="filterData.trans_statusName"
                  placeholder="全部"
                  @change="
                    statusSelect(
                      dictionary.trans_status,
                      filterData.trans_statusName,
                      $event
                    )
                  "
                >
                  <el-option
                    v-for="(item, index) in dictionary.trans_status"
                    :ref="item.zhCn"
                    :id="item.id"
                    :dictKey="item.dictKey"
                    :label="item.zhCn"
                    :value="item.zhCn"
                    :key="index"
                    v-show="item.zhCn != '未公告'"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-8 ant-col-xl-8 ant-col-xxl-8"
              style="padding-left: 8px; padding-right: 8px;"
              v-if="flexibleOpen"
            >
              <el-form-item label="标的编号：">
                <el-input
                  v-model="goodsNo"
                  size="small"
                  placeholder="请输入地块或者标的编号"
                ></el-input>
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
      <el-tabs style="margin:20px;">
        <div class="toolsTitleBox">
          <span class="toolsTitle">数据列表</span>
          <span class="button_export">
            <a :href="href" style="color: #ffa000;">导出</a>
          </span>
        </div>
        <el-table
          ref="multipleTable"
          :data="dealData"
          v-loading="loading"
          element-loading-text="数据加载中"
          element-loading-background="rgba(255, 255, 255,0.95)"
          style="width: 100%;min-height:80px;"
          border
          tooltip-effect="dark"
        >
          <el-table-column label="序号" min-width="70" align="center">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="标的信息" min-width="240">
            <template slot-scope="scope">
              <p>标的编号：{{ scope.row.targetNo }}</p>
              <p>起始价：{{ scope.row.beginPrice }}万元</p>
              <p>地块数：{{ scope.row.goodsCount }}</p>
            </template>
          </el-table-column>
          <el-table-column label="行政区域" min-width="230">
            <template slot-scope="scope">
              <span
                >{{ scope.row.cantonProvinceName }}/{{
                  scope.row.cantonCityName
                }}/{{ scope.row.cantonAreaName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="circulationName"
            label="交易类型"
            min-width="85"
          ></el-table-column>
          <el-table-column
            prop="statusName"
            label="交易状态"
            min-width="90"
          ></el-table-column>
          <el-table-column
            prop="beginPrice"
            label="标的起始价（万元）"
            min-width="150"
          ></el-table-column>
          <el-table-column label="成交金额（万元）" min-width="150">
            <template slot-scope="scope">
              <p
                v-if="
                  scope.row.statusName === '已成交' ||
                    scope.row.statusName === '成交待审核' ||
                    scope.row.statusName === '已公示'
                "
              >
                {{ scope.row.transPrice }}
              </p>
              <p
                v-if="
                  scope.row.statusName !== '已成交' &&
                    scope.row.statusName !== '成交待审核' &&
                    scope.row.statusName !== '已公示'
                "
              >
                --
              </p>
            </template>
          </el-table-column>
          <el-table-column label="溢价率" min-width="100">
            <template slot-scope="scope">
              <p
                v-if="
                  scope.row.statusName === '已成交' ||
                    scope.row.statusName === '成交待审核' ||
                    scope.row.statusName === '已公示'
                "
              >
                {{ (scope.row.premiumRate * 100).toFixed(2) }}%
              </p>
              <p
                v-if="
                  scope.row.statusName !== '已成交' &&
                    scope.row.statusName !== '成交待审核' &&
                    scope.row.statusName !== '已公示'
                "
              >
                --
              </p>
            </template>
          </el-table-column>
          <el-table-column label="竞买情况" min-width="230">
            <template slot-scope="scope">
              <p>竞价申请人数：{{ scope.row.licenseUserCount }}</p>
              <p>竞价人数：{{ scope.row.offerUserCount }}</p>
              <p v-if="scope.row.statusName != '已公示'">
                报价次数：{{ scope.row.offerCount }}
              </p>
            </template>
          </el-table-column>
          <el-table-column label="成交信息" min-width="240">
            <template slot-scope="scope">
              <p
                v-if="
                  scope.row.statusName === '已成交' ||
                    scope.row.statusName === '成交待审核' ||
                    scope.row.statusName === '已公示'
                "
              >
                竞得人：{{ scope.row.winnerName }}
              </p>
              <p
                v-if="
                  scope.row.statusName === '已成交' ||
                    scope.row.statusName === '成交待审核' ||
                    scope.row.statusName === '已公示'
                "
              >
                联系电话：{{ scope.row.winnerPhone }}
              </p>
              <p
                v-if="
                  scope.row.statusName !== '已成交' &&
                    scope.row.statusName !== '成交待审核' &&
                    scope.row.statusName !== '已公示'
                "
              >
                --
              </p>
            </template>
          </el-table-column>
          <el-table-column label="地块详情" min-width="95" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleClickDetail(scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column>
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
</template>
<script>
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";
import Bus from "../../../../../utils/bus";

export default {
  name: "dealItemCollect",
  data() {
    return {
      flexibleOpen: false,
      //根据权限锁定省市
      provinceCheck: false,
      cityCheck: false,
      AreaCheck: false,
      goodsNo: "",
      //项目交易汇总分析列表
      dealData: [],
      dealTime: "",
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
        goodsNo: "",
        isExport: false, //导出

        transMode: "" //交易方式
      },

      // transStatusList: [
      //   {
      //     value: "",
      //     label: "全部"
      //   },
      //   {
      //     value: "trans_status-008",
      //     label: "已公示"
      //   },
      //   {
      //     value: "trans_status-004",
      //     label: "交易中"
      //   },
      //   {
      //     value: "trans_status-006",
      //     label: "未成交(流拍)"
      //   },
      //   {
      //     value: "trans_status-007",
      //     label: "已成交"
      //   }
      // ],

      //导出
      href:
        // "/api/epf-monitor/statistics/trans/findTransMetaAnalysis?isExport=true",
        "/api/epf-monitor/statistics/trans/findTransMetaAnalysis?isExport=true",

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
        landCharName: "", //土地性质
        landChar: "",
        firstClassUseName: "", //一级土地用途
        firstClassUse: "",
        secondClassUseName: "", //二级土地用途
        secondClassUse: "",
        landTrans: "", //交易类型
        circulation: "",
        dealTime: "", //交易时间
        trans_statusName: "", //交易状态
        trans_status: "",
        goodsNo: "", //标的编号
        isExport: false, //导出

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
    ...mapMutations("deal", ["to_detail"]),
    //获取列表
    getList(val) {
      this.loading = true;
      let params = this.params;
      params["page"] = this.pageNo;
      params["rows"] = this.pageSize;
      params["goodsNo"] = encodeURIComponent(this.goodsNo);
      this.dealTime
        ? (params["noticeDateBegin"] = this.dealTime[0])
        : (params["noticeDateBegin"] = "");
      this.dealTime
        ? (params["noticeDateEnd"] = this.dealTime[1])
        : (params["noticeDateEnd"] = "");
      // this.$get(`/epf-monitor/statistics/trans/findTransMetaAnalysis`,params).then(res => {
      this.$get(
        `/epf-monitor/statistics/trans/findTransMetaAnalysis`,
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
          // this.href = `/api/epf-monitor/statistics/trans/findTransMetaAnalysis?isExport=true&cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&landChar=${this.params.landChar}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&circulation=${this.params.circulation}&noticeDateBegin=${this.params.noticeDateBegin}&noticeDateEnd=${this.params.noticeDateEnd}&status=${this.params.status}&goodsNo=${this.params.goodsNo}`;
          this.href = `/api/epf-monitor/statistics/trans/findTransMetaAnalysis?isExport=true&cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&landChar=${this.params.landChar}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&circulation=${this.params.circulation}&noticeDateBegin=${this.params.noticeDateBegin}&noticeDateEnd=${this.params.noticeDateEnd}&status=${this.params.status}&goodsNo=${this.params.goodsNo}`;
        } else {
          this.loading = false;
          this.$message.error(res.msg); //失败
          return;
        }
      });
    },
    //详情页跳转
    handleClickDetail(item) {
      this.to_detail(item);
      let title = "项目交易汇总分析详情";
      let routerPath = "dealItemCollectDetail";
      console.log(routerPath);
      var tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({
        path: routerPath,
        query: { targetId: item.targetId }
      });
    },
    resetFilter() {
      this.goodsNo = "";
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
      }
      this.filterData.isExport = false;
      this.getList();
    },
    searchList() {
      this.params = this.filterData;
      this.params["status"] = this.filterData.trans_status;
      this.params["goodsNo"] = this.filterData.targetNo;
      if (this.dealTime) {
        this.params["noticeDateBegin"] = this.dealTime[0];
        this.params["noticeDateEnd"] = this.dealTime[1];
      }
      this.getList();
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
    //  statusSelect(val) {
    //   this.filterData.trans_statusName = val.label;
    //   this.filterData.trans_status = val.value;
    // },
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
  computed: {
    ...mapState("deal", ["collectDetail"])
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

<style>
.filter_wrap .el-row {
  margin-bottom: 10px;
}
.filter_wrap .distpicker-address-wrapper select {
  width: 148px;
  height: 32px;
  font-size: 14px;
  line-height: 32px;
  padding: 0 10px;
}
.filter_wrap .el-date-editor.el-input .el-input__icon {
  line-height: 32px;
  color: #8dc4f7;
}
.filter_wrap .el-input__prefix,
.el-input__suffix {
  width: 25px;
  font-size: 16px;
}
</style>
