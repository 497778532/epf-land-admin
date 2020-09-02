<template>
  <div id="orgManage">
    <el-container>
      <el-aside width="300px" style="padding-top:10px;padding-left:20px;">
        <el-container>
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}" class="m_title">区域
          </el-header>
          <el-main
            :style="{'height':menuListHeight + 'px','paddingTop':'10px','borderRight':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)','borderLeft':'1px solid rgb(224, 224, 224)'}">
            <el-tree :data="data4"
                     v-loading="loading"
                     element-loading-text="数据加载中"
                     element-loading-background="rgba(255, 255, 255,0.95)"
                     :props="defaultProps"
                     node-key="id"
                     :check-strictly="true"
                     @check-change="loadOrgProTableData"
                     :expand-on-click-node="false"
                     class="orgManange_List"
                     draggable
                     show-checkbox
            >
            </el-tree>
          </el-main>
        </el-container>
      </el-aside>
      <el-main style="margin-left:15px;padding-top:10px;padding-right:20px;">
        <el-container>
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}" class="m_title">实名认证
          </el-header>
          <div>
            <div class="filter_wrap">
              <!-- 搜索 -->
              <div class="switchHeight_box">
                <el-row :gutter="2">

                </el-row>
                <el-row style="margin-top:10px;margin-bottom:10px;">
                  <el-col :span="2">
                    <span class="filter_title">用户名:</span>
                  </el-col>
                  <el-col :span="3">
                    <el-input size="small" v-model="searchInfo.username" placeholder="用户名"></el-input>
                  </el-col>
                  <el-col :span="6" :offset="1">
                    <div class="btnBox">
                      <div class="button_border" @click="searchData">查询</div>
                      <div class="button_default" @click="resetFilter" style="margin:0;">重置</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <el-table
                :data="tableData"
                style="width: 100%"
                border
                v-loading="loading"
                element-loading-text="数据加载中"
                element-loading-background="rgba(255, 255, 255,0.95)">
                <el-table-column
                  prop="number"
                  label="序号"
                  min-width="50"
                  align="center">
                  <template slot-scope="scope">
                    <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="真实姓名" min-width="180" align="center">
                  <template slot-scope="scope">
                    {{ scope.row.realName }}
                  </template>
                </el-table-column>
                <el-table-column label="证件类型" min-width="180" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.certificatesType==1">身份证</span>
                    <span v-if="scope.row.certificatesType==2">户口簿</span>
                  </template>
                </el-table-column>
                <el-table-column label="证件号" min-width="180" align="center">
                  <template slot-scope="scope">
                    {{ scope.row.certificatesNo }}
                  </template>
                </el-table-column>
                <el-table-column label="所属地区" min-width="180" align="center">
                  <template slot-scope="scope">
                    {{ scope.row.cantonProvinceName!=null?scope.row.cantonProvinceName:''+scope.row.cantonCityName!=null?scope.row.cantonCityName:''+scope.row.cantonAreaName!=null?scope.row.cantonAreaName:'' }}
                  </template>
                </el-table-column>
                <el-table-column label="证件有效期" min-width="180" align="center">
                  <template slot-scope="scope">
                    {{ scope.row.certificatesLmdate }}
                  </template>
                </el-table-column>
                <el-table-column label="提交时间" min-width="180" align="center">
                  <template slot-scope="scope">
                    {{ scope.row.commitDate }}
                  </template>
                </el-table-column>
                <el-table-column label="审核状态" min-width="180" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.auditStatus=='1'">审核通过</span>
                    <span v-if="scope.row.auditStatus=='0'">审核不通过</span>
                    <span v-if="scope.row.auditStatus==null">未审核</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="160">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row,'view')">查看</el-button>
                    <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row,'audit')" v-if="scope.row.auditStatus=='1'">审核</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 分页控件 -->
              <div style="text-align:right;margin: 8px 0px 5px;">
                <el-pagination
                  background
                  layout="prev, pager, next,sizes,jumper"
                  :page-sizes="[5,10, 15, 20]"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :total="totalRecord"
                  :page-size="pageSize"
                  :current-page="pageNo">
                </el-pagination>
              </div>
            </div>
            <!-- 编辑弹窗 -->
            <el-dialog :title="dialogTitle" class="companyInfo" width="1200px" :visible.sync="editorPopup" :append-to-body='true'>
              <div class="findPassInfo_Pro_con">
                <el-form :model="ruleForm"  ref="ruleForm" label-width="150px">
                  <el-form-item label="真实姓名：">
                    <el-input   v-model="ruleForm.realName" placeholder="你本人的真实姓名" readonly="readonly"></el-input>
                  </el-form-item>
                  <el-form-item  label="证件类型：">
                    <span v-if="ruleForm.certificatesType==1">身份证</span>
                    <span v-if="ruleForm.certificatesType==2">户口簿</span>
                  </el-form-item>
                  <el-form-item label="证件号：">
                    <el-input  v-model="ruleForm.certificatesNo" placeholder="你本人的身份证号码" />
                  </el-form-item>
                  <el-form-item label="证件有效期：" >
                    <el-input  v-model="ruleForm.certificatesLmdate"  readonly="readonly" />
                  </el-form-item>
                  <el-form-item label="所在地区:" prop="cantonProvinceName">
                    <el-input
                      type="textarea"
                      maxlength="1000"
                      minlength="0"
                      v-model="ruleForm.cantonLocation"
                      autosize
                      readonly="readonly"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="身份证正反面：">
                    <img v-if="idcardFrontImageUrl" :src="idcardFrontImageUrl" class="avatar-img">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <img v-if="idcardBackImageUrl" :src="idcardBackImageUrl" class="avatar-img">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-form-item>
