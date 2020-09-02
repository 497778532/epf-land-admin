<template>
  <!-- <div style="padding:15px" id="mapTrack">   -->
  <div class="page-body" id="mapTrack">
    <div class="filter_wrap">
      <monitorTrackfilter @filterInfo="getFilterData" :demandSelect="true"></monitorTrackfilter>  
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
  </div>
</template>

<script>
import axios from "axios";
import tianditu from "@/components/tianditu/warningMap";
import { mapActions, mapState } from "vuex";
import monitorTrackfilter from "@/components/monitorTrackfilter";
// import Bus from "../../../../../utils/bus";
console.log(Map);
export default {
  name: "mapTrack",
  components: {
    tianditu,
    monitorTrackfilter,
  },
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
      pageNo: 1, //页码
      pageSize: 5, //每页条数
      totalPage: 1,
      totalRecord: 1,
      provideData: [],
      loading: true,



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
        transTypeName: "",
        status: "",
        statusName: "",
        goodsNo: "" //地块编号
      },
    };
  },
  methods: {
    getFilterData(val) {
      this.filterData = val;
      this.getList(val);
    },
    ...mapActions(["setTabsList"]),
    //获取列表
    getList(val) {
      this.loading = true;
      let params = this.filterData;
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
      let routerPath = "/warningListDetail";
      var tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({ path: routerPath, query: { id: item.id } });
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
    mapLinkage(item) {
      if(!item.coordinate){
          return false
      }
      this.longitude = item.coordinate.split(",")[0]
      this.latitude = item.coordinate.split(",")[1]
    }
  },
  mounted(){
    this.getList();
  }
  // mounted() {
  //   setTimeout(()=>{
  //     if(sessionStorage.getItem("org_level") == 'org_level-003'){
  //       this.filterData.cantonProvince = sessionStorage.getItem("jgProvinceCode")
  //       this.filterData.cantonProvinceName = sessionStorage.getItem("jgProvince")
  //       this.provinceSelect('',this.filterData.cantonProvinceName,'')
  //     }else if(sessionStorage.getItem("org_level") == 'org_level-005'){
  //       this.filterData.cantonProvince = sessionStorage.getItem("jgProvinceCode")
  //       this.filterData.cantonProvinceName = sessionStorage.getItem("jgProvince")
  //       this.provinceSelect('',this.filterData.cantonProvinceName,'')
  //       setTimeout(()=>{
  //         this.filterData.cantonCity = sessionStorage.getItem("jgCityCode")
  //         this.filterData.cantonCityName = sessionStorage.getItem("jgCity")
  //         this.citySelect('',this.filterData.cantonCityName,'')
  //       },800)
  //     }else if(sessionStorage.getItem("org_level") == 'org_level-004'){
  //       this.filterData.cantonProvince = sessionStorage.getItem("jgProvinceCode")
  //       this.filterData.cantonProvinceName = sessionStorage.getItem("jgProvince")
  //       // this.provinceSelect('',this.filterData.cantonProvinceName,'')
  //       // setTimeout(()=>{
  //         this.filterData.cantonCity = sessionStorage.getItem("jgCityCode")
  //         this.filterData.cantonCityName = sessionStorage.getItem("jgCity")
  //         // this.citySelect('',this.filterData.cantonCityName,'')
  //         // setTimeout(()=>{
  //           this.filterData.cantonArea = sessionStorage.getItem("jgAreaCode")
  //           this.filterData.cantonAreaName = sessionStorage.getItem("jgArea")
  //       //   },800)
  //       // },800)
  //     }
  //   },500)
  // }
};
</script>
<style>
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
