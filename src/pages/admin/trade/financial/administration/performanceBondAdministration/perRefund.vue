<template>
  <div style="padding:30px 0 0 20px">
    <el-row class="mainAccounts">
      <el-form ref="filterData" :model="filterData">
        <el-col :span="2">
          <span class="filter_title">委托人 :</span>
        </el-col>
        <el-col :span="5" style="margin-top:20px">
          <el-form-item prop="title">
            <el-input v-model="filterData.Bidder" placeholder="请输入竞买人名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1" :offset="1" style="margin-top:20px">
          <div class="button_bg" @click="getPerRefund({realName:filterData.Bidder,targetId:targetId})">查询</div>
        </el-col>
        <el-col :span="1" style="margin-top:20px">
          <div class="button_bg" @click="resetFilter">重置</div>
        </el-col>
      </el-form>
    </el-row>
    <div class="header">
      退款
      <span>标的编号:</span>
      <em>{{targetNo}}</em>
      <span>流转方式:</span>
      <em>{{businessType}}</em>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <!-- <el-table-column prop="Bidder" label="标的编号" width="110" align="left"></el-table-column> -->
      <el-table-column prop="name" label="委托人" width="190" align="left"></el-table-column>
      <el-table-column prop="accountNo" label="子账户" width="150" align="left"></el-table-column>
      <el-table-column label="金额" width="105" align="left">
        <template slot-scope="scope">{{scope.row.currencySymbol}}:{{scope.row.amountDesc}}万元</template>
      </el-table-column>
      <el-table-column prop="bankDate" label="到账时间" width="200" align="left"></el-table-column>
      <el-table-column prop="billType" label="类型" width="140" align="left"></el-table-column>
      <!-- <el-table-column prop="contributors" label="是否使用" width="80" align="left"></el-table-column> -->
      <el-table-column prop="billFlowDesc" label="状态" width="120" align="left">
        <!-- <template slot-scope="scope">
              <span v-if="scope.row.billFlow==1">申请退款 </span>
              <span v-if="scope.row.billFlow==3">退款成功 </span>
              <span v-if="scope.row.billFlow==4">已退款 </span>
        </template>-->
      </el-table-column>
      <el-table-column prop="accountName" label="户名" width="170" align="left"></el-table-column>
      <el-table-column prop="accountNo" label="入款账户" width="130" align="center"></el-table-column>
      <el-table-column prop="accountBank" label="入款银行" width="190" align="left"></el-table-column>
      <el-table-column prop="accountBank" label="保证金银行" width="180" align="left"></el-table-column>
      <el-table-column label="退款时间" width="250" align="left">
        <template slot-scope="scope">
          <el-date-picker
            v-bind:disabled="!(scope.row.billFlow=='bill_status-003')"
            v-model="scope.row.refundDate"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.billFlow=='bill_status-003'"
            type="text"
            size="small"
            @click="btnClick(scope.row,'APPLY_REFUND')"
          >申请退款</el-button>
          <el-button
            v-if="scope.row.billFlow=='bill_status-005'"
            type="text"
            size="small"
            @click="btnClick(scope.row,'SUCCESS_OPTION')"
          >退款成功</el-button>
          <el-button v-if="scope.row.billFlow=='bill_status-006'" disabled type="text" size="small">已退款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align:right;margin:8px 0px;">
      <el-pagination
        background
        layout="prev, pager, next,sizes,jumper"
        :page-sizes="[5,10, 15, 20]"
        @size-change="no_handleSizeChange"
        @current-change="no_handleCurrentChange"
        :total="no_totalRecord"
        :current-page="no_pageNo"
        :page-size="no_pageSize"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
export default {
  data() {
    return {
      myparams:{},
      targetId: "",
      targetNo: "",
      businessType: "",
      no_pageNo: 1,
      no_pageSize: 5,
      no_totalPage: 1,
      no_totalRecord: 1,
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      tableData: [],
      searchInfo: {},
      multipleSelection: [],
      filterData: {
        Bidder: ""
      }
    };
  },
  created() {
    this.targetId = this.$route.query.targetId;
    this.targetNo = this.$route.query.targetNo;
    this.businessType = this.$route.query.businessType;
     this.myparams = {
      targetId: this.targetId,
      page: this.no_pageNo,
      rows: this.no_pageSize
    };
    this.getPerRefund(this.myparams);
  },
  methods: {
    resetFilter: function(params) {
      for (let item in this.filterData) {
        this.filterData[item] = "";
      }
    },
    btnClick: async function(val, type) {
      console.log(val);
      let paras = {
        id: val.id,
        option: type,
        targetId: this.$route.query.targetId,
        date: val.refundDate
      };
      const res = await this.$post(
        "/epf-trade/performance/switchToBackMoney",
        paras
      );
      if (res.code == "0") {
        this.$message.success("操作成功"); //失败
        this.getPerRefund(this.myparams);
      } else {
        this.$message.error(res.msg); //失败
        return;
      }
    },
    getPerRefund: async function(myparams) {
      const res = await this.$get(
        "/epf-trade/performance/swithPayBackList",myparams
      );
      if (res.code == "0") {
        this.no_pageNo = res.pager.pageNo;
        this.no_pageSize = res.pager.pageSize;
        this.no_totalPage = res.pager.totalPage;
        this.no_totalRecord = res.pager.totalRecord;
        this.tableData = res.pager.results;
      } else {
        this.$message.error(res.msg); //失败
        return;
      }
    },
    no_handleSizeChange(val) {
      //每页条数改变时触发
      this.searchInfo["page"] = 1;
      this.searchInfo["rows"] = val;
      this.searchInfo["targetId"] = this.targetId;
      this.getPerRefund(this.searchInfo);
    },
    no_handleCurrentChange(val) {
      //获取当前页
      this.searchInfo["page"] = val;
      this.searchInfo["rows"] = this.no_pageSize;
       this.searchInfo["targetId"] = this.targetId;
      this.getPerRefund(this.searchInfo);
    }
  }
};
</script>

<style scoped>
.header {
  margin-top: 30px;
  background-color: #e6ebf5;
  height: 55px;
  line-height: 55px;
  border-bottom: 1px solid #ebeef5;
  padding-left: 10px;
  font-weight: 700;
}
.header span {
  margin: 0 15px;
}
.mainAccounts {
  border: 1px solid #ebeef5;
  height: 80p;
  line-height: 80px;
}
.mainAccounts .el-input__inner {
  height: 28px;
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
.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding-right: 10px;
  text-align: right;
  line-height: 40px;
}
</style>