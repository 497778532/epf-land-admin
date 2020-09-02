<template>
  <div class="page-body" id="workDocManage">
    <div
      class="filter_wrap"
      :style="{'paddingTop':'10px','borderRight':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)','borderLeft':'1px solid rgb(224, 224, 224)'}"
    >
      <div class="switchHeight_box">
        <el-row>
          <el-col :span="2" style="padding-right: 10px;">
            <span class="filter_title">关键字:</span>
          </el-col>
          <el-col :span="3">
            <el-input size="small" v-model="searchInfo.name" placeholder="请输入要搜索的关键词"></el-input>
          </el-col>
          <el-col :span="2" style="padding-right: 10px;">
            <span class="filter_title">文档来源:</span>
          </el-col>
          <el-col :span="2">
            <el-select v-model="searchInfo.resource" placeholder="请选择">
              <el-option
                v-for="item in resourcedata"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
           
          </el-col>
          <el-col :span="2" style="padding-right: 10px;">
            <span class="filter_title">发文日期:</span>
          </el-col>
          <el-col :span="5">
            <el-date-picker
              v-model="publishdata"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-col>  
          <el-col :span="8">
            <div class="oper">
                <span class="button_bg" @click="getsearchuser">搜索</span>
                <span class="button_default" @click="resetsearchuser">重置</span>
            </div>
          </el-col>    
        </el-row>
      </div>

      <el-container style="height:auto; margin-top:10px">      
        <!--列表模式  -->
        <el-aside width="260px">
            <el-header
                style="height:40px;line-height:40px;font-weight:bold"
                class="m_title"

            >文档分类<el-button class="button_bg" @click="addLevelOne" style="float:right;height:30px;margin-top:5px;">授权</el-button></el-header>
            <el-main
                :style="{'height':menuListHeight-110+'px','paddingTop':'10px','borderRight':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)','borderLeft':'1px solid rgb(224, 224, 224)'}"
                >
                <el-tree
                  v-loading="loading2"
                  element-loading-text="数据加载中"
                  element-loading-background="rgba(255, 255, 255,0.95)"
                  :props="defaultProps"
                  :data="forderdata"
                  node-key="id"
                  :expand-on-click-node="false"
                  class="orgManange_List"
                  :render-content="renderContent"
                  @node-drag-end="handleDragEnd"
                  draggable
                ></el-tree> 

            </el-main>
        </el-aside>
        <el-main style="margin-left:15px;">
          <el-tabs>
            <el-header
              style="height:40px;line-height:40px;position:relative"
              class="m_title"
            >
              <span style="font-weight:bold">文档管理</span> 
              <div class="tableHead">
                <!-- <span v-for="(button ,index)  in buttons" :key="index">
                  <span  v-if="button.resourceId=='user_add'" class="button_bg" @click="upload">上传</span>
                  <span  v-if="button.resourceId=='user_role'" class="button_bg"  @click=" showsingleuser"> 回收站 </span>
                  <span  v-if="button.resourceId=='user_restpsd'" class="button_bg" @click="initPwd">移动</span>
                  <span  v-if="button.resourceId=='user_edit'" class="button_bg" @click="editFlowpatreason">编辑</span>
                  <span  v-if="button.resourceId=='user_delete'" class="button_bg" @click="handleDelete">删除</span>
                  <span  v-if="button.resourceId=='user_view'" class="button_bg" @click="addDocument">新增</span>
                </span> -->
                <span>
                  <span  class="button_bg" @click="upload" style="display: none;">上传</span>
                  <span  class="button_bg"  @click=" showsingleuser"> 回收站 </span>
                  <span  class="button_bg" @click="initPwd">移动</span>
                  <span  class="button_bg" @click="editFlowpatreason" style="display: none;" >编辑</span>
                  <span  class="button_bg" @click="handleDelete">删除</span>
                  <span  class="button_bg" @click="addDocument">新增</span>
                </span>
              </div>
            </el-header>
            <p class="tabs" style="padding: 10px 0;">
              <span v-for="(item, index) in toptag" :key="index" class="blu" @click="tagclick(item)"><i v-if="index>0" class="blu">></i>{{item.name}}</span></p>
            <el-table
              ref="multipleTable"
              :data="docInfoList"
              :height="menuListHeight-150"
              style="width: 100%"
              border
              @selection-change="handleSelectionChange"
              @sort-change="changeorders"
              v-loading="loading"
              element-loading-text="数据加载中"
              element-loading-background="rgba(255, 255, 255,0.95)"
              :default-sort = "{prop: 'publishTime', order: 'descending'}"
              >
              <el-table-column fixed type="selection" width="55"></el-table-column>
              <el-table-column  prop="name" label="文件名称" sortable min-width="230">
                <template slot-scope="scope">
                  <div class="cell_click" @click="clickselectrow(scope.$index, scope.row)">
                    <div class="docuImg">
                      <img v-if="'png,gif,jpeg,jpg'.indexOf(scope.row.extName.toLowerCase()) != -1  "  :src="'/api/epf-document/document/downloadById?id=' + scope.row.id" >
                      <img v-else :src="require('@/assets/docu/' + scope.row.extName.toLowerCase() + '.png')" >
                    </div>
                   <p class="ellipsis" :title='scope.row.name'>{{scope.row.name}}</p>
                  </div>
                </template>
              </el-table-column>

              <el-table-column  prop="source" label="文档来源" min-width="100">
                <template slot-scope="scope">
                  {{scope.row.source}}
                </template>
              </el-table-column>
               <el-table-column prop="publishTime" label="发文日期" sortable min-width="130">
                <template slot-scope="scope">
                  {{scope.row.publishTime}}
                </template>
              </el-table-column>
             
              <el-table-column prop="version" label="文档状态" min-width="50">
                <template slot-scope="scope">
                   {{scope.row.versionType}}-{{scope.row.versionRemark}}
                </template>
              </el-table-column>
              <el-table-column prop="readNumber" label="浏览量" sortable min-width="100">
                <template slot-scope="scope">
                  {{scope.row.readNumber}}
                </template>
              </el-table-column>
               <el-table-column prop="docSize" label="大小"  min-width="100">
                <template slot-scope="scope">
                  {{scope.row.docSize}}K
                </template>
              </el-table-column>
              <!-- <el-table-column prop="remark" label="描述" min-width="150">
                <template slot-scope="scope">
                   {{scope.row.remark}}
                </template>
              </el-table-column> -->
            </el-table>
            <div style="text-align:right;margin:22px 0px;">
              <el-pagination
                background
                layout="prev, pager, next,sizes,jumper"
                :page-sizes="[5,10, 15, 20]"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="pageSize"
                :current-page="pageNo"
                :total="totalRecord"
              ></el-pagination>
            </div>
          </el-tabs>
        </el-main>
      </el-container>
    </div>

    <!-- 弹窗 -->
    <div>
      <!-- 回收站 -->
      <el-dialog title="回收站" class="companyInfo" width="900px" :visible.sync="optPopup" :append-to-body='true'>
          <div class="switchHeight_box" style="border: 0px solid #ebeef5;">
              <el-row :gutter="2">
                  <el-col :span="24" class="filterIpt">
                      <el-input   size="small" placeholder="请输入您要关联的相关文件的名称或关键字" v-model="deletname" @keyup.enter.native="deletsearch"></el-input>
                      <i class="el-icon-search" @click="deletsearch"></i>
                  </el-col>
              </el-row>
              <el-table
                ref="deletTable"
                :data="tableData"
                :height="menuListHeight-150"
                style="width: 100%"
                 :props="defaultProps"
                border
                @selection-change="deletSelectionChange"
                v-loading="loading"
                element-loading-text="数据加载中"
                element-loading-background="rgba(255, 255, 255,0.95)"
                >
                <el-table-column fixed type="selection" width="55"></el-table-column>
                <el-table-column fixed prop="name" label="文件名称" min-width="180">
                  <template slot-scope="scope">
                   {{scope.row.name}}
                  </template>
                </el-table-column>

                <el-table-column fixed prop="source" label="文档来源" min-width="150">
                  <template slot-scope="scope">
                   {{scope.row.source}}
                  </template>
                </el-table-column>
                <el-table-column prop="publishTime" label="发文日期" min-width="130">
                  <template slot-scope="scope">
                    {{scope.row.publishTime}}
                  </template>
                </el-table-column>
              </el-table>
              
              <div style="text-align:right;margin:8px 0px;margin-top:15px;">
                  <el-pagination
                      background
                      layout="prev, pager, next,sizes,jumper"
                      :page-sizes="[5,10, 15, 20]"
                      @size-change="handleSizeChangedel"
                      @current-change="handleCurrentChangedel"
                      :page-size="pageSizedel"
                      :current-page="pageNodel"
                      :total="totalRecorddel"
              ></el-pagination>
              </div>
              <el-row>
                  <el-col :span="24" style="text-align: center;margin-top:10px">
                      <el-button type="danger" @click="deletformback">彻底删除</el-button>
                      <el-button type="primary" @click="backtonormal">恢复</el-button>
                      <el-button  @click="optPopup = false" >取消</el-button>
                  </el-col>
              </el-row>
          </div>
      </el-dialog>
      <!-- 移动 -->
      <el-dialog title="移动" class="companyInfo" width="900px" :visible.sync="movePopup" :append-to-body='true'>
          <div class="switchHeight_box" style="border: 0px solid #ebeef5;padding-top: 0;">
            <p style="margin-bottom: 20px;">请选择要移动至的文件夹</p>
            <div style="border:1px solid #ddd;" :height="menuListHeight-150">
              <el-tree :data="forderdata" :props="defaultProps" @node-click="handleNodeClick" style="margin:5%"></el-tree>
            </div>
            <el-row>
              <el-col :span="24" style="text-align: center;margin-top:10px">
                  <span class="button_bg" @click="savetomove">保存</span>
                  <span class="button_border"  @click="movePopup = false" style="margin:0;">关闭</span>
              </el-col>
            </el-row>
          </div>
      </el-dialog>

    </div>

  </div>
