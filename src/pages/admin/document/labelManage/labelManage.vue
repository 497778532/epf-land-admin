<template>
  <div class="page-body" id="labelManage">
    <div
      class="filter_wrap"
      :style="{'paddingTop':'10px','borderRight':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)','borderLeft':'1px solid rgb(224, 224, 224)'}"
    >
      <div class="switchHeight_box">
        <el-row>
          <el-col :span="2" style="padding-right: 10px;">
            <span class="filter_title">关键字:</span>
          </el-col>
          <el-col :span="3">
            <el-input size="small" v-model="searchInfo.name" placeholder="请输入要搜索的关键词"></el-input>
          </el-col>
          <el-col :span="2" style="padding-right: 10px;">
            <span class="filter_title">标签分类:</span>
          </el-col>
          <el-col :span="2">
            <el-select v-model="searchInfo.doctype" placeholder="请选择">
              <el-option
                v-for="item in orgdata"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>

          <el-col :span="2" style="padding-right: 10px;">
            <span class="filter_title">创建日期:</span>
          </el-col>
          <el-col :span="5">
            <el-date-picker
              v-model="publishdata"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-col>
          <el-col :span="8">
            <div class="oper">
              <span class="button_bg" @click="getsearchuser">搜索</span>
              <span class="button_default" @click="resetsearchuser">重置</span>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-container style="height:auto; margin-top:10px">
        <el-main>
          <el-tabs>
            <el-header style="height:40px;line-height:40px;position:relative" class="m_title">
              <span style="font-weight:bold">标签管理</span>
              <div class="tableHead">
                <!-- <span v-for="(button ,index)  in buttons" :key="index">
                  <span
                    v-if="button.resourceId=='user_edit'"
                    class="button_bg"
                    @click="editFlowpatreason"
                  >编辑</span>
                  <span
                    v-if="button.resourceId=='user_delete'"
                    class="button_bg"
                    @click="handleDelete"
                  >删除</span>
                  <span
                    v-if="button.resourceId=='user_view'"
                    class="button_bg"
                    @click=" addDocument"
                  >新增</span>
                </span> -->

                <span >
                  <span  class="button_bg"
                    @click="editFlowpatreason"
                  >编辑</span>
                  <span class="button_bg"
                    @click="handleDelete"
                  >删除</span>
                  <span class="button_bg"
                    @click=" addDocument"
                  >新增</span>
                </span>
              </div>
            </el-header>
            <el-table
              ref="multipleTable"
              :data="docInfoList"
              :height="menuListHeight-150"
              style="width: 100%"
              border
              @selection-change="handleSelectionChange"
              v-loading="loading"
              element-loading-text="数据加载中"
              element-loading-background="rgba(255, 255, 255,0.95)"
            >
              <el-table-column fixed type="selection" width="55"></el-table-column>
              <el-table-column prop="name" label="标签名称" sortable min-width="230">
                <!-- <template slot-scope="scope">
                  <div class="cell_click" @click="clickselectrow(scope.$index, scope.row)">
                    <div class="docuImg">
                      <img v-if="'png,gif,jpeg,jpg'.indexOf(scope.row.extName.toLowerCase()) != -1  "  :src="'/api/epf-document/document/downloadById?id=' + scope.row.id" >
                      <img v-else :src="require('@/assets/docu/' + scope.row.extName.toLowerCase() + '.png')" >
                    </div>
                   <p class="ellipsis" title="scope.row.name">{{scope.row.name}}</p>
                  </div>
                </template>-->
                <template slot-scope="scope">{{scope.row.name}}</template>
              </el-table-column>

              <el-table-column prop="source" label="标签分类" min-width="100">
                <template slot-scope="scope">{{scope.row.tagType}}</template>
              </el-table-column>
              <el-table-column prop="publishTime" label="创建日期" min-width="100">
                <template slot-scope="scope">{{scope.row.createTime}}</template>
              </el-table-column>
              <el-table-column prop="remark" label="标签说明" min-width="150">
                <template slot-scope="scope">{{scope.row.remark}}</template>
              </el-table-column>
            </el-table>
            <div style="text-align:right;margin:22px 0px;">
              <el-pagination
                background
                layout="prev, pager, next,sizes,jumper"
                :page-sizes="[5,10, 15, 20]"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="pageSize"
                :current-page="pageNo"
                :total="totalRecord"
              ></el-pagination>
            </div>
          </el-tabs>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import transferTable from "@/components/transferTable";
