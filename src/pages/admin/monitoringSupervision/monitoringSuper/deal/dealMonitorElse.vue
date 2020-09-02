<template>
  <!-- 交易监测--自行交易 -->
  <div>
    <div class="toolsTitleBox">
      <span class="toolsTitle">交易监测列表</span>
      <span class="button_export"><a :href="href" style="color: #ffa000;">导出</a></span>
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
      <el-table-column label="序号" width="100" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column
        prop="warrantno"
        label="不动产权证号"
        width="220"
      ></el-table-column>

      <el-table-column label="行政区域" width="210" prop="cantonName">
        <!-- <template slot-scope="scope">
              <span>{{scope.row.provincialCodeName}}/{{scope.row.cityCodeName}}/{{scope.row.cantonCodeName}}</span>
            </template> -->
      </el-table-column>

      <el-table-column label="信息发布编号" width="220">
        <template slot-scope="scope">
          <p v-if="scope.row.publishNo">
            信息发布编号：{{ scope.row.publishNo }}
          </p>
          <p>土地性质：{{ scope.row.natureName }}</p>
          <p>用途：{{ scope.row.landUse1Name }}/{{ scope.row.landUse2Name }}</p>
        </template>
      </el-table-column>

      <el-table-column
        prop="contractNo"
        label="合同编号"
        width="230"
      ></el-table-column>
      <el-table-column
        prop="createtime"
        label="鉴证申请时间"
        width="160"
      ></el-table-column>
      <el-table-column
        prop="landTypeName"
        label="交易类型"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="recordTypeName"
        label="网签状态"
        width="100"
      ></el-table-column>

      <el-table-column
        prop="transactionPrice"
        label="成交价格（万元）"
        width="160"
      ></el-table-column>
      <el-table-column
        prop="secondparty"
        label="受让方/抵押权人/租赁方"
        width="230"
      ></el-table-column>

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
</template>
<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
import Bus from "../../../../../utils/bus";
import monitorFiltrate from "@/components/monitorFiltrate";