</template>
<script>
import qs from "qs";
import transferTable from "@/components/transferTable";
import Axios from "axios";
import { constants } from "zlib";
import configApi from '../../../../../config/index';
import base from '../../../../utils/config.js';
import { mapActions, mapState } from "vuex";

export default {
  name: "workDocManage",
  components: {
    transferTable
  },

  data() {

    return {
        publishdata:[],
        input: '',
        textarea: '',
        optPopup:false,//  控制回收站弹窗
        movePopup:false,//控制移动弹窗
        defaultProps: {
          children: "childForder",
          label: "folderName"
        },
        forderdata: [],
        loading2: true,
        forderId: "",
        menuListHeight: 100,
        docInfoList: [],
        currentNode: {},
        currentData: {},
        parentdata: {},
        checkFiles:false, //  开启选择文件功能
        totalRecord: 0,
        pageNodel: 1,
        pageSizedel: 5,
        totalPagedel: 0,
        totalRecorddel: 0,
        dialogAreaCheck: false,
        currentId: "",
        newFileName: "",
        newSort:'',
        //按钮组、主题
        buttons: [],
        theme_BackgroundColor: "",
        theme_TextColor: "",
        loading: false,
        currentFileIndex:0,
 
        queryByIdUrl:'',

      //扩展信息参数
      dialogManageInfo: false,
      usermanageInfo: {},
      sexoptions: [{ value: "男", label: "男" }, { value: "女", label: "女" }],
      loading: true,

      

      menuListHeight: 100,
      txtVal: 0,
      searchselectdefall: [],
      slectdefall: [],
      formLabelWidth: "120px",
      dialogFormVisible: false,
      dialogFormroleVisible: false,
      rolelist: [],
      selectrows: [],
      tableData: [],
      multipleSelection: [],
      handleDataError: [],
      howProvince: true,
      toptag:[{name:"全部文件",type:"all",id:""}],
      value: "",

      handleData: "",
      singleuser: {},
      selectGroups: [],
      imageUrl: "",
      add: false,
      savetitle: "新增账号",
      edit: false,
      dialogForm: false,
      dialogTable: false,
      dialogTest: false,
      pageNo: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: { usetype: "" },
      resourcedata:[],
      collectselected:[],
      deletname:'',
      deletGroups:[],
      folderType:'3',//文件类型：1文件夹，知识分类；2收藏夹；3工作文件夹分类,文档分类
    };
  },
  created() {
    this.menuListHeight = window.innerHeight - 245;
    this.searchInfo["page"] = this.pageNo;
    this.searchInfo["rows"] = this.pageSize;
    this.loadTree();
    this.getDocList(this.searchInfo);
    this.queryDictList("doc_sourse");
  },
  methods: {
      ...mapActions(["setTabsList"]),
       queryDictList(code) {
            var that = this;
            that.$get("/epf-admin/admin/dictionaries/getDictEbyDictGroup/" + code).then(res => {
                if (res.code === 0) {
                    if(code=='doc_sourse'){
                        if (res.dictionariesList != null) {
                            var list=[];
                            for (let index = 0; index < res.dictionariesList.length; index++) {
                              list.push({name:res.dictionariesList[index]["zhCn"],value:res.dictionariesList[index]["zhCn"]})
                              
                            }
                              that.resourcedata = list;
                        } else {
                              that.resourcedata = [];
                        }
                    }
                }
            });
        },
      changeorders(event){console.log(event);
        var _this=this;
         this.pageNo-1
        this.searchInfo["page"] = this.pageNo;
        this.searchInfo["rows"] = this.pageSize;
        this.searchInfo["sort"] = event.prop
        this.searchInfo["order"] = event.order
        this.getDocList(this.searchInfo);
      },
      addLevelOne() {
        this.parentdata["id"]="0";
        const newOrg = { id:'', folderName: "", childForder: [] };
        this.forderdata.push(newOrg);
      },
      savetomove(){
        var folderdat=this.collectselected;
        var docs=this.selectGroups;
       
        if(folderdat.length<1){
           this.$message.warning("请选择收藏夹！");
          return;
        }
        if(docs.length<1 ){
           this.$message.warning("请选择文件有误！");
          return;
        }
        var docId = docs[0].id;
        var folderId=folderdat.id;
        var params={}
        params["id"]=docId;
        params["folderId"]=folderId;
        this.$post("/epf-document/docdocumentinfo/movetofolder",params).then(res => {
          if(res.code!=0){
              this.$message.error(res.msg);
              return;
          }
          this.movePopup = false
          this.searchInfo["page"] = this.pageNo;
          this.searchInfo["rows"] = this.pageSize;
          this.getDocList(this.searchInfo);
          this.$message.success("移动成功！");
        });
      },
      tagclick(tag){//{name:"全部文件",type:"all",id:""}
        if(tag.type=='all'){
          var newtag=[];
          newtag.push(this.toptag[0])
          this.toptag=newtag
          this.pageNo=1;
          this.searchInfo["page"] = this.pageNo;
          this.searchInfo["rows"] = this.pageSize;
          this.searchInfo["name"] ='';
          this.searchInfo["folderId"] = "";
          this.searchInfo["tagId"] = "";
          this.getDocList(this.searchInfo);
        }else{
          this.pageNo=1;
          this.searchInfo["page"] = this.pageNo;
          this.searchInfo["rows"] = this.pageSize;
          this.searchInfo["name"] ='';
          this.searchInfo["forderId"] = this.toptag[1].id;
          this.searchInfo["tagId"] = "";
          this.getDocList(this.searchInfo);
        }
      },
      //上传文档
      upload(){
        console.log(111)
        let that = this;
        let title = '上传单位文档'
        let routerPath = '/workDocUpload'
        let tabObj = {title, routerPath}
        that.setTabsList(tabObj)
        that.$router.push({path: routerPath,query:{}})
      },
      //新增文档
      addDocument(){
        console.log(111)
        let that = this;
        let title = '新增单位文档'
        let routerPath = '/workDocAdd'
        let tabObj = {title, routerPath}
        that.setTabsList(tabObj)
        that.$router.push({path: routerPath,query:{editor:""}})
      },
      async getDocList(params) {
        params["foldertype"]='3';
        this.loading = true;
        this.$get("/epf-document/docdocumentinfo/getTenantDocJson", params).then(res => {
          console.log("871===========", res);
          if (res.code != "0") {
            this.$message.error(res.msg); //失败
            this.loading = false;
            return;
          }
          if(params.load){
            this.totlecorde=res.pager.totalRecord;
            this.searchInfo["load"]="";
          }
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
          this.docInfoList = res.pager.results;
        
          this.checkAll=false;
          this.checkedCities=[];
          this.isIndeterminate= true;
          

          this.cities=[];
          for(var i=0 ; i< this.docInfoList.length ; i++){
            this.cities.push(this.docInfoList[i].id);
          }

          this.loading = false;
        });
      },
      clickselectrow(index,row) {
        // this.$refs.multipleTable.toggleRowSelection(row);
        let that = this;
        let title = '文档浏览'
        let routerPath = ''
        
          routerPath='/documentBrowse';
        let tabObj = {title, routerPath}
        that.setTabsList(tabObj)
        that.$router.push({path: routerPath,query:{row:row}})
      },
      getsearchuser() {
        this.searchInfo["page"] = 1;
        this.searchInfo["rows"] = this.pageSize;
        this.getDocList(this.searchInfo);
      },
      resetsearchuser() {
        this.publishdata=[];
        this.searchInfo["page"] = 1;
        this.searchInfo["rows"] = this.pageSize;
        this.searchInfo["name"] = "";
        this.searchInfo["resource"] = "";
        this.searchInfo["doctype"] = "";
        this.searchInfo["starttime"] = "";
        this.searchInfo["endtime"] = "";
        this.searchselectdefall = [];
        this.getDocList(this.searchInfo);
      },
      handleSelectionChange(val) {
        this.selectGroups = val;
      },
      deletSelectionChange(val) {
        this.deletGroups = val;
      },
      deletformback(){
        var selected=this.deletGroups
        if(selected.length<1){
          that.$message.warning("请选择数据！");
          return;
        }
        var ids="";
        for (let index = 0; index < selected.length; index++) {
          ids+= selected[index].id+",";
        }
        this.$get("/epf-document/docdocumentinfo/deletdoc", {id:ids}).then(res => {
          if(res.code!=0){
            that.$message.warning(res.msg);
          }
          var params={};
          this.pageNodel = 1;
          params["page"] = this.pageNodel;
          params["rows"] = this.pageSizedel;
          this.deldoclist(params);
        })
      },
      backtonormal(){
        var selected=this.deletGroups
        if(selected.length<1){
          that.$message.warning("请选择数据！");
          return;
        }
        var ids="";
        for (let index = 0; index < selected.length; index++) {
          ids+= selected[index].id+",";
        }
        this.$get("/epf-document/docdocumentinfo/deletback", {id:ids}).then(res => {
          if(res.code!=0){
            that.$message.warning(res.msg);
          }
          var params={};
          this.pageNodel = 1;
          params["page"] = this.pageNodel;
          params["rows"] = this.pageSizedel;
          this.deldoclist(params);
            this.pageNo=1;
          this.searchInfo["page"] = this.pageNo;
          this.searchInfo["rows"] = this.pageSize;
          this.getDocList(this.searchInfo);
        })
      },
      initPwd() {
        let that = this;
        if (that.selectGroups.length != 1) {
            that.$message.warning("请选择一条数据！");
          return;
        }
        that.movePopup = true;
      },
      handleNodeClick(data) {
        console.log(data);
        this.collectselected=data;
      },
      deletsearch(){
        var params={};
        this.pageNodel = 1;
        params["page"] = this.pageNodel;
        params["rows"] = this.pageSizedel;
        params["name"] = this.deletname;
        this.deldoclist(params)
      },
      showsingleuser(){
        var params={}
        params["page"] = this.pageNodel;
        params["rows"] = this.pageSizedel;
        this.deldoclist(params)
        this.optPopup = true;
      },
      deldoclist(params) {
        params["isdel"]="1"
        params["foldertype"]='3';
        this.$get("/epf-document/docdocumentinfo/getTenantDocJson", params).then(res => {
          console.log("===========", res);
          if (res.code != "0") {
            this.$message.error(res.msg); //失败
            this.loading = false;
            return;
          }
          this.pageNodel = res.pager.pageNo;
          this.pageSizedel = res.pager.pageSize;
          this.totalPagedel = res.pager.totalPage;
          this.totalRecorddel = res.pager.totalRecord;
          this.tableData = res.pager.results;
        });
        
      },
      editFlowpatreason() {
        let that = this;
        if (that.selectGroups.length != 1) {
          that.$message.warning("请选择一条数据！");
          return;
        }
        let title = '编辑单位文档'
        let routerPath="";
        console.log(that.selectGroups[0])
        var row=that.selectGroups[0]
        if(row.name.indexOf(".html")!=-1){
          routerPath = '/workDocAdd'
              that.$post("/epf-document/document/showContentById", { id: row.id }).then(res => {
                row["content"]=res
                let tabObj = {title, routerPath}
                that.setTabsList(tabObj)
                that.$router.push({path: routerPath,query:{row:row,editor:"1"}})
              });
        }else{
          routerPath = '/workDocUpload'
            let tabObj = {title, routerPath}
          that.setTabsList(tabObj)
          that.$router.push({path: routerPath,query:{row:row,editor:"1"}})
        } 
      },
      handleDelete() {
        let ids = "";
        let that = this;
        if (that.selectGroups.length < 1) {
          that.$message.warning("请选择要删除的数据！");
          return;
        } else {
          for (var i = 0; i < this.selectGroups.length; i++) {
            ids += this.selectGroups[i].id + ",";
          }
        }
        that
          .$confirm("确认要删除该条信息吗?", "提示", {
            cancelButtonText: "取消",
            confirmButtonText: "确定",
            type: "warning",
            center: true
          })
          .then(() => {
            that.$post("/epf-document/docdocumentinfo/movetodelet", { id: ids })
              .then(res => {
                console.log(res);
                if (res.code != "0") {
                  that.$message.error(res.msg);
                  return;
                }
                that.$message({
                  type: "success",
                  message: "删除成功!"
                });

                that.searchInfo["page"] = 1;
                that.searchInfo["rows"] = this.pageSize;
                that.getDocList(that.searchInfo);
              });
          })
          .catch(() => {});
      },
      handleSizeChange(val) {
        //每页条数改变时触发
        this.pageNo = 1;
        this.searchInfo["page"] = this.pageNo;
        this.searchInfo["rows"] = val;
        this.getDocList(this.searchInfo);
      },
      handleCurrentChange(val) {
        //获取当前页
        this.searchInfo["page"] = val;
        this.searchInfo["rows"] = this.pageSize;
        this.getDocList(this.searchInfo);
      },
      handleSizeChangedel(val) {
        //每页条数改变时触发
        var params={};
        this.pageNodel = 1;
        params["page"] = this.pageNodel;
        params["rows"] = val;
        this.deldoclist(params);
      },
      handleCurrentChangedel(val) {
        //获取当前页
        var params={};
        params["page"] = val;
        params["rows"] = this.pageSizedel;
        this.deldoclist(params);
      },
      append(node, data) {
        this.parentdata = data;
        console.log(this.parentdata);
        if (!node.expanded) {
          node.expanded = true;
        }
        const children = { id: "", folderName: "", childForder: [] };
        if (!data.childForder) {
          this.$set(data, "childForder", []);
        }
        data.childForder.push(children);
      },
      editDocu(node, data){
        var _this=this;
        
        _this.$prompt('请输入要修改的文件夹名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          var params={}
            params["id"]=data.id
            params["folderName"]=value
            params["pId"]=data.pId
            _this.$post("/epf-document/admin/docfolder/save",params).then(res => {
              if (res.code != "0") {
                _this.$message.error(res.msg);
                return;
              }
               _this.$message.success("修改成功！");
              _this.loadTree();
            });
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '取消输入'
          // });       
        });
      },
      remove(node, data) {
        if (data.childForder!=null && data.childForder.length > 0) {
          this.$message.error("请先删除子菜单！"); //失败
          return;
        }
        this.currentNode = node;
        this.currentData = node.data;
        this.deleteforder();
      },
      deleteforder() {
        let that = this;
        console.log(that.currentData);
        if (!that.currentData.id) {
          const parent = that.currentNode.parent;
          const childMenu = parent.data.childForder || parent.data;
          console.log(that.currentData);
          const index = childMenu.findIndex(d => d.id === this.currentData.id);
          childMenu.splice(index, 1);
          return;
        }
        that.$confirm("确认要删除信息吗?", "提示", {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          type: "warning",
          center: true
        }).then(() => {
          that
            .$post("/epf-document/admin/docfolder/delete", {
              id: that.currentData.id
            })
            .then(res => {
              if(res.code==0){
                that.$message.success("删除成功!");
              }else{
                that.$message.error(res.msg);
              }
              that.loadTree();
            });
        }).catch(() => {
          // that.$message({type: "info", message: "已取消删除"});
        });


      },
      getdocInfos(node, data) {
        this.loading = true;
        var that = this;
        var id = node.data.id;
        console.log(id);
        if (id == null || id == "") {
          return;
        }
        that.toptag[1]={name:node.data.folderName,type:"folder",id:id};
        that.forderId = id;
        //每页条数改变时触发
        var that=this;
        that.pageNo = 1;
        that.searchInfo["page"] = this.pageNo;
        that.searchInfo["rows"] = this.pageSize;
        that.searchInfo["tagId"]=""
        that.searchInfo["folderId"]=that.forderId
        that.getDocList(this.searchInfo);
      },
      loadTree() {
        var that = this;
        this.loading2 = true;
        let params={folderType:that.folderType,useAllSystem:'0'};
        that.$get("/epf-document/admin/docfolder/getFolderByType",params).then(res => {
          console.log('数返回',res.ztreeJson);
          that.forderdata = res.ztreeJson;
          that.queryByIdUrl = res.queryByIdUrl;
          this.loading2 = false;
        });
      },
      getCheckedList(){
        let checkeds = "";
        this.docInfoList.map((val,index,arr)=>{
          if(val.checkFiles){
            checkeds+=val.id+",";
          }
        })
        if(checkeds.length>0){
          checkeds=checkeds.substring(0,checkeds.length-1)
        }
        return checkeds
      },
      setName(node, data) {
        var name = document.getElementById(node.id + "Name").value;
        if (!name) {
          that.$message.error("请输入名称!");
          return false;
        }
        console.log();
        var that = this;
        that
          .$post("/epf-document/admin/docfolder/save", {
            folderName: name,
            pId: this.parentdata.id,
            folderType:that.folderType,
          })
          .then(res => {
            if (res.code != 0) {
              that.$message.error("保存失败!");
              return false;
            }


            that.$message.success("保存成功!");
            that.loadTree();
          });
      },
      renderContent(h, { node, data, store }) {
        var createElement = arguments[0];
        var level = arguments[1].node.level;
        if (node.label) {
          return (
            <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;height:26px;overflow:hidden;">
            <span
          on-click={() => this.getdocInfos(node, data)}
          style="display: inline-block;width:100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
            title={node.label}>
            {node.label}
            </span>

            <span>
            <el-button
              style="font-size: 16px;padding:0px;color:#1587DB;"
              type="text"
              on-click={() => this.editDocu(node, data)}
            >
            <i class="el-icon-edit-outline" />
          </el-button>
            <el-button
          style="font-size: 16px;padding:0px;color:#409EFF;"
          type="text"
          on-click={() => this.append(node, data)}
        >
        <i class="el-icon-circle-plus-outline" />
            </el-button>
            <el-button
          style="font-size: 16px;color:#F56C6C;"
          type="text"
          on-click={() => this.remove(node, data)}
        >
        <i class="el-icon-delete" />
            </el-button>
            </span>
            </span>
        );
        } else {
          return (
            <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;height:26px;overflow:hidden;">
            <span>
            <input
          id={node.id + "Name"}
          type="text"
          style="max-width:80px;"
          placeholder="请输入名称"
          autofocus
          />
          </span>
          <span>
          
          <el-button
          style="font-size: 16px;padding:0px;color:#53c106;"
          type="text"
          on-click={() => this.setName(node, data)}
        >
        <i class="el-icon-success" />
            </el-button>
            <el-button
          style="font-size: 16px;color:#F56C6C;"
          type="text"
          on-click={() => this.remove(node, data)}
        >
        <i class="el-icon-delete" />
            </el-button>
            </span>
            </span>
        );
        }
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log("tree drag end: ", draggingNode, dropNode, dropType, ev);
        var orgId = draggingNode.data.id;
        var pId = "";
        if (dropType == "inner") {
          pId = dropNode.data.id;
        } else {
          pId = dropNode.data.pId;
        }

        var paramsData = { id: orgId, pId: pId };
        this.$post("/epf-document/admin/docfolder/save", paramsData).then(res => {
          if (res.code == 0) {
            this.$message.success("保存成功！");
          } else {
            this.$message.warning(res.msg);
          }
          this.loadTree()
        });
      }

  }
};
</script>
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
  padding-right: 15px;
}
.oper span {
  display: inline-block;
  margin: 0 !important;
}


