<template>
  <div class="filter_wrap11">
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
            class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-17 ant-col-xxl-12"
            style="padding-left: 8px; padding-right: 8px;"
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
                      dictionaryCode.administrative_regions,
                      filterData.cantonProvinceName,
                      $event
                    )
                  "
                  :disabled="provinceCheck"
                >
                  <el-option
                    v-for="(item,
                    index) in dictionaryCode.administrative_regions"
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
                      dictionaryCode.cantonCity,
                      filterData.cantonCityName,
                      $event
                    )
                  "
                  :disabled="cityCheck"
                >
                  <el-option
                    v-for="(item, index) in dictionaryCode.cantonCity"
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
                      dictionaryCode.cantonAreaName,
                      filterData.cantonAreaName,
                      $event
                    )
                  "
                  :disabled="AreaCheck"
                >
                  <el-option
                    v-for="(item, index) in dictionaryCode.cantonArea"
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
            class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-12 ant-col-xxl-12"
            style="padding-left: 8px; padding-right: 8px;"
            v-if="flexibleOpen"
          >
            <el-form-item label="用途：">
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
          <el-col
            class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
            style="padding-left: 8px; padding-right: 8px;"
            v-if="flexibleOpen"
          >
            <el-form-item label="土地性质：">
              <el-select
                size="small"
                v-model="filterData.landCharName"
                placeholder="全部"
                @change="
                  landCharSelect(
                    dictionary.land_nature,
                    filterData.landCharName,
                    $event
                  )
                "
              >
                <el-option
                  v-for="(item, index) in dictionary.land_nature"
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
            v-if="flexibleOpen"
          >
            <el-form-item label="面积：">
              <div style="display: flex;justify-items: flex-start;">
                <el-input
                  v-model="filterData.startArea"
                  size="small"
                  style="min-width:100px;"
                  placeholder="起始面积"
                  ><span slot="suffix" class="itext">m²</span></el-input
                >
                <div
                  style="display: inline-block;width:100px;text-align:center;line-height:35px;"
                >
                  -
                </div>

                <el-input
                  v-model="filterData.endArea"
                  size="small"
                  style="min-width:100px;"
                  placeholder="终止面积"
                  ><span slot="suffix" class="itext">m²</span></el-input
                >
              </div>
              <!-- <div style="width:35%;float:left;">
              </div>

              <div style="width:35%;float:left;">
              </div> -->
            </el-form-item>
          </el-col>
          <el-col
            class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
            style="padding-left: 8px; padding-right: 8px;"
            v-if="flexibleOpen"
          >
            <el-form-item label="流转方式：">
              <el-select
                size="small"
                v-model="filterData.circulationName"
                placeholder="全部"
                @change="
                  circulationSelect(
                    dictionary.flow_mode,
                    filterData.circulationName,
                    $event
                  )
                "
              >
                <el-option
                  v-for="item in dictionary.flow_mode"
                  :ref="item.zhCn"
                  :id="item.id"
                  :dictKey="item.dictKey"
                  :label="item.zhCn"
                  :value="item.zhCn"
                  :key="item.dictKey"
                ></el-option> </el-select
            ></el-form-item>
          </el-col>
          <el-col
            class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
            style="padding-left: 8px; padding-right: 8px;"
            v-if="flexibleOpen"
          >
            <el-form-item label="发布编号：">
              <el-input
                v-model="filterData.tSellNo"
                size="small"
                placeholder="请输入地块编号"
              ></el-input
            ></el-form-item>
          </el-col>
          <el-col
            class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-6 ant-col-xxl-6"
            style="padding-left: 8px; padding-right: 8px;"
           >
            <el-form-item label-width="0">
              <div class="button_bg" @click="searchList">查询</div>
              <div class="button_default" @click="resetFilter">重置</div>
              <span
                class="flexibleSwitch"
                @click="flexibleOpen = !flexibleOpen"
              >
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      flexibleOpen: false,
      //根据权限锁定省市
      provinceCheck: false,
      cityCheck: false,
      AreaCheck: false,
      filterData: {
        startArea: "",
        endArea: "",
        cantonProvinceName: "",
        cantonProvince: "",
        cantonCityName: "",
        cantonCity: "",
        cantonAreaName: "",
        cantonArea: "",
        landChar: "", //土地性质
        landCharName: "",
        firstClassUse: "",
        firstClassUseName: "", //一级土地用途
        secondClassUse: "",
        secondClassUseName: "", //二级土地用途
        circulation: "", //流转方式
        circulationName: "",
        // entrustAgency: "",
        // entrustAgencyId: "",
        // trustOrgId: "",
        tSellNo: "",
        startCreateDate: "",
        endCreateDate: "" //地块编号
      },
      dicRequest: ["land_use", "flow_mode", "land_nature", "trans_status1"], //字典码请求
      dictionary: {
        //字典码结果
        land_use: "",
        flow_mode: "",
        land_nature: "",
        trans_status1: "",
        land_use_second: ""
        // administrative_regions:"",
        // cantonCity:"",
        // cantonArea:"",
      },
      dictionaryCode: {
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
      },
      submitTime: "", //提交时间
      obj: {
        dictKey: "",
        zhCn: "全部",
        id: "0"
      }
    };
  },
  methods: {
    //字典选择
    // provinceSelect(dic, cantonCode, event) {
    //   this.filterData.cantonAreaName = "";
    //   this.filterData.cantonArea = "";
    //   this.filterData.cantonCityName = "";
    //   this.filterData.cantonCity = "";
    //   let pId = this.$refs[cantonCode][0].$attrs.id;
    //   this.filterData.cantonProvince = this.$refs[
    //     cantonCode
    //   ][0].$attrs.regionCode;
    //   this.$get(
    //     `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
    //     {}
    //   ).then(res => {
    //     console.log(res);
    //     if (res.dictionariesList.length != 0) {
    //       this.dictionary.cantonCity = res.dictionariesList;
    //     //   this.dictionary.cantonCity.unshift(this.obj);
    //       return;
    //     }
    //     this.dictionary.cantonCity = "";
    //   });
    // },
    // citySelect(dic, cantonCity, event) {
    //   this.filterData.cantonArea = "";
    //   this.filterData.cantonAreaName = "";
    //   this.cantonArea = "";
    //   let pId = this.$refs[cantonCity][0].$attrs.id;
    //   this.filterData.cantonCity = this.$refs[cantonCity][0].$attrs.regionCode;
    //   this.$get(
    //     `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
    //     {}
    //   ).then(res => {
    //     console.log(res);
    //     if (res.dictionariesList.length != 0) {
    //       this.dictionary.cantonArea = res.dictionariesList;
    //     //   this.dictionary.cantonArea.unshift(this.obj);
    //       return;
    //     }
    //     this.dictionary.cantonArea = "";
    //   });
    // },
    // areaSelect(dic, cantonCity, event) {
    //   this.filterData.cantonArea = this.$refs[cantonCity][0].$attrs.regionCode;
    // },
    provinceSelect(dic, cantonCode, event) {
      this.filterData.cantonAreaName = "";
      this.filterData.cantonArea = "";
      this.filterData.cantonCityName = "";
      this.filterData.cantonCity = "";
      let pId = this.$refs[cantonCode][0].$attrs.id;
      this.filterData.cantonProvince = this.$refs[
        cantonCode
      ][0].$attrs.regionCode;
      let url = `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`;
      if (this.regional) {
        url = `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${this.regional}`;
      }
      this.$get(url, {}).then(res => {
        console.log(res);
        if (res.dictionariesList.length != 0) {
          let obj = {
            regionCode: "",
            regionName: "全部",
            id: "0"
          };
          this.dictionaryCode.cantonCity = res.dictionariesList;
          this.dictionaryCode.cantonCity.unshift(obj);
          return;
        }
        this.dictionaryCode.cantonCity = "";
      });
    },
    citySelect(dic, cantonCity, event) {
      this.filterData.cantonArea = "";
      this.filterData.cantonAreaName = "";
      let pId = this.$refs[cantonCity][0].$attrs.id;
      this.filterData.cantonCity = this.$refs[cantonCity][0].$attrs.regionCode;
      this.$get(
        `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        if (res.dictionariesList.length != 0) {
          this.dictionaryCode.cantonArea = res.dictionariesList;
          return;
        }
        this.dictionaryCode.cantonArea = "";
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
        if (res.dictionariesList.length != 0) {
          this.dictionary.land_use_second = res.dictionariesList;
          this.dictionary.land_use_second.unshift(this.obj);
          return;
        }

        this.dictionary.land_use_second = "";
      });
      console.log(
        "========this.dictionary.land_use_second=====",
        this.dictionary.land_use_second
      );
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
    landCharSelect(dic, landChar, event) {
      this.filterData.landChar = this.$refs[landChar][0].$attrs.dictKey;
    },
    searchList() {
      if (this.submitTime) {
        this.filterData["startCreateDate"] = this.submitTime[0];
        this.filterData["endCreateDate"] = this.submitTime[1];
      }
      this.$emit("filterInfo", this.filterData);
    },
    resetFilter() {
      for (let item in this.filterData) {
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
      this.dictionaryCode.cantonCity = "";
      this.dictionaryCode.cantonArea = "";
      this.submitTime = "";
      //可看到全国数据
      // this.$emit("filterInfo", this.filterData);
      //可看到用户所在区域数据
      this.getCodeData();
    },
    //获取当前用户所在的区域的ID-------------------------目前sessionStorage存的是省份
    getCodeData() {
      let regional = sessionStorage.getItem("regional");
      //设置请求的地址
      let url = `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000`;
      if (regional) {
        this.regional = regional;
        url = `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000&code=${regional}`;
      }
      this.$get(url, {}).then(res => {
        this.dictionaryCode.administrative_regions = res.dictionariesList;
        this.filterData.cantonProvinceName = res.dictionariesList[0].regionName;
        this.filterData["cantonProvince"] = this.regional;
        this.$emit("filterInfo", this.filterData);
        // 获取当前用户所在的下一级信息
        let url = "";
        if (this.regional) {
          url = `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${this.regional}`;
        }
        this.$get(url, {}).then(res => {
          if (res.dictionariesList.length != 0) {
            let obj = {
              regionCode: "",
              regionName: "全部",
              id: "0"
            };
            this.dictionaryCode.cantonCity = res.dictionariesList;
            this.dictionaryCode.cantonCity.unshift(obj);
            return;
          }
          this.dictionaryCode.cantonCity = "";
        });
      });
    }
  },
  created() {
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
      console.log(dicArr);
      dicArr.forEach(function(item, index) {
        item.unshift(that.obj);
      });
      for (let item in this.dictionary) {
        console.log(this.dicNum);
        this.dictionary[item] = dicArr[this.dicNum];
        this.dicNum++;
      }
      this.dicFinsh = true;
      console.log(this.dictionary);
    });
    // 显示所在区域
    this.getCodeData();
    //显示全国省份
    // this.$get(`/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000`,{}).then(res => {
    //   this.dictionary.administrative_regions = res.dictionariesList;
    // })
    if (sessionStorage.getItem("org_level") == "org_level-003") {
      this.provinceCheck = true;
      this.params.cantonProvince = sessionStorage.getItem("jgProvinceCode");
      this.params.cantonProvinceName = sessionStorage.getItem("jgProvince");
    } else if (sessionStorage.getItem("org_level") == "org_level-005") {
      this.provinceCheck = true;
      this.cityCheck = true;
      this.params.cantonProvince = sessionStorage.getItem("jgProvinceCode");
      this.params.cantonProvinceName = sessionStorage.getItem("jgProvince");
      this.params.cantonCity = sessionStorage.getItem("jgCityCode");
      this.params.cantonCityName = sessionStorage.getItem("jgCity");
    } else if (sessionStorage.getItem("org_level") == "org_level-004") {
      this.provinceCheck = true;
      this.cityCheck = true;
      this.AreaCheck = true;
      this.params.cantonProvince = sessionStorage.getItem("jgProvinceCode");
      this.params.cantonProvinceName = sessionStorage.getItem("jgProvince");
      this.params.cantonCity = sessionStorage.getItem("jgCityCode");
      this.params.cantonCityName = sessionStorage.getItem("jgCity");
      this.params.cantonArea = sessionStorage.getItem("jgAreaCode");
      this.params.cantonAreaName = sessionStorage.getItem("jgArea");
    }
  },
  mounted() {
    setTimeout(() => {
      if (sessionStorage.getItem("org_level") == "org_level-003") {
        this.filterData.cantonProvince = sessionStorage.getItem(
          "jgProvinceCode"
        );
        this.filterData.cantonProvinceName = sessionStorage.getItem(
          "jgProvince"
        );
        this.provinceSelect("", this.filterData.cantonProvinceName, "");
      } else if (sessionStorage.getItem("org_level") == "org_level-005") {
        this.filterData.cantonProvince = sessionStorage.getItem(
          "jgProvinceCode"
        );
        this.filterData.cantonProvinceName = sessionStorage.getItem(
          "jgProvince"
        );
        this.provinceSelect("", this.filterData.cantonProvinceName, "");
        setTimeout(() => {
          this.filterData.cantonCity = sessionStorage.getItem("jgCityCode");
          this.filterData.cantonCityName = sessionStorage.getItem("jgCity");
          this.citySelect("", this.filterData.cantonCityName, "");
        }, 800);
      } else if (sessionStorage.getItem("org_level") == "org_level-004") {
        this.filterData.cantonProvince = sessionStorage.getItem(
          "jgProvinceCode"
        );
        this.filterData.cantonProvinceName = sessionStorage.getItem(
          "jgProvince"
        );
        // this.provinceSelect('',this.filterData.cantonProvinceName,'')
        // setTimeout(()=>{
        this.filterData.cantonCity = sessionStorage.getItem("jgCityCode");
        this.filterData.cantonCityName = sessionStorage.getItem("jgCity");
        // this.citySelect('',this.filterData.cantonCityName,'')
        // setTimeout(()=>{
        this.filterData.cantonArea = sessionStorage.getItem("jgAreaCode");
        this.filterData.cantonAreaName = sessionStorage.getItem("jgArea");
        //   },800)
        // },800)
      }
    }, 500);
  }
};
</script>