import Axios from "axios";
import { constants } from "zlib";
import configApi from "../../../../../config/index";
import base from "../../../../utils/config.js";
import { mapActions, mapState } from "vuex";

export default {
  name: "labelManage",
  components: {
    transferTable
  },

  data() {
    return {
      publishdata: [],
      input: "",
      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      forderdata: [],
      menuListHeight: 100,
      docInfoList: [],
      parentdata: {},
      pageNodel: 1,
      pageSizedel: 5,
      totalPagedel: 0,
      totalRecorddel: 0,
      loading: false,
      searchselectdefall: [],
      tableData: [],
      value: "",
      selectGroups: [],
      pageNo: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: { usetype: "" },
      orgdata: [
        { value: "doc", label: "文档" },
        { value: "cel", label: "表格" },
        { value: "pdf", label: "pdf" },
        { value: "img", label: "图片" },
        { value: "other", label: "其他" }
      ],
      collectselected: [],
      deletname: "",
    };
  },
  created() {
    this.menuListHeight = window.innerHeight - 245;
    this.searchInfo["page"] = this.pageNo;
    this.searchInfo["rows"] = this.pageSize;
    this.getDocList(this.searchInfo);
  },
  methods: {
    ...mapActions(["setTabsList"]),
    addLevelOne() {
      this.parentdata["id"] = "0";
      const newOrg = { id: "", folderName: "", childForder: [] };
      this.forderdata.push(newOrg);
    },
    loadTree() {
      var that = this;
      this.loading = true;
      that.$post("/epf-document/admin/docfolder/getAllFolderTree").then(res => {
        console.log("数返回", res.ztreeJson);
        that.forderdata = res.ztreeJson;
        this.loading = false;
      });
    },

    //新增标签
    addDocument() {
      console.log(111);
      let that = this;
      let title = "新增标签";
      let routerPath = "/labelAdd";
      let tabObj = { title, routerPath };
      that.setTabsList(tabObj);
      that.$router.push({ path: routerPath, query: { type: 0 } });
    },

    async getDocList(params) {
      var _this = this;
      console.log("publish", _this.publishdata);
      if (_this.publishdata.length > 1) {
        params["starttime"] = _this.publishdata[0];
        params["endtime"] = _this.publishdata[1];
      } else {
        params["starttime"] = "";
        params["endtime"] = "";
      }
      params["type"] = "0";
      _this.loading = true;
      _this
        .$post("/epf-document/admin/doctag/getTagpageJson", params)
        .then(res => {
          console.log("===========", res);
          if (res.code != "0") {
            _this.$message.error(res.msg); //失败
            _this.loading = false;
            return;
          }
          _this.pageNo = res.pager.pageNo;
          _this.pageSize = res.pager.pageSize;
          _this.totalPage = res.pager.totalPage;
          _this.totalRecord = res.pager.totalRecord;
          _this.docInfoList = res.pager.results;
          _this.loading = false;
        });
    },

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    clickselectrow(index, row) {
      // this.$refs.multipleTable.toggleRowSelection(row);
      let that = this;
      let title = "文档浏览";
      let routerPath = "/documentBrowse";
      let tabObj = { title, routerPath };
      that.setTabsList(tabObj);
      that.$router.push({ path: routerPath, query: { row: row } });
    },
    getsearchuser() {
      this.searchInfo["page"] = 1;
      this.searchInfo["rows"] = this.pageSize;
      this.getDocList(this.searchInfo);
    },
    resetsearchuser() {
      this.publishdata = [];
      this.searchInfo["page"] = 1;
      this.searchInfo["rows"] = this.pageSize;
      this.searchInfo["name"] = "";
      this.searchInfo["resource"] = "";
      this.searchInfo["doctype"] = "";
      this.searchInfo["starttime"] = "";
      this.searchInfo["endtime"] = "";
      this.searchselectdefall = [];
      this.getDocList(this.searchInfo);
    },
    handleSelectionChange(val) {
      this.selectGroups = val;
    },
    handleNodeClick(data) {
      console.log(data);
      this.collectselected = data;
    },
    deletsearch() {
      var params = {};
      this.pageNodel = 1;
      params["page"] = this.pageNodel;
      params["rows"] = this.pageSizedel;
      params["name"] = this.deletname;
      this.deldoclist(params);
    },
    deldoclist(params) {
      params["isdel"] = "1";
      this.$get("/epf-document/docdocumentinfo/getTenantDocJson", params).then(
        res => {
          console.log("===========", res);
          if (res.code != "0") {
            this.$message.error(res.msg); //失败
            this.loading = false;
            return;
          }
          this.pageNodel = res.pager.pageNo;
          this.pageSizedel = res.pager.pageSize;
          this.totalPagedel = res.pager.totalPage;
          this.totalRecorddel = res.pager.totalRecord;
          this.tableData = res.pager.results;
        }
      );
    },
    async getGrowpList(params) {
      this.$get("/epf-admin/admin/org/getallOrg", params).then(res => {
        if (res.code != "0") {
          this.$message.error(res.msg); //失败
          return;
        }
        console.log(res);
        var orglist = res.ztreeJson;
        var selecttree = new Array();
        for (var i = 0; i < orglist.length; i++) {
          if (
            orglist[i].parentId == "0" ||
            orglist[i].parentId == "" ||
            orglist[i].parentId == null
          ) {
            var selecttree1 = new Array();
            for (var j = 0; j < orglist.length; j++) {
              if (orglist[j].parentId == orglist[i].id) {
                selecttree1.push({
                  value: orglist[j].id,
                  label: orglist[j].orgName
                });
              }
            }
            for (var j = 0; j < selecttree1.length; j++) {
              var selecttree2 = new Array();
              for (var k = 0; k < orglist.length; k++) {
                if (orglist[k].parentId == selecttree1[j].value) {
                  selecttree2.push({
                    value: orglist[k].id,
                    label: orglist[k].orgName
                  });
                }
              }
              if (selecttree2.length > 0) {
                selecttree1[j].children = selecttree2;
              }
            }

            if (selecttree1.length > 0) {
              selecttree.push({
                value: orglist[i].id,
                label: orglist[i].orgName,
                children: selecttree1
              });
            } else {
              selecttree.push({
                value: orglist[i].id,
                label: orglist[i].orgName
              });
            }
          }
        }

        this.orgdata = selecttree;
      });
    },
    editFlowpatreason() {
      let that = this;
      if (that.selectGroups.length != 1) {
        that.$message.warning("请选择一条数据！");
        return;
      }

      let title = "编辑标签";
      let routerPath = "/labelEdit";
      let tabObj = { title, routerPath };
      that.setTabsList(tabObj);
      that.$router.push({
        path: routerPath,
        query: { type: 1, data: that.selectGroups[0] }
      });
    },
    viewPublicityDetails(item) {
      this.$router.push({ path: "/publicityDetails", query: { landNo: item } });
    },
    handlePublicityRelease(item) {
      this.$router.push({ path: "/publicityRelease", query: { landNo: item } });
    },
    handleResult(item) {
      this.$router.push({
        path: "/landmarkInfoDealresult",
        query: { landNo: item }
      });
    },
    handleAdd() {
      this.$router.push("/landmarkInfoAdd");
    },
    handleDelete() {
      let ids = "";
      let that = this;
      if (that.selectGroups.length < 1) {
        that.$message.warning("请选择要删除的数据！");
        return;
      } else {
        for (var i = 0; i < this.selectGroups.length; i++) {
          ids += this.selectGroups[i].id + ",";
        }
      }
      that
        .$confirm("确认要删除该条信息吗?", "提示", {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          type: "warning",
          center: true
        })
        .then(() => {
          that
            .$post("/epf-document/admin/doctag/delete", { id: ids })
            .then(res => {
              console.log(res);
              if (res.code != "0") {
                that.$message.error(res.msg);
                return;
              }
              that.$message({
                type: "success",
                message: "删除成功!"
              });

              that.searchInfo["page"] = 1;
              that.searchInfo["rows"] = this.pageSize;
              that.getDocList(that.searchInfo);
            });
        })
        .catch(() => {});
    },
    handleClick() {},

    handleSizeChange(val) {
      //每页条数改变时触发
      this.pageNo = 1;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = val;
      this.getDocList(this.searchInfo);
    },
    handleCurrentChange(val) {
      //获取当前页
      this.searchInfo["page"] = val;
      this.searchInfo["rows"] = this.pageSize;
      this.getDocList(this.searchInfo);
    },
    getImgUrl(id) {
      return "/api/epf-document/document/downloadById?id=" + id;
    }
  }
};
</script>
<style scoped>
.el-container {
  height: 300px;
  overflow: auto;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  width: 120px;
  border-radius: 10px;
  height: 120px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
.oper {
  float: right;
  font-weight: normal;
  padding-right: 15px;
}
.oper span {
  display: inline-block;
  margin: 0 !important;
}



.filter_title{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 40px;
}
.switchHeight_box >>> .el-input__inner{
  height: 40px;
  line-height: 40px;
}
.switchHeight_box >>> .el-input__suffix{
  display: flex;
  align-items: center;
}


.docImgBox {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 90px;
  background: rgb(255, 255, 255);
  cursor: pointer;
}
.docImgBox > img {
  object-fit: contain;
  width: 100%;
  height: 90px;
  display: block;
}
.Dangerg {
  width: 140px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.Dangergtn {
  color: #fff;
  background: #f56c6c;
}
.checkBox {
  position: absolute;
  top: 2px;
  left: 2px;
}
.check {
  padding: 0 3px;
  border: 1px solid rgb(192, 192, 192);
  border-radius: 50%;
  background: rgba(240, 240, 240, 0.774);
}
.checked {
  padding: 0 3px;
  border: 1px solid rgb(88, 150, 57);
  border-radius: 50%;
  background: #67c23a;
}
.check i {
  font-size: 10px;
  color: rgb(153, 153, 153);
}
.checked i {
  font-size: 10px;
  color: #fff;
}
.dowld {
  color: #000;
  background: rgb(241, 245, 248);
}

.cardbottom {
  font-size: 16px;
  line-height: 32px;
  text-align: center;
  width: 100%;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(85, 85, 85);
  transition: 0.4s;
  margin-top: 6px;
}
.m_title {
  height: 40px !important;
  line-height: 40px !important;
  padding-left: 30px;
  background: #f2f2f2;
  color: rgb(50, 58, 64);
  font-size: 16px;
}
.el-tree > div {
  margin: 5px 0;
}
.iconList {
  height: 300px;
  background: rgb(255, 213, 213);
  overflow-y: auto;
}
</style>
<style scoped>
.orgManange_List .el-tree-node__content {
  margin-bottom: 5px;
}
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
  right: 8px;
}
.el-table th,
.el-table tr {
  /* border:1px solid #ebeef5; */
}
.el-table__body tr td:nth-child(2) .cell {
  color: rgb(70, 113, 213);
}
.el-table__body tr td:nth-child(2) .cell .cell_click {
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: relative;
}
.docuImg {
  width: 40px;
  height: 40px;
  /* border: 1px solid #ddd; */
  margin-right: 10px;
  display: inline-block;
}
.docuImg img {
  border-radius: 4px;
  width: 100%;
  height: 100%;
}
.ellipsis {
  position: absolute;
  top: 0;
  left: 50px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.filter_wrap >>> .el-table.el-table--fit .cell {
  line-height: 22px !important;
}
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
.usemngtable {
  width: 100%;
}
.usemngtable td {
  border: 1px solid #b6b6b6;
  line-height: 28px;
}

.tableHead {
  /* background-color: #f9fbff;
    padding: 10px 15px; */
  display: inline-block;
  position: absolute;
  right: 1%;
}
.tableHead .el-upload-list {
  display: none !important;
}
.tableHead .el-upload-list--text {
  display: none !important;
}
.tableHead .el-upload-list__item-name {
  display: none !important;
}
.filterIpt {
  position: relative;
  margin-bottom: 10px;
}
.filterIpt i {
  position: absolute;
  right: 1%;
  top: 20%;
  font-size: 20px;
  cursor: pointer;
}
/* 标签 */
.tabs {
  /* border-left: 1px solid #EBEEF5;
  border-right: 1px solid #EBEEF5; */
  padding-left: 2%;
}
.tabs span {
  cursor: pointer;
}
.tabs .blu {
  color: #1587db;
}
.tabs i {
  margin: 0 5px;
}
.tabs .blac {
  color: #aeaeae;
}
</style>
