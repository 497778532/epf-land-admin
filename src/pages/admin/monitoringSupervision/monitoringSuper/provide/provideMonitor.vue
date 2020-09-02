<template>
  <!-- <div>供给监测</div> -->
  <div class="page-body">
    <!--  
      @name: 封装搜索栏
      @description: 封装搜索栏
      @author: gaojie
      @chageTime:2020-3-4 -->
    <div class="filter_wrap">
      <monitorFiltrate @filterInfo="getFilterInfo"></monitorFiltrate>
      <div class="switchHeight_box" style="padding-top:0">
        <div class="toolsTitleBox">
          <span class="toolsTitle">供给监测列表</span>
          <span class="button_export"
            ><a :href="href" style="color: #ffa000;">导出</a></span
          >
        </div>
        <el-table
          ref="multipleTable"
          :data="provideData"
          v-loading="loading"
          element-loading-text="数据加载中"
          element-loading-background="rgba(255, 255, 255,0.95)"
          style="width: 100%;min-height:80px;"
          border
          tooltip-effect="dark"
        >
          <el-table-column label="序号" width="85" align="center">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            prop="tSellNo"
            label="发布编号"
            width="165"
          ></el-table-column>
          <el-table-column
            prop="landCharName"
            label="土地性质"
            width="140"
          ></el-table-column>
          <el-table-column label="地块信息" width="260">
            <template slot-scope="scope">
              <p>
                用途：{{ scope.row.firstClassUseName }}/{{
                  scope.row.secondClassUseName
                }}
              </p>
              <p>面积：{{ scope.row.area }}平方米</p>
              <p>年限：{{ scope.row.endDate }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="cantonName" label="行政区域" width="200">
            <template slot-scope="scope">
              <span
                >{{ scope.row.cantonProvinceName }}/{{
                  scope.row.cantonCityName
                }}/{{ scope.row.cantonAreaName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="location"
            label="地块位置"
            width="220"
          ></el-table-column>
          <el-table-column
            prop="circulationName"
            label="流转方式"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="insertTime"
            label="提交时间"
            width="200"
          ></el-table-column>
          <el-table-column label="提交人" width="120">
            <template slot-scope="scope">
              <p>{{ scope.row.contact }}</p>
              <p>{{ scope.row.contactPhone }}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="60">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="medium"
                @click="handleClickDetail(scope.row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align:right;margin:22px 0px;">
          <el-pagination
            background
            layout="total,prev, pager, next,sizes,jumper"
            :page-sizes="[5, 10, 15, 20]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
            :current-page="currentPage"
            :page-size="pageSize"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
import Bus from "@/utils/bus";
import monitorFiltrate from "@/components/monitorFiltrate";

export default {
  name: "provideMonitor",
  components: { monitorFiltrate },
  data() {
    return {
      //供给监测列表
      provideData: [],
      params: {
        cantonProvince: "",
        cantonCity: "",
        cantonArea: "",
        landChar: "",
        firstClassUse: "",
        secondClassUse: "",
        startArea: "",
        endArea: "",
        startCreateDate: "",
        endCreateDate: "", //地块编号
        circulation: "",
        tSellNo: ""
      },
      //导出
      // href: "/api/epf-monitor/monitor/moniSell/downMoniSell?",
      href: "/api/epf-monitor/monisell/downMoniSell?",
      //页码
      currentPage: 1,
      pageNo: 1, //页码
      pageSize: 5, //每页条数
      totalPage: 1,
      totalRecord: 1,
      loading: true,
      searchInfo: {},
      multipleSelection: []
    };
  },
  methods: {
    ...mapActions(["setTabsList"]),
    getFilterInfo(val) {
      // this.href = "/api/epf-monitor/monitor/moniSell/downMoniSell";
      this.href = "/api/epf-monitor/monisell/downMoniSell?";
      //   this.params = this.filterData;
      let hrefParams = this.urlEncode(val).slice(1);
      this.href = this.href + hrefParams;
      this.params = val;
      this.params["page"] = 1;
      this.params["rows"] = this.pageSize;
      this.getList(this.params);
    },
    //获取列表
    getList(val) {
      this.loading = true;
      let params = this.params;
      params["page"] = this.pageNo;
      params["rows"] = this.pageSize;
      // this.$get(`/epf-monitor/monitor/moniSell/list`, params).then(res => {
      this.$get(`/epf-monitor/monisell/list`, params).then(res => {
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
      let title = "供给详情";
      let routerPath = `provideDetail?id=${item.id}`;
      console.log(routerPath);
      var tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({ path: routerPath, query: { id: item.id } });
      // let title = "供给详情";
      // let routerPath = "/provideDetail";
      // console.log(routerPath);
      // var tabObj = { title, routerPath };
      // this.setTabsList(tabObj);
      // this.$router.push({ path: routerPath, query: { id: item.id } });
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
    urlEncode(param, key, encode) {
      if (param == null) return "";
      var paramStr = "";
      var t = typeof param;
      if (t == "string" || t == "number" || t == "boolean") {
        paramStr +=
          "&" +
          key +
          "=" +
          (encode == null || encode ? encodeURIComponent(param) : param);
      } else {
        for (var i in param) {
          var k =
            key == null
              ? i
              : key + (param instanceof Array ? "[" + i + "]" : "." + i);
          paramStr += this.urlEncode(param[i], k, encode);
        }
      }
      return paramStr;
    }
  },
  created() {
    this.getList();
  }
};
</script>
<style scoped>
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

.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
