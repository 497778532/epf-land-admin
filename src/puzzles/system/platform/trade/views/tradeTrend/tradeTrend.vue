<template>
    <epf-container title="交易类型区域趋势">
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
            <el-row style="margin-bottom:0;">
                <el-col :span="2">
                    <span class="filter_title">交易状态：</span>
                </el-col>
                <el-col :span="3">
                    <el-select
                    size="small"
                    v-model="filterData.trans_statusName"
                    placeholder="全部"
                    @change="statusSelect(dictionary.trans_status,filterData.trans_statusName,$event)"
                    disabled
                    >
                    <el-option
                        v-for="(item,index) in dictionary.trans_status"
                        :ref="item.zhCn"
                        :id="item.id"
                        :dictKey="item.dictKey"
                        :label="item.zhCn"
                        :value="item.zhCn"
                        :key="index"
                        v-show="item.zhCn != '未公告' && item.zhCn != '已公告'"
                    ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="2">
                    <span class="filter_title">对比类型：</span>
                </el-col>
                <el-col :span="3">
                    <el-select v-model="filterData.analyze" @change="analyzeSelect">
                    <el-option
                        v-for="item in analyzeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item"
                    ></el-option>
                    </el-select>
                </el-col>

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
            <el-tabs
                v-model="activeName"
                @tab-click="handleClick"
                style="margin-top:25px;width:100%;"
                >
                <el-tab-pane label="图形" name="graph" style="width:100%;height:100%; position: relative;">
                    <div class="toolsTitleBox_graph" style="background-color:#fff;border:0;">
                        <div class="operCycle">
                            <div style="display:flex;">
                                <span style="margin:0 100px 0 50px;">
                                对比周期：
                                <el-radio-group v-model="timeCycle" style="margin-left:25px;">
                                    <el-radio
                                    :label="item.value"
                                    :key="item.value"
                                    v-for="item in cycleList"
                                    @change="toggleCycle(item)"
                                    >{{item.label}}</el-radio>
                                </el-radio-group>
                                </span>
                                <span style="display:flex;justify-content:center;align-items: center;">
                                <span
                                    style="width:100px;display:flex;justify-content:flex-end;margin-right:20px;"
                                >交易时间：</span>
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
                                    style="display:flex;justify-content:flex-start;"
                                ></el-date-picker>
                                </span>
                                <span class="button_export"><a :href="href" style="color: #ffa000;">导出</a></span>
                            </div>
                            <div style="margin:0 50px 0 20px;display:flex;height:55px;">
                                交易类型对比：
                                <el-checkbox
                                :indeterminate="isIndeterminate"
                                v-model="checkAll"
                                @change="handleCheckAllTypeChange"
                                style="margin-left:20px;"
                                >全部</el-checkbox>
                                <el-checkbox-group v-model="checkedTypes" @change="handleCheckedTypesChange">
                                <el-checkbox
                                    v-for="item in flowModeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item"
                                >{{item.label}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                    </div>
                    <div id="cycleChart" style="width:100%;height:550px;margin-bottom:75px;"></div>
                </el-tab-pane>
                <el-tab-pane label="列表" name="list" style="width:100%;">
                    <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}">
                        <div class="toolsTitleBox_graph" style="background-color:#fff;border:0;">
                            <div class="operCycle">
                                <div style="display:flex;">
                                    <span style="margin:0 100px 0 50px;">
                                    对比周期：
                                    <el-radio-group v-model="timeCycle" style="margin-left:25px;">
                                        <el-radio
                                        :label="item.value"
                                        :key="item.value"
                                        v-for="item in cycleList"
                                        @change="toggleCycle(item)"
                                        >{{item.label}}</el-radio>
                                    </el-radio-group>
                                    </span>
                                    <span style="display:flex;justify-content:center;align-items: center;">
                                    <span
                                        style="width:100px;display:flex;justify-content:flex-end;margin-right:20px;"
                                    >交易时间：</span>
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
                                        style="display:flex;justify-content:flex-start;"
                                    ></el-date-picker>
                                    </span>
                                    <span class="button_export"><a :href="href" style="color: #ffa000;">导出</a></span>
                                </div>
                                <div style="margin:0 50px 0 20px;display:flex;height:55px;">
                                    交易类型对比：
                                    <el-checkbox
                                    :indeterminate="isIndeterminate"
                                    v-model="checkAll"
                                    @change="handleCheckAllTypeChange"
                                    style="margin-left:20px;"
                                    >全部</el-checkbox>
                                    <el-checkbox-group v-model="checkedTypes" @change="handleCheckedTypesChange">
                                    <el-checkbox
                                        v-for="item in flowModeList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item"
                                    >{{item.label}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </div>
                        <div class="epf_toolbar">
                            <span class="toolsTitle">数据列表</span>
                            <div class="oper">
                            <!-- <span>导出</span> -->
                            </div>
                        </div>
                        <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 205 +'px'}">
                            <el-table
                                ref="multipleTable"
                                :data="dealListData"
                                v-loading="loading"
                                element-loading-text="数据加载中"
                                element-loading-background="rgba(255, 255, 255,0.95)"
                                style="width: 100%;min-height:80px;"
                                border
                                :height="boxHeight - 370"
                                >
                                <el-table-column label="序号" min-width="90" align="center">
                                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                                </el-table-column>
                                <el-table-column label="用途" min-width="230">
                                <template slot-scope="scope">
                                    <!-- <span>{{scope.row.firstClassUseName}}/{{scope.row.secondClassUseName}}</span> -->
                                    <span v-if="scope.row.firstClassUse=='all'">全部</span>
                                    <span v-if="scope.row.firstClassUse!='all'">{{scope.row.firstClassUseName}}</span>
                                    <span v-if="scope.row.secondClassUse!='all'">/</span>
                                    <span v-if="scope.row.secondClassUse!='all'">{{scope.row.secondClassUseName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column label="土地性质" min-width="150">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.landChar=='all'">全部</span>
                                    <span v-if="scope.row.landChar!='all'">{{scope.row.landCharName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column label="交易状态" min-width="120">
                                <!-- <template slot-scope="scope"> -->
                                <!-- <span v-if="scope.row.status=='all'">全部</span>
                                <span v-if="scope.row.status!='all'">{{scope.row.statusName}}</span>-->
                                <span v-if="filterData.trans_statusName ==''">全部</span>
                                <span v-if="filterData.trans_statusName !=''">{{filterData.trans_statusName}}</span>
                                <!-- </template> -->
                                </el-table-column>
                                <el-table-column label="区域" min-width="200">
                                <template slot-scope="scope">
                                    <!-- <span>{{scope.row.cantonProvinceName}}/{{scope.row.cantonCityName}}/{{scope.row.cantonAreaName}}</span> -->
                                    <span v-if="scope.row.cantonProvince=='all'">全部</span>
                                    <span v-if="scope.row.cantonProvince!='all'">{{scope.row.cantonProvinceName}}</span>
                                    <span v-if="scope.row.cantonCity!='all'">/</span>
                                    <span v-if="scope.row.cantonCity!='all'">{{scope.row.cantonCityName}}</span>
                                    <span v-if="scope.row.cantonArea!='all'">/</span>
                                    <span v-if="scope.row.cantonArea!='all'">{{scope.row.cantonAreaName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column label="时间" min-width="120">
                                <template slot-scope="scope">
                                    <span v-if="timeCycleName == 'MOUTH'">{{scope.row.yearMonth}}</span>
                                    <span v-if="timeCycleName == 'SEASON'">{{scope.row.year}}年第{{scope.row.season}}季度</span>
                                    <span v-if="timeCycleName == 'YEAR'">{{scope.row.year}}年</span>
                                    </template>
                                
                                </el-table-column>
                                <!-- <el-table-column label="土地性质" min-width="150">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.resulCount=='all'">全部</span>
                                    <span v-if="scope.row.resulCount!='all'">{{scope.row.landCharName}}</span>
                                </template>
                                </el-table-column> -->
                                <!-- <el-table-column
                                v-for="(item,index) in subListData"
                                :key="index"
                                :label="item.circulationName"
                                header-align="center"
                                > -->
                                <el-table-column
                                label="全部"
                                header-align="center"
                                v-if="checkTransfer || checkRent || checkMortgage"
                                >
                                <el-table-column label="宗数" min-width="90">
                                    <template slot-scope="scope">
                                    <span>{{scope.row.resulCount}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="金额（万元）" min-width="150">
                                    <template slot-scope="scope">
                                    <span>{{scope.row.transPrice}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="面积（万平方米）" min-width="150">
                                    <template slot-scope="scope">
                                    <span>{{scope.row.areaSum}}</span>
                                    </template>
                                </el-table-column>
                                </el-table-column>
                                <el-table-column
                                label="转让"
                                header-align="center"
                                v-if="checkTransfer"
                                >
                                <el-table-column label="宗数" min-width="90">
                                    <template slot-scope="scope">
                                    <span>{{scope.row.transferResult}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="金额（万元）" min-width="150">
                                    <template slot-scope="scope">
                                    <span>{{scope.row.transferPrice}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="面积（万平方米）" min-width="150">
                                    <template slot-scope="scope">
                                    <span>{{scope.row.transferArea}}</span>
                                    </template>
                                </el-table-column>
                                </el-table-column>
                                <el-table-column
                                label="出租"
                                header-align="center"
                                v-if="checkRent"
                                >
                                <el-table-column label="宗数" min-width="90">
                                    <template slot-scope="scope">
                                    <span>{{scope.row.rentResult}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="金额（万元）" min-width="150">
                                    <template slot-scope="scope">
                                    <span>{{scope.row.rentPrice}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="面积（万平方米）" min-width="150">
                                    <template slot-scope="scope">
                                    <span>{{scope.row.rentArea}}</span>
                                    </template>
                                </el-table-column>
                                </el-table-column>
                                <el-table-column
                                label="抵押"
                                header-align="center"
                                v-if="checkMortgage"
                                >
                                <el-table-column label="宗数" min-width="90">
                                    <template slot-scope="scope">
                                    <span>{{scope.row.mortgageResult}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="金额（万元）" min-width="150">
                                    <template slot-scope="scope">
                                    <span>{{scope.row.mortgagePrice}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="面积（万平方米）" min-width="150">
                                    <template slot-scope="scope">
                                    <span>{{scope.row.mortgageArea}}</span>
                                    </template>
                                </el-table-column>
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
                </el-tab-pane>
            </el-tabs>
    </epf-container>
</template>

<script>
import echarts from "echarts";
export default {
    data() {
        return {
            //根据权限锁定省市
            provinceCheck:false,
            cityCheck:false,
            AreaCheck:false,
            activeName: "graph",
            currentName: "graph",
            //导出
            href:
                "/api/epf-monitor/statistics/trans/queryGroupByTimeOfCirculationList?isExport=true",
            analyzeList: [
                {
                value: "JE",
                label: "金额"
                },
                {
                value: "MJ",
                label: "面积"
                },
                {
                value: "ZS",
                label: "宗数"
                }
            ],
            flowModeList: [
                {
                value: "transfer",
                label: "转让"
                },
                {
                value: "rent",
                label: "出租"
                },
                {
                value: "mortgage",
                label: "抵押"
                }
            ],
            //页码
            currentPage: 1,
            totalPage: 1,
            totalRecord: 1,
            pageNo: 1,
            pageSize: 5,

            selection: [],
            circulationName: "",
            circulationData: "",

            loading: true,

            //交易类型对比
            checkTransfer: true,
            checkRent: true,
            checkMortgage: true,
            checkMore: true,
            checkedTypes: ["转让", "出租", "抵押"],
            checkAll: true,
            isIndeterminate: true,

            timeCycle: "MOUTH", //对比周期
            timeCycleName: "MOUTH",
            submitTime: "", //发布时间

            cycleList: [
                {
                value: "MOUTH",
                label: "月"
                },
                {
                value: "SEASON",
                label: "季"
                },
                {
                value: "YEAR",
                label: "年"
                }
            ],

            params: {
                cantonProvince: "",
                cantonCity: "",
                cantonArea: "",
                landChar: "",
                firstClassUse: "",
                secondClassUse: "",
                noticeDateBegin: "",
                noticeDateEnd: "",
                analyze: "面积",
                status: "",
                contrastType: "",

                transMode:"",//交易方式
                // circulation: "",
            },
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
                // circulation: "",
                trans_statusName: "已成交", //交易状态
                trans_status: "trans_status-007",
                submitTime: "",
                analyze: "面积", //对比类型

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
                    this.cycleDrawLine();
                    }
                },
                {
                    text: "最近一个月",
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit("pick", [start, end]);
                    this.cycleDrawLine();
                    }
                },
                {
                    text: "最近三个月",
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit("pick", [start, end]);
                    this.cycleDrawLine();
                    }
                }
                ],
                onPick: dateRange => {
                if (!dateRange.maxDate) {
                    return;
                }
                this.dateVal = [dateRange.minDate, dateRange.maxDate];
                this.cycleDrawLine();
                }
            },
            //项目交易结构分析--列表
            dealListData: [],
            subListData: [],

            dictObj: {
                dictKey: "",
                id: "",
                zhCn: "全部"
            }
        };
    },
    methods: {
        resetFilter() {
            this.submitTime = "";
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
                this.filterData.analyze = "面积";
                this.filterData.trans_statusName = "已成交";
                this.filterData.trans_status = "trans_status-007";
            }
            // this.filterData.isExport = false;
        },
        searchList() {
            this.params = this.filterData;
            this.params["status"] = this.filterData.trans_status;
            if (this.submitTime) {
                this.params["noticeDateBegin"] = this.submitTime[0];
                this.params["noticeDateEnd"] = this.submitTime[1];
            }
            if (this.activeName == "graph") {
                const that = this;
                that.cycleDrawLine();
            } else if (this.activeName == "list") {
                const that = this;
                that.getList();
            }
        },

        toggleCycle(item) {
            this.timeCycleName = item.value;
            console.log(this.timeCycle);
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
        handleCheckAllTypeChange(val) {
            this.checkedTypes = val ? ["转让", "出租", "抵押"] : [];
            this.isIndeterminate = false;
        },
        handleCheckedTypesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.flowModeList.length;
            this.isIndeterminate =
                checkedCount > 0 && checkedCount < this.flowModeList.length;
        },
        handleClick(val) {
            if (val.name == this.currentName) {
                return;
            }
            this.currentName = val.name;
            if (this.activeName == "graph") {
                this.cycleDrawLine();
            } else if (this.activeName == "list") {
                const that = this;
                that.getList();
            }
        },
        getList(val) {
            this.loading = true;
            let params = this.params;
            // params["page"] = this.pageNo;
            // params["rows"] = this.pageSize;
            params["contrastType"] = this.timeCycleName;
            params["status"] = this.filterData.trans_status;
            this.submitTime
                ? (params["noticeDateBegin"] = this.submitTime[0])
                : (params["noticeDateBegin"] = "");
            this.submitTime
                ? (params["noticeDateEnd"] = this.submitTime[1])
                : (params["noticeDateEnd"] = "");
            params["analyze"] = this.filterData.analyze;
            if (this.checkTransfer == true) {
                this.circulationData = "transfer";
            } else {
                this.circulationData = "";
            }
            if (this.checkRent == true) {
                this.circulationData = "rent";
            } else {
                this.circulationData = "";
            }
            if (this.checkMortgage == true) {
                this.circulationData = "mortgage";
            } else {
                this.circulationData = "";
            }
            if (this.checkMore == true) {
                if (this.checkTransfer == true && this.checkRent == true) {
                this.circulationData = "transfer,rent";
                }
                if (this.checkTransfer == true && this.checkMortgage == true) {
                this.circulationData = "transfer,mortgage";
                }
                if (this.checkRent == true && this.checkMortgage == true) {
                this.circulationData = "rent,mortgage";
                }
                if (
                this.checkTransfer == true &&
                this.checkRent == true &&
                this.checkMortgage == true
                ) {
                this.circulationData = "transfer,rent,mortgage";
                }
            }

            params["circulations"] = this.circulationData;
            console.log("2222222222222222222", params);
            this.$get(
                `/epf-monitor/statistics/trans/queryGroupByTimeOfCirculationList2`,
                params
            ).then(res => {
                console.log(res);
                if (res.code == "0") {
                // let arr = [];
                // arr.splice(0, 1, res.result);

                // this.dealListData = arr;
                this.params.isExport = false;
                this.href = `api/epf-monitor/statistics/trans/queryGroupByTimeOfCirculationList?isExport=true&cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&landChar=${this.params.landChar}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&noticeDateBegin=${this.params.noticeDateBegin}&noticeDateEnd=${this.params.noticeDateEnd}&analyze=${this.params.analyze}&status=${this.params.status}&contrastType=${this.params.contrastType}&circulations=${this.circulationData}`;

                console.log(this.dealListData);
                // this.subListData = this.dealListData[0].sub;
                this.dealListData = res.result;
                console.log(this.subListData);
                // this.pageNo = res.pager.pageNo;
                // this.pageSize = res.pager.pageSize;
                // this.totalPage = res.pager.totalPage;
                // this.totalRecord = res.pager.totalRecord;
                this.loading = false;
                // this.href = `/api/epf-monitor/statistics/trans/findTransMetaAnalysis?isExport=true&cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&landChar=${this.params.landChar}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&circulation=${this.params.circulation}&noticeDateBegin=${this.params.noticeDateBegin}&noticeDateEnd=${this.params.noticeDateEnd}&status=${this.params.status}&goodsNo=${this.params.goodsNo}`;
                } else {
                this.loading = false;
                this.$message.error(res.msg); //失败
                return;
                }
            });
        },
        async cycleDrawLine() {
            setTimeout(() => {
                document.getElementById("cycleChart").style.width = 100 + "%";
                let cycleChart = echarts.init(document.getElementById("cycleChart"));
                cycleChart.resize(); //直接加这句即可
            }, 0);
            let cycleChart = echarts.init(document.getElementById("cycleChart"));

            //请求数据
            let params = this.params;
            params["contrastType"] = this.timeCycleName;
            this.submitTime
                ? (params["noticeDateBegin"] = this.submitTime[0])
                : (params["noticeDateBegin"] = "");
            this.submitTime
                ? (params["noticeDateEnd"] = this.submitTime[1])
                : (params["noticeDateEnd"] = "");
            params["analyze"] = this.filterData.analyze;

            let transferRes = await this.$get(
                `/epf-monitor/statistics/trans/queryGroupByTimeOfCanton?circulation=transfer`,
                params
            );
            console.log(transferRes);

            let transferChartData = transferRes.result;
            var transferAmountData = [];
            var transferAreaData = [];
            var transferNumberData = [];
            var transferMouthTimeData = []; //x轴时间--月名称数据
            var transferSeasonTimeData = []; //x轴时间--季名称数据
            var transferYearTimeData = []; //x轴时间--年名称数据

            for (var key in transferChartData) {
                transferAmountData.push(transferChartData[key].transPrice);
                transferAreaData.push(transferChartData[key].areaSum);
                transferNumberData.push(transferChartData[key].resulCount);
                transferMouthTimeData.push(transferChartData[key].yearMonth);
                transferSeasonTimeData.push(
                transferChartData[key].year +
                    "年第" +
                    transferChartData[key].season +
                    "季度"
                );
                transferYearTimeData.push(transferChartData[key].year);
            }
            var maxTransferAmountData = Math.max.apply(Math, transferAmountData);
            var maxTransferAreaData = Math.max.apply(Math, transferAreaData);
            var maxTransferNumberData = Math.max.apply(Math, transferNumberData);

            let rentRes = await this.$get(
                `/epf-monitor/statistics/trans/queryGroupByTimeOfCanton?circulation=rent`,
                params
            );
            console.log(rentRes);

            let rentChartData = rentRes.result;
            var rentAmountData = [];
            var rentAreaData = [];
            var rentNumberData = [];
            //  var rentMouthTimeData = []; //x轴时间--月名称数据
            //   var rentSeasonTimeData = []; //x轴时间--季名称数据
            //   var rentYearTimeData = []; //x轴时间--年名称数据

            for (var key in rentChartData) {
                rentAmountData.push(rentChartData[key].transPrice);
                rentAreaData.push(rentChartData[key].areaSum);
                rentNumberData.push(rentChartData[key].resulCount);
                //  rentMouthTimeData.push(rentChartData[key].yearMonth);
                // rentSeasonTimeData.push(rentChartData[key].year + "年第" + rentChartData[key].season)+"季度";
                // rentYearTimeData.push(rentChartData[key].year);
            }
            var maxRentAmountData = Math.max.apply(Math, rentAmountData);
            var maxRentAreaData = Math.max.apply(Math, rentAreaData);
            var maxRentNumberData = Math.max.apply(Math, rentNumberData);

            let mortgageRes = await this.$get(
                `/epf-monitor/statistics/trans/queryGroupByTimeOfCanton?circulation=mortgage`,
                params
            );
            console.log(mortgageRes);

            let mortgageChartData = mortgageRes.result;
            var mortgageAmountData = [];
            var mortgageAreaData = [];
            var mortgageNumberData = [];
            //  var mortgageMouthTimeData = []; //x轴时间--月名称数据
            //   var mortgageSeasonTimeData = []; //x轴时间--季名称数据
            //   var mortgageYearTimeData = []; //x轴时间--年名称数据

            for (var key in mortgageChartData) {
                mortgageAmountData.push(mortgageChartData[key].transPrice);
                mortgageAreaData.push(mortgageChartData[key].areaSum);
                mortgageNumberData.push(mortgageChartData[key].resulCount);
                //  mortgageMouthTimeData.push(mortgageChartData[key].yearMonth);
                // mortgageSeasonTimeData.push(mortgageChartData[key].year + "年第" + mortgageChartData[key].season)+"季度";
                // mortgageYearTimeData.push(mortgageChartData[key].year);
            }
            var maxMortgageAmountData = Math.max.apply(Math, mortgageAmountData);
            var maxMortgageAreaData = Math.max.apply(Math, mortgageAreaData);
            var maxMortgageNumberData = Math.max.apply(Math, mortgageNumberData);

            console.log(transferAmountData);
            console.log(transferAreaData);
            console.log(transferNumberData);
            console.log(transferMouthTimeData);
            console.log(transferSeasonTimeData);
            console.log(transferYearTimeData);
            console.log(rentAmountData);
            console.log(rentAreaData);
            console.log(rentNumberData);
            // console.log(rentMouthTimeData);
            // console.log(rentSeasonTimeData);
            // console.log(rentYearTimeData);
            console.log(mortgageAmountData);
            console.log(mortgageAreaData);
            console.log(mortgageNumberData);
            // console.log(mortgageMouthTimeData);
            // console.log(mortgageSeasonTimeData);
            // console.log(mortgageYearTimeData);

            var allAmountData = transferAmountData.concat(
                rentAmountData,
                mortgageAmountData
            );
            var allAreaData = transferAreaData.concat(rentAreaData, mortgageAreaData);
            var allNumberData = transferNumberData.concat(
                rentNumberData,
                mortgageNumberData
            );

            var maxAllAmountData = Math.max.apply(Math, allAmountData);
            var maxAllAreaData = Math.max.apply(Math, allAreaData);
            var maxAllNumberData = Math.max.apply(Math, allNumberData);

            console.log(allAmountData);
            console.log(allAreaData);
            console.log(allNumberData);
            console.log(maxAllAmountData);
            console.log(maxAllAreaData);
            console.log(maxAllNumberData);

            var unitName = "";

            if (this.filterData.analyze == "金额") {
                unitName = "单位：万元";
            } else if (this.filterData.analyze == "面积") {
                unitName = "单位：万平方米";
            } else if (this.filterData.analyze == "宗数") {
                unitName = "单位：宗";
            }

            var transferData = []; //图表数据
            var rentData = []; //图表数据
            var mortgageData = []; //图表数据
            var timeData = []; //x轴时间图表数据
            var maxData = "";
            var transferName = "";
            var rentName = "";
            var mortgageName = "";

            if (this.timeCycleName == "MOUTH") {
                timeData = transferMouthTimeData;
            } else if (this.timeCycleName == "SEASON") {
                timeData = transferSeasonTimeData;
            } else if (this.timeCycleName == "YEAR") {
                timeData = transferYearTimeData;
            }

            if (this.checkTransfer == true) {
                transferName = "转让";
                if (this.filterData.analyze == "金额") {
                transferData = transferAmountData;
                maxData = maxTransferAmountData;
                } else if (this.filterData.analyze == "面积") {
                transferData = transferAreaData;
                maxData = maxTransferAreaData;
                } else if (this.filterData.analyze == "宗数") {
                transferData = transferNumberData;
                maxData = maxTransferNumberData;
                }
            } else {
                transferName = "";
                transferData = "";
            }

            if (this.checkRent == true) {
                rentName = "出租";
                if (this.filterData.analyze == "金额") {
                rentData = rentAmountData;
                maxData = maxRentAmountData;
                } else if (this.filterData.analyze == "面积") {
                rentData = rentAreaData;
                maxData = maxRentAreaData;
                } else if (this.filterData.analyze == "宗数") {
                rentData = rentNumberData;
                maxData = maxRentNumberData;
                }
            } else {
                rentName = "";
                rentData = "";
            }

            if (this.checkMortgage == true) {
                mortgageName = "抵押";
                if (this.filterData.analyze == "金额") {
                mortgageData = mortgageAmountData;
                maxData = maxMortgageAmountData;
                } else if (this.filterData.analyze == "面积") {
                mortgageData = mortgageAreaData;
                maxData = maxMortgageAreaData;
                } else if (this.filterData.analyze == "宗数") {
                mortgageData = mortgageNumberData;
                maxData = maxMortgageNumberData;
                }
            } else {
                mortgageName = "";
                mortgageData = "";
            }
            console.log(transferName);
            console.log(rentName);
            console.log(mortgageName);

            if (this.checkMore == true) {
                if (this.filterData.analyze == "金额") {
                maxData = maxAllAmountData;
                this.checkTransfer == true
                    ? ((transferData = transferAmountData), (transferName = "转让"))
                    : ((transferData = ""), (transferName = ""));
                this.checkRent == true
                    ? ((rentData = rentAmountData), (rentName = "出租"))
                    : ((rentData = ""), (rentName = ""));
                this.checkMortgage == true
                    ? ((mortgageData = mortgageAmountData), (mortgageName = "抵押"))
                    : ((mortgageData = ""), (mortgageName = ""));
                } else if (this.filterData.analyze == "面积") {
                maxData = maxAllAreaData;
                this.checkTransfer == true
                    ? ((transferData = transferAreaData), (transferName = "转让"))
                    : ((transferData = ""), (transferName = ""));
                this.checkRent == true
                    ? ((rentData = rentAreaData), (rentName = "出租"))
                    : ((rentData = ""), (rentName = ""));
                this.checkMortgage == true
                    ? ((mortgageData = mortgageAreaData), (mortgageName = "抵押"))
                    : ((mortgageData = ""), (mortgageName = ""));
                } else if (this.filterData.analyze == "宗数") {
                maxData = maxAllNumberData;
                this.checkTransfer == true
                    ? ((transferData = transferNumberData), (transferName = "转让"))
                    : ((transferData = ""), (transferName = ""));
                this.checkRent == true
                    ? ((rentData = rentNumberData), (rentName = "出租"))
                    : ((rentData = ""), (rentName = ""));
                this.checkMortgage == true
                    ? ((mortgageData = mortgageNumberData), (mortgageName = "抵押"))
                    : ((mortgageData = ""), (mortgageName = ""));
                }
            }

            // 绘制图表
            cycleChart.setOption({
                title: {
                textStyle: {
                    align: "center",
                    color: "#333",
                    fontSize: 20
                },
                top: "3%",
                left: "10%"
                },
                backgroundColor: "#fff",
                grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
                },
                tooltip: {
                trigger: "axis"
                // axisPointer: {
                //     type: "shadow",
                //     label: {
                //         show: true
                //     }
                // }
                },
                legend: {
                left: "15%",
                top: "5%",
                data: ["转让", "抵押", "出租"]
                },
                xAxis: [
                {
                    data: timeData,
                    name: "时间",
                    nameLocation: "end",
                    nameTextStyle: {
                    color: "#333",
                    fontSize: 12,
                    padding: 10
                    },
                    axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#333" //X轴文字颜色
                    }
                    },
                    axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#fff"
                    }
                    },
                    splitLine: {
                    show: false,
                    lineStyle: {
                        color: "#ddd6d0"
                    }
                    }
                }
                ],
                yAxis: [
                {
                    type: "value",
                    // splitLine: {
                    //     show: false
                    // },
                    // splitLine: {
                    //     show: false
                    // },
                    // axisTick: {
                    //     show: true
                    // },
                    // axisLine: {
                    //     show: true
                    // },
                    axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#ebf8ac"
                    }
                    },
                    axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#FFFFFF"
                    }
                    }
                },
                {
                    name: unitName,
                    type: "value",
                    interval: Math.ceil(maxData / 5),
                    max: Math.ceil(maxData),
                    position: "left",
                    // splitLine: {
                    //     show: false
                    // },
                    splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed" //设置网格线类型 dotted：虚线   solid:实线
                    }
                    },
                    axisTick: {
                    show: false
                    },
                    axisLine: {
                    show: false
                    },
                    axisLabel: {
                    show: true
                    }
                }
                ],
                series: [
                {
                    name: transferName,
                    type: "line",
                    yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                    smooth: true, //平滑曲线显示
                    showAllSymbol: true, //显示所有图形。
                    symbol: "circle", //标记的图形为实心圆
                    symbolSize: 3, //标记的大小
                    color: "#7fbdf8",
                    itemStyle: {
                    //折线拐点标志的样式
                    normal: {
                        lineStyle: {
                        width: 3 // 0.1的线条是非常细的了
                        }
                    }
                    },
                    data: transferData
                },
                {
                    name: mortgageName,
                    type: "line",
                    yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                    smooth: true, //平滑曲线显示
                    showAllSymbol: true, //显示所有图形。
                    symbol: "circle", //标记的图形为实心圆
                    symbolSize: 3, //标记的大小
                    color: "#ffa060",
                    itemStyle: {
                    //折线拐点标志的样式
                    normal: {
                        lineStyle: {
                        width: 3 // 0.1的线条是非常细的了
                        }
                    }
                    },
                    data: mortgageData
                },
                {
                    name: rentName,
                    type: "line",
                    yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                    smooth: true, //平滑曲线显示
                    showAllSymbol: true, //显示所有图形。
                    symbol: "circle", //标记的图形为实心圆
                    symbolSize: 3, //标记的大小
                    color: "#07dfcd",
                    itemStyle: {
                    //折线拐点标志的样式
                    normal: {
                        lineStyle: {
                        width: 3 // 0.1的线条是非常细的了
                        }
                    }
                    },
                    data: rentData
                }
                ]
            });
        },
        initEchart() {
            window.addEventListener("resize", () => {
                let cycleChart = echarts.init(document.getElementById("cycleChart"));
                document.getElementById("cycleChart").style.width = 100 + "%";
                cycleChart.resize();
            });
        },

        //字典选择
        analyzeSelect(val) {
            this.filterData.analyze = val.label;
            this.params.analyze = val.label;
            console.log(this.filterData.analyze);
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
    created() {
        this.boxHeight = window.innerHeight - 250;
        const that = this;
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
    mounted() {
        this.$nextTick(() => {
            setTimeout(() => {
                this.cycleDrawLine();
            }, 1000);
        });

        this.initEchart();

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
    destroyed() {
        window.removeEventListener(
        "resize",
        () => {
            let cycleChart = echarts.init(document.getElementById("cycleChart"));
            document.getElementById("cycleChart").style.width = 100 + "%";
            cycleChart.resize();
        },
        2000
        );
    },
    watch: {
        checkedTypes: function(val, oldVal) {
            this.selection = this.checkedTypes;
            console.log(this.selection);
            function isStrInArray(str, arr) {
                let n = arr.length;
                for (let i = 0; i < n; i++) {
                if (arr[i] == str) {
                    return true;
                }
                }
                return false;
            }

            isStrInArray("转让", this.selection)
                ? ((this.circulationName = "transfer"), (this.checkTransfer = true))
                : (this.circulationName != "transfer", (this.checkTransfer = false));
            isStrInArray("出租", this.selection)
                ? ((this.circulationName = "rent"), (this.checkRent = true))
                : (this.circulationName != "rent", (this.checkRent = false));
            isStrInArray("抵押", this.selection)
                ? ((this.circulationName = "mortgage"), (this.checkMortgage = true))
                : (this.circulationName != "mortgage", (this.checkMortgage = false));
            if (
                (this.checkTransfer == true && this.checkRent == true) ||
                (this.checkTransfer == true && this.checkMortgage == true) ||
                (this.checkMortgage == true && this.checkRent == true) ||
                (this.checkTransfer == true &&
                this.checkRent == true &&
                this.checkMortgage == true)
            ) {
                this.circulationName = "";
                this.checkMore = true;
            } else {
                this.checkMore = false;
            }
        },
        circulationName(val, oldVal) {
            //普通的watch监听
            if (val == "transfer") {
                this.circulationName = "transfer";
                if (this.activeName == "graph") {
                this.cycleDrawLine();
                } else if (this.activeName == "list") {
                this.getList();
                }
            } else if (val == "rent") {
                this.circulationName = "rent";
                if (this.activeName == "graph") {
                this.cycleDrawLine();
                } else if (this.activeName == "list") {
                this.getList();
                }
            } else if (val == "mortgage") {
                this.circulationName = "mortgage";
                if (this.activeName == "graph") {
                this.cycleDrawLine();
                } else if (this.activeName == "list") {
                this.getList();
                }
            } else if (val == "") {
                this.circulationName = "";
                if (this.activeName == "graph") {
                this.cycleDrawLine();
                } else if (this.activeName == "list") {
                this.getList();
                }
            }
        },
        selection() {
            if (this.activeName == "graph") {
                this.cycleDrawLine();
            } else if (this.activeName == "list") {
                this.getList();
            }
        },
        timeCycleName(val) {
            if (this.activeName == "graph") {
                this.cycleDrawLine();
            } else if (this.activeName == "list") {
                this.getList();
            }
        },
        submitTime(val) {
            if (this.activeName == "graph") {
                this.cycleDrawLine();
            } else if (this.activeName == "list") {
                this.getList();
            }
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
    .derive {
        width: 80px;
        height: 32px;
        background-color: #ffa000;
        border-radius: 2px;
        margin-right: 16px;
        margin-top: 12px;
        text-align: center;
        line-height: 32px;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        margin-left: auto;
    }
</style>