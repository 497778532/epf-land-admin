<template>
    <epf-container title="出租合同网签列表">
        <el-tabs v-model="activeTabs" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="待处理" name="pending">
                <div class="epf_term_box">
                    <contractFiltrate @filterInfo="getFilterData" :dictionary="dictionary"></contractFiltrate>
                </div>
                <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}">
                    <div class="toolsTitleBox">
                        <span class="toolsTitle">合同列表</span>
                        <span class="button_export" @click="exportr">导出</span>
                    </div>
                    <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 205 +'px'}">
                        <el-table
                            :data="tabData1"
                            border
                            :height="boxHeight - 270"
                            v-loading="loading"
                            element-loading-text="数据加载中"
                            element-loading-background="rgba(255, 255, 255, 0.9)"
                            @row-dblclick="rowClickHandle"
                            style="width: 100%"
                            >
                            <el-table-column prop="number" label="序号" width="50" align="center">
                            <template slot-scope="scope">
                                <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column prop="code" label="合同编号" width="170" align="left">
                            <template slot-scope="scope">
                                <span style="text-align:center;cursor:pointer;color: #4772d5;" @click="handleClickDetail(scope.row.contractId)">{{ scope.row.code }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column prop="contractName" label="合同名称" width="240" align="left"></el-table-column>
                            <el-table-column prop label="所属行政区域" width="200">
                            <template slot-scope="scope">
                                <span>{{scope.row.cantonName}}</span>
                            </template>
                            </el-table-column>
                            <el-table-column prop="signType" label="交易方式" width="160" align="left">
                            <template slot-scope="scope">
                                <span v-if="scope.row.signType=='transaction_mode-001'">委托交易</span>
                                <span v-if="scope.row.signType=='transaction_mode-002'">自行交易</span>
                            </template>
                            </el-table-column>
                            <el-table-column prop="insertTime" label="申请时间" width="190" align="left"></el-table-column>
                            <el-table-column prop="information" label="关联信息" width="130" align="left">
                            <template slot-scope="scope">
                                <span
                                class="titleHover"
                                @click="rowClickHandle(scope.row)"
                                style="text-align:center;cursor:pointer;"
                                v-if="scope.row.relevanceCode=='1'"
                                >关联供给信息</span>
                                <span
                                class="titleHover"
                                @click="rowClickHandle(scope.row)"
                                style="text-align:center;cursor:pointer;"
                                v-if="scope.row.relevanceCode=='2'"
                                >关联交易信息</span>
                                <span
                                class="titleHover"
                                style="text-align:center;"
                                v-if="scope.row.relevanceCode=='3'"
                                >未关联</span>
                            </template>
                            </el-table-column>
                            <el-table-column prop="contractStatus" label="合同状态" width="150" align="left">
                            <template slot-scope="scope">
                                <div v-if="scope.row.contractStatus == 'contract_status-004'">
                                <div class="default"></div>
                                <span>审核中</span>
                                </div>
                                <div v-if="scope.row.contractStatus == 'contract_status-003'">
                                <div class="default"></div>
                                <span>合同撤销审核中</span>
                                </div>
                            </template>
                            </el-table-column>
                            <el-table-column prop="secondParty" label="申请人" width="150" align="left"></el-table-column>
                            <el-table-column label="操作" width="220" align="left" fixed="right">
                            <template slot-scope="scope">
                                <!-- 审核中 -->
                                <el-button
                                size="mini"
                                type="success"
                                plain
                                @click="examine(scope.row.id,scope.row.businessId,scope.row.procDefId,scope.row.procInsId,scope.row.taskId)"
                                v-if="scope.row.contractStatus == 'contract_status-004'"
                                >审核</el-button>
                                <!-- 撤销审核中 -->
                                <el-button
                                size="mini"
                                type="success"
                                plain
                                v-if="scope.row.contractStatus=='contract_status-003'"
                                @click="auditResult(scope.row.id,scope.row.businessId,scope.row.procDefId,scope.row.procInsId,scope.row.taskId,'examine')"
                                >审核</el-button>
                                <!-- <el-button
                                size="mini"
                                type="primary"
                                plain
                                @click="autoExamine(scope.row.id)"
                                v-if="scope.row.contractStatus=='contract_status-004'"
                                >自动核验</el-button>-->
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>
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
                        ></el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="已处理" name="processed">
                <div class="epf_term_box">
                    <contractFiltrate @filterInfo="getFilterData" :dictionary="dictionary"></contractFiltrate>
                </div>
                <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}">
                    <div class="toolsTitleBox">
                        <span class="toolsTitle">合同列表</span>
                        <span class="button_export" @click="exportr">导出</span>
                    </div>
                    <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 205 +'px'}">
                        <el-table
                            :data="tabData2"
                            border
                            :height="boxHeight - 270"
                            v-loading="loading"
                            element-loading-text="数据加载中"
                            element-loading-background="rgba(255, 255, 255, 0.9)"
                            @row-dblclick="rowClickHandle"
                            style="width: 100%"
                            >
                            <el-table-column prop="number" label="序号" width="100" align="center">
                            <template slot-scope="scope">
                                <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column prop="code" label="合同编号" width="250" align="left">
                            <template slot-scope="scope">
                                <span style="text-align:center;cursor:pointer;color: #4772d5;" @click="handleClickDetail(scope.row.contractId)">{{ scope.row.code }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column prop="contractName" label="合同名称" width="260" align="left"></el-table-column>
                            <el-table-column prop="cantonName" label="所属行政区域" width="200"></el-table-column>
                            <el-table-column prop="signType" label="交易方式" width="160" align="left">
                            <template slot-scope="scope">
                                <span v-if="scope.row.signType=='transaction_mode-001'">委托交易</span>
                                <span v-if="scope.row.signType=='transaction_mode-002'">自行交易</span>
                            </template>
                            </el-table-column>
                            <el-table-column prop="insertTime" label="申请时间" width="190" align="left"></el-table-column>
                            <el-table-column prop="information" label="关联信息" width="130" align="left">
                            <template slot-scope="scope">
                                <span
                                class="titleHover"
                                @click="rowClickHandle(scope.row)"
                                style="text-align:center;cursor:pointer;"
                                v-if="scope.row.relevanceCode=='1'"
                                >关联供给信息</span>
                                <span
                                class="titleHover"
                                @click="rowClickHandle(scope.row)"
                                style="text-align:center;cursor:pointer;"
                                v-if="scope.row.relevanceCode=='2'"
                                >关联交易信息</span>
                                <span
                                class="titleHover"
                                style="text-align:center;"
                                v-if="scope.row.relevanceCode=='3'"
                                >未关联</span>
                            </template>
                            </el-table-column>
                            <el-table-column prop="contractStatus" label="合同状态" width="200" align="left">
                            <template slot-scope="scope">
                                <div>
                                <div
                                    class="success"
                                    v-if="(scope.row.contractStatus == 'contract_status-003')||(scope.row.contractStatus == 'contract_status-004')"
                                ></div>
                                <div
                                    class="error"
                                    v-if="(scope.row.contractStatus == 'contract_status-006')||(scope.row.contractStatus == 'contract_status-007')"
                                ></div>
                                <div class="default" v-if="scope.row.contractStatus == 'contract_status-005'"></div>
                                <span>{{scope.row.contractStatusName}}</span>
                                </div>
                            </template>
                            </el-table-column>
                            <el-table-column prop="secondParty" label="申请人" width="150" align="left"></el-table-column>
                            <el-table-column label="操作" width="300" align="left" fixed="right">
                            <template slot-scope="scope">
                                <el-button size="mini" type="success" plain  @click="viewDetail(scope.row.id,scope.row.procInsId,'rental')">查看详情</el-button>
                                <el-button size="mini" type="success" plain  v-if="scope.row.contractStatus=='contract_status-004'" @click="findAudit(scope.row,scope.$index)">查看审核结果</el-button>
                                <el-button size="mini" type="success" plain  v-if="scope.row.contractStatus=='contract_status-006'||scope.row.contractStatus=='contract_status-007'" @click="open(scope.row.id)" >归档</el-button>
                                <el-button size="mini" type="success" plain  v-if="scope.row.contractStatus=='contract_status-005'" @click="revotrail(scope.row.id)">合同撤销</el-button>
                                <el-button size="mini" type="success" plain  v-if="scope.row.contractStatus=='contract_status-003'" @click="auditResult(scope.row.id,scope.row.businessId,scope.row.procDefId,scope.row.procInsId,scope.row.taskId,'view')">查看撤销审核详情</el-button>
                                <el-button size="mini" type="success" plain  v-if="scope.row.contractStatus=='contract_status-005'" @click="contractFiling(scope.row.id,scope.row.cantonArea)">合同鉴证</el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                        <el-dialog :title="title" width="40%" :visible.sync="dialogForm" :append-to-body="true">
                            <template>
                            <div id="dialog">
                                <actDialog :actInfo="actInfo" @patch="actResult" />
                            </div>
                            </template>
                        </el-dialog>
                    </div>
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
                    <div class="delDialog_box">
                        <el-dialog title="提示" :visible.sync="delShow" width="30%">
                            <span>合同归档以后，将展示在合同归档管理列表中,是否确认归档？</span>
                            <span slot="footer" class="dialog-footer">
                            <el-button @click="delShow = false">取 消</el-button>
                            <el-button type="primary" @click="suredelShow()">确 定</el-button>
                            </span>
                        </el-dialog>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </epf-container>
</template>

<script>
import Axios from "axios";
import qs from "qs";

import api from "../../../../../../api/";
export default {
    data() {
        return {
            title: "审核",
            activeTabs: "pending",
            currentTabs: "pending",
            tabData1: [],
            tabData2: [],
            pageNo: 1,
            pageSize: 5,
            totalPage: 1,
            totalRecord: 1,
            no_pageNo: 1,
            no_pageSize: 5,
            no_totalPage: 1,
            no_totalRecord: 1,

            applicant: "",
            loading: false,
            actInfo: {},
            dialogForm: false,
            delShow: false,
            idlist: "",
            //按钮组、主题
            buttons: [],
            CancelToken: "", //axios请求暂停函数
            source: null, //调用对象

            dicRequest: [
                "purchasr_status",
                "purchasr_demand"
            ], //字典码请求
            dictionary: {
                //字典码结果
                purchasr_status: "",
                purchasr_demand: "",
                cantonCity: "",
                cantonArea: "",
                administrative_regions: "",
            },
            dicNum: 0,
            filterData: {
                code: "",
                cantonCode1: "",
                cantonProvinceName: "",
                cantonCode2: "",
                cantonCityName: "",
                cantonCode3: "",
                cantonAreaName: "",
                beginDate: "",
                endDate: "",
                status: "",
                statusName: ""
            }
        };
    },
    created() {
        this.getProvinceData();
        this.boxHeight = window.innerHeight - 300;
        this.CancelToken = Axios.CancelToken; //请求停止对象
        this.source = this.CancelToken.source();
        this.buttons = JSON.parse(localStorage.getItem("transferSignContract"));
        // rentalSignContract
        let reqArr = this.dicRequest.map((item, index, arr) => {
        let reqFun = new Promise((resolve, reject) => {
            if (item == "land_use") {
            this.$get(
                `/epf-supply/dictionaries/getDictsByCodeOrParentId?code=${item}`,
                { parentId: 0 }
            ).then(res => {
                resolve(res);
            });
            } else {
            this.$get(
                `/epf-supply/dictionaries/getDictEbyDictGroup/${item}`,
                {}
            ).then(res => {
                resolve(res);
            });
            }
        });
        return reqFun;
        });
        Promise.all(reqArr).then(res => {
        let dicArr = res.map(item => {
            let dicArr = item.dictionariesList.map(item => {
            return {
                dictKey: item.dictKey,
                zhCn: item.zhCn,
                id: item.id
            };
            });
            return dicArr;
        });
        for (let item in this.dictionary) {
            this.dictionary[item] = dicArr[this.dicNum];
            this.dicNum++;
        }

        this.dictionary.purchasr_status.pop();
        this.dicFinsh = true;
        });
    // @name: 行政区域
    // @description: 主要是getAreaByCodeOrParentId接口返回字段修改zhCn -> regionName，dictKey->regionCode
    // @author: gaojie
    // @chageTime:2020-3-3
    this.$get(`/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000`,{}).then(res => {
      this.dictionary.administrative_regions = res.dictionariesList;
    })
    },
    mounted() {
        this.init("2", this.pageNo, this.pageSize);
    },
    methods: {
        // @name: 行政区域
        // @description: 主要是getAreaByCodeOrParentId接口返回字段修改zhCn -> regionName，dictKey->regionCode
        // @author: swx0916
        // @chageTime:2020-3-2
        getProvinceData() {
            let that = this;
            that.$get(`/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=0`,{}).then(res => {
                that.dictionary.administrative_regions = res.dictionariesList;
            }).catch(error=>{})
        },
        ...mapActions(["setTabsList"]),
        // 获取表格数据
        init(isCheck, pageNo, PageSize, filterData) {
        //出租合同网签请求
        let token = sessionStorage.getItem("token");
        this.loading = true;
        let that = this;
        console.log("发起请求");
        Axios.post(
            "/api/epf-contract/transContract/page",
            qs.stringify({
                token: token,
                page: pageNo,
                rows: PageSize,
                contractType: "rent", //出租暂无数据
                isCheck: isCheck,
                code: filterData ? filterData.code : "",
                cantonCode1: filterData ? filterData.cantonCode1 : "",
                cantonCode2: filterData ? filterData.cantonCode2 : "",
                cantonCode3: filterData ? filterData.cantonCode3 : "",
                beginDate: filterData ? filterData.beginDate : "",
                endDate: filterData ? filterData.endDate : "",
                status: filterData ? filterData.status : ""
                }),
                {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/json"
                },
                cancelToken: new this.CancelToken(function executor(c) {
                    that.source = c;
                })
                }
            )
            .then(res => {
                console.log("请求结束", res);
                if (res.code == "0" && isCheck == "2") {
                    this.tabData1 = res.pager.results;
                    this.pageNo = res.pager.pageNo;
                    this.pageSize = res.pager.pageSize;
                    this.totalPage = res.pager.totalPage;
                    this.totalRecord = res.pager.totalRecord;

                    this.tabData1.forEach(element => {
                    let date = element.userId.split(",");
                    this.applicant = date[1];
                    element.secondParty = this.applicant;
                    });
                    this.loading = false;
                } else if (res.code == "0" && isCheck == "1") {
                    this.tabData2 = res.pager.results;
                    this.no_pageNo = res.pager.pageNo;
                    this.no_pageSize = res.pager.pageSize;
                    this.no_totalPage = res.pager.totalPage;
                    this.no_totalRecord = res.pager.totalRecord;

                    this.tabData2.forEach(element => {
                    let date = element.userId.split(",");
                    this.applicant = date[1];
                    element.secondParty = this.applicant;
                    });
                    this.loading = false;
                }
            })
            .catch(res => {
                this.loading = false;
            });
        },
        handleSizeChange(val) {
            //待处理显示条数
            this.pageSize = val;
            this.init("2", this.pageNo, this.pageSize);
            },
            handleCurrentChange(val) {
            //待处理当前页码
            this.pageNo = val;
            this.init("2", this.pageNo, this.pageSize);
        },
        no_handleSizeChange(val) {
            //已处理显示条数
            this.no_pageSize = val;
            this.init("1", this.no_pageNo, this.no_pageSize);
        },
        no_handleCurrentChange(val) {
            //已处理显示条数
            this.no_pageNo = val;
            this.init("1", this.no_pageNo, this.no_pageSize);
        },
        // 查看详情
        handleClickDetail(contractId){
            let routerPath = `/rentalContractTemplate?contractId=${contractId}&contractView=1`;
            let title = "合同预览";
            let tabObj = { title, routerPath };
            this.setTabsList(tabObj);
            this.$router.push({
                path: "/rentalContractTemplate",
                query: {
                contractId: contractId,
                contractView: 1
                }
            });
        },
        rowClickHandle(row, event, column) {
            console.log("双击行的id", row);
        },
        handleClick(val) {
            if (val.name == this.currentTabs) {
                return;
            }
            this.currentTabs = val.name;
            if (this.activeTabs == "pending") {
                this.init("2", this.pageNo, this.pageSize);
            } else {
                this.init("1", this.no_pageNo, this.no_pageSize);
            }
        },
        stopFun() {
            //终止请求函数
            this.source("上一个请求终止");
            return Promise.resolve();
        },
        requestFun(val) {
            //调用请求函数
            if (val.label == "待处理") {
                this.init("2", this.pageNo, this.pageSize);
                return Promise.resolve();
            } else if (val.label == "已处理") {
                this.init("1", this.no_pageNo, this.no_pageSize);
                return Promise.resolve();
            }
        },
        // 合同审核详情页
        examine(id, businessId, procDefId, procInsId, taskId) {
            let routerPath = `/rentalContractTemplate?contractId=${id}&businessId=${businessId}&procDefId=${procDefId}&procInsId=${procInsId}&taskId=${taskId}`;
            let title = "出租合同审核详情";
            let tabObj = { title, routerPath };
            this.setTabsList(tabObj);
            this.$router.push({
                path: "/rentalContractTemplate",
                query: {
                contractId: id,
                businessId: businessId,
                procDefId: procDefId,
                procInsId: procInsId,
                taskId: taskId
                }
            });
        },
        // 合同撤销申请
        revotrail(id) {
            let title = "合同撤销申请";
            let ifAudit = "";
            let routerPath = `/system/contract/transfer/views/record/revoke?contractId=${id}&contractType=rental&auditStateTitle=${title}&ifAudit=${ifAudit}`;
            let item = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath,query: {
					contractId: id,
                    contractType: "rental",
                    auditStateTitle: title,
                    ifAudit: ifAudit
				}});
            this.$store.commit("ADD_TAB", item)
        },
        // 合同撤销审核页面///查看合同撤销审核详情页面
        auditResult(id, businessId, procDefId, procInsId, taskId, ifAudit) {
            let title = "合同撤销审核详情";
            if (ifAudit == "examine") {
                title = "合同撤销审核";
            } else if (ifAudit == "view") {
                title = "合同撤销审核详情";
            }
            let routerPath = `/system/contract/transfer/views/record/revoke?contractId=${id}&contractType=rental&businessId=${businessId}&procDefId=${procDefId}&procInsId=${procInsId}&taskId=${taskId}&auditStateTitle=${title}&ifAudit=${ifAudit}`;
            let item = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath,query: {
					contractId: id,
                    contractType: "rental",
                    businessId: businessId,
                    procDefId: procDefId,
                    procInsId: procInsId,
                    taskId: taskId,
                    auditStateTitle: title,
                    ifAudit: ifAudit
				}});
            this.$store.commit("ADD_TAB", item)
        },
        // 不动产自动核验
        autoExamine() {
            let routerPath = `/system/contract/transfer/views/netSign/automatic`;
            let title = "不动产自动核验";
            let item = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath});
            this.$store.commit("ADD_TAB", item)
        },
        //归档
        open(id) {
            this.idlist = id;
            this.delShow = true;
        },
        suredelShow() {
            this.delShow = false;
            let token = sessionStorage.getItem("token");
            Axios.post(
                "/api/epf-contract/transContract/pigeonhole",
                qs.stringify({ token: token, contractId: this.idlist })
            )
                .then(res => {
                this.$message.success("归档成功");
                this.getFilterData();
                })
                .catch(error => {
                this.$message.error(res.msg);
                });
            },
        //已处理查看详情
        viewDetail(id, procInsId, contract) {
            let routerPath = `/system/contract/hire/views/hireNet/fileDetail?contractId=${id}&procInsId=${procInsId}&contractType=${contract}`;
            let title = "出租合同归档详情";
            let item = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath,query: {
                contractId: id,
                procInsId: procInsId,
                contractType: contract
                }});
            this.$store.commit("ADD_TAB", item)
        },
        contractFiling(id, cantonArea) {
            let title = "合同鉴证";
            let routerPath = `/system/contract/transfer/views/record/recordDetail?contractId=${id}&&contractType=rental&&record=record&&cantonArea=${cantonArea}`;
            let item = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath,query: {
					contractId: id,
                    contractType: "rental",
                    record: "record",
                    cantonArea: cantonArea
				}});
            this.$store.commit("ADD_TAB", item)
        },
        findAudit(obj, index) {
            this.title = "查看审核结果";
            this.actInfo = obj;
            this.dialogForm = true;

            this.$nextTick(() => {
                Bus.$emit("transferaudit", "view"); //需要审核
            });
        },
        actResult(re) {
            this.dialogForm = false;
        },
        getFilterData(val) {
            //筛选条件查询方法
            this.filterData = val;
            if (this.currentTabs == "pending") {
                this.init("2", this.pageNo, this.pageSize, val);
            } else {
                this.init("1", this.no_pageNo, this.no_pageSize, val);
            }
        },
        exportr() {
            // 导出
            let token = sessionStorage.getItem("token");
            if (this.currentTabs == "processed") {
                this.isCheck = "1";
            } else {
                this.isCheck = "2";
            }
            window.location.href = `/api/epf-contract/transContract/downContract?token=${token}&isCheck=${this.isCheck}&contractType=lease&status=${this.filterData.status}&code=${this.filterData.code}&beginDate=${this.filterData.beginDate}&endDate=${this.filterData.endDate}&cantonCode1=${this.filterData.cantonCode1}&cantonCode2=${this.filterData.cantonCode2}&cantonCode3=${this.filterData.cantonCode3}`;
        }
    }
}
</script>