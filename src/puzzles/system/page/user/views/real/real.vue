<template>
  <epf-container title='实名认证'>
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
            <div class="epf_toolbar">
            <div class="epf_fr_search">
                <el-input 
                placeholder="请输入区域名称"
                v-model="orgSearchData"
                style="padding:5px 15px;">
                <el-button 
                  slot="append"
                  @click="queryOrg"
                  icon="el-icon-search">
                </el-button>
                </el-input>
            </div>
            </div>
            <div class="epf_fr_content" :style="{height:boxHeight - 55 +'px'}">
              <!-- <orgTree @node-click="selectOrg"></orgTree> -->
              <el-tree 
                :data="data4"
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
                show-checkbox>
              </el-tree>
            </div>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
          <div class="epf_toolbar" style="width: 100%;">
            <div class="epf_fr_search" style="width: 60%;float: left">
              <el-input 
                placeholder="请输入姓名、用户名、手机号"
                v-model="searchInfo.username"
                style="padding: 5px 15px;width: 80%">
                <el-button
                  slot="append"
                  @click="searchData"
                  icon="el-icon-search" size="small">
                </el-button>
              </el-input>
              <el-button @click="resetFilter" size="small">重置</el-button>
            </div>

          </div>
          <div class="epf_fr_content epf_no_border" :style="{height:boxHeight - 55 +'px'}">
            <el-table
              :data="tableData"
              style="width: 100%"
              :height="boxHeight-120"
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
              <el-table-column label="真实姓名" min-width="120" align="center">
                <template slot-scope="scope">
                  {{ scope.row.realName }}
                </template>
              </el-table-column>
              <el-table-column label="证件类型" min-width="120" align="center">
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
              <el-table-column label="所属地区" min-width="120" align="center">
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
                  <span v-if="scope.row.auditStatus==null || scope.row.auditStatus=='-1'">审核中</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="160">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row,'view')">查看</el-button>
                  <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row,'audit')">审核</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页控件 -->
            <div class="epf_paging_fixe">
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
        </div>
      </el-col>
    </el-row>
    <el-dialog :title="dialogTitle" class="companyInfo" width="1200px" :visible.sync="editorPopup" append-to-body>
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
          <el-form-item label="详细住址：">
            <el-input
              type="textarea"
              maxlength="1000"
              minlength="0"
              v-model="ruleForm.locationInfomation"
              autosize
              style="height:108px;"
              readonly="readonly"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align:center;margin-top:10px;">
        <el-button size="mini" type="success" @click="editorSubmit(1)" v-if="auditShow">审核通过</el-button>
        <el-button size="mini" type="success" @click="editorSubmit(0)" v-if="auditShow">审核不通过</el-button>
        <el-button size="mini" type="info" plain @click="editorPopup = false">关闭</el-button>
      </div>
    </el-dialog>
  </epf-container>
</template>

