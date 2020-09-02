<template>
  <div class="page-body">
    <div class="filter_wrap">
      <div class="switchHeight_box" style="height:85px;">
        <el-row>
          <el-col :span="2">
            <span class="filter_title">竞买人 :</span>
          </el-col>
          <el-col :span="5">
            <el-input v-model="pram.licenseId" placeholder="请输入竞买人名称关键字"></el-input>
          </el-col>
          <el-col :span="2">
            <span class="filter_title">竞买时间 :</span>
          </el-col>
          <el-col :span="8">
            <el-date-picker
              v-model="biddingTime"
              value-format="yyyy-MM-dd"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="selectDatarange"
              :picker-options="pickerOptions"
            ></el-date-picker>
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
          <span class="toolsTitle">竞买记录</span>
        </div>
        <el-table
          ref="multipleTable"
          :data="biddingData"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="licenseNo" label="竞买号" width="300"></el-table-column>
          <el-table-column prop="recorderName" label="竞买人"></el-table-column>
          <el-table-column prop="price" label="竞买出价（万元）" width="300"></el-table-column>
          <el-table-column prop="confirmDate" label="竞买时间" width="300"></el-table-column>
          <el-table-column label="状态" width="300">
            <template slot-scope="scope">
              <span v-if="scope.row.status==0">无效</span>
              <span v-else-if="scope.row.status==1">有效</span>
              <span v-else-if="scope.row.status==2">成交价</span>
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
            :current-page="currentPage"
            :page-size="pageSize"
          ></el-pagination>
        </div>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import transferTable from "@/components/transferTable";
import Axios from "axios";

export default {
  name: "landmarkInfoBidding",
  components: {
    transferTable
  },
  data() {
    return {
      biddingTime:[],
      //页码
      currentPage: 1,
      pageNo: 1,
      pageSize: 15,
      totalPage: 1,
      totalRecord: 1,

      txtVal: 0,

      searchInfo: {},
      biddingData: [],
      pram:{
        targetId:"",
        startTime:"",
        endTime:"",
        page:"",
        rows:"",
        licenseId:""
      }
    };
  },
  mounted() {
    this.$set(this.pram,'targetId',this.$route.query.id);
    this.init();
  },
  methods: {
    pickerOptions: {//日期范围快速选择配置
      shortcuts: [{
        text: '最近一周',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近一个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近三个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
          picker.$emit('pick', [start, end]);
        }
      }]
    },
    selectDatarange(){//选择日期范围后的回调
      this.$set(this.pram,'startTime',this.biddingTime[0]);
      this.$set(this.pram,'endTime',this.biddingTime[1]);
    },
    setPram(){
      this.pageNo = 1;
      this.$set(this.pram,'page',this.pageNo);
      this.$set(this.pram,'rows',5);
    },
    searchList(){
      this.setPram();
      this.init();
    },
    clearList(){
      this.setPram();
      this.biddingTime = [];
      this.$set(this.pram,'licenseId',"");
      this.$set(this.pram,'startTime',"");
      this.$set(this.pram,'endTime',"");

      this.init();
    },
    init(){
      // 查询标的的竞价记录列表
      this.$get("/epf-tradeengine/transofferlog/getTransOfferLogJson", this.pram).then(res => {
        if(res.code == 0){
          this.biddingData = res.pager.results;
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
        }
      });
    },
    handleSizeChange(val) {
      //每页条数改变时触发
      this.pageNo = 1;
      this.$set(this.pram,'page',this.pageNo);
      this.$set(this.pram,'rows',val);
      this.init();
    },
    handleCurrentChange(val) {
      //获取当前页
      this.$set(this.pram,'page',val);
      this.$set(this.pram,'rows',this.pageSize);
      this.init();
    }
  },
  created() {
    this.$set(this.pram,'targetId',this.$route.query.id);
    this.init();
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
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
</style>