.filter_title{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 40px;
}
.switchHeight_box >>> .el-input__inner{
  height: 40px;
  line-height: 40px;
}
.switchHeight_box >>> .el-input__suffix{
  display: flex;
  align-items: center;
}



  .docImgBox {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 90px;
    background: rgb(255, 255, 255);
    cursor: pointer;
  }
  .docImgBox > img {
    object-fit: contain;
    width: 100%;
    height: 90px;
    display: block;
  }
  .Dangerg {
    width: 140px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .Dangergtn {
    color: #fff;
    background: #f56c6c;
  }
  .checkBox{
    position:absolute;
    top: 2px;
    left: 2px;
  }
  .check{
    padding: 0 3px;
    border:1px solid rgb(192, 192, 192);
    border-radius: 50%;
    background: rgba(240, 240, 240, 0.774);
  }
  .checked{
    padding: 0 3px;
    border:1px solid rgb(88, 150, 57);
    border-radius: 50%;
    background: #67C23A;
  }
  .check i{
    font-size: 10px;
    color: rgb(153, 153, 153);
  }.checked i{
     font-size: 10px;
     color: #fff;
   }
  .dowld {
    color: #000;
    background: rgb(241, 245, 248);
  }

  .cardbottom {
    font-size: 16px;
    line-height: 32px;
    text-align: center;
    width: 100%;
    height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgb(85, 85, 85);
    transition: 0.4s;
    margin-top: 6px;
  }
  .m_title {
    height: 40px !important;
    line-height: 40px !important;
    padding-left: 30px;
    background: #F2F2F2;
    color: rgb(50, 58, 64);
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
<style scoped>
.orgManange_List .el-tree-node__content {
    margin-bottom: 5px;
  }
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
.el-table__body tr td:nth-child(2) .cell .cell_click{
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: relative;
}
.docuImg{
  width: 40px;
  height: 40px;
  /* border: 1px solid #ddd; */
  margin-right: 10px;
  display: inline-block;
}
.docuImg img{
  border-radius: 4px;
  width: 100%;
  height: 100%;
}
.ellipsis{
  position: absolute;
  top: 0;
  left: 50px;
  text-overflow: ellipsis; 
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow : hidden;
}
.filter_wrap >>> .el-table.el-table--fit .cell {
  line-height: 22px !important;
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

.tableHead{
    /* background-color: #f9fbff;
    padding: 10px 15px; */
    display: inline-block;
    position: absolute;
    right: 1%;
}
.tableHead .el-upload-list{
  display: none!important;
}
.tableHead .el-upload-list--text{
  display: none!important;
}
.tableHead .el-upload-list__item-name{
  display: none!important;
}
.filterIpt{
    position: relative;
    margin-bottom: 10px;
}
.filterIpt i{
    position: absolute;
    right: 1%;
    top: 20%;
    font-size: 20px;
    cursor: pointer;
}
/* 标签 */
.tabs{
  /* border-left: 1px solid #EBEEF5;
  border-right: 1px solid #EBEEF5; */
  padding-left: 2%;
}
.tabs  span{
  cursor: pointer;
}
.tabs .blu{
  color: #1587DB;
}
.tabs i{
  margin: 0 5px;
}
.tabs .blac{
  color: #AEAEAE;
}
</style>
