<template>
  <div style="padding:30px 0 0 20px">
    <el-row class="mainAccounts">
      <el-form ref="filterData" :model="filterData">
        <el-col :span="2">
          <span class="filter_title">竞买人 :</span>
        </el-col>
        <el-col :span="5" class="maginTop">
          <el-form-item prop="title">
            <el-input v-model="filterData.Bidder" placeholder="请输入竞买人名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1" :offset="1" class="maginTop">
          <div
            class="button_bg"
            @click="getBidShiftToMainAccount({realName:filterData.Bidder,targetId:targetId})"
          >查询</div>
        </el-col>

        <el-col :span="1" class="maginTop">
          <div class="button_bg" @click="resetFilter">重置</div>
        </el-col>
      </el-form>
    </el-row>
    <div class="header">
      竞买保证金转入主账户
      <span>标的编号:</span>
      <em>{{targetNo}}</em>
      <span>流转方式:</span>
      <em>{{businessTypeName}}</em>
      <div class="button_bg" @click="more()" style="width:90px;margin-top:10px">批量转入</div>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" :selectable="checkboxT"></el-table-column>
      <el-table-column prop="name" label="竞买人" width="140" align="left"></el-table-column>
      <el-table-column prop="accountNo" label="子账户" width="230" align="left"></el-table-column>
      <el-table-column label="金额" width="120" align="left">
      <template slot-scope="scope">{{scope.row.currencySymbol}}:{{scope.row.amountDesc}}万元</template>
      </el-table-column>
      <el-table-column prop="bankDate" label="到账时间" width="160" align="left"></el-table-column>
      <el-table-column prop="billType" label="类型" width="120" align="left"></el-table-column>
      <el-table-column prop="contributors" label="缴款人" width="130" align="center"></el-table-column>
      <el-table-column prop="isValid" label="使用状态" width="110" align="left">
        <template slot-scope="scope">
          <span
            v-if="scope.row.isValid=='1'"
          >是</span>
          <span
            v-else
          >否</span>
        </template>
      </el-table-column>
      <el-table-column prop="isGet" label="是否竞得人" width="110" align="left"></el-table-column>
      <el-table-column prop="billFlowDesc" label="状态" width="120" align="left"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.billFlow=='bill_status-001'"
            type="text"
            size="small"
            @click="btnClick(scope.row)"
          >转入主账户</el-button>
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
import axios from "axios";
export default {
  data() {
    return {
      myparams: {},
      targetId: "",
      searchInfo: {},
      no_pageNo: 1,
      no_pageSize: 5,
      no_totalPage: 1,
      no_totalRecord: 1,
      targetNo: "",
      businessType: "",
      myids: "",
      tableData: [],
      multipleSelection: [],
      filterData: {
        Bidder: ""
      },
        businessTypeName:''
    };
  },
  created() {
    this.targetId = this.$route.query.targetId;
    this.targetNo = this.$route.query.targetNo;
    this.businessType = this.$route.query.businessType;
    this.businessTypeName = this.$route.query.businessTypeName;
    this.myparams = {
      targetId: this.$route.query.targetId,
      realName: this.filterData.Bidder,
      page: this.no_pageNo,
      rows: this.no_pageSize
    };
    this.getBidShiftToMainAccount(this.myparams);
  },
  methods: {
    checkboxT(row, index) {
      if (row.billFlow == "bill_status-001") {
        return 1;
      } else {
        return 0;
      }
    },
    more: function() {
      this.overTo(this.ids);
    },
    overTo: async function(myid) {
      const res = await this.$get("/epf-trade/finance/switchToMainAccount", {
        targetId: this.$route.query.targetId,
        ids: myid
      });
      if (res.code == "0") {
        this.$message.success("转入主账户成功");
        this.getBidShiftToMainAccount(this.myparams);
      } else {
        this.$message.error(res.msg); //失败
        return;
      }
    },
    getIDs: function(array) {
      var ids = "";
      for (var i = 0; i < array.length; i++) {
        ids += array[i].id;
        if (i != array.length - 1) {
          ids += ",";
        }
      }
      return ids;
    },
    resetFilter: function(params) {
      for (let item in this.filterData) {
        this.filterData[item] = "";
      }
    },
    btnClick: async function(val) {
      this.overTo(val.id);
    },
    handleSelectionChange(val) {
      this.ids = this.getIDs(val);
    },
    getBidShiftToMainAccount: async function(myparams) {
      const res = await this.$get("/epf-trade/finance/swithMainList", myparams);
      if (res.code == "0") {
        this.no_pageNo = res.pager.pageNo;
        this.no_pageSize = res.pager.pageSize;
        this.no_totalPage = res.pager.totalPage;
        this.no_totalRecord = res.pager.totalRecord;
        this.tableData = res.pager.results;
        console.log(this.tableData);
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
      this.getBidShiftToMainAccount(this.searchInfo);
    },
    no_handleCurrentChange(val) {
      //获取当前页
      this.searchInfo["page"] = val;
      this.searchInfo["rows"] = this.no_pageSize;
      this.searchInfo["targetId"] = this.targetId;
      this.getBidShiftToMainAccount(this.searchInfo);
    }
  }
};
</script>

<style scoped>
.mainAccounts .el-input__inner {
  height: 28px;
}
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

.dialogBtn_box {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.titleHoverStyle:hover {
  color: #4772d5 !important;
}
.maginTop {
  margin-top: 20px;
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
