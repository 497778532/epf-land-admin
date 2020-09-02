<template>
    <epf-container title="后置资格审核">
        <div class="epf_term_box">
            <el-row>
                <el-col :span="2">
                    <span class="filter_title">标的编号</span>
                </el-col>
                <el-col :span="3">
                    <el-input v-model="targetNo" size="small" placeholder="请输入"></el-input>
                </el-col>
                <el-col :span="4">
                    <span class="filter_title">成交时间：</span>
                </el-col>
                <el-col :span="4">
                    <div class="block">
                    <el-date-picker
                        v-model="params.time"
                        type="date"
                        placeholder="选择日期时间"
                        align="right"
                        size="small"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :offset="1" :span="4">
                    <button class="epf_btn epf_btn_bg" @click="searchList()"> 查 询</button>
                    <button class="epf_btn epf_btn_def" @click="clearList()"> 重 置</button>
                </el-col>
            </el-row>
        </div>
        <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}">
            <div class="epf_toolbar">
                <span class="toolsTitle">交易后置资格审核</span>
            </div>
            <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 205 +'px'}">
                <el-table
                    :data="tableData"
                    v-loading="loading"
                    :height="boxHeight - 270"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255, 0.9)"
                    style="width: 100%;"
                    >
                        <el-table-column
                        type="index"
                        :index="1"
                        label="序号"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="targetNo"
                        label="标的编号"
                        width="200">
                        </el-table-column>
                        <el-table-column
                        prop="licenseNo"
                        label="竞买号"
                        width="140">
                        </el-table-column>
                        <el-table-column
                        prop="bidderId"
                        label="竞买人"
                        width="200">
                        </el-table-column>
                        <el-table-column
                        prop="buyType"
                        label="是否联合竞买"
                        width="120">
                        <template slot-scope="scope">
                            <span v-if="(scope.row.buyType==='0')">是</span>
                            <span v-else>否</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="beginPrice"
                        label="起始价（万元）"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="endTransTime"
                        label="成交时间"
                        width="160">
                        </el-table-column>
                        <el-table-column
                        prop="transPrice"
                        label="成交价（万元）"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="statusName"
                        label="审核状态"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="audito"
                        label="审核人"
                        width="120">
                        <template slot-scope="scope">
                        <span v-if="(scope.row.audit_status==='已审核')">{{scope.row.auditor}}</span>
                        </template>
                        </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    width="300">
                    <template slot-scope="scope">
                        <!--判断代办-以办 scope.row.Acts 0 - 代办 ， 1 - 以办-->
                        <span class="list-style: none;"  v-for="(button ,index)  in buttons" :key="index">
                        <el-button @click="handleClick(scope.row.targetNo, scope.row.id,scope.row)" type="text"
                        v-if="(scope.row.status==='license_status-004')&&button.resourceId=='tradsuf_audit'" size="small">审核</el-button>
                        <el-button @click="handleResultClick(scope.row)" type="text"
                        v-if="(scope.row.status==='license_status-005' ||　scope.row.status==='license_status-009')&&button.resourceId=='tradsuf_viewaudit'" size="small">审核结果</el-button>
                        <el-button v-if="button.resourceId=='tradsuf_viewbidding'" @click="openRecord(scope.row.targetNo, scope.row.id)" type="text" size="small">竞价记录</el-button>
                        </span>
                    </template>
                    </el-table-column>
                </el-table>
                <!-- 分页控件 -->
                <div class="epf_paging_fixe">
                    <el-pagination
                        background
                        layout="prev, pager, next,sizes,jumper"
                        :page-sizes="[5,10, 15, 20]"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :total="totalRecord"
                        :current-page="pageNo"
                        :page-size="pageSize"
                        >
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- 弹窗 -->
        <el-dialog title="出价记录" class="peopleInfo" width="60%" :visible.sync="dialogForm" :append-to-body='true'>
            <div class="offerBox">
                <div class="filterBox">
                    <el-row>
                        <el-col :span="2">
                            <span class="filter_title">出价时间：</span>
                        </el-col>
                        <el-col :span="4">
                            <el-date-picker
                                v-model="offerFilter.offerTime"
                                type="datetimerange"
                                size="small"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-col>
                        <el-col :offset="1" :span="4">
                            <button class="epf_btn epf_btn_bg" @click="offer_searchList()"> 查 询</button>
                            <button class="epf_btn epf_btn_def" @click="offer_clearList()"> 重 置</button>
                        </el-col>
                    </el-row>
                </div>
                    <!-- v-loading="offerLoading" -->
                <el-table
                    :data="offerData"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255, 0.9)"
                    border
                    :height="boxHeight - 270"
                    style="width: 100%;margin-top:20px;">
                    <el-table-column label="序号" width="70" >
                    <template slot-scope="scope">
                        {{scope.$index + 1}}
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="licenseNo"
                    label="竞买号">
                    </el-table-column>
                    <el-table-column
                    prop="recorderName"
                    label="竞买人">
                    </el-table-column>
                    <el-table-column
                    prop="price"
                    label="竞买出价（万元）">
                    </el-table-column>
                    <el-table-column
                    prop="offerDate"
                    label="竞价时间">
                    </el-table-column>
                    <el-table-column
                    prop="status"
                    label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == '1'">有效</span>
                        <span v-if="scope.row.status == '2'">成交价</span>
                    </template>
                    </el-table-column>
                </el-table>
                <!-- 分页控件 -->
                <div class="epf_paging_fixe">
                    <el-pagination
                    background
                    layout="prev, pager, next,sizes,jumper"
                    :page-sizes="[5,10, 15, 20]"
                    @size-change="offerSizeChange"
                    @current-change="offerCurrentChange"
                    :total="offer_totalRecord"
                    :current-page="offer_pageNo"
                    :page-size="offer_pageSize"
                    >
                    </el-pagination>
                </div>
            </div>
        </el-dialog>
    </epf-container>
