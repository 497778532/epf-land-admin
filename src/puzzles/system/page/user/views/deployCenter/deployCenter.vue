<template>
  <epf-container title="配置中心管理" id="deployCenter">
    <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}" class="m_title">
      <el-select v-model="curAppName" class="select-cs" @change="updateAppName(curAppName)" placeholder="请选择">
        <el-option
          v-for="item in listAppName"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="curType" style="margin-left:20px;" class="select-cs" placeholder="请选择分类">
        <el-option
          v-for="item in listType"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="selectKey1" style="margin-top:4px;width:170px" placeholder="请输入key1" ></el-input>
      <el-button type="primary" plain style="margin-top:4px;margin-left:8px;" @click="selectData">搜索</el-button>
      <el-button type="warning" plain style="margin-top:4px;" @click="resetSearch">重置</el-button>
      <el-button type="success"  style="float:right;margin-top:4px;"  :disabled="!loading" @click="release">
        <span v-if="loading">发布</span>
        <span v-if="!loading" class="el-icon-loading"></span>
      </el-button>
      <el-button type="success"  style="float:right;margin-top:4px;"  @click="previewDeploy">预览</el-button>
      <el-button type="primary" style="float:right;margin-top:4px;" @click="addDeploy">新增</el-button>

    </el-header>
    <div class="epf_fr_content">
      <el-main>
        <template>
          <el-table :data="tableDataList"
                    border
                    style="width: 100%"
                    row-key="id">
            <el-table-column fixed type="index" label="序号" width="50"></el-table-column>

            <el-table-column fixed prop="application" label="服务名" min-width="50">
              <template slot-scope="scope">
                  <span>{{scope.row.application}}</span>
              </template>
            </el-table-column>

            <el-table-column fixed prop="name" label="配置名" min-width="80">
              <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>

            <el-table-column fixed prop="key1" label="键" min-width="110">
              <template slot-scope="scope">
                  <span>{{scope.row.key1}}</span>
              </template>
            </el-table-column>

            <el-table-column fixed prop="value1" label="值" min-width="130">
              <template slot-scope="scope">
                  <span>{{scope.row.value1}}</span>
              </template>
            </el-table-column>

            <el-table-column fixed prop="profile" label="配置" min-width="30">
              <template slot-scope="scope">
                  <span>{{scope.row.profile}}</span>
              </template>
            </el-table-column>

            <el-table-column fixed prop="label" label="标签" min-width="30">
              <template slot-scope="scope">
                  <span>{{scope.row.label}}</span>
              </template>
            </el-table-column>

            <el-table-column fixed prop="type" label="分类" min-width="30">
              <template slot-scope="scope">
                  <span>{{scope.row.type}}</span>
              </template>
            </el-table-column>

            <el-table-column fixed prop="type" label="状态" min-width="30">
              <template slot-scope="scope">
                  <span>{{scope.row.isUse=='1'?'已启用':scope.row.isUse=='0'?'已禁用':'不明'}}</span>
              </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" min-width="100">
              <template slot-scope="scope">
                <el-button type="primary" plain size="small" @click="shwoDialog(scope.row)">编辑</el-button>
                <el-button type="danger" plain size="small" @click="delDeploy(scope.row)">删除</el-button>
                <el-button type="warning" plain size="small" v-if="scope.row.isUse=='1'" @click="updateIsUse(scope.row,'0')">禁用</el-button>
                <el-button type="success" plain size="small" v-if="scope.row.isUse=='0'" @click="updateIsUse(scope.row,'1')">启用</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-main>
    </div>
    <div style="text-align:right;margin:8px 0px;">
      <el-pagination background
                     layout="prev, pager, next,sizes,jumper"
                     :page-sizes="[5,10, 15, 20]"
                     :total="totalRecord"
                     :page-size="pageSize"
                     :current-page="pageNo"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"></el-pagination>
    </div>
    <!-- 弹框 -->
    <el-dialog
      :title="dialogData.title"
      :visible.sync="dialogData.visible"
      :width="dialogData.width"
      append-to-body>
      <component
        v-if="dialogData.visible"
        :advertData="advertData"
        :is="dialogData.comp"
        :ref="'dialogData.comp'"
        @cancel="close">
      </component>

    </el-dialog>

    <!--预览弹框-->
    <el-dialog 
      :title="dialogIfarme.title"
      :visible.sync="dialogIfarme.visible"
      :width="dialogIfarme.width"
      append-to-body>
      <iframe :src="iframeSrc" class="iframe-cs"  width="724px" height="600px" frameborder="0"> </iframe>
    </el-dialog>
  </epf-container>
</template>

<script>
import addMess from "./add";
import editMess from "./edit";

