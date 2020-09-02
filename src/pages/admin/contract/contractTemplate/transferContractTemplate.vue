<template>
	<!-- 转让合同模板 -->
	<div class="signatureDetails_warp">
		<div class="signatureDetails_left" :class="searchBarFixed == true ? 'isFixed' :''">
			<ul>
				<li v-for="(item,index) in detailsleftData" :key="index" @click="selectli(index)" :class="{liActive:statekey===index}">{{item}}</li>
			</ul>
		</div>
		<div class="signatureDetails_list">
			<div style="margin: 10px auto;width: 100%;height: 40px;" v-if="this.contractView">
				<el-button type="warning" plain style="width: 98px;float: right;margin-left: 10px;" @click="downUp()">下载</el-button>
				<el-button type="warning" plain style="width: 98px;float: right;" @click="printing()">打印</el-button>
			</div>
			<div class="signatureDetails_cont signlist0 signlist1">
				<div ref="imageWrapper" style="padding: 20px;">
				<div class="signNum">
					<div class="signNumCon">
						<p v-if="transferTempData.contractStatus !== 'contract_status-008' && transferTempData.contractStatus !== 'contract_status-005'">合同编号：{{transferTempData.code?transferTempData.code:''}}</p>
						<p v-if="transferTempData.contractStatus == 'contract_status-008' || transferTempData.contractStatus =='contract_status-005'">合同统一编码：{{transferTempData.recordNo}}</p>
					</div>
				</div>
				<div class="signtitle" v-if="transferTempData.contractType == 'transfer'">
					{{transferTempData.contractName}}
					<!-- 草稿-002/撤销审核中-003/审核中-004/合同已撤销-007 -->
					<div v-if="transferTempData.contractStatus=='contract_status-002'||transferTempData.contractStatus=='contract_status-003'||transferTempData.contractStatus=='contract_status-004'||transferTempData.contractStatus=='contract_status-007'" class="contractCancel">{{transferTempData.contractStatusName}}</div>
					<!-- 审核通过-005/鉴证成功-008 -->
					<div v-if="transferTempData.contractStatus=='contract_status-005'||transferTempData.contractStatus=='contract_status-008'" class="contractsuccess">{{transferTempData.contractStatusName}}</div>
					<!-- 审核未通过-006/鉴证失效-009 -->
					<div v-if="transferTempData.contractStatus=='contract_status-006'||transferTempData.contractStatus=='contract_status-009'" class="contractnosuccess">{{transferTempData.contractStatusName}}</div>
				</div>
				<div class="signDetail">
					<el-form :model="transferTempData"  class="demo-form-inline" :inline="true" label-position="left">
						<el-form-item label="甲方(转让方)：" required  style="width:96%" class="lineWid">
							<div>{{transferTempData.firstParty}}</div>
						</el-form-item>
						<el-form-item label="甲方证件类型："  required :style="{'width':formLabelWidth}" >
							<div>{{transferTempData.firstIdentificationTypeName}}</div>
						</el-form-item>
						<el-form-item :label="transferTempData.firstIdentificationTypeName+'：'"  required :style="{'width':formLabelWidth}">
							<div>{{transferTempData.firstIdentificationNum}}</div>
						</el-form-item>
						<el-form-item label="法定代表人：" required :style="{'width':formLabelWidth}"  v-if="transferTempData.firstIdentificationType=='business_license'">
							<div>{{transferTempData.firstLegalPerson}}</div>
						</el-form-item>
						<el-form-item label="法人身份证号：" required :style="{'width':formLabelWidth}"  v-if="transferTempData.firstIdentificationType=='business_license'">
							<div>{{transferTempData.firstLegalPersonIdNum}}</div>
						</el-form-item>
						<el-form-item label="委托代理人：" :style="{'width':formLabelWidth}" >
							<div>{{transferTempData.firstAgentPerson}}</div>
						</el-form-item>
						<el-form-item label="代理人身份证号：" :style="{'width':formLabelWidth}" >
							<div>{{transferTempData.firstAgentPersonIdNum}}</div>
						</el-form-item>
						<el-form-item label="甲方联系电话：" required :style="{'width':formLabelWidth}" >
							<div>{{transferTempData.firstPhone}}</div>
						</el-form-item>
						<el-form-item label="甲方联系地址：" required :style="{'width':formLabelWidth}" >
							<div>{{transferTempData.firstAddress}}</div>
						</el-form-item>
						<el-form-item label="乙方(受让方)：" required  style="width:96%" class="lineWid">
							<div>{{transferTempData.secondParty}}</div>
						</el-form-item>
						<el-form-item label="乙方证件类型："  required :style="{'width':formLabelWidth}" >
							<div>{{transferTempData.secondIdentificationTypeName}}</div>
						</el-form-item>
						<el-form-item :label="transferTempData.secondIdentificationTypeName+'：'"  required :style="{'width':formLabelWidth}">
							<div>{{transferTempData.secondIdentificationNum}}</div>
						</el-form-item>
						<el-form-item label="法定代表人：" required :style="{'width':formLabelWidth}"  v-if="transferTempData.secondIdentificationType=='business_license'">
							<div>{{transferTempData.secondLegalPerson}}</div>
						</el-form-item>
						<el-form-item label="法人身份证号：" required :style="{'width':formLabelWidth}"  v-if="transferTempData.secondIdentificationType=='business_license'">
							<div>{{transferTempData.secondLegalPersonIdNum}}</div>
						</el-form-item>
						<el-form-item label="委托代理人：" :style="{'width':formLabelWidth}" >
							<div>{{transferTempData.secondAgentPerson}}</div>
						</el-form-item>
						<el-form-item label="代理人身份证号：" :style="{'width':formLabelWidth}" >
							<div>{{transferTempData.secondAgentPersonIdNum}}</div>
						</el-form-item>
						<el-form-item label="乙方联系电话：" required :style="{'width':formLabelWidth}" >
							<div>{{transferTempData.secondPhone}}</div>
						</el-form-item>
						<el-form-item label="乙方联系地址：" required :style="{'width':formLabelWidth}" >
							<div>{{transferTempData.secondAddress}}</div>
						</el-form-item>
					</el-form>
				</div>
				<div class="signlist signlist2">
					<p class="signlistTi">第一条 转让宗地的基本情况</p>
					<p>1.土地坐落:{{transferTempData.landLocation}}</p>
					<p>2.土地性质:{{transferTempData.landCharName}}</p>
					<p>3.使用权类型:{{transferTempData.useTypeName}}</p>
					<p>4.土地用途:{{transferTempData.firstClassUseName}}{{transferTempData.secondClassUseName}}</p>
					<p>5.不动产权证号（或土地证号）:{{transferTempData.warrantNum}}</p>
					<p>6.房产证号:{{transferTempData.houseNum}}</p>
					<p>7.建设用地使用权出让合同号（或划拨决定书号）:{{transferTempData.contractNum}}</p>
					<p>8.转让土地面积:{{transferTempData.area}}平方米</p>
					<p>9.转让建筑物面积:{{transferTempData.buildArea}}平方米</p>
					<p>10.地块的具体位置详见附图，附图已经双方签字盖章确认</p>
				</div>
				<div class="signlist signlist3">
					<p class="signlistTi">第二条 剩余使用期限</p>
					<p>建设用地使用权剩余使用期限为 {{transferTempData.term}} 年,即{{transferTempData.beginDate}}至{{transferTempData.endDate}}(剩余使用期限不得超过原出让(或出租)合同约定的使用年限减去甲方已使用年限后的剩余年限)。</p>
				</div>
				<div class="signlist signlist4">
					<p class="signlistTi">第三条 转让价款及支付方式</p>
					<!-- <p>1.转让总金额人民币（大写）{{transferTempData.total}}（小写）{{(transferTempData.landTransfer+transferTempData.attachTransfer)}}万元，其中土地转让金额人民币（大写）{{transferTempData.total1}}（小写 ）{{transferTempData.landTransfer}}万元，附着物转让金额人民币（大写）{{transferTempData.total2}}（小写 ）{{transferTempData.attachTransfer}}万元。交易发生的各项税费由甲、乙双方按照有关规定承担。</p> -->
					<!-- <p>1.转让总金额人民币（大写）{{transferTempData.total}}（小写）{{(transferTempData.landTransfer+transferTempData.attachTransfer)}}万元，其中土地转让金额人民币（大写）{{transferTempData.total1}}（小写 ）{{transferTempData.landTransfer}}万元，附着物转让金额人民币（大写）{{transferTempData.total2}}（小写 ）{{transferTempData.attachTransfer}}万元。交易发生的各项税费由甲、乙双方按照有关规定承担。</p> -->
					<!--<p>成交价格:{{transferTempData.total}}</p>-->
					<!--<p>土地费用:{{transferTempData.total1}}</p>-->
					<!--<p>附属物费用:{{transferTempData.total2}}</p>-->
					<p>1.转让总金额人民币（大写）{{NumToChinese((transferTempData.landTransfer+transferTempData.attachTransfer))}}（小写）{{Division((transferTempData.landTransfer+transferTempData.attachTransfer))}}万元，
						其中土地转让金额人民币（大写）{{NumToChinese(transferTempData.landTransfer)}}（小写）{{Division(transferTempData.landTransfer)}}万元，
						附着物转让金额人民币（大写）{{NumToChinese(transferTempData.attachTransfer)}}（小写） {{Division(transferTempData.attachTransfer)}}万元。
						交易发生的各项税费由甲、乙双方按照有关规定承担。</p>
					<p>2.付款方式:{{transferTempData.payment}}</p>
				</div>
				<div class="signlist signlist5">
					<p class="signlistTi">第四条 转让双方权利义务</p>
					<p>(一)甲方的权利义务</p>
					<p>1.有权获得土地使用权及地上建筑物、其他附着物所有权转让价款;</p>
					<p>2.甲方于合同签订30日之内前将土地及地上建(构)筑物、其他附着物交付乙方;</p>
					<p>3.甲方保证本合同第一条所述内容真实,保证不动产权属清晰,符合法律、法规、规章和有关政策规定的以及原出让(或出租、划拨决定书)合同约定的土地使用权转让应具备的条件;</p>
					<p>4.法律、法规、规章和政策规定的其他权利和义务;</p>
					<p>5.双方约定的甲方其它权利或义务请写在附件中。</p>
					<p>(二)乙方的权利义务</p>
					<p>1.乙方有义务无条件全面继受原《建设用地使用权出让(或出租)合同》(或划拨决定书)及《补充协议》确定的权利义务;</p>
					<p>2.乙方应按约及时足额支付转让价款;</p>
					<p>3.乙方在本合同项下宗地内进行建设时,有关用水、用气、污水及其他设施与宗地外主管线、用电变电站接口和引入工程,乙方按有关规定办理;</p>
					<p>4.乙方同意政府为公用事业需要而敷设的各种管道与管线进出、通过、穿越受让宗地,但由此影响受让宗地使用功能的,政府或公用事业营建主体应当给予合理补偿。法律、法规、规章和政策所规定的其他权利和义务;</p>
					<p>5.乙方应当按照《建设用地使用权出让(或出租)合同》(或划拨决定书)约定的土地用途、容积率利用土地,不得擅自改变。</p>
					<p>6.乙方按照本合同约定支付全部建设用地使用权转让价款,领取不动产权证书后,有权将本合同项下的全部或部分建设用地使用权转让。</p>
					<p>7.双方约定的乙方其它权利或义务请写在附件中详细说明</p>
				</div>
				<div class="signlist signlist6">
					<p class="signlistTi">第五条 违约责任</p>
					<p>1.本合同生效后,甲乙双方均应当履行本合同约定的义务,任何一方如有违反,应赔偿由此给对方造成的损失。</p>
					<p>2.乙方应当按照本合同约定,按时支付建设用地使用权转让价款。乙方不能按时支付建设用地使用权转让价款的,自违约之日起,每日按迟延支付款项的 15‰向转让人缴纳违约金,延期付款超过60日,经甲方催交后仍不能支付建设用地使用权转让价款的,甲方有权解除合同,并可请求乙方赔偿损失。</p>
					<p>3.因一方违约导致合同解除的,违约方应按转让成交价总额的 10 %承担违约责任,给对方造成损失的,违约方还应当依法承担赔偿责任</p>
					<p>4.乙方按本合同约定支付建设用地使用权转让价款的,甲方必须按照本合同约定按时交付出让土地。由于甲方未按时提供转让土地而致使乙方本合同项下宗地占有延期的,每延期一日,甲方应当按乙方已经支付的建设用地使用权转让价款的_%向乙方给付违约金,土地使用年期自实际交付土地之日起算。甲方延期交付土地超过日,经乙方催交后仍不能交付土地的,乙方有权解除合同,要求甲方退还已经支付建设用地使用权转让价款,并可请求甲方赔偿损失。</p>
					<p>5.甲乙双方应在本合同签署之日起30日内,共同到建设用地二级市场交易服务中心申请办理转让手续,同时按规定缴纳相关税费。一方逾期不配合办理的,每逾期一日,按转让价款总额的 15 ‰支付违约金。</p>
				</div>
				<div class="signlist signlist7">
					<p class="signlistTi">第六条 合同解除</p>
					<p>1.甲乙双方协商一致后,可解除本合同。</p>
					<p>2.乙方迟延履行支付款项义务,经甲方催告后在合理期限内仍未履行的,甲方有权解除本合同。</p>
					<p>3.甲方拒不履行配合乙方办理转让相关手续或因甲方原因造成迟延交付建设用地使用权的,经乙方催告后在合理期限内仍未履行的,乙方有权解除本合同。</p>
					<p>4.甲乙双方约定的其他情形请在附件中约束。</p>
				</div>
				<div class="signlist signlist8">
					<p class="signlistTi">第七条 其他约定事项</p>
					<p>甲乙双方确定,若以下约定内容与本合同其他款项约定约定存在不一致的,以本条约定内容为准:</p>
				</div>
				<div class="signlist signlist9">
					<p class="signlistTi">第八条 争议解决</p>
					<p>双方在履行本合同过程中如有纠纷,可由甲乙双方协商解决,也可向行政主管部门申请行政调解。协商或调解不成的,可选择以下第_种方式解决纠纷。</p>
					<p>1.向成都仲裁委员会申请仲裁。</p>
					<p>2.向不动产所在地人民法院提起诉讼。</p>
				</div>
				<div class="signlist signlist10 signlist11">
					<p class="signlistTi">第九条 附则</p>
					<p>1.甲乙双方应遵守国家相关政策、法规,并按规定交纳税费。2.本合同自甲乙双方签字、盖章之日起生效。</p>
					<p>3.本合同一式份,甲方执份,乙方执份,建设用地二级市场交易服务中心存档壹份,每份具有同等法律效力。</p>
					<div class="signlistwarp">
						<div class="signlistwarpTi">
							<span>甲方盖章(或签字):</span>
						</div>
						<div class="signlistwarpTi">
							<span>乙方盖章(或签字):</span>
						</div>
						<div class="signlistwarpTi">
							<span>甲方代表(签字):</span>
						</div>
						<div class="signlistwarpTi">
							<span>乙方代表(签字):</span>
						</div>
						<div class="signlistwarptime">
							<span>年</span>
							<span>月</span>
							<span>日</span>
						</div>
					</div>
				</div>
				<div class="signlist signlist12" id="signlistTi10">
					<p class="signlistTi">附件</p>
					<ul class="signlistenclosure" v-if="tableData&&tableData!==null">
						<li v-for="(item,index) in tableData" :key="index">
							<a :href="baseUrl + item.files[0].fid" v-if="item.files&&item.files[0]&&item.files[0].fid">
								<span v-if="item.files.length!= 0">{{index+1}}.</span>
								<span style="color: #4671d5;">{{item.files.length== 0?'':item.files[0].fname}}</span>
							</a>
						</li>
					</ul>
					<ul class="signlistenclosure" v-else>无</ul>
				</div>
				<div class="signlist" style="margin-top:0" v-show="signShow">
					<p class="signlistTi">签字版合同</p>
					<ul class="signlistenclosure" v-if="tableSignData">
						<li v-for="(item,index) in tableSignData" :key="index">
							<a :href="baseUrl + item.id">
								<span style="color: #4671d5;">{{item.name}}</span>
							</a>
						</li>
					</ul>
					<ul class="signlistenclosure" v-else>无</ul>
				</div>
				</div>
				<div style="margin:10px auto 10px 0">
					<el-button type="warning" plain style="width: 98px;" @click="back">返回</el-button>
					<!-- <el-button type="warning" style="width: 98px;" @click="autoExamine">自动检验</el-button> -->
					<el-button type="warning" @click="examine(obj)" style="width: 98px;" v-if="!this.contractView" v-show="!signShow">审核</el-button>
				</div>
				<div style="clear:both;"></div>
				<!-- 审核弹窗 -->
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
</template>
<script>
	import { mapActions, mapState } from "vuex";
	import Bus from "../../../../utils/bus";
	import baseURL1 from "../../../../utils/config";
	import Axios from "axios";
	import qs from "qs";
	//引入打印功能
	import html2canvas from "html2canvas"
	import JsPDF from 'jspdf'

	import EPFAnnexList from "@/components/annexList/annexList.vue";
	export default {
		components: {
			EPFAnnexList
		},
		props: ["signShow"],
		data() {
			return {
				needRefresh: [],
				belong: null,
				areaCode: null,
				formLabelWidth: "48%",
				transferTempData: {},
				baseUrl: null,
				obj: {
					businessId: "",
					procInsId: "",
					procDefId: "",
					taskId: ""
				},
				statekey: 1,
				state: 1,
				isShowHeader: false,
				searchBarFixed: false,
				detailsleftData: [
					"甲方",
					"乙方",
					"第一条",
					"第二条",
					"第三条",
					"第四条",
					"第五条",
					"第六条",
					"第七条",
					"第八条",
					"第九条",
					"签字部分",
					"附件"
				],
				actInfo: {},
				handleData: "",
				dialogForm: false,
				dialogDownLand: false,
				fullWidth: document.documentElement.clientWidth,
				clickNum: 0,
				tableData: null,
				contractId: null,
				contractView: null,
				tableSignData: null,
				//    打印图片
				imgUrl: ''
			};
		},
		created() {
			this.baseUrl = baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
			window.scrollTo(0, 0);
			this.getSelectOneData();
			this.init();
			//请求附件组
		},
		methods: {
			...mapActions(["deleteTab", "setTabsList", "removeTab", "refreshPage"]),
			methodFun() {},
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
						that.transferTempData = res.data.list[0];
						that.belongId = res.data.list[0].fileId;
						that.signId = res.data.list[0].signId;
						that.areaCode = res.data.list[0].cantonArea;
						that
							.$get(
								`/epf-document/docTemplete/getTempleteTreeByArea?id=0&belong=${res.data.list[0].fileId}&areaCode=${res.data.list[0].cantonArea}`, {}
							)
							.then(res => {
								let resData = JSON.parse(res.ztreeJson);
								for(let i = 0; i < resData.length; i++) {
									if(resData[i].code.indexOf("CONTRACT") != -1) {
										//附件清单
										that.tableData = resData[i].childData;
									}
								}
							});

						that.$get("/epf-document/document/getOneGroupFilsById", {
							id: res.data.list[0].signId
						}).then(files => {
							that.tableSignData = files.fileList;
						});
					}
				});
			},
			init() {
				this.obj.businessId = this.$route.query.businessId;
				this.obj.procInsId = this.$route.query.procInsId;
				this.obj.procDefId = this.$route.query.procDefId;
				this.obj.taskId = this.$route.query.taskId;
				this.contractId = this.$route.query.contractId;
				this.contractView = this.$route.query.contractView;
			},
			handleScroll() {},
			selectli(item) {
				this.statekey = item;
				var el = document.getElementsByClassName(`signlist${item}`)[0];
				this.$nextTick(function() {
					el.scrollIntoView() - 50;
				});
			},
			handleResize(event) {
				this.fullWidth = document.documentElement.clientWidth;
			},
			autoExamine() {
				let routerPath = "autoInspection";
				let title = "不动产自动核验";
				let tabObj = {
					title,
					routerPath
				};
				this.setTabsList(tabObj);
				this.$router.push({
					path: "/autoInspection"
				});
			},
			examine(obj) {
				this.actInfo = null;
				//审核
				this.actInfo = obj;
        this.dialogForm = true;

				this.$nextTick(() => {
					Bus.$emit("transferaudit", "examine"); //需要审核
				});
			},
			actResult(re, node) {
				//取消：cancel，流转：success,流转结束：end,审核未通过：failed
				if(re === "cancel") {
					//取消关闭弹框，不做任何事件
				} else if(re === "success") {
					// this.$bus.$emit("refreshPage", ["home"]);
					this.$bus.$emit("closeTabsItem", this.$route.name);
					this.$bus.$emit("refreshPage", ["home"]);
					//刷新页面
					this.getSelectOneData();
					
					let routerPath = "transferSignContract";
			        let title = "转让合同申请列表";
			        let tabObj = { title, routerPath};
			        this.setTabsList(tabObj);
			        setTimeout(() => {
			            this.$router.push({ path: routerPath})
			        }, 100);
					
				} else if(re === "failed") {
					//修改状态
					this.setState("failed");
					// this.$bus.$emit("refreshPage", ["home"]);
					this.$bus.$emit("closeTabsItem", this.$route.name);
					//刷新页面
					this.getSelectOneData();
				} else if(re === "end") {
					//修改状态
					this.setState("success");
					// this.$bus.$emit("refreshPage", ["home"]);
					this.$bus.$emit("closeTabsItem", this.$route.name);
					//刷新页面
					this.getSelectOneData();
				}
				this.dialogForm = false;
			},
			setState(state) {
				if(this.transferTempData.contractStatus == "contract_status-003") {
					this.transferTempData.contractStatus = "";
					if(state === "success") {
						this.transferTempData.contractStatus = "contract_status-007";
					} else if(state === "failed") {
						this.transferTempData.contractStatus = "contract_status-006";
					}
				} else if(
					this.transferTempData.contractStatus == "contract_status-004"
				) {
					this.transferTempData.contractStatus = "";
					if(state === "success") {
						this.transferTempData.contractStatus = "contract_status-005";
					} else if(state === "failed") {
						this.transferTempData.contractStatus = "contract_status-006";
					}
				}

				let token = sessionStorage.getItem("token");
				//改变状态
				Axios.post(
					"/api/epf-contract/transContract/change",
					qs.stringify({
						token: token,
						contractId: this.contractId,
						status: this.transferTempData.contractStatus
					})
				).then(res => {
					if(res.code != "0000") {
						//失败
						this.$message.error(res.msg);
						return;
					}
					//刷新页面
					this.getSelectOneData();
				});
			},
			reload() {
				this.getSelectOneData();
			},
			back() {
				// this.$bus.$emit("refreshPage", ["home"]);
				this.$bus.$emit("closeTabsItem", this.$route.name);
				// let routerPath = `/transferContractTemplate?contractId=${this.$route.query.contractId}&businessId=${this.$route.query.businessId}&procDefId=${this.$route.query.procDefId}&procInsId=${this.$route.query.procInsId}&taskId=${this.$route.query.taskId}`;
				// this.deleteTab(routerPath);
				// this.$router.replace("/transferSignContract");
				// this.$router.go(-1);
			},
