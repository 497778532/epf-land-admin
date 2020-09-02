<template>
  <!--
    @name: 角色管理--编辑弹框
   	@description: 主要是编辑角色信息
   	@author: gaojie
    @chageTime:2019-11-21
    @update Hua.Jeao
  -->
  <el-form :model="role">
    <el-form-item label="角色名" :label-width="formLabelWidth" prop="roleName">
      <el-input
              v-model="role.roleName"
              autocomplete="off"
              style="width:300px;"
              readonly="readonly"
      />
    </el-form-item>
    <el-form-item label="角色编码" :label-width="formLabelWidth" prop="roleCode">
      <el-input
              v-model="role.roleCode"
              autocomplete="off"
              style="width:300px;"
              readonly="readonly"
      />
    </el-form-item>
    <el-row>
      <el-col :span="6">
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-tooltip :content="role.status=='1'?'已禁用':'已启用'" placement="top" readonly="readonly">
            <el-switch
                    v-model="role.status"
                    active-color="#ff4949"
                    inactive-color="#13ce66"
                    active-value="1"
                    inactive-value="0"
                    disabled
            />
          </el-tooltip>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="描述" :label-width="formLabelWidth">
      <el-input v-model="role.descr" autocomplete="off"  style="width:300px;" readonly="readonly"/>
    </el-form-item>
    <el-form-item style="text-align: center">
      <el-button type="primary" @click="cancel">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "role-view",
    props: {
      role:{
        type:Object,
        default:{},
      }
    },
    data() {
      return {
        formLabelWidth: "120px",
        edit:true,
      };
    },
    methods: {
      cancel() {
        this.$emit("cancel");
      },
    }
  };
</script>

<style scoped>
</style>
