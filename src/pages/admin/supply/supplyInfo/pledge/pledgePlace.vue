<template>
<div class="page-body">
    <!-- 抵押地块信息 -->
  <el-tabs v-model="activeTabs" type="border-card" @tab-click="handleClick">
    <personalFiltrate @filterInfo="getFilterData" ref="personalFiltrate"></personalFiltrate>
    <el-tab-pane label="待处理" name="pending">
      <div class="switchHeight_box" style="padding-top:0">
        <div class="toolsTitleBox">
          <span class="toolsTitle">抵押地块信息</span>
          <span class="button_export" @click="xlsExport">导出</span >
        </div>
        <el-table
          :data="tableData1"
          border
          v-loading="loading"
          element-loading-text="数据加载中"
          element-loading-background="rgba(255, 255, 255,0.95)"
          @row-dblclick="rowClickHandle"
          style="width: 100%;min-height: 160px;">
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
              <span @click="rowClickHandle(scope.row,1)" style="text-align:center;cursor:pointer;color: #4772d5;">{{ scope.row.publishNo }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="infoTitle"
            label="信息标题"
            width="250"
            align="left">
            <template slot-scope="scope">
              <span class="titleHover" @click="rowClickHandle(scope.row,1)" style="text-align:center;cursor:pointer;">{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="infoId" label="行政区域" min-width="170" align="left">
            <template slot-scope="scope">
              <span
                style="text-align:center;"
              >{{ scope.row.cantonProvinceName }}{{ scope.row.cantonCityName }}{{ scope.row.cantonAreaName }}</span>
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
              <span :class="scope.row.publishStatus=='draft2'?'default':''"></span>
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
                type="success"
                plain
                @click="examine(scope.row,scope.$index)"
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

        <el-dialog title="审核" width="40%" :visible.sync="dialogForm" :append-to-body='true'>
          <template>
              <div id="dialog">
                <actDialog :actInfo="actInfo" @patch="actResult" />
              </div>
          </template>
        </el-dialog>
        <div style="text-align:right;margin:22px 0px;">
          <el-pagination
              background
              layout="prev, pager, next,sizes,jumper"
              :page-sizes="[5,10, 15, 20]"
              @size-change="no_handleSizeChange"
              @current-change="no_handleCurrentChange"
              :total="no_totalRecord"
              :current-page="no_pageNo"
              :page-size="no_pageSize"
              >
            </el-pagination>
        </div>
      </div>
    </el-tab-pane>

    <el-tab-pane label="已处理" name="processed">
      <div class="switchHeight_box" style="padding-top:0">
        <div class="toolsTitleBox">
          <span class="toolsTitle">抵押地块信息</span>
          <span class="button_export" @click="xlsExport">导出</span >
        </div>
        <el-table
          :data="tableData1"
          border
          @row-dblclick="rowClickHandle"
          v-loading="loading"
          element-loading-text="数据加载中"
          element-loading-background="rgba(255, 255, 255,0.95)"
          style="width: 100%;min-height: 160px;">
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
              <span @click="rowClickHandle(scope.row,2)" style="text-align:center;cursor:pointer;color: #4772d5;">{{ scope.row.publishNo }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="infoTitle"
            label="信息标题"
            width="250"
            align="left">
            <template slot-scope="scope">
              <span class="titleHover" @click="rowClickHandle(scope.row,2)" style="text-align:center;cursor:pointer;">{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="infoId" label="行政区域" min-width="170" align="left">
            <template slot-scope="scope">
              <span
                style="text-align:center;"
              >{{ scope.row.cantonProvinceName }}{{ scope.row.cantonCityName }}{{ scope.row.cantonAreaName }}</span>
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
              <span :class="scope.row.publishStatus=='draft2'?'default':''"></span>
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
                @click="view(scope.row,scope.$index)"
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
        <div style="text-align:right;margin:22px 0px;">
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
    </el-tab-pane>
  </el-tabs>
  </div>
</template>
<script>
import personalFiltrate from '@/components/personalFiltrate'
import transferTable from '@/components/transferTable'
import Axios from 'axios'
import qs from 'qs'
import Bus from '@/utils/bus'
import {mapActions, mapState} from 'vuex'
export default {
  name:'pledgePlace',
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
      pageNo:1,
      pageSize:5,
      totalPage:1,
      totalRecord:1,
      no_pageNo:1,
      no_pageSize:5,
      no_totalPage:1,
      no_totalRecord:1,
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
      actInfo:{},
      loading:true,
    }
  },
  created() {
    this.handleData = this.handle;
    let userToken = sessionStorage.getItem('token');
    this.getTransferPlace({token:userToken,publishStatus:'audit'})
  },
  methods:{
    xlsExport(){
      let params = {};
      params['circulation'] = 'mortgage'
      let userToken = sessionStorage.getItem('token');
      if(this.activeTabs == 'pending'){
        params['isAuditing'] = '1';
      }else{
        params['isAuditing'] = '2';
      }
      //2019-7-31hjy
      debugger;
      var btn = document.createElement("a");
      btn.setAttribute('download', '');// download属性
      btn.setAttribute('href', "/api/epf-supply/tsell/XlsExport?circulation="+params.circulation+"&token="+userToken+"&isAuditing="+params.isAuditing);// href链接
      btn.click();// 自执行点击事件
    },
    ...mapActions(['setTabsList']),
    getTransferPlace(params){
      this.loading = true;
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
        if(res.code != 0){
          this.$message.error(res.msg);
          this.loading = false;
          return
        }
        if(this.currentTabs == "pending"){
          this.no_pageNo = res.pager.pageNo;
          this.no_pageSize = res.pager.pageSize;
          this.no_totalPage = res.pager.totalPage;
          this.no_totalRecord = res.pager.totalRecord;
        }else{
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
        }
        this.tableData1 = res.pager.results;
        this.loading = false;
      })
    },
    handleEdit(index, row, btnText) {
      if (btnText === "审核") {
        this.dialogForm = true;
      }
    },
    handleSizeChange(val){
      //每页条数改变时触发
      this.searchInfo['page'] = 1;
      this.searchInfo['rows'] = val;
      this.getTransferPlace(this.searchInfo);
    },
    handleCurrentChange(val){
      //获取当前页
      this.searchInfo['page'] = val;
      this.searchInfo['rows'] = this.pageSize;
      this.getTransferPlace(this.searchInfo);
    },
    no_handleSizeChange(val){
      //每页条数改变时触发
      this.searchInfo['page'] = 1;
      this.searchInfo['rows'] = val;
      this.getTransferPlace(this.searchInfo);
    },
    no_handleCurrentChange(val){
      //获取当前页
      this.searchInfo['page'] = val;
      this.searchInfo['rows'] = this.pageSize;
      this.getTransferPlace(this.searchInfo);
    },
    examine(obj,index){
      this.currentLandId = obj.id;
      this.currentLandIndex = index;
      this.selectedObj=obj;
      this.actInfo=obj;
      this.dialogForm = true;


      this.$nextTick(()=>{
      Bus.$emit('transferaudit', 'examine')//需要审核
      })

    },
    view(obj,index){
      this.currentLandId = obj.id;
      this.currentLandIndex = index;
      this.selectedObj=obj;
      this.actInfo=obj;
      this.$nextTick(()=>{
      Bus.$emit('transferaudit', 'view')//只是预览
      })
      this.dialogForm = true;
    },
    downLandInfo(id,index){
      this.currentLandId = id;
      this.currentLandIndex = index;
      this.dialogDownLand = true;
    },
    autoExamine(){

    },
    reload(){
        //刷新页面
      var params={}
      params['circulation'] = 'mortgage'
      params['page'] = params['page']?params['page']:this.pageNo;
      params['rows'] = params['rows']?params['rows']:this.pageSize;
      let userToken = sessionStorage.getItem('token');
      if(this.activeTabs == 'pending'){
        params['isAuditing'] = '1';
      }else{
        params['isAuditing'] = '2';
      }
       this.$get('/epf-supply/admin/tsell/getTSellForBack',params).then(res=>{
        if(this.currentTabs == "pending"){
          this.no_pageNo = res.pager.pageNo;
          this.no_pageSize = res.pager.pageSize;
          this.no_totalPage = res.pager.totalPage;
          this.no_totalRecord = res.pager.totalRecord;
        }else{
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
        }
        this.tableData1 = res.pager.results;
        console.log(this.pageNo);
      })
    },
    setState(state){
      var publishStatus='';
      if(state==='success'){
        publishStatus='published2'
      }else if(state==='failed'){
        publishStatus='audit_failure'
      }
      //改变状态
      this.$post('/epf-supply/admin/tsell/editTSellPublishStatus',{tSellId:this.currentLandId,publishStatus:publishStatus}).then(res => {
        if(res.code != '0'){
          //失败
          this.$message.error(res.msg);
          return
        }
        //刷新页面
        this.reload()
      })
    },
    actResult(re){
        //取消：cancel，流转：success,流转结束：end,审核未通过：failed
        if(re==="cancel"){
            //取消关闭弹框，不做任何事件
        }else if(re==="success"){
            //刷新页面
            this.reload()
        }else if(re==="failed"){
            //修改状态
            this.setState('failed')
            //刷新页面
            this.reload()
        }else if(re==="end"){
            //修改状态
            this.setState('success')
            //刷新页面
            this.reload()
        }
        this.dialogForm = false;
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
        this.dialogDownLand = false;
      //改变状态
      this.$post('/epf-supply/admin/tsell/editTSellPublishStatus',{tSellId:this.currentLandId,publishStatus:'down_mytsell'}).then(res => {
        
        if (res.code != "0") {
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
        //刷新页面
        this.reload()
      })
    },
    rowClickHandle(row, event, column){
      // console.log('双击行的id',row);
      // let title = row.title;
      // let routerPath = '/demandSupplyDetails?supply=' + row.id;
      // let tabObj = {title,routerPath}
      // //将当前点击的选项添加到vuex中

      // this.setTabsList(tabObj)
      // this.$router.push({path:'/demandSupplyDetails',query:{supply:row.id}})
         console.log("双击行的id", row);
      this.$bus.$emit("closeTabsItem", 'demandSupplyDetails');
      let title = row.title;
      let routerPath =
        "/demandSupplyDetails?supply=" +
        row.id +
        "&actInfo=" +
        qs.stringify({
          businessId: row.businessId,
          taskId: row.taskId,
          procInsId: row.procInsId,
          procDefId: row.procDefId,
          activeTabs: this.activeTabs,
          //targetId: tragetId
        });
        console.log(routerPath)
      let tabObj = { title, routerPath };
      //将当前点击的选项添加到vuex中
      this.setTabsList(tabObj);
      console.log(tabObj)
      this.$router.push({
        path: "/demandSupplyDetails",
        query: {
          supply: row.id,
          businessId: row.businessId,
          taskId: row.taskId,
          procInsId: row.procInsId,
          procDefId: row.procDefId,
          activeTabs: this.activeTabs,
          isExamine: event
        }
      });
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
</style>
