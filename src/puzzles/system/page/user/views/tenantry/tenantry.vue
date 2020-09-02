<template>
  <!-- 用户中心-租户管理模块 -->
  <epf-container title="租户管理">
    <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}" class="m_title">
      <el-button
        style="float:right;margin-top:4px;"
        @click="addBanner"
        size="mini"
        icon="el-icon-plus"
      >添加</el-button>
    </el-header>
    <div class="epf_fr_content" :style="{height:boxHeight - 110 +'px'}">
      <el-main
        :style="{'height':boxHeight - 110 + 'px','paddingTop':'10px','borderLeft':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)'}"
        >
        <template>
          <el-table :data="advertDataList" border style="width: 100%">
            <el-table-column fixed prop="code" label="租户编号" width="100"></el-table-column>
            <el-table-column fixed prop="name" label="租户名称" min-width="150"></el-table-column>
            <el-table-column prop="contacter" label="联系人" width="120"></el-table-column>
            <el-table-column prop="telPhone" label="联系电话" width="120"></el-table-column>
            <el-table-column prop="status" label="状态" min-width="70">
              <template slot-scope="scope">
                <span :class="(scope.row.status=='0')?'success':''"></span>
                <span :class="(scope.row.status!='0')?'error':''"></span>
                <span>{{scope.row.status=='0'?'启用':'禁用'}}</span>
              </template>
            </el-table-column>

            <el-table-column prop="email" label="邮箱" width="120"></el-table-column>
            <el-table-column prop="address" label="地址" min-width="150"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="120"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="120"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <!-- <span v-for="(button ,index)  in buttons" :key="index"> -->
                <!-- v-if="button.resourceId=='tenant_edit'" -->
                <el-button type="text" size="small" @click="shwoDialog(scope.row)">编辑</el-button>
                <!-- v-if="button.resourceId=='tenant_delete'&& scope.row.code!='plus'" -->
                <el-button type="text" size="small" @click="deleteBanner(scope.row)">删除</el-button>
                <!-- </span> -->
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
    <!--</el-container>
    </el-main>
    -->
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
      <div v-if="!dialogData.comp" class="epf_align_right">
        <button class="epf_btn epf_btn_bg" @click="dialogData.visible = false">确 定</button>
        <button class="epf_btn epf_btn_def" @click="dialogData.visible = false">取 消</button>
      </div>
    </el-dialog>
  </epf-container>
</template>

<script>
// import orgTree from "../../components/orgTree";
import addTenantry from "./add";
import editTenantry from "./edit";

export default {
  name: "tenantry",
  components: {
    // orgTree,
    addTenantry,
    editTenantry
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
      theme_TextColor: ""
    };
  },
  created() {
    // this.boxHeight = window.innerHeight - 250;
    //this.buttons = JSON.parse(localStorage.getItem("userManage"));
    //this.userTypes = this.queryDictList('userTypes');
    // this.getListData(this.userSearchData);
    //this.getGrowpList({});
    //this.getTenantlist();
    this.boxHeight = window.innerHeight - 250;
  },
  mounted() {
    this.getTenantryManage(this.searchAdvert);
  },
  methods: {
    getTenantryManage(params) {
      // /epf-admin/admin/Tenantry/getTenantryJson
      this.$post(this.$API.EPF_ADMIN.TENANTRY.GET_JSON, params)
        .then(res => {
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
      this.searchAdvert["page"] = this.pageNo;
      this.searchAdvert["rows"] = val;
      this.getTenantryManage(this.searchAdvert);
    },
    handleCurrentChange(val) {
      //获取当前页
      this.searchAdvert["page"] = val;
      this.searchAdvert["rows"] = this.pageSize;
      this.getTenantryManage(this.searchAdvert);
    },
    shwoDialog(data) {
      // this.edit = true;
      this.advertData = data;
      console.log("====this.advertData===", this.advertData);
      this.dialogData = {
        visible: true,
        title: "编辑租户",
        comp: "editTenantry",
        width: "50%"
      };
      // this.dialogVisible = true;
      // this.imageUrl =this.getImgUrl(this.advertData.img);
    },
    deleteBanner() {
      this.dialogData = {
        visible: true,
        title: "删除租户",
        content: "确认要删除该条信息吗?",
        width: "30%"
      };
    },
    addBanner() {
      this.dialogData = {
        visible: true,
        title: "新增租户",
        comp: "addTenantry",
        width: "50%"
      };
    }
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
</style>
