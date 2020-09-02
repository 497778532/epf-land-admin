<template>
  <epf-container title="数据发布服务" id="Tenantry">
    <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}" class="m_title">
      <el-button
        type="primary"
        style="float:right;margin-top:4px;"
        @click="addBanner"
      >新增</el-button>
    </el-header>
    <div class="epf_fr_content" :style="{height:boxHeight - 110 +'px'}">
      <el-main
        :style="{'height':boxHeight - 110 + 'px','paddingTop':'10px','borderLeft':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)'}"
        >
        <template>
          <el-table :data="advertDataList" border style="width: 100%" row-key="id">
            <el-table-column fixed  type="index" label="序号"   width="50"></el-table-column>

            <el-table-column fixed prop="name" label="接口名称" min-width="120">
              <template slot-scope="scope">
                <div class="cell_click" @click="clickselectrow(scope.$index, scope.row)">
                  <span>{{scope.row.name}}</span>
                </div>
              </template>
            </el-table-column>
            
            <el-table-column prop="refProject" label="所属项目" width="150"></el-table-column>
            <el-table-column prop="address" label="请求IP" width="100"></el-table-column>
            <el-table-column prop="port" label="端口" width="100"></el-table-column>
            <el-table-column prop="method" label="请求类型" width="100"></el-table-column>
            <el-table-column prop="address" label="请求参数" min-width="150">
              <template slot-scope="scope">
                <span v-for="(item,index) in scope.row.plist" v-key="index">
                  <span v-if="index>0">&</span>
                  <span>{{item.name}}={{item.code}}</span>
                </span>

              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" min-width="50">
              <template slot-scope="scope">
                <span :class="(scope.row.status=='1')?'success':''"></span>
                <span :class="(scope.row.status!='1')?'error':''"></span>
                <span v-if="scope.row.status=='1'">审核通过</span>
                <span v-if="scope.row.status=='0'">未审核</span>
                <span v-if="scope.row.status=='2'">审核未通过</span>
                <span v-if="scope.row.status=='3'">禁用</span>
                <span v-if="scope.row.status=='4'">已发布</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="shwoDialog(scope.row)" v-if="scope.row.status==0 || scope.row.status==2 ">编辑</el-button>
                <el-button type="text" size="small" @click="seeDialog(scope.row)">查看</el-button>
                <el-button type="text" size="small" @click="deleteBanner(scope.row)">删除</el-button>
                <el-button type="text" size="small" @click="examineMess(scope.row)" v-if="scope.row.status==0">审核</el-button>
                <el-button type="text" size="small" @click="releaseMess(scope.row)" v-if="scope.row.status==1">发布</el-button>
                <el-button type="text" size="small" @click="testinternet(scope.row)" v-if="scope.row.status==4">测试</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-main>
    </div>
    <div style="text-align:right;margin:8px 0px;">
      <el-pagination
        background
        layout="prev, pager, next,sizes,jumper"
        :page-sizes="[5,10, 15, 20]"
        :total="totalRecord"
        :page-size="pageSize"
        :current-page="pageNo"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <!-- 弹框 -->
    <el-dialog
      :title="dialogData.title"
      :visible.sync="dialogData.visible"
      :width="dialogData.width"
       append-to-body
      >
      <component
        v-if="dialogData.comp"
        :advertData="advertData"
        :is="dialogData.comp"
        :ref="'dialogData.comp'"
        @cancel="dialogData.visible = false"
      ></component>
      <div v-if="!dialogData.comp" v-html="dialogData.content"></div>
      <div v-if="dialogData.title =='审核信息'">
        <el-form  label-width="70px">
          <el-form-item label="审核意见">
            <el-input type="textarea" v-model="auditOpinion" maxlength="125"  placeholder="请输入审核意见"></el-input>
          </el-form-item>
          <el-radio v-model="statusradio" label="1">审核通过</el-radio>
          <el-radio v-model="statusradio" label="2">审核不通过</el-radio>
        </el-form>
      </div>
      <div v-if="!dialogData.comp" class="epf_align_right">
        <button class="epf_btn epf_btn_bg" v-if="dialogData.title =='审核信息'" @click="submitauth">确 定</button>
        <button class="epf_btn epf_btn_bg" v-if="dialogData.title !='审核信息'" @click="publish">确 定</button>
        <button class="epf_btn epf_btn_def" @click="dialogData.visible = false">取 消</button>
      </div>
    </el-dialog>
  </epf-container>
</template>

<script>
import addMess from "./add";
import editMess from "./edit";
import seeMess from "./see";
import testMess from "./test";

