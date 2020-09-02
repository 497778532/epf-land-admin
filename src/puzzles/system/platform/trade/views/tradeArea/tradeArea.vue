<template>
    <epf-container title="区域交易汇总">
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
                    <span class="filter_title">交易类型：</span>
                </el-col>
                <el-col :span="3">
                    <el-select
                    size="small"
                    v-model="filterData.landTrans"
                    placeholder="全部"
                    @change="circulationSelect(dictionary.flow_mode,filterData.landTrans,$event)"
                    >
                    <el-option
                        v-for="(item,index) in dictionary.flow_mode"
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
                    <span class="filter_title">交易时间：</span>
                </el-col>
                <el-col :span="7">
                    <el-date-picker
                    v-model="dealTime"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    :picker-options="pickerOptions"
                    value-format="yyyy-MM-dd"
                    style="width:90%;"
                    ></el-date-picker>
                </el-col>
                <el-col :span="2">
                    <span class="filter_title">交易状态：</span>
                </el-col>
                <el-col :span="3">
                    <el-select
                    size="small"
                    v-model="filterData.trans_statusName"
                    placeholder="全部"
                    @change="statusSelect(dictionary.trans_status,filterData.trans_statusName,$event)"
                    >
                    <el-option
                        v-for="(item,index) in dictionary.trans_status"
                        :ref="item.zhCn"
                        :id="item.id"
                        :dictKey="item.dictKey"
                        :label="item.zhCn"
                        :value="item.zhCn"
                        :key="index"
                        v-show="item.zhCn != '未公告' && item.zhCn != '已公告' && item.zhCn != '交易中' && item.zhCn != '未成交(流拍)'"
                    ></el-option>
                    </el-select>
                </el-col>
                </el-row>
            <el-row style="margin-bottom:0px;">
                <el-col :span="2">
                    <span class="filter_title">交易方式：</span>
                </el-col>
                <el-col :span="3">
                    <el-select
                    size="small"
                    v-model="filterData.transMode"
                    placeholder="全部"
                    >
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="委托交易" value="1"></el-option>
                    <el-option label="自行交易" value="2"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="5" style="text-align:right">
                    <button class="epf_btn epf_btn_bg" @click="searchList()"> 查 询</button>
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
                    :data="dealData"
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
                    <el-table-column label="序号" min-width="103" align="center">
                        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                    </el-table-column>
                    <el-table-column label="行政区域" min-width="228">
                        <template slot-scope="scope">
                        <span>{{scope.row.cantonProvinceName}}</span>
                        <span v-if="scope.row.cantonCity">/</span>
                        <span>{{scope.row.cantonCityName}}</span>
                        <span v-if="scope.row.cantonArea">/</span>
                        <span>{{scope.row.cantonAreaName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="landCharName" label="土地性质" min-width="138"></el-table-column>
                    <el-table-column label="用途" min-width="168">
                        <template slot-scope="scope">
                        <span>{{scope.row.firstClassUseName}}</span>
                        <span v-if="scope.row.secondClassUse!='all'">/</span>
                        <span v-if="scope.row.secondClassUse!='all'">{{scope.row.secondClassUseName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="circulationName" label="交易类型" min-width="108"></el-table-column>
                    <el-table-column prop="resulCount" label="成交宗数" min-width="137"></el-table-column>
                        <!--   <el-table-column prop="sellAreaSum" label="供应面积（万平方米）" min-width="175"></el-table-column>-->
                    <el-table-column prop="transPrice" label="成交金额（万元）" min-width="167"></el-table-column>
                    <el-table-column prop="areaSum" label="成交面积（万平方米）" min-width="192"></el-table-column>
                    <el-table-column prop="premiumPrice" label="溢价金额（万元）" min-width="167"></el-table-column>
                    <el-table-column prop="licenseUserCount" label="竞买申请人数" min-width="137" fixed="right"></el-table-column>
                </el-table>
                <!-- 分页控件 -->
                <div class="epf_paging_fixe">
                    <el-pagination
                        background
                        layout="total,prev, pager, next,sizes,jumper"
                        :page-sizes="[1,5,10,15,20]"
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
            //区域交易汇总列表
            dealData: [],
            dealTime: "",
            resulCountSum: "000004", //成交宗数
            sellAreaSum: "1800,000,000,00", //供应面积（万平方米）
            transPriceSum: "1800,000,000,00", //成交金额（万元）
            areaSum: "1200,000,000,00", //成交面积（万平方米）
            premiumPriceSum: "1200,000,000,00", //溢价金额（万元）
            licenseUserCountSum: "000009", //竞买申请人数

            params: {
                cantonProvince: "",
                cantonCity: "",
                cantonArea: "",
                landChar: "",
                firstClassUse: "",
                secondClassUse: "",
                circulation: "",
                noticeDateBegin: "",
                noticeDateEnd: "",
                status: "",
                isExport: false, //导出

                transMode:"",//交易方式
            },
            //导出
            href:
                "/epf-monitor/statistics/trans/queryGroupByCanton?isExport=true",

            //页码
            currentPage: 1,
            pageNo: 1, //页码
            pageSize: 5, //每页条数
            totalPage: 1,
            totalRecord: 1,

            loading: true,

            filterData: {
                cantonProvinceName: "", //省
                cantonProvince: "",
                cantonCityName: "", //市
                cantonCity: "",
                cantonAreaName: "", //区
                cantonArea: "",
                landCharName: "", //土地性质
                landChar: "",
                firstClassUseName: "", //一级土地用途
                firstClassUse: "",
                secondClassUseName: "", //二级土地用途
                secondClassUse: "",
                landTrans: "", //交易类型
                circulation: "",
                dealTime: "", //交易时间
                trans_statusName: "", //交易状态
                trans_status: "",
                targetNo: "", //标的编号
                isExport: false, //导出

                transMode:"",//交易方式
            },
            dicRequest: [
                "flow_mode",
                "trans_status",
                "land_nature",
                "land_use",
            ], //字典码请求
            dictionary: {
                //字典码结果
                flow_mode: "",
                trans_status: "",
                land_nature: "",
                land_use: "",
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
            },
            dictObj: {
                dictKey: "",
                id: "",
                zhCn: "全部"
            }
        };
    },
    created() {
        this.boxHeight = window.innerHeight - 250;
        const that = this;
        let reqArr = this.dicRequest.map((item, index, arr) => {
        let reqFun = new Promise((resolve, reject) => {
            if ( item == "land_use") {
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
        console.log(dicArr);
        dicArr.forEach(function(item, index) {
            item.unshift(that.dictObj);
        });
        for (let item in this.dictionary) {
            console.log(this.dicNum);
            this.dictionary[item] = dicArr[this.dicNum];
            // console.log(dicArr[this.dicNum])
            this.dicNum++;
        }
        this.dictionary.trans_status.splice(1, 1);

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
            this.dealTime
                ? (params["noticeDateBegin"] = this.dealTime[0])
                : (params["noticeDateBegin"] = "");
            this.dealTime
                ? (params["noticeDateEnd"] = this.dealTime[1])
                : (params["noticeDateEnd"] = "");
            this.$get(
                `/epf-monitor/statistics/trans/queryGroupByCanton`,
                params
            ).then(res => {
                console.log(res);
                if (res.code == "0") {
                for (var key in res.pager.results) {
                    if (res.pager.results[key].cantonProvinceName == "null") {
                    res.pager.results[key].cantonProvinceName = "全部";
                    }
                    if (res.pager.results[key].circulationName == "null") {
                    res.pager.results[key].circulationName = "全部";
                    }
                    if (res.pager.results[key].landCharName == "null") {
                    res.pager.results[key].landCharName = "全部";
                    }
                    if (res.pager.results[key].firstClassUseName == "null") {
                    res.pager.results[key].firstClassUseName = "全部";
                    }
                    if (res.pager.results[key].secondClassUseName == "null") {
                    res.pager.results[key].secondClassUseName = "全部";
                    }
                }
                this.dealData = res.pager.results;
                this.pageNo = res.pager.pageNo;
                this.pageSize = res.pager.pageSize;
                this.totalPage = res.pager.totalPage;
                this.totalRecord = res.pager.totalRecord;
                this.resulCountSum = res.sum[0].resulCount;
                this.sellAreaSum = res.sum[0].sellAreaSum;
                this.transPriceSum = res.sum[0].transPrice;
                this.areaSum = res.sum[0].areaSum;
                this.premiumPriceSum = res.sum[0].premiumPrice;
                this.licenseUserCountSum = res.sum[0].licenseUserCount;
                this.loading = false;
                this.href = `/api/epf-monitor/statistics/trans/queryGroupByCanton?isExport=true&cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&landChar=${this.params.landChar}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&circulation=${this.params.circulation}&status=${this.params.status}&noticeDateBegin=${this.params.noticeDateBegin}&noticeDateEnd=${this.params.noticeDateEnd}`;
                } else {
                this.loading = false;
                // this.$message.error(res.msg); //失败
                return;
                }
            });
        },
        resetFilter() {
            this.dealTime = "";
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
            this.filterData.isExport = false;
        },
        searchList() {
            this.params = this.filterData;
            this.params["status"] = this.filterData.trans_status;
            this.params["goodsNo"] = this.filterData.targetNo;
            if (this.dealTime) {
                this.params["noticeDateBegin"] = this.dealTime[0];
                this.params["noticeDateEnd"] = this.dealTime[1];
            }
            this.getList();
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
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                sums[index] = "总价";
                return;
                } else if (index == 5) {
                sums[index] = this.resulCountSum;
                } else if (index === 6) {
                sums[index] = this.sellAreaSum;
                } else if (index === 7) {
                sums[index] = this.transPriceSum;
                } else if (index === 8) {
                sums[index] = this.areaSum;
                } else if (index === 9) {
                sums[index] = this.premiumPriceSum;
                } else if (index === 10) {
                sums[index] = this.licenseUserCountSum;
                } else {
                sums[index] = "";
                }
            });

            return sums;
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
               // `/epf-monitor/dictionaries/getDictsByCodeOrParentId?code=administrative_regions&parentId=${pId}`,
         `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        
                {}
            ).then(res => {
                console.log(res);
                if (res.dictionariesList.length != 0) {
                this.dictionary.cantonCity = res.dictionariesList;
                this.dictionary.cantonCity.unshift(this.dictObj);
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
               // `/epf-monitor/dictionaries/getDictsByCodeOrParentId?code=administrative_regions&parentId=${pId}`,
         `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        
                {}
            ).then(res => {
                console.log(res);
                if (res.dictionariesList.length != 0) {
                this.dictionary.cantonArea = res.dictionariesList;
                this.dictionary.cantonArea.unshift(this.dictObj);
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
                this.dictionary.land_use_second.unshift(this.dictObj);
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
        circulationSelect(dic, circulationName, event) {
            this.filterData.circulation = this.$refs[
                circulationName
            ][0].$attrs.dictKey;
        },
        landCharSelect(dic, landCharName, event) {
            this.filterData.landChar = this.$refs[landCharName][0].$attrs.dictKey;
        },
        statusSelect(dic, trans_statusName, event) {
            this.filterData.trans_status = this.$refs[
                trans_statusName
            ][0].$attrs.dictKey;
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