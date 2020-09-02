<template>
  <epf-container title='用户管理'>
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
          <div class="epf_toolbar">
            <div class="epf_fr_search" style="text-align: center;">
              <span>机构信息</span>
              <!--<el-input
                placeholder="请输入机构名称"
                v-model="searchInfo.orgKeywords"
                style="padding:5px 15px;">
                <el-button
                  slot="append"
                  @click="queryOrg"
                  icon="el-icon-search"
                  size="small">
                </el-button>
              </el-input>-->
            </div>
          </div>
          <div class="epf_fr_content" :style="{height:boxHeight - 55 +'px'}">
            <orgTree @node-click="selectOrg" ref="orgTree" v-bind:model-param="modelParam"/>
          </div>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
          <div class="epf_toolbar">
              <el-input v-if="selection.length==0"
                        placeholder="请输入姓名、用户名、手机号"
                        v-model="searchInfo.username"
                        style="padding: 5px 15px;width: 400px;left: 20px;">
                <el-button
                  slot="append"
                  @click="queryUser"
                  icon="el-icon-search"
                  size="small">
                </el-button>
              </el-input>
              <button @click="reset" class="epf_btn epf_btn_def"  v-if="selection.length==0">重置</button>
              <button class="epf_btn epf_btn_bg" v-if="selection.length==0" @click="add">新增用户</button>
             <!-- <button class="epf_btn epf_btn_bg" v-if="selection.length==0" @click="userInit">初始化用户</button>-->
              <button class="epf_btn epf_btn_bg" v-if="selection.length==1" @click="edit">修改 </button>
              <button class="epf_btn epf_btn_def" v-if="selection.length>0" @click="initPwd">密码重置</button>
              <button class="epf_btn epf_btn_def" v-if="selection.length==1" @click="roleseting">角色分配</button>
              <button class="epf_btn epf_btn_def" v-if="selection.length>0" @click="del">删除</button>
          </div>
          <div class="epf_fr_content epf_no_border" :style="{height:boxHeight - 55 +'px'}">
            <el-table
              ref="multipleTable"
              :data="userData"
              :height="boxHeight-110"
              width="100%"
              header-row-class-name="header-class"
              border
              highlight-current-row
              @selection-change="checkUser"
              v-loading="loading"
              element-loading-text="数据加载中"
              element-loading-background="rgba(255, 255, 255,0.95)">
              <el-table-column
                type="selection"
                width="35">
              </el-table-column>
              <el-table-column
                sortable
                prop="username"
                label="账号"
                min-width="120">
                <template slot-scope="scope">
                  <div :class="(scope.row.userstate!='1')?'status-name starting':'status-name stop'"></div>
                  <span style="margin-left: 5px;color: #3E84E9">{{scope.row.username}}</span>
                </template>
              </el-table-column>
              <el-table-column sortable prop="realname" label="姓名" min-width="80"></el-table-column>
              <el-table-column sortable prop="sex" label="性别" min-width="60">
                <template slot-scope="scope">
                  <span>{{scope.row.sex=='0'?'女':'男'}}</span>
                </template>
              </el-table-column>
              <el-table-column sortable prop="telPhone" label="手机号" min-width="90"></el-table-column>
              <el-table-column sortable prop="position" label="岗位" min-width="90"></el-table-column>
              <el-table-column sortable prop="regionName" label="隶属区域" min-width="130"></el-table-column>
              <el-table-column sortable prop="orgname" label="所属机构" min-width="150"></el-table-column>
              <el-table-column sortable prop="address" label="地址" min-width="130"></el-table-column>
              <el-table-column sortable prop="email" label="邮箱" min-width="130"></el-table-column>
              <el-table-column
                sortable
                prop="createTime"
                label="创建时间"
                min-width="90">
                <template slot-scope="scope">
                 <span v-if="scope.row.createTime!=null">
                   {{(scope.row.createTime).substring(0,10)}}
                 </span>
                </template>
              </el-table-column>
            </el-table>
            <div style="width: 100%">
              <div style="text-align:left;margin:10px 0px;position:absolute;left:20px;bottom:0;padding: 5px;">
                <div class="status-name starting"></div>
                <span style="margin: 0 5px;">启用</span>
                <div class="status-name stop"></div>
                <span style="margin: 0 5px;">停止</span>
                <span style="position:relative;left:10px;color: red;">温馨提示：用户信息初始化加载是根据登录该用户所属区域及以下所有数据。</span>
              </div>

              <div style="text-align:right;margin:10px 0px;position:absolute;right:0;bottom:0">
                <el-pagination
                  background
                  layout="prev, pager, next,sizes,jumper"
                  :page-sizes="[5,10, 15, 20]"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-size="pager.pageSize"
                  :current-page="pager.pageNo"
                  :total="pager.totalRecord">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 弹框 -->
    <el-dialog
      :title="dialogData.title"
      :visible.sync="dialogData.visible"
      custom-class="dialog-fit"
      append-to-body>
      <component
        v-if="dialogData.comp"
        :is="dialogData.comp"
        :ref="'dialogData.comp'"
        v-bind:model-param="modelParam"
        @closeDialog="closeDialog"
        @refreshData="selectOrg">
      </component>
      <div v-if="!dialogData.comp" v-html="dialogData.content"></div>
      <div v-if="!dialogData.comp">
        <button class="epf_btn epf_btn_bg" @click="ensureDelete"> 确 定</button>
        <button class="epf_btn epf_btn_def" @click="dialogData.visible = false"> 取 消</button>
      </div>
    </el-dialog>
    <!-- 弹框账号配角色 -->
    <el-dialog title="账号角色" :visible.sync="dialogFormroleVisible" append-to-body>
      <el-container>
        <el-main :style="{'max-height':'477px','paddingTop':'10px'}">
          <el-select @change="roleOnchange" v-model="selectrows" multiple placeholder="请选择" style="min-width:100%;">
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-main>
      </el-container>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormroleVisible = false">取 消</el-button>

        <el-button type="primary" @click="getCheckedKeys">保存</el-button>
      </div>
    </el-dialog>
  </epf-container>
