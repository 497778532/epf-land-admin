<template >
  <div
    class="activity-dialog"
    v-loading="loading"
    element-loading-text="数据加载中"
    element-loading-background="rgba(255, 255, 255,0.95)"
  >
    <img style="width:100%" :src="actPhoto" />

    <el-form ref="form" :model="form" >
      <el-form-item :hidden="isView" label="节点选择：">
        <el-checkbox
          @change="onRadioChange(node.nodeId,node)"
          v-for="node in form.nodes"
          :key="node.nodeId"
          :label="node.nodeName"
          v-model="node.checked"
          v-bind:disabled="actDataType.isOnChange"
        >
          {{node.nodeName}}
          <el-tag
            size="mini"
            @click="onChangeHandingUser(node.nodeId,node)"
          >{{node.excutionUserName}}</el-tag>
        </el-checkbox>
      </el-form-item>
      <el-form-item :hidden="isView" label="审核结果：">
        <el-radio-group v-model="assessor">
          <el-radio style="margin-left:10px;" label="audit_success">审核通过</el-radio>
          <el-radio style="margin-left:10px;" label="audit_failed">审核未通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :hidden="isView" label="审核意见：" prop="opinion">
        <el-input type="textarea" @change="opinionMsg" placeholder="请输入您的审核意见,200字以内" v-model="form.opinion"></el-input>
      </el-form-item>
      <el-form-item :hidden="isView">
        <el-button @click="result('cancel')">取消</el-button>
        <el-button type="primary" @click="examineSure">确定</el-button>
      </el-form-item>
      <el-table :data="form.histoicFlowList" border style="width: 100%">
        <el-table-column prop="taskName" label="执行环节" width="100"></el-table-column>
        <el-table-column prop="assigneeName" label="执行人" width="100"></el-table-column>
        <el-table-column prop="beginDate" label="开始时间" width="100"></el-table-column>
        <el-table-column prop="endDate" label="结束时间" width="100"></el-table-column>
        <el-table-column prop="durationTime" label="任务历时"></el-table-column>
        <el-table-column prop="comment" label="审批意见" width="200"></el-table-column>
      </el-table>
    </el-form>

    <el-dialog title="选择人员" width="40%" :visible.sync="userDialogForm " :append-to-body="true">
      <template>
        <div id="userDialog">
          <UserSelection :taskNodeInfo="taskNodeInfo" @patch="selectUserResult" modal="false"></UserSelection>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import Axios from "axios";
import qs from "qs";
import Bus from "../../utils/bus";
import UserSelection from "../userSelection";

