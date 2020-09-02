<template>
  <div class="switchHeight_box" 
    :style="{'overflow':!flexibleOpen?'hidden':'','height':!flexibleOpen?'73px':'auto'}"
  >
    <el-form :model="filterData" label-width="115px">
      <el-row type="flex" justify="start" class="ant-row ant-row-start">
        <el-col
          class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
          style="padding-left: 8px; padding-right: 8px;"
          >
          <el-form-item label="统一信用代码：">
            <el-input
              v-model="filterData.creditCode"
              size="small"
              placeholder="请输入统一信用代码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
          style="padding-left: 8px; padding-right: 8px;"
          :class="!flexibleOpen?'hidden-md-and-down':''"
          >
          <el-form-item label="公司类型：">
            <el-select
              size="small"
              class="filterCirculatemode"
              v-model="filterData.companyTypeName"
              placeholder="请选择公司类型"
              style="width:100%"
              @change="
                publishTypeSelect(
                  dictionary.companyTypes,
                  filterData.companyTypeName,
                  $event
                )
              "
            >
              <el-option
                v-for="(item, index) in dictionary.companyTypes"
                :ref="item.zhCn"
                :id="item.id"
                :dictKey="item.dictKey"
                :label="item.zhCn"
                :value="item.zhCn"
                :key="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
          style="padding-left: 8px; padding-right: 8px;"
          :class="!flexibleOpen?'hidden-md16-and-down':''"
          >
          <el-form-item label="等级：">
            <el-select
              size="small"
              class="filterCirculatemode"
              v-model="filterData.companyLevelName"
              placeholder="请选择等级"
              style="width:100%"
              @change="
                publishLeavelSelect(
                  dictionary.companyLevels,
                  filterData.companyLevelName,
                  $event
                )
              "
            >
              <el-option
                v-for="(item, index) in dictionary.companyLevels"
                :ref="item.zhCn"
                :id="item.id"
                :dictKey="item.dictKey"
                :label="item.zhCn"
                :value="item.zhCn"
                :key="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
          style="padding-left: 8px; padding-right: 8px;"
          v-if="flexibleOpen"
          >
          <el-form-item label="机构名称：">
            <el-input
              v-model="filterData.companyName"
              size="small"
              placeholder="请输入机构名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-12 ant-col-xxl-6"
          style="padding-left: 8px; padding-right: 8px;"
          v-if="flexibleOpen"
          >
          <el-form-item label="录入时间：">
            <el-date-picker
              v-model="useDate"
              type="daterange"
              unlink-panels
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="起始日期"
              end-placeholder="截止日期"
              size="small"
              @change="selectDatarange"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
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
                placeholder="所属省"
                style="min-width:168px;margin-right:8px;"
                @change="
                  provinceSelect(
                    dictionary.administrative_regions,
                    filterData.cantonProvinceName,
                    $event
                  )
                "
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
                placeholder="所属市"
                style="min-width:168px;margin-right:8px;"
                @change="
                  citySelect(
                    dictionary.cantonCity,
                    filterData.cantonCityName,
                    $event
                  )
                "
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
                placeholder="所属区/县"
                style="min-width:168px;"
                @change="
                  areaSelect(
                    dictionary.cantonAreaName,
                    filterData.cantonAreaName,
                    $event
                  )
                "
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
            <div class="button_bg" @click="findInfo">查询</div>
            <div class="button_default" @click="resetFilter">重置</div>
            <span class="flexibleSwitch" @click="flexibleOpen = !flexibleOpen;">
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
    closeSelectPlace: {
      type: Boolean
    }
  },
  data() {
    return {
      filterData: {
        creditCode: "",
        companyType: "",
        companyLevel: "",
        companyTypeName: "",
        companyLevelName: "",
        companyName: "",
        beginDate: "",
        endDate: "",
        //省市区
        cantonProvinceName: "",
        cantonProvince: "",
        cantonCityName: "",
        cantonCity: "",
        cantonAreaName: "",
        cantonArea: ""
      },
      dicRequest: ["administrative_regions"], //字典码请求
      dictionary: {
        //字典码结果
        administrative_regions: "",
        cantonCity: "",
        cantonArea: "",
        companyTypes: "",
        companyLevels: ""
      },
      useDate: [],
      pickerOptions: {
        //日期范围快速选择配置
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
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      switchHeight: 73,
      flexibleOpen: false,
    };
  },
  created() {
    //请求字典
    this.$get(
      `/epf-supply/dictionaries/getDictsByCodeOrParentId?code=company_type`,
      {}
    ).then(res => {
      console.log(res);
      if (res.dictionariesList.length != 0) {
        this.dictionary.companyTypes = res.dictionariesList;
        return;
      }
      this.dictionary.companyTypes = "";
    });
    //请求字典
    this.$get(
      `/epf-supply/dictionaries/getDictsByCodeOrParentId?code=grade_type`,
      {}
    ).then(res => {
      console.log(res);
      if (res.dictionariesList.length != 0) {
        this.dictionary.companyLevels = res.dictionariesList;
        return;
      }
      this.dictionary.companyLevels = "";
    });
    //请求字典 省
    this.$get(
      `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000`,
      {}
    ).then(res => {
      console.log(res);
      if (res.dictionariesList.length != 0) {
        this.dictionary.administrative_regions = res.dictionariesList;
        return;
      }
      this.dictionary.administrative_regions = "";
    });
  },
  methods: {
    publishTypeSelect(dic, companyTypeName, event) {
      this.filterData.companyType = this.$refs[
        companyTypeName
      ][0].$attrs.dictKey;
    },
    publishLeavelSelect(dic, companyLevelName, event) {
      this.filterData.companyLevel = this.$refs[
        companyLevelName
      ][0].$attrs.dictKey;
    },
    selectDatarange() {
      //选择日期范围后的回调
      if (this.useDate) {
        this.filterData.beginDate = this.useDate[0];
        this.filterData.endDate = this.useDate[1];
      } else {
        this.filterData.beginDate = "";
        this.filterData.endDate = "";
      }
    },
    findInfo() {
      this.$emit("filterInfo", this.filterData);
    },
    resetFilter() {
      for (let item in this.filterData) {
        this.filterData[item] = "";
      }
      this.useDate = [];
      this.$emit("filterInfo", this.filterData);
    },
    // @name: 行政区域
    // @description: 主要是getAreaByCodeOrParentId接口返回字段修改zhCn -> regionName，dictKey->regionCode
    // @author: gaojie
    // @chageTime:2020-3-2
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
      )
        .then(res => {
          console.log(res);
          if (res.dictionariesList.length != 0) {
            this.dictionary.cantonCity = res.dictionariesList;
            return;
          }
          this.dictionary.cantonCity = "";
        })
        .catch(error => {});
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
      )
        .then(res => {
          console.log(res);
          if (res.dictionariesList.length != 0) {
            this.dictionary.cantonArea = res.dictionariesList;
            return;
          }
          this.dictionary.cantonArea = "";
        })
        .catch(error => {});
    },
    areaSelect(dic, cantonCity, event) {
      this.filterData.cantonArea = this.$refs[cantonCity][0].$attrs.regionCode;
    }
  }
};
</script>

<style>
.filter_wrap .el-input--small .el-input__inner {
  height: 34px;
}
.filter_wrap .el-row {
  margin-bottom: 10px;
}
.filter_wrap .distpicker-address-wrapper select {
  width: 148px;
  height: 34px;
  font-size: 14px;
  line-height: 34px;
  padding: 0 10px;
}
.filter_wrap .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.filter_wrap .el-date-editor.el-input .el-input__icon {
  line-height: 30px;
  color: #8dc4f7;
}
/* .filter_wrap .el-input__prefix, .el-input__suffix{
    width:25px;
    font-size: 16px;
    right:8px;
  } */
.el-date-editor.dataIconStyle > .el-input__prefix {
  width: 25px;
  left: 80%;
}
</style>
