<template>
  <div class="page-body" id="libraryupload" :style="{'height':menuListHeight+'px'}">
    <div class="filter_wrap">
      <el-form ref="form" :model="form" label-width="80px">
          <el-row>
              <el-col :span="12">
                <el-form-item label="选择文件" label-width="10rem">
                    <el-upload
                        class="upload-demo"
                        name="files"
                        action="/api/epf-document/document/upload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :http-request="annexUpload"
                        :before-remove="beforeRemove"
                        :before-upload="beforeAvatarUpload"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip" style="padding:left:10px">支持大小5M、扩展名：.pdf .doc .docx .xls .jpg...</span>
                    </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
               <el-form-item label="文件名称" label-width="10rem">
                    <el-input v-model="form.name" placeholder="填写文件名称"></el-input>
                </el-form-item>
              </el-col>
          </el-row>

          <el-row>
              <el-col :span="12">
                   <el-form-item label="文档来源" label-width="10rem">
                       <el-autocomplete
                            style="width:100%;"
                            popper-class="my-autocomplete"
                            v-model="form.source"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入文档来源"
                            @select="handleSelect">

                            <template slot-scope="props">
                                <div class="name">{{ props.item.name }}</div>
                            </template>
                        </el-autocomplete>

                </el-form-item>
              </el-col>
              <el-col :span="12">
                <!-- 单位文档上传 folderType == '3' -->
                <el-form-item v-if="folderType=='3'" label="文档分类" label-width="10rem">
                    <el-cascader
                      expand-trigger="hover"
                      :options="forderdata"
                      :props="folderprops"
                      :show-all-levels="false"
                      v-model="selectefolderid"
                      :change-on-select="true"
                      @change="handleChange"
                      style="width:100%">
                    </el-cascader>

                </el-form-item>
                <el-form-item v-else label="所属目录" label-width="10rem">
                    <el-cascader
                      expand-trigger="hover"
                      :options="forderdata"
                      :props="folderprops"
                      :show-all-levels="false"
                      v-model="selectefolderid"
                      :change-on-select="true"
                      @change="handleChange"
                      style="width:100%">
                    </el-cascader>
                </el-form-item>
              </el-col>
          </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="涉及业务" label-width="10rem">
                    <el-select v-model="form.bussyniss" multiple placeholder="请选择">
                            <el-option v-for="(item,index) in dictbussyniss" :key="index" :label="item.zhCn" :value="item.zhCn"></el-option>

                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12" class="edition">
                <el-form-item label="关键字" label-width="10rem">
                    <el-input v-model="form.keywords" placeholder="多个关键字用“、”隔开"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
              <el-form-item label="发文字号" label-width="10rem">
                  <el-input v-model="form.issuedNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="edition">
                <el-form-item label="涉及行业" label-width="10rem">
                    <el-select v-model="form.industry" multiple placeholder="请选择">
                        <el-option v-for="(item,index) in dictindustry" :key="index" :label="item.zhCn" :value="item.zhCn"></el-option>

                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
              <el-col :span="12">
                <el-form-item label="文件标签" label-width="10rem">
                    <div class="label">
                       <el-tag
                        :key="index"
                        v-for="(tag ,index) in selectedtag"
                        closable
                        :disable-transitions="false"
                        @close="handleClosetag(tag)">
                        {{tag.name}}
                    </el-tag>

                         <i class="el-icon-circle-plus-outline" @click="AddFlowpatreason"></i></div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="文档编号" label-width="10rem">
                    <el-input v-model="form.docNo" :readonly="true"></el-input>
                </el-form-item>
              </el-col>
          </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="作者" label-width="10rem">
                    <el-input v-model="form.author"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12" class="edition">
                <el-form-item label="文档状态" label-width="10rem">
                    <el-col :span="11" class="selt">
                        <el-select v-model="form.versionType" placeholder="请选择文档状态">
                            <el-option v-for="(item ,index ) in dictversions" :key="index" :label="item.zhCn" :value="item.zhCn"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="11" class="inp">
                        <el-input v-model="form.versionRemark"></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row class="relation">
            <el-col :span="12">
            <el-form-item label="关联相关" label-width="10rem">
                <el-button size="small" @click="handleEditt" >请选择要关联的文件</el-button>
                <div class="relevance" v-for="(item,index) in guanlian" :key="index"><span class="el-icon-paperclip"></span>{{item.name?item.name:item.NAME}}<span class="el-icon-close" @click="guanliandelet(item)"></span></div>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="版本关联" label-width="10rem">
                <el-button size="small" @click="handlEdition">请选择要关联的版本</el-button>
                <div class="relevance"  v-for="(item,index) in versiondoc" :key="index"><span class="el-icon-paperclip"></span>{{item.name?item.name:item.NAME}}<span class="el-icon-close"  @click="versiondocdelet(item)"></span></div>
            </el-form-item>
            </el-col>
        </el-row>
      </el-form>
      <div style="text-align:center;">
        <!-- 单位文档上传 folderType == '3' -->
        <el-button v-if="folderType=='3'" type="primary" @click="onSubmit">提交</el-button>
        <el-button v-else type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="closeupload">取消</el-button>
      </div>
    </div>
    <!-- 弹窗 -->
    <div>
        <!-- 关联相关 -->
        <el-dialog :title="dlogTitle" class="companyInfo" width="900px" :visible.sync="optPopup" :append-to-body='true'>
            <div class="switchHeight_box">
                <el-row :gutter="2">
                    <el-col :span="24" class="filterIpt">
                        <el-input   size="small" placeholder="请输入您要关联的相关文件的名称或关键字" v-model="searchInfo.name" @keyup.enter.native="tosearch"></el-input>
                        <i class="el-icon-search" @click="tosearch"></i>
                    </el-col>
                </el-row>
                <!--
                <el-row :gutter="2">
                    <el-col :span="24" style="margin-top:15px;">
                        <el-select v-model="form.region" :placeholder="folder">
                            <el-option label="个人收藏夹" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-col>
                </el-row>-->
                <el-table

                    :data="docInfoList"
                    style="width: 100%;margin-top:20px"
                    border
                    v-loading="loading"
                    @selection-change="dialogCheckChange"
                    :height="menuListHeight-150"
                    ref="multipleTable"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)">

                    <el-table-column  type="selection" width="55"></el-table-column>

                    <el-table-column  prop="name" label="文件名称" min-width="180">
                        <template slot-scope="scope">
                            {{scope.row.name}}
                        </template>
                    </el-table-column>

                    <el-table-column  prop="source" label="文档来源" min-width="150">
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
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-size="pageSize"
                        :current-page="pageNo"
                        :total="totalRecord"
                ></el-pagination>
                </div>
                <el-row>
                    <el-col :span="24" style="text-align: center;margin-top:10px">
                        <span class="button_border"  @click="optPopup = false" style="margin:0;">确定</span>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>

        <!-- 标签 -->
        <el-dialog :title="savetitle" :visible.sync="dialogFormVisible">
             <el-container>
            <el-row :gutter="2">
                <el-col :span="24">
                    <p>已选标签 <span>（最多只能添加六个）</span></p>
                    <el-tag
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
            <el-button type="primary" @click="dialogFormVisible = false">保存</el-button>
            </div>
        </el-dialog>
    </div>
  </div>
