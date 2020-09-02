<template>
    <epf-container title="竞买保证金管理">
        <el-tabs v-model="activeTabs" type="border-card" @tab-click="handleClick">
            <div class="epf_term_box">
                <filteringFinancial @filterInfo="getFilterData" :typeClose="true"></filteringFinancial>
            </div>
            <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}">
                <div class="epf_toolbar">
                    <span class="toolsTitle">竞买保证金管理</span>
                    <span class="list-style: none;"  v-for="(button ,index)  in buttons" :key="index">
                        <span class="button_export" @click="xlsExport" v-if="button.resourceId=='bidBond_export'">导出</span>
                    </span>
                </div>
                <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 205 +'px'}">
                    <el-table :data="tableData" border style="width: 100%" :height="boxHeight - 270">
                        <el-table-column label="序号" type="index" width="80"></el-table-column>
                        <el-table-column prop="targetNo" label="标的编号" width="120" align="left"></el-table-column>
                        <el-table-column prop="businessTypeName" label="流转方式" width="110" align="left"></el-table-column>
                        <el-table-column prop="transTypeName" label="交易方式" width="160" align="left"></el-table-column>
                        <el-table-column prop="endApplyTime" label="交易结束时间" width="210" align="left"></el-table-column>
                        <el-table-column prop="statusName" label="状态" width="180" align="left"></el-table-column>
                        <el-table-column prop="noMainCount" label="未转入主账户" width="130" align="center"></el-table-column>
                        <el-table-column prop="noTgCount" label="未转入托管账户" width="120" align="left"></el-table-column>
                        <el-table-column prop="noPaymentBackCount" label="未退款" width="90" align="left"></el-table-column>
                        <el-table-column prop="noCallceCount" label="未销户" width="90" align="left"></el-table-column>
                        <el-table-column fixed="right" label="操作" width="400" align="center">
                            <template slot-scope="scope">
                            <span class="list-style: none;"  v-for="(button ,index)  in buttons" :key="index">
                            <el-button
                                v-if="scope.row.noMainCount!==0&&button.resourceId=='bidBond_main'"
                                type="text"
                                size="small"
                                @click="btnClick(scope.row,'bidShiftToMainAccount')"
                            >转入主账户</el-button>
                            <el-button
                                v-if="scope.row.noTGCount!==0&&button.resourceId=='bidBond_hosting' && scope.row.status !='trans_status-006'"
                                type="text"
                                size="small"
                                @click="btnClick(scope.row,'bidShiftToTrusteeshipAccount')"
                            >转入托管账户</el-button>
                            <el-button
                                v-if="scope.row.noPaymentBackCount!==0&&button.resourceId=='bidBond_refund'"
                                type="text"
                                size="small"
                                @click="btnClick(scope.row,'bidRefund')"
                            >申请退款</el-button>

                            <el-button
                                v-if="scope.row.noCallceCount!==0&&button.resourceId=='bidBond_cancel'"
                                type="text"
                                size="small"
                                @click="btnClick(scope.row,'bidCancellation')"
                            >销户</el-button>
                            </span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页控件 -->
                    <div class="epf_paging_fixe">
                        <el-pagination
                        background
                        layout="prev, pager, next,sizes,jumper"
                        :page-sizes="[5,10,15,20]"
                        @size-change="no_handleSizeChange"
                        @current-change="no_handleCurrentChange"
                        :total="no_totalRecord"
                        :current-page="no_pageNo"
                        :page-size="no_pageSize"
                        ></el-pagination>
                    </div>
                </div>    
            </div>
        </el-tabs>
    </epf-container>
