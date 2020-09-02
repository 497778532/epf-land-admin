<template>
    <epf-container title="转入主账户">
        <div class="epf_term_box">
            <el-form ref="filterData" :model="filterData">
                <el-row class="mainAccounts">
                    <el-col :span="2">
                        <span class="filter_title">竞买人 :</span>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item prop="title">
                            <el-input v-model="filterData.Bidder" placeholder="请输入竞买人名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" style="text-align:right">
                        <button class="epf_btn epf_btn_bg" @click="getBidShiftToMainAccount({realName:filterData.Bidder,targetId:targetId})"> 查 询</button>
                        <button class="epf_btn epf_btn_def" @click="resetFilter"> 重 置</button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}">
            <div class="epf_toolbar">
                <span class="toolsTitle">竞买保证金转入主账户</span>
                <span>标的编号:</span>
                <em>{{targetNo}}</em>
                <span>流转方式:</span>
                <em>{{businessTypeName}}</em>
                <div class="oper">
                    <button class="epf_btn epf_btn_bg" @click="more()"> 批量转入</button>
                </div>
            </div>
            <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 205 +'px'}">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    :height="boxHeight - 270"
                    @selection-change="handleSelectionChange"
                    >
                    <el-table-column type="selection" width="55" :selectable="checkboxT"></el-table-column>
                    <el-table-column prop="name" label="竞买人" width="140" align="left"></el-table-column>
                    <el-table-column prop="accountNo" label="子账户" width="230" align="left"></el-table-column>
                    <el-table-column label="金额" width="120" align="left">
                    <template slot-scope="scope">{{scope.row.currencySymbol}}{{scope.row.amountDesc}}</template>
                    </el-table-column>
                    <el-table-column prop="bankDate" label="到账时间" width="160" align="left"></el-table-column>
                    <el-table-column prop="billType" label="类型" width="120" align="left"></el-table-column>
                    <el-table-column prop="contributors" label="缴款人" width="130" align="center"></el-table-column>
                    <el-table-column prop="isValid" label="使用状态" width="110" align="left"></el-table-column>
                    <el-table-column prop="isGet" label="是否竞得人" width="110" align="left"></el-table-column>
                    <el-table-column prop="billFlowDesc" label="状态" width="120" align="left"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="180" align="center">
                        <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.billFlow=='bill_status-001'"
                            type="text"
                            size="small"
                            @click="btnClick(scope.row)"
                        >转入主账户</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页控件 -->
                <div class="epf_paging_fixe">
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
            </div>    
        </div>
    </epf-container>
</template>
<script>
export default {
    name:'bidManage',
    data(){
        return {
            myparams: {},
            targetId: "",
            searchInfo: {},
            no_pageNo: 1,
            no_pageSize: 5,
            no_totalPage: 1,
            no_totalRecord: 1,
            targetNo: "",
            businessType: "",
            myids: "",
            tableData: [],
            multipleSelection: [],
            filterData: {
                Bidder: ""
            },
            businessTypeName:''
        };
    },
    created(){
        this.boxHeight = window.innerHeight - 250;
        this.targetId = this.$route.query.targetId;
        this.targetNo = this.$route.query.targetNo;
        this.businessType = this.$route.query.businessType;
        this.businessTypeName = this.$route.query.businessTypeName;
        this.myparams = {
        targetId: this.$route.query.targetId,
        realName: this.filterData.Bidder,
        page: this.no_pageNo,
        rows: this.no_pageSize
        };
        this.getBidShiftToMainAccount(this.myparams);
    },
    methods: {
        checkboxT(row, index) {
            if (row.billFlow == "bill_status-001") {
                return 1;
            } else {
                return 0;
            }
        },
        more: function() {
            this.overTo(this.ids);
        },
        overTo: async function(myid) {
            const res = await this.$get(this.$API.EPF_TRADE.FINANCE.MAIN_ACCOUNT, {
                targetId: this.$route.query.targetId,
                ids: myid
            });
            if (res.code == "0") {
                this.$message.success("转入主账户成功");
                this.getBidShiftToMainAccount(this.myparams);
            } else {
                this.$message.error(res.msg); //失败
                return;
            }
        },
        getIDs: function(array) {
            var ids = "";
            for (var i = 0; i < array.length; i++) {
                ids += array[i].id;
                if (i != array.length - 1) {
                ids += ",";
                }
            }
            return ids;
        },
        resetFilter: function(params) {
            for (let item in this.filterData) {
                this.filterData[item] = "";
            }
        },
        btnClick: async function(val) {
            this.overTo(val.id);
        },
        handleSelectionChange(val) {
            this.ids = this.getIDs(val);
        },
        getBidShiftToMainAccount: async function(myparams) {
            const res = await this.$get(this.$API.EPF_TRADE.FINANCE.MAIN_LIST, myparams);
            if (res.code == "0") {
                this.no_pageNo = res.pager.pageNo;
                this.no_pageSize = res.pager.pageSize;
                this.no_totalPage = res.pager.totalPage;
                this.no_totalRecord = res.pager.totalRecord;
                this.tableData = res.pager.results;
                console.log(this.tableData);
            } else {
                this.$message.error(res.msg); //失败
                return;
        }
        },
        no_handleSizeChange(val) {
            //每页条数改变时触发
            this.searchInfo["page"] = 1;
            this.searchInfo["rows"] = val;
            this.searchInfo["targetId"] = this.targetId;
            this.getBidShiftToMainAccount(this.searchInfo);
        },
        no_handleCurrentChange(val) {
            //获取当前页
            this.searchInfo["page"] = val;
            this.searchInfo["rows"] = this.no_pageSize;
            this.searchInfo["targetId"] = this.targetId;
            this.getBidShiftToMainAccount(this.searchInfo);
        }
    }
}
</script>
<style scoped>
    .filter_title {
        display: inline-block;
        box-sizing: border-box;
        width: 100%;
        height: 34px;
        padding-right: 10px;
        text-align: right;
        line-height: 34px;
    }
</style>