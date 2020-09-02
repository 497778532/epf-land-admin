<template>
  <!--
    @name: 角色管理--权限设置弹框
   	@description: 主要是角色的权限设置
   	@author: gaojie
    @chageTime:2019-11-21
  -->
  <div>
    <el-tabs v-model="role.activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="资源管理" name="first" :style="{'max-height': '500px','overflow-y':'auto'}">
        <el-tree  :data="role.permissiondata"
                  show-checkbox
                  default-expand-all
                  node-key="id"
                  ref="tree"
                  @check-change="permissCheckedKeys"
                  highlight-current
                  :default-checked-keys="role.menuids"
                  :props="defaultProps"
                  check-strictly="true"
                  style="position:static;"/>
      </el-tab-pane>
      <el-tab-pane label="数据权限" name="second">
        <el-table
                ref="datatable"
                :data="role.rolemenus"
                v-loading="loading"
                element-loading-text="数据加载中"
                element-loading-background="rgba(255, 255, 255,0.95)"
                height="400px"
                style="width: 100%;margin:0 0 20px 0;"
                tooltip-effect="dark"
                border  @selection-change="handleSelectionChange"
                :highlight-current-row="true"
                row-key="MENU_ID"
                expand-row-keys >
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
    <div slot="footer" v-show="role.activeName =='first'" class="dialog-footer" align="center">
      <el-button type="primary" @click="cfgPermission">保存</el-button>
      <el-button  @click="cancel">取 消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "role-limit",
  components: {},// 公共组件
  props: {
    role: {
      type: Object,
      default: {},
    }
  },
  data () {
    return {
      permissiondata: [],
      activeName: "",
      menuids: [],
      defaultProps: { children: 'childMenu',label: 'menuname'},
      rolemenus: [],
    };
  },
  methods: {
    handleSelectionChange (val) {
      this.selectGroups = val;
    },
    handleClick () {
    },
    cancel () {
      this.$emit("cancel");
    },
    /***
     * @author Jeao.Hua
     * @date 2019-12-09
     * @see  配置角色的权限
     */
    permissCheckedKeys () {
      this.menuids = this.$refs.tree.getCheckedKeys();
    },
    loadorguser (data) {
      let that = this
      let orgid = data.id
      that.$post(this.$API.EPF_ADMIN.ROLE.GET_USER_BYORGID, {orgId: orgid}).then(res => {
        if (res.code != '0') {
          that.$message.error(res.msg);//失败
          return
        }
        that.usersInOrg = res.result;
      });
      that.$post(this.$API.EPF_ADMIN.ROLE.QUERY_OWNERS_BYROLEID, {'roleId': that.roleId}).then(res => {
        if (res.code != '0') {
          that.$message.error(res.msg);//失败
          return;
        }
        let list = res.userrole;
        let orgs = [];
        if (list != null) {
          for (var i = 0; i < list.length; i++) {
            orgs.push(list[i].orjId)
          }
        }
        that.value4 = orgs
      })
    },
    /***
     * @author Jeao.Hua
     * @date 2019-12-07
     * @see  根据条件查询权限
     */
    savedataaccess (data) {

    },
    close () {
      this.$emit('cancel');
    },
    /***
     * @author Jeao.Hua
     * @date 2019-12-07
     * @see  配置角色权限
     */
    cfgPermission () {
      let that=this;
      let ids=that.$refs.tree.getCheckedKeys();//获取勾选及半勾选状态
      let id="";
      for(let i=0;i<ids.length;i++){
        if(i==0){
          id=id+ids[i]
        }else{
          id=id+","+ids[i]
        }
      }
      that.$post(that.$API.EPF_ADMIN.ROLE.SET_MENUS_BYROLEID,{roleId:that.role.id,menusIds:id}).then(res => {
        if(res.code != '0'){
          that.$message.error(res.msg);//失败
          return;
        }
        that.$message.success("配置成功");//失败
        that.close();
      })
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
