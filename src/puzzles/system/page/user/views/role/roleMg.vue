<template>
  <!-- 用户中心-角色管理模块 -->
  <epf-container title="角色管理">
    <div class="switchHeight_box">
      <el-row>
        <el-col :span="2">
          <span class="filter_title">角色名:</span>
        </el-col>
        <el-col :span="3">
          <el-input v-model="searchInfo.keyWords" placeholder="请输入"></el-input>
        </el-col>
        <div class="oper">
          <el-button type="primary" @click="queryRoleDatas" v-if="selections.length==0">查询</el-button>
          <el-button type="primary" @click="resetCondtion" v-if="selections.length==0">重置</el-button>
          <el-button type="primary" @click="view" v-if="selections.length==1">查看</el-button>
          <el-button type="primary" @click="add"  v-if="selections.length==0">新增</el-button>
          <el-button type="primary" @click="edit" v-if="selections.length==1">修改</el-button>
          <el-button type="primary" @click="del"  v-if="selections.length>0">删除</el-button>
          <el-button type="primary" @click="roleSettoOrgUser"  v-if="selections.length==1">授权</el-button>
          <el-button type="primary" @click="editrolepermission"  v-if="selections.length==1">配置权限</el-button>
          <!--<el-button type="primary" @click="editroleperarea"  v-if="selections.length==1">配置区域管理员</el-button>-->
        </div>
      </el-row>
    </div>

    <el-row :gutter="20">
      <el-col :span="16">
        <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
          <el-main style="padding-right:20px;">
            <div class="toolsTitleBox">
              <span class="toolsTitle">角色信息</span>
            </div>
            <el-table
              ref="multipleTable"
              :data="tableData"
              :height="boxHeight-170"
              style="width: 100%"
              border
              @selection-change="handleSelectionChange">
              <el-table-column sortable type="selection" fixed width="55"/>
              <el-table-column sortable prop="roleName" fixed label="角色名" min-width="150"/>
              <el-table-column sortable prop="roleCode" fixed label="角色编码" min-width="100"/>
              <el-table-column sortable prop="regionName" label="隶属区域" min-width="100"></el-table-column>
              <el-table-column sortable prop="status" label="状态" min-width="80">
                <template slot-scope="scope">
                  <span :class="(scope.row.status=='0')?'success':''"></span>
                  <span :class="(scope.row.status!=0)?'error':''"></span>
                  <span>{{scope.row.status=='0'?'正常':'禁用'}}</span>
                </template>
              </el-table-column>
              <el-table-column sortable prop="descr" label="描述" min-width="130"/>
            </el-table>
            <div style="text-align:right;margin:22px 0px;">
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
          </el-main>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
          <el-main style="padding-right:20px;">
            <div class="toolsTitleBox">
              <span class="toolsTitle">用户列表</span>
            </div>
            <el-table
              ref="multipleTable"
              :data="userorgData"
              :height="boxHeight-170"
              style="width: 100%"
              border
              @selection-change="handleSelectionChange">
              <el-table-column prop="OBJ_TYPE" label="类型" min-width="50">
                <template slot-scope="scope"><span>{{scope.row.OBJ_TYPE=='2'?'用户':'机构'}}</span></template>
              </el-table-column>
              <el-table-column prop="CODE"  label="账号/编号" min-width="100">
                <template slot-scope="scope"><span>{{scope.row.CODE}}</span></template>
              </el-table-column>
              <el-table-column prop="NAME" label="用户名/机构名" min-width="130">
                <template slot-scope="scope"> <span>{{scope.row.NAME}}</span></template>
              </el-table-column>
            </el-table>
          </el-main>
        </div>
      </el-col>
    </el-row>
    <!-- 弹框 -->
    <el-dialog
      :title="dialogData.title"
      :visible.sync="dialogData.visible"
      :width="dialogData.width"
      append-to-body
    >
      <component
        v-if="dialogData.comp"
        :is="dialogData.comp"
        :ref="'dialogData.comp'"
        :singlerole="singlerole"
        v-bind:role="currentRole"
        @cancel="closeDialog"
        @refresh="refresh"
      ></component>
      <div v-if="!dialogData.comp" v-html="dialogData.content"></div>
      <div v-if="!dialogData.comp" class="epf_align_right">
        <button class="epf_btn epf_btn_def" @click="ensureDels">确 定</button>
        <button class="epf_btn epf_btn_def" @click="closeDialog">取 消</button>
      </div>
    </el-dialog>
  </epf-container>
