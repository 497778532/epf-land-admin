<template>
  <div class="page-body" id="workFiles" style="background:#F7F7F7">
    <div class="filter_wrap">
      <el-container style="height:auto;padding-top:10px;">
        <el-main style="margin-right:15px;" >
          <el-tabs>
            <div class="switchHeight_box">
              <el-row :gutter="2">
                  <el-col :span="13" style="padding-left: 2%;padding-top: 5px;">
                    <span style="font-size: 28px;font-weight: bold;">单位文档</span>  
                    <p class="tabs">
                      <span v-for="(item, index) in toptag" 
                        :key="index" 
                        class="blu" 
                        @click="tagclick(item)">
                        <i v-if="index > 0" 
                          class="blu">>
                        </i>{{item.name}}
                      </span>
                    </p>
                  </el-col>
                  <el-col :span="4" class="search" v-show="searchShow" style="text-align:right;padding-right: 5px;">
                      <el-button
                        icon="el-icon-search" 
                        circle 
                        style="border: 0px;border-radius: inherit;padding-right:0;" 
                        @click="search">搜索
                      </el-button>
                  </el-col>
                  <!-- 搜索切换 -->
                  <el-col :span="4" class="searchIpt" v-show="!searchShow" style="padding-right: 5px;">
                      <!-- <i class="el-icon-search" @click="search"></i> -->
                      <el-input
                        placeholder="请输入您要搜索的关键词" 
                        v-model="searchInfo.name"
                        @keyup.enter.native="tosearch">
                      </el-input>
                  </el-col>
                  <el-col :span="1" class="search">
                    <el-popover placement="bottom" trigger="click">
                      <el-form label-width="80px" ref="form" :model="searchInfo">
                        <el-form-item label="文档来源">
                          <el-autocomplete
                            style="width:100%;"
                            popper-class="my-autocomplete"
                            v-model="searchInfo.resource"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入"
                            @select="handleSelect">
                            
                            <template slot-scope="props">
                                <div class="name">{{ props.item.name }}</div>
                            </template>
                        </el-autocomplete>
                        </el-form-item>
                        <el-form-item label="涉及业务">
                          <el-select v-model="searchInfo.involvedBussyniss" placeholder="请选择">
                            <el-option v-for="(item,index) in dictbussyniss" :key="index" :label="item.zhCn" :value="item.zhCn"></el-option>
                          </el-select>
                        </el-form-item>                        
                        <el-form-item label="涉及行业">
                          <el-select v-model="searchInfo.involvedIndustry" placeholder="请选择">
                            <el-option v-for="(item,index) in dictindustry" :key="index" :label="item.zhCn" :value="item.zhCn"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="作者">
                          <el-input  v-model="searchInfo.author" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary"  @click="clear" plain>重置</el-button>
                          <el-button type="primary"   @click="tosearch">搜索</el-button>
                        </el-form-item>
                      </el-form>
                      <el-button 
                        slot="reference"
                        icon="el-icon-ice-cream-square" 
                        circle 
                        style="border: 0px;border-radius: inherit;" 
                        >筛选
                      </el-button>
                    </el-popover>
                  </el-col>
                  <el-col :span="1" class="search">
                      <el-button 
                        icon="el-icon-upload2" 
                        circle 
                        style="border: 0px;border-radius: inherit;" 
                        @click="uploadWrokFile">上传
                      </el-button>
                  </el-col>
                  <!-- <el-col :span="1" class="search">
                      <el-button 
                        icon="el-icon-star-off" 
                        circle 
                        style="border: 0px;border-radius: inherit;"
                        @click="roleseting">收藏
                      </el-button>
                  </el-col> -->
                  <el-col :span="2" class="search" style="width:6.33333%;">
                      <el-button 
                        icon="el-icon-tickets" 
                        circle 
                        style="border: 0px;border-radius: inherit;" 
                        @click="uploadRecord">上传记录
                      </el-button>
                  </el-col>
                  <el-col :span="1" class="search">
                      <el-button 
                        icon="el-icon-download" 
                        circle 
                        style="border: 0px;border-radius: inherit;" 
                        @click="downFile">下载
                      </el-button>
                  </el-col>
                  <el-col :span="2" class="search">
                      <el-button 
                        icon="el-icon-s-unfold" 
                        circle 
                        style="border: 0px;border-radius: inherit;"
                        @click="changelisttype">切换排列模式
                      </el-button>
                  </el-col>
              </el-row>
            </div>

            <!--列表模式  -->
            <div style="background:#fff">
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
                v-show="tablelist"
                >
                <el-table-column fixed type="selection" width="55"></el-table-column>
                <el-table-column fixed prop="name" label="文件名称" sortable  min-width="230" > 
                  <template slot-scope="scope">
                    <div class="cell_click" @click="clickselectrow(scope.$index, scope.row)">
                      <div class="docuImg">
                        <img v-if="'png,gif,jpeg,jpg'.indexOf(scope.row.extName.toLowerCase()) != -1"
                          :src="'/api/epf-document/document/downloadById?id=' + scope.row.id">
                        <img v-else 
                          :src="require('@/assets/docu/' + scope.row.extName.toLowerCase() + '.png')">
                      </div>
                      <p class="ellipsis" :title='scope.row.name'>{{scope.row.name}}</p>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column prop="source" label="文档来源" min-width="100">
                  <template slot-scope="scope">
                    {{scope.row.source}}
                  </template>
                </el-table-column>
                <el-table-column  prop="involvedBussyniss" label="涉及业务" min-width="100">
                  <template slot-scope="scope">
                    {{scope.row.involvedBussyniss}}
                  </template>
                </el-table-column>
               
                <el-table-column prop="keywords" label="关键字"  min-width="100">
                  <template slot-scope="scope">
                    {{scope.row.keywords}}
                  </template>
                </el-table-column>
                <el-table-column prop="version" label="文档状态" min-width="50">
                  <template slot-scope="scope">
                      {{scope.row.versionType}}-{{scope.row.versionRemark}}
                  </template>
                </el-table-column>
                 <el-table-column prop="publishTime" sortable label="发文日期" min-width="130">
                  <template slot-scope="scope">
                    {{scope.row.publishTime}}
                  </template>
                </el-table-column>
                 <el-table-column prop="issuedNumber"  label="发文字号" min-width="130">
                  <template slot-scope="scope">
                    {{scope.row.issuedNumber}}
                  </template>
                </el-table-column>
                <el-table-column prop="involvedIndustry"  label="涉及行业" min-width="130">
                  <template slot-scope="scope">
                    {{scope.row.involvedIndustry}}
                  </template>
                </el-table-column>
                <el-table-column prop="author"  label="作者" min-width="130">
                  <template slot-scope="scope">
                    {{scope.row.author}}
                  </template>
                </el-table-column>
                <el-table-column prop="createName"  label="上传人" min-width="130">
                  <template slot-scope="scope">
                    {{scope.row.createName}}
                  </template>
                </el-table-column>
                <el-table-column prop="readNumber" label="浏览量" sortable min-width="100">
                  <template slot-scope="scope">
                    {{scope.row.readNumber}}
                  </template>
                </el-table-column>
                <el-table-column prop="dochot" label="文档热度"  min-width="100">
                  <template slot-scope="scope">
                    <hot :hotNumber="scope.row.readNumber" ></hot>
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="remark" label="描述" min-width="150">
                  <template slot-scope="scope">
                    {{scope.row.remark}}
                  </template>
                </el-table-column> -->
                <el-table-column prop="docNo" label="文档编号" min-width="150">
                  <template slot-scope="scope">
                    {{scope.row.docNo}}
                  </template>
                </el-table-column>
                
                <el-table-column prop="docSize" label="大小" sortable min-width="100">
                  <template slot-scope="scope">
                    {{scope.row.docSize}}K
                  </template>
                </el-table-column>
              </el-table>

              <!-- 切换后的排列模式 -->
              <el-main
                :style="{'height':menuListHeight-150 + 'px','borderLeft':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)','borderRight':'1px solid rgb(224, 224, 224)'}"
                v-if="!tablelist">
                <el-row>
                </el-row>
                <el-row
                  v-loading="loading"
                  element-loading-text="数据加载中"
                  element-loading-background="rgba(255, 255, 255,0.95)"
                  style="min-height:200px;padding:3px;flex-direction: row;"
                >
                  <el-col :span='24' style="padding-left:1%">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                  </el-col>
                  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" style="padding-left: 3%;">
                  <el-col
                    class="carditem"
                    @contextmenu.native="rightClick(item.id,item.fdId,index,item)"
                    @mouseenter.native="mouseIn(item.id,index)"
                    @mouseleave.native="mouseOut(item.id,index)"
                    v-rightMenu="menudata"
                    v-for="(item,index) in docInfoList"
                    :key="index"
                    :span="3">
                    
                      <el-checkbox :key="item.id" :label="item.id"><span hidden>this is hidden</span></el-checkbox>
                      <div class="docImgBox" @click="changeCheckFile(item.id,index)">
                        <img width="70px" height="70px" v-if="'png,gif,jpeg,jpg'.indexOf(item.extName.toLowerCase()) != -1  "  :src="'/api/epf-document/document/downloadById?id=' + item.id" >
                        <img width="70px" height="70px"  v-else :src="require('@/assets/docu/' + item.extName.toLowerCase() + '2x.png')" >
                        <span v-show="checkFiles">
                              <span v-show="!item.checkFiles" class="checkBox">
                                  <span class="check"> <i class="el-icon-check"></i> </span>
                              </span>
                              <span v-show="item.checkFiles" class="checkBox">
                                  <span class="checked"> <i class="el-icon-check"></i> </span>
                              </span>
                          </span>
                      </div>
                      <div v-show="item.showInput" class="cardbottomInput">
                        <input :style="{'borderColor':errorBoderColor}" @focus="errorBoderColor = 'rgb(192, 192, 192)'" v-model="newFileName" placeholder="请输入内容">
                        <el-button type="success" style="width:25px;height:25px;padding:0px 5px;line-height:25px;"  size="mini" icon="el-icon-check" @click="changeNameSure" plain ></el-button>
                        <el-button type="danger"  style="width:25px;height:25px;padding:0px 5px;line-height:25px;margin-left:1px;" size="mini" icon="el-icon-close" @click="changeNameCancel" plain ></el-button>
                      </div>
                      <div v-show="!item.showInput" class="cardbottom">{{item.name}}</div>

                      <div v-show="item.showInput2" class="cardbottomInput">
                        <input :style="{'borderColor':errorBoderColor}" @focus="errorBoderColor = 'rgb(192, 192, 192)'" v-model="newSort" placeholder="请输入数字（数字越小越靠前）">
                        <el-button type="success" style="width:25px;height:25px;padding:0px 5px;line-height:25px;"  size="mini" icon="el-icon-check" @click="changeSortSure" plain ></el-button>
                        <el-button type="danger"  style="width:25px;height:25px;padding:0px 5px;line-height:25px;margin-left:1px;" size="mini" icon="el-icon-close" @click="changeSortCancel" plain ></el-button>
                      </div>
                    
                  </el-col>
                  </el-checkbox-group>
                </el-row>
              </el-main>
              <div style="text-align:right;padding:22px 0px;">
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
            </div>
          </el-tabs>
        </el-main>

        <div class="knowledgeRight" :height="menuListHeight-150">
            <el-aside width="260px">
                <el-header
                    style="height:40px;line-height:40px;display:flex;justify-content: space-between;align-items: center;"
                    class="m_title"
                ><span @click="AddFlowpatreason" style="cursor: pointer;" class="el-icon-price-tag">常用标签</span> <i class="el-icon-setting"></i></el-header>
                <el-row >
                    <el-col v-for="(tag ,index) in dynamicTags" :key="index">
                        <el-button type="danger" :style="colors[index]" circle  @click="gettagdao(tag.id)"></el-button>
                        <span  @click="gettagdao(tag.id)">{{tag.name}}</span>
                    </el-col>
                    
                </el-row>
            </el-aside>
            <el-aside width="260px" style="padding-top:10px;">
                <el-header
                    style="height:40px;line-height:40px"
                    class="m_title"
                ><i class="el-icon-s-fold"></i> 文档分类</el-header>
                <el-main
                    :style="{'height':menuListHeight-400+'px','background': '#fff'}"
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
            <el-aside width="260px" style="margin-top:10px;padding:10px 0;" class="includ">
                <div style="width:40px;height:40px;"><img src="../../../../assets/images/cake.png" alt=""> </div>
                <div><span>{{totlecorde}}件</span>收录总数</div>
            </el-aside>

        </div>

      </el-container>
    </div>

    <!-- 弹框 -->
    <div>
      <el-dialog :title="savetitle" :visible.sync="dialogFormVisible">
        <el-container>
            <el-row :gutter="2">
                <el-col :span="24">
                    <p>我的标签 <span>（最多只能添加六个）</span></p>
                    <el-tag
                        style="margin: 5px;"
                        :key="index"
                        v-for="(tag ,index) in selectedtag"
                        closable
                        :disable-transitions="false"
                        @close="handleClosetag(tag)">
                        {{tag.name}}
                    </el-tag>
                </el-col>
                <el-col :span="24">
                    <p>全部标签</p>
                    <span v-for="(tag,index) in alltag" :key="index">
                    <el-button v-if="selectedtagid.indexOf(tag.id)!=-1"  class="button-new-tag"  size="small">{{tag.name}}  +</el-button>
                    <el-button v-else  class="button-new-tag"  size="small" @click="handleInputConfirm(tag)">{{tag.name}}  +</el-button>
                    </span>
                </el-col>
            </el-row>
            
        </el-container>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>

          <el-button  type="primary" @click="saveuserinfo('ruleForm')">保存</el-button>
        </div>
      </el-dialog>
      <!--###########弹框收藏##############-->
      <el-dialog title="收藏" :visible.sync="dialogFormroleVisible" class="collection">
            <div class="choice">
                <p style="padding-bottom:10px">选择收藏夹 <span class="el-icon-folder-add" @click="addCollect">新建收藏夹</span></p>
                  <el-cascader 
                      expand-trigger="hover"
                      :options="foldercollect"
                      :props="folderprops"
                      :show-all-levels="false"
                      v-model="selectrows"
                      :change-on-select="true"
                      @change="roleOnchange">
                    </el-cascader>
            </div>
            <div>
                <p style="padding: 20px 0px 10px;">添加备注</p>
                <el-input
                    type="textarea"
                    placeholder="请输入要备注的内容"
                    v-model="textarea"
                    maxlength="200"
                    show-word-limit
                    resize='none'
                    :autosize="{ minRows: 4, maxRows: 30}"
                ></el-input>
            </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormroleVisible = false">取 消</el-button>

          <el-button type="primary" @click="getCheckedKeys">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import Axios from "axios";
