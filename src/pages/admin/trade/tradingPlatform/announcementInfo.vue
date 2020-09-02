<template>
  <div class="page-body">
    <!-- <div class="pageName">1.1 转让地块信息</div> -->
    <el-tabs v-model="activeTabs" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="待受理" name="pending">
        <announcementInfoTabSearch @filterInfo="getFilterData" :typeClose="true"></announcementInfoTabSearch>
        <div class="toolsTitleBox">
          <span class="toolsTitle">公告待处理列表</span>
          <div class="oper">
            <span class="button_default" @click="handleAdd()">新增</span>
            <span @click="handleSubmit()">提交</span>
            <span @click="handleDelete()">删除</span>
          </div>
        </div>
        <div>
          <el-table
            ref="multipleTable"
            :data="announcementData"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="noticeTitle" label="公告标题" width="320" align="center"></el-table-column>
            <el-table-column prop="noticeSerialNumber" label="公告编号" width="320" align="center"></el-table-column>
            <el-table-column prop="noticeType" label="公告类型" width="170" align="center"></el-table-column>
            <el-table-column prop="insertUser" label="申请人" width="170" align="center"></el-table-column>
            <el-table-column label="公告日期" width="200" align="center">
            <template slot-scope="scope">
              {{scope.row.noticeTime?/\d{4}-\d{1,2}-\d{1,2}/g.exec(scope.row.noticeTime)[0]:''}}
            </template></el-table-column>
            <el-table-column prop="noticeState" label="状态" width="170" align="center">
              <template slot-scope="scope">
                <span :class="(scope.row.Status==3)?'success':''"></span>
                <span :class="(scope.row.Status===1||scope.row.Status===2)?'error':''"></span>
                <span :class="(scope.row.Status===4)?'default':''"></span>
                <span>{{scope.row.noticeState}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                <el-button
                  @click="handleDelete(scope.$index, scope.row)"
                  type="text"
                  size="small"
                  class="deltext"
                >删除</el-button>
                <el-button @click="viewDeatil(scope.row)" type="text" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-dialog title="审核" width="30%" :visible.sync="dialogForm" :append-to-body="true">
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="审核结果：">
                <el-radio-group v-model="form.assessor">
                  <el-radio style="margin-left:10px;" label="published2">审核通过</el-radio>
                  <el-radio style="margin-left:10px;" label="audit_failure">审核未通过</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="审核意见：">
                <el-input type="textarea" placeholder="请输入您的审核意见,500字以内" v-model="form.opinion"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="dialogForm = false">取消</el-button>
                <el-button type="primary" @click="examineSure">确定</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
        <div style="text-align:right;margin:8px 0px;">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
            :page-size="pageSize"
            :current-page="pageNo"
          ></el-pagination>
        </div>
      </el-tab-pane>

      <el-tab-pane label="已处理" name="processed">
        <announcementInfoTabSearch @filterInfo="getFilterData"></announcementInfoTabSearch>
        <div class="toolsTitleBox">
          <span class="toolsTitle">公告已处理列表</span>
          <div class="oper">
            <span @click="handleAdd()">新增</span>
            <span @click="handleSubmit()">提交</span>
            <span @click="handleDelete()">删除</span>
          </div>
        </div>
        <div>
          <el-table
            ref="multipleTable"
            :data="announcementData"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="noticeTitle" label="公告标题" width="320" align="center"></el-table-column>
            <el-table-column prop="noticeSerialNumber" label="公告编号" width="320" align="center"></el-table-column>
            <el-table-column prop="noticeType" label="公告类型" width="170" align="center"></el-table-column>
            <el-table-column prop="insertUser" label="申请人" width="170" align="center"></el-table-column>
            <el-table-column label="公告日期" width="200" align="center">
            <template slot-scope="scope">
              {{scope.row.noticeTime?/\d{4}-\d{1,2}-\d{1,2}/g.exec(scope.row.noticeTime)[0]:''}}
            </template></el-table-column>
            <el-table-column prop="noticeState" label="状态" width="170" align="center">
              <template slot-scope="scope">
                <span :class="(scope.row.Status==3)?'success':''"></span>
                <span :class="(scope.row.Status===1||scope.row.Status===2)?'error':''"></span>
                <span :class="(scope.row.Status===4)?'default':''"></span>
                <span>{{scope.row.noticeState}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                <el-button
                  @click="handleDelete(scope.$index, scope.row)"
                  type="text"
                  size="small"
                  class="deltext"
                >删除</el-button>
                <el-button @click="viewDeatil(scope.row)" type="text" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-dialog
            title="提示"
            width="30%"
            :visible.sync="dialogDownLand"
            style="margin-top:10vh;"
            :append-to-body="true"
          >
            <h3 style="text-align:center;margin:0;font-weight:normal;font-size:20px;width:95%;">
              <i class="el-icon-warning" style="font-size:20px;color:#f2a824;"></i> 提示
            </h3>
            <p style="margin:10px 0 3px 0;text-align:center;">信息下架后，信息将不在门户网显示</p>
            <p style="margin:0;text-align:center;">确认下架吗？</p>
            <div class="dialogBtn_box">
              <span
                style="border:1px solid #e2e2e2;padding:5px 20px;margin:0 10px;border-radius:5px;cursor:pointer;"
                @click="dialogDownLand = false"
              >取消</span>
              <span
                style="border:1px solid #ff9f0d;background:#ff9f0d;padding:5px 20px;color:#fff;margin:0 10px;border-radius:5px;cursor:pointer;"
                @click="lowerLand"
              >确认</span>
            </div>
          </el-dialog>
        </div>
        <div style="text-align:right;margin:8px 0px;">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
            :page-size="pageSize"
            :current-page="pageNo"
          ></el-pagination>
        </div>
      </el-tab-pane>

      <el-tab-pane label="我的公告" name="myEntrusted">
        <announcementInfoTabSearch @filterInfo="getFilterData"></announcementInfoTabSearch>
        <div class="toolsTitleBox">
          <span class="toolsTitle">我的公告列表</span>
          <div class="oper">
            <span @click="handleAdd()">新增</span>
            <span @click="handleSubmit()">提交</span>
            <span @click="handleDelete()">删除</span>
          </div>
        </div>
        <div>
          <el-table
            ref="multipleTable"
            :data="announcementData"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="noticeTitle" label="公告标题" width="320" align="center"></el-table-column>
            <el-table-column prop="noticeSerialNumber" label="公告编号" width="320" align="center"></el-table-column>
            <el-table-column prop="noticeType" label="公告类型" width="170" align="center"></el-table-column>
            <el-table-column prop="insertUser" label="申请人" width="170" align="center"></el-table-column>
            <el-table-column label="公告日期" width="200" align="center">
            <template slot-scope="scope">
              {{scope.row.noticeTime?/\d{4}-\d{1,2}-\d{1,2}/g.exec(scope.row.noticeTime)[0]:''}}
            </template></el-table-column>
            <el-table-column prop="noticeState" label="状态" width="170" align="center">
              <template slot-scope="scope">
                <span :class="(scope.row.Status==3)?'success':''"></span>
                <span :class="(scope.row.Status===1||scope.row.Status===2)?'error':''"></span>
                <span :class="(scope.row.Status===4)?'default':''"></span>
                <span>{{scope.row.noticeState}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                <el-button
                  @click="handleDelete(scope.$index, scope.row)"
                  type="text"
                  size="small"
                  class="deltext"
                >删除</el-button>
                <el-button @click="viewDeatil(scope.row)" type="text" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-dialog
            title="提示"
            width="30%"
            :visible.sync="dialogDownLand"
            style="margin-top:10vh;"
            :append-to-body="true"
          >
            <h3 style="text-align:center;margin:0;font-weight:normal;font-size:20px;width:95%;">
              <i class="el-icon-warning" style="font-size:20px;color:#f2a824;"></i> 提示
            </h3>
            <p style="margin:10px 0 3px 0;text-align:center;">信息下架后，信息将不在门户网显示</p>
            <p style="margin:0;text-align:center;">确认下架吗？</p>
            <div class="dialogBtn_box">
              <span
                style="border:1px solid #e2e2e2;padding:5px 20px;margin:0 10px;border-radius:5px;cursor:pointer;"
                @click="dialogDownLand = false"
              >取消</span>
              <span
                style="border:1px solid #ff9f0d;background:#ff9f0d;padding:5px 20px;color:#fff;margin:0 10px;border-radius:5px;cursor:pointer;"
                @click="lowerLand"
              >确认</span>
            </div>
          </el-dialog>
        </div>
        <div style="text-align:right;margin:8px 0px;">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
            :page-size="pageSize"
            :current-page="pageNo"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import announcementInfoTabSearch from "@/components/announcementInfoTabSearch";
import transferTable from "@/components/transferTable";
import Axios from "axios";
import qs from "qs";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    announcementInfoTabSearch,
    transferTable
  },
  data() {
    return {
      activeTabs: "pending",
      currentTabs: "pending",
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
      dialogDownLand: false,
      dialogTable: false,
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
      currentLandId: "",
      currentLandIndex: "",
      create: false,
      announcementDataTitle: [
        { prop: "noticeTitle", title: "公告标题" },
        { prop: "noticeSerialNumber", title: "公告编号" },
        { prop: "noticeType", title: "公告类型" },
        { prop: "transferMode", title: "流转方式" },
        { prop: "noticeTime ", title: "公告日期" },
        { prop: "noticeState", title: "状态" }
      ],
      announcementData: [
        {
          noticeTitle: "济南市国有建设用地二级市场网上挂牌",
          noticeSerialNumber: "济国土资告字（2019）2号",
          noticeType: "普通公告",
          transferMode: "土地出租",
          noticeTime: "2019-01-05",
          Status: 1,
          noticeState: "新增"
        },
        {
          noticeTitle: "济南市国有建设用地二级市场网上挂牌",
          noticeSerialNumber: "济国土资告字（2019）2号",
          noticeType: "普通公告",
          transferMode: "土地出租",
          noticeTime: "2019-01-05",
          Status: 2,
          noticeState: "审核中"
        },
        {
          noticeTitle: "济南市国有建设用地二级市场网上挂牌",
          noticeSerialNumber: "济国土资告字（2019）2号",
          noticeType: "普通公告",
          transferMode: "土地出租",
          noticeTime: "2019-01-05",
          Status: 3,
          noticeState: "已审核"
        },
        {
          noticeTitle: "济南市国有建设用地二级市场网上挂牌",
          noticeSerialNumber: "济国土资告字（2019）2号",
          noticeType: "普通公告",
          transferMode: "土地出租",
          noticeTime: "2019-01-05",
          Status: 4,
          noticeState: "以公告"
        },
        {
          noticeTitle: "济南市国有建设用地二级市场网上挂牌",
          noticeSerialNumber: "济国土资告字（2019）2号",
          noticeType: "普通公告",
          transferMode: "土地出租",
          noticeTime: "2019-01-05",
          Status: 1,
          noticeState: "新增"
        },
        {
          noticeTitle: "济南市国有建设用地二级市场网上挂牌",
          noticeSerialNumber: "济国土资告字（2019）2号",
          noticeType: "普通公告",
          transferMode: "土地出租",
          noticeTime: "2019-01-05",
          Status: 2,
          noticeState: "审核中"
        },
        {
          noticeTitle: "济南市国有建设用地二级市场网上挂牌",
          noticeSerialNumber: "济国土资告字（2019）2号",
          noticeType: "普通公告",
          transferMode: "土地出租",
          noticeTime: "2019-01-05",
          Status: 3,
          noticeState: "已审核"
        },
        {
          noticeTitle: "济南市国有建设用地二级市场网上挂牌",
          noticeSerialNumber: "济国土资告字（2019）2号",
          noticeType: "普通公告",
          transferMode: "土地出租",
          noticeTime: "2019-01-05",
          Status: 2,
          noticeState: "审核中"
        },
        {
          noticeTitle: "济南市国有建设用地二级市场网上挂牌",
          noticeSerialNumber: "济国土资告字（2019）2号",
          noticeType: "普通公告",
          transferMode: "土地出租",
          noticeTime: "2019-01-05",
          Status: 4,
          noticeState: "以公告"
        },
        {
          noticeTitle: "济南市国有建设用地二级市场网上挂牌",
          noticeSerialNumber: "济国土资告字（2019）2号",
          noticeType: "普通公告",
          transferMode: "土地出租",
          noticeTime: "2019-01-05",
          Status: 3,
          noticeState: "已审核"
        },
        {
          noticeTitle: "济南市国有建设用地二级市场网上挂牌",
          noticeSerialNumber: "济国土资告字（2019）2号",
          noticeType: "普通公告",
          transferMode: "土地出租",
          noticeTime: "2019-01-05",
          Status: 4,
          noticeState: "以公告"
        }
      ],

      multipleSelection: [],
      handleDataError: [
        {
          type: "primary",
          title: "查看审核结果"
        }
      ],
      isShowProvince: true,
      noticeSerialNumber: "",
      announcementForm: {
        noticeSerialNumber: "",
        noticeState: "",
        noticeType: "",
        transferMode: ""
      },
      noticeStateoptions: [
        {
          value: "选项1",
          label: "新增"
        },
        {
          value: "选项2",
          label: "审核中"
        },
        {
          value: "选项3",
          label: "已审核"
        },
        {
          value: "选项4",
          label: "已公告"
        }
      ],
      noticeTypeoptions: [
        {
          value: "选项1",
          label: "普通公告"
        },
        {
          value: "选项2",
          label: "变更公告"
        }
      ],
      transferModeoptions: [
        {
          value: "选项1",
          label: "土地转让"
        },
        {
          value: "选项2",
          label: "土地出租"
        }
      ],
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
      totalRecord: 1000,
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
      }
    };
  },
  created() {
    if (this.create) {
      return null;
    }
    this.create = true;
    this.handleData = this.handle;
    let userToken = sessionStorage.getItem("token");
    this.getTransferPlace({ token: userToken, publishStatus: "audit" });
  },
  methods: {
    ...mapActions(["setTabsList"]),
    getTransferPlace(params) {
      params["circulation"] = "transfer";
      params["page"] = params["page"] ? params["page"] : this.pageNo;
      params["rows"] = params["rows"] ? params["rows"] : this.pageSize;
      let userToken = sessionStorage.getItem("token");
      if (this.activeTabs == "pending") {
        params["isAccept"] = "1";
      } else if (this.activeTabs == "processed") {
        params["isAccept"] = "2";
      } else {
        params["isAccept"] = "3";
      }
      this.$get("/epf-trade/admin/transtrustinfo/getAcceptingTrust",params).then(res => {
        console.log(res);

        this.pageNo = res.pager.pageNo;
        this.pageSize = res.pager.pageSize;
        this.totalPage = res.pager.totalPage;
        this.totalRecord = res.pager.totalRecord;
        this.tableData1 = res.pager.results;
        console.log(this.tableData1);
      });
    },

    handleEdit(index, row, btnText) {
      if (btnText === "审核") {
        this.dialogForm = true;
      }
    },
    handleSizeChange(val) {
      //每页条数改变时触发
      this.pageNo = 1;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = val;
      this.getTransferPlace(this.searchInfo);
    },
    handleCurrentChange(val) {
      //获取当前页
      this.searchInfo["page"] = val;
      this.searchInfo["rows"] = this.pageSize;
      this.getTransferPlace(this.searchInfo);
    },
    examine(id, index) {
      this.currentLandId = id;
      this.currentLandIndex = index;
      this.dialogForm = true;
    },
    downLandInfo(id, index) {
      this.currentLandId = id;
      this.currentLandIndex = index;
      this.dialogDownLand = true;
    },
    autoExamine() {},
    examineSure() {
      this.$post(
          "/epf-trade/admin/transgoods/editTransGoods",
         {
            tSellId: this.currentLandId,
            publishStatus: this.form.assessor
          }
        )
        .then(res => {
          if (res.msg != "success") {
            //失败
            this.$message.error(res.msg);
            return;
          }
          this.dialogForm = false;
          this.form.assessor = "";
          this.form.opinion = "";
          this.tableData1.splice(this.currentLandIndex, 1);
          this.$message.success({
            message: "审核完成",
            type: "success"
          });
        });
    },
    handleClick(val) {
      if (val.name == this.currentTabs) {
        return;
      }
      this.currentTabs = val.name;
      this.tableData1 = [];
      if (this.activeTabs == "pending") {
        let userToken = sessionStorage.getItem("token");
        this.getTransferPlace({ token: userToken, publishStatus: "audit" });
      } else {
        let userToken = sessionStorage.getItem("token");
        this.getTransferPlace({ token: userToken, isAuditing: "2" });
      }
    },
    lowerLand() {
      //改变状态
      this.$post(
          "/epf-supply/admin/tsell/editTSellPublishStatus",
          {
            tSellId: this.currentLandId,
            publishStatus: "down_mytsell"
          }
        )
        .then(res => {
          if (res.msg != "success") {
            //失败
            this.$message.error(res.msg);
            return;
          }
          this.dialogDownLand = false;
          this.tableData1[this.currentLandIndex].publishStatus = "down_mytsell";
          this.tableData1[this.currentLandIndex].publishStatusName = "下架";
          this.$message({
            message: "下架完成",
            type: "success"
          });
        });
    },
    rowClickHandle(row, event, column) {
      //需要更改
      console.log("双击行的id", row.id);
      let title = "信息详情";
      let routerPath = "/landmarkInfo";
      let tabObj = { title, routerPath };
      // // //将当前点击的选项添加到vuex中
      this.setTabsList(tabObj);
      this.$router.push({ path: routerPath, query: { supply: row.id } });
      // this.$emit('select', index)
    },
    getFilterData(val) {
      console.log(val);
      this.searchInfo = val;
      this.getTransferPlace(this.searchInfo);
      // this.un_search = val;
      // this.getMyProvide(this.un_search);
    },
    handleAdd() {
      this.$router.push("/announcementInfoAdd");
    },
    handleDelete(index, row) {
      this.$confirm("确认要删除该条信息吗?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
