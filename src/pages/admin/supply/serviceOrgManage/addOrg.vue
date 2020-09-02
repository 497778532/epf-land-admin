<template>
    <!-- 新增服务机构信息 -->
    <div class="publishTra_main">
        <div class="publishTra_main_title">
          <!--  <div class="publishTra_title_icon fl"></div>-->
          <h2 class="title" style="margin-left:20px">{{orgTitle}}</h2>
        </div>
        <div class="publishTra_main_cont">
            <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="140px"
            class="demo-ruleForm"
            v-if="dicFinsh"
            >
            <div style="display: flex;flex-direction: row;">
              <el-form-item label="机构名称：" prop="companyName">
                  <el-input v-model="ruleForm.companyName" style="width:300px;" placeholder="请输入机构名称"></el-input>
              </el-form-item>
              <el-form-item label="等级：" prop="companyLevelName">
                <el-select 
                        style="width:300px;"
                        class="filterCirculatemode" 
                        v-model="ruleForm.companyLevelName" 
                        placeholder="请选择公司等级" 
                        @change="levelTypeSelect(dictionary.companyLevels,ruleForm.companyLevelName,$event)" >
                        <el-option v-for="item in dictionary.companyLevels" :ref="item.zhCn" 
                            :id="item.id" :dictKey="item.dictKey" :label="item.zhCn" :value="item.zhCn" :key="item.dictKey">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div style="display: flex;flex-direction: row;">
                <el-form-item label="统一信用代码：" prop="creditCode">
                  <el-input v-model="ruleForm.creditCode" style="width:300px;" placeholder="请输入统一信用代码"></el-input>
                </el-form-item>
                <el-form-item label="服务类型："  required ref="serverType">
                  <!-- prop="serverType" -->
                    <template>
                        <el-checkbox-group
                            v-model="serviceType"
                            >
                            <el-checkbox v-for="item in dictionary.serviceTypes" :label="item.zhCn" :key="item.dictKey" @change="handleCheckChange(item, $event)">{{item.zhCn}}</el-checkbox>
                        </el-checkbox-group>
                    </template>
                </el-form-item>
            </div>
            <div style="display: flex;flex-direction: row;">
                <el-form-item label="公司类型：" prop="companyType">
                    <el-select 
                        style="width:300px;"
                        class="filterCirculatemode" 
                        v-model="ruleForm.companyTypeName" 
                        placeholder="请选择公司类型" 
                        @change="publishTypeSelect(dictionary.companyTypes,ruleForm.companyTypeName,$event)" >
                        <el-option v-for="item in dictionary.companyTypes" :ref="item.zhCn" 
                            :id="item.id" :dictKey="item.dictKey" :label="item.zhCn" :value="item.zhCn" :key="item.dictKey">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="成立日期：" prop="foundDate">
                    <el-col :span="11"  style="width: 226px;">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择成立日期" v-model="ruleForm.foundDate"></el-date-picker>
                    </el-col>
                </el-form-item>
            </div>
            <div style="display: flex;flex-direction: row;">
              <el-form-item label="注册地址：" prop="cantonProvince" style="width:426px;">
              <!-- <v-distpicker v-show="isShowProvince" :province="temp.address__province" :city="temp.address__city" :area="temp.address__dist" @selected="onSelected"></v-distpicker> -->
              <el-select v-model="ruleForm.cantonProvinceName" placeholder="请选择土地所在省" @visible-change="provinceSelect(dictionary.administrative_regions,ruleForm.cantonProvinceName,$event)" >
                  <el-option v-for="item in dictionary.administrative_regions" :ref="item.regionName" 
                  :id="item.id" :regionCode="item.regionCode" :label="item.regionName" :value="item.regionName" :key="item.regionCode"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item prop="cantonCity" class="canton_Regions">
                  <el-select v-model="ruleForm.cantonCityName" placeholder="请选择土地所在市" @change="citySelect(dictionary.cantonCity,ruleForm.cantonCityName,$event)">
                      <el-option v-for="item in dictionary.cantonCity" :ref="item.regionName"  
                      :id="item.id" :regionCode="item.regionCode" :label="item.regionName"  :value="item.regionName" :key="item.regionCode"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item prop="cantonArea" class="canton_Regions">
                  <el-select v-model="ruleForm.cantonAreaName" placeholder="请选择土地所在区/县"  @change="areaSelect(dictionary.cantonAreaName,ruleForm.cantonAreaName,$event)">
                      <el-option v-for="item in dictionary.cantonArea" :ref="item.regionName"
                      :id="item.id" :regionCode="item.regionCode" :label="item.regionName"  :value="item.regionName" :key="item.regionCode" ></el-option>
                  </el-select>
              </el-form-item>
                <el-input v-model="ruleForm.address" style="width:320px;margin-left:5px;" placeholder="请输入注册地址"></el-input>
            </div>
            <div style="display: flex;flex-direction: row;">
                <el-form-item label="机构图标：" class="uplaodList" prop="companyIco" style="width:440px;">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :http-request="uploadFileIcon"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        
                    <div v-if="imageUrl" class="file-panel" @click="handlePictureCardPreview">预览</div>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="imageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="营业执照：" class="uplaodList" prop="license">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :http-request="uploadFile"
                        :on-success="handleAvatarSuccess1"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="iconUrl" :src="iconUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div v-if="iconUrl" class="file-panel" @click="handleIconCardPreview">预览</div>
                    <el-dialog :visible.sync="dialogVisibleIcon">
                      <img width="100%" :src="iconUrl" alt="">
                    </el-dialog>
                </el-form-item>
            </div>
            
            <el-form-item label="经营范围：" prop="businessScope">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="ruleForm.businessScope">
                </el-input>
            </el-form-item>
            <el-form-item label="法人名称：" prop="corporation">
                <el-input v-model="ruleForm.corporation" placeholder="请输入法人名称" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="法人身份证号：" prop="legalCard">
                <el-input v-model="ruleForm.legalCard" style="width:300px;" placeholder="请输入法人身份证号"></el-input>
            </el-form-item>
            <el-form-item label="法人联系电话：" prop="legalPhone">
                <el-input v-model="ruleForm.legalPhone" style="width:300px;" placeholder="请输入法人联系电话"></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="contactPerson">
                <el-input v-model="ruleForm.contactPerson" style="width:300px;" placeholder="请输入联系人"></el-input>
            </el-form-item>
            <el-form-item label="联系人电话：" prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入联系人电话" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱：" >
                <el-input v-model="ruleForm.companyEmail" style="width:300px;" placeholder="请输入公司邮箱"></el-input>
            </el-form-item>
            <el-form-item label="公司简介：" prop="companySynopsis">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="ruleForm.companySynopsis">
                </el-input>
            </el-form-item>
            <el-form-item label="公司网址：" prop="webSite">
                <el-input v-model="ruleForm.webSite" style="width:820px;" placeholder="请输入公司网址"></el-input>
            </el-form-item>
            <div class="operation">
                <div class="search_input" @click="backPage">取消</div>
                <div class="search_input submit_input" @click="submitData('ruleForm')">提交</div>
            </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import qs from "qs";