export default {
  name: "dealMonitorElse",
  omponents: { monitorFiltrate },
  data() {
    return {
      //根据权限锁定省市
      provinceCheck: false,
      cityCheck: false,
      AreaCheck: false,
      goodsNo: "",
      noticeNo: "",
      //交易监测列表
      obj: {
        dictKey: "",
        zhCn: "全部",
        id: "0"
      },
      dealData: [
        {
          targetNo: "DAZ2018001",
          beginPrice: "20000.00",
          goodsCount: "4",
          goodsNo: "DAL2019001",
          natureName: "国有",
          landUse1Name: "耕地",
          noticeNo: "济国土资告字（交）[2019]001号",
          noticeDate: "2017-07-19 14:48:38",
          landTypeName: "转让",
          statusName: "公告中",
          provincialCodeName: "山西省",
          cityCodeName: "太原市",
          cantonCodeName: "小店区",
          location: "大吴村丽华西街至丽华东街",
          id: "111"
        },
        {
          targetNo: "DAZ2018001",
          beginPrice: "70000.00",
          goodsCount: "5",
          goodsNo: "DAL2019001",
          natureName: "国有",
          landUse1Name: "耕地",
          noticeNo: "济国土资告字（交）[2019]001号",
          noticeDate: "2017-07-19 14:48:38",
          landTypeName: "出租",
          statusName: "交易中",
          provincialCodeName: "山西省",
          cityCodeName: "太原市",
          cantonCodeName: "小店区",
          location: "大吴村丽华西街至丽华东街大吴村丽华西街至丽华东街",
          id: "222"
        },
        {
          targetNo: "DAZ2018001",
          beginPrice: "200000.00",
          goodsCount: "2",
          goodsNo: "DAL2019001",
          natureName: "国有",
          landUse1Name: "耕地",
          noticeNo: "济国土资告字（交）[2019]001号",
          noticeDate: "2017-07-19 14:48:38",
          landTypeName: "转让",
          statusName: "交易完成",
          provincialCodeName: "山西省",
          cityCodeName: "太原市",
          cantonCodeName: "小店区",
          location: "大吴村丽华西街至丽华东街",
          id: "333"
        },
        {
          targetNo: "DAZ2018001",
          beginPrice: "90000.00",
          goodsCount: "1",
          goodsNo: "DAL2019001",
          natureName: "国有",
          landUse1Name: "耕地",
          noticeNo: "济国土资告字（交）[2019]001号",
          noticeDate: "2017-07-19 14:48:38",
          landTypeName: "出租",
          statusName: "交易失败",
          provincialCodeName: "山西省",
          cityCodeName: "太原市",
          cantonCodeName: "小店区",
          location: "大吴村丽华西街至丽华东街",
          id: "444"
        }
      ],

      params: {},
      //导出
      // href: "/api/epf-monitor/goods/findTradeMonitorList?isExport=true&",
      href: "/api/epf-monitor/goods/findTradeMonitorList?isExport=true&",

      //页码
      currentPage: 1,
      pageNo: 1, //页码
      pageSize: 5, //每页条数
      totalPage: 1,
      totalRecord: 1,

      loading: true,
      submitTime: "",
      multipleSelection: [],

      filterData: {
        provincialCodeName: "",
        provincialCode: "",
        cityCodeName: "",
        cityCode: "",
        cantonCodeName: "",
        cantonCode: "",
        landUse1: "",
        landUse1Name: "", //一级土地用途
        landUse2: "",
        landUse2Name: "", //二级土地用途
        nature: "",
        natureName: "",

        // status: "",
        // statusName: "",

        landType: "",
        landTypeName: "",

        warrantno: "",
        startCeateTime: "",
        endCreateTime: "",

        isExport: false,
        isRelation: "" //是否关联
      },
      dicRequest: ["flow_mode", "trans_status", "land_nature", "land_use"], //字典码请求
      dictionary: {
        //字典码结果
        flow_mode: "",
        trans_status: "",
        land_nature: "",
        land_use: "",
        administrative_regions: "",
        cityCode: "",
        cantonCode: "",
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
      }
    };
  },
  methods: {
    ...mapActions(["setTabsList"]),
    getFilterInfo(val) {
      this.href = "/api/epf-monitor/goods/findTradeMonitorList?isExport=true&";
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
      // params["goodsNo"] = encodeURIComponent(this.goodsNo);
      // params["noticeNo"] = encodeURIComponent(this.noticeNo);
      // this.$get(`/epf-monitor/goods/selfDealing`, params).then(
      this.$get(`/epf-monitor/goods/selfDealing`, params).then(res => {
        console.log(res);
        if (res.code == "0") {
          this.dealData = res.pager.results;
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
      let title = "自行交易详情";
      let routerPath = `dealDetailElse?contractId=${item.contractId}`;
      console.log(routerPath);
      var tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({
        path: routerPath,
        query: { contractId: item.contractId }
      });
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
    //字典选择
    provinceSelect(dic, cantonCode, event) {
      this.filterData.cantonCodeName = "";
      this.filterData.cantonCode = "";
      this.cantonCode = "";
      this.filterData.cityCodeName = "";
      this.filterData.cityCode = "";
      this.cityCode = "";
      let pId = this.$refs[cantonCode][0].$attrs.id;
      this.filterData.provincialCode = this.$refs[
        cantonCode
      ][0].$attrs.regionCode;

      this.$get(
        // `/epf-monitor/dictionaries/getDictsByCodeOrParentId?code=administrative_regions&parentId=${pId}`,
        `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        console.log(res);
        if (res.dictionariesList.length != 0) {
          this.dictionary.cityCode = res.dictionariesList;
          this.dictionary.cityCode.unshift(this.obj);
          return;
        }
        this.dictionary.cityCode = "";
      });
    },
    citySelect(dic, cityCode, event) {
      this.filterData.cantonCode = "";
      this.filterData.cantonCodeName = "";
      this.cantonCode = "";
      let pId = this.$refs[cityCode][0].$attrs.id;
      this.filterData.cityCode = this.$refs[cityCode][0].$attrs.regionCode;
      this.$get(
        // `/epf-monitor/dictionaries/getDictsByCodeOrParentId?code=administrative_regions&parentId=${pId}`,
        `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        console.log(res);
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonCode = res.dictionariesList;
          this.dictionary.cantonCode.unshift(this.obj);
          return;
        }
        this.dictionary.cantonCode = "";
      });
    },
    areaSelect(dic, cityCode, event) {
      this.filterData.cantonCode = this.$refs[cityCode][0].$attrs.regionCode;
    },
    landUse1Select(dic, landUse1, event) {
      this.filterData.landUse2 = "";
      this.filterData.landUse2Name = "";
      this.dictionary.land_use_second = "";
      let pId = this.$refs[landUse1][0].$attrs.id;
      this.filterData.landUse1 = this.$refs[landUse1][0].$attrs.dictKey;
      this.$get(
        // `/epf-monitor/dictionaries/getDictsByCodeOrParentId?code=land_use&parentId=${pId}`,
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
    landUse2Select(dic, landUse1, event) {
      this.filterData.landUse2 = this.$refs[landUse1][0].$attrs.dictKey;
    },
    landTypeSelect(dic, landTypeName, event) {
      this.filterData.landType = this.$refs[landTypeName][0].$attrs.dictKey;
    },
    natureSelect(dic, natureName, event) {
      this.filterData.nature = this.$refs[natureName][0].$attrs.dictKey;
    },
    statusSelect(dic, statusName, event) {
      this.filterData.status = this.$refs[statusName][0].$attrs.dictKey;
    },
    resetFilter() {
      this.goodsNo = "";
      this.noticeNo = "";
      this.submitTime = "";
      for (let item in this.filterData) {
        if (
          (this.provinceCheck && item == "provincialCode") ||
          (this.provinceCheck && item == "provincialCodeName")
        ) {
          continue;
        } else if (
          (this.cityCheck && item == "cityCode") ||
          (this.cityCheck && item == "cityCodeName")
        ) {
          continue;
        } else if (
          (this.AreaCheck && item == "cantonCode") ||
          (this.AreaCheck && item == "cantonCodeName")
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
      this.href =
        // "/api/epf-monitor/goods/selfDealing?isExport=true&";
        "/api/epf-monitor/goods/selfDealing?isExport=true&";
      this.params = this.filterData;
      if (this.submitTime) {
        this.params["startCeateTime"] = this.submitTime[0];
        this.params["endCreateTime"] = this.submitTime[1];
      }
      let hrefParams = this.urlEncode(this.params).slice(1);
      this.href = this.href + hrefParams;
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
    }
    //  landTypeSelect(dic,landTypeName,event){
    //         this.filterData.state = this.$refs[landTypeName][0].$attrs.dictKey;
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
      this.dictionary.trans_status.splice(1, 1);
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
      this.params.provincialCode = sessionStorage.getItem("jgProvinceCode");
      this.params.provincialCodeName = sessionStorage.getItem("jgProvince");
    } else if (sessionStorage.getItem("org_level") == "org_level-005") {
      this.provinceCheck = true;
      this.cityCheck = true;
      this.params.provincialCode = sessionStorage.getItem("jgProvinceCode");
      this.params.provincialCodeName = sessionStorage.getItem("jgProvince");
      this.params.cityCode = sessionStorage.getItem("jgCityCode");
      this.params.cityCodeName = sessionStorage.getItem("jgCity");
    } else if (sessionStorage.getItem("org_level") == "org_level-004") {
      this.provinceCheck = true;
      this.cityCheck = true;
      this.AreaCheck = true;
      this.params.provincialCode = sessionStorage.getItem("jgProvinceCode");
      this.params.provincialCodeName = sessionStorage.getItem("jgProvince");
      this.params.cityCode = sessionStorage.getItem("jgCityCode");
      this.params.cityCodeName = sessionStorage.getItem("jgCity");
      this.params.cantonCode = sessionStorage.getItem("jgAreaCode");
      this.params.cantonCodeName = sessionStorage.getItem("jgArea");
    }
    this.getList();
  },
  mounted() {
    setTimeout(() => {
      if (sessionStorage.getItem("org_level") == "org_level-003") {
        this.filterData.provincialCode = sessionStorage.getItem(
          "jgProvinceCode"
        );
        this.filterData.provincialCodeName = sessionStorage.getItem(
          "jgProvince"
        );
        this.provinceSelect("", this.filterData.provincialCodeName, "");
      } else if (sessionStorage.getItem("org_level") == "org_level-005") {
        this.filterData.provincialCode = sessionStorage.getItem(
          "jgProvinceCode"
        );
        this.filterData.provincialCodeName = sessionStorage.getItem(
          "jgProvince"
        );
        this.provinceSelect("", this.filterData.provincialCodeName, "");
        setTimeout(() => {
          this.filterData.cityCode = sessionStorage.getItem("jgCityCode");
          this.filterData.cityCodeName = sessionStorage.getItem("jgCity");
          this.citySelect("", this.filterData.cityCodeName, "");
        }, 800);
      } else if (sessionStorage.getItem("org_level") == "org_level-004") {
        this.filterData.provincialCode = sessionStorage.getItem(
          "jgProvinceCode"
        );
        this.filterData.provincialCodeName = sessionStorage.getItem(
          "jgProvince"
        );
        // this.provinceSelect('',this.filterData.provincialCodeName,'')
        // setTimeout(()=>{
        this.filterData.cityCode = sessionStorage.getItem("jgCityCode");
        this.filterData.cityCodeName = sessionStorage.getItem("jgCity");
        // this.citySelect('',this.filterData.cityCodeName,'')
        // setTimeout(()=>{
        this.filterData.cantonCode = sessionStorage.getItem("jgAreaCode");
        this.filterData.cantonCodeName = sessionStorage.getItem("jgArea");
        //   },800)
        // },800)
      }
    }, 500);
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

.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  padding-right: 10px;
  text-align: right;
  line-height: 35px;
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
  line-height: 40px;
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
  height: 40px;
}
</style>
