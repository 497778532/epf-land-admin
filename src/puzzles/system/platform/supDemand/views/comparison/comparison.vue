<template>
    <epf-container title="供需对比分析">
        <el-tabs v-model="activeTabs" type="border-card" @tab-click="maxHandleClick">
            <el-tab-pane label="类型对比" name="type">
                <div class="epf_term_box">
                    <el-row style="margin-bottom:10px;">
                        <el-col :span="2">
                            <span class="filter_title">行政区域：</span>
                        </el-col>
                        <el-col :span="8">
                            <div style="width:30%;float:left;margin-right:9px;">
                            <el-select
                                v-model="typeFilterData.cantonProvinceName"
                                size="small"
                                placeholder="全部"
                                @change="provinceSelect(dictionary.administrative_regions,typeFilterData.cantonProvinceName,$event,typeFilterData)"
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
                                v-model="typeFilterData.cantonCityName"
                                size="small"
                                placeholder="全部"
                                @change="citySelect(dictionary.cantonCity,typeFilterData.cantonCityName,$event,typeFilterData)"
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
                                v-model="typeFilterData.cantonAreaName"
                                size="small"
                                placeholder="全部"
                                @change="areaSelect(dictionary.cantonArea,typeFilterData.cantonAreaName,$event,typeFilterData)"
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
                                v-model="typeFilterData.firstClassUseName"
                                placeholder="全部"
                                @change="firstClassUseSelect(dictionary,typeFilterData.firstClassUseName,$event,typeFilterData)"
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
                                v-model="typeFilterData.secondClassUseName"
                                placeholder="全部"
                                @change="secondClassUseSelect(dictionary,typeFilterData.secondClassUseName,$event,typeFilterData)"
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
                            v-model="typeTime"
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
                            v-model="typeFilterData.circulationName"
                            placeholder="全部"
                            @change="circulationSelect(dictionary.flow_mode,typeFilterData.circulationName,$event,typeFilterData)"
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

                        <el-col :span="2" :offset="2">
                            <div class="button_bg" @click="searchList('type')">查询</div>
                        </el-col>
                        <el-col :span="2">
                            <div class="button_default" @click="resetFilter('type')">重置</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <span class="filter_title">(此处不含交易方式为抵押的供给数据)</span>
                        </el-col>
                    </el-row>
                </div>
                <div class="epf_fr_box" :style="{height:boxHeight- 195 +'px'}">
                    <el-tabs
                        v-model="activeName"
                        @tab-click="handleClick"
                        style="margin-top:25px;width:100%;height:100%;"
                        >
                        <el-tab-pane
                        label="图形"
                        name="graph"
                        style="width:100%;height:100%; position: relative;"
                        >
                        <div class="epf_toolbar" style="background-color:#fff;border:0;">
                            <div class="oper">
                            <span class="button_export"><a :href="typeHref" style="color: #ffa000;">导出</a></span>
                            </div>
                        </div>
                        <div id="typeChart" style="width:1200px;height:550px;margin-bottom:75px;"></div>
                        <div>
                            <span
                            style="position: absolute;bottom:50px;left:280px;"
                            >供给面积：{{typeChartData[1].totalArea}}万平方米</span>
                            <span
                            style="position: absolute;bottom:50px;left:770px;"
                            >需求面积：{{typeChartData[0].totalArea}}万平方米</span>
                        </div>
                        </el-tab-pane>
                        <el-tab-pane label="列表" name="list" style="width:100%;height:100%;">
                        <div class="epf_toolbar">
                            <span class="toolsTitle">数据列表</span>
                            <span class="button_export"><a :href="typeHref" style="color: #ffa000;">导出</a></span>
                        </div>
                        <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 235  +'px'}">
                            <el-table
                                ref="multipleTable"
                                :data="typeChartData"
                                style="width: 100%;min-height:80px;"
                                border
                                :height="boxHeight - 285"
                                >
                                <el-table-column label="序号" width="100" align="center">
                                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                                </el-table-column>
                                <el-table-column label="行政区域" width="285">
                                <template slot-scope="scope">
                                    <span>{{scope.row.cantonProvinceName}} {{scope.row.cantonCityName}} {{scope.row.cantonAreaName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column label="用途">
                                <template slot-scope="scope">
                                    <span>{{scope.row.firstClassUseName}} {{scope.row.secondClassUseName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column prop="compareType" label="对比类型" width="230"></el-table-column>
                                <el-table-column prop="totalAmount" label="金额（万元）" width="300"></el-table-column>
                                <el-table-column prop="totalArea" label="面积（万平方米）" width="300"></el-table-column>
                            </el-table>
                        </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-tab-pane>
            <el-tab-pane label="用途供需分析" name="use">
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

                        <el-col :span="2" :offset="2">
                            <div class="button_bg" @click="searchList('use')">查询</div>
                        </el-col>
                        <el-col :span="2">
                            <div class="button_default" @click="resetFilter('use')">重置</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <span class="filter_title">(此处不含交易方式为抵押的供给数据)</span>
                        </el-col>
                    </el-row>
                </div>
                <div class="epf_fr_box" :style="{height:boxHeight- 195 +'px'}">
                    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top:25px;">
                        <el-tab-pane label="图形" name="graph">
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
                                ref="multipleTable"
                                :data="useData"
                                style="width: 100%;min-height:80px;"
                                border
                                :height="boxHeight - 285"
                                >
                                <el-table-column label="序号" width="80" align="center">
                                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                                </el-table-column>
                                <el-table-column label="行政区域" width="210">
                                <template slot-scope="scope">
                                    <span>{{scope.row.cantonProvinceName}} {{scope.row.cantonCityName}} {{scope.row.cantonAreaName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column prop="circulationName" label="业务类型" width="80"></el-table-column>
                                <el-table-column label="用途">
                                <template slot-scope="scope">
                                    <span>{{scope.row.firstClassUseName}} {{scope.row.secondClassUseName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column prop="datebetw" label="时间" width="250"></el-table-column>
                                <el-table-column prop="gjTotalAmount" label="供给金额（万元）" width="155"></el-table-column>
                                <el-table-column prop="gjTotalArea" label="供给面积（万平方米）" width="165"></el-table-column>
                                <el-table-column prop="xqTotalAmount" label="需求金额（万元）" width="155"></el-table-column>
                                <el-table-column prop="xqTotalArea" label="需求面积（万平方米）" width="165"></el-table-column>
                            </el-table>
                        </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-tab-pane>
            <el-tab-pane label="供需周期分析" name="cycle">
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

                        <el-col :span="2" :offset="2">
                            <div class="button_bg" @click="searchList('cycle')">查询</div>
                        </el-col>
                        <el-col :span="2">
                            <div class="button_default" @click="resetFilter('cycle')">重置</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <span class="filter_title">(此处不含交易方式为抵押的供给数据)</span>
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
                        <div
                            id="cycleChart"
                            style="width:1200px;height:550px;margin-bottom:75px;"
                            ref="cycleChart"
                        ></div>
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
                                >
                                <el-table-column label="序号" width="80" align="center">
                                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                                </el-table-column>
                                <el-table-column label="行政区域" width="210">
                                <template slot-scope="scope">
                                    <span>{{scope.row.cantonProvinceName}} {{scope.row.cantonCityName}} {{scope.row.cantonAreaName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column prop="circulationName" label="业务类型" width="80"></el-table-column>
                                <el-table-column label="用途">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.firstClassUseName}}  {{scope.row.secondClassUseName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="datebetw" label="时间" width="320"></el-table-column>
                                <el-table-column prop="gjTotalAmount" label="供给金额（万元）" width="155"></el-table-column>
                                <el-table-column prop="gjTotalArea" label="供给面积（万平方米）" width="165"></el-table-column>
                                <el-table-column prop="xqTotalAmount" label="需求金额（万元）" width="155"></el-table-column>
                                <el-table-column prop="xqTotalArea" label="需求面积（万平方米）" width="165"></el-table-column>
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
            <el-tab-pane label="区域供需对比" name="area">
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

                        <el-col :span="2" :offset="2">
                            <div class="button_bg" @click="searchList('area')">查询</div>
                        </el-col>
                        <el-col :span="2">
                            <div class="button_default" @click="resetFilter('area')">重置</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <span class="filter_title">(此处不含交易方式为抵押的供给数据)</span>
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
                                    ref="multipleTable"
                                    :data="areaData"
                                    style="width: 100%;min-height:80px;"
                                    border
                                    :height="boxHeight - 285"
                                    >
                                    <el-table-column label="序号" width="80" align="center">
                                    <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                                    </el-table-column>
                                    <el-table-column label="行政区域" width="210">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.cantonProvinceName}} {{scope.row.cantonCityName}} {{scope.row.cantonAreaName}}</span>
                                    </template>
                                    </el-table-column>
                                    <el-table-column prop="circulationName" label="业务类型" width="80"></el-table-column>
                                    <el-table-column label="用途">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.firstClassUseName}}  {{scope.row.secondClassUseName}}</span>
                                    </template>>
                                    </el-table-column>
                                    <el-table-column prop="datebetw" label="时间" width="320"></el-table-column>
                                    <el-table-column prop="gjTotalAmount" label="供给金额（万元）" width="155"></el-table-column>
                                    <el-table-column prop="gjTotalArea" label="供给面积（万平方米）" width="165"></el-table-column>
                                    <el-table-column prop="xqTotalAmount" label="需求金额（万元）" width="155"></el-table-column>
                                    <el-table-column prop="xqTotalArea" label="需求面积（万平方米）" width="165"></el-table-column>
                                </el-table>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
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
            obj: {
                dictKey: "",
                zhCn: "全部",
                id: "0"
            },
            typeHref:
                "/api/epf-monitor/monitor/moniSellPurchAnalyse/downLoadTypeCompare?",
            useHref:
                "/api/epf-monitor/monitor/moniSellPurchAnalyse/downloadClassUseCompare?",
            cycleHref:
                "/api/epf-monitor/monitor/moniSellPurchAnalyse/downloadPeriodCompare?",
            areaHref:
                "/api/epf-monitor/monitor/moniSellPurchAnalyse/downloadAreaCompare?",
            useTime: [],
            typeTime: [],
            cycleTime: [],
            areaTime: [],
            useParams: {},
            typeParams: {},
            cycleParams: {},
            areaParams: {},

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
            dicRequest: [
                "flow_mode",
                "land_nature",
                "land_use",
            ], //字典码请求字典码请求
            dictionary: {
                //字典码结果
                flow_mode:"",
                land_nature: "",
                land_use: "",
                administrative_regions: "",
                cantonCity: "",
                cantonArea: "",
                land_use_second: ""
            },
            activeTabs: "type",
            currentTabs: "type",
            dicNum: 0,
            handleData: "",
            activeName: "graph",
            //页码
            currentPage: 1,
            totalPage: 1,
            totalRecord: 1,
            pageNo: 1,
            pageSize: 5,
            no_currentPage: 1,
            no_totalPage: 1,
            no_totalRecord: 1,
            no_pageNo: 1,
            no_pageSize: 5,

            searchInfo: {},
            id: "",
            multipleSelection: [],

            create: false,
            timeCycle: "1", //对比周期
            submitTime: "", //发布时间
            //类型对比
            typeChartData: [
                {
                cantonProvinceName: "山西省",
                cantonCityName: "太原市",
                cantonAreaName: "小店区",
                firstClassUseName: "公共服务与公共建设用地",
                secondClassUseName: "人工牧草地",
                typeName: "需求",
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
                typeName: "供给",
                price: "500,000,000,00",
                area: "800,000,00",
                id: "222"
                }
            ],

            //用途供需分析
            useData: [],
            // useOption: ,
            //供需周期分析
            cycleData: [],
            cycleList: [],
            //区域供需对比
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
        this.dictionary.flow_mode=[
            {dictKey:'',zhCn:'全部',id:'1'},
            {dictKey:'zr',zhCn:'转让',id:'1'},
            {dictKey:'cz',zhCn:'出租',id:'1'}
        ]
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
        getCycleList(val) {
            let params = this.cycleParams;
            params["page"] = this.pageNo;
            params["rows"] = this.pageSize;
            this.$get(
                `/epf-monitor/monitor/moniSellPurchAnalyse/queryPeriodCompare`,
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
        resetFilter(key) {
            switch (key) {
                case "type":
                for (let item in this.typeFilterData) {
                    // this.typeFilterData[item] = "";
                    if((this.provinceCheck && item == 'cantonProvince') || (this.provinceCheck && item == 'cantonProvinceName')){
                    continue;
                    }else if((this.cityCheck && item == 'cantonCity') || (this.cityCheck && item == 'cantonCityName')){
                    continue;
                    }else if((this.AreaCheck && item == 'cantonArea') || (this.AreaCheck && item == 'cantonAreaName')){
                    continue;
                    }else{
                    this.typeFilterData[item] = "";
                    }
                }
                this.typeTime = [];
                break;
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
            //       typeHref:"/api/epf-monitor/monitor/moniSellPurchAnalyse/downLoadTypeCompare?",
            // useHref:"/api/epf-monitor/monitor/moniSellPurchAnalyse/downloadClassUseCompare?",
            // cycleHref:"/api/epf-monitor/monitor/moniSellPurchAnalyse/downloadPeriodCompare?",
            switch (key) {
                case "type":
                this.typeParams = this.typeFilterData;
                this.typeHref =
                    "/api/epf-monitor/monitor/moniSellPurchAnalyse/downLoadTypeCompare?";
                if (this.typeTime) {
                    this.typeParams["startDate"] = this.typeTime[0];
                    this.typeParams["endDate"] = this.typeTime[1];
                }
                let hrefParams = this.urlEncode(this.typeParams).slice(1);
                this.typeHref = this.typeHref + hrefParams;
                this.typeDrawLine(this.typeParams);
                break;
                case "use":
                this.useParams = this.useFilterData;
                this.useHref =
                    "/api/epf-monitor/monitor/moniSellPurchAnalyse/downloadClassUseCompare?";
                if (this.useTime) {
                    this.useParams["startDate"] = this.useTime[0];
                    this.useParams["endDate"] = this.useTime[1];
                }
                let useHrefParams = this.urlEncode(this.useParams).slice(1);
                this.useHref = this.useHref + useHrefParams;
                this.useDrawLine(this.useParams);
                break;
                case "cycle":
                this.cycleParams = this.cycleFilterData;
                this.cycleHref =
                    "/api/epf-monitor/monitor/moniSellPurchAnalyse/downloadPeriodCompare?";
                this.cycleParams["compPeriod"] = this.timeCycle;
                let cycleHrefParams = this.urlEncode(this.cycleParams).slice(1);
                this.cycleHref = this.cycleHref + cycleHrefParams;
                this.cycleDrawLine(this.cycleParams);
                this.getCycleList(this.cycleParams);
                break;
                case "area":
                this.areaParams = this.areaFilterData;
                this.areaHref =
                    "/api/epf-monitor/monitor/moniSellPurchAnalyse/downloadAreaCompare?";
                if (this.areaTime) {
                    this.areaParams["startDate"] = this.areaTime[0];
                    this.areaParams["endDate"] = this.areaTime[1];
                }
                let areaHrefParams = this.urlEncode(this.areaParams).slice(1);
                this.areaHref = this.areaHref + areaHrefParams;
                this.areaDrawLine(this.areaParams);
                break;
            }
        },
        initCycle() {},
        intoCycleParams() {
            this.cycleParams["startDate"] = this.cycleTime[0];
            this.cycleParams["endDate"] = this.cycleTime[1];
            this.cycleDrawLine(this.cycleParams);
        },
        handleSizeChange(val) {
            //每页条数改变时触发
            this.searchInfo["page"] = 1;
            this.searchInfo["rows"] = val;
            //   this.getList(this.searchInfo);
        },
        handleCurrentChange(val) {
            //获取当前页
            this.searchInfo["page"] = val;
            this.searchInfo["rows"] = this.pageSize;
            //   this.getList(this.searchInfo);
        },
        no_handleSizeChange(val) {
            //每页条数改变时触发
            this.searchInfo["page"] = 1;
            this.searchInfo["rows"] = val;
            //   this.getList(this.searchInfo);
        },
        no_handleCurrentChange(val) {
            //获取当前页
            this.searchInfo["page"] = val;
            this.searchInfo["rows"] = this.pageSize;
            //   this.getList(this.searchInfo);
        },
        handleClick(val) {
            if (val.name == this.currentTabs) {
                return;
            }
            this.currentTabs = val.name;
            this.performanceList = [];
            if (this.activeTabs == "use") {
                let userToken = sessionStorage.getItem("token");
                this.activeName = "graph";
                // this.getList({ token: userToken, publishStatus: "audit" });
            } else if (this.activeTabs == "cycle") {
                let userToken = sessionStorage.getItem("token");
                this.activeName = "graph";
                // this.getList({ token: userToken, isAuditing: "2" });
            } else {
                let userToken = sessionStorage.getItem("token");
                this.activeName = "graph";
            }
        },
        getFilterData(val) {
            console.log(val);
            this.searchInfo = val;
            //   this.getList(this.searchInfo);
            },
            monthOryearOrquarter(curVal, oldVal) {
            this.cycleParams["compPeriod"] = curVal;
            this.cycleDrawLine(this.cycleParams);
            this.getCycleList();
            },
            typeDrawLine(params) {
            this.$nextTick(() => {
                let typeChart = echarts.init(document.getElementById("typeChart"));
                // 绘制图表
                this.$get(
                `/epf-monitor/monitor/moniSellPurchAnalyse/list`,
                params
                ).then(res => {
                for (var key in res.list) {
                    if (
                    (!res.list[key].cantonProvinceName &&
                        !res.list[key].cantonCityName &&
                        !res.list[key].cantonAreaName) ||
                    (res.list[key].cantonProvinceName == "null" &&
                        res.list[key].cantonCityName == "null" &&
                        res.list[key].cantonAreaName == "null")
                    ) {
                    res.list[key].cantonProvinceName = "全国";
                    res.list[key].cantonCityName = "";
                    res.list[key].cantonAreaName = "";
                    } else if (
                    (!res.list[key].cantonCityName &&
                        !res.list[key].cantonAreaName) ||
                    (res.list[key].cantonCityName == "null" &&
                        res.list[key].cantonAreaName == "null")
                    ) {
                    res.list[key].cantonCityName = "全部";
                    res.list[key].cantonAreaName = "";
                    } else if (
                    !res.list[key].cantonAreaName ||
                    res.list[key].cantonAreaName == "null"
                    ) {
                    res.list[key].cantonAreaName = "全部";
                    }
                    if (
                    (!res.list[key].firstClassUseName &&
                        !res.list[key].secondClassUseName) ||
                    (res.list[key].firstClassUseName == "null" &&
                        res.list[key].secondClassUseName == "null")
                    ) {
                    res.list[key].firstClassUseName = "全部";
                    res.list[key].secondClassUseName = "";
                    } else if (
                    !res.list[key].secondClassUseName ||
                    res.list[key].secondClassUseName == "null"
                    ) {
                    res.list[key].secondClassUseName = "全部";
                    }
                    if (
                    !res.list[key].circulationName ||
                    res.list[key].circulationName == "null"
                    ) {
                    res.list[key].circulationName = "全部";
                    }
                    //                if (!res.pager.results[key].landCharName||res.pager.results[key].landCharName == "null") {
                    //   res.pager.results[key].landCharName = "全部";
                    // }
                }

                this.typeChartData = res.list;
                var value1 = 0;
                var value2 = 0;
                var contentData = [];
                if (res.code == "0") {
                    if (this.typeChartData && this.typeChartData.length > 0) {
                    value1 = (
                        this.typeChartData[0].totalArea /
                        (this.typeChartData[0].totalArea +
                        this.typeChartData[1].totalArea)
                    ).toFixed(4);
                    value1 = value1 * 100;
                    value2 = 100 - value1;
                    function type(value1, value2) {
                        typeChart.setOption({
                        title: [
                            {
                            text: "供给面积",
                            x: "26%",
                            y: "47%",
                            textStyle: {
                                fontWeight: "bolder",
                                color: "#666666",
                                fontSize: "30"
                            }
                            },
                            {
                            text: "需求面积",
                            x: "66%",
                            y: "47%",
                            textStyle: {
                                fontWeight: "bolder",
                                color: "#666666",
                                fontSize: "30"
                            }
                            }
                        ],
                        color: ["#e9e8ef"],
                        series: [
                            {
                            name: "Line 1",
                            type: "pie",
                            clockWise: true,
                            radius: ["40%", "60%"], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
                            center: ["30%", "50%"], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
                            itemStyle: {
                                normal: {
                                label: {
                                    show: true
                                },
                                labelLine: {
                                    show: true
                                }
                                }
                            },
                            hoverAnimation: true,
                            data: [
                                {
                                value: value1,
                                name: "供给面积" + value1.toFixed(2) + "%",
                                itemStyle: {
                                    normal: {
                                    color: {
                                        // 完成的圆环的颜色
                                        colorStops: [
                                        {
                                            offset: 0,
                                            color: "#779ae9" // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: "#87b4f1" // 100% 处的颜色
                                        }
                                        ]
                                    },
                                    label: {
                                        show: true,
                                        textStyle: {
                                        fontWeight: "normal",
                                        color: "#999",
                                        fontSize: "20"
                                        }
                                    },
                                    labelLine: {
                                        show: true
                                    },
                                    barBorderRadius: [30, 30, 0, 0]
                                    }
                                }
                                },
                                {
                                value: 100 - value1,
                                labelLine: {
                                    show: false
                                }
                                }
                            ]
                            },
                            {
                            name: "Line 2",
                            type: "pie",
                            clockWise: true,
                            radius: ["40%", "60%"], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
                            center: ["70%", "50%"], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
                            itemStyle: {
                                normal: {
                                label: {
                                    show: true
                                },
                                labelLine: {
                                    show: true
                                }
                                }
                            },
                            hoverAnimation: true,
                            data: [
                                {
                                value: value2,
                                name: "需求面积" + value2.toFixed(2) + "%",
                                itemStyle: {
                                    normal: {
                                    color: {
                                        // 完成的圆环的颜色
                                        colorStops: [
                                        {
                                            offset: 0,
                                            color: "#ffbe6e" // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: "#ffa060" // 100% 处的颜色
                                        }
                                        ]
                                    },
                                    label: {
                                        show: true,
                                        textStyle: {
                                        fontWeight: "normal",
                                        color: "#666",
                                        fontSize: "20"
                                        }
                                    },
                                    labelLine: {
                                        show: true
                                    }
                                    }
                                }
                                },
                                {
                                value: 100 - value2,
                                labelLine: {
                                    show: false
                                }
                                }
                            ]
                            }
                        ]
                        });
                    }

                    type(value2, value1);
                    } else {
                    this.$message({
                        message: "暂时没有数据",
                        type: "warning"
                    });
                    }
                } else {
                    this.$message.error(res.msg); //失败
                    return;
                }
                });

                // typeChart.setOption(this.typeOption);
            });
        },
        useDrawLine(params) {
            this.$nextTick(() => {
                let useChart = echarts.init(document.getElementById("useChart"));
                // 绘制图表
                this.$post(
                `/epf-monitor/monitor/moniSellPurchAnalyse/queryClassUseCompare`,
                params
                ).then(res => {
                console.log(res);
                if (res.code == "0") {
                    var xData = [];
                    var gjTotalArea = [];
                    var xqTotalArea = [];
                    for (var key in res.list) {
                    if (
                        (!res.list[key].cantonProvinceName &&
                        !res.list[key].cantonCityName &&
                        !res.list[key].cantonAreaName) ||
                        (res.list[key].cantonProvinceName == "null" &&
                        res.list[key].cantonCityName == "null" &&
                        res.list[key].cantonAreaName == "null")
                    ) {
                        res.list[key].cantonProvinceName = "全国";
                        res.list[key].cantonCityName = "";
                        res.list[key].cantonAreaName = "";
                    } else if (
                        (!res.list[key].cantonCityName &&
                        !res.list[key].cantonAreaName) ||
                        (res.list[key].cantonCityName == "null" &&
                        res.list[key].cantonAreaName == "null")
                    ) {
                        res.list[key].cantonCityName = "全部";
                        res.list[key].cantonAreaName = "";
                    } else if (
                        !res.list[key].cantonAreaName ||
                        res.list[key].cantonAreaName == "null"
                    ) {
                        res.list[key].cantonAreaName = "全部";
                    }
                    if (
                        !res.list[key].circulationName ||
                        res.list[key].circulationName == "null"
                    ) {
                        res.list[key].circulationName = "全部";
                    }
                    if (!res.list[key].datebetw || res.list[key].datebetw == "null") {
                        res.list[key].datebetw = "全部";
                    }
                    //                if (!res.pager.results[key].landCharName||res.pager.results[key].landCharName == "null") {
                    //   res.pager.results[key].landCharName = "全部";
                    // }
                    }
                    this.useData = res.list;
                    if (this.useData && this.useData.length > 0) {
                    if (this.useParams.firstClassUseName) {
                        this.useData.forEach(item => {
                        xData.push(item.secondClassUseName);
                        });
                    } else {
                        this.useData.forEach(item => {
                        xData.push(item.firstClassUseName);
                        });
                    }
                    var xqMax = this.useData.reduce(function(a, b) {
                        return parseInt(b.xqTotalArea) > parseInt(a.xqTotalArea)
                        ? b
                        : a;
                    });
                    var gjMax = this.useData.reduce(function(a, b) {
                        return parseInt(b.gjTotalArea) > parseInt(a.gjTotalArea)
                        ? b
                        : a;
                    });

                    var yMax =
                        xqMax.xqTotalArea > gjMax.gjTotalArea
                        ? xqMax.xqTotalArea
                        : gjMax.gjTotalArea;

                    this.useData.forEach(item => {
                        gjTotalArea.push(item.gjTotalArea);
                    });
                    this.useData.forEach(item => {
                        xqTotalArea.push(item.xqTotalArea);
                    });

                    this.use(useChart, xData, yMax, gjTotalArea, xqTotalArea);
                    } else {
                    this.$message({
                        message: "暂时没有数据",
                        type: "warning"
                    });
                    }
                } else {
                    this.$message.error(res.msg); //失败
                    return;
                }
                });
            });
        },
        initUser() {
            window.addEventListener("resize", () => {
                let userChart = echarts.init(this.$refs.userChart);
                document.getElementById("cycleChart").style.width = 100 + "%";
                userChart.resize(); //直接加这句即可
            });
        },
        use(chart, x, y, gjTotalArea, xqTotalArea) {
            chart.setOption({
                color: ["#3398DB"],
                tooltip: {
                trigger: "axis",
                axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                }
                },
                legend: {
                left: "0%",
                top: "0%",
                data: ["供给面积", "需求面积"]
                },
                grid: {
                // left: "3%",
                // right: "4%",
                // bottom: "3%",
                // containLabel: true
                top: "50px",
                left: "100px",
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
                    data: gjTotalArea,
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
                    }
                },
                {
                    name: "需求面积",
                    type: "bar",
                    barWidth: "40px",
                    data: xqTotalArea,
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
                            color: "#ffbd6f" // 高处的颜色
                            },
                            {
                            offset: 1,
                            color: "#ff9f60" // 低处的颜色
                            }
                        ],
                        false
                        ),
                        barBorderRadius: [30, 30, 0, 0]
                    }
                    }
                }
                ]
            });
        },
        cycleDrawLine(params) {
            this.$nextTick(() => {
                let cycleChart = echarts.init(document.getElementById("cycleChart"));
                //  document.getElementById("cycleChart").style.width = 85 + "%";
                this.$get(
                `/epf-monitor/monitor/moniSellPurchAnalyse/queryPeriodComparePic`,
                params
                ).then(res => {
                console.log(res);
                this.cycleData = res.list;
                var xData = [];
                var gjTotalArea = [];
                var xqTotalArea = [];
                var yMax = "";
                var contentData = [];
                if (res.code == "0") {
                    if (this.cycleData.length > 0) {
                    this.cycleData.forEach(item => {
                        xData.push(item.datebetw);
                    });

                    var xqMax = this.useData.reduce(function(a, b) {
                        return parseInt(b.xqTotalArea) > parseInt(a.xqTotalArea)
                        ? b
                        : a;
                    });
                    var gjMax = this.useData.reduce(function(a, b) {
                        return parseInt(b.gjTotalArea) > parseInt(a.gjTotalArea)
                        ? b
                        : a;
                    });

                    var yMax =
                        xqMax.xqTotalArea > gjMax.gjTotalArea
                        ? xqMax.xqTotalArea
                        : gjMax.gjTotalArea;


                    this.cycleData.forEach(item => {
                        gjTotalArea.push(item.gjTotalArea);
                    });
                    this.cycleData.forEach(item => {
                        xqTotalArea.push(item.xqTotalArea);
                    });
                    } else {
                    this.$message({
                        message: "暂时没有数据",
                        type: "warning"
                    });
                    }
                    // console.log(xData,yMax,gjTotalArea,xqTotalArea)
                    function cycle(x, y, gjTotalArea, xqTotalArea) {
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
                        left: "70px",
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
                        legend: {
                        left: "10%",
                        top: "3%",
                        data: ["供给面积", "需求面积"]
                        },
                        xAxis: {
                        data: x,
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
                            data: gjTotalArea
                        },
                        {
                            name: "需求面积",
                            type: "line",
                            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                            smooth: true, //平滑曲线显示
                            showAllSymbol: true, //显示所有图形。
                            symbol: "circle", //标记的图形为实心圆
                            symbolSize: 2, //标记的大小
                            color: "#ffa060",
                            itemStyle: {
                            //折线拐点标志的样式
                            normal: {
                                lineStyle: {
                                width: 4, // 0.1的线条是非常细的了
                                color: "#ffa060" //
                                }
                            }
                            },
                            lineStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                offset: 0,
                                color: "#ffbc6e"
                                },
                                {
                                offset: 1,
                                color: "#ffa060"
                                }
                            ])
                            },
                            data: xqTotalArea
                        }
                        ]
                    });
                    }

                    cycle(xData, yMax, gjTotalArea, xqTotalArea);
                } else {
                    this.$message.error(res.msg); //失败
                    return;
                }
                });

                // 绘制图表
                // cycleChart.setOption(this.cycleOption);
            });
        },
        initEchart() {
            window.addEventListener("resize", () => {
                this.chart = echarts.init(this.$refs.cycleChart);
                document.getElementById("cycleChart").style.width = 100 + "%";
                this.chart.resize(); //直接加这句即可
            });
        },

        areaDrawLine(params) {
            this.$nextTick(() => {
                let areaChart = echarts.init(document.getElementById("areaChart"));
                // 绘制图表
                this.$post(
                `/epf-monitor/monitor/moniSellPurchAnalyse/queryAreaCompare`,
                params
                ).then(res => {
                console.log(res);
                if (res.code == "0") {
                    var xData = [];
                    var gjTotalArea = [];
                    var xqTotalArea = [];

                        for (var key in res.list) {
                    // if (
                    //   (!res.list[key].cantonProvinceName &&
                    //     !res.list[key].cantonCityName &&
                    //     !res.list[key].cantonAreaName) ||
                    //   (res.list[key].cantonProvinceName == "null" &&
                    //     res.list[key].cantonCityName == "null" &&
                    //     res.list[key].cantonAreaName == "null")
                    // ) {
                    //   res.list[key].cantonProvinceName = "全国";
                    //   res.list[key].cantonCityName = "";
                    //   res.list[key].cantonAreaName = "";
                    // } else if (
                    //   (!res.list[key].cantonCityName &&
                    //     !res.list[key].cantonAreaName) ||
                    //   (res.list[key].cantonCityName == "null" &&
                    //     res.list[key].cantonAreaName == "null")
                    // ) {
                    //   res.list[key].cantonCityName = "全部";
                    //   res.list[key].cantonAreaName = "";
                    // } else if (
                    //   !res.list[key].cantonAreaName ||
                    //   res.list[key].cantonAreaName == "null"
                    // ) {
                    //   res.list[key].cantonAreaName = "全部";
                    // }
                    if (
                    (!res.list[key].firstClassUseName &&
                        !res.list[key].secondClassUseName) ||
                    (res.list[key].firstClassUseName == "null" &&
                        res.list[key].secondClassUseName == "null")
                    ) {
                    res.list[key].firstClassUseName = "全部";
                    res.list[key].secondClassUseName = "";
                    } else if (
                    !res.list[key].secondClassUseName ||
                    res.list[key].secondClassUseName == "null"
                    ) {
                    res.list[key].secondClassUseName = "全部";
                    }
                    if (
                    !res.list[key].circulationName ||
                    res.list[key].circulationName == "null"
                    ) {
                    res.list[key].circulationName = "全部";
                    }
                    if(     !res.list[key].datebetw ||
                    res.list[key].datebetw == "null"){
                    res.list[key].datebetw = "全部";
                    }
                    //                if (!res.pager.results[key].landCharName||res.pager.results[key].landCharName == "null") {
                    //   res.pager.results[key].landCharName = "全部";
                    // }
                }

                    this.areaData = res.list;
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
                    var yMax = this.areaData.reduce(function(a, b) {
                        return parseInt(b.xqTotalArea) > parseInt(a.xqTotalArea)
                        ? b
                        : a;
                    });
                    yMax = yMax.xqTotalArea;
                    this.areaData.forEach(item => {
                        gjTotalArea.push(item.gjTotalArea);
                    });
                    this.areaData.forEach(item => {
                        xqTotalArea.push(item.xqTotalArea);
                    });

                    this.area(areaChart, xData, yMax, gjTotalArea, xqTotalArea);
                    } else {
                    this.$message({
                        message: "暂时没有数据",
                        type: "warning"
                    });
                    }
                } else {
                    this.$message.error(res.msg); //失败
                    return;
                }
                });
            });
        },
        area(chart, x, y, gjTotalArea, xqTotalArea) {
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
                    data: gjTotalArea,
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
                    }
                },
                {
                    name: "需求面积",
                    type: "bar",
                    barWidth: "40px",
                    data: xqTotalArea,
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
                            color: "#ffbd6f" // 高处的颜色
                            },
                            {
                            offset: 1,
                            color: "#ff9f60" // 低处的颜色
                            }
                        ],
                        false
                        ),
                        barBorderRadius: [30, 30, 0, 0]
                    }
                    }
                }
                ]
            });
        },
        maxHandleClick(val) {
            if (val.name == this.currentTabs) {
                return;
            }
            this.currentTabs = val.name;
            if (this.activeTabs == "use") {
                // this.useDrawLine();
                // this.initUser();
                this.showUse();
            } else if (this.activeTabs == "cycle") {
                // this.cycleDrawLine();
                // this.getCycleList();
                // this.initEchart();
                this.showCycle()
            } else if (this.activeTabs == "area") {
                // this.areaDrawLine();
                this.showArea()
            } else if (this.activeTabs == "type") {
                // this.typeDrawLine(this.typeParams);
                this.showType()
            }
        },
        provinceSelect(dic, cantonCode, event, key) {
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
        //SB的新需求
        //类型
        showType(){
            setTimeout(()=>{
                if(sessionStorage.getItem("org_level") == 'org_level-003'){
                this.provinceCheck = true;
                //用途供给分析
                this.typeFilterData.cantonProvince = sessionStorage.getItem("jgProvinceCode")
                this.typeFilterData.cantonProvinceName = sessionStorage.getItem("jgProvince")
                this.provinceSelect('',this.typeFilterData.cantonProvinceName,'',this.typeFilterData)
                this.searchList('type')
                }else if(sessionStorage.getItem("org_level") == 'org_level-005'){
                this.provinceCheck = true;
                this.cityCheck = true;
                this.typeFilterData.cantonProvince = sessionStorage.getItem("jgProvinceCode")
                this.typeFilterData.cantonProvinceName = sessionStorage.getItem("jgProvince")
                this.provinceSelect('',this.typeFilterData.cantonProvinceName,'',this.typeFilterData)
                setTimeout(()=>{
                    this.typeFilterData.cantonCity = sessionStorage.getItem("jgCityCode")
                    this.typeFilterData.cantonCityName = sessionStorage.getItem("jgCity")
                    this.citySelect('',this.typeFilterData.cantonCityName,'',this.typeFilterData)
                    this.searchList('type')
                },800)
                }else if(sessionStorage.getItem("org_level") == 'org_level-004'){
                this.provinceCheck = true;
                this.cityCheck = true;
                this.AreaCheck = true;
                this.typeFilterData.cantonProvince = sessionStorage.getItem("jgProvinceCode")
                this.typeFilterData.cantonProvinceName = sessionStorage.getItem("jgProvince")
                // this.provinceSelect('',this.typeFilterData.cantonProvinceName,'',this.typeFilterData)
                // setTimeout(()=>{
                    this.typeFilterData.cantonCity = sessionStorage.getItem("jgCityCode")
                    this.typeFilterData.cantonCityName = sessionStorage.getItem("jgCity")
                    // this.citySelect('',this.typeFilterData.cantonCityName,'',this.typeFilterData)
                    // setTimeout(()=>{
                    this.typeFilterData.cantonArea = sessionStorage.getItem("jgAreaCode")
                    this.typeFilterData.cantonAreaName = sessionStorage.getItem("jgArea")
                    this.searchList('type')
                //   },800)
                // },800)
                }else{
                this.typeDrawLine(this.typeParams);
                }
            },500)
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
                this.initUser();
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
                this.initEchart();
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
                }
            },500)
        }
    },
    watch: {
        timeCycle: "monthOryearOrquarter"
    },
    mounted() {
        // this.useDrawLine();
        // this.cycleDrawLine();
        // this.areaDrawLine();
        this.showType()
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