<template>
  <div class="page-body">
    <div class="filter_wrap">
      <div class="switchHeight_box" style="height:85px;">
        <el-row>
          <el-col :span="2">
            <span class="filter_title">标的编号 :</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="params.targetNo" placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="1">
            <span class="filter_title">状态 :</span>
          </el-col>
          <el-col :span="3">
            <el-select v-model="params.status" placeholder="请选择">
              <el-option label="受理中（录件）" value="1"></el-option>
              <el-option label="审核中" value="2"></el-option>
              <el-option label="已审核" value="3"></el-option>
              <el-option label="已公告" value="4"></el-option>
              <el-option label="交易中" value="5"></el-option>
              <el-option label="成交待审核" value="6"></el-option>
              <el-option label="未成交（已流拍）" value="7"></el-option>
              <el-option label="已成交" value="8"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <span class="filter_title">交易中心 :</span>
          </el-col>
          <el-col :span="4">
            <el-select v-model="params.tradingCenter" placeholder="请选择">
              <el-option label="济南市国土局" value="1"></el-option>
              <el-option label="济阳县国土局" value="2"></el-option>
              <el-option label="商河县国土局" value="3"></el-option>
            </el-select>
          </el-col>
          <el-col :span="1">
            <span class="filter_title">经办人 :</span>
          </el-col>
          <el-col :span="4">
            <el-select v-model="params.insertUser" placeholder="请选择">
              <el-option label="李四" value="1"></el-option>
              <el-option label="张三" value="2"></el-option>
              <el-option label="所有赋予该角色的人可选" value="3"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <div class="button_bg" @click="searchList()">查询</div>
          </el-col>
          <el-col :span="2">
            <div class="button_default" @click="clearList()">重置</div>
          </el-col>
        </el-row>
      </div>
      <el-tabs style="margin-top:35px;">
        <div class="toolsTitleBox">
          <span class="toolsTitle">标的信息</span>
          <div class="oper">
            <span @click="handleAdd()">新增</span>
            <span @click="handDelAll()">删除</span>
          </div>
        </div>
        <el-table
          ref="multipleTable"
          :data="transTargetData"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="targetNo" label="标的编号" width="170"></el-table-column>
          <el-table-column prop="beginPrice" label="起始价(万元)" width="170"></el-table-column>
          <el-table-column prop="amount" label="保证金" width="170"></el-table-column>
          <el-table-column prop="statusName" label="地块状态" width="180"></el-table-column>
          <el-table-column prop="tradingCenter" label="交易中心"></el-table-column>
          <el-table-column prop="insertUser" label="经办人" width="160"></el-table-column>
          <el-table-column prop="insertTime" label="创建时间" width="240"></el-table-column>
          <el-table-column label="操作" width="240">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleClick(scope.row)"
                v-if="scope.row.statusName===1"
              >修改</el-button>
              <el-button
                type="text"
                size="danger"
                @click="handleDelete(scope.$index, scope.row)"
                v-if="scope.row.statusName===1"
                style="color: #999999;"
              >删除</el-button>
              <el-button
                type="text"
                size="small"
                @click="handleDetail(scope.row)"
                v-if="scope.row.statusName!==1&&scope.row.statusName!==7&&scope.row.statusName!==8"
              >查看详情</el-button>
              <el-button
                type="text"
                size="small"
                @click="handleResult(scope.row)"
                v-if="scope.row.statusName===8"
              >查看成交结果</el-button>
              <el-button
                type="text"
                size="small"
                v-if="scope.row.statusName===7&&scope.row.Statusliu===1"
              >
                <el-popover placement="bottom" width="450" trigger="click">
                  <el-container>
                    <el-header style="height:40px;">
                      <div class="headerpop">查看流拍原因</div>
                    </el-header>
                    <el-container style="border-top:1px solid rgb(243,243,243); padding:20px;">
                      <el-aside width="70px" style="color:rgb(254,63,68);">流拍原因：</el-aside>
                      <el-main>签了土地转让合同，对方在耕地上建厂房，政府不让建，然后终止合同，问下怎样终止合同？是不是双方口头承认就行</el-main>
                    </el-container>
                  </el-container>
                  <el-button slot="reference" type="text" size="small">查看流拍原因</el-button>
                </el-popover>
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="AddFlowpatreason(scope.row.landNo)"
                v-if="scope.row.Status===7&&scope.row.Statusliu===2"
              >添加流拍原因</el-button>

              <el-button
                type="text"
                size="small"
                @click="handleResult(scope.row.landNo)"
                v-if="scope.row.Status===6||scope.row.Status===8"
              >成交结果</el-button>
              <el-button
                type="text"
                size="small"
                @click="handlePublicityRelease(scope.row)"
                v-if="scope.row.Status===6"
              >公示发布</el-button>
              <el-button
                type="text"
                size="small"
                @click="viewPublicityDetails(scope.row)"
                v-if="scope.row.Status===8"
              >公示详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align:right;margin:22px 0px;">
          <el-pagination
            background
            layout="total,prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
            :current-page="currentPage"
          ></el-pagination>
        </div>
      </el-tabs>
    </div>
    <!-- 弹框 -->
    <div>
      <el-dialog title="添加流拍原因" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="flowpatreasonData">
          <el-form-item label="标的编号：" :label-width="formLabelWidth">
            <el-input
              v-model="flowpatreasonData.landNo"
              autocomplete="off"
              disabled
              style="width:350px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="流拍原因：" :label-width="formLabelWidth">
            <el-input
              style="width:350px;height:100px;"
              type="textarea"
              :rows="4"
              placeholder="请输入流拍原因"
              maxlength="50"
              minlength="0"
              show-word-limit
              autosize
              v-model="flowpatreasonData.textarea"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div class="button_default" @click="dialogFormVisible = false">取消</div>
          <div class="button_bg" @click="dialogFormVisible = false">提交</div>
          <!-- <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import transferTable from "@/components/transferTable";