</template>
<script>
import filteringFinancial from "@/components/filteringFinancial";
export default {
    name:'bidManage',
    components: {filteringFinancial},
    data(){
        return{
            href:'/api/epf-trade/finance/downLoadtargetInfo',
            goodNo: {
                targetNo: "",
                businessType: ""
            },
            myParams: {},
            tableData: [],
            page: "1",
            activeTabs: "pending",
            currentTabs: "pending",
            no_pageNo: 1,
            no_pageSize: 5,
            no_totalPage: 1,
            no_totalRecord: 1,
            pageNo: 1,
            pageSize: 2,
            totalPage: 1,
            totalRecord: 1,
            searchInfo: {},
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
            currentLandId: "",
            currentLandIndex: "",
            create: false,
            //按钮组、主题
            buttons:[],
        }
    },
    created(){
        this.boxHeight = window.innerHeight - 300;
        this.buttons=JSON.parse(localStorage.getItem("bidBondAdministration"));
        this.getBidBondAdministration({
            page: this.no_pageNo,
            rows: this.no_pageSize
        });
    },
    methods: {
        xlsExport(){
            //2019-7-31hjy
            debugger;
            var btn = document.createElement("a");
            btn.setAttribute('download', '');// download属性
            btn.setAttribute('href', "/api/epf-trade/finance/XlsExport");// href链接
            btn.click();// 自执行点击事件
        },
        getBidBondAdministration(params) {
            // params["page"] = params["page"] ? params["page"] : this.pageNo;
            // params["rows"] = params["rows"] ? params["rows"] : this.pageSize;
            this.$get(this.$API.EPF_TRADE.FINANCE.BOUND_LIST, params).then(res => {
                if (res.code == "0") {
                this.no_pageNo = res.pager.pageNo;
                this.no_pageSize = res.pager.pageSize;
                this.no_totalRecord = res.pager.totalRecord;
                this.tableData = res.pager.results;
                console.log(this.tableData);
                } else {
                this.$message.error(res.msg); //失败
                return;
                }
                //
                // this.pageNo = res.pager.pageNo;
                // this.pageSize = res.pager.pageSize;
                // this.totalPage = res.pager.totalPage;
                // this.totalRecord = res.pager.totalRecord;
                // this.tableData1 = res.pager.results;
                // console.log(this.tableData1);
            });
        },
        handleEdit(index, row, btnText) {
            if (btnText === "审核") {
                this.dialogForm = true;
            }
        },
        no_handleSizeChange(val) {
            //每页条数改变时触发
            this.searchInfo["page"] = 1;
            this.searchInfo["rows"] = val;
            this.getBidBondAdministration(this.searchInfo);
        },
        no_handleCurrentChange(val) {
            //获取当前页
            this.searchInfo["page"] = val;
            this.searchInfo["rows"] = this.no_pageSize;
            this.getBidBondAdministration(this.searchInfo);
        },
        examine(id, index) {
            this.currentLandId = id;
            this.currentLandIndex = index;
            this.dialogForm = true;
        },
        downLandInfo(id, index) {
            this.currentLandId = id;
            this.currentLandIndex = index;
            this.dialogDownLand = true;
        },
        autoExamine() {},
        handleClick(val) {
            if (val.name == this.currentTabs) {
                return;
            }
            this.currentTabs = val.name;
            this.tableData1 = [];
            if (this.activeTabs == "pending") {
                this.getTransferPlace({ publishStatus: "audit" });
            } else {
                this.getTransferPlace({ isAuditing: "2" });
            }
        },
        //todo
        btnClick(item, oper) {
            var routerPath, title;
            if (oper === "/system/trade/finance/views/bidManage/main") {
                title = "转入主账户"
            }
            if (oper === "/system/trade/finance/views/bidManage/escrow") {
                title = "转入托管账户"
            }
            if (oper === "/system/trade/finance/views/bidManage/refund") {
                title = "申请退款"
            }
            if (oper === "/system/trade/finance/views/bidManage/removal") {
                title = "销户"
            }
            routerPath = oper;
            let itemObj = {url:routerPath,menuname:title}
            this.goodNo.targetNo = item.targetNo;
            this.goodNo.businessType = item.businessType;
            //将当前点击的选项添加到vuex中
            this.$router.push({
                path: routerPath,
                query: {
                targetId: item.id,
                targetNo: item.targetNo,
                // businessType: item.businessType,
                    businessType: item.transTypeName,
                    businessTypeName: item.transTypeName
                }});
            this.$store.commit("ADD_TAB", itemObj)
        },
        lowerLand() {
            //改变状态
            this.$post(this.$API.EPF_TRADE.ENTRUST.EDIT_STATUS, {
                tSellId: this.currentLandId,
                publishStatus: "down_mytsell"
            }).then(res => {
                if (res.msg != "success") {
                //失败
                this.$message.error(res.msg);
                return;
                }
                this.dialogDownLand = false;
                this.tableData1[this.currentLandIndex].publishStatus = "down_mytsell";
                this.tableData1[this.currentLandIndex].publishStatusName = "下架";
                this.$message({
                message: "下架完成",
                type: "success"
                });
            });
        },
        getFilterData(val) {
            this.myParams.businessType = val.businessType || "";
            this.myParams.targetNo = val.targetNo || "";
            this.myParams.transType = val.transType || "";
            this.myParams.beginDealEndTime = val.beginDealEndTime[0] || "";
            this.myParams.endDealEndTime = val.beginDealEndTime[1] || "";
            this.myParams.status = val.status || "";
            this.myParams.transType = val.transType || "";
            this.myParams.page = this.no_pageNo
            this.myParams.rows = this.no_pageSize
            this.href=`/api/epf-trade/finance/downLoadtargetInfo?beginDealEndTime=${this.myParams.beginDealEndTime}&endDealEndTime=${this.myParams.endDealEndTime}&targetNo=${this.myParams.targetNo}&status=${this.myParams.status}&businessType=${this.myParams.businessType}&transType=${this.myParams.transType}`

            this.getBidBondAdministration(this.myParams);
        },
        handleAdd() {
            let title = "新增委托";
            let routerPath = "/system/trade/entrust/views/trade/add";
            let item = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath});
            this.$store.commit("ADD_TAB", item)
        }
    }
}
</script>