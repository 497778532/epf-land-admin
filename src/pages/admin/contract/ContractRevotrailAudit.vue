<template>
	<!-- 合同撤销 -->
	<div class="page-body">
		<div class="filter_wrap">
			<div class="dsDetailInfo_box">
				<div class="publish_main">
					<div class="publish_main_title">
						<div class="publish_title_icon f-left"></div>
						<h2 class="title f-left">{{title}}</h2>
					</div>
					<div class="publish_main_cont" style="margin-top:30px;">
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
							<el-form-item label="合同编号">
								<el-input v-model="ruleForm.code" :disabled="true" style="width:491px;"></el-input>
								<el-button type="primary" @click="preview()">预览</el-button>
							</el-form-item>
							<el-form-item label="合同撤销原因" prop="reason">
								<el-input type="textarea" v-model="ruleForm.reason" 
                      maxlength="200"
                      minlength="0"
                      show-word-limit :disabled="disabled" style="width:60%;height:120px;"></el-input>
							</el-form-item>
							<el-form-item label="合同撤销附件">
								<div style="width:80%">
									<EPF-annexList @isAux='isAuxFun' :tableType="tableType" :tableNmae="tableNmae" :belong="belong" :areaCode="areaCode" :fileSize="6" :fileType="fileType" :annexType="annexType" v-if="belong!==''&&areaCode!==''"></EPF-annexList>
								</div>
							</el-form-item>
							<el-form-item>
								<el-button type="warning" plain style="width: 98px;" @click="cancal()">取消</el-button>
								<el-button type="warning" style="width: 98px;" @click="submitForm('ruleForm')" v-if="title=='合同撤销申请'">确认提交</el-button>
								<el-button type="warning" style="width: 120px;" @click="examine(obj,buttonView)" v-else>{{buttonView}}</el-button>
								<el-dialog :title="buttonView" width="40%" :visible.sync="dialogForm" :append-to-body="true">
									<template>
										<div id="dialog">
											<actDialog :actInfo="actInfo" @patch="actResult" />
										</div>
									</template>
								</el-dialog>
							</el-form-item>
						</el-form>
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
		components: {
			EPFAnnexList
		},
		data() {
			return {
				routerPath:'',
				// 文件上传
				tableNmae: ["序号", "文件名", "文件", "操作"],
				belong: "", //请求参数 - 附件所属标识（必传）
				areaCode: "", //请求参数 - 区域标识（必传）
				fileType: ["rar", "zip", "doc", "docx", "pdf", "jpg", "png"],
				annexType: "HT_HTCXFJ",
				tableType: false,
				title: "合同撤销审核详情",
				// rules: {},/
				remnant: "0",
				tabeDate: [],
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
				contractType: null,
				disabled: false,
				isAuxFlag: false,
				ruleForm: {
					code: "",
					reason: "",
					approvalFileId: "",
					tradingInstitutionsID: ""
				},
				rules: {
					reason: [
						{
							required: true,
							message: "请输入合同撤销原因"
						},
						{
				            min: 0,
				            max: 200,
				            message: "长度在 200 个字符以内"
				        }
					]
				}
			};
		},
		created() {
			this.contractId = this.$route.query.contractId;
			this.contractType = this.$route.query.contractType;
			this.title = this.$route.query.auditStateTitle;
			if(this.$route.query.auditStateTitle == "合同撤销申请") {
				this.title = "合同撤销申请";
				this.disabled = false;
				this.tableType = false;
			} else if(this.$route.query.auditStateTitle == "合同撤销审核") {
				this.title = "合同撤销审核";
				this.buttonView = "审核";
				this.disabled = true;
				this.tableType = true;
			} else if(this.$route.query.auditStateTitle == "合同撤销审核详情") {
				this.title = "合同撤销审核详情";
				this.disabled = true;
				this.tableType = true;
				if(this.$route.query.isExamine == '1'){
					this.buttonView = "审核";
				}else{
					this.buttonView = "查看审核结果";
				}
				
			}
		},
		methods: {
			...mapActions(["setTabsList"]),
			isAuxFun(value){
				this.isAuxFlag = value;
			},
			// 拿数据
			getSelectOneData() {
				let token = sessionStorage.getItem("token");
				var that = this;
				Axios.post(
					"/api/epf-contract/transContract/selectOne",
					qs.stringify({
						token: token,
						contractId: this.$route.query.contractId
					})
				).then(res => {
					if(res.code == "0000") {
						that.ruleForm = res.data.list[0];
						that.areaCode = res.data.list[0].cantonCode;
						console.log("=====res.data.list[0]====", res.data.list[0]);
						console.log(
							"=====res.data.list[0].cantonCode====",
							res.data.list[0].cantonCode
						);
						console.log("===that.tableType===", that.tableType);
						// 合同撤销申请
						if(that.tableType == false) {
							that.ruleForm.reason = "";
							Axios.get(
								"/api/epf-supply/api/createId",
								qs.stringify({
									token: token
								})
							).then(res => {
								that.ruleForm.approvalFileId = res.id;
								that.belong = res.id;
							});
						} else if(that.tableType == true) {
							that.belong = res.data.list[0].approvalFileId;
						}
					}
				});
			},
			init() {
				this.obj.businessId = this.$route.query.businessId;
				this.obj.procInsId = this.$route.query.procInsId;
				this.obj.procDefId = this.$route.query.procDefId;
				this.obj.taskId = this.$route.query.taskId;
			},
			// 提交
			submitForm(formName) {
				if (!this.isAuxFlag) {
					this.$message.error("请检查您的附件清单信息是否上传完整！");
					return;
				}
				this.$refs[formName].validate(valid => {
					if(valid) {
						var procDefKey = "transaction_filing"; //启动流程类型
						var orgId = this.ruleForm.tradingInstitutionsID;
						//        let businessType = "supplay_platom";
						let businessType = "contract";
						//获取启动节点信息
						Axios.post(
							"/api/epf-activiti/act/task/getPvmNextNodeId",
							qs.stringify({
								nodeId: "start",
								procDefKey: procDefKey,
								orgId: orgId,
								businessType: businessType
							})
						).then(res => {
							if(res.code != "0") {
								this.$message.error(res.msg);
							}
							var jsonVars =
								"{NAME_" +
								res.nodes[0].nodeId +
								":'" +
								res.nodes[0].excutionUser +
								"',procDefKey:'" +
								procDefKey +
								"',businessType:'" +
								businessType +
								"'}";
							//          console.log(jsonVars);
							let token = sessionStorage.getItem("token");
							///合同状态更改接口有问题
							Axios.post(
								"/api/epf-contract/transContract/change",
								qs.stringify({
									token: token,
									jsonVals: jsonVars,
									contractId: this.contractId,
									status: "contract_status-003",
									reason: this.ruleForm.reason,
									approvalFileId: this.ruleForm.approvalFileId,
									orgId: orgId
								})
							).then(res => {
								if(res.code == "0000") {
									if(this.ruleForm.reason != "") {
										this.$message({
											message: "提交成功",
											type: "success"
										});
//										this.$bus.$emit("refreshPage", ["home"]);
										this.$bus.$emit("closeTabsItem", this.$route.name);

									} else {
										this.$message({
											message: "请填写撤销原因",
											type: "warning"
										});
										return false;
									}
								}
							});
						});
					} else {
						this.$message({
							message: "请检查您的信息是否正确填写",
							type: "warning"
						});
						return false;
					}
				});
			},
			// 取消
			cancal() {
//				this.$bus.$emit("refreshPage", ["home"]);
				this.$bus.$emit("closeTabsItem", this.$route.name);
			},
			// 预览合同
			preview() {
				var routerPath, path;
				if(this.contractType == "transfer") {
					path = "/transferContractTemplate";
				} else if(this.contractType == "rental") {
					path = "/rentalContractTemplate";
				} else if(this.contractType == "mortgage") {
					path = "/mortgageContractTemplate";
				}
				routerPath = `${path}?contractId=${this.contractId}&contractView=1`;
				let title = "合同预览";
				let tabObj = {
					title,
					routerPath
				};
				this.setTabsList(tabObj);
				this.$router.push({
					path: path,
					query: {
						contractId: this.contractId,
						contractView: 1
					}
				});
			},
			// 审核
			examine(obj, buttonView) {
				this.actInfo = null;
				this.actInfo = obj;
				this.dialogForm = true;

				if(buttonView == "审核") {
					this.$nextTick(() => {
						Bus.$emit("transferaudit", "examine"); //需要审核
					});
				} else {
					this.$nextTick(() => {
						Bus.$emit("transferaudit", "view"); //查看审核结果
					});
				}
			},
			actResult(re, node) {
				//取消：cancel，流转：success,流转结束：end,审核未通过：failed
				if(re === "cancel") {
					//取消关闭弹框，不做任何事件
				} else if(re === "success") {
//					刷新页面
//					this.$bus.$emit("refreshPage", ["home"]);
//					关闭当前窗口
					this.$bus.$emit("closeTabsItem", this.$route.name);
					
//					判断前一页路径，打开相应窗口
					if(this.$route.query.contractType=='transfer'){
						let routerPath = "transferSignContract";
				        let title = "转让合同申请列表";
				        let tabObj = { title, routerPath};
				        this.setTabsList(tabObj);
				        setTimeout(() => {
				            this.$router.push({ path: routerPath})
				        }, 100);
					}else if(this.$route.query.contractType=='rental'){
						let routerPath = "rentalSignContract";
				        let title = "出租合同申请列表";
				        let tabObj = { title, routerPath};
				        this.setTabsList(tabObj);
				        setTimeout(() => {
				            this.$router.push({ path: routerPath})
				        }, 100);
					}else if(this.$route.query.contractType=='mortgage'){
						let routerPath = "mortgageSignContract";
				        let title = "抵押合同申请列表";
				        let tabObj = { title, routerPath};
				        this.setTabsList(tabObj);
				        setTimeout(() => {
				            this.$router.push({ path: routerPath})
				        }, 100);
					}
				} else if(re === "failed") {
					//修改状态
					this.setState("failed");
//					this.$bus.$emit("refreshPage", ["home"]);
					this.$bus.$emit("closeTabsItem", this.$route.name);
					//刷新页面
					this.reload();
				} else if(re === "end") {
//      	判断relevanceCode 1（自行交易-是）、2（委托交易-是）、3（交易-否）
					if(this.ruleForm.relevanceCode == '1') {
						Axios.post(
							"/api/epf-supply/admin/tsell/updateContractNetSignStatusByTsellId",
							qs.stringify({
								id: this.ruleForm.relevanceId,
								status: 0
							})
						).then(res => {
							if(res.data.code == "0") {
								this.$message.success(res.data.msg);
							} else {
								this.$message.error(res.data.msg);
							}
						})
					} else if(this.ruleForm.relevanceCode == '2') {
						Axios.post(
							"/api/epf-trade/admin/transgoods/updateContractNetSignStatusByGoodsId",
							qs.stringify({
								id: this.ruleForm.relevanceId,
								status: 0
							})
						).then(res => {
							if(res.data.code == "0") {
								this.$message.success(res.data.msg);
							} else {
								this.$message.error(res.data.msg);
							}
						})
					}

					//修改状态
					this.setState("success");
//					this.$bus.$emit("refreshPage", ["home"]);
					this.$bus.$emit("closeTabsItem", this.$route.name);
					//刷新页面
					this.reload();
				}
				this.dialogForm = false;
			},
			//改变状态
			setState(state) {
				this.rules.contractStatus = "";
				if(state === "success") {
					this.rules.contractStatus = "contract_status-007";
				} else if(state === "failed") {
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
					if(res.code != "0000") {
						//失败
						this.$message.error(res.msg);
						return;
					}
					//刷新页面
					this.reload();
				});
			},
			// 刷新
			reload() {
				this.getSelectOneData();
			}
		},
		watch: {
			belong(newVal, oldVal) {
				this.belong = newVal;
			}
		},
//		路由监听
		beforeRouteEnter(to,from,next) {
		    console.log(from.path.substr(1));
		    next();
		},
		mounted() {
			this.getSelectOneData();
			this.init();
			//其他组件需要关闭标签页
			this.$bus.$on("closeTabsItem", val => {
				console.log(val);
				this.removeTab(val);
				this.refresh();

			});
			//刷新指定页面
//			this.$bus.$on("refreshPage", val => {
//				this.needRefresh.push(...val);
//				this.needRefresh = Array.from(new Set(this.needRefresh));
//			});
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