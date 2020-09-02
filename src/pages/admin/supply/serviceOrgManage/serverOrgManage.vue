<template>
  <!-- 服务机构信息 -->
  <div class="page-body">
    <div class="filter_wrap">
      <serverFiltrate @filterInfo="getFilterData"></serverFiltrate>
      <div class="switchHeight_box" style="padding-top:0">
        <div class="toolsTitleBox">
          <span class="toolsTitle">服务机构列表</span>
          <el-upload
            v-show="false"
            class="upload-demo"
            action="/api/epf-supply/importExcel"
            :before-upload="beforeUpload"
            :on-success="onSuccess"
            name="file"
            multiple
            :file-list="showFileList"
          >
            <el-button
              size="small"
              type="primary"
              id="dr"
              v-show="false"
            ></el-button>
          </el-upload>
          <div>
            <el-button size="small" @click="xlsExport">模板下载</el-button>
            <el-button size="small" @click="clickDR" :disabled="disabled"
              >导入</el-button
            >
            <el-button size="small" @click="addForm">添加</el-button>
          </div>
        </div>
        <!-- <div style="text-align: right;padding:5px 0">
        <el-button size="small" @click="xlsExport">模板下载</el-button>
        <el-button size="small" @click="clickDR" :disabled="disabled">导入</el-button>
        <el-button size="small" @click="addForm">添加</el-button>
      </div> -->
        <el-table
          :data="tableData"
          border
          @row-dblclick="rowClickHandle"
          style="width: 100%"
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
            prop="creditCode"
            label="统一信用代码"
            min-width="180"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="companyName"
            label="机构名称"
            min-width="250"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="companyTypeName"
            label="公司类型"
            min-width="120"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="corporation"
            label="法人名称"
            min-width="100"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="contactPerson"
            label="联系人"
            min-width="80"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="联系电话"
            min-width="120"
            align="left"
          ></el-table-column>
          <el-table-column prop label="营业执照" min-width="100" align="left">
            <template slot-scope="scope">
              <span>
                <img
                  v-if="scope.row.businessLicense"
                  width="50px"
                  height="50px"
                  :src="baseUrl + scope.row.businessLicense"
                />
                <div
                  v-else
                  style="width:50px;height:50px;background:#F0F0F0"
                ></div>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="companyLevelName"
            label="等级"
            min-width="60"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="statusName"
            label="状态"
            min-width="60"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="insertTime"
            label="录入时间"
            min-width="160"
            align="left"
          ></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            min-width="160"
            align="center"
          >
            <template slot-scope="scope">
              <span class="downInfo" @click="editCompanInfo(scope.row.id)"
                >修改</span
              >
              <span
                class="downInfo"
                v-if="scope.row.status == 'company_status-002'"
                @click="
                  startOrStop(scope.row.id, 'company_status-001', scope.$index)
                "
                >启用</span
              >
              <span
                class="downInfo"
                v-if="scope.row.status == 'company_status-001'"
                @click="
                  startOrStop(scope.row.id, 'company_status-002', scope.$index)
                "
                >停用</span
              >
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align:right;margin:8px 0px;">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5, 10, 15, 20]"
            :current-page="pageNo"
            :page-size="pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import serverFiltrate from "@/components/serverFiltrate";
