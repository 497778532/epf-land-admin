<template>
    <epf-container title="抵押合同鉴证列表">
        <div class="epf_term_box">
            <el-row :gutter="2">
                <el-col :span="2">
                    <span class="filter_title">合同编号 :</span>
                </el-col>
                <el-col :span="6">
                    <el-input v-model="filterData.code" size="small" placeholder="请输入合同编号"></el-input>
                </el-col>
                <el-col :span="2">
                    <span class="filter_title">所属行政区域 :</span>
                </el-col>
                <el-col :span="9">
                    <div style="width:155px;float:left;margin-right:9px;">
                    <el-select
                        v-model="filterData.cantonProvinceName"
                        size="small"
                        placeholder="全部"
                        @change="provinceSelect(dictionary.administrative_regions,filterData.cantonProvinceName,$event)"
                        >
                        <el-option
                        v-for="(item,index) in dictionary.administrative_regions"
                        :ref="item.regionName"
                        :id="item.id"
                        :regionCode="item.regionCode"
                        :label="item.regionName"
                        :value="item.regionName"
                        :key="index"
                        ></el-option>
                    </el-select>
                    </div>
                    <div style="width:155px;float:left;margin-right:9px;">
                    <el-select
                        v-model="filterData.cantonCityName"
                        size="small"
                        placeholder="全部"
                        @change="citySelect(dictionary.cantonCity,filterData.cantonCityName,$event)"
                        >
                        <el-option
                        v-for="item in dictionary.cantonCity"
                        :ref="item.regionName"
                        :id="item.id"
                        :regionCode="item.regionCode"
                        :label="item.regionName"
                        :value="item.regionName"
                        :key="item.regionCode"
                        ></el-option>
                    </el-select>
                    </div>
                    <div style="width:155px;float:left;">
                    <el-select
                        v-model="filterData.cantonAreaName"
                        size="small"
                        placeholder="全部"
                        @change="areaSelect(dictionary.cantonAreaName,filterData.cantonAreaName,$event)"
                        >
                        <el-option
                        v-for="item in dictionary.cantonArea"
                        :ref="item.regionName"
                        :id="item.id"
                        :regionCode="item.regionCode"
                        :label="item.regionName"
                        :value="item.regionName"
                        :key="item.regionCode"
                        ></el-option>
                    </el-select>
                    </div>
                </el-col>
                <el-col :span="1.5">
                    <span class="filter_title">合同状态 :</span>
                </el-col>
                <el-col :span="3">
                    <el-select
                    size="small"
                    class="filterCirculatemode"
                    v-model="filterData.statusName"
                    placeholder="全部"
                    @change="statusSelect(dictionary.purchasr_status,filterData.statusName,$event)"
                    >
                    <el-option
                        v-for="(item,index) in status"
                        :ref="item.zhCn"
                        :id="item.id"
                        :dictKey="item.dictKey"
                        :label="item.zhCn"
                        :value="item.zhCn"
                        :key="index"
                    ></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row :gutter="2">
                <el-col :span="2">
                    <span class="filter_title">申请时间 :</span>
                </el-col>
                <el-col :span="6">
                    <el-date-picker
                    v-model="useDate"
                    type="daterange"
                    unlink-panels
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="起始时间"
                    end-placeholder="截止时间"
                    size="small"
                    @change="selectDatarange"
                    ></el-date-picker>
                </el-col>
                <el-col :span="5" style="text-align:right">
                    <button class="epf_btn epf_btn_bg" @click="findInfo"> 查 询</button>
                    <button class="epf_btn epf_btn_def" @click="resetFilter"> 重 置</button>
                </el-col>
            </el-row>
        </div>
        <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}"> 
            <div class="epf_toolbar">
                <span class="toolsTitle">合同列表</span>
                <span class="button_export" @click="exportr">导出</span>
            </div>
            <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 205 +'px'}">
                <el-table
                    :data="contartData"
                    border
                    :height="boxHeight - 270"
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255, 0.9)"
                    style="width: 100%"
                    >
                    <el-table-column prop="code" label="序号" width="100" align="center">
                        <template slot-scope="scope">
                        <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="contractNo" label="合同编号" width="140" align="left">
                        <template slot-scope="scope">
                        <span
                            style="text-align:center;cursor:pointer;color: #4772d5;"
                        >{{ scope.row.contractNo }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="recordNo" label="合同统一编码" width="170" align="left"></el-table-column>
                    <el-table-column prop="contractName" label="合同名称" width="250" align="left"></el-table-column>
                    <el-table-column prop="cantonName" label="所属行政区域" width="190"></el-table-column>
                    <el-table-column prop="createTime" label="申请时间" width="195" align="left"></el-table-column>
                    <el-table-column prop="information" label="关联信息" width="120" align="left">
                        <template slot-scope="scope">
                        <span
                            class="titleHover"
                            @click="rowClickHandleDeal(scope.row)"
                            style="text-align:center;cursor:pointer;"
                            v-if="scope.row.relevanceCode=='2'"
                        >关联交易信息</span>
                        <span
                            class="titleHover"
                            @click="rowClickHandleSupply(scope.row)"
                            style="text-align:center;cursor:pointer;"
                            v-if="scope.row.relevanceCode=='1'"
                        >关联供给信息</span>
                        <span
                            class="titleHover"
                            style="text-align:center;"
                            v-if="scope.row.relevanceCode=='3'"
                        >未关联</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="recordType" label="合同状态" width="120" align="left">
                        <template slot-scope="scope">
                        <div v-if="scope.row.recordType == 'record_status-001'">
                            <div class="success"></div>
                            <span>鉴证成功</span>
                            <span v-if="scope.row.contractType=='contract_status-003'">({{scope.row.contractTypeName}})</span>
                        </div>
                        <div v-if="scope.row.recordType == 'record_status-003'">
                            <div class="error"></div>
                            <span>鉴证失效</span>
                        </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userName" label="申请人" width="150" align="left"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="300" align="left">
                        <template slot-scope="scope">
                        <el-button size="mini" type="success" plain @click="viewDetail(scope.row.contractId,scope.row.procInsId,'mortgage')">查看详情</el-button>
                        <el-button size="mini" type="success" plain @click="open(scope.row.contractId)" v-if="scope.row.recordType=='record_status-003'">归档</el-button>
                        <el-button size="mini" type="success" plain @click="revotrail(scope.row.contractId)" v-if="scope.row.recordType=='record_status-001'&&scope.row.contractType!='contract_status-003'">合同撤销</el-button>
                        <!-- 归档弹框 -->
                        <div class="delDialog_box">
                            <div v-show="delShow" class="delDialog" @click.stop="delShow=false"></div>
                            <div v-show="delShow" class="container_box">
                            <div class="title_box">
                                <h4>提示</h4>
                                <span>
                                <i class="el-icon-circle-close-outline" @click="delShow=false"></i>
                                </span>
                            </div>
                            <div class="container1">合同归档以后，将展示在合同归档管理列表中,是否确认归档？</div>
                            <!-- {{idlist}} -->
                            <div class="button_bg" @click="suredelShow()">确认</div>
                            <div
                                class="button_bg"
                                @click="delShow=false"
                                style="background:#fff;color:#555;border:1px solid #c9c9c9;margin-left:0px !important;"
                            >取消</div>
                            </div>
                        </div>
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
                    ></el-pagination>
                </div>
            </div>
        </div>
    </epf-container>
</template>

<script>
import Axios from "axios";
import qs from "qs";
export default {
    data() {
        return {
            loading: false,
            status: [],
            //合同列表
            contartData: [],
            //页码
            currentPage: 1,
            totalPage: 1,
            totalRecord: 1,
            pageNo: 1,
            pageSize: 5,

            searchInfo: {},

            filterData: {
                code: "",
                title: "",
                circulation: "",
                status: "",
                statusName: "",
                publishNo: "",
                type: "",
                cantonProvinceName: "",
                cantonProvince: "",
                cantonCityName: "",
                cantonCity: "",
                cantonAreaName: "",
                cantonArea: "",
                beginDate: "",
                endDate: ""
            },
            useDate: "",
            switchHeight: 49,
            flexibleOpen: false,
            dicRequest: [
                "purchasr_status",
                "purchasr_demand"
            ], //字典码请求
            dictionary: {
                //字典码结果
                purchasr_status: "",
                purchasr_demand: "",
                administrative_regions: "",
                cantonCity: "",
                cantonArea: ""
            },
            dicNum: 0,
            idlist: "",
            delShow: false,
            applicant: "",
            //按钮组、主题
            buttons: []
        };
    },
    mounted() {
        this.init(this.pageNo, this.pageSize);
    },
    created() {
        this.boxHeight = window.innerHeight - 350;
        this.buttons = JSON.parse(localStorage.getItem("transferRecordContract"));
        let userToken = sessionStorage.getItem("token");
        Axios.get(
        "/api/epf-admin/admin/dict/getDictEbyDictGroup/record_status",
        qs.stringify({ token: userToken })
        ).then(res => {
        console.log("=============", res);
            if (res.code == "0") {
                this.status = res.dictionariesList.filter(e => {
                    if (e.dictKey !== "record_status-002") {
                        return e;
                    }
                });
            }
        });
        let reqArr = this.dicRequest.map((item, index, arr) => {
        let reqFun = new Promise((resolve, reject) => {
            if (item == "land_use") {
                this.$get(
                    `/epf-trade/dictionaries/getDictsByCodeOrParentId?code=${item}`,
                    { parentId: 0 }
                ).then(res => {
                    resolve(res);
                });
            }else {
                this.$get(
                    `/epf-trade/dictionaries/getDictEbyDictGroup/${item}`,
                    {}
                ).then(res => {
                    resolve(res);
                });
            }
        });
            return reqFun;
        });
        Promise.all(reqArr).then(res => {
        console.log(res);
        let dicArr = res.map(item => {
            console.log(item);
            let dicArr = item.dictionariesList.map(item => {
                return {
                    dictKey: item.dictKey,
                    zhCn: item.zhCn,
                    id: item.id
                };
            });
            return dicArr;
        });
        console.log(dicArr);
        for (let item in this.dictionary) {
            console.log(this.dicNum);
            this.dictionary[item] = dicArr[this.dicNum];
            // console.log(dicArr[this.dicNum])
            this.dicNum++;
        }

        this.dicFinsh = true;
        console.log("字典结果", this.dictionary);
        });
    // @name: 行政区域
    // @description: 主要是getAreaByCodeOrParentId接口返回字段修改zhCn -> regionName，dictKey->regionCode
    // @author: gaojie
    // @chageTime:2020-3-3
    this.$get(`/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000`,{}).then(res => {
      this.dictionary.administrative_regions = res.dictionariesList;
    })
    },
    methods: {
        ...mapActions(["setTabsList"]),
        init(pageNo, PageSize, filterData) {
            //抵押合同鉴证请求
            this.loading = true;
            let token = sessionStorage.getItem("token");
            Axios.post(
                "/api/epf-contract/transContract/pageRecord",
                qs.stringify({
                token: token,
                page: this.pageNo,
                rows: this.pageSize,
                contractType: "mortgage", //抵押暂无数据
                code: filterData ? filterData.code : "",
                cantonCode1: filterData ? filterData.cantonProvince : "",
                cantonCode2: filterData ? filterData.cantonCity : "",
                cantonCode3: filterData ? filterData.cantonArea : "",
                status: filterData ? filterData.status : "",
                beginDate: filterData ? filterData.beginDate : "",
                endDate: filterData ? filterData.endDate : ""
                })
            )
            .then(res => {
                this.loading = false;
                if (res.code == "0") {
                    this.contartData = res.pager.results;
                    this.pageNo = res.pager.pageNo;
                    this.pageSize = res.pager.pageSize;
                    this.totalPage = res.pager.totalPage;
                    this.totalRecord = res.pager.totalRecord;
                    this.contartData.forEach(element => {
                    console.log(element.userId);
                    let date = element.userId.split(",");
                    console.log(date[1]);
                    this.applicant = date[1];
                    element.secondParty = this.applicant;
                    });
                    console.log("抵押合同鉴证请求返回", res);
                }
            })
            .catch(res => {
                this.loading = false;
                this.$message.warning(res.msg);
            });
        },
        viewDetail(id, procInsId, contract) {
            let routerPath = `/system/contract/hire/views/pledgeNet/fileDetail?contractId=${id}&procInsId=${procInsId}&contractType=${contract}`;
            let title = "抵押合同归档详情";
            let item = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath,query: {
                contractId: id,
                procInsId: procInsId,
                contractType: contract
            }});
            this.$store.commit("ADD_TAB", item)
        },
        //归档
        open(id) {
            this.idlist = id;
            this.delShow = true;
        },
        //归档接口
        suredelShow() {
            this.delShow = false;
            let token = sessionStorage.getItem("token");
            Axios.post(
                "/api/epf-contract/transContract/pigeonhole",
                qs.stringify({ token: token, contractId: this.idlist })
            )
                .then(res => {
                this.$message.success("归档成功");
                this.findInfo();
                })
                .catch(error => {
                this.$message.error(res.msg);
                });
        },
        // 合同撤销申请
        revotrail(id) {
            let title = "合同撤销申请";
            let ifAudit = "";
            let routerPath = `/system/contract/transfer/views/record/revoke?contractId=${id}&&contractType=mortgage&auditStateTitle=${title}&ifAudit=${ifAudit}`;
            let item = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath,query: {
					contractId: id,
                    contractType: "mortgage",
                    auditStateTitle: title,
                    ifAudit: ifAudit
				}});
            this.$store.commit("ADD_TAB", item)
        },
        // 关联交易信息
        rowClickHandleDeal(item) {
            let title = "标的详情";
            let routerPath = `/system/trade/land/views/target/detail?id=${item.id}`;
            let itemObj = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath,query: {id: item.id}});
            this.$store.commit("ADD_TAB", itemObj)
        },
        // 关联转让信息
        rowClickHandleSupply(item) {
            let title = "转让地块信息";
            let routerPath = `/system/supply/provide/views/transfer/transfer`;
            let itemObj = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath});
            this.$store.commit("ADD_TAB", itemObj)
        },
        handleSizeChange(val) {
            // 显示条数
            this.pageSize = val;
            this.init(this.pageNo, this.pageSize);
        },
        handleCurrentChange(val) {
            //当前页码
            this.pageNo = val;
            this.init(this.pageNo, this.pageSize);
        },
        provinceSelect(dic, cantonCode, event) {
            this.filterData.cantonAreaName = "";
            this.filterData.cantonArea = "";
            this.cantonArea = "";
            this.filterData.cantonCityName = "";
            this.filterData.cantonCity = "";
            this.cantonCity = "";
            let pId = this.$refs[cantonCode][0].$attrs.id;
            this.filterData.cantonProvince = this.$refs[cantonCode][0].$attrs.regionCode;

            this.$get(
                `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
                {}
            ).then(res => {
                console.log(res);
                if (res.dictionariesList.length != 0) {
                this.dictionary.cantonCity = res.dictionariesList;
                return;
                }
                this.dictionary.cantonCity = "";
            });
        },
        citySelect(dic, cantonCity, event) {
            this.filterData.cantonArea = "";
            this.filterData.cantonAreaName = "";
            this.cantonArea = "";
            let pId = this.$refs[cantonCity][0].$attrs.id;
            this.filterData.cantonCity = this.$refs[cantonCity][0].$attrs.regionCode;
            this.$get(
                `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
                {}
            ).then(res => {
                console.log(res);
                if (res.dictionariesList.length != 0) {
                this.dictionary.cantonArea = res.dictionariesList;
                return;
                }
                this.dictionary.cantonArea = "";
            });
        },
        areaSelect(dic, cantonCity, event) {
            this.filterData.cantonAea = this.$refs[cantonCity][0].$attrs.regionCode;
        },
        statusSelect(dic, statusName, event) {
            this.filterData.status = this.$refs[statusName][0].$attrs.dictKey;
        },
        selectDatarange() {
            //选择日期范围后的回调
            this.filterData.beginDate = this.useDate[0];
            this.filterData.endDate = this.useDate[1];
        },
        findInfo() {
            this.init(this.pageNo, this.pageSize, this.filterData);
        },
        resetFilter() {
            for (let item in this.filterData) {
                this.filterData[item] = "";
            }
            this.useDate = [];
            this.init(this.pageNo, this.pageSize, this.filterData);
        },
        findAudit() {
            this.$confirm("1", "审核", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                this.$message({
                    type: "success",
                    message: ""
                });
                })
                .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消"
                });
            });
        },
        // 导出
        exportr() {
            let token = sessionStorage.getItem("token");
            if (this.currentTabs == "processed") {
                this.isCheck = "1";
            } else {
                this.isCheck = "2";
            }
            console.log("=========0", this.filterData);
            window.location.href = `/api/epf-contract/transContract/downRecord?token=${token}&isCheck=${this.isCheck}&contractType=transfer&status=${this.filterData.status}&code=${this.filterData.code}&beginDate=${this.filterData.beginDate}&endDate=${this.filterData.endDate}&cantonCode1=${this.filterData.cantonProvince}&cantonCode2=${this.filterData.cantonCity}&cantonCode3=${this.filterData.cantonArea}`;
        }
    },
    watch:{
        $route(to,from){
            this.init(this.pageNo, this.pageSize);
        }
    },
}
</script>
