<template>
<!-- 合同撤销 -->
  <div class="page-body">
    <div class="filter_wrap">
      <div class="dsDetailInfo_box">
        <div class="publish_main">
          <div class="publish_main_title">
            <div class="publish_title_icon f-left"></div>
            <h2 class="title f-left">合同撤销审核详情</h2>
          </div>
          <div class="publish_main_cont">
            <ul>
              <li>
                <div class="mainLeft">合同编号:</div>
                <div class="mainRight">
                  <el-input disabled="disabled" style="width:491px;" :placeholder="rules.code"></el-input>
                  <el-button type="primary" @click="preview()">预览</el-button>
                </div>
              </li>
              <li>
                <div class="mainLeft">
                  <span class="text_red">*</span>合同撤销原因:
                </div>
                <div class="mainRight">
                  <el-input
                    type="textarea"
                    :placeholder="rules.reason"
                    :disabled="disabled"
                    v-model="desc"
                    maxlength="200"
                    minlength="0"
                    show-word-limit
                    style="width:60%;height:120px;"
                  ></el-input>
                </div>
              </li>
              <li>
                <div class="mainLeft">合同撤销附件:</div>
                <div class="mainRight">
                  <div class="publishTra_main_cont publishTra_main_cont_last">
                    <!-- <table width="1104" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="text-align:center">序号</td>
                        <td>文件名称</td>
                        <td style="color: #333333;">文件</td>
                        <td style="color: #333333;">操作</td>
                      </tr>
                      <tr>
                        <td style="text-align:center">1</td>
                        <td>
                          <span class="text_red">*</span>合同撤销申请书
                        </td>
                        <td>合同撤销申请书.pdf</td>
                        <td>
                          <span>查看</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="text-align:center">2</td>
                        <td>
                          <span class="text_red">*</span>合同撤销申请人证件
                        </td>
                        <td>申请人身份证.pdf</td>
                        <td>
                          <span>查看</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="text-align:center">3</td>
                        <td>
                          <span class="text_red">*</span>合同甲方证件
                        </td>
                        <td>申请人身份证.pdf</td>
                        <td>
                          <span>查看</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="text-align:center">4</td>
                        <td>
                          <span class="text_red">*</span>合同原件
                        </td>
                        <td>合同扫描件.pdf</td>
                        <td>
                          <span>查看</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="text-align:center">5</td>
                        <td>
                          <span class="text_red">*</span>其他
                        </td>
                        <td>司法认定文书.pdf</td>
                        <td>
                          <span>查看</span>
                        </td>
                      </tr>
                    </table>-->
                    <!-- <p>说明：支持：.rar .zip .doc .docx .pdf .jpg格式</p> -->
                    <div style="width:100%">
                      <EPF-annexList
                        @seeFlie="methodFun()"
                        :tableType="true"
                        :tableNmae="tableNmae"
                        :belong="belong"
                        :areaCode="areaCode"
                        :fileSize="6"
                        :fileType="fileType"
                        :annexType="annexType"
                      ></EPF-annexList>
                    </div>
                    <div style="clear: both;"></div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="operation" style="margin-top:30px">
              <div class="search_input submit_input">取消</div>
              <div class="search_input" @click="examine(desc,obj,buttonView)">{{buttonView}}</div>
              <el-dialog title="审核" width="40%" :visible.sync="dialogForm" :append-to-body="true">
                <template>
                  <div id="dialog">
                    <actDialog :actInfo="actInfo" @patch="actResult" />
                  </div>
                </template>
              </el-dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
