<template>
  <div class="page-body">
    <!-- <div class="pageName">1.1 转让地块信息</div> -->
    <el-tabs v-model="activeTabs" type="border-card" @tab-click="handleClick">
      <entrustedFiltrate @filterInfo="getFilterData" :typeClose="true"></entrustedFiltrate>
      <el-tab-pane label="待受理" name="pending">
        <div class="toolsTitleBox">
          <span class="toolsTitle">待受理列表</span>
          <span class="list-style: none;" v-for="(button ,index)  in buttons" :key="index">
          <span class="button_bg" v-if="button.resourceId=='entrust_export'" @click="xlsExport">导出</span>
          </span>
        </div>
        <div>
          <el-table
            :data="tableData1"
            border
            @row-dblclick="rowClickHandle"
            v-loading="loading"
            element-loading-text="数据加载中"
            element-loading-background="rgba(255, 255, 255,0.95)"
            style="width: 100%"
          >
            <el-table-column prop="number" label="序号" width="50" align="center">
              <template slot-scope="scope">
                <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="委托编号" width="170" align="left">
              <template slot-scope="scope">
                <span
                  @click="seeDetails(scope.row,scope.$index)"
                >{{scope.row.transactionNo}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="trustTitle" label="标题" width="250" align="left"></el-table-column>
            <el-table-column prop="circulationName" label="流转方式" width="120" align="left"></el-table-column>
            <el-table-column prop="trustOrgName" label="交易机构" width="160" align="left"></el-table-column>
            <el-table-column prop="isUnion" label="信息关联状态" width="120" align="left"></el-table-column>
            <el-table-column prop="delegationStatusName" label="状态" width="130" align="center"></el-table-column>
            <el-table-column prop="amountStatusName" label="履约保证金缴纳状态" width="160" align="left"></el-table-column>
            <el-table-column prop="channelName" label="地块渠道" width="150" align="left"></el-table-column>
            <el-table-column prop="recorderName" label="录件人" width="150" align="left"></el-table-column>
            <el-table-column prop="updateTime" label="申请时间" width="180" align="left"></el-table-column>
            <el-table-column fixed="right" label="操作" width="320" align="center">
              <template slot-scope="scope">
                <span class="list-style: none;" v-for="(button ,index)  in buttons" :key="index">
                <el-button v-if="button.resourceId=='entrust_accept'"
                  size="mini"
                  type="success"
                  plain
                  @click="examine(scope.row,scope.$index)"
                >受理</el-button>
                <el-button v-if="button.resourceId=='entrust_autoaccept'" size="mini" type="primary"
                           plain>自动核验</el-button>
                </span>
              </template>
            </el-table-column>
          </el-table>

          <el-dialog title="受理" width="70%" :visible.sync="dialogForm" :append-to-body="true" v-if="dialogForm">
            <template>
              <div id="dialog">
                <actDialog :actInfo="actInfo" @patch="actResult"/>
              </div>
            </template>
          </el-dialog>
        </div>
        <div style="text-align:right;margin:8px 0px;">
          <el-pagination
            background
            layout="total,prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            :page-size="no_pageSize"
            @size-change="no_handleSizeChange"
            @current-change="no_handleCurrentChange"
            :total="no_totalRecord"
            :current-page="no_currentPage"
          ></el-pagination>
        </div>
      </el-tab-pane>

      <el-tab-pane label="已受理" name="processed">
        <div class="toolsTitleBox">
          <span class="toolsTitle">已受理列表</span>
          <span class="button_export" @click="xlsExport">导出</span>
        </div>
        <div>
          <el-table
            :data="tableData1"
            border
            v-loading="loading"
            element-loading-text="数据加载中"
            element-loading-background="rgba(255, 255, 255,0.95)"
            style="width: 100%"
          >
            <el-table-column prop="number" label="序号" width="50" align="center">
              <template slot-scope="scope">
                <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="委托编号" width="170" align="left">
              <template slot-scope="scope">
                <span
                  @click="seeDetails(scope.row,scope.$index)"
                >{{scope.row.transactionNo}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="trustTitle" label="标题" width="250" align="left"></el-table-column>
            <el-table-column prop="circulationName" label="流转方式" width="120" align="left"></el-table-column>
            <el-table-column prop="trustOrgName" label="交易机构" width="160" align="left"></el-table-column>
            <el-table-column prop="isUnion" label="信息关联状态" width="120" align="left"></el-table-column>
            <el-table-column prop="delegationStatusName" label="状态" width="130" align="center"></el-table-column>
            <el-table-column prop="amountStatusName" label="履约保证金缴纳状态" width="160" align="left"></el-table-column>
            <el-table-column prop="channelName" label="地块渠道" width="150" align="left"></el-table-column>
            <el-table-column prop="recorderName" label="录件人" width="150" align="left"></el-table-column>
            <el-table-column prop="updateTime" label="申请时间" width="180" align="left"></el-table-column>
            <el-table-column fixed="right" label="操作" width="320" align="left">
              <template slot-scope="scope">
                 <span class="list-style: none;" v-for="(button ,index)  in buttons" :key="index">
                <el-button v-if="button.resourceId=='entrust_viewinfo'"
                           size="mini"
                           type="primary"
                           plain
                           @click="seeDetails(scope.row,scope.$index)"
                >查看详情</el-button>

<!--                   <el-button v-if="scope.row.delegationStatus == 'accept_failure' && button.resourceId=='entrust_resubmit'"-->
<!--                              size="mini"-->
<!--                              type="primary"-->
<!--                              plain-->
<!--                              @click="Resubmit(scope.row,scope.$index)"-->
<!--                              :disabled = "isResubmit"-->
<!--                   >重新提交</el-button>-->

                <el-button v-if="scope.row.delegationStatus =='accept' && button.resourceId=='entrust_viewgold'"
                          size="mini"
                           type="primary"
                           plain
                      @click="seeGold(scope.row,scope.$index)"
                >
                  查看履约金
                </el-button>
                <el-button
                          size="mini"
                           type="primary"
                           plain
                  v-if="scope.row.delegationStatus == 'accept_failure' && button.resourceId=='entrust_viewdeleg'"
                  @click="admissibility(scope.row,scope.$index)"
                >查看受理意见</el-button>
                 </span>
              </template>
            </el-table-column>
          </el-table>

          <el-dialog
            title="提示"
            width="30%"
            :visible.sync="dialogDownLand"
            style="margin-top:10vh;"
            :append-to-body="true">
            <h3 style="text-align:center;margin:0;font-weight:normal;font-size:20px;width:95%;">
              <i class="el-icon-warning" style="font-size:20px;color:#f2a824;"></i> 提示
            </h3>
            <p style="margin:10px 0 3px 0;text-align:center;">信息下架后，信息将不在门户网显示</p>
            <p style="margin:0;text-align:center;">确认下架吗？</p>
            <div class="dialogBtn_box">
              <span
                style="border:1px solid #e2e2e2;padding:5px 20px;margin:0 10px;border-radius:5px;cursor:pointer;"
                @click="dialogDownLand = false"
              >取消</span>
              <span
                style="border:1px solid #ff9f0d;background:#ff9f0d;padding:5px 20px;color:#fff;margin:0 10px;border-radius:5px;cursor:pointer;"
                @click="lowerLand"
              >确认</span>
            </div>
          </el-dialog>
        </div>
        <div style="text-align:right;margin:8px 0px;">
          <el-pagination
            background
            layout="total,prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            :page-size="pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
            :current-page="currentPage"
          ></el-pagination>
        </div>
      </el-tab-pane>

      <el-tab-pane label="我的委托" name="myEntrusted">
        <div class="toolsTitleBox">
          <span class="toolsTitle">委托交易列表</span>
          <div class="oper">
            <span class="list-style: none;" v-for="(button ,index)  in buttons" :key="index">
            <span v-if="button.resourceId=='entrust_add'" class="button_bg" @click="handleAdd()">新增</span>
            <span v-if="button.resourceId=='button_export'" class="button_export" @click="xlsExport">导出</span>
            </span>
          </div>
        </div>
        <div>
          <el-table
            :data="tableData1"
            v-loading="loading"
            element-loading-text="数据加载中"
            element-loading-background="rgba(255, 255, 255,0.95)"
            border
            style="width: 100%"
           >
            <el-table-column prop="number" label="序号" width="50" align="center">
              <template slot-scope="scope">
                <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="委托编号" width="170" align="left">
              <template slot-scope="scope">
                <span
                  @click="seeDetails(scope.row,scope.$index)"
                >{{scope.row.transactionNo}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="trustTitle" label="标题" width="250" align="left"></el-table-column>
            <el-table-column prop="circulationName" label="流转方式" width="120" align="left"></el-table-column>
            <el-table-column prop="trustOrgName" label="交易机构" width="160" align="left"></el-table-column>
            <el-table-column prop="isUnion" label="信息关联状态" width="120" align="left"></el-table-column>
            <el-table-column prop="delegationStatusName" label="状态" width="130" align="center"></el-table-column>
            <el-table-column prop="amountStatusName" label="履约保证金缴纳状态" width="160" align="left"></el-table-column>
            <el-table-column prop="channelName" label="地块渠道" width="150" align="left"></el-table-column>
            <el-table-column prop="recorderName" label="录件人" width="150" align="left"></el-table-column>
            <el-table-column prop="updateTime" label="申请时间" width="180" align="left"></el-table-column>
            <el-table-column fixed="right" label="操作" width="320" align="center">
              <template slot-scope="scope">
                <span class="list-style: none;" v-for="(button ,index)  in buttons" :key="index">
                <el-button
                  size="mini"
                  type="primary"
                  plain
                  v-if="scope.row.delegationStatus=='draft3' && button.resourceId=='entrust_edit'"
                  @click="edit(scope.row,scope.$index)"
                >修改</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  plain
                  v-if="scope.row.delegationStatus=='draft3' && button.resourceId=='entrust_delete'"
                  @click="deleted(scope.row,scope.$index)"
                >删除</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  plain
                  v-if="scope.row.delegationStatus=='draft3' && button.resourceId=='entrust_submit'"
                  @click="submitHadle(scope.row.ttiId,scope.$index,'accepting',scope.row.tgId,scope.row.trustOrgId)"
                >提交受理</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  plain
                  v-if="scope.row.delegationStatus !=='draft3' && button.resourceId=='entrust_viewinfo'"
                  @click="seeDetails(scope.row,scope.$index)"
                >查看详情</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  plain
                  v-if="scope.row.delegationStatus =='accept' && button.resourceId=='entrust_viewgold'"
                  @click="seeGold(scope.row,scope.$index)"
                >查看履约金</el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    plain
                    v-if="scope.row.delegationStatus == 'accept_failure' && button.resourceId=='entrust_viewdeleg'"
                    @click="admissibility(scope.row,scope.$index)"
                  >查看受理意见</el-button>

                  <el-button
                    size="mini"
                    type="primary"
                    plain
                    v-if="scope.row.delegationStatus == 'accept_failure' && button.resourceId=='entrust_resubmit'"
                    @click="Resubmit(scope.row,scope.$index)"
                  >重新提交</el-button>

                <el-button
                  size="mini"
                  type="danger"
                  plain
                  v-if="scope.row.publishStatus == 'published2' && button.resourceId=='entrust_takeoff'"
                  @click="downLandInfo(scope.row.id,scope.$index)"
                >下架</el-button>
                </span>
              </template>
            </el-table-column>
          </el-table>

          <el-dialog
            title="提示"
            width="30%"
            :visible.sync="dialogDownLand"
            style="margin-top:10vh;"
            :append-to-body="true"
           >
            <h3 style="text-align:center;margin:0;font-weight:normal;font-size:20px;width:95%;">
              <i class="el-icon-warning" style="font-size:20px;color:#f2a824;"></i> 提示
            </h3>
            <p style="margin:10px 0 3px 0;text-align:center;">信息下架后，信息将不在门户网显示</p>
            <p style="margin:0;text-align:center;">确认下架吗？</p>
            <div class="dialogBtn_box">
              <span
                style="border:1px solid #e2e2e2;padding:5px 20px;margin:0 10px;border-radius:5px;cursor:pointer;"
                @click="dialogDownLand = false"
              >取消</span>
              <span
                style="border:1px solid #ff9f0d;background:#ff9f0d;padding:5px 20px;color:#fff;margin:0 10px;border-radius:5px;cursor:pointer;"
                @click="lowerLand"
              >确认</span>
            </div>
          </el-dialog>
        </div>
        <div style="text-align:right;margin:8px 0px;">
          <el-pagination
            background
            layout="total,prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            :page-size="me_pageSize"
            @size-change="me_handleSizeChange"
            @current-change="me_handleCurrentChange"
            :total="me_totalRecord"
            :current-page="me_currentPage"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import entrustedFiltrate from '@/components/entrustedFiltrate'
  import transferTable from '@/components/transferTable'
  import Axios from 'axios'
  import qs from 'qs'
  import {mapActions, mapState} from 'vuex'
  import Bus from '../../../../../utils/bus'

  export default {
    name: 'entrustDetailList',
    components: {
      entrustedFiltrate,
      transferTable
    },
    data () {
      return {
        tSellId: '',
        activeTabs: 'pending',
        currentTabs: 'pending',
        actInfo: {},
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
        handleData: '',
        dialogForm: false,
        dialogDownLand: false,
        dialogTable: false,
        //页码
        currentPage: 1,
        totalPage: 1,
        totalRecord: 1,
        pageNo: 1,
        pageSize: 5,
        no_currentPage: 1,
        no_totalPage: 1,
        no_totalRecord: 1,
        no_pageNo: 1,
        no_pageSize: 5,
        me_currentPage: 1,
        me_totalPage: 1,
        me_totalRecord: 1,
        me_pageNo: 1,
        me_pageSize: 5,

        searchInfo: {},
        tableData1: [],
        labelPosition: 'right',
        form: {
          assessor: '',
          opinion: ''
        },
        states: false,
        formTest: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        currentLandId: '',
        currentLandIndex: '',
        create: false,
        loading: true,
        //按钮组、主题
        buttons: [],
        CancelToken: '', //axios请求暂停函数
        cancel: null, //调用对象
        isResubmit:false, //禁用重新提交按钮
      }
    },
    created () {
      this.CancelToken = this.$http.CancelToken; //请求停止对象
      this.buttons = JSON.parse(localStorage.getItem('entrustDetailList'));
      if (this.create) {
        return null
      }
      this.create = true;
      this.handleData = this.handle;
      this.getTransferPlace({publishStatus: 'audit'});
    },
    mounted () {
      Bus.$on('entrustAddSuccess', val => {
        this.activeTabs = 'myEntrusted';
        this.searchInfo = {};
        this.getTransferPlace(this.searchInfo);
      })
    },
    methods: {
      xlsExport(){
        let params = {};
        params['circulation'] = 'mortgage';
        let userToken = sessionStorage.getItem('token');
        if (this.activeTabs == 'pending') {
          params['isAccept'] = '1';
        } else if (this.activeTabs == 'processed') {
          params['isAccept'] = '2';
        } else {
          params['isAccept'] = '3';
        }
        //2019-7-31hjy
        var btn = document.createElement("a");
        btn.setAttribute('download', '');// download属性
        btn.setAttribute('href', "/api/epf-trade/transtrustinfo/XlsExport?isAccept="+params.isAccept+"&token="+userToken);// href链接
        btn.click();// 自执行点击事件
      },
      ...mapActions(['setTabsList']),
      getTransferPlace (params) {
        this.loading = true;
        let that = this;
        params['page'] = params['page'] ? params['page'] : this.pageNo;
        params['rows'] = params['rows'] ? params['rows'] : this.pageSize;
        if (this.activeTabs == 'pending') {
          params['isAccept'] = '1';
        } else if (this.activeTabs == 'processed') {
          params['isAccept'] = '2';
        } else {
          params['isAccept'] = '3';
        }
        this.$get(
          '/epf-trade/admin/transtrustinfo/getAcceptingTrust',
          params
        ).then(res => {
          console.log('请求结束')
          if (res.code != 0) {
            this.loading = false;
            this.$message.error(res.msg);
            return
          } else {
            if (this.currentTabs == 'pending') {
              this.no_pageNo = res.pager.pageNo;
              this.no_pageSize = res.pager.pageSize;
              this.no_totalPage = res.pager.totalPage;
              this.no_totalRecord = res.pager.totalRecord;
            } else if (this.currentTabs == 'processed') {
              this.pageNo = res.pager.pageNo;
              this.pageSize = res.pager.pageSize;
              this.totalPage = res.pager.totalPage;
              this.totalRecord = res.pager.totalRecord;
            } else {
              this.me_pageNo = res.pager.pageNo;
              this.me_pageSize = res.pager.pageSize;
              this.me_totalPage = res.pager.totalPage;
              this.me_totalRecord = res.pager.totalRecord;
            }
          }
          this.tableData1 = res.pager.results;
          this.loading = false;
        }).catch(error => {
          console.log(error)
        })
      },
      handleEdit (index, row, btnText) {
        if (btnText === '审核') {
          this.dialogForm = true;
        }
      },
      edit (val, index) {
        console.log("======val========",val)
        this.$bus.$emit("closeTabsItem", "entrustedForm");
        let title = '修改委托交易';
        // let routerPath = '/entrustedTradeDetailsAmend';
        let routerPath =`/entrustedForm?tgId=${val.tgId}&id=${val.ttiId}&num=1&procInsId=${val.procInsId}`;
        
        let tabObj = {title, routerPath};
        this.setTabsList(tabObj);
        this.$router.push({
          // path: '/entrustedTradeDetailsAmend',
          path: '/entrustedForm',
          query: {
            tgId: val.tgId,
            id: val.ttiId,
            num: 1,
            procInsId: val.procInsId
          }
        })
      },
      handleSizeChange (val) {
        //每页条数改变时触发
        this.pageNo = 1
        this.pageSize = val
        this.searchInfo['page'] = 1;
        this.searchInfo['rows'] = val;
        this.getTransferPlace(this.searchInfo);
      },
      handleCurrentChange (val) {
        //获取当前页
        this.searchInfo['page'] = val;
        this.searchInfo['rows'] = this.pageSize;
        this.getTransferPlace(this.searchInfo);
      },
      no_handleSizeChange (val) {
        //每页条数改变时触发
        this.pageNo = 1
        this.pageSize = val
        this.searchInfo['page'] = 1;
        this.searchInfo['rows'] = val;
        this.getTransferPlace(this.searchInfo);
      },
      no_handleCurrentChange (val) {
        //获取当前页
        this.searchInfo['page'] = val;
        this.searchInfo['rows'] = this.pageSize;
        this.getTransferPlace(this.searchInfo);
      },
      me_handleSizeChange (val) {
        //每页条数改变时触发
        this.pageNo = 1
        this.pageSize = val
        this.searchInfo["page"] = 1;
        this.searchInfo["rows"] = val;
        this.getTransferPlace(this.searchInfo);
      },
      me_handleCurrentChange (val) {
        console.log(val)
        //获取当前页
        this.searchInfo['page'] = val;
        this.searchInfo['rows'] = this.pageSize;
        this.getTransferPlace(this.searchInfo);
      },
      seeDetails (val, index) {
        this.$bus.$emit("closeTabsItem", "toEntrustDetail");
        let title = '查看详细信息';
        let routerPath = `/toEntrustDetail?tgId=${val.tgId}&id=${val.ttiId}&procInsId=${val.procInsId}`;
        let tabObj = {title, routerPath};
        this.setTabsList(tabObj);
        this.$router.push({
          path: '/toEntrustDetail',
          query: {
            tgId: val.tgId,
            id: val.ttiId,
            num: 1,
            procInsId: val.procInsId
          }
        })
      },
      admissibility (val, index) {
        let title = '查看审核意见';
        let routerPath = `/toEntrustDetail?tgId=${val.tgId}&id=${val.ttiId}&procInsId=${val.procInsId}`;
        let tabObj = {title, routerPath};
        this.setTabsList(tabObj);
        this.$router.push({
          path: '/toEntrustDetail',
          query: {
            tgId: val.tgId,
            id: val.ttiId,
            num: 3,
            procInsId: val.procInsId
          }
        })
      },
      //重新提交
      Resubmit (val, index) {
        // --------------------重新提交进入信息编辑页面--zhushaobing
        let title = '重新提交';
        // let routerPath = '/entrustedTradeDetailsAmend';
        let routerPath = '/entrustedForm';
        let tabObj = {title, routerPath};
        this.setTabsList(tabObj);
        this.$router.push({
          // path: '/entrustedTradeDetailsAmend',
          path: '/entrustedForm',
          query: {
            tgId: val.tgId,
            id: val.ttiId,
            num: 1,
            procInsId: val.procInsId,
            reapply:'reapply'
          }
        })
      },
      deleted (val, index) {
        console.log(val.tgId);
        this.$post('/epf-trade/admin/transgoods/deleteTransGoods', {
          id: val.tgId
        }).then(res => {
          console.log('====你是相互的河南籍考生=====', res.code);
          if (res.code == '0') {
            this.$message.success(res.msg);
            console.log('====你是相互的河南籍考生=====', res.msg);
            this.getTransferPlace({publishStatus: 'audit'});
          } else {
            this.$message.warning(res.msg);
            console.log('====你是相互的河南籍考生=====', res.msg);
          }
        })
      },
      seeGold (val, index) {
        let title = '查看详细信息';
        let routerPath = `/toEntrustDetail?tgId=${val.tgId}&id=${val.ttiId}&procInsId=${val.procInsId}`;
        let tabObj = {title, routerPath};
        this.setTabsList(tabObj);
        this.$router.push({
          path: '/toEntrustDetail',
          query: {
            tgId: val.tgId,
            id: val.ttiId,
            procInsId: val.procInsId,
            num: 2
          }
        })
      },
      setState (state) {
        var delegationStatus = '';
        if (state === 'success') {
          delegationStatus = 'accept';
        } else if (state === 'failed') {
          delegationStatus = 'accept_failure';
        }
        //改变状态
        this.$post('/epf-trade/admin/transtrustinfo/editTrustInfoState', {
          id: this.currentLandId,
          delegationStatus: delegationStatus
        }).then(res => {
          console.log('审核接口结果', res, res.code);
          if (res.code != '0') {
            //失败
            this.$message.error(res.msg);;
            return
          }
          //审核失败驳回时若关联了地块,对地块状态修改
          if(state === 'failed' && this.tSellId != '' && this.tSellId != null){
            this.recoveryEntrustStatus();
          }
          this.dialogForm = false;
          this.form.assessor = '';
          this.form.opinion = '';
          // this.tableData1.splice(this.currentLandIndex, 1);
          // this.$message({message: '审核完成', type: 'success'})
          //刷新页面
          this.getTransferPlace(this.searchInfo);
        })
      },
      actResult (re) {
        //取消：cancel，流转：success,流转结束：end,审核未通过：failed
        if (re === 'cancel') {
          //取消关闭弹框，不做任何事件
        } else if (re === 'success') {
          //刷新页面
          this.getTransferPlace(this.searchInfo);
        } else if (re === 'failed') {
          //修改状态
          this.setState('failed');
          //刷新页面
          this.getTransferPlace(this.searchInfo);
        } else if (re === 'end') {
          //修改状态
          this.setState('success');
          //刷新页面
          this.getTransferPlace(this.searchInfo);
        }
        this.dialogForm = false;
      },
      examine (obj, index) {
        this.dialogForm = true;

        this.currentLandId = obj.ttiId;
        this.currentLandIndex = index;
        this.actInfo = obj;
        this.tSellId = obj.tSellId;

        this.$nextTick(() => {
          this.$bus.$emit('transferaudit', 'examine'); //需要审核
        })
      },
      view (obj, index) {
        this.dialogForm = true;

        this.currentLandId = obj.ttiId;
        this.currentLandIndex = index;
        this.actInfo = obj;

        this.$nextTick(() => {
          Bus.$emit('transferaudit', 'view'); //需要审核
        })
      },
      downLandInfo (id, index) {
        this.currentLandId = id;
        this.currentLandIndex = index;
        this.dialogDownLand = true;
      },
      examineSure () {
        this.$post('/epf-trade/admin/transtrustinfo/editTrustInfoState', {
          id: this.currentLandId,
          delegationStatus: this.form.assessor
        }).then(res => {
          console.log('审核接口结果', res);

          if (res.code != '0') {
            //失败
            this.$message.error(res.msg);
            return
          }
          this.dialogForm = false;
          this.form.assessor = '';
          this.form.opinion = '';
          this.tableData1.splice(this.currentLandIndex, 1);
          this.$message({
            message: '审核完成',
            type: 'success'
          });
        })
      },
      handleClick (val) {
        if (val.name == this.currentTabs) {
          return
        }
        this.currentTabs = val.name;
        this.tableData1 = [];
        if (this.activeTabs == 'pending') {
          this.getTransferPlace({publishStatus: 'audit'});
        } else if (this.activeTabs == 'processed') {
          this.getTransferPlace({isAuditing: '2'});
        } else {
          this.getTransferPlace({isAuditing: '3'});
        }
      },
      lowerLand () {
        //改变状态
        this.$post('/epf-supply/admin/tsell/editTSellPublishStatus', {
          tSellId: this.currentLandId,
          publishStatus: 'down_mytsell'
        }).then(res => {
          if (res.code != '0') {
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
      rowClickHandle (row, event, column) {
        //需要更改
        console.log('双击行的id', row);
        let title = '查看详细信息';
        let routerPath = '/toEntrustDetail?tgid=' + row.tgId;
        let tabObj = {title, routerPath};
        //将当前点击的选项添加到vuex中
        this.setTabsList(tabObj);
        this.$router.push({
          path: '/toEntrustDetail',
          query: {
            tgId: row.tgId,
            id: row.ttiId,
            num: 1,
            procInsId: row.procInsId
          }
        });
      },
      getFilterData (val) {
        this.searchInfo = val;
        this.getTransferPlace(this.searchInfo);
        // this.un_search = val;
        // this.getMyProvide(this.un_search);
      },
      handleAdd () {
        let title = '新增委托';
        // let routerPath = '/entrustedTradeDetailsAdd';
        let routerPath = '/entrustedForm';
        let tabObj = {title, routerPath};
        this.setTabsList(tabObj);
        this.$router.push({path: routerPath});
      },
      // 提交受理
      submitHadle (id, index, status, goodsNo, trustOrgId) {
        this.$post('/epf-trade/admin/transtrustinfo/editTrustInfoState', {
          id: id,
          delegationStatus: status,
          type:"0"   //点击提交受理需要的更新时间，这里就传入type = 0
        }).then(res => {
          if (res.code != '0') {
            //失败
            this.$message.error(res.msg);
            return
          }
          this.getTransferPlace(this.searchInfo);
          this.$message({
            message: '提交完成',
            type: 'success'
          })
        })
      },
      //当供需地块进行委托交易，被驳回时调用该接口
      recoveryEntrustStatus(){
        this.$post('/epf-supply/admin/tsell/recoveryEntrustStatus', {
            id: this.tSellId,
          }).then(res => {
            if (res.code != '0') {
              //失败
              this.$message.error(res.msg);
              return
            }
          })
      }
    }
  }
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

  .oper .btn:nth-child(2) {
    border: solid 1px #d3d4d6;
    color: #606266;
    background: #fff;
  }

  .default {
    background: #b6b6b6;
    border: 2px solid #cfcfcf;
  }

  .error {
    background: #fd4041;
    border: 2px solid #ff6c6f;
  }

  .success {
    background: #92b62d;
    border: 2px solid #bfd482;
  }

  .dialogBtn_box {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .titleHoverStyle:hover {
    color: #4772d5 !important;
  }

  .handleHover:hover {
    transition: 0.3s;
    color: #4772d5;
  }
</style>