<script>
import orgTree from '../../components/orgTree';
  export default {
    name: "real",
    data() {
      return {
        data4: [],
        loading: true,
        defaultProps: {children: 'children', label: 'name'},
        newName: '1',
        boxHeight: 100,
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
        orgSearchData:'',
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
      this.boxHeight = window.innerHeight - 250;
      this.buttons = JSON.parse(localStorage.getItem("orgManage"));
    //   this.theme_BackgroundColor = localStorage.getItem("theme_BackgroundColor");
    //   this.theme_TextColor = localStorage.getItem("theme_TextColor");
      this.loadTree();
      this.queryareatList();
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
      queryOrg(){

      },
      loadTree: function () {
        var _this=this;
        _this.loading = true;
        _this.$get(_this.$API.EPF_ADMIN.REGIONAL.TREE).then(res => {
          _this.data4 = res.dataTree;
          _this.loading = false;
        });
      },
      rowClickHandle: function (row, event, column) {
      },
      selectOrg(data) {
        // this.userSearchData.orgId = data.id;
        this.loadTree();
        },
      queryareatList: function () {
        var _this = this;
        _this.$get(this.$API.EPF_ADMIN.REGIONAL.TREE).then(res => {
          if (res.code === 0) {
            if (res.treeTableData != '') {
              _this.areaData = res.dataTree
            } else {
              _this.areaData = []
            }
          } else {
            _this.$message.warning(res.msg)
          }
        })
      },
      queryDictList: function (code) {
        var _this = this;
        _this.$get(this.$API.EPF_ADMIN.DICTION.GET_DIC + code).then(res => {
          if (res.code === 0) {
            if (code == "org_level") {
              if (res.dictionariesList != null) {
                _this.orgLevels = res.dictionariesList;
              } else {
                _this.orgLevels = [];
              }
            } else if (code == "org_type") {
              if (res.dictionariesList != null) {
                _this.orgTypes = res.dictionariesList;
              } else {
                _this.orgTypes = [];
              }
            } else if (code == "business_Type") {
              if (res.dictionariesList != null) {
                _this.businessType = res.dictionariesList;
              } else {
                _this.businessType = [];
              }
            }
          } else {
            _this.$message.warning(res.msg)
          }
        })
      },
      queryProcessModels: function () {
        var _this = this;
        _this.$get(this.$API.EPF_ACTIVITI.WFB.QUERY).then(res => {
          if (res.code === 0) {
            _this.processModels=res.processTree;
          } else {
            _this.$message.warning(res.msg)
          }
        })
      },
      buiNameChanged: function (item, event) {
        let _this = this;
        if (typeof item != "undefined") {
          _this.businessType.forEach(function (dict) {
            if (item == dict.zhCn) {
              _this.wfBusproConf["buiCode"] = dict.dictValue;
              _this.wfBusproConf["buisId"] = dict.id;
            }
          })
        }
      },
      proNameChanged:function(item,event){
        let _this = this;
        if (typeof item != "undefined") {
          _this.processModels.forEach(function (dict) {
            if (item == dict.zhCn) {
              _this.wfBusproConf["proCode"] = dict.dictValue;
              _this.wfBusproConf["procId"] = dict.id;
            }
          })
        }
      },
      searchData() {
          let _this=this;
          _this.getList();
      },
      resetFilter() {
        this.filterData = {};
        var _this = this;
        var json = {};
        var filters = JSON.stringify(json);
        _this.searchInfo['filterData'] = filters;
        _this.getList();
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
        this.ruleForm.cantonLocation=row.cantonProvinceName!=null?row.cantonProvinceName:''+row.cantonCityName!=null?row.cantonCityName:''+row.cantonAreaName?row.cantonAreaName:row.cantonAreaName;
        this.idcardFrontImageUrl = this.$API.EPF_DOCUMENT.IMAGESRC + row.idcardFront;
        this.idcardBackImageUrl = this.$API.EPF_DOCUMENT.IMAGESRC + row.idcardBack;
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
        let _this = this;
        _this.$post(this.$API.EPF_ADMIN.USER_AUTH.GET_JSON, this.searchInfo).then(res => {
          if (res.code != '0') {
            _this.$message.error(res.msg);//失败
            return
          }
          _this.tableData = res.pager.results;
          _this.totalRecord = res.pager.totalRecord;
          _this.totalPage = res.pager.totalPage;
          this.loading = false;
        });
      },
      getObject(id) {
        var _this = this;
        _this.$post(this.$API.EPF_ADMIN.USER_AUTH.GET_ID, {id: id}).then(res => {
          if (res.code != '0') {
            _this.$message.error(res.msg);//失败
            return
          }
          this.autheniton = {};
          this.autheniton = res.autheniton;
        });
      },
      loadOrgProTableData: function (data, checked, indeterminate) {
        let _this = this;
        let afterOrgArray = [];
        if (checked) {
          if (typeof data != "undefined") {
            let orgObj = {};
            orgObj["id"] = data.id;
            orgObj["isParent"] = data.isParent;
            orgObj["name"] = data.name;
            _this.orgArray.push(orgObj);
          }
        } else {
          _this.orgArray.forEach(function (org) {
            let id = data.id;
            if (org.id != id) {
              afterOrgArray.push(org);
            }
          })
          _this.orgArray = afterOrgArray;
        }
        _this.searchInfo["params"] = JSON.stringify(_this.orgArray);
        // 点击右左边的树，刷新右边列表数据
        _this.pageSize = 5;
        _this.searchInfo["page"] = this.pageNo;
        _this.searchInfo["rows"] = 5;
        _this.getList();
      },
        editorSubmit:function (btnType) {
            let _this = this;
            _this.ruleForm.auditStatus=btnType;
            _this.$post(this.$API.EPF_ADMIN.USER_AUTH.GET_CATION, {'userAuthentication': JSON.stringify(_this.ruleForm)}).then(res => {
               if (res.code==0){
                   _this.$message.success('审核成功！');
                   _this.$router.go(-1);
               }
            });
        }
    }


  }
</script>

<style scoped>

</style>

