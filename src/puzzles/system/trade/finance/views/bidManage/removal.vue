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
                    <el-table-column prop="name" label="竞买人" width="180" align="left"></el-table-column>
                    <el-table-column prop="accountNo" label="子账户  " width="180" align="left"></el-table-column>
                    <el-table-column label="金额" width="170" align="left">
                        <template slot-scope="scope">{{scope.row.currencySymbol}}{{scope.row.amountDesc}}</template>
                    </el-table-column>
                    <el-table-column prop="bankDate" label="日期" width="170" align="left"></el-table-column>
                    <el-table-column prop="billTypeName" label="类型" width="110" align="left"></el-table-column>
                    <el-table-column prop="contributors" label="缴款人" width="210" align="left"></el-table-column>
                    <el-table-column prop="isGet" label="是否竞得" width="110" align="left"></el-table-column>
                    <el-table-column prop="billFlowDesc" label="状态" width="130" align="left"></el-table-column>
                    <el-table-column prop="isValid" label="使用状态" width="130" align="center">
                        <template slot-scope="scope">
                        <span v-if="scope.row.isValid=='1'">使用中</span>
                        <span v-if="scope.row.isValid=='0'">已销户</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="90" align="left">
                        <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.isValid=='1'"
                            type="text"
                            size="small"
                            @click="btnClick(scope.row,scope.row.billFlowDesc,)"
                        >销户</el-button>
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
    </epf-container>
</template>
<script>
export default {
    name:'bidManage',
    data(){
        return {
            targetNo:'',
            businessType:'',
            searchInfo:{},
            targetData: {},
            no_pageNo: 1,
            no_pageSize: 5,
            no_totalPage: 1,
            no_totalRecord: 1,
            tableData: [],
            tableData3: [
                {
                name: "田湘", //竞买人
                person: "苏有朋",
                accountNo: "13327323551", //子账户
                amountDesc: "1000元", //金额
                bankDate: "2019-05-20 15:30:30", //到账时间
                billType: "保证金", //类型
                contributors: "田湘", //缴款人
                isValid: 1, //是否使用
                isGet: 1, //是否竞得人
                billFlowDesc: "待托入托管账户", //状态
                timer: ""
                },
                {
                name: "田湘", //竞买人
                accountNo: "6027002930030134875", //子账户
                amountDesc: "1000元", //金额
                bankDate: "2019-05-20", //到账时间
                billType: "保证金", //类型
                contributors: "田湘", //缴款人
                isValid: 1, //是否使用
                isGet: 1, //是否竞得人
                billFlowDesc: "待托入主账户" //状态
                },
                {
                name: "田湘", //竞买人
                accountNo: "6027002930030134875", //子账户
                amountDesc: "1000元", //金额
                bankDate: "2019-05-20", //到账时间
                billType: "保证金", //类型
                contributors: "田湘", //缴款人
                isValid: 1, //是否使用
                isGet: 1, //是否竞得人
                billFlowDesc: "已转入托管账户" //状态
                },
                {
                name: "田湘", //竞买人
                accountNo: "6027002930030134875", //子账户
                amountDesc: "1000元", //金额
                bankDate: "2019-05-20", //到账时间
                billType: "保证金", //类型
                contributors: "田湘", //缴款人
                isValid: 0, //是否使用
                isGet: 1, //是否竞得人
                billFlowDesc: "已销户" //状态
                },
                {
                name: "田湘", //竞买人
                accountNo: "6027002930030134875", //子账户
                amountDesc: "1000元", //金额
                bankDate: "2019-05-20", //到账时间
                billType: "保证金", //类型
                contributors: "田湘", //缴款人
                isValid: 1, //是否使用
                isGet: 1, //是否竞得人
                billFlowDesc: "已退款" //状态
                },
                {
                name: "田湘", //竞买人
                accountNo: "6027002930030134875", //子账户
                amountDesc: "1000元", //金额
                bankDate: "2019-05-20", //到账时间
                billType: "保证金", //类型
                contributors: "田湘", //缴款人
                isValid: 1, //是否使用
                isGet: 1, //是否竞得人
                billFlowDesc: "已转入主账户" //状态
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
        this.getbidCancellation({page:this.no_pageNo,rows:this.no_pageSize,targetId: this.$route.query.targetId});
        this.targetNo=this.$route.query.targetNo;
        this.businessType=this.$route.query.businessType
    },
    methods: {
        btnClick(val,valState) {
            // alert(valState)
            // if(valState==="待转入托管账户"||valState==="待转入主账户"){
            //   this.$confirm("是否确定进行销户?", "提示", {
            //     confirmButtonText: "确定",
            //     cancelButtonText: "取消",
            //     type: "warning"
            //   })
            // }
            this.$confirm("是否确定进行销户?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(async () => {
            const res = await this.$get(this.$API.EPF_TRADE.FINANCE.DEST_ACCOUNT,{applyId:val.applyId});
            if(res.code==500){
                this.$message({
                type: "error",
                message: "该子账户下存在入账未处理!"
                });
            }
            if(res.code==0){
                this.$message({
                    type: "success",
                    message: "销户成功!"
                    });
                    this.getbidCancellation({targetId:this.$route.query.targetId});
                }
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });
        },
        handleSelectionChange() {
            console.log(1);
        },
        no_handleSizeChange(val) {
            //每页条数改变时触发
            this.searchInfo["page"] = 1;
            this.searchInfo["rows"] = val;
            this.searchInfo["targetId"]=this.$route.query.targetId
            this.getbidCancellation(this.searchInfo);
        },
        no_handleCurrentChange(val) {
            //获取当前页
            this.searchInfo["page"] = val;
            this.searchInfo["rows"] = this.no_pageSize;
            this.searchInfo["targetId"]=this.$route.query.targetId
            this.getbidCancellation(this.searchInfo);
        },
        searchData: function(params) {
            console.log(1);
        },
        resetFilter: function(params) {
            for (let item in this.filterData) {
                this.filterData[item] = "";
            }
        },
        getbidCancellation: async function(myParams) {
            const res = await this.$get(this.$API.EPF_TRADE.FINANCE.CANCEL_LIST, myParams);
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