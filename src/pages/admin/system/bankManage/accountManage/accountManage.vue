<template>
  <div class="page-body">
    <div class="filter_wrap" :view-id="newRender">
      <!-- 搜索 -->
      <div class="switchHeight_box">
          <div class="bankfilter noSelect">
            <div style="min-width:100px">
              <span class="filter_title">户名 :</span>
            </div>
            <div style="min-width:160px">
              <el-input v-model="filterbank.name" size="small" placeholder="请输入银行名称"></el-input>
            </div>

            <div style="min-width:100px">
              <span class="filter_title">币种 :</span>
            </div>
            <!-- <div style="min-width:160px">
              <selectInput
              v-model="filterbank.currency"
              :groupCode="'trade_currency'"
              @dictObj="val => {this.newObj = val}"
              :default="''"
              ></selectInput>
            </div> -->
            <el-select v-model="filterbank.currency" size="small"  placeholder="请选择币种">
                <el-option v-for="item in dictionary.trade_currency" :ref="item.zhCn"
                    :id="item.id" :dictKey="item.dictKey" :dictId="item.id" :label="item.zhCn" :value="item.dictKey" :key="item.dictKey">
                </el-option>
            </el-select>
            <div style="min-width:20px"></div>
            <div style="min-width:270px">
              <span class="button_bg" @click="queryDate">查询</span>
              <span class="button_default" @click="resetDate">重置</span>
              <span class="button_border" @click="handleEdit('add','sizeForm')">创建账号</span>
            </div>
          </div>

            <el-table :data="tableData" border style="width: 100%">
              <el-table-column label="序号" min-width="80">
                <template slot-scope="scope">
                  <span>{{scope.$index + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="no" label="账号" min-width="230"></el-table-column>
              <el-table-column prop="name" label="户名" min-width="160">
                <template slot-scope="scope">
                  <span @click="seeBankInfo(scope.row)" class="bankTitle">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="tradeUseName" label="用途" min-width="120"></el-table-column>
              <el-table-column prop="currencyName" label="币种" min-width="160"></el-table-column>
              <el-table-column prop="inAccountModeName" label="模式类型" min-width="160"></el-table-column>
              <el-table-column prop="accountTypeName" label="账户类型" min-width="160"></el-table-column>
              <el-table-column prop="isOutsideName" label="类型" min-width="100"></el-table-column>
              <el-table-column fixed="right" label="操作" min-width="80">
                <template slot-scope="scope">
                  <el-button
                    @click="handleEdit('editor','sizeForm',scope.$index, scope.row)"
                    type="text"
                    size="small"
                  >修改</el-button>
                  <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="text-align:right;margin:8px 0px;margin-top:10px;">
              <el-pagination
                background
                layout="prev, pager, next,sizes,jumper"
                :page-sizes="[5,10, 15, 20]"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :total="totalRecord"
                :page-size="pageSize"
                :current-page="pageNo"
              ></el-pagination>
            </div>
      </div>
    </div>
    <!-- 新增弹窗 -->
    <!-- 编辑弹窗 -->
    <el-dialog
      :title="dialogTitle"
      class="companyInfo"
      width="700px"
      :visible.sync="editorPopup"
      :append-to-body="true"
      top="10%"
    >
      <div class="middleBox">
        <el-form :model="sizeForm" :rules="rules" ref="sizeForm" label-width="80px" size="small">
          <el-row>
            <el-col :span="12">
              <el-form-item label="账号户名" prop="name">
                <el-input v-model="sizeForm.name" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="账号" prop="no">
                <el-input v-model="sizeForm.no" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="银行名称" prop="bankName">
                <el-input :disabled="true" v-model="sizeForm.bankName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="编号" prop="bankNo">
                <el-input :disabled="true" v-model="sizeForm.bankNo" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用途" prop="tradeUse">
                <!-- <selectInput v-model="sizeForm.tradeUse" :groupCode="'trade_use'" :default="''"></selectInput> -->
                <el-select v-model="sizeForm.tradeUse"   placeholder="请选择用途">
                  <el-option
                      v-for="(item,index) in dictionary.trade_use"
                      :ref="item.zhCn"
                      :id="item.id"
                      :dictKey="item.dictKey"
                      :label="item.zhCn"
                      :value="item.dictKey"
                      :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="币种" prop="currency">
                <!-- <selectInput v-model="sizeForm.currency" :groupCode="'trade_currency'" :default="''"></selectInput> -->
                <el-select v-model="sizeForm.currency"   placeholder="请选择币种">
                  <el-option
                      v-for="(item,index) in dictionary.trade_currency"
                      :ref="item.zhCn"
                      :id="item.id"
                      :dictKey="item.dictKey"
                      :label="item.zhCn"
                      :value="item.dictKey"
                      :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="模式类型" prop="inAccountMode">
                <!-- <selectInput v-model="sizeForm.inAccountMode" :groupCode="'mode_type'" :default="''"></selectInput> -->
                <el-select v-model="sizeForm.inAccountMode"   placeholder="请选择模式类型">
                  <el-option
                      v-for="(item,index) in dictionary.mode_type"
                      :ref="item.zhCn"
                      :id="item.id"
                      :dictKey="item.dictKey"
                      :label="item.zhCn"
                      :value="item.dictKey"
                      :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">

              <el-form-item label="类型" prop="type">
                    <el-radio v-model="sizeForm.isOutside" :label="0">境外</el-radio>
                    <el-radio v-model="sizeForm.isOutside" :label="1">境内</el-radio>
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item label="账户类型" prop="accountType">
                    <el-radio v-model="sizeForm.accountType" :label="'0'">主账户</el-radio>
                    <el-radio v-model="sizeForm.accountType" :label="'1'">托管账户</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div style="text-align:center;margin-top:10px;">
        <el-button size="mini" type="info" plain @click="editorPopup = false">取消</el-button>
        <el-button size="mini" type="success" @click="editorSubmit('sizeForm')">确定</el-button>
      </div>
    </el-dialog>

    <!-- 详情弹窗 -->
    <el-dialog
      title="查看账号"
      class="companyInfo"
      width="700px"
      :visible.sync="detail"
      :append-to-body="true"
      top="10%"
    >
      <div class="middleBox">
        <el-row>
          <el-col :span="12" class="detailCol">
            <div class="detailLabel">账号户名：</div>
            <div>{{detailForm.name}}</div>
          </el-col>
          <el-col :span="12" class="detailCol">
            <div class="detailLabel">账号：</div>
            <div>{{detailForm.no}}</div>
          </el-col>
          <el-col :span="12" class="detailCol">
            <div class="detailLabel">银行名称：</div>
            <div>{{detailForm.bankName}}</div>
          </el-col>
          <el-col :span="12" class="detailCol">
            <div class="detailLabel">银行编号：</div>
            <div>{{detailForm.bankNo}}</div>
          </el-col>
          <el-col :span="12" class="detailCol">
            <div class="detailLabel">用途：</div>
            <div>{{detailForm.tradeUseName}}</div>
          </el-col>
          <el-col :span="12" class="detailCol">
            <div class="detailLabel">币种：</div>
            <div>{{detailForm.currencyName}}</div>
          </el-col>
          <el-col :span="12" class="detailCol">
            <div class="detailLabel">模式类型：</div>
            <div>
            {{detailForm.inAccountModeName}}
            </div>
          </el-col>
          <el-col :span="12" class="detailCol">
            <div class="detailLabel">类型：</div>
            <div>{{detailForm.isOutsideName}}</div>
          </el-col>
          <el-col :span="12">
              <div class="detailLabel">账户类型：</div>
              <div>{{detailForm.accountTypeName}}</div>
          </el-col>
        </el-row>
      </div>
      <div style="text-align:center;margin-top:10px;">
        <el-button size="mini" type="info" plain @click="detail = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import selectInput from "@/components/common/form/selectInpt";
export default {
  name: "bankManage",
  components: { selectInput },
  data() {
    return {
      searchData: "",
      // 输入的筛选条件
      filterbank: {
        accountName: "",
        currency: ""
      },
      tableData: [
      ],
      bankId:"",//管理银行的id
      bankName:"",
      bankNo:"",
      pageNo: 1, // 当前页
      pageSize: 5, // 当前每页条数
      totalPage: 1, // 总页数
      totalRecord: 1, // 总条数，
      //  编辑 表单
      sizeForm: {
        id:"",
        bankId:"",
        name: "",
        no: "",
        bankName:"",
        bankNo:"",
        tradeUse: "",
        tradeUseName:"",
        currency: "",
        currencyName:"",
        inAccountMode:"",
        inAccountModeName:"",
        isOutside: "",
        accountType: "",
        accountTypeName: "",
      },
      // 详情数据
      detailForm: {
      },
      //  编辑 表单验证
      rules: {

        name: [
            { required: true, message: "请输入账号户名.", trigger: "blur" },
            { min: 3, max: 20, message: "请输入正确的联系人." },
            { pattern: /^[\u4e00-\u9fa5]{0,}$/, message: "只能输入中文" }
        ],
        no: [
            { required: true, message: "请输入账号.", trigger: "blur" },
            { min: 8, max: 30, message: "账号应为8-30位数字."}
        ],
        tradeUse: [
            { required: true, message: "请选择用途."},
        ],
        currency: [
            { required: true, message: "请选择币种."},
        ],
        inAccountMode: [
            { required: true, message: "请选择模式类型."},
        ],
        isOutside: [
            { required: true, message: "请选择类型."},
        ],
        accountType: [
            { required: true, message: "请选择账户类型."},
        ],
      },
      editorPopup: false, //  控制编辑弹窗
      dialogTitle: "创建银行", //  弹窗标题
      dicRequest: ["trade_currency","mode_type","trade_use"], //字典码请求
      dictionary: {
        //字典码结果
        trade_currency:"",
        mode_type:"",
        trade_use:""
      },
      dicNum: 0, //字典循环下标
      dicFinsh: false, //  接口请求完成
      detail: false, //  详情弹窗
      newObj:{},
    };
  },
  created() {

    var filters={"bankId":this.$route.query.bankId};
    this.getTransAccountJson({
      page: this.pageNo,
      rows: this.pageSize,
      filters: filters
    });

    this.bankListHeight = window.innerHeight - 280;
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if ( item == "land_use") {
              this.$get(
                `/epf-trade/dictionaries/getDictsByCodeOrParentId?code=${item}`,
                { parentId: 0 }
              ).then(res => {
                resolve(res);
              });
            }else {
          this.$get(
            `/epf-supply/dictionaries/getDictEbyDictGroup/${item}`,
            {}
          ).then(res => {
            resolve(res);
          });
        }
      });
      return reqFun;
    });
    Promise.all(reqArr).then(res => {
      let dicArr = res.map(item => {
        let dicArr = item.dictionariesList.map(item => {
          return {
            dictKey: item.dictKey,
            zhCn: item.zhCn,
            id: item.id
          };
        });
        return dicArr;
      });

      for (let item in this.dictionary) {
        this.dictionary[item] = dicArr[this.dicNum];
        this.dicNum++;
      }
      this.dicFinsh = true;
    });
    // @name: 行政区域
    // @description: 主要是getAreaByCodeOrParentId接口返回字段修改zhCn -> regionName，dictKey->regionCode
    // @author: gaojie
    // @chageTime:2020-3-3
    this.$get(`/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000`,{}).then(res => {
      this.dictionary.administrative_regions = res.dictionariesList;
    })
  },
  mounted(){
  },
  methods: {
    queryDate(){
      var name =this.filterbank.bankName;
      console.log(this.newObj);
      var filters={"bankId":this.bankId,name:this.filterbank.name,currency:this.filterbank.currency};
      this.getTransAccountJson({
        page: this.pageNo,
        rows: this.pageSize,
        filters: filters
      });
    },
    resetDate(){
      this.filterbank.name="";
      this.filterbank.currency="";
      this.pageNo=1;
      this.pageSize=5;
      var page=this.pageNo;
      var rows=this.pageSize;
      var filters={"bankId":this.bankId};
      this.getTransAccountJson({
        page: this.pageNo,
        rows: this.pageSize,
        filters: filters
      });
    },
    dictVal(val){
      console.log(val);
    },
    getTransAccountJson(params) {
      console.log("这是查询list的参数，"+params);
      this.$get("/epf-trade/transaccount/getTransAccountJson", params).then(res => {
        if (res.code == "0") {
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;

          this.tableData = res.pager.results;
          console.log(this.tableData);
        } else {
          this.$message.error(res.msg); //失败
          return;
        }
      });
    },
    getAdministrative(val, index) {
      let params = { code: "administrative_regions", parentId: "0" };
      if (val) {
        params.parentId = val;
      }
      this.$get(
        "/epf-supply/dictionaries/getDictsByCodeOrParentId",
        params
      ).then(res => {
        res.dictionariesList = res.dictionariesList.map((val, idx, arr) => {
          let newVal = val;
          newVal["children"] = [];
          newVal["label"] = val.zhCn;
          newVal["index"] = index;
          return newVal;
        });
        this.options = res.dictionariesList;
      });
    },
    // startDrap(event) {
    //   console.log(event.x);

    //   this.startX = event.x;
    //   this.drapOpen = true;
    // },
    // draping(event) {
    //   if (this.drapOpen) {
    //     let moveWidth = this.startWidth + event.x - this.startX;
    //     if (moveWidth < 300) {
    //       this.asideWidth = "300";
    //       return;
    //     }
    //     if (moveWidth > 1000) {
    //       this.asideWidth = "1000";
    //       return;
    //     }
    //     this.asideWidth = moveWidth.toString();
    //   }
    // },
    // endDrap() {
    //   this.drapOpen = false;
    //   this.startWidth = parseInt(this.asideWidth);
    // },
    // 列表筛选 方法
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 搜索点击事件
    searchList() {
      this.$refs.bankList.filter(this.searchData);
    },
    //  每页条数改变时触发
    handleSizeChange(val) {
      this.pageNo = 1;
      this.pageSize = val;
    },
    //  翻页时触发
    handleCurrentChange(val) {
      this.pageNo = val;
    },
    //  编辑 查看 点击事件
    handleEdit(handle, formName, index, row) {
      debugger;
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
      for (let item in this.sizeForm) {
        if(item!="bankName"||item!="bankNo"){
          this.sizeForm[item] = "";
        }
      }
      if (handle == "editor") {
        this.currentEditorIndex = index;
        for (let item in this.sizeForm) {
          this.sizeForm[item] = this.tableData[index][item] || "";
        }
        this.sizeForm.isOutside = this.tableData[index].isOutside
        this.sizeForm.accountType = this.tableData[index].accountType
        console.log(this.sizeForm.isOutside)
        this.currentHandle = "editor";
        this.dialogTitle = "修改账号";
      } else {

        this.sizeForm["bankName"]=this.bankName;
        this.sizeForm["bankNo"]=this.bankNo;
        this.currentHandle = "add";
        this.dialogTitle = "创建账号";
      }
      this.editorPopup = true;
    },
    //  新增  编辑  提交
    editorSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.currentHandle == "editor") {
            //  编辑操作
            console.info(this.sizeForm);
            this.$post("/epf-trade/transaccount/editTransAccount",this.sizeForm).then(res => {
              if (res.code ==0) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.queryDate();
              }else{
                //失败
                this.$message.error(res.msg);
                return;
              }
            });
          } else {
            //  新增操作
            this.sizeForm.bankId=this.bankId;
            if(this.sizeForm.isOutside==""||this.sizeForm.isOutside=="null"){
              this.sizeForm.isOutside=1
            }
            console.log(this.sizeForm.isOutside)
            console.info(this.sizeForm);
            this.$post("/epf-trade/transaccount/addTransAccount",this.sizeForm).then(res => {
              if (res.code ==0) {
                this.$message({
                  message: "成功新增一条数据!",
                  type: "success"
                });
                this.queryDate();
              }else{
                //失败
                this.$message.error(res.msg);
                return;
              }
            });
          }
          this.editorPopup = false;
        } else {
          return false;
        }
      });
    },

    //  查看银行
    seeBankInfo(row) {
      this.detailForm=row;
      this.detail = true;
    },

    //删除
    del(row){
      console.log(row.id);
      this.$confirm("确认删除该条的信息，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.$post("/epf-trade/transaccount/deleteTransAccount", {
              id: row.id
            }).then(res => {
              if (res.code ==0) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.queryDate();
              }else{
                //失败
                this.$message.error(res.msg);
                return;
              }
            });

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

  },
  computed: {
    newRender:function(){
      if(this.$route.query.bankId){
        this.bankId = this.$route.query.bankId;
      }
      //this.bankId=this.$route.query.bankId;
      this.bankName=this.$route.query.bankName;
      this.bankNo=this.$route.query.bankNo;
      var filters={"bankId":this.bankId};
      this.getTransAccountJson({
        page: this.pageNo,
        rows: this.pageSize,
        filters: filters
      });
    }
  },
};
</script>

