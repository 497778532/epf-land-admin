<template>
  <epf-container title='用户管理'>
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
          <div class="epf_toolbar">
            <div class="epf_fr_search" style="text-align: center;">
              <span>区域信息</span>
            </div>
          </div>
          <div class="epf_fr_content" :style="{height:boxHeight - 55 +'px'}">
            <el-tree
              :data="treeData"
              v-loading="loading"
              element-loading-text="数据加载中"
              element-loading-background="rgba(255, 255, 255,0.95)"
              :props="areadefaultProps"
              node-key="id"
              :expand-on-click-node="false"
              class="menuManage_List"
              :default-expanded-keys="['000000']"
              draggable
              @node-click="loadMemberClick">
            </el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
          <div class="epf_toolbar">
              <el-input   placeholder="请输入账号、手机号"
                        v-model="searchInfo.username"
                        style="padding: 5px 15px;width: 400px;left: 20px;">
                <el-button
                  slot="append"
                  @click="queryUser"
                  icon="el-icon-search"
                  size="small">
                </el-button>
              </el-input>
          </div>
          <div class="epf_fr_content epf_no_border" :style="{height:boxHeight - 55 +'px'}">
            <el-table
              ref="multipleTable"
              :data="userData"
              :height="boxHeight-110"
              width="100%"
              header-row-class-name="header-class"
              border
              highlight-current-row
              @selection-change="checkUser"
              v-loading="memberloading"
              element-loading-text="数据加载中"
              element-loading-background="rgba(255, 255, 255,0.95)">
              <el-table-column
                type="selection"
                width="35">
              </el-table-column>
              <el-table-column label="账号" min-width="130">
                <template slot-scope="scope">
                  <span hit size="medium">{{ scope.row.username }}</span>
                </template>
              </el-table-column>
              <el-table-column label="真实姓名" min-width="130" align="center">
                <template slot-scope="scope">
                  {{ scope.row.realName }}
                </template>
              </el-table-column>
              <el-table-column label="手机号" min-width="130">
                <template slot-scope="scope">
                  <span hit size="medium">{{ scope.row.telPhone }}</span>
                </template>
              </el-table-column>
              <el-table-column label="注册IP地址" min-width="130">
                <template slot-scope="scope">
                  <span hit size="medium">{{ scope.row.address }}</span>
                </template>
              </el-table-column>
              <el-table-column label="隶属区域" min-width="130">
                <template slot-scope="scope">
                  <span hit size="medium">{{ scope.row.regionalName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="详细地址" min-width="130">
                <template slot-scope="scope">
                  <span hit size="medium">{{ scope.row.locationInfomation }}</span>
                </template>
              </el-table-column>
              <!--<el-table-column label="用户类型" min-width="120">
                <template slot-scope="scope">
                                    <span hit size="medium">
                                      <span v-if="scope.row.userType=='0'">个人用户</span>
                                      <span v-if="scope.row.userType=='1'">企业用户</span>
                                    </span>
                </template>
              </el-table-column>-->
              <el-table-column label="状态" min-width="80">
                <template slot-scope="scope">
                  <span :class="(scope.row.userstate!='1')?'success':''"></span>
                  <span :class="(scope.row.userstate=='1')?'error':''"></span>
                  <span>{{scope.row.userstate=='1'?'禁用':'正常'}}</span>
                </template>
              </el-table-column>
              <el-table-column
                sortable
                prop="createTime"
                label="注册时间"
                min-width="110">
                <template slot-scope="scope">
                 <span v-if="scope.row.createTime!=null">
                   {{(scope.row.createTime).substring(0,10)}}
                 </span>
                </template>
              </el-table-column>
              <el-table-column label="审核状态" min-width="100" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.auditStatus=='1'">审核通过</span>
                  <span v-if="scope.row.auditStatus=='0'">审核不通过</span>
                  <span v-if="scope.row.auditStatus==null">未审核</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="160">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row,'view')">查看</el-button>
                  <el-button size="mini" type="primary" v-if="scope.row.auditStatus==null" plain @click="handleEdit(scope.$index, scope.row,'audit')">审核</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="width: 100%">
              <div style="text-align:right;margin:10px 0px;position:absolute;right:0;bottom:0">
                <el-pagination
                  background
                  layout="prev, pager, next,sizes,jumper"
                  :page-sizes="[5,10, 15, 20]"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-size="pager.pageSize"
                  :current-page="pager.pageNo"
                  :total="pager.totalRecord">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog :title="dialogTitle" class="companyInfo" width="700px" :visible.sync="editorPopup" :append-to-body='true'>
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
            <img v-if="idcardFrontImageUrl" :src="idcardFrontImageUrl" class="avatar-img img-font">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <img v-if="idcardBackImageUrl" :src="idcardBackImageUrl" class="avatar-img img-font">
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

    export default {
        name: "menberMg",
        components: {
        },
        data() {
            return {
                boxHeight: 700,
                orgSearchData: '', //机构搜索条件
                factor: { page: 1,rows: 10,totalRecord: 1,orgId: ''},
                searchInfo: {username: "", areaId: ""},//用户搜索条件
                loading: true, //loading变量
                userData: [],  //用户数据
                dialogData: {//弹框数据
                    visible: false,
                    title: "",
                    comp: "",
                    width: "50%",
                    height:"70%"
                },
                selection: [],
                currentOrg:{},// 左侧点击的机构数据
                currentUser:{},// 单选的用户数据
                ids:[],// 选中的用户主键
                pager: {pageNo:1,pageSize:10}, //分页数据
                modelParam:{},
                dictsObj:{
                    userTypes:[],// 用户类型
                },
                orgKeywords:'',// 机构树查询条件
                dialogFormroleVisible:false,
                menuListHeight: 100,
                rolelist: [],
                userids:"",
                selectrows: [],
                regionalsData: [],
                defaultProps: {children: 'children',label: 'zhCn'},
                curNodeId: '',
                getchoiceregionalsData: {},
                treeData:[], //树结构数据
                areadefaultProps: {children: 'children', label: 'regionName',id: 'regionCode'},
                memberloading: false,
                getAreaId: '',
               dialogTitle: '实名认证审核',
               editorPopup: false,
               ruleForm: {},
              idcardFrontImageUrl: '',
              idcardBackImageUrl: '',
              auditShow: false
            }
        },
        created() {
            this.menuListHeight = window.innerHeight - 245;
            this.boxHeight = window.innerHeight - 250;

        },
        mounted () {
            this.getTree();
        },
        methods: {
            handleSizeChange(val) {
                //每页条数改变时触发
                this.searchInfo["page"] = this.pager.pageNo;
                this.searchInfo["rows"] = val;
                var that = this;
                //把json对象转为json字符串
                var filters = JSON.stringify(this.searchInfo);
                //插入搜索条件
                that.searchInfo['filterData'] = filters;
                this.getListData(this.searchInfo);
            }, handleCurrentChange(val) {
                debugger
                //获取当前页
                this.searchInfo["page"] = val;
                this.searchInfo["rows"] = this.pager.pageSize;
                var that = this;
                //把json对象转为json字符串
                var filters = JSON.stringify(this.searchInfo);
                //插入搜索条件
                that.searchInfo['filterData'] = filters;
                this.getListData(this.searchInfo);
            }, reset() {
                //重置数据
                this.searchInfo = {username: "", orgId: "",orgKeywords:""};
                var that = this;
                //把json对象转为json字符串
                var filters = JSON.stringify(this.searchInfo);
                //插入搜索条件
                that.searchInfo['filterData'] = filters;
                this.getListData(this.searchInfo);
            }, checkUser(selection) {
                this.userids="";
                this.selection = selection;
                console.log('selection',selection)
                this.modelParam["user"]=selection[0];
                this.ids=[];
                for (let i=0,SIZE=selection!=null?selection.length:0;i<SIZE;i++){
                    this.ids.push({id:selection[i].id});
                    this.userids =selection[i].id;
                }
            },

            /**
             * @see 确认删除
             * @date 2019-11-25
             * @author Hua.Jeao
             */
            ensureDelete(){
                this.$post(this.$API.EPF_ADMIN.USER.DELETES,{ids:JSON.stringify(this.ids)}).then(r => {
                    this.$message.success(r.data.msg);
                    this.queryUser();// 刷新用户数据
                    this.closeDialog();
                });
            },
            closeDialog() {
                this.dialogData = {};
            },
            getTree(){ //获取树结构区域数据
                const that = this;
                this.loading = true;
                that.$post(that.$API.EPF_ADMIN.REGIONAL.GET_ALLDATA_TREE).then(res => {
                    that.loading = false;
                    if (res.code === 0) {
                        that.treeData = res.data.dataTree;
                        if(res.data.dataTree.length>0) {
                            that.loadMemberClick(res.data.dataTree[0]);
                        }
                    }else{
                        that.$message.warning(res.msg);
                    }
                })
            },
            loadMemberClick(data){
                this.factor["areaId"]=data.id;
                this.getAreaId=data.id;
                //把json对象转为json字符串
                var filters = JSON.stringify(this.factor);
                //插入搜索条件
                this.factor['filterData'] = filters;
                this.loadmemberData(this.factor);
            },
            loadmemberData(params){
                let that = this
                this.memberloading = true;
                that.$post(this.$API.EPF_ADMIN.USER.QUERY_MEMBER_PAGE,params).then(res => {
                    if (res.code != '0') {
                        that.$message.error(res.msg)//失败
                        return
                    }
                    //返回的数据
                    that.userData = res.pager.results;
                    //数据条数
                    that.totalRecord = res.pager.totalRecord;
                    //总页数
                    that.totalPage = res.pager.totalPage;
                    //隐藏进度条
                    this.memberloading = false;
                })
            },
            queryUser() {
                this.userData=[];
                this.pager.pageNo = 1;
                this.searchInfo["areaId"] =this.getAreaId;
                this.searchInfo["page"] = this.page;
                this.searchInfo["rows"] = this.rows;
                var that = this;
                //把json对象转为json字符串
                var filters = JSON.stringify(this.searchInfo);
                //插入搜索条件
                that.searchInfo['filterData'] = filters;
                this.loadmemberData(this.searchInfo);
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
            debugger
            this.ruleForm.cantonLocation=row.cantonProvinceName!=null?row.cantonProvinceName:''+row.cantonCityName!=null?row.cantonCityName:''+row.cantonAreaName?row.cantonAreaName:row.cantonAreaName;
            this.idcardFrontImageUrl = '/api/epf-document/document/downloadById?id=' + row.idcardFront;
            this.idcardBackImageUrl = '/api/epf-document/document/downloadById?id=' + row.idcardBack;
            this.editorPopup = true;
          },
          editorSubmit:function (btnType) {
            let that = this;
            that.ruleForm.auditStatus=btnType;
            that.$post('/epf-admin/admin/user/authenticationMember', {'userAuthentication': JSON.stringify(that.ruleForm)}).then(res => {
              if (res.code==0){
                that.$message.success('审核成功！');
                that.$router.go(-1);
                that.queryUser();
              }
            });
          }
        }
    }
</script>
<style lang="less" scoped>
  .header-class {
    background-color: #ddd !important;
  }

  .status-name {
    cursor: pointer;
    height: 10px;
    width: 10px;
    border-radius: 10px;
    display: inline-block;
  }

  .starting {
    background: #3E84E9;
    color: #3E84E9;
  }

  .stop {
    background: #ddd;
    color: #ddd;
  }
</style>
<style scoped>
  .el-container {
    height: 300px;
    overflow: auto;
  }

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    width: 120px;
    border-radius: 10px;
    height: 120px;
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
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
  
  .oper {
    float: right;
    font-weight: normal;
    padding-right: 1rem;
  }
  .oper span {
    display: inline-block;
  }
 
  
</style>
<style>
  .filter_wrap .el-input--small .el-input__inner {
    height: 34px;
  }
  .filter_wrap .el-row {
    margin-bottom: 10px;
  }
  .filter_wrap .distpicker-address-wrapper select {
    width: 148px;
    height: 34px;
    font-size: 14px;
    line-height: 34px;
    padding: 0 10px;
  }

  .filter_wrap .el-date-editor.el-input .el-input__icon {
    line-height: 30px;
    color: #8dc4f7;
  }
  .filter_wrap .el-input__prefix,
  .el-input__suffix {
    width: 25px;
    font-size: 16px;
    right: 8px;
  }
  .el-table th,
  .el-table tr {
    /* border:1px solid #ebeef5; */
  }
  .el-table__body tr td:nth-child(2) .cell {
    color: rgb(70, 113, 213);
  }
  .el-textarea .el-textarea__inner {
    width: 100%;
    height: 100% !important;
  }
  .usemngtable {
    width: 100%;
  }
  .usemngtable td {
    border: 1px solid #b6b6b6;
    line-height: 28px;
  }
  .treetop{
    top:0 !important;
  }
  .img-font{
    width: 140px;
    height: 140px;
  }
</style>
