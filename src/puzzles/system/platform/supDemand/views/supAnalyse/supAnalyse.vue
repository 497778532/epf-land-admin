<template>
    <el-tabs v-model="activeTabs" type="border-card" @tab-click="maxHandleClick">
        <el-tab-pane label="用途供给分析" name="use">
            <div class="epf_term_box">
                <el-row style="margin-bottom:10px;">
                    <el-col :span="2">
                        <span class="filter_title">行政区域：</span>
                    </el-col>
                    <el-col :span="8">
                        <div style="width:30%;float:left;margin-right:9px;">
                        <el-select
                            v-model="useFilterData.cantonProvinceName"
                            size="small"
                            placeholder="全部"
                            @change="provinceSelect(dictionary.administrative_regions,useFilterData.cantonProvinceName,$event,useFilterData)"
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
                            v-model="useFilterData.cantonCityName"
                            size="small"
                            placeholder="全部"
                            @change="citySelect(dictionary.cantonCity,useFilterData.cantonCityName,$event,useFilterData)"
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
                            v-model="useFilterData.cantonAreaName"
                            size="small"
                            placeholder="全部"
                            @change="areaSelect(dictionary.cantonArea,useFilterData.cantonAreaName,$event,useFilterData)"
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
                        <span class="filter_title">用途：</span>
                    </el-col>
                    <el-col :span="7">
                        <div style="width:45%;float:left;margin-right:9px;">
                        <el-select
                            v-model="useFilterData.firstClassUseName"
                            placeholder="全部"
                            @change="firstClassUseSelect(dictionary,useFilterData.firstClassUseName,$event,useFilterData)"
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
                            v-model="useFilterData.secondClassUseName"
                            placeholder="全部"
                            @change="secondClassUseSelect(dictionary,useFilterData.secondClassUseName,$event,useFilterData)"
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
                        <span class="filter_title">提交时间：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-date-picker
                        v-model="useTime"
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
                        <span class="filter_title">业务类型：</span>
                    </el-col>
                    <el-col :span="3">
                        <el-select
                        size="small"
                        v-model="useFilterData.circulationName"
                        placeholder="全部"
                        @change="circulationSelect(dictionary.flow_mode,useFilterData.circulationName,$event,useFilterData)"
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
                    <el-col :span="5" style="text-align:right">
                        <button class="epf_btn epf_btn_bg" @click="searchList('use')"> 查 询</button>
                        <button class="epf_btn epf_btn_def" @click="resetFilter('use')"> 重 置</button>
                    </el-col>
                </el-row>
            </div>
            <div class="epf_fr_box" :style="{height:boxHeight- 195 +'px'}">
                <el-tabs
                    v-model="activeName"
                    @tab-click="handleClick"
                    style="margin-top:25px;width:100%;height:100%;"
                    >
                    <el-tab-pane label="图形" name="graph" style="width:100%;height:100%;">
                        <div class="epf_toolbar" style="background-color:#fff;border:0;">
                            <div class="oper">
                                <span class="button_export"><a :href="useHref" style="color: #ffa000;">导出</a></span>
                            </div>
                        </div>
                        <div
                            id="useChart"
                            style="width:1200px;height:550px;margin-bottom:75px;"
                            ref="useChart"
                        ></div>
                    </el-tab-pane>
                    <el-tab-pane label="列表" name="list" style="width:100%;height:100%;">
                        <div class="epf_toolbar">
                            <span class="toolsTitle">数据列表</span>
                            <span class="button_export"><a :href="useHref" style="color: #ffa000;">导出</a></span>
                        </div>
                        <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 235  +'px'}">
                            <el-table
                                :data="useData"
                                ref="multipleTable"
                                style="width: 100%;min-height:80px;"
                                border
                                :height="boxHeight - 285"
                                v-loading="loading"
                                element-loading-text="数据加载中"
                                element-loading-background="rgba(255, 255, 255,0.95)"
                                >
                                <el-table-column label="序号" width="100" align="center">
                                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                                </el-table-column>
                                <el-table-column label="行政区域" width="200">
                                <template slot-scope="scope">
                                    <span v-if="!scope.row.cantonProvince">全部</span>
                                    <span v-if="scope.row.cantonProvince">{{scope.row.cantonProvinceName}}</span>
                                    <span v-if="scope.row.cantonCity">/</span>
                                    <span v-if="scope.row.cantonCity">{{scope.row.cantonCityName}}</span>
                                    <span v-if="scope.row.cantonArea">/</span>
                                    <span v-if="scope.row.cantonArea">{{scope.row.cantonAreaName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column label="用途">
                                <template slot-scope="scope">
                                    <span>{{scope.row.firstClassUseName}}  {{scope.row.secondClassUseName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column prop="circulationName" label="业务类型" width="90"></el-table-column>
                                <el-table-column prop="betweenDate" label="时间" width="400"></el-table-column>
                                <el-table-column prop="price" label="供给金额（万元）" width="230"></el-table-column>
                                <el-table-column prop="area" label="供给面积（万平方米）" width="290"></el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-tab-pane>
        <el-tab-pane label="供给周期分析" name="cycle">
            <div class="epf_term_box">
                <el-row style="margin-bottom:10px;">
                    <el-col :span="2">
                        <span class="filter_title">行政区域：</span>
                    </el-col>
                    <el-col :span="8">
                        <div style="width:30%;float:left;margin-right:9px;">
                        <el-select
                            v-model="cycleFilterData.cantonProvinceName"
                            size="small"
                            placeholder="全部"
                            @change="provinceSelect(dictionary.administrative_regions,cycleFilterData.cantonProvinceName,$event,cycleFilterData)"
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
                            v-model="cycleFilterData.cantonCityName"
                            size="small"
                            placeholder="全部"
                            @change="citySelect(dictionary.cantonCity,cycleFilterData.cantonCityName,$event,cycleFilterData)"
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
                            v-model="cycleFilterData.cantonAreaName"
                            size="small"
                            placeholder="全部"
                            @change="areaSelect(dictionary.cantonArea,cycleFilterData.cantonAreaName,$event,cycleFilterData)"
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
                        <span class="filter_title">用途：</span>
                    </el-col>
                    <el-col :span="7">
                        <div style="width:45%;float:left;margin-right:9px;">
                        <el-select
                            v-model="cycleFilterData.firstClassUseName"
                            placeholder="全部"
                            @change="firstClassUseSelect(dictionary,cycleFilterData.firstClassUseName,$event,cycleFilterData)"
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
                            v-model="cycleFilterData.secondClassUseName"
                            placeholder="全部"
                            @change="secondClassUseSelect(dictionary,cycleFilterData.secondClassUseName,$event,cycleFilterData)"
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
                        <span class="filter_title">业务类型：</span>
                    </el-col>
                    <el-col :span="3">
                        <el-select
                        size="small"
                        v-model="cycleFilterData.circulationName"
                        placeholder="全部"
                        @change="circulationSelect(dictionary.flow_mode,cycleFilterData.circulationName,$event,cycleFilterData)"
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
                    <el-col :span="5" style="text-align:right">
                        <button class="epf_btn epf_btn_bg" @click="searchList('cycle')"> 查 询</button>
                        <button class="epf_btn epf_btn_def" @click="resetFilter('cycle')"> 重 置</button>
                    </el-col>
                </el-row>
            </div>
            <div class="epf_fr_box" :style="{height:boxHeight- 195 +'px'}">
                <el-tabs
                    v-model="activeName"
                    @tab-click="handleClick"
                    style="margin-top:25px;width:100%;height:100%;"
                    >
                    <el-tab-pane label="图形" name="graph" style="width:100%;height:100%;">
                        <div class="epf_toolbar" style="background-color:#fff;border:0;">
                            <div class="operCycle">
                            <div style="display:inline-block;float:left;">
                                <span style="margin:0 50px 0 20px;">
                                对比周期：
                                <el-radio v-model="timeCycle" label="1">月</el-radio>
                                <el-radio v-model="timeCycle" label="2">季度</el-radio>
                                <el-radio v-model="timeCycle" label="3">年</el-radio>
                                </span>
                                <span>
                                交易时间：
                                <el-date-picker
                                    @change="intoCycleParams"
                                    v-model="cycleTime"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始时间"
                                    end-placeholder="截止时间"
                                    :picker-options="pickerOptions"
                                    value-format="yyyy-MM-dd"
                                ></el-date-picker>
                                </span>
                            </div>
                            <span class="button_export"><a :href="cycleHref" style="color: #ffa000;">导出</a></span>
                            </div>
                        </div>
                        <div id="cycleChart" style="width:1200px;height:550px;margin-bottom:75px;"></div>
                    </el-tab-pane>

                    <el-tab-pane label="列表" name="list" style="width:100%;height:100%;">
                        <div class="epf_toolbar">
                            <span class="toolsTitle">数据列表</span>
                            <span class="button_export"><a :href="cycleHref" style="color: #ffa000;">导出</a></span>
                        </div>
                        <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 235  +'px'}">
                            <el-table
                                ref="multipleTable"
                                :data="cycleList"
                                style="width: 100%;min-height:80px;"
                                border
                                :height="boxHeight - 285"
                                v-loading="loading"
                                element-loading-text="数据加载中"
                                element-loading-background="rgba(255, 255, 255,0.95)"
                                >
                                <el-table-column label="序号" width="100" align="center">
                                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                                </el-table-column>
                                <el-table-column label="行政区域" width="200">
                                <template slot-scope="scope">
                                    <!-- <span>{{scope.row.cantonProvinceName}}  {{scope.row.cantonCityName}}  {{scope.row.cantonAreaName}}</span> -->
                                    <span v-if="!scope.row.cantonProvince">全部</span>
                                    <span v-if="scope.row.cantonProvince">{{scope.row.cantonProvinceName}}</span>
                                    <span v-if="scope.row.cantonCity">/</span>
                                    <span v-if="scope.row.cantonCity">{{scope.row.cantonCityName}}</span>
                                    <span v-if="scope.row.cantonArea">/</span>
                                    <span v-if="scope.row.cantonArea">{{scope.row.cantonAreaName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column label="用途">
                                <template slot-scope="scope">
                                    <span>{{scope.row.firstClassUseName}}  {{scope.row.secondClassUseName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column prop="circulationName" label="业务类型" width="90"></el-table-column>
                                <el-table-column prop="groupName" label="时间" width="400"></el-table-column>
                                <el-table-column prop="price" label="供给金额（万元）" width="230"></el-table-column>
                                <el-table-column prop="area" label="供给面积（万平方米）" width="290"></el-table-column>
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
        <el-tab-pane label="区域供给对比" name="area">
            <div class="epf_term_box">
                <el-row style="margin-bottom:10px;">
                    <el-col :span="2">
                        <span class="filter_title">行政区域：</span>
                    </el-col>
                    <el-col :span="8">
                        <div style="width:30%;float:left;margin-right:9px;">
                        <el-select
                            v-model="areaFilterData.cantonProvinceName"
                            size="small"
                            placeholder="全部"
                            @change="provinceSelect(dictionary.administrative_regions,areaFilterData.cantonProvinceName,$event,areaFilterData)"
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
                            v-model="areaFilterData.cantonCityName"
                            size="small"
                            placeholder="全部"
                            @change="citySelect(dictionary.cantonCity,areaFilterData.cantonCityName,$event,areaFilterData)"
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
                            v-model="areaFilterData.cantonAreaName"
                            size="small"
                            placeholder="全部"
                            @change="areaSelect(dictionary.cantonArea,areaFilterData.cantonAreaName,$event,areaFilterData)"
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
                        <span class="filter_title">用途：</span>
                    </el-col>
                    <el-col :span="7">
                        <div style="width:45%;float:left;margin-right:9px;">
                        <el-select
                            v-model="areaFilterData.firstClassUseName"
                            placeholder="全部"
                            @change="firstClassUseSelect(dictionary,areaFilterData.firstClassUseName,$event,areaFilterData)"
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
                            v-model="areaFilterData.secondClassUseName"
                            placeholder="全部"
                            @change="secondClassUseSelect(dictionary,areaFilterData.secondClassUseName,$event,areaFilterData)"
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
                        <span class="filter_title">提交时间：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-date-picker
                        v-model="areaTime"
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
                        <span class="filter_title">业务类型：</span>
                    </el-col>
                    <el-col :span="3">
                        <el-select
                        size="small"
                        v-model="areaFilterData.circulationName"
                        placeholder="全部"
                        @change="circulationSelect(dictionary.flow_mode,areaFilterData.circulationName,$event,areaFilterData)"
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
                    <el-col :span="5" style="text-align:right">
                        <button class="epf_btn epf_btn_bg" @click="searchList('area')"> 查 询</button>
                        <button class="epf_btn epf_btn_def" @click="resetFilter('area')"> 重 置</button>
                    </el-col>
                </el-row>
            </div>
            <div class="epf_fr_box" :style="{height:boxHeight- 195 +'px'}">
                <el-tabs
                    v-model="activeName"
                    @tab-click="handleClick"
                    style="margin-top:25px;width:100%;height:100%;"
                    >
                    <el-tab-pane label="图形" name="graph" style="width:100%;height:100%;">
                    <div class="epf_toolbar" style="background-color:#fff;border:0;">
                        <span class="button_export"><a :href="areaHref" style="color: #ffa000;">导出</a></span>
                    </div>
                    <div id="areaChart" style="width:1200px;height:550px;margin-bottom:75px;"></div>
                    </el-tab-pane>

                    <el-tab-pane label="列表" name="list" style="width:100%;height:100%;">
                        <div class="epf_toolbar">
                            <span class="toolsTitle">数据列表</span>
                            <span class="button_export"><a :href="areaHref" style="color: #ffa000;">导出</a></span>
                        </div>
                        <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 235  +'px'}">
                            <el-table
                                :data="areaList"
                                ref="multipleTable"
                                style="width: 100%;min-height:80px;"
                                border
                                :height="boxHeight - 285"
                                v-loading="loading"
                                element-loading-text="数据加载中"
                                element-loading-background="rgba(255, 255, 255,0.95)"
                                >
                                <el-table-column label="序号" width="100" align="center">
                                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                                </el-table-column>
                                <el-table-column label="行政区域" width="200">
                                <template slot-scope="scope">
                                    <!-- <span>{{scope.row.cantonProvinceName}}  {{scope.row.cantonCityName}}  {{scope.row.cantonAreaName}}</span> -->
                                    <span v-if="!scope.row.cantonProvince">全部</span>
                                    <span v-if="scope.row.cantonProvince">{{scope.row.cantonProvinceName}}</span>
                                    <span v-if="scope.row.cantonCity">/</span>
                                    <span v-if="scope.row.cantonCity">{{scope.row.cantonCityName}}</span>
                                    <span v-if="scope.row.cantonArea">/</span>
                                    <span v-if="scope.row.cantonArea">{{scope.row.cantonAreaName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column label="用途">
                                <template slot-scope="scope">
                                    <span>{{scope.row.firstClassUseName}}   {{scope.row.secondClassUseName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column prop="circulationName" label="业务类型" width="90"></el-table-column>
                                <el-table-column prop="betweenDate" label="时间" width="400"></el-table-column>
                                <el-table-column prop="price" label="供给金额（万元）" width="230"></el-table-column>
                                <el-table-column prop="area" label="供给面积（万平方米）" width="290"></el-table-column>
                            </el-table>
                            <!-- 分页控件 -->
                            <div class="epf_paging_fixe">
                                <el-pagination
                                background
                                layout="total,prev, pager, next,sizes,jumper"
                                :page-sizes="[5,10,15,20]"
                                @size-change="area_handleSizeChange"
                                @current-change="area_handleCurrentChange"
                                :total="area_totalRecord"
                                :current-page="area_currentPage"
                                :page-size="area_pageSize"
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
import echarts from "echarts";
export default {
    data() {
        return {
            loading: true,
            //根据权限锁定省市
            provinceCheck:false,
            cityCheck:false,
            AreaCheck:false,
            obj:{      
                    dictKey: "",
                    zhCn: "全部",
                    id: "0"
            },
            useHref:
                "/api/epf-monitor/monitor/moniSellAnalyse/downClassUseAnalys?",
            cycleHref:
                "/api/epf-monitor/monitor/moniSellAnalyse/downloadSellPeriodAnalys?",
            areaHref:
                "/api/epf-monitor/monitor/moniSellAnalyse/downSellAreaAnalysPic?",
            useTime: [],
            typeTime: [],
            cycleTime: [],
            areaTime: [],
            useParams: {},
            typeParams: {},
            cycleParams: {},
            areaParams: {
                cantonProvinceName: "",
                cantonProvince: "",
                cantonCityName: "",
                cantonCity: "",
                cantonAreaName: "",
                cantonArea: "",

                firstClassUse: "",
                firstClassUseName: "", //一级土地用途
                secondClassUse: "",
                secondClassUseName: "", //二级土地用途

                startDate: "",
                endDate: "",
                circulation: "",
                circulationName: ""
            },

            typeFilterData: {
                cantonProvinceName: "",
                cantonProvince: "",
                cantonCityName: "",
                cantonCity: "",
                cantonAreaName: "",
                cantonArea: "",

                firstClassUse: "",
                firstClassUseName: "", //一级土地用途
                secondClassUse: "",
                secondClassUseName: "", //二级土地用途

                startDate: "",
                endDate: "",
                circulation: "",
                circulationName: ""
            },
            useFilterData: {
                cantonProvinceName: "",
                cantonProvince: "",
                cantonCityName: "",
                cantonCity: "",
                cantonAreaName: "",
                cantonArea: "",

                firstClassUse: "",
                firstClassUseName: "", //一级土地用途
                secondClassUse: "",
                secondClassUseName: "", //二级土地用途

                startDate: "",
                endDate: "",
                circulation: "",
                circulationName: ""
            },
            cycleFilterData: {
                cantonProvinceName: "",
                cantonProvince: "",
                cantonCityName: "",
                cantonCity: "",
                cantonAreaName: "",
                cantonArea: "",

                firstClassUse: "",
                firstClassUseName: "", //一级土地用途
                secondClassUse: "",
                secondClassUseName: "", //二级土地用途

                startDate: "",
                endDate: "",
                circulation: "",
                circulationName: ""
            },
            areaFilterData: {
                cantonProvinceName: "",
                cantonProvince: "",
                cantonCityName: "",
                cantonCity: "",
                cantonAreaName: "",
                cantonArea: "",

                firstClassUse: "",
                firstClassUseName: "", //一级土地用途
                secondClassUse: "",
                secondClassUseName: "", //二级土地用途

                startDate: "",
                endDate: "",
                circulation: "",
                circulationName: ""
            },
            activeTabs: "use",
            currentTabs: "use",
            list: [],
            handleData: "",
            activeName: "graph",
            //页码
            currentPage: 1,
            totalPage: 1,
            totalRecord: 1,
            pageNo: 1,
            pageSize: 5,
            area_currentPage: 1,
            area_totalPage: 1,
            area_totalRecord: 1,
            area_pageNo: 1,
            area_pageSize: 5,
            dicRequest: [
                "flow_mode",
                "land_nature",
                "land_use",
            ], //字典码请求
            dictionary: {
                //字典码结果
                flow_mode: "",
                land_nature: "",
                land_use: "",
                administrative_regions: "",
                cantonCity: "",
                cantonArea: "",
                land_use_second: ""
            },
            cycleList: [],
            searchInfo: {},
            searchInfo2: {},
            id: "",
            multipleSelection: [],
            useData: [],
            create: false,
            timeCycle: "1", //对比周期
            submitTime: "", //发布时间
            filterData: {
                cantonProvinceName: "",
                cantonProvince: "",
                cantonCityName: "",
                cantonCity: "",
                cantonAreaName: "",
                cantonArea: "",

                firstClassUse: "",
                firstClassUseName: "", //一级土地用途
                secondClassUse: "",
                secondClassUseName: "", //二级土地用途
                transType: "",
                transTypeName: ""
            },

            //供给周期分析
            cycleData: [
                {
                cantonProvinceName: "山西省",
                cantonCityName: "太原市",
                cantonAreaName: "小店区",
                firstClassUseName: "公共服务与公共建设用地",
                secondClassUseName: "人工牧草地",
                demandName: "转让",
                insertTime: "2019.06.12 00:00:00-2019.06.13 00:00:00",
                price: "300,000,000,00",
                area: "300,000,00",
                id: "111"
                },
                {
                cantonProvinceName: "山西省",
                cantonCityName: "太原市",
                cantonAreaName: "小店区",
                firstClassUseName: "耕地",
                secondClassUseName: "玉米",
                demandName: "出租",
                insertTime: "2019.06.18 00:00:00-2019.06.30 00:00:00",
                price: "300,000,000,00",
                area: "500,000,00",
                id: "222"
                }
            ],
            cycleOption: {
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
                top: "50px",
                left: "50px",
                right: "15px",
                bottom: "50px"
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
                xAxis: {
                data: [
                    "1月",
                    "2月",
                    "3月",
                    "4月",
                    "5月",
                    "6月",
                    "7月",
                    "8月",
                    "9月",
                    "10月",
                    "11月",
                    "12月"
                ],
                axisLabel: {
                    show: true,
                    textStyle: {
                    color: "#333" //X轴文字颜色
                    },
                    interval: 0,
                    rotate: 40
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
                },
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
                    interval: 4,
                    max: 28,
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
                    name: "供给面积",
                    type: "line",
                    yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                    smooth: true, //平滑曲线显示
                    showAllSymbol: true, //显示所有图形。
                    symbol: "circle", //标记的图形为实心圆
                    symbolSize: 2, //标记的大小
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
                    data: [3, 8, 3.5, 17, 19, 9, 4, 11, 4, 5, 15, 26]
                }
                ]
            },
            //区域供给对比
            areaData: [],
            areaList:[],
            dicNum: 0,
            areaOption: {
                color: ["#3398DB"],
                tooltip: {
                trigger: "axis",
                axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                }
                },
                grid: {
                // left: "3%",
                // right: "4%",
                // bottom: "3%",
                // containLabel: true
                top: "50px",
                left: "50px",
                right: "15px",
                bottom: "50px"
                },
                xAxis: [
                {
                    type: "category",
                    data: [
                    "北京",
                    "上海",
                    "江苏",
                    "山东",
                    "广州",
                    "山西",
                    "陕西",
                    "河北",
                    "河南",
                    "海南",
                    "四川",
                    "成都",
                    "重庆",
                    "天津",
                    "广西",
                    "湖北"
                    ],
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
                    end: 50
                }
                ],
                yAxis: [
                {
                    name: "单位：万平方米",
                    type: "value",
                    interval: 5,
                    max: 20,
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
                    name: "供给面积",
                    type: "bar",
                    barWidth: "40px",
                    data: [9, 16, 18, 16, 18, 18, 16, 18, 8, 16, 18, 15, 17, 5, 14, 11],
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
            },
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
            xData: []
        };
    },
    created() {
        this.boxHeight = window.innerHeight - 260;
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
    },
    methods: {
        intoCycleParams() {
            this.cycleParams["startDate"] = this.cycleTime[0];
            this.cycleParams["endDate"] = this.cycleTime[1];
            this.cycleDrawLine(this.cycleParams);
        },
        getCycleList(val) {
            let params = this.cycleParams;
            params["page"] = this.pageNo;
            params["rows"] = this.pageSize;
            this.$get(
                `/epf-monitor/monitor/moniSellAnalyse/sellPeriodAnalysPage`,
                params
            ).then(res => {
                if (res.code == "0") {
                for (var key in res.pager.results) {
                    if (
                    !res.pager.results[key].cantonProvinceName &&
                    !res.pager.results[key].cantonCityName&&
                    !res.pager.results[key].cantonAreaName ||
                    res.pager.results[key].cantonProvinceName == "null"&&
                    res.pager.results[key].cantonCityName == "null"&&
                    res.pager.results[key].cantonAreaName == "null"
                    ) {
                    res.pager.results[key].cantonProvinceName = "全国";
                    res.pager.results[key].cantonCityName="";
                    res.pager.results[key].cantonAreaName=""

                    }else if(
                    !res.pager.results[key].cantonCityName&&
                    !res.pager.results[key].cantonAreaName ||
                        res.pager.results[key].cantonCityName == "null"&&
                    res.pager.results[key].cantonAreaName == "null"
                    ){
                    res.pager.results[key].cantonCityName = "全部";
                        res.pager.results[key].cantonAreaName=""
                    }else if(
                    !res.pager.results[key].cantonAreaName ||  res.pager.results[key].cantonAreaName == "null"
                    ){
                    res.pager.results[key].cantonAreaName = "全部";
                    }
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
                    !res.pager.results[key].circulationName ||
                    res.pager.results[key].circulationName == "null"
                    ) {
                    res.pager.results[key].circulationName = "全部";
                    }
                    //                if (!res.pager.results[key].landCharName||res.pager.results[key].landCharName == "null") {
                    //   res.pager.results[key].landCharName = "全部";
                    // }
                }
                this.cycleList = res.pager.results;
                this.pageNo = res.pager.pageNo;
                this.pageSize = res.pager.pageSize;
                this.totalPage = res.pager.totalPage;
                this.totalRecord = res.pager.totalRecord;
                } else {
                this.$message.error(res.msg); //失败
                return;
                }
            });
        },
        monthOryearOrquarter(curVal, oldVal) {
            this.cycleParams["compPeriod"] = curVal;
            this.cycleDrawLine(this.cycleParams);
            this.getCycleList()
        },
        getAreaList(val) {
            let params = this.areaParams;
            params["page"] = this.area_pageNo;
            params["rows"] = this.area_pageSize;
            this.$get(
                `/epf-monitor/monitor/moniSellAnalyse/sellAreaAnalys`,
                params
            ).then(res => {
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
                    !res.pager.results[key].circulationName ||
                    res.pager.results[key].circulationName == "null"
                    ) {
                    res.pager.results[key].circulationName = "全部";
                    }
                }
                this.areaList = res.pager.results;
                this.area_pageNo = res.pager.pageNo;
                this.area_pageSize = res.pager.pageSize;
                this.area_totalPage = res.pager.totalPage;
                this.area_totalRecord = res.pager.totalRecord;
                } else {
                this.$message.error(res.msg); //失败
                return;
                }
            });
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getAreaList();
        },  
        handleCurrentChange(val) {
            this.pageNo = val; //页码改变
            this.getList();
        },
        area_handleSizeChange(val) {
            this.area_pageSize = val;
            this.getAreaList();
        },
        area_handleCurrentChange(val) {
            this.area_pageNo = val; //页码改变
            this.getAreaList();
        },
        resetFilter() {
            for (let item in this.filterData) {
                this.filterData[item] = "";
            }
        },
        maxHandleClick(val) {
            if (val.name == this.currentTabs) {
                return;
            }
            this.currentTabs = val.name;
            this.performanceList = [];
            if (this.activeTabs == "use") {
                // this.useDrawLine();
                this.showUse()
            } else if (this.activeTabs == "cycle") {
                // this.cycleDrawLine();
                // this.getCycleList();
                this.showCycle();
            } else if (this.activeTabs == "area") {
                // this.areaDrawLine();
                // this.getAreaList()
                this.showArea();
            }
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
        searchList(key) {
            if (key == "use") {
                this.useHref =
                "/api/epf-monitor/monitor/moniSellPurchAnalyse/downClassUseAnalys?";
                this.useParams = this.useFilterData;
                if (this.useTime) {
                this.useParams["startDate"] = this.useTime[0];
                this.useParams["endDate"] = this.useTime[1];
                }

                let hrefParams = this.urlEncode(this.useParams).slice(1);
                this.useHref = this.useHref + hrefParams;
                this.useDrawLine(this.useParams);
            } else if (key == "cycle") {
                this.cycleHref =
                "/api/epf-monitor/monitor/moniSellAnalyse/downloadSellPeriodAnalys?";
                this.cycleParams = this.cycleFilterData;
                let hrefParams = this.urlEncode(this.cycleParams).slice(1);
                this.cycleHref = this.cycleHref + hrefParams;
                this.cycleDrawLine(this.cycleParams);
                this.getCycleList(this.cycleParams);
            } else if (key == "area") {
                this.areaHref =
                "/api/epf-monitor/monitor/moniSellAnalyse/downSellAreaAnalysPic?";
                if (this.areaTime) {
                this.areaParams["startDate"] = this.areaTime[0];
                this.areaParams["endDate"] = this.areaTime[1];
                }
                this.areaParams = this.areaFilterData;
                let hrefParams = this.urlEncode(this.areaParams).slice(1);
                this.areaHref = this.areaHref + hrefParams;
                this.areaDrawLine(this.areaParams);
                this.getAreaList(this.areaParams);
            }
        },
        handleClick(val) {},
        getFilterData(val) {
            console.log(val);
            this.searchInfo = val;
        },
        getFilterData2(val) {
            this.searchInfo2 = val;
        },
        useDrawLine(params) {
            this.loading = true;
            this.$nextTick(() => {
                let useChart = echarts.init(document.getElementById("useChart"));
                this.$post(
                `/epf-monitor/monitor/moniSellAnalyse/sellClassUseAnalys`,
                params
                ).then(res => {
                console.log(res);
                if (res.code == "0") {
                    let xData = [];
                    for (var key in res.res) {
                        if (
                            !res.res[key].landCharName ||
                            res.res[key].landCharName == "null"
                        ) {
                            res.res[key].landCharName = "全部";
                        }
                        if (
                            !res.res[key].circulationName ||
                            res.res[key].circulationName == "null"
                        ) {
                            res.res[key].circulationName = "全部";
                        }
                        if (
                            !res.res[key].publishStatusName ||
                            res.res[key].publishStatusName == "null"
                        ) {
                            res.res[key].publishStatusName = "全部";
                        }
                    //                if (!res.pager.results[key].landCharName||res.pager.results[key].landCharName == "null") {
                    //   res.pager.results[key].landCharName = "全部";
                    // }
                    }
                    this.useData = res.res;
                    this.loading = false;

                    function use(x, y, data) {
                        useChart.setOption({
                        color: ["#3398DB"],
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            // left: "3%",
                            // right: "4%",
                            // bottom: "3%",
                            // containLabel: true
                            top: "50px",
                            left: "80px",
                            right: "15px",
                            bottom: "50px"
                        },
                        xAxis: [
                            {
                            type: "category",
                            data: x,
                            name: "abc",
                            nameLocation: "end",
                            axisTick: {
                                alignWithLabel: true,
                                show: false //不要刻度
                            },
                            axisLine: {
                                show: false //不要x轴
                            },
                            axisLabel: {
                                interval: 0
                            }
                            }
                        ],
                        yAxis: [
                            {
                            name: "单位：万平方米",
                            type: "value",
                            interval: Math.ceil(y / 6),
                            max: y,
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
                            name: "供给面积",
                            type: "bar",
                            barWidth: "40px",
                            data: data,
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

                    if (this.useData.length > 0) {
                    if (
                        this.useData[0].secondClassUseName &&
                        this.useData[0].secondClassUseName !== "null"
                    ) {
                        this.useData.forEach(item => {
                        xData.push(item.secondClassUseName);
                        });
                    } else {
                        this.useData.forEach(item => {
                        xData.push(item.firstClassUseName);
                        });
                    }

                    var yMax = this.useData.reduce(function(a, b) {
                        return parseInt(b.area) > parseInt(a.area) ? b : a;
                    });
                    yMax = yMax.area;
                    var contentData = [];
                    this.useData.forEach(item => {
                        contentData.push(item.area);
                    });
                    
                    use(xData, yMax, contentData);
                    } else {
                    this.loading = false;
                    this.$message({
                        message: "暂时没有数据",
                        type: "warning"
                    });
                    use([], "", []);
                    }
                } else {
                    this.$message.error(res.msg); //失败
                    return;
                }
                });
            });
        },
        cycleDrawLine(params) {
            this.loading = true;
            this.$nextTick(() => {
                let cycleChart = echarts.init(document.getElementById("cycleChart"));
                // document.getElementById("cycleChart").style.width = 85 + "%";
                this.$get(
                `/epf-monitor/monitor/moniSellAnalyse/sellPeriodAnalys`,
                params
                ).then(res => {
                console.log(res);
                this.cycleData = res.res;
                
                var xData = [];
                var yMax = "";
                var contentData = [];
                if (res.code == "0") {
                    this.loading = false;

                    function cycle(x, y, data) {
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
                            top: "50px",
                            left: "50px",
                            right: "15px",
                            bottom: "50px"
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
                        xAxis: {
                            data: x,
                            axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#333" //X轴文字颜色
                            },
                            interval: 0,
                            rotate: 0
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
                        },
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
                            interval: Math.ceil(y / 6),
                            max: y,
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
                            name: "供给面积",
                            type: "line",
                            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                            smooth: true, //平滑曲线显示
                            showAllSymbol: true, //显示所有图形。
                            symbol: "circle", //标记的图形为实心圆
                            symbolSize: 2, //标记的大小
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
                            data: data
                            }
                        ]
                        });
                    }
                    if (this.cycleData && this.cycleData.length > 0) {
                    this.cycleData.forEach(item => {
                        xData.push(item.groupName);
                    });

                    yMax = this.cycleData.reduce(function(a, b) {
                        return parseInt(b.area) > parseInt(a.area) ? b : a;
                    });
                    yMax = yMax.area;

                    this.cycleData.forEach(item => {
                        contentData.push(item.area);
                    });
                    

                    cycle(xData, yMax, contentData);
                    } else {
                    this.loading = false;
                    this.$message({
                        message: "暂时没有数据",
                        type: "warning"
                    });
                    cycle([], "", []);
                    }
                } else {
                    this.$message.error(res.msg); //失败
                    return;
                }
                });

                // 绘制图表
                // cycleChart.setOption(this.cycleOption);
            });
        },
        cycle(x, y, data) {},
        areaDrawLine(params) {
            this.loading = true;
            this.$nextTick(() => {
                let areaChart = echarts.init(document.getElementById("areaChart"));
                // 绘制图表
                this.$post(
                `/epf-monitor/monitor/moniSellAnalyse/sellAreaAnalysPic`,
                params
                ).then(res => {
                console.log(res);
                if (res.code == "0") {
                    var xData = [];
                    var contentData = [];
                    var yMax = 0;
                    this.areaData = res.list;
                    this.loading = false;
                    if (this.areaData && this.areaData.length > 0) {
                    if (
                        this.areaParams.cantonCity &&
                        this.areaParams.cantonProvince
                    ) {
                        this.areaData.forEach(item => {
                        xData.push(item.cantonAreaName);
                        });
                        console.log("出来区");
                    } else if (this.areaParams.cantonProvince) {
                        this.areaData.forEach(item => {
                        xData.push(item.cantonCityName);
                        });
                        console.log("出来市");
                    } else {
                        this.areaData.forEach(item => {
                        xData.push(item.cantonProvinceName);
                        });
                        console.log("出来省");
                    }
                    yMax = this.areaData.reduce(function(a, b) {
                        return parseInt(b.area) > parseInt(a.area) ? b : a;
                    });
                    yMax = yMax.area;

                    this.areaData.forEach(item => {
                        contentData.push(item.area);
                    });

                    this.area(areaChart, xData, yMax, contentData);
                    } else {
                    this.loading = false;
                    this.$message({
                        message: "暂时没有数据",
                        type: "warning"
                    });
                    this.area(areaChart, [], "", []);
                    }
                } else {
                    this.$message.error(res.msg); //失败
                    return;
                }
                });
            });
        },
        area(chart, x, y, data) {
            chart.setOption({
                color: ["#3398DB"],
                tooltip: {
                trigger: "axis",
                axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                }
                },
                grid: {
                // left: "3%",
                // right: "4%",
                // bottom: "3%",
                // containLabel: true
                top: "50px",
                left: "50px",
                right: "15px",
                bottom: "50px"
                },
                xAxis: [
                {
                    type: "category",
                    data: x,
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
                    end: 50
                }
                ],
                yAxis: [
                {
                    name: "单位：万平方米",
                    type: "value",
                    interval: Math.ceil(y / 6),
                    max: y,
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
                    name: "供给面积",
                    type: "bar",
                    barWidth: "40px",
                    data: data,
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
        },
        resetFilter(key) {
            switch (key) {
                case "use":
                for (let item in this.useFilterData) {
                    // this.useFilterData[item] = "";
                    if((this.provinceCheck && item == 'cantonProvince') || (this.provinceCheck && item == 'cantonProvinceName')){
                    continue;
                    }else if((this.cityCheck && item == 'cantonCity') || (this.cityCheck && item == 'cantonCityName')){
                    continue;
                    }else if((this.AreaCheck && item == 'cantonArea') || (this.AreaCheck && item == 'cantonAreaName')){
                    continue;
                    }else{
                    this.useFilterData[item] = "";
                    }
                }
                this.useTime = [];
                break;
                case "cycle":
                for (let item in this.cycleFilterData) {
                    // this.cycleFilterData[item] = "";
                    if((this.provinceCheck && item == 'cantonProvince') || (this.provinceCheck && item == 'cantonProvinceName')){
                    continue;
                    }else if((this.cityCheck && item == 'cantonCity') || (this.cityCheck && item == 'cantonCityName')){
                    continue;
                    }else if((this.AreaCheck && item == 'cantonArea') || (this.AreaCheck && item == 'cantonAreaName')){
                    continue;
                    }else{
                    this.cycleFilterData[item] = "";
                    }
                }
                this.cycleTime = [];
                break;
                case "area":
                for (let item in this.areaFilterData) {
                    // this.areaFilterData[item] = "";
                    if((this.provinceCheck && item == 'cantonProvince') || (this.provinceCheck && item == 'cantonProvinceName')){
                    continue;
                    }else if((this.cityCheck && item == 'cantonCity') || (this.cityCheck && item == 'cantonCityName')){
                    continue;
                    }else if((this.AreaCheck && item == 'cantonArea') || (this.AreaCheck && item == 'cantonAreaName')){
                    continue;
                    }else{
                    this.areaFilterData[item] = "";
                    }
                }
                this.areaTime = [];
                break;
            }
        },
        provinceSelect(dic, cantonCode, event, key) {
            console.log(this.useParams);
            key.cantonAreaName = "";
            key.cantonArea = "";
            this.cantonArea = "";
            key.cantonCityName = "";
            key.cantonCity = "";
            this.cantonCity = "";
            let pId = this.$refs[cantonCode][0].$attrs.id;
            key.cantonProvince = this.$refs[cantonCode][0].$attrs.regionCode;

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
        citySelect(dic, cantonCity, event, key) {
            key.cantonArea = "";
            key.cantonAreaName = "";
            this.cantonArea = "";
            let pId = this.$refs[cantonCity][0].$attrs.id;
            key.cantonCity = this.$refs[cantonCity][0].$attrs.regionCode;
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
        areaSelect(dic, cantonCity, event, key) {
            key.cantonArea = this.$refs[cantonCity][0].$attrs.regionCode;
        },

        firstClassUseSelect(dic, firstClassUse, event, key) {
            key.secondClassUse = "";
            key.secondClassUseName = "";
            this.dictionary.land_use_second = "";
            var pId = this.$refs[firstClassUse][0].$attrs.id;
            key.firstClassUse = this.$refs[firstClassUse][0].$attrs.dictKey;
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
            console.log(this.typeFilterData);
            console.log(this.useFilterData);
            console.log(this.cycleFilterData);
            console.log(this.areaFilterData);
        },
        secondClassUseSelect(dic, firstClassUse, event, key) {
            key.secondClassUse = this.$refs[firstClassUse][0].$attrs.dictKey;
        },
        purchasrSelect(dic, entrustAgency, event, key) {
            key.entrustAgency = this.$refs[entrustAgency][0].$attrs.dictKey;
            this.filterData.entrustAgencyId = this.$refs[
                entrustAgency
            ][0].$attrs.dictId;
            this.filterData.trustOrgId = this.$refs[entrustAgency][0].$attrs.dictKey;
        },
        circulationSelect(dic, circulationName, event, key) {
            console.log(this.typeFilterData);
            key.circulation = this.$refs[circulationName][0].$attrs.dictKey;
        },
        //用途统计分析
        showUse(){
            setTimeout(()=>{
                if(sessionStorage.getItem("org_level") == 'org_level-003'){
                this.provinceCheck = true;
                //用途供给分析
                this.useFilterData.cantonProvince = sessionStorage.getItem("jgProvinceCode")
                this.useFilterData.cantonProvinceName = sessionStorage.getItem("jgProvince")
                this.provinceSelect('',this.useFilterData.cantonProvinceName,'',this.useFilterData)
                this.searchList('use')
                }else if(sessionStorage.getItem("org_level") == 'org_level-005'){
                this.provinceCheck = true;
                this.cityCheck = true;
                this.useFilterData.cantonProvince = sessionStorage.getItem("jgProvinceCode")
                this.useFilterData.cantonProvinceName = sessionStorage.getItem("jgProvince")
                this.provinceSelect('',this.useFilterData.cantonProvinceName,'',this.useFilterData)
                setTimeout(()=>{
                    this.useFilterData.cantonCity = sessionStorage.getItem("jgCityCode")
                    this.useFilterData.cantonCityName = sessionStorage.getItem("jgCity")
                    this.citySelect('',this.useFilterData.cantonCityName,'',this.useFilterData)
                    this.searchList('use')
                },800)
                }else if(sessionStorage.getItem("org_level") == 'org_level-004'){
                this.provinceCheck = true;
                this.cityCheck = true;
                this.AreaCheck = true;
                this.useFilterData.cantonProvince = sessionStorage.getItem("jgProvinceCode")
                this.useFilterData.cantonProvinceName = sessionStorage.getItem("jgProvince")
                // this.provinceSelect('',this.useFilterData.cantonProvinceName,'',this.useFilterData)
                // setTimeout(()=>{
                    this.useFilterData.cantonCity = sessionStorage.getItem("jgCityCode")
                    this.useFilterData.cantonCityName = sessionStorage.getItem("jgCity")
                    // this.citySelect('',this.useFilterData.cantonCityName,'',this.useFilterData)
                    // setTimeout(()=>{
                    this.useFilterData.cantonArea = sessionStorage.getItem("jgAreaCode")
                    this.useFilterData.cantonAreaName = sessionStorage.getItem("jgArea")
                    this.searchList('use')
                //   },800)
                // },800)
                }else{
                this.useDrawLine();
                }
            },500)
        },
        //供给周期分析
        showCycle(){
            setTimeout(()=>{
                if(sessionStorage.getItem("org_level") == 'org_level-003'){
                this.provinceCheck = true;
                //用途供给分析
                this.cycleFilterData.cantonProvince = sessionStorage.getItem("jgProvinceCode")
                this.cycleFilterData.cantonProvinceName = sessionStorage.getItem("jgProvince")
                this.provinceSelect('',this.cycleFilterData.cantonProvinceName,'',this.cycleFilterData)
                this.searchList('cycle')
                }else if(sessionStorage.getItem("org_level") == 'org_level-005'){
                this.provinceCheck = true;
                this.cityCheck = true;
                this.cycleFilterData.cantonProvince = sessionStorage.getItem("jgProvinceCode")
                this.cycleFilterData.cantonProvinceName = sessionStorage.getItem("jgProvince")
                this.provinceSelect('',this.cycleFilterData.cantonProvinceName,'',this.cycleFilterData)
                setTimeout(()=>{
                    this.cycleFilterData.cantonCity = sessionStorage.getItem("jgCityCode")
                    this.cycleFilterData.cantonCityName = sessionStorage.getItem("jgCity")
                    this.citySelect('',this.cycleFilterData.cantonCityName,'',this.cycleFilterData)
                    this.searchList('cycle')
                },800)
                }else if(sessionStorage.getItem("org_level") == 'org_level-004'){
                this.provinceCheck = true;
                this.cityCheck = true;
                this.AreaCheck = true;
                this.cycleFilterData.cantonProvince = sessionStorage.getItem("jgProvinceCode")
                this.cycleFilterData.cantonProvinceName = sessionStorage.getItem("jgProvince")
                // this.provinceSelect('',this.cycleFilterData.cantonProvinceName,'',this.cycleFilterData)
                // setTimeout(()=>{
                    this.cycleFilterData.cantonCity = sessionStorage.getItem("jgCityCode")
                    this.cycleFilterData.cantonCityName = sessionStorage.getItem("jgCity")
                    // this.citySelect('',this.cycleFilterData.cantonCityName,'',this.cycleFilterData)
                    // setTimeout(()=>{
                    this.cycleFilterData.cantonArea = sessionStorage.getItem("jgAreaCode")
                    this.cycleFilterData.cantonAreaName = sessionStorage.getItem("jgArea")
                    this.searchList('cycle')
                //   },800)
                // },800)
                }else{
                this.cycleDrawLine();
                this.getCycleList();
                }
            },500)
        },
        //区域供给对比
        showArea(){
            setTimeout(()=>{
                if(sessionStorage.getItem("org_level") == 'org_level-003'){
                this.provinceCheck = true;
                //用途供给分析
                this.areaFilterData.cantonProvince = sessionStorage.getItem("jgProvinceCode")
                this.areaFilterData.cantonProvinceName = sessionStorage.getItem("jgProvince")
                this.provinceSelect('',this.areaFilterData.cantonProvinceName,'',this.areaFilterData)
                this.searchList('area')
                }else if(sessionStorage.getItem("org_level") == 'org_level-005'){
                this.provinceCheck = true;
                this.cityCheck = true;
                this.areaFilterData.cantonProvince = sessionStorage.getItem("jgProvinceCode")
                this.areaFilterData.cantonProvinceName = sessionStorage.getItem("jgProvince")
                this.provinceSelect('',this.areaFilterData.cantonProvinceName,'',this.areaFilterData)
                setTimeout(()=>{
                    this.areaFilterData.cantonCity = sessionStorage.getItem("jgCityCode")
                    this.areaFilterData.cantonCityName = sessionStorage.getItem("jgCity")
                    this.citySelect('',this.areaFilterData.cantonCityName,'',this.areaFilterData)
                    this.searchList('area')
                },800)
                }else if(sessionStorage.getItem("org_level") == 'org_level-004'){
                this.provinceCheck = true;
                this.cityCheck = true;
                this.AreaCheck = true;
                this.areaFilterData.cantonProvince = sessionStorage.getItem("jgProvinceCode")
                this.areaFilterData.cantonProvinceName = sessionStorage.getItem("jgProvince")
                // this.provinceSelect('',this.areaFilterData.cantonProvinceName,'',this.areaFilterData)
                // setTimeout(()=>{
                    this.areaFilterData.cantonCity = sessionStorage.getItem("jgCityCode")
                    this.areaFilterData.cantonCityName = sessionStorage.getItem("jgCity")
                    // this.citySelect('',this.areaFilterData.cantonCityName,'',this.areaFilterData)
                    // setTimeout(()=>{
                    this.areaFilterData.cantonArea = sessionStorage.getItem("jgAreaCode")
                    this.areaFilterData.cantonAreaName = sessionStorage.getItem("jgArea")
                    this.searchList('area')
                //   },800)
                // },800)
                }else{
                this.areaDrawLine();
                this.getAreaList()
                }
            },500)
        }
    },
    mounted() {
        this.showUse();
        // this.cycleDrawLine();
        // this.areaDrawLine();
        
    },
    watch: {
        timeCycle: "monthOryearOrquarter"
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
        margin-right: 16px;
        text-align: center;
        line-height: 32px;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
    }
</style>