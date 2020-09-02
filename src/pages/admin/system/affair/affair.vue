<template>
    <div id="affair" style="padding:10px;">
        <el-container>
            <el-main style="">
                <el-container>
                <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}" class="m_title">
                        <div style="float:left">事务监控</div>
                        <!-- <span v-for="(button ,index)  in buttons" :key="index" >
                        <el-button v-if="button.resourceId=='tenant_add'" style="float:right;margin-top:4px;" @click="addBanner" size="mini" icon="el-icon-plus" >添加</el-button>
                        </span> -->
                </el-header>
                <el-main  :style="{'height':menuAdvertListHeight + 'px','paddingTop':'10px','borderLeft':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)'}">
                    <template>
                        <el-table
                            :data="advertDataList"
                            border
                            style="width: 100%">
                            <el-table-column
                            fixed  prop="name"
                            label="属性名称"
                            min-width="100">
                            </el-table-column>
                            <el-table-column
                            prop="contacter"
                            label="属性值"
                            min-width="100">
                            </el-table-column>
                        </el-table>
                    </template>

                </el-main>
                </el-container>
                <div style="text-align:right;margin:8px 0px;">
                    <el-pagination
                        background
                        layout="prev, pager, next,sizes,jumper"
                        :page-sizes="[5,10, 15, 20]"
                        :total="totalRecord"
                        :page-size="pageSize"
                        :current-page="pageNo"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import qs from 'qs'
import Axios from 'axios'

export default {
    name:'affair',
    headers:{},
    data(){
        return{
            advertDataList:[],
            advertData:{
            },
            pageNo:1,
            pageSize:5,
            totalPage:1,
            totalRecord:1,
            searchAdvert:{},
            tableData1: [],
            dialogVisible: false,
            disabled:false,
            edit:false,
            //按钮组、主题
            buttons:[],
            theme_BackgroundColor:'',
            theme_TextColor:'',
        }
    },
    created(){
        this.menuAdvertListHeight = window.innerHeight - 270;
        this.searchAdvert['page'] = this.pageNo
        this.searchAdvert['rows'] = this.pageSize
        this.buttons=JSON.parse(localStorage.getItem("tenantryManage"));
        this.theme_BackgroundColor=localStorage.getItem("theme_BackgroundColor");
        this.theme_TextColor=localStorage.getItem("theme_TextColor");
        this.headers = {'token':sessionStorage.getItem('token') }

        this.getTenantryManage(this.searchAdvert)
    },
    mounted() {
        this.$bus.$on('themChange',val => {
            this.theme_BackgroundColor = val.menuBackgroundColor
            this.theme_TextColor = val.textColor
        })
    },
    methods:{
        handleChange(value) {
            console.log(value);
        },
      shwoDialog(data){
        this.edit=true;
        this.advertData=data
        this.dialogVisible=true
        // this.imageUrl =this.getImgUrl(this.advertData.img);
      },
      getTenantryManage(params){
         this.$post('/epf-admin/admin/Tenantry/getTenantryJson',params).then(res => {
            if(res.code != '0'){
                this.$message.error(res.msg);//失败
                return;
            }
            this.pageNo = res.pager.pageNo;
            this.pageSize = res.pager.pageSize;
            this.totalPage = res.pager.totalPage;
            this.totalRecord = res.pager.totalRecord;
            this.advertDataList = res.pager.results;
        }).catch(error=>{})
      },
      deleteBanner(data){
        var that=this
        that.$confirm("确认要删除该条信息吗?", "提示", {
            cancelButtonText: "取消",
            confirmButtonText: "确定",
            type: "warning",
            center: true
        }).then(() => {
                that.$post('/epf-admin/admin/Tenantry/delete',{id:data.id}).then(res => {
                    if(res.code != '0'){
                        //失败
                        that.$message.error(res.msg);
                        return
                    }
                    that.$message.success("删除成功!");
                    that.getTenantryManage(that.searchAdvert)
                });
        }).catch(() => {});
      },
      cancel(){
        this.dialogVisible = false
        this.getTenantryManage(this.searchAdvert)
      },
      saveBanner(formName){
          let that=this;
          that.$refs[formName].validate((valid) =>{
              if(valid){
                    that.disabled = true
                    that.$post('/epf-admin/admin/Tenantry/add',that.advertData).then(res => {
                        if(res.code != '0'){
                            that.$message.error(res.msg) //失败
                            that.disabled = false
                            that.dialogVisible = false
                            return
                        }
                        that.disabled = false
                        that.dialogVisible = false
                        that.$message.success("保存成功！")
                        that.getTenantryManage(that.searchAdvert)
                    })
              }else{
                    this.$message.error('请确保信息填写正确')
                    return false
              }
          })
      },
      addBanner(){//添加新闻
            this.edit=false;
            this.advertData={}
            this.dialogVisible=true
      },

      handleSizeChange(val){
        //每页条数改变时触发
        this.pageNo = 1;
        this.searchAdvert['page'] = this.pageNo;
        this.searchAdvert['rows'] = val;
        this.getTenantryManage(this.searchAdvert);
       },
        handleCurrentChange(val){
        //获取当前页
        this.searchAdvert['page'] = val;
        this.searchAdvert['rows'] = this.pageSize;
        this.getTenantryManage(this.searchAdvert);
       },

    }
}
</script>

<style scoped>
.m_title{
    height: 40px !important;
    line-height: 40px !important;
    padding-left: 30px;
    background: rgb(50, 58, 64);
    color: #fff;
    font-size: 16px;
}
.el-tree>div{
    margin: 5px 0;
}
.iconList{
    height: 400px;
    background: rgb(255, 213, 213);
    overflow-y: auto;
}
.menuManage_List .el-tree-node__content{
    margin-bottom: 5px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9 ;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

input[type=file] {
    display: none !important;
}

</style>


