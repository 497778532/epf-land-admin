<template>
  <div class="page-body">
    <div class="filter_wrap">
      <!-- 搜索 -->
      <div class="switchHeight_box">
        <el-row :gutter="2">
            <el-col :span="2">
            <span class="filter_title">消息标题:</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="searchInfo.title" placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="2">
            <span class="filter_title">发送人:</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="searchInfo.user" placeholder="请输入"></el-input>
          </el-col> 
          <el-col :span="2">
            <span class="filter_title">发送时间：</span>
          </el-col>
          <el-col :span="5">
            <el-date-picker
              v-model="searchInfo.selectDate"
              style="width:100%;"
              type="daterange"
              size="small"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="dateChange"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-col>
           <el-col :span="6" :offset="1">
            <div class="btnBox">
              <div class="button_border" @click="searchData" style="margin:0;">查询</div>
              <div class="button_default" @click="resetFilter">重置</div>
              <div class="button_bg" @click="add">发信息</div>
            </div>
          </el-col>                                    
        </el-row>
        
      </div>

      <el-table
              :data="tableData"
              style="width: 100%"
              border
              v-loading="loading"
              element-loading-text="数据加载中"
              element-loading-background="rgba(255, 255, 255,0.95)">

        <el-table-column label="信息标题" min-width="180">
              <template slot-scope="scope">
                  <el-tag hit  size="medium">{{ scope.row.title }}</el-tag>
              </template>
          </el-table-column>
         
          <el-table-column label="信息内容" min-width="180">
              <template slot-scope="scope">
                  <el-tag hit  size="medium">{{ scope.row.content }}</el-tag>
              </template>
          </el-table-column>
        
        
          <el-table-column label="创建人" min-width="100">
              <template slot-scope="scope">
                  <el-tag hit  size="medium">{{ scope.row.createrId }}</el-tag>
              </template>
          </el-table-column>
        
        
          <el-table-column label="创建日期" min-width="150">
              <template slot-scope="scope">
                  <el-tag hit  size="medium">{{ scope.row.createDate }}</el-tag>
              </template>
          </el-table-column>
        
          <el-table-column label="发出时间" min-width="150">
              <template slot-scope="scope">
                  <el-tag hit  size="medium">{{ scope.row.sendTime }}</el-tag>
              </template>
          </el-table-column>
          
          <el-table-column label="信息状态" min-width="100">
              <template slot-scope="scope">
                  <el-tag hit  size="medium">{{ scope.row.status }}</el-tag>
              </template>
          </el-table-column>
        

        <el-table-column label="操作" align="center"  min-width="180">
          <template slot-scope="scope">
              <!----------------- 编辑 ----------------->
              <el-button size="mini" type="primary" plain  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <!----------------- 删除 ----------------->
           <el-popover
                    :ref="`popover2-${scope.$index}`"
                    placement="top"
                    width="170"
                    trigger="click">
              <p style="font-size:14px;text-align:center;font-weight:800;">确定要删除该信息吗?</p>
              <div style="text-align:center;margin-top:10px;">
                <el-button size="mini" type="info" plain @click="scope._self.$refs[`popover2-${scope.$index}`].doClose()">取消</el-button>
                <el-button size="mini" type="danger" @click="delOneData(scope.$index, scope.row)">确定</el-button>
              </div>
              <el-button slot="reference" size="mini" plain type="danger">删除</el-button>
            </el-popover>
          </template>

        </el-table-column>
      </el-table>
        <!-- 分页控件 -->
          <div style="text-align:right;margin:8px 0px;margin-top:15px;">
            <el-pagination
                    background
                    layout="prev, pager, next,sizes,jumper"
                    :page-sizes="[5,10, 15, 20]"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :total="totalRecord"
                    :page-size="pageSize"
                    :current-page="pageNo">
            </el-pagination>
          </div>

    </div>

    <!-- 新增弹窗 -->
    <el-dialog title="发送消息" class="companyInfo" :close-on-click-modal="false" width="700px" :visible.sync="addPopup" :append-to-body='true'>

      <div class="middleBox">
        <el-form :model="msgMessage" :rules="rules" ref="msgMessage" label-width="120px" label-position="left" size="small">
        <el-form-item label="标题" prop="title">
            <el-input  v-model="msgMessage.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="发送对象" prop="sendtype">
           <el-select v-model="msgMessage.sendtype" placeholder="请选择">
                <el-option  label="全部"   value="0"></el-option>
                <el-option  label="个人用户"   value="1"></el-option>
                <el-option  label="企业用户"   value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
            <el-input type="textarea" rows=8  v-model="msgMessage.content" clearable></el-input>
        </el-form-item>
    
        </el-form>
      </div>

      <div class="middleBox_btn" style="text-align:center;">
        <div class="button_default" @click="addPopup = false">取消</div>
        <div class="button_bg" @click="addData('msgMessage')">确认</div>
      </div>

    </el-dialog>
    <!-- 编辑弹窗 -->
    <el-dialog title="编辑" class="companyInfo" width="700px" :visible.sync="editorPopup" :append-to-body='true'>
      <div class="middleBox">
        <el-form :model="msgMessage"  ref="msgMessage" label-width="100px" size="small">
           <el-form-item label="标题" prop="title">
            <el-input  v-model="msgMessage.title" readonly></el-input>
        </el-form-item>
        
        <el-form-item label="内容" prop="content" >
            <el-input type="textarea" rows=8  v-model="msgMessage.content" readonly></el-input>
        </el-form-item>
        </el-form>
      </div>
     
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'
import selectInput from '@/components/common/form/selectInpt'
  export default {
    name:'msgmessage',
    components:{selectInput},
    data() {
      return {
        landRes:'',
        useRes:'',
        filterData:{},
        //  表格数据
        tableData: [],
        //  编辑 表单验证
        rules: {
                            
            title: [
                { required: true, message: "标题不能为空！",trigger: 'blur' }
            ],
            sendtype: [
                { required: true, message: "请选择发送对象！",trigger: 'blur' }
            ],
            content: [
                { required: true, message: "发送内容不能为空",trigger: 'blur' }
            ]
              
    },
      pageNo:1,// 当前页
      pageSize:5,// 当前每页条数
      totalPage:1,// 总页数
      totalRecord:1,// 总条数，
      addPopup:false,//  控制新增弹窗
      editorPopup:false,//  控制编辑弹窗
      currentEditorIndex:0,//  当前选中编辑的下表
      loading:true, //控制loading动画显示隐藏
      msgMessage:{},
      searchInfo:{
      },
    }
    },
    created() {
      this.searchInfo['page'] = this.pageNo;
      this.searchInfo['rows'] = this.pageSize;
      this.getList();
    },
    methods: {
        handleEdit(index, row) {
            this.currentEditorIndex = index
            var id = row.id;
            this.getObject(id);
            //显示编辑层
            this.editorPopup = true
        },
        dateChange(val){
            if(val){
                this.searchInfo.startTime = val[0];
                this.searchInfo.endTime = val[1];

            }
        },
        pickerOptions:{
          disabledDate(time) {
            let curDate = (new Date()).getTime();
            let three = 30 * 24 * 3600 * 1000;
            let threeMonths = curDate - three;
            // return time.getTime() > Date.now() || time.getTime() < threeMonths;
            return time.getTime() > Date.now();
          }
        },
      //新增按钮点击事件
      add(){
        this.addPopup = true
        this.msgMessage = {};
      },
      //  新增 确定 点击事件
      addData(msgMessage){
          var that = this;
          this.$refs.msgMessage.validate((valid) => {
            if (valid) {
                //调用添加接口传输数据
                that.$post('/epf-admin/admin/msgmessage/addMsgMessage',{title:that.msgMessage.title,sendtype:that.msgMessage.sendtype,content:that.msgMessage.content}).then(res => {
                    if(res.code != '0'){
                        that.$message.error(res.msg);//失败
                        return
                    }
                    //结束
                    this.addPopup = false;
                    this.$refs.msgMessage.resetFields();
                    this.$message.success('成功发送消息!')
                });
            } else {
                return false;
            }
        });
    },
//  查询 点击事件
searchData(){
    var that = this;
    that.getList();
},
//  重置 点击事件
resetFilter(){
   
    var that = this;
    that.searchInfo = {};
    that.getList();
},

//  编辑  提交
editorSubmit(msgMessage) {
    var that = this;
    this.$refs.msgMessage.validate((valid) => {
        if (valid) {
            //调用修改接口传输数据
                that.$post('/epf-admin/admin/msgmessage/editMsgMessage',qs.stringify(that.msgMessage)).then(res => {
                if(res.code != '0'){
                    that.$message.error(res.msg);//失败
                    return
                }
                //结束
                this.editorPopup = false
                this.$refs.msgMessage.resetFields();
                this.$message.success('修改成功!');
                this.getList();
            });
        } else {
            return false;
        }
    });
},
//  确定 删除 点击事件
delOneData(index, row) {
    var that = this;
    //调用添加接口传输数据
    that.$post('/epf-admin/admin/msgmessage/deleteMsgMessage',qs.stringify({id:row.id})).then(res => {
    if(res.code != '0'){
        that.$message.error(res.msg);//失败
        return
    }
    //结束
    this.$message.success('删除成功!');
    //  关闭删除提示框
    
    this.getList();
});
},
//  每页条数改变时触发
handleSizeChange(val){
    this.pageSize = val;
    this.searchInfo["page"] = this.pageNo;
    this.searchInfo["rows"] = val;
    this.getList();
},
//  翻页时触发
handleCurrentChange(val){
//获取当前页
    this.searchInfo["page"] = val;
    this.pageNo =  val;
    this.searchInfo["rows"] = this.pageSize;
    this.getList();
},
getList(){
    let that=this;
    this.searchInfo["messageType"]="0"
    this.searchInfo["page"] = this.pageNo;
    this.searchInfo["rows"] = this.pageSize;
    that.$post('/epf-admin/admin/msgmessage/getMsgMessagelist',this.searchInfo).then(res => {
        if(res.code != '0'){
            that.$message.error(res.msg);//失败
            return
        }
        //返回的数据
        that.tableData = res.pager.results;
        //数据条数
        that.totalRecord=res.pager.totalRecord;
        //总页数
        that.totalPage=res.pager.totalPage;
        //隐藏进度条
        this.loading = false;
    });
},
getObject(id){
    var that = this;
    //调用添加接口传输数据
    that.$post('/epf-admin/admin/msgmessage/getMsgMessage',{id:id}).then(res => {
        if(res.code != '0'){
            that.$message.error(res.msg);//失败
            return
        }
        //结束
        this.msgMessage = {};
        this.msgMessage = res.msgMessage;
    });
}
}
}
</script>

<style scoped>
.filter_title{
display: inline-block;
box-sizing:border-box;
width: 100%;
height: 34px;
padding-right: 10px;
text-align: right;
line-height: 34px;
}
.btnBox{
display: flex;
flex-direction: row;
justify-content: flex-start;
}
.companyInfoBox{
padding: 30px 30px;
max-height: 600px;
overflow-y: auto;
}
.titleFont{
text-align:center;
font-size:20px;
font-weight:800;
}
.middleBox{
width:85%;
margin:30px auto;
margin-top:10px
}
.middleBox_btn{
width:85%;
margin:30px auto;
margin-bottom:0;
}
.btnInfo{
margin-top:20px;
text-align:right;
font-size:16px;
letter-spacing:3px;
}
</style>
<style>
.filter_wrap .el-col .filterIpt.el-input--small .el-input__inner{
height:34px;
}
</style>
