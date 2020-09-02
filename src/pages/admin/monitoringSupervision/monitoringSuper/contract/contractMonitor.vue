<template>
  <!-- <div>合同监测</div> -->
  <div class="page-body">
    <div class="filter_wrap">
      <monitorFiltrate @filterInfo="getFilterInfo"></monitorFiltrate>
      <div class="switchHeight_box" style="padding-top:0">
        <div class="toolsTitleBox">
          <span class="toolsTitle">合同监测列表</span>
          <span class="button_export"
            ><a :href="href" style="color: #ffa000;">导出</a></span
          >
        </div>
        <el-table
          ref="multipleTable"
          :data="contractData"
          v-loading="loading"
          element-loading-text="数据加载中"
          element-loading-background="rgba(255, 255, 255,0.95)"
          style="width: 100%;min-height:80px;"
          border
          tooltip-effect="dark"
        >
          <el-table-column label="序号" width="75" align="center">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="合同信息" width="250">
            <template slot-scope="scope">
              <p>合同编号：{{ scope.row.contractNo }}</p>
              <p>合同名称：{{ scope.row.contractName }}</p>
            </template>
          </el-table-column>
          <el-table-column label="行政区域" width="165">
            <template slot-scope="scope">
              <span
                >{{ scope.row.cantonProvinceName }}-{{
                  scope.row.cantonCityName
                }}-{{ scope.row.cantonAreaName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="landTypeName"
            label="合同类型"
            width="85"
          ></el-table-column>
          <el-table-column
            prop="transactionType"
            label="交易方式"
            width="90"
          ></el-table-column>
          <el-table-column label="用途" width="115">
            <template slot-scope="scope">
              <span
                >{{ scope.row.firstClassUseName }}-{{
                  scope.row.secondClassUseName
                }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="createtime"
            label="申请时间"
            width="190"
          ></el-table-column>
          <el-table-column
            prop="contractStatusName"
            label="合同状态"
            width="105"
          ></el-table-column>
          <el-table-column label="（转让/抵押/出租）签订人" width="235">
            <template slot-scope="scope">
              <p>转让方：{{ scope.row.firstparty }}</p>
              <p>转让方联系方式：{{ scope.row.firstPhone }}</p>
            </template>
          </el-table-column>
          <el-table-column label="（受让人/抵押权人/租赁房）签订人" width="245">
            <template slot-scope="scope">
              <p>受让方：{{ scope.row.secondparty }}</p>
              <p>受让方联系方式：{{ scope.row.secondphone }}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleClickDetail(scope.row)"
                >详情</el-button
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
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import vuex from "vuex";
import monitorFiltrate from "@/components/monitorFiltrate";
import Bus from "@/utils/bus";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "contractMonitor",
  components: { monitorFiltrate },
  data() {
    return {
      //根据权限锁定省市
      provinceCheck: false,
      cityCheck: false,
      AreaCheck: false,
      obj: {
        dictKey: "",
        zhCn: "全部",
        id: "0"
      },
      submitTime: "",
      //合同监测列表

      contractData: [],

      params: {},
      //导出
      // href:'/api/epf-monitor/monitor/moniContract/downContract?',
      href: "/api/epf-monitor/monicontract/downContract?",
      //页码
      currentPage: 1,
      pageNo: 1, //页码
      pageSize: 5, //每页条数
      totalPage: 1,
      totalRecord: 1,

      loading: true,

      multipleSelection: [],

      filterData: {
        cantonProvinceName: "",
        cantonProvince: "",
        cantonCityName: "",
        cantonCity: "",
        cantonAreaName: "",
        cantonArea: "",
        contract_statusName: "",
        contractStatus: "",
        landType: "", //土地性质
        firstClassUse: "",
        firstClassUseName: "", //一级土地用途
        secondClassUse: "",
        secondClassUseName: "", //二级土地用途
        transactionTypeName: "",
        contractNo: "",
        transactionType: "",
        signUserName: "",
        startCeateTime: "",
        endCreateTime: "" //
      },
      dicRequest: [
        "flow_mode",
        "land_nature",
        "land_use",
        "transaction_mode",
        "contract_status"
      ], //字典码请求
      dictionary: {
        //字典码结果
        flow_mode: "",
        land_nature: "",
        land_use: "",
        transaction_mode: "",
        contract_status: "",
        land_use_second: "",
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
      }
    };
  },
  methods: {
    ...mapActions(["setTabsList"]),
    ...mapMutations("monitoringSupervision", ["to_detail"]),
    getFilterInfo(val) {
      this.href = "/api/epf-monitor/monicontract/downContract?";
      let hrefParams = this.urlEncode(val).slice(1);
      this.href = this.href + hrefParams;
      this.params = val;
      this.params["page"] = 1;
      this.params["rows"] = this.pageSize;
      this.getList(this.params);
    },
    //获取列表
    getList(val) {
      this.loading = true;
      let params = this.params;
      params["page"] = this.pageNo;
      params["rows"] = this.pageSize;
      // this.$post(`/epf-monitor/monitor/moniContract/list`, params).then(
      this.$post(`/epf-monitor/monicontract/list`, params).then(res => {
        console.log(res);
        if (res.code == "0") {
          this.contractData = res.pager.results;
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
          this.loading = false;
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
      let title = "合同详情";
      let routerPath = `contractDetail?purchaseId=${item.contractId}`;
      var tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({ path: routerPath });
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
    urlEncode(param, key, encode) {
      if (param == null) return "";
      var paramStr = "";
      var t = typeof param;
      if (t == "string" || t == "number" || t == "boolean") {
        paramStr +=
          "&" +
          key +
          "=" +
          (encode == null || encode ? encodeURIComponent(param) : param);
      } else {
        for (var i in param) {
          var k =
            key == null
              ? i
              : key + (param instanceof Array ? "[" + i + "]" : "." + i);
          paramStr += this.urlEncode(param[i], k, encode);
        }
      }
      return paramStr;
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
        `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        console.log(res);
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonCity = res.dictionariesList;
          this.dictionary.cantonCity.unshift(this.obj);
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
        `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        console.log(res);
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonArea = res.dictionariesList;
          this.dictionary.cantonArea.unshift(this.obj);
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
          this.dictionary.land_use_second.unshift(this.obj);
          return;
        }
        this.dictionary.land_use_second = "";
      });
    },
    contractSelect(dic, contract_statusName, event) {
      this.filterData.contractStatus = this.$refs[
        contract_statusName
      ][0].$attrs.dictKey;
    },
    transactionSelect(dic, transactionTypeName, event) {
      this.filterData.transactionType = this.$refs[
        transactionTypeName
      ][0].$attrs.dictKey;
    },
    secondClassUseSelect(dic, firstClassUse, event) {
      this.filterData.secondClassUse = this.$refs[
        firstClassUse
      ][0].$attrs.dictKey;
    },
    circulationSelect(dic, landTrans, event) {
      this.filterData.landType = this.$refs[landTrans][0].$attrs.dictKey;
    },
    resetFilter() {
      this.submitTime = "";
      for (let item in this.filterData) {
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
      this.getList();
    },
    searchList() {
      // this.href='/api/epf-monitor/monitor/moniContract/downContract?'
      this.href = "/api/epf-monitor/monicontract/downContract?";
      this.params = this.filterData;
      if (this.submitTime) {
        this.params["startCeateTime"] = this.submitTime[0];
        this.params["endCreateTime"] = this.submitTime[1];
      }
      let hrefParams = this.urlEncode(this.params).slice(1);
      this.href = this.href + hrefParams;
      this.getList();
    }
    //  circulationSelect(dic,circulationName,event){
    //         this.filterData.landTrans = this.$refs[circulationName][0].$attrs.dictKey;
    //     },
    // submitTimeClick() {
    //   this.filterData.submitTime = this.submitTime;
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
      dicArr.forEach(function(item, index) {
        item.unshift(that.obj);
      });
      for (let item in this.dictionary) {
        console.log(this.dicNum);
        this.dictionary[item] = dicArr[this.dicNum];
        // console.log(dicArr[this.dicNum])
        this.dicNum++;
      }
      this.dicFinsh = true;
      this.dictionary.contract_status.splice(1, 1);
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
    ...mapState("monitoringSupervision", ["myDetail"])
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

.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 105%;
  height: 32px;
  padding-right: 10px;
  text-align: right;
  line-height: 32px;
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
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  padding: 0 10px;
} */

.filter_wrap .el-date-editor.el-input .el-input__icon {
  line-height: 25px;
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
