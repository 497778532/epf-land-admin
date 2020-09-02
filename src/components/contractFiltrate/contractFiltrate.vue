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
          >
            <el-form-item label="合同编号：">
              <el-input
                v-model="filterData.code"
                size="small"
                style="float:left"
                placeholder="请输入合同编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
            style="padding-left: 8px; padding-right: 8px;"
            :class="!flexibleOpen?'hidden-md-and-down':''"
          >
            <el-form-item label="合同状态：">
              <el-select
                size="small"
                class="filterCirculatemode"
                v-model="filterData.statusName"
                placeholder="请选择状态"
                @change="typeSelect(filterData.statusName, $event)"
              >
                <el-option
                  v-for="(item, index) in status"
                  :ref="item.zhCn"
                  :id="item.id"
                  :dictKey="item.dictKey"
                  :label="item.zhCn"
                  :value="item.zhCn"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
            style="padding-left: 8px; padding-right: 8px;"
            :class="!flexibleOpen?'hidden-md16-and-down':''"
           >
            <el-form-item label="申请时间：">
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
                style="width:100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col
            class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-18 ant-col-xl-16 ant-col-xxl-12"
            style="padding-left: 8px; padding-right: 8px;"
            v-if="flexibleOpen"
          >
            <el-form-item label="行政区域：">
              <div style="width:30%;float:left;margin-right:9px;">
                <el-select
                  size="small"
                  v-model="filterData.cantonProvinceName"
                  placeholder="所属省"
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
              </div>
              <div style="width:30%;float:left;margin-right:9px;">
                <el-select
                  size="small"
                  v-model="filterData.cantonCityName"
                  placeholder="所属市"
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
              </div>
              <div style="width:30%;float:left;">
                <el-select
                  size="small"
                  v-model="filterData.cantonAreaName"
                  placeholder="所属区/县"
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
import Axios from "axios";
import qs from "qs";
export default {
  props: {
    closeSelectPlace: {
      type: Boolean
    },
    conkey: {
      type: String
    }
  },
  data() {
    return {
      status: [
        { id: 1, statu: "审核中" },
        { id: 2, statu: "审核通过" },
        { id: 3, statu: "审核不通过" },
        { id: 4, statu: "撤销审核中" },
        { id: 5, statu: "合同已撤销" },
        { id: 6, statu: "鉴证成功" },
        { id: 7, statu: "鉴证失效" }
      ],
      closeSelect: this.closeSelectPlace,
      filter: [
        {
          inputType: "input",
          title: "信息标题",
          titleSpan: 2,
          inputSpan: 12
        },
        {
          inputType: "select",
          title: "流转方式",
          titleSpan: 3,
          inputSpan: 5,
          option: [
            {
              title: "全部"
            },
            {
              title: "转让"
            },
            {
              title: "出租"
            },
            {
              title: "抵押"
            }
          ]
        },
        {
          inputType: "region"
        },
        {
          inputType: "select",
          title: "状态",
          titleSpan: 3,
          spanSpan: 5
        }
      ],
      filterData: {
        code: "",
        cantonCode1: "",
        cantonProvinceName: "",
        cantonCode2: "",
        cantonCityName: "",
        cantonCode3: "",
        cantonAreaName: "",
        beginDate: "",
        endDate: "",
        status: "",
        statusName: ""
      },
      useDate: "",
      // 行政区
      dictionary: {
        administrative_regions: "",
        cantonCity: "",
        cantonArea: ""
      },
      switchHeight: 49,
      flexibleOpen: false
    };
  },
  created() {
    let userToken = sessionStorage.getItem("token");
    if (this.conkey == "record") {
      Axios.get(
        "/api/epf-admin/admin/dict/getDictEbyDictGroup/record_status",
        qs.stringify({
          token: userToken
        })
      ).then(res => {
        if (res.code == "0") {
          this.status = res.dictionariesList.filter(e => {
            if (e.dictKey !== "record_status-002") {
              return e;
            }
          });
        }
      });
    } else {
      Axios.get(
        "/api/epf-admin/admin/dict/getDictEbyDictGroup/contract_status",
        qs.stringify({ token: userToken })
      ).then(res => {
        console.log(res);
        if (res.code == "0") {
          this.status = res.dictionariesList.filter(key => {
            return (
              key["dictKey"] == "contract_status-003" ||
              key["dictKey"] == "contract_status-004" ||
              key["dictKey"] == "contract_status-005" ||
              key["dictKey"] == "contract_status-006" ||
              key["dictKey"] == "contract_status-007"
            );
          });
        }
      });
    }
    //获取当前用户所在的区域的ID
    let regional = sessionStorage.getItem("regional");
    //设置请求的地址
    let url = `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000`;
    if (regional) {
      this.regional = regional;
      url = `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000&code=${regional}`;
    }

    this.$get(url, {}).then(res => {
      this.dictionary.administrative_regions = res.dictionariesList;
    });
  },
  methods: {
    provinceSelect(dic, cantonCode, event) {
      this.filterData.cantonAreaName = "";
      this.filterData.cantonCode3 = "";
      this.filterData.cantonCityName = "";
      this.filterData.cantonCode2 = "";
      let pId = this.$refs[cantonCode][0].$attrs.id;
      this.filterData.cantonCode1 = this.$refs[cantonCode][0].$attrs.regionCode;

      let url = `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`;

      if (this.regional) {
        url = `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${this.regional}`;
      }

      this.$get(url, {}).then(res => {
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonCity = res.dictionariesList;
          return;
        }
        this.dictionary.cantonCity = "";
      });
    },
    citySelect(dic, cantonCity, event) {
      this.filterData.cantonCode3 = "";
      this.filterData.cantonAreaName = "";
      let pId = this.$refs[cantonCity][0].$attrs.id;
      this.filterData.cantonCode2 = this.$refs[cantonCity][0].$attrs.regionCode;
      this.$get(
        `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
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
    typeSelect(value, event) {
      this.filterData.status = this.$refs[value][0].$attrs.dictKey;
    },
    selectDatarange() {
      //选择日期范围后的回调
      this.filterData.beginDate = this.useDate[0];
      this.filterData.endDate = this.useDate[1];
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
    showStatus() {
      for (let item in this.filterData) {
        this.filterData[item] = "";
      }
      this.useDate = [];
    }
  }
};
</script>

