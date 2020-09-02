<template>
  <epf-container title="地块信息">
    <div class="page-body">
      <div class="switchHeight_box">
        <el-form ref="filterData" :model="filterData">
          <el-row>
            <el-col :span="2">
              <span class="filter_title">土地编号 :</span>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="title">
                <el-input v-model="goodsNo" size="small" placeholder="请输入标题"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <span class="filter_title">土地用途 :</span>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="filterData">
                <el-select
                  size="small"
                  class="filterCirculatemode"
                  v-model="filterData.publishStatusName"
                  placeholder="请选择状态"
                  @change="publishStatusSelect(dictionary.land_use,filterData.publishStatusName,$event)"
                >
                  <el-option
                    v-for="item in dictionary.land_use"
                    :ref="item.zhCn"
                    :dictKey="item.dictKey"
                    :label="item.zhCn"
                    :value="item.zhCn"
                    :key="item.dictKey"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">
              <span class="filter_title">行政区域 :</span>
            </el-col>
            <el-col :span="12">
              <div style="width:155px;float:left;margin-right:9px;">
                <el-select
                  v-model="filterData.cantonProvinceName"
                  size="small"
                  placeholder="所属省"
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
                  placeholder="所属市"
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
                  placeholder="所属区/县"
                  @change="areaSelect(dictionary.cantonAreaName,filterData.cantonAreaName,$event)"
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
            <el-col :span="2">
              <div class="epf_btn epf_btn_bg" @click="searchData()">查询</div>
            </el-col>
            <el-col :span="2">
              <div class="epf_btn epf_btn_def"
                @click="resetFilter()"
              >重置</div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-tabs type="border-card" @tab-click="tabClick" v-model="activeName">
        <el-tab-pane label="未绑定" name="0">
          <div>
            <el-table
              ref="multipleTable"
              v-loading="loading"
              element-loading-text="数据加载中"
              element-loading-background="rgba(255, 255, 255,0.95)"
              :data="myTableData1"
              style="width: 100%"
              border
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="goodsNo" label="地块编号" width="160"></el-table-column>
              <el-table-column prop label="行政区域" width="200">
                <template slot-scope="scope">
                  <span>{{scope.row.cantonProvinceName}}</span>>
                  <span>{{scope.row.cantonCityName}}</span>>
                  <span>{{scope.row.cantonAreaName}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="circulationName" label="流转方式" width="150"></el-table-column>
              <el-table-column prop="isBinding" label="地块状态" width="180">
                <template slot-scope="scope">
                  <span :class="scope.row.isBinding==1?'default':''"></span>
                  <span :class="scope.row.isBinding==0?'success':''"></span>
                  <span>未绑定</span>
                </template>
              </el-table-column>
              <el-table-column prop="channelName" label="渠道" width="150"></el-table-column>
              <el-table-column prop="firstClassUseName" label="用途" width="300"></el-table-column>
              <el-table-column prop="insertUser" label="经办人" width="120"></el-table-column>
              <el-table-column prop="insertTime" label="创建时间" width="200"></el-table-column>
              <el-table-column label="操作" fixed="right">
                <template slot-scope="scope">
                  <el-button @click="viewDeatil(scope.row)" type="text" size="small">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="text-align:right;margin:8px 0px;">
            <el-pagination
              layout="total,prev, pager, next,sizes,jumper"
              :page-sizes="[5,10, 15, 20]"
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :total="totalRecord1"
              :current-page="pageNo1"
              :page-size="pageSize1"
              :page-count="totalPage1"
              background
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已绑定" name="1">
          <div>
            <el-table
              ref="multipleTable"
              :data="myTableData2"
              v-loading="loading"
              element-loading-text="数据加载中"
              element-loading-background="rgba(255, 255, 255,0.95)"
              style="width: 100%"
              border
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="goodsNo" label="地块编号" width="160"></el-table-column>
              <el-table-column prop label="行政区域" width="200">
                <template slot-scope="scope">
                  <span>{{scope.row.cantonProvinceName}}</span>>
                  <span>{{scope.row.cantonCityName}}</span>>
                  <span>{{scope.row.cantonAreaName}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="circulationName" label="流转方式" width="150"></el-table-column>
              <el-table-column prop="isBinding" label="地块状态" width="180">
                <template slot-scope="scope">
                  <span :class="scope.row.isBinding == 1?'default':''"></span>
                  <span :class="scope.row.isBinding == 0?'success':''"></span>
                  <span>已绑定</span>
                </template>
              </el-table-column>
              <el-table-column prop="channelName" label="渠道" width="150"></el-table-column>
              <el-table-column prop="firstClassUseName" label="用途" width="300"></el-table-column>
              <el-table-column prop="insertUser" label="经办人" width="120"></el-table-column>
              <el-table-column prop="insertTime" label="创建时间" width="200"></el-table-column>
              <el-table-column label="操作" fixed="right">
                <template slot-scope="scope">
                  <el-button @click="viewDeatil(scope.row)" type="text" size="small">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="text-align:right;margin:8px 0px;">
            <el-pagination
              layout="total,prev, pager, next,sizes,jumper"
              :page-sizes="[5,10, 15, 20]"
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :total="totalRecord2"
              :current-page="pageNo2"
              :page-size="pageSize2"
              :page-count="totalPage2"
              background
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </epf-container>
</template>
<script>
export default {
  name: "landInfo",
  data() {
    return {
      dicNum: 0,
      myCity: [],
      activeName: "0",
      selectedRow: [],
      deletedId: "",
      header: {},
      dicRequest: ["land_use"], //字典码请求
      dictionary: {
        //字典码结果
        land_use: "",
        administrative_regions: "",
        cantonCity: "",
        cantonArea: ""
      },
      myTableData4: [],
      multipleSelection: [],
      filterData: {
        goodsNo: "",
        firstClassUse: "",
        publishStatusName: "",
        cantonProvince: "",
        cantonCity: "",
        cantonArea: "",
        cantonProvinceName: "",
        cantonCityName: "",
        cantonAreaName: "",
        isBinding: 1,
        page: 1,
        rows: 5
      },
      isShowProvince: true,
      temp: {
        address__province: "",
        address__city: "",
        address__dist: ""
      },
      options: [
        {
          value: "firstClassUse",
          label: "地块一级用途"
        },
        {
          value: "secondClassUse",
          label: "地块二级用途"
        }
      ],
      value: "",
      handleData: "",
      dialogForm: false,
      dialogTable: false,
      dialogTest: false,
      pageNo: "1",
      pageSize: "5",
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
      active: "0",
      loading: true,
      myTableData1: null,
      myTableData2: null,
      totalPage1: 0,
      totalPage2: 0,
      totalRecord1: 0,
      totalRecord2: 0,
      pageNo1: 0,
      pageNo2: 0,
      pageSize1: 0,
      pageSize2: 0,
      cantonData: {
        doSomeThing: "",
        type: "",
        publishStatus: "",
        publishStatusName: ""
      },
      goodsNo: '',
      userId: "",
      CancelToken: "", //axios请求暂停函数
      cancel: null //调用对象
    };
  },
  created() {
    this.getParcelinfoData({ isBinding: 1 });
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == "land_use") {
          this.$get(
            `/epf-trade/dictionaries/getDictsByCodeOrParentId?code=${item}`,
            { parentId: 0 }
          ).then(res => {
            resolve(res);
          });
        }
        else {
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

      this.dicFinsh = true;
      console.log("字典结果", this.dictionary);
    });
    this.getProvinceData()
  },
  watch: {
    activeName: function(val) {
      if (val == "0") {
        this.active = "0";
        this.nullData();
      } else {
        this.active = "1";
        this.filterData.isBinding = "0";
        this.nullData();
      }
      let isBinding = "";
      if (this.active == "0") {
        isBinding = "1";
        this.filterData.isBinding = "1";
        this.nullData();
      } else {
        isBinding = "0";
        this.filterData.isBinding = "0";
        this.nullData();
      }
      this.searchInfo["isBinding"] = isBinding;
      this.getParcelinfoData(this.searchInfo);
    }
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
    /**
     * 查询地块信息列表
     */
    getParcelinfoData(myParams) {
      let that = this;
      myParams["insertUser"] = this.userId;
      myParams["goodsNo"] = encodeURIComponent(this.goodsNo);
      this.loading = true;
      this.$get(this.$API.EPF_TRADE.LAND.LAND_INFO, myParams)
        .then(res => {
          console.log("请求结束");
          if (res.code == "0") {
            if (this.activeName == "0") {
              this.myTableData1 = res.pager.results;
              
              this.pageNo1 = res.pager.pageNo;
              this.pageSize1 = res.pager.pageSize;
              this.totalPage1 = res.pager.totalPage;
              this.totalRecord1 = res.pager.totalRecord;
            } else if (this.activeName == "1") {
              this.myTableData2 = res.pager.results;

              this.pageNo2 = res.pager.pageNo;
              this.pageSize2 = res.pager.pageSize;
              this.totalPage2 = res.pager.totalPage;
              this.totalRecord2 = res.pager.totalRecord;
            }
            this.loading = false;
          } else {
            this.loading = false;
            this.$message.error(res.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getUsers() {
      // 获取交易中心的审批人员
      this.$get(`/epf-admin/admin/user/getUsersByCurrentOrRole`, {}).then(
        res => {
          if (res.code == 0) {
            console.log("返回当前审批用户", res.list);
            // this.authViewDatas(res.list);
          }
        }
      );
    },
    authViewDatas(users) {
      let i = users.length - 1;
      let user = [];
      user.push(users[i]);
      users.splice(i, 1);
      console.log("user", user);
      console.log("users", users);
      if (users.length == 0) {
        this.userId = ""; //当前登录用户
      } else {
        let flag = user.every(val => users.includes(val));
        console.log("flag", flag);
        if (!flag) {
          this.userId = ""; //当前登录用户
        }
      }
    },

    searchData: function() {
      this.getParcelinfoData(this.filterData);
    },
    tabClick(tab, event) {
      console.log(tab, tab.name, event);
    },
    onSelected(data) {
      this.filterData.cantonProvince = data.province.value;
      this.filterData.cantonCity = data.city.value;
      this.filterData.cantonArea = data.area.value;
    },
    resetForm(formName) {
      this.$refs["filterData"].resetFields();
    },
    viewDeatil(item) {
      let title = "地块详情";
      let routerPath = "/system/trade/land/views/land/detail";
      let itemObj = {url:routerPath,menuname:title}
      this.$router.push({ path: routerPath, query: { id: item.id } });
      this.$store.commit("ADD_TAB", itemObj)
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
      console.log(this.multipleSelection);
      // this.selectedRow=this.$refs.multipleSelection.selection;
      // console.log(this.selectedRow)
    },
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

    handleEdit(index, row, btnText) {
      if (btnText === "审核") {
        this.dialogForm = true;
      }
    },
    handleSizeChange1(val) {
      this.filterData.rows = val;
      this.getParcelinfoData(this.filterData);
    },
    handleSizeChange2(val) {
      this.filterData.rows = val;
      // this.filterData.rows = '0'
      this.getParcelinfoData(this.filterData);
    },
    handleCurrentChange1(val) {
      console.log("=====zhu======", val);
      this.filterData.page = val;
      this.getParcelinfoData(this.filterData);
    },
    handleCurrentChange2(val) {
      this.filterData.page = val;
      this.getParcelinfoData(this.filterData);
    },
    // handleCurrentChange(val) {
    //   this.searchInfo["page"] = val;
    //   this.searchInfo["rows"] = this.pageSize;
    //   let isBinding = "";
    //   if(this.active == "0"){
    //     isBinding = "1";
    //   }else{
    //     isBinding = "0";
    //   }
    //   this.searchInfo["isBinding"] = isBinding;
    //   this.getParcelinfoData(this.searchInfo);
    // },
    resetFilter() {
      // for (let item in this.filterData) {
      //   this.filterData[item] = "";
      // }
      // this.useDate = [];
      // this.$emit("filterInfo", this.filterData);
      this.nullData();
      this.getParcelinfoData(this.filterData);
    },
    nullData() {
      this.goodsNo = "";
      this.filterData.firstClassUse = "";
      this.filterData.cantonProvince = "";
      this.filterData.cantonCity = "";
      this.filterData.cantonArea = "";
      this.filterData.cantonProvinceName = "";
      this.filterData.cantonCityName = "";
      this.filterData.cantonAreaName = "";
      this.filterData.publishStatusName = "";
    },
    // 土地用途筛选
    publishStatusSelect(dic, publishStatusName, event) {
      console.log(this.$refs);
      this.filterData.firstClassUse = this.$refs[
        publishStatusName
      ][0].$attrs.dictKey;
    }
  }
};
</script>
<style scoped>

.dialogBtn_box {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.titleHoverStyle:hover {
  color: #4772d5 !important;
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
</style>
