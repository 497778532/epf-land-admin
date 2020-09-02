<template>
    <epf-container title="托管账户到账查询">
        <div class="epf_term_box">
            <el-row>
                <el-col :span="2">
                    <span class="filter_title">标的编号：</span>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="targetNo" placeholder="请输入标的编号"></el-input>
                </el-col>
                <el-col :span="2">
                    <span class="filter_title">竞得人：</span>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="params.bidderName" placeholder="请输入竞得人名称"></el-input>
                </el-col>
                <el-col :span="5" style="text-align:right">
                    <button class="epf_btn epf_btn_bg" @click="searchList()"> 查 询</button>
                    <button class="epf_btn epf_btn_def" @click="clearList()"> 重 置</button>
                </el-col>
            </el-row>
        </div>
        <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}">
            <div class="epf_toolbar">
                <span class="toolsTitle">托管账户到账查询</span>
            </div>
            <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 205 +'px'}">
                <el-table ref="multipleTable" :data="accountist" style="width: 100%" border :height="boxHeight - 270">
                    <el-table-column prop="targetNo" label="标的编号" width="175" align="center"></el-table-column>
                    <el-table-column prop="bidderName" label="竞得人" width="200" align="center"></el-table-column>
                    <el-table-column prop="bidderAccountNo" label="付款账号" width="185" align="center"></el-table-column>
                    <el-table-column prop="bidderAccountName" label="付款户名" width="210" align="center"></el-table-column>
                    <el-table-column prop="amount" label="金额" width="160" align="center">
                        <template slot-scope="scope">
                        {{scope.row.currencySymbol}}{{scope.row.amount}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="childAccountNo" label="资金托管账号" width="190" align="center"></el-table-column>
                    <el-table-column prop="bankBusinessDate" label="汇入日期" width="230" align="center"></el-table-column>
                    <el-table-column prop="arrivalTypeLabel" label="类型" width="120" align="center"></el-table-column>
                    <el-table-column prop="contributors" label="交款人" align="center"></el-table-column>
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
            targetNo: "",
            params: {
                targetNo: "",
                bidderName: "",
                page: 1,
                rows: 5
            },
            //托管到账查询列表
            accountList: [],
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
        this.getAccountList();
    },
    mounted() {
        this.getAccountList();
    },
    methods: {
        //获取托管到账查询列表
        getAccountList(val) {
            const that = this;
            const params = this.params;
            params.targetNo =  encodeURIComponent(this.targetNo);
            this.$get(this.$API.EPF_TRADE.FINANCE.FIND_BILL,
                params
            ).then(res => {
                console.log('撒娇都是你凯撒',res);
                if (res.code == "0") {
                that.accountList = res.pager.results;
                // that.pageNo = res.pager.pageNo;
                // that.pageSize = res.pager.pageSize;
                that.totalPage = res.pager.totalPage;
                that.totalRecord = res.pager.totalRecord;
                } else {
                that.$message.error(res.msg); //失败
                return;
                }
            });
        },
        //清除筛选条件
        clearList() {
            this.params.targetNo = "";
            this.params.bidderName = "";
            this.targetNo = "";
            this.getAccountList();
        },
        //搜索列表
        searchList() {
            this.getAccountList();
        },
        handleSizeChange(val) {
            //每页条数改变时触发
            this.params.pageNo = 1;
            this.params.rows = val;
            this.getAccountList();
        },
        handleCurrentChange(val) {
            //获取当前页
            this.params.page = val;
            this.getAccountList();
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