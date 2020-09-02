<template>
  <div id="home">
    <!-- 顶部信息 -->
    <div id="topTools">
      <!-- 账号信息 -->
      <el-card class="accountInfo" shadow="hover" :body-style="{padding:'0px'}">
        <div slot="header" class="clearfix">
          <span :class="{'tipIconBox':true,'animated':true,'jello':mouseIn}">
            <i class="fa fa-user-circle"></i>
          </span>
          <span style="font-weight:800;font-size:16px;">账号信息</span>

          <span
            class="checkNeedModule"
            style="margin-left:auto;font-size:20px;color:#d2d3d5;cursor: pointer;transition:.3s;"
            @click="showModuleSelect"
          >
            <i class="fa fa-reorder"></i>
          </span>
        </div>
        <div class="topContainer" @mouseenter="mouseIn=true" @mouseleave="mouseIn=false">
          <div class="headImgBox">
            <img class="headImg" :src="imageUrl" width="90px" height="90px" />
          </div>
          <div class="infoTextBox">
            <h3>您好，{{userRealName}}，祝你开心每一天！</h3>
            <div class="btmText">
              <span>{{userInfo.orgName}}</span>
              <span class="lineCut"></span>
              <span class="department">
                <span>
                  <i class="fa fa-user-o" style="color:#5893e0"></i>
                </span>{{userInfo.deptName}}
              </span>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 处理事项信息统计 -->
      <el-card
        class="toDoInfo"
        v-if="indexVisible.indexOf('indexCountVisible')!=-1"
        shadow="hover"
        :body-style="{padding:'0px'}"
      >
        <div slot="header" class="clearfix">
          <span
            :class="{'tipIconBox':true,'animated':true,'rubberBand':mouseIntoDo}"
            style="color:#69cda1;"
          >
            <i class="fa fa-check-circle"></i>
          </span>
          <span style="font-weight:800;font-size:16px;">
            处理事项信息统计
            <span style="font-size:12px;color:rgb(184, 184, 184);">( 单位：项 )</span>
          </span>
          <span style="margin-left:auto;">
            <i
              class="checkNeedModule fa fa-reorder"
              style="font-size:20px;color:#d2d3d5;cursor: pointer;transition:.3s;"
              @click="showCountSelect"
            ></i>
            <i
              class="checkNeedClose fa fa-times"
              style="margin-left:10px;font-size:22px;color:#d2d3d5;cursor: pointer;transition:.3s;"
              @click="closeModule('indexCountVisible')"
            ></i>
          </span>
        </div>
        <div class="topContainer2" @mouseenter="mouseIntoDo=true" @mouseleave="mouseIntoDo=false">
          <div class="toDoItem" v-if="countItems.indexOf('yearDoneTotal')!=-1">
            <div class="toDoTip">年度处理事项</div>
            <div class="toDoCount">{{dolistyear}}</div>
          </div>

          <div class="toDoItem" v-if="countItems.indexOf('weekDoneTotal')!=-1">
            <div class="toDoTip">本周已处理</div>
            <div class="toDoCount">{{dolistweek}}</div>
          </div>

          <div class="toDoItem" v-if="countItems.indexOf('todoTotal')!=-1">
            <div class="toDoTip">剩余待处理</div>
            <div class="toDoCount">{{todoTaskCount}}</div>
          </div>
          <div class="toDoItem" v-if="countItems.indexOf('other')!=-1">
            <div class="toDoTip">其他</div>
            <div class="toDoCount">0</div>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 待办事项 -->
    <el-card
      class="needWork"
      v-if="indexVisible.indexOf('indexTodoVisible')!=-1"
      shadow="hover"
      :body-style="{height:'100%',position: 'absolute',top:'0',paddingTop:'64px',paddingRight:'5px',width:'100%'}"
    >
      <div slot="header" class="clearfix">
        <span
          :class="{'tipIconBox':true,'volume':true,'animated':true,'headShake':mouseInneedWork}"
        >
          <i class="fa fa-volume-up"></i>
        </span>
        <span style="font-weight:800;font-size:16px;">待办事项</span>
        <span class="lineCut" style="margin: 0 20px;"></span>
        <div class="tabsBox">
          <div
            v-if="todoItems.indexOf('supplyTotal')!=-1"
            :class="{'tabItem':true,'tabItemActive':activeName=='supply'}"
            @click="tabsClick('supply')"
          >供需平台 ({{supplyTotalRecord}})</div>
          <div
            v-if="todoItems.indexOf('tradeTotal')!=-1 && showTrade"
            :class="{'tabItem':true,'tabItemActive':activeName=='deal'}"
            @click="tabsClick('deal')"
          >交易系统 ({{tradeTotalRecord}})</div>
          <div
            v-if="todoItems.indexOf('hetongTotal')!=-1"
            :class="{'tabItem':true,'tabItemActive':activeName=='contract'}"
            @click="tabsClick('contract')"
          >合同服务 ({{contractTotalRecord}})</div>
          <div
            v-if="todoItems.indexOf('other')!=-1"
            :class="{'tabItem':true,'tabItemActive':activeName=='other'}"
            @click="tabsClick('other')"
          >其他</div>
        </div>
        <span style="margin-left:auto;">
          <i
            class="checkNeedModule fa fa-reorder"
            style="font-size:20px;color:#d2d3d5;cursor: pointer;transition:.3s;"
            @click="showTodoListSelect"
          ></i>
          <i
            class="checkNeedClose fa fa-times"
            style="margin-left:10px;font-size:22px;color:#d2d3d5;cursor: pointer;transition:.3s;"
            @click="closeModule('indexTodoVisible')"
          ></i>
        </span>
      </div>

      <div
        class="workContainer"
        ref="workContainer"
        @mouseenter="mouseInneedWork=true"
        @mouseleave="mouseInneedWork=false"
      >
        <div
          class="workList"
          v-if="this.activeName == 'supply' && todoItems.indexOf('supplyTotal')!=-1"
        >
          <div class="workItem" v-for="(item,index) in supplyTableData" :key="index">
            <img src="../assets/images/workList.jpg" alt />
            <span class="content">
              <h5>{{item.circulationName}}信息审核- {{item.title}}</h5>
              <p>
                您好，{{item.circulationName}}信息，{{ item.cantonProvinceName }}{{ item.cantonCityName }}{{ item.cantonAreaName }}土地{{item.circulationName}}，需要您进行审核,
                <span
                  style="color:#4472d4;cursor: pointer;"
                  @click="rowClickHandle(item,1)"
                >请点击处理></span>
              </p>
            </span>
            <span class="itemDate">{{item.insertTime}}</span>
          </div>
          <!-- 列表分页 -->
          <div v-show="!loading&&supplyTotalRecord>0" style="text-align:right;margin:22px 0px;">
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :total="supplyTotalRecord"
              :current-page="supplyPageNo"
              :page-size="supplyPageSize"
            ></el-pagination>
          </div>
        </div>

        <div
          class="workList"
          v-if="this.activeName == 'deal' && todoItems.indexOf('tradeTotal')!=-1 && showTrade"
        >
          <div class="workItem" v-for="(item,index) in tradeTableData" :key="index">
            <img src="../assets/images/workList.jpg" alt />
            <span class="content">
              <h5>{{tradeType(item.actType)}}信息审核- {{item.title}}</h5>
              <p>
                您好，{{tradeType(item.actType)}}信息，需要您进行审核,
                <span
                  style="color:#4472d4;cursor: pointer;"
                  @click="rowClickHandleTrade(item)"
                >请点击处理></span>
              </p>
            </span>
            <span class="itemDate">{{item.insertTime}}</span>
          </div>
          <!-- 列表分页 -->
          <div style="text-align:right;margin:22px 0px;" v-show="tradeTotalRecord>0">
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="handleCurrentChangeTrade"
              :total="tradeTotalRecord"
              :current-page="tradePageNo"
              :page-size="tradePageSize"
            ></el-pagination>
          </div>
        </div>



        <div
          class="workList"
          v-if="this.activeName == 'contract' && todoItems.indexOf('hetongTotal')!=-1"
        >
          <div class="workItem" v-for="(item,index) in contractTableData" :key="index">
            <img src="../assets/images/workList.jpg" alt />
            <!-- {{item.contractType}} -->
            <span class="content" v-if="item.contractStatus == 'contract_status-004'">
              <h5>合同网签信息审核- {{item.code}}</h5>
              <p>
                您好，{{item.contractTypeName}}合同需要您进行审核,
                <span
                  style="color:#4472d4;cursor: pointer;"
                  @click="rowClickHandleContract(item,item.contractType,1)"
                >请点击处理></span>
              </p>
            </span>
            <span class="content" v-if="item.contractStatus == 'contract_status-003'">
              <h5>合同撤销信息审核- {{item.code}}</h5>
              <p>
                您好，{{item.contractTypeName}}合同撤销需要您进行审核,
                <span
                  style="color:#4472d4;cursor: pointer;"
                  @click="rowClickHandleContract(item,item.contractType,1)"
                >请点击处理></span>
              </p>
            </span>
            <span class="itemDate">{{item.insertTime}}</span>
          </div>
          <!-- 列表分页 -->
          <div  v-show="!loading&&contractTotalRecord>0" style="text-align:right;margin:22px 0px;">
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="handleCurrentChangecontract"
              :total="contractTotalRecord"
              :current-page="contractPageNo"
              :page-size="contractPageSize"
            ></el-pagination>
          </div>
        </div>
        <div class="workList" v-if="this.activeName == 'other' && todoItems.indexOf('other')!=-1">
          <div>其他</div>
        </div>
      </div>
    </el-card>
    <!-- 待办事项 -->
    <el-card
      class="needWork"
      v-if="indexVisible.indexOf('other')!=-1"
      shadow="hover"
      :body-style="{height:'100%',position: 'absolute',top:'0',paddingTop:'64px',paddingRight:'5px',width:'100%'}"
    >
      <div slot="header" class="clearfix">
        <span
          :class="{'tipIconBox':true,'volume':true,'animated':true,'headShake':mouseInneedWork}"
        >
          <i class="fa fa-volume-up"></i>
        </span>
        <span style="font-weight:800;font-size:16px;">其他</span>

        <span style="margin-left:auto;">
          <i
            class="checkNeedModule fa fa-reorder"
            style="font-size:20px;color:#d2d3d5;cursor: pointer;transition:.3s;"
          ></i>
          <i
            class="checkNeedClose fa fa-times"
            style="margin-left:10px;font-size:22px;color:#d2d3d5;cursor: pointer;transition:.3s;"
            @click="closeModule('other')"
          ></i>
        </span>
      </div>
    </el-card>
    <!--模块显示选择弹窗-->
    <el-dialog title="模块显示设置" :visible.sync="indexModuleVisible" :modal="false">
      <el-checkbox-group v-model="indexVisible" @change="savemodule">
        <el-checkbox label="indexCountVisible" name="type">处理事项统计</el-checkbox>
        <el-checkbox label="indexTodoVisible" name="type">待办事项</el-checkbox>
        <el-checkbox label="other" name="type">其他</el-checkbox>
      </el-checkbox-group>
    </el-dialog>
    <!--统计事项选择弹窗-->
    <el-dialog title="统计项设置" :visible.sync="indexCountVisible" :modal="false">
      <el-checkbox-group v-model="countItems" :min="1" @change="saveCounts">
        <el-checkbox label="yearDoneTotal" name="type">年度处理事项</el-checkbox>
        <el-checkbox label="weekDoneTotal" name="type">本周已处理</el-checkbox>
        <el-checkbox label="todoTotal" name="type">剩余待处理</el-checkbox>
        <el-checkbox label="other" name="type">其他</el-checkbox>
      </el-checkbox-group>
    </el-dialog>
    <!--待办事项选择弹窗-->
    <el-dialog title="待办项设置" :visible.sync="indexTodoListVisible" :modal="false">
      <el-checkbox-group v-model="todoItems" :min="1" @change="savetodoItems">
        <el-checkbox label="supplyTotal" name="type">供需平台</el-checkbox>
        <el-checkbox label="tradeTotal" name="type" v-if="showTrade">交易系统</el-checkbox>
        <el-checkbox label="hetongTotal" name="type">合同服务</el-checkbox>
        <el-checkbox label="other" name="type">其他</el-checkbox>
      </el-checkbox-group>
    </el-dialog>
  </div>
