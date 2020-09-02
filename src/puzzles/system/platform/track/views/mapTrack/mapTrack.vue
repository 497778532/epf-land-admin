<template>
    <div id="mapTrack">
        <epf-container title="用地地图跟踪">
            <div class="epf_term_box">
                <el-row style="margin-bottom:10px;">
                    <el-col :span="2">
                        <span class="filter_title">地块编号：</span>
                    </el-col>
                    <el-col :span="3">
                        <el-input v-model="filterData.goodsNo" size="small" placeholder="请输入标题"></el-input>
                    </el-col>
                    <el-col :span="2">
                        <span class="filter_title">土地用途：</span>
                    </el-col>
                    <el-col :span="8">
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
                    </el-col>
                    <el-col :span="2">
                        <span class="filter_title">建设状态：</span>
                    </el-col>
                    <el-col :span="5">
                        <el-select
                            size="small"
                            v-model="filterData.statusName"
                            placeholder="全部"
                            @change="constrStatusSelect(dictionary.constr_status,filterData.statusName,$event)"
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
                    <el-col :span="3">
                    <span class="filter_title">交易方式 :</span>
                    </el-col>
                    <el-col :span="4">
                    <el-select
                        size="small"
                        class="filterCirculatemode"
                        v-model="filterData.transTypeName"
                        placeholder="全部"
                        @change="transTypeStatusSelect(dictionary.trans_type,filterData.transTypeName,$event)"
                    >
                        <el-option
                        v-for="(item,index) in dictionary.trans_type"
                        :ref="item.dictKey"
                        :id="item.id"
                        :dictKey="item.dictKey"
                        :label="item.zhCn"
                        :value="item.dictKey"
                        :key="index"
                        ></el-option>
                    </el-select>
                    </el-col>
                    <el-col :span="5" style="text-align:right">
                        <button class="epf_btn epf_btn_bg" @click="searchList()" 查 询</button>
                        <button class="epf_btn epf_btn_def" @click="resetFilter()"> 重 置</button>
                    </el-col>
                </el-row>
            </div>
            <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}"> 
                <el-row class="tab">
                    <el-col class="mapLeft">
                        <el-row v-for="(item,index) in provideData" :key="index">
                        <el-row class="target">
                            <el-col :span="2" class="circle">{{(index+1)+(pageNo-1)*pageSize}}</el-col>
                            <el-col :span="10" :offset="1" class="targetTitle">{{item.goodsNo}}</el-col>
                        </el-row>
                        <el-row>
                            {{item.location}}
                            <i class="el-icon-location zidingyi" @click="mapLinkage(item)"></i>
                        </el-row>
                        <el-row>
                            土地用途：
                            <span>{{item.firstClassUseName}}-{{item.secondClassUseName}}</span>
                        </el-row>
                        <el-row>
                            土地面积：
                            <span>{{item.area}}</span>m²
                        </el-row>
                        </el-row>
                        <div>
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :pager-count="pagecount"
                            :total="totalRecord"
                            :page-size="pageSize"
                        ></el-pagination>
                        </div>
                    </el-col>
                    <el-col class="mapRight">
                        <tianditu :Dlongitude="longitude" :Dlatitude="latitude" :LabelData="provideData"></tianditu>
                    </el-col>
                </el-row>
            </div>
        </epf-container>
    </div>
</template>

<script>
import tianditu from "@/components/tianditu/warningMap";
export default {
    data() {
        return {
            //根据权限锁定省市
            provinceCheck:false,
            cityCheck:false,
            AreaCheck:false,
            longitude: 116.40093, //经度
            latitude: 39.90313, //纬度
            pagecount: 5,

            params: {},
            //页码
            currentPage: 1,
            pageNo: 1, //页码
            pageSize: 5, //每页条数
            totalPage: 1,
            totalRecord: 1,
            provideData: [],
            loading: true,

            searchInfo: {},

            multipleSelection: [],

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
                transType: "",
                transTypeName: "",
                secondClassUseName: "", //二级土地用途
                status: "",
                statusName: "",
                goodsNo: "" //地块编号
            },
            dicRequest: [
                "trans_type",
                "land_use",
                "constr_status",
            ], //字典码请求
            dictionary: {
                //字典码结果
                trans_type: "",
                land_use: "",
                constr_status: "",
                administrative_regions: "",
                cantonCity: "",
                cantonArea: "",
                land_use_second: ""
            },
            dicNum: 0 //字典循环下标
        };
    },
    methods: {
        //获取列表
        getList(val) {
            this.loading = true;
            let params = this.params;
            params["page"] = this.pageNo;
            params["rows"] = this.pageSize;
            this.$post(
                `/epf-monitor/monitor/goodTrack/queryMapTrack`,
                params
            ).then(res => {
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
        //详情页跳转
        handleClickDetail(item) {
            let title = "预警详情";
            let routerPath = `/system/platform/preAlert/views/alertList/detail`;
            let itemObj = {url:routerPath,menuname:title}
            //将当前点击的选项添加到vuex中
            this.$router.push({path:routerPath, query: { id: item.id } } );
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
        },
        transTypeStatusSelect(dic, transTypeName, event) {
            this.filterData.transType = this.$refs[transTypeName][0].$attrs.dictKey;
        },
        constrStatusSelect(dic, statusName, event) {
            this.filterData.status = this.$refs[statusName][0].$attrs.dictKey;
        },
        resetFilter() {
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
            this.getList();
        },
        mapLinkage(item) {
            if(!item.coordinate){
                return false
            }
            this.longitude=item.coordinate.split(",")[0]
            this.latitude=item.coordinate.split(",")[1]
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
    components: {
        tianditu
    },
    mounted() {
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
    .zidingyi {
        font-size: 14px;
        margin-left: 20px;
        color: #4472d5;
        width: 30%;
        float: right;
        cursor: pointer;
    }
    #mapTrack .el-input__inner {
        height: 40px;
        line-height: 40px;
    }
    #mapTrack .tab {
        width: 100%;
        display: flex;
        margin-top: 30px;
    }
    #mapTrack .mapLeft {
        width: 30%;
        padding-left: 25px;
    }
    #mapTrack .mapLeft > .el-row {
        padding: 20px 0;
        border-bottom: 1px solid #e5e5e5;
    }
    #mapTrack .mapLeft > .el-row > .el-row {
        height: 25px;
        line-height: 25px;
        color: #999999;
        font-size: 12px;
    }
    #mapTrack .mapLeft > .el-row .circle {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #ff9f00;
        color: #fff;
        text-align: center;
        line-height: 20px;
        /* display: inline-block; */
        /* margin-top: 10px;
        margin-left: 9px; */
    }
    #mapTrack .mapLeft > .el-row .targetTitle {
        font-size: 14px;
        color: #333333;
        font-weight: 700;
    }

    #mapTrack .mapRight {
        width: 990px;
        margin-left: 2%;
        height: 700px;
    }


</style>