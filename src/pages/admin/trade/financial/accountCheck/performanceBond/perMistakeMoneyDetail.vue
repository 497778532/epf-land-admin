<template>
  <div class="page-body">
    <div class="filter_wrap">
      <div class="switchHeight_box">
        <el-row>
          <el-col :span="2">
            <span class="filter_title">交款户名：</span>
          </el-col>
          <el-col :span="4">
            <el-input v-model="params.bidderAccountName" placeholder="请输入交款户名"></el-input>
          </el-col>
          <el-col :span="1.5">
            <span class="filter_title">交款账号：</span>
          </el-col>
          <el-col :span="4">
            <el-input v-model="params.bidderAccountNo" placeholder="请输入交款账号"></el-input>
          </el-col>
          <el-col :span="2">
            <span class="filter_title">交款账户开户行：</span>
          </el-col>
          <el-col :span="6">
            <el-input v-model="params.bidderAccountBank" placeholder="请输入交款账户开户行"></el-input>
          </el-col>
          <el-col :span="2">
            <div class="button_bg" @click="searchList()">查询</div>
          </el-col>
          <el-col :span="2">
            <div class="button_default" @click="clearList()">重置</div>
          </el-col>
        </el-row>
      </div>
      <el-tabs style="margin-top:35px;">
        <div class="toolsTitleBox">
          <span class="toolsTitle">错转款详情</span>
        </div>
        <el-table ref="multipleTable" :data="mistakeList" style="width: 100%" border>
          <el-table-column prop="goodsNo" label="地块编号" width="180" align="center"></el-table-column>
          <el-table-column prop="childAccountNo" label="收款账户" width="170" align="center"></el-table-column>
          <el-table-column prop="bidderAccountName" label="交款户名" width="150" align="center"></el-table-column>
          <el-table-column prop="bidderAccountNo" label="交款账号" width="150" align="center"></el-table-column>
          <el-table-column prop="bidderAccountBank" label="交款账户开户行" width="210" align="center"></el-table-column>
          <el-table-column prop="amount" label="金额" width="210" align="center">
             <template slot-scope="scope">
               {{scope.row.currencySymbol}}:{{scope.row.amount}}万元
              </template>
          </el-table-column>
          <el-table-column prop="reason" label="原因" width="110" align="center"></el-table-column>
          <!-- <el-table-column prop="endEarnestTime" label="保证金缴纳截止时间" width="230" align="center"></el-table-column> -->
          <el-table-column prop="bankBusinessDate" label="到账时间" align="center"></el-table-column>
        </el-table>
        <div style="text-align:right;margin:22px 0px;">
          <el-pagination
            background
            layout="total,prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            :page-size="pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
            :current-page="currentPage"
          ></el-pagination>
        </div>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import { mapActions, mapState } from "vuex";

export default {
  name: "perMistakeMoneyDetail",
  components: {},
  data() {
    return {
      //搜索表单
      params: {
        bidderAccountName: "",
        bidderAccountNo: "",
        bidderAccountBank: ""
      },
      //详情数据
      mistakeList: [],
      // mistakeList: [
      //   {
      //     goodsNo: "DAZ2018003",
      //     childAccountNo: "782728282811",
      //     bidderAccountName: "万达",
      //     bidderAccountNo: "728272827281",
      //     bidderAccountBankName: "中国银行舜华路街道分行",
      //     amount: "30，000美元",
      //     reason: "缴多",
      //     endEarnestTime: "2019-01-03 10:01:01",
      //     bankBusinessDate: "2019-01-01 10:01:01"
      //   },
      //   {
      //     goodsNo: "DAZ2018003",
      //     childAccountNo: "782728282811",
      //     bidderAccountName: "万达",
      //     bidderAccountNo: "728272827281",
      //     bidderAccountBankName: "中国银行舜华路街道分行",
      //     amount: "30，000美元",
      //     reason: "缴多",
      //     endEarnestTime: "2019-01-03 10:01:01",
      //     bankBusinessDate: "2019-01-01 10:01:01"
      //   }
      // ],

      //页码
      currentPage: 1,
      totalPage: 1,
      totalRecord: 1,
      pageNo: 1,
      pageSize: 5,

      searchInfo: {}
    };
  },
  methods: {
    //获取错转款的详情数据
    getItemData(val) {
      const that = this;
      const params = this.params;
      let id = this.$route.query.applyId;
      params["page"] = this.searchInfo["page"]; //页码
      params["rows"] = this.searchInfo["rows"]; //每页条数
      this.$get(
        `/epf-trade/admin/transaccountbill/findErroneousTransfer?applyId=${id}`,
        params
      ).then(res => {
        console.log(res);
        that.pageNo = res.pager.pageNo;
        that.pageSize = res.pager.pageSize;
        that.totalPage = res.pager.totalPage;
        that.totalRecord = res.pager.totalRecord;
        that.mistakeList = res.pager.results;
        console.log(that.mistakeList);
      });
    },
    //清除筛选条件
    clearList() {
      (this.params.bidderAccountName = ""),
        (this.params.bidderAccountNo = ""),
        (this.params.bidderAccountBank = "");
      this.getItemData();
    },
    //搜索
    searchList() {
      this.getItemData();
    },
    handleSizeChange(val) {
      //每页条数改变时触发
      this.searchInfo["page"] = 1;
      this.searchInfo["rows"] = val;
      this.getItemData(this.searchInfo);
    },
    handleCurrentChange(val) {
      //获取当前页
      this.searchInfo["page"] = val;
      this.searchInfo["rows"] = this.pageSize;
      this.getItemData(this.searchInfo);
    }
  },
  created() {
    this.getItemData(this.$route.query.applyId);
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




.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding-right: 10px;
  text-align: right;
  line-height: 34px;
  margin-left: 10px;
}
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
  color: rgb(70, 113, 213);
}
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
</style>

