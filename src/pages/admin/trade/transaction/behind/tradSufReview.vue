<!--hzuflpbn-->
<template>
  <div class="page-body">
    <div class="filter_wrap">
      <div class="switchHeight_box">
        <el-row>
          <el-col :span="2">
            <span class="filter_title">标的编号</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="targetNo" size="small" placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="4">
            <span class="filter_title">成交时间：</span>
          </el-col>
          <el-col :span="4">
            <div class="block">
               <el-date-picker
                v-model="params.time"
                type="date"
                placeholder="选择日期时间"
                align="right"
                size="small"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions">
                </el-date-picker>
            </div>
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
          <span class="toolsTitle">交易后置资格审核</span>
        </div>
        <el-table
          :data="tableData"
          v-loading="loading"
          element-loading-text="数据加载中"
          element-loading-background="rgba(255, 255, 255, 0.9)"
          style="width: 100%;"
          >
            <el-table-column
            type="index"
            :index="1"
            label="序号"
            width="50">
            </el-table-column>
            <el-table-column
            label="标的编号"
            width="200">
              <template slot-scope="scope">
                <span @click="showDetail(scope.row)">{{ scope.row.targetNo }}</span>
              </template>
            </el-table-column>
            <el-table-column
            prop="licenseNo"
            label="竞买号"
            width="140">
            </el-table-column>
            <el-table-column
            prop="bidderId"
            label="竞买人"
            width="200">
            </el-table-column>
            <el-table-column
            prop="buyType"
            label="是否联合竞买"
            width="120">
              <template slot-scope="scope">
                <span v-if="(scope.row.buyType==='0')">是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>
            <el-table-column
            prop="beginPrice"
            label="起始价（万元）"
            width="120">
            </el-table-column>
            <el-table-column
            prop="endTransTime"
            label="成交时间"
            width="160">
            </el-table-column>
            <el-table-column
            prop="transPrice"
            label="成交价（万元）"
            width="120">
            </el-table-column>
            <el-table-column
            prop="statusName"
            label="状态"
            width="120">
            </el-table-column>
          <el-table-column
          fixed="right"
          label="操作"
          width="300">
          <template slot-scope="scope">
            <!--判断代办-以办 scope.row.Acts 0 - 代办 ， 1 - 以办-->
            <span class="list-style: none;"  v-for="(button ,index)  in buttons" :key="index">
            <el-button @click="handleClick(scope.row.targetNo, scope.row.id,scope.row)" type="text"
            v-if="(scope.row.status==='license_status-012')&&button.resourceId=='tradsuf_audit'" size="small">审核</el-button>
            <el-button @click="handleResultClick(scope.row)" type="text"
            v-if="(scope.row.status==='license_status-009' ||　scope.row.status==='license_status-010')&&button.resourceId=='tradsuf_viewaudit'" size="small">审核结果</el-button>
            <el-button v-if="button.resourceId=='tradsuf_viewbidding'" @click="openRecord(scope.row.targetNo, scope.row.id)" type="text" size="small">竞价记录</el-button>
            </span>
          </template>
          </el-table-column>
        </el-table>
        <div style="margin-top:25px;text-align: right;">
         <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
            :current-page="pageNo"
            :page-size="pageSize"
            >
          </el-pagination>
        </div>
      </el-tabs>
    </div>
    <el-dialog title="出价记录" class="peopleInfo" width="60%" :visible.sync="dialogForm" :append-to-body='true'>
        <div class="offerBox">
          <div class="filterBox">
            <div style="height:32px;line-height:32px;width:80px;float:left;">出价时间：</div>
            <div style="width:50%;float:left;">
              <el-date-picker
                v-model="biddingTime"
                type="datetimerange"
                size="small"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="selectDatarange"
              >
              </el-date-picker>
            </div>
            <span style="float:right;">
              <div class="button_border" @click="offer_searchList()">查询</div>
              <div class="button_default" @click="offer_clearList()">重置</div>
            </span>
          </div>
            <!-- v-loading="offerLoading" -->
          <el-table
            :data="offerData"
            element-loading-text="数据加载中"
            element-loading-background="rgba(255, 255, 255, 0.9)"
            border
            style="width: 100%;margin-top:20px;">
            <el-table-column label="序号" width="70" >
              <template slot-scope="scope">
                {{scope.$index + 1}}
              </template>
            </el-table-column>
            <el-table-column
              prop="licenseNo"
              label="竞买号">
            </el-table-column>
            <el-table-column
              prop="recorderName"
              label="竞买人">
            </el-table-column>
            <el-table-column
              prop="price"
              label="竞买出价（万元）">
            </el-table-column>
            <el-table-column
              prop="offerDate"
              label="竞价时间">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status == '1'">有效</span>
                <span v-if="scope.row.status == '2'">成交价</span>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top:25px;text-align: right;">
            <el-pagination
              background
              layout="prev, pager, next,sizes,jumper"
              :page-sizes="[5,10, 15, 20]"
              @size-change="offerSizeChange"
              @current-change="offerCurrentChange"
              :total="offer_totalRecord"
              :current-page="offer_pageNo"
              :page-size="offer_pageSize"
              >
            </el-pagination>
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import transferTable from "@/components/transferTable";
import axios from "axios";
import {mapActions,mapState} from "vuex";
import Bus from '../../../../../utils/bus'