</template>
<script>
import Axios from 'axios'
import qs from 'qs'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      imageUrl: '',
      userRealName: '',
      activeName: 'supply',
      // 页码
      supplyPageNo: 1,
      supplyPageSize: 7,
      supplyTotalPage: 1,
      supplyTotalRecord: 0,
      supplyTableData: [],

      tradePageNo: 1,
      tradePageSize: 5,
      tradeTotalPage: 1,
      tradeTotalRecord: 0,
      tradeTableData: [],
      // 合同网签分页
      contractPageNo: 1,
      contractPageSize: 5,
      contractTotalRecord: 0,
      contractTableData: [],

      mouseIn: false,
      mouseIntoDo: false,
      mouseInneedWork: false,
      loading: false,
      // 弹窗显示
      indexModuleVisible: false,
      indexVisible: [], // 当前显示模块

      indexCountVisible: false,
      countItems: [], // 当前统计选项

      indexTodoListVisible: false,
      todoItems: [], // 当前待办选项
      dolistyear: 0,
      dolistweek: 0,
      todoTaskCount: 0,
      userInfo: {}, //
      showTrade: true
    }
  },
  created () {
    this.getUserInfo()
    this.userRealName = sessionStorage.getItem('userName')
    this.imageUrl = this.getImgUrl(sessionStorage.getItem('iconImg'))
    this.indexVisible = localStorage.getItem('indexVisible')
      ? JSON.parse(localStorage.getItem('indexVisible'))
      : ['indexCountVisible', 'indexTodoVisible']
    // 统计选项
    this.countItems = localStorage.getItem('countItems')
      ? JSON.parse(localStorage.getItem('countItems'))
      : ['yearDoneTotal', 'weekDoneTotal', 'todoTotal']
    // 待办选项
    this.todoItems = localStorage.getItem('todoItems')
      ? JSON.parse(localStorage.getItem('todoItems'))
      : ['supplyTotal', 'tradeTotal', 'hetongTotal']
    this.findItemCount()
    this.getSupplyTodoList({ publishStatus: 'audit' })
    if (this.showTrade) {
      this.getTradeTodoList({})
    }
    this.getContractTodoList()
    this.Processed()
  },
  mounted () {
    this.loading = true
  },
  methods: {
    /**
     * @author Hua.Jeao
     * @see 获取用户信息
     * @date 2019-12-31
     */
    getUserInfo () {
      let that = this
      that.userInfo = {}
      that.$get(that.$API.EPF_ADMIN.USER.INFO).then(res => {
        that.userInfo = res.userInfo
      })
    },
    // 查询已处理事项【传入查询开始时间，查询结束时间,年度-0，周-1】
    Processed () {
      let that = this
      let businessType = []
      businessType.push('sell')
      businessType.push('contract')
      this.$get('/epf-activiti/act/task/actTaskCountByBusinessType', {businessType: encodeURIComponent(JSON.stringify(businessType))}).then(res => {
        that.dolistyear = res.data.annualTaskAccount
        that.dolistweek = res.data.weekTaskAccount
        that.todoTaskCount = res.data.todoTaskAccount
      })
    },
    ...mapActions(['setTabsList']),
    setState (state) {
      var publishStatus = ''
      if (state === 'success') {
        publishStatus = 'published2'
      } else if (state === 'failed') {
        publishStatus = 'audit_failure'
      }
      // 改变状态
      this.$post('/epf-supply/admin/tsell/editTSellPublishStatus', {
        tSellId: this.currentLandId,
        publishStatus: publishStatus
      })
        .then(res => {
          if (res.code != '0') {
            // 失败
            this.$message.error(res.msg)
            return
          }
          // 刷新页面
          this.reload()
        })
        .catch(error => {})
    },
    getImgUrl (id) {
      return '/api/epf-document/document/downloadById?id=' + id
    },
    rowClickHandle (item, event) {
      let title = item.title
      let routerPath =
        '/demandSupplyDetails?supply=' +
        item.id +
        '&actInfo=' +
        qs.stringify({
          businessId: item.businessId,
          taskId: item.taskId,
          procInsId: item.procInsId,
          procDefId: item.procDefId
        })
      let tabObj = { title, routerPath }
      console.log(item)
      // 将当前点击的选项添加到vuex中
      this.setTabsList(tabObj)
      this.$router.push({
        path: '/demandSupplyDetails',
        query: {
          supply: item.id,
          businessId: item.businessId,
          taskId: item.taskId,
          procInsId: item.procInsId,
          procDefId: item.procDefId,
          isExamine: event
        }
      })
    },
    rowClickHandleTrade (item) {
      let title = item.title
      var val = item.actType
      let basePath = '/announcementInfoChangedetail'

      if (val == 'publish') {
        // "公告"
        // basePath = "/announcementInfo";
        basePath = '/announcementInfoChangedetail'
      } else if (val == 'trade') {
        // "委托交易"
        // basePath = "/entrustDetailList";
        basePath = '/toEntrustDetail'
      } else if (val == 'tradPreReview') {
        // "前置资格"
        // basePath = "/frontAudit";
        basePath = '/frontExamine'
      } else if (val == 'tradSufReview') {
        // "后置资格"
        // basePath = '/tradSufReview';
        basePath = '/examine'
      }
      let routerPath = ''

      if (val == 'tradPreReview' || val == 'tradSufReview') {
        // "前置资格"  或者 后置审核

        this.$get('/epf-trade/admin/actTrade/queryTargetId', { id: item.id })
          .then(res => {
            if (res.code != 0) {
              this.$message.error(res.msg)
              return
            }
            var tragetId = res.tragetId

            routerPath =
              basePath +
              '?id=' +
              item.id +
              '&actInfo=' +
              qs.stringify({
                businessId: item.businessId,
                taskId: item.taskId,
                procInsId: item.procInsId,
                procDefId: item.procDefId,
                targetId: tragetId
              })

            let tabObj = { title, routerPath }
            // 将当前点击的选项添加到vuex中
            this.setTabsList(tabObj)

            this.$router.push({
              path: basePath,
              query: {
                id: item.id,
                businessId: item.businessId,
                taskId: item.taskId,
                procInsId: item.procInsId,
                procDefId: item.procDefId,
                targetId: tragetId
              }
            })
          })
          .catch(error => {})
      } else if (val == 'trade') {
        // "委托交易"
        this.$get('/epf-trade/admin/transgoods/queryTgIdByTtid', {
          id: item.id
        })
          .then(res => {
            if (res.code != 0) {
              this.$message.error(res.msg)
              return
            }
            var tragetId = res.tragetId

            routerPath =
              basePath +
              '?id=' +
              item.id +
              '&actInfo=' +
              qs.stringify({
                businessId: item.businessId,
                taskId: item.taskId,
                procInsId: item.procInsId,
                procDefId: item.procDefId,
                tgId: tragetId,
                // 把类型传过去，好做判断用
                actType: item.actType,
                num: 1
              })

            let tabObj = { title, routerPath }
            // 将当前点击的选项添加到vuex中
            this.setTabsList(tabObj)

            this.$router.push({
              path: basePath,
              query: {
                id: item.id,
                businessId: item.businessId,
                taskId: item.taskId,
                procInsId: item.procInsId,
                procDefId: item.procDefId,
                tgId: tragetId,
                // 把类型传过去，好做判断用
                actType: item.actType,
                num: 1
              }
            })
          })
          .catch(error => {})
      } else {
        routerPath =
          basePath +
          '?id=' +
          item.id +
          '&actInfo=' +
          qs.stringify({
            businessId: item.businessId,
            taskId: item.taskId,
            procInsId: item.procInsId,
            procDefId: item.procDefId,
            // 把类型传过去，好做判断用
            actType: item.actType
          })
        let tabObj = { title, routerPath }
        // 将当前点击的选项添加到vuex中
        this.setTabsList(tabObj)

        this.$router.push({
          path: basePath,
          query: {
            id: item.id,
            businessId: item.businessId,
            taskId: item.taskId,
            procInsId: item.procInsId,
            procDefId: item.procDefId,
            // 把类型传过去，好做判断用
            actType: item.actType
          }
        })
      }
    },
    rowClickHandleContract (item, contractTypeClick,event) {
      // 合同审核中
      console.log(item.taskId)
      var path, routerPath, title
      // 合同撤销审核中
      if (item.contractStatus == 'contract_status-004') {
        if (contractTypeClick == 'transfer') {
          path = '/transferContractTemplate'
          routerPath = `/transferContractTemplate?contractId=${item.id}&businessId=${item.businessId}&procDefId=${item.procDefId}&procInsId=${item.procInsId}&taskId=${item.taskId}`
          title = '转让合同审核'
        } else if (contractTypeClick == 'rent') {
          path = '/rentalContractTemplate'
          routerPath = `/rentalContractTemplate?contractId=${item.id}&businessId=${item.businessId}&procDefId=${item.procDefId}&procInsId=${item.procInsId}&taskId=${item.taskId}`
          title = '出租合同审核'
        } else if (contractTypeClick == 'mortgage') {
          path = '/mortgageContractTemplate'
          routerPath = `/mortgageContractTemplate?contractId=${item.id}&businessId=${item.businessId}&procDefId=${item.procDefId}&procInsId=${item.procInsId}&taskId=${item.taskId}`
          title = '抵押合同审核'
        }
        let tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({
          path: path,
          query: {
            contractId: item.id,
            businessId: item.businessId,
            procDefId: item.procDefId,
            procInsId: item.procInsId,
            taskId: item.taskId
          }
        })
      }
      let auditStateTitle = '合同撤销审核详情'
      let ifAudit = 'examine'
      // 合同撤销审核
      if (item.contractStatus == 'contract_status-003') {
        var contractType
        if (contractTypeClick == 'transfer') {
          contractType = 'transfer'
        } else if (contractTypeClick == 'rent') {
          contractType = 'rent'
        } else if (contractTypeClick == 'mortgage') {
          contractType = 'mortgage'
        }
        let routerPath = `/ContractRevotrailAudit?contractId=${item.id}&contractType=${contractType}&businessId=${item.businessId}&procDefId=${item.procDefId}&procInsId=${item.procInsId}&taskId=${item.taskId}&auditStateTitle=${auditStateTitle}&ifAudit=${ifAudit}$isExamine=${event}`
        let title = '合同撤销审核详情'
        let tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({
          path: '/ContractRevotrailAudit',
          query: {
            contractId: item.id,
            contractType: contractType,
            businessId: item.businessId,
            procDefId: item.procDefId,
            procInsId: item.procInsId,
            taskId: item.taskId,
            auditStateTitle: auditStateTitle,
            ifAudit: ifAudit,
            isExamine: event
          }
        })
      }
    },
    getSupplyTodoList (params) {
      // this.loading = true;
      // params['circulation'] = 'transfer'
      params['page'] = params['page'] ? params['page'] : this.supplyPageNo
      params['rows'] = params['rows'] ? params['rows'] : this.supplyPageSize
      let userToken = sessionStorage.getItem('token')
      params['isAuditing'] = '1'

      this.$get('/epf-supply/admin/tsell/getTSellForBack', params)
        .then(res => {
          if (res.code != 0) {
            this.$message.error(res.msg)
            this.loading = false
            return
          }
          this.loading = false
          this.supplyPageNo = res.pager.pageNo
          this.supplyPageSize = res.pager.pageSize
          this.supplyTotalPage = res.pager.totalPage
          this.supplyTotalRecord = res.pager.totalRecord
          this.supplyTableData = res.pager.results
          this.loading = false
          // this.scrollTransiton(this.$refs.workContainer,this.$refs.workContainer.scrollTop,20)
        })
        .catch(error => {})
    },
    getTradeTodoList (params) {
      this.loading = true
      params['page'] = params['page'] ? params['page'] : this.tradePageNo
      params['rows'] = params['rows'] ? params['rows'] : this.tradePageSize
      let userToken = sessionStorage.getItem('token')
      this.$get('/epf-trade/admin/actTrade/getActTradeTodoJSON', params)
        .then(res => {
          console.log(res)
          if (res.code != 0) {
            this.$message.error(res.msg)
            this.loading = false
            return
          }
          this.loading = false
          this.tradePageNo = res.pager.pageNo
          this.tradePageSize = res.pager.pageSize
          this.tradeTotalPage = res.pager.totalPage
          this.tradeTotalRecord = res.pager.totalRecord
          this.tradeTableData = res.pager.results
          // this.loading = false;
        })
        .catch(error => {})
    },
    getContractTodoList (paramss) {
      console.log(paramss)
      this.loading = true
      let userToken = sessionStorage.getItem('token')
      var params = {
        token: userToken,
        page: paramss ? paramss.page : this.contractPageNo,
        rows: paramss ? paramss.rows : this.contractPageSize,
        isCheck: '2'
    }
     
      this.$post('/epf-contract/transContract/page', params).then(res => {
        console.log(res)
        if (res.code != '0') {
          this.$message.error(res.msg)
          this.loading = false
          return
        }
        this.loading = false
        this.contractPageNo = res.pager.pageNo
        this.contractPageSize = res.pager.pageSize
        this.contractTotalRecord = res.pager.totalRecord
        this.contractTableData = res.pager.results
        this.loading = false
      })
    },
    tradeType (val) {
      if (val == 'publish') {
        return '公告'
      } else if (val == 'trade') {
        return '委托交易'
      } else if (val == 'tradPreReview') {
        return '前置资格'
      } else if (val == 'tradSufReview') {
        return '后置资格'
      }
      return ''
    },
    headRun () {},
    tabsClick (active) {
      this.activeName = active
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
    },
    handleCurrentChange (val) {
      this.supplyTableData = []
      this.supplyPageNo = val
      this.getSupplyTodoList({ publishStatus: 'audit' })
    },
    handleCurrentChangeTrade (val) {
      console.log(val)
      // 获取当前页
      var params = {
        page: val,
        rows: this.tradePageSize
      }
      this.getTradeTodoList(params)
    },
    handleCurrentChangecontract (val) {
      console.log(val)
      // // 获取当前页
      var params = {
        page: val,
        rows: this.tradePageSize
      }
      this.getContractTodoList(params)
    },
    // 滚动动画 (滚动容器this.$refs.xxx,需要滚动的值,时间间隔ms)
    scrollTransiton (box, needScroll, time) {
      // 获取当前需要滚动的值
      let that = this
      scrollAnimation(needScroll)

      function scrollAnimation (scroll) {
        // 计算需要移动的距离
        setTimeout(() => {
          scroll = scroll - 10
          if (scroll <= 10) {
            box.scrollTo(0, 0)
          } else {
            box.scrollTo(0, scroll)
            scrollAnimation(scroll)
          }
        }, time)
      }
    },
    showModuleSelect () {
      this.indexModuleVisible = true
    },
    savemodule (data) {
      localStorage.setItem('indexVisible', JSON.stringify(data))
      this.indexVisible = data
    },
    showCountSelect () {
      this.indexCountVisible = true
    },
    saveCounts (data) {
      localStorage.setItem('countItems', JSON.stringify(data))
      this.findItemCount()
      this.countItems = data
    },
    closeModule (str) {
      var list = this.indexVisible
      var index = list.indexOf(str)
      if (index != -1) {
        list.splice(index, 1)
      }
      localStorage.setItem('indexVisible', JSON.stringify(list))
      this.indexVisible = list
    },
    showTodoListSelect () {
      this.indexTodoListVisible = true
    },
    savetodoItems (data) {
      localStorage.setItem('todoItems', JSON.stringify(data))
      this.todoItems = data
    },
    findItemCount () {
      var that = this
      var items = this.countItems
    }
  }
}
</script>

