<template>
    <epf-container title="销户">
        <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}">
            <div class="epf_toolbar">
                <span class="toolsTitle">销户</span>
                <span>标的编号:</span>
                <em>{{targetNo}}</em>
                <span>流转方式:</span>
                <em>{{businessType}}</em>
            </div>
            <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 205 +'px'}">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    :height="boxHeight - 270"
                    @selection-change="handleSelectionChange"
                    border
                    >
                    <el-table-column prop="name" label="委托人" width="190" align="left"></el-table-column>
                    <el-table-column prop="childAccountNo" label="子账户  " width="190" align="left"></el-table-column>
                    <el-table-column label="金额" width="180" align="left">

                        <template slot-scope="scope">{{scope.row.currencySymbol}}{{scope.row.amount}}</template>
                    </el-table-column>
                    <el-table-column prop="bankBusinessDate" label="日期" width="210" align="left"></el-table-column>
                    <el-table-column prop="billTypeName" label="类型" width="120" align="left"></el-table-column>
                    <el-table-column prop="contributors" label="缴款人" width="210" align="left"></el-table-column>
                    <el-table-column prop="billFlowLabel" label="状态" width="140" align="left"></el-table-column>
                    <el-table-column prop="childAccountFreedLabel" label="使用状态" width="150" align="center"></el-table-column>
                    <el-table-column label="操作" width="90" align="left">
                        <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.childAccountFreed==1"
                            type="text"
                            size="small"
                            @click="btnClick(scope.row,)"
                        >销户</el-button>
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
            myparams:{},
            targetId:'',
            searchInfo:{},
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
        this.targetNo = this.$route.query.targetNo;
        this.businessType = this.$route.query.businessType;
        this.targetId = this.$route.query.targetId;
        this.myparams = {
            targetId: this.targetId,
            page: this.no_pageNo,
            rows: this.no_pageSize
        };
        this.getbidCancellation(this.myparams);
    },
    methods: {
        btnClick(val) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(async () => {
            const res = await this.$get(this.$API.EPF_TRADE.FINANCE.DEST_ACCOUNT,{applyId:val.applyId});
                if(res.code==0){
                    this.$message({
                        type: "success",
                        message: "销户成功!"
                    });
                    this.getbidCancellation(this.myparams);
                }else{
                        this.$message({
                        type: "error",
                        message: "销户失败!"
                    });
                }

            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });
        },
        resetFilter: function(params) {
            for (let item in this.filterData) {
                this.filterData[item] = "";
            }
        },
        getbidCancellation: async function(myParmas) {
            const res = await this.$get(this.$API.EPF_TRADE.FINANCE.TARGET_ID, myParmas);
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
                this.no_pageNo = 1;
            this.searchInfo["page"] = this.no_pageNo;
            this.searchInfo["rows"] = val;
            this.searchInfo["targetId"] = this.targetId;
            this.getbidCancellation(this.searchInfo);
        },
        no_handleCurrentChange(val) {
            //获取当前页
            this.searchInfo["page"] = val;
            this.searchInfo["rows"] = this.no_pageSize;
            this.searchInfo["targetId"] = this.targetId;
            this.getbidCancellation(this.searchInfo);
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