<template>
    <epf-container title="前置资格审核">
        <div class="epf_term_box">
            <el-row>
                <el-col :span="2">
                    <span class="filter_title">标的编号：</span>
                </el-col>
                <el-col :span="3">
                    <el-input v-model="targetNo" size="small" placeholder="请输入"></el-input>
                </el-col>
                <el-col :span="3">
                    <span class="filter_title">保证金缴纳截止时间：</span>
                </el-col>
                <el-col :span="7">
                    <el-date-picker
                    v-model="params.selectDate"
                    style="width:100%;"
                    type="datetimerange"
                    size="small"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="dateChange">
                    </el-date-picker>
                </el-col>
                <el-col :offset="1" :span="4">
                    <button class="epf_btn epf_btn_bg" @click="searchList()"> 查 询</button>
                    <button class="epf_btn epf_btn_def" @click="clearList()"> 重 置</button>
                </el-col>
            </el-row>
        </div>
        <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}">
            <div class="epf_toolbar">
                <span class="toolsTitle">交易前置资格审核</span>
            </div>
            <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 205 +'px'}">
                <el-table
                    ref="preReviewTable"
                    v-loading="loading"
                    :height="boxHeight - 270"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    :data="transTargetData"
                    style="width: 100%;min-height: 160px;"
                    border
                    >
                    <el-table-column prop="targetNo" label="序号" min-width="50">
                        <template slot-scope="scope">
                        <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="targetNo" label="标的编号" min-width="110"></el-table-column>
                    <el-table-column prop="beginPrice" label="起始价(万元)" min-width="100"></el-table-column>
                    <el-table-column prop="transTypeName" label="交易方式" min-width="100"></el-table-column>
                    <el-table-column prop="tradingCenter" label="交易中心" min-width="110"></el-table-column>
                    <el-table-column prop="insertUser" label="经办人" min-width="110"></el-table-column>
                    <el-table-column prop="beginFocusTime" label="挂牌(拍卖)开始时间" min-width="130"></el-table-column>
                    <el-table-column prop="endEarnestTime" label="保证金缴纳截止时间" min-width="130"></el-table-column>
                    <el-table-column label="操作" min-width="80">
                        <template slot-scope="scope">
                        <span class="list-style: none;"  v-for="(button ,index)  in buttons" :key="index">
                        <el-button type="text" v-if="button.resourceId=='tradpre_viewbidding'" @click="toogleExpand(scope.row)">查看申请列表</el-button>
                        </span>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页控件 -->
                <div class="epf_paging_fixe">
                    <el-pagination
                        background
                        layout="total,prev, pager, next,sizes,jumper"
                        :page-sizes="[5,10, 15, 20]"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :total="totalRecord"
                        :current-page="pageNo"
                        :page-size="pageSize"
                    ></el-pagination>
                </div>
            </div>
        </div>
    </epf-container>
</template>
<script>
export default {
    name:'prepose',
    data(){
        return{
            //搜索表单
            params: {
                targetNo: "",
                selectDate:"",
                endEarnestTime1:"",
                endEarnestTime2:"",
            },
            //前置资格审核列表
            transTargetData: [],
            //页码
            pageNo: 1,
            pageSize: 5,
            totalPage: 1,
            totalRecord: 1,
            loading: true,
            //按钮组、主题
            buttons:[],
            targetNo: '',
        }
    },
    created(){
        this.boxHeight = window.innerHeight - 250;
        this.buttons=JSON.parse(localStorage.getItem("tradPreReview"));
        this.getData();
    },
    methods:{
        //请求列表数据
        getData(){
            this.loading = true;
            let params = {}
            params['page'] = this.pageNo;
            params['rows'] = this.pageSize;
            params['targetNo'] = encodeURIComponent(this.targetNo);
            params['endEarnestTime1'] = this.params.endEarnestTime1;
            params['endEarnestTime2'] = this.params.endEarnestTime2;
            this.$get(this.$API.EPF_TRADE.TRADE.BEFORE_LIST,params).then(res=>{

                if(res.code == 0){
                    this.transTargetData = res.pager.results;
                    console.log("11111");
                    console.log(this.transTargetData);
                    this.pageNo = res.pager.pageNo;
                    this.pageSize = res.pager.pageSize;
                    this.totalPage = res.pager.totalPage
                    this.totalRecord = res.pager.totalRecord
                }else{
                    this.$message.error(res.msg)
                }
                this.loading = false;
            });
        },
        //打开申请列表(table展开行)
        toogleExpand(row) {
            let title = "申请列表";
            let routerPath = `/system/trade/trade/views/prepose/audit?id=${row.id}&targetNo=`+targetNo;
            let item = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath,query:{targetId:row.id, targetNo:row.targetNo}});
            this.$store.commit("ADD_TAB", item)
        },
        //清除筛选条件
        clearList() {
            this.pageNo = 1;
            this.targetNo = "";
            this.params.selectDate = "";
            this.params.endEarnestTime1 = "";
            this.params.endEarnestTime2 = "";
            this.getData();
        },
        //搜索
        searchList() {
            this.getData();
        },
        handleSizeChange(val) {
            //每页条数改变时触发
            this.pageNo = 1;
            this.pageSize = val;
            this.getData();
        },
        handleCurrentChange(val) {
            //获取当前页
            this.pageNo = val;
            this.getData();
        },
        //选择保证金缴纳截止时间
        dateChange(val){
            if(val){
                this.params.endEarnestTime1 = val[0]
                this.params.endEarnestTime2 = val[1]
            }
        },
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