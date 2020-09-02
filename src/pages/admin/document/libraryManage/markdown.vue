<template>
  <div class="page-body" id="addAgreementContract" :style="{'height':menuListHeight +'px'}">
    <div class="filter_wrap">
        <el-form ref="form" :model="form" label-width="80px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="文章标题:" label-width="10rem">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-form-item  label-width="10rem">
                        <div :style="{'height':menuListHeight-250 +'px'}">

                            <mavon-editor ref="markdowneditor" 
                                v-model="form.content" 
                                :ishljs="true"
                                :style="{'height':menuListHeight-250 +'px'}" 
                                @imgAdd="$imgAdd"> </mavon-editor>

                        </div>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="文章来源:" label-width="10rem">
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
                <el-col :span="8">
                    <el-form-item label="文章作者:" label-width="10rem">
                        <el-input v-model="form.author"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8"> 
                    <el-form-item label="发布日期:" label-width="10rem">
                         <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.pbtime"
                                style="width: 100%;"
                            ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
             <el-row>
                <el-col :span="8">
                    <el-form-item label="文档编号" label-width="10rem">
                         <el-input v-model="form.docNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="关键字" label-width="10rem">
                        <el-input v-model="form.keywords"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8"> 
                    <el-form-item label="涉及业务:" label-width="10rem">
                        <el-select v-model="form.bussyniss" multiple placeholder="请选择">
                            <el-option label="公积金" value="公积金"></el-option>
                            <el-option label="台账" value="台账"></el-option>
                            <el-option label="合同" value="合同"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
             <el-row>
                <el-col :span="8">
                    <el-form-item label="发文字号" label-width="10rem">
                         <el-input v-model="form.issuedNumber"></el-input>
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="8">
                    <el-form-item label="描述" label-width="10rem">
                        <el-input v-model="form.remark"></el-input>
                    </el-form-item>
                </el-col> -->
                <el-col :span="8"> 
                    <el-form-item label="涉及行业:" label-width="10rem">
                        <el-select v-model="form.industry" multiple placeholder="请选择">
                            <el-option label="IT" value="IT"></el-option>
                            <el-option label="教育" value="教育"></el-option>
                            <el-option label="金融" value="金融"></el-option>
                            <el-option label="医疗" value="医疗"></el-option>
                            <el-option label="服务" value="服务"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="文章分类:" label-width="10rem">
                        <el-cascader 
                            expand-trigger="hover"
                            :options="forderdata"
                            :props="folderprops"
                            :show-all-levels="false"
                            v-model="form.folderId"
                            :change-on-select="true"
                            @change="handleChange"
                            style="width:100%">
                            </el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="文章编目:" label-width="10rem">
                        <el-input v-model="form.fileCataloging"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                     <el-form-item label="关联相关:" label-width="10rem">
                        <el-button size="small" @click="handleEditt" style="width:100%;line-height:20px">请选择要关联的文件</el-button>
                        <div class="relevance" v-for="(item,index) in guanlian" :key="index"><span class="el-icon-paperclip"></span>{{item.name?item.name:item.NAME}}<span class="el-icon-close" @click="guanliandelet(item)"></span></div> 
                    </el-form-item>
                </el-col>
            </el-row>
             
      </el-form>

      <div style="text-align:center;">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="closearticle">取消</el-button>
      </div>
    </div>
    <!-- 弹窗 -->
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
  </div>
</template>
<script>
import {mavonEditor} from "mavon-editor";
import "mavon-editor/dist/css/index.css";
 import axios from 'axios'
 import baseUrl from '../../../../utils/config'
