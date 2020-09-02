<template>
  <div class="switchHeight_box">
    <el-form :model="filterData" label-width="115px">
      <el-row
        type="flex"
        justify="start"
        class="ant-row ant-row-start"
      >
        <el-col
          class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
          style="padding-left: 8px; padding-right: 8px;"
        >
          <el-form-item label="信息标题：">
            <el-input
              v-model="filterData.title"
              placeholder="请输入标题"
              size="small"
              style="max-width:300px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
          style="padding-left: 8px; padding-right: 8px;"
          :class="!flexibleOpen?'hidden-md-and-down':''"
          >
          <el-form-item label="信息发布编号：">
            <el-input
              v-model="filterData.publishNo"
              placeholder="请输入信息发布编号"
              size="small"
              style="max-width:300px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-8 ant-col-xxl-6"
          style="padding-left: 8px; padding-right: 8px;"
          :class="!flexibleOpen?'hidden-md16-and-down':''"
        >
          <el-form-item label="状态：">
            <el-select
              size="small"
              class="filterCirculatemode"
              v-model="filterData.publishStatusName"
              placeholder="请选择状态"
              @change="
                publishStatusSelect(
                  dictionary.tsell_status,
                  filterData.publishStatusName,
                  $event
                )
              "
            >
              <el-option
                v-for="(item, index) in dictionary.tsell_status"
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
              :picker-options="pickerOptions"
              style="width:100%;"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col
          class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-18 ant-col-xl-16 ant-col-xxl-12"
          style="padding-left: 8px; padding-right: 8px;"
          v-if="!closeSelect && flexibleOpen"
        >
          <el-form-item label="行政区域：">
            <div style="width:30%;display: inline-block;margin-right:9px;">
              <el-select
                v-model="filterData.cantonProvinceName"
                size="small"
                placeholder="所属省"
                style="min-width:168px;"
                @change="
                  provinceSelect(
                    dictionaryCode.administrative_regions,
                    filterData.cantonProvinceName,
                    $event
                  )
                "
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
            </div>
            <div style="width:30%;display: inline-block;margin-right:9px;">
              <el-select
                v-model="filterData.cantonCityName"
                size="small"
                placeholder="所属市"
                style="min-width:168px;"
                @change="
                  citySelect(
                    dictionaryCode.cantonCity,
                    filterData.cantonCityName,
                    $event
                  )
                "
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
            </div>
            <div style="width:30%;display: inline-block;">
              <el-select
                v-model="filterData.cantonAreaName"
                size="small"
                placeholder="所属区/县"
                style="min-width:168px;"
                @change="
                  areaSelect(
                    dictionaryCode.cantonAreaName,
                    filterData.cantonAreaName,
                    $event
                  )
                "
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
          class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-12 ant-col-xl-6 ant-col-xxl-6"
          style="padding-left: 8px; padding-right: 8px;"
          >
          <el-form-item label-width="0">
            <div class="button_bg" @click="findInfo">查询</div>
            <div class="button_default" @click="resetFilter">重置</div>
            <span class="flexibleSwitch" @click="flexSwitch">
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
    },
    typeClose: {
      type: Boolean
    }
  },
  data() {
    return {
      flag: false,
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
        title: "",
        circulation: "",
        publishStatus: "",
        publishStatusName: "",
        publishNo: "",
        type: "",
        cantonProvinceName: "",
        cantonProvince: "",
        cantonCityName: "",
        cantonCity: "",
        cantonAreaName: "",
        cantonArea: "",
        issueBeginDate: "",
        issueEndDate: ""
      },
      isShowProvince: true,
      temp: {
        address__province: "",
        address__city: "",
        address__dist: ""
      },
      useDate: "",
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
      // flexibleSwitch:'展开',
      // flexibleSwitchIcon:'el-icon-caret-bottom',
      switchHeight: 49,
      flexibleOpen: false,
      dicRequest: ["tsell_status", "purchasr_demand"], //字典码请求
      dictionary: {
        //字典码结果
        tsell_status: "",
        purchasr_demand: ""
      },
      dictionaryCode: {
        administrative_regions: "",
        cantonCity: "",
        cantonArea: ""
      },
      dicNum: 0
    };
  },
  created() {
    //请求字典
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        this.$get(`/epf-supply/dictionaries/getDictEbyDictGroup/${item}`, {})
          .then(res => {
            if (item == "tsell_status") {
              res.dictionariesList.splice(3, 1);
            }
            resolve(res);
          })
          .catch(error => {});
      });
      return reqFun;
    });
    Promise.all(reqArr).then(res => {
      // console.log(res);
      let dicArr = res.map(item => {
        // console.log(item);
        let dicArr = item.dictionariesList.map(item => {
          return {
            dictKey: item.dictKey,
            zhCn: item.zhCn,
            id: item.id
          };
        });
        return dicArr;
      });

      for (let item in this.dictionary) {
        // console.log(dicArr[this.dicNum]);
        this.dictionary[item] = dicArr[this.dicNum];
        this.dicNum++;
      }

      this.dicFinsh = true;
      // console.log('字典结果',this.dictionary);
    });
    //获取当前用户所在的区域的ID
    let regional = sessionStorage.getItem("regional");
    let parentId = sessionStorage.getItem("parentId");
    //设置请求的地址
    if (parentId != "" && parentId != "000000") {
      regional = parentId;
      parentId = "000000";
    } else {
      this.regional = regional;
    }

    let url = `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000`;
    if (regional) {
      this.regional = regional;
      url = `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${parentId}&code=${regional}`;
    }

    this.$get(url, {}).then(res => {
      // console.log(res)
      this.dictionaryCode.administrative_regions = res.dictionariesList;
    });
  },
  methods: {
    flexSwitch() {
      this.flexibleOpen = !this.flexibleOpen;
      this.switchHeight = this.flexibleOpen ? 147 : 49;
    },
    // provinceSelect(dic,cantonCode,event){
    //   this.filterData.cantonAreaName='';
    //   this.filterData.cantonArea='';
    //   this.cantonArea = ''
    //   this.filterData.cantonCityName='';
    //   this.filterData.cantonCity='';
    //   this.cantonCity = '';
    //   let pId= this.$refs[cantonCode][0].$attrs.id;
    //   this.filterData.cantonProvince = this.$refs[cantonCode][0].$attrs.regionCode;

    //   this.$get(`/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,{}).then(res => {
    //     console.log(res);
    //     if(res.dictionariesList.length != 0){
    //     this.dictionaryCode.cantonCity = res.dictionariesList
    //     return
    //     }
    //     this.dictionaryCode.cantonCity = ''
    //     }).catch(error=>{})
    // },
    // citySelect(dic,cantonCity,event){
    //     this.filterData.cantonArea='';
    //     this.filterData.cantonAreaName='';
    //     this.cantonArea = ''
    //     let pId= this.$refs[cantonCity][0].$attrs.id;
    //     this.filterData.cantonCity = this.$refs[cantonCity][0].$attrs.regionCode;
    //     this.$get(`/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,{}).then(res => {
    //         console.log(res);
    //         if(res.dictionariesList.length != 0){
    //         this.dictionaryCode.cantonArea = res.dictionariesList
    //         return
    //         }
    //         this.dictionaryCode.cantonArea = ''
    //     }).catch(error=>{})
    // },
    // areaSelect(dic,cantonCity,event){
    //     this.filterData.cantonArea = this.$refs[cantonCity][0].$attrs.regionCode;
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
        if (res.dictionariesList.length != 0) {
          this.dictionaryCode.cantonCity = res.dictionariesList;
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
    publishStatusSelect(dic, publishStatusName, event) {
      this.filterData.publishStatus = this.$refs[
        publishStatusName
      ][0].$attrs.dictKey;
    },
    selectDatarange() {
      //选择日期范围后的回调
      this.filterData.issueBeginDate = this.useDate[0];
      this.filterData.issueEndDate = this.useDate[1];
    },
    findInfo() {
      this.$emit("filterInfo", this.filterData);
      // console.log(this.filterData)
    },
    resetFilter() {
      for (let item in this.filterData) {
        this.filterData[item] = "";
      }
      this.useDate = [];
      this.$emit("filterInfo", this.filterData);
    },
    showStatus(val) {
      if (val == "pending") {
        this.flag = false;
      } else {
        this.flag = true;
      }
      this.filterData["publishStatus"] = "";
      this.filterData["publishStatusName"] = "";
      // this.resetFilter()
    }
  }
};
</script>

