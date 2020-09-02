<template>
  <!-- 
    @name: 租户管理--新增弹框
   	@description: 主要是新增租户信息
   	@author: gaojie
    @chageTime:2019-11-22
  -->
  <div v-if="advertData&&advertData!==null">
    <el-form :model="advertData" label-width="80px" :rules="rules" ref="advertData" size="small">
      <el-row>
        <el-col :offset="1" :span="9">
          <el-form-item label="编号" prop="code">
            <el-input v-model="advertData.code" :readonly="edit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :offset="1" :span="9">
          <el-form-item label="名称" prop="name">
            <el-input v-model="advertData.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="1" :span="9">
          <el-form-item label="地址" prop="address">
            <el-input v-model="advertData.address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :offset="1" :span="9">
          <el-form-item label="联系人" prop="contacter">
            <el-input v-model="advertData.contacter"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="1" :span="9">
          <el-form-item label="联系电话" prop="telPhone">
            <el-input v-model="advertData.telPhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :offset="1" :span="9">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="advertData.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="1" :span="9">
          <el-form-item label="状态">
            <el-tooltip :content="advertData.status=='1'?'已禁用':'已启用'" placement="top">
              <el-switch
                v-model="advertData.status"
                active-color="#ff4949"
                inactive-color="#13ce66"
                active-value="1"
                inactive-value="0"
              ></el-switch>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :offset="1" :span="9">
          <el-form-item label="排序" prop="ranks">
            <el-input-number
              v-model="advertData.ranks"
              :min="1"
              :disabled="edit"
              style="width:265px;line-height: 38px;"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注">
        <el-input type="textarea" maxlength="125" v-model="advertData.remarks"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="saveBanner('advertData')">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "tenantry-edit",
  props: {
    advertData: Object
  },
  data() {
    return {
      advertData: {
        ranks: "",
        status: "",
        telPhone:"",
        email:"",
        contacter:"",
        address:"",
        code:"",
        name:""
      },
      edit: false,
      rules: {
        code: [{ required: true, message: "编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        address: [
          {
            min: 5,
            max: 40,
            message: "长度在 5 到 40个字符",
            trigger: "change"
          }
        ],
        contacter: [
          { min: 2, max: 8, message: "长度在 2 到 8个字符" },
          {
            pattern: /^[\u4e00-\u9fa5]{0,}$/,
            message: "只能输入中文",
            trigger: "change"
          }
        ],
        telPhone: [
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/,
            message: "您输入的联系电话有误",
            trigger: "change"
          }
        ],
        email: [
          {
            pattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
            message: "您输入的邮箱格式有误，请重新输入",
            trigger: "change"
          }
        ],
        ranks: [{ required: true, message: "排序不能为空", trigger: "change" }]
      },
      disabled: false
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    saveBanner(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          that.disabled = true;
          that
            // /epf-admin/admin/Tenantry/add
            .$post(that.$API.EPF_ADMIN.TENANTRY_ADD, that.advertData)
            .then(res => {
              if (res.code != "0") {
                that.$message.error(res.msg); //失败
                that.disabled = false;
                return;
              }
              that.disabled = false;
              that.$message.success("保存成功！");
              // that.getTenantryManage(that.searchAdvert);
            });
        } else {
          this.$message.error("请确保信息填写正确");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
