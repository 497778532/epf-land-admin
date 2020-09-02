<template>
  <!--
    @name: 角色管理--编辑弹框
   	@description: 主要是编辑角色信息
   	@author: gaojie
    @chageTime:2019-11-21
    @update Hua.Jeao
  -->
  <el-form :model="role" :rules="validations" ref="validations">
    <el-form-item label="角色名" :label-width="formLabelWidth" prop="roleName">
      <el-input
              v-model="role.roleName"
              autocomplete="off"
              style="width:300px;"
      ></el-input>
    </el-form-item>
    <el-form-item label="角色编码" :label-width="formLabelWidth" prop="roleCode">
      <el-input
              v-model="role.roleCode"
              autocomplete="off"
              style="width:300px;"
      ></el-input>
    </el-form-item>
    <el-row>
      <el-col :span="6">
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-tooltip :content="role.status=='1'?'已禁用':'已启用'" placement="top">
            <el-switch
                    v-model="role.status"
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
      <el-input v-model="role.descr" autocomplete="off"  style="width:300px;"></el-input>
    </el-form-item>
    <el-form-item style="text-align: center">
      <el-button type="primary" @click="saveForm">保存</el-button>
      <el-button  @click="cancel()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { Rules } from '../../components/rules'
export default {
  name: "role-edit",
  props: {
    role:{
      type:Object,default:null
    }
  },
  data() {
    return {
      formLabelWidth: "120px",
      validations:Rules.ROLE,// 角色校验
      edit:true,
    };
  },
  created(){

  },
  methods: {
    change() {},
    cancel() {
      this.role={};
      this.$emit("cancel");
    },
    /***
     * @author Jeao.Hua
     * @date 2019-12-07
     * @see  保存修改后的数据
     */
    saveForm() {
      let that=this;
      that.$refs['validations'].validate((valid) => {
        if (valid){
          delete that.role.createTime;
          delete that.role.updateTime;
          that.$post(that.$API.EPF_ADMIN.ROLE.EDIT,that.role).then(res => {
            if (res.code != "0") {
              that.$message.error(res.msg); //失败
              return 0;
            }
            that.$message.success(res.data.msg);
            that.$emit("cancel");
            that.$emit("refresh");
          });
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
