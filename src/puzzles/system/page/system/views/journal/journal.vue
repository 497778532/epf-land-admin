<template>
  <epf-container title='日志管理'>
    <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
      <div class="epf_toolbar">
        <el-row>
          <el-col :span="6" class="term">
            <el-input v-model="searchInfo.filters.username" 
              placeholder="请输入用户名">
            </el-input>
          </el-col>
          <el-col :span="6" class="term">
            <el-input v-model="searchInfo.filters.ip" 
              placeholder="请输入IP">
            </el-input>
          </el-col>
          <el-col :span="6" class="term">
            <el-select v-model="searchInfo.filters.logtype" placeholder="请选择操作/异常">
              <el-option key="1" label="操作" value="0"></el-option>
              <el-option key="2" label="异常" value="1"></el-option>
              <el-option key="3" label="登录" value="2"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6" class="term epf_align_left">
            <button class="epf_btn epf_btn_bg" @click="getsearchLog">查询</button>
            <button class="epf_btn epf_btn_bg" @click="resetsearchLog">重置</button>
            <button class="epf_btn epf_btn_bg" @click="showsinglelog">查看</button>
            <button class="epf_btn epf_btn_def" @click="handleDelete">删除</button>
          </el-col>
        </el-row>
      </div>
      <div class="epf_fr_content" :style="{height:boxHeight - 55 +'px'}">
        <el-table
          ref="multipleTable"
          :data="tableData"
          :height="boxHeight-120"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
          v-loading="loading"
          element-loading-text="数据加载中"
          element-loading-background="rgba(255, 255, 255, 0.9)">
          <el-table-column type="selection" min-width="55"></el-table-column>
          <el-table-column prop="username" label="用户名" min-width="0"></el-table-column>
          <el-table-column label="操作/异常" min-width="70">
            <template slot-scope="props">
              <span>{{ props.row.operation!=null&&props.row.operation.length>70?props.row.operation.substring(0,70):props.row.operation }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="method" label="请求方法/异常类型" min-width="170"></el-table-column>
          <el-table-column  label="请求参数/异常信息" min-width="180">
            <template slot-scope="props">
              <span>{{ props.row.params!=null&&props.row.params.length>200?props.row.params.substring(0,200):props.row.params }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ip" label="IP地址" min-width="80"></el-table-column>
          <el-table-column prop="time" label="时长(毫秒)" min-width="45"></el-table-column>
          <el-table-column prop="createDate" label="请求时间" min-width="80"></el-table-column>
        </el-table>
        <div class="epf_paging_fixe">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord">
          </el-pagination>
        </div>
      </div>
    </div>

    <el-dialog 
      title="日志信息"
       append-to-body
      :visible.sync="dialogFormVisible">
      <el-form :model="singleLog">
        <el-form-item label='用户名' :label-width="formLabelWidth" prop="username">
          <el-input v-model="singleLog.username" auto-complete="off" :disabled='true'></el-input>
        </el-form-item>
        <el-form-item label='操作' :label-width="formLabelWidth" prop="operation">
          <el-input v-model="singleLog.operation" auto-complete="off" :disabled='true'></el-input>
        </el-form-item>
        <el-form-item label='请求方法' :label-width="formLabelWidth" prop="method">
          <el-input type="textarea" v-model="singleLog.method" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label='请求参数' :label-width="formLabelWidth" prop="params">
          <el-input type="textarea" rows="4" v-model="singleLog.params" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label='IP地址' :label-width="formLabelWidth" prop="ip">
          <el-input v-model="singleLog.ip" auto-complete="off" :disabled='true'></el-input>
        </el-form-item>
        <el-form-item label='时长(毫秒)' :label-width="formLabelWidth" prop="time">
          <el-input v-model="singleLog.time" auto-complete="off" :disabled='true'></el-input>
        </el-form-item>
         <el-form-item label='请求时间' :label-width="formLabelWidth" prop="createDate">
          <el-input v-model="singleLog.createDate" auto-complete="off" :disabled='true'></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </epf-container>
</template>

<script>
export default {
  name: "code",
  data() {
    return {
      boxHeight: 700,
      formLabelWidth:"80px",
      dialogFormVisible: false,
      tableData: [],// 表格数据
      loading:true,
      singleLog:{
        username:''
      },
      selectGroups:[],// 已选中的对象
      pageNo: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: {filters:{}},
    }
  },
  created() {
    this.boxHeight = window.innerHeight - 250
    this.searchInfo['page'] = this.pageNo
    this.searchInfo['rows'] = this.pageSize
    this.getlogList(this.searchInfo);
  },
  methods: {
    // 查询
    getsearchLog(){
      console.log(this.searchInfo);
        this.searchInfo['page'] = 1;
        this.searchInfo['rows'] = this.pageSize;
        this.getlogList(this.searchInfo);
      },
      // 重置
      resetsearchLog(){

        this.searchInfo['page'] = 1;
        this.searchInfo['rows'] = this.pageSize;
        this.searchInfo['filters']={};
        this.getlogList(this.searchInfo);
      },
    handleSelectionChange (val) {
      this.selectGroups = val;
    },
      // 查看
      showsinglelog(){
        this.savetitle="账号信息";
        this.singleLog=[];
        if(this.selectGroups.length != 1){
            this.$message.warning('请选择一条数据！')
            return
        }
        let id = "";
        id = this.selectGroups[0].id
        this.queryloginfo(id)

      this.dialogFormVisible = true;

      },
      //var url = '/api/epf-monitor/log/getLog'
      // 查看数据回显
      queryloginfo (id) {
      let that = this
      var url = this.$API.EPF_ADMIN.LOG
      var params={'id':id}
      this.$get(url,{params: params}).then(res => {
          that.singleLog = res.log
        })
        .catch(res => {
          that.$message.warning(res.msg)
        })
    },
    async getlogList(params) {
      this.loading = true
      this.$get(this.$API.EPF_ADMIN.GET_LOG_JSON,{params:params})
      .then(res => {
        if(res.code != '0'){
          this.$message.error(res.msg);//失败
          return;
        }
        this.pageNo = res.pager.pageNo;
        this.pageSize = res.pager.pageSize;
        this.totalPage = res.pager.totalPage;
        this.totalRecord = res.pager.totalRecord;
        this.tableData=res.pager.results;
        this.loading = false
      })
    },
    // 删除
    handleDelete() {
        let that = this

      let ids ='';
      if(that.selectGroups.length < 1){
        that.$message.warning('请选择要删除的数据！')
        return
      }
        for(var i = 0; i < this.selectGroups.length; i++){
          ids += this.selectGroups[i].id+","

      }
      that.$confirm("确认要删除该条信息吗?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning",
        center: true
      }).then(() => {
            that.$post(
               // '/api/epf-monitor/log/deleteLog'
                $API.EPF_ADMIN.DELETE_LOG
                ,{id:ids}).then(res => {
              console.log(res)
                if(res.code != 0){
                    that.$message({
                      type: "faill",
                      message: "删除失败!"
                    });
                   return;
                }
                that.$message({
                    type: "success",
                    message: "删除成功!"
                });
                that.getlogList(this.searchInfo);

            })
        }).catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      //每页条数改变时触发
      this.pageNo = 1;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = val;
      this.getlogList(this.searchInfo);
    },
    handleCurrentChange(val) {
      //获取当前页
      this.searchInfo["page"] = val;
      this.searchInfo["rows"] = this.pageSize;
     this.getlogList(this.searchInfo);
    },
  }
}
</script>
<style lang="less" scoped>
.term{
 padding: 0 20px;
}
</style>
