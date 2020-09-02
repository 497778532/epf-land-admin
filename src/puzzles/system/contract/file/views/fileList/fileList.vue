<template>
    <epf-container title="合同归档列表">
        <div class="epf_term_box">
            <el-row :gutter="2">
                <el-col :span="2">
                    <span class="filter_title">合同编号 :</span>
                </el-col>
                <el-col :span="6">
                    <el-input v-model="filterData.code" size="small" placeholder="请输入合同编号"></el-input>
                </el-col>
                <el-col :span="2">
                    <span class="filter_title">合同类型 :</span>
                </el-col>
                <el-col :span="3">
                    <el-select
                    size="small"
                    class="filterCirculatemode"
                    v-model="filterData.contractType"
                    placeholder="全部"
                    @change="publishStatusSelect(contractType,filterData.contractType,$event)"
                    >
                    <el-option
                        v-for="(item,index) in contractType"
                        :ref="item.zhCn"
                        :id="item.id"
                        :dictKey="item.zhCn"
                        :label="item.zhCn"
                        :value="item.dictValue"
                        :key="index"
                    ></el-option>
                    </el-select>
                </el-col>

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
            </el-row>
            <el-row :gutter="2">
                <el-col :span="2">
                    <span class="filter_title">合同状态 :</span>
                </el-col>
                <el-col :span="3">
                    <el-select
                    size="small"
                    class="filterCirculatemode"
                    v-model="filterData.status"
                    placeholder="请选择状态"
                    @change="typeSelect(status,filterData.status,$event)"
                    >
                    <el-option
                        v-if="item.zhCn=='审核未通过'||item.zhCn=='鉴证失效'||item.zhCn=='已撤销'"
                        v-for="(item,index) in status"
                        :ref="item.zhCn"
                        :id="item.id"
                        :dictKey="item.zhCn"
                        :label="item.zhCn"
                        :value="item.dictKey"
                        :key="index"
                    ></el-option>
                    </el-select>
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
                    @row-dblclick="rowClickHandle"
                    style="width: 100%"
                    >
                    <el-table-column prop="number" label="序号" width="100" align="center">
                        <template slot-scope="scope">
                        <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="code" label="合同编号" width="340" align="left">
                        <template slot-scope="scope">
                        <span style="text-align:center;cursor:pointer;color: #4772d5;">{{ scope.row.code }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="contractName" label="合同名称" width="250" align="left"></el-table-column>
                    <el-table-column prop label="所属行政区域" width="200">
                        <template slot-scope="scope">
                        <span>{{scope.row.cantonName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="contractType" label="合同类型" width="150" align="left">
                        <template slot-scope="scope">
                        <span>{{scope.row.contractTypeName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="relevanceCode" label="信息关联信息" width="160" align="left">
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
                    <el-table-column prop="publishStatus" label="合同状态" width="160" align="left">
                        <template slot-scope="scope">
                        <div v-if="scope.row.contractStatus == 'contract_status-011'||scope.row.contractStatus == 'contract_status-006'||scope.row.contractStatus == 'contract_status-007'">
                            <div class="error"></div>
                            <span>{{scope.row.contractStatusName}}</span>
                        </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="secondParty" label="申请人" width="115" align="left"></el-table-column>
                    <el-table-column prop="updateTime" label="归档时间" width="185" align="left"></el-table-column>
                    <el-table-column label="操作" align="left" fixed="right" width="150">
                        <template slot-scope="scope">
                        <span class="list-style: none;" v-for="(button ,index)  in buttons" :key="index">
                            <el-button
                            size="small"
                            type="success"
                            v-if="button.resourceId=='contractfile_view'"
                            @click="viewDetail(scope.row.id,scope.row.procInsId,scope.row.contractType)"
                            >查看详情</el-button>
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
            status: [],
            contractType: [],
            //合同列表
            contartData: [],
            //页码
            totalPage: 1,
            totalRecord: 1,
            pageNo: 1,
            pageSize: 5,

            searchInfo: {},
                    applicant:'',
            filterData: {
                contractType: "",
                code: "",
                beginDate: "",
                endDate: "",
                status: ""
            },
            useDate: "",
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
            loading: false,
            //按钮组、主题
            buttons: []
        };
    },
    created() {
        this.getProvinceData();
        this.boxHeight = window.innerHeight - 350;
        this.buttons = JSON.parse(localStorage.getItem("contractfile"));
        let userToken = sessionStorage.getItem("token");
        Axios.get(
            "/api/epf-admin/admin/dict/getDictEbyDictGroup/flow_mode",
            qs.stringify({ token: userToken })
            ).then(res => {
            console.log(res);
            if (res.code == "0") {
                this.contractType = res.dictionariesList;
            }
        });
        Axios.get(
            "/api/epf-admin/admin/dict/getDictEbyDictGroup/contract_status",
            qs.stringify({ token: userToken })
            ).then(res => {
            console.log(res);
            if (res.code == "0") {
                this.status = res.dictionariesList;
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
    mounted() {
        this.getAccountList();
    },
    methods: {
        // @name: 行政区域
        // @description: 主要是getAreaByCodeOrParentId接口返回字段修改zhCn -> regionName，dictKey->regionCode
        // @author: swx0916
        // @chageTime:2020-3-2
        getProvinceData() {
            let that = this;
            that.$get(`/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=0`,{}).then(res => {
                console.log("",res)
                that.dictionary.administrative_regions = res.dictionariesList;
            }).catch(error=>{})
        },
        getAccountList() {
            //归档列表请求
            this.loading = true;
            let token = sessionStorage.getItem("token");
            Axios.post(
                "/api/epf-contract/transContract/pigeonholePag",
                qs.stringify({
                token: token,
                page: this.pageNo,
                rows: this.pageSize,
                code: this.filterData.code,
                contractType: this.filterData.contractType,
                beginDate: this.filterData.beginDate,
                endDate: this.filterData.endDate,
                status: this.filterData.status
                })
            )
                .then(res => {
                    this.loading = false;
                    if (res.code =="0") {
                        this.contartData = res.pager.results;
                        this.pageNo = res.pager.pageNo;
                        this.pageSize = res.pager.pageSize;
                        this.totalPage = res.pager.totalPage;
                        this.totalRecord = res.pager.totalRecord;
                        
                        this.contartData.forEach(element => {
                            let date = element.userId.split(",");
                            this.applicant = date[1];
                            element.secondParty = this.applicant;
                        });
                    }
                })
                .catch(res => {
                    this.loading = false;
                    this.$message.warning(res.msg);
                });
        },
        viewDetail(contractId, procInsId,contract) {
            let title = "合同归档详情";
            let routerPath = `/system/contract/transfer/views/record/fileDetail?contractId=${contractId}&procInsId=${procInsId}&contractType=${contract}`;
            let item = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath,query: {
                contractId: contractId,
                procInsId: procInsId,
                contractType: contract,}});
            this.$store.commit("ADD_TAB", item)
        },
        rowClickHandle(row, event, column) {
            console.log("双击行的id", row);
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
        //每页条数改变时触发
        handleSizeChange(val) {
            this.pageSize = val;
            this.getAccountList();
        },
        //获取当前页
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getAccountList();
        },
        publishStatusSelect(dic, publishStatusName, event) {
            this.filterData.contractType = this.$refs[
                publishStatusName
            ][0].$attrs.dictKey;
        },
        typeSelect(dic, value, event) {
            this.filterData.state = this.$refs[value][0].$attrs.dictKey;
        },
        selectDatarange() {
            //选择日期范围后的回调
            this.filterData.beginDate = this.useDate[0];
            this.filterData.endDate = this.useDate[1];
        },
        findInfo() {
            this.getAccountList();
        },
        resetFilter() {
            for (let item in this.filterData) {
                this.filterData[item] = "";
            }
            this.getAccountList();
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
            window.location.href = `/api/epf-contract/transContract/downContract?token=${token}&isCheck=&contractType=&status=${this.filterData.status}&code=${this.filterData.code}&beginDate=${this.filterData.beginDate}&endDate=${this.filterData.endDate}`;
        }
    }

}
</script>