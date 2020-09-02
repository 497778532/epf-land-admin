<template>
  <!-- <div>合同归档详情</div> -->
  <div class="page-body" style="margin-top:20px">
    <el-tabs v-model="activeTabs" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="合同详情" name="pending">
        <transferContractTemplate v-if="contractType=='transfer'" :signShow="true"></transferContractTemplate>
        <rentalContractTemplate
          v-if="contractType=='rental'||contractType=='rent'"
          :signShow="true"
        ></rentalContractTemplate>
        <mortgageContractTemplate v-if="contractType=='mortgage'" :signShow="true"></mortgageContractTemplate>
      </el-tab-pane>
      <el-tab-pane label="合同审核记录" name="examine">
        <div class="toolsTitleBox">
          <span class="toolsTitle">合同审核记录列表</span>
        </div>
        <el-table :data="examineTabData" border style="width: 100%">
          <el-table-column prop="number" label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="approvalNo" label="审核批次" width="230" align="left"></el-table-column>
          <el-table-column prop="contractType" label="审核类型" width="180" align="left"></el-table-column>
          <el-table-column prop="userName" label="审核人" width="160" align="left"></el-table-column>
          <el-table-column prop="orgName" label="审核人所属部门" width="230" align="left"></el-table-column>
          <el-table-column prop="result" label="审核结果" width="160" align="left"></el-table-column>
          <el-table-column prop="comment" label="审核意见" width="230" align="left"></el-table-column>
          <el-table-column prop="trialPerson" label="提审人" width="160" align="left"></el-table-column>
          <el-table-column prop="time" label="审核时间" width="230" align="left"></el-table-column>
        </el-table>
        <div style="text-align:right;margin:8px 0px;">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="examine_handleSizeChange"
            @current-change="examine_handleCurrentChange"
            :total="examine_totalRecord"
            :current-page="examine_pageNo"
            :page-size="examine_pageSize"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="合同撤销记录" name="revoke">
        <div class="toolsTitleBox">
          <span class="toolsTitle">合同撤销记录列表</span>
        </div>
        <el-table :data="revokeTabData" border style="width: 100%">
          <el-table-column prop="number" label="序号" width="300" align="left">
            <template slot-scope="scope">
              <span style="text-align:left;cursor:pointer;">{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="撤销申请人" width="280" align="left"></el-table-column>
          <el-table-column prop="tradingInstitutionsName" label="申请人所属部门" width="230" align="left"></el-table-column>
          <el-table-column prop label="撤销详情" align="left">
            <template slot-scope="scope">
              <span
                style="cursor:pointer;color:blue"
                @click="auditResult(scope.row.contractId,scope.row.businessId,scope.row.procDefId,scope.row.procInsId,scope.row.taskId)"
              >查看</span>
            </template>
          </el-table-column>
          <el-table-column prop="result" label="审核结果" width="250" align="left"></el-table-column>
          <el-table-column prop="applyTime" label="申请时间" width="300" align="left"></el-table-column>
        </el-table>
        <div style="text-align:right;margin:8px 0px;">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-chang="revoke_handleSizeChange"
            @current-change="revoke_handleCurrentChange"
            :total="revoke_totalRecord"
            :current-page="revoke_pageNo"
            :page-size="revoke_pageSize"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="鉴证记录" name="record">
        <div class="toolsTitleBox">
          <span class="toolsTitle">鉴证记录列表</span>
        </div>
        <el-table :data="recordTabData" border style="width: 100%">
          <el-table-column prop="number" label="序号" width="50" align="left">
            <template slot-scope="scope">
              <span style="text-align:left;cursor:pointer;">{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="recordName" label="鉴证申请人" width="170" align="left"></el-table-column>
          <el-table-column prop label="鉴证详情" width="100" align="left">
            <template slot-scope="scope">
              <span
                style="text-align:center;cursor:pointer;color:blue"
                @click="contractFiling(scope.row.contractId)"
              >查看</span>
            </template>
          </el-table-column>
          <el-table-column prop="recordMess" label="鉴证说明" width="280" align="left"></el-table-column>
          <el-table-column prop="agent" label="经办人" width="170" align="left"></el-table-column>
          <el-table-column prop="subordinateDepartments" label="经办人所属部门" width="200" align="left"></el-table-column>
          <el-table-column prop="recordingAgency" label="鉴证机构" width="250" align="left"></el-table-column>
          <el-table-column prop="createtime" label="鉴证时间" width="300" align="left"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <div style="text-align:right;margin:8px 0px;">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="record_handleSizeChange"
            @current-change="record_handleCurrentChange"
            :total="record_totalRecord"
            :current-page="record_pageNo"
            :page-size="record_pageSize"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Axios from "axios";
import qs from "qs";
import transferContractTemplate from "@/pages/admin/contract/contractTemplate/transferContractTemplate";
import rentalContractTemplate from "@/pages/admin/contract/contractTemplate/rentalContractTemplate";
import mortgageContractTemplate from "@/pages/admin/contract/contractTemplate/mortgageContractTemplate";
import { mapActions } from "vuex";
import Bus from "@/utils/bus";
export default {
  components: {
    transferContractTemplate,
    rentalContractTemplate,
    mortgageContractTemplate
  },
  data() {
    return {
      activeTabs: "pending",
      currentTabs: "pending",
      // 合同审核记录列表
      examineTabData: [],
      examine_pageNo: 1,
      examine_pageSize: 5,
      examine_totalPage: 1,
      examine_totalRecord: 1,
      // 合同撤销记录列表
      revokeTabData: [],
      revoke_pageNo: 1,
      revoke_pageSize: 5,
      revoke_totalPage: 1,
      revoke_totalRecord: 1,
      // 合同鉴证记录列表
      recordTabData: [],
      record_pageNo: 1,
      record_pageSize: 5,
      record_totalPage: 1,
      record_totalRecord: 1,
      contractType: null
    };
  },
  created() {
    window.scrollTo(0, 0);
    this.contractType = this.$route.query.contractType;
  },
  methods: {
    ...mapActions(["setTabsList"]),
    // 查看合同撤销审核详情页面
    auditResult(contractId, businessId, procDefId, procInsId, taskId) {
      this.$bus.$emit("closeTabsItem", "ContractRevotrailAudit");
      let title = "合同撤销审核详情";
      let ifAudit = "view";
      let routerPath = `/ContractRevotrailAudit?contractId=${this.$route.query.contractId}&contractType=${this.$route.query.contractType}&businessId=${businessId}&procDefId=${procDefId}&procInsId=${procInsId}&taskId=${taskId}&auditStateTitle=${title}&ifAudit=${ifAudit}`;
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({
        path: "/ContractRevotrailAudit",
        query: {
          contractId: this.$route.query.contractId,
          contractType: this.contractType,
          businessId: businessId,
          procDefId: procDefId,
          procInsId: procInsId,
          taskId: taskId,
          auditStateTitle: title,
          ifAudit: ifAudit
        }
      });
    },
    contractFiling(contractId) {
      this.$bus.$emit("closeTabsItem", "contractFiling");
      let routerPath = `/contractFiling?contractId=${contractId}&&contractType=${this.$route.query.contractType}&&record=recordDetail`;
      let title = "合同鉴证详情";
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({
        path: "/contractFiling",
        query: {
          contractId: contractId,
          contractType: this.contractType,
          record: "recordDetail"
        }
      });
    },
    // 合同审核记录
    getexamine() {
      let token = sessionStorage.getItem("token");
      var that = this;
      Axios.post(
        "/api/epf-contract/transContract/selectApproval",
        qs.stringify({
          token: token,
          contranctId: this.$route.query.contractId,
          page: this.examine_pageNo,
          rows: this.examine_pageSize
        })
      ).then(res => {
        if (res.code == "0000") {
          this.examineTabData = res.data.results;
          this.examine_pageNo = res.data.pageNo;
          this.examine_pageSize = res.data.pageSize;
          this.examine_totalPage= res.data.totalPage;
          this.examine_totalRecord= res.data.totalRecord;
        }
      });
    },
    // 合同撤销记录
    getrevokePag() {
      let token = sessionStorage.getItem("token");
      Axios.post(
        "/api/epf-contract/transContract/revokePag",
        qs.stringify({
          token: token,
          contractId: this.$route.query.contractId
        })
      ).then(res => {
        if (res.code == "0000") {
          // 合同
          this.revokeTabData = res.data.results;
          this.revoke_pageNo = res.data.pageNo;
          this.revoke_pageSize = res.data.pageSize;
          this.revoke_totalPage= res.data.totalPage;
          this.revoke_totalRecord= res.data.totalRecord;
        }
      });
    },
    // 鉴证记录
    getrecord() {
      let token = sessionStorage.getItem("token");
      Axios.post(
        "/api/epf-contract/transContract/recordPag",
        qs.stringify({
          token: token,
          contractId: this.$route.query.contractId
        })
      ).then(res => {
        if (res.code == "0000") {
          this.recordTabData = res.data;
          this.record_pageNo = res.data.pageNo;
          this.record_pageSize = res.data.pageSize;
          this.record_totalPage= res.data.totalPage;
          this.record_totalRecord= res.data.totalRecord;
        }
      });
    },
    handleEdit(index, row, btnText) {
      if (btnText === "审核") {
        this.dialogForm = true;
      }
    },
    // 合同审核记录分页
    examine_handleSizeChange(val) {
      this.examine_pageSize = val;
      this.getexamine();
    },
    examine_handleCurrentChange(val) {
      this.examine_pageNo = val;
      this.getexamine();
    },
    // 合同撤销记录
    revoke_handleSizeChange(val) {
      this.examine_pageSize = val;
      this.getrevokePag();
    },
    revoke_handleCurrentChange(val) {
      this.examine_pageNo = val;
      this.getrevokePag();
    },
    // 鉴证记录
    record_handleSizeChange(val) {
      this.examine_pageSize = val;
      this.getrecord();
    },
    record_handleCurrentChange(val) {
      this.examine_pageNo = val;
      this.getrecord();
    },
    handleClick(val, event) {
      console.log("===val=====",val)
      // console.log("===event=====",event)
      if (val.name == this.currentTabs) {
        return;
      }
      this.currentTabs = val.name;
      // getexamine/getrevokePag/getrecord
      if (this.activeTabs == "examine") {
        this.getexamine();
      } else if (this.activeTabs == "revoke") {
        this.getrevokePag();
      } else if (this.activeTabs == "record") {
        this.getrecord();
      }
    }
  },
  mounted() {
    this.getexamine();
    this.getrecord();
    this.getrevokePag();
  }
};
</script>
<style scoped lang="scss">
/deep/ .el-table .cell{
  white-space: normal
}

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
.signatureDetails_warp {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.signatureDetails_left {
  width: 124px;
  height: auto;
  background: #fff;
  /* display: none; */
  display: inline-block;
  position: absolute;
  right: 123px;
}
.signatureDetails_left ul {
  width: 100%;
  height: auto;
}
.signatureDetails_left ul li {
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  border-bottom: solid 1px #f3f3f3;
  text-align: center;
  line-height: 48px;
  color: #646463;
  font-size: 14px;
  cursor: pointer;
}
.signatureDetails_left ul li:hover {
  box-sizing: border-box;
  border-left: 2px solid #ffa000;
  color: #ffa000;
}
.signatureDetails_left ul .liActive {
  box-sizing: border-box;
  border-left: 2px solid #ffa000;
  color: #ffa000;
}
.isFixed {
  position: fixed;
  background-color: #fff;
  top: 104px;
  z-index: 999;
  left: 154px;
  display: block !important;
}
.signatureDetails_list {
  width: 1200px;
  height: auto;
  background: #f9fafc;
  margin: 0 auto;
}
.signatureDetails_cont {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 20px 62px 10px 117px;
}
.signNum {
  width: 100%;
  height: 60px;
}
.signNumCon {
  float: right;
}
.signNumCon p {
  color: #666666;
  font-size: 14px;
  line-height: 30px;
}
.signtitle {
  width: 100%;
  height: auto;
  text-align: center;
  line-height: 50px;
  color: #666666;
  font-size: 26px;
  margin: 30px 0;
}
.signtitle div {
  float: right;
  width: 110px;
  height: 34px;
  border-radius: 0px 17px 17px 0px;
  font-size: 14px;
  line-height: 35px;
  margin-top: 7px;
}
.signtitle div span {
  display: inline-block;
  width: 5px;
  height: 5px;
  background-color: #ffffff;
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;
}
.signtitle .contractCancel {
  background: #ebebeb;
  color: #999999;
}
.signtitle .contractsuccess {
  background: #e7f4bd;
  color: #93b52d;
}
.signtitle .contractnosuccess {
  background: #ffd6d7;
  color: #fe3f45;
}
.signaturelist {
  width: 100%;
  height: auto;
}
.signaturelist .signaturelistcon:nth-of-type(2n) {
  margin-left: 130px;
}
.signaturelist .signaturelistcon {
  width: 420px;
  height: 50px;
  line-height: 44px;
  float: left;
}
.signaturelist .signaturelistcon span {
  color: #fe3f45;
}
.signaturelist .signaturelistcon .signaturelistconTitle {
  display: inline-block;
  width: 120px;
  height: auto;
  border-bottom: none;
  color: #999999;
}
.signaturelist .signaturelistcon .signaturelistdetail {
  width: 292px;
  height: auto;
  display: inline-block;
  box-sizing: border-box;
  border-bottom: solid 2px #f3f3f3;
}
.signlist {
  width: 100%;
  height: auto;
  color: #999999;
  font-size: 14px;
  line-height: 35px;
  margin-top: 70px;
}
.signlist .signlistTi {
  color: #666666;
  font-size: 16px;
  font-weight: bold;
  line-height: 50px;
}
.signlist .signlistwarp {
  width: 870px;
  height: 235px;
  border: solid 1px #979797;
  box-sizing: border-box;
  padding: 40px 68px 10px 119px;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
}
.signlist .signlistwarp .signlistwarpTi {
  width: 340px;
  height: auto;
}
.signlist .signlistwarp .signlistwarpTi span {
  display: inline-block;
  font-size: 12px;
  color: #666666;
  text-align: right;
}
.signlist .signlistwarp .signlistwarptime {
  width: 100%;
  height: auto;
  text-align: right;
}
.signlist .signlistwarp .signlistwarptime span {
  margin-left: 40px;
}
.signlist .signlistenclosure {
  width: 100%;
  height: auto;
}
.signlist .signlistenclosure li {
  line-height: 30px;
  font-size: 14px;
  color: #666666;
  cursor: pointer;
}
.signlist .signlistenclosure li span {
  color: #4671d5;
}
.signlist .contractbook {
  display: inline-block;
  margin-right: 10px;
}
.signlist .contractbookbutton {
  display: inline-block;
  height: 36px;
  background-color: #ffa000;
  border-radius: 2px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  line-height: 36px;
  padding: 0 15px;
}
.signatureDetails_warp .button {
  width: 80px;
  background-color: #ffa000;
  border-radius: 2px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  line-height: 36px;
  display: inline-block;
}
</style>

