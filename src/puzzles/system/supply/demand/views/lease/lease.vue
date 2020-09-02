<template>
  <epf-container title="求租地块信息">
    <div class="epf_term_box">
      <needPersonalFiltrate @filterInfo="getFilterData"></needPersonalFiltrate>
    </div>
    <div class="epf_fr_box" :style="{height:boxHeight - 200 +'px'}">
      <div class="epf_toolbar epf_align_right">
        <span class="toolsTitle">求租地块信息</span> 
        <button class="epf_btn epf_btn_bg" @click="xlsExport">导 出</button>
      </div>
    </div>
    <el-table
      :data="tableData1"
      v-loading="loading"
      element-loading-text="数据加载中"
      element-loading-background="rgba(255, 255, 255,0.95)"
      border
      :height="boxHeight - 270" 
      style="width: 100%;min-height: 160px;">
      <el-table-column
        prop="number"
        label="序号"
        min-width="50"
        align="center">
        <template slot-scope="scope">
          <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="publishNo"
        label="信息发布编号"
        min-width="170"
        align="left"
        >
        <template slot-scope="scope">
          <span @click="seeMes(scope.row.id,scope.$index)" style="text-align:center;cursor:pointer;color:#4772d5;">{{ scope.row.publishNo }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="infoTitle"
        label="信息标题"
        min-width="250"
        align="left">
        <template slot-scope="scope">
          <span style="text-align:center;cursor:pointer;">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="demandName"
        label="需求类型"
        min-width="120"
        align="left">
      </el-table-column>
       <el-table-column
        prop="insertTime"
        label="发布时间"
        min-width="150"
        align="left">
      </el-table-column>
      <el-table-column
        prop="statusName"
        label="发布状态"
        min-width="100"
        align="left">
      </el-table-column>
      <el-table-column
        prop="contact"
        label="申请人"
        min-width="100"
        align="left">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系人电话"
        min-width="130"
        align="left">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="220"
        align="left">
        <template slot-scope="scope">
          <span class="downInfo" v-if="scope.row.status=='published'"  @click="examine(scope.row.id,scope.$index)">下架</span>
          <span class="downInfo"  @click="seeMes(scope.row.id,scope.$index)">查看</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页控件 -->
    <div class="epf_paging_fixe" style="text-align: right;">
      <el-pagination
        background
        layout="prev, pager, next,sizes,jumper"
        :page-sizes="[5,10, 15, 20]"
        :current-page="pageNo"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="totalRecord">
      </el-pagination>
    </div>
    <!-- 弹窗 -->
    <el-dialog
      :title="dialogData.title"
      :visible.sync="dialogData.visible"
      :width="dialogData.width"
      append-to-body>
      <component
        v-if="dialogData.comp"
        :is="dialogData.comp"
        :ref="'dialogData.comp'"
        @closeDialog="closeDialog">
      </component>
      <div v-if="!dialogData.comp" v-html="dialogData.content"></div>
      <div v-if="!dialogData.comp" class="epf_align_center" style="padding-top: 25px;">
        <button class="epf_btn epf_btn_bg" @click="lowerLand"> 确 定</button>
        <button class="epf_btn epf_btn_def" @click="dialogData.visible = false"> 取 消</button>
      </div>
    </el-dialog>
  </epf-container>
</template>

<script>
import needPersonalFiltrate from '@/components/needPersonalFiltrate'
import see from './see'
export default {
  name:'lease',
  components: {needPersonalFiltrate,see},
  data () {
    return {
      massifPopup:false,//
      landData:'',
      activeTabs:'pending',
      handleData: "",
      pageNo:1,
      pageSize:5,
      totalPage:1,
      totalRecord:1,
      searchInfo:{},
      tableData1: [],
      labelPosition: "right",
      form: {
        assessor: "down_mytpurchase",
        opinion: ""
      },
      currentLandId:'',
      currentLandIndex:'',
      create:false,
      loading:true
    }
  },
  created() {
    this.boxHeight = window.innerHeight - 250;
    if(this.create){
      return null
    }
    this.create = true;
    this.handleData = this.handle;
    let userToken = sessionStorage.getItem('token');
    this.getTransferPlace({token:userToken,page:this.pageNo,rows:this.pageSize})
  },
  methods:{
    xlsExport(){
      //2019-7-31hjy
      debugger;
      var btn = document.createElement("a");
      btn.setAttribute('download', '');// download属性
      btn.setAttribute('href', "/api/epf-supply/tpurchase/wantBuyXls?demand=need_rent");// href链接
      btn.click();// 自执行点击事件
    },
    getTransferPlace(params){
      this.loading = true;
      //接口调用
      params['demand'] = 'need_rent'
      this.$get('/epf-supply/admin/tpurchase/getTPurchaseForBack',params).then(res=>{
        if(res.code != 0){
          this.$message.error(res.msg);
          this.loading = false;
          return
        }
        function getChangeDate(date) {
          return (
            date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "  " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
          );
        }
        let result = res.pager['results'].map((item,index)=>{
          item.insertTime = item.updateTime == null?item.insertTime:item.updateTime;
          return item
        })
        console.log(res);
        this.pageNo = res.pager.pageNo;
        this.pageSize = res.pager.pageSize;
        this.totalPage = res.pager.totalPage;
        this.totalRecord = res.pager.totalRecord;
        this.tableData1 = res.pager.results;
        this.loading = false;
      })
    },
    handleEdit(index, row, btnText) {
      if (btnText === "审核") {
        this.dialogData.visible = true;
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
    getFilterData(val){
      this.searchInfo = val;
      this.searchInfo['page'] = 1;
      this.searchInfo['rows'] = this.pageSize;
      this.getTransferPlace(this.searchInfo);
    },
    // 查看
    seeMes(id,index) {
      console.log(id,index)
      this.dialogData = {
        visible: true,
        title: "需求详情",
        comp: "see",
        width: "50%"
      };
    },
    // 下架
    examine(id,index){
      this.currentLandId = id;
      this.dialogData = {
        visible: true,
        title:"提示" ,
        content: `<h3 style="text-align:center;margin:0;font-weight:normal;font-size:20px;width:95%;"><i class="el-icon-warning" style="font-size:20px;color:#f2a824;"></i> 提示</h3>
                  <p style="margin:10px 0 3px 0;text-align:center;">信息下架后，信息将不在门户网显示</p>
                  <p style="margin:0;text-align:center;">确认下架吗？</p>`,
        width: "20%",
        id:this.currentLandId,
        index:this.currentLandIndex
      };
    },
    // 下架确认
    lowerLand(){
      this.dialogData.visible = false;
      this.$post('/epf-supply/admin/tpurchase/downMyPurchase',{purchaseId:this.currentLandId,status:this.form.assessor}).then(res => {
      if(res.code != '0'){
          //失败
          this.$message.error(res.msg);
          return
        }
        this.dialogData.visible = false;
        this.form.assessor = '';
        this.form.opinion = '';
        this.$message.success(res.msg);
        let userToken = sessionStorage.getItem('token');
        this.getTransferPlace({token:userToken,page:1,rows:this.pageSize})
      })
    },
    // 关闭对话框
    closeDialog() {
      this.dialogData.visible = false;
    }
  }
}
</script>
<style scoped>
  .toolsTitle{
    position: absolute;
    left: 1%;
  }
</style>