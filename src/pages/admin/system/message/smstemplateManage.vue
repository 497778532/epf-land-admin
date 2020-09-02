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
              <div class="button_bg" @click="add" style="margin:0;">新增</div>
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


        
          <el-table-column fixed label="模板编号" min-width="180">
              <template slot-scope="scope">
                  <el-tag hit  size="medium">{{ scope.row.code }}</el-tag>
              </template>
          </el-table-column>
        
        
          <el-table-column label="模板名称" min-width="180">
              <template slot-scope="scope">
                  <el-tag hit  size="medium">{{ scope.row.name }}</el-tag>
              </template>
          </el-table-column>
        
        
          <el-table-column label="模板类型" min-width="100">
              <template slot-scope="scope">
                  <el-tag hit  size="medium" v-if="scope.row.type==0">系统消息</el-tag>
                  <el-tag hit  size="medium" v-else>短信消息</el-tag>
              </template>
          </el-table-column>
        
        
          <el-table-column label="状态" min-width="100">
              <template slot-scope="scope">
                  <el-tag hit  size="medium" v-if="scope.row.deletetype==0">启用</el-tag>
                  <el-tag hit  size="medium" v-else>禁用</el-tag>
              </template>
          </el-table-column>
        
        
          <el-table-column label="模板内容" min-width="220">
              <template slot-scope="scope">
                  <el-tag hit  size="medium">{{ scope.row.content }}</el-tag>
              </template>
          </el-table-column>
        <el-table-column label="备注" min-width="150">
              <template slot-scope="scope">
                  <el-tag hit  size="medium">{{ scope.row.remark }}</el-tag>
              </template>
          </el-table-column>
        
          <el-table-column label="短信模板" min-width="100">
              <template slot-scope="scope">
                  <el-tag hit  size="medium">{{ scope.row.smsTemplate }}</el-tag>
              </template>
          </el-table-column>
        
        
          <el-table-column label="短信id" min-width="100">
              <template slot-scope="scope">
                  <el-tag hit  size="medium">{{ scope.row.smsId }}</el-tag>
              </template>
          </el-table-column>
        

        <el-table-column  label="操作" fixed="right" align="center" min-width="150">
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
    <el-dialog title="新增" class="companyInfo" width="700px" :visible.sync="addPopup" :append-to-body='true'>

      <div class="middleBox">
        <el-form :model="sysMsgTemplate" :rules="rules" ref="sysMsgTemplate" label-width="120px" label-position="left" size="small">

    
        <el-form-item label="模板编号" prop="code">
            <el-input v-model="sysMsgTemplate.code" clearable></el-input>(短信模板“_SMS”结尾)
        </el-form-item>
    
    
        <el-form-item label="模板名称" prop="name">
            <el-input v-model="sysMsgTemplate.name" clearable></el-input>
        </el-form-item>
    
    
        <el-form-item label="模板类型" prop="type">
            <el-radio-group v-model="sysMsgTemplate.type">
                <el-radio :label=1>业务消息</el-radio>
                <el-radio :label=2>短信消息</el-radio>

            </el-radio-group>
        </el-form-item>
    
    
        <el-form-item label="状态" prop="deletetype">
            <el-radio-group v-model="sysMsgTemplate.deletetype">
                <el-radio :label=0>启用</el-radio>
                <el-radio :label=1>停用</el-radio>
            </el-radio-group>
           
        </el-form-item>
    
    
        <el-form-item label="模板内容" prop="content">
            <el-input type="textarea" v-model="sysMsgTemplate.content" clearable></el-input>
            <span>参数使用{key1}{key2}...表示</span>
        </el-form-item>
        
        <el-form-item label="备注" prop="remark">
            <el-input type="textarea" placeholder="{key1}、{key2}意义说明" v-model="sysMsgTemplate.remark" clearable></el-input>
        </el-form-item>
    
    
        <el-form-item label="短信模板" prop="smsTemplate">
            <el-input v-model="sysMsgTemplate.smsTemplate"></el-input>
        </el-form-item>
    
    
        <el-form-item label="短信id" prop="smsId">
            <el-input v-model="sysMsgTemplate.smsId" readonly></el-input>
        </el-form-item>
    

        </el-form>
      </div>

      <div class="middleBox_btn" style="text-align:center;">
        <div class="button_default" @click="addPopup = false">取消</div>
        <div class="button_bg" @click="addData('sysMsgTemplate')">确认</div>
      </div>

    </el-dialog>

    <!-- 编辑弹窗 -->
    <el-dialog title="编辑" class="companyInfo" width="700px" :visible.sync="editorPopup" :append-to-body='true'>
      <div class="middleBox">
        <el-form :model="sysMsgTemplate" :rules="rules" ref="sysMsgTemplate" label-width="120px" size="small">

    
            <el-form-item label="模板编号" prop="code">
                <el-input v-model="sysMsgTemplate.code" clearable></el-input>
                <span>短信“_SMS” 结尾</span>
            </el-form-item>
    
    
            <el-form-item label="模板名称" prop="name">
                <el-input v-model="sysMsgTemplate.name" clearable></el-input>
            </el-form-item>
        
            <el-form-item label="模板类型" prop="type">
                <el-radio-group v-model="sysMsgTemplate.type">
                    <el-radio :label=1>业务消息</el-radio>
                    <el-radio :label=2>短信消息</el-radio>
                </el-radio-group>
            </el-form-item>
        
        
            <el-form-item label="状态" prop="deletetype">
                <el-radio-group v-model="sysMsgTemplate.deletetype">
                    <el-radio :label=0>启用</el-radio>
                    <el-radio :label=1>停用</el-radio>
                </el-radio-group>
            </el-form-item>
        
            <el-form-item label="模板内容" prop="content">
                <el-input type="textarea"  v-model="sysMsgTemplate.content"></el-input>
                <span>参数使用{key1}{key2}...表示</span>
            </el-form-item>
    
            <el-form-item label="备注" prop="content">
                <el-input type="textarea"  v-model="sysMsgTemplate.remark"></el-input>
            </el-form-item>
    
            <el-form-item label="短信模板" prop="smsTemplate">
                <el-input v-model="sysMsgTemplate.smsTemplate" clearable></el-input>
            </el-form-item>
    
    
            <el-form-item label="短信id" prop="smsId">
                <el-input v-model="sysMsgTemplate.smsId" clearable></el-input>
            </el-form-item>
    

        </el-form>
      </div>
      <div style="text-align:center;margin-top:10px;">
        <el-button size="mini" type="info" plain @click="editorPopup = false">取消</el-button>
        <el-button size="mini" type="success" @click="editorSubmit('sysMsgTemplate')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import selectInput from '@/components/common/form/selectInpt'
  export default {
    name:'sysmsgtemplate',
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
                            
          code: [
                { required: true, message: "模板编号；短信“_SMS” 结尾不能为空",trigger: 'blur' }
            ],
                      
          name: [
                { required: true, message: "模板名称不能为空",trigger: 'blur' }
            ],
                      
          type: [
                { required: true, message: "模板类型：0系统；1短信不能为空",trigger: 'blur' }
            ],
                      
          deletetype: [
                { required: true, message: "状态不能为空",trigger: 'blur' }
            ],
                      
          content: [
                { required: true, message: "模板内容不能为空",trigger: 'blur' }
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
      sysMsgTemplate:{},
      searchInfo:{},
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
        this.sysMsgTemplate = {};
      },
      //  新增 确定 点击事件
      addData(sysMsgTemplate){
          var that = this;
          this.$refs[sysMsgTemplate].validate((valid) => {
            if (valid) {
                //调用添加接口传输数据
                that.$post('/epf-admin/sysmsgtemplate/addSysMsgTemplate',that.sysMsgTemplate).then(res => {
                    if(res.code != '0'){
                        that.$message.error(res.msg);//失败
                        return
                    }
                    //结束
                    this.addPopup = false;
                    this.$refs[sysMsgTemplate].resetFields();
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
editorSubmit(sysMsgTemplate) {
    var that = this;
    this.$refs[sysMsgTemplate].validate((valid) => {
        if (valid) {
            //调用修改接口传输数据
                that.$post('/epf-admin/sysmsgtemplate/editSysMsgTemplate',that.sysMsgTemplate).then(res => {
                if(res.code != '0'){
                    that.$message.error(res.msg);//失败
                    return
                }
                //结束
                this.editorPopup = false
                this.$refs[sysMsgTemplate].resetFields();
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
    that.$post('/epf-admin/sysmsgtemplate/deleteSysMsgTemplate',{id:row.id}).then(res => {
    if(res.code != '0'){
        that.$message.error(res.msg);//失败
        return
    }
    //结束
    this.$message.success('删除成功!');
    //  关闭删除提示框
    this.$refs.doClose();
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
    that.$post('/epf-admin/sysmsgtemplate/getSysMsgTemplateJson',this.searchInfo).then(res => {
    if(res.code != '0'){
        that.message.error(res.msg);//失败
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
    that.$post('/epf-admin/sysmsgtemplate/getSysMsgTemplate',{id:id}).then(res => {
    if(res.code != '0'){
        that.message.error(res.msg);//失败
        return
    }
    //结束
    this.sysMsgTemplate = {};
    this.sysMsgTemplate = res.sysMsgTemplate;
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
