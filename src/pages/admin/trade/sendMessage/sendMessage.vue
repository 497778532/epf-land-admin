<template>
  <div id="sendMessage">
    <div class="sendTop">
      <span style="padding-left:20px;line-height:53px;font-weight:800;color:#666;">短信发送</span>
      <span class="list-style: none;"  v-for="(button ,index)  in buttons" :key="index">
      <div v-if="button.resourceId=='sendMsg_send'" class="button_border" style="float:right;margin-top:9px;" @click="sendInfoData()">发送短信</div>
      <div v-if="button.resourceId=='sendMsg_addman'" class="button_bg" style="float:right;margin-top:9px;" @click="addPeople = true">新增联系人</div>
      <div v-if="button.resourceId=='sendMsg_viewman'" class="button_bg" style="float:right;margin-top:9px;" @click="getPeopleData()">查看联系人</div>
      </span>
    </div>
    <el-table
      ref="multipleTable"
      :data="sendMessageData"
      border
      v-loading="loading"
      element-loading-text="数据加载中"
      element-loading-background="rgba(255, 255, 255,0.95)"
      tooltip-effect="dark"
      class="sendMessageTable"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" align="center" min-width="80">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="标的编号" min-width="130">
        <template slot-scope="scope">
          <span @click="showDetail(scope.row)">{{ scope.row.targetNo }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="endTransTime" label="成交时间" min-width="180"></el-table-column>
      <el-table-column prop="transPrice" label="成交价（万元）" min-width="150"></el-table-column>
      <el-table-column prop="beginPrice" label="起始价（万元）" min-width="150"></el-table-column>
      <el-table-column prop="premiumRate" label="溢价率（%）" min-width="150"></el-table-column>
      <el-table-column prop="numberOfBiddingWheels" label="竞争轮数" min-width="120"></el-table-column>
      <el-table-column prop="winnerId" label="竞得人" min-width="150"></el-table-column>
      <el-table-column prop="transType" label="交易方式" min-width="150">
        <template slot-scope="scope">
          <span v-for="pro in processedData">
            <span v-if="pro.id == scope.row.transType">
              {{pro.name}}
            </span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="交易状态" min-width="130" align="center" fixed="right">
          <template slot-scope="scope">
            <span v-if="scope.row.status != 'trans_status-008'" class="default"></span>
            <span v-if="scope.row.status == 'trans_status-008'" class="success"></span>

            <span>{{scope.row.statusName}}</span>
          </template>
      </el-table-column>
    </el-table>
    <div style="text-align:right;padding:15px 15px;border: 1px solid #ebeff5;">
        <el-pagination
        background
        layout="total,prev, pager, next,sizes,jumper"
        :page-sizes="[5,10, 15, 20]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="totalRecord"
        :current-page="pageNo"
        ></el-pagination>
    </div>

    <!-- 新增联系人 -->
    <el-dialog title="新增联系人" class="companyInfo" width="70%" :visible.sync="addPeople" :append-to-body='true'>
        <div class="companyInfoBox">
            <el-form ref="addPeopleRef" :model="addPeopleForm" :rules="addRules" label-width="120px">
                <el-form-item label="姓名：" prop="name">
                    <el-input v-model="addPeopleForm.name" style="width:380px;" placeholder="请输入姓名" clearable></el-input>
                </el-form-item>
                <el-form-item label="职位：" prop="post" label-width="120px">
                    <el-input v-model="addPeopleForm.post" style="width:380px;" placeholder="请输入职位"></el-input>
                </el-form-item>
                <el-form-item label="电话号码：" prop="tel" label-width="120px">
                    <el-input v-model="addPeopleForm.tel" style="width:380px;" placeholder="请输入电话号码"></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align:center;">
                <div v-show="!subLoading" class="button_bg" style="margin-top:9px;" @click="addPeopleSave('addPeopleRef')">保存</div>
                <div v-show="subLoading" class="button_bg" style="margin-top:9px;"> <i class="el-icon-loading"></i> </div>
            </div>
        </div>
    </el-dialog>

    <!-- 修改联系人 -->
    <el-dialog title="修改联系人" class="companyInfo" width="70%" :visible.sync="changePeople" :append-to-body='true'>
        <div class="companyInfoBox">
            <el-form ref="changePeopleForm" :model="changePeopleForm" :rules="changeRules"  label-width="120px">
                <el-form-item label="姓名：" prop="name">
                    <el-input v-model="changePeopleForm.name" style="width:380px;" placeholder="请输入姓名" clearable></el-input>
                </el-form-item>
                <el-form-item label="职位：" prop="post" label-width="120px">
                    <el-input v-model="changePeopleForm.post" style="width:380px;" placeholder="请输入职位" clearable></el-input>
                </el-form-item>
                <el-form-item label="电话号码：" prop="tel" label-width="120px">
                    <el-input v-model="changePeopleForm.tel" style="width:380px;" placeholder="请输入电话号码" clearable></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align:center;">
                <div v-show="!subLoading" class="button_bg" style="margin-top:9px;" @click="changePeopleSave('changePeopleForm')">保存</div>
                <div v-show="subLoading" class="button_bg" style="margin-top:9px;"> <i class="el-icon-loading"></i> </div>
            </div>
        </div>
    </el-dialog>

    <!-- 查看联系人   top="1%"-->
    <el-dialog title="查看联系人" width="70%"  :visible.sync="lookPeople" :append-to-body='true'>
      <div>
        <div class="sendTop">
          <span style="padding-left:20px;line-height:53px;font-weight:800;color:#666;">全部联系人</span>
          <span class="list-style: none;"  v-for="(button ,index)  in buttons" :key="index">
          <span v-if="button.resourceId=='sendMsg_delete'" class="dellAll" @click="dellAll()">批量删除</span>
          </span>
        </div>
        <el-table
          ref="multipleTable"
          :data="peopleData"
          border
          v-loading="loading"
          element-loading-text="数据加载中"
          element-loading-background="rgba(255, 255, 255,0.95)"
          tooltip-effect="dark"
          class="sendMessageTable"
          style="width: 100%;min-height: 160px;"
          @selection-change="peopleSelectionChange"
          >
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column label="序号" align="center" min-width="80">
              <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column align="center" prop="name" label="联系人" min-width="130"></el-table-column>
          <el-table-column align="center" prop="post" label="职位" min-width="130"></el-table-column>
          <el-table-column align="center" prop="tel" label="电话" min-width="150"></el-table-column>
          <el-table-column label="操作" min-width="90" align="center">
            <template slot-scope="scope">
              <div class="peopleHandle">
                 <span class="list-style: none;"  v-for="(button ,index)  in buttons" :key="index">
                <span v-if="button.resourceId=='sendMsg_edit'" class="editor" @click="editorPeople(scope.row.id)">修改</span>
                <span class="line"></span>
                <span v-if="button.resourceId=='sendMsg_delete'" class="del" @click="delPeople(scope.row.id)">删除</span>
                 </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align:right;padding:15px 15px;">
          <el-pagination
            background
            layout="total,prev, pager, next"
            @current-change="peopleCurrentChange"
            :total="peopleTotalRecord"
            :page-size="peoplePageSize"
            :current-page="peoplePageNo"
            ></el-pagination>
        </div>
      </div>
    </el-dialog>

    <!-- 发送短信 -->
    <el-dialog title="发送短信" width="70%" :visible.sync="sendInfo" :append-to-body='true'>
        <div>
          <div class="sendCheck">
            <span style="padding-left:20px;line-height:53px;font-weight:800;color:#666;">标的信息：</span>
            <el-checkbox-group v-model="sendCheckList" class="sendChecks">
              <el-checkbox label="landName" disabled> <span style="color:red;">*</span> 标的名称</el-checkbox>
              <el-checkbox label="buyTime" disabled> <span style="color:red;">*</span> 成交时间</el-checkbox>
              <el-checkbox label="buyPrice">成交价</el-checkbox>
              <el-checkbox label="outPrice">溢价率</el-checkbox>
              <el-checkbox label="needPrice">指标出价</el-checkbox>
              <el-checkbox label="buyCount" disabled> <span style="color:red;">*</span> 竞争轮数</el-checkbox>
              <el-checkbox label="successMan" disabled> <span style="color:red;">*</span> 竞得人</el-checkbox>
            </el-checkbox-group>
          </div>
          <el-table
            ref="multipleTable"
            :data="sendData"
            border
            v-loading="loading"
            element-loading-text="数据加载中"
            element-loading-background="rgba(255, 255, 255,0.95)"
            tooltip-effect="dark"
            class="sendMessageTable"
            style="width: 100%;min-height: 160px;"
            @selection-change="sendSelectionChange"
          >
            <el-table-column align="center" type="selection" width="55"></el-table-column>
            <el-table-column label="序号" align="center" min-width="80">
                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="联系人" min-width="130"></el-table-column>
            <el-table-column align="center" prop="post" label="职位" min-width="130"></el-table-column>
            <el-table-column align="center" prop="tel" label="电话" min-width="150"></el-table-column>
          </el-table>
          <div style="text-align:right;padding:15px 15px;">
            <el-pagination
            background
            layout="total,prev, pager, next"
            @current-change="sendCurrentChange"
            :total="sendTotalRecord"
            :page-size="sendPageSize"
            :current-page="sendPageNo"
            ></el-pagination>
          </div>
          <div style="text-align:center;">
              <div class="button_default" style="margin-top:9px;">删除</div>
              <div class="button_bg" style="margin-top:9px;" @click="send">确定</div>
          </div>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions,mapState} from "vuex";
