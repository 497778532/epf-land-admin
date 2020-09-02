<template>
  <!-- 2019-5-7 徐仕霖-->
  <!-- 求购地块信息 -->
  <div class="page-body">
    <div class="filter_wrap">
      <needPersonalFiltrate @filterInfo="getFilterData"></needPersonalFiltrate>
      <div class="switchHeight_box" style="padding-top:0">
        <div class="toolsTitleBox">
          <span class="toolsTitle">求购地块信息</span>
          <span class="button_export" @click="xlsExport">导出</span>
        </div>
        <el-table
          :data="tableData1"
          v-loading="loading"
          element-loading-text="数据加载中"
          element-loading-background="rgba(255, 255, 255,0.95)"
          border
          style="width: 100%;min-height: 160px;"
        >
          <el-table-column
            prop="number"
            label="序号"
            min-width="50"
            align="center"
          >
            <template slot-scope="scope">
              <span style="text-align:center;cursor:pointer;">{{
                scope.$index + 1
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="publishNo"
            label="信息发布编号"
            min-width="170"
            align="left"
          >
            <template slot-scope="scope">
              <span
                @click="seeMes(scope.row.id, scope.$index)"
                style="text-align:center;cursor:pointer;color:#4772d5;"
                >{{ scope.row.publishNo }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="infoTitle"
            label="信息标题"
            min-width="250"
            align="left"
            @click="opendetail()"
          >
            <template slot-scope="scope">
              <span style="text-align:center;cursor:pointer;">{{
                scope.row.title
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="demandName"
            label="需求类型"
            min-width="120"
            align="left"
          >
          </el-table-column>
          <el-table-column
            prop="insertTime"
            label="发布时间"
            min-width="150"
            align="left"
          >
          </el-table-column>
          <el-table-column
            prop="statusName"
            label="发布状态"
            min-width="100"
            align="left"
          >
          </el-table-column>
          <el-table-column
            prop="contact"
            label="申请人"
            min-width="100"
            align="left"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="联系人电话"
            min-width="130"
            align="left"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="220" align="left">
            <template slot-scope="scope">
              <span
                v-if="scope.row.status == 'published'"
                class="downInfo"
                @click="examine(scope.row.id, scope.$index)"
                >下架</span
              >
              <span class="downInfo" @click="seeMes(scope.row.id, scope.$index)"
                >查看</span
              >
            </template>
          </el-table-column>
        </el-table>

        <el-dialog
          title="提示"
          width="30%"
          :visible.sync="dialogForm"
          :append-to-body="true"
          style="margin-top:10vh;"
        >
          <h3
            style="text-align:center;margin:0;font-weight:normal;font-size:20px;width:95%;"
          >
            <i
              class="el-icon-warning"
              style="font-size:20px;color:#f2a824;"
            ></i>
            提示
          </h3>
          <p style="margin:10px 0 3px 0;text-align:center;">
            信息下架后，信息将不在门户网显示
          </p>
          <p style="margin:0;text-align:center;">确认下架吗？</p>
          <div class="dialogBtn_box">
            <span
              style="border:1px solid #e2e2e2;padding:5px 20px;margin:0 10px;border-radius:5px;cursor:pointer;"
              @click="dialogForm = false"
              >取消</span
            >
            <span
              style="border:1px solid #ff9f0d;background:#ff9f0d;padding:5px 20px;color:#fff;margin:0 10px;border-radius:5px;cursor:pointer;"
              @click="lowerLand"
              >确认</span
            >
          </div>
        </el-dialog>

        <el-dialog
          title="需求详情"
          width="70%"
          :visible.sync="massifPopup"
          :append-to-body="true"
          style="margin-top:10vh;"
        >
          <div class="supplyLand_top_right">
            <p
              style="font-weight:800;font-size:18px;color:#333;margin-bottom:26px;"
            >
              {{ tPurchase.title }}
            </p>
            <table
              width="100%"
              border="1"
              cellpadding="0"
              cellspacing="0"
              bordercolor="#eeeeee"
            >
              <tr height="46px">
                <td>
                  <span style="font-size:14px;color:#999;margin-left:10px;"
                    >行政区域：</span
                  >
                  {{ tPurchase.cantonProvinceName }}{{ tPurchase.cantonCityName
                  }}{{ tPurchase.cantonAreaName }}
                </td>
                <td>
                  <span style="font-size:14px;color:#999;margin-left:10px;"
                    >使用时间：</span
                  >
                  {{ tPurchase.useBeginDate }} - {{ tPurchase.useEndDate }}
                </td>
                <td>
                  <span style="font-size:14px;color:#999;margin-left:10px;"
                    >土地用途：</span
                  >
                  {{ tPurchase.firstClassUseName }} -
                  {{ tPurchase.secondClassUseName }}
                </td>
                <td>
                  <span style="font-size:14px;color:#999;margin-left:10px;"
                    >土地面积：</span
                  >
                  {{ tPurchase.area ? tPurchase.area + "平方米" : "" }}
                </td>
              </tr>
              <tr height="46px">
                <td>
                  <span style="font-size:14px;color:#999;margin-left:10px;"
                    >意向价格：</span
                  >
                  {{
                    tPurchase.price
                      ? "¥" + Division(tPurchase.price) + " 万元"
                      : "面议"
                  }}
                </td>
                <td>
                  <span style="font-size:14px;color:#999;margin-left:10px;"
                    >使用年限：</span
                  >
                  {{ tPurchase.years ? tPurchase.years + "年" : "" }}
                </td>
                <td colspan="2">
                  <span style="font-size:14px;color:#999;margin-left:10px;"
                    >土地位置：</span
                  >
                  {{ tPurchase.location }}
                </td>
              </tr>
              <tr height="46px">
                <td colspan="4">
                  <el-row>
                    <el-col :span="4">
                      <span
                        style="font-size:14px;color:#999;margin-left:10px;line-height:46px;"
                        >联系人：</span
                      >
                      <span v-if="!isLogin">{{ tPurchase.contact }}</span>
                      <span v-else
                        >{{ tPurchase.contact.substring(0, 1) }}***</span
                      >
                    </el-col>
                    <el-col :span="5">
                      <span style="font-size:14px;color:#999;line-height:46px;"
                        >联系电话:</span
                      >
                      <span v-if="!isLogin">{{ tPurchase.phone }}</span>
                      <span v-else
                        >{{ tPurchase.phone.substring(0, 3) }}****{{
                          tPurchase.phone.substring(7, 11)
                        }}</span
                      >
                    </el-col>
                    <el-col :span="9">
                      <span style="font-size:14px;color:#999;line-height:46px;"
                        >联系地址:</span
                      >
                      <span>{{ tPurchase.address }}</span>
                    </el-col>
                    <el-col :span="7">
                      <p v-if="isLogin">
                        <span class="supplyLandP_active" @click="toLogin"
                          >登录</span
                        >后查看完整信息
                      </p>
                    </el-col>
                  </el-row>
                </td>
              </tr>
              <tr height="46px">
                <td colspan="4">
                  <span style="font-size:14px;color:#999;margin-left:10px;"
                    >需求说明：</span
                  >
                  {{ tPurchase.remark ? tPurchase.remark : "暂无" }}
                </td>
              </tr>
            </table>
          </div>
        </el-dialog>

        <div style="text-align:right;margin:22px 0px;">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5, 10, 15, 20]"
            :current-page="pageNo"
            :page-size="pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import needPersonalFiltrate from "@/components/needPersonalFiltrate";
import transferTable from "@/components/transferTable";
import Axios from "axios";
import qs from "qs";
import { mapActions, mapState } from "vuex";
export default {
  name: "needBuyPlace",
  components: {
    needPersonalFiltrate,
    transferTable
  },
  data() {
    return {
      tPurchase: {
        img: "",
        isCollect: 0,
        title: "",
        demand: "",
        phone: "",
        contact: "",
        cantonProvinceName: "",
        cantonCityName: "",
        cantonAreaName: "",
        useBeginDate: "",
        useEndDate: "",
        firstClassUseName: "",
        secondClassUseName: "",
        location: "",
        remark: "",
        location: "",
        area: "",
        price: "",
        years: "",
        address: ""
      },
      isLogin: false,
      massifPopup: false, //
      activeTabs: "pending",
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
      dialogTest: false,
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: {},
      tableData1: [],
      labelPosition: "right",
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
      loading: false,
      landData: ""
    };
  },
  created() {
    if (this.create) {
      return null;
    }
    this.create = true;
    this.handleData = this.handle;
    let userToken = sessionStorage.getItem("token");
    this.getTransferPlace({
      token: userToken,
      page: this.pageNo,
      rows: this.pageSize
    });
  },
  methods: {
    xlsExport() {
      //2019-7-31hjy
      debugger;
      var btn = document.createElement("a");
      btn.setAttribute("download", ""); // download属性
      btn.setAttribute(
        "href",
        "/api/epf-supply/tpurchase/wantBuyXls?demand=need_buy"
      ); // href链接
      btn.click(); // 自执行点击事件
    },
    ...mapActions(["setTabsList"]),
    getDataList() {},
    getTransferPlace(params) {
      this.loading = true;
      //接口调用
      params["demand"] = "need_buy";
      this.$get("/epf-supply/admin/tpurchase/getTPurchaseForBack", params).then(
        res => {
          if (res.code != 0) {
            this.$message.error(res.msg);
            this.loading = false;
            return;
          }
          function getChangeDate(date) {
            return (
              date.getFullYear() +
              "-" +
              (date.getMonth() + 1) +
              "-" +
              date.getDate() +
              "  " +
              date.getHours() +
              ":" +
              date.getMinutes() +
              ":" +
              date.getSeconds()
            );
          }
          let result = res.pager["results"].map((item, index) => {
            item.insertTime =
              item.updateTime == null ? item.insertTime : item.updateTime;
            return item;
          });
          console.log(res);
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
          this.tableData1 = res.pager.results;
          this.loading = false;
        }
      );
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
    autoExamine() {},
    getFilterData(val) {
      console.log("===========", val);
      this.searchInfo = val;
      this.searchInfo["page"] = 1;
      this.searchInfo["rows"] = this.pageSize;
      this.getTransferPlace(this.searchInfo);
    },
    lowerLand() {
      this.dialogForm = false;
      this.$post("/epf-supply/admin/tpurchase/downMyPurchase", {
        purchaseId: this.currentLandId,
        status: "down_mytpurchase"
      }).then(res => {
        if (res.code != "0") {
          //失败
          this.$message.error(res.msg);
          return;
        }
        this.dialogForm = false;
        this.$message.success(res.msg);
        let userToken = sessionStorage.getItem("token");
        this.getTransferPlace({
          token: userToken,
          page: 1,
          rows: this.pageSize
        });
      });
    },
    seeMes(id, index) {
      function getChangeDate(date) {
        return (
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate()
        );
      }
      this.tPurchase = {};
      this.massifPopup = true;
      this.$get("/epf-supply/tpurchase/getTPurchase?id=" + id).then(res => {
        if (
          res.tPurchase.useBeginDate == "" ||
          res.tPurchase.useBeginDate == null
        ) {
          res.tPurchase.useBeginDate = "";
        } else {
          res.tPurchase.useBeginDate = getChangeDate(
            new Date(res.tPurchase.useBeginDate)
          );
        }
        if (
          res.tPurchase.useEndDate == "" ||
          res.tPurchase.useEndDate == null
        ) {
          res.tPurchase.useEndDate = "";
        } else {
          res.tPurchase.useEndDate = getChangeDate(
            new Date(res.tPurchase.useEndDate)
          );
        }

        this.tPurchase = res.tPurchase;
        let params = {
          demand: res.tPurchase.demand == 1 ? "求租" : "求购",
          cantonProvince: res.tPurchase.cantonProvince,
          cantonCity: res.tPurchase.cantonCity,
          cantonArea: res.tPurchase.cantonArea,
          firstClassUse: res.tPurchase.firstClassUse,
          secondClassUse: res.tPurchase.secondClassUse
        };
        this.$get(
          "/epf-supply/tsell/getListDemandSimilarityRecommend",
          params
        ).then(data => {
          this.landData = data.pager.results;
        });
      });
    }
  }
};
</script>
<style scoped>
.downInfo {
  font-size: 12px;
  cursor: pointer;
  color: #2a4fd4;
}
.dialogBtn_box {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
