<template>
    <div class="page-body" id="documentBrowse">
        <div class="filter_wrap"
            :style="{'paddingTop':'10px','background': 'rgba(0, 0, 0, 0.1)'}">
            <el-row 
                :gutter="20" 
                :style="{'height':menuListHeight+'px'}" class="documentBrowse"
                >
                <el-col :span="17" class="document">
                    
                        <iframe  :style="{'height':menuListHeight+'px','width': '100%'}" id="ifra"  :src="iframeSrc" frameborder="0"></iframe>
                    <!-- </div> -->
                </el-col>
                <el-col :span="7" class="list">
                    <div class="grid-content bg-purple" :style="{'height':menuListHeight+'px'}">
                        <el-container :style="{'height':menuListHeight+'px'}">
                            <el-aside  style="background-color: rgba(0, 0, 0, 0.1);width:100%">
                               <el-collapse v-model="activeNames">
                                <el-collapse-item  name="1">
                                    <template slot="title"><i class="el-icon-document-copy"></i>文件参数</template>
                                    <div class="parameter pub">
                                        <el-row>
                                            <el-col style="width:110px;">
                                                <span><i class="el-icon-warning-outline"></i>文件名称</span>
                                            </el-col>
                                            <el-col :span="17" style="text-align: right;">
                                                <span>{{document.name}}</span>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col style="width:110px;">
                                                <span><i class="el-icon-warning-outline"></i> 文档状态</span>
                                            </el-col>
                                            <el-col :span="17" style="text-align: right;">
                                                <span>{{document.versionType}}</span>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col style="width:110px;">
                                                <span><i class="el-icon-s-fold"></i> 文档分类</span>
                                            </el-col>
                                            <el-col :span="17" style="text-align: right;">
                                                <span>{{document.extName}}</span>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col style="width:110px;">
                                                <span><i class="el-icon-office-building"></i> 文档来源</span>
                                            </el-col>
                                            <el-col :span="17" style="text-align: right;">
                                                <span>{{document.source}}</span>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col style="width:110px;">
                                                <span><i class="el-icon-document"></i> 发文字号</span>
                                            </el-col>
                                            <el-col :span="17" style="text-align: right;">
                                                 <span>{{document.issuedNumber}}</span>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col style="width:110px;">
                                                <span><i class="el-icon-date"></i> 发文日期</span>
                                            </el-col>
                                            <el-col :span="17" style="text-align: right;">
                                                <span>{{document.publishTime}}</span>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col style="width:110px;">
                                                <span><i class="el-icon-notebook-2"></i> 编目编号</span>
                                            </el-col>
                                            <el-col :span="17" style="text-align: right;">
                                                <span>{{document.fileCataloging}}</span>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col style="width:110px;">
                                                <span><i class="el-icon-connection"></i> 文档大小</span>
                                            </el-col>
                                            <el-col :span="17" style="text-align: right;">
                                                <span>{{document.docSize}}</span>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col style="width:110px;">
                                                <span><i class="el-icon-view"></i> 浏览次数</span>
                                            </el-col>
                                            <el-col :span="17" style="text-align: right;">
                                                <span>{{document.readNumber}}</span>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col style="width:110px;">
                                                <span><i class="el-icon-download"></i> 下载次数</span>
                                            </el-col>
                                            <el-col :span="17" style="text-align: right;">
                                                <span>{{document.downloadNumber}}</span>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col style="width:110px;">
                                                <span><i class="el-icon-tickets"></i> 文档描述</span>
                                            </el-col>
                                            <el-col :span="17" style="text-align: right;">
                                                <span>{{document.remark}}</span>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    
                                </el-collapse-item>                               
                                <div v-if="folderType">
                                    <el-collapse-item  name="2" class="comment">
                                        <template slot="title"><el-button type="primary"  @click="dialogFormroleVisible = true" style="width: 100%;">审核</el-button></template>                                   
                                    </el-collapse-item>
                                </div>
                                <div v-else>
                                    <el-collapse-item  name="2">
                                        <template slot="title"><i class="el-icon-c-scale-to-original"></i>历史版本</template>
                                        <div class="history pub">
                                            <el-row>
                                                <el-col style="min-width:130px;">
                                                    <span class="draft">
                                                        <span>审阅稿</span>
                                                    <span><i class="el-icon-date"></i>2019年5月</span>
                                                </span>
                                                </el-col>
                                                <el-col :span="17" style="text-align: right;">
                                                    <span>V1.1</span>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col style="min-width:130px;">
                                                    <span class="draft">
                                                        <span>意见征询稿</span>
                                                    <span><i class="el-icon-date"></i>2019年5月</span>
                                                </span>
                                                </el-col>
                                                <el-col :span="17" style="text-align: right;">
                                                    <span>V1.1</span>
                                                </el-col>
                                            </el-row>

                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item  name="3" class="comment">
                                        <template slot="title"><el-button type="success" icon="el-icon-setting">我要评论</el-button></template>
                                        <el-input
                                            type="textarea"
                                            placeholder="请输入评论内容"
                                            v-model="textarea"
                                            maxlength="200"
                                            show-word-limit
                                            resize='none'
                                            :autosize="{ minRows: 4, maxRows: 30}"
                                        ></el-input>
                                    </el-collapse-item> 
                                </div>
                               </el-collapse>
                            </el-aside>
                        </el-container>
                    </div>
                </el-col>
            </el-row>
            <!-- 遮罩 -->
            <div class="mask">
                <div>
                    <i class="el-icon-loading"></i>
                    <p >数据加载中...</p>
                </div>
            </div>

        </div>
        <!-- 弹窗 -->
        <div>
            <el-dialog title="收藏" :visible.sync="dialogFormroleVisible" class="collection">
                <div style="text-align: center;font-weight: bold">温馨提示：<span>审核通过即发布文档，请确保文档符合发布要求</span></div>
                <div>
                    <p style="padding: 20px 0px 10px;">审核意见</p>
                    <el-input
                        type="textarea"
                        placeholder="请输入审核意见"
                        v-model="textarea1"
                        maxlength="200"
                        show-word-limit
                        resize='none'
                        :autosize="{ minRows: 4, maxRows: 30}"
                    ></el-input>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="auditPass">审核通过</el-button>
                    <el-button  type="warning" @click="auditFailed">审核不通过</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import selectInput from '@/components/common/form/selectInpt';