</template>
<script>
import selectInput from '@/components/common/form/selectInpt';
import { mapActions, mapState } from "vuex";
import Bus from '../../../../utils/bus';
export default {
    name: "libraryupload",
    data() {
        return {
            restaurants: [{'name':'厅规划处','value':'厅规划处'},{'name':'厅领导','value':'厅领导'}],
            type:"0",
            relaod:"",
            folderprops:{value:"id",label:"folderName",children:"childForder"},
            fileList:[],
            loading:false,
            xmbsmTableData:[],
            menuListHeight: 100,
            savetitle:'',
            pageNo: 1,
            pageSize: 10,
            totalPage: 1,
            totalRecord: 1,
            dlogTitle:'',
            folder:'',
            optPopup:false,//  控制关联弹窗
            dialogFormVisible: false,//标签选择
            dynamicTags: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            inputValue: '',
            forderdata:[],
            folderType:'',//文件类型：1文件夹，知识分类；2收藏夹；3工作文件夹分类,文档分类
            alltag:[],
            selectedtag:[],
             selectefolderid:[],
            selectedtagid:[],
            docInfoList:[],
            searchInfo:{},
            guanlian:[],
            versiondoc:[],
            dialogtype:"",
            form: {name:'',docNo:''},
            row:{},
            editor:"",
           selectedData: [],
           dictindustry:[],
           dictbussyniss:[],
           dictversions:[],
        };
    },
    created(){
        this.menuListHeight = window.innerHeight - 245;
        this.searchInfo["page"] = this.pageNo;
        this.searchInfo["rows"] = this.pageSize;
        this.row = this.$route.query.row;
        this.editor = this.$route.query.editor;

        this.folderType= this.$route.query.folderType;
        this.type=this.$route.query.uplaodtype
        this.relaod=this.$route.query.relaod
        if(this.editor==1){//是否为编辑
            this.form=this.row
            if (this.relaod==1) {
                this.form.lastVersionId=this.form.id;
            }
            if(this.form["involvedIndustry"]!=null ||this.form["involvedIndustry"]!=undefined){this.form.industry=this.form["involvedIndustry"].split(",");}
            if(this.form["involvedBussyniss"]!=null ||this.form["involvedBussyniss"]!=undefined){this.form.bussyniss=this.form["involvedBussyniss"].split(",");}
            this.form.pbtime=new Date(this.row.publishTime);
            this.getinit(this.row.id);
        }
        this.loadTree();//文件夹
        this.getDocList(this.searchInfo);
        this.queryDictList();
    },
     methods: {
        ...mapActions(["setTabsList"]),
        queryDictList() {
          let that = this;
          let codes=["involved_industry","involved_bussyniss","doc_sourse","doc_versions"];
          that.$post('/epf-admin/admin/dict/getDictDataByCode', {'codes': codes}).then(res => {
              if (res.data == 'undefined' || (res.data !== 'undefined') && (res.data == null)) {
                return 0;
              }
              let data=res.data;
              that.dictindustry=data.involved_industry;
              let restaurants=data.doc_sourse;
              let list=[];
              for (let index = 0; index < restaurants.length; index++) {
                list.push({name:restaurants[index]["zhCn"],value:restaurants[index]["zhCn"]})

              }
              that.restaurants = list;
              that.dictversions=data.doc_versions;
              that.dictbussyniss=data.involved_bussyniss;
            });
        },
        creatDocNo() {
            var params={}
            this.$post("/epf-document/docdocumentinfo/creatdocNo", params).then(res => {
                console.log(res)
                if(res.code!=0){
                    return
                }
                this.form.docNo=res.docNo
            })
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
        async getinit(id) {
            var params={};
            this.$post("/epf-document/admin/doctag/getTagJson", params).then(res => {
                console.log("===========", res);
                if (res.code != "0") {
                    this.$message.error(res.msg); //失败
                    this.loading = false;
                    return;
                }
                this.alltag = res.tags;
                this.loading = false;

                //   return R.ok().put("tags", tags).put("guanlianlist", guanlianlist).put("versionlist", versionlist);
                    this.$get("/epf-document/admin/doctag/getdocinit", {id:id}).then(res => {
                        if (res.code != "0") {
                        this.$message.error(res.msg); //失败
                            return;
                        }
                        var ids=[];
                        var taglist=[];
                        if(res.tags!=null && res.tags.length>0){
                            for (let j = 0; j < this.alltag.length; j++) {
                                for (let i = 0; i < res.tags.length; i++) {
                                if(res.tags[i].TAG_ID ==this.alltag[j].id){
                                        taglist.push(this.alltag[j])
                                        ids.push(this.alltag[j].id)
                                };
                            }
                            }
                        }
                        this.selectedtag=taglist;
                        this.selectedtagid=ids;
                        this.guanlian=res.guanlianlist

                        this.versiondoc=res.versionlist



                    });
            });
         },

        async getDocList(params) {
            this.loading = true;

            params["foldertype"]=this.folderType;

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

                this.loading = false;
            });
         },
        tosearch(){
            this.pageNo=1;
            this.searchInfo["page"] = this.pageNo;
            this.searchInfo["rows"] = this.pageSize;
            this.getDocList(this.searchInfo);
        },
        onSubmit() {//保存
            var that =this;
            var form=that.form;
            var newform={};
            var tags=that.selectedtagid;
            var guanlian=this.guanlian
            var tagids="";
            var guanliid="";
            var versid="";
            newform["involvedIndustry"]= this.form.industry.join(",");
            newform["involvedBussyniss"]= this.form.bussyniss.join(",");

            if(tags.length>0){
                for (let index = 0; index < tags.length; index++) {
                    tagids += tags[index]+",";
                }
            }
            if(guanlian.length>0){
              for (let index = 0; index < this.guanlian.length; index++) {
                    guanliid +=  (this.guanlian[index].id?this.guanlian[index].id:this.guanlian[index].ID)+",";
                }
            }
            if(this.versiondoc.length>0){
               for (let index = 0; index < this.versiondoc.length; index++) {
                    versid += (this.versiondoc[index].id?this.versiondoc[index].id:this.versiondoc[index].ID)+",";
                }
            }
            if(this.selectefolderid.length==0){
                this.$message.warning("请选择文档分类"); //失败
                return
            }

            newform["folderId"]=this.selectefolderid[this.selectefolderid.length-1];
            newform["tagids"]=tagids;
            newform["guanliid"]=guanliid;
            newform["versid"]=versid;
            newform["id"]=form["id"];
            newform["name"]=form["name"];
            newform["source"]=form["source"];
            newform["author"]=form["author"];
            newform["catalog"]=form["catalog"];
            newform["remark"]=form["remark"];
            newform["versionType"]=form["versionType"];
            newform["versionRemark"]=form["versionRemark"];
            newform["issuedNumber"]=form["issuedNumber"];
            newform["docNo"]=form["docNo"];
            newform["keywords"]=form["keywords"];
            newform["fileCataloging"]=form["fileCataloging"];
            newform["lastVersionId"]=form["lastVersionId"];
            newform["examineState"]="0";
            // form["folderId"]="id,id";
            that.$post("/epf-document/docdocumentinfo/savedocinfo",newform).then(res => {
                if(res.code!="0"){
                    this.$message.error(res.msg); //失败
                }

                this.$bus.$emit('closeTabsItem', this.$route.name)
                if(this.type=='1'){//单位文档上传
                    let routerPath = '/knowledgeConsult?folderType=3'
                    let title = '单位文档上传记录'
                    var tabObj = {title, routerPath}
                    this.setTabsList(tabObj)
                    this.$router.push('/knowledgeConsult?folderType=3')
                }else{
                    let routerPath = '/knowledgeConsult?folderType=1'
                    let title = '公共文档上传记录'
                    var tabObj = {title, routerPath}
                    this.setTabsList(tabObj)
                    this.$router.push('/knowledgeConsult?folderType=1')
                }
                this.$bus.$emit('refreshAssembly')
            });
        },
        closeupload(){
            let that = this;
            this.$bus.$emit('closeTabsItem', this.$route.name)
            if(this.type=='1'){//单位文档上传
                let routerPath = '/workFiles'
                let title = '单位文档'
                var tabObj = {title, routerPath}
                this.setTabsList(tabObj)
                this.$router.push('/workFiles')
            }else {
                let routerPath = '/knowledge'
                let title = '公共文档'
                var tabObj = {title, routerPath}
                this.setTabsList(tabObj)
                this.$router.push('/knowledge')
            }

            this.$bus.$emit('refreshAssembly')
        },
        guanliandelet(item){this.guanlian.splice(this.guanlian.indexOf(item), 1);},
        versiondocdelet(item){this.versiondoc.splice(this.versiondoc.indexOf(item), 1);},
        handleClosetag(tag) {
         this.selectedtagid.splice(this.selectedtagid.indexOf(tag.id), 1);
         this.selectedtag.splice(this.selectedtag.indexOf(tag), 1);
      },
        dialogCheckChange(selection) {
            if(this.dialogtype=='guanlian'){
                this.guanlian=selection;
            }else{
                this.versiondoc=selection
            }

        },
         loadTree() {//获取文件
            var that = this;
            this.loading = true;
            let urlStr="";
            let params={};
            urlStr="/epf-document/admin/docfolder/getFolderByType";
            params['folderType']=that.folderType;

            that.$post(urlStr,params).then(res => {
                console.log('数返回',res.ztreeJson);
                that.forderdata = res.ztreeJson;
                this.loading = false;
            });
        },
        handleChange(value) {
            console.log(value);
            this.selectefolderid = value;
        },
        async Addtagtreason() {
            var params={};
            params["type"]=this.type;
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

        },
        handleRemove(file, fileList) {
        console.log(file, fileList);
        },
        handlePreview(file) {
        console.log(file);
        },
        handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
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
        handleEditt(index, row) {
            this.dlogTitle = '关联相关';
            this.folder = '个人收藏夹';
            this.dialogtype='guanlian';

            this.optPopup = true;
            this.$refs.multipleTable.clearSelection();
        },
        handlEdition(index, row){
            this.dlogTitle = '关联版本';
            this.folder = '政策法规';
            this.dialogtype=''
            this.optPopup = true;
            this.$refs.multipleTable.clearSelection();

        },
        AddFlowpatreason() {
            this.savetitle = "标签选择";
            this.Addtagtreason();
            this.dialogFormVisible = true;
        },

        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
        beforeAvatarUpload(file) {debugger
            const isLt2M = file.size / 1024 / 1024 < 5;

            if (!isLt2M) {
                this.$message.error('上传附件大小不能超过 5MB!');
            }
            return isLt2M;
        },
        annexUpload(files){ //附件上传
            const file = files.file
            const formData = new FormData()

            formData.append("files", file)
            formData.append("belong", this.belong)
            formData.append("checkname", "check")
            if(this.editor==1 && this.relaod!=1){
                formData.append("id", this.form.id)
            }else{
                delete formData.id
            }
            this.uploadFunction(formData, files, file)

      },
      uploadFunction(formData, files, file, count) { //上传方法
       var _this=this
        _this.$useAppend("/epf-document/document/upload", formData).then(res => {
            console.log("res",res)
          if (res.state != "SUCCESS") {
              _this.$message.error(res.msg)
            return null
          }
            _this.form.id = res.data[0].id
            _this.form.name = res.data[0].name
            if(this.editor!=1){//是否为编辑
                this.creatDocNo();
            }
          files.onSuccess(res)
        }).catch(error=>{
          _this.$message.error('文件上传请求失败')
        })
      },
    }
};
</script>
<style scoped>
    .el-select{
        width: 100%;
    }
    .relation .el-upload{
        width: 100%;
    }
    .relation .el-button--small{
        width: 100%;
    }
    .edition  .el-form-item__content {
        position: relative;
    }
    .edition  .el-form-item__content .selt{
        position: absolute;
        left: 0;
    }
    .edition  .el-form-item__content .inp{
        position: absolute;
        right: 0;
    }
    .relevance{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .relevance span{
        color: #3a8ee6;
    }
    .filterIpt{
        position: relative;
    }
    .filterIpt i{
        position: absolute;
        right: 1%;
        top: 20%;
        font-size: 20px;
        cursor: pointer;
    }
    .el-message-box__message{
        text-align: center;
        font-size: 20px;
    }
    .label{
        position: relative;
        /* overflow: auto; */
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        height: 40px;
        width: 100%;
    }
    .label i{
        position: absolute;
        top: 20%;
        right: 1%;
        font-size: 24px;
        color: #3a8ee6;
        cursor: pointer;
    }
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
        margin: 0 5px 5px 0;
    }
    .input-new-tag {
        width: 90px;
        vertical-align: bottom;
    }
    .collection .el-dialog{
        width: 30%;
    }
    .choice .el-select{
    display: block;
    }


</style>
