<template>
  <!-- 转让合同鉴证 -->
  <div class="page-body">
    <!-- 查询框 -->
    <!--  
      @name: 封装搜索栏
      @description: 封装搜索栏
      @author: gaojie
      @chageTime:2020-3-5 -->
    <div class="filter_wrap">
      <contractFiltrate
        @filterInfo="getFilterData"
        conkey="record"
      ></contractFiltrate>
      <div class="switchHeight_box" style="padding-top:0">
        <div class="toolsTitleBox">
          <span class="toolsTitle">合同列表</span>
          <span class="button_export" @click="exportr">导出</span>
        </div>
        <el-table
          :data="contartData"
          border
          v-loading="loading"
          element-loading-text="数据加载中..."
          element-loading-background="rgba(255, 255, 255, 0.9)"
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
            prop="contractNo"
            label="合同编号"
            width="240"
            align="left"
          >
            <template slot-scope="scope">
              <span
                @click="
                  viewDetail(
                    scope.row.contractId,
                    scope.row.procInsId,
                    'transfer'
                  )
                "
                style="text-align:center;cursor:pointer;color: #4772d5;"
                >{{ scope.row.contractNo }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="recordNo"
            label="合同统一编码"
            width="250"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="contractName"
            label="合同名称"
            width="250"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="cantonName"
            label="所属行政区域"
            width="190"
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="申请时间"
            width="195"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="information"
            label="关联信息"
            width="120"
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
            prop="recordType"
            label="合同状态"
            width="200"
            align="left"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.recordType == 'record_status-001'">
                <div class="success"></div>
                <span>{{ scope.row.recordTypeName }}</span>
                <span v-if="scope.row.contractType == 'contract_status-003'"
                  >({{ scope.row.contractTypeName }})</span
                >
              </div>
              <div v-if="scope.row.recordType == 'record_status-003'">
                <div class="error"></div>
                <span>{{ scope.row.recordTypeName }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="userName"
            label="申请人"
            width="150"
            align="left"
          ></el-table-column>
          <el-table-column label="操作" align="left" fixed="right" width="300">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                plain
                @click="
                  viewDetail(
                    scope.row.contractId,
                    scope.row.procInsId,
                    'transfer'
                  )
                "
                >查看详情</el-button
              >
              <el-button
                size="mini"
                type="success"
                plain
                @click="open(scope.row.contractId)"
                v-if="scope.row.recordType == 'record_status-003'"
                >归档</el-button
              >
              <el-button
                size="mini"
                type="success"
                plain
                @click="revotrail(scope.row.contractId)"
                v-if="
                  scope.row.recordType == 'record_status-001' &&
                    scope.row.contractType != 'contract_status-003'
                "
                >合同撤销</el-button
              >
              <!-- 归档弹框 -->
              <div class="delDialog_box">
                <div
                  v-show="delShow"
                  class="delDialog"
                  @click.stop="delShow = false"
                ></div>
                <!-- <div v-show="delShow" class="container_box">
                <div class="title_box">
                  <h4>提示</h4>
                  <span>
                  <i class="el-icon-circle-close-outline" @click="delShow=false"></i>
                  </span>
                </div>
                <div class="container1">合同归档以后，将展示在合同归档管理列表中,是否确认归档？</div>
                <div  @click="suredelShow()">确认</div>
                <div  @click="delShow=false" style="background:#fff;color:#555;border:1px solid #c9c9c9;margin-left:0px !important;">取消</div>
              </div> -->
                <el-dialog
                  title="提示"
                  :visible.sync="delShow"
                  width="30%"
                  :modal="false"
                >
                  <span
                    >合同归档以后，将展示在合同归档管理列表中,是否确认归档？</span
                  >
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="delShow = false">取 消</el-button>
                    <el-button type="primary" @click="suredelShow()"
                      >确 定</el-button
                    >
                  </span>
                </el-dialog>
              </div>
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
import Bus from "../../../../utils/bus";
export default {
  name: "transferRecordContract",
  data() {
    return {
      loading: false,
      //合同列表
      contartData: [],
      //页码
      totalPage: 1,
      totalRecord: 1,
      pageNo: 1,
      pageSize: 5,

      filterData: {
        code: "",
        title: "",
        circulation: "",
        status: "",
        publishNo: "",
        type: "",
        cantonProvinceName: "",
        cantonProvince: "",
        cantonCityName: "",
        cantonCity: "",
        cantonAreaName: "",
        cantonArea: "",
        beginDate: "",
        endDate: ""
      },
      idlist: "",
      delShow: false,
      applicant: "",
      //按钮组、主题
      buttons: []
    };
  },
  mounted() {
    this.init(this.pageNo, this.pageSize);
  },
  created() {
    this.buttons = JSON.parse(localStorage.getItem("transferRecordContract"));
  },
  methods: {
    ...mapActions(["setTabsList"]),
    init(pageNo, PageSize, filterData) {
      //转让合同鉴证请求
      this.loading = true;
      let token = sessionStorage.getItem("token");
      Axios.post(
        "/api/epf-contract/transContract/pageRecord",
        qs.stringify({
          token: token,
          page: this.pageNo,
          rows: this.pageSize,
          contractType: "transfer",
          code: filterData ? filterData.code : "",
          cantonCode1: filterData ? filterData.cantonProvince : "",
          cantonCode2: filterData ? filterData.cantonCity : "",
          cantonCode3: filterData ? filterData.cantonArea : "",
          status: filterData ? filterData.status : "",
          beginDate: filterData ? filterData.beginDate : "",
          endDate: filterData ? filterData.endDate : ""
        })
      )
        .then(res => {
          console.log("=========", res);
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
            this.loading = false;
          }
        })
        .catch(res => {
          this.loading = false;
          this.$message.warning(res.msg);
        });
    },
    //查看详情
    viewDetail(id, procInsId, contract) {
      this.$bus.$emit("closeTabsItem", "filingDetails1");
      let routerPath = `/filingDetails1?contractId=${id}&procInsId=${procInsId}&contractType=${contract}`;
      let title = "合同归档详情";
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({
        path: "/filingDetails1",
        query: {
          contractId: id,
          procInsId: procInsId,
          contractType: contract
        }
      });
      // /filingDetails1
    },
    //归档
    open(id) {
      this.idlist = id;
      this.delShow = true;
    },
    //归档接口
    suredelShow() {
      this.delShow = false;
      let token = sessionStorage.getItem("token");
      Axios.post(
        "/api/epf-contract/transContract/pigeonhole",
        qs.stringify({
          token: token,
          contractId: this.idlist
        })
      )
        .then(res => {
          this.$message.success("归档成功");
          this.getFilterData();
          this.init();
        })
        .catch(error => {
          this.$message.error(res.msg);
        });
    },
    // 合同撤销申请
    revotrail(id) {
      this.$bus.$emit("closeTabsItem", "ContractRevotrailAudit");
      let title = "合同撤销申请";
      let ifAudit = "";
      let routerPath = `/ContractRevotrailAudit?contractId=${id}&&contractType=transfer&auditStateTitle=${title}&ifAudit=${ifAudit}`;
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({
        path: "/ContractRevotrailAudit",
        query: {
          contractId: id,
          contractType: "transfer",
          auditStateTitle: title,
          ifAudit: ifAudit
        }
      });
    },
    // 关联交易信息
    rowClickHandleDeal(item) {
      this.$bus.$emit("closeTabsItem", "landmarkInfoDetail");
      let routerPath = `/landmarkInfoDetail?id=${item.id}`;
      let title = "标的详情";
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({
        path: routerPath,
        query: {
          id: item.id
        }
      });
    },
    // 关联转让信息
    rowClickHandleSupply(item) {
      this.$bus.$emit("closeTabsItem", "transferPlace");
      // demandSupplyDetails?supply=af4caad4-0247-4e13-97b5-d3919e6a00a0&businessId=7a4bb4c5-70f6-4a23-8016-5e9df85f55b7&taskId=2168850&procInsId=2168850&procDefId=transaction_filing%3A2%3A2163916&activeTabs=processed&isExamine=2
      let routerPath = `/demandSupplyDetails?supply=${item.relevanceId}`;
      let title = "转让地块信息";
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({
        path: routerPath
      });
    },
    handleSizeChange(val) {
      // 显示条数
      this.pageSize = val;
      this.init(this.pageNo, this.pageSize);
    },
    handleCurrentChange(val) {
      //当前页码
      this.pageNo = val;
      this.init(this.pageNo, this.pageSize);
    },
    getFilterData(val) {
      this.filterData = val;
      this.init(this.pageNo, this.pageSize, val);
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
      if (this.currentTabs == "processed") {
        this.isCheck = "1";
      } else {
        this.isCheck = "2";
      }
      console.log("=========0", this.filterData);
      window.location.href = `/api/epf-contract/transContract/downRecord?token=${token}&isCheck=${this.isCheck}&contractType=transfer&status=${this.filterData.status}&code=${this.filterData.code}&beginDate=${this.filterData.beginDate}&endDate=${this.filterData.endDate}&cantonCode1=${this.filterData.cantonProvince}&cantonCode2=${this.filterData.cantonCity}&cantonCode3=${this.filterData.cantonArea}`;
    }
  },
  watch: {
    $route(to, from) {
      this.init(this.pageNo, this.pageSize);
    }
  }
};
</script>
<style scoped>
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

.title_top {
  margin-top: 25px;
}

.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
<style>
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