<style type="text/css" scoped>
#home {
  /* background: #f0f5f6; */
  height: 100%;
  padding: 219px 20px 20px;
  box-sizing: border-box;
  position: relative;
}

#topTools {
  display: flex;
  height: 184px;
  position: absolute;
  top: 20px;
  left: 0px;
  width: 100%;
  padding: 0 20px;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.accountInfo {
  width: 35%;
}

.toDoInfo {
  width: 64%;
}

.clearfix {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  z-index: 10;
}

.tipIconBox {
  font-size: 24px;
  color: #f1c70e;
  margin-right: 10px;
}

.infoTextBox {
  margin-left: 20px;
}

.infoTextBox > h3 {
  font-size: 18px;
  margin-bottom: 6px;
}

.infoTextBox .btmText {
  color: rgb(184, 184, 184);
  font-size: 12px;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.lineCut {
  display: inline-block;
  width: 1px;
  height: 18px;
  margin: 0 7px;
  background: rgb(184, 184, 184);
}

.infoTextBox .btmText .department {
  display: inline-block;
  text-align: center;
  /* // width: 60px; */
  height: 17px;
  background: #f6f6f6;
  border-radius: 15px;
  padding: 0 5px;
}

.topContainer,
.topContainer2 {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 130px;
  padding: 20px;
}

.topContainer2 {
  justify-content: space-around;
}

.topContainer3 {
  height: 100%;
  background: red;
}
.headImgBox {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  box-shadow: 0 5px 10px rgb(150, 150, 150);
  overflow: hidden;
  flex-shrink: 0;
}
.headImg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.toDoItem {
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.toDoItem .toDoTip {
  font-size: 14px;
  color: rgb(184, 184, 184);
  margin-bottom: 5px;
}

.toDoItem .toDoCount {
  font-size: 32px;
  color: #4e4e4e;
}

.volume {
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #639edd;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: white;
}

.needWork {
  height: 100%;
  position: relative;
  margin-bottom: 20px;
}

.tabsBox {
  position: absolute;
  top: 0px;
  left: 140px;
  width: 400px;
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.tabItem {
	font-size: 16px;
  display: inline-block;
  padding-top: 2px;
  box-sizing: border-box;
  height: 100%;
  color: #535353;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.tabItemActive {
  color: #fea200;
  border-bottom: 2px solid #fea200;
  font-weight: bold;
}

.workContainer {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-right: 15px;
}

.workList {
  width: 100%;
  min-height: 90px;
}

.workItem {
  width: 100%;
  height: 59px;
  padding-bottom: 20px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: 1px solid rgb(218, 218, 218);
}

.workItem .content {
  margin-left: 15px;
  display: inline-block;
  height: 49px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.workItem .itemDate {
  margin-left: auto;
  line-height: 66px;
  font-size: 12px;
  color: rgb(173, 173, 173);
}

.workItem .content p {
  color: rgb(192, 192, 192);
}

.checkNeedModule:hover {
  color: #629be6 !important;
}

.checkNeedClose:hover {
  color: #f84646 !important;
}
</style>
