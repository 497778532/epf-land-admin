<template>
  <div class="page-body">
    <div class="filter_wrap">
      <div>
        <!-- 标的编号 -->
        <div id="numIdBox">
          <span class="numIdTitle">标的编号</span>
          <span class="numId">{{auditData.targetNo}}</span>
        </div>
        <table class="titleData">
          <tr>
            <td style="width:140px;">交易方式</td>
            <td>{{auditData.transTypeName}}</td>
            <td style="width:140px;">交易中心</td>
            <td>{{auditData.tradingCenter}}</td>
          </tr>
          <tr>
            <td style="width:140px;">起始价(万元)</td>
            <td>{{auditData.beginPrice}}</td>
            <td style="width:140px;">经办人</td>
            <td>{{auditData.insertUser}}</td>
          </tr>
          <tr>
            <td style="width:140px;" v-if="auditData.beginFocusTime">挂牌开始时间</td>
            <td style="width:140px;" v-else>拍卖开始时间</td>

            <td v-if="auditData.beginFocusTime">{{auditData.beginFocusTime}}</td>
            <td v-else>{{auditData.beginLimitTime}}</td>

            <td style="width:140px;">保证金缴纳截止时间</td>
            <td>{{auditData.endEarnestTime}}</td>
          </tr>
        </table>
      </div>
      <div style="margin-top:30px;">
        <el-table ref="preReviewTable" :data="licenseDatas" style="width: 100%" v-loading="loading" element-loading-text="数据加载中" border :height="boxHeight - 270">
          <el-table-column prop="targetNo" label="序号" min-width="50" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="licenseNo" label="竞买号" min-width="110"></el-table-column>
          <el-table-column prop="bidderId" label="竞买人" min-width="100"></el-table-column>
          <el-table-column prop="ifJointBidding" label="是否联合竞买" min-width="100"></el-table-column>
          <el-table-column prop="businessTypeName" label="流转方式" min-width="110">
          </el-table-column>
          <el-table-column prop="transType" label="交易方式" min-width="110">
          </el-table-column>
          <el-table-column prop="statusName" label="审核状态" min-width="130">
          </el-table-column>
          <el-table-column prop="auditor" label="审核人" min-width="130"></el-table-column>
          <el-table-column label="操作" fixed="right" width="150">
            <!--判断代办-以办 scope.row.Acts 0 - 代办 ， 1 - 以办-->
            <template slot-scope="scope">
              <el-button
                type="text"
                v-if="scope.row.status == 'license_status-004'"
                @click="openAudit(scope.row)"
              >预审</el-button>
              <el-button type="text" v-else @click="openAuditResult(scope.row)">预审结果</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页控件 -->
        <div class="epf_paging_fixe">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
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
export default {
  name: "prepose",
  data() {
    return {
      auditData: [],
      licenseDatas:[],
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      dialogForm : false,
      companyForm : false,
      targetId: '',
      loading: true,
    };
  },
  created() {
    this.getAuditData();
    this.boxHeight = window.innerHeight - 250;
  },
  methods: {
    getAuditData(){
      let targetNo = this.$route.query.targetNo;
      let targetId = this.$route.query.targetId;
      this.loading = true;
      this.$get(this.$API.EPF_TRADE.TRADE.BEFORE_LIST,{targetNo:encodeURIComponent(targetNo)}).then(res=>{
        if(res.code == 0){
          this.auditData = res.pager.results[0];
          this.targetId = targetId;
          this.getLicenseDatas(targetId)
        }else{
          this.$message.error(res.msg)
        }
        this.loading = false;
      });
    },
    // 申请竞买列表
    getLicenseDatas(targetId){
      this.loading = true;
      this.$get(this.$API.EPF_TRADE.TRADE.GET_APPLY,{targetId:targetId}).then(res=>{
        if(res.code == 0){
          console.log("111111",res);
          this.licenseDatas = res.pager.results;
        }else{
          console.log("222",res);
          this.$message.error(res.msg)
        }
        this.loading = false;
      });
    },

    handleSizeChange(val) {
      //每页条数改变时触发
    },
    handleCurrentChange(val) {
      //获取当前页
    },
    //打开预审页面
    openAudit(row){
        console.log("获取的row对象是：",row)
        let title = "审核页面";
        let routerPath = '/system/trade/trade/views/prepose/examine';
        let item = {url:routerPath,menuname:title}
        //将当前点击的选项添加到vuex中
        this.$router.push({path:routerPath,query:{targetId: this.targetId, id:row.id ,businessId:row.businessId,taskId:row.taskId,procInsId:row.procInsId,procDefId:row.procDefId}});
        this.$store.commit("ADD_TAB", item)
    },
    //打开预审结果页面
    openAuditResult(row){
        let title = "审核结果";
        let routerPath = '/system/trade/trade/views/prepose/result?id='+row.id;
        let item = {url:routerPath,menuname:title}
        //将当前点击的选项添加到vuex中
        this.$router.push({path:routerPath,query:{targetId:this.targetId,id:row.id,businessId:row.businessId,taskId:row.taskId,procInsId:row.procInsId,procDefId:row.procDefId}});
        this.$store.commit("ADD_TAB", item)
    },
  },
  watch: {
    $route(v1,v2){
      this.getAuditData();
    }
  },
};
</script>

<style scoped>
#numIdBox {
  width: 100%;
  padding-left: 18px;
  background: #fefeed;
  border: 1px solid #ecd38b;
  height: 52px;
}
.numIdTitle {
  display: inline-block;
  height: 100%;
  line-height: 50px;
  font-size: 16px;
  font-weight: 800;
  color: #5f6465;
}
.numId {
  padding-left: 10px;
  font-size: 16px;
  font-weight: 800;
  color: #ffa202;
}
.titleData{
  width: 100%;
}
.titleData tr td{
  padding: 12px 12px;
  border: 1px solid rgb(241, 241, 241);
  color: rgb(36, 36, 36);
  border-top: none;
}
.auditDotDefaut {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #b4b4b4;
  border: 3px solid #c7c7c7;
  position: relative;
  top: 1px;
}
.auditDotSuccess {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #98bb38;
  border: 3px solid #b7d36a;
  position: relative;
  top: 1px;
}
.auditDotError {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #f67575;
  border: 3px solid #ff9696;
  position: relative;
  top: 1px;
}
.peopleInfoBox{
    padding: 50px 40px;
}
.companyInfoBox{
    padding: 30px 30px;
    max-height: 500px;
    overflow-y: auto;
}
.peopleBorder{
    width: 100%;
    padding: 10px 10px;
    border: 1px solid rgb(206, 206, 206);
}
.companyInfoBorder{
    width: 100%;
    padding: 10px 10px;
    border: 1px solid rgb(206, 206, 206);
    border-top: none;
}
.holdersTop{
    margin: 15px 0px;
    height: 20px;
}
.holdersTop .leftDot{
    display: block;
    width: 5px;
    height: 22px;
    border-radius: 5px;
    background: #fea200;
    float: left;
}
.holdersTop .leftTitle{
    font-size: 16px;
    padding-left: 15px;
}
</style>
<style>
.peopleInfo .el-dialog .el-dialog__body{
    padding: 0 !important;
    position: relative;
    top: -1px;
}
.companyInfo .el-dialog .el-dialog__body{
    padding: 0 !important;
    position: relative;
    top: -1px;
}
</style>
