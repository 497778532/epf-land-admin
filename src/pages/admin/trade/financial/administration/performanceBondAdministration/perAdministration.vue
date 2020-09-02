<template>
  <div class="page-body">
    <!-- <div class="pageName">1.1 转让地块信息</div> -->
    <el-tabs v-model="activeTabs" type="border-card" @tab-click="handleClick">
      <filteringFinancial @filterInfo="getFilterData" :typeClose="true":targeType ="true"></filteringFinancial>
      <div class="toolsTitleBox">
        <span class="toolsTitle">履约保证金管理</span>
        <span class="list-style: none;"  v-for="(button ,index)  in buttons" :key="index">
        <span class="button_export" @click="xlsExport" v-if="button.resourceId=='perAdmin_expot'">导出</span>
        </span>
      </div>
      <div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column label="序号" type="index" width="80"></el-table-column>
          <el-table-column label="地块编号" width="150" align="left">
            <template slot-scope="scope">
              <span @click="showDetail(scope.row)">{{ scope.row.goodsNo }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="businessTypeName" label="流转方式" width="110" align="left"></el-table-column>
          <el-table-column prop="transTypeName" label="交易方式" width="160" align="left"></el-table-column>
          <el-table-column prop="endApplyTime" label="交易结束时间" width="210" align="left"></el-table-column>
          <el-table-column prop="statusName" label="状态" width="180" align="left"></el-table-column>
          <el-table-column prop="noMainCount" label="未转入主账户" width="130" align="center"></el-table-column>
          <el-table-column prop="noPaymentBackCount" label="未退款" width="90" align="left"></el-table-column>
          <el-table-column prop="noCallceCount" label="未销户" width="90" align="left"></el-table-column>
          <el-table-column fixed="right" label="操作" width="300" align="center">
            <template slot-scope="scope">
              <!--  -->
              <span class="list-style: none;"  v-for="(button ,index)  in buttons" :key="index">
              <el-button
                v-if="scope.row.noMainCount!==0&&button.resourceId=='perAdmin_main'"
                type="text"
                size="small"
                @click="btnClick(scope.row,'perShiftToMainAccount')"
              >转入主账户</el-button>

              <el-button
                v-if="scope.row.noPaymentBackCount!==0&&button.resourceId=='perAdmin_refund'"
                type="text"
                size="small"
                @click="btnClick(scope.row,'perRefund')"
              >申请退款</el-button>

              <el-button
                v-if="scope.row.noCallceCount!==0&&button.resourceId=='perAdmin_cancel'"
                type="text"
                size="small"
                @click="btnClick(scope.row,'perCancellation')"
              >销户</el-button>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="text-align:right;margin:8px 0px;">
        <el-pagination
          background
          layout="prev, pager, next,sizes,jumper"
          :page-sizes="[5,10,15,20]"
          @size-change="no_handleSizeChange"
          @current-change="no_handleCurrentChange"
          :total="no_totalRecord"
          :current-page="no_pageNo"
          :page-size="no_pageSize"
        ></el-pagination>
      </div>
    </el-tabs>
  </div>
</template>
<script>
import filteringFinancial from "@/components/filteringFinancial";
import transferTable from "@/components/transferTable";
import Axios from "axios";
import qs from "qs";
import { mapActions, mapState } from "vuex";
export default {
  components: {
      filteringFinancial,
    transferTable
  },
  data() {
    return {
      href: "/api/epf-trade/performance/queryTrustMarginManage?isExport=true",
      no_pageNo: 1,
      no_pageSize: 5,
      no_totalPage: 1,
      no_totalRecord: 1,
      myParams: {},
      tableData: [],
      page: "1",
      activeTabs: "pending",
      currentTabs: "pending",
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: {},
      tableData1: [],
      labelPosition: "right",
      form: {
        assessor: "",
        opinion: ""
      },
      formTest: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      currentLandId: "",
      currentLandIndex: "",
      create: false,
      //按钮组、主题
      buttons:[],
    };
  },
  created() {
    this.buttons=JSON.parse(localStorage.getItem("perAdministration"));
    // if (this.create) {
    //   return null;
    // }
    // this.create = true;
    // this.handleData = this.handle;
    this.getBidBondAdministration({
      page: this.no_pageNo,
      rows: this.no_pageSize
    });
    this.targetNo = this.$route.query.targetNo;
    this.businessType = this.$route.query.businessType;
    // this.getBoundManageList()
  },
  methods: {
    //跳转地块详情页面
    showDetail(item){
        var routerPath,title
        routerPath='parcelInfoDetail',title='地块详情'
        var tabObj = {title,routerPath}
        this.setTabsList(tabObj)
        this.$router.push({path:routerPath,query:{id:item.goodsId}})
    },
    xlsExport(){
      //2019-7-31hjy
      var btn = document.createElement("a");
      btn.setAttribute('download', '');// download属性
      btn.setAttribute('href', "/api/epf-trade/performance/XlsExport");// href链接
      btn.click();// 自执行点击事件
    },
    ...mapActions(["setTabsList"]),
    getBidBondAdministration(params) {
      this.$get(
        "/epf-trade/performance/queryTrustMarginManage",
        params
      ).then(res => {
        if (res.code == "0") {
          this.no_pageNo = res.pager.pageNo;
          this.no_pageSize = res.pager.pageSize;
          this.no_totalPage = res.pager.totalPage;
          this.no_totalRecord = res.pager.totalRecord;
          this.tableData = res.pager.results;
          this.tableData = res.pager.results;
          console.log(this.tableData);
        } else {
          this.$message.error(res.msg); //失败
          return;
        }
      });
    },
    handleEdit(index, row, btnText) {
      if (btnText === "审核") {
        this.dialogForm = true;
      }
    },
    no_handleSizeChange(val) {
      //每页条数改变时触发
      this.searchInfo["page"] = 1;
      this.searchInfo["rows"] = val;
      this.getBidBondAdministration(this.searchInfo);
    },
    no_handleCurrentChange(val) {
      //获取当前页
      this.searchInfo["page"] = val;
      this.searchInfo["rows"] = this.no_pageSize;
      this.getBidBondAdministration(this.searchInfo);
    },
    examine(id, index) {
      this.currentLandId = id;
      this.currentLandIndex = index;
      this.dialogForm = true;
    },
    downLandInfo(id, index) {
      this.currentLandId = id;
      this.currentLandIndex = index;
      this.dialogDownLand = true;
    },
    autoExamine() {},
    handleClick(val) {
      if (val.name == this.currentTabs) {
        return;
      }
      this.currentTabs = val.name;
      this.tableData1 = [];
      if (this.activeTabs == "pending") {
        this.getTransferPlace({ publishStatus: "audit" });
      } else {
        this.getTransferPlace({ isAuditing: "2" });
      }
    },
    btnClick(item, oper) {
      var routerPath, title,query;
      if (oper === "perShiftToMainAccount") {
        (routerPath = "perShiftToMainAccount"), (title = "转入主账户");
          query= {
              targetId: item.id,
              targetNo: item.goodsNo,
              businessType: item.transTypeName
          }
      }
      if (oper === "perRefund") {
        (routerPath = "perRefund"), (title = "申请退款");
          query= {
              targetId: item.id,
              targetNo: item.goodsNo,
              businessType: item.transTypeName
          }
      }
      if (oper === "perCancellation") {
        (routerPath = "perCancellation"), (title = "销户");
          query= {
              targetId: item.goodsId,
                  targetNo: item.goodsNo,
                  businessType: item.transTypeName
          }
      }
      var tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({
        path: routerPath,
        query: query
      });
    },
    lowerLand() {
      //改变状态
      this.$post("/epf-supply/admin/tsell/editTSellPublishStatus", {
        tSellId: this.currentLandId,
        publishStatus: "down_mytsell"
      }).then(res => {
        if (res.msg != "success") {
          //失败
          this.$message.error(res.msg);
          return;
        }
        this.dialogDownLand = false;
        this.tableData1[this.currentLandIndex].publishStatus = "down_mytsell";
        this.tableData1[this.currentLandIndex].publishStatusName = "下架";
        this.$message({
          message: "下架完成",
          type: "success"
        });
      });
    },
    getFilterData(val) {
        //流转方式
        this.myParams.businessType = val.businessType || "";
        //交易结束时间区间
        this.myParams.beginDealEndTime = val.beginDealEndTime[0] || "";
        this.myParams.endDealEndTime = val.beginDealEndTime[1] || "";
        //地块编号
        this.myParams.targetNo = val.targetNo || "";
        //交易方式
        this.myParams.transType = val.transType || "";
        //地块状态
        this.myParams.status = val.status || "";
        //分页
        this.myParams.page = this.no_pageNo
        this.myParams.rows = this.no_pageSize

      this.getBidBondAdministration(this.myParams);
    },
    handleAdd() {
      let routerPath = "entrustedTradeDetailsAdd";
      let title = "新增委托";
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({ path: routerPath });
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
.default {
  background: #b6b6b6;
  border: 2px solid #cfcfcf;
}
.error {
  background: #fd4041;
  border: 2px solid #ff6c6f;
}
.success {
  background: #92b62d;
  border: 2px solid #bfd482;
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
.handleHover:hover {
  transition: 0.3s;
  color: #4772d5;
}
</style>
