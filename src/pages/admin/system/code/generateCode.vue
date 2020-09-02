<template>
  <div class="page-body">
    <div class="filter_wrap">
      <!-- 搜索 -->
      <div class="switchHeight_box">
        
        <el-row :gutter="2">
          <el-col :span="5">
            <el-collapse accordion style="border:1px solid #EBEEF5">
              <el-collapse-item style="padding:0 10px">
                <template slot="title">
                  点我查看-使用须知<i class="header-icon el-icon-info"></i>
                </template>
                <div>1、确保后台代码生成器配置没有问题</div>
                <div>2、需要生成代码的表，表注释以及列注释都存在且不为空</div>
                <div>3、代码生成器路径是否配置正确</div>
                <div>4、当前数据库信息</div>
                <div style="margin-left: 2em">数据源：{{sourceType}}</div>
                <div style="margin-left: 2em">用户名：{{owner}}</div>
              </el-collapse-item>
            </el-collapse>
          </el-col>
          <el-col :span="2" style="line-height:48px">
            <span class="filter_title">表名:</span>
          </el-col>
          <el-col :span="6" style="line-height:48px">
            <el-input class="filterIpt" v-model="filterData.tablename" size="small" placeholder="请输入表名"></el-input>
          </el-col>
          <el-col :span="8" :offset="1" >
            <div class="btnBox" style="padding-top: 8px;">
              <div class="button_border" @click="searchData">查询</div>
              <div class="button_default" @click="resetFilter" style="margin:0;">重置</div>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-table
        :data="tableData"
        style="width: 100%"
        border
        v-loading="loading"
        @selection-change="handleSelectionChange"
        element-loading-text="数据加载中"
        element-loading-background="rgba(255, 255, 255,0.95)"
        ref="multipleTable"
      >
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column label="表名" prop="tableName" > </el-table-column>

        <el-table-column label="数据库引擎" prop="engine" ></el-table-column>
        <el-table-column label="字符编码" prop="coding" ></el-table-column>
        <el-table-column label="备注" prop="remark" ></el-table-column>
        <el-table-column label="创建时间" prop="createTime" > </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
          <el-button size="mini" style="margin-right: 2px" type="text" @click="viewgen(scope.row.tableName)">
          
            预览
          
          </el-button>
          <el-button size="mini" style="margin-left: -1px;margin-right: 2px" type="text" @click="toDownload(scope.row.tableName)">下载</el-button>
          <el-button @click="editconfig(scope.row.tableName)" size="mini" style="margin-left: -1px;margin-right: 2px" type="text">
            
              编辑
          </el-button>
          <el-button type="text" style="margin-left: -1px" size="mini" @click="toGen(scope.row.tableName)">生成</el-button>
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
          :total="totalRecord"
          :page-size="pageSize"
          :current-page="pageNo">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import selectInput from '@/components/common/form/selectInpt'
import Axios from "axios";
  export default {
    name: 'generateCode',
    components: {selectInput},
    data() {
      return {
        filterData: {}, //查询条件
        //  表格数据
        tableData: [],
        pageNo: 1,// 当前页
        pageSize: 5,// 当前每页条数
        totalPage: 1,// 总页数
        totalRecord: 1,// 总条数，
        loading: true, //控制loading动画显示隐藏
        searchInfo: {},
        selectGroups:[],   //已选中的对象
        codeHref:"", //文件下载路径
        sourceType:"", //数据源类型
        owner:"", //用户名
      }
    },
    created() {
      this.searchInfo['page'] = this.pageNo;
      this.searchInfo['rows'] = this.pageSize;
      this.getList();
    },
    methods: {
      viewgen(tableName){
        let that = this;
        let title = '生成预览'
        let routerPath = '/preview';
        let tabObj = {title, routerPath}
        that.$router.push({path: routerPath,query:{tableName:tableName}})
      },
      editconfig(tableName) {
        // this.$refs.multipleTable.toggleRowSelection(row);
        let that = this;
        let title = '生成配置'
        let routerPath = '/config';
        let tabObj = {title, routerPath}
        that.$router.push({path: routerPath,query:{tableName:tableName}})
      },
      toGen(tableName) {
        // 生成代码
        var that=this
         that.$post('/epf-generator/api/generator/' + tableName + '/0').then(res => {
          this.$notify({
            title: '生成成功',
            type: 'success',
            duration: 2500
          })
        })
      },
    toDownload(tableName) {
      // 打包下载
      var that=this
      that.$post('/epf-generator/api/generator/' + tableName + '/2').then(res => {
      
        that.downloadFile(res, tableName, 'zip')
      })
    },
    downloadFile(obj, name, suffix) {
      const url = window.URL.createObjectURL(new Blob([obj]))
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      const fileName = new Date() + '-' + name + '.' + suffix
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },

    sync() {
      const tables = []
      this.crud.selections.forEach(val => {
        tables.push(val.tableName)
      })
      this.syncLoading = true
      sync(tables).then(() => {
        this.crud.refresh()
        this.crud.notify('同步成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
        this.syncLoading = false
      }).then(() => {
        this.syncLoading = false
      })
    },
//  查询 点击事件
      searchData() {
        var that = this;
        var json = {"tablename": that.filterData.tablename};
        var filters = JSON.stringify(json);
        that.searchInfo['filterData'] = filters;
        that.getList();
      },
//  重置 点击事件
      resetFilter() {
        this.filterData.tablename = "";
        var that = this;
        var json = {};
        var filters = JSON.stringify(json);
        that.searchInfo['filterData'] = filters;
        that.getList();
      },

//  每页条数改变时触发
      handleSizeChange(val) {
        this.pageNo = 1;
        this.pageSize = val;
        this.searchInfo["page"] = this.pageNo;
        this.searchInfo["rows"] = val;
        this.getList();
      },
//  翻页时触发
      handleCurrentChange(val) {
//获取当前页
        this.searchInfo["page"] = val;
        this.pageNo = val;
        this.searchInfo["rows"] = this.pageSize;
        this.getList();
      },
      getList() {
        let that = this;
        that.$get('/epf-generator/api/generator/tables', this.searchInfo).then(res => {
          
          //返回的数据
          that.tableData = res.content;
          //数据条数
          that.totalRecord = res.totalElements;
          
          this.loading = false;
        });
      },
      getObject(id) {
        var btn = document.createElement("a");
        btn .setAttribute('download', '');// download属性
        btn .setAttribute('href', this.codeHref+id);// href链接
        btn.click();// 自执行点击事件
      }
    }
  }
</script>

<style scoped>
  .filter_title {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: 34px;
    padding-right: 10px;
    text-align: right;
    line-height: 34px;
  }
  .btnBox {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .companyInfoBox {
    padding: 30px 30px;
    max-height: 600px;
    overflow-y: auto;
  }

  .titleFont {
    text-align: center;
    font-size: 20px;
    font-weight: 800;
  }

  .middleBox {
    width: 85%;
    margin: 30px auto;
    margin-top: 10px
  }

  .middleBox_btn {
    width: 85%;
    margin: 30px auto;
    margin-bottom: 0;
  }

  .btnInfo {
    margin-top: 20px;
    text-align: right;
    font-size: 16px;
    letter-spacing: 3px;
  }
  .filter_wrap .el-col .filterIpt.el-input--small .el-input__inner {
    height: 34px;
  }
</style>
