<template>
  <div class="activity-dialog" v-loading="loading" element-loading-text="数据加载中"
       element-loading-background="rgba(255, 255, 255,0.95)">
    <img style="width:100%" :src="actPhoto"/>
    <el-form ref="form" :model="form" label-width="120px">
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
          >{{node.excutionUserName}}
          </el-tag>
        </el-checkbox>
      </el-form-item>
      <el-form-item :hidden="isView" label="审核结果：">
        <el-radio-group v-model="assessor">
          <el-radio style="margin-left:10px;" label="audit_success">审核通过</el-radio>
          <el-radio style="margin-left:10px;" label="audit_failed">审核未通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :hidden="isView" label="审核意见：" prop="opinion">
        <el-input type="textarea" @change="opinionMsg" placeholder="请输入您的审核意见,200字以内" maxlength="200" v-model="form.opinion"></el-input>
      </el-form-item>
      <el-form-item :hidden="isView" label="意见附件：" prop="opinion"  style="cursor: pointer">
        <div border style="width: 100%;margin-top: 10px;font-size: 12px;" v-for="fdata of commentFiles" :key="fdata.fileId">
          <el-link type="success" :href="downLoadFileUrl+fdata.fileId">{{fdata.fileName}} </el-link>
          <i class="el-icon-delete el-icon--right" style="margin-right: 20px;" @click="deleteFile(fdata.fileId)"/>
        </div>
      </el-form-item>
      <el-form-item :hidden="isView" label="意见上传：">
        <el-upload
          :disabled="isView"
          class="avatar-uploader"
          action="/epf-document/document/upload"
          name="files"
          :show-file-list="false"
          :http-request="actCommentFileUpload"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <i  class="el-icon-plus avatar-uploader-icon imageIcon"/>
        </el-upload>
      </el-form-item>
      <el-form-item :hidden="isView">
        <el-button type="primary" @click="examineSure">确定</el-button>
        <!-- <el-button type="success" @click="rejectActProcess('upper')">驳回至上一级</el-button>
        <el-button type="success" @click="rejectActProcess('starter')">驳回至发起人</el-button> -->
        <el-button type="" @click="result('cancel')">取消</el-button>
      </el-form-item>
      <el-table :data="form.histoicFlowList" border style="width: 100%;margin-top: 10px;font-size: 12px;text-align: center">
        <el-table-column prop="taskName" label="执行环节" width="100"></el-table-column>
        <el-table-column prop="assigneeName" label="执行人" width="100"></el-table-column>
        <el-table-column prop="beginDate" label="开始时间" width="100"></el-table-column>
        <el-table-column prop="endDate" label="结束时间" width="100"></el-table-column>
        <el-table-column prop="durationTime" label="任务历时"></el-table-column>
        <el-table-column prop="comment" label="审批意见"></el-table-column>
        <el-table-column prop="cmtFiles" label="附件">
          <template slot-scope="scope">
            <el-link type="success"
                     v-for="fdata of scope.row.cmtFiles"
                     :key="fdata.fileId"
                     :href="downLoadFileUrl+fdata.fileId"
                    v-if="scope.row.cmtFiles.length>0">{{fdata.fileName}} </el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <el-dialog title="选择人员" width="40%" :visible.sync="userDialogForm " :append-to-body="true">
      <template>
        <div id="userDialog">
          <userSelection :taskNodeInfo="taskNodeInfo" @patch="selectUserResult" modal="false"/>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">

