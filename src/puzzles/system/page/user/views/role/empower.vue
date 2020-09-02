<template>
  <!--
    @name: 角色管理--授权弹框
   	@description: 主要是角色的授权
   	@author: gaojie
    @chageTime:2019-11-21
  -->
  <div>
    <el-container style="height:400px;">
      <el-aside width="200px" style="padding-left:10px;">
        <div style="height:40px;padding:6px 22px;background:#F5F7FA;">
          <div style="float:left;font-size:16px;">机构</div>
          <el-button type="primary" style="float:right;" size="mini" @click="saveroguserrole">保存</el-button>
        </div>

        <el-tree
          :data="role.orgdata"
          :default-checked-keys="role.orgids"
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
        ></el-tree>
      </el-aside>
      <el-aside width="550px" style="padding-left:10px;">
        <el-transfer
          :titles="['未授权','已授权']"
          :button-texts="['弃权','授权']"
          v-model="authenitonUsers"
          :props="{ key: 'id',label: 'realname'}"
          :data="usersInOrg"
          @change="roleforuser"
        ></el-transfer>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "role-empower",
  props:{
    role:{
      type:Object,
      default:{orgdata:[],orgids:[], } }
  },
  data() {
    return {
      rolemenus: [],
      activeName: "first",
      edit: false,
      formLabelWidth: "120px",
      orgProps:{children: 'children', label: 'orgName',id: 'id'},
      singlerole: {roleName: "", roleCode: "",adminType: "",deleteType: "",descr: ""},
      selectGroups: "",
      authenitonUsers:[],//选中授权人id
      usersInOrg: [],//当前机构下的用户
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.selectGroups = val;
    },
    cancel() {
      this.$emit("cancel");
    },
    loadorguser(data) {
      let that = this;
      let roleId = that.role.roleId;
      that.$post(that.$API.EPF_ADMIN.ROLE.LOADORGUSER, {orgId: data.id, roleId: roleId}).then(res => {
        if (res.code != '0') {
          that.$message.error(res.msg);//失败
          return
        }
        that.usersInOrg = res.data.usersInOrg;
        that.authenitonUsers = res.data.unionIds;
      });
    },
    selectedOrg(data, checked, indeterminate) {
      this.orgids = this.$refs.tree.getCheckedKeys();
      this.loadorguser(data);
    },
    /**
     * @see 授权操作
     * @author Hua.Jeao
     * @date 2019-12-13
     * @param data
     * @param authType
     * @param ids
     */
    roleforuser (data, authType, ids) {
      let that = this;
      let userIds = ids.join(',');
      let roleId = that.role.roleId;
      that.$post(that.$API.EPF_ADMIN.ROLE.AUTHORIZATION, {roleId: roleId,userIds: userIds, type: authType}).then(res => {
        if (res.code != '0') {
          that.$message.error(res.msg);//失败
          return;
        }
        that.$message.success("保存成功！");//失败
      });
    },
    saveroguserrole () {
      let that = this;
      let roleId = that.role.roleId;
      let rids = that.orgids;
      let orgIds = rids.join(',');
      that.$post(that.$API.EPF_ADMIN.ROLE.EDIT_ORGUSER_BYROLE, {roleId:roleId, orgIds: orgIds}).then(res => {
        if (res.code != '0') {
          that.$message.error(res.msg);//失败
          return;
        }
        that.$message.success("保存成功！");//失败
      });
    }
  }
};
</script>

<style scoped>
</style>
