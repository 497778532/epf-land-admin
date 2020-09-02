<template>
  <!-- <div>交易类型区域趋势</div> -->
  <div class="page-body" id="planAnalyse">
    <div class="filter_wrap">
     <monitorTrackfilter @filterInfo="getFilterData" :demandSelect='false'></monitorTrackfilter>  
      <div style="display:inline-block;float:left;margin-top:20px">
        <span>
          用地开发进度状况分析：
          <el-select
            v-model="myselect"
            placeholder="全部"
            @change="axiosSelect(myselect)"
            style="width:250px"
          >
            <el-option
              v-for="item in AllSelect"
              :ref="item.label"
              :dictKey="item.url"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </span>
      </div>
      <div
        id="cycleChart"
        style="width:1200px;height:550px;margin-top:70px;margin-bottom:75px;"
        ref="cycleChart"
      ></div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
import qs from "qs";
import { mapActions, mapState } from "vuex";
import echarts from "echarts";
import monitorTrackfilter from "@/components/monitorTrackfilter";

export default {
  name: "planAnalyse",
  components: {
    monitorTrackfilter,
  },
  data() {
    return {
      //根据权限锁定省市
      provinceCheck:false,
      cityCheck:false,
      AreaCheck:false,
      myselect: "各年度出让的用地开工率情况",
      // AllSelect:['各年度出让的用地开工率情况','各年度出让的用地率竣工率情况','动工延期情况分析','施工周期延期情况分析','竣工延期情况分析'],
      AllSelect: [
        {
          value: "1",
          label: "各年度出让的用地开工率情况",
          url: "/epf-monitor/monitor/goodTrack/queryOperatRate"
        },
        {
          value: "2",
          label: "各年度出让的用地率竣工率情况",
          url: "/epf-monitor/monitor/goodTrack/queryCompleRate"
        },
        {
          value: "3",
          label: "动工延期情况分析",
          url: "/epf-monitor/monitor/goodTrack/queryStartLateRate"
        },
        {
          value: "4",
          label: "施工周期延期情况分析",
          url: "/epf-monitor/monitor/goodTrack/queryPeriodLateRate"
        },
        {
          value: "5",
          label: "竣工延期情况分析",
          url: "/epf-monitor/monitor/goodTrack/queryCompleLateRate"
        }
      ],

      handleData: "",
      //页码
      url: "/epf-monitor/monitor/goodTrack/queryOperatRate",
      params: {},
      timeCycle: "", //对比周期
      submitTime: "", //发布时间
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
        secondClassUseName: "", //二级土地用途
        transType: "",
        transTypeName: ""
      },
    };
  },
  //   created() {
  //     if (this.create) {
  //       return null;
  //     }
  //     this.create = true;
  //     this.handleData = this.handle;
  //     let userToken = sessionStorage.getItem("token");
  //     this.getList({ token: userToken, publishStatus: "audit" });
  //   },
  methods: {
    getFilterData(val) {
      this.filterData = val;
      // this.getList(val);
      this.params = this.filterData;
      this.cycleDrawLine(this.url, val);
    },
    ...mapActions(["setTabsList"]),
    searchList() {
      this.params = this.filterData;
      this.cycleDrawLine(this.url, this.params);
    },
    clearList() {
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
        // this.params = {};
      }
      // this.cycleDrawLine(this.url, this.params);
      this.searchList();
    },
    cycleDrawLine(url, params) {
      this.$nextTick(() => {
        let cycleChart = echarts.init(document.getElementById("cycleChart"));
        // 绘制图表
        this.$get(
          // `/epf-monitor/monitor/goodTrack/queryOperatRate`,
          url,
          params
        ).then(res => {
          console.log(res);
          this.cycleData = res.result;
          var xData = [];
          var contentData = [];
          if (res.code == "0") {
            if (this.cycleData.length > 0) {
              this.cycleData.forEach(item => {
                xData.push(item.year);
              });
              this.cycleData.forEach(item => {
                contentData.push(item.countAll);
              });
              function cycle(x, contentData) {
                cycleChart.setOption({
                  title: {
                    text: "开工率",
                    textStyle: {
                      align: "center",
                      color: "#333",
                      fontSize: 14
                    },
                    top: "0%",
                    left: "0%"
                  },
                  backgroundColor: "#fff",
                  grid: {
                    top: "50px",
                    left: "50px",
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

                      axisLine: {
                        show: true,
                        lineStyle: {
                          color: "#FFFFFF"
                        }
                      }
                    },
                    {
                      // name: "开工率",
                      type: "value",
                      interval: 20,
                      max: 100,
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
                        show: true,
                        formatter: "{value} %"
                      }
                    }
                  ],
                  series: [
                    {
                      name: "供给",
                      type: "line",
                      yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                      smooth: true, //平滑曲线显示
                      showAllSymbol: true, //显示所有图形。
                      symbol: "circle", //标记的图形为实心圆
                      symbolSize: 10, //标记的大小
                      color: "#7fbdf8",
                      itemStyle: {
                        //折线拐点标志的样式
                        normal: {
                          lineStyle: {
                            width: 3 // 0.1的线条是非常细的了
                          }
                        }
                      },
                      data: contentData
                    }
                  ]
                });
              }

              cycle(xData, contentData);
            } else {
              this.$message({
                message: "暂时没有数据",
                type: "warning"
              });
            }
            // console.log(xData,yMax,gjTotalArea,xqTotalArea)
          } else {
            this.$message.error(res.msg); //失败
            return;
          }
        });
      });
    },
    //字典选择url
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
    axiosSelect(myselect) {
      this.url = this.$refs[myselect][0].$attrs.dictKey;
      this.cycleDrawLine(this.url, this.params);
    }
  },
  mounted() {
    this.cycleDrawLine(
      `/epf-monitor/monitor/goodTrack/queryOperatRate`,
      this.params
    );

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
};
</script>
<style scoped>

.toolsTitleBox_graph {
  line-height: 55px;
  padding: 30px 0 0 0;
  background: #f5f7fa;
  color: #606266;
  font-size: 15px;
  font-weight: bold;
  border: 1px solid #ebeef5;
}

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
  margin-right: 16px;
  text-align: center;
  line-height: 32px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.oper span:nth-child(2) {
  border: solid 1px #d3d4d6;
  color: #606266;
  background: #fff;
}
.toolsTitleBox .oper span:nth-child(2) {
  border: solid 1px #d3d4d6;
  color: #fff;
  background: #ffa000;
}
.toolsTitleBox .oper span:nth-child(3) {
  border: solid 1px #d3d4d6;
  color: #606266;
  background: #fff;
}

.operCycle {
  font-weight: normal;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.operCycle .derive {
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

.dialogBtn_box {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.titleHoverStyle:hover {
  color: #4772d5 !important;
}
</style>
<style>
#planAnalyse .el-input__inner {
  height: 35px;
  line-height: 35px;
}
</style>


