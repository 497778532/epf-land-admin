<template>
    <epf-container title="合同监测">
        <div class="epf_term_box">
            <el-row style="margin-bottom:10px;">
                <el-col :span="2">
                    <span class="filter_title">行政区域：</span>
                </el-col>
                <el-col :span="8">
                    <div style="width:30%;float:left;margin-right:9px;">
                        <el-select
                            v-model="filterData.cantonProvinceName"
                            size="small"
                            placeholder="全部"
                            @change="provinceSelect(dictionary.administrative_regions,filterData.cantonProvinceName,$event)"
                            :disabled="provinceCheck"
                        >
                            <el-option
                            v-for="item in dictionary.administrative_regions"
                            :ref="item.regionName"
                            :id="item.id"
                            :regionCode="item.regionCode"
                            :label="item.regionName"
                            :value="item.regionName"
                            :key="item.regionCode"
                            ></el-option>
                        </el-select>
                    </div>
                    <div style="width:30%;float:left;margin-right:9px;">
                        <el-select
                            v-model="filterData.cantonCityName"
                            size="small"
                            placeholder="全部"
                            @change="citySelect(dictionary.cantonCity,filterData.cantonCityName,$event)"
                            :disabled="cityCheck"
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
                    <div style="width:30%;float:left;">
                        <el-select
                            v-model="filterData.cantonAreaName"
                            size="small"
                            placeholder="全部"
                            @change="areaSelect(dictionary.cantonArea,filterData.cantonAreaName,$event)"
                            :disabled="AreaCheck"
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
                <el-col :span="2">
                    <span class="filter_title">合同类型：</span>
                </el-col>
                <el-col :span="3">
                    <el-select
                    size="small"
                    v-model="filterData.landTrans"
                    placeholder="全部"
                    @change="circulationSelect(dictionary.flow_mode,filterData.landTrans,$event)"
                    >
                    <el-option
                        v-for="item in dictionary.flow_mode"
                        :ref="item.zhCn"
                        :id="item.id"
                        :dictKey="item.dictKey"
                        :label="item.zhCn"
                        :value="item.zhCn"
                        :key="item.dictKey"
                    ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="2">
                    <span class="filter_title">用途：</span>
                </el-col>
                <el-col :span="7">
                    <div style="width:45%;float:left;margin-right:9px;">
                    <el-select
                        v-model="filterData.firstClassUseName"
                        placeholder="全部"
                        @change="firstClassUseSelect(dictionary,filterData.firstClassUseName,$event)"
                    >
                        <el-option
                        v-for="item in dictionary.land_use"
                        :ref="item.zhCn"
                        :dictKey="item.dictKey"
                        :id="item.id"
                        :label="item.zhCn"
                        :value="item.zhCn"
                        :key="item.id"
                        ></el-option>
                    </el-select>
                    </div>
                    <div style="width:45%;float:left;">
                    <el-select
                        v-model="filterData.secondClassUseName"
                        placeholder="全部"
                        @change="secondClassUseSelect(dictionary,filterData.secondClassUseName,$event)"
                    >
                        <el-option
                        v-for="item in dictionary.land_use_second"
                        :ref="item.zhCn"
                        :label="item.zhCn"
                        :dictKey="item.dictKey"
                        :value="item.zhCn"
                        :key="item.zhCn"
                        ></el-option>
                    </el-select>
                    </div>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:10px;">
                <el-col :span="2">
                    <span class="filter_title">申请时间：</span>
                </el-col>
                <el-col :span="6">
                    <el-date-picker
                    v-model="submitTime"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="截止时间"
                    :picker-options="pickerOptions"
                    value-format="yyyy-MM-dd"
                    ></el-date-picker>
                </el-col>
                <el-col :span="2">
                    <span class="filter_title">交易方式：</span>
                </el-col>
                <el-col :span="3">
                    <el-select
                    size="small"
                    v-model="filterData.transactionTypeName"
                    placeholder="全部"
                    @change="transactionSelect(dictionary.transaction_mode,filterData.transactionTypeName,$event)"
                    >
                    <el-option
                        v-for="item in dictionary.transaction_mode"
                        :ref="item.zhCn"
                        :id="item.id"
                        :dictKey="item.dictKey"
                        :label="item.zhCn"
                        :value="item.zhCn"
                        :key="item.dictKey"
                    ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="2">
                    <span class="filter_title">合同状态：</span>
                </el-col>
                <el-col :span="3">
                    <el-select
                    size="small"
                    v-model="filterData.contract_statusName"
                    placeholder="全部"
                    @change="contractSelect(dictionary.contract_status,filterData.contract_statusName,$event)"
                    >
                    <el-option
                        v-for="item in dictionary.contract_status"
                        :ref="item.zhCn"
                        :id="item.id"
                        :dictKey="item.dictKey"
                        :label="item.zhCn"
                        :value="item.zhCn"
                        :key="item.dictKey"
                        v-show="item.zhCn != '鉴证已中止'"
                    ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="2">
                    <span class="filter_title">合同编号：</span>
                </el-col>
                <el-col :span="3">
                    <el-input v-model="filterData.contractNo" size="small" placeholder="请输入合同编号"></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:10px;">
                <el-col :span="2">
                    <span class="filter_title">合同签订人：</span>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="filterData.signUserName" size="small" placeholder="请输入合同签订人"></el-input>
                </el-col>
                <el-col :span="5" style="text-align:right">
                    <button class="epf_btn epf_btn_bg" @click="searchList()"> 查 询</button>
                    <button class="epf_btn epf_btn_def" @click="resetFilter()"> 重 置</button>
                </el-col>       
            </el-row>
        </div>
        <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}"> 
            <div class="epf_toolbar">
                <span class="toolsTitle">合同监测列表</span>
                <span class="button_export"><a :href="href" style="color: #ffa000;">导出</a></span>
            </div>
            <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 215 +'px'}">
                <el-table
                    ref="multipleTable"
                    :data="contractData"
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:80px;"
                    border
                    :height="boxHeight - 260"
                    tooltip-effect="dark"
                    >
                    <el-table-column label="序号" width="75" align="center">
                        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                    </el-table-column>
                    <el-table-column label="合同信息" width="250">
                        <template slot-scope="scope">
                        <p>合同编号：{{scope.row.contractNo}}</p>
                        <p>合同名称：{{scope.row.contractName}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="行政区域" width="165">
                        <template slot-scope="scope">
                        <span>{{scope.row.cantonProvinceName}}-{{scope.row.cantonCityName}}-{{scope.row.cantonAreaName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="landTypeName" label="合同类型" width="85"></el-table-column>
                    <el-table-column prop="transactionType" label="交易方式" width="90"></el-table-column>
                    <el-table-column label="用途" width="115">
                        <template slot-scope="scope">
                        <span>{{scope.row.firstClassUseName}}-{{scope.row.secondClassUseName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createtime" label="申请时间" width="190"></el-table-column>
                    <el-table-column prop="contractStatusName" label="合同状态" width="105"></el-table-column>
                    <el-table-column label="（转让/抵押/出租）签订人" width="235">
                        <template slot-scope="scope">
                        <p>转让方：{{scope.row.firstparty}}</p>
                        <p>转让方联系方式：{{scope.row.firstPhone}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="（受让人/抵押权人/租赁房）签订人" width="245">
                        <template slot-scope="scope">
                        <p>受让方：{{scope.row.secondparty}}</p>
                        <p>受让方联系方式：{{scope.row.secondphone}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleClickDetail(scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页控件 -->
                <div class="epf_paging_fixe">
                    <el-pagination
                        background
                        layout="total,prev, pager, next,sizes,jumper"
                        :page-sizes="[5,10,15,20]"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :total="totalRecord"
                        :current-page="currentPage"
                        :page-size="pageSize"
                    ></el-pagination>
                </div>
            </div>
        </div>
    </epf-container>
</template>

<script>
import {mapState, mapMutations } from "vuex";
export default {
    data(){
        return {
            //根据权限锁定省市
            provinceCheck:false,
            cityCheck:false,
            AreaCheck:false,
            obj:{      
                    dictKey: "",
                    zhCn: "全部",
                    id: "0"
            },
            submitTime: "",
            //合同监测列表

            contractData: [],

            params: {},
            //导出
            href:'/api/epf-monitor/monitor/moniContract/downContract?',
            //页码
            currentPage: 1,
            pageNo: 1, //页码
            pageSize: 5, //每页条数
            totalPage: 1,
            totalRecord: 1,

            loading: true,

            multipleSelection: [],

            filterData: {
                cantonProvinceName: "",
                cantonProvince: "",
                cantonCityName: "",
                cantonCity: "",
                cantonAreaName: "",
                cantonArea: "",
                contract_statusName: "",
                contractStatus: "",
                landType: "", //土地性质
                firstClassUse: "",
                firstClassUseName: "", //一级土地用途
                secondClassUse: "",
                secondClassUseName: "", //二级土地用途
                transactionTypeName: "",
                transactionType: "",
                signUserName: "",
                startCeateTime: "",
                endCreateTime: "" //
            },
            dicRequest: [
                "flow_mode",
                "land_nature",
                "land_use",
                "transaction_mode",
                "contract_status"
            ], //字典码请求
            dictionary: {
                //字典码结果
                flow_mode: "",
                land_nature: "",
                land_use: "",
                transaction_mode: "",
                contract_status: "",
                administrative_regions: "",
                cantonCity: "",
                cantonArea: "",
                land_use_second: ""
            },
            dicNum: 0, //字典循环下标

            //日期选择器
            pickerOptions: {
                shortcuts: [
                {
                    text: "最近一周",
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit("pick", [start, end]);
                    }
                },
                {
                    text: "最近一个月",
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit("pick", [start, end]);
                    }
                },
                {
                    text: "最近三个月",
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit("pick", [start, end]);
                    }
                }
                ]
            }
        };
    },
    created() {
        this.boxHeight = window.innerHeight - 250;
        const that=this;
        let reqArr = this.dicRequest.map((item, index, arr) => {
            let reqFun = new Promise((resolve, reject) => {
                if (item == "land_use") {
                this.$get(
                        `/epf-monitor/dictionaries/getDictsByCodeOrParentId?code=${item}`,
                        { parentId: 0 }
                    ).then(res => {
                        resolve(res);
                    });
                }else {
                this.$get(
                        `/epf-monitor/dictionaries/getDictEbyDictGroup/${item}`,
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
        dicArr.forEach(function(item, index) {
            item.unshift(that.obj);
        });
        for (let item in this.dictionary) {
            console.log(this.dicNum);
            this.dictionary[item] = dicArr[this.dicNum];
            // console.log(dicArr[this.dicNum])
            this.dicNum++;
        }
        this.dicFinsh = true;
            this.dictionary.contract_status.splice(1,1)
        console.log("字典结果", this.dictionary);
        });
        // @name: 行政区域
        // @description: 主要是getAreaByCodeOrParentId接口返回字段修改zhCn -> regionName，dictKey->regionCode
        // @author: gaojie
        // @chageTime:2020-3-3
        this.$get(`/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000`,{}).then(res => {
        this.dictionary.administrative_regions = res.dictionariesList;
        })
        if(sessionStorage.getItem("org_level") == 'org_level-003'){
            this.provinceCheck = true;
            this.params.cantonProvince = sessionStorage.getItem("jgProvinceCode")
            this.params.cantonProvinceName = sessionStorage.getItem("jgProvince")
        }else if(sessionStorage.getItem("org_level") == 'org_level-005'){
            this.provinceCheck = true;
            this.cityCheck = true;
            this.params.cantonProvince = sessionStorage.getItem("jgProvinceCode")
            this.params.cantonProvinceName = sessionStorage.getItem("jgProvince")
            this.params.cantonCity = sessionStorage.getItem("jgCityCode")
            this.params.cantonCityName = sessionStorage.getItem("jgCity")
        }else if(sessionStorage.getItem("org_level") == 'org_level-004'){
            this.provinceCheck = true;
            this.cityCheck = true;
            this.AreaCheck = true;
            this.params.cantonProvince = sessionStorage.getItem("jgProvinceCode")
            this.params.cantonProvinceName = sessionStorage.getItem("jgProvince")
            this.params.cantonCity = sessionStorage.getItem("jgCityCode")
            this.params.cantonCityName = sessionStorage.getItem("jgCity")
            this.params.cantonArea = sessionStorage.getItem("jgAreaCode")
            this.params.cantonAreaName = sessionStorage.getItem("jgArea")
        }
        this.getList();
    },

    computed: {
        ...mapState("monitoringSupervision", ["myDetail"])
    },
    mounted(){
        setTimeout(()=>{
            if(sessionStorage.getItem("org_level") == 'org_level-003'){
                this.filterData.cantonProvince = sessionStorage.getItem("jgProvinceCode")
                this.filterData.cantonProvinceName = sessionStorage.getItem("jgProvince")
                this.provinceSelect('',this.filterData.cantonProvinceName,'')
            }else if(sessionStorage.getItem("org_level") == 'org_level-005'){
                this.filterData.cantonProvince = sessionStorage.getItem("jgProvinceCode")
                this.filterData.cantonProvinceName = sessionStorage.getItem("jgProvince")
                this.provinceSelect('',this.filterData.cantonProvinceName,'')
                setTimeout(()=>{
                this.filterData.cantonCity = sessionStorage.getItem("jgCityCode")
                this.filterData.cantonCityName = sessionStorage.getItem("jgCity")
                this.citySelect('',this.filterData.cantonCityName,'')
                },800)
            }else if(sessionStorage.getItem("org_level") == 'org_level-004'){
                this.filterData.cantonProvince = sessionStorage.getItem("jgProvinceCode")
                this.filterData.cantonProvinceName = sessionStorage.getItem("jgProvince")
                // this.provinceSelect('',this.filterData.cantonProvinceName,'')
                // setTimeout(()=>{
                this.filterData.cantonCity = sessionStorage.getItem("jgCityCode")
                this.filterData.cantonCityName = sessionStorage.getItem("jgCity")
                // this.citySelect('',this.filterData.cantonCityName,'')
                // setTimeout(()=>{
                    this.filterData.cantonArea = sessionStorage.getItem("jgAreaCode")
                    this.filterData.cantonAreaName = sessionStorage.getItem("jgArea")
                //   },800)
                // },800)
            }
        },500)
    },
    methods: {
        ...mapMutations("monitoringSupervision", ["to_detail"]),
        //获取列表
        getList(val) {
            this.loading = true;
            let params = this.params;
            params["page"] = this.pageNo;
            params["rows"] = this.pageSize;
            this.$post(`/epf-monitor/monitor/moniContract/list`, params).then(
                res => {
                    console.log(res);
                    if (res.code == "0") {
                        this.contractData = res.pager.results;
                        this.pageNo = res.pager.pageNo;
                        this.pageSize = res.pager.pageSize;
                        this.totalPage = res.pager.totalPage;
                        this.totalRecord = res.pager.totalRecord;
                        this.loading = false;
                    } else {
                        this.loading = false;
                        this.$message.error(res.msg); //失败
                        return;
                    }
                }
            );
        },
        //详情页跳转
        handleClickDetail(item) {
            this.to_detail(item);
            let title = "合同详情";
            let routerPath = `/system/platform/supervise/views/contractMoni/detail?purchaseId=${item.contractId}`;
            let itemObj = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath} );
            this.$store.commit("ADD_TAB", itemObj)
        },
        handleSizeChange(val) {
            //每页条数改变时触发
            this.pageSize = val; //显示条数改变
            this.getList();
        },
        handleCurrentChange(val) {
            //当前页发生改变时触发
            this.pageNo = val; //页码改变
            this.getList();
        },
        urlEncode(param, key, encode) {
            if (param == null) return "";
            var paramStr = "";
            var t = typeof param;
            if (t == "string" || t == "number" || t == "boolean") {
                paramStr +=
                "&" +
                key +
                "=" +
                (encode == null || encode ? encodeURIComponent(param) : param);
            } else {
                for (var i in param) {
                var k =
                    key == null
                    ? i
                    : key + (param instanceof Array ? "[" + i + "]" : "." + i);
                paramStr += this.urlEncode(param[i], k, encode);
                }
            }
            return paramStr;
        },
    
        //字典选择
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
                this.dictionary.cantonCity.unshift(this.obj);
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
                this.dictionary.cantonArea.unshift(this.obj);
                return;
                }
                this.dictionary.cantonArea = "";
            });
        },
        areaSelect(dic, cantonCity, event) {
            this.filterData.cantonArea = this.$refs[cantonCity][0].$attrs.regionCode;
        },
        firstClassUseSelect(dic, firstClassUse, event) {
            this.filterData.secondClassUse = "";
            this.filterData.secondClassUseName = "";
            this.dictionary.land_use_second = "";
            let pId = this.$refs[firstClassUse][0].$attrs.id;
            this.filterData.firstClassUse = this.$refs[
                firstClassUse
            ][0].$attrs.dictKey;
            this.$get(
                `/epf-monitor/dictionaries/getDictsByCodeOrParentId?code=land_use&parentId=${pId}`,
                {}
            ).then(res => {
                console.log(res);
                if (res.dictionariesList.length != 0) {
                this.dictionary.land_use_second = res.dictionariesList;
                        this.dictionary.land_use_second.unshift(this.obj);
                return;
                }
                this.dictionary.land_use_second = "";
            });
        },
        contractSelect(dic, contract_statusName, event) {
            this.filterData.contractStatus = this.$refs[
                contract_statusName
            ][0].$attrs.dictKey;
        },
        transactionSelect(dic, transactionTypeName, event) {
            this.filterData.transactionType = this.$refs[
                transactionTypeName
            ][0].$attrs.dictKey;
        },
        secondClassUseSelect(dic, firstClassUse, event) {
            this.filterData.secondClassUse = this.$refs[
                firstClassUse
            ][0].$attrs.dictKey;
        },
        circulationSelect(dic, landTrans, event) {
            this.filterData.landType = this.$refs[landTrans][0].$attrs.dictKey;
        },
        resetFilter() {
            this.submitTime = "";
            for (let item in this.filterData) {
                if((this.provinceCheck && item == 'cantonProvince') || (this.provinceCheck && item == 'cantonProvinceName')){
                continue;
                }else if((this.cityCheck && item == 'cantonCity') || (this.cityCheck && item == 'cantonCityName')){
                continue;
                }else if((this.AreaCheck && item == 'cantonArea') || (this.AreaCheck && item == 'cantonAreaName')){
                continue;
                }else{
                this.filterData[item] = "";
                }
            }
        },
        searchList() {
            this.href='/api/epf-monitor/monitor/moniContract/downContract?'
            this.params = this.filterData;
            if (this.submitTime) {
                this.params["startCeateTime"] = this.submitTime[0];
                this.params["endCreateTime"] = this.submitTime[1];
            }
            let hrefParams=this.urlEncode(this.params).slice(1)
            this.href=this.href+hrefParams;
            this.getList()
        }
    }
}
</script>

<style scoped>
    .filter_title {
        display: inline-block;
        box-sizing: border-box;
        width: 100%;
        height: 32px;
        padding-right: 10px;
        text-align: right;
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: normal !important;
    }
    .oper {
        float: right;
        font-weight: normal;
    }
    .oper a {
        display: inline-block;
        width: 80px;
        height: 32px;
        background-color: #ffa000;
        border-radius: 2px;
        margin-right: 40px;
        text-align: center;
        line-height: 36px;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
    }
</style>