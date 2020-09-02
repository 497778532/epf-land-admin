<template>
    <epf-container title="区域交易类型趋势">
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
                    <span class="filter_title">交易状态：</span>
                </el-col>
                <el-col :span="3">
                    <el-select
                    size="small"
                    v-model="filterData.trans_statusName"
                    placeholder="全部"
                    @change="statusSelect(dictionary.flow_mode,filterData.trans_statusName,$event)"
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
                <el-col :span="4" style="text-align:right">
                    <button class="epf_btn epf_btn_bg" @click="searchList()"> 查 询</button>
                    <button class="epf_btn epf_btn_def" @click="resetFilter()"> 重 置</button>
                </el-col>
            </el-row>
        </div>
            <el-tabs
                v-model="activeName"
                @tab-click="handleClick"
                style="margin-top:25px;width:100%"
                >
                <el-tab-pane label="图形" name="graph" style="width:100%;height:100%; position: relative;">
                    <div class="toolsTitleBox_graph" style="background-color:#fff;border:0;">
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
                            <span class="derive">
                            <span class="button_export">          <a :href="href" style="color: #ffa000;">导出</a></span>
                            </span>
                        </div>
                        <!-- <div style="display:flex;" :style="{'height':switchHeight,'overflow':'hidden'}">
                            <div style="display:flex;flex:1.2;margin-left:20px;">对比区域：</div>
                            <div
                            style="display:flex;justify-content:flex-start;flex-wrap:wrap;flex:18;"
                            ref="changeBox"
                            >
                            <div style="display:flex;justify-content:flex-start;flex:15;">
                                <el-checkbox-group v-model="checkedStructures" v-if="lookProvinceList==true">
                                <el-checkbox
                                    v-for="(item,index) in dictionary.administrative_regions"
                                    :label="item"
                                    :value="item.dictkey"
                                    :key="index"
                                    style="margin-left:10px;"
                                    @change="handleCheckChange"
                                >{{item.zhCn}}</el-checkbox>
                                </el-checkbox-group>
                                <el-checkbox-group v-model="checkedStructures" v-if="lookCityList==true">
                                <el-checkbox
                                    v-for="(item,index) in dictionary.cantonCity"
                                    :label="item"
                                    :value="item.dictkey"
                                    :key="index"
                                    style="margin-left:10px;"
                                >{{item.zhCn}}</el-checkbox>
                                </el-checkbox-group>
                                <el-checkbox-group v-model="checkedStructures" v-if="lookAreaList==true">
                                <el-checkbox
                                    v-for="(item,index) in dictionary.cantonArea"
                                    :label="item"
                                    :value="item.dictkey"
                                    :key="index"
                                    style="margin-left:10px;"
                                >{{item.zhCn}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <div style="display:flex;flex:1;">
                                <span class="flexibleSwitch" @click="flexSwitch">
                                {{flexibleOpen?'收起':'展开'}}
                                <i
                                    :class="flexibleOpen?'el-icon-caret-top':'el-icon-caret-bottom'"
                                ></i>
                                </span>
                            </div>
                            </div>
                        </div>-->
                        </div>
                    </div>
                    <div id="districtChart" style="width:100%;height:550px;margin-bottom:75px;"></div>
                </el-tab-pane>
                <el-tab-pane label="列表" name="list" style="width:100%">
                    <div class="epf_fr_box">
                        <div class="toolsTitleBox_graph" style="background-color:#fff;border:0;">
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
                                <span class="derive">
                                <span class="button_export">          <a :href="href" style="color: #ffa000;">导出</a></span>
                                </span>
                            </div>
                            <div style="display:flex;" :style="{'height':switchHeight,'overflow':'hidden'}">
                                <div style="display:flex;flex:1.2;margin-left:20px;">对比区域：</div>
                                <div
                                style="display:flex;justify-content:flex-start;flex-wrap:wrap;flex:18;"
                                ref="changeBox"
                                >
                                <div style="display:flex;justify-content:flex-start;flex:15;">
                                    <el-checkbox-group v-model="checkedProvinces" v-if="lookProvinceList==true">
                                    <el-checkbox
                                        v-for="(item,index) in dictionary.administrative_regions"
                                        :label="item.id"
                                        :value="item.regionCode"
                                        :key="index"
                                        style="margin-left:10px;"
                                        @change="handleCheckChange"
                                    >{{item.zhCn}}</el-checkbox>
                                    </el-checkbox-group>
                                    <el-checkbox-group v-model="checkedCitys" v-if="lookCityList==true">
                                    <el-checkbox
                                        v-for="(item,index) in dictionary.cantonCity"
                                        :label="item.id"
                                        :value="item.regionCode"
                                        :key="index"
                                        style="margin-left:10px;"
                                    >{{item.zhCn}}</el-checkbox>
                                    </el-checkbox-group>
                                    <el-checkbox-group v-model="checkedAreas" v-if="lookAreaList==true">
                                    <el-checkbox
                                        v-for="(item,index) in dictionary.cantonArea"
                                        :label="item.id"
                                        :value="item.regionCode"
                                        :key="index"
                                        style="margin-left:10px;"
                                    >{{item.zhCn}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                                <div style="display:flex;flex:1;">
                                    <span class="flexibleSwitch" @click="flexSwitch">
                                    {{flexibleOpen?'收起':'展开'}}
                                    <i
                                        :class="flexibleOpen?'el-icon-caret-top':'el-icon-caret-bottom'"
                                    ></i>
                                    </span>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="epf_toolbar">
                            <span class="toolsTitle">数据列表</span>
                            <!-- <div class="oper">
                            <span>导出</span>
                            </div>-->
                        </div>
                        <!-- <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 205 +'px'}"> -->
                            <el-table
                                ref="multipleTable"
                                :data="dealListData"
                                v-loading="loading"
                                element-loading-text="数据加载中"
                                element-loading-background="rgba(255, 255, 255,0.95)"
                                style="width: 100%;min-height:80px;"
                                border
                                :height="boxHeight - 300"
                                v-if="lookProvinceList==true"
                                >
                                <el-table-column label="序号" min-width="90" align="center">
                                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                                </el-table-column>
                                <el-table-column label="用途" min-width="230">
                                <template slot-scope="scope">
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
                                <!-- <template slot-scope="scope">
                                    <span v-if="scope.row.status=='all'">全部</span>
                                    <span v-if="scope.row.status!='all'">{{scope.row.statusName}}</span>
                                </template> -->
                                    <span v-if="filterData.trans_statusName ==''">全部</span>
                                    <span v-if="filterData.trans_statusName !=''">{{filterData.trans_statusName}}</span>
                                </el-table-column>
                                <el-table-column label="交易类型" min-width="120">
                                    <span v-if="filterData.landTrans ==''">全部</span>
                                    <span v-if="filterData.landTrans !=''">{{filterData.landTrans}}</span>
                                </el-table-column>
                                <!-- <el-table-column label="区域" min-width="260">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.cantonProvince=='all'">全部</span>
                                    <span v-if="scope.row.cantonProvince!='all'">{{scope.row.cantonProvinceName}}</span>
                                    <span v-if="scope.row.cantonCity!='all'">/</span>
                                    <span v-if="scope.row.cantonCity!='all'">{{scope.row.cantonCityName}}</span>
                                    <span v-if="scope.row.cantonArea!='all'">/</span>
                                    <span v-if="scope.row.cantonArea!='all'">{{scope.row.cantonAreaName}}</span>
                                </template>
                                </el-table-column> -->
                                <el-table-column label="时间" min-width="400">
                                <!-- <template slot-scope="scope">
                                    <span>{{scope.row.startDate}}～{{scope.row.endDate}}</span>
                                </template> -->
                                <span v-if="submitTime == ''">全部</span>
                                <span v-if="submitTime != ''">{{submitTime[0]}}-{{submitTime[1]}}</span>
                                </el-table-column>
                                <el-table-column label="全部" header-align="center" v-if="isCheck">
                                <el-table-column prop="resulCount" label="宗数" min-width="90"></el-table-column>
                                <el-table-column prop="transPrice" label="金额（万元）" min-width="150"></el-table-column>
                                <el-table-column prop="areaSum" label="面积（万平方米）" min-width="150"></el-table-column>
                                </el-table-column>
                                <el-table-column
                                v-for="(item,index) in subListData"
                                :key="index"
                                :label="item.cantonProvinceName ? item.cantonProvinceName : (item.cantonCityName ? item.cantonCityName : item.cantonAreaName)"
                                header-align="center"
                                >
                                <el-table-column label="宗数" min-width="90">
                                    <span>{{item.resulCount}}</span>
                                </el-table-column>
                                <el-table-column label="金额（万元）" min-width="150">
                                    <span>{{item.transPrice}}</span>
                                </el-table-column>
                                <el-table-column label="面积（万平方米）" min-width="150">
                                    <span>{{item.areaSum}}</span>
                                </el-table-column>
                                </el-table-column>
                            </el-table>
                            <el-table
                                ref="multipleTable"
                                :data="dealListData"
                                v-loading="loading"
                                element-loading-text="数据加载中"
                                element-loading-background="rgba(255, 255, 255,0.95)"
                                style="width: 100%;min-height:80px;"
                                border
                                :height="boxHeight - 300"
                                v-if="lookCityList==true"
                                >
                                <el-table-column label="序号" min-width="90" align="center">
                                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                                </el-table-column>
                                <el-table-column label="用途" min-width="230">
                                <template slot-scope="scope">
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
                                <!-- <template slot-scope="scope">
                                    <span v-if="scope.row.status=='all'">全部</span>
                                    <span v-if="scope.row.status!='all'">{{scope.row.statusName}}</span>
                                </template> -->
                                <span v-if="filterData.trans_statusName ==''">全部</span>
                                <span v-if="filterData.trans_statusName !=''">{{filterData.trans_statusName}}</span>
                                </el-table-column>
                                <el-table-column label="交易类型" min-width="120">
                                    <span v-if="filterData.landTrans ==''">全部</span>
                                    <span v-if="filterData.landTrans !=''">{{filterData.landTrans}}</span>
                                </el-table-column>
                                <!-- <el-table-column label="区域" min-width="260">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.cantonProvince=='all'">全部</span>
                                    <span v-if="scope.row.cantonProvince!='all'">{{scope.row.cantonProvinceName}}</span>
                                    <span v-if="scope.row.cantonCity!='all'">/</span>
                                    <span v-if="scope.row.cantonCity!='all'">{{scope.row.cantonCityName}}</span>
                                    <span v-if="scope.row.cantonArea!='all'">/</span>
                                    <span v-if="scope.row.cantonArea!='all'">{{scope.row.cantonAreaName}}</span>
                                </template>
                                </el-table-column> -->
                                <el-table-column label="时间" min-width="400">
                                <!-- <template slot-scope="scope">
                                    <span>{{scope.row.startDate}}～{{scope.row.endDate}}</span>
                                </template> -->
                                <span v-if="submitTime == ''">全部</span>
                                <span v-if="submitTime != ''">{{submitTime[0]}}-{{submitTime[1]}}</span>
                                </el-table-column>
                                <el-table-column :label="labelOne" header-align="center" v-if="isCheck">
                                <el-table-column prop="resulCount" label="宗数" min-width="90"></el-table-column>
                                <el-table-column prop="transPrice" label="金额（万元）" min-width="150"></el-table-column>
                                <el-table-column prop="areaSum" label="面积（万平方米）" min-width="150"></el-table-column>
                                </el-table-column>
                                <el-table-column
                                v-for="(item,index) in subListData"
                                :key="index"
                                :label="item.cantonProvinceName ? item.cantonProvinceName : (item.cantonCityName ? item.cantonCityName : item.cantonAreaName)"
                                header-align="center"
                                >
                                <el-table-column label="宗数" min-width="90">
                                    <span>{{item.resulCount}}</span>
                                </el-table-column>
                                <el-table-column label="金额（万元）" min-width="150">
                                    <span>{{item.transPrice}}</span>
                                </el-table-column>
                                <el-table-column label="面积（万平方米）" min-width="150">
                                    <span>{{item.areaSum}}</span>
                                </el-table-column>
                                </el-table-column>
                            </el-table>
                            <el-table
                                ref="multipleTable"
                                :data="dealListData"
                                v-loading="loading"
                                element-loading-text="数据加载中"
                                element-loading-background="rgba(255, 255, 255,0.95)"
                                style="width: 100%;min-height:80px;"
                                border
                                :height="boxHeight - 300"
                                v-if="lookAreaList==true"
                                >
                                <el-table-column label="序号" min-width="90" align="center">
                                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                                </el-table-column>
                                <el-table-column label="用途" min-width="230">
                                <template slot-scope="scope">
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
                                <!-- <template slot-scope="scope">
                                    <span v-if="scope.row.status=='all'">全部</span>
                                    <span v-if="scope.row.status!='all'">{{scope.row.statusName}}</span>
                                </template> -->
                                <span v-if="filterData.trans_statusName ==''">全部</span>
                                <span v-if="filterData.trans_statusName !=''">{{filterData.trans_statusName}}</span>
                                </el-table-column>
                                <el-table-column label="交易类型" min-width="120">
                                    <span v-if="filterData.landTrans ==''">全部</span>
                                    <span v-if="filterData.landTrans !=''">{{filterData.landTrans}}</span>
                                </el-table-column>
                                <!-- <el-table-column label="区域" min-width="260">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.cantonProvince=='all'">全部</span>
                                    <span v-if="scope.row.cantonProvince!='all'">{{scope.row.cantonProvinceName}}</span>
                                    <span v-if="scope.row.cantonCity!='all'">/</span>
                                    <span v-if="scope.row.cantonCity!='all'">{{scope.row.cantonCityName}}</span>
                                    <span v-if="scope.row.cantonArea!='all'">/</span>
                                    <span v-if="scope.row.cantonArea!='all'">{{scope.row.cantonAreaName}}</span>
                                </template>
                                </el-table-column> -->
                                <el-table-column label="时间" min-width="400">
                                <!-- <template slot-scope="scope">
                                    <span>{{scope.row.startDate}}～{{scope.row.endDate}}</span>
                                </template> -->
                                <span v-if="submitTime == ''">全部</span>
                                <span v-if="submitTime != ''">{{submitTime[0]}}-{{submitTime[1]}}</span>
                                </el-table-column>
                                <el-table-column :label="labelTwo" header-align="center" v-if="isCheck">
                                <el-table-column prop="resulCount" label="宗数" min-width="90"></el-table-column>
                                <el-table-column prop="transPrice" label="金额（万元）" min-width="150"></el-table-column>
                                <el-table-column prop="areaSum" label="面积（万平方米）" min-width="150"></el-table-column>
                                </el-table-column>
                                <el-table-column
                                v-for="(item,index) in subListData"
                                :key="index"
                                :label="item.cantonProvinceName ? item.cantonProvinceName : (item.cantonCityName ? item.cantonCityName : item.cantonAreaName)"
                                header-align="center"
                                >
                                <el-table-column label="宗数" min-width="90">
                                    <span>{{item.resulCount}}</span>
                                </el-table-column>
                                <el-table-column label="金额（万元）" min-width="150">
                                    <span>{{item.transPrice}}</span>
                                </el-table-column>
                                <el-table-column label="面积（万平方米）" min-width="150">
                                    <span>{{item.areaSum}}</span>
                                </el-table-column>
                                </el-table-column>
                            </el-table>
                            <!-- 分页控件 -->
                            <div class="epf_paging_fixe" style="text-align:right">
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
                        <!-- </div>-->
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
            labelOne: '',
            labelTwo: '',
            activeName: "graph",
            currentName: "graph",

            loading: true,

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

            //页码
            currentPage: 1,
            totalPage: 1,
            totalRecord: 1,
            pageNo: 1,
            pageSize: 5,

            //区域对比
            checkedProvinces: [""],
            checkedCitys: [""],
            checkedAreas: [""],

            selection: [],
            provinceNo: "",
            provinceNoData: "",
            newProvinceNoData: "",
            provinceNoDataList: [],
            newProvinceNoDataList: [],

            //展开收起
            switchHeight: 55 + "px",
            flexibleOpen: false,

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
                goodsNo: "",
                circulation: "",
                contrastType: "",

                transMode:"",//交易方式
            },
            paramsList: {
                cantonProvinces: "",
                cantonCitys: "",
                cantonAreas: "",
                landChar: "",
                firstClassUse: "",
                secondClassUse: "",
                noticeDateBegin: "",
                noticeDateEnd: "",
                analyze: "面积",
                status: "",
                goodsNo: "",
                circulation: "",
                contrastType: "",

                transMode:"",//交易方式
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
                circulation: "",
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
                    this.districtDrawLine();
                    }
                },
                {
                    text: "最近一个月",
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit("pick", [start, end]);
                    this.districtDrawLine();
                    }
                },
                {
                    text: "最近三个月",
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit("pick", [start, end]);
                    this.districtDrawLine();
                    }
                }
                ],
                onPick: dateRange => {
                if (!dateRange.maxDate) {
                    return;
                }
                this.dateVal = [dateRange.minDate, dateRange.maxDate];
                this.districtDrawLine();
                }
            },
            //项目交易结构分析--面积列表
            dealListData: [],
            subListData: [],

            dictObj: {
                dictKey: "",
                id: "",
                zhCn: "全部"
            },
            lookProvinceList: true,
            lookCityList: false,
            lookAreaList: false,
            isCheck: true,
            legendNameData: [],
            legendNameSelectedData: [],
            requestNoList: [],
            
            href:
                "/api/epf-monitor/statistics/trans/queryGroupByTimeOfCantonList?isExport=true",
        };
    },
    methods: {
        resetFilter() {
            this.labelOne = ""
            this.labelTwo = ""
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
                this.filterData.trans_statusName =  "已成交"; 
                this.filterData.trans_status = "trans_status-007";
            }
            // this.filterData.isExport = false;
            this.searchList()
        },
        handleCheckChange(val) {
            console.log(val);
            this.isCheck = !this.isCheck;
        },
        searchList() {
            this.params = this.filterData;
            this.paramsList = this.filterData;
            this.params["status"] = this.filterData.trans_status;
            this.paramsList["status"] = this.filterData.trans_status;
            if (this.submitTime) {
                this.params["noticeDateBegin"] = this.submitTime[0];
                this.params["noticeDateEnd"] = this.submitTime[1];
            }
            if (this.submitTime) {
                this.paramsList["noticeDateBegin"] = this.submitTime[0];
                this.paramsList["noticeDateEnd"] = this.submitTime[1];
            }

            if (this.filterData.cantonProvince == "") {
                this.lookProvinceList = true;
                this.lookCityList = false;
                this.lookAreaList = false;
                this.isCheck = true;
                this.checkedProvinces = [""];
            }
            if (
                this.filterData.cantonProvince != "" &&
                this.filterData.cantonCity == ""
            ) {
                this.lookProvinceList = false;
                this.lookCityList = true;
                this.lookAreaList = false;
                this.isCheck = true;
                this.checkedCitys = [""];
            }
            if (this.filterData.cantonCity != "") {
                this.lookProvinceList = false;
                this.lookCityList = false;
                this.lookAreaList = true;
                this.isCheck = true;
                this.checkedAreas = [""];
            }

            if (this.filterData.cantonProvince != "") {
                if (this.filterData.cantonCity != "") {
                if (this.filterData.cantonArea != "") {
                    this.checkedAreas = [this.filterData.cantonArea];
                }
                }
            }
            this.labelOne = this.filterData.cantonProvinceName
            this.labelTwo = this.filterData.cantonCityName
            if (this.activeName == "graph") {
                const that = this;
                that.districtDrawLine();
            } else if (this.activeName == "list") {
                const that = this;
                that.getList();
            }
        },
        handleClick(val) {
            if (val.name == this.currentName) {
                return;
            }
            this.currentName = val.name;
            if (this.activeName == "graph") {
                this.districtDrawLine();
            } else if (this.activeName == "list") {
                const that = this;
                // that.getList();
                that.searchList();
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

        flexSwitch() {
            this.flexibleOpen = !this.flexibleOpen;
            this.switchHeight = this.flexibleOpen
                ? (this.switchHeight = "auto")
                : (this.switchHeight = 55 + "px");
        },

        getList() {
            if (this.filterData.cantonProvince == "") {
                this.loading = true;
                let params = this.paramsList;
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
                var ARRAY, STRING;
                ARRAY = this.checkedProvinces;
                STRING = ARRAY.join(",");
                console.log(STRING);
                params["cantonProvinces"] = STRING;
                params["cantonCitys"] = "";
                params["cantonAreas"] = "";
                console.log("===params==",params)
                this.$get(
                `/epf-monitor/statistics/trans/queryGroupByTimeOfCantonList`,
                params
                ).then(res => {
                console.log(res);
                this.href = `api/epf-monitor/statistics/trans/queryGroupByTimeOfCantonList?isExport=true&cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&landChar=${this.params.landChar}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&noticeDateBegin=${this.params.noticeDateBegin}&noticeDateEnd=${this.params.noticeDateEnd}&analyze=${this.params.analyze}&status=${this.params.status}&goodsNo=${this.params.goodsNo}&circulation=${this.params.circulation}&contrastType=${this.params.contrastType}`;
                if (res.code == "0") {
                    let arr = [];
                    arr.splice(0, 1, res.result);

                    this.dealListData = arr;
                    console.log(this.dealListData);

                    for (var key in this.dealListData[0].sub) {
                    if (this.dealListData[0].sub[key].cantonProvinceName == "null") {
                        this.dealListData[0].sub[key].cantonProvinceName = "全部";
                    }
                    }
                    this.subListData = this.dealListData[0].sub;
                    this.subListData = this.subListData.filter(e => {
                    return e.cantonProvince !== "all";
                    });
                    console.log(this.subListData);
                    //   console.log(this.subListData);
                    // this.pageNo = res.pager.pageNo;
                    // this.pageSize = res.pager.pageSize;
                    // this.totalPage = res.pager.totalPage;
                    // this.totalRecord = res.pager.totalRecord;
                    this.loading = false;
                    // this.href = `/api/epf-monitor/statistics/trans/findTransMetaAnalysis?isExport=true&
                    // cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&landChar=${this.params.landChar}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&circulation=${this.params.circulation}&noticeDateBegin=${this.params.noticeDateBegin}&noticeDateEnd=${this.params.noticeDateEnd}&status=${this.params.status}&goodsNo=${this.params.goodsNo}`;
                } else {
                    this.loading = false;
                    this.$message.error(res.msg); //失败
                    return;
                }
                });
            } else {
                if (this.filterData.cantonCity == "") {
                this.loading = true;
                let params = this.paramsList;
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
                var ARRAY, STRING;
                ARRAY = this.checkedCitys;
                STRING = ARRAY.join(",");
                console.log(STRING);
                params["cantonProvinces"] = this.filterData.cantonProvince;
                params["cantonCitys"] = STRING;
                params["cantonAreas"] = "";
                

                this.$get(
                    `/epf-monitor/statistics/trans/queryGroupByTimeOfCantonList`,
                    params
                ).then(res => {
                    console.log(res);
                this.href = `api/epf-monitor/statistics/trans/queryGroupByTimeOfCantonList?isExport=true&cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&landChar=${this.params.landChar}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&noticeDateBegin=${this.params.noticeDateBegin}&noticeDateEnd=${this.params.noticeDateEnd}&analyze=${this.params.analyze}&status=${this.params.status}&goodsNo=${this.params.goodsNo}&circulation=${this.params.circulation}&contrastType=${this.params.contrastType}`;
                    if (res.code == "0") {
                    let arr = [];
                    arr.splice(0, 1, res.result);

                    this.dealListData = arr;
                    console.log(this.dealListData);
                    for (var key in this.dealListData[0].sub) {
                        if (this.dealListData[0].sub[key].cantonCityName == "null") {
                        this.dealListData[0].sub[key].cantonCityName = "全部";
                        }
                    }

                    this.subListData = this.dealListData[0].sub;
                    // console.log(this.subListData);
                    this.subListData = this.subListData.filter(e => {
                        return e.cantonCity !== "all";
                    });

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
                } else {
                if (this.filterData.cantonArea == "") {
                    this.loading = true;
                    let params = this.paramsList;
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
                    var ARRAY, STRING;
                    ARRAY = this.checkedAreas;
                    STRING = ARRAY.join(",");
                    console.log(STRING);
                    params["cantonProvinces"] = this.filterData.cantonProvince;
                    params["cantonCitys"] = this.filterData.cantonCity;
                    params["cantonAreas"] = STRING;
                

                    this.$get(
                    `/epf-monitor/statistics/trans/queryGroupByTimeOfCantonList`,
                    params
                    ).then(res => {
                    console.log(res);
                    this.href = `api/epf-monitor/statistics/trans/queryGroupByTimeOfCantonList?isExport=true&cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&landChar=${this.params.landChar}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&noticeDateBegin=${this.params.noticeDateBegin}&noticeDateEnd=${this.params.noticeDateEnd}&analyze=${this.params.analyze}&status=${this.params.status}&goodsNo=${this.params.goodsNo}&circulation=${this.params.circulation}&contrastType=${this.params.contrastType}`;
                    if (res.code == "0") {
                        let arr = [];
                        arr.splice(0, 1, res.result);

                        this.dealListData = arr;
                        console.log(this.dealListData);
                        for (var key in this.dealListData[0].sub) {
                        if (this.dealListData[0].sub[key].cantonAreaName == "null") {
                            this.dealListData[0].sub[key].cantonAreaName = "全部";
                        }
                        }

                        this.subListData = this.dealListData[0].sub;
                        this.subListData = this.subListData.filter(e => {
                        return e.cantonArea !== "all";
                        });

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
                } else {
                    this.loading = true;
                    let params = this.paramsList;
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
                    var ARRAY, STRING;
                    // this.checkedAreas = [this.filterData.cantonArea];
                    ARRAY = this.checkedAreas;
                    STRING = ARRAY.join(",");
                    console.log(STRING);
                    params["cantonProvinces"] = this.filterData.cantonProvince;
                    params["cantonCitys"] = this.filterData.cantonCity;
                    params["cantonAreas"] = STRING;

                    this.$get(
                    `/epf-monitor/statistics/trans/queryGroupByTimeOfCantonList`,
                    params
                    ).then(res => {
                    console.log(res);
                    this.href = `api/epf-monitor/statistics/trans/queryGroupByTimeOfCantonList?isExport=true&cantonProvince=${this.params.cantonProvince}&cantonCity=${this.params.cantonCity}&cantonArea=${this.params.cantonArea}&landChar=${this.params.landChar}&firstClassUse=${this.params.firstClassUse}&secondClassUse=${this.params.secondClassUse}&noticeDateBegin=${this.params.noticeDateBegin}&noticeDateEnd=${this.params.noticeDateEnd}&analyze=${this.params.analyze}&status=${this.params.status}&goodsNo=${this.params.goodsNo}&circulation=${this.params.circulation}&contrastType=${this.params.contrastType}`;
                
                    if (res.code == "0") {
                        let arr = [];
                        arr.splice(0, 1, res.result);

                        this.dealListData = arr;
                        console.log(this.dealListData);
                        for (var key in this.dealListData[0].sub) {
                        if (this.dealListData[0].sub[key].cantonAreaName == "null") {
                            this.dealListData[0].sub[key].cantonAreaName = "全部";
                        }
                        }

                        this.subListData = this.dealListData[0].sub;
                        this.subListData = this.subListData.filter(e => {
                        return e.cantonArea !== "all";
                        });
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
                }
                }
            }
        },
        async districtDrawLine() {
            setTimeout(() => {
                let districtChart = echarts.init(
                document.getElementById("districtChart")
                );
                document.getElementById("districtChart").style.width = 100 + "%";
                districtChart.resize(); //直接加这句即可
            }, 0);
            let districtChart = echarts.init(
                document.getElementById("districtChart")
            );
            districtChart.showLoading({ text: "正在加载数据，请耐心等待..." }); //增加等待提示
            var dataALLList = [];
            var allAmountData = [];
            var allAreaData = [];
            var allNumberData = [];
            if (this.filterData.cantonProvince == "") {
                var cantonProvinceList = [];
                var legendProvinceList = [];
                var cantonProvinceNoList = [];
                for (var key in this.dictionary.administrative_regions) {
                cantonProvinceList.push(
                    this.dictionary.administrative_regions[key].regionCode
                );
                legendProvinceList.push(
                    this.dictionary.administrative_regions[key].regionCode
                );
                cantonProvinceNoList.push(
                    this.dictionary.administrative_regions[key].id
                );
                }
                console.log(cantonProvinceList);
                console.log(cantonProvinceNoList);
                console.log(legendProvinceList);
                var legendObj = new Object();
                var arr = legendProvinceList;
                for (var x in arr) {
                legendObj[arr[x]] = false;
                }
                for (var item in legendObj) {
                if (item == "全部") {
                    // delete legendObj[item]
                    legendObj[item] = true;
                } else {
                    legendObj[item] = false;
                }
                }
                console.log(legendObj);
                this.legendNameData = cantonProvinceList;
                this.legendNameSelectedData = legendObj;
                this.requestNoList = cantonProvinceNoList;
                //请求数据
                for (var i = 0; i < this.requestNoList.length; i++) {
                const that = this;
                let params = this.params;
                params["contrastType"] = this.timeCycleName;
                params["status"] = this.filterData.trans_status;
                this.submitTime
                    ? (params["noticeDateBegin"] = this.submitTime[0])
                    : (params["noticeDateBegin"] = "");
                this.submitTime
                    ? (params["noticeDateEnd"] = this.submitTime[1])
                    : (params["noticeDateEnd"] = "");
                params["analyze"] = this.filterData.analyze;
                params["cantonProvince"] = this.requestNoList[i];
                params["cantonCity"] = "";
                params["cantonArea"] = "";
                let res = await this.$get(
                    `/epf-monitor/statistics/trans/queryGroupByTimeOfCanton`,
                    params
                );
                console.log(res);
                let chartData = res.result;
                console.log(chartData);
                var resMouthTimeData = []; //x轴时间--月名称数据
                var resSeasonTimeData = []; //x轴时间--季名称数据
                var resYearTimeData = []; //x轴时间--年名称数据
                for (var key in chartData) {
                    resMouthTimeData.push(chartData[key].yearMonth);
                    resSeasonTimeData.push(
                    chartData[key].year + "年第" + chartData[key].season + "季度"
                    );
                    resYearTimeData.push(chartData[key].year);
                }
                var resTimeData = [];
                if (this.timeCycleName == "MOUTH") {
                    resTimeData = resMouthTimeData;
                } else if (this.timeCycleName == "SEASON") {
                    resTimeData = resSeasonTimeData;
                } else if (this.timeCycleName == "YEAR") {
                    resTimeData = resYearTimeData;
                }
                console.log(resTimeData);
                var AmountData = []; //金额图表数据
                var AreaData = []; //面积图表数据
                var NumberData = []; //宗数图表数据
                var analyzeData = []; //分析类型图表数据
                for (var key in chartData) {
                    AmountData.push(chartData[key].transPrice);
                    AreaData.push(chartData[key].areaSum);
                    NumberData.push(chartData[key].resulCount);
                }
                console.log(AmountData);
                console.log(AreaData);
                console.log(NumberData);
                if (that.filterData.analyze == "金额") {
                    analyzeData = AmountData;
                } else if (that.filterData.analyze == "面积") {
                    analyzeData = AreaData;
                } else if (that.filterData.analyze == "宗数") {
                    analyzeData = NumberData;
                }
                dataALLList.push({
                    value: analyzeData,
                    name: this.legendNameData[i]
                });
                // dataALLList.push(analyzeData);
                allAmountData.push(AmountData);
                allAreaData.push(AreaData);
                allNumberData.push(NumberData);

                this.filterData.cantonProvince = "";
                }
            } else {
                if (this.filterData.cantonCity == "") {
                var cantonProvinceList = [];
                var legendProvinceList = [];
                var cantonProvinceNoList = [];
                for (var key in this.dictionary.cantonCity) {
                    cantonProvinceList.push(this.dictionary.cantonCity[key].zhCn);
                    legendProvinceList.push(this.dictionary.cantonCity[key].zhCn);
                    cantonProvinceNoList.push(this.dictionary.cantonCity[key].id);
                }
                console.log(cantonProvinceList);
                console.log(cantonProvinceNoList);
                console.log(legendProvinceList);
                var legendObj = new Object();
                var arr = legendProvinceList;
                for (var x in arr) {
                    legendObj[arr[x]] = false;
                }
                for (var item in legendObj) {
                    if (item == "全部") {
                    // delete legendObj[item]
                    legendObj[item] = true;
                    } else {
                    legendObj[item] = false;
                    }
                }
                console.log(legendObj);
                this.legendNameData = cantonProvinceList;
                this.legendNameSelectedData = legendObj;
                this.requestNoList = cantonProvinceNoList;
                console.log(this.legendNameData);
                console.log(this.legendNameSelectedData);
                console.log(this.requestNoList);
                //请求数据
                for (var i = 0; i < this.requestNoList.length; i++) {
                    const that = this;
                    let params = this.params;
                    params["contrastType"] = this.timeCycleName;
                    this.submitTime
                    ? (params["noticeDateBegin"] = this.submitTime[0])
                    : (params["noticeDateBegin"] = "");
                    this.submitTime
                    ? (params["noticeDateEnd"] = this.submitTime[1])
                    : (params["noticeDateEnd"] = "");
                    params["analyze"] = this.filterData.analyze;
                    params["cantonProvince"] = this.filterData.cantonProvince;
                    params["cantonCity"] = this.requestNoList[i];
                    params["cantonArea"] = "";
                    let res = await this.$get(
                    `/epf-monitor/statistics/trans/queryGroupByTimeOfCanton`,
                    params
                    );
                    console.log(res);
                    let chartData = res.result;
                    console.log(chartData);
                    var resMouthTimeData = []; //x轴时间--月名称数据
                    var resSeasonTimeData = []; //x轴时间--季名称数据
                    var resYearTimeData = []; //x轴时间--年名称数据
                    for (var key in chartData) {
                    resMouthTimeData.push(chartData[key].yearMonth);
                    resSeasonTimeData.push(
                        chartData[key].year + "年第" + chartData[key].season + "季度"
                    );
                    resYearTimeData.push(chartData[key].year);
                    }
                    var resTimeData = [];
                    if (this.timeCycleName == "MOUTH") {
                    resTimeData = resMouthTimeData;
                    } else if (this.timeCycleName == "SEASON") {
                    resTimeData = resSeasonTimeData;
                    } else if (this.timeCycleName == "YEAR") {
                    resTimeData = resYearTimeData;
                    }
                    console.log(resTimeData);
                    var AmountData = []; //金额图表数据
                    var AreaData = []; //面积图表数据
                    var NumberData = []; //宗数图表数据
                    var analyzeData = []; //分析类型图表数据
                    for (var key in chartData) {
                    AmountData.push(chartData[key].transPrice);
                    AreaData.push(chartData[key].areaSum);
                    NumberData.push(chartData[key].resulCount);
                    }
                    console.log(AmountData);
                    console.log(AreaData);
                    console.log(NumberData);
                    if (that.filterData.analyze == "金额") {
                    analyzeData = AmountData;
                    } else if (that.filterData.analyze == "面积") {
                    analyzeData = AreaData;
                    } else if (that.filterData.analyze == "宗数") {
                    analyzeData = NumberData;
                    }
                    dataALLList.push({
                    value: analyzeData,
                    name: this.legendNameData[i]
                    });
                    // dataALLList.push(analyzeData);
                    allAmountData.push(AmountData);
                    allAreaData.push(AreaData);
                    allNumberData.push(NumberData);

                    this.filterData.cantonCity = "";
                }
                } else {
                if (this.filterData.cantonArea == "") {
                    var cantonProvinceList = [];
                    var legendProvinceList = [];
                    var cantonProvinceNoList = [];
                    for (var key in this.dictionary.cantonArea) {
                    cantonProvinceList.push(this.dictionary.cantonArea[key].zhCn);
                    legendProvinceList.push(this.dictionary.cantonArea[key].zhCn);
                    cantonProvinceNoList.push(this.dictionary.cantonArea[key].id);
                    // cantonProvinceList.push({
                    //   zhCn:this.dictionary.cantonArea[key].zhCn,
                    //   dictkey:this.dictionary.cantonArea[key].dictkey
                    // });
                    }
                    console.log(cantonProvinceList);
                    console.log(cantonProvinceNoList);
                    console.log(legendProvinceList);
                    var legendObj = new Object();
                    var arr = legendProvinceList;
                    for (var x in arr) {
                    legendObj[arr[x]] = false;
                    }
                    for (var item in legendObj) {
                    if (item == "全部") {
                        // delete legendObj[item]
                        legendObj[item] = true;
                    } else {
                        legendObj[item] = false;
                    }
                    }
                    console.log(legendObj);
                    this.legendNameData = cantonProvinceList;
                    this.legendNameSelectedData = legendObj;
                    this.requestNoList = cantonProvinceNoList;
                    //请求数据
                    for (var i = 0; i < this.requestNoList.length; i++) {
                    const that = this;
                    let params = this.params;
                    params["contrastType"] = this.timeCycleName;
                    this.submitTime
                        ? (params["noticeDateBegin"] = this.submitTime[0])
                        : (params["noticeDateBegin"] = "");
                    this.submitTime
                        ? (params["noticeDateEnd"] = this.submitTime[1])
                        : (params["noticeDateEnd"] = "");
                    params["analyze"] = this.filterData.analyze;
                    params["cantonProvince"] = this.filterData.cantonProvince;
                    params["cantonCity"] = this.filterData.cantonCity;
                    params["cantonArea"] = this.requestNoList[i];
                    let res = await this.$get(
                        `/epf-monitor/statistics/trans/queryGroupByTimeOfCanton`,
                        params
                    );
                    console.log(res);
                    let chartData = res.result;
                    console.log(chartData);
                    var resMouthTimeData = []; //x轴时间--月名称数据
                    var resSeasonTimeData = []; //x轴时间--季名称数据
                    var resYearTimeData = []; //x轴时间--年名称数据
                    for (var key in chartData) {
                        resMouthTimeData.push(chartData[key].yearMonth);
                        resSeasonTimeData.push(
                        chartData[key].year + "年第" + chartData[key].season + "季度"
                        );
                        resYearTimeData.push(chartData[key].year);
                    }
                    var resTimeData = [];
                    if (this.timeCycleName == "MOUTH") {
                        resTimeData = resMouthTimeData;
                    } else if (this.timeCycleName == "SEASON") {
                        resTimeData = resSeasonTimeData;
                    } else if (this.timeCycleName == "YEAR") {
                        resTimeData = resYearTimeData;
                    }
                    console.log(resTimeData);
                    var AmountData = []; //金额图表数据
                    var AreaData = []; //面积图表数据
                    var NumberData = []; //宗数图表数据
                    var analyzeData = []; //分析类型图表数据
                    for (var key in chartData) {
                        AmountData.push(chartData[key].transPrice);
                        AreaData.push(chartData[key].areaSum);
                        NumberData.push(chartData[key].resulCount);
                    }
                    console.log(AmountData);
                    console.log(AreaData);
                    console.log(NumberData);
                    if (that.filterData.analyze == "金额") {
                        analyzeData = AmountData;
                    } else if (that.filterData.analyze == "面积") {
                        analyzeData = AreaData;
                    } else if (that.filterData.analyze == "宗数") {
                        analyzeData = NumberData;
                    }
                    dataALLList.push({
                        value: analyzeData,
                        name: this.legendNameData[i]
                    });
                    // dataALLList.push(analyzeData);
                    allAmountData.push(AmountData);
                    allAreaData.push(AreaData);
                    allNumberData.push(NumberData);

                    this.filterData.cantonArea = "";
                    }
                } else {
                    var cantonProvinceList = [];
                    var legendProvinceList = [];
                    var cantonProvinceNoList = [];
                    for (var key in this.dictionary.cantonArea) {
                    cantonProvinceList.push(this.dictionary.cantonArea[key].zhCn);
                    legendProvinceList.push(this.dictionary.cantonArea[key].zhCn);
                    cantonProvinceNoList.push(this.dictionary.cantonArea[key].id);
                    // cantonProvinceList.push({
                    //   zhCn:this.dictionary.cantonArea[key].zhCn,
                    //   dictkey:this.dictionary.cantonArea[key].dictkey
                    // });
                    }
                    console.log(cantonProvinceList);
                    console.log(cantonProvinceNoList);
                    console.log(legendProvinceList);
                    var legendObj = new Object();
                    var arr = legendProvinceList;
                    for (var x in arr) {
                    legendObj[arr[x]] = false;
                    }
                    for (var item in legendObj) {
                    if (item == this.filterData.cantonAreaName) {
                        // delete legendObj[item]
                        legendObj[item] = true;
                    } else {
                        legendObj[item] = false;
                    }
                    }
                    console.log(legendObj);
                    this.legendNameData = cantonProvinceList;
                    this.legendNameSelectedData = legendObj;
                    this.requestNoList = cantonProvinceNoList;
                    //请求数据

                    const that = this;
                    let params = this.params;
                    params["contrastType"] = this.timeCycleName;
                    this.submitTime
                    ? (params["noticeDateBegin"] = this.submitTime[0])
                    : (params["noticeDateBegin"] = "");
                    this.submitTime
                    ? (params["noticeDateEnd"] = this.submitTime[1])
                    : (params["noticeDateEnd"] = "");
                    params["analyze"] = this.filterData.analyze;
                    params["cantonProvince"] = this.filterData.cantonProvince;
                    params["cantonCity"] = this.filterData.cantonCity;
                    params["cantonArea"] = this.filterData.cantonArea;
                    let res = await this.$get(
                    `/epf-monitor/statistics/trans/queryGroupByTimeOfCanton`,
                    params
                    );
                    console.log(res);
                    let chartData = res.result;
                    console.log(chartData);
                    var resMouthTimeData = []; //x轴时间--月名称数据
                    var resSeasonTimeData = []; //x轴时间--季名称数据
                    var resYearTimeData = []; //x轴时间--年名称数据
                    for (var key in chartData) {
                    resMouthTimeData.push(chartData[key].yearMonth);
                    resSeasonTimeData.push(
                        chartData[key].year + "年第" + chartData[key].season + "季度"
                    );
                    resYearTimeData.push(chartData[key].year);
                    }
                    var resTimeData = [];
                    if (this.timeCycleName == "MOUTH") {
                    resTimeData = resMouthTimeData;
                    } else if (this.timeCycleName == "SEASON") {
                    resTimeData = resSeasonTimeData;
                    } else if (this.timeCycleName == "YEAR") {
                    resTimeData = resYearTimeData;
                    }
                    console.log(resTimeData);
                    var AmountData = []; //金额图表数据
                    var AreaData = []; //面积图表数据
                    var NumberData = []; //宗数图表数据
                    var analyzeData = []; //分析类型图表数据
                    for (var key in chartData) {
                    AmountData.push(chartData[key].transPrice);
                    AreaData.push(chartData[key].areaSum);
                    NumberData.push(chartData[key].resulCount);
                    }
                    console.log(AmountData);
                    console.log(AreaData);
                    console.log(NumberData);
                    if (that.filterData.analyze == "金额") {
                    analyzeData = AmountData;
                    } else if (that.filterData.analyze == "面积") {
                    analyzeData = AreaData;
                    } else if (that.filterData.analyze == "宗数") {
                    analyzeData = NumberData;
                    }
                    dataALLList.push({
                    value: analyzeData,
                    name: this.legendNameData[i]
                    });
                    // dataALLList.push(analyzeData);
                    allAmountData.push(AmountData);
                    allAreaData.push(AreaData);
                    allNumberData.push(NumberData);
                }
                }
            }
            console.log(this.legendNameData);
            console.log(this.requestNoList);
            console.log(dataALLList);
            console.log(allAmountData);
            console.log(allAreaData);
            console.log(allNumberData);
            var allAmountDataList = [];
            var allAreaDataList = [];
            var allNumberDataList = [];
            for (var i = 0; i < allAmountData.length; i++) {
                allAmountDataList = allAmountDataList.concat(allAmountData[i]);
            }
            for (var i = 0; i < allAreaData.length; i++) {
                allAreaDataList = allAreaDataList.concat(allAreaData[i]);
            }
            for (var i = 0; i < allNumberData.length; i++) {
                allNumberDataList = allNumberDataList.concat(allNumberData[i]);
            }
            console.log(allAmountDataList);
            console.log(allAreaDataList);
            console.log(allNumberDataList);
            console.log(resTimeData);
            var maxAllAmountData = Math.max.apply(Math, allAmountDataList);
            var maxAllAreaData = Math.max.apply(Math, allAreaDataList);
            var maxAllNumberData = Math.max.apply(Math, allNumberDataList);
            console.log(maxAllAmountData);
            console.log(maxAllAreaData);
            console.log(maxAllNumberData);
            var unitName = "";
            var maxData = "";
            if (this.filterData.analyze == "金额") {
                unitName = "单位：万元";
                maxData = maxAllAmountData;
            } else if (this.filterData.analyze == "面积") {
                unitName = "单位：万平方米";
                maxData = maxAllAreaData;
            } else if (this.filterData.analyze == "宗数") {
                unitName = "单位：宗";
                maxData = maxAllNumberData;
            }
            var series = [];
            for (var i = 0; i < dataALLList.length; i++) {
                series.push({
                name: dataALLList[i].name,
                type: "line",
                yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                smooth: true, //平滑曲线显示
                showAllSymbol: true, //显示所有图形。
                symbol: "circle", //标记的图形为实心圆
                symbolSize: 2, //标记的大小
                itemStyle: {
                    //折线拐点标志的样式
                    normal: {
                    lineStyle: {
                        width: 3 // 0.1的线条是非常细的了
                    }
                    }
                },
                data: dataALLList[i].value
                });
            }
            districtChart.hideLoading(); //关闭提示
            // 绘制图表
            districtChart.setOption({
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
                top: "25%",
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
                x: "center",
                top: "5%",
                data: this.legendNameData,
                selected: this.legendNameSelectedData
                },
                xAxis: {
                data: resTimeData,
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
                series: series
            });
        },
        initEchart() {
            window.addEventListener("resize", () => {
                let districtChart = echarts.init(
                document.getElementById("districtChart")
                );
                document.getElementById("districtChart").style.width = 100 + "%";
                districtChart.resize();
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
    mounted() {
        
        this.initEchart();

        setTimeout(()=>{
        if(sessionStorage.getItem("org_level") == 'org_level-003'){
            this.filterData.cantonProvince = sessionStorage.getItem("jgProvinceCode")
            this.filterData.cantonProvinceName = sessionStorage.getItem("jgProvince")
            this.provinceSelect('',this.filterData.cantonProvinceName,'')
            this.$nextTick(() => {
            setTimeout(() => {
                this.districtDrawLine();
            }, 1000);
            });
        }else if(sessionStorage.getItem("org_level") == 'org_level-005'){
            this.filterData.cantonProvince = sessionStorage.getItem("jgProvinceCode")
            this.filterData.cantonProvinceName = sessionStorage.getItem("jgProvince")
            this.provinceSelect('',this.filterData.cantonProvinceName,'')
            setTimeout(()=>{
            this.filterData.cantonCity = sessionStorage.getItem("jgCityCode")
            this.filterData.cantonCityName = sessionStorage.getItem("jgCity")
            this.citySelect('',this.filterData.cantonCityName,'')
            this.$nextTick(() => {
            setTimeout(() => {
                this.districtDrawLine();
                }, 1000);
            });
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
                this.$nextTick(() => {
                setTimeout(() => {
                    this.districtDrawLine();
                }, 1000);
                });
            //   },800)
            // },800)
        }
        },500)
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
            this.dictionary.administrative_regions.splice(35, 6);
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
    watch: {
        checkedProvinces: function(val) {
            this.checkedProvinces = val;
            console.log(this.checkedProvinces);
            if (this.checkedProvinces.indexOf("") > -1) {
                this.isCheck = true;
            } else {
                this.isCheck = false;
            }
            this.getList();
        },
        checkedCitys: function(val) {
            this.checkedCitys = val;
            console.log(this.checkedCitys);
            if (this.checkedCitys.indexOf("") > -1) {
                this.isCheck = true;
            } else {
                this.isCheck = false;
            }
            this.getList();
        },
        checkedAreas: function(val) {
            this.checkedAreas = val;
            console.log(this.checkedAreas);
            if (this.checkedAreas.indexOf("") > -1) {
                this.isCheck = true;
            } else {
                this.isCheck = false;
            }
            this.getList();
        },
        timeCycleName(val) {
            if (this.activeName == "graph") {
                this.districtDrawLine();
            } else if (this.activeName == "list") {
                this.getList();
            }
        },
        submitTime(val) {
            if (this.activeName == "graph") {
                this.districtDrawLine();
            } else if (this.activeName == "list") {
                this.getList();
            }
        },
        activeName: {
            immediate: true,
            deep: true,
            handler(val) {
                if (val == "graph") {
                this.districtDrawLine();
                } else if (val == "list") {
                this.getList();
                }
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