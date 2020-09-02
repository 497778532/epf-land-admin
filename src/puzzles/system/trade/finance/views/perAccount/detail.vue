<template>
    <epf-container title="错转款详情">
        <div class="epf_term_box">
            <el-row>
                <el-col :span="2">
                    <span class="filter_title">交款户名：</span>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="params.bidderAccountName" placeholder="请输入交款户名"></el-input>
                </el-col>
                <el-col :span="1.5">
                    <span class="filter_title">交款账号：</span>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="params.bidderAccountNo" placeholder="请输入交款账号"></el-input>
                </el-col>
                <el-col :span="2">
                    <span class="filter_title">交款账户开户行：</span>
                </el-col>
                <el-col :span="6">
                    <el-input v-model="params.bidderAccountBankName" placeholder="请输入交款账户开户行"></el-input>
                </el-col>
                <el-col :span="2">
                    <div class="button_bg" @click="searchList()">查询</div>
                </el-col>
                <el-col :span="2">
                    <div class="button_default" @click="clearList()">重置</div>
                </el-col>
            </el-row>
        </div>
        <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}">
            <div class="epf_toolbar">
                <span class="toolsTitle">错转款详情</span>
            </div>
            <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 205 +'px'}">
                <el-table ref="multipleTable" :data="mistakeList" style="width: 100%" border :height="boxHeight - 270">
                    <el-table-column prop="goodsNo" label="地块编号" width="180" align="center"></el-table-column>
                    <el-table-column prop="childAccountNo" label="收款账户" width="170" align="center"></el-table-column>
                    <el-table-column prop="bidderAccountName" label="交款户名" width="150" align="center"></el-table-column>
                    <el-table-column prop="bidderAccountNo" label="交款账号" width="150" align="center"></el-table-column>
                    <el-table-column prop="bidderAccountBankName" label="交款账户开户行" width="210" align="center"></el-table-column>
                    <el-table-column prop="amount" label="金额" width="210" align="center">
                        <template slot-scope="scope">
                        {{scope.row.currencySymbol}}{{scope.row.amount}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="reason" label="原因" width="110" align="center"></el-table-column>
                    <el-table-column prop="endEarnestTime" label="保证金缴纳截止时间" width="230" align="center"></el-table-column>
                    <el-table-column prop="bankBusinessDate" label="到账时间" align="center"></el-table-column>
                </el-table>
                <!-- 分页控件 -->
                <div class="epf_paging_fixe">
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
            </div>
        </div>
    </epf-container>
</template>
<script>
export default {
    name:'bidManage',
    data(){
        return{
            //搜索表单
            params: {
                bidderAccountName: "",
                bidderAccountNo: "",
                bidderAccountBankName: ""
            },
            //详情数据
            mistakeList: [],
            //页码
            currentPage: 1,
            totalPage: 1,
            totalRecord: 1,
            pageNo: 1,
            pageSize: 5,

            searchInfo: {}
        }
    },
    created(){
        this.boxHeight = window.innerHeight - 250;
        this.getItemData(this.$route.query.applyId);
    },
    methods: {
        //获取错转款的详情数据
        getItemData(val) {
            const that = this;
            const params = this.params;
            let id = this.$route.query.applyId;
            params["page"] = this.searchInfo["page"]; //页码
            params["rows"] = this.searchInfo["rows"]; //每页条数
            this.$get(this.$API.EPF_TRADE.FINANCE.FIND_TRANSFER,{applyId:id},params).then(res => {
                console.log(res);
                that.pageNo = res.pager.pageNo;
                that.pageSize = res.pager.pageSize;
                that.totalPage = res.pager.totalPage;
                that.totalRecord = res.pager.totalRecord;
                that.mistakeList = res.pager.results;
                console.log(that.mistakeList);
            });
        },
        //清除筛选条件
        clearList() {
            (this.params.bidderAccountName = ""),
                (this.params.bidderAccountNo = ""),
                (this.params.bidderAccountBankName = "");
            this.getItemData();
        },
        //搜索
        searchList() {
            this.getItemData();
        },
        handleSizeChange(val) {
            //每页条数改变时触发
            this.searchInfo["page"] = 1;
            this.searchInfo["rows"] = val;
            this.getItemData(this.searchInfo);
        },
        handleCurrentChange(val) {
            //获取当前页
            this.searchInfo["page"] = val;
            this.searchInfo["rows"] = this.pageSize;
            this.getItemData(this.searchInfo);
        }
    },
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