import qs from 'qs'
export default {
  data() {
    return {
      sendMessageData: [],
      landSelection: [],
      peopleSelection:[],
      sendSelection:[],
      //分页
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      //弹窗开关
      changePeople:false,
      addPeople:false,
      lookPeople:false,
      sendInfo:false,
      //新增联系人form
      addPeopleForm:{
        name:'',
        post:'',
        tel:'',
      },
      addRules:{
        name:[
          { required: true, message: '请输入姓名', trigger: 'change' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'change' }
        ],
        post:[
          { required: true, message: '请输入职位', trigger: 'change' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'change' }
        ],
        tel:[
          { required: true, message: "请输入电话号码", trigger: "change" },
          { min: 11,max: 11,message: "您输入的电话号码有误",trigger: "change"}
        ],
      },
      changeRules:{
        name:[
          { required: true, message: '请输入姓名', trigger: 'change' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'change' }
        ],
        post:[
          { required: true, message: '请输入职位', trigger: 'change' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'change' }
        ],
        tel:[
          { required: true, message: "请输入电话号码", trigger: "change" },
          { min: 11,max: 11,message: "您输入的电话号码有误",trigger: "change"}
        ],
        processedData:[],   //交易方式集合
      },
      subLoading:false,
      //修改联系人form
      changePeopleForm:{
        name:'',
        post:'',
        tel:'',
      },
      //联系人数据
      peopleData:[],
      sendData:[],
      //联系人数据分页
      peoplePageNo: 1,
      peoplePageSize: 5,
      peopleTotalPage: 1,
      peopleTotalRecord: 1,
      //发送短信弹窗分页
      sendPageNo: 1,
      sendPageSize: 5,
      sendTotalPage: 1,
      sendTotalRecord: 1,
      //发送短信多选列表
      sendCheckList:['landName','buyTime','buyCount','successMan'],
      loading:true,
      //按钮组、主题
      buttons:[],
    };
  },
  created() {
    this.buttons=JSON.parse(localStorage.getItem("sendMessage"));
    this.getLandData();
    this.processedParamsList();
  },
  methods: {
    ...mapActions(['setTabsList']),
    //跳转标的详情页面
    showDetail(item){
        let routerPath,title
        routerPath='landmarkInfoDetail',title='标的详情'
        let tabObj = {title,routerPath}
        this.setTabsList(tabObj)
        this.$router.push({path:routerPath,query:{id:item.id}})
    },
    //发送短信选择标的列表
    getLandData(){
      this.$get('/epf-trade/transtransactionresul/getMessageTransTransactionResulList',{page:this.pageNo,rows:this.pageSize}).then(res=>{
        if(res.code == 0){
          // console.log(res);
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
          this.sendMessageData = res.pager.results;
          // console.log('联系人列表',this.peopleData);
        }else{
          this.$message.error(res.msg)
        }
        this.loading = false
      });
    },
    //联系人列表接口
    getPeopleData(){
      this.loading = true
      this.lookPeople = true
      this.$get('/epf-admin/admin/user/getUserMessageList',{page:this.peoplePageNo,rows:this.peoplePageSize}).then(res=>{
        if(res.code == 0){
          this.peoplePageNo = res.pager.pageNo;
          this.peoplePageSize = res.pager.pageSize;
          this.peopleTotalPage = res.pager.totalPage;
          this.peopleTotalRecord = res.pager.totalRecord;
          this.peopleData = res.pager.results;
          console.log('联系人列表',this.peopleData);
        }else{
          this.$message.error(res.msg)
        }
        this.loading = false
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //选择标的
    handleSelectionChange(val) {
      this.landSelection = val;
      console.log(this.landSelection);
    },
    //
    peopleSelectionChange(val){
      this.peopleSelection = val.map(e=>{return e.id})
      this.peopleSelection = (this.peopleSelection).toString()
    },
    //发送短信弹窗
    sendSelectionChange(val) {
      this.sendSelection = val;
      console.log(this.sendSelection);
    },
    // 分页
    handleSizeChange(val) {
      //每页条数改变时触发

    },
    handleCurrentChange(val) {
      //获取当前页

    },
    //联系人数据分页
    peopleCurrentChange(val){
      this.peoplePageNo = val;
      this.getPeopleData()
    },
    //发送短信改变页码
    sendCurrentChange(val){
      this.sendPageNo = val;
      this.sendInfoData()
    },
    //修改弹窗
    editorPeople(id){
      this.changePeople = true
      this.$get('/epf-admin/admin/user/getUserMessage',{id:id}).then(res=>{
        if(res.code == 0){
          this.changePeopleForm.id = res.sysUserMessage.id
          this.changePeopleForm.name = res.sysUserMessage.name
          this.changePeopleForm.post = res.sysUserMessage.post
          this.changePeopleForm.tel = res.sysUserMessage.tel
        }else{
          this.$message.error(res.msg)
        }
      });
    },
    //确定发送短信
    send(){
      this.$message.success('短信发送成功');
      this.sendInfo = false;
    },
    //新增联系人
    addPeopleSave(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.subLoading = true;
          console.log('新增',this.addPeopleForm);
          this.$post('/epf-admin/admin/user/addUserMessage',this.addPeopleForm).then(res=>{
            if(res.code == 0){
              this.$message.success('保存成功')
              this.addPeople = false;
              this.$refs[formName].resetFields();
            }else{
              this.$message.error(res.msg)
            }
            this.subLoading = false;
          });
        } else {
          return false;
        }
      });
    },
    //修改联系人
    changePeopleSave(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.subLoading = true;
          this.$post('/epf-admin/admin/user/editUserMessage',this.changePeopleForm).then(res=>{
            if(res.code == 0){
              this.$message.success('保存成功')
              this.changePeople = false;
              this.$refs[formName].resetFields();
              this.getPeopleData();
            }else{
              this.$message.error(res.msg)
            }
            this.subLoading = false;
          });
        } else {
          return false;
        }
      });
    },
    //发送短信中联系人数据
    sendInfoData(){
      this.loading = true
      this.sendInfo = true
      this.$get('/epf-admin/admin/user/getUserMessageList',{page:this.sendPageNo,rows:this.sendPageSize}).then(res=>{
        if(res.code == 0){
          this.sendPageNo = res.pager.pageNo;
          this.sendPageSize = res.pager.pageSize;
          this.sendTotalPage = res.pager.totalPage;
          this.sendTotalRecord = res.pager.totalRecord;
          this.sendData = res.pager.results;
          console.log('联系人列表',this.peopleData);
        }else{
          this.$message.error(res.msg)
        }
        this.loading = false
      });
    },
    dellAll(){
      this.delPeople(this.peopleSelection)
    },
    delPeople(id){
      this.$post('/epf-admin/admin/user/deleteUserMessage',{id:id}).then(res=>{
        if(res.code == 0){
          this.$message.success("删除成功");
          this.getPeopleData()
        }else{
          this.$message.error(res.msg)
        }
        this.loading = false
      });
    },
    //交易方式页面显示
    processedParamsList () {
      //调用接口查询交易方式接口数据
      this.$get('/epf-tradeengine/transtransactiontype/getTransTransactionTypeJson', {
        page: 1,
        rows: 10000
      }).then(res => {
        // res 是返回结果
        if (res.code != 0) {
          this.$message.error(res.msg)
          return
        }
        //设置下拉框的数据
        this.processedData = res.pager.results
      })
    },
  }
};
</script>

