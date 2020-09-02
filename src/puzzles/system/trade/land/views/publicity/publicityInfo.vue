<template>
  <epf-container title="成交公示">
    <div class="page-body">
      <div class="filter_wrap">
        <div class="switchHeight_box" ref="filterData" :model="filterData">
          <el-row>
            <el-col :span="2">
              <span class="filter_title">标的编号 :</span>
            </el-col>
            <el-col :span="3">
              <el-input v-model="filterData.targetNo" size="small" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="2">
              <span class="filter_title">竞得人 :</span>
            </el-col>
            <el-col :span="3">
              <el-input v-model="filterData.winner" size="small" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="2">
              <span class="filter_title">成交时间:</span>
            </el-col>
            <el-col :span="3">
              <el-date-picker v-model="filterData.endTransTime" size="small" type="date" placeholder="选择日期"></el-date-picker>
            </el-col>
            <el-col :span="5">
              <div class="epf_btn epf_btn_bg" @click="searchData()">查询</div>
              <div class="epf_btn epf_btn_def"  @click="resetFilter()">重置</div>
            </el-col>
          </el-row>
        </div>
        <el-tabs style="margin-top:35px;">
          <div class="toolsTitleBox">
            <span class="toolsTitle">成交公示</span>
          </div>
          <el-table
            ref="multipleTable"
            :data="tableData"

            style="width: 100%"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column prop="number" label="序号" width="100" align="center">
              <template slot-scope="scope">
                <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="targetNo" label="标的编号" width="170"></el-table-column>
            <el-table-column prop="beginPrice" label="起始价(万元)"></el-table-column>
            <el-table-column prop="transPrice" label="成交价(万元)"></el-table-column>
            <el-table-column prop="endTransTime" label="成交时间" width="240"></el-table-column>
            <el-table-column prop="winnerId" label="竞得人" width="300"></el-table-column>
            <el-table-column prop="status" label="状态" width="180">
              <template slot-scope="scope">
                <span :class="(scope.row.status!=='7'||scope.row.status!=='8')?'success':''"></span>
                <!-- <span :class="(scope.row.Status=='7'||scope.row.Status=='8')?'default':''"></span> -->
                <span>{{scope.row.statusName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <span class="list-style: none;"  v-for="(button ,index)  in buttons" :key="index">
                <el-button v-if="button.resourceId=='publicity_view'" type="text" size="small" @click="handleDetail(scope.row)">查看详情</el-button>
                </span>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align:right;margin:22px 0px;">
            <el-pagination
              background
              layout="prev, pager, next,sizes,jumper"
              :page-sizes="[5,10, 15, 20]"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :total="totalRecord"
            ></el-pagination>
          </div>
        </el-tabs>
      </div>
    </div>
  </epf-container>
</template>
<script>

export default {
  name: "publicityInfo",
  data() {
    return {
      tableDataTitle: [
        { prop: "targetNo", title: "标的编号" },
        { prop: "beginPrice", title: "起始价(万元)" },
        { prop: "amount", title: "保证金(万元)" },
        { prop: "landState", title: "地块状态" },
        { prop: "tradingCenter ", title: "交易中心" },
        { prop: "insertUser", title: "经办人" },
        { prop: "insertTime", title: "创建时间" }
      ],
      tableData: [],

      multipleSelection: [],
      handleDataError: [
        {
          type: "primary",
          title: "查看审核结果"
        }
      ],
      filterData: {
        winnerId:"",
        targetNo:"",
        endTransTime:"",
      },
      isShowProvince: true,
      temp: {
        address__province: "",
        address__city: "",
        address__dist: ""
      },
      options: [],
      value: "",
      handleDataWait: [
        {
          type: "success",
          title: "审核"
        },
        {
          type: "primary",
          title: "自动核验"
        }
      ],
      handleDataSuccess: [
        {
          type: "primary",
          title: "查看审核结果"
        },
        {
          type: "danger",
          title: "下架"
        }
      ],
      handleDataError: [
        {
          type: "primary",
          title: "查看审核结果"
        }
      ],
      handleData: "",
      dialogForm: false,
      dialogTable: false,
      dialogTest: false,
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: {},
      tableData1: [],
      labelPosition: "right",
      form: {
        assessor: "",
        opinion: ""
      },

      formTest: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      // 按钮组、主题
      buttons:[],
    };
  },
  created() {
    this.buttons=JSON.parse(localStorage.getItem("publicityInfo"));
    this.getParcelinfoData();
  },
  methods: {
    /**
     * 初始查询数据方法
     */
    getParcelinfoData: function(myParams) {

      this.loading = true;
      this.$get(this.$API.EPF_TRADE.PUBLICITY.PUBLICITY_LIST,
        myParams
      ).then(res => {
        if (res.code == "0") {
          console.log(res)
          this.tableData = res.pager.results;
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
          this.loading = false;
        } else {
          this.loading = false;
          this.$message.error(res.msg);
        }
      });
    },
    /**
     * 点击查看详情
     */
    handleDetail(item) {
      let routerPath = "/system/trade/land/views/publicity/detail?id="+item.id;
      let title = "公示详情页";
      let itemObj = {url:routerPath,menuname:title}
      this.$router.push({ path: routerPath, query: { id: item.id } });
      this.$store.commit("ADD_TAB", itemObj)
    },
    /**
     * 搜索查询方法
     */
    searchData: function() {
      this.getParcelinfoData(this.filterData);
    },
    /**
     * 重置搜索框
     */
    resetFilter() {
      for (let item in this.filterData) {
        this.filterData[item] = "";
      }
      this.useDate = [];
      this.$emit("filterInfo", this.filterData);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      // 每页条数改变时触发
      this.pageNo = 1;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = val;
    },
    handleCurrentChange(val) {
      // 获取当前页
      this.searchInfo["page"] = val;
      this.searchInfo["rows"] = this.pageSize;
    }
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
  margin-right: 16px;
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
  width: 100%;
  height: 34px;
  padding-right: 10px;
  text-align: right;
  line-height: 34px;
}
.reset {
margin-left: 10px;
border: solid 1px #d3d4d6;
color: #606266;
background-color: #fff;
}

</style>
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
.filter_wrap .el-input__prefix,
.el-input__suffix {
  width: 25px;
  font-size: 16px;
}
.el-table th,
.el-table tr {
  /* border:1px solid #ebeef5; */
}
.el-table__row td:nth-child(1) div {
  color: #666666;
}
</style>