<style scoped>


.m_title {
  height: 30px !important;
  line-height: 30px !important;
  padding-left: 15px;
  padding-top: 5px;
  color: rgb(63, 63, 63);
  font-size: 14px;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
.bankTopTab {
  height: 40px !important;
  padding-left: 0px;
  padding-top: 0px;
}
.bankTopTab .bankTabs {
  width: 100px;
  height: 40px;
  background: rgb(50, 58, 64);
  color: white;
  font-size: 16px;
  margin-left: 10px;
  line-height: 40px;
  text-align: center;
}
.el-tree > div {
  margin: 5px 0;
}
.bankTitle:hover {
  color: #409eff;
  cursor: pointer;
}
.iconList {
  height: 300px;
  background: #fff;
  overflow-y: auto;
}
.iconitem {
  width: 100px;
  height: 80px;
  text-align: center;
  float: left;
  border: 1px solid rgb(230, 227, 227);
  overflow: hidden;
}
.iconitem i {
  font-size: 30px;
}
.drapLine {
  position: absolute;
  top: 0;
  right: 0px;
  height: 100%;
  width: 8px;
  border-right: 1px solid rgb(224, 224, 224);
  cursor: e-resize;
  z-index: 100;
}
.detailCol {
  display: flex;
  flex-direction: row;
  height: 42px;
}
.detailLabel {
  width: 90px;
  padding-right: 12px;
  text-align: right;
  font-weight: 800;
}
.noSelect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
.input-with-select {
  max-width: 350px;
}
.bankfilter {
  min-height: 55px;
  padding: 20px 0px;
  margin: 5px 0px;
  margin-bottom: 30px;
  border: 1px solid rgb(224, 224, 224);
  display: flex;
  flex-direction: row;
  overflow-x: auto;
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
</style>

<style>
.menuManage_List .el-tree-node__content {
  margin-bottom: 5px;
}
.el-aside .el-main .bankList .el-tree-node:focus > .el-tree-node__content {
  color: rgb(0, 158, 221);
}
.bankfilter .el-input--small .el-input__inner {
  height: 34px;
}
.middleBox .canton_Regions .el-form-item__content {
  margin-left: 5px !important;
}
</style>