<style lang="scss" scoped>
#sendMessage {
  padding: 30px 25px;
  height: 100%;
}

.sendTop span.dellAll {
  width: 80px;
  height: 32px;
  background-color: #ffa000;
  border-radius: 4px;
  margin-top: 10px;
  margin-right: 16px;
  text-align: center;
  line-height: 36px;
  color: #fff;
  font-size: 14px;
  float:right;
  cursor: pointer;
}
.sendTop {
  width: 100%;
  height: 55px;
  border: 1px solid #ebeff5;
  background: #f5f8fa;
}
.sendCheck{
  width: 100%;
  height: 55px;
  border: 1px solid #ebeff5;
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.companyInfoBox{
  padding-top: 20px;
}
.peopleHandle{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.peopleHandle span{
  transition: .2s;
}
.peopleHandle .editor{
  color: #4671d5;
  cursor: pointer;
}
.peopleHandle .line{
  display: inline-block;
  width: 1px;
  height: 23px;
  background: rgb(226, 226, 226);
}
.peopleHandle .del:hover{
  color: #ff0000a4;
  cursor: pointer;
}
</style>
<style>
.sendMessageTable .el-table__header thead th{
  background: #f5f8fa;
}
.sendChecks .el-checkbox.is-checked .el-checkbox__label{
  color: #ffa000;
}
</style>
