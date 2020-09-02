<template>
<div class="page-body">
  <!-- <div class="pageName">1.1 转让地块信息</div> -->
  <el-tabs v-model="activeTabs" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="待受理" name="pending">
      <!-- <div class="toolsTitleBox">
        <span class="toolsTitle">筛选查询</span>
        <span class="toolsTips">*点击查询按钮查看数据</span>
      </div> -->
      <personalFiltrate @filterInfo="getFilterData" :typeClose="true"></personalFiltrate>
      <div class="toolsTitleBox">
        <span class="toolsTitle">转让地块信息</span>
        <span class="button_export" >导出</span >
      </div>
      <div>
    <el-table
      :data="tableData1"
      border
      @row-dblclick="rowClickHandle"
      style="width: 100%">
      <el-table-column
        prop="number"
        label="序号"
        width="50"
        align="center">
        <template slot-scope="scope">
          <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="infoId"
        label="信息发布编号"
        width="170"
        align="left"
        >
        <template slot-scope="scope">
          <span class="titleHoverStyle" style="{text-align:center;cursor:pointer;}">{{ scope.row.publishNo }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="infoTitle"
        label="信息标题"
        width="250"
        align="left">
        <template slot-scope="scope">
          <span style="text-align:center;cursor:pointer;"   @click="dialogTable = true">{{ scope.row.title }}</span>
          <el-dialog title="信息" :visible.sync="dialogTable" :append-to-body='true'>
            <el-table :data="tableData1">
              <el-table-column property="number" label="Id" width="50"></el-table-column>
              <el-table-column property="infoId" label="编号" width="160"></el-table-column>
              <el-table-column property="infoTitle" label="标题"></el-table-column>
            </el-table>
          </el-dialog>
        </template>
      </el-table-column> -->
      <el-table-column
        prop="circulationName"
        label="流转方式"
        width="120"
        align="left">
      </el-table-column>
      <el-table-column
        prop="circulationName"
        label="交易机构"
        width="160"
        align="left">
      </el-table-column>
      <el-table-column
        prop="circulationName"
        label="信息关联状态"
        width="120"
        align="left">
      </el-table-column>
      <el-table-column
        prop="publishStatus"
        label="状态"
        width="130"
        align="center">
        <template slot-scope="scope">
          <span :class="scope.row.publishStatus=='audit'?'default':''"></span>
          <span :class="scope.row.publishStatus=='draft3'?'default':''"></span>
          <span :class="scope.row.publishStatus=='audit_failure'?'error':''"></span>
          <span :class="scope.row.publishStatus=='published2'?'success':''"></span>
          <span>{{scope.row.publishStatusName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="circulationName"
        label="履约保证金缴纳状态"
        width="160"
        align="left">
      </el-table-column>
      <el-table-column
        prop="name"
        label="申请人"
        width="150"
        align="left">
      </el-table-column>
      <el-table-column
        prop="insertTime"
        label="申请时间"
        width="180"
        align="left">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="220"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            plain
            @click="examine(scope.row.id,scope.$index)"
            >
            审核
          </el-button>
          <el-button
            size="mini"
            type="primary"
            plain
            @click="autoExamine(scope.row.id)"
            >
            自动核验
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="审核" width="30%" :visible.sync="dialogForm" :append-to-body='true'>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="审核结果：">
          <el-radio-group v-model="form.assessor">
            <el-radio style="margin-left:10px;" label="published2">审核通过</el-radio>
            <el-radio style="margin-left:10px;" label="audit_failure">审核未通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核意见：">
          <el-input type="textarea" placeholder="请输入您的审核意见,500字以内" v-model="form.opinion"></el-input>
        </el-form-item>
          <el-form-item>
          <el-button @click="dialogForm = false">取消</el-button>
          <el-button type="primary" @click="examineSure">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
      <div style="text-align:right;margin:8px 0px;">
         <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
            :page-size="pageSize"
            :current-page="pageNo"
            >
          </el-pagination>
      </div>
    </el-tab-pane>

    <el-tab-pane label="已受理" name="processed">
      <!-- <transferTable :handle="handleDataSuccess"></transferTable> -->
      <!-- <div class="toolsTitleBox">
        <span class="toolsTitle">筛选查询</span>
        <span class="toolsTips">*点击查询按钮查看数据</span>
      </div> -->
      <personalFiltrate @filterInfo="getFilterData"></personalFiltrate>
      <div class="toolsTitleBox">
        <span class="toolsTitle">转让地块信息</span>
      </div>
      <div>
    <el-table
      :data="tableData1"
      border
      style="width: 100%">
      <el-table-column
        prop="number"
        label="序号"
        width="50"
        align="center">
        <template slot-scope="scope">
          <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="infoId"
        label="信息发布编号"
        width="170"
        align="left"
        >
        <template slot-scope="scope">
          <span style="text-align:center;cursor:pointer;">{{ scope.row.publishNo }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="infoTitle"
        label="信息标题"
        width="250"
        align="left">
        <template slot-scope="scope">
          <span style="text-align:center;cursor:pointer;"   @click="dialogTable = true">{{ scope.row.title }}</span>
          <el-dialog title="信息" :visible.sync="dialogTable" :append-to-body='true'>
            <el-table :data="tableData1">
              <el-table-column property="number" label="Id" width="50"></el-table-column>
              <el-table-column property="infoId" label="编号" width="160"></el-table-column>
              <el-table-column property="infoTitle" label="标题"></el-table-column>
            </el-table>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column
        prop="circulationName"
        label="流转方式"
        width="120"
        align="left">
      </el-table-column>
      <el-table-column
        prop="insertTime"
        label="申请时间"
        width="190"
        align="left">
      </el-table-column>
      <el-table-column
        prop="publishStatus"
        label="状态"
        width="130"
        align="center">
        <template slot-scope="scope">
          <span :class="scope.row.publishStatus=='audit'?'default':''"></span>
          <span :class="scope.row.publishStatus=='draft3'?'default':''"></span>
          <span :class="scope.row.publishStatus=='down_mytsell'?'default':''"></span>
          <span :class="scope.row.publishStatus=='audit_failure'?'error':''"></span>
          <span :class="scope.row.publishStatus=='published2'?'success':''"></span>
          <span>{{scope.row.publishStatusName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="申请人"
        width="150"
        align="left">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系人电话"
        width="130"
        align="left">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="220"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="examine(scope.row.id,scope.$index)"
            >
            查看审核结果
          </el-button>
          <el-button
            size="mini"
            type="danger"
            plain
            v-if="scope.row.publishStatus == 'published2'"
            @click="downLandInfo(scope.row.id,scope.$index)"
            >
            下架
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="提示" width="30%" :visible.sync="dialogDownLand" style="margin-top:10vh;" :append-to-body='true'>
      <h3 style="text-align:center;margin:0;font-weight:normal;font-size:20px;width:95%;"><i class="el-icon-warning" style="font-size:20px;color:#f2a824;"></i> 提示</h3>
      <p style="margin:10px 0 3px 0;text-align:center;">信息下架后，信息将不在门户网显示</p>
      <p style="margin:0;text-align:center;">确认下架吗？</p>
      <div class="dialogBtn_box">
        <span style="border:1px solid #e2e2e2;padding:5px 20px;margin:0 10px;border-radius:5px;cursor:pointer;" @click="dialogDownLand = false">取消</span>
        <span style="border:1px solid #ff9f0d;background:#ff9f0d;padding:5px 20px;color:#fff;margin:0 10px;border-radius:5px;cursor:pointer;" @click="lowerLand">确认</span>
      </div>
    </el-dialog>
  </div>
      <div style="text-align:right;margin:8px 0px;">
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
    </el-tab-pane>
  </el-tabs>
  <!-- <div class="page-header">
    <h1 class="page-title">Table表格数据</h1>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item >Table表格数据</el-breadcrumb-item>
    </el-breadcrumb>
  </div> -->

  <!-- <div class="box">
    <el-table>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="ID" prop="id" width="80"></el-table-column>
      <el-table-column label="动作" prop="action"></el-table-column>
      <el-table-column label="结果" prop="result"></el-table-column>
      <el-table-column label="描述" prop="desctiption"></el-table-column>
      <el-table-column label="状态" prop="show" width="80" ></el-table-column>
      <el-table-column label="创建时间" prop="createdAt">
        <template slot-scope="scope">
          {{format(scope.row.createdAt)}}
        </template>
      </el-table-column>
      <el-table-column label="最后更新" prop="updatedAt">
        <template slot-scope="scope">
          {{format(scope.row.updatedAt)}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <m-button type="danger">删除</m-button>
        </template>
      </el-table-column>
    </el-table>
    </div> -->
  </div>
</template>
<script>
import personalFiltrate from '../../../../components/personalFiltrate'
import transferTable from '../../../../components/transferTable'
import Axios from 'axios'
import qs from 'qs'
import {mapActions, mapState} from 'vuex'
export default {
  components: {
    personalFiltrate, transferTable
  },
  data () {
    return {
      activeTabs:'pending',
      currentTabs:'pending',
      handleDataWait: [
        {
          type: 'success',
          title: '审核'
        },
        {
          type: 'primary',
          title: '自动核验'
        }
      ],
      handleDataSuccess: [
        {
          type: 'primary',
          title: '查看审核结果'
        },
        {
          type: 'danger',
          title: '下架'
        }
      ],
      handleDataError: [
        {
          type: 'primary',
          title: '查看审核结果'
        }
      ],
      handleData: "",
      dialogForm: false,
      dialogDownLand:false,
      dialogTable: false,
      pageNo:1,
      pageSize:5,
      totalPage:1,
      totalRecord:1,
      searchInfo:{},
      tableData1: [],
      labelPosition: "right",
      form: {
        assessor: "",
        opinion: ""
      },
      formTest: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      currentLandId:'',
      currentLandIndex:'',
      create:false,
    }
  },
  created() {
    if(this.create){
      return null
    }
    this.create = true;
    this.handleData = this.handle;
    let userToken = sessionStorage.getItem('token');
    this.getTransferPlace({token:userToken,publishStatus:'audit'})
  },
  methods:{
    ...mapActions(['setTabsList']),
    getTransferPlace(params){
      params['circulation'] = 'mortgage';
      params['page'] = params['page']?params['page']:this.pageNo;
      params['rows'] = params['rows']?params['rows']:this.pageSize;
      let userToken = sessionStorage.getItem('token');
      if(this.activeTabs == 'pending'){
        params['isAuditing'] = '1';
      }else{
        params['isAuditing'] = '2';
      }
      this.$get('/epf-supply/admin/tsell/getTSellForBack',params).then(res=>{
        console.log(res);
        this.pageNo = res.pager.pageNo;
        this.pageSize = res.pager.pageSize;
        this.totalPage = res.pager.totalPage;
        this.totalRecord = res.pager.totalRecord;
        this.tableData1 = res.pager.results;
      })
    },
    handleEdit(index, row, btnText) {
      if (btnText === "审核") {
        this.dialogForm = true;
      }
    },
    handleSizeChange(val){
      //每页条数改变时触发
      this.pageNo = 1;
      this.searchInfo['page'] = this.pageNo;
      this.searchInfo['rows'] = val;
      this.getTransferPlace(this.searchInfo);
    },
    handleCurrentChange(val){
      //获取当前页
      this.searchInfo['page'] = val;
      this.searchInfo['rows'] = this.pageSize;
      this.getTransferPlace(this.searchInfo);
    },
    examine(id,index){
      this.currentLandId = id;
      this.currentLandIndex = index;
      this.dialogForm = true;
    },
    downLandInfo(id,index){
      this.currentLandId = id;
      this.currentLandIndex = index;
      this.dialogDownLand = true;
    },
    autoExamine(){

    },
    examineSure(){
      this.$post('/epf-supply/admin/tsell/editTSellPublishStatus',{tSellId:this.currentLandId,publishStatus:this.form.assessor}).then(res => {
        if(res.msg != 'success'){
          //失败
          this.$message.error(res.msg);
          return
        }
        this.dialogForm = false;
        this.form.assessor = '';
        this.form.opinion = '';
        this.tableData1.splice(this.currentLandIndex,1);
        this.$message({
          message: '审核完成',
          type: 'success'
        });
      })
    },
    handleClick(val){
      if (val.name == this.currentTabs){
        return
      }
      this.currentTabs = val.name;
      this.tableData1 = [];
      if(this.activeTabs == 'pending'){
        let userToken = sessionStorage.getItem('token');
        this.getTransferPlace({token:userToken,publishStatus:'audit'})
      }else{
        let userToken = sessionStorage.getItem('token');
        this.getTransferPlace({token:userToken,isAuditing:'2'})
      }
    },
    lowerLand(){
      //改变状态
      this.$post('/epf-supply/admin/tsell/editTSellPublishStatus',{tSellId:this.currentLandId,publishStatus:'down_mytsell'}).then(res => {
        if(res.msg != 'success'){
          //失败
          this.$message.error(res.msg);
          return
        }
        this.dialogDownLand = false;
        this.tableData1[this.currentLandIndex].publishStatus = 'down_mytsell';
        this.tableData1[this.currentLandIndex].publishStatusName = '下架';
        this.$message({
          message: '下架完成',
          type: 'success'
        });
      })
    },
    rowClickHandle(row, event, column){
      console.log('双击行的id',row.id);
      let title = '信息详情';
      let routerPath = '/landmarkInfo';
      let tabObj = {title,routerPath}
      // // //将当前点击的选项添加到vuex中
      this.setTabsList(tabObj)
      this.$router.push({path:routerPath,query:{supply:row.id}})
      // this.$emit('select', index)
    },
    getFilterData(val){
      console.log(val);
      this.searchInfo = val;
      this.getTransferPlace(this.searchInfo);
      // this.un_search = val;
      // this.getMyProvide(this.un_search);
    }
  }
}
</script>
<style scoped>
  .box-body{
    width: 100%;
    overflow: auto;
  }
.dialogBtn_box{
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.titleHoverStyle:hover{
  color: #4772d5 !important;
}
</style>
