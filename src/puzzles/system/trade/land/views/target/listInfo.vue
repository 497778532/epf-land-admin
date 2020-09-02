<template>
  <epf-container title="标的信息">
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
            <el-col :span="1">
              <span class="filter_title">状态 :</span>
            </el-col>
            <el-col :span="3">
              <selectInput v-model="params.status" :default="params.status" groupCode="trans_status" placeholder="请选择状态"></selectInput>
            </el-col>
            <el-col :span="2">
              <span class="filter_title">交易中心 :</span>
            </el-col>
            <el-col :span="3">
              <el-select v-model="params.tradingCenter" size="small" placeholder="请选择">
                <el-option v-for="item in orgs" :label="item.orgName" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="2">
              <span class="filter_title">经办人 :</span>
            </el-col>
            <el-col :span="3">
              <el-select v-model="params.insertUser" size="small" placeholder="请选择">
                <el-option v-for="item in users" :label="item.realname" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              <div class="button_bg" @click="searchList()">查询</div>
              <div class="button_default" @click="clearList()">重置</div>
            </el-col>
          </el-row>
        </div>
        <el-tabs style="margin-top:35px;">
          <div class="toolsTitleBox">
            <span class="toolsTitle">标的信息</span>
            <div class="oper">
              <span class="list-style: none;"  v-for="(button ,index)  in buttons" :key="index">
              <span v-if="button.resourceId=='landmark_add'" class="btn" @click="handleAdd()">新增</span>
              <span v-if="button.resourceId=='landmark_delete'" class="btn" @click="handDelAll()">批量删除</span>
              </span>
            </div>
          </div>
          <el-table
            ref="multipleTable"
            :data="transTargetData"
            v-loading="loading"
            element-loading-text="数据加载中"
            element-loading-background="rgba(255, 255, 255,0.95)"
            style="width: 100%;min-height:80px;"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="targetNo" label="标的编号" width="170"></el-table-column>
            <el-table-column prop="beginPrice" label="起始价(万元)" width="170"></el-table-column>
            <el-table-column prop="amount" label="保证金" width="170"></el-table-column>
            <el-table-column label="状态" width="180">
              <template slot-scope="scope">
                <span :class="((scope.row.status!=='results_public')&&(scope.row.status!=='under_review')&&(scope.row.status!=='no_announcement'))?'success':'default'"></span>
                <span>{{scope.row.statusName}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="tradingCenter" label="交易中心"></el-table-column>
            <el-table-column prop="insertUser" label="经办人" width="160"></el-table-column>
            <el-table-column prop="insertTime" label="创建时间" width="240"></el-table-column>
            <el-table-column label="操作" width="250">
              <template slot-scope="scope">
                <span class="list-style: none;"  v-for="(button ,index)  in buttons" :key="index">
                <el-button
                  type="text"
                  size="small"
                  @click="handleClick(scope.row,'admend')"
                  v-if="scope.row.status==='trans_status-001' && button.resourceId=='landmark_edit'">修改</el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="handleDelete(scope.$index, scope.row)"
                  v-if="scope.row.status==='trans_status-001' && button.resourceId=='landmark_delete'"
                  style="color: #999999;"
                >删除</el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="handleClick(scope.row,'detail')"
                v-if="(scope.row.status!=='trans_status-001')&&(scope.row.status!=='trans_status-007')&&(scope.row.status!=='trans_status-008')&& button.resourceId=='landmark_view'"
                >查看详情</el-button>
                <el-button
                  type="text"
                  size="small"
                  v-if="(scope.row.status==='trans_status-006')&&(scope.row.isFlowPatting===2)&& button.resourceId=='landmark_view'"
                >
                  <el-popover placement="bottom" width="450" trigger="click">
                    <el-container>
                      <el-header style="height:40px;">
                        <div class="headerpop">查看流拍原因</div>
                      </el-header>
                      <el-container style="border-top:1px solid rgb(243,243,243); padding:20px;">
                        <el-aside width="70px" style="color:rgb(254,63,68);">流拍原因：</el-aside>
                        <el-main>{{scope.row.flowPattingReason}}</el-main>
                      </el-container>
                    </el-container>
                    <el-button slot="reference" type="text" size="small">查看流拍原因</el-button>
                  </el-popover>
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="AddFlowpatreason(scope.row)"
                  v-if="(scope.row.status==='trans_status-006')&&(scope.row.isFlowPatting===1)&& button.resourceId=='landmark_addrsn'"
                >添加流拍原因</el-button>

                <el-button
                  type="text"
                  size="small"
                  @click="handleClick(scope.row,'dealresult')"
                  v-if="((scope.row.status==='trans_status-007')||(scope.row.status==='trans_status-008'))&& button.resourceId=='landmark_traderst'"
                >成交结果</el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="handleClick(scope.row,'publicityRelease')"
                  v-if="scope.row.status==='trans_status-007'&& button.resourceId=='landmark_public'"
                >公示发布</el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="handleClick(scope.row,'publicityDetails')"
                  v-if="scope.row.status==='trans_status-008'&& button.resourceId=='landmark_info'"
                >公示详情</el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="handleClick(scope.row,'bidding')"
                  v-if="((scope.row.status==='trans_status-008')||(scope.row.status==='trans_status-007'))&& button.resourceId=='landmark_jingjia'"
                >竞买记录</el-button>
                </span>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align:right;margin:22px 0px;">
            <el-pagination
              background
              layout="total,prev, pager, next,sizes,jumper"
              :page-sizes="[5,10,15,20]"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :total="totalRecord"
              :current-page="currentPage"
              :page-size="pageSize"
            ></el-pagination>
          </div>
        </el-tabs>
      </div>
      <!-- 弹框 -->
      <div>
        <el-dialog title="添加流拍原因" :visible.sync="dialogFormVisible">
          <el-form :model="flowpatreasonData">
            <el-form-item label="标的编号" :label-width="formLabelWidth">
              <el-input
                v-model="flowpatreasonData.landNo"
                autocomplete="off"
                disabled
                style="width:500px;"
              ></el-input>
            </el-form-item>
            <el-form-item label="流拍原因" :label-width="formLabelWidth">
              <el-input
                style="width:500px;height:120px;"
                type="textarea"
                :rows="4"
                placeholder="请输入流拍原因，50字内"
                maxlength="50"
                minlength="0"
                show-word-limit
                autosize
                v-model="flowpatreasonData.textarea"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveReason">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </epf-container>
</template>
<script>
import selectInput from '@/components/selectInpt/selectInpt';
export default {
  name: "listInfo",
  components: {selectInput},
  data() {
    return {
      ids:'',
      params: { //搜索表单-查询条件
        targetNo: "", //标的编号
        status: "", //状态
        tradingCenter: "", //交易中心
        insertUser: "" //经办人
      },
      targetNo: '',
      //状态列表
      statusList: [],
      //交易中心列表
      tradingCenterList: [],
      //经办人列表
      insertUserList: [],
      //标的列表
      transTargetData: [
        {
          targetNo:'',
          beginPrice:'',
          amount:'',
          statusName:'',
          tradingCenter:'',
          insertUser:'',
          insertTime:'',
          status:''
        }
      ],
      //页码
      currentPage: 1,
      pageNo: 1, //页码
      pageSize: 5, //每页条数
      totalPage: 1,
      totalRecord: 1,
      //标的删除接口参数id字符组
      transTargetsIds: "",

      txtVal: '',
      flowpatreasonData: {
        landNo: "",
        textarea: ""
      },
      formLabelWidth: "120px",
      dialogFormVisible: false,
      textarea: "",
      visible2: false,
      tableDataTitle: [
        { prop: "landNo", title: "标的编号" },
        { prop: "startPrice", title: "起始价(万元)" },
        { prop: "bondPrice", title: "保证金(万元)" },
        { prop: "landState", title: "地块状态" },
        { prop: "tradingCenter ", title: "交易中心" },
        { prop: "chargePer", title: "经办人" },
        { prop: "createTime", title: "创建时间" }
      ],

      multipleSelection: [],
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

      tableData1: [],

      form: {
        assessor: "",
        opinion: ""
      },

      dicRequest:['trans_status'],//字典码请求
      dictionary:{//字典码结果
        trans_status:"",
      },
      dicNum:0,//字典循环下标
      loading:true,
      orgs:[],
      users:[],
      userId: '',
      //按钮组、主题
      buttons:[],
      currentObjId: ""
    };
  },
  watch:{
    $route: 'getTransTargetList'
  },
  mounted() {
    this.getOrgs(); //机构下拉选择
    this.getUsers(); //审批用户下拉选择
    this.getTransTargetList();//调用标的列表请求
    this.$bus.$on('landMarkSave',(val)=>{
      this.getTransTargetList();
    });
  },
  methods: {
    //获取标的列表
    getTransTargetList() {
      this.loading = true;
      let param = this.params;
      param['insertUser'] = '';
      param['page'] = this.pageNo; //页码
      param['rows'] = this.pageSize; //每页条数
      param.targetNo = encodeURIComponent(this.targetNo);
      this.$get(this.$API.EPF_TRADE.TARGET.TARGET_LIST,param).then(res=>{
        if (res.code == "0") {
          console.log('标的列表返回：',res)
          this.transTargetData = res.pager.results;
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
          this.loading = false;
        } else {
          this.loading = false;
          this.$message.error(res.msg); //失败
          return;
        }
        this.params['insertUser'] = '';
        
      });
    },
    getOrgs(){
      // 获取交易中心机构
      this.$get(`/epf-trade/admin/transtarget/getCurrentUserOrgs`, {}).then(
        res => {
          if (res.code == 0) {
            this.orgs = res.orgs;
          }
        }
      );
    },
    getUsers(){
      // 获取交易中心的审批人员
      this.$get(`/epf-admin/admin/user/getUsersByCurrentOrRole`, {}).then(
        res => {
          if (res.code == 0) {
            this.users = res.list;
            console.log('返回当前审批用户', this.users)
            // this.authViewDatas(res.list);
          }
        }
      );
    },
    authViewDatas(users){
      let i = users.length - 1;
      let user = [];
      user.push(users[i]);
      users.splice(i, 1);
      console.log('user',user)
      console.log('users',users)
      if(users.length == 0){
        this.userId = ''; //当前登录用户
      }else{
        let flag = user.every(val => users.includes(val));
        console.log('flag',flag)
        if(!flag){
          this.userId = ''; //当前登录用户
        }
      }
    },

    //清除筛选条件
    clearList() {
      this.targetNo = "";
      this.params.status = "";
      this.params.tradingCenter = "";
      this.params.insertUser = "";
      this.getTransTargetList();
    },
    //搜索
    searchList() {
      this.getTransTargetList();
    },
    // 单量删除
    handleDelete(index, row) {
      let that = this;
      let url = this.$API.EPF_TRADE.TARGET.TARGET_DELETE;
      let datas = { transTargetsIds: row.id, mode: 'logic' };
      if (confirm("确定要删除吗")) {
        this.$post(url, datas).then(res => {
            if (res.code === 0) {
              that.$message.warning(res.msg);
              that.getTransTargetList();
            } else {
              that.$message.warning(res.msg);
            }
          })
          .catch(res => {
            that.$message.warning(res.msg);
          });
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
      return ids
    },

    // 多项删除
    handDelAll() {
      let that = this;
      if(this.ids==""){
          this.$message({
              type: "info",
              message: "请选择标的信息！"
            });
         return;
      }
      let url = this.$API.EPF_TRADE.TARGET.TARGET_DELETE;
      let datas = { transTargetsIds: this.ids, mode: 'logic' };
      this.$confirm("确认删除该标的信息，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.$post(url, datas).then(res => {
            if (res.code === 0) {
              let result =res.result;
              if(result.code==0){
                that.$message.warning(result.msg);
                that.getTransTargetList();
              }else{
                that.$message.warning(result.msg);
              }
            } else {
              that.$message.warning(res.msg);
            }
          })
          .catch(res => {
            that.$message.warning(res.msg);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //标的新增
    handleAdd() {
      let routerPath = "/system/trade/land/views/target/add";
      let title = "新增标的";
      let itemObj = {url:routerPath,menuname:title}
      this.$router.push({ path: routerPath });
      this.$store.commit("ADD_TAB", itemObj)
    },
    //添加流拍原因
    AddFlowpatreason(item) {
      this.flowpatreasonData.textarea = "";
      this.flowpatreasonData.landNo = item.targetNo;
      this.currentObjId = item.id;
      this.dialogFormVisible = true;
    },
    // 保存流拍原因--确定
    saveReason(){
      this.$post(this.$API.EPF_TRADE.TARGET.TARGET_ABORT_ADD, {targetId: this.currentObjId, context: this.flowpatreasonData.textarea}).then(res => {
        if (res.code != "0") {
          this.$message.error(res.msg); //失败
          return;
        }
        this.dialogFormVisible = false;
        this.$message.success("添加成功");
        this.getTransTargetList();
      });
    },
    handleSelectionChange(val) {
        this.ids=this.getIDs(val)
        this.multipleSelection = val;
    },
    //修改
    handleClick(item,oper) {
      var routerPath,title
      if(oper==="admend"){routerPath='/system/trade/land/views/target/edit',title='标的修改'}
      if(oper==="detail"){routerPath='/system/trade/land/views/target/detail',title='标的详情'}
      if(oper==="dealresult"){routerPath='/system/trade/land/views/target/result',title='成交结果'}
      if(oper==="publicityRelease"){routerPath='/system/trade/land/views/publicity/release',title='公示发布'}
      if(oper==="publicityDetails"){routerPath='/system/trade/land/views/publicity/detail',title='公示详情'}
      if(oper==="bidding"){routerPath='/system/trade/land/views/target/priceLog',title='竞价记录'}
      let itemObj = {url:routerPath,menuname:title}
      this.$router.push({ path: routerPath, query:{id:item.id,annexId:item.fileTemplateCode}});
      this.$store.commit("ADD_TAB", itemObj)
    },
    handleSizeChange(val) {
      //每页条数改变时触发
      this.pageNo = 1;
      this.pageSize = val; //显示条数改变
      this.getTransTargetList();
    },
    handleCurrentChange(val) {
      //当前页发生改变时触发
      this.pageNo = val; //页码改变
      this.getTransTargetList();
    }
  },
  created() {
    this.buttons=JSON.parse(localStorage.getItem("landmarkInfo"));
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        this.$get(
          `/epf-trade/dictionaries/getDictEbyDictGroup/${item}`,
          {}
        ).then(res => {
          resolve(res);
        });
      });
      return reqFun;
    });
    Promise.all(reqArr).then(res => {
      // console.log(res);
      let dicArr = res.map(item => {
        // console.log(item);
        let dicArr = item.dictionariesList.map(item => {
          return {
            dictKey: item.dictKey,
            zhCn: item.zhCn,
            id: item.id
          };
        });
        return dicArr;
      });
      // console.log(dicArr);
      for (let item in this.dictionary) {
        // console.log(this.dicNum);
        this.dictionary[item] = dicArr[this.dicNum];
        // console.log(dicArr[this.dicNum])
        this.dicNum++;
      }

      this.dicFinsh = true;
      // console.log("字典结果", this.dictionary);
    });
  }
};
</script>
<style scoped>
.oper {
  float: right;
  font-weight: normal;
}
.oper .btn {
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
.oper btn:nth-child(2) {
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
/* .el-table th,
.el-table tr {
  border:1px solid #ebeef5;
} */
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
</style>
