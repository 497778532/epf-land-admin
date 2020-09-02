<template>
  <epf-container title='鉴权服务管理'>
    <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
      <div class="epf_toolbar">
        <!-- <span v-for="(button ,index)  in buttons" :key="index" >
        <el-button v-if="button.resourceId=='micro_add'" style="float:right;margin-top:4px;" @click="addBanner" size="mini" icon="el-icon-plus" >添加</el-button>
        </span> -->
        <button class="epf_btn epf_btn_bg" @click="addBanner">添 加</button>
      </div>
      <div class="epf_fr_content" :style="{height:boxHeight - 55 +'px'}">
        <el-table
          :data="advertDataList"
          border
          v-loading="loading"
          element-loading-text="数据加载中"
          element-loading-background="rgba(255, 255, 255,0.95)"
          style="width: 100%">
          <el-table-column
          fixed
          prop="name"
          label="模块名称"
          width="400">
          </el-table-column>
          <el-table-column
          prop="code"
          label="模块代码"
          width="200">
          </el-table-column>
          <el-table-column
          prop="secert"
          label="秘钥"
          width="200">
          </el-table-column>

          <el-table-column
          prop="createTime"
          label="创建时间"
          width="180">
          </el-table-column>
          <el-table-column
          prop="updateTime"
          label="更新时间"
          width="180">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            >
            <template slot-scope="scope">
                <span v-for="(button ,index)  in buttons" :key="index">
                <el-button v-if="button.resourceId=='micro_viewset'" type="text" size="small" @click="shwoDialog2(scope.row)">访问设置</el-button>
                <el-button v-if="button.resourceId=='micro_edit'" type="text" size="small" @click="shwoDialog(scope.row)">编辑</el-button>
                <el-button v-if="button.resourceId=='micro_delete'" type="text" size="small" @click="deleteBanner(scope.row)">删除</el-button>
                </span>
            </template>
          </el-table-column>
        </el-table>
        <div class="epf_paging_fixe">
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
      </div>
    </div>
    <el-dialog title="编辑" append-to-body :visible.sync="dialogVisible">
            <el-form :model="advertData" label-width="80px"  >

                <el-form-item label="模块名称
                " style="margin-top:20px;">
                    <el-input v-model="advertData.name"></el-input>
                </el-form-item>
                 <el-form-item label="模块代码">
                    <el-input v-model="advertData.code"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="saveBanner">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="设置" append-to-body :visible.sync="dialogVisible2">
            <el-form :model="advertData2" label-width="80px"  >
              <el-checkbox v-for="mpb in advertDataList2" name="ids" :key="mpb.id" v-model="mpb.hasAuth">{{mpb.name}}</el-checkbox>
           </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2=false">取 消</el-button>
                <el-button type="primary" @click="saveBanner2">确 定</el-button>
            </div>
        </el-dialog>
  </epf-container>
</template>

<script>
export default {
  name: "serve",
  data() {
    return {
      boxHeight: 700,
      advertDataList:[],
      loading:true,
      advertDataList2:[],
      advertData:{},
      advertData2:{},
      pageNo:1,
      pageSize:5,
      totalPage:1,
      totalRecord:1,
      searchAdvert:{},
      tableData1: [],
      dialogVisible: false,
      dialogVisible2: false,
      imageUrl: '',
      nowId: 0,
    }
  },
  created() {
    this.boxHeight = window.innerHeight - 250
    this.searchAdvert['page'] = this.pageNo
    this.searchAdvert['rows'] = this.pageSize
    this.getAdvertManage(this.searchAdvert)
    this.headers = {'token':sessionStorage.getItem('token') }
  },
  methods: {
      // 编辑
      shwoDialog(data){
        this.advertData=data
        this.dialogVisible=true
        this.imageUrl =this.getImgUrl(this.advertData.img);
      },
      // 访问设置
      shwoDialog2(data){
      	this.getCallInfoById(data);
        this.dialogVisible2=true;
        this.nowId = data.id;
        //this.imageUrl =this.getImgUrl(this.advertData.img);
      },
      // 访问设置数据
      getCallInfoById(data) {
      	 this.$post('/epf-admin/microService/getCallInfoById',{id:data.id}).then(res => {
            if(res.code != '0'){
                this.$message.error(res.msg);//失败
                return;
            }
            this.advertDataList2 = res.list;
        })
      },
      getAdvertManage(params){
          this.loading = true;
         this.$post('/epf-admin/microService/getAllMicroService',{params:params}).then(res => {
            if(res.code != '0'){
                this.$message.error(res.msg);//失败
                return;
            }
            this.pageNo = res.pager.pageNo;
            this.pageSize = res.pager.pageSize;
            this.totalPage = res.pager.totalPage;
            this.totalRecord = res.pager.totalRecord;
            this.loading = false;
            this.advertDataList = res.pager.results;
        })
      },
      // 删除
      deleteBanner(data){
          var that =this;
          that.$confirm("确认要删除信息吗?", "提示", {
            cancelButtonText: "取消",
            confirmButtonText: "确定",
            type: "warning",
            center: true
        }).then(() => {
            this.$post('/epf-admin/microService/deleteInfo',{id:data.id}).then(res => {
                if(res.code != '0'){
                    //失败
                    this.$message.error(res.msg);
                    return
                }
                this.$message.success("删除成功!");
                this.getAdvertManage(this.searchAdvert);
          });
        }).catch(() => {
          that.$message({type: "info", message: "已取消删除"});
        });

      },
      // 取消
      cancel(){
        this.dialogVisible = false
        this.getAdvertManage(this.searchAdvert);
      },
      // 模块名称确定
      saveBanner(){
          this.$post('/epf-admin/microService/modifyInfo?token=' + sessionStorage.getItem('token'),this.advertData).then(res => {
                if(res.code != '0'){
                    this.$message.error(res.msg);//失败
                    return
                }
                this.dialogVisible = false
                this.$message.success("保存成功!");
                this.getAdvertManage(this.searchAdvert);
          });
      },
      // 设置确定
      saveBanner2(){

          var selectedIds = [];
          for(var int = 0; int < this.advertDataList2.length; int++) {
              if(this.advertDataList2[int].hasAuth) {
                  selectedIds.push(this.advertDataList2[int].id);
              }
          }
          this.$post('/epf-admin/microService/updateRela?token=' + sessionStorage.getItem('token')+'&id='+this.nowId+'&ids='+selectedIds
        ,this.advertData2).then(res => {
                if(res.code != '0'){
                    this.$message.error(res.msg);//失败
                    return
                }
                this.dialogVisible2 = false
                this.$message.success("设置成功!");
                this.getAdvertManage(this.searchAdvert);
          });
      },
      // 添加
      addBanner(){//添加新闻
            this.advertData={id:'',name:'',url:'',remark:''}
            this.imageUrl ='';
            this.dialogVisible=true
      },
      handleSizeChange(val){
        //每页条数改变时触发
        this.pageNo = 1;
        this.searchAdvert['page'] = this.pageNo;
        this.searchAdvert['rows'] = val;
        this.getAdvertManage(this.searchAdvert);
       },
        handleCurrentChange(val){
        //获取当前页
        this.searchAdvert['page'] = val;
        this.searchAdvert['rows'] = this.pageSize;
        this.getAdvertManage(this.searchAdvert);
       },
       getImgUrl(id){
            return "/epf-document/document/downloadById?id="+id;
       },
  }
}
</script>
<style lang="less" scoped>

</style>