import Axios from "axios";
import baseURL1 from "@/utils/config.js";
export default {
  components: {},
  data() {
    return {
      dialogVisibleIcon:false,
      dialogVisible:false,
      baseUrl: "",
      pickerOptions: {
        //日期范围快速选择配置
        shortcuts: [
          {
            text: "三 年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 365 * 3);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "五 年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 365 * 5);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "十 年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 365 * 10);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      serviceType: [],
      serviceTypeList:[],
      orgTitle:"",
      ruleForm: {
        // 公司名称：
        companyName: "",
        // 统一信用代码
        creditCode: "",
        // 等级
        companyLevel: "",
        // 等级名称
        companyLevelName: "",
        // 服务类型
        serveType: "",
        // 服务类型名称
        serveTypeName: "",
        // 公司类型
        companyType: "",
        // 公司类型名称
        companyTypeName: "",
        // 公司图标
        img: "",
        // 省
        cantonProvince: "",
        // 省名称
        cantonProvinceName: "",
        // 市
        cantonCity: "",
        // 市名称
        cantonCityName: "",
        // 区
        cantonArea: "",
        // 区名称
        cantonAreaName: "",
        // 注册地址
        address: "",
        // 营业执照
        businessLicense: "",
        // 成立日期
        foundDate: "",
        // 经营范围
        businessScope: "",
        // 法人名称
        corporation: "",
        // 法人身份证号
        legalCard: "",
        // 法人联系电话
        legalPhone: "",
        // 联系人
        contactPerson: "",
        // 联系电话
        phone: "",
        // 公司邮箱
        companyEmail: "",
        // 公司简介
        companySynopsis: "",
        // 公司网址
        webSite: ""
      },
      useDate: [], //日期范围
      rules: {
        companyName: [
            { required: true, message: "请输入公司名称",},
            { min:1,max: 100,message: "长度在 1 到 100个字符"},
            { pattern: /^[\u4E00-\u9FA5a-zA-Z0-9][\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,message: '可以输入文字、数字英文及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】.'}
        ],
        companyLevelName:[{ required: true, message: "请选择公司等级"}],
        creditCode: [
            { required: true, message: "请输入统一信用代码", trigger: "change" },
            { min: 1,max:18,message: "统一社会信用代码设计为18位"},
            { pattern: /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}/,message: '统一社会信用代码设计为18位，使用阿拉伯数字或英文字母表示.'}
        ],
        serverType: [{ required: true, message: "请选择服务类型", trigger: "change" }],
        serviceType: [{ required: true, message: "请选择服务类型", trigger: "change" }],
        companyType: [{ required: true, message: "请选择公司类型", trigger: "change" }],
       /* companyIco: [{ required: true, message: "请上传机构图标", trigger: "change" }],*/
        address: [
            { required: true, message: "请输入注册地址",trigger: "change" },
            { min: 1,max: 100,message: "长度在 1 到 100个字符"},
            { pattern: /^[\u4E00-\u9FA5a-zA-Z0-9][\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,message: '可以输入文字、数字英文及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】.'}
        ],
       /* license: [
            { required: true, message: "请上传营业执照", trigger: "change"}
        ],*/
        foundDate: [
            { required: true, message: "请选择成立日期", trigger: "change" }
          ],
        businessScope: [
          { required: true, message: "请输入经营范围"},
          {min: 1,max:500,message: "长度在 1 到 500个字符"},
          // { pattern: /^[\u4E00-\u9FA5a-zA-Z0-9][\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,message: '可以输入文字、数字英文及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】.'}
          ],
        corporation:[
            { required: true, message: "请输入法人名称"},
            {min: 1,max:100,message: "长度在 1 到 100个字符"},
            { pattern: /^[\u4E00-\u9FA5a-zA-Z0-9][\u4E00-\u9FA5A-Za-z0-9\·]+$/,message: '可以输入文字、数字英文及标点符号 · .'}
        ],
        legalCard:[
                { required: true, message: "请输入法人身份证号"},
                { pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,message: "您输入的证件号有误"}
            ],
        legalPhone:[
           { required: true, message: "请输入法人联系电话号码"},
          { pattern: /^(0\d{2,3}-\d{7,8}$)|((13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$)/,message: "您输入的手机号有误"}
          ],
        contactPerson:[
            { required: true, message: "请输入联系人名称"},
            { min:1,max: 100,message: "长度在 1 到 100个字符"},
            { pattern: /^[\u4E00-\u9FA5a-zA-Z0-9][\u4E00-\u9FA5A-Za-z0-9\·]+$/,message: '可以输入文字、数字英文及标点符号 · .'}
        ],
        phone:[
           { required: true, message: "请输入联系人电话号码"},
           { pattern: /^(0\d{2,3}-\d{7,8}$)|((13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$)/,message: "您输入的手机号有误"}
          // { pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,message: "您输入的手机号有误"}
          ],
        companySynopsis: [
            { required: true, message: "请输入公司简介", trigger: 'blur'},
            { min: 1,max:1000,message: "长度在 1 到 1000个字符"},
            { pattern: /^[\u4E00-\u9FA5a-zA-Z0-9][\u4E00-\u9FA5A-Za-z0-9\、\,\，\_\-\———\【】()（）]+$/,message: '可以输入文字、数字英文及部分标点符号，顿号、逗号、连接号（-）、破折号、括号（）【】.'}
        ],
        webSite:[  { min: 1,max:100,message: "长度在 1 到 100个字符"} ]
      },
      dicRequest: [
        "service_type",
        "company_type",
        "grade_type",
        "administrative_regions"
      ], //字典码请求
      dictionary: {
        //字典码结果
        serviceTypes: "",
        companyTypes: "",
        companyLevels: "",
        administrative_regions: "",
        cantonCity: "",
        cantonArea: ""
      },
      dicNum: 0, //字典循环下标
      dicFinsh: true, //接口请求完成
      imageUrl: "",
      iconUrl: ""
    };
  },
  mounted(){

    let that = this;
    window.scrollTo(0, 120);
    this.baseUrl =
      baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    // 编辑回显数据
    if (this.$route.query.company) {
      this.orgTitle="修改机构";
      function getChangeDate(date) {
        return (
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate()
        );
      }
      this.$get("/epf-supply/admin/tserveinstitution/getTServeInstitution", {
        id: this.$route.query.company
      }).then(res => {
        if (res.code === 0) {
          res.tServeInstitution.foundDate = getChangeDate(
            new Date(res.tServeInstitution.foundDate)
          );
          this.ruleForm = res.tServeInstitution;
          if(res.tServeInstitution.serveType){
            this.handleCheckChangeSuccess(res.tServeInstitution.serveType.split(","));
          }
          if (this.ruleForm.img) {
            this.imageUrl = this.baseUrl + this.ruleForm.img;
          }
          if (this.ruleForm.businessLicense) {
            this.iconUrl = this.baseUrl + this.ruleForm.businessLicense;
          }
          console.log("表单回显", this.ruleForm);
        }
      });
    }else{
      this.orgTitle="添加机构";
    }
  },
  created() {

    let that = this;
  
    //请求字典
    this.$get(
      `/epf-supply/dictionaries/getDictsByCodeOrParentId?code=administrative_regions`,
      { parentId: "0" }
    ).then(res => {
      console.log('请求字典返回',res);
      if (res.dictionariesList.length != 0) {
        this.dictionary.administrative_regions = res.dictionariesList;
        return;
      }
      this.dictionary.administrative_regions = "";
    });

    //请求字典
    this.$get(
      `/epf-supply/dictionaries/getDictsByCodeOrParentId?code=company_type`,
      {}
    ).then(res => {
      console.log(res);
      if (res.dictionariesList.length != 0) {
        that.dictionary.companyTypes = res.dictionariesList;
        return;
      }
      that.dictionary.companyTypes = "";
    });
    //请求字典
    this.$get(
      `/epf-supply/dictionaries/getDictsByCodeOrParentId?code=service_type`,
      {}
    ).then(res => {
      console.log(res);
      if (res.dictionariesList.length != 0) {
        this.dictionary.serviceTypes = res.dictionariesList;
        return;
      }
      this.dictionary.serviceTypes = "";
    });
    //请求字典
    this.$get(
      `/epf-supply/dictionaries/getDictsByCodeOrParentId?code=grade_type`,
      {}
    ).then(res => {
      console.log(res);
      if (res.dictionariesList.length != 0) {
        this.dictionary.companyLevels = res.dictionariesList;
        return;
      }
      this.dictionary.companyLevels = "";
    });
    this.getProvinceData()

  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogVisible = true;
    },
    handleIconCardPreview(file) {
      this.dialogVisibleIcon = true;
    },
    // 提交保存
    submitData(formName) {
      this.ruleForm["updateTime"] = "";
      const orgInfo = this.ruleForm;
      if(this.imageUrl==''){
        this.$message.error("请上传机构图标");
        return ;
      }
      if(this.iconUrl==''){
        this.$message.error("请上传营业执照");
        return ;
      }
      orgInfo.serveType = this.serviceTypeList.toString();
      if(orgInfo.serveType==[]){
        this.$message.error("请选择服务类型");
        return ;
        
      }
      //提交表单
      this.$refs[formName].validate(valid => {
        if (valid) {
          let url = "/epf-supply/admin/tserveinstitution/addTServeInstitution";
          if (this.$route.query.company) {
            url = "/epf-supply/admin/tserveinstitution/editTServeInstitution";
          }
          this.$post(url, orgInfo)
            .then(res => {
              if (res.code === 0) {
                // this.$message.warning(res.msg);
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$router.push({ path: "/serverOrgManage" });
                return;
              } else {
                this.$message.warning(res.msg);
              }
            })
            .catch(res => {
              this.$message.warning(res.msg);
            });
        } else {
          window.scrollTo(0, 120);
          this.$message.error("请确保信息填写正确");
          return false;
        }
      });
    },
    // @name: 行政区域
    // @description: 主要是getAreaByCodeOrParentId接口返回字段修改zhCn -> regionName，dictKey->regionCode
    // @author: gaojie
    // @chageTime:2020-3-2
    getProvinceData() {
      let that = this;
      that.$get(`/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000`,{}).then(res => {
        that.dictionary.administrative_regions = res.dictionariesList;
      })
    },
    // 选择省
    provinceSelect(dic, cantonCode, event) {
      this.ruleForm.cantonAreaName = "";
      this.ruleForm.cantonArea = "";
      this.ruleForm.cantonCityName = "";
      this.ruleForm.cantonCity = "";
      let pId = this.$refs[cantonCode][0].$attrs.id;
      this.ruleForm.cantonProvince = this.$refs[cantonCode][0].$attrs.regionCode;
      this.dictionary.cantonArea = [];
      this.$get(
        `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        console.log(res);
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonCity = res.dictionariesList;
          return;
        }
        this.dictionary.cantonCity = "";
      });
    },
    // 选择市
    citySelect(dic, cantonCity, event) {
      this.ruleForm.cantonArea = "";
      this.ruleForm.cantonAreaName = "";
      let pId = this.$refs[cantonCity][0].$attrs.id;
      this.ruleForm.cantonCity = this.$refs[cantonCity][0].$attrs.regionCode;
      this.$get(
        `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        console.log(res);
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonArea = res.dictionariesList;
          return;
        }
        this.dictionary.cantonArea = "";
      });
    },
    // 选择区县
    areaSelect(dic, cantonCity, event) {
      this.ruleForm.cantonArea = this.$refs[cantonCity][0].$attrs.regionCode;
    },
    // 取消
    backPage() {
      this.$router.push({ path: "/serverOrgManage" });
    },
    // 选择公司类型
    publishTypeSelect(dic, companyTypeName, event) {
      this.ruleForm.companyType = this.$refs[companyTypeName][0].$attrs.dictKey;
    },
    // 选择公司等级
    levelTypeSelect(dic, companyLevelName, event) {
      this.ruleForm.companyLevel = this.$refs[
        companyLevelName
      ][0].$attrs.dictKey;
    },
    // 复选服务类型
    handleCheckChange(obj, val) {
      if (val == true) {
        //this.serviceType.push(obj.dictKey);
        this.serviceTypeList.push(obj.dictKey);
        console.log(this.serviceTypeList)
      } else {
        //this.serviceType.splice(obj.dictKey, 1);
        for(let j=0;j<this.serviceTypeList.length;j++) {
          if(this.serviceTypeList[j]==obj.dictKey){
            this.serviceTypeList.splice(j,1);
            break;
          }
        }
      }
    },
    //回显复选服务类型
    handleCheckChangeSuccess(obj) {
      for(let j=0;j<obj.length;j++){
        for(let i=0;i< this.dictionary.serviceTypes.length;i++){
          if(this.dictionary.serviceTypes[i].dictKey==obj[j]){
            this.serviceType.push(this.dictionary.serviceTypes[i].zhCn);
            this.serviceTypeList.push(obj[j]);
            break;
          }
        }
      }
      console.log(obj)
    },
    // 回显机构图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 回显营业执照图片
    handleAvatarSuccess1(res, file) {
      this.iconUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG /PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 上传附件点击-机构图标
    uploadFileIcon(files) {
      const file = files.file;
      const formData = new FormData();
      formData.append("files", file);
      formData.append("belong", "");
      formData.append("pId", "");
      this.upload(formData, files, file, "1");
    },
    // 上传附件点击-营业执照
    uploadFile(files) {
      const file = files.file;
      const formData = new FormData();
      formData.append("files", file);
      formData.append("belong", "");
      formData.append("pId", "");
      this.upload(formData, files, file, "2");
    },
    // 上传方法调用
    upload(formData, files, file, type) {
      this.$useAppend("/epf-document/document/upload/", formData).then(
        res => {
          if (res == "error") {
            files.onError();
            return null;
          }
          files.onSuccess(res);
          if (type == "1") {
            //机构图标
            this.ruleForm.img = res.data[0].id;
            this.imageUrl = this.baseUrl + this.ruleForm.img;
          } else {
            // 营业执照
            this.ruleForm.businessLicense = res.data[0].id;
            this.iconUrl = this.baseUrl + this.ruleForm.businessLicense;
          }
        },
        function(event) {
          //进度条
          file.percent = (event.loaded / event.total) * 100;
          files.onProgress(file);
        }
      );
    },
    //删除附件
    handleRemove(id) {
      var url = "/epf-document/document/deleteById";
      let paras = { id: id };
      this.$post(url, paras)
        .then(res => {
          if (res.state === "SUCCESS") {
            this.$message.warning(res.msg);
            queryFiles(this.parentId);
          } else {
            this.$message.warning(res.msg);
          }
        })
        .catch(res => {
          this.$message.warning(res.msg);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}

.publishTra_Pro {
  @include size(100%, 127px);
  background: #ebeeec;
  box-sizing: border-box;
  padding-left: 80px;
  clear: both;
  &_title {
    font-size: 20px;
    line-height: 127px;
    color: #666666;
    float: left;
    margin-right: 168px;
  }
  &_cont {
    @include size(800px, 64px);
    margin-top: 42px;
    border: 1px solid red;
    float: left;
    ul {
      @include size(100%, 100%);
      li {
        @include size(30%, 100%);
        border: 1px solid red;
        float: left;
        //   display: inline-block;
        .el-step_line {
          width: 241px;
          height: 6px;
          background-color: #ffa000;
          border-radius: 3px;
        }
        .el-step_icon {
          @include size(30px, 30px);
          background: #f8850e;
          border: 3px solid #ffb82f;
          color: #fff;
          font-size: 20px;
          text-align: center;
          line-height: 30px;
          border-radius: 50%;
        }
        .step_title {
          border: 1px solid pink;
          width: 100%;
          height: 20px;
          line-height: 20px;
          text-align: center;
          color: #ffa000;
          font-size: 14px;
        }
      }
    }
  }
}
.publishTra_main {
  @include size(1200px, auto);
  margin-bottom: 25px;
  background: #fff;
  &_title {
    @include size(100%, 80px);
    .publishTra_title_icon {
      width: 6px;
      height: 21px;
      background: #ffca73;
      border-radius: 3px;
      display: inline-block;
      margin-top: 30px;
      margin-right: 12px;
    }
    .title {
      font-size: 16px;
      color: #333333;
      font-weight: bold;
      line-height: 80px;
    }
  }
  &_cont {
    box-sizing: border-box;
    padding: 0px 120px 30px 120px;
    .operation {
      margin-left: 200px;
      .search_input {
        @include size(82px, 36px);
        background-color: #ffa000;
        border-radius: 3px;
        font-size: 14px;
        color: #fff;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        margin-right: 24px;
        display: inline-block;
      }
      .submit_input {
        background: #fff;
        border: solid 1px #ffa000;
        color: #ffa000;
      }
    }
  }
}
.el-form-item{
  margin-bottom:30px;
}.file-panel {
  position: absolute;
  bottom: 0;
  width: 178px;
  height: 30px;
  background: rgba(0, 0, 0, 0.8);
  color:#fff;
  font-size:20px;
  line-height:30px;
  text-align: center;
  cursor: pointer;
}
</style>
<style>

.canton_Regions > .el-form-item__content {
  margin-left: 5px !important;
}
.el-upload__input {
  width: 300px;
}
.el-checkbox {
  margin-right: 10px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.uplaodList .avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  object-fit: cover;
}
input[type="file"] {
  display: none;
}
.uplaodList{
  position: relative;
}
.uplaodList .avatar-uploader .el-upload--text{
width: 178px;
}
.uplaodList:after{
  content: '*';
  color: red;
  position: absolute;
  left: 47px;
  top:9px;
}
</style>