<!--                  <el-form-item label="详细住址：">-->
<!--                    <el-input-->
<!--                      type="textarea"-->
<!--                      maxlength="1000"-->
<!--                      minlength="0"-->
<!--                      v-model="ruleForm.locationInfomation"-->
<!--                      autosize-->
<!--                      style="height:108px;"-->
<!--                      readonly="readonly"-->
<!--                    ></el-input>-->
<!--                  </el-form-item>-->
                </el-form>
              </div>
              <div style="text-align:center;margin-top:10px;">
                <el-button size="mini" type="success" @click="editorSubmit(1)" v-if="auditShow">审核通过</el-button>
                <el-button size="mini" type="success" @click="editorSubmit(0)" v-if="auditShow">审核不通过</el-button>
                <el-button size="mini" type="info" plain @click="editorPopup = false">关闭</el-button>
              </div>
            </el-dialog>
          </div>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import qs from 'qs';
  import selectInput from '@/components/common/form/selectInpt';

  export default {
    name: "UserAuthention",
    components: {selectInput},
    data() {
      return {
        data4: [],
        loading: true,
        defaultProps: {children: 'children', label: 'regionName',id: 'id'},
        newName: '1',
        menuListHeight: 100,
        orgTypes: [],
        orgLevels: [],
        areaData: [],
        dialogAreaCheck: false,
        buttons: [],
        theme_BackgroundColor: '',
        theme_TextColor: '',
        dialogForm: false,
        actInfo: {},
        landRes: '',
        useRes: '',
        filterData: {},
        tableData: [],
        orgArray: [],// 选择的机构ID
        rules: {
          buiName: [{required: true, message: "业务名称不能为空", trigger: 'blur'}],
          proName: [{required: true, message: "流程名称不能为空", trigger: 'blur'}],
          state: [{required: true, message: "启用状态：0-禁用，1-启用不能为空", trigger: 'blur'}],
        },
        pageNo: 1,// 当前页
        pageSize: 5,// 当前每页条数
        totalPage: 1,// 总页数
        totalRecord: 1,// 总条数，
        addPopup: false,//  控制新增弹窗
        editorPopup: false,//  控制编辑弹窗
        currentEditorIndex: 0,//  当前选中编辑的下表
        loading: true, //控制loading动画显示隐藏
        wfBusproConf: {},
        searchInfo: {},
        businessType: [],// 业务类型
        processModels: [],// 流程数据字典
        ruleForm:{},
        idcardFrontImageUrl:'',
        idcardBackImageUrl:'',
        auditShow:false,
        dialogTitle:'',
      }
    },

    created() {
      this.menuListHeight = window.innerHeight - 261;
      this.buttons = JSON.parse(localStorage.getItem("orgManage"));
      this.theme_BackgroundColor = localStorage.getItem("theme_BackgroundColor");
      this.theme_TextColor = localStorage.getItem("theme_TextColor");
      this.loadTree();
      this.queryDictList("org_level");
      this.queryDictList("org_type");
      this.queryDictList("business_Type");
      this.queryProcessModels();
      this.pageSize = 5;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = 5;
      this.getList();
    },
    methods: {
      loadTree: function () {
        const that = this;
        that.loading = true;
        that.$post('/epf-cms/regionals/getqueryalldataTrees').then(res => {
          that.loading = false;
          if (res.code === 0) {
            that.data4 = res.data.dataTree;
          }else{
            that.$message.warning(res.msg);
          }
        })
      },
      rowClickHandle: function (row, event, column) {
      },

      queryDictList: function (code) {
        var that = this;
        that.$get('/epf-cms/admin/dictionaries/getDictEbyDictGroup/' + code).then(res => {
          if (res.code === 0) {
            if (code == "org_level") {
              if (res.dictionariesList != null) {
                that.orgLevels = res.dictionariesList;
              } else {
                that.orgLevels = [];
              }
            } else if (code == "org_type") {
              if (res.dictionariesList != null) {
                that.orgTypes = res.dictionariesList;
              } else {
                that.orgTypes = [];
              }
            } else if (code == "business_Type") {
              if (res.dictionariesList != null) {
                that.businessType = res.dictionariesList;
              } else {
                that.businessType = [];
              }
            }
          } else {
            that.$message.warning(res.msg)
          }
        })
      },
      queryProcessModels: function () {
        var that = this;
        that.$get('/epf-activiti/wfbusproconf/queryProcessTree').then(res => {
          if (res.code === 0) {
            that.processModels=res.processTree;
          } else {
            that.$message.warning(res.msg)
          }
        })
      },
      buiNameChanged: function (item, event) {
        let that = this;
        if (typeof item != "undefined") {
          that.businessType.forEach(function (dict) {
            if (item == dict.zhCn) {
              that.wfBusproConf["buiCode"] = dict.dictValue;
              that.wfBusproConf["buisId"] = dict.id;
            }
          })
        }
      },
      proNameChanged:function(item,event){
        let that = this;
        if (typeof item != "undefined") {
          that.processModels.forEach(function (dict) {
            if (item == dict.zhCn) {
              that.wfBusproConf["proCode"] = dict.dictValue;
              that.wfBusproConf["procId"] = dict.id;
            }
          })
        }
      },
      searchData() {
          let that=this;
          that.getList();
      },
      resetFilter() {
        this.filterData = {};
        var that = this;
        var json = {};
        var filters = JSON.stringify(json);
        that.searchInfo['filterData'] = filters;
        that.getList();
      },
      handleEdit(index, row,clickType) {
        if (clickType=='view'){
            this.auditShow=false;
            this.dialogTitle='查看';
        }else {
            this.auditShow=true;
            this.dialogTitle='审核';
        }
        this.currentEditorIndex = index
        let id = row.id;
        this.ruleForm=row;
        this.ruleForm.cantonLocation=row.cantonProvinceName!=null?row.cantonProvinceName:''
        +row.cantonCityName!=null?row.cantonCityName:''
        +row.cantonAreaName!=null?row.cantonAreaName:''
        +row.locationInfomation!=null?row.locationInfomation:'';
        this.idcardFrontImageUrl = '/api/epf-document/document/downloadById?id=' + row.idcardFront;
        this.idcardBackImageUrl = '/api/epf-document/document/downloadById?id=' + row.idcardBack;
        this.editorPopup = true;
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.searchInfo["page"] = this.pageNo;
        this.searchInfo["rows"] = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.searchInfo["page"] = val;
        this.pageNo = val;
        this.searchInfo["rows"] = this.pageSize;
        this.getList();
      },
      getList: function () {
        let that = this;
        that.$post('/epf-cms/admin/user-autheniton/getsysreuser-authenitonjson', this.searchInfo).then(res => {
          if (res.code != '0') {
            that.$message.error(res.msg);//失败
            return
          }
          that.tableData = res.pager.results;
          that.totalRecord = res.pager.totalRecord;
          that.totalPage = res.pager.totalPage;
          this.loading = false;
        });
      },
      getObject(id) {
        var that = this;
        that.$post('/epf-cms/admin/user-autheniton/getAuthenticationByid', {id: id}).then(res => {
          if (res.code != '0') {
            that.$message.error(res.msg);//失败
            return
          }
          this.autheniton = {};
          this.autheniton = res.autheniton;
        });
      },
      loadOrgProTableData: function (data, checked, indeterminate) {
        let that = this;
        let afterOrgArray = [];
        if (checked) {
          if (typeof data != "undefined") {
            let orgObj = {};
            orgObj["id"] = data.id;
            orgObj["isParent"] = data.isParent;
            orgObj["name"] = data.regionName;
            that.orgArray.push(orgObj);
          }
        } else {
          that.orgArray.forEach(function (org) {
            let id = data.id;
            if (org.id != id) {
              afterOrgArray.push(org);
            }
          })
          that.orgArray = afterOrgArray;
        }
        that.searchInfo["params"] = JSON.stringify(that.orgArray);
        // 点击右左边的树，刷新右边列表数据
        that.pageSize = 5;
        that.searchInfo["page"] = this.pageNo;
        that.searchInfo["rows"] = 5;
        that.getList();
      },
        editorSubmit:function (btnType) {
            let that = this;
            that.ruleForm.auditStatus=btnType;
            that.$post('/epf-cms/admin/user-autheniton/todoinguser-authentication', {'userAuthentication': JSON.stringify(that.ruleForm)}).then(res => {
               if (res.code==0){
                   that.$message.success('审核成功！');
                   that.$router.go(-1);
               }
            });
        }
    }


  }
</script>

<style scoped>
  .m_title {
    height: 40px !important;
    line-height: 40px !important;
    padding-left: 30px;
    background: rgb(50, 58, 64);
    color: #fff;
    font-size: 16px;
  }

  .el-tree > div {
    margin: 5px 0;
  }

  .iconList {
    height: 300px;
    background: rgb(255, 213, 213);
    overflow-y: auto;
  }
</style>
<style>
  .orgManange_List .el-tree-node__content {
    margin-bottom: 5px;
  }

  .region {
    height: 350px;
    overflow: auto;
  }

  .areaSty {
    position: relative;
  }

  .areaSty:after {
    content: '*';
    color: red;
    position: absolute;
    left: 30px;
    top: 9px;
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
  .avatar-uploader-icon {
    font-size: 14px;
    color: #8c939d;
    width: 200px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }.avatar-uploader .el-upload {
     border: 1px dashed #d9d9d9;
     border-radius: 6px;
     cursor: pointer;
     position: relative;
     overflow: hidden;
   }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 14px;
    color: #8c939d;
    width: 200px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar-img {
    width: 178px;
    height: 130px;
    margin-left: 50px;
  }
</style>
