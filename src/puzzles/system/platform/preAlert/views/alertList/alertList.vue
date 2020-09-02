<template>
    <epf-container title="预警列表">
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
                    <span class="filter_title">预警时间：</span>
                </el-col>
                <el-col :span="6">
                    <el-date-picker
                    v-model="subTime"
                    type="daterange"
                    unlink-panels
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="起始日期"
                    end-placeholder="截止日期"
                    size="small"
                    :picker-options="pickerOptions"
                    ></el-date-picker>
                </el-col>
                <el-col :span="2">
                    <span class="filter_title">地块编号：</span>
                </el-col>
                <el-col :span="3">
                    <el-input v-model="filterData.goodsNo" size="small" placeholder="请输入标题"></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:0;">
                <el-col :span="23" style="text-align:right">
                    <button class="epf_btn epf_btn_bg" @click="searchList()" 查 询</button>
                    <button class="epf_btn epf_btn_def" @click="resetFilter()"> 重 置</button>
                </el-col>
            </el-row>
        </div>
        <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}"> 
            <div class="epf_toolbar">
                <span class="toolsTitle">数据列表</span>
                <span class="button_export"><a :href="href" style="color: #ffa000;">导出</a></span>
            </div>
            <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 205 +'px'}">
                <el-table
                    ref="multipleTable"
                    :data="provideData"
                    style="width: 100%;min-height:80px;"
                    border
                    :height="boxHeight - 260"
                    tooltip-effect="dark"
                    >
                    <el-table-column label="序号" width="68" align="center">
                    <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                    </el-table-column>
                    <el-table-column prop="warnType" label="预警类别" width="110"></el-table-column>
                    <el-table-column prop="warnGrade" label="预警等级" width="110"></el-table-column>
                    <el-table-column prop="warningContent" label="预警内容" width="400"></el-table-column>
                    <el-table-column label="行政区域" width="180">
                    <template slot-scope="scope">
                        <span>{{scope.row.cantonProvinceName}}/{{scope.row.cantonCityName}}/{{scope.row.cantonAreaName}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column prop="targetNo" label="标的编号" :show-overflow-tooltip="true" width="280"></el-table-column>
                    <el-table-column prop="warnTime" label="预警时间"></el-table-column>

                    <el-table-column label="操作">
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
export default {
    data() {
        return {
            //根据权限锁定省市
            provinceCheck:false,
            cityCheck:false,
            AreaCheck:false,
            //供给监测列表
            provideData: [

            ],
            subTime:[],
            params: {},
            //导出
            href: "/api/epf-monitor/monitor/moniSell/downMoniSell",
            //页码
            currentPage: 1,
            pageNo: 1, //页码
            pageSize: 5, //每页条数
            totalPage: 1,
            totalRecord: 1,

            loading: true,

            searchInfo: {},

            multipleSelection: [],

            filterData: {
                startDate: "",
                endDate:'',
                cantonProvinceName: "",
                cantonProvince: "",
                cantonCityName: "",
                cantonCity: "",
                cantonAreaName: "",
                cantonArea: "",
                goodsNo: "" //地块编号
            },
            dictionary: {
                administrative_regions: "",
                cantonCity: "",
                cantonArea: ""
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
    methods: {
        //获取列表
        getList(val) {
            this.loading = true;
            let params = this.params;
            params["page"] = this.pageNo;
            params["rows"] = this.pageSize;
            this.$post(`/epf-monitor/monitor/warnLog/querywarnList`, params).then(res => {
                console.log(res);
                if (res.code == "0") {
                this.provideData = res.pager.results;
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
            });
        },
        resetFilter() {
            this.subTime = "";
            for (let item in this.filterData) {
                // this.filterData[item] = "";
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
            this.params = this.filterData;
            if (this.subTime) {
                this.params["startDate"] = this.subTime[0];
                this.params["endDate"] = this.subTime[1];
            }

            console.log(this.params);
            this.getList();
        },
        //详情页跳转
        handleClickDetail(item) {
            let title = "预警详情";
            let routerPath = `/system/platform/preAlert/views/alertList/detail?id=${item.id}&cantonProvince=${item.cantonProvinceName}&cantonCity=${item.cantonCityName}&cantonArea=${item.cantonAreaName}`;
            let itemObj = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath,query: { id: item.id,cantonProvince:item.cantonProvinceName,cantonCity:item.cantonCityName,cantonArea:item.cantonAreaName } } );
            this.$store.commit("ADD_TAB", itemObj)
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
        circulationSelect(dic, entrustAgency, event) {
            this.filterData.entrustAgency = this.$refs[
                entrustAgency
            ][0].$attrs.dictKey;
            this.filterData.entrustAgencyId = this.$refs[
                entrustAgency
            ][0].$attrs.dictId;
            this.filterData.trustOrgId = this.$refs[entrustAgency][0].$attrs.dictKey;
        }
    },
    created() {
        this.boxHeight = window.innerHeight - 250;
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