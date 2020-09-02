<template>
  <div class="page-body" id="roleManage">
    <div class="filter_wrap"  :style="{'height':menuListHeight + 'px'}">
      <div class="switchHeight_box">
        <el-row>

          <el-col :span="2">
            <span class="filter_title">角色名:</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="searchInfo.roleName" placeholder="请输入"></el-input>
          </el-col>

          <el-col :span="2">
            <div class="button_bg" @click="getsearchuser">查询</div>
          </el-col>
          <el-col :span="2">
            <div class="button_bg" @click="resetsearchuser">重置</div>
          </el-col>
          <el-col 
            v-if="this.selectGroups.length!==1"
            :span="8" style="text-align:center;padding-left:20px;line-height:34px;">
            <b >选择需要操作的角色</b>
          </el-col>
           <div class="oper">
             
             <span class="button_bg" v-if="this.selectGroups.length===1" @click="showsingleuser">查看</span>
             <span class="button_bg" @click="AddFlowpatreason">新增</span>
             <span class="button_bg" v-if="this.selectGroups.length===1" @click="editFlowpatreason">修改</span>
             <span @click="handleDelete" v-if="this.selectGroups.length===1">删除</span>
             <span class="button_bg" v-if="this.selectGroups.length===1" @click="roleSettoOrgUser">授权</span>
             <span class="button_bg" v-if="this.selectGroups.length===1" @click="editrolepermission">权限设置</span>
            </div>
        </el-row>
      </div>

      <el-container style="margin-top:10px;">
           <el-main style="padding-right:20px;" >

              <div class="toolsTitleBox">
                <span class="toolsTitle">角色信息</span>


              </div>
              <el-table
                ref="multipleTable"
                :data="tableData"
                :height="menuListHeight-170"
                style="width: 100%"
                border
                @selection-change="checkChange"
                @row-click="selectAllUserAndOrg"
              >
                <el-table-column type="selection" fixed width="55"></el-table-column>
                <el-table-column prop="roleName" fixed label="角色名" min-width="150"></el-table-column>
                <el-table-column prop="descr" label="描述" min-width="130"></el-table-column>
                <el-table-column prop="adminType" label="是否超级管理员" min-width="120">
                    <template slot-scope="scope">
                    <span :class="(scope.row.adminType=='1')?'success':''"></span>
                    <span :class="(scope.row.adminType!='1')?'error':''"></span>
                    <span>{{scope.row.adminType=='1'?'是':'否'}}</span>
                </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" min-width="80">
                  <template slot-scope="scope">
                    <span :class="(scope.row.deleteType=='0')?'success':''"></span>
                    <span :class="(scope.row.deleteType!=0)?'error':''"></span>
                    <span>{{scope.row.deleteType=='0'?'正常':'禁用'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="roleCode" fixed="right" label="角色编码" min-width="130"></el-table-column>

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

           </el-main>
            <el-aside width="350px">
              <div class="toolsTitleBox">
                <span class="toolsTitle">授权列表</span>

              </div>
              <el-table
                ref="multipleTable"
                :data="userorgData"
                :height="menuListHeight-170"
                border
                @selection-change="handleSelectionChange"
              >

                 <el-table-column prop="OBJ_TYPE" label="类型" min-width="50">
                  <template slot-scope="scope">

                    <span>{{scope.row.OBJ_TYPE=='2'?'用户':'机构'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="CODE"  label="账号/编号" min-width="100">
                  <template slot-scope="scope">

                      <span>{{scope.row.CODE}}</span>
                    </template>

                </el-table-column>

                <el-table-column prop="NAME" label="用户名/机构名" min-width="130">
                     <template slot-scope="scope">

                      <span>{{scope.row.NAME}}</span>
                    </template>

                </el-table-column>


              </el-table>

            </el-aside>

     </el-container>
    </div>

    <!-- 弹框 -->
    <div>
      <el-dialog :title="savetitle" :visible.sync="dialogFormVisible">

        <el-form :model="singlerole">
          <el-form-item label='角色名' :label-width="formLabelWidth">
            <el-input v-model="singlerole.roleName" autocomplete="off" :disabled='edit'  style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item label='角色编码' :label-width="formLabelWidth">
            <el-input v-model="singlerole.roleCode" autocomplete="off" :disabled='edit'  style="width:300px;"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="6">
              <el-form-item label='超级管理员' :label-width="formLabelWidth">
              <el-tooltip :content="singlerole.adminType=='1'?'是':'否'" placement="top">
<!--                :disabled="!tenantCode"  -->
                <el-switch
                    :disabled='edit'
                    v-model="singlerole.adminType"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="1"
                    inactive-value="0">
                  </el-switch>
                </el-tooltip>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label='状态' :label-width="formLabelWidth">
                <el-tooltip :content="singlerole.deleteType=='1'?'已禁用':'已启用'" placement="top">
                  <el-switch
                    :disabled='edit'
                    v-model="singlerole.deleteType"
                    active-color="#ff4949"
                    inactive-color="#13ce66"
                    active-value="1"
                    inactive-value="0">
                  </el-switch>
                </el-tooltip>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label='描述' :label-width="formLabelWidth">
           <el-input v-model="singlerole.descr" autocomplete="off" :disabled='edit' style="width:300px;"></el-input>
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>

          <el-button v-if="add && !edit" type="primary" @click="updateinfo">修改</el-button>
          <el-button v-if="!add" type="primary" @click="saveinfo">保存</el-button>
        </div>
      </el-dialog>
<!--###########弹框角色配权##############-->
      <el-dialog  title="权限配置" :visible.sync="dialogFormpermissVisible">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="用户管理" name="first" :style="{'max-height': '500px','overflow-y':'auto'}">
            
          <el-tree
              
              :data="permissiondata"
              show-checkbox
              default-expand-all
              node-key="id"
              ref="tree"
              @check-change="permissCheckedKeys"
              highlight-current
              :default-checked-keys="menuids"
              :props="defaultProps"
              style="position:static;"
              >
            </el-tree>
               
            
          </el-tab-pane>
          <el-tab-pane label="数据权限" name="second">
            <el-table  
                  ref="datatable"
                  :data="rolemenus"
                  v-loading="loading"
                  element-loading-text="数据加载中"
                  element-loading-background="rgba(255, 255, 255,0.95)"
                  height="400px"
                  style="width: 100%;margin:0 0 20px 0;"
                  tooltip-effect="dark"
                  border  @selection-change="handleSelectionChange"
                  :highlight-current-row="true"
                  row-key="MENU_ID" 
                  expand-row-keys
                  >
              <el-table-column prop="MENU_NAME" fixed label="菜单名称"></el-table-column>
              
              <el-table-column label="操作" width="250" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.MENU_TYPE=='datalimit'">
                    <el-select v-model="scope.row.RIGHT_LEVEL" @change="savedataaccess(scope.row)" placeholder="请选择">
                      <el-option  label="请选择" value=""></el-option>
                      <el-option  label="本人"  value="1"></el-option>
                      <el-option  label="所有机构" value="2"></el-option>
                      <el-option  label="当前机构"   value="3"></el-option>
                      <el-option  label="当前及当前以下机构"  value="4"></el-option>
                    </el-select>
                  </div>
                    
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" v-show="activeName =='first'" class="dialog-footer">
              <el-button @click="dialogFormpermissVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveCheckedKeys">保存</el-button>
        </div>
      </el-dialog>
      <!--##############机构人员配角色弹窗#################-->
       <el-dialog title="授权" :visible.sync="dialogFormSetRoleVisible" width="800px">
        <el-container style="height:400px;">
          <el-aside width="200px" style="padding-left:10px;">

             <div style="height:40px;padding:6px 22px;background:#F5F7FA;">
                  <div style="float:left;font-size:16px;">机构</div><el-button type="primary" style="float:right;" size="mini" @click="saveroguserrole">保存</el-button>
              </div>

             <el-tree
                :data="orgdata"
                :default-checked-keys="orgids"
                :expand-on-click-node="false"
                default-expand-all
                highlight-current
                show-checkbox
                node-key="id"
                ref="tree"
                :check-strictly="false"
                :props="orgProps"
                @node-click="loadorguser"
                @check-change="selectedOrg"
                style="position:inherit;"
                >

              </el-tree>
          </el-aside>
          <el-aside width="550px"  style="padding-left:10px;">
            <el-transfer
                :titles="['未授权','已授权']"
                :button-texts="['弃权','授权']"
                v-model="value4"
                :props="{
                  key: 'id',
                  label: 'realname'
                }"
                :data="usersInOrg"
                @change="roleforuser">
              </el-transfer>
          </el-aside>

        </el-container>
      </el-dialog>
  
     
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import transferTable from "@/components/transferTable";
import Axios from "axios";

export default {
  name:'roleManage',
  components: {
    transferTable
  },

  data() {

    return {
      value4:[],//选中授权人id
      usersInOrg: [],//当前机构下的用户
      roleId:'',//选中角色id
      menuids:[],
      menuListHeight:100,
      defaultProps: {
          children: 'childMenu',
          label: 'menuname'
        },
      orgProps:{
        children: 'children',
          label: 'name'},
      permissiondata:[],
      formLabelWidth: "120px",
      dialogFormVisible: false,
      dialogFormpermissVisible:false,
      dialogFormSetRoleVisible:false,
      dialogdatapermissVisible:false,
      dialogselectFormVisible:false,
      visible2: false,
      tableDataTitle: [],
      tableData: [],
      userorgData:[],
      multipleSelection: [],
      handleDataError: [],

      isShowProvince: true,

      value: "",

      handleData: "",
      singlerole:Object,
      selectGroups:[],
      add:false,
      savetitle:'新增角色',
      edit:false,
      dialogForm: false,
      dialogTable: false,
      dialogTest: false,
      pageNo: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: {},
      tableData1: [],
      labelPosition: "right",

      orgdata:[],
      orgids:[],
      activeName :'first',
      tenantCode:false,
      rolemenus:[],
      rolemenuOne:{},
      loading:false,
    };
  },
  created() {
      this.searchInfo['page'] = this.pageNo
      this.searchInfo['rows'] = this.pageSize
     this.menuListHeight = window.innerHeight - 245;

     this.getRoleList(this.searchInfo);
     this.getTenantCode();

  },
  methods: {
    roleforuser(data,dos,rit){
      var that=this
      var roleId=that.roleId;
      var b = rit.join(',');
      if(dos=='right'){//授权
         that.$post('/epf-admin/admin/userRole/roleforuser',{roleId:roleId,userIds:b}).then(res => {
            if(res.code != '0'){
                that.$message.error(res.msg);//失败
                return
            }
            that.$message.success("保存成功！");//失败
        });

      }else{//弃权
         that.$post('/epf-admin/admin/userRole/delUserRole',{roleId:roleId,userIds:b}).then(res => {
            if(res.code != '0'){
                that.$message.error(res.msg);//失败
                return
            }
            that.$message.success("保存成功！");//失败
        });
      }
    },
    saveroguserrole(){
      var that=this
      var roleId=that.roleId;
      var rids=that.orgids;
      var b = rids.join(',');
      that.$post('/epf-admin/admin/userRole/editOrgUserByRole',{roleId:roleId,orgids:b}).then(res => {
            if(res.code != '0'){
                that.$message.error(res.msg);//失败
                return
            }
            that.$message.success("保存成功！");//失败
      });



    },
    selectedOrg(){this.orgids=this.$refs.tree.getCheckedKeys()},
    permissCheckedKeys(){this.menuids=this.$refs.tree.getCheckedKeys();
    console.log(this.menuids)},
    loadorguser(data){
      var that=this
      var orgid=data.id
      that.$post('/epf-admin/admin/user/getUserByOrgId',{orgId:orgid}).then(res => {
            if(res.code != '0'){
                that.$message.error(res.msg);//失败
                return
            }
            console.log(res)
            that.usersInOrg=res.result
          });
      that.$post('/epf-admin/admin/userRole/queryOwnersByRoleId',{'roleId':that.roleId}).then(res => {
            if(res.code != '0'){
                    that.$message.error(res.msg);//失败
                    return;
            }
            var list=res.userrole;
            var orgs=[];
           if(list!=null){
              for(var i=0;i<list.length;i++){
                  orgs.push(list[i].orjId)
              }
           }
           that.value4=orgs

        })
    },
    saveCheckedKeys(){
      var that=this;
      var ids=that.$refs.tree.getCheckedKeys().concat(that.$refs.tree.getHalfCheckedKeys());//获取勾选及半勾选状态
      var id="";
      for(var i=0;i<ids.length;i++){
        if(i==0){
            id=id+ids[i]
        }else{
          id=id+","+ids[i]
        }

      }
        var params={'roleId':that.roleId,'menusIds':id};
        that.$post('/epf-admin/admin/relpermission/setRoleMenuByRoleId',params).then(res => {
            if(res.code != '0'){
                    that.$message.error(res.msg);//失败
                    return;
            }
             that.$message.success("操作成功");//失败
        })
    },
      handleChange(value) {
        this.singlerole.orgId=value[value.length-1]
        console.log(this.singlerole.orgId)
      },
      getsearchuser(){
        this.searchInfo['page'] = 1;
        this.searchInfo['rows'] = this.pageSize;
        this.getRoleList(this.searchInfo);
      },
      resetsearchuser(){
        this.searchInfo['page'] = 1;
        this.searchInfo['rows'] = this.pageSize;
        this.searchInfo['username']="";
        this.searchInfo['realname']="";
        this.searchInfo['telPhone']="";
        this.searchInfo['roleName']="";
        this.getRoleList(this.searchInfo);
      },
      saveinfo(){
          let that=this;
            that.$post('/epf-admin/admin/role/add',this.singlerole).then(res => {
                if(res.code != '0'){
                    that.$message.error(res.msg);//失败
                    return
                }
                that.dialogFormVisible = false
                that.$message.success(res.msg);
                that.getRoleList(that.searchInfo);
          });
      },
      updateinfo(){
          let that=this;
            that.$post('/epf-admin/admin/role/update',this.singlerole).then(res => {
                if(res.code != '0'){
                    that.$message.error(res.msg);//失败
                    return
                }
                that.dialogFormVisible = false
                that.$message.success(res.msg);
                that.getRoleList(that.searchInfo);
          });
      },
    handleSelectionChange (val) {
      this.selectGroups = val;

    },
    checkChange(val){
      this.selectGroups = val
    },
    selectAllUserAndOrg(row,event,column){
      var id=row.id
       let that=this;
            that.$post('/epf-admin/admin/user/getUserAndOrgByRoleid',{roleId:id}).then(res => {
                if(res.code != '0'){
                    that.$message.error(res.msg);//失败
                    return
                }
                that.userorgData= res.UserAndOrg ;

          });

    },
    queryroleifo (id) {
      let that = this
      var url = '/epf-admin/admin/role/getRole'
      var params={'id':id}
      this.$get(url, params)
        .then(res => {

            that.singlerole = res.role

        })
        .catch(res => {
          that.$message.warning(res.msg)
        })
    },

      showsingleuser(){
        this.savetitle="账号信息";
         this.add=true;
         this.edit=true
        this.singlerole=[];
        if(this.selectGroups.length != 1){
            this.$message.warning('请选择一个角色！')
            return
        }else{
            this.group = {}
            let id = "";
            id = this.selectGroups[0].id
            this.queryroleifo(id)
        }
      this.dialogFormVisible = true;

      },
    async getRoleList(params) {
      let that = this;
      let param = {"filters":params};
     this.$get('/epf-admin/admin/role/getRoleJson',param).then(res => {
        if(res.code != '0'){
                this.$message.error(res.msg);//失败
                return;
        }
        console.log(res);
       that.pageNo = res.pager.pageNo;
       that.pageSize = res.pager.pageSize;
       that.totalPage = res.pager.totalPage;
       that.totalRecord = res.pager.totalRecord;
       that.tableData=res.pager.results;

        })

    },
     getTenantCode(){
          let that=this;
            that.$post('/epf-admin/admin/user/usertcode').then(res => {
                if(res.code != '0'){
                    that.$message.error(res.msg);//失败
                    return
                }
                that.tenantCode=res.tenantCode
          });
      },

    AddFlowpatreason() {
        this.savetitle="新增账号";
        this.add=false;
        this.edit=false;
        this.singlerole=[];
      this.dialogFormVisible = true;
    },
     editFlowpatreason() {
         this.savetitle="修改账号";
         this.add=true;
         this.edit=false
        this.singlerole=[];
        if(this.selectGroups.length != 1){
            this.$message.warning('请选择一个角色！')
            return
        }else{
            this.group = {}
            let id = "";
            id = this.selectGroups[0].id

            this.queryroleifo(id)
        }
      this.dialogFormVisible = true;
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
    roleSettoOrgUser(){
      let that = this
        let ids ='';
        console.log(that.selectGroups)
        if(that.selectGroups.length != 1){
          that.$message.warning('请选择一个角色！')
          return
        }
        that.roleId=this.selectGroups[0].id;
        var params={roleId:that.roleId,type:'org'};
        that.dialogFormSetRoleVisible=true;
        that.$post('/epf-admin/admin/org/getOrgTreeForTree').then(res => {
            if(res.code != '0'){
                    that.$message.error(res.msg);//失败
                    return;
            }
          that.orgdata=eval('(' +res.ztreeJson +')');
        })
        that.$post('/epf-admin/admin/userRole/queryOwnersByRoleId',{'roleId':that.roleId,'type':'org'}).then(res => {
            if(res.code != '0'){
                    that.$message.error(res.msg);//失败
                    return;
            }
            var list=res.userrole;
            var orgs=[];
           if(list!=null){
              for(var i=0;i<list.length;i++){
                  orgs.push(list[i].orjId)
              }
           }
           that.orgids=orgs

        })
    },
    editrolepermission(){
        this.activeName='first';
        let that = this

        let ids ='';
        console.log(that.selectGroups)
        if(that.selectGroups.length != 1){
          that.$message.warning('请选择一个角色！')
          return
        }
        that.roleId=this.selectGroups[0].id
        var params={roleId:that.roleId}
        that.dialogFormpermissVisible=true
        that.$get('/epf-admin/admin/relpermission/getmenuIdsbyRoleId',params).then(res => {
            if(res.code != '0'){
                    that.$message.error(res.msg);//失败
                    return;
            }
            console.log(res);

          that.menuids=res.ids
          that.permissiondata=res.menus
        })





    },
    datapermission(){
        let that = this

        let ids ='';
        console.log(that.selectGroups)
        if(that.selectGroups.length != 1){
          that.$message.warning('请选择一个角色！')
          return
        }
        that.roleId=this.selectGroups[0].id
        var params={roleId:that.roleId}
        that.dialogdatapermissVisible=true
        that.$get('/epf-admin/admin/relpermission/getRolemenus',params).then(res => {
            if(res.code != '0'){
                    that.$message.error(res.msg);//失败
                    return;
            }
            that.rolemenus=res.menus
        })

    },
    handleDelete() {
        let that = this

      let ids ='';
      if(that.selectGroups.length < 1){
        that.$message.warning('请选择要删除的角色！')
        return
      }else{
        for(var i = 0; i < this.selectGroups.length; i++){
          ids += this.selectGroups[i].id+","
        }
      }
      that.$confirm("确定要删除选中的角色吗？", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning",
        center: true
      }).then(() => {
            that.$post('/epf-admin/admin/role/delete',{id:ids}).then(res => {
                if(res.code != '0'){
                    that.$message({
                    type: "faill",
                    message: "删除失败!"
                  });
                  return;
                }
                that.$message({
                    type: "success",
                    message: "删除成功!"
                });
                that.getRoleList(that.searchInfo);
            })
        }).catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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

    handleClick(tab, event) {
      this.activeName=tab.name
      if(tab.name=='second'){
        this.datapermission();
      }
    },

    handleSizeChange(val) {
      debugger
      //每页条数改变时触发
      this.pageNo = 1;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo.rows = val;
      console.log("封装后的对象是：",this.searchInfo)
      this.getRoleList(this.searchInfo);
    },
    handleCurrentChange(val) {
      //获取当前页
      this.searchInfo["page"] = val;
      this.searchInfo["rows"] = this.pageSize;
     this.getRoleList(this.searchInfo);
    },
    selectdatalevel(index,data){
      var that=this;
      that.rolemenuOne=data
      that.dialogselectFormVisible=true;
    },
    savedataaccess(data){
      console.log(data)
      var that=this;
      that.$post('/epf-admin/admin/relpermission/updateRolemenu',data).then(res => {
                if(res.code != '0'){
                    that.$message.error(res.msg);//失败
                    return
                }
                that.$message.success(res.msg);//失败
                that.dialogselectFormVisible = false
          });

    }

  }
};
</script>
<style scoped>

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
  float: right;
  font-weight: normal;
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
<style scoped>
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
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}

</style>