export default {
  name: "activityDialog",
  props: {actInfo: {type: Object}},
  components: {},
  data() {
    return {
      name: "",
      loading: true,
      actPhoto: "",
      form: {assessor: "audit_success", opinion: "", nodes: [], histoicFlowList: []},
      selected: "",
      isView: false,
      userDialogForm: false,
      userObj: {},
      taskNodeInfo: {},
      users: "",
      assessor: "audit_success",
      actDataType: {isOnChange: false, isJointly: false, nextNodeType: false}, // activity流程数据对象
      commentFiles: [], // 意见附件数组
      downLoadFileUrl: this.$API.EPF_DOCUMENT.IMAGESRC
    };
  },
  created() {
    this.init();
  },
  methods: {
    opinionMsg() {
      if (this.form.opinion.length > 200) {
        this.$message.error("审核意见的字符在1-200之间");
        return;
      }
    },
    init() {
      let that = this;
      this.loading = true;
      let actInfo = this.actInfo;
      that.isView = actInfo["handlerType"] === "view";
      this.$post("/epf-activiti/act/dialog/queryDialogData", {taskId: actInfo.taskId, procInsId: actInfo.procInsId}).then(res => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        that.actDataType = res.actDataType;
        that.selected = res.selected; //默认第一个
        that.name = res.name;
        that.assessor = res.assessor; //默认第一个
        that.form = res.form;
        that.actPhoto = res.actPhoto;
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
    onChangeHandingUser(nodeId, node) {
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
    selectUserResult(taskUserInfo) {
      let that = this;
      that.userDialogForm = false;
      that.$post("/api/epf-activiti/act/dialog/selectUserResult", {"taskNodes": JSON.stringify(this.form.nodes), "taskUserInfo": JSON.stringify(taskUserInfo)}).then(res => {
        that.form.nodes = res.nodes;
      });
    },
    result(state) {
      /**
         * 取消：cancel，流转：success,流转结束：end,审核未通过：failed
         */
      this.$emit("patch", state, this.selected);
    },
    /**
       * @see 审批方法
       */
    examineSure() {
      let that = this;
      let comment = this.form.opinion;
      let checkNoPass = (comment == null || comment == "") && (!that.commentFiles.length > 0);
      if (checkNoPass) {
        that.$message.error("请填写审核意见。");
        return;
      }
      if (comment.length > 200) {
        that.$message.error("审核意见不可超过200个字符。");
        return;
      }
      let taskId = this.actInfo.taskId;
      let procInsId = this.actInfo.procInsId;
      let requestObj = {taskId: taskId,
        procInsId: procInsId,
        assessor: this.assessor,
        userId: "",
        comment: comment,
        executeNodes: JSON.stringify(that.form.nodes),
        commentFileObj: JSON.stringify(this.commentFiles)
      };
      that.$post("/epf-activiti/act/task/transferProcess", requestObj).then(res => {
        //点击确定，清空输入的信息
        that.form.opinion = "";
        if (res.code != "0") { this.$message.error(res.msg); return; }
        this.auditHandler();
      });
    },

    /**
     * upper：驳回上一级，starter：驳回至上一级，error：驳回失败
     *@see 驳回提交数据
     */
    rejectActProcess(rejectType) {
      let that = this;
      let comment = this.form.opinion;
      let checkNoPass = (comment == null || comment == "") && (!that.commentFiles.length > 0);
      if (checkNoPass) {
        that.$message.error("请填写审核意见。");
        return;
      }
      if (comment.length > 200) {
        that.$message.error("审核意见不可超过200个字符。");
        return;
      }
      let handleData = {taskId: that.actInfo.taskId, procInsId: that.actInfo.procInsId, comment: comment, rejectType: rejectType};
      that.$post(that.$API.EPF_ACTIVITI.ACT.REJECT, handleData).then(res => {
        that.form.opinion = "";
        if (res.code != "0") {
          this.$message.error(res.msg);
          rejectType = "error";
        }
        this.rejectHandler(rejectType);
      });
    },
    /**
       * @see 审核状态处理
       */
    auditHandler() {
      this.jsonVars = "";
      this.$message({ message: "审核完成", type: "success" });
      if (this.assessor === "audit_failed") {
        this.result("failed"); //审核失败
      } else if (this.assessor === "audit_success") {
        this.auditSucess();
      }
    },
    /**
     * upper：驳回上一级，starter：驳回至上一级，error：驳回失败
     *@see 驳回处理
     */
    rejectHandler(rejectType) {
      //驳回后处理
      this.result(rejectType);
    },

    /**
       * @see 审核成功处理
       */
    auditSucess() {
      //判断是否是最后一个环节
      for (let i = 0; i < this.form.nodes.length; i++) {
        let node = this.form.nodes[i];
        if (node.nodeId === "end") {
          //修改状态为审核通过
          this.result("end");
        } else {
          //继续流转
          this.result("success");
        }
      }
      this.form = {};
    },
    actCommentFileUpload(files) {
      let that = this;
      const file = files.file;
      const formData = new FormData();
      formData.append("files", file);
      that.$useAppend(that.$API.EPF_DOCUMENT.UPLOAD, formData).then(res => {
        files.onProgress(file);
        if (res.state != "SUCCESS") {
          that.$message.error("图片上传失败，请重新上传");
          return null;
        }
        that.handlerCommentFiles(res.data[0], "add");
        files.onSuccess(res);
      });
    },
    handleAvatarSuccess(res, file) {

    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      return isLt2M;
    },
    handlerCommentFiles(data, type) {
      if (type === "add") {
        this.commentFiles.push({taskId: "", fileId: data.id, fileName: data.name});
      } else {
        let cmtFiles = this.commentFiles;
        let afterAll = [];
        for (let i = 0, s = cmtFiles.length; i < s; i++) {
          if (data === cmtFiles[i].fileId) {
            continue;
          }
          afterAll.push(cmtFiles[i]);
        }
        this.commentFiles = afterAll;
      }
    },
    deleteFile(id) {
      let that = this;
      let url = this.$API.EPF_DOCUMENT.DEL_BYID;
      that.$post(url, {id: id}).then(res => {
        if (res.state != "SUCCESS") {
          that.$message.warning(res.msg);
          return;
        }
        that.$message.success(res.msg);
        that.handlerCommentFiles(id, "del");
      });
    },
    windowOpen(url) {
      window.open(url);
    }
  }
};
</script>
<style type="text/css">
  .avatar-uploader {
    border: 1px dashed #87CEEB;
    width: 28px;
    height: 28px;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
  }
</style>