export default {
  name: "tradSufReview",
  components: {
    transferTable
  },
  data() {
    return {

      paramsRecord:{
        LaterGetCheckvoId:''
      },
      pickerOptions: { //选择时间
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      select_time:'', //选择时间
      ids:'',
      tableData: [ //标的列表
        // {serial_number:"1",mark_number:"DAZ2018001",bid_number:"11018001",bidder:'libai',choice:'是',start_price:'1000',end_time:'2019-7-21  12:21:41',deal_price:'1200',audit_status:'未审核',auditor:'王兰',},
        // {serial_number:"2",mark_number:"DAZ2018008",bid_number:"18018008",bidder:'libai',choice:'是',start_price:'1200',end_time:'2019-6-2  09:11:23',deal_price:'1200',audit_status:'已审核',auditor:'王兰',},
        // {serial_number:"3",mark_number:"DAZ2012003",bid_number:"13012003",bidder:'libai',choice:'是',start_price:'1000',end_time:'2019-7-11  14:48:24',deal_price:'1000',audit_status:'未审核',auditor:'王兰',},
        // {serial_number:"4",mark_number:"DAZ2138006",bid_number:"36138006",bidder:'libai',choice:'是',start_price:'2000',end_time:'2019-9-21  15:11:54',deal_price:'2100',audit_status:'已审核',auditor:'王兰',},
        // {serial_number:"5",mark_number:"DAZ2031308",bid_number:"38031308",bidder:'libai',choice:'否',start_price:'1500',end_time:'2019-8-26  10:51:23',deal_price:'1600',audit_status:'已审核',auditor:'王兰',},
        // {serial_number:"6",mark_number:"DAZ2011348",bid_number:"18011348",bidder:'libai',choice:'否',start_price:'3000',end_time:'2019-11-15  09:23:45',deal_price:'3000',audit_status:'未审核',auditor:'王兰',},
        // {serial_number:"7",mark_number:"DAZ2013010",bid_number:"10013010",bidder:'libai',choice:'否',start_price:'3000',end_time:'2019-7-7  16:22:30',deal_price:'3000',audit_status:'已审核',auditor:'王兰',},
        // {serial_number:"8",mark_number:"DAZ2018310",bid_number:"10018310",bidder:'libai',choice:'是',start_price:'2100',end_time:'2019-12-8  17:21:02',deal_price:'2200',audit_status:'已审核',auditor:'王兰',},
        // {serial_number:"9",mark_number:"DAZ2018004",bid_number:"14018004",bidder:'libai',choice:'是',start_price:'2000',end_time:'2019-10-17  11:04:13',deal_price:'2100',audit_status:'未审核',auditor:'王兰',},

      ],
      transTargetData: [
        // {targetNo:'11',beginPrice:'11',amount:'11',statusName:'11',tradingCenter:'11',insertUser:'11',insertTime:'11'},
        // {targetNo:'12',beginPrice:'12',amount:'12',statusName:'12',tradingCenter:'12',insertUser:'12',insertTime:'12'},
        // {targetNo:'13',beginPrice:'13',amount:'13',statusName:'13',tradingCenter:'13',insertUser:'13',insertTime:'13'},
        // {targetNo:'14',beginPrice:'14',amount:'14',statusName:'14',tradingCenter:'14',insertUser:'14',insertTime:'14'},

      ],
      //后置资格审核
      pageNo: 1, //页码
      pageSize: 5, //显示条数
      totalPage: 1,
      totalRecord: 1,
      params: {   //表单筛选条件
        targetNo: "", //标的编号
        time: "", //时间
        bidderId:"",
      },
      biddingTime:[],
      loading:true, //后置资格loading
      offerLoading:true, //竞价记录loading
      recordId:'',//竞价记录标识
      transTargetsIds: "",//标的删除接口参数id字符组
      txtVal: 0,
      flowpatreasonData: {
        landNo: "",
        textarea: ""
      },
      textarea: "",
      visible2: false,
      multipleSelection: [],
      handleDataError: [
        {
          type: "primary",
          title: "查看审核结果"
        }
      ],
      filterData: {
        title: "",
        infoId: "",
        flowType: "",
        type: "",
        start: "",
        end: "",
        max: "",
        min: ""
      },
      isShowProvince: true,
      temp: {
        address__province: "",
        address__city: "",
        address__dist: ""
      },
      handleDataWait: [
        {
          type: "success",
          title: "审核"
        },
        {
          type: "primary",
          title: "自动核验"
        }
      ],
      handleDataSuccess: [
        {
          type: "primary",
          title: "查看审核结果"
        },
        {
          type: "danger",
          title: "下架"
        }
      ],
      handleDataError: [
        {
          type: "primary",
          title: "查看审核结果"
        }
      ],
      handleData: "",
      dialogForm: false,
      dialogTable: false,
      dialogTest: false,
      searchInfo: {},
      tableData1: [],
      form: {
        assessor: "",
        opinion: ""
      },
      //竞价记录弹窗
      dialogForm:false,
      //竞价记录筛选
      offerFilter:{
        offerTime:'',
      },
      //竞价记录数据
      offerData:[],
      //竞价记录分页
      offer_pageNo: 1,
      offer_pageSize: 5,
      offer_totalPage: 1,
      offer_totalRecord: 1,

      //按钮组、主题
      buttons:[],
      targetNo: "",
      pram:{
        targetId:"",
        startTime:"",
        endTime:"",
        page:"",
        rows:"",
      }
    };
  },
  created() {
    this.buttons=JSON.parse(localStorage.getItem("tradSufReview"));
    this.queryData({isBinding: "1"});
  },
  mounted() {
    this.queryData();
  },
  methods: {
    ...mapActions(['setTabsList']),
    selectDatarange(){//选择日期范围后的回调
      this.$set(this.pram,'startTime',this.biddingTime[0]);
      this.$set(this.pram,'endTime',this.biddingTime[1]);
    },
    queryData(){ //后置资格数据请求
      this.loading = true;
      let params = this.params;
      params['page'] = this.pageNo; //页码
      params['row1'] = this.pageSize; //每页条数
      params['targetNo'] = encodeURIComponent(this.targetNo);//标的编号
      this.$get('/epf-trade/admin/translicense/getTransLaterlist',params).then(res=>{
        if (res.code == "0") {
          console.log("1111111111",res);
          this.tableData = res.pager.results;
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
        } else {
          console.log("222222222",res);
          this.$message.error(res.msg); //失败
          return;
        }
        this.loading = false;
      });
    },
    //跳转标的详情页面
    showDetail(item){
        var routerPath,title
        routerPath='landmarkInfoDetail',title='标的详情'
        var tabObj = {title,routerPath}
        this.setTabsList(tabObj)
        this.$router.push({path:routerPath,query:{id:item.id}})
    },
    openRecord(val, id){ //打开竞价记录弹窗
      this.offerData = [];
      this.dialogForm = true;
      this.recordId = id;
      this.$set(this.pram,'targetId',id);
      this.$set(this.pram,'page',1);
      this.$set(this.pram,'rows',5);

      this.queryDataOffer();
    },
    queryDataOffer(){ //竞价记录数据请求{mark_number:this.recordId}
      let url = '/epf-tradeengine/transofferlog/getTransOfferLogJson';
      this.$get(url,this.pram).then(res=>{
        console.log(res)
        this.offerLoading = false;
        console.log("缺少字段的返回",res.pager.results);
        this.offerData = res.pager.results;
        this.offer_pageNo = res.pager.pageNo;
        this.offer_pageSize = res.pager.pageSize;
        this.offer_totalPage = res.pager.totalPage;
        this.offer_totalRecord = res.pager.totalRecord;

      });
    },
    clearList(){ //后置资格重置筛选条件
      this.targetNo = "";
      this.params.time = "";
      this.pageNo = 1;
      this.queryData();
    },
    searchList(){ //后置资格条件筛选查询按钮
      this.queryData(); //调用后置资格请求
    },
    setPram(){
      this.$set(this.pram,'page',1);
      this.$set(this.pram,'rows',5);
    },
    offer_searchList(){ //竞价记录条件筛选查询按钮
      this.setPram();
      this.queryDataOffer();
    },
    offer_clearList(){ //竞价记录重置条件筛选查询按钮
        this.setPram();
        this.biddingTime = [];
        this.$set(this.pram,'startTime',"");
        this.$set(this.pram,'endTime',"");
        this.queryDataOffer();
    },
    handleClick(businessId,targetId,row){ //审核页面跳转
      let title = '审核页面';
      let routerPath = '/examine?targetId='+targetId+'&businessId='+row.businessId+'&id='+row.licenseId+'&taskId='+row.taskId+'&procInsId'+row.procInsId+'&procDefId='+row.procDefId;
      let tabObj = {title,routerPath}
      this.setTabsList(tabObj);
      Bus.$emit("toExamine",businessId);
      this.$router.push({path:routerPath,query:{targetId:targetId,businessId:row.businessId,id:row.licenseId,taskId:row.taskId,procInsId:row.procInsId,procDefId:row.procDefId}});
    },
    handleResultClick(row){ //审核结果跳转
      let title = '审核结果';
      let routerPath = '/examineResult?targetId='+row.id+'&id='+row.licenseId+'&procInsId='+row.procInsId;
      let tabObj = {title,routerPath}
      this.setTabsList(tabObj);
      this.$router.push({path:'/examineResult',query:{targetId:row.id,id:row.licenseId,procInsId:row.procInsId}});
    },
    handleCurrentChange(val){ //后置审核表单页码
      this.pageNo = val;
      this.queryData();
    },
    handleSizeChange(val){ //后置审核表单显示条数
      this.pageSize = val;
      this.queryData();
    },
    offerCurrentChange(val){ //竞价记录页码
      this.offer_pageNo = val;

      this.$set(this.pram,'page',val);
      this.$set(this.pram,'rows',this.offer_pageSize);
      this.queryDataOffer();
    },
    offerSizeChange(val){ //竞价记录显示条数
      this.offer_pageSize = val;
      //每页条数改变时触发
      this.offer_pageNo = 1;
      this.$set(this.pram,'page',this.offer_pageNo);
      this.$set(this.pram,'rows',val);
      this.queryDataOffer();
    },
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
.reset {
margin-left: 10px;
border: solid 1px #d3d4d6;
color: #606266;
background-color: #fff;
}

.dialog-footer {
  display: flex;
  justify-content: center;
}
.offerBox{
  width: 100%;
  padding: 15px 25px;
}
.filterBox{
  padding: 20px;
  height: 72px;
  border:1px solid rgb(219, 219, 219);
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
.el-table__body tr td:nth-child(1) .cell {
  text-align: center;
}
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
</style>