import qs from "qs";
import Bus from "../../../utils/bus";
import { mapActions } from "vuex";
import EPFAnnexList from "@/components/annexList/annexList.vue";
export default {
  components: { EPFAnnexList },
  data() {
    return {
      tableNmae: ["序号", "文件名", "文件", "操作"],
      belong: null,
      areaCode: null,
      fileType: ["jpg", "GIF", "png", "pdf", "zip", "docx"],
      annexType: "LAND",
      rules: {},
      desc: "",
      foldshow1: false,
      foldshow2: true,
      isdecisionNumFile: true,
      tabeDate: [
        {
          infoId: "李四",
          publishStatus: "通过",
          time: "2018.06.12 12:00:00 ",
          publishState: "audit",
          person: "--"
        },
        {
          infoId: "李四",
          publishStatus: "通过",
          time: "2018.06.12 12:00:00 ",
          publishState: "audit",
          person: "查看详情"
        }
      ],
      actInfo: {},
      obj: {
        businessId: "",
        procInsId: "",
        procDefId: "",
        taskId: ""
      },
      handleData: "",
      dialogForm: false,
      dialogDownLand: false,
      buttonView: "审核",
      contractId: null,
      disabled: false
    };
  },
  created() {
    this.getSelectOneData();
    this.init();
    this.contractId = this.$route.query.contractId;
    if (this.$route.query.view == 1) {
      this.buttonView = "查看审核结果";
      this.disabled = true;
    } else {
      this.buttonView = "审核";
      this.disabled = false;
    }
  },
  methods: {
    ...mapActions(["setTabsList"]),
    methodFun() {},
    getSelectOneData() {
      let token = sessionStorage.getItem("token");
      Axios.post(
        "/api/epf-contract/transContract/selectOne",
        qs.stringify({
          token: token,
          contractId: this.$route.query.contractId
        })
      ).then(res => {
        if (res.code == "0000") {
          this.rules = res.data.list[0];
          this.belong = res.data.list[0].fileId;
          this.areaCode = res.data.list[0].cantonArea;
        }
      });
    },
    init() {
      this.obj.businessId = this.$route.query.businessId;
      this.obj.procInsId = this.$route.query.procInsId;
      this.obj.procDefId = this.$route.query.procDefId;
      this.obj.taskId = this.$route.query.taskId;
      console.log(
        "1111111111111111111111111111111",
        this.obj.businessId,
        this.obj.procInsId,
        this.obj.procDefId,
        this.obj.taskId
      );
    },
    decisionNumFile() {
      this.isdecisionNumFile = false;
    },
    preview() {
      let routerPath = `/contractPreview?contractId=${this.$route.query.contractId}`;
      let title = "合同预览";
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({
        path: "/contractPreview",
        query: {
          contractId: this.$route.query.contractId
        }
      });
    },
    rowClickHandle(row, event, column) {
      console.log("双击行的id", row);
      // let routerPath = '/demandSupplyDetails?supply=' + row.id;
      // let tabObj = {routerPath}
      // //将当前点击的选项添加到vuex中

      // this.setTabsList(tabObj)
      // this.$router.push({path:'/demandSupplyDetails',query:{supply:row.id}})
    },
    examine(reason, obj, buttonView) {
      if (reason && reason !== null) {
        this.actInfo = null;
        this.actInfo = obj;
        this.dialogForm = true;

        if (buttonView == "审核") {
          this.$nextTick(() => {
            Bus.$emit("transferaudit", "examine"); //需要审核
          });
        } else {
          this.$nextTick(() => {
            Bus.$emit("transferaudit", "view"); //查看审核结果
          });
        }
      } else {
        this.$message.error("请填写合同撤销原因");
      }
    },
    actResult(re, node) {
      //取消：cancel，流转：success,流转结束：end,审核未通过：failed
      if (re === "cancel") {
        //取消关闭弹框，不做任何事件
      } else if (re === "success") {
        this.$bus.$emit("refreshPage", ["home"]);
        this.$bus.$emit("closeTabsItem", this.$route.name);
        //刷新页面
        this.reload();
      } else if (re === "failed") {
        //修改状态
        this.setState("failed");
        this.$bus.$emit("refreshPage", ["home"]);
        this.$bus.$emit("closeTabsItem", this.$route.name);
        //刷新页面
        this.reload();
      } else if (re === "end") {
        //修改状态
        this.setState("success");
        this.$bus.$emit("refreshPage", ["home"]);
        this.$bus.$emit("closeTabsItem", this.$route.name);
        //刷新页面
        this.reload();
      }
      this.dialogForm = false;
    },
    setState(state) {
      this.rules.contractStatus = "";
      if (state === "success") {
        this.rules.contractStatus = "contract_status-007";
      } else if (state === "failed") {
        this.rules.contractStatus = "contract_status-006";
      }
      let token = sessionStorage.getItem("token");
      //改变状态
      Axios.post(
        "/api/epf-contract/transContract/change",
        qs.stringify({
          token: token,
          contractId: this.contractId,
          status: this.rules.contractStatus
        })
      ).then(res => {
        console.log("改变状态");
        if (res.code != "0000") {
          //失败
          this.$message.error(res.msg);
          return;
        }
        //刷新页面
        this.reload();
      });
    },
    reload() {
      this.getSelectOneData();
    }
  },
  mounted() {
    //其他组件需要关闭标签页
    this.$bus.$on("closeTabsItem", val => {
      console.log(val);
      this.removeTab(val);
      this.refresh();
    });
    //刷新指定页面
    // this.$bus.$on("refreshPage", val => {
    //   this.needRefresh.push(...val);
    //   this.needRefresh = Array.from(new Set(this.needRefresh));
    // });
  }
};
</script>
<style lang="scss" scoped>
.text_red {
  color: red;
  margin-right: 5px;
  cursor: auto;
}
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.filter_wrap {
  .dsDetailInfo_box {
    .publish_main {
      @include size(100%, auto);
      box-sizing: border-box;
      padding: 0 24px;
      &_title {
        @include size(100%, 56px);
        background: #f5f7fa;
        box-sizing: border-box;
        padding: 0 24px;
        margin-top: 25px;
        .publish_title_icon {
          @include size(6px, 21px);
          background: #ffca73;
          border-radius: 3px;
          margin-top: 18px;
          margin-right: 12px;
        }
        .title {
          font-size: 16px;
          color: #333333;
          font-weight: bold;
          line-height: 56px;
        }
        .fold {
          font-size: 14px;
          color: #999999;
          line-height: 56px;
          cursor: pointer;
          span {
            margin-right: 10px;
          }
        }
      }
      &_cont {
        box-sizing: border-box;
        ul {
          li {
            display: flex;
            margin-top: 25px;
            .mainLeft {
              @include size(15%, auto);
              margin-right: 3%;
              text-align: right;
            }
            .mainRight {
              @include size(70%, auto);
            }
          }
        }
        // &_title {
        //   @include size(100%, 53px);
        //   box-sizing: border-box;
        //   padding: 0 23px;
        //   font-size: 15px;
        //   color: #606266;
        //   line-height: 53px;
        //   background-color: #f5f7fa;
        // }
        // .toolsTitlestate {
        //   color: #606266;
        //   font-size: 14px;
        //   font-weight: normal;
        // }
      }
    }
  }
}
.publishTra_main_cont {
  box-sizing: border-box;
  @include size(1200px, auto);
  // padding: 0 50px;
  margin: 0 auto;
  border-bottom: solid 1px #f3f3f3;
  table {
    border: 1px solid #f3f3f3;
    tr {
      @include size(100%, 50px);
      border-bottom: 1px solid #f3f3f3;
      &:nth-child(1) {
        background: #f2f5f7;
        td {
          font-weight: bold;
        }
      }
      td {
        text-align: left;
        color: #333333;
        font-size: 14px;
        &:nth-child(3) {
          color: #4671d5;
        }
        &:nth-child(4) {
          color: #4671d5;
        }
        .text_red {
          color: red;
          margin-right: 5px;
          cursor: auto;
        }
        span {
          // margin-right: 10px;
          cursor: pointer;
        }
      }
    }
  }
  p {
    margin: 18px 0 18px 0px;
    color: #999999;
  }
}
.publishTra_main_cont_last {
  border: none;
}
.operation {
  @include size(50%, auto);
  margin-left: 233px;
  .search_input {
    @include size(115px, 36px);
    background-color: #ffa000;
    border-radius: 3px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    cursor: pointer;
    margin-right: 24px;
    display: inline-block;
    // margin-left: 50px;
  }
  .submit_input {
    background: #fff;
    border: solid 1px #ffa000;
    color: #ffa000;
  }
}
</style>
<style>
#publishLandMapDialog .el-dialog .el-dialog__body {
  padding-top: 0px;
}
#publishLandMapDialog .el-dialog .el-dialog__header {
  padding-top: 10px;
  padding-bottom: 0px;
  text-align: center;
}

.filter_wrap .el-input--small .el-input__inner {
  height: 34px;
}
.filter_wrap .el-row {
  margin-bottom: 10px;
}
.filter_wrap .distpicker-address-wrapper select {
  width: 117px;
  height: 34px;
  font-size: 14px;
  line-height: 34px;
  padding: 0 10px;
}
.filter_wrap .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.filter_wrap .el-date-editor.el-input .el-input__icon {
  line-height: 30px;
  color: #8dc4f7;
}
.el-table th,
.el-table tr {
  /* border:1px solid #ebeef5; */
}
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
</style>