</template>
<script>
export default {
    name:'postpose',
    data(){
        return{
            pickerOptions: { //选择时间
                shortcuts: [{
                text: '今天',
                onClick(picker) {
                    picker.$emit('pick', new Date());
                }
                }, {
                text: '昨天',
                onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                }
                }, {
                text: '一周前',
                onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                }
                }]
            },
            tableData: [], //标的列表
            //后置资格审核
            pageNo: 1, //页码
            pageSize: 5, //显示条数
            totalPage: 1,
            totalRecord: 1,
            params: {   //表单筛选条件
                targetNo: "", //标的编号
                time: "", //时间
                bidderId:"",
            },
            loading:true, //后置资格loading
            offerLoading:true, //竞价记录loading
            recordId:'',//竞价记录标识
            textarea: "",
            //竞价记录弹窗
            dialogForm:false,
            //竞价记录筛选
            offerFilter:{
                offerTime:'',
            },
            //竞价记录数据
            offerData:[],
            //竞价记录分页
            offer_pageNo: 1,
            offer_pageSize: 5,
            offer_totalPage: 1,
            offer_totalRecord: 1,

            //按钮组、主题
            buttons:[],
            targetNo: "",
        }
    },
    created(){
        this.boxHeight = window.innerHeight - 250;
        this.buttons=JSON.parse(localStorage.getItem("tradSufReview"));
        this.queryData({isBinding: "1"});
    },
    mounted() {
        this.queryData();
    },
    methods:{
        queryData(){ //后置资格数据请求
            this.loading = true;
            let params = this.params;
            params['page'] = this.pageNo; //页码
            params['row1'] = this.pageSize; //每页条数
            params['targetNo'] = encodeURIComponent(this.targetNo);//标的编号
            this.$get(this.$API.EPF_TRADE.TRADE.LATER_LIST,params).then(res=>{
                if (res.code == "0") {
                console.log("1111111111",res);
                this.tableData = res.pager.results;
                } else {
                console.log("222222222",res);
                this.$message.error(res.msg); //失败
                return;
                }
                this.loading = false;
            });
        },
        openRecord(val, id){ //打开竞价记录弹窗
            this.offerData = [];
            this.dialogForm = true;
            this.recordId = id;
            this.queryDataOffer(id);
        },
        queryDataOffer(id){ //竞价记录数据请求{mark_number:this.recordId}
            let url = this.$API.EPF_TRADEENGINE.LOG.TRADE_PRICE;
            this.$get(url,{'targetId': id}).then(res=>{
                console.log(res)
                this.offerLoading = false;
                console.log("缺少字段的返回",res.pager.results);
                this.offerData = res.pager.results;
            });
        },
        clearList(){ //后置资格重置筛选条件
            this.targetNo = "";
            this.params.time = "";
            this.pageNo = 1;
            this.queryData();
        },
        searchList(){ //后置资格条件筛选查询按钮
            this.queryData(); //调用后置资格请求
        },
        offer_searchList(){ //竞价记录条件筛选查询按钮
            // this.queryDataOffer();
        },
        offer_clearList(){ //竞价记录重置条件筛选查询按钮
            this.offerFilter.offerTime = '';
            // this.queryDataOffer();
        },
        handleClick(businessId,targetId,row){ //审核页面跳转
            let title = "审核页面";
            let routerPath = '/system/trade/trade/views/postpose/examine?targetId='+targetId;
            let item = {url:routerPath,menuname:title}
            this.$bus.$emit("toExamine",businessId);
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath,query:{targetId:targetId,businessId:row.businessId,id:row.licenseId,taskId:row.taskId,procInsId:row.procInsId,procDefId:row.procDefId}});
            this.$store.commit("ADD_TAB", item)
        },
        handleResultClick(row){ //审核结果跳转
            let title = "审核结果";
            let routerPath = '/system/trade/trade/views/postpose/result';
            let item = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath,query:{targetId:row.id,id:row.licenseId,procInsId:row.procInsId}});
            this.$store.commit("ADD_TAB", item)
        },
        handleCurrentChange(val){ //后置审核表单页码
            this.pageNo = val;
            this.queryData();
        },
        handleSizeChange(val){ //后置审核表单显示条数
            this.pageSize = val;
            this.queryData();
        },
        offerCurrentChange(val){ //竞价记录页码
            this.offer_pageNo = val;
            // this.queryDataOffer();
        },
        offerSizeChange(val){ //竞价记录显示条数
            this.offer_pageSize = val;
            // this.queryDataOffer();
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
    .offerBox{
        width: 100%;
        padding: 15px 25px;
    }
</style>