export default {
    components: {mavonEditor},
    data() {
        return {
            restaurants: [{'name':'广东省自然资源厅','value':'广东省自然资源厅'},{'name':'贵州资源厅','value':'贵州资源厅'}],
            dialogtype:"",
            pageNo: 1,
            pageSize: 10,
            totalPage: 1,
            totalRecord: 1,
             docInfoList:[],
            searchInfo:{},
            loading:false,
             dlogTitle:'',
            folder:'',
            optPopup:false,//  控制关联弹窗
             guanlian:[],
            menuListHeight: 900,
            forderdata:[],
            folderprops:{value:"id",label:"folderName",children:"childForder"},
            form: {
                content:"",
                name: ""
                
            },
            editorId:'cmsEditor',
            editor:"",
            relaod:"",
            
        };
    },
    created(){
        this.menuListHeight = window.innerHeight - 200;
        this.loadTree();
        this.editor = this.$route.query.editor;
        if(this.editor==1){//是否为编辑
            var form = this.$route.query.row;
            this.form=form;
            var name=this.form.name;
            if(form["involvedIndustry"]!=null ||form["involvedIndustry"]!=undefined){this.form.industry=form["involvedIndustry"].split(",");}
            if(form["involvedBussyniss"]!=null ||form["involvedBussyniss"]!=undefined){this.form.bussyniss=form["involvedBussyniss"].split(",");}
            if(name.indexOf(".")!=-1){
                this.form.name=name.substring(0,name.indexOf("."));
            }
            this.form.pbtime=new Date(this.form.publishTime);
            var _this=this
           
        }
        this.getDocList(this.searchInfo);
    },
    mounted () {
         
        console.log('路径',process.env.NODE_ENV);
        this.showEditor = false
        if(this.$store.state.cmsEditor_Index){
            this.editorId = 'cmsEditor' + (this.$store.state.cmsEditor_Index + 1);
        this.$store.state.cmsEditor_Index++
        }else{
            this.$store.state.cmsEditor_Index = 1;
        this.editorId = 'cmsEditor' + 1;
        }
        
    },
     methods: {
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
                        this.guanlian=res.guanlianlist
                        
                        
                        
                    });
            });
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
          dialogCheckChange(selection) {
                this.guanlian=selection;
            
        },
          async getDocList(params) {
            this.loading = true;
            params["foldertype"]='1';
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
         handleEditt(index, row) {
            this.dlogTitle = '关联相关';
            this.folder = '个人收藏夹';
            this.dialogtype='guanlian';
            
            this.optPopup = true;
            this.pageNo=1;
            this.searchInfo["page"] = this.pageNo;
            this.searchInfo["rows"] = this.pageSize;
             this.getDocList(this.searchInfo);
            this.$refs.multipleTable.clearSelection();
        },
        handleChange(value) {
            console.log(value);
            this.form.folderId = value[value.length - 1];
        },
         loadTree() {
        var that = this;
        this.loading = true;
        that.$post("/epf-document/admin/docfolder/getAllFolderTree").then(res => {
          console.log('数返回',res.ztreeJson);
          that.forderdata = res.ztreeJson;
          this.loading = false;
        });
      },
         closearticle(){
             let that = this;
            this.$bus.$emit('closeTabsItem', this.$route.name)
            let routerPath = '/libraryManage'
            let title = '文库管理'
            var tabObj = {title, routerPath}
            this.setTabsList(tabObj)
            this.$router.push('/libraryManage')
            this.$bus.$emit('refreshAssembly')
         },
         onSubmit (){debugger
            let markdown = this.$refs.markdowneditor.d_value;
            console.log("markdown",markdown);
             var data=this.form
             var guanlian=this.guanlian
             var guanliid="";
            if(guanlian.length>0){
              for (let index = 0; index < this.guanlian.length; index++) {
                    guanliid +=  this.guanlian[index].id+",";
                    
                }
            }
            if(!data.pbtime){
                this.$message.warning("请填写发布日期");
                return;
            }
            data["guanliid"]=guanliid;
            data["involvedIndustry"]= data.industry.join(",");
            data["involvedBussyniss"]= data.bussyniss.join(",");
            delete data.publishTime;
             this.$post('/epf-document/docdocumentinfo/savemarkdown',data).then(res => {
                if(res.code != '0'){
                    //失败
                    this.$message.error(res.msg);
                    return
                }
                this.$message.success("保存成功");
                this.$bus.$emit('closeTabsItem', this.$route.name)
                let routerPath = '/libraryManage'
                let title = '文库管理'
                var tabObj = {title, routerPath}
                this.setTabsList(tabObj)
                this.$router.push('/libraryManage')
                this.$bus.$emit('refreshAssembly')
          });
         },
         $imgAdd(pos, $file) {
            // 第一步.将图片上传到服务器.
            var _this=this;
            var formdata = new FormData();
            formdata.append('files', $file);
            _this.img_file[pos] = $file;
            _this.$useAppend("/epf-document/document/upload", formData).then(res => {
                console.log("res",res)
                if (res.state != "SUCCESS") {
                    _this.$message.error(res.msg)
                    return null
                }
                    _this.form.id = res.data[0].id
                    _this.form.name = res.data[0].name
                var localurl=baseUrl.baseURL1 + '/epf-document/document/downloadById?id='+res.data[0].id;
                   // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                _this.$refs.markdowneditor.$img2Url(pos, localurl);

            }).catch(error=>{
                _this.$message.error('文件上传请求失败')
            })


        }
    }
    
};
</script>
<style>
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

</style>