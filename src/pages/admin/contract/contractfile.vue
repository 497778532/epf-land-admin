<template>
  <!-- <div>合同归档列表</div> -->
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
              class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
              style="padding-left: 8px; padding-right: 8px;"
            >
              <el-form-item label="合同编号：">
                <el-input
                  v-model="filterData.code"
                  size="small"
                  placeholder="请输入合同编号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
              style="padding-left: 8px; padding-right: 8px;"
              :class="!flexibleOpen ? 'hidden-md-and-down' : ''"
            >
              <el-form-item label="合同类型：">
                <el-select
                  size="small"
                  class="filterCirculatemode"
                  v-model="filterData.contractType"
                  placeholder="全部"
                  @change="
                    publishStatusSelect(
                      contractType,
                      filterData.contractType,
                      $event
                    )
                  "
                >
                  <el-option
                    v-for="(item, index) in contractType"
                    :ref="item.zhCn"
                    :id="item.id"
                    :dictKey="item.zhCn"
                    :label="item.zhCn"
                    :value="item.dictValue"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col
              class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
              style="padding-left: 8px; padding-right: 8px;"
              :class="!flexibleOpen ? 'hidden-md16-and-down' : ''"
            >
              <el-form-item label="申请时间：">
                <el-date-picker
                  v-model="useDate"
                  type="daterange"
                  unlink-panels
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="起始时间"
                  end-placeholder="截止时间"
                  size="small"
                  @change="selectDatarange"
                  style="width:100%;"
                ></el-date-picker
              ></el-form-item>
            </el-col>
            <el-col
              class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
              style="padding-left: 8px; padding-right: 8px;"
              v-if="flexibleOpen"
            >
              <el-form-item label="合同状态：">
                <el-select
                  size="small"
                  class="filterCirculatemode"
                  v-model="filterData.status"
                  placeholder="请选择状态"
                  @change="typeSelect(status, filterData.status, $event)"
                >
                  <el-option
                    v-if="
                      item.zhCn == '审核未通过' ||
                        item.zhCn == '鉴证失效' ||
                        item.zhCn == '已撤销'
                    "
                    v-for="(item, index) in status"
                    :ref="item.zhCn"
                    :id="item.id"
                    :dictKey="item.zhCn"
                    :label="item.zhCn"
                    :value="item.dictKey"
                    :key="index"
                  ></el-option> </el-select
              ></el-form-item>
            </el-col>
            <el-col
              class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
              style="padding-left: 8px; padding-right: 8px;"
            >
              <el-form-item label-width="0">
                <div class="button_bg" @click="findInfo">查询</div>
                <div class="button_default" @click="resetFilter">重置</div>
                <span class="flexibleSwitch" @click="flexSwitch">
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
        <div class="toolsTitleBox">
          <span class="toolsTitle">合同列表</span>
          <span class="button_export" @click="exportr">导出</span>
        </div>
        <el-table
          :data="contartData"
          border
          v-loading="loading"
          element-loading-text="数据加载中"
          element-loading-background="rgba(255, 255, 255, 0.9)"
          @row-dblclick="rowClickHandle"
          style="width: 100%"
        >
          <el-table-column
            prop="number"
            label="序号"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <span style="text-align:center;cursor:pointer;">{{
                scope.$index + 1
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="code"
            label="合同编号"
            width="340"
            align="left"
          >
            <template slot-scope="scope">
              <span
                @click="
                  viewDetail(
                    scope.row.id,
                    scope.row.procInsId,
                    scope.row.contractType
                  )
                "
                style="text-align:center;cursor:pointer;color: #4772d5;"
                >{{ scope.row.code }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="contractName"
            label="合同名称"
            width="250"
            align="left"
          ></el-table-column>
          <el-table-column prop label="所属行政区域" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.cantonName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="contractType"
            label="合同类型"
            width="150"
            align="left"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.contractTypeName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="relevanceCode"
            label="信息关联信息"
            width="160"
            align="left"
          >
            <template slot-scope="scope">
              <span
                class="titleHover"
                @click="rowClickHandleDeal(scope.row)"
                style="text-align:center;cursor:pointer;"
                v-if="scope.row.relevanceCode == '2'"
                >关联交易信息</span
              >
              <span
                class="titleHover"
                @click="rowClickHandleSupply(scope.row)"
                style="text-align:center;cursor:pointer;"
                v-if="scope.row.relevanceCode == '1'"
                >关联供给信息</span
              >
              <span
                class="titleHover"
                style="text-align:center;"
                v-if="scope.row.relevanceCode == '3'"
                >未关联</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="publishStatus"
            label="合同状态"
            width="160"
            align="left"
          >
            <template slot-scope="scope">
              <div
                v-if="
                  scope.row.contractStatus == 'contract_status-011' ||
                    scope.row.contractStatus == 'contract_status-006' ||
                    scope.row.contractStatus == 'contract_status-007'
                "
              >
                <div class="error"></div>
                <span>{{ scope.row.contractStatusName }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="secondParty"
            label="申请人"
            width="115"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="updateTime"
            label="归档时间"
            width="185"
            align="left"
          ></el-table-column>
          <el-table-column label="操作" align="left" fixed="right" width="150">
            <template slot-scope="scope">
              <span
                class="list-style: none;"
                v-for="(button, index) in buttons"
                :key="index"
              >
                <el-button
                  size="small"
                  type="success"
                  v-if="button.resourceId == 'contractfile_view'"
                  @click="
                    viewDetail(
                      scope.row.id,
                      scope.row.procInsId,
                      scope.row.contractType
                    )
                  "
                  >查看详情</el-button
                >
              </span>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align:right;margin:22px 0px;">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5, 10, 15, 20]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
            :current-page="pageNo"
            :page-size="pageSize"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
import qs from "qs";

import { mapActions, mapState } from "vuex";

export default {
  name: "contractfile",
  data() {
    return {
      status: [],
      contractType: [],
      //合同列表
      contartData: [],
      //页码
      totalPage: 1,
      totalRecord: 1,
      pageNo: 1,
      pageSize: 5,

      searchInfo: {},
      applicant: "",
      filterData: {
        contractType: "",
        code: "",
        beginDate: "",
        endDate: "",
        status: ""
      },
      useDate: "",
      // pickerOptions: {//日期范围快速选择配置
      //   shortcuts: [{
      //     text: '最近一周',
      //     onClick(picker) {
      //       const end = new Date();
      //       const start = new Date();
      //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      //       picker.$emit('pick', [start, end]);
      //     }
      //   }, {
      //     text: '最近一个月',
      //     onClick(picker) {
      //       const end = new Date();
      //       const start = new Date();
      //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      //       picker.$emit('pick', [start, end]);
      //     }
      //   }, {
      //     text: '最近三个月',
      //     onClick(picker) {
      //       const end = new Date();
      //       const start = new Date();
      //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
      //       picker.$emit('pick', [start, end]);
      //     }
      //   }]
      //  },
      // flexibleSwitch:'展开',
      // flexibleSwitchIcon:'el-icon-caret-bottom',
      dicRequest: ["purchasr_status", "purchasr_demand"], //字典码请求
      dictionary: {
        //字典码结果
        purchasr_status: "",
        purchasr_demand: ""
      },
      dicNum: 0,
      loading: false,
      //按钮组、主题
      buttons: [],
      switchHeight: 49,
      flexibleOpen: false
    };
  },
  created() {
    this.buttons = JSON.parse(localStorage.getItem("contractfile"));
    let userToken = sessionStorage.getItem("token");
    Axios.get(
      "/api/epf-admin/admin/dict/getDictEbyDictGroup/flow_mode",
      qs.stringify({ token: userToken })
    ).then(res => {
      console.log(res);
      if (res.code == "0") {
        this.contractType = res.dictionariesList;
      }
    });
    Axios.get(
      "/api/epf-admin/admin/dict/getDictEbyDictGroup/contract_status",
      qs.stringify({ token: userToken })
    ).then(res => {
      console.log(res);
      if (res.code == "0") {
        this.status = res.dictionariesList;
      }
    });
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == "land_use") {
          this.$get(
            `/epf-trade/dictionaries/getDictsByCodeOrParentId?code=${item}`,
            { parentId: 0 }
          ).then(res => {
            resolve(res);
          });
        } else {
          this.$get(
            `/epf-trade/dictionaries/getDictEbyDictGroup/${item}`,
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
      for (let item in this.dictionary) {
        console.log(this.dicNum);
        this.dictionary[item] = dicArr[this.dicNum];
        // console.log(dicArr[this.dicNum])
        this.dicNum++;
      }

      this.dicFinsh = true;
      console.log("字典结果", this.dictionary);
    });
  },
  mounted() {
    this.getAccountList();
  },
  methods: {
    flexSwitch() {
      this.flexibleOpen = !this.flexibleOpen;
      // this.switchHeight = this.flexibleOpen ? 147 : 49;
    },
    ...mapActions(["setTabsList"]),
    getAccountList() {
      //归档列表请求
      this.loading = true;
      let token = sessionStorage.getItem("token");
      Axios.post(
        "/api/epf-contract/transContract/pigeonholePag",
        qs.stringify({
          token: token,
          page: this.pageNo,
          rows: this.pageSize,
          code: this.filterData.code,
          contractType: this.filterData.contractType,
          beginDate: this.filterData.beginDate,
          endDate: this.filterData.endDate,
          status: this.filterData.status
        })
      )
        .then(res => {
          this.loading = false;
          if (res.code == "0") {
            this.contartData = res.pager.results;
            this.pageNo = res.pager.pageNo;
            this.pageSize = res.pager.pageSize;
            this.totalPage = res.pager.totalPage;
            this.totalRecord = res.pager.totalRecord;

            this.contartData.forEach(element => {
              let date = element.userId.split(",");
              this.applicant = date[1];
              element.secondParty = this.applicant;
            });
          }
        })
        .catch(res => {
          this.loading = false;
          this.$message.warning(res.msg);
        });
    },
    viewDetail(contractId, procInsId, contract) {
      let routerPath = `/filingDetails1?contractId=${contractId}&procInsId=${procInsId}&contractType=${contract}`;
      let title = "合同归档详情";
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({
        path: "/filingDetails1",
        query: {
          contractId: contractId,
          procInsId: procInsId,
          contractType: contract
        }
      });
    },
    rowClickHandle(row, event, column) {
      console.log("双击行的id", row);
      // let routerPath = '/demandSupplyDetails?supply=' + row.id;
      // let tabObj = {routerPath}
      // //将当前点击的选项添加到vuex中

      // this.setTabsList(tabObj)
      // this.$router.push({path:'/demandSupplyDetails',query:{supply:row.id}})
    },
    rowClickHandleDeal(item) {
      let routerPath = `/landmarkInfoDetail?id=${item.id}`;
      let title = "标的详情";
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({ path: routerPath, query: { id: item.id } });
    },
    rowClickHandleSupply(item) {
      let routerPath = "transferPlace";
      let title = "转让地块信息";
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({ path: routerPath });
    },
    //每页条数改变时触发
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAccountList();
    },
    //获取当前页
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getAccountList();
    },
    publishStatusSelect(dic, publishStatusName, event) {
      this.filterData.contractType = this.$refs[
        publishStatusName
      ][0].$attrs.dictKey;
    },
    typeSelect(dic, value, event) {
      this.filterData.state = this.$refs[value][0].$attrs.dictKey;
    },
    selectDatarange() {
      //选择日期范围后的回调
      this.filterData.beginDate = this.useDate[0];
      this.filterData.endDate = this.useDate[1];
    },
    findInfo() {
      this.getAccountList();
    },
    resetFilter() {
      for (let item in this.filterData) {
        this.filterData[item] = "";
      }
      this.getAccountList();
    },
    findAudit() {
      this.$confirm("1", "审核", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: ""
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 导出
    exportr() {
      let token = sessionStorage.getItem("token");
      window.location.href = `/api/epf-contract/transContract/downContract?token=${token}&isCheck=&contractType=&status=${this.filterData.status}&code=${this.filterData.code}&beginDate=${this.filterData.beginDate}&endDate=${this.filterData.endDate}`;
    }
  }
};
</script>
<style scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
<style>
.filter_wrap .el-input--small .el-input__inner {
  height: 34px;
}
.filter_wrap .el-row {
  margin-bottom: 10px;
}
.filter_wrap .distpicker-address-wrapper select {
  width: 148px;
  height: 34px;
  font-size: 14px;
  line-height: 34px;
  padding: 0 10px;
}
.filter_wrap .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.filter_wrap .el-date-editor.el-input .el-input__icon {
  line-height: 30px;
  color: #8dc4f7;
}
.filter_wrap .el-input__prefix,
.el-input__suffix {
  width: 25px;
  font-size: 16px;
}
.el-table th,
.el-table tr {
  /* border:1px solid #ebeef5; */
}
.el-table__body tr td:nth-child(2) .cell {
  color: #606266;
}
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
</style>
