<template>
    <epf-container title="抵押合同归档详情">
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
                <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
                    <div class="toolsTitleBox">
                        <span class="toolsTitle">合同审核记录列表</span>
                    </div>
                    <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 55 +'px'}">
                        <el-table :data="examineTabData" border style="width: 100%" :height="boxHeight - 120">
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
                        <!-- 分页控件 -->
                        <div class="epf_paging_fixe">
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
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="合同撤销记录" name="revoke">
                <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
                    <div class="toolsTitleBox">
                        <span class="toolsTitle">合同撤销记录列表</span>
                    </div>
                    <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 55 +'px'}">
                        <el-table :data="revokeTabData" border style="width: 100%" :height="boxHeight - 120">
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
                        <!-- 分页控件 -->
                        <div class="epf_paging_fixe">
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
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="鉴证记录" name="record">
                <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
                    <div class="toolsTitleBox">
                        <span class="toolsTitle">鉴证记录列表</span>
                    </div>
                    <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 55 +'px'}">
                        <el-table :data="recordTabData" border style="width: 100%" :height="boxHeight - 120">
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
                        <!-- 分页控件 -->
                        <div class="epf_paging_fixe">
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
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </epf-container>
</template>

<script>
import Axios from "axios";
import qs from "qs";
import transferContractTemplate from "@/pages/admin/contract/contractTemplate/transferContractTemplate";
import rentalContractTemplate from "@/pages/admin/contract/contractTemplate/rentalContractTemplate";
import mortgageContractTemplate from "@/pages/admin/contract/contractTemplate/mortgageContractTemplate";
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
        // 查看合同撤销审核详情页面
        auditResult(contractId, businessId, procDefId, procInsId, taskId) {
            let title = "合同撤销审核详情";
            let ifAudit = "view";
            let routerPath = `/system/contract/transfer/views/record/revoke?contractId=${this.$route.query.contractId}&contractType=${this.$route.query.contractType}&businessId=${businessId}&procDefId=${procDefId}&procInsId=${procInsId}&taskId=${taskId}&auditStateTitle=${title}&ifAudit=${ifAudit}`;
            let item = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath,query: {
                    contractId: this.$route.query.contractId,
                    contractType: this.contractType,
                    businessId: businessId,
                    procDefId: procDefId,
                    procInsId: procInsId,
                    taskId: taskId,
                    auditStateTitle: title,
                    ifAudit: ifAudit
                }});
            this.$store.commit("ADD_TAB", item)
        },
        contractFiling(contractId) {
            let title = "合同鉴证详情";
            let routerPath = `/system/contract/transfer/views/record/recordDetail?contractId=${contractId}&&contractType=${this.$route.query.contractType}&&record=recordDetail`;
            let item = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath,query: {
                    contractId: contractId,
                    contractType: this.contractType,
                    record: "recordDetail"
                }});
            this.$store.commit("ADD_TAB", item)
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
}
</script>

<style>

</style>