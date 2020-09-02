<template>
    <epf-container title="申请退款">
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
                        <button class="epf_btn epf_btn_bg" @click="getBidRefund({realName:filterData.Bidder,targetId:targetId})"> 查 询</button>
                        <button class="epf_btn epf_btn_def" @click="resetFilter"> 重 置</button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}">
            <div class="epf_toolbar">
                <span class="toolsTitle">退款</span>
                <span>标的编号:</span>
                <em>{{targetNo}}</em>
                <span>流转方式:</span>
                <em>{{businessType}}</em>
            </div>
            <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 205 +'px'}">
                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" :height="boxHeight - 270">
                    <el-table-column label="序号" type="index" width="80"></el-table-column>
                    <!-- <el-table-column prop="Bidder" label="标的编号" width="110" align="left"></el-table-column> -->
                    <el-table-column prop="name" label="竞买人" width="190" align="left"></el-table-column>
                    <el-table-column prop="accountNo" label="子账户" width="150" align="left"></el-table-column>
                    <el-table-column  label="金额" width="105" align="left">
                        <template slot-scope="scope">{{scope.row.currencySymbol}}{{scope.row.amountDesc}}</template>
                    </el-table-column>
                    <el-table-column prop="bankDate" label="到账时间" width="200" align="left"></el-table-column>
                    <el-table-column prop="billType" label="类型" width="140" align="left"></el-table-column>
                    <!-- <el-table-column prop="contributors" label="是否使用" width="80" align="left"></el-table-column> -->
                    <el-table-column prop="billFlowDesc" label="状态" width="120" align="left">
                        <!-- <template slot-scope="scope">
                            <span v-if="scope.row.billFlow==1">申请退款 </span>
                            <span v-if="scope.row.billFlow==3">退款成功 </span>
                            <span v-if="scope.row.billFlow==4">已退款 </span>
                        </template>-->
                    </el-table-column>
                    <el-table-column prop="accountName" label="户名" width="170" align="left"></el-table-column>
                    <el-table-column prop="accountNo" label="入款账户" width="130" align="center"></el-table-column>
                    <el-table-column prop="accountBank" label="入款银行" width="190" align="left"></el-table-column>
                    <el-table-column prop="accountBank" label="保证金银行" width="180" align="left"></el-table-column>
                    <el-table-column label="退款时间" width="250" align="left">
                        <template slot-scope="scope">
                        <el-date-picker
                            v-bind:disabled="!(scope.row.billFlow=='bill_status-003')"
                            v-model="scope.row.refundDate"
                            value-format="yyyy-MM-dd"
                            type="datetime"
                            placeholder="选择日期时间"
                        ></el-date-picker>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="120" align="center">
                        <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.billFlow=='bill_status-003'"
                            type="text"
                            size="small"
                            @click="btnClick(scope.row,'APPLY_REFUND')"
                        >申请退款</el-button>
                        <el-button
                            v-if="scope.row.billFlow=='bill_status-005'"
                            type="text"
                            size="small"
                            @click="btnClick(scope.row,'SUCCESS_OPTION')"
                        >退款成功</el-button>
                        <el-button
                            v-if="scope.row.billFlow=='bill_status-006'"
                            disabled
                            type="text"
                            size="small"
                        >已退款</el-button>
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
// import axios from "axios";
// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
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
            tableData: [],
            tableData3: [
                {
                Bidder: "田湘", //竞买人
                person: "苏有朋",
                subaccount: "13327323551", //子账户
                money: "1000元", //金额
                timeToaccount: "2019-05-20 15:30:30", //到账时间
                type: "保证金", //类型
                contributor: "田湘", //缴款人
                use: 1, //是否使用
                cmpetition: 1, //是否竞得人
                state: "待托入托管账户", //状态
                timer: ""
                },
                {
                Bidder: "田湘", //竞买人
                subaccount: "6027002930030134875", //子账户
                money: "1000元", //金额
                timeToaccount: "2019-05-20", //到账时间
                type: "保证金", //类型
                contributor: "田湘", //缴款人
                use: 1, //是否使用
                cmpetition: 1, //是否竞得人
                state: "待托入托管账户" //状态
                },
                {
                Bidder: "田湘", //竞买人
                subaccount: "6027002930030134875", //子账户
                money: "1000元", //金额
                timeToaccount: "2019-05-20", //到账时间
                type: "保证金", //类型
                contributor: "田湘", //缴款人
                use: 1, //是否使用
                cmpetition: 1, //是否竞得人
                state: "待托入托管账户" //状态
                },
                {
                Bidder: "田湘", //竞买人
                subaccount: "6027002930030134875", //子账户
                money: "1000元", //金额
                timeToaccount: "2019-05-20", //到账时间
                type: "保证金", //类型
                contributor: "田湘", //缴款人
                use: 1, //是否使用
                cmpetition: 1, //是否竞得人
                state: "待托入托管账户" //状态
                }
            ],
            multipleSelection: [],
            filterData: {
                Bidder: ""
            }
        };
    },
    created(){
        this.boxHeight = window.innerHeight - 250;
        this.targetId = this.$route.query.targetId;
        this.targetNo = this.$route.query.targetNo;
        this.businessType = this.$route.query.businessType;
        this.myparams = {
            targetId: this.targetId,
            page: this.no_pageNo,
            rows: this.no_pageSize
        };
        this.getBidRefund(this.myparams);
    },
    methods: {
        searchData: function(params) {
            console.log(1);
        },
        resetFilter: function(params) {
            for (let item in this.filterData) {
                this.filterData[item] = "";
            }
        },
        btnClick: async function(val, type) {
            console.log(val);
            let paras = {
                id: val.id,
                option: type,
                targetId: this.$route.query.targetId,
                date: val.refundDate
            };
            const res = await this.$post(
                this.$API.EPF_TRADE.FINANCE.BACK_MONEY,
                paras
            );
            if (res.code == "0") {
                this.$message.success("操作成功"); //失败
                this.getBidRefund({ targetId: this.targetId });
            } else {
                this.$message.error(res.msg); //失败
                return;
            }
        },
        getBidRefund: async function(params) {
            const res = await this.$get(
                this.$API.EPF_TRADE.FINANCE.BACK_LIST,
                params
            );
            if (res.code == "0") {
                this.no_pageNo = res.pager.pageNo;
                this.no_pageSize = res.pager.pageSize;
                this.no_totalPage = res.pager.totalPage;
                this.no_totalRecord = res.pager.totalRecord;
                this.tableData = res.pager.results;
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
            this.getBidRefund(this.searchInfo);
        },
        no_handleCurrentChange(val) {
            //获取当前页
            this.searchInfo["page"] = val;
            this.searchInfo["rows"] = this.no_pageSize;
            this.searchInfo["targetId"] = this.targetId;
            this.getBidRefund(this.searchInfo);
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