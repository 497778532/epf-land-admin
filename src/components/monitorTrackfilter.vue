<template>
  <div
    class="switchHeight_box"
    :style="{
      overflow: !flexibleOpen ? 'hidden' : '',
      height: !flexibleOpen ? '73px' : 'auto'
    }"
  >
    <el-form :model="filterData" label-width="115px">
      <el-row type="flex" justify="start" class="ant-row ant-row-start">
        <el-col
          class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
          style="padding-left: 8px; padding-right: 8px;"
          v-if="demandSelect == true"
        >
          <el-form-item label="地块编号：">
            <el-input
              v-model="filterData.goodsNo"
              size="small"
              placeholder="请输入标题"
            ></el-input
          ></el-form-item>
        </el-col>
        <!-- {{flexibleOpen&&demandSelect}} -->
        <el-col
          class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-10 ant-col-xxl-10"
          style="padding-left: 8px; padding-right: 8px;"
          :class="(!flexibleOpen&&demandSelect)?'hidden-md-and-down':''"
        >
          <!-- v-if="flexibleOpen==false&&demandSelect==false" -->
          <!-- :class="!flexibleOpen?'hidden-md-and-down':''" -->
          <!-- :class="!(flexibleOpen==false&&demandSelect==false)?'hidden-md16-and-down':''" -->
          <!-- :class="!flexibleOpen&&demandSelect?'hidden-md-and-down':''" -->
          <el-form-item label="土地用途：">
            <div style="display: flex;justify-items: flex-start;">
              <el-select
                size="small"
                v-model="filterData.firstClassUseName"
                placeholder="全部"
                style="min-width:190px;margin-right:9px;"
                @change="
                  firstClassUseSelect(
                    dictionary,
                    filterData.firstClassUseName,
                    $event
                  )
                "
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
                size="small"
                v-model="filterData.secondClassUseName"
                placeholder="全部"
                style="min-width:190px;"
                @change="
                  secondClassUseSelect(
                    dictionary,
                    filterData.secondClassUseName,
                    $event
                  )
                "
              >
                <el-option
                  v-for="(item, index) in dictionary.land_use_second"
                  :ref="item.zhCn"
                  :label="item.zhCn"
                  :dictKey="item.dictKey"
                  :value="item.zhCn"
                  :key="index"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <!-- demandSelect == true|| -->
        <el-col
          class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
          style="padding-left: 8px; padding-right: 8px;"
          v-if="flexibleOpen&&demandSelect == true"
        >
          <!-- :class="!flexibleOpen?'hidden-md16-and-down':''" -->
          <el-form-item label="建设状态：">
            <el-select
              size="small"
              class="filterCirculatemode"
              v-model="filterData.statusName"
              placeholder="全部"
              @change="
                constrStatusSelect(
                  dictionary.constr_status,
                  filterData.statusName,
                  $event
                )
              "
            >
              <el-option
                v-for="(item, index) in dictionary.constr_status"
                :ref="item.zhCn"
                :id="item.id"
                :dictKey="item.dictKey"
                :label="item.zhCn"
                :value="item.zhCn"
                :key="index"
              ></el-option> </el-select
          ></el-form-item>
        </el-col>
        <el-col
          class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
          style="padding-left: 8px; padding-right: 8px;"
          v-if="flexibleOpen"
         >
          <el-form-item label="交易方式：">
            <el-select
              size="small"
              class="filterCirculatemode"
              v-model="filterData.transTypeName"
              placeholder="全部"
              @change="
                transTypeStatusSelect(
                  dictionary.trans_type,
                  filterData.transTypeName,
                  $event
                )
              "
            >
              <el-option
                v-for="(item, index) in dictionary.trans_type"
                :ref="item.dictKey"
                :id="item.id"
                :dictKey="item.dictKey"
                :label="item.zhCn"
                :value="item.dictKey"
                :key="index"
              ></el-option> </el-select
          ></el-form-item>
        </el-col>
        <el-col
          class="ant-col ant-col-xs-18 ant-col-sm-18 ant-col-md-18 ant-col-lg-18 ant-col-xl-17 ant-col-xxl-12"
          style="padding-left: 8px; padding-right: 8px;"
          v-if="flexibleOpen"
         >
          <el-form-item label="行政区域：">
            <div style="display: flex;justify-items: flex-start;">
              <el-select
                v-model="filterData.cantonProvinceName"
                size="small"
                placeholder="全部"
                style="min-width:168px;margin-right:9px;"
                @change="
                  provinceSelect(
                    dictionary.administrative_regions,
                    filterData.cantonProvinceName,
                    $event
                  )
                "
                :disabled="provinceCheck"
              >
                <el-option
                  v-for="(item, index) in dictionary.administrative_regions"
                  :ref="item.regionName"
                  :id="item.id"
                  :regionCode="item.regionCode"
                  :label="item.regionName"
                  :value="item.regionName"
                  :key="index"
                ></el-option>
              </el-select>
              <el-select
                v-model="filterData.cantonCityName"
                size="small"
                placeholder="全部"
                style="min-width:168px;margin-right:9px;"
                @change="
                  citySelect(
                    dictionary.cantonCity,
                    filterData.cantonCityName,
                    $event
                  )
                "
                :disabled="cityCheck"
              >
                <el-option
                  v-for="(item, index) in dictionary.cantonCity"
                  :ref="item.regionName"
                  :id="item.id"
                  :regionCode="item.regionCode"
                  :label="item.regionName"
                  :value="item.regionName"
                  :key="index"
                ></el-option>
              </el-select>
              <el-select
                v-model="filterData.cantonAreaName"
                size="small"
                placeholder="全部"
                style="min-width:168px;"
                @change="
                  areaSelect(
                    dictionary.cantonArea,
                    filterData.cantonAreaName,
                    $event
                  )
                "
                :disabled="AreaCheck"
              >
                <el-option
                  v-for="(item, index) in dictionary.cantonArea"
                  :ref="item.regionName"
                  :id="item.id"
                  :regionCode="item.regionCode"
                  :label="item.regionName"
                  :value="item.regionName"
                  :key="index"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <el-col
          class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-6 ant-col-xxl-6"
          style="padding-left: 8px; padding-right: 8px;"
         >
          <el-form-item label-width="0">
            <div class="button_bg" @click="searchList">查询</div>
            <div class="button_default" @click="resetFilter">重置</div>
            <span class="flexibleSwitch" @click="flexibleOpen = !flexibleOpen">
              {{ flexibleOpen ? "收起" : "展开" }}
              <i
                :class="
                  flexibleOpen ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
                "
              ></i>
            </span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    demandSelect: {
      type: Boolean
    }
  },
  data() {
    return {
      switchHeight: 73,
      flexibleOpen: false,
      //根据权限锁定省市
      provinceCheck: false,
      cityCheck: false,
      AreaCheck: false,
      dicRequest: ["trans_type", "land_use", "constr_status"], //字典码请求
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
      dicNum: 0, //字典循环下标
      filterData: {
        cantonProvinceName: "",
        cantonProvince: "",
        cantonCityName: "",
        cantonCity: "",
        cantonAreaName: "",
        cantonArea: "",
        firstClassUseName: "", //一级土地用途
        firstClassUse: "",
        secondClassUseName: "", //二级土地用途
        secondClassUse: "",
        transTypeName: "",
        transType: "",
        status: "",
        statusName: "",
        goodsNo: "" //地块编号
      }
    };
  },
  created() {
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
    this.$get(
      `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000`,
      {}
    ).then(res => {
      this.dictionary.administrative_regions = res.dictionariesList;
    });

    if (sessionStorage.getItem("org_level") == "org_level-003") {
      this.provinceCheck = true;
      this.filterData.cantonProvince = sessionStorage.getItem("jgProvinceCode");
      this.filterData.cantonProvinceName = sessionStorage.getItem("jgProvince");
      this.provinceSelect("", this.filterData.cantonProvinceName, "");
    } else if (sessionStorage.getItem("org_level") == "org_level-005") {
      this.provinceCheck = true;
      this.cityCheck = true;
      this.filterData.cantonProvince = sessionStorage.getItem("jgProvinceCode");
      this.filterData.cantonProvinceName = sessionStorage.getItem("jgProvince");
      this.provinceSelect("", this.filterData.cantonProvinceName, "");
      setTimeout(() => {
        this.filterData.cantonCity = sessionStorage.getItem("jgCityCode");
        this.filterData.cantonCityName = sessionStorage.getItem("jgCity");
        this.citySelect("", this.filterData.cantonCityName, "");
      }, 800);
    } else if (sessionStorage.getItem("org_level") == "org_level-004") {
      this.provinceCheck = true;
      this.cityCheck = true;
      this.AreaCheck = true;
      this.filterData.cantonProvince = sessionStorage.getItem("jgProvinceCode");
      this.filterData.cantonProvinceName = sessionStorage.getItem("jgProvince");
      this.filterData.cantonCity = sessionStorage.getItem("jgCityCode");
      this.filterData.cantonCityName = sessionStorage.getItem("jgCity");
      this.filterData.cantonArea = sessionStorage.getItem("jgAreaCode");
      this.filterData.cantonAreaName = sessionStorage.getItem("jgArea");
    }
  },
  methods: {
    //字典选择
    provinceSelect(dic, cantonCode, event) {
      this.filterData.cantonAreaName = "";
      this.filterData.cantonArea = "";
      this.cantonArea = "";
      this.filterData.cantonCityName = "";
      this.filterData.cantonCity = "";
      this.cantonCity = "";
      let pId = this.$refs[cantonCode][0].$attrs.id;
      this.filterData.cantonProvince = this.$refs[
        cantonCode
      ][0].$attrs.regionCode;

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
        if (
          (this.provinceCheck && item == "cantonProvince") ||
          (this.provinceCheck && item == "cantonProvinceName")
        ) {
          continue;
        } else if (
          (this.cityCheck && item == "cantonCity") ||
          (this.cityCheck && item == "cantonCityName")
        ) {
          continue;
        } else if (
          (this.AreaCheck && item == "cantonArea") ||
          (this.AreaCheck && item == "cantonAreaName")
        ) {
          continue;
        } else {
          this.filterData[item] = "";
        }
      }
      this.$emit("filterInfo", this.filterData);
    },
    searchList() {
      this.$emit("filterInfo", this.filterData);
    }
  }
};
</script>
<style>
.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  padding-right: 10px;
  text-align: right;
  line-height: 35px;
}
</style>
