<template>
    <epf-container title="履约保证金到账查询">
        <el-tabs v-model="activeTabs" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="保证金" name="pending">
                <div class="epf_term_box">
                    <accountCheckSearch @filterInfo="getFilterData" :typeClose="true" title="委托人" number="地块编号"></accountCheckSearch>
                </div>
                <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}">
                    <div class="epf_toolbar">
                        <span class="toolsTitle">保证金</span>
                    </div>
                    <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 205 +'px'}">
                        <el-table ref="multipleTable" :data="performanceList" style="width: 100%" border :height="boxHeight - 270">
                            <el-table-column label="序号" width="90px" align="center">
                            <template slot-scope="scope">{{scope.$index+1}}</template>
                            </el-table-column>
                            <el-table-column prop="goodsNo" label="地块编号" width="140" align="center"></el-table-column>
                            <el-table-column prop="bidderName" label="委托人" width="240" align="center"></el-table-column>
                            <el-table-column prop="licenseNo" label="委托申请书编号" width="150" align="center"></el-table-column>
                            <el-table-column prop="bidderAccountBankName" label="开户行" align="center"></el-table-column>
                            <el-table-column prop="childAccountNo" label="子账户" align="center"></el-table-column>
                            <el-table-column prop="bidderAccountNo" label="付款账户" width="200" align="center"></el-table-column>
                            <el-table-column prop="bankBusinessDate" label="银行到账时间" width="240" align="center"></el-table-column>
                            <el-table-column prop="amount" label="到账金额" width="200" align="center">
                            <template slot-scope="scope">
                                {{scope.row.currencySymbol}}：{{scope.row.amount}}万元
                            </template>
                            </el-table-column>
                            <el-table-column prop="contributors" label="付款人" width="90" align="center"></el-table-column>
                        </el-table>
                        <!-- 分页控件 -->
                        <div class="epf_paging_fixe">
                            <el-pagination
                                background
                                layout="total,prev, pager, next,sizes,jumper"
                                :page-sizes="[5,10, 15, 20]"
                                :page-size="no_pageSize"
                                @size-change="no_handleSizeChange"
                                @current-change="no_handleCurrentChange"
                                :total="no_totalRecord"
                                :current-page="no_currentPage"
                            ></el-pagination>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="错转款" name="processed">
                <div class="epf_term_box">
                    <accountCheckSearch @filterInfo="getFilterData" title="委托人" number="地块编号"></accountCheckSearch>
                </div>
                <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}">
                    <div class="epf_toolbar">
                        <span class="toolsTitle">错转款</span>
                    </div>
                    <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 205 +'px'}">
                        <el-table ref="multipleTable" :data="performanceList" style="width: 100%" border :height="boxHeight - 270">
                            <el-table-column label="序号" width="90px" align="center">
                            <template slot-scope="scope">{{scope.$index+1}}</template>
                            </el-table-column>
                            <el-table-column prop="goodsNo" label="地块编号" width="140" align="center"></el-table-column>
                            <el-table-column prop="bidderName" label="委托人" width="190" align="center"></el-table-column>
                            <el-table-column prop="licenseNo" label="委托申请书编号" width="145" align="center"></el-table-column>
                            <el-table-column prop="bidderAccountBankName" label="开户行" width="150" align="center"></el-table-column>
                            <el-table-column prop="childAccountNo" label="子账户" width="180" align="center"></el-table-column>
                            <el-table-column prop="bidderAccountNo" label="付款账户" width="165" align="center"></el-table-column>
                            <el-table-column prop="bankBusinessDate" label="银行到账时间" width="190" align="center"></el-table-column>
                            <el-table-column prop="amount" label="到账金额" width="180" align="center">
                            <template slot-scope="scope">
                                {{scope.row.currencySymbol}}：{{scope.row.amount}}元
                            </template>
                            </el-table-column>
                            <el-table-column prop="contributors" label="付款人" width="90" align="center"></el-table-column>
                            <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="handleView(scope.row)">查看详情</el-button>
                            </template>
                            </el-table-column>
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
            </el-tab-pane>
        </el-tabs>
    </epf-container>
