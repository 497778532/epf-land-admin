<template>
  <div class="page-body" id="userManage">
    <div class="filter_wrap" >
        <div class="switchHeight_box">
        <el-row>
          <el-col :span="2">
            <span class="filter_title">用户名:</span>
          </el-col>
          <el-col :span="3">
            <el-input size="small" v-model="searchInfo.filters.username" placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="1">
            <span class="filter_title">IP:</span>
          </el-col>
          <el-col :span="3">
            <el-input size="small" v-model="searchInfo.filters.ip" placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="2">
            <span class="filter_title">操作/异常:</span>
          </el-col>
          <el-col :span="2">
            <el-select size="small" v-model="searchInfo.filters.logtype" placeholder="请选择">
                <el-option  key="1"  label="操作" value="0"> </el-option>
                <el-option  key="2"  label="异常" value="1"> </el-option>
                <el-option  key="3"  label="登录" value="2"> </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <div class="button_bg" @click="getsearchLog">查询</div>
          </el-col>
            <el-col :span="2">
            <div class="button_bg" @click="resetsearchLog">重置</div>
          </el-col>
          <el-col :span="2">
            <div class="button_bg" @click="showsinglelog">查看</div>
          </el-col>
          <el-col :span="2">
            <div class="button_bg" @click="handleDelete">删除</div>
          </el-col>
        </el-row>
      </div>
      <el-tabs style="margin-top:15px;">

        <el-table
          ref="multipleTable"
          :data="tableData"
          :height="menuListHeight"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
          v-loading="loading"
          element-loading-text="数据加载中"
          element-loading-background="rgba(255, 255, 255, 0.9)"
        >
          <el-table-column  type="selection" min-width="55"></el-table-column>
          <el-table-column  prop="username" label="用户名" min-width="0"></el-table-column>
          <el-table-column  label="操作/异常" min-width="70">
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
        <div style="text-align:right;margin:22px 0px;">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
          ></el-pagination>
        </div>
      </el-tabs>
    </div>
    <!--   弹窗 -->
    <div>
       <el-dialog title="日志信息" :visible.sync="dialogFormVisible">
        <el-form :model="singleLog">
            <el-form-item label='用户名' :label-width="formLabelWidth" prop="username">
              <el-input v-model="singleLog.username" auto-complete="off" :disabled='true'></el-input>
            </el-form-item>
            <el-form-item label='操作' :label-width="formLabelWidth" prop="operation">
              <el-input v-model="singleLog.operation" auto-complete="off" :disabled='true'></el-input>
            </el-form-item>
            <el-form-item label='请求方法' :label-width="formLabelWidth" prop="method">
              <el-input type="textarea" v-model="singleLog.method" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label='请求参数' :label-width="formLabelWidth" prop="params">
              <el-input type="textarea" rows="4" v-model="singleLog.params" auto-complete="off" ></el-input>
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

    </div>



  </div>
</template>
<script>
import qs from 'qs'
import transferTable from "@/components/transferTable";
import Axios from "axios";
import { constants } from 'zlib';

export default {
  name:'userManage',
  components: {
    transferTable
  },

  data() {
    return {
      menuListHeight:100,
      formLabelWidth:"80px",
      dialogFormVisible: false,
      rolelist:[],
      selectrows:[],
      tableData: [],
      multipleSelection: [],
      handleDataError: [],
      loading:true,
      handleData: "",
      singleLog:Object,
      selectGroups:[],
      dialogForm: false,
      pageNo: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: {filters:{}},

    };
  },
  created() {
    this.menuListHeight = window.innerHeight - 370;
      this.searchInfo['page'] = this.pageNo
      this.searchInfo['rows'] = this.pageSize

     this.getlogList(this.searchInfo);
  },
  methods: {
    getsearchLog(){
      console.log(this.searchInfo);
        this.searchInfo['page'] = 1;
        this.searchInfo['rows'] = this.pageSize;
        this.getlogList(this.searchInfo);
      },
      resetsearchLog(){

        this.searchInfo['page'] = 1;
        this.searchInfo['rows'] = this.pageSize;
        this.searchInfo['filters']={};
        this.getlogList(this.searchInfo);
      },
    handleSelectionChange (val) {
      this.selectGroups = val;
    },

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
      queryloginfo (id) {
      let that = this
      var url = '/api/epf-admin/log/getLog'
      var params={'id':id}
      Axios
        .get(url, {params: params})
        .then(res => {
          that.singleLog = res.log
          console.log(res);
        })
        .catch(res => {
          that.$message.warning(res.msg)
        })
    },
    async getlogList(params) {
      this.loading = true
     this.$http.get(
        // '/api/epf-monitor/log/getLogJson'
        '/api/epf-admin/log/getLogJson'
         ,{params:params}).then(res => {
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
    AddFlowpatreason() {
        this.savetitle="新增账号";
        this.add=false;
        this.edit=false;
        this.singleLog=[];
        this.imageUrl=""
        this.slectdefall=[]
      this.dialogFormVisible = true;
    },
     editFlowpatreason() {
         this.savetitle="修改账号";
         this.add=true;
         this.edit=false
        this.singleLog=[];
        if(this.selectGroups.length != 1){
            this.$message.warning('请选择一条数据！')
            return
        }else{
            let id = "";


            id = this.selectGroups[0].id

            this.showsinglelog(id)
        }
      this.dialogFormVisible = true;
    },
    viewPublicityDetails(item) {
      this.$router.push({ path: "/publicityDetails", query: { landNo: item } });
    },
    handlePublicityRelease(item) {
      this.$router.push({ path: "/publicityRelease", query: { landNo: item } });
    },
    handleResult(item) {
      this.$router.push({
        path: "/landmarkInfoDealresult",
        query: { landNo: item }
      });
    },
    handleAdd() {
      this.$router.push("/landmarkInfoAdd");
    },
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

            that.$http.post(
               // '/api/epf-monitor/log/deleteLog'
                '/api/epf-admin/log/deleteLog'
                ,qs.stringify({id:ids})).then(res => {
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
};
</script>
<style scoped>

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
.oper {
  float: right;
  font-weight: normal;
}
.oper span {
  display: inline-block;
  width: 80px;
  height: 32px;

  border-radius: 2px;
  margin-right: 10px;
  text-align: center;
  line-height: 36px;
  font-size: 14px;
  cursor: pointer;
  border: solid 1px #d3d4d6;
  color: #606266;
  background-color: #dbf0ec;
}
.oper span:nth-child(4) {
  color: #fff;
  background-color: #ffa000;
}



.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding-right: 10px;
  text-align: right;
  line-height: 34px;
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

.el-table__body tr td:nth-child(2) .cell {
  color: rgb(70, 113, 213);
}
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
.usemngtable{  width: 100%;}
.usemngtable td{

  border:1px solid #b6b6b6;
  line-height:28px;

}
</style>
