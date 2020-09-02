<template>
  <div class="page-body">
    <div class="filter_wrap">
      <!-- 搜索 -->
      <div class="switchHeight_box">
        <el-row :gutter="2">
                                                                                
        </el-row>
        <el-row style="margin-top:10px;margin-bottom:10px;">
          <el-col :span="6" :offset="1">
            <div class="btnBox">
              <div class="button_bg" @click="add" style="margin:0;">发短信</div>
              <div class="button_border" @click="searchData">查询</div>
              <div class="button_default" @click="resetFilter" style="margin:0;">重置</div>
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
          
          <el-table-column label="信息内容" min-width="180">
              <template slot-scope="scope">
                  <el-tag hit  size="medium">{{ scope.row.content }}</el-tag>
              </template>
          </el-table-column>
        
          <el-table-column label="创建日期" min-width="180">
              <template slot-scope="scope">
                  <el-tag hit  size="medium">{{ scope.row.createDate }}</el-tag>
              </template>
          </el-table-column>
        
          <el-table-column label="备注" min-width="180">
              <template slot-scope="scope">
                  <el-tag hit  size="medium">{{ scope.row.remark }}</el-tag>
              </template>
          </el-table-column>
        
        
          <el-table-column label="发送电话号码" min-width="180">
              <template slot-scope="scope">
                  <el-tag hit  size="medium">{{ scope.row.phoneNo }}</el-tag>
              </template>
          </el-table-column>
        
        
          <el-table-column label="发出时间" min-width="180">
              <template slot-scope="scope">
                  <el-tag hit  size="medium">{{ scope.row.sendTime }}</el-tag>
              </template>
          </el-table-column>
        
        
        
          <el-table-column label="信息标题" min-width="180">
              <template slot-scope="scope">
                  <el-tag hit  size="medium">{{ scope.row.title }}</el-tag>
              </template>
          </el-table-column>
        
          <el-table-column label="信息状态" min-width="180">
              <template slot-scope="scope">
                  <el-tag hit  size="medium">{{ scope.row.status }}</el-tag>
              </template>
          </el-table-column>
        
        
          <el-table-column label="创建人名字" min-width="180">
              <template slot-scope="scope">
                  <el-tag hit  size="medium">{{ scope.row.createrName }}</el-tag>
              </template>
          </el-table-column>
        

        <el-table-column label="操作" align="center" >
          <template slot-scope="scope">

            <el-button size="mini" type="primary" plain  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

          
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
    <el-dialog title="新增" class="companyInfo" width="900px" :visible.sync="addPopup" :append-to-body='true'  :close-on-click-modal="false">

      <div class="middleBox">
        <el-form :model="msgMessage" :rules="rules" ref="msgMessage" label-width="80px" label-position="left" size="small">

    
        <el-form-item label="信息类别" prop="messageType">
            <el-input v-model="msgMessage.messageType" clearable></el-input>
        </el-form-item>
    
        <el-form-item label="信息内容" prop="content">
            <el-input v-model="msgMessage.content" clearable></el-input>
        </el-form-item>
    
        <el-form-item label="备注" prop="remark">
            <el-input v-model="msgMessage.remark" clearable></el-input>
        </el-form-item>
    
    
        <el-form-item label="发送电话号码" prop="phoneNo">
            <el-input v-model="msgMessage.phoneNo" clearable></el-input>
        </el-form-item>
    
        </el-form>
      </div>

      <div class="middleBox_btn" style="text-align:center;">
        <div class="button_default" @click="addPopup = false">取消</div>
        <div class="button_bg" @click="addData('msgMessage')">确认</div>
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
                            
          messageType: [
                { required: true, message: "信息类别：0系统信息，1业务信息，2短信信息，3邮件信息，4反馈信息，5其他信息不能为空",trigger: 'blur' }
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
          filters:{}
      },
    }
    },
    created() {
      this.searchInfo['page'] = this.pageNo;
      this.searchInfo['rows'] = this.pageSize;
      this.getList();
    },
    methods: {
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
                that.$post('/epf-admin/admin/msgmessage/addMsgMessage',qs.stringify(that.msgMessage)).then(res => {
                    if(res.code != '0'){
                        that.$message.error(res.msg);//失败
                        return
                    }
                    //结束
                    this.addPopup = false;
                    this.$refs.msgMessage.resetFields();
                    this.$message.success('成功新增一条数据!')
                    this.getList();
                });
            } else {
                return false;
            }
        });
    },
//  查询 点击事件
searchData(){
    var that = this;
    var json = {};

    //把json对象转为json字符串
    var filters = JSON.stringify(json);
    //插入搜索条件
    that.searchInfo['filterData'] = filters;
    that.getList();
},
//  重置 点击事件
resetFilter(){
    this.filterData = {};
    var that = this;
    var json = {};
    var filters = JSON.stringify(json);
    that.searchInfo['filterData'] = filters;
    that.getList();
},
//  编辑 点击事件
handleEdit(index, row) {
    this.currentEditorIndex = index
    var id = row.id;
    this.getObject(id);
    //显示编辑层
    this.editorPopup = true
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
    this.searchInfo["messageType"]="2"
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
    that.$post('/epf-admin/admin/msgmessage/getMsgMessage',qs.stringify({id:id})).then(res => {
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
width:95%;
margin:30px auto;
margin-top:10px
}
.middleBox_btn{
width:95%;
margin:15px auto;
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