</template>
<script>
    import orgTree from '../../components/orgTree';
    import addUser from './add';
    import editUser from './edit';
    import initUser from './init';
    //import userRolse from './rolse';
    export default {
        name: "user",
        components: {
            orgTree,
            addUser,
            editUser,
            initUser
        },
        data() {
            return {
                boxHeight: 700,
                orgSearchData: '', //机构搜索条件
                factor: { page: 1,rows: 10,totalRecord: 1,orgId: ''},
                searchInfo: {username: "", orgId: "",orgKeywords:""},//用户搜索条件
                loading: true, //loading变量
                userData: [],  //用户数据
                dialogData: {//弹框数据
                    visible: false,
                    title: "",
                    comp: "",
                    width: "50%",
                    height:"75%"
                },
                selection: [],
                currentOrg:{},// 左侧点击的机构数据
                currentUser:{},// 单选的用户数据
                ids:[],// 选中的用户主键
                pager: {pageNo:1,pageSize:10}, //分页数据
                modelParam:{},
                dictsObj:{
                    userTypes:[],// 用户类型
                },
                orgKeywords:'',// 机构树查询条件
                dialogFormroleVisible:false,
                menuListHeight: 100,
                rolelist: [],
                userids:"",
                selectrows: [],
                regionalsData: [],
                defaultProps: {children: 'children',label: 'zhCn'},
                curNodeId: '',
                getchoiceregionalsData: {}
            }
        },
        created() {
            this.menuListHeight = window.innerHeight - 245;
            this.boxHeight = window.innerHeight - 250;

        },
        mounted () {
            //把json对象转为json字符串
            var filters = JSON.stringify(this.factor);
            //插入搜索条件
            this.factor['filterData'] = filters;
            this.getListData(this.factor);
        },
        methods: {
            //选择树结构数据
            handleNodeClick(data) {
                this.getchoiceregionalsData=data;
            },
             getListData(params) { //获取获取用户数据
                this.loading = true
                this.$get(this.$API.EPF_ADMIN.USER.queryRegionalsUserPageJson, params).then(res => {
                    this.loading = false;
                    if(res.code != '0'){
                        this.$message.error(res.msg);//失败
                        return;
                    }
                    this.pageNo = res.pager.pageNo;
                    this.pageSize = res.pager.pageSize;
                    this.totalPage = res.pager.totalPage;
                    this.totalRecord = res.pager.totalRecord;
                    this.userData=res.pager.results;
                }).catch(error=>{
                    this.loading = false;
                })
            },
            selectOrg(data) {
                debugger
                this.currentOrg=data;
                this.searchInfo.orgId = data.id;
                this.modelParam["orgId"]=data.id;
                var that = this;
                //把json对象转为json字符串
                var filters = JSON.stringify(this.searchInfo);
                //插入搜索条件
                that.searchInfo['filterData'] = filters;
                this.getListData(this.searchInfo);
            },
            queryUser() {
                this.userData=[];
                this.pager.pageNo = 1;
                this.searchInfo["page"] = this.page;
                this.searchInfo["rows"] = this.rows;
                var that = this;
                //把json对象转为json字符串
                var filters = JSON.stringify(this.searchInfo);
                //插入搜索条件
                that.searchInfo['filterData'] = filters;
                this.getListData(this.searchInfo);
            },
            handleSizeChange(val) {
                debugger
                //每页条数改变时触发
                this.searchInfo["page"] = this.pager.pageNo;
                this.searchInfo["rows"] = val;
                var that = this;
                //把json对象转为json字符串
                var filters = JSON.stringify(this.searchInfo);
                //插入搜索条件
                that.searchInfo['filterData'] = filters;
                this.getListData(this.searchInfo);
            }, handleCurrentChange(val) {
                debugger
                //获取当前页
                this.searchInfo["page"] = val;
                this.searchInfo["rows"] = this.pager.pageSize;
                var that = this;
                //把json对象转为json字符串
                var filters = JSON.stringify(this.searchInfo);
                //插入搜索条件
                that.searchInfo['filterData'] = filters;
                this.getListData(this.searchInfo);
            }, reset() {
                //重置数据
                this.searchInfo = {username: "", orgId: "",orgKeywords:""};
                var that = this;
                //把json对象转为json字符串
                var filters = JSON.stringify(this.searchInfo);
                //插入搜索条件
                that.searchInfo['filterData'] = filters;
                this.getListData(this.searchInfo);
            }, checkUser(selection) {
                this.userids="";
                this.selection = selection;
                //console.log('selection',selection)
                this.modelParam["userId"]=selection[0].id;
                this.ids=[];
                for (let i=0,SIZE=selection!=null?selection.length:0;i<SIZE;i++){
                    this.ids.push({id:selection[i].id});
                    this.userids =selection[i].id;
                }
            },
            //添加用户
            add() {
                this.dialogData = {
                    visible: true,
                    title: "新增用户",
                    comp: "addUser",
                    width: "60%"
                };
            },
            //编辑用户
            edit() {
                this.dialogData = {
                    visible: true,
                    title: "编辑用户",
                    comp: "editUser",
                    width: "60%"
                };
            },
            // 删除用户
            del(){
                this.dialogData = {
                    visible: true,
                    title: "删除用户",
                    content: "确认要删除该条信息吗?",
                    width: "20%"
                };
            },
            userInit(){
                this.dialogData = {
                    visible: true,
                    title: "初始化用户",
                    comp:"initUser",
                    width: "50%"
                };
            },
            /**
             * @see 确认删除
             * @date 2019-11-25
             * @author Hua.Jeao
             */
            ensureDelete(){
                this.$post(this.$API.EPF_ADMIN.USER.DELETES,{ids:JSON.stringify(this.ids)}).then(r => {
                    this.$message.success(r.data.msg);
                    this.queryUser();// 刷新用户数据
                    this.closeDialog();
                });
            },
            closeDialog() {
                this.dialogData = {};
            },
            //密码重置
            initPwd(){
                this.$confirm('确认要重置密码吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$post(this.$API.EPF_ADMIN.USER.PWD, {ids:JSON.stringify(this.ids)}).then(res => {
                        if (res.code != "0") {
                            this.$message.error(res.msg);return;
                        } else {
                            this.$message({ type: "success",message: "重置成功!初始密码：Qwertyuiop1"});
                        }
                    });
                }).catch(() => {
                    this.$message({ type: 'info', message: '已取消重置'});
                });
            },
            /**
             * @author Hua.Jeao
             * @date 2019-11-28
             * @see 关键字过滤机构树
             */
            queryOrg(){
                this.userData=[];
                this.modelParam["orgKeywords"]=this.searchInfo.orgKeywords;
                //this.$refs.orgTree.loadTree();
                this.queryUser();
            },
            roleseting() {
                if(this.userids==""){
                    that.$message.error("请选择用户！"); //失败
                    return;
                }
                this.selectrows= []
                var that = this;
                var params = { userids: this.userids };
                that.$get(this.$API.EPF_ADMIN.ROLE.GETROLEALLLIST, params).then(res => {
                    if (res.code != "0") {
                        that.$message.error(res.msg); //失败
                        return;
                    }
                    that.rolelist = res.rolelist;
                    var userRole = res.userRole;
                    var getselectrows = [];
                    if (userRole != null) {
                        for (var i = 0; i < userRole.length; i++) {
                            getselectrows.push(userRole[i].roleId);
                        }
                    }
                    that.selectrows = getselectrows;
                });
                that.dialogFormroleVisible = true;
            },
            roleOnchange(e) {
                this.selectrows = e;
            },
            getCheckedKeys(e) {
                var that = this;
                var id = "";
                for (var i = 0; i < that.selectrows.length; i++) {
                    if (i == 0) {
                        id = id + that.selectrows[i];
                    } else {
                        id = id + "," + that.selectrows[i];
                    }
                }
                var params = { userId: this.userids, roleids: id };
                that.$get(this.$API.EPF_ADMIN.ROLE.SETUSERFITROLEBYIDS, params).then(res => {
                    if (res.code != "0") {
                        that.$message.error(res.msg); //失败
                        return;
                    }
                    that.$message.success("保存成功！");
                    that.dialogFormroleVisible = false;
                });
            }
        }
    }
</script>
<style lang="less" scoped>
  .header-class {
    background-color: #ddd !important;
  }

  .status-name {
    cursor: pointer;
    height: 10px;
    width: 10px;
    border-radius: 10px;
    display: inline-block;
  }

  .starting {
    background: #3E84E9;
    color: #3E84E9;
  }

  .stop {
    background: #ddd;
    color: #ddd;
  }
</style>
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
    padding-right: 1rem;
  }
  .oper span {
    display: inline-block;
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
  .dialog-fit{
    height: 620px;
    width: 60%;
  }

</style>