export default {
  name: "activityDialog",
  props: { actInfo: { type: Object, default: {} } },
  components: {
    UserSelection: UserSelection
  },
  mounted() {
    this.$bus.$on("transferaudit", val => {
      this.init(val);
    });
  },
  data() {
    return {
      name: "",
      loading: true,
      actPhoto: "",
      form: {
        assessor: "audit_success",
        opinion: "",
        nodes: [],
        histoicFlowList: []
      },
      selected: "",
      isView: false,
      userDialogForm: false,
      userObj: {},
      taskNodeInfo: {},
      users: "",
      assessor: "audit_success",
      actDataType: { isOnChange: false, isJointly: false, nextNodeType: false }, // activity流程数据对象
    }
  },
  methods: {
    opinionMsg(){
      if(this.form.opinion.length >200){
         this.$message.error("审核意见的字符在1-200之间");
         return
      }
    },
    init(val) {
      this.loading = true;
      let that = this;
      let actInfo = this.actInfo;
      if (val === "view") {
        that.isView = true;
      } else {
        that.isView = false;
      }
      let jsonVars = "{'test':'test'}";
      // -------------新接口---------------
      this.$post("/epf-activiti/act/task/getActdialogData", {
        taskId: actInfo.taskId,
        procInsId: actInfo.procInsId,
        jsonVars:jsonVars
      }).then(res => {
        if(res.code !== 0){
            //失败
            this.$message.error(res.msg);
            return;
          }
          console.log(res);
          let nninfos = res.nodes;
          let nodeInfos = [];
          let nodeChecked = res.nextTaskNodeType;
          let isOnchanged = res.endInclusion;
          that.actDataType.isJointly = res.isJointly; // 是否是会签
          if (isOnchanged) {
            that.actDataType.isOnChange = true;
          }
          that.actDataType.nextNodeType = nodeChecked;
          for (let i = 0; i < nninfos.length; i++) {
            if (nninfos[i] != null) {
              if (nodeChecked) {
                nninfos[i]["checked"] = true;
              } else {
                if (i == 0) {
                  nninfos[i]["checked"] = true;
                  this.selected = res.nodes[0].nodeId; //默认第一个
                  this.name = res.nodes[0].excutionUserName;
                  this.assessor = "audit_success"; //默认第一个
                } else {
                  nninfos[i]["checked"] = false;
                }
              }
              nodeInfos.push(nninfos[i]);
            }
          }
          that.form.nodes = nodeInfos;
          that.actPhoto = "";
          that.actPhoto =
            "/api/epf-activiti/act/task/trace/photo?procDefId=" +
            actInfo.procDefId +
            "&execId=" +
            actInfo.procInsId +
            "&random=" +
            Math.random() * 10;
          //查询意见
          that.form.histoicFlowList = res.histoicFlowList;
          that.$forceUpdate();
          that.loading = false;
        });
    },
    onRadioChange(nodeId, node) {
      this.name = node.excutionUserName;
      this.selected = nodeId;
      // 如果是非包容网关、且非会签节点，只能单选
      if (this.actDataType["isOnChange"] && !this.actDataType.isJointly) {
        return;
      }
      if (!this.actDataType.nextNodeType) {
        let nodeInfos = this.form.nodes;
        let changeNode = [];
        for (let i = 0; i < nodeInfos.length; i++) {
          if (nodeInfos[i].nodeId != nodeId) {
            nodeInfos[i]["checked"] = false;
          }
          changeNode.push(nodeInfos[i]);
          this.form.nodes = changeNode;
        }
      }
    },
    // 选人
    onChangeHandingUser: function(nodeId, node) {
      if (this.actDataType["isOnChange"]) {
        this.userDialogForm = false;
      } else {
        this.userDialogForm = true;
        this.taskNodeInfo = {
          nodeId: nodeId,
          selectType: this.actDataType.isJointly ? "1" : 0,
          users: node.excutionUser
        };
      }
    },
    selectUserResult: function(taskUserInfo) {
      this.userDialogForm = false;
      let taskNodes = this.form.nodes;
      let nodes = [];
      let changerUser = taskUserInfo.taskExeUsers;
      let selectType = taskUserInfo.taskNodeInfo.selectType;
      let seUserName = "";
      let seUserId = "";
      if (selectType == "0") {
        // 单选
        seUserName = changerUser[0].realname;
        seUserId = changerUser[0].id;
      } else if (selectType == "1") {
        // 一个节点有多个办理人员，即可以选择多人
        let U_SIZE = changerUser.length;
        for (let i = 0; i < U_SIZE; i++) {
          if (i == 0) {
            seUserName = changerUser[i].realname;
            seUserId = changerUser[i].id;
          } else {
            seUserName += "," + changerUser[i].realname;
            seUserId += "," + changerUser[i].id;
          }
        }
      }
      let changeNodeId = taskUserInfo.taskNodeInfo.nodeId;
      let N_SIZE = taskNodes.length;
      for (let i = 0; i < N_SIZE; i++) {
        let tNode = taskNodes[i];
        let nodeId = tNode.nodeId;
        if (nodeId == changeNodeId) {
          tNode.excutionUserName = seUserName;
          tNode.excutionUser = seUserId;
          tNode.checked = true;
        }
        nodes.push(tNode);
      }
      this.form.nodes = nodes;
    },
    result(state) {
      //取消：cancel，流转：success,流转结束：end,审核未通过：failed
      this.$emit("patch", state, this.selected);
    },
    examineSure() {
      let taskId = this.actInfo.taskId;
      let procInsId = this.actInfo.procInsId;
      let comment = this.form.opinion;
      let selNode = this.selected;
      if (comment == null || comment == "") {
        this.$message.error("请填写审核意见。");
        return;
      }
      if(comment.length > 200){
         this.$message.error("审核意见不可超过200个字符。");
         return
      }
      if (this.assessor === "audit_failed") {
        //审核失败
        //结束流程
        this.$post("/epf-activiti/act/task/deleteTask", {
          taskId: taskId,
          procInsId: procInsId,
          reason: comment
        }).then(res => {
          //点击确定，清空输入的信息
          this.form.opinion = "";

          if (res.code != "0") {
            //失败
            this.$message.error(res.msg);
            return;
          }
          this.jsonVars = "";
          this.$message({
            message: "审核完成",
            type: "success"
          });
          this.result("failed"); //审核失败
        });
      } else if (this.assessor === "audit_success") {
        //审核成功
        let valParams = {};
        let nodeExcutes = [];
        for (let i = 0; i < this.form.nodes.length; i++) {
          let ndExE = {};
          let node = this.form.nodes[i];
          let executionNode = "NAME_" + node.nodeId;
          let executionNodeUser = node.excutionUser;
          let elNode = "EL_" + node.nodeId;
          let elNodeValue = false;
          valParams[executionNode] = executionNodeUser;
          if (node.checked) {
            elNodeValue = true;
          }
          ndExE["nodeIds"] = node.nodeId;
          ndExE["nodeUsers"] = node.excutionUser;
          nodeExcutes.push(ndExE);
          valParams[elNode] = elNodeValue;
        }
        valParams["nodeExcutes"] = JSON.stringify(nodeExcutes);
        let jsonVars = JSON.stringify(valParams);
        this.$post("/epf-activiti/act/task/complete", {
          taskId: taskId,
          procInsId: procInsId,
          comment: comment,
          jsonVars: jsonVars
        }).then(res => {
          if (res.code != "0") {
            this.$message.error(res.msg);
            return;
          }
          this.jsonVars = "";
          this.$message({ message: "审核完成", type: "success" });
          //判断是否是最后一个环节
          for (var i = 0; i < this.form.nodes.length; i++) {
            var node = this.form.nodes[i];
            if (node.nodeId === "end") {
              //修改状态为审核通过
              this.result("end");
            } else {
              //继续流转
              this.result("success");
            }
          }
          this.form = {};
        });
      }
    }
  }
};
</script>
<style lang="scss" type="text/css" scoped>
.activity-dialog{
  /deep/ .el-table .cell{
    white-space: normal;
  }
}

</style>
