<template>
  <div class="page-body">
    <div class="filter_wrap">
      <div class="switchHeight_box">
        <el-row>
          <el-col :span="2">
            <span class="filter_title">标的编号：</span>
          </el-col>
          <el-col :span="4">
            <el-input v-model="targetNo" placeholder="请输入标的编号"></el-input>
          </el-col>
          <el-col :span="2">
            <span class="filter_title">竞得人：</span>
          </el-col>
          <el-col :span="4">
            <el-input v-model="params.bidderName" placeholder="请输入竞得人名称"></el-input>
          </el-col>
          <el-col :span="3">
            <div class="button_bg" @click="searchList()">查询</div>
          </el-col>
          <el-col :span="2">
            <div class="button_export" @click="clearList()">重置</div>
          </el-col>
        </el-row>
      </div>
      <el-tabs style="margin-top:35px;">
        <div class="toolsTitleBox">
          <span class="toolsTitle">托管账户到账查询</span>
        </div>
        <el-table ref="multipleTable" :data="accountList" style="width: 100%" border>
          <el-table-column label="标的编号" width="175" align="center">
            <template slot-scope="scope">
              <span @click="showDetail(scope.row)">{{ scope.row.targetNo }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="bidderName" label="竞得人" width="200" align="center"></el-table-column>
<!--          注释：原因虚拟银行没有这两个数据-->
<!--          <el-table-column prop="bidderAccountNo" label="付款账号" width="185" align="center">-->
<!--            -->
<!--          </el-table-column>-->
<!--          <el-table-column prop="bidderAccountName" label="付款户名" width="210" align="center">-->
<!--            -->
<!--          </el-table-column>-->
          <el-table-column prop="amount" label="金额" width="160" align="center">
             <template slot-scope="scope">
               {{scope.row.currencySymbol}}:{{scope.row.amount}}万元
              </template>
          </el-table-column>
          <el-table-column prop="childAccountNo" label="资金托管账号" width="190" align="center"></el-table-column>
          <el-table-column prop="bankBusinessDate" label="汇入日期" width="230" align="center"></el-table-column>
          <el-table-column prop="arrivalTypeLabel" label="类型" width="120" align="center"></el-table-column>
          <el-table-column prop="contributors" label="交款人" align="center"></el-table-column>
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
import { mapActions, mapState } from "vuex";

export default {
  name: "escrowAccount",
  components: {},
  data() {
    return {
      //搜索表单
      targetNo: "",
      params: {
        targetNo: "",
        bidderName: "",
        page: 1,
        rows: 5
      },
      //托管到账查询列表
      accountList: [],
      //页码
      currentPage: 1,
      totalPage: 1,
      totalRecord: 1,
      pageNo: 1,
      pageSize: 5,

      searchInfo: {}
    };
  },
  mounted() {
    this.getAccountList();
  },
  methods: {
    ...mapActions(["setTabsList"]),
    //跳转标的详情页面
    showDetail(item){
        var routerPath,title
        routerPath='landmarkInfoDetail',title='标的详情'
        var tabObj = {title,routerPath}
        this.setTabsList(tabObj)
        this.$router.push({path:routerPath,query:{id:item.targetId}})
    },
    //获取托管到账查询列表
    getAccountList(val) {
      const that = this;
      const params = this.params;
      params.targetNo =  encodeURIComponent(this.targetNo);
      this.$get(`/epf-trade/admin/transaccountbill/findCustodyArrivalBill`,
        params
      ).then(res => {
        console.log('撒娇都是你凯撒',res);
        if (res.code == "0") {
          that.accountList = res.pager.results;
          that.pageNo = res.pager.pageNo;
          that.pageSize = res.pager.pageSize;
          that.totalPage = res.pager.totalPage;
          that.totalRecord = res.pager.totalRecord;
        } else {
          that.$message.error(res.msg); //失败
          return;
        }
      });
    },
    //清除筛选条件
    clearList() {
      this.params.targetNo = "";
      this.params.bidderName = "";
      this.targetNo = "";
      this.getAccountList();
    },
    //搜索列表
    searchList() {
      this.getAccountList();
    },
    handleSizeChange(val) {
      //每页条数改变时触发
      this.params.pageNo = 1;
      this.params.rows = val;
      this.getAccountList();
    },
    handleCurrentChange(val) {
      //获取当前页
      this.params.page = val;
      this.getAccountList();
    }
  },
  created() {
    this.getAccountList();
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
  color: #606266;
}
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
</style>

