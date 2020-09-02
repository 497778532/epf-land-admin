<template>
    <el-tabs v-model="activeTabs" type="border-card" @tab-click="handleBigClick">
        <demandSearch
            @filterInfo="getFilterData"
            :typeClose="true"
            :closeSelectPlace="closeSelectPlace"
            typeName="需求类型"
        ></demandSearch>
        <el-tab-pane label="土地用途需求" name="use" lazy>
            <div class="epf_fr_box" :style="{height:boxHeight- 195 +'px'}">
                <el-tabs
                    v-model="activeName"
                    @tab-click="handleSmallClick"
                    style="margin-top:25px;width:100%;height:100%;"
                    >
                    <el-tab-pane label="图形" name="graph" style="width:100%;height:100%;" lazy>
                        <div class="epf_toolbar" style="background-color:#fff;border:0;">
                            <div class="oper">
                            <span class="button_export"><a :href="hrefUse" style="color: #ffa000;">导出</a></span>
                            </div>
                        </div>
                        <div id="daUseChart" style="width:100%;height:550px;margin-bottom:75px;"></div>
                    </el-tab-pane>
                    <el-tab-pane label="列表" name="list" style="width:100%;height:100%;">
                        <div class="epf_toolbar">
                            <span class="toolsTitle">数据列表</span>
                            <div class="oper">
                            <span class="button_export"><a :href="hrefUse" style="color: #ffa000;">导出</a></span>
                            </div>
                        </div>
                        <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 235  +'px'}">
                            <el-table
                                ref="multipleTable"
                                :data="useData"
                                v-loading="loading"
                                element-loading-text="数据加载中"
                                element-loading-background="rgba(255, 255, 255,0.95)"
                                style="width: 100%;min-height:80px;"
                                border
                                :height="boxHeight - 285"
                                >
                                <el-table-column label="序号" min-width="85" align="center">
                                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                                </el-table-column>
                                <el-table-column label="行政区域" min-width="260">
                                <template slot-scope="scope">
                                    <span v-if="!scope.row.cantonProvince">全部</span>
                                    <span v-if="scope.row.cantonProvince">{{scope.row.cantonProvinceName}}</span>
                                    <span v-if="scope.row.cantonCity">/</span>
                                    <span v-if="scope.row.cantonCity">{{scope.row.cantonCityName}}</span>
                                    <span v-if="scope.row.cantonArea">/</span>
                                    <span v-if="scope.row.cantonArea">{{scope.row.cantonAreaName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column label="用途" min-width="260">
                                <template slot-scope="scope">
                                    <span>{{scope.row.firstClassUseName}}</span>
                                    <span v-if="scope.row.secondClassUse">/</span>
                                    <span v-if="scope.row.secondClassUse">{{scope.row.secondClassUseName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column label="需求类型" min-width="120">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.demandName=='null'">全部</span>
                                    <span v-if="scope.row.demandName!='null'">{{scope.row.demandName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column label="时间" min-width="440">
                                <template slot-scope="scope">
                                    <span>{{scope.row.startDate}}--{{scope.row.endDate}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column prop="price" label="需求金额（万元）" min-width="185"></el-table-column>
                                <el-table-column prop="area" label="需求面积（万平方米）" min-width="185" fixed="right"></el-table-column>
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
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-tab-pane>
        <el-tab-pane label="需求周期分析" name="cycle" lazy>
            <div class="epf_fr_box" :style="{height:boxHeight- 195 +'px'}">
                <el-tabs
                    v-model="activeName"
                    @tab-click="handleSmallClick"
                    style="margin-top:25px;width:100%;height:100%;"
                    >
                    <el-tab-pane label="图形" name="graph" style="width:100%;height:100%;" lazy>
                        <div class="epf_toolbar" style="background-color:#fff;border:0;">
                            <div class="operCycle">
                            <div style="display:flex;">
                                <span style="margin:0 100px 0 20px;">
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
                            <span class="button_export"><a :href="hrefCycle" style="color: #ffa000;">导出</a></span>
                            </div>
                            </div>
                        </div>
                        <div id="daCycleChart" style="width:100%;height:550px;margin-bottom:75px;"></div>
                    </el-tab-pane>

                    <el-tab-pane label="列表" name="list" style="width:100%;height:100%;">
                        <div class="epf_toolbar">
                            <span class="toolsTitle">数据列表</span>
                            <span class="button_export"><a :href="hrefCycle" style="color: #ffa000;">导出</a></span>
                        </div>
                        <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 235  +'px'}">
                            <el-table
                                ref="multipleTable"
                                :data="cycleData"
                                v-loading="loading"
                                element-loading-text="数据加载中"
                                element-loading-background="rgba(255, 255, 255,0.95)"
                                style="width: 100%;min-height:80px;"
                                border
                                :height="boxHeight - 270"
                                >
                                <el-table-column label="序号" min-width="85" align="center">
                                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                                </el-table-column>
                                <el-table-column label="行政区域" min-width="260">
                                <template slot-scope="scope">
                                    <!-- <span>{{scope.row.cantonProvinceName}}/{{scope.row.cantonCityName}}/{{scope.row.cantonAreaName}}</span> -->
                                    <span v-if="!scope.row.cantonProvince">全部</span>
                                    <span v-if="scope.row.cantonProvince">{{scope.row.cantonProvinceName}}</span>
                                    <span v-if="scope.row.cantonCity">/</span>
                                    <span v-if="scope.row.cantonCity">{{scope.row.cantonCityName}}</span>
                                    <span v-if="scope.row.cantonArea">/</span>
                                    <span v-if="scope.row.cantonArea">{{scope.row.cantonAreaName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column label="用途" min-width="260">
                                <template slot-scope="scope">
                                    <!-- <span>{{scope.row.firstClassUseName}}/{{scope.row.secondClassUseName}}</span> -->
                                    <span v-if="scope.row.firstClassUse=='all'">全部</span>
                                    <span v-if="scope.row.firstClassUse!='all'">{{scope.row.firstClassUseName}}</span>
                                    <span v-if="scope.row.secondClassUse!='all'">/</span>
                                    <span v-if="scope.row.secondClassUse!='all'">{{scope.row.secondClassUseName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column label="需求类型" min-width="120">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.demandName=='null'">全部</span>
                                    <span v-if="scope.row.demandName!='null'">{{scope.row.demandName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column label="时间" min-width="440">
                                <template slot-scope="scope">
                                    <span>{{scope.row.startDate}}--{{scope.row.endDate}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column prop="price" label="需求金额（万元）" min-width="185"></el-table-column>
                                <el-table-column prop="area" label="需求面积（万平方米）" min-width="185" fixed="right"></el-table-column>
                            </el-table>
                            <!-- 分页控件 -->
                            <div class="epf_paging_fixe">
                                <el-pagination
                                background
                                layout="total,prev, pager, next,sizes,jumper"
                                :page-sizes="[5,10,15,20]"
                                @size-change="handleCycleSizeChange"
                                @current-change="handleCycleCurrentChange"
                                :total="cycleTotalRecord"
                                :current-page="cycleCurrentPage"
                                :page-size="cyclePageSize"
                                ></el-pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-tab-pane>
        <el-tab-pane label="区域需求对比" name="area" lazy>
            <div class="epf_fr_box" :style="{height:boxHeight- 195 +'px'}">
                <el-tabs
                    v-model="activeName"
                    @tab-click="handleSmallClick"
                    style="margin-top:25px;width:100%;height:100%;"
                    >
                    <el-tab-pane label="图形" name="graph" style="width:100%;height:100%;" lazy>
                        <div class="epf_toolbar" style="background-color:#fff;border:0;">
                            <div class="oper">
                            <span class="button_export"><a :href="hrefArea" style="color: #ffa000;">导出</a></span>
                            </div>
                        </div>
                        <div id="daAreaChart" style="width:100%;height:550px;margin-bottom:75px;"></div>
                    </el-tab-pane>

                    <el-tab-pane label="列表" name="list" style="width:100%;height:100%;">
                        <div class="epf_toolbar">
                            <span class="toolsTitle">数据列表</span>
                            <span class="button_export"><a :href="hrefArea" style="color: #ffa000;">导出</a></span>
                        </div>
                        <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 235  +'px'}">
                            <el-table
                                ref="multipleTable"
                                :data="areaData"
                                v-loading="loading"
                                element-loading-text="数据加载中"
                                element-loading-background="rgba(255, 255, 255,0.95)"
                                style="width: 100%;min-height:80px;"
                                border
                                :height="boxHeight - 285"
                                >
                                <el-table-column label="序号" min-width="85" align="center">
                                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                                </el-table-column>
                                <el-table-column label="行政区域" min-width="260">
                                <template slot-scope="scope">
                                    <!-- <span>{{scope.row.cantonProvinceName}}/{{scope.row.cantonCityName}}/{{scope.row.cantonAreaName}}</span> -->
                                    <span v-if="!scope.row.cantonProvince">全部</span>
                                    <span v-if="scope.row.cantonProvince">{{scope.row.cantonProvinceName}}</span>
                                    <span v-if="scope.row.cantonCity">/</span>
                                    <span v-if="scope.row.cantonCity">{{scope.row.cantonCityName}}</span>
                                    <span v-if="scope.row.cantonArea">/</span>
                                    <span v-if="scope.row.cantonArea">{{scope.row.cantonAreaName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column label="用途" min-width="260">
                                <template slot-scope="scope">
                                    <!-- <span>{{scope.row.firstClassUseName}}/{{scope.row.secondClassUseName}}</span> -->
                                    <span v-if="scope.row.firstClassUse=='all'">全部</span>
                                    <span v-if="scope.row.firstClassUse!='all'">{{scope.row.firstClassUseName}}</span>
                                    <span v-if="scope.row.secondClassUse!='all'">/</span>
                                    <span v-if="scope.row.secondClassUse!='all'">{{scope.row.secondClassUseName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column label="需求类型" min-width="120">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.demandName=='null'">全部</span>
                                    <span v-if="scope.row.demandName!='null'">{{scope.row.demandName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column label="时间" min-width="440">
                                <template slot-scope="scope">
                                    <span>{{scope.row.startDate}}--{{scope.row.endDate}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column prop="price" label="需求金额（万元）" min-width="185"></el-table-column>
                                <el-table-column prop="area" label="需求面积（万平方米）" min-width="185" fixed="right"></el-table-column>
                            </el-table>
                            <!-- 分页控件 -->
                            <div class="epf_paging_fixe">
                                <el-pagination
                                background
                                layout="total,prev, pager, next,sizes,jumper"
                                :page-sizes="[5,10,15,20]"
                                @size-change="handleAreaSizeChange"
                                @current-change="handleAreaCurrentChange"
                                :total="areaTotalRecord"
                                :current-page="areaCurrentPage"
                                :page-size="areaPageSize"
                                ></el-pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import demandSearch from "@/components/demandAnalyzeSearch";
import echarts from "echarts";
import { setTimeout } from "timers";
export default {
    components: {
        demandSearch
    },
    data() {
        return {
            closeSelectPlace:false,
            activeTabs: "use",
            currentTabs: "use",

            activeName: "graph",
            currentName: "graph",

            loading: true,

            timeCycle: "MOUTH", //对比周期
            timeCycleName: "MOUTH",
            submitTime: "", //发布时间
            publishTimeB: "",
            publishTimeE: "",

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
                firstClassUse: "",
                secondClassUse: "",
                publishTimeBegin: "",
                publishTimeEnd: "",
                demand: "",
                contrastType: "",
                isChart: "",
                isExport: false //导出
            },

            //导出
            hrefUse:
                "/epf-monitor/monipurchase/queryGroupByFirstClassUse?isExport=true",
            hrefCycle: "/epf-monitor/monipurchase/queryGroupByTime?isExport=true",
            hrefArea: "/epf-monitor/monipurchase/queryGroupByCanton?isExport=true",
            //页码
            currentPage: 1,
            pageNo: 1, //页码
            pageSize: 5, //每页条数
            totalPage: 1,
            totalRecord: 1,

            cycleCurrentPage: 1,
            cyclePageNo: 1, //页码
            cyclePageSize: 5, //每页条数
            cycleTotalPage: 1,
            cycleTotalRecord: 1,

            areaCurrentPage: 1,
            areaPageNo: 1, //页码
            areaPageSize: 5, //每页条数
            areaTotalPage: 1,
            areaTotalRecord: 1,

            //土地用途需求
            useData: [],
            //需求周期分析
            cycleData: [],
            //区域需求对比
            areaData: [],

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
        this.boxHeight = window.innerHeight - 260;
        if(sessionStorage.getItem("org_level") == 'org_level-003'){
            this.params.cantonProvince = sessionStorage.getItem("jgProvinceCode")
            this.params.cantonProvinceName = sessionStorage.getItem("jgProvince")
        }else if(sessionStorage.getItem("org_level") == 'org_level-005'){
            this.params.cantonProvince = sessionStorage.getItem("jgProvinceCode")
            this.params.cantonProvinceName = sessionStorage.getItem("jgProvince")
            this.params.cantonCity = sessionStorage.getItem("jgCityCode")
            this.params.cantonCityName = sessionStorage.getItem("jgCity")
        }else if(sessionStorage.getItem("org_level") == 'org_level-004'){
            this.params.cantonProvince = sessionStorage.getItem("jgProvinceCode")
            this.params.cantonProvinceName = sessionStorage.getItem("jgProvince")
            this.params.cantonCity = sessionStorage.getItem("jgCityCode")
            this.params.cantonCityName = sessionStorage.getItem("jgCity")
            this.params.cantonArea = sessionStorage.getItem("jgAreaCode")
            this.params.cantonAreaName = sessionStorage.getItem("jgArea")
        }
        this.getUseList();
        this.getCycleList();
        this.getAreaList();
    },
    watch: {
        activeTabs(val) {
            console.log(val);
            if (this.activeTabs == "use") {
                this.activeName = "graph";
                this.daUseDrawLine();
            } else if (this.activeTabs == "cycle") {
                this.activeName = "graph";
                this.daCycleDrawLine();
            } else if (this.activeTabs == "area") {
                this.activeName = "graph";
                this.daAreaDrawLine();
            }
        },
        activeName(val) {
            console.log(val);
            if (this.activeName == "graph") {
                if (this.activeTabs == "use") {
                this.daUseDrawLine();
                } else if (this.activeTabs == "cycle") {
                this.daCycleDrawLine();
                } else if (this.activeTabs == "area") {
                this.daAreaDrawLine();
                }
            } else if (this.activeName == "list") {
                if (this.activeTabs == "use") {
                this.getUseList();
                } else if (this.activeTabs == "cycle") {
                this.getCycleList();
                } else if (this.activeTabs == "area") {
                this.getAreaList();
                }
            }
        },
        submitTime(val) {
            if (this.activeName == "graph") {
                this.daCycleDrawLine();
            } else if (this.activeName == "list") {
                this.getCycleList();
            }
            },
            timeCycleName(val) {
            if (this.activeName == "graph") {
                this.daCycleDrawLine();
            } else if (this.activeName == "list") {
                this.getCycleList();
            }
        }
    },
    methods: {
            toggleCycle(item) {
            this.timeCycleName = item.value;
            console.log(this.timeCycle);
        },
        getFilterData(val) {
            console.log(val);

            this.publishTimeB = val.publishTimeBegin;
            this.publishTimeE = val.publishTimeEnd;

            this.params = val;

            if (this.activeName == "graph") {
                if (this.activeTabs == "use") {
                const that = this;
                that.daUseDrawLine();
                } else if (this.activeTabs == "cycle") {
                const that = this;
                that.daCycleDrawLine();
                } else if (this.activeTabs == "area") {
                const that = this;
                that.daAreaDrawLine();
                }
            } else if (this.activeName == "list") {
                if (this.activeTabs == "use") {
                const that = this;
                that.getUseList();
                } else if (this.activeTabs == "cycle") {
                const that = this;
                that.getCycleList();
                } else if (this.activeTabs == "area") {
                const that = this;
                that.getAreaList();
                }
            }
        },
        getUseList(val) {
            this.loading = true;
            let params = this.params;
            params["page"] = this.pageNo;
            params["rows"] = this.pageSize;
            this.publishTimeB
                ? (params["publishTimeBegin"] = this.publishTimeB)
                : (params["publishTimeBegin"] = "");
            this.publishTimeE
                ? (params["publishTimeEnd"] = this.publishTimeE)
                : (params["publishTimeEnd"] = "");
            params["isChart"] = false;
            this.$get(
                `/epf-monitor/monipurchase/queryGroupByFirstClassUse`,
                params
            ).then(res => {
                console.log(res);
                if (res.code == "0") {
                this.useData = res.pager.results;
                if (this.useData == '' || this.useData == null) {
                    this.$message({
                    message: "暂时没有数据",
                    type: "warning"
                    });
                }
                this.pageNo = res.pager.pageNo;
                this.pageSize = res.pager.pageSize;
                this.totalPage = res.pager.totalPage;
                this.totalRecord = res.pager.totalRecord;
                this.loading = false;
                this.hrefUse = `/api/epf-monitor/monipurchase/queryGroupByFirstClassUse?isExport=true&cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&demand=${this.params.demand}&publishTimeBegin=${this.params.publishTimeBegin}&publishTimeEnd=${this.params.publishTimeEnd}`;
                } else {
                this.loading = false;
                this.$message.error(res.msg); //失败
                return;
                }
            });
        },
        getCycleList(val) {
            this.loading = true;
            let params = this.params;
            params["page"] = this.pageNo;
            params["rows"] = this.pageSize;
            params["contrastType"] = this.timeCycleName;
            this.submitTime
                ? (params["publishTimeBegin"] = this.submitTime[0])
                : (params["publishTimeBegin"] = "");
            this.submitTime
                ? (params["publishTimeEnd"] = this.submitTime[1])
                : (params["publishTimeEnd"] = "");
            params["isChart"] = false;
            this.$get(`/epf-monitor/monipurchase/queryGroupByTime`, params).then(
                res => {
                console.log(res);

                if (res.code == "0") {
                    this.cycleData = res.pager.results;
                    if (this.cycleData == '' || this.cycleData == null) {
                    this.$message({
                        message: "暂时没有数据",
                        type: "warning"
                    });
                    }
                    this.cyclePageNo = res.pager.pageNo;
                    this.cyclePageSize = res.pager.pageSize;
                    this.cycleTotalPage = res.pager.totalPage;
                    this.cycleTotalRecord = res.pager.totalRecord;
                    this.loading = false;
                    this.hrefCycle = `/api/epf-monitor/monipurchase/queryGroupByTime?isExport=true&cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&demand=${this.params.demand}&publishTimeBegin=${this.params.publishTimeBegin}&publishTimeEnd=${this.params.publishTimeEnd}`;
                } else {
                    this.loading = false;
                    this.$message.error(res.msg); //失败
                    return;
                }
                }
            );
        },
        getAreaList(val) {
            this.loading = true;
            let params = this.params;
            params["page"] = this.pageNo;
            params["rows"] = this.pageSize;
            this.publishTimeB
                ? (params["publishTimeBegin"] = this.publishTimeB)
                : (params["publishTimeBegin"] = "");
            this.publishTimeE
                ? (params["publishTimeEnd"] = this.publishTimeE)
                : (params["publishTimeEnd"] = "");
            params["isChart"] = false;
            this.$get(`/epf-monitor/monipurchase/queryGroupByCanton`, params).then(
                res => {
                console.log(res);
                if (res.code == "0") {
                    this.areaData = res.pager.results;
                    if (this.areaData == '' || this.areaData == null) {
                    this.$message({
                        message: "暂时没有数据",
                        type: "warning"
                    });
                    }
                    this.areaPageNo = res.pager.pageNo;
                    this.areaPageSize = res.pager.pageSize;
                    this.areaTotalPage = res.pager.totalPage;
                    this.areaTotalRecord = res.pager.totalRecord;
                    this.loading = false;
                    this.hrefArea = `/api/epf-monitor/monipurchase/queryGroupByCanton?isExport=true&cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&demand=${this.params.demand}&publishTimeBegin=${this.params.publishTimeBegin}&publishTimeEnd=${this.params.publishTimeEnd}`;
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
            this.pageSize = val; //显示条数改变
            this.getUseList();
        },
        handleCurrentChange(val) {
            //当前页发生改变时触发
            this.pageNo = val; //页码改变
            this.getUseList();
        },
        handleCycleSizeChange(val) {
            //每页条数改变时触发
            this.pageSize = val; //显示条数改变
            this.getCycleList();
        },
        handleCycleCurrentChange(val) {
            //当前页发生改变时触发
            this.pageNo = val; //页码改变
            this.getCycleList();
        },
        handleAreaSizeChange(val) {
            //每页条数改变时触发
            this.pageSize = val; //显示条数改变
            this.getAreaList();
        },
        handleAreaCurrentChange(val) {
            //当前页发生改变时触发
            this.pageNo = val; //页码改变
            this.getAreaList();
        },
        handleBigClick(val) {
            console.log(val);
            if (val.name == this.currentTabs) {
                return;
            }
            this.currentTabs = val.name;
            if (this.activeTabs == "use") {
                this.closeSelectPlace = false;
                this.activeName = "graph";
                this.daUseDrawLine();
            } else if (this.activeTabs == "cycle") {
                this.closeSelectPlace = true;
                this.activeName = "graph";
                this.daCycleDrawLine();
            } else if (this.activeTabs == "area") {
                this.closeSelectPlace = false;
                this.activeName = "graph";
                this.daAreaDrawLine();
            }
        },
        handleSmallClick(val) {
            if (val.name == this.currentName) {
                return;
            }
            this.currentName = val.name;
            if (this.activeName == "graph") {
                if (this.activeTabs == "use") {
                const that = this;
                that.daUseDrawLine();
                } else if (this.activeTabs == "cycle") {
                const that = this;
                that.daCycleDrawLine();
                } else if (this.activeTabs == "area") {
                const that = this;
                that.daAreaDrawLine();
                }
            } else if (this.activeName == "list") {
                if (this.activeTabs == "use") {
                const that = this;
                that.getUseList();
                } else if (this.activeTabs == "cycle") {
                const that = this;
                that.getCycleList();
                } else if (this.activeTabs == "area") {
                const that = this;
                that.getAreaList();
                }
            }
        },
        daUseDrawLine() {
            this.$nextTick(() => {
                    setTimeout(() => {
                    let daUseChart = echarts.init(document.getElementById("daUseChart"));
                    document.getElementById("daUseChart").style.width = 100 + "%";
                    daUseChart.resize(); //直接加这句即可
                    }, 0);
                    let daUseChart = echarts.init(document.getElementById("daUseChart"));

                    //请求数据
                    let params = this.params;
                    this.publishTimeB
                    ? (params["publishTimeBegin"] = this.publishTimeB)
                    : (params["publishTimeBegin"] = "");
                    this.publishTimeE
                    ? (params["publishTimeEnd"] = this.publishTimeE)
                    : (params["publishTimeEnd"] = "");
                    params["isChart"] = true;

                    this.$get(
                    `/epf-monitor/monipurchase/queryGroupByFirstClassUse`,
                    params
                    ).then(res => {
                    this.hrefUse = `/api/epf-monitor/monipurchase/queryGroupByFirstClassUse?isExport=true&cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&demand=${this.params.demand}&publishTimeBegin=${this.params.publishTimeBegin}&publishTimeEnd=${this.params.publishTimeEnd}`;
                    let chartData = res.result;
                    console.log(chartData);
                    if (chartData == '' || chartData == null) {
                        this.$message({
                        message: "暂时没有数据",
                        type: "warning"
                        });
                    }

                    var useNameData = []; //x轴用途名称图表数据
                    var useName = "";
                    var allAreaData = []; //所有面积
                    for (var key in chartData) {
                        if (chartData[key].secondClassUseName) {
                        useNameData.push(chartData[key].secondClassUseName); //2级用途
                        useName = "二级用途";
                        } else {
                        useNameData.push(chartData[key].firstClassUseName); //1级用途
                        useName = "一级用途";
                        }
                        allAreaData.push(chartData[key].area); //所有面积
                    }

                    var maxAllAreaData = Math.max.apply(Math, allAreaData); //全部面积最大值

                    // 绘制图表
                    daUseChart.setOption({
                        color: ["#3398DB"],
                        tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                        }
                        },
                        grid: {
                        left: "3%",
                        right: "6%",
                        bottom: "3%",
                        containLabel: true
                        },
                        xAxis: [
                        {
                            type: "category",
                            data: useNameData,
                            name: useName,
                            nameLocation: "end",
                            axisTick: {
                            alignWithLabel: true,
                            show: false //不要刻度
                            },
                            axisLine: {
                            show: false //不要x轴
                            }
                        }
                        ],
                        yAxis: [
                        {
                            name: "单位：万平方米",
                            type: "value",
                            interval: Math.ceil(maxAllAreaData / 5),
                            max: Math.ceil(maxAllAreaData),
                            splitLine: {
                            //网格线
                            lineStyle: {
                                type: "dashed" //设置网格线类型 dotted：虚线   solid:实线
                            },
                            show: true //隐藏或显示
                            },
                            axisTick: {
                            alignWithLabel: true,
                            show: false //不要刻度
                            },
                            axisLine: {
                            show: false //不要x轴
                            }
                        }
                        ],
                        series: [
                        {
                            name: "需求面积",
                            type: "bar",
                            barWidth: "40px",
                            data: allAreaData,
                            itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                    offset: 0,
                                    color: "#78b4f6" // 高处的颜色
                                    },
                                    {
                                    offset: 1,
                                    color: "#5781e5" // 低处的颜色
                                    }
                                ],
                                false
                                ),
                                barBorderRadius: [30, 30, 0, 0]
                            }
                            //   label: {
                            //         show: true, //开启显示
                            //         position: 'top', //在上方显示
                            //         textStyle: { //数值样式
                            //             color: 'aqua',
                            //             fontSize: 15
                            //         }
                            // },
                            }
                        }
                        ]
                    });
                });
            });
        },
        daCycleDrawLine() {
            this.$nextTick(() => {
                setTimeout(() => {
                let daCycleChart = echarts.init(
                    document.getElementById("daCycleChart")
                );
                document.getElementById("daCycleChart").style.width = 100 + "%";
                daCycleChart.resize(); //直接加这句即可
                }, 0);
                let daCycleChart = echarts.init(
                document.getElementById("daCycleChart")
                );

                //请求数据
                let params = this.params;
                params["contrastType"] = this.timeCycleName;
                this.submitTime
                ? (params["publishTimeBegin"] = this.submitTime[0])
                : (params["publishTimeBegin"] = "");
                this.submitTime
                ? (params["publishTimeEnd"] = this.submitTime[1])
                : (params["publishTimeEnd"] = "");
                params["isChart"] = true;

                this.$get(`/epf-monitor/monipurchase/queryGroupByTime`, params).then(
                res => {
                    this.hrefCycle = `/api/epf-monitor/monipurchase/queryGroupByTime?isExport=true&cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&demand=${this.params.demand}&publishTimeBegin=${this.params.publishTimeBegin}&publishTimeEnd=${this.params.publishTimeEnd}`;
                    let chartData = res.result;
                    console.log(chartData);
                    if (chartData == '' || chartData == null) {
                    this.$message({
                        message: "暂时没有数据",
                        type: "warning"
                    });
                    }

                    var timeData = []; //x轴时间图表数据
                    var resMouthTimeData = []; //x轴时间--月名称数据
                    var resSeasonTimeData = []; //x轴时间--季名称数据
                    var resYearTimeData = []; //x轴时间--年名称数据
                    var allAreaData = []; //所有面积
                    for (var key in chartData) {
                    resMouthTimeData.push(chartData[key].yearMonth);
                    resSeasonTimeData.push(
                        chartData[key].year + "年第" + chartData[key].season + "季度"
                    );
                    resYearTimeData.push(chartData[key].year);
                    allAreaData.push(chartData[key].area); //所有面积
                    }

                    if (this.timeCycleName == "MOUTH") {
                    timeData = resMouthTimeData;
                    } else if (this.timeCycleName == "SEASON") {
                    timeData = resSeasonTimeData;
                    } else if (this.timeCycleName == "YEAR") {
                    timeData = resYearTimeData;
                    }
                    console.log(timeData);

                    var maxAllAreaData = Math.max.apply(Math, allAreaData); //全部面积最大值

                    // 绘制图表
                    daCycleChart.setOption({
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
                        name: "单位：万平方米",
                        type: "value",
                        interval: Math.ceil(maxAllAreaData / 5),
                        max: Math.ceil(maxAllAreaData),
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
                        name: "需求面积",
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
                                width: 4, // 0.1的线条是非常细的了
                                color: "#7fbdf8" //
                            }
                            }
                        },
                        lineStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: "#436cd1"
                            },
                            {
                                offset: 1,
                                color: "#7ab5f4"
                            }
                            ])
                        },
                        data: allAreaData
                        }
                    ]
                    });
                }
                );
            });
        },
        daAreaDrawLine() {
            this.$nextTick(() => {
                setTimeout(() => {
                let daAreaChart = echarts.init(
                    document.getElementById("daAreaChart")
                );
                document.getElementById("daAreaChart").style.width = 100 + "%";
                daAreaChart.resize(); //直接加这句即可
                }, 0);
                let daAreaChart = echarts.init(document.getElementById("daAreaChart"));

                //请求数据
                let params = this.params;
                this.publishTimeB
                ? (params["publishTimeBegin"] = this.publishTimeB)
                : (params["publishTimeBegin"] = "");
                this.publishTimeE
                ? (params["publishTimeEnd"] = this.publishTimeE)
                : (params["publishTimeEnd"] = "");
                params["isChart"] = true;

                this.$get(`/epf-monitor/monipurchase/queryGroupByCanton`, params).then(
                res => {
                    this.hrefArea = `/api/epf-monitor/monipurchase/queryGroupByCanton?isExport=true&cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&demand=${this.params.demand}&publishTimeBegin=${this.params.publishTimeBegin}&publishTimeEnd=${this.params.publishTimeEnd}`;
                    let chartData = res.result;
                    console.log(chartData);
                    if (chartData == '' || chartData == null) {
                    this.$message({
                        message: "暂时没有数据",
                        type: "warning"
                    });
                    }

                    var cantonNameData = []; //x轴省名称图表数据
                    var allAreaData = []; //所有面积
                    var areaName = "";
                    for (var key in chartData) {
                    if (chartData[key].cantonProvince) {
                        if (chartData[key].cantonCity) {
                        if (chartData[key].cantonArea) {
                            cantonNameData.push(chartData[key].cantonAreaName);
                            areaName = "地区";
                        } else {
                            cantonNameData.push(chartData[key].cantonCityName);
                            areaName = "城市";
                        }
                        } else {
                        cantonNameData.push(chartData[key].cantonProvinceName);
                        areaName = "省份";
                        }
                    }
                    allAreaData.push(chartData[key].area); //所有面积
                    }

                    var maxAllAreaData = Math.max.apply(Math, allAreaData); //全部面积最大值
                    // 绘制图表
                    daAreaChart.setOption({
                    color: ["#3398DB"],
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true
                    },
                    xAxis: [
                        {
                        name: areaName,
                        type: "category",
                        data: cantonNameData,
                        axisTick: {
                            alignWithLabel: true,
                            show: false //不要刻度
                        },
                        axisLine: {
                            show: false //不要x轴
                        }
                        }
                    ],
                    dataZoom: [
                        {
                        type: "inside",
                        show: true,
                        xAxisIndex: [0],
                        start: 0, //默认为1
                        end: 100
                        }
                    ],
                    yAxis: [
                        {
                        name: "单位：万平方米",
                        type: "value",
                        interval: Math.ceil(maxAllAreaData / 5),
                        max: Math.ceil(maxAllAreaData),
                        splitLine: {
                            //网格线
                            lineStyle: {
                            type: "dashed" //设置网格线类型 dotted：虚线   solid:实线
                            },
                            show: true //隐藏或显示
                        },
                        axisTick: {
                            alignWithLabel: true,
                            show: false //不要刻度
                        },
                        axisLine: {
                            show: false //不要x轴
                        }
                        }
                    ],
                    series: [
                        {
                        name: "需求面积",
                        type: "bar",
                        barWidth: "40px",
                        data: allAreaData,
                        itemStyle: {
                            normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                {
                                    offset: 0,
                                    color: "#78b4f6" // 高处的颜色
                                },
                                {
                                    offset: 1,
                                    color: "#5781e5" // 低处的颜色
                                }
                                ],
                                false
                            ),
                            barBorderRadius: [30, 30, 0, 0]
                            }
                            //   label: {
                            //         show: true, //开启显示
                            //         position: 'top', //在上方显示
                            //         textStyle: { //数值样式
                            //             color: 'aqua',
                            //             fontSize: 15
                            //         }
                            // },
                        }
                        }
                    ]
                    });
                }
                );
            });
        },
        initEchart() {
            window.addEventListener("resize", () => {
                let daUseChart = echarts.init(document.getElementById("daUseChart"));
                document.getElementById("daUseChart").style.width = 100 + "%";
                daUseChart.resize();
                let daCycleChart = echarts.init(
                document.getElementById("daCycleChart")
                );
                document.getElementById("daCycleChart").style.width = 100 + "%";
                daCycleChart.resize();
                let daAreaChart = echarts.init(document.getElementById("daAreaChart"));
                document.getElementById("daAreaChart").style.width = 100 + "%";
                daAreaChart.resize();
            });
        }
    },

    mounted() {
        setTimeout(() => {
        this.daUseDrawLine();
        this.daCycleDrawLine();
        this.daAreaDrawLine();
        }, 1000);
        this.initEchart();
    },
    destroyed() {
        window.removeEventListener(
        "resize",
        () => {
            let daUseChart = echarts.init(document.getElementById("daUseChart"));
            document.getElementById("daUseChart").style.width = 100 + "%";
            daUseChart.resize();
            let daCycleChart = echarts.init(
            document.getElementById("daCycleChart")
            );
            document.getElementById("daCycleChart").style.width = 100 + "%";
            daCycleChart.resize();
            let daAreaChart = echarts.init(document.getElementById("daAreaChart"));
            document.getElementById("daAreaChart").style.width = 100 + "%";
            daAreaChart.resize();
        },
        20
        );
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
        margin-right: 16px;
        text-align: center;
        line-height: 32px;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
    }
</style>