<template>
  <div class="page-body">
    <div class="filter_wrap">
      <div class="switchHeight_box">
        <el-row>
          <el-col :span="2">
            <span class="filter_title">标的编号：</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="targetNo" size="small" placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="3">
            <span class="filter_title">保证金缴纳截止时间：</span>
          </el-col>
          <el-col :span="7">
            <el-date-picker
              v-model="params.selectDate"
              style="width:100%;"
              type="datetimerange"
              size="small"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="dateChange">
            </el-date-picker>
          </el-col>
          <el-col :offset="1" :span="4">
            <div class="button_bg" @click="searchList()">查询</div>
            <div class="button_default" @click="clearList()">重置</div>
          </el-col>
        </el-row>
      </div>
      <el-tabs style="margin-top:35px;">
        <div class="toolsTitleBox">
          <span class="toolsTitle">交易前置资格审核</span>
        </div>
        <el-table
          ref="preReviewTable"
          v-loading="loading"
          element-loading-text="数据加载中"
          element-loading-background="rgba(255, 255, 255,0.95)"
          :data="transTargetData"
          style="width: 100%;min-height: 160px;"
          border
        >
          <el-table-column prop="targetNo" label="序号" min-width="50">
            <template slot-scope="scope">
              <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="标的编号" min-width="110">
            <template slot-scope="scope">
              <span @click="showDetail(scope.row)">{{ scope.row.targetNo }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="beginPrice" label="起始价(万元)" min-width="100"></el-table-column>
          <el-table-column prop="transTypeName" label="交易方式" min-width="100"></el-table-column>
          <el-table-column prop="tradingCenter" label="交易中心" min-width="110"></el-table-column>
          <el-table-column prop="insertUser" label="经办人" min-width="110"></el-table-column>
          <el-table-column label="挂牌(拍卖)开始时间" min-width="130">
            <template slot-scope="scope">
<!--              <span v-if="scope.row.transTypeName == '网上交易（挂牌）'" >{{scope.row.beginFocusTime}}</span>-->
<!--              <span v-else>{{scope.row.beginLimitTime}}</span>-->
                  <span> {{scope.row.beginFocusTime}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="endEarnestTime" label="保证金缴纳截止时间" min-width="130"></el-table-column>
          <el-table-column label="操作" min-width="80">
            <template slot-scope="scope">
              <span class="list-style: none;"  v-for="(button ,index)  in buttons" :key="index">
              <el-button type="text" v-if="button.resourceId=='tradpre_viewbidding'" @click="toogleExpand(scope.row)">查看申请列表</el-button>
              </span>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align:right;margin:22px 0px;">
          <el-pagination
            background
            layout="total,prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
            :current-page="pageNo"
            :page-size="pageSize"
          ></el-pagination>
        </div>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import {mapActions,mapState} from "vuex";
import Bus from '../../../../../utils/bus'

export default {
  name: "tradPreReview",
  data() {
    return {
       ids:'',
      //搜索表单
      params: {
        targetNo: "",
        selectDate:"",
        endEarnestTime1:"",
        endEarnestTime2:"",
      },
      //前置资格审核列表
      transTargetData: [],
      //页码
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      temp: {
        address__province: "",
        address__city: "",
        address__dist: ""
      },
      searchInfo: {},
      //loading
      loading: true,
      //按钮组、主题
      buttons:[],
      targetNo: '',
    };
  },
  mounted() {

},
  methods: {
    ...mapActions(['setTabsList']),
    //跳转标的详情页面
    showDetail(item){
        var routerPath,title
        routerPath='landmarkInfoDetail?id='+item.id,title='标的详情'
        var tabObj = {title,routerPath}
        this.setTabsList(tabObj)
        this.$router.push({path:routerPath,query:{id:item.id}})
    },
    //请求列表数据
    getData(){
      this.loading = true;
      let params = {}
      params['page'] = this.pageNo;
      params['rows'] = this.pageSize;
      params['targetNo'] = encodeURIComponent(this.targetNo);
      params['endEarnestTime1'] = this.params.endEarnestTime1;
      params['endEarnestTime2'] = this.params.endEarnestTime2;
      this.$get('/epf-trade/admin/translicense/beforeAuditList',params).then(res=>{

          if(res.code == 0){
            this.transTargetData = res.pager.results;
            console.log("11111");
            console.log(this.transTargetData);
            this.pageNo = res.pager.pageNo;
            this.pageSize = res.pager.pageSize;
            this.totalPage = res.pager.totalPage
            this.totalRecord = res.pager.totalRecord
          }else{
            this.$message.error(res.msg)
          }
          this.loading = false;
      });
    },
    //打开申请列表(table展开行)
    toogleExpand(row) {
      let title = '申请列表';
      debugger
      let targetNo = encodeURIComponent(row.targetNo);
      let routerPath = `/frontAudit?targetId=${row.id}&targetNo=`+targetNo;
      let tabObj = {title,routerPath}
      //将当前点击的选项添加到vuex中
      this.setTabsList(tabObj);
      this.$router.push({path:routerPath,query:{targetId:row.id, targetNo:row.targetNo}});
    },
    //清除筛选条件
    clearList() {
      this.pageNo = 1;
      this.targetNo = "";
      this.params.selectDate = "";
      this.params.endEarnestTime1 = "";
      this.params.endEarnestTime2 = "";
      this.getData();
    },
    //搜索
    searchList() {
      this.getData();
    },
    handleSizeChange(val) {
      //每页条数改变时触发
      this.pageNo = 1;
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      //获取当前页
      this.pageNo = val;
      this.getData();
    },
    //选择保证金缴纳截止时间
    dateChange(val){
      if(val){
        this.params.endEarnestTime1 = val[0]
        this.params.endEarnestTime2 = val[1]
      }
    },
  },
  created() {
    this.buttons=JSON.parse(localStorage.getItem("tradPreReview"));
    this.getData();
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
<style scoped>
.filter_wrap .el-input--small .el-input__inner {
  height: 34px;
}
.filter_wrap .el-row {
  margin-bottom: 10px;
}
.filter_wrap .distpicker-address-wrapper select {
  width: 148px;
  font-size: 14px;
  padding: 0 10px;
}

.filter_wrap .el-date-editor.el-input .el-input__icon {
  line-height: 30px;
  color: #b3b3b3;
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
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
</style>