export default {
  name: "tenantry",
  components: {
    addMess,
    editMess,
    seeMess,
    testMess
  },
  data() {
    return {
      dialogData: {
        //弹框数据
        visible: false,
        title: "",
        comp: "",
        width: "50%"
      },
      boxHeight: 100,
      advertDataList: [],
      advertData: Object,
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      searchAdvert: {},
      tableData1: [],
      dialogVisible: false,
      disabled: false,
      edit: false,
      //按钮组、主题
      buttons: [],
      theme_BackgroundColor: "",
      theme_TextColor: "",
      statusradio: '1', // 审核弹窗选项
      auditOpinion:"",
    };
  },
  created() {
    this.boxHeight = window.innerHeight - 250;
  },
  mounted() {
    this.getTenantryManage(this.searchAdvert);
  },
  methods: {
    getTenantryManage(params) {
      this.$post(this.$API.EPF_GATEWAY.GET_JSON, params).then(res => {
          if (res.code != "0") {
            this.$message.error(res.msg); //失败
            return;
          }
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
          this.advertDataList = res.pager.results;
        })
        .catch(error => {});
    },
    handleSizeChange(val) {
      //每页条数改变时触发
      this.pageNo = 1;
      this.searchAdvert["pageNo"] = this.pageNo;
      this.searchAdvert["pageSize"] = val;
      this.getTenantryManage(this.searchAdvert);
    },
    handleCurrentChange(val) {
      //获取当前页
      this.searchAdvert["pageNo"] = val;
      this.searchAdvert["pageSize"] = this.pageSize;
      this.getTenantryManage(this.searchAdvert);
    },
    shwoDialog(data) {
      this.advertData = data;
      console.log("====this.advertData===", this.advertData);
      this.dialogData = {
        visible: true,
        title: "编辑信息",
        comp: "editMess",
        width: "50%"
      };
    },
    testinternet(data){
      this.advertData = data;
      this.dialogData = {
        visible: true,
        title: "测试接口",
        comp: "testMess",
        width: "50%"
      };
    },
    seeDialog(data){
      this.advertData = data;
      this.dialogData = {
        visible: true,
        title: "查看信息",
        comp: "seeMess",
        width: "50%"
      };
    },
    deleteBanner(data) {

      var _this=this;
      var id=data.id;
      _this.$confirm('确认要删除该条信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$post(_this.$API.EPF_GATEWAY.DELETE+'?id='+id, {}).then(res => {
          if (res.code != "0") {
            _this.$message.error(res.msg); //失败
            return;
          }
          _this.$message.success("删除成功！"); //失败
          _this.pageNo = 1;
          _this.searchAdvert["pageNo"] = _this.pageNo;
          _this.searchAdvert["pageSize"] = _this.pageSize;
          _this.getTenantryManage(this.searchAdvert);
        }).catch(error => {});
          
        }).catch(() => {});
    },
    submitauth(){//提交审核
      var _this=this;
      var paramas={};
      paramas["id"] = _this.advertData.id;
      paramas["status"] = _this.statusradio;
      paramas["auditOpinion"] = _this.auditOpinion;
      _this.$post(_this.$API.EPF_GATEWAY.EXAMINE, paramas).then(res => {
          if (res.code != "0") {
            _this.$message.error("审核出错"); //失败
            return;
          }
          _this.$message.success("审核成功！"); //失败
          _this.dialogData.visible=false;
          _this.pageNo = 1;
          _this.searchAdvert["pageNo"] = _this.pageNo;
          _this.searchAdvert["pageSize"] = _this.pageSize;
          _this.getTenantryManage(this.searchAdvert);
      }).catch(error => {});
          
    },
    publish(){//发布
      var _this=this;
      var paramas={};
      paramas["id"] = _this.advertData.id;
      _this.$post(_this.$API.EPF_GATEWAY.PUBLISH, paramas).then(res => {
          if (res.code != "0") {
            _this.$message.error("发布出错"); //失败
            return;
          }
          _this.$message.success("发布成功！"); //失败
          _this.dialogData.visible=false;
          _this.pageNo = 1;
          _this.searchAdvert["pageNo"] = _this.pageNo;
          _this.searchAdvert["pageSize"] = _this.pageSize;
          _this.getTenantryManage(this.searchAdvert);
      }).catch(error => {});
          
    },
    addBanner() {
      this.dialogData = {
        visible: true,
        title: "新增信息",
        comp: "addMess",
        width: "50%"
      };
    },
    examineMess(data) {
      this.advertData = data;
      this.dialogData = {
        visible: true,
        title: "审核信息",
        width: "30%"
      };
    },
    releaseMess(data) {
      this.advertData = data;
      this.dialogData = {
        visible: true,
        title: "发布信息",
        content: "确认要发布接口吗?",
        width: "30%"
      };
    },
    // 接口名称跳转至接口信息
    clickselectrow(index,row) {
      let title = "接口信息";
      let routerPath = '/system/page/user/views/dataPub/detail';
      let item = {url:routerPath,menuname:title}
      //将当前点击的选项添加到vuex中
      this.$router.push({path: routerPath});
      this.$store.commit("ADD_TAB", item)
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
.cell_click{
  cursor: pointer;
}
</style>
<style>
</style>
