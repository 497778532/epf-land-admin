<template>
  <epf-container title='代码生成器'>
    <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
      <div class="epf_toolbar titieBox">
        <el-row>
          <el-col :span="3">
            <el-popover
              placement="bottom"
              width="400"
              trigger="click">
                <div>1、确保后台代码生成器配置没有问题</div>
                <div>2、需要生成代码的表，表注释以及列注释都存在且不为空</div>
                <div>3、代码生成器路径是否配置正确</div>
                <div>4、当前数据库信息</div>
                <div style="margin-left: 1em">数据源：{{sourceType}}</div>
                <div style="margin-left: 1em">用户名：{{owner}}</div>
                <el-button 
                  type="text" 
                  class="header-icon el-icon-info"
                  slot="reference">
                  点我查看-使用须知
                </el-button>
            </el-popover>
          </el-col>
          <el-col :span="6">
            <el-input 
              v-model="filterData.tablename" 
              placeholder="请输入表名">
            </el-input>
          </el-col>
          <el-col :span="14">
            <button class="epf_btn epf_btn_bg" @click="searchData">查询</button>
            <button class="epf_btn epf_btn_bg" @click="resetFilter">重置</button>
            <button class="epf_btn epf_btn_bg" @click="codeList">批量生成代码</button>
          </el-col>
        </el-row>
      </div>
      <div class="epf_fr_content epf_no_border" :style="{height:boxHeight - 55 +'px'}">
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          :height="boxHeight-120"
          v-loading="loading"
          @selection-change="handleSelectionChange"
          element-loading-text="数据加载中"
          element-loading-background="rgba(255, 255, 255,0.95)"
          ref="multipleTable">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            label="表名"
            min-width="180">
            <template slot-scope="scope">
              <el-tag hit size="medium">{{ scope.row.TABLENAME }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="表备注"
            min-width="180">
            <template slot-scope="scope">
              <el-tag hit size="medium">{{ scope.row.TABLECOMMENT }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            min-width="180">
            <template slot-scope="scope">
              <el-tag hit size="medium">{{ scope.row.CREATETIME }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="warning" plain @click="handleEdit(scope.$index, scope.row)">生成代码</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="epf_paging_fixe">
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
  </epf-container>
</template>

<script>
export default {
  name: "code",
  data() {
    return {
      boxHeight: 700,
      filterData: {}, //查询条件
      tableData: [], //  表格数据
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
    this.boxHeight = window.innerHeight - 250
    this.searchInfo['page'] = this.pageNo;
    this.searchInfo['rows'] = this.pageSize;
    this.getList();
  },
  methods: {
    handleSelectionChange (val) { //多选框选中事件
      this.selectGroups = val;
    },
    //批量生成代码按钮点击事件
    codeList() {
    //获取已选中的行对象
     var selectGroups = this.selectGroups;
     var id = "";
     if(selectGroups != null && selectGroups.length > 0){
       for(var i = 0;i<selectGroups.length;i++){
         id += selectGroups[i].TABLENAME+",";
       }
     }else {
       //未选中任何对象，显示提示
       this.$message.success('没有指定生成表数据，将生成所有表代码!');
     }
      //传输需要生成的表
      this.getObject(id);
    },
    searchData() { //  查询 点击事件
      var that = this;
      var json = {"tablename": that.filterData.tablename};
      var filters = JSON.stringify(json);
      that.searchInfo['filterData'] = filters;
      that.getList();
    },
    resetFilter() { //  重置 点击事件
      this.filterData.tablename = "";
      var that = this;
      var json = {};
      var filters = JSON.stringify(json);
      that.searchInfo['filterData'] = filters;
      that.getList();
    },
    handleEdit(index, row) { //  生成代码 点击事件
      var id = row.TABLENAME;
      this.getObject(id);
    },
    handleSizeChange(val) { //  每页条数改变时触发
      this.pageNo = 1;
      this.pageSize = val;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = val;
      this.getList();
    },
    handleCurrentChange(val) { //  翻页时触发
      this.searchInfo["page"] = val;
      this.pageNo = val;
      this.searchInfo["rows"] = this.pageSize;
      this.getList();
    },
    getList() {
      let that = this;
      that.$post(this.$API.EPF_GENERATOR.LIST_JSON, this.searchInfo).then(res => {
        if (res.code != '0') {
          that.$message.error(res.msg);//失败
          return
        }
        //返回的数据
        that.tableData = res.page.list;
        //数据条数
        that.totalRecord = res.page.totalCount;
        //总页数
        that.totalPage = res.page.pageSize;
        //代码生成器路径
        that.codeHref = res.codeHref;
        //数据源类型
        if(res.sourceType == 1){
          that.sourceType = "Oracle";
        }else{
          that.sourceType = "Mysql";
        }
        //用户名
        that.owner = res.owner;
        //隐藏进度条
        this.loading = false;
      }).catch(error=>{
          this.loading = false;
      })
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
<style lang="less" scoped>
.titieBox{
  padding: 0 20px;
}
.notice{
  height: 40px;
  margin-top: 4px;
  .el-collapse-item__header{
    height: 40px;
    border:1px solid #DCDFE6;
  }
}
</style>