</template>
<script>
import accountCheckSearch from "@/components/accountCheckSearch";
export default {
    name:'bidManage',
    components: { accountCheckSearch},
    data(){
        return{
            activeTabs: "pending",
            currentTabs: "pending",
            handleData: "",
            //页码
            currentPage: 1,
            totalPage: 1,
            totalRecord: 1,
            pageNo: 1,
            pageSize: 5,
            no_currentPage: 1,
            no_totalPage: 1,
            no_totalRecord: 1,
            no_pageNo: 1,
            no_pageSize: 5,

            searchInfo: {},
            id: "",
            multipleSelection: [],

            create: false,

            performanceList: []
        }
    },
    created(){
        this.boxHeight = window.innerHeight - 350;
        if (this.create) {
            return null;
        }
        this.create = true;
        this.handleData = this.handle;
        let userToken = sessionStorage.getItem("token");
        this.getList({ token: userToken, publishStatus: "audit" });
    },
    methods: {
        getList(params) {
            params["page"] = params["page"] ? params["page"] : this.pageNo;
            params["rows"] = params["rows"] ? params["rows"] : this.pageSize;
            let userToken = sessionStorage.getItem("token");
            if (this.activeTabs == "pending") {
                params["billType"] = "bill_type-002";
            } else {
                params["billType"] = "bill_type-003";
            }
            this.$get(
                this.$API.EPF_TRADE.FINANCE.FIND_LICENSE,
                params
            ).then(res => {
                if (this.currentTabs == "pending") {
                this.no_pageNo = res.pager.pageNo;
                this.no_pageSize = res.pager.pageSize;
                this.no_totalPage = res.pager.totalPage;
                this.no_totalRecord = res.pager.totalRecord;
                } else {
                this.pageNo = res.pager.pageNo;
                this.pageSize = res.pager.pageSize;
                this.totalPage = res.pager.totalPage;
                this.totalRecord = res.pager.totalRecord;
                }
                this.performanceList = res.pager.results;
            });
        },

        //查看详情
        handleView(item) {
            let title = "错转款详情";
            let routerPath = '/system/trade/finance/views/perAccount/detail';
            let itemObj = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath,query: { applyId: item.applyId }});
            this.$store.commit("ADD_TAB", itemObj)
        },
        handleSizeChange(val) {
            //每页条数改变时触发
            this.searchInfo["page"] = 1;
            this.searchInfo["rows"] = val;
            this.getList(this.searchInfo);
        },
        handleCurrentChange(val) {
            //获取当前页
            this.searchInfo["page"] = val;
            this.searchInfo["rows"] = this.pageSize;
            this.getList(this.searchInfo);
        },
        no_handleSizeChange(val) {
            //每页条数改变时触发
            this.searchInfo["page"] = 1;
            this.searchInfo["rows"] = val;
            this.getList(this.searchInfo);
        },
        no_handleCurrentChange(val) {
            //获取当前页
            this.searchInfo["page"] = val;
            this.searchInfo["rows"] = this.pageSize;
            this.getList(this.searchInfo);
        },
        handleClick(val) {
            if (val.name == this.currentTabs) {
                return;
            }
            this.currentTabs = val.name;
            this.performanceList = [];
            if (this.activeTabs == "pending") {
                let userToken = sessionStorage.getItem("token");
                this.getList({ token: userToken, publishStatus: "audit" });
            } else {
                let userToken = sessionStorage.getItem("token");
                this.getList({ token: userToken, isAuditing: "2" });
            }
        },
        getFilterData(val) {
            console.log(val);
            this.searchInfo = val;
            this.getList(this.searchInfo);
        },

    }
}
</script>