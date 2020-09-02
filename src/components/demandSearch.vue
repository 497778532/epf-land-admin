<template>
  <div class="switchHeight_box">
    <div v-if="!closeSelectPlace">
      <el-row style="margin-bottom:20px;">
        <el-col :span="2">
          <span class="filter_title">行政区域：</span>
        </el-col>
        <el-col :span="8">
          <div style="width:155px;float:left;margin-right:9px;">
            <el-select
              v-model="filterData.cantonProvinceName"
              size="small"
              placeholder="全部"
              @change="provinceSelect(dictionary.administrative_regions,filterData.cantonProvinceName,$event)"
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
          <div style="width:155px;float:left;margin-right:9px;">
            <el-select
              v-model="filterData.cantonCityName"
              size="small"
              placeholder="全部"
              @change="citySelect(dictionary.cantonCity,filterData.cantonCityName,$event)"
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
          <div style="width:155px;float:left;">
            <el-select
              v-model="filterData.cantonAreaName"
              size="small"
              placeholder="全部"
              @change="areaSelect(dictionary.cantonArea,filterData.cantonAreaName,$event)"
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
        <el-col :span="1">
          <span class="filter_title">用途：</span>
        </el-col>
        <el-col :span="7">
          <div style="width:210px;float:left;margin-right:9px;">
            <el-select
              v-model="filterData.firstClassUseName"
              placeholder="全部"
              @change="firstClassUseSelect(dictionary,filterData.firstClassUseName,$event)"
            >
              <el-option
                v-for="(item,index) in dictionary.land_use"
                :ref="item.zhCn"
                :dictKey="item.dictKey"
                :id="item.id"
                :label="item.zhCn"
                :value="item.zhCn"
                :key="index"
              ></el-option>
            </el-select>
          </div>
          <div style="width:210px;float:left;">
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
          <span class="filter_title">{{typeName}}：</span>
        </el-col>
        <el-col :span="3" v-if="typeClose">
          <el-select
            size="small"
            v-model="filterData.purchasr"
            placeholder="全部"
            @change="purchasrSelect(dictionary.purchasr_demand,filterData.purchasr,$event)"
          >
            <el-option
              v-for="(item,index) in dictionary.purchasr_demand"
              :ref="item.zhCn"
              :id="item.id"
              :dictKey="item.dictKey"
              :label="item.zhCn"
              :value="item.zhCn"
              :key="index"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" v-if="!typeClose">
          <el-select
            size="small"
            v-model="filterData.landTrans"
            placeholder="全部"
            @change="circulationSelect(dictionary.flow_mode,filterData.landTrans,$event)"
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
      </el-row>
      <el-row style="margin-bottom:0;">
        <el-col :span="2">
          <span class="filter_title">发布时间：</span>
        </el-col>
        <el-col :span="5">
          <el-date-picker
            v-model="filterData.submitTime"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="截止时间"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-col>
        <el-col :span="2">
          <div class="button_bg" @click="searchList()">查询</div>
        </el-col>
        <el-col :span="2">
          <div class="button_default" @click="clearList()">重置</div>
        </el-col>
      </el-row>
    </div>
    <div v-if="closeSelectPlace">
      <el-row  style="margin-bottom:0px;">
        <el-col :span="2">
          <span class="filter_title">行政区域：</span>
        </el-col>
        <el-col :span="8">
          <div style="width:155px;float:left;margin-right:9px;">
            <el-select
              v-model="filterData.cantonProvinceName"
              size="small"
              placeholder="全部"
              @change="provinceSelect(dictionary.administrative_regions,filterData.cantonProvinceName,$event)"
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
          <div style="width:155px;float:left;margin-right:9px;">
            <el-select
              v-model="filterData.cantonCityName"
              size="small"
              placeholder="全部"
              @change="citySelect(dictionary.cantonCity,filterData.cantonCityName,$event)"
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
          <div style="width:155px;float:left;">
            <el-select
              v-model="filterData.cantonAreaName"
              size="small"
              placeholder="全部"
              @change="areaSelect(dictionary.cantonArea,filterData.cantonAreaName,$event)"
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
        <el-col :span="1">
          <span class="filter_title">用途：</span>
        </el-col>
        <el-col :span="5">
          <div style="width:155px;float:left;margin-right:9px;">
            <el-select
              v-model="filterData.firstClassUseName"
              placeholder="全部"
              @change="firstClassUseSelect(dictionary,filterData.firstClassUseName,$event)"
            >
              <el-option
                v-for="(item,index) in dictionary.land_use"
                :ref="item.zhCn"
                :dictKey="item.dictKey"
                :id="item.id"
                :label="item.zhCn"
                :value="item.zhCn"
                :key="index"
              ></el-option>
            </el-select>
          </div>
          <div style="width:155px;float:left;">
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
          <span class="filter_title">{{typeName}}：</span>
        </el-col>
        <el-col :span="2" v-if="typeClose">
          <el-select
            size="small"
            v-model="filterData.purchasr"
            placeholder="全部"
            @change="purchasrSelect(dictionary.purchasr_demand,filterData.purchasr,$event)"
          >
            <el-option
              v-for="(item,index) in dictionary.purchasr_demand"
              :ref="item.zhCn"
              :id="item.id"
              :dictKey="item.dictKey"
              :label="item.zhCn"
              :value="item.zhCn"
              :key="index"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" v-if="!typeClose">
          <el-select
            size="small"
            v-model="filterData.landTrans"
            placeholder="全部"
            @change="circulationSelect(dictionary.flow_mode,filterData.landTrans,$event)"
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
        <el-col :span="2">
          <div class="button_bg" @click="searchList()">查询</div>
        </el-col>
        <el-col :span="2">
          <div class="button_default" @click="clearList()">重置</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    typeName: "",
    activeTabs: true,
    closeSelectPlace: {
      type: Boolean
    },
    typeClose: {
      type: Boolean
    }
  },
  data() {
    return {
      closeSelect: this.closeSelectPlace,
      activeTabs: true,
      filterData: {
        cantonProvinceName: "",
        cantonProvince: "",
        cantonCityName: "",
        cantonCity: "",
        cantonAreaName: "",
        cantonArea: "",
        landChar: "", //土地性质
        importUseName: "", //用途
        firstClassUse: "",
        firstClassUseName: "", //一级土地用途
        secondClassUse: "",
        secondClassUseName: "", //二级土地用途
        beginArea: "", //起始面积
        overArea: "", //终止面积
        submitTime: "", //提交时间
        landTrans: "", //流转方式
        entrustAgency: "",
        entrustAgencyId: "",
        trustOrgId: "",
        goodsNo: "" //地块编号
      },
      dicRequest: [
        "flow_mode",
        "purchasr_demand",
        "land_nature",
        "land_use",
      ], //字典码请求
      dictionary: {
        //字典码结果
        flow_mode: "",
        purchasr_demand: "",
        land_nature: "",
        land_use: "",
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
    // @name: 行政区域
    // @description: 主要是getAreaByCodeOrParentId接口返回字段修改zhCn -> regionName，dictKey->regionCode
    // @author: gaojie
    // @chageTime:2020-3-2
    getProvinceData() {
      let that = this;
      that.$get(`/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000`,{}).then(res => {
        that.dictionary.administrative_regions = res.dictionariesList;
      })
    },
    searchlist() {
      this.$emit("filterInfo", this.filterData);
    },
    clearList() {
      for (let item in this.filterData) {
        this.filterData[item] = "";
      }
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
        `/epf-trade/dictionaries/getDictsByCodeOrParentId?code=land_use&parentId=${pId}`,
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
    purchasrSelect(dic, entrustAgency, event) {
      this.filterData.entrustAgency = this.$refs[
        entrustAgency
      ][0].$attrs.dictKey;
      this.filterData.entrustAgencyId = this.$refs[
        entrustAgency
      ][0].$attrs.dictId;
      this.filterData.trustOrgId = this.$refs[entrustAgency][0].$attrs.dictKey;
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
    //  purchasrSelect(dic,circulationName,event){
    //         this.filterData.purchasr = this.$refs[circulationName][0].$attrs.dictKey;
    //     },
    // submitTimeClick() {
    //   this.filterData.submitTime = this.submitTime;
    // },
  },
  created() {
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == "land_use") {
          this.$get(
            `/epf-trade/dictionaries/getDictsByCodeOrParentId?code=${item}`,
            { parentId: 0 }
          ).then(res => {
            resolve(res);
          });
        }else {
          this.$get(
            `/epf-trade/dictionaries/getDictEbyDictGroup/${item}`,
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
      this.dictionary.flow_mode.pop();
      this.dicFinsh = true;
      console.log("字典结果", this.dictionary);
    });
  }
};
</script>

<style scoped>
.oper {
  float: right;
  font-weight: normal;
}
.oper span {
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
.oper span:nth-child(2) {
  border: solid 1px #d3d4d6;
  color: #606266;
  background: #fff;
}


.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 105%;
  height: 40px;
  padding-right: 10px;
  text-align: right;
  line-height: 40px;
}

.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
<style>
.filter_wrap .el-input--small .el-input__inner {
  height: 40px;
}
.filter_wrap .el-row {
  margin-bottom: 10px;
}
.filter_wrap .distpicker-address-wrapper select {
  width: 148px;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  padding: 0 10px;
}

.filter_wrap .el-date-editor.el-input .el-input__icon {
  line-height: 40px;
  color: #8dc4f7;
}
.filter_wrap .el-input__prefix,
.el-input__suffix {
  width: 25px;
  font-size: 16px;
}
/* .el-table th,
.el-table tr {
  border:1px solid #ebeef5;
} */
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
.el-input__inner {
  height: 40px;
}
</style>