export default {
  name: "deployCenter",
  components: {
    addMess,
    editMess,
  },
  data () {
    return {
      dialogData: {
        //弹框数据
        visible: false,
        title: "",
        comp: "",
        width: "40%"
      },
      dialogIfarme: {
        //弹框数据
        visible: false,
        title: "",
        comp: "",
        width: "40%"
      },
      tableDataList: [],
      advertData: Object,
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: {},
      theme_BackgroundColor: "",
      theme_TextColor: "",
      listAppName:[],
      listType:[],
      curAppName:'',
      selectKey1:'',
      loading:true,
      curType:'',
      iframeSrc:''
    };
  },
  created () {
  },
  mounted () {
    this.getListAppName();
  },
  methods: {
    //获取服务名列表
    getListAppName () {
      debugger
      let that = this
      this.$post('/epf-admin/getListAppName', {}).then(res => {
        if (res.code != "0") {
          this.$message.error(res.msg); //失败
          return;
        }
        let list = res.results;
        let temp = [];
        for(let i=0;i<list.length;i++){
          let temp1 = {'value':'','label':''};
          temp1.value = list[i];
          temp1.label = list[i];
          temp.push(temp1);
        }
        that.listAppName = temp;
        that.curAppName = res.results[0];
        that.updateAppName();
      }).catch(error => { });
    },
    //获取服务类型列表
    getListType(){
      let that = this;
      that.$post('/epf-admin/getListType',that.searchInfo).then(res=>{
        if(res.code != '0'){
          this.$message.error(res.msg); //失败
          return;
        }
        let list = res.results;
        let temp = [];
        for(let i=0;i<list.length;i++){
          let temp1 = {'value':'','label':''};
          temp1.value = list[i].TYPE;
          temp1.label = list[i].TYPE;
          temp.push(temp1);
        }
        that.listType = temp;
      })
    },
    //根据服务名和key值搜索数据
    selectData(){
      let that = this
      var json = {};
      json['application'] = that.curAppName;
      json['type'] = that.curType;
      json['selectKey1'] = that.selectKey1;
      that.searchInfo["filterData"] = JSON.stringify(json);
      that.getListDeploy(that.searchInfo)
    },
    //切换服务名更新列表数据
    updateAppName(){
      let that = this;
      this.curType = null;
      this.selectKey1 = null;
      that.filterSet();
      that.searchInfo["pageNo"] = that.pageNo;
      that.searchInfo["pageSize"] = that.pageSize;
      that.getListType();
      that.getListDeploy(that.searchInfo);
    },
    resetSearch(){
      // this.curType = null;
      // this.selectKey1 = null;
      this.updateAppName();
    },
    filterSet(){
      var json = {};
      json['application'] = this.curAppName;
      this.searchInfo["filterData"] = JSON.stringify(json);
    },
    //根据服务名获取配置列表数据
    getListDeploy (param){
      let that = this
      this.$post('/epf-admin/getListDeploy',param).then(res=>{
        if (res.code != "0") {
          this.$message.error(res.msg); //失败
          return;
        }
        this.pageNo = res.pager.pageNo;
        this.pageSize = res.pager.pageSize;
        this.totalPage = res.pager.totalPage;
        this.totalRecord = res.pager.totalRecord;
        this.tableDataList = res.pager.results;
      }).catch(error => { });
    },
    //响应组件的关闭操作
    close(){
      this.dialogData.visible = false;
      this.updateAppName();
    },
    handleSizeChange (val) {
      //每页条数改变时触发
      this.pageNo = 1;
      this.searchInfo["pageNo"] = this.pageNo;
      this.searchInfo["pageSize"] = val;
      this.selectData();
    },
    handleCurrentChange (val) {
      //获取当前页
      this.searchInfo["pageNo"] = val;
      this.searchInfo["pageSize"] = this.pageSize;
      this.selectData();
    },
    shwoDialog (data) {
      this.advertData = data;
      console.log("====this.advertData===", this.advertData);
      this.dialogData = {
        visible: true,
        title: "编辑信息",
        comp: "editMess",
        width: "40%"
      };
    },
    previewDeploy (){
      debugger
      let name = this.curAppName+"配置预览"
      let temp1 = '-dev.yml'
      let temp2 = '/api/epf-config/'
      this.iframeSrc = temp2 + this.curAppName +temp1
        this.dialogIfarme = {
        visible: true,
        title: name,
        comp: "previewDeploy",
        width: "40%"
      };
      // window.open(url)
    },
    release(){
      debugger
      this.$confirm('确认配置信息修改无误吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = false
        this.$post("/epf-admin/refresh-config",{}).then(res=>{
          if(res=='成功'){
            this.$message.success("发布成功")
          }
          this.loading = true
        }).catch(error=>{
          this.loading = true
        });
      }).catch(() => {
        this.loading = true
       });
    },
    updateIsUse(data,isUse){
      let param={'id':'','isUse':''};
      param.id = data.id;
      param.isUse = isUse;
      debugger
      let msg = '';
      if(isUse=='1'){
        msg = '确认启用该配置吗？'
      }
      if(isUse=='0'){
        msg = '确认禁用该配置吗？'
      }
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$post('/epf-admin/editDeploy', param).then(res => {
          if (res.code != "0") {
            this.$message.error(res.msg); //失败
            return;
          }
          if('1'==isUse){
            this.$message.success("启用成功")
          }
          if('0'==isUse){
            this.$message.success("禁用成功")
          }
          this.updateAppName()
        }).catch(error => { });
      }).catch(() => { });
    },
    delDeploy (data) {
      var that = this;
      var id = data.id;
      that.$confirm('确认要删除该条信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.$post('/epf-admin/delDeploy?id='+id, {}).then(res => {
          if (res.code != "0") {
            that.$message.error(res.msg); //失败
            return;
          }
          that.updateAppName();
          that.$message.success("删除成功！"); //失败
        }).catch(error => { });

      }).catch(() => { });
    },
    addDeploy () {
      this.advertData.application = this.curAppName
      this.dialogData = {
        visible: true,
        title: "新增信息",
        comp: "addMess",
        width: "50%"
      };
    },

  }
};
</script>

<style lang="less" scoped>
.header-class {
  background-color: #ddd !important;
}
.status-name {
  cursor: pointer;
  height: 10px;
  width: 10px;
  border-radius: 10px;
  position: absolute;
  top: 18px;
}
.starting {
  background: #3e84e9;
  color: #3e84e9;
}
.stop {
  background: #ddd;
  color: #ddd;
}
.cell_click {
  cursor: pointer;
}
</style>
<style>
.select-cs{
  margin-top:4px;
  margin-left:-15px;
  width:150px
}
.iframe-cs{
  border:1px solid black;;
  
}
</style>