</template>
<script>
    import roleEdit from './edit'
    import roleAdd from './add'
    import roleView from './view'
    import roleLimit from './limit'
    import roleEmpower from './empower'

  export default {
        name: 'role',
        components: {roleEdit, roleAdd, roleView, roleLimit, roleEmpower},
        data () {
          return {
            dialogData: {visible: false, title: '', comp: ''},
            factor: { page: 1,rows: 10,totalRecord: 1},
            pager: {pageNo: 1, pageSize: 10}, //分页数据
            roleId: '', //选中角色id
            boxHeight: 100,
            formLabelWidth: '120px',
            tableData: [],
            permissionDatas: [],
            singlerole: Object,
            selectGroups: [],
            savetitle: '新增角色',
            pageNo: 1,
            pageSize: 10,
            totalPage: 1,
            totalRecord: 1,
            searchInfo: {keyWords: ''},
            orgdata: [],
            activeName: 'first',
            loading: false,
            modelParam:{},
            selections:[],
            permissions:[],// 权限信息
            currentRole:{},
            roleIds:{},
            userorgData:[],
            menuListHeight:100,
            regionalsName: '',
              regionalsData: [],
              curNodeId: '',
              getchoiceregionalsData: {}
          }
        },
        created () {
          //把json对象转为json字符串
          let filters = JSON.stringify(this.factor);
          //插入搜索条件
          this.factor['filterData'] = filters;
          this.boxHeight = window.innerHeight - 250;
          this.getListData(this.factor);//加载角色表单数据
        },
        mounted () {


        },
        methods: {
          refresh () {
            this.modelParam={};
              //把json对象转为json字符串
              var filters = JSON.stringify(this.factor);
              //插入搜索条件
              this.factor['filterData'] = filters;
            this.getListData(this.factor);
          },
          resetCondtion () {
            this.searchInfo["keyWords"]="";
          },
          edit: function () {
            this.dialogData = {
              visible: true,
              title: '修改角色',
              comp: 'roleEdit',
              width: '30%'
            }
          },
          view () {
            this.dialogData = {
              visible: true,
              title: '角色信息',
              comp: 'roleView',
              width: '30%'
            };
          },
          add: function () {
            this.dialogData = {
              visible: true,
              title: '新增角色',
              comp: 'roleAdd',
              width: '30%'
            }
          },
          del: function () {
            this.dialogData = {
              visible: true,
              title: '删除角色',
              content: '是否确定删除？',
              width: '30%'
            }
          },
          /***
           * @author Jeao.Hua
           * @date 2019-12-07
           * @see  编辑角色权限方法
           */
          editrolepermission(){
            let that = this;
            let role={};
            role.activeName='first';
            role.id=that.roleIds[0];
            that.$post(this.$API.EPF_ADMIN.ROLE.GET_PERS,role).then(res => {
              if(res.code != '0'){ that.$message.error(res.msg); return;}
              role.menuids=res.data.ids;
              role.permissiondata=res.data.menus;
              this.currentRole=role;
              this.dialogData = {visible: true, title: '权限配置',comp: 'roleLimit', width: '50%'}
            })
          },
          /***
           * @author Jeao.Hua
           * @date 2019-12-07
           * @see  关闭会话框公共方法
           */
          closeDialog(){
            this.dialogData.visible = false;
            this.currentRole={};
          },
          /***
           * @author Jeao.Hua
           * @date 2019-12-07
           * @see  查询角色列表公共方法
           */
          async getListData(params){
              debugger
              this.loading = true
              this.$get(this.$API.EPF_ADMIN.ROLE.REGIONALS_ROLE, params).then(res => {
                  this.loading = false;
                  if(res.code != '0'){
                      this.$message.error(res.msg);//失败
                      return;
                  }
                  this.pageNo = res.pager.pageNo;
                  this.pageSize = res.pager.pageSize;
                  this.totalPage = res.pager.totalPage;
                  this.totalRecord = res.pager.totalRecord;
                  this.tableData=res.pager.results;
              }).catch(error=>{
                  this.loading = false;
              })
          },
          handleSelectionChange (val) {
            this.selectGroups = val;
            let roleIds=[];
            for (let i=0;i<val.length;i++){
              roleIds.push(val[i]["id"]);
            }
            this.selections=roleIds;
            this.modelParam["role"]=roleIds;
            this.roleIds=roleIds;
            this.currentRole=val[0];
            this.selectAllUserAndOrg(val[0].id);

            },
            /***
             * @author Jeao.Hua
             * @date 2019-12-07
             * @see  搜索权限列表数据
             */
            queryRoleDatas(){
                this.factor["keyWords"]=this.searchInfo.keyWords;
                //把json对象转为json字符串
                var filters = JSON.stringify(this.factor);
                //插入搜索条件
                this.factor['filterData'] = filters;
                this.getListData(this.factor);
            },
            handleSizeChange (val) {
                this.pager.pageNo = 1;
                this.searchInfo['page'] = this.pager.pageNo;
                this.searchInfo['rows'] = val;
                //把json对象转为json字符串
                var filters = JSON.stringify(this.searchInfo);
                //插入搜索条件
                this.searchInfo['filterData'] = filters;
                this.getListData(this.searchInfo);
            },
            handleCurrentChange (val) {
                this.searchInfo['page'] = val;
                this.searchInfo['rows'] = this.pager.pageSize;
                //把json对象转为json字符串
                var filters = JSON.stringify(this.searchInfo);
                //插入搜索条件
                this.searchInfo['filterData'] = filters;
                this.getListData(this.searchInfo);
            },
            // 确认删除
            ensureDels(){
                let that=this;
                that.$post(this.$API.EPF_ADMIN.ROLE.DELS,{roles:that.selections}).then(r => {
                    that.$message.success(r.data.msg);
                    that.getListData(that.searchInfo);
                    that.dialogData.visible=false;
                });
            },
            selectAllUserAndOrg(id){
                let that=this;
                that.$post(that.$API.EPF_ADMIN.ROLE.GET_USERANDORG_BYROLEID,{roleId:id}).then(res => {
                    if(res.code != '0'){
                        that.$message.error(res.msg);
                        return;
                    }
                    that.userorgData= res.UserAndOrg ;
                });
            },
            roleSettoOrgUser() {
                let that = this;
                that.roleId = that.selectGroups[0].id;
                that.currentRole["roleId"]=that.roleId;
                that.$post(that.$API.EPF_ADMIN.ROLE.CFGROLE_TOORGUSER, {'roleId':that.roleId ,'type': 'org'}).then(r => {
                    if(r.code != '0'){
                        that.$message.error(r.msg);
                        return 0;
                    }
                    that.currentRole["orgdata"]=r.orgTree;
                    that.currentRole["orgids"] = r.data.ids;
                    that.dialogData = {visible: true,title: '授权',comp: 'roleEmpower', width: '60%'};
                });
            },
            /***
             * @author WangHong
             * @date 2020-01-03
             * @see  编辑角色权限方法(配置区域管理员)
             */
            editroleperarea(){
                let that = this;
                that.roleId = that.selectGroups[0].id;
                that.currentRole["roleId"]=that.roleId;
                that.$post(that.$API.EPF_ADMIN.ROLE.CFGROLE_TOORGUSER, {'roleId':that.roleId ,'type': 'org'}).then(r => {
                    if(r.code != '0'){
                        that.$message.error(r.msg);
                        return 0;
                    }
                    that.currentRole["orgdata"]=r.orgTree;
                    that.currentRole["orgids"] = r.data.ids;
                    that.dialogData = {visible: true,title: '授权',comp: 'roleEmpower', width: '60%'};
                });
            }
        }
    }
</script>
<style lang="less" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
    .oper {
    float: left;
    font-weight: normal;
    margin-left: 50px;
    margin-bottom: 10px;
  }
  .oper span {
    display: inline-block;
    width: 80px;
    height: 32px;

    border-radius: 2px;
    margin-right: 10px;
    text-align: center;
    line-height: 36px;
    font-size: 14px;
    cursor: pointer;
    border: solid 1px #d3d4d6;
    color: #606266;
    background-color: #dbf0ec;
  }
  .oper span:nth-child(4) {
    color: #fff;
    background-color: #ffa000;
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
