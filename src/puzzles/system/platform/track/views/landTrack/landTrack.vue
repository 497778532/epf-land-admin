<template>
    <epf-container title="用地后续跟踪">
        <div class="epf_term_box">
            <el-row style="margin-bottom:10px;">
                <el-col :span="2">
                    <span class="filter_title">地块编号：</span>
                </el-col>
                <el-col :span="3">
                    <el-input v-model="filterData.goodsId" size="small" placeholder="请输入地块编号"></el-input>
                </el-col>
                <el-col :span="2">
                    <span class="filter_title">土地用途：</span>
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
                <el-col :span="2">
                    <span class="filter_title">建设状态：</span>
                </el-col>
                <el-col :span="2">
                    <el-select
                    size="small"
                    v-model="filterData.constrStatusName"
                    placeholder="全部"
                    @change="constrStatusSelect(dictionary.constr_status,filterData.constrStatusName,$event)"
                    >
                    <el-option
                        v-for="(item,index) in dictionary.constr_status"
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
                    <span class="filter_title">交易方式：</span>
                </el-col>
                <el-col :span="3">
                    <el-select
                    size="small"
                    v-model="filterData.transTypeName"
                    placeholder="全部"
                    @change="transTypeStatusSelect(dictionary.trans_type,filterData.transTypeName,$event)"
                    >
                    <el-option
                        v-for="(item,index) in dictionary.trans_type"
                        :ref="item.zhCn"
                        :id="item.id"
                        :dictKey="item.dictKey"
                        :label="item.zhCn"
                        :value="item.zhCn"
                        :key="index"
                    ></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:0;">
                <el-col :span="2">
                    <span class="filter_title">所在区域：</span>
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
                    <span class="filter_title">成交时间：</span>
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
                <el-col :span="5" style="text-align:right">
                    <button class="epf_btn epf_btn_bg" @click="searchList()" 查 询</button>
                    <button class="epf_btn epf_btn_def" @click="resetFilter()"> 重 置</button>
                </el-col>
            </el-row>
        </div>
        <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}"> 
            <div class="epf_toolbar">
                <span class="toolsTitle">数据列表</span>
                <div class="oper">
                    <a href="javascript:;" @click="followUpTrackAdd" class="addBox">添加</a>
                    <a @click="exportExcel" id="export">导出</a>
                </div>
            </div>
            <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 205 +'px'}">
                <el-table
                    ref="multipleTable"
                    :data="followData"
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:80px;"
                    border
                    :height="boxHeight - 260"
                    tooltip-effect="dark"
                    >
                    <el-table-column type="selection" min-width="75"></el-table-column>
                    <el-table-column label="序号" min-width="100" align="center">
                    <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                    </el-table-column>
                    <el-table-column prop="goodsNo" label="地块编号" min-width="170"></el-table-column>
                    <el-table-column label="土地用途" min-width="230">
                    <template slot-scope="scope">
                        <span>{{scope.row.firstClassUseName}}/{{scope.row.secondClassUseName}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column prop="constrStatusName" label="建设状态" min-width="100"></el-table-column>
                    <el-table-column label="所在区域" min-width="250">
                    <template slot-scope="scope">
                        <span>{{scope.row.cantonProvinceName}}/{{scope.row.cantonCityName}}/{{scope.row.cantonAreaName}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column prop="transTypeName" label="交易方式" min-width="200"></el-table-column>
                    <el-table-column prop="endTransTime" label="成交时间" min-width="250"></el-table-column>
                    <el-table-column label="操作" min-width="300" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleClickDetail(scope.row)">详情</el-button>
                        <el-button type="text" size="small" @click="handleClickEditor(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="handleClickMap(scope.row)">地图跟踪</el-button>
                        <el-button type="text" size="small" @click="handleClickDeleted(scope.row)">
                        <span style="color:#999;">删除</span>
                        </el-button>
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
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import qs from "qs";
export default {
    data() {
        return {
            //根据权限锁定省市
            provinceCheck:false,
            cityCheck:false,
            AreaCheck:false,
            //用地后续跟踪列表
            followData: [],
            loading: true,

            params: {
                cantonProvince: "",
                cantonCity: "",
                cantonArea: "",
                startTime: "",
                endTime: "",
                firstClassUse: "",
                secondClassUse: "",
                goodsId: "",
                constrStatus: "", //建设状态
                transType: "" //交易方式
            },

            //页码
            currentPage: 1,
            pageNo: 1, //页码
            pageSize: 5, //每页条数
            totalPage: 1,
            totalRecord: 1,

            filterData: {
                cantonProvinceName: "", //省
                cantonProvince: "",
                cantonCityName: "", //市
                cantonCity: "",
                cantonAreaName: "", //区
                cantonArea: "",
                firstClassUseName: "", //一级土地用途
                firstClassUse: "",
                secondClassUseName: "", //二级土地用途
                secondClassUse: "",
                constr_status: "",
                constrStatusName: "",
                dealTime: "", //交易时间
                trans_type: "",
                transTypeName: "",
                goodsId: "" //地块编号
            },
            dealTime: "",
            dicRequest: [
                "flow_mode",
                "trans_type",
                "constr_status",
                "trans_status",
                "land_nature",
                "land_use",
            ],
            //字典码请求
            dictionary: {
                //字典码结果
                flow_mode: "",
                trans_type: "",
                constr_status: "",
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
            }
        };
    },
    methods: {
        ...mapMutations("track", ["to_detail"]),
        //获取列表
        getList(val) {
            this.loading = true;
            let params = this.params;
            params["page"] = this.pageNo;
            params["rows"] = this.pageSize;
            this.$post(`/epf-monitor/monitor/goodTrack/list`, params).then(
                res => {
                console.log(res);
                if (res.code == "0") {
                    for (var key in res.pager.results) {
                    if (res.pager.results[key].constrStatusName == "null") {
                        res.pager.results[key].constrStatusName = "未开工";
                    }
                    }
                    this.followData = res.pager.results;
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
        exportExcel() {
            function exportList(form) {
                return axios({
                // 用axios发送post请求
                method: "post",
                url: "/api/epf-monitor/monitor/goodTrack/downTrackGoods", // 请求地址
                data: form, // 参数
                responseType: "blob", // 表明返回服务器返回的数据类型
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
                });
            }

            this.params = this.filterData;
            this.params["constrStatus"] = this.filterData.constr_status;
            this.params["transType"] = this.filterData.trans_type;
            if (this.dealTime) {
                this.params["startTime"] = this.dealTime[0];
                this.params["endTime"] = this.dealTime[1];
            }
            let params = qs.stringify(this.params);

            exportList(params).then(res => {
                // 处理返回的文件流
                const blob = new Blob([res]);
                const fileName = "用地后续跟踪列表.xlsx";
                const elink = document.createElement("a");
                elink.download = fileName;
                elink.href = URL.createObjectURL(blob);
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink);
            });
        },

        //新增用地后续跟踪
        followUpTrackAdd() {
            let title = "新增用地后续跟踪";
            let routerPath = `/system/platform/track/views/landTrack/add`;
            let itemObj = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath} );
            this.$store.commit("ADD_TAB", itemObj)
        },
        //用地后续跟踪详情
        handleClickDetail(item) {
            this.to_detail(item);
            let title = "用地后续跟踪详情";
            let routerPath = `/system/platform/track/views/landTrack/detail`;
            let itemObj = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath, query: { id: item.id } } );
            this.$store.commit("ADD_TAB", itemObj)
        },
        //修改用地后续跟踪
        handleClickEditor(item) {
            this.to_detail(item);
            let title = "修改用地后续跟踪";
            let routerPath = `/system/platform/track/views/landTrack/edit`;
            let itemObj = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath, query: { id: item.id } } );
            this.$store.commit("ADD_TAB", itemObj)
        },
        //用地地图跟踪
        handleClickMap() {
            this.$router.push("../mapTrack");
        },
        //删除
        handleClickDeleted(row) {
            console.log(row);
            this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                let params = { ids: row.id };
                let res = await this.$post(
                    `/epf-monitor/monitor/goodTrack/deleteByContarctIds`,
                    params
                );
                console.log(res);
                if (res.code == 0) {
                    this.getList();
                }
                })
                .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
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
        },
        searchList() {
            this.params = this.filterData;
            this.params["constrStatus"] = this.filterData.constr_status;
            this.params["transType"] = this.filterData.trans_type;
            if (this.dealTime) {
                this.params["startTime"] = this.dealTime[0];
                this.params["endTime"] = this.dealTime[1];
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
               // `/epf-monitor/dictionaries/getDictsByCodeOrParentId?code=administrative_regions&parentId=${pId}`,
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
               // `/epf-monitor/dictionaries/getDictsByCodeOrParentId?code=administrative_regions&parentId=${pId}`,
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
        constrStatusSelect(dic, constrStatusName, event) {
            this.filterData.constr_status = this.$refs[
                constrStatusName
            ][0].$attrs.dictKey;
        },
        transTypeStatusSelect(dic, transTypeName, event) {
            this.filterData.trans_type = this.$refs[transTypeName][0].$attrs.dictKey;
        }
    },
    created() {
        this.boxHeight = window.innerHeight - 250;
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
        this.$bus.$on("followUpTrackSave", val => {
            this.getList();
            });
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
    computed: {
        ...mapState("track", ["trackDetail"])
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
    .oper a.addBox {
        display: inline-block;
        width: 80px;
        height: 32px;
        background-color: #fff;
        border: 1px solid #ffa000;
        border-radius: 2px;
        margin-right: 25px;
        text-align: center;
        line-height: 36px;
        color: #ffa000;
        font-size: 14px;
        cursor: pointer;
    }
</style>