import Axios from "axios";
import {mapActions, mapState} from 'vuex'

export default {
  name: "landmarkInfo",
  components: {
    transferTable
  },
  data() {
    return {
      //搜索表单
      params: {
        targetNo: "",
        status: "",
        tradingCenter: "",
        insertUser: ""
      },
      //状态列表
      statusList: [],
      //交易中心列表
      tradingCenterList: [],
      //经办人列表
      insertUserList: [],

      //标的列表
      transTargetData: [],

      //页码
      currentPage: 1,
      pageNo: 1,
      pageSize: 15,
      totalPage: 1,
      totalRecord: 1,
      //标的删除接口参数id字符组
      transTargetsIds: "",

      txtVal: 0,
      flowpatreasonData: {
        landNo: "",
        textarea: ""
      },
      formLabelWidth: "120px",
      dialogFormVisible: false,
      textarea: "",
      visible2: false,

      multipleSelection: [],
      handleDataError: [
        {
          type: "primary",
          title: "查看审核结果"
        }
      ],
      filterData: {
        title: "",
        infoId: "",
        flowType: "",
        type: "",
        start: "",
        end: "",
        max: "",
        min: ""
      },
      isShowProvince: true,
      temp: {
        address__province: "",
        address__city: "",
        address__dist: ""
      },

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

      searchInfo: {},
      tableData1: [],

      form: {
        assessor: "",
        opinion: ""
      }
    };
  },
  mounted() {
    this.getTransTargetList();
  },
  methods: {
    ...mapActions(['setTabsList']),
    //获取标的列表
    async getTransTargetList() {
      let res = await this.$get(
        `/epf-trade/admin/transtarget/getTransTargetList?page=${
          this.pageNo
        }&rows=${this.pageSize}&targetNo=${this.params.targetNo}&status=${
          this.params.status
        }&tradingCenter=${this.params.tradingCenter}&insertUser=${
          this.params.insertUser
        }`
      );
      console.log(res);
      if (res.code == "0") {
        this.transTargetData = res.pager.results;
        this.pageNo = res.pager.pageNo;
        this.pageSize = res.pager.pageSize;
        this.totalPage = res.pager.totalPage;
        this.totalRecord = res.pager.totalRecord;
      } else {
        this.$message.error(res.msg); //失败
        return;
      }
    },
    //清除筛选条件
    clearList() {
      (this.params.targetNo = ""),
        (this.params.status = ""),
        (this.params.tradingCenter = ""),
        (this.params.insertUser = "");
      this.getTransTargetList();
    },
    //搜索
    searchList() {
      this.getTransTargetList();
    },
    // 单量删除handleDelete
    handDelAll(row) {
      this.$confirm("确认删除该标的信息，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.$post(
            `/epf-trade/admin/transtarget/deleteTransTarget/`,
            { transTargetsIds: row }
          );
          console.log(res);
          if (res.code == "0") {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getTransTargetList();
          } else {
            this.$message.error(res.msg); //失败
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // //批量删除
    // handDelAll() {
    //   for (let i = 0; i < this.multipleSelection.length; i++) {
    //     let val = this.multipleSelection;
    //     val.forEach((val, index) => {
    //       this.transTargetData.forEach((v, i) => {
    //         if (val.targetNo === v.targetNo) {
    //           this.transTargetData.splice(i, 1);
    //         }
    //       });
    //     });
    //   }
    // },
    // //批量删除
    // handDelAll() {
    //   for (let i = 0; i < this.multipleSelection.length; i++) {
    //     let val = this.multipleSelection;
    //     val.forEach((val, index) => {
    //       this.transTargetData.forEach((v, i) => {
    //         if (val.targetNo === v.targetNo) {
    //           this.transTargetData.splice(i, 1);
    //         }
    //       });
    //     });
    //   }
    // },

    //标的新增
    handleAdd() {
      console.log("sssssssssssssssssssssssssssssssssssssss",title)
      // let routerPath='landmarkInfoAdd'
      // let title='新增标的信息'
      // let tabObj = {title,routerPath}
      // this.setTabsList(tabObj)
      // this.$router.push({path:routerPath})
    },
    //添加流拍原因
    AddFlowpatreason(item) {
      this.flowpatreasonData.landNo = item;
      this.dialogFormVisible = true;
    },
    //公示详情
    viewPublicityDetails(item) {
      this.$router.push({ path: "/publicityDetails", query: { landNo: item } });
    },
    // 公示发布
    handlePublicityRelease(item) {
      this.$router.push({ path: "/publicityRelease", query: { landNo: item } });
    },
    //查看成交结果
    handleResult(item) {
      this.$router.push({
        path: "/landmarkInfoDealresult",
        query: { targetNo: item }
      });
    },
    //查看详情
    handleDetail(item) {
      console.log(item);
      this.$router.push({
        path: "/landmarkInfoDetail",
        query: { id: item.id }
      });
    },

    handleExamine(item) {
      this.$router.push({
        path: "/landmarkInfoExamineResult",
        query: { targetNo: item.targetNo }
      });
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
    //修改
    handleClick() {},
    // getTransferPlace(params) {
    //   console.log(params);
    //   Axios.get("/epf-supply/tlandSearch/getListTLandSearch", {
    //     params: params
    //   }).then(res => {
    //     this.pageNo = res.pager.pageNo;
    //     this.pageSize = res.pager.pageSize;
    //     this.totalPage = res.pager.totalPage;
    //     this.totalRecord = res.pager.totalRecord;
    //     console.log(res);
    //     this.tableData1 = res.pager.results;
    //   });
    // },
    // handleEdit(index, row, btnText) {
    //   if (btnText === "审核") {
    //     this.dialogForm = true;
    //   }
    // },
    handleSizeChange(val) {
      //每页条数改变时触发
      this.pageNo = 1;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = val;
      this.getTransTargetList(this.searchInfo);
    },
    handleCurrentChange(val) {
      //获取当前页
      this.searchInfo["page"] = val;
      this.searchInfo["rows"] = this.pageSize;
      this.getTransTargetList(this.searchInfo);
    }
  },
  created() {
    this.getTransTargetList();
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
.dialog-footer {
  display: flex;
  justify-content: center;
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
.el-table__body tr td:nth-child(2) .cell {
  color: rgb(70, 113, 213);
}
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
</style>
