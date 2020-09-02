<template>
  <!--
    @name: 角色管理--新增弹框
   	@description: 主要是新增角色信息
   	@author: gaojie
    @chageTime:2019-11-21
  -->
  <el-form :model="singlerole" :rules="validations" ref="validations">
  <el-form-item label="角色名" :label-width="formLabelWidth" prop="roleName">
    <el-input
            v-model="singlerole.roleName"
            autocomplete="off"
            :disabled="edit"
            style="width:300px;"
    ></el-input>
  </el-form-item>
  <el-form-item label="角色编码" :label-width="formLabelWidth" prop="roleCode">
    <el-input
            v-model="singlerole.roleCode"
            autocomplete="off"
            :disabled="edit"
            style="width:300px;"
    ></el-input>
  </el-form-item>
  <el-row>
    <el-col :span="6">
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-tooltip :content="singlerole.status=='1'?'已禁用':'已启用'" placement="top">
          <el-switch
                  :disabled="edit"
                  v-model="singlerole.status"
                  active-color="#ff4949"
                  inactive-color="#13ce66"
                  active-value="1"
                  inactive-value="0"
          ></el-switch>
        </el-tooltip>
      </el-form-item>
    </el-col>
  </el-row>
  <el-form-item label="描述" :label-width="formLabelWidth">
    <el-input v-model="singlerole.descr" autocomplete="off" :disabled="edit" style="width:300px;"></el-input>
  </el-form-item>
  <el-form-item style="text-align: center">
    <el-button  @click="cancel()">取消</el-button>
    <el-button type="primary" @click="saveForm">保存</el-button>
  </el-form-item>
</el-form>
</template>

<script>
  import { Rules } from '../../components/rules'
export default {
  name: "role-add",
  data() {
    return {
      edit: false,
      formLabelWidth: "120px",
      singlerole: {
        roleName: "",
        roleCode: "",
        adminType: "",
        deleteType: "",
        descr: ""
      },
      edit:false,
      validations:Rules.ROLE,// 角色校验
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    saveForm() {
      let that = this;
      that.$refs['validations'].validate((valid) => {
          if (valid){
            that.$post(that.$API.EPF_ADMIN.ROLE.ADD, that.singlerole).then(res => {
              if (res.code != "0") {
                that.$message.error(res.msg); //失败
                return;
              }
              that.$message.success(res.msg);
              this.$emit("cancel");
              this.$emit("refresh")
            });
          }
      });
    }
  }
};
</script>

<style scoped>
</style>
