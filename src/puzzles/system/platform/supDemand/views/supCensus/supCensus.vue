<template>
    <epf-container title="供给统计">
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
                    <div style="width:30%;float:left;margin-right:9px;">
                    <el-select
                        v-model="filterData.cantonCityName"
                        size="small"
                        placeholder="全部"
                        @change="citySelect(dictionary.cantonCity,filterData.cantonCityName,$event)"
                        :disabled="cityCheck"
                    >
                        <el-option
                        v-for="(item,index) in dictionary.cantonCity"
                        :ref="item.regionName"
                        :id="item.id"
                        :regionCode="item.regionCode"
                        :label="item.regionName"
                        :value="item.regionName"
                        :key="index"
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
                        v-for="(item,index) in dictionary.cantonArea"
                        :ref="item.regionName"
                        :id="item.id"
                        :regionCode="item.regionCode"
                        :label="item.regionName"
                        :value="item.regionName"
                        :key="index"
                        ></el-option>
                    </el-select>
                    </div>
                </el-col>
                <el-col :span="2">
                    <span class="filter_title">土地性质：</span>
                </el-col>
                <el-col :span="3">
                    <el-select
                    size="small"
                    v-model="filterData.landCharName"
                    placeholder="全部"
                    @change="landCharSelect(dictionary.land_nature,filterData.landCharName,$event)"
                    >
                    <el-option
                        v-for="(item,index) in dictionary.land_nature"
                        :ref="item.zhCn"
                        :id="item.id"
                        :dictKey="item.dictKey"
                        :label="item.zhCn"
                        :value="item.zhCn"
                        :key="index"
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
                        v-for="(item,index) in dictionary.land_use_second"
                        :ref="item.zhCn"
                        :label="item.zhCn"
                        :dictKey="item.dictKey"
                        :value="item.zhCn"
                        :key="index"
                        ></el-option>
                    </el-select>
                    </div>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:10px;">
                <el-col :span="2">
                    <span class="filter_title">总价：</span>
                </el-col>
                <el-col :span="4">
                    <div style="width:80px;float:left;">
                    <el-input v-model="filterData.startAmount" size="small" placeholder="起始价"></el-input>
                    </div>
                    <i style="float:left;width:30px;text-align:center;line-height:40px;">-</i>

                    <div style="width:80px;float:left;">
                    <el-input v-model="filterData.endAmount" size="small" placeholder="终止价"></el-input>
                    </div>

                    <i style="float:left;margin-left:15px;line-height:40px;">万元</i>
                </el-col>

                <el-col :span="2">
                    <span class="filter_title">提交时间：</span>
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
                    <span class="filter_title">当前状态：</span>
                </el-col>
                <el-col :span="3">
                    <el-select
                    @change="publishStatusSelect(dictionary,filterData.publishStatusName,$event)"
                    v-model="filterData.publishStatusName"
                    placeholder="全部"
                    disabled
                    >
                    <el-option
                        v-for="(item,index) in dictionary.tsell_status"
                        :ref="item.zhCn"
                        :label="item.zhCn"
                        :dictKey="item.dictKey"
                        :value="item.zhCn"
                        :key="index"
                    ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="5" style="text-align:right">
                    <button class="epf_btn epf_btn_bg" @click="searchList('type')" 查 询</button>
                    <button class="epf_btn epf_btn_def" @click="resetFilter('type')"> 重 置</button>
                </el-col>
            </el-row>
        </div>
        <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}"> 
            <div class="epf_toolbar">
                <span class="toolsTitle">供给统计列表</span>
                <span class="button_export"><a :href="href" style="color: #ffa000;">导出</a></span>
            </div>
            <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 205 +'px'}">
                <el-table
                    ref="multipleTable"
                    :data="list"
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:80px;"
                    border
                    :height="boxHeight - 260"
                    tooltip-effect="dark"
                    :summary-method="getSummaries"
                    show-summary
                    >
                    <el-table-column label="序号" width="85" align="center">
                    <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                    </el-table-column>
                    <el-table-column label="行政区域">
                    <template slot-scope="scope">
                        <span>{{scope.row.cantonProvinceName}} {{scope.row.cantonCityName}} {{scope.row.cantonAreaName}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column prop="landCharName" label="土地性质" width="170"></el-table-column>
                    <el-table-column label="用途">
                    <template slot-scope="scope">
                        <span>{{scope.row.firstClassUseName}} {{scope.row.secondClassUseName}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column prop="circulationName" label="供给类型" width="220"></el-table-column>
                    <el-table-column prop="publishStatusName" label="状态" width="210"></el-table-column>
                    <el-table-column prop="price" label="总价（万元）" width="240"></el-table-column>
                    <el-table-column prop="area" label="面积（万平方米）" width="260"></el-table-column>
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
export default {
    data() {
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
            //需求统计列表
            list: [],
            priceSum: "600,000,000,00",
            areaSum: "800,000,00",

            params: {},
            href: "/api/epf-monitor/monitor/moniSellAnalyse/downSellAnalyse?",
            //页码
            currentPage: 1,
            pageNo: 1, //页码
            pageSize: 5, //每页条数
            totalPage: 1,
            totalRecord: 1,

            loading: false,

            multipleSelection: [],

            filterData: {
                cantonProvinceName: "",
                cantonProvince: "",
                cantonCityName: "",
                cantonCity: "",
                cantonAreaName: "",
                cantonArea: "",
                landChar: "", //土地性质
                landCharName: "", //用途
                firstClassUse: "",
                firstClassUseName: "", //一级土地用途
                secondClassUse: "",
                secondClassUseName: "", //二级土地用途
                startAmount: "", //起始面积
                endAmount: "",
                startDate: "",
                endDate: "",
                publishStatus: "published2",
                publishStatusName: "已发布"
            },
            totalArea: "",
            totalPrice: "",
            dicRequest: [
                "purchasr_demand",
                "land_nature",
                "land_use",
                "tsell_status",
            ], //字典码请求
            dictionary: {
                //字典码结果
                purchasr_demand: "",
                land_nature: "",
                land_use: "",
                tsell_status: "",
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
        const that=this
        let reqArr = this.dicRequest.map((item, index, arr) => {
        let reqFun = new Promise((resolve, reject) => {
            if (item == "land_use") {
                this.$get(
                    `/epf-monitor/dictionaries/getDictsByCodeOrParentId?code=${item}`,
                    { parentId: 0 }
                ).then(res => {
                    resolve(res);
                });
            } else {
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
        console.log("字典结果", this.dictionary);
        });
        // @name: 行政区域
        // @description: 主要是getAreaByCodeOrParentId接口返回字段修改zhCn -> regionName，dictKey->regionCode
        // @author: gaojie
        // @chageTime:2020-3-3
        this.$get(`/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000`,{}).then(res => {
        this.dictionary.administrative_regions = res.dictionariesList;
        })
        this.params=this.filterData
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
        //获取列表
        getList(val) {
            this.loading = true;
            let params = this.params;
            params["page"] = this.pageNo;
            params["rows"] = this.pageSize;
            this.$post(`/epf-monitor/monitor/moniSellAnalyse/list`, params).then(
                res => {
                console.log(res);
                if (res.code == "0") {
                    for (var key in res.pager.results) {
                    if (
                        !res.pager.results[key].firstClassUseName &&
                        !res.pager.results[key].secondClassUseName||
                        res.pager.results[key].firstClassUseName == "null"&&           
                        res.pager.results[key].secondClassUseName == "null"
                    ) {
                        res.pager.results[key].firstClassUseName = "全部";
                        res.pager.results[key].secondClassUseName = ""
                    }else if (
                        !res.pager.results[key].secondClassUseName ||
                        res.pager.results[key].secondClassUseName == "null"
                    ) {
                        res.pager.results[key].secondClassUseName = "全部";
                    }
                    if (
                        !res.pager.results[key].landCharName ||
                        res.pager.results[key].landCharName == "null"
                    ) {
                        res.pager.results[key].landCharName = "全部";
                    }
                    if (
                        !res.pager.results[key].circulationName ||
                        res.pager.results[key].circulationName == "null"
                    ) {
                        res.pager.results[key].circulationName = "全部";
                    }
                    if (
                        !res.pager.results[key].publishStatusName ||
                        res.pager.results[key].publishStatusName == "null"
                    ) {
                        res.pager.results[key].publishStatusName = "全部";
                    }
                    //                if (!res.pager.results[key].landCharName||res.pager.results[key].landCharName == "null") {
                    //   res.pager.results[key].landCharName = "全部";
                    // }
                    }
                    this.totalArea = res.totalArea;
                    this.totalPrice = res.totalPrice;
                    this.list = res.pager.results;
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
        handleSizeChange(val) {
            //每页条数改变时触发
            this.pageNo = 1;
            this.pageSize = val; //显示条数改变
            this.getList();
        },
        handleCurrentChange(val) {
            //当前页发生改变时触发
            this.pageNo = val; //页码改变
            this.getList();
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                sums[index] = "总价";
                return;
                } else if (index == 6) {
                sums[index] = this.totalPrice;
                } else if (index === 7) {
                sums[index] = this.totalArea;
                } else {
                sums[index] = "";
                }
            });

            return sums;
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
        secondClassUseSelect(dic, firstClassUse, event) {
            this.filterData.secondClassUse = this.$refs[
                firstClassUse
            ][0].$attrs.dictKey;
        },
        purchasrSelect(dic, entrustAgency, event) {
            this.filterData.entrustAgency = this.$refs[
                entrustAgency
            ][0].$attrs.dictKey;
            this.filterData.entrustAgencyId = this.$refs[
                entrustAgency
            ][0].$attrs.dictId;
            this.filterData.trustOrgId = this.$refs[entrustAgency][0].$attrs.dictKey;
        },
        publishStatusSelect(dic, publishStatusName, event) {
            // console.log(this.$refs[publishStatusName][0])

            this.filterData.publishStatus = this.$refs[
                publishStatusName
            ][0].$attrs.dictKey;
        },
        landCharSelect(dic, landCharName, event) {
            this.filterData.landChar = this.$refs[landCharName][0].$attrs.dictKey;
        },
        searchList() {
            this.href="/api/epf-monitor/monitor/moniSellAnalyse/downSellAnalyse?"
            this.params = this.filterData;
            if (this.submitTime) {
                this.params["startDate"] = this.submitTime[0];
                this.params["endDate"] = this.submitTime[1];
        }
        let hrefParams = this.urlEncode(this.params).slice(1);
            this.href = this.href + hrefParams;
            console.log(this.params);
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
        }
    },
  
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