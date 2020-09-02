<template>
  <el-form :model="org"  status-icon  :rules="validations" ref="validations" label-width="100px" class="demo-ruleForm">
    <el-row>
        <el-col  :span="20">
         <!-- <el-form-item label='是否创建父级机构：' style="width: 250px;" >-->
           <span  style="color: red;"> 是否创建父级机构：</span>
           <span style="position:relative;top:-10px;">
             <el-switch
              style="margin-left:20px;margin-top: 15px;"
              v-model="isacrateparent"
              active-color="#13ce66"
              inactive-color="#b9ccfd"
              active-value="1"
              inactive-value="0"
              active-text="否"
              inactive-text="是"
              @change="changeParent">
            </el-switch>
         </span>
        <!--  </el-form-item>-->
        </el-col>
    </el-row>
    <el-row  style="padding-top: 15px;">
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
          <el-input v-model="parentOrgName"  :disabled='true'/>
        </el-form-item>
        <el-form-item label="排序" prop="rank">
          <el-input v-model.number="org.rank" type="number" :min="1"/>
        </el-form-item>
        <el-form-item label="联系人" prop="liaison">
          <el-input v-model.number="org.liaison"/>
        </el-form-item>
      </el-col>
      <el-col  :span="12">
        <el-form-item label="机构编号" prop="orgCode">
          <el-input  v-model="org.orgCode" auto-complete="off" @blur.native.capture="checkOrgCode" />
          <span style="color: red;font-size: 10px;height: 10px;">{{orgCheckInfo}}</span>
        </el-form-item>
        <el-form-item label="联系电话" prop="telPhone">
          <el-input  v-model="org.telPhone" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="隶属区域" prop="regional">
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
               active-value="1"
               inactive-value="0"
               active-text="否"
               inactive-text="是">
          </el-switch>
         </span>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="close">关闭</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
    import { Rules } from '@/puzzles/system/page/user/components/rules'
    export default {
        name: "org-add",
        props:{
            modelParam:{ type:Object,default:null}
        },
        data() {
            return {
                org: {orgName: '',showstate: ''},// 机构对象
                validations: Rules.ORG,// 校验对象
                orgTypes:[],// 机构类型
                orgLevels:[],// 机构级别
                regionData:[],// 区域级联选择树
                isacrateparent: '1',
                getOrgId: '',
                getOrgName: '',
                parentOrgName: '',
                parentOrgId: '',
                mineStatus: '',
                getRegionalCode: '',
                defaultId: '',
                orgCheckInfo:'',
            };
        },
        created(){
            let orgData=this.modelParam["org"];
            debugger
            this.getOrgId=orgData.id;
            this.getOrgName=orgData.orgName;
            this.parentOrgName=this.getOrgName;
            this.parentOrgId= this.getOrgId;
            this.initDataObj();
        },
        methods: {
            initDataObj(){
                let that=this;
                that.$get(that.$API.EPF_ADMIN.ORG.INIT).then(r => {
                    that.orgTypes = r.data.orgTypes;
                    that.orgLevels= r.data.orgLevels;
                    this.regionData=r.data.regionData;
                    if(this.regionData.length>0){
                      this.defaultId=this.regionData[0].id;
                    }
                });
            },
            changeParent(){
                debugger
                if(this.isacrateparent=="0"){
                    this.parentOrgName = "";
                    this.parentOrgId = "";
                }
                if(this.isacrateparent=="1"){
                    this.parentOrgName = this.getOrgName;
                    this.parentOrgId = this.getOrgId;
                }
            },
            submitForm() {
                let that=this;
                if (this.mineStatus.length ===0) {
                  this.errors.errorsRegional = "*隶属区域不能为空!";
                  return;
                }
                that.org["id"]="";
                that.$refs['validations'].validate((valid) => {
                    if (valid) {
                        delete that.org.children;
                        that.org["parentId"]=this.parentOrgId;
                        that.$post(that.$API.EPF_ADMIN.ORG.ADD,that.org).then(r => {
                            that.$message.success(r.msg);
                            that.$emit('refreshPage',r.org);
                            that.close();
                        });
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            close(){
                this.$emit('closeDialog',this.org);
            },
          /**
           * 检验机构编码唯一
           */
            checkOrgCode(){
              let that=this;
              that.$post(that.$API.EPF_ADMIN.ORG.CHECKORGCODE,{orgCode:that.org.orgCode}).then(r => {
                that.orgCheckInfo=r.info;
              });
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
