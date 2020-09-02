<template>
  <div class="page-body" id="userManage">
    <div class="filter_wrap" :style="{'paddingTop':'10px','borderRight':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)','borderLeft':'1px solid rgb(224, 224, 224)'}">
      <div class="switchHeight_box">
        <el-row>
            <el-col :span="2">
            <span class="filter_title">所属机构:</span>
          </el-col>
          <el-col :span="3">
            <el-cascader
              expand-trigger="hover"
              :options="orgdata"
              size="small"
              v-model="searchselectdefall"
              :show-all-levels="false"
              :change-on-select="true"
              @change="saerchhandleChange">
            </el-cascader>
          </el-col>
          <el-col :span="2">
            <span class="filter_title">关键字:</span>
          </el-col>
          <el-col :span="3">
            <el-input size="small" v-model="searchInfo.username" placeholder="账号/名字/手机号"></el-input>
          </el-col>
          <el-col :span="2">
            <el-select size="small" style="padding-left:10px;" v-model="searchInfo.usetype" placeholder="请选择">
              <el-option  label="全部"   value=""></el-option>
              <el-option  label="后台"   value="0"></el-option>
              <el-option  label="前端"  value="1"></el-option>
            </el-select>
          </el-col>
          <el-col :span="1">
            <div class="button_bg" @click="getsearchuser">查询</div>
          </el-col>
          <el-col :span="1">
            <div class="button_default" @click="resetsearchuser">重置</div>
          </el-col>
          <div class="oper">
            <span v-for="(button ,index)  in buttons" :key="index">
              <span  v-if="button.resourceId=='user_view'" class="button_bg" @click="showsingleuser">查看</span>
              <!-- <span  v-if="button.resourceId=='user_add'" class="button_bg" @click="AddFlowpatreason">新增</span>
              <span  v-if="button.resourceId=='user_edit'" class="button_bg" @click="editFlowpatreason">修改</span> -->
              <span  v-if="button.resourceId=='user_delete'" class="button_bg" @click="handleDelete">删除</span>
              <!-- <span  v-if="button.resourceId=='user_restpsd'" class="button_bg" @click="initPwd">密码重置</span>
              <span  v-if="button.resourceId=='user_role'" class="button_bg" @click="roleseting">用户角色</span>
              <span  v-if="button.resourceId=='user_baseInfo'" class="button_bg" @click="openmanageInfo">扩展信息</span> -->
            </span>
          </div>
        </el-row>
      </div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            :height="menuListHeight-150"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange"
            v-loading="loading"
            element-loading-text="数据加载中"
            element-loading-background="rgba(255, 255, 255,0.95)"
            @row-click="clickselectrow"
          >
            <el-table-column  type="selection" width="55"></el-table-column>
            <el-table-column  prop="torder" label="序号" min-width="50"></el-table-column>
            <el-table-column  prop="torder" label="主键" min-width="50"></el-table-column>
            <el-table-column prop="username" label="公众号" min-width="110"></el-table-column>

            <el-table-column  prop="realname" label="昵称" min-width="100"></el-table-column>
            <el-table-column prop="telPhone" label="用户标识" min-width="130"></el-table-column>
            <el-table-column prop="sex" label="性别" min-width="50">

              <template slot-scope="scope">

                <span>{{scope.row.sex=='0'?'女':'男'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="orgName" label="城市" min-width="180"></el-table-column>
            <el-table-column prop="userstate" label="订阅状态" min-width="80">
              <template slot-scope="scope">
                <span>{{scope.row.userstate=='1'?'未关注':'已关注'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="订阅时间" min-width="130"></el-table-column>
            <el-table-column prop="img" label="头像地址" min-width="60">
                <template slot-scope="scope">
                    <img style="width:100%;height:70px;" :src="getImgUrl(scope.row.img)" :onerror="defaultImg" />
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
              :page-size="pageSize"
              :current-page="pageNo"
              :total="totalRecord"
            ></el-pagination>
          </div>
    </div>

    <!-- 弹框 -->
    <div>
      <el-dialog :title="savetitle" :visible.sync="dialogFormVisible">
        <el-container>
            <el-aside width="150px">
               <p>头像地址</p>
              <el-upload
                  :disabled='edit'
                  class="avatar-uploader"
                  action="/epf-document/document/upload"
                  name="files"
                  :show-file-list="false"
                  :http-request="userUploadFile"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" width="150px">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-aside>
            <el-main>
                <el-form :model="singleuser" :rules="rules" ref="ruleForm">
                  <el-form-item label='主键' :label-width="formLabelWidth" prop="torder">
                      <el-input v-model="singleuser.torder" auto-complete="off" :disabled='edit'  style="width:300px;"></el-input>
                  </el-form-item>
                  <el-form-item label='公众号' :label-width="formLabelWidth" prop="username">
                    <el-input v-model="singleuser.username" auto-complete="off" :disabled='add'  style="width:300px;"></el-input>
                  </el-form-item>
                  <el-form-item label='昵称' :label-width="formLabelWidth" prop="realname">
                    <el-input v-model="singleuser.realname" auto-complete="off" :disabled='edit'  style="width:300px;"></el-input>
                  </el-form-item>
                  <el-form-item label='用户标识' :label-width="formLabelWidth" prop="telPhone">
                    <el-input v-model="singleuser.telPhone" auto-complete="off" :disabled='edit' style="width:300px;"></el-input>
                  </el-form-item>
                  <el-form-item label='国家' :label-width="formLabelWidth" prop="">
                    <el-input  auto-complete="off" :disabled='edit' style="width:300px;"></el-input>
                  </el-form-item>
                  <el-form-item label='城市' :label-width="formLabelWidth" prop="orgName">
                    <el-cascader :disabled='edit'
                      expand-trigger="hover"
                      :options="orgdata"
                      :show-all-levels="false"
                      v-model="slectdefall"
                      :change-on-select="true"
                      @change="handleChange">
                    </el-cascader>

                  </el-form-item>
                  <el-form-item label='备注' :label-width="formLabelWidth" prop="">
                    <el-input  auto-complete="off" :disabled='edit' style="width:300px;"></el-input>
                  </el-form-item>
                  <el-form-item label='语言' :label-width="formLabelWidth" prop="">
                    <el-input  auto-complete="off" :disabled='edit' style="width:300px;"></el-input>
                  </el-form-item>
                  <el-form-item label='省份' :label-width="formLabelWidth" prop="">
                    <el-input  auto-complete="off" :disabled='edit' style="width:300px;"></el-input>
                  </el-form-item>
                  <el-form-item label='性别' :label-width="formLabelWidth" prop="sex">
                    <el-switch
                        :disabled='edit'
                        style="margin-left:20px;"
                        v-model="singleuser.sex"
                        active-color="#13ce66"
                        inactive-color="#b9ccfd"
                         active-value="0"
                        inactive-value="1"
                        active-text="女"
                        inactive-text="男">
                      </el-switch>

                  </el-form-item>

                  <el-form-item label='订阅状态' :label-width="formLabelWidth" prop="userstate">

                     <el-tooltip :content="singleuser.userstate=='1'?'已禁用':'正常'" placement="top">
                        <el-switch
                          :disabled='edit'
                          style="margin-left:20px;"
                          v-model="singleuser.userstate"
                          inactive-color="#13ce66"
                          active-color="#ff4949"
                          active-value="1"
                          inactive-value="0">
                        </el-switch>
                      </el-tooltip>
                  </el-form-item>
                   
                </el-form>
         </el-main>
        </el-container>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>

          <el-button v-if="!add || !edit" type="primary" @click="saveuserinfo('ruleForm')">保存</el-button>
        </div>
      </el-dialog>

    </div>

  </div>
</template>
<script>
import qs from "qs";
import transferTable from "@/components/transferTable";
import Axios from "axios";
import { constants } from "zlib";

export default {
  name: "userManage",
  components: {
    transferTable
  },

  data() {
    var validataPhone = (rule, value, callback) => {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(value)) {
        callback(new Error("请输入正确的手机号格式"));
      } else {
        callback();
      }
    };

    return {
      //扩展信息参数
      dialogManageInfo: false,
      usermanageInfo: {},
      sexoptions: [{ value: "男", label: "男" }, { value: "女", label: "女" }],
      loading: true,

      defaultProps: {
        children: "children",
        label: "label"
      },

      menuListHeight: 100,
      txtVal: 0,
      searchselectdefall: [],
      slectdefall: [],
      formLabelWidth: "120px",
      dialogFormVisible: false,
      dialogFormroleVisible: false,
      rolelist: [],
      selectrows: [],
      tableData: [],
      multipleSelection: [],
      handleDataError: [],
      howProvince: true,

      value: "",

      handleData: "",
      singleuser: {},
      selectGroups: [],
      imageUrl: "",
      add: false,
      savetitle: "新增账号",
      edit: false,
      dialogForm: false,
      dialogTable: false,
      dialogTest: false,
      pageNo: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: { usetype: "" },
      labelPosition: "right",

      orgdata: [],
      tenantItems: [],

      //按钮组、主题
      buttons: [],
      theme_BackgroundColor: "",
      theme_TextColor: "",
      //  编辑 表单验证
      rules: {
        username: [
          {  message: "账号不能为空", trigger: "blur" }
        ],
        realname: [
          {  message: "姓名不能为空", trigger: "blur" }
        ],
        telPhone: [
          {  message: "手机号不能为空", trigger: "blur" },
          { validator: validataPhone, trigger: "blur" }
        ],
        email: [
          {
            pattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
            message: "格式有误，请重新输入",
            trigger: "change"
          }
        ],
        defaultImg:
        'this.src="' + require("../../../../assets/icon-nodata.png") + '"' //默认图地址npm
      }
    };
  },
  created() {
    this.menuListHeight = window.innerHeight - 245;
    this.searchInfo["page"] = this.pageNo;
    this.searchInfo["rows"] = this.pageSize;
    this.buttons = JSON.parse(localStorage.getItem("userManage"));
    this.theme_BackgroundColor = localStorage.getItem("theme_BackgroundColor");
    this.theme_TextColor = localStorage.getItem("theme_TextColor");

    this.getUserList(this.searchInfo);
    this.getGrowpList({});
    this.getTenantlist();
  },
  mounted() {
    this.$bus.$on("themChange", val => {
      this.theme_BackgroundColor = val.menuBackgroundColor;
      this.theme_TextColor = val.textColor;
    });
  },
  methods: {
    openmanageInfo() {
      var that = this;
      if (that.selectGroups.length != 1) {
        that.$message.warning("请选择一条数据！");
        return;
      }
      that.dialogManageInfo = true;
      let id = "";
      id = that.selectGroups[0].id;
      var params = { id: id };
      that.$post("/epf-admin/admin/user/getUserManage", params).then(res => {
        if (res.code != "0") {
          that.$message.error(res.msg); //失败
          return;
        }
        that.usermanageInfo = res.user;
        if (res.user.iconImg) {
          that.imageUrl = getImgUrl(res.user.iconImg);
        } else {
          that.imageUrl = "";
        }
      });
    },
    saveusermanage() {
      var that = this;

      that
        .$post(
          "/epf-admin/admin/sysusermanage/editSysUserManage",
          that.usermanageInfo
        )
        .then(res => {
          if (res.code != "0") {
            that.$message.error(res.msg); //失败
            return;
          }
          that.that.dialogManageInfo = false;
          that.$message.success("保存成功！"); //失败
        });
    },
    roleOnchange(e) {
      this.selectrows = e;
      console.log(e);
    },
    clickselectrow(row, column, event) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    getCheckedKeys(e) {
      var that = this;
      if (that.selectGroups.length != 1) {
        that.$message.warning("请选择一条数据！");
        return;
      } else {
        var id = "";
        for (var i = 0; i < that.selectrows.length; i++) {
          if (i == 0) {
            id = id + that.selectrows[i];
          } else {
            id = id + "," + that.selectrows[i];
          }
        }
        var params = { userId: that.selectGroups[0].id, roleids: id };
        console.log(params);
        that
          .$get("/epf-admin/admin/userRole/setRoleByOwner", params)
          .then(res => {
            if (res.code != "0") {
              that.$message.error(res.msg); //失败
              return;
            }
            that.$message.success("保存成功！");
            that.dialogFormroleVisible = false;
          });
      }
    },
    roleseting() {
      var that = this;

      if (that.selectGroups.length != 1) {
        that.$message.warning("请选择一条数据！");
        return;
      } else {
        let id = "";
        id = that.selectGroups[0].id;
        var params = { orgId: id };
        that.$get("/epf-admin/admin/role/getRoleAllList", params).then(res => {
          if (res.code != "0") {
            that.$message.error(res.msg); //失败
            return;
          }
          console.log(res);
          that.rolelist = res.rolelist;
          var userRole = res.userRole;
          var selectrows = [];

          if (userRole != null) {
            for (var i = 0; i < userRole.length; i++) {
              selectrows.push(userRole[i].roleId);
            }
          }
          that.selectrows = selectrows;
        });
      }
      that.dialogFormroleVisible = true;
    },
    saerchhandleChange(value) {
      this.searchInfo.orgId = value[value.length - 1];
    },
    handleChange(value) {
      console.log(value);
      this.singleuser.orgId = value[value.length - 1];
    },
    getsearchuser() {
      this.searchInfo["page"] = 1;
      this.searchInfo["rows"] = this.pageSize;
      this.getUserList(this.searchInfo);
    },
    resetsearchuser() {
      this.searchInfo["page"] = 1;
      this.searchInfo["rows"] = this.pageSize;
      this.searchInfo["orgName"] = "";
      this.searchInfo["orgId"] = "";
      this.searchInfo["username"] = "";
      this.searchInfo["realname"] = "";
      this.searchInfo["usetype"] = "";
      this.searchselectdefall = [];
      this.getUserList(this.searchInfo);
    },
    saveuserinfo(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          var sg = this.singleuser;
          var url = "";
          if (that.add == false && that.edit == false) {
            url = "/epf-admin/admin/user/addUser";
          } else {
            url = "/epf-admin/admin/user/editUser";
          }
          sg.createTime = "";
          that.$post(url, sg).then(res => {
            if (res.code != "0") {
              that.$message.error(res.msg); //失败
              return;
            }
            that.dialogFormVisible = false;
            if (that.add) {
              that.$message.success("修改成功");
            } else {
              that.$message.success("新增成功");
            }
            that.getUserList(that.searchInfo);
          });
        } else {
          this.$message.error("请确保信息填写正确");
          return false;
        }
      });
    },
    handleSelectionChange(val) {
      this.selectGroups = val;
    },
    queryuserifo(id) {
      let that = this;
      var url = "/epf-admin/admin/user/getUser";
      var params = { id: id };
      this.$get(url, params)
        .then(res => {
          that.singleuser = res.user;
          that.imageUrl = that.getImgUrl(res.user.iconImg);
          if (res.user.orgId != "" && res.user.orgId != null) {
            var orgid = [];
            var orgdt = that.orgdata;

            for (var i = 0; i < orgdt.length; i++) {
              if (orgdt[i].value == res.user.orgId) {
                var orgid = [res.user.orgId];
                break;
              }
              if (orgdt[i].children) {
                for (var k = 0; k < orgdt[i].children.length; k++) {
                  if (orgdt[i].children[k].value == res.user.orgId) {
                    var orgid = [orgdt[i].value, orgdt[i].children[k].value];
                    break;
                  }
                  if (orgdt[i].children[k].children) {
                    for (
                      var j = 0;
                      j < orgdt[i].children[k].children.length;
                      j++
                    ) {
                      if (
                        orgdt[i].children[k].children[j].value == res.user.orgId
                      ) {
                        var orgid = [
                          orgdt[i].value,
                          orgdt[i].children[k].value,
                          orgdt[i].children[k].children[j].value
                        ];
                        break;
                      }
                    }
                  }
                }
              }
            }
            that.slectdefall = orgid;
          }
        })
        .catch(res => {
          that.$message.warning(res.msg);
        });
    },
    initPwd() {
      let that = this;
      if (that.selectGroups.length != 1) {
        that.$message.warning("请选择一条数据！");
        return;
      }
      that
        .$confirm("确认要重置密码吗?", "提示", {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          type: "warning",
          center: true
        })
        .then(() => {
          let id = "";
          id = that.selectGroups[0].id;
          var params = { id: id };
          that.$get("/epf-admin/admin/user/initPwd", params).then(res => {
            if (res.code != "0") {
              that.$message.error(res.msg); //失败
              return;
            } else {
              that.$message({
                type: "success",
                message: "重置成功!初始密码：123456"
              });
            }
          });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    showsingleuser() {
      this.savetitle = "账号信息";
      this.add = true;
      this.edit = true;
      this.singleuser = [];
      if (this.selectGroups.length != 1) {
        this.$message.warning("请选择一条数据！");
        return;
      } else {
        let id = "";
        id = this.selectGroups[0].id;
        this.queryuserifo(id);
      }
      this.dialogFormVisible = true;
      this.$refs.ruleForm.clearValidate();
    },
    async getUserList(params) {
      this.loading = true;
      this.$get("/epf-admin/admin/user/getAllUserJson", params).then(res => {
        console.log("===========", res);
        if (res.code != "0") {
          this.$message.error(res.msg); //失败
          this.loading = false;
          return;
        }
        this.pageNo = res.pager.pageNo;
        this.pageSize = res.pager.pageSize;
        this.totalPage = res.pager.totalPage;
        this.totalRecord = res.pager.totalRecord;
        this.tableData = res.pager.results;
        this.loading = false;
      });
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

    AddFlowpatreason() {
      this.savetitle = "新增账号";
      this.add = false;
      this.edit = false;
      this.singleuser = { usetype: "0" };
      this.imageUrl = "";
      this.slectdefall = [];
      this.dialogFormVisible = true;
      this.$refs.ruleForm.clearValidate();
    },
    editFlowpatreason() {
      this.savetitle = "修改账号";
      this.add = true;
      this.edit = false;
      this.singleuser = [];
      if (this.selectGroups.length != 1) {
        this.$message.warning("请选择一条数据！");
        return;
      } else {
        let id = "";
        id = this.selectGroups[0].id;

        this.queryuserifo(id);
      }
      this.dialogFormVisible = true;
      this.$refs.ruleForm.clearValidate();
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
            .$post("/epf-admin/admin/user/deleteUserJson", { id: ids })
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
              that.getUserList(that.searchInfo);
            });
        })
        .catch(() => {});
    },
    handleDetail(item) {
      this.$router.push({
        path: "/landmarkInfoDetail",
        query: { landNo: item.landNo }
      });
    },
    handleExamine(item) {
      this.$router.push({
        path: "/landmarkInfoExamineResult",
        query: { landNo: item.landNo }
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

    handleClick() {},

    handleSizeChange(val) {
      //每页条数改变时触发
      this.pageNo = 1;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = val;
      this.getUserList(this.searchInfo);
    },
    handleCurrentChange(val) {
      //获取当前页
      this.searchInfo["page"] = val;
      this.searchInfo["rows"] = this.pageSize;
      this.getUserList(this.searchInfo);
    },
    getImgUrl(id) {
      return "/api/epf-document/document/downloadById?id=" + id;
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      if (res.state == "FAILURE") {
        this.$message.error("上传失败!");
        return;
      }
      this.imageUrl = this.getImgUrl(res.data[0].id);
      this.singleuser.iconImg = res.data[0].id;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    manageAvatarSuccess(res, file) {
      console.log(res);
      if (res.state == "FAILURE") {
        this.$message.error("上传失败!");
        return;
      }
      this.imageUrl = this.getImgUrl(res.data[0].id);
      this.usermanageInfo.iconImg = res.data[0].id;
    },
    beforemanageUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //  开始上传
    userUploadFile(files) {
      const file = files.file;

      const formData = new FormData();

      formData.append("files", file);

      this.$useAppend("/epf-document/document/upload", formData).then(res => {
        console.log(res);
        files.onProgress(file);
        if (res.state != "SUCCESS") {
          this.$message.error("图片上传失败，请重新上传");
          return null;
        }
        this.usermanageInfo.iconImg = res.data[0].id;
        this.imageUrl =
          "/api/epf-document/document/downloadById?id=" + res.data[0].id;
        files.onSuccess(res);
      });
    },
    //  开始上传
    usermanageUploadFile(files) {
      const file = files.file;

      const formData = new FormData();

      formData.append("files", file);

      this.$useAppend("/epf-document/document/upload", formData).then(res => {
        console.log(res);
        files.onProgress(file);
        if (res.state != "SUCCESS") {
          this.$message.error("图片上传失败，请重新上传");
          return null;
        }
        this.singleuser.iconImg = res.data[0].id;
        this.imageUrl =
          "/api/epf-document/document/downloadById?id=" + res.data[0].id;
        files.onSuccess(res);
      });
    },
    getTenantlist() {
      var that = this;
      that.$post("/epf-admin/admin/Tenantry/tenantItems").then(res => {
        console.log(res);
        if (res.code != "0") {
          that.$message.error(res.msg);
          return;
        }
        if (res.tenantItems == null) {
          that.tenantItems = [];
        } else {
          that.tenantItems = res.tenantItems;
        }
      });
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
  /* float: right; */
  font-weight: normal;
}
.oper span {
  display: inline-block;
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
  right: 8px;
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
.usemngtable {
  width: 100%;
}
.usemngtable td {
  border: 1px solid #b6b6b6;
  line-height: 28px;
}
</style>