//  		打印
			printing() {
				html2canvas(this.$refs.imageWrapper).then(canvas => {
					//			转图片
					let dataURL = canvas.toDataURL("image/png");
					this.imgUrl = dataURL;
					//			调取打印功能
					let printHtml = `<img src= "${dataURL}"/>`;
					var wind = window.open("",'newwindow', 'height=700, width=700, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');
					wind.document.body.innerHTML = printHtml;
					setTimeout(function(){
						wind.print();
					},1000)
				})
			},
//			下载
			downUp() {
				html2canvas(this.$refs.imageWrapper).then(canvas => {
					var contentWidth = canvas.width;
			    	var contentHeight = canvas.height;

				    //一页pdf显示html页面生成的canvas高度;
				    var pageHeight = contentWidth / 592.28 * 841.89;
				    //未生成pdf的html页面高度
				    var leftHeight = contentHeight;
				    //页面偏移
				    var position = 0;
				      //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
				      var imgWidth = 595.28;
				      var imgHeight = 592.28/contentWidth * contentHeight;

				      var pageData = canvas.toDataURL('image/jpeg', 1.0);

				      var pdf = new JsPDF('', 'pt', 'a4');

				      //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
				      //当内容未超过pdf一页显示的范围，无需分页
				      if (leftHeight < pageHeight) {
					  pdf.addImage(pageData, 'JPEG', 5, 0, imgWidth, imgHeight );
				      } else {
					      while(leftHeight > 0) {
					          pdf.addImage(pageData, 'JPEG', 5, position, imgWidth, imgHeight)
					          leftHeight -= pageHeight;
					          position -= 841.89;
					          //避免添加空白页
					          if(leftHeight > 0) {
						        pdf.addPage();
					          }
					      }
				      }

				      pdf.save('content.pdf');
				})
			}
		},
		mounted() {
			//其他组件需要关闭标签页
			this.$bus.$on("closeTabsItem", val => {
				this.removeTab(val);
				// this.refresh();
			});
			//刷新指定页面
			// this.$bus.$on("refreshPage", val => {
			//   this.needRefresh.push(...val);
			//   this.needRefresh = Array.from(new Set(this.needRefresh));
			// });
		}
	};
