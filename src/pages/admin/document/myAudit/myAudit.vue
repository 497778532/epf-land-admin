<template>
  <div class="page-body" id="knowledge" style="background:#F7F7F7">
    <div class="filter_wrap">
      <el-container style="height:auto;padding-top:10px;">
        <el-main style="margin-right:15px;" >
          <el-tabs>
            <div class="switchHeight_box">
              <el-row :gutter="2">
                  <el-col :span="22" style="padding-left: 2%;padding-top: 5px;">
                    <span style="font-size: 28px;font-weight: bold;">公共文档审核</span>  
                  </el-col>
                  <el-col :span="2" class="search" style="width:6.33333%;">
                    <el-button 
                      icon="el-icon-tickets" 
                      circle 
                      style="border: 0px;border-radius: inherit;" 
                      @click="uploadRecord">审核记录
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
                <el-table-column prop="name" label="文件名称"  min-width="230" > 
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

                <el-table-column prop="folderName" label="文档分类" min-width="100">
                  <template slot-scope="scope">
                    {{scope.row.folderName}}
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
                <el-table-column prop="publishTime"  label="上传时间" min-width="130">
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
                <el-table-column prop="createName"  label="上传人" min-width="130">
                  <template slot-scope="scope">
                    {{scope.row.createName}}
                  </template>
                </el-table-column>
                <el-table-column prop="docNo" label="操作" min-width="70">
                  <template slot-scope="scope">
                    <div class="cell_click" @click="examine(scope.$index, scope.row)">
                      <span style="color:#4E88FE">审核</span>
                    </div> 
                  </template>
                </el-table-column>
              </el-table>
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

      </el-container>
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
export default {
  name: "knowledge",

  data() {
    return {
        tablelist:true,
        totlecorde:0,
        isIndeterminate: true,
        folderId: "",
        docInfoList: [],
        loading: true,
        menuListHeight: 100,
        selectGroups: [],
        pageNo: 1,
        pageSize: 10,
        totalPage: 1,
        totalRecord: 1,
        searchInfo: { usetype: "" },
        folderType:'1',//文件类型：1文件夹，知识分类；2收藏夹；3工作文件夹分类,文档分类
    };
  },
  created() {
    this.menuListHeight = window.innerHeight - 245;
    this.searchInfo["page"] = this.pageNo;
    this.searchInfo["rows"] = this.pageSize;
    this.searchInfo["load"]=true
    this.getDocList(this.searchInfo);
  },
  methods: {
    ...mapActions(["setTabsList"]),
    changeorders(event){console.log(event);
        var _this=this;
         this.pageNo-1
        this.searchInfo["page"] = this.pageNo;
        this.searchInfo["rows"] = this.pageSize;
        this.searchInfo["sort"] = event.prop
        this.searchInfo["order"] = event.order
        this.getDocList(this.searchInfo);
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
    //审核记录
    uploadRecord(){
      let that = this;
      let title = '公共文档审核记录'
      let routerPath = '/workAuditConsult?folderType=1'
      let tabObj = {title, routerPath}
      that.setTabsList(tabObj)
      that.$router.push({path: routerPath,query:{folderType : that.folderType}})
    },
    //审核跳转
    examine(index,row){
      let that = this;
      let title = '文档审核'
      let routerPath = '/documentBrowse'
      let tabObj = {title, routerPath}
      that.setTabsList(tabObj)
      that.$router.push({path: routerPath,query:{row:row,folderType : '1'}})
      
    },
    handleSelectionChange(val) {
      this.selectGroups = val;
    },
    async getDocList(params) {
      this.loading = true;
      this.$get("/epf-document/docdocumentinfo/getMyExaminePlanningDocs", params).then(res => {
        console.log("871===========", res);
        if (res.code != "0") {
          this.$message.error(res.msg); //失败
          this.loading = false;
          return;
        }
        if(params.load){
          this.totlecorde=res.pager.totalRecord;
          this.searchInfo["load"]="";
        };
        this.pageNo = res.pager.pageNo;
        this.pageSize = res.pager.pageSize;
        this.totalPage = res.pager.totalPage;
        this.totalRecord = res.pager.totalRecord;
        this.docInfoList = res.pager.results;
        this.isIndeterminate= true;

        this.loading = false;
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
        this.pageNo = val;
        this.searchInfo["page"] = this.pageNo;
        this.searchInfo["rows"] = this.pageSize;
        this.searchInfo["folderId"]=this.folderId
        this.getDocList(this.searchInfo);
      },


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


.filter_title{
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding-right: 10px;
  text-align: right;
  line-height: 34px;
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
 .cell .cell_click{
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
.search .el-button:focus,.search .el-button:hover {
    color: #409EFF;
    border-color: transparent;
    background-color: transparent;
}
.usemngtable td {
  border: 1px solid #b6b6b6;
  line-height: 28px;
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
</style>
