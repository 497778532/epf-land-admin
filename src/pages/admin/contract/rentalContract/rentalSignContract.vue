<template>
  <!-- 出租合同网签 -->
  <div class="page-body">
    <el-tabs v-model="activeTabs" type="border-card" @tab-click="handleClick">
				<!--  
				@name: 封装搜索栏
				@description: 封装搜索栏
				@author: gaojie
				@chageTime:2020-3-5 -->
			<contractFiltrate @filterInfo="getFilterData" ref="contractFiltrate" conkey="sign"></contractFiltrate>
      <el-tab-pane label="待处理" name="pending">
        <div class="switchHeight_box" style="padding-top:0">
          <div class="toolsTitleBox">
            <span class="toolsTitle">合同列表</span>
            <span class="button_export" @click="exportr">导出</span>
          </div>
          <el-table
            :data="tabData1"
            border
            v-loading="loading"
            element-loading-text="数据加载中"
            element-loading-background="rgba(255, 255, 255, 0.9)"
            @row-dblclick="rowClickHandle"
            style="width: 100%"
          >
            <el-table-column prop="number" label="序号" width="50" align="center">
              <template slot-scope="scope">
                <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="code" label="合同编号" width="170" align="left">
              <template slot-scope="scope">
                <span style="text-align:center;cursor:pointer;color: #4772d5;" @click="handleClickDetail(scope.row.contractId)">{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="contractName" label="合同名称" width="240" align="left"></el-table-column>
            <el-table-column prop label="所属行政区域" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.cantonName}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="signType" label="交易方式" width="160" align="left">
              <template slot-scope="scope">
                <span v-if="scope.row.signType=='transaction_mode-001'">委托交易</span>
                <span v-if="scope.row.signType=='transaction_mode-002'">自行交易</span>
              </template>
            </el-table-column>
            <el-table-column prop="insertTime" label="申请时间" width="190" align="left"></el-table-column>
            <el-table-column prop="information" label="关联信息" width="130" align="left">
              <template slot-scope="scope">
                <span
                  class="titleHover"
                  @click="supply(scope.row)"
                  style="text-align:center;cursor:pointer;"
                  v-if="scope.row.relevanceCode=='1'"
                >关联供给信息</span>
                <span
                  class="titleHover"
                  @click="transactions(scope.row)"
                  style="text-align:center;cursor:pointer;"
                  v-if="scope.row.relevanceCode=='2'"
                >关联交易信息</span>
                <span
                  class="titleHover"
                  style="text-align:center;"
                  v-if="scope.row.relevanceCode=='3'"
                >未关联</span>
              </template>
            </el-table-column>
            <el-table-column prop="contractStatus" label="合同状态" width="150" align="left">
              <template slot-scope="scope">
                <div v-if="scope.row.contractStatus == 'contract_status-004'">
                  <div class="default"></div>
                  <span>审核中</span>
                </div>
                <div v-if="scope.row.contractStatus == 'contract_status-003'">
                  <div class="default"></div>
                  <span>合同撤销审核中</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="secondParty" label="申请人" width="150" align="left"></el-table-column>
            <el-table-column label="操作" width="220" align="left" fixed="right">
              <template slot-scope="scope">
                <!-- 审核中 -->
                <el-button
                  size="mini"
                  type="success"
                  plain
                  @click="examine(scope.row.id,scope.row.businessId,scope.row.procDefId,scope.row.procInsId,scope.row.taskId)"
                  v-if="scope.row.contractStatus == 'contract_status-004'"
                >审核</el-button>
                <!-- 撤销审核中 -->
                <el-button
                  size="mini"
                  type="success"
                  plain
                  v-if="scope.row.contractStatus=='contract_status-003'"
                  @click="auditResult(scope.row.id,scope.row.businessId,scope.row.procDefId,scope.row.procInsId,scope.row.taskId,'examine')"
                >审核</el-button>
                <!-- <el-button
                  size="mini"
                  type="primary"
                  plain
                  @click="autoExamine(scope.row.id)"
                  v-if="scope.row.contractStatus=='contract_status-004'"
                >自动核验</el-button>-->
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align:right;margin:8px 0px;">
            <el-pagination
              background
              layout="prev, pager, next,sizes,jumper"
              :page-sizes="[5,10, 15, 20]"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :total="totalRecord"
              :current-page="pageNo"
              :page-size="pageSize"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已处理" name="processed">
        <div class="switchHeight_box" style="padding-top:0">
          <div class="toolsTitleBox">
            <span class="toolsTitle">合同列表</span>
            <span class="button_export" @click="exportr">导出</span>
          </div>
          <el-table
            :data="tabData2"
            border
            v-loading="loading"
            element-loading-text="数据加载中"
            element-loading-background="rgba(255, 255, 255, 0.9)"
            @row-dblclick="rowClickHandle"
            style="width: 100%"
           >
            <el-table-column prop="number" label="序号" width="100" align="center">
              <template slot-scope="scope">
                <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="code" label="合同编号" width="250" align="left">
              <template slot-scope="scope">
                <span style="text-align:center;cursor:pointer;color: #4772d5;" @click="handleClickDetail(scope.row.contractId)">{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="contractName" label="合同名称" width="260" align="left"></el-table-column>
            <el-table-column prop="cantonName" label="所属行政区域" width="200"></el-table-column>
            <el-table-column prop="signType" label="交易方式" width="160" align="left">
              <template slot-scope="scope">
                <span v-if="scope.row.signType=='transaction_mode-001'">委托交易</span>
                <span v-if="scope.row.signType=='transaction_mode-002'">自行交易</span>
              </template>
            </el-table-column>
            <el-table-column prop="insertTime" label="申请时间" width="190" align="left"></el-table-column>
            <el-table-column prop="information" label="关联信息" width="130" align="left">
              <template slot-scope="scope">
                <span
                  class="titleHover"
                  @click="supply(scope.row)"
                  style="text-align:center;cursor:pointer;"
                  v-if="scope.row.relevanceCode=='1'"
                >关联供给信息</span>
                <span
                  class="titleHover"
                  @click="transactions(scope.row)"
                  style="text-align:center;cursor:pointer;"
                  v-if="scope.row.relevanceCode=='2'"
                >关联交易信息</span>
                <span
                  class="titleHover"
                  style="text-align:center;"
                  v-if="scope.row.relevanceCode=='3'"
                >未关联</span>
              </template>
            </el-table-column>
            <el-table-column prop="contractStatus" label="合同状态" width="200" align="left">
              <template slot-scope="scope">
                <div>
                  <div
                    class="success"
                    v-if="(scope.row.contractStatus == 'contract_status-003')||(scope.row.contractStatus == 'contract_status-004')"
                  ></div>
                  <div
                    class="error"
                    v-if="(scope.row.contractStatus == 'contract_status-006')||(scope.row.contractStatus == 'contract_status-007')"
                  ></div>
                  <div class="default" v-if="scope.row.contractStatus == 'contract_status-005'"></div>
                  <span>{{scope.row.contractStatusName}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="secondParty" label="申请人" width="150" align="left"></el-table-column>
            <el-table-column label="操作" width="300" align="left" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini" type="success" plain  @click="viewDetail(scope.row.id,scope.row.procInsId,'rental')">查看详情</el-button>
                <el-button size="mini" type="success" plain  v-if="scope.row.contractStatus=='contract_status-004'" @click="findAudit(scope.row,scope.$index)">查看审核结果</el-button>
                <el-button size="mini" type="success" plain  v-if="scope.row.contractStatus=='contract_status-006'||scope.row.contractStatus=='contract_status-007'" @click="open(scope.row.id)" >归档</el-button>
                <el-button size="mini" type="success" plain  v-if="scope.row.contractStatus=='contract_status-005'" @click="revotrail(scope.row.id)">合同撤销</el-button>
                <el-button size="mini" type="success" plain  v-if="scope.row.contractStatus=='contract_status-003'" @click="auditResult(scope.row.id,scope.row.businessId,scope.row.procDefId,scope.row.procInsId,scope.row.taskId,'view')">查看撤销审核详情</el-button>
                <el-button size="mini" type="success" plain  v-if="scope.row.contractStatus=='contract_status-005'" @click="contractFiling(scope.row.id,scope.row.cantonArea)">合同鉴证</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog :title="title" width="40%" :visible.sync="dialogForm" :append-to-body="true">
            <template>
              <div id="dialog">
                <actDialog :actInfo="actInfo" @patch="actResult" />
              </div>
            </template>
          </el-dialog>
          <div style="text-align:right;margin:8px 0px;">
            <el-pagination
              background
              layout="prev, pager, next,sizes,jumper"
              :page-sizes="[5,10, 15, 20]"
              @size-change="no_handleSizeChange"
              @current-change="no_handleCurrentChange"
              :total="no_totalRecord"
              :current-page="no_pageNo"
              :page-size="no_pageSize"
            ></el-pagination>
          </div>
          <div class="delDialog_box">
            <el-dialog title="提示" :visible.sync="delShow" width="30%" :modal="false">
              <span>合同归档以后，将展示在合同归档管理列表中,是否确认归档？</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="delShow = false">取 消</el-button>
                <el-button type="primary" @click="suredelShow()">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Axios from "axios";
import qs from "qs";

import { mapActions, mapState } from "vuex";
import Bus from "@/utils/bus";
import api from "@/api/";
export default {
  
  data() {
    return {
      title: "审核",
      activeTabs: "pending",
      currentTabs: "pending",
      tabData1: [],
      tabData2: [],
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      no_pageNo: 1,
      no_pageSize: 5,
      no_totalPage: 1,
      no_totalRecord: 1,

      applicant: "",
      loading: false,
      actInfo: {},
      dialogForm: false,
      delShow: false,
      idlist: "",
      //按钮组、主题
      buttons: [],
      CancelToken: "", //axios请求暂停函数
      source: null, //调用对象
      filterData: {
        code: "",
        cantonCode1: "",
        cantonProvinceName: "",
        cantonCode2: "",
        cantonCityName: "",
        cantonCode3: "",
        cantonAreaName: "",
        beginDate: "",
        endDate: "",
        status: "",
        statusName: ""
      }
    };
  },
  created() {
    this.CancelToken = Axios.CancelToken; //请求停止对象
    this.source = this.CancelToken.source();
    this.buttons = JSON.parse(localStorage.getItem("transferSignContract"));
  },
  mounted() {
    this.init("2", this.pageNo, this.pageSize);
  },
  methods: {
    ...mapActions(["setTabsList"]),
    // 获取表格数据
    init(isCheck, pageNo, PageSize, filterData) {
      //出租合同网签请求
      let token = sessionStorage.getItem("token");
      this.loading = true;
      let that = this;
      console.log("发起请求");
      Axios.post(
        "/api/epf-contract/transContract/page",
        qs.stringify({
          token: token,
          page: pageNo,
          rows: PageSize,
          contractType: "rent", //出租暂无数据
          isCheck: isCheck,
          code: filterData ? filterData.code : "",
          cantonCode1: filterData ? filterData.cantonCode1 : "",
          cantonCode2: filterData ? filterData.cantonCode2 : "",
          cantonCode3: filterData ? filterData.cantonCode3 : "",
          beginDate: filterData ? filterData.beginDate : "",
          endDate: filterData ? filterData.endDate : "",
          status: filterData ? filterData.status : ""
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          cancelToken: new this.CancelToken(function executor(c) {
            that.source = c;
          })
        }
      )
        .then(res => {
          console.log("请求结束", res);
          if (res.code == "0" && isCheck == "2") {
            this.tabData1 = res.pager.results;
            this.pageNo = res.pager.pageNo;
            this.pageSize = res.pager.pageSize;
            this.totalPage = res.pager.totalPage;
            this.totalRecord = res.pager.totalRecord;

            this.tabData1.forEach(element => {
              let date = element.userId.split(",");
              this.applicant = date[1];
              element.secondParty = this.applicant;
            });
            this.loading = false;
          } else if (res.code == "0" && isCheck == "1") {
            this.tabData2 = res.pager.results;
            this.no_pageNo = res.pager.pageNo;
            this.no_pageSize = res.pager.pageSize;
            this.no_totalPage = res.pager.totalPage;
            this.no_totalRecord = res.pager.totalRecord;

            this.tabData2.forEach(element => {
              let date = element.userId.split(",");
              this.applicant = date[1];
              element.secondParty = this.applicant;
            });
            this.loading = false;
          }
        })
        .catch(res => {
          this.loading = false;
        });
    },
    handleSizeChange(val) {
      //待处理显示条数
      this.pageSize = val;
      this.init("2", this.pageNo, this.pageSize);
    },
    handleCurrentChange(val) {
      //待处理当前页码
      this.pageNo = val;
      this.init("2", this.pageNo, this.pageSize);
    },
    no_handleSizeChange(val) {
      //已处理显示条数
      this.no_pageSize = val;
      this.init("1", this.no_pageNo, this.no_pageSize);
    },
    no_handleCurrentChange(val) {
      //已处理显示条数
      this.no_pageNo = val;
      this.init("1", this.no_pageNo, this.no_pageSize);
    },
    // 查看详情
    handleClickDetail(contractId){
      this.$bus.$emit("closeTabsItem", "rentalContractTemplate");
      let routerPath = `/rentalContractTemplate?contractId=${contractId}&contractView=1`;
      let title = "合同预览";
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({
        path: "/rentalContractTemplate",
        query: {
          contractId: contractId,
          contractView: 1
        }
      });
    },
    rowClickHandle(row, event, column) {
      console.log("双击行的id", row);
      // let routerPath = '/demandSupplyDetails?supply=' + row.id;
      // let tabObj = {routerPath}
      // //将当前点击的选项添加到vuex中

      // this.setTabsList(tabObj)
      // this.$router.push({path:'/demandSupplyDetails',query:{supply:row.id}})
      // this.tableData1 = [];

      // this.stopFun().then(val => {
      //   //异步操作同步化
      //   this.requestFun();
      // });
    },
    supply(row) {
      let routerPath = '/demandSupplyDetails?supply=' + row.relevanceId;
      let title = '供给详情页'
      let tabObj = {title,routerPath}
      //将当前点击的选项添加到vuex中

      this.setTabsList(tabObj)
      this.$router.push({
        path: "/demandSupplyDetails",
        query: {
          supply:row.relevanceId
        }
      });
    },
    transactions(row) {
      let routerPath = '/toEntrustDetail?tgId=' + row.relevanceId + '&id='+ row.relevanceId ;
      let title = '交易详情页'
      let tabObj = {title,routerPath}
      //将当前点击的选项添加到vuex中

      this.setTabsList(tabObj)
      this.$router.push({
        path: "/toEntrustDetail",
        query: {
          tgId:row.relevanceId,
          id: row.relevanceId
        }
      });
    },
    handleClick(val) {
      if (val.name == this.currentTabs) {
        return;
      }
      this.currentTabs = val.name;
      if (this.activeTabs == "pending") {
        this.init("2", this.pageNo, this.pageSize);
        			this.$refs.contractFiltrate.showStatus('pending')
      } else {
        this.init("1", this.no_pageNo, this.no_pageSize);
        			this.$refs.contractFiltrate.showStatus('processed')
      }
    },
    stopFun() {
      //终止请求函数
      this.source("上一个请求终止");
      return Promise.resolve();
    },
    requestFun(val) {
      //调用请求函数
      if (val.label == "待处理") {
        this.init("2", this.pageNo, this.pageSize);
        return Promise.resolve();
      } else if (val.label == "已处理") {
        this.init("1", this.no_pageNo, this.no_pageSize);
        return Promise.resolve();
      }
    },
    // 合同审核详情页
    examine(id, businessId, procDefId, procInsId, taskId) {
      this.$bus.$emit("closeTabsItem", "rentalContractTemplate");
      let routerPath = `/rentalContractTemplate?contractId=${id}&businessId=${businessId}&procDefId=${procDefId}&procInsId=${procInsId}&taskId=${taskId}`;
      let title = "出租合同审核详情";
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({
        path: "/rentalContractTemplate",
        query: {
          contractId: id,
          businessId: businessId,
          procDefId: procDefId,
          procInsId: procInsId,
          taskId: taskId
        }
      });
    },
    // 合同撤销申请
    revotrail(id) {
      this.$bus.$emit("closeTabsItem", "ContractRevotrailAudit");
      let title = "合同撤销申请";
      let ifAudit = "";
      let routerPath = `/ContractRevotrailAudit?contractId=${id}&contractType=rental&auditStateTitle=${title}&ifAudit=${ifAudit}`;
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({
        path: "/ContractRevotrailAudit",
        query: {
          contractId: id,
          contractType: "rental",
          auditStateTitle: title,
          ifAudit: ifAudit
        }
      });
    },
    // 合同撤销审核页面///查看合同撤销审核详情页面
    auditResult(id, businessId, procDefId, procInsId, taskId, ifAudit) {
      this.$bus.$emit("closeTabsItem", "ContractRevotrailAudit");
      let title = "合同撤销审核详情";
      if (ifAudit == "examine") {
        title = "合同撤销审核";
      } else if (ifAudit == "view") {
        title = "合同撤销审核详情";
      }
      let routerPath = `/ContractRevotrailAudit?contractId=${id}&contractType=rental&businessId=${businessId}&procDefId=${procDefId}&procInsId=${procInsId}&taskId=${taskId}&auditStateTitle=${title}&ifAudit=${ifAudit}`;
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({
        path: "/ContractRevotrailAudit",
        query: {
          contractId: id,
          contractType: "rental",
          businessId: businessId,
          procDefId: procDefId,
          procInsId: procInsId,
          taskId: taskId,
          auditStateTitle: title,
          ifAudit: ifAudit
        }
      });
    },
    // 不动产自动核验
    autoExamine() {
      this.$bus.$emit("closeTabsItem", "leaseImmovables");
      let routerPath = "leaseImmovables";
      let title = "不动产自动核验";
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({ path: "/rentalContract/leaseImmovables" });
    },
    //归档
    open(id) {
      this.idlist = id;
      this.delShow = true;
    },
    suredelShow() {
      this.delShow = false;
      let token = sessionStorage.getItem("token");
      Axios.post(
        "/api/epf-contract/transContract/pigeonhole",
        qs.stringify({ token: token, contractId: this.idlist })
      )
        .then(res => {
          this.$message.success("归档成功");
          this.getFilterData();
        })
        .catch(error => {
          this.$message.error(res.msg);
        });
    },
    //已处理查看详情
    viewDetail(id, procInsId, contract) {
      this.$bus.$emit("closeTabsItem", "filingDetails2");
      let routerPath = `/filingDetails2?contractId=${id}&procInsId=${procInsId}&contractType=${contract}`;
      let title = "出租合同归档详情";
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({
        path: "/filingDetails2",
        query: {
          contractId: id,
          procInsId: procInsId,
          contractType: contract
        }
      });
    },
    contractFiling(id, cantonArea) {
      this.$bus.$emit("closeTabsItem", "contractFiling");
      let routerPath = `/contractFiling?contractId=${id}&&contractType=rental&&record=record&&cantonArea=${cantonArea}`;
      let title = "合同鉴证";
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({
        path: "/contractFiling",
        query: {
          contractId: id,
          contractType: "rental",
          record: "record",
          cantonArea: cantonArea
        }
      });
    },
    findAudit(obj, index) {
      this.title = "查看审核结果";
      this.actInfo = obj;
      this.dialogForm = true;

      this.$nextTick(() => {
        Bus.$emit("transferaudit", "view"); //需要审核
      });
    },
    actResult(re) {
      this.dialogForm = false;
    },
    getFilterData(val) {
      //筛选条件查询方法
      this.filterData = val;
      if (this.currentTabs == "pending") {
        this.init("2", this.pageNo, this.pageSize, val);
      } else {
        this.init("1", this.no_pageNo, this.no_pageSize, val);
      }
    },
    exportr() {
      // 导出
      let token = sessionStorage.getItem("token");
      if (this.currentTabs == "processed") {
        this.isCheck = "1";
      } else {
        this.isCheck = "2";
      }
      window.location.href = `/api/epf-contract/transContract/downContract?token=${token}&isCheck=${this.isCheck}&contractType=lease&status=${this.filterData.status}&code=${this.filterData.code}&beginDate=${this.filterData.beginDate}&endDate=${this.filterData.endDate}&cantonCode1=${this.filterData.cantonCode1}&cantonCode2=${this.filterData.cantonCode2}&cantonCode3=${this.filterData.cantonCode3}`;
    }
  }
};
</script>
<style scoped>
.dialogBtn_box {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.titleHover:hover {
  transition: 0.3s;
  color: #4772d5;
}
</style>