import infoPage from "./addOrg";
// import allRouter from '@/router/allRouter.js'
import baseURL1 from "@/utils/config.js";
import Axios from "axios";
import qs from "qs";
import { mapActions, mapState } from "vuex";
export default {
  name: "serverOrgManage",
  components: {
    serverFiltrate,
    infoPage
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      search: {
        page: 1,
        rows: 5
      },
      tableData: [],
      orgDialog: false,
      baseUrl: "",
      showFileList: [],
      disabled: false
    };
  },
  created() {
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    let param = {
      page: this.pageNo,
      rows: this.pageSize
    };
    this.init(param);
  },
  watch: {
    $route(to, from) {
      this.baseUrl =
        baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
      let param = {
        page: this.pageNo,
        rows: this.pageSize
      };
      this.init(param);
    }
  },
  methods: {
    //模板导出
    xlsExport() {
      //2019-7-31hjy
      debugger;
      var btn = document.createElement("a");
      btn.setAttribute("download", ""); // download属性
      btn.setAttribute("href", "/api/epf-supply/downloadTemp"); // href链接
      btn.click(); // 自执行点击事件
    },
    clickDR() {
      document.getElementById("dr").click();
    },
    beforeUpload(file) {
      //xlsx  xls
      this.disabled = true;
      const isXlsx = file.name.split(".").slice(-1)[0] === "xlsx";
      const isXls = file.name.split(".").slice(-1)[0] === "xls";
      if (!isXlsx && !isXls) {
        this.$message.error("导入数据模板，只能是 xlsx xls 格式!");
        this.disabled = false;
        return false;
      }
    },
    //附件上传成功
    onSuccess(file) {
      //请求接口取错误信息
      this.$get("/epf-supply/importExcelError", {}).then(res => {
        this.init(this.search);
        this.disabled = false;
        if (res.code === 0) {
          let err = res.Error;
          if (err != null) {
            let e = err.split(",");
            // this.$message.error("以下数据导入失败："+err);
            this.$alert(e[0], "统一信用代码已存在", {
              confirmButtonText: "确定",
              callback: action => {
                // this.$message({
                //   type: 'info',
                //   message: `action: ${ action }`
                // });
              }
            });
          } else {
            this.$message.success("所有数据导入成功！！");
          }
        }
      });
    },
    ...mapActions(["setTabsList"]),
    init(params) {
      function getChangeDate(date) {
        return (
          date.getFullYear() +
          "-" +
          handler(date.getMonth() + 1) +
          "-" +
          handler(date.getDate()) +
          "  " +
          handler(date.getHours()) +
          ":" +
          handler(date.getMinutes()) +
          ":" +
          handler(date.getSeconds())
        );
      }
      function handler(time) {
        if (time < 10) {
          return "0" + time;
        }
        return time;
      }
      this.$get(
        "/epf-supply/admin/tserveinstitution/getTServeInstitutionList",
        params
      ).then(res => {
        let result = res.pager["results"].map((item, index) => {
          item.insertTime = getChangeDate(new Date(item.insertTime));
          return item;
        });
        this.tableData = result;
        this.pageNo = res.pager.pageNo;
        this.pageSize = res.pager.pageSize;
        this.totalPage = res.pager.totalPage;
        this.totalRecord = res.pager.totalRecord;
      });
    },
    handleSizeChange(val) {
      //每页条数改变时触发
      this.pageNo = 1;
      this.pageSize = val;
      this.search["page"] = this.pageNo;
      this.search["rows"] = val;
      this.init(this.search);
    },
    handleCurrentChange(val) {
      //获取当前页
      this.search["page"] = val;
      this.search["rows"] = this.pageSize;
      this.init(this.search);
    },
    getFilterData(val) {
      this.search = val;
      this.search["page"] = this.pageNo;
      this.search["rows"] = this.pageSize;
      this.init(this.search);
    },
    rowClickHandle(row, event, column) {
      //   console.log("双击行的id", row.id);
      //   let title = "信息详情";
      //   let routerPath = "/landmarkInfo";
      //   let tabObj = { title, routerPath };
      //   // // //将当前点击的选项添加到vuex中
      //   this.setTabsList(tabObj);
      //   this.$router.push({ path: routerPath, query: { supply: row.id } });
      //   // this.$emit('select', index)
    },
    startOrStop(id, status, index) {
      let params = { id: id, status: status };
      this.$post(
        "/epf-supply/admin/tserveinstitution/updateServeinsStatus",
        params
      ).then(res => {
        if (res.code == "0") {
          this.$message.success(res.msg);
          this.tableData[index].status = status;
          if (this.tableData[index].statusName == "停用") {
            this.tableData[index].statusName = "正常";
          } else {
            this.tableData[index].statusName = "停用";
          }
          return;
        }
        this.$message.warning(res.msg);
      });
    },
    // 添加机构
    addForm() {
      // let routerPath = "/addOrg";
      // let title = "添加服务机构";
      // let tabObj = { title, routerPath };
      // this.setTabsList(tabObj);
      // this.$router.push({ path: routerPath, query: {company:''} });
      this.$router.push({ path: "/addOrg", query: { company: "" } });
    },
    // 修改机构
    editCompanInfo(id) {
      // let routerPath = "/addOrg";
      // let title = "修改服务机构";
      // let tabObj = { title, routerPath };
      // this.setTabsList(tabObj);
      // this.$router.push({path:routerPath, query:{company: id}});
      this.$router.push({ path: "/addOrg", query: { company: id } });
    }
  }
};
</script>
<style scoped>
.toolsTitleBox .el-upload-list {
  display: none !important;
}

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
