<template>
  <el-form :model="org"  :rules="validations" ref="validations" label-width="100px" class="demo-ruleForm">
    <el-row>
      <el-col  :span="12">
        <el-form-item label="机构名称" prop="orgName">
          <el-input  v-model="org.orgName" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input  v-model="org.address" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="机构类型" prop="orgType">
          <el-select v-model="org.orgType" placeholder="请选择机构类型" style="width:100%;">
            <el-option v-for="orgType of orgTypes" :key="orgType.id" :label="orgType.zhCn" :value="orgType.dictValue" style="width:100%;"/>
          </el-select>
        </el-form-item>
        <el-form-item label="父机构" prop="parentId">
          <el-cascader :options="orgCascaderOptions"
                       v-model="org.parentId"
                       :props="{checkStrictly: true, checkStrictly: true,value: 'id',label: 'name',children: 'children' }"
                       @change="handleChange"
                       style="width:300px;"
                       clearable></el-cascader>
        </el-form-item>
        <el-form-item label="排序" prop="rank">
          <el-input type="number" v-model.number="org.rank" :min="1"/>
        </el-form-item>
        <el-form-item label="联系人" prop="liaison">
          <el-input v-model.number="org.liaison"/>
        </el-form-item>
      </el-col>
      <el-col  :span="12">
        <el-form-item label="机构编号" prop="orgCode">
          <el-input  v-model="org.orgCode" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="联系电话" prop="telPhone">
          <el-input  v-model="org.telPhone" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="隶属区域" prop="area">
          <!--<el-cascader style="width:100%;"
                       :options="regionData"
                       v-model="org.regional"
                       @change="regionDataChange"
                       :props="{ multiple: false, checkStrictly: true,value: 'regionCode',label: 'regionName',children: 'children'}"
                       clearable/>-->
            <el-select v-model="mineStatus" placeholder="请选择隶属区域" multiple collapse-tags   style="width: 100%;"  >
              <el-option :value="mineStatus" style="height: auto">
                <!-- default-expand-all  这是默认展开所有树数据-->
                <el-tree :data="regionData" show-checkbox check-strictly node-key="id"
                         :default-expanded-keys="[defaultId]"
                         ref="tree" highlight-current
                         :props="{ multiple: false, value: 'regionCode',label: 'regionName',children: 'children'}"
                         @check-change="handleCheckChange"></el-tree>
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="级别" prop="orgLevel">
          <el-select v-model="org.orgLevel" placeholder="请选择机构级别" style="width:100%;">
            <el-option v-for="orgLevel of orgLevels" :key="orgLevel.id" :label="orgLevel.zhCn" :value="orgLevel.dictValue" style="width:100%;"/>
          </el-select>
        </el-form-item>
        <el-form-item label="邮政编码" prop="postalCode">
          <el-input v-model.number="org.postalCode"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="org.email"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col  :span="20">
        <span > 对社会公众显示状态：</span>
        <span style="position:relative;top:-10px;">
             <el-switch
               style="margin-left:20px;margin-top: 15px;"
               v-model="org.showstate"
               active-color="#13ce66"
               inactive-color="#b9ccfd"
               active-value="0"
               inactive-value="1"
               active-text="否"
               inactive-text="是"
               >
          </el-switch>
         </span>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="submitForm('validations')">提交</el-button>
          <el-button @click="close">关闭</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
    import { Rules } from '@/puzzles/system/page/user/components/rules'
    export default {
        name: "org-edit",
        props:{
            modelParam:{ type:Object,default:null}
        },
        data() {
            return {
                org: {
                    orgName: '',
                    address: '',
                    orgType: '',
                    parentId: '',
                    rank: '',
                    liaison: '',
                    orgCode: '',
                    telPhone: '',
                    regional: '',
                    orgLevel: '',
                    postalCode: '',
                    email: '',
                    showstate: ''
                },// 机构对象
                validations: Rules.ORG,// 校验对象
                orgTypes:[],// 机构类型
                orgLevels:[],// 机构级别
                orgCascaderOptions:[],
                regionData:[],// 区域级联选择树
                mineStatus: '',
                getRegionalCode: '',
                defaultId: ''
            };
        },
        created(){
            this.initDataObj();
        },
        methods: {
            initDataObj(){
                this.org=this.modelParam["org"];
                let arrLabel = [];
                arrLabel.push(this.org.regionalSname);
               this.mineStatus = arrLabel;
                this.$get(this.$API.EPF_ADMIN.ORG.INIT).then(r => {
                    if(r.code != '0'){
                        that.$message.error(r.msg);
                        return 0;
                    }
                    this.orgTypes = r.data.orgTypes;
                    this.orgLevels = r.data.orgLevels;
                    this.orgCascaderOptions=r.data.orgCascaderOptions;
                    this.regionData=r.data.regionData;
                });
            },
            submitForm(formName) {
                let _this=this;
                if (this.mineStatus.length ===0) {
                  this.errors.errorsRegional = "*隶属区域不能为空!";
                  return;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                         delete _this.org.children;
                         delete _this.org.regions;
                         delete _this.org.createTime;
                         delete _this.org.updateTime;
                        _this.$post(_this.$API.EPF_ADMIN.ORG.EDIT,_this.org).then(r => {
                            _this.$message.success(r.msg);
                            _this.$emit('refreshPage',_this.org);
                            _this.close();
                        });
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            close(){
                this.$emit('closeDialog');
            },
            handleChange(value) {
                this.org["parentId"] = value[value.length - 1];
            },
            regionDataChange(value){
                this.org["regional"] = value[value.length - 1];
            },
            handleCheckChange(data, checked, node) {
              let res = this.$refs.tree.getCheckedNodes(false, true); //true，1. 是否只是叶子节点 2.选择的时候不包含父节点）
              if (checked) {
                this.$refs.tree.setCheckedNodes([data]);
              }
              let arrLabel = [];
              let getregionCode="";
              res.forEach(item => {
                if (arrLabel.length === 0) {
                  arrLabel.push(item.regionName);
                  getregionCode=item.regionCode;
                } else {
                  arrLabel.length === 0;
                }
              });
              if(arrLabel.length==0){
                getregionCode="";
              }
              this.getRegionalCode = getregionCode;
              this.org["regional"] = getregionCode;
              this.mineStatus = arrLabel;
            }
        }
    }
</script>

<style scoped>

</style>