</script>
<style lang="less" scoped>
	.signatureDetails_warp {
		width: 100%;
		height: auto;
		overflow: hidden;
	}

	.signatureDetails_left {
		width: 124px;
		height: auto;
		background: #fff;
		display: none;
	}

	.signatureDetails_left ul {
		width: 100%;
		height: auto;
	}

	.signatureDetails_left ul li {
		width: 100%;
		height: 48px;
		box-sizing: border-box;
		border-bottom: solid 1px #f3f3f3;
		text-align: center;
		line-height: 48px;
		color: #646463;
		font-size: 14px;
		cursor: pointer;
	}

	.signatureDetails_left ul li:hover {
		box-sizing: border-box;
		border-left: 2px solid #ffa000;
		color: #ffa000;
	}

	.signatureDetails_left ul .liActive {
		box-sizing: border-box;
		border-left: 2px solid #ffa000;
		color: #ffa000;
	}

	.isFixed {
		position: fixed;
		background-color: #fff;
		right: 110px;
		display: block;
	}

	.signatureDetails_list {
		width: 1200px;
		height: auto;
		background: #f9fafc;
		margin: 0 auto;
	}

	.signatureDetails_cont {
		width: 100%;
		height: auto;
		box-sizing: border-box;
		padding: 20px 62px 10px 117px;
	}

	.signNum {
		width: 100%;
		height: 60px;
	}

	.signNumCon {
		float: right;
	}

	.signNumCon p {
		color: #666666;
		font-size: 14px;
		line-height: 30px;
	}

	.signtitle {
		width: 100%;
		height: auto;
		text-align: center;
		line-height: 50px;
		color: #666666;
		font-size: 26px;
		margin: 30px 0;
	}

	.signtitle div {
		float: right;
		width: 110px;
		height: 34px;
		border-radius: 0px 17px 17px 0px;
		font-size: 14px;
		line-height: 35px;
		margin-top: 7px;
	}

	.signtitle div span {
		display: inline-block;
		width: 5px;
		height: 5px;
		background-color: #ffffff;
		border-radius: 50%;
		margin-right: 10px;
		vertical-align: middle;
	}

	.signtitle .contractCancel {
		background: #ebebeb;
		color: #999999;
	}

	.signtitle .contractsuccess {
		background: #e7f4bd;
		color: #93b52d;
	}

	.signtitle .contractnosuccess {
		background: #ffd6d7;
		color: #fe3f45;
	}

	.signaturelist {
		width: 100%;
		height: auto;
		display: flex;
		flex-wrap: wrap;
	}

	// .signaturelist .signaturelistcon:nth-of-type(2n) {
	//   margin-left: 130px;
	// }
	.signaturelist .signaturelistcon {
		width: 100%;
		height: 50px;
		line-height: 50px;
		display: flex;
	}

	.signaturelist .signaturelistcon .signaturelistconTitle span {
		color: #fe3f45;
	}

	.signaturelist .signaturelistcon .signaturelistconTitle {
		width: 30%;
		height: auto;
		border-bottom: none;
		color: #999999;
	}

	.signaturelist .signaturelistcon .signaturelistdetail {
		width: 60%;
		height: auto;
		box-sizing: border-box;
		border-bottom: solid 2px #f3f3f3;
	}

	.signlist {
		width: 100%;
		height: auto;
		color: #999999;
		font-size: 14px;
		line-height: 35px;
		margin-top: 70px;
	}

	.signlist .signlistTi {
		color: #666666;
		font-size: 16px;
		font-weight: bold;
		line-height: 50px;
	}

	.signlist .signlistwarp {
		width: 870px;
		height: 235px;
		border: solid 1px #979797;
		box-sizing: border-box;
		padding: 40px 68px 10px 119px;
		display: flex;
		flex-wrap: wrap;
		background-color: white;
	}

	.signlist .signlistwarp .signlistwarpTi {
		width: 340px;
		height: auto;
	}

	.signlist .signlistwarp .signlistwarpTi span {
		display: inline-block;
		font-size: 12px;
		color: #666666;
		text-align: right;
	}

	.signlist .signlistwarp .signlistwarptime {
		width: 100%;
		height: auto;
		text-align: right;
	}

	.signlist .signlistwarp .signlistwarptime span {
		margin-left: 40px;
	}

	.signlist .signlistenclosure {
		width: 100%;
		height: auto;
	}

	.signlist .signlistenclosure li {
		line-height: 30px;
		font-size: 14px;
		color: #666666;
		cursor: pointer;
	}

	.signlist .signlistenclosure li span {
		color: #4671d5;
	}

	.signlist .contractbook {
		display: inline-block;
		margin-right: 10px;
	}

	.signlist .contractbookbutton {
		display: inline-block;
		height: 36px;
		background-color: #ffa000;
		border-radius: 2px;
		cursor: pointer;
		text-align: center;
		color: #fff;
		line-height: 36px;
		padding: 0 15px;
	}

	.button {
		width: 80px;
		height: 36px;
		background-color: #ffa000;
		border-radius: 2px;
		cursor: pointer;
		text-align: center;
		color: #fff;
		line-height: 36px;
		margin: 50px 0;
	}
</style>
<style>
  .signDetail .el-form-item__content{width:57%;border-bottom: 2px solid rgb(243, 243, 243);height:40px;  }
  .signDetail .el-form-item__label{width:125px;}
  .lineWid .el-form-item__content{width:80%;}
</style>