import { constants } from "zlib";
import { mapActions, mapState } from "vuex";
import configApi from '../../../../../config/index'
import base from '../../../../utils/config.js'
import hot from '../components/hot'
export default {
  name: "workFiles",
  components: {hot},

  data() {
    return {
      folderprops:{value:"id",label:"folderName",children:"childForder"},
      form:{name: '', region: '',},
      tablelist:true,
      selectedtag:[],
      selectedtagid:[],
      foldercollect:[],//收藏夹
      alltag:[],
      totlecorde:0,
      input: '',
      dynamicTags:[],
      inputVisible: false,
      textarea: '',
      searchShow:true,
      checkAll: false,
      checkedCities: [],
      isIndeterminate: true,
      dialogFlieName:'',
      defaultProps: {
        children: "childForder",
        label: "folderName"
      },
      forderdata: [],
      folderType:'3',//文件类型：1文件夹，知识分类；2收藏夹；3工作文件夹分类,文档分类
      loading2: true,
      folderId: "",
      docInfoList: [],
      currentNode: {},
      currentData: {},
      currentIndex: -1,
      errorBoderColor:'',
      parentdata: {},
      checkFiles:false, //  开启选择文件功能
      currentId: "",
      newFileName: "",
      newSort:'',
      currentFileIndex:0,
      menudata: {
          dit:'docRightMenu',
          // 菜单box的样式   Menu box style
          boxStyle:
            "width:80px;background:#fff;box-shadow: 0px 0px 15px rgb(172, 172, 172);",
          // 菜单选项的样式 Style of menu options
          optionStyle:
            "color:#666;line-height:30px;font-size:16px;text-align:left;padding-left:10px;",
          menus: [
            {
              content: "下载",
              callback: "downloadfile",
              style:
                "border-bottom:1px solid #fff;background:#fff;line-height:30px;"
            },
            {
              content: "预览",
              callback: "openDoc",
              style:
                "border-bottom:1px solid #fff;background:#fff;line-height:30px;"
            },
          ]
      },
      queryByIdUrl:'',
      loading: true,
      menuListHeight: 100,
      dialogFormVisible: false,
      dialogFormroleVisible: false,
      selectrows: [],
      value: "",
      toptag:[{name:"全部文件",type:"all",id:""}],
      selectGroups: [],
      savetitle: "新增账号",
      edit: false,
      dialogForm: false,
      pageNo: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: { usetype: "" },
      colors:[],
      dictindustry:[],
      dictbussyniss:[],
      restaurants: [],
    };
  },
  created() {
    this.menuListHeight = window.innerHeight - 245;
    this.searchInfo["page"] = this.pageNo;
    this.searchInfo["rows"] = this.pageSize;
    this.searchInfo["load"]=true
    this.randomRgb();
    this.getDocList(this.searchInfo);
    this.getowmtag();

    this.loadTree();
     this.queryDictList("involved_industry");
    this.queryDictList("involved_bussyniss");
    this.queryDictList("doc_sourse");
    
  },
  methods: {
    queryDictList(code) {
      var that = this;
      that.$get("/epf-admin/admin/dictionaries/getDictEbyDictGroup/" + code).then(res => {
          if (res.code === 0) {
              if(code=='involved_industry'){
                  if (res.dictionariesList != null) {
                      that.dictindustry = res.dictionariesList;
                  } else {
                      that.dictindustry = [];
                }
              }else if(code=='doc_sourse'){
                if (res.dictionariesList != null) {
                    var list=[];
                    for (let index = 0; index < res.dictionariesList.length; index++) {
                      list.push({name:res.dictionariesList[index]["zhCn"],value:res.dictionariesList[index]["zhCn"]})
                      
                    }
                      that.restaurants = list;
                    } else {
                      that.restaurants = [];
                }
              }else{
                  if (res.dictionariesList != null) {
                      that.dictbussyniss = res.dictionariesList;
                  } else {
                      that.dictbussyniss = [];
                  }
              }
          } else {
              that.$message.warning(res.msg);
          }
      });
    },
    querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
            return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect(item) {

      },
     clear(){
        this.searchInfo={};
        this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = this.pageSize;
        this.getDocList(this.searchInfo);
        
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
      randomRgb() {
        var colors=[];
        for (let index = 0; index < 10; index++) {
          let R = Math.floor(Math.random() * 255);
          let G = Math.floor(Math.random() * 255);
          let B = Math.floor(Math.random() * 255);
          colors.push({background: 'rgb(' + R + ',' + G + ',' + B + ')'}) ;
        }
        this.colors=colors ;
      },
      tosearch(){
        this.pageNo=1;
        this.searchInfo["page"] = this.pageNo;
        this.searchInfo["rows"] = this.pageSize;
        this.getDocList(this.searchInfo);
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
          this.searchInfo["folderId"] = this.toptag[1].id;
          this.searchInfo["tagId"] = "";
          this.getDocList(this.searchInfo);
        }
      },
      //多选框
      handleCheckAllChange(val) {
        this.checkedCities = val ? this.cities : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        this.selectGroups=[];
        for(var i=0 ; i < this.checkedCities.length ; i++){
          this.selectGroups.push({id:this.checkedCities[i]});
        }
        
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      changelisttype(){
        this.tablelist=!this.tablelist; 

        this.selectGroups=[];
        
        this.checkAll=false;
        this.checkedCities=[];
        // this.cities=[];
        this.isIndeterminate=true;
      },
      gettagdao(tagId){
        this.pageNo=1
        this.searchInfo["page"] = this.pageNo;
        this.searchInfo["rows"] = this.pageSize;
        this.searchInfo["folderId"] = "";
        this.searchInfo["tagId"] = tagId;
        this.getDocList(this.searchInfo);
        
      },
      ...mapActions(["setTabsList"]),
      search(){
        this.searchShow = !this.searchShow;
      },
      addCollect(){
        this.$prompt('请输入收藏夹名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          var params=[];
          params["folderName"]=value
          params["folderType"]=folderType
          this.$post("/epf-document/admin/docfolder/save",params).then(res => {
            if(res.code!=0){
              return;
            }

            this.roleseting();
            this.selectrows=[res.oaFolder.id]
          });
         
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '取消输入'
          // });       
        });
      },
       handleClosetag(tag) {
         this.selectedtagid.splice(this.selectedtagid.indexOf(tag.id), 1);
         this.selectedtag.splice(this.selectedtag.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;

          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
          });
      },
      handleInputConfirm(tag) {
        if(this.selectedtag.length>=6){
          this.$message.warning("最多添加六条标签！");
          return;
        }else{
          this.selectedtag.push(tag);
          this.selectedtagid.push(tag.id);
        }
      },
      roleOnchange(e) {
        this.selectrows = e;
        console.log(e);
      },
      clickselectrow(index,row) {
        // this.$refs.multipleTable.toggleRowSelection(row);
        let that = this;
        let title = '文档浏览'
        let routerPath = '/documentBrowse'
        let tabObj = {title, routerPath}
        that.setTabsList(tabObj)
        that.$router.push({path: routerPath,query:{row:row}})
        
      },
      getCheckedKeys(e) {
        var that = this;
        if(that.selectrows.length==0){
          that.$message.warning("请选择收藏夹！");
          return;
        }
        if (that.selectGroups.length < 1) {
          that.$message.warning("请选择文件！");
          return;
        } else {

          var folderid = that.selectrows[that.selectrows.length-1];
          
          var docid = "";
          for (var i = 0; i < that.selectGroups.length; i++) {
            if (i == 0) {
              docid +=that.selectGroups[i].id;
            } else {
              docid += "," + that.selectGroups[i].id;
            }
          }
          var params = {folderids: folderid, docids: docid ,remark:that.textarea};
          that.$get("/epf-document/admin/doctag/addcollect", params)
            .then(res => {
              if (res.code != "0") {
                that.$message.error(res.msg); //失败
                return;
              }
              that.$message.success("收藏成功！");
              that.dialogFormroleVisible = false;
            });
        }
      },
      roleseting() {
        var that = this;
          let selectGroups = that.selectGroups;
          if(selectGroups.length<=0){
            that.$message.error("请选择需要收藏文件！"); //失败
            return;
          }
          that.$post("/epf-document/admin/docfolder/ownnerfolders").then(res => {
            console.log('数返回',res);
            that.foldercollect = res.folder;
          });
          that.selectrows=[];
          that.textarea="";

          that.dialogFormroleVisible = true;
      },
      saveuserinfo() {
        let that = this;
        var tags=that.selectedtagid;
        var ids="";
        for (let index = 0; index < tags.length && index < 6; index++) {
          if(index==0){
            ids+=tags[index];
          }else{
            ids+=","+tags[index];
          }
        
        }
        
        that.$post("/epf-document/admin/doctag/updateUtag", {id:ids,type:"1"}).then(res => {

          if (res.code != "0") {
            that.$message.error(res.msg); //失败
            return;
          }
            that.dialogFormVisible=false;
            that.getowmtag();
        });
        
      },
      handleSelectionChange(val) {
        this.selectGroups = val;
      },
      async getDocList(params) {
        this.loading = true;
        params["foldertype"]='3';
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
      AddFlowpatreason() {
        this.savetitle = "标签选择";
        var dynamicTags=this.dynamicTags;
        this.selectedtag=dynamicTags
        var ids=[];
        for (let index = 0; index < dynamicTags.length; index++) {
        ids.push(dynamicTags[index].id) ;
          
        }
        this.selectedtagid=ids
        var params={type:"1"};
        this.$post("/epf-document/admin/doctag/getTagJson", params).then(res => {
          console.log("===========", res);
          if (res.code != "0") {
            this.$message.error(res.msg); //失败
            this.loading = false;
            return;
          }
          
          this.alltag = res.tags;
          this.loading = false;
        });
        this.dialogFormVisible = true;
      },
      handleSizeChange(val) {
        //每页条数改变时触发
        this.pageNo = 1;
        this.searchInfo["page"] = this.pageNo;
        this.searchInfo["rows"] = val;
        this.getDocList(this.searchInfo);
      },
      getImgUrl(id) {
        return "/api/epf-document/document/downloadById?id=" + id;
      },
      getowmtag() {
        var that = this;
        var params={}
        params["type"]="1"
        that.$post("/epf-document/admin/doctag/getOwnTagJson",params).then(res => {
          console.log("getOwnTagJson",res);
          if (res.code != "0") {
            that.$message.error(res.msg);
            return;
          }
          if (res.tags == null) {
            that.dynamicTags = [];
          } else {
            that.dynamicTags = res.tags;
          }
        });
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
        that.folderId = id;
        //每页条数改变时触发
        that.pageNo = 1;
        that.searchInfo["page"] = this.pageNo;
        that.searchInfo["rows"] = this.pageSize;
        that.searchInfo["tagId"]=""
        that.searchInfo["folderId"]=that.folderId
        that.getDocList(this.searchInfo);


      },
      loadTree() {
        var that = this;
        this.loading2 = true;
        let params={folderType:that.folderType};
        that.$get("/epf-document/admin/docfolder/getFolderByType",params).then(res => {
          console.log('数返回',res.ztreeJson);
          that.forderdata = res.ztreeJson;
          that.queryByIdUrl = res.queryByIdUrl;
          this.loading2 = false;
        });
      },
      //文件预览
      openDoc(){
        let that = this;
        let title = '文档浏览'
        let routerPath = '/documentBrowse'
        let tabObj = {title, routerPath}
        that.setTabsList(tabObj)
        that.$router.push({path: routerPath,query:{row:this.currentData}})
        
      },
      //文件下载
      downFile(id){;
        let that = this;
        if (that.selectGroups.length != 1) {
          that.$message.warning("请选择一条数据下载！");
          return;
        }
        let ids = that.selectGroups[0].id
        console.log(ids)
          window.open( "/api/epf-document/document/downloadById?id=" + ids    +"&fromWhere=page"     );
        // that.$get("/epf-document/docdocumentinfo/addviews", {id:ids,type:"down"}).then(res => {//浏览量read下载量down
        //   });
        
      },
      downloadfile(id) {
       window.open( "/api/epf-document/document/downloadById?id=" + this.currentId +"&fromWhere=page");
        //  this.$get("/epf-document/docdocumentinfo/addviews", {id:id,type:"down"}).then(res => {//浏览量read下载量down
        //   });
      },
      //上传文件跳转
      uploadWrokFile(){
        let that = this;
        let title = '上传文档'
        let routerPath = '/libraryUpload'
        let tabObj = {title, routerPath}
        that.setTabsList(tabObj)
        that.$router.push({path: routerPath,query:{folderType : that.folderType,uplaodtype:"1"}})
      },
      //上传记录
      uploadRecord(){
        let that = this;
        let title = '单位文档上传记录'
        let routerPath = '/knowledgeConsult?folderType=3'
        let tabObj = {title, routerPath}
        that.setTabsList(tabObj)
        that.$router.push({path: routerPath,query:{folderType : that.folderType}})
      },
      changeNameSure(){
        if(this.newFileName.length == 0){
          this.$message({
            showClose: true,
            message: '请输入文件名！',
            type: 'error'
          });
          this.errorBoderColor = '#F56C6C'
          return
        }
        // this.newFileName 新的文件名
        // this.currentId 当前修改的文件id
        // this.docInfoList[this.currentIndex].name = this.newFileName + '.' + this.docInfoList[this.currentIndex].extName;
        this.docInfoList[this.currentIndex].name = this.newFileName;
        this.$post("/epf-document/docdocumentinfo/renamedDoc",{id:this.docInfoList[this.currentIndex].id,name:this.docInfoList[this.currentIndex].name}).then(res => {
          if (res.code ==0) {
            this.$message({
              message: "重命名成功",
              type: "success"
            });
          }else{
            //失败
            this.$message.error(res.msg);
            return;
          }
        });
        this.docInfoList[this.currentIndex]['showInput'] = false;
        this.newFileName = ""
      },
      changeSortSure(){
        var re = /^[0-9]{1,3}$/;//小于4位数纯数字
        if (!re.test(this.newSort)) {
          this.$message({
            showClose: true,
            message: '请输入小于4位数字类型的排序字段！',
            type: 'error'
          });
          this.errorBoderColor = '#F56C6C'
          return
        }
        // if(this.newSort == ''||this.newSort == 'null'||typeof(this.newSort)!="number"||this.newSort.length>4){
        //     this.$message({
        //         showClose: true,
        //         message: '请输入小于4位数字类型的排序字段！',
        //         type: 'error'
        //     });
        //     this.errorBoderColor = '#F56C6C'
        //     return
        // }

        this.docInfoList[this.currentIndex].sort = this.newSort;
        this.$post("/epf-document/docdocumentinfo/sortDoc",{id:this.docInfoList[this.currentIndex].id,sort:this.docInfoList[this.currentIndex].sort}).then(res => {
          if (res.code ==0) {
            this.$message({
              message: "排序成功",
              type: "success"
            });
            this.searchInfo["page"] = this.pageNo;
            this.searchInfo["rows"] = this.pageSize;
            this.searchInfo["folderId"]=this.folderId
            this.getDocList(this.searchInfo);
          }else{
            //失败
            this.$message.error(res.msg);
            return;
          }
        });
        this.docInfoList[this.currentIndex]['showInput2'] = false;
        this.newSort = ""
      },
      changeNameCancel(){
        this.docInfoList[this.currentIndex]['showInput'] = false;
        this.newFileName = ""
      },
      changeSortCancel (){
        this.docInfoList[this.currentIndex]['showInput2'] = false;
        this.newSort = ""
      },
      changeCheckFile(item,index){
        this.dialogFlieName = this.docInfoList[index].name;
        if(this.checkFiles){
          this.docInfoList[index].checkFiles = !this.docInfoList[index].checkFiles;
          this.$forceUpdate();
        }
      },
      setName(node, data) {
        
        var that = this;
        var name = document.getElementById(node.id + "Name").value;
        
        if (!name) {
          that.$message.error("请输入名称!");
          return false;
        }
        console.log(this.parentdata.id,name);
       //知识管理夹
        that.$post("/epf-document/admin/docfolder/save", {folderName: name,pId: this.parentdata.id,folderType:"3"})
          .then(res => {
            if (res.code != 0) {
              that.$message.error("保存失败!");
              return false;
            }
            that.$message.success("保存成功!");
            that.loadTree();
          });
      },
      mouseIn(id,index){
        document.querySelectorAll('.carditem')[this.currentFileIndex].style.border = '1px solid #fff'
      },
      mouseOut(id,index){
        // document.querySelectorAll('.carditem')[this.currentFileIndex].style.border = '1px solid #fff'
      },
      handleCurrentChange(val) {
        //获取当前页
        this.pageNo = val;
        this.searchInfo["page"] = this.pageNo;
        this.searchInfo["rows"] = this.pageSize;
        this.searchInfo["folderId"]=this.folderId
        this.getDocList(this.searchInfo);
      },
      /*
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

      */
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
      rightClick(id,fdId,index,item) {
        if(this.checkFiles){
          sessionStorage.setItem('docMenu','true');
          return
        }
        sessionStorage.setItem('docMenu','false');
        this.currentData=item
        this.currentId = id;
        this.fdId=fdId;
        if(index != this.currentFileIndex){
          document.querySelectorAll('.carditem')[this.currentFileIndex].style.border = '1px solid #fff'
        }
        this.currentFileIndex = index
        document.querySelectorAll('.carditem')[index].style.border = '1px solid #409eff'
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
}
.oper span {
  display: inline-block;
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
  .cardbottomInput{
    margin-top: 8px;
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .cardbottomInput input{
    display: inline-block;
    box-sizing: border-box;
    width: 90px;
    height: 25px;
    border: 1px solid rgb(192, 192, 192);
    border-radius: 3px;
    padding:0 3px;
  }
  .m_title {
    height: 40px !important;
    line-height: 40px !important;
    padding-left: 10px;
    background: #fff;
    color: rgb(50, 58, 64);
    font-size: 16px;
    border-bottom: 1px solid rgb(224, 224, 224);
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
.knowledgeRight{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.includ{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    /* border: 1px solid rgb(224, 224, 224); */
    background: #fff;
}
.includ img{
  width: 100%;
  height: 100%;
}
.includ span{
  font-size: 20px;
  padding-right: 5px;
}
.knowledgeRight .el-row{
    padding: 2% 10%;
    /* border-right: 1px solid rgb(224, 224, 224);
    border-bottom: 1px solid rgb(224, 224, 224);
    border-left: 1px solid rgb(224, 224, 224); */
    background: #fff;
}
.knowledgeRight .el-row div{
    display: flex;
    align-items: center;
    padding: 5px 0;
}
.knowledgeRight .el-row div span{
    padding-left: 5%;
}
.search{
  position: relative;
}
.search i{
  position: absolute;
  left: 0;
}
.search .el-button:focus,.search .el-button:hover {
    color: #409EFF;
    border-color: transparent;
    background-color: transparent;
}
.searchIpt{
    position: relative;
}
.searchIpt i{
    background-color: #409EFF;
    color:white;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    position: absolute;
    z-index: 1;
    top: 8%;
    left: -18%;
}
.searchIpt input{
    padding-left:30px;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    margin: 5px;
}
.input-new-tag {
    width: 90px;
    vertical-align: bottom;
}
.collection .el-dialog{
    width: 30%;
}
.choice{
  position: relative;
}
.choice p{
  display: flex;
  justify-content: space-between;
}
.choice p span{
  color: #409eff;
  letter-spacing: 1px;
  cursor: pointer;
}
.choice .el-select{
  display: block;
}
/* 标签 */
.tabs{
  border-left: 0px solid #EBEEF5;
  border-right: 0px solid #EBEEF5;
  padding-left: 0;
  margin-top: 10px;
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
.el-button--danger {
    border-color: transparent !important;
}
</style>