import "mavon-editor/dist/css/index.css";
import { mapActions, mapState } from "vuex";
import Bus from '../../../../utils/bus';
export default {
    name: "documentBrowse",
    data(){
        return{
            menuListHeight: 100,
            document:{
                versionType:'',
                docSize:'',
            },
            row:{},
            activeNames:['1'],
            textarea: '',
            textarea1: '',
            iframeSrc:"",
            dialogFormroleVisible: false,
            folderType:'',
        }
    },
    created(){
        this.menuListHeight = window.innerHeight - 245;
        //console.log("row",this.row);
        //this.addview(this.$route.query.row.id);
        this.document.id= this.$route.query.row.id;
        this.document.name= this.$route.query.row.name;
        this.document.versionType = this.$route.query.row.versionType;
        this.document.version = this.$route.query.row.version;
        this.document.source = this.$route.query.row.source;
        this.document.extName=this.$route.query.row.extName;
        this.document.docSize =  this.$route.query.row.docSize;
        this.document.issuedNumber = this.$route.query.row.issuedNumber;
        this.document.fileCataloging = this.$route.query.row.fileCataloging;
        this.document.readNumber = this.$route.query.row.readNumber;
        this.document.publishTime = this.$route.query.row.publishTime;
        this.document.remark=this.$route.query.row.remark;
        this.document.downloadNumber=this.$route.query.row.downloadNumber;
        this.folderType = this.$route.query.folderType;
        if(this.document.name.indexOf(".html")!=-1||this.document.name.indexOf(".md")!=-1){
            this.iframeSrc="/api/epf-document/document/showContentById?id="+this.$route.query.row.id
        }else if(this.document.extName=='txt'||this.document.extName=='TXT'){
             this.iframeSrc="/api/epf-document/document/showFtpFileByid?id="+this.$route.query.row.id
        }else{
            this.iframeSrc='/api/epf-document/onlinePreview?filename='+this.$route.query.row.id+"."+this.document.extName;
        }
       
    },
    watch :{
    　'$route': function (to, from) {
        this.menuListHeight = window.innerHeight - 245;
        //console.log("row1",this.row);
        //this.addview(this.$route.query.row.id);
        this.folderType = this.$route.query.folderType;
        if(this.$route.query.row && this.$route.query.row!=undefined){
            this.document.id= this.$route.query.row.id;
            this.document.name= this.$route.query.row.name;
            this.document.versionType = this.$route.query.row.versionType;
            this.document.version = this.$route.query.row.version;
            this.document.source = this.$route.query.row.source;
            this.document.extName=this.$route.query.row.extName;
            this.document.docSize =  this.$route.query.row.docSize;
            this.document.issuedNumber = this.$route.query.row.issuedNumber;
            this.document.fileCataloging = this.$route.query.row.fileCataloging;
            this.document.readNumber = this.$route.query.row.readNumber;
            this.document.publishTime = this.$route.query.row.publishTime;
            this.document.remark=this.$route.query.row.remark;
            this.document.downloadNumber=this.$route.query.row.downloadNumber;
            
            if(this.document.name.indexOf(".html")!=-1||this.document.name.indexOf(".md")!=-1){
                this.iframeSrc="/api/epf-document/document/showContentById?id="+this.$route.query.row.id
            }else if(this.document.extName=='txt'||this.document.extName=='TXT'){
                this.iframeSrc="/api/epf-document/document/showFtpFileByid?id="+this.$route.query.row.id
            }else{
                this.iframeSrc='/api/epf-document/onlinePreview?filename='+this.$route.query.row.id+"."+this.document.extName;
            }
        }

        
    }
    },
    mounted () {
        const mask = document.querySelector('.mask')
        const iframe = document.querySelector('#ifra')
        mask.style.display = 'block';
        // 处理兼容行问题
        if (iframe.attachEvent) {
            iframe.attachEvent('onload', function () {
                // iframe加载完毕以后执行操作
                console.log('iframe已加载完毕')
                mask.style.display = 'none';
            })
        } else {
            iframe.onload = function () {
                // iframe加载完毕以后执行操作
                console.log('iframe1已加载完毕')
                mask.style.display = 'none';
            }
        }
    },
    methods:{
        ...mapActions(["setTabsList"]),
        
         addview(id){
            // var _this=this
            // _this.$get("/epf-document/docdocumentinfo/addviews", {id:id,type:"read"}).then(res => {//浏览量read下载量down
              
            // });
        },
        auditPass(){    
            let paramsData = { id: this.document.id, examineState: '2',examineComments:this.textarea1 };
            if(this.folderType == '1'){
                this.$post("/epf-document/docdocumentinfo/examineDocs",paramsData).then(res => {
                    console.log('审核状态=====',res)
                    this.$message({
                        message: '审核通过',
                        type: 'success'
                    });
                    this.dialogFormroleVisible = false 
                    //路由跳转
                    this.$bus.$emit('closeTabsItem', this.$route.name)
                    let routerPath = '/workAuditConsult?folderType=1'
                    let title = '审核记录'
                    var tabObj = {title, routerPath}
                    this.setTabsList(tabObj)
                    this.$router.push('/workAuditConsult?folderType=1') 
                    this.$bus.$emit('refreshAssembly')
                                    
                })    
            }else if(this.folderType == '3'){
                this.$post("/epf-document/docdocumentinfo/examineDocs",paramsData).then(res => {
                    console.log('审核状态=====',res)
                    this.$message({
                        message: '审核通过',
                        type: 'success'
                    });
                    this.dialogFormroleVisible = false 
                    //路由跳转
                    this.$bus.$emit('closeTabsItem', this.$route.name)
                    let routerPath = '/workAuditConsult?folderType=3'
                    let title = '审核记录'
                    var tabObj = {title, routerPath}
                    this.setTabsList(tabObj)
                    this.$router.push('/workAuditConsult?folderType=3') 
                    this.$bus.$emit('refreshAssembly')
                                    
                })  
            }
            
        },
        auditFailed(){
            let paramsData = { id: this.document.id, examineState: '1',examineComments:this.textarea1 };
            if(this.folderType == '1'){
                this.$post("/epf-document/docdocumentinfo/examineDocs",paramsData).then(res => {
                    console.log('审核状态11=====',res)
                    this.$message('审核不通过');
                    this.dialogFormroleVisible = false  
                    
                    //路由跳转
                    this.$bus.$emit('closeTabsItem', this.$route.name)
                    let routerPath = '/workAuditConsult?folderType=1'
                    let title = '审核记录'
                    var tabObj = {title, routerPath}
                    this.setTabsList(tabObj)
                    this.$router.push('/workAuditConsult?folderType=1') 
                    this.$bus.$emit('refreshAssembly')
                })
            }else if(this.folderType == '3'){
                this.$post("/epf-document/docdocumentinfo/examineDocs",paramsData).then(res => {
                console.log('审核状态11=====',res)
                this.$message('审核不通过');
                this.dialogFormroleVisible = false  
                
                //路由跳转
                this.$bus.$emit('closeTabsItem', this.$route.name)
                let routerPath = '/workAuditConsult?folderType=3'
                let title = '审核记录'
                var tabObj = {title, routerPath}
                this.setTabsList(tabObj)
                this.$router.push('/workAuditConsult?folderType=3') 
                this.$bus.$emit('refreshAssembly')
            })

            }
            
        }

    }
}
</script>
<style scoped>
.el-collapse-item__header{
    background: rgba(189, 213, 219, 0.89);
    font-size: 18px;
    padding-left:10px;
}
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
<style scoped>
    .filter_wrap .el-input--small .el-input__inner {
        height: 34px;
    }
    /* .filter_wrap .el-row {
        margin-bottom: 10px;
    } */
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
    .filter_wrap .el-input__prefix,.el-input__suffix {
        width: 25px;
        font-size: 16px;
        right: 8px;
    }
    /* .el-row {
        margin-bottom: 20px;
    } */
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #fff;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .documentBrowse{
        position: relative;
    }
    .list .el-submenu__title {
        background-color: #ecf5ff;
        font-size: 18px;
    }
    .documentBrowse .list{
        position: absolute;
        right: 0;
    }
    .pub>div{
        font-size: 16px;
        padding: 3% 5px;
        border-bottom: 1px solid rgb(224, 224, 224);
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
    }
    
    .pub{
        border-left: solid 1px #e6e6e6 !important;
    }
    .history .draft{
        display: flex;
        flex-direction: column;
        justify-content: space-between;

    }
    .comment .el-submenu__title{
        background-color: transparent;
        padding: 0 !important;
    }
    .comment .el-button--success{
        width: 100%;
    }
    .comment .el-icon-arrow-down:before {
        content: "" !important;
    }
    .list .el-submenu{
        margin-bottom: 15px;

    }
    .list .el-menu{
        background: transparent !important;
    }
    .mask{
        display: none;
        position: absolute;
        z-index: 2000;
        background-color: rgba(255,255,255,.9);
        margin: 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        -webkit-transition: opacity .3s;
        transition: opacity .3s;
    }
    .mask div{
        top: 50%;
        margin-top: -21px;
        width: 100%;
        text-align: center;
        position: absolute;
        
    }
    .mask i{
        font-size: 20px;
        color: #409EFF;
    }
    .mask p{
        color: #409EFF;
        margin: 3px 0;
        font-size: 14px;
    }
    .collection .el-dialog{
        width: 30%;
    }
    .el-dialog__body{
        border-top: 1px solid #F2F3F4;
    }

</style>