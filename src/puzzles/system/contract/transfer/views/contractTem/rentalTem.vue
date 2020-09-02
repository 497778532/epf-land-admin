<template>
	<!-- 出租模板 -->
	<div class="signatureDetails_warp" ref="leaseCheck">
		<div class="signatureDetails_left" :class="searchBarFixed == true ? 'isFixed' :''">
			<ul>
				<li v-for="(item,index) in detailsleftData" :key="index" @click="selectli(index)" :class="{liActive:statekey===index}">{{item}}</li>
			</ul>
		</div>
		<div class="signatureDetails_list">
			<div style="margin: 10px auto;width: 100%;height: 40px;" v-if="contractView">
				<el-button type="warning" plain style="width: 98px;float: right;margin-left: 10px" @click="downUp()">下载</el-button>
				<el-button type="warning" plain style="width: 98px;float: right;" @click="printing()">打印</el-button>
			</div>
			<div class="signatureDetails_cont signlist0 signlist1">
				<div ref="imageWrapper" style="padding: 20px;">
				<div class="signNum">
					<div class="signNumCon">
						<p v-if="mydata.contractStatus!=='contract_status-008'">合同编号：{{this.mydata.code}}</p>
						<p v-if="mydata.contractStatus=='contract_status-008'">合同统一编码：{{mydata.recordNo}}</p>
					</div>
				</div>
				<div class="signtitle">
					{{this.mydata.contractName}}
					<!-- 草稿-002/撤销审核中-003/审核中-004/合同已撤销-007 -->
					<div v-if="mydata.contractStatus=='contract_status-002'||mydata.contractStatus=='contract_status-003'||mydata.contractStatus=='contract_status-004'||mydata.contractStatus=='contract_status-007'" class="contractCancel">{{mydata.contractStatusName}}</div>
					<!-- 审核通过-005/鉴证成功-008 -->
					<div v-if="mydata.contractStatus=='contract_status-005'||mydata.contractStatus=='contract_status-008'" class="contractsuccess">{{mydata.contractStatusName}}</div>
					<!-- 审核未通过-006/鉴证失效-009 -->
					<div v-if="mydata.contractStatus=='contract_status-006'||mydata.contractStatus=='contract_status-009'" class="contractnosuccess">{{mydata.contractStatusName}}</div>
				</div>
				<div class="signDetail">
					<el-form :model="mydata"  class="demo-form-inline" :inline="true" label-position="left">
						<el-form-item label="甲方(出租人)：" required  style="width:96%" class="lineWid">
							<div>{{mydata.firstParty}}</div>
						</el-form-item>
						<el-form-item label="甲方证件类型："  required :style="{'width':formLabelWidth}" >
							<div>{{mydata.firstIdentificationTypeName}}</div>
						</el-form-item>
						<el-form-item :label="mydata.firstIdentificationTypeName+'：'"  required :style="{'width':formLabelWidth}">
							<div>{{mydata.firstIdentificationNum}}</div>
						</el-form-item>
						<el-form-item label="法定代表人：" required :style="{'width':formLabelWidth}"  v-if="mydata.firstIdentificationType=='business_license'">
							<div>{{mydata.firstLegalPerson}}</div>
						</el-form-item>
						<el-form-item label="法人身份证号：" required :style="{'width':formLabelWidth}"  v-if="mydata.firstIdentificationType=='business_license'">
							<div>{{mydata.firstLegalPersonIdNum}}</div>
						</el-form-item>
						<el-form-item label="委托代理人：" :style="{'width':formLabelWidth}" >
							<div>{{mydata.firstAgentPerson}}</div>
						</el-form-item>
						<el-form-item label="代理人身份证号：" :style="{'width':formLabelWidth}" >
							<div>{{mydata.firstAgentPersonIdNum}}</div>
						</el-form-item>
						<el-form-item label="甲方联系电话：" required :style="{'width':formLabelWidth}" >
							<div>{{mydata.firstPhone}}</div>
						</el-form-item>
						<el-form-item label="甲方联系地址：" required :style="{'width':formLabelWidth}" >
							<div>{{mydata.firstAddress}}</div>
						</el-form-item>
						<el-form-item label="乙方(承租人)：" required  style="width:96%" class="lineWid">
							<div>{{mydata.secondParty}}</div>
						</el-form-item>
						<el-form-item label="乙方证件类型："  required :style="{'width':formLabelWidth}" >
							<div>{{mydata.secondIdentificationTypeName}}</div>
						</el-form-item>
						<el-form-item :label="mydata.secondIdentificationTypeName+'：'"  required :style="{'width':formLabelWidth}">
							<div>{{mydata.secondIdentificationNum}}</div>
						</el-form-item>
						<el-form-item label="法定代表人：" required :style="{'width':formLabelWidth}"  v-if="mydata.secondIdentificationType=='business_license'">
							<div>{{mydata.secondLegalPerson}}</div>
						</el-form-item>
						<el-form-item label="法人身份证号：" required :style="{'width':formLabelWidth}"  v-if="mydata.secondIdentificationType=='business_license'">
							<div>{{mydata.secondLegalPersonIdNum}}</div>
						</el-form-item>
						<el-form-item label="委托代理人：" :style="{'width':formLabelWidth}" >
							<div>{{mydata.secondAgentPerson}}</div>
						</el-form-item>
						<el-form-item label="代理人身份证号：" :style="{'width':formLabelWidth}" >
							<div>{{mydata.secondAgentPersonIdNum}}</div>
						</el-form-item>
						<el-form-item label="乙方联系电话：" required :style="{'width':formLabelWidth}" >
							<div>{{mydata.secondPhone}}</div>
						</el-form-item>
						<el-form-item label="乙方联系地址：" required :style="{'width':formLabelWidth}" >
							<div>{{mydata.secondAddress}}</div>
						</el-form-item>
					</el-form>
				</div>
				<div class="signlist signlist2">
					<p class="signlistTi">第一条 出租宗地的基本情况</p>
					<p>1.土地坐落:{{this.mydata.landLocation}}</p>
					<p>2.土地性质:{{this.mydata.landCharName}}</p>
					<p>3.使用权类型:{{this.mydata.useTypeName}}</p>
					<p>4.土地用途:{{this.mydata.firstClassUseName}}{{this.mydata.secondClassUseName}}</p>
					<p>5.不动产权证号:{{this.mydata.warrantNum}}</p>
					<p>6.房产证号:{{this.mydata.houseNum}}</p>
					<p>7.土地证号:{{this.mydata.warrantNum}}</p>
					<p>8.出租土地面积:{{this.mydata.area}}平方米</p>
					<p>9.出租建筑物面积:{{this.mydata.buildArea}}平方米</p>
					<p>10.地块的具体位置详见附图，附图已经双方签字盖章确认</p>
				</div>
				<div class="signlist signlist3">
					<p class="signlistTi">第二条 租赁期限</p>
					<p>本合同项下的建设用地使用权及地上建筑物、其他附着物所有权租赁年限为 {{this.mydata.term}}个月,即{{this.mydata.beginDate}}至{{this.mydata.endDate}}止。</p>
				</div>
				<div class="signlist signlist4">
					<p class="signlistTi">第三条 租金缴纳</p>
					<p>1.乙方同意按本合同规定向甲方支付租金。</p>
					<!-- <p>2.本合同出租不动产租金为人民币 (大写）{{this.mydata.rent1}} /月(小写）{{this.mydata.rent}}万/月,总租金为人民币(大写） {{this.mydata.total}} (小写）{{(this.mydata.rent*this.mydata.term)}}万元。</p> -->
					
                    <p>2.本合同出租不动产租金为人民币（大写） {{NumToChinese(mydata.rent)}} /月（小写）{{Division(mydata.rent)}}万元/月,
                         总租金为人民币（大写） {{NumToChinese(mydata.rent*mydata.term)}} （小写）{{(Division(mydata.rent*mydata.term))}}万元。</p>
					<p>3.付款方式：{{this.mydata.payment}}</p>
				</div>
				<div class="signlist signlist5">
					<p class="signlistTi">第四条 双方的权利与义务</p>
					<p>(一)甲方的权利义务</p>
					<p>1.甲方有权按本合同约定向乙方收取租金;</p>
					<p>2.甲方有义务30日前将本合同项下的建设用地及地上建筑物、其他附着物交付乙方使用;</p>
					<p>3.甲方有义务协助乙方办理相关租赁鉴证手续;</p>
					<p>4.租赁期间,除法律、行政法规及本合同另有约定外,甲方不得擅自收回建设用地使用权及地上建筑物、其他附着物使用权;</p>
					<p>5.甲方有权监督乙方按法定用途使用土地,乙方擅自改变土地用途的,甲方有权提前收回建设用地使用权及地上建筑物、其他附着物使用权;</p>
					<p>6.甲方保证租赁期间未经乙方同意,不设立供役地义务等影响乙方正常使用土地及地上建筑物、其他附着物的权利负担;</p>
					<p>7.以划拨方式取得的建设用地使用权经依法批准出租的,甲方有义务按照有关规定上缴应缴的土地出让收益金;</p>
					<p>8.以出租方式取得的土地使用权,甲方将土地转租给乙方使用的,甲方应事先征得出让方的同意。</p>
					<p>9.双方约定的甲方其它权利或义务请写在附件中。</p>
					<p>(二)乙方的权利义务</p>
					<p>1.乙方有义务按时向甲方支付租金;</p>
					<p>2.乙方有义务按法定用途使用土地;</p>
					<p>3.乙方租赁土地上修建建(构)筑物的,需要按临时建筑办理相关规划、建设、环保等手续,接受国土、规建、环保等部门监管,不办理不动产登记;</p>
					<p>4.乙方不得将租赁建设用地及地上建筑物、其他附着物进行转让、抵押,未经甲方同意,不得转租给第三方;</p>
					<p>5.租赁期限届满或本合同提前终止的,乙方需及时、完好地向甲方交还本合同项下建设用地及地上建筑物、其他附着物;</p>
					<p>6.双方约定的其它权利或义务请写在附件中。</p>
				</div>
				<div class="signlist signlist6">
					<p class="signlistTi">第五条 违约责任</p>
					<p>1.本合同生效后,甲乙双方均应当履行本合同约定的义务,任何一方如有违反,应赔偿由此给对方造成的损失。</p>
					<p>2.乙方应当按照本合同约定,按时支付建设用地使用权租金。乙方不能按时支付建设用地使用权租金的,自违约之日起,每日按迟延支付款项的_15‰向出租人缴纳违约金,延期付款超过日,经甲方催交后仍不能支付建设用地使用权租金的,甲方有权解除合同,并可请求乙方赔偿损失。</p>
					<p>3.因一方违约导致合同解除的,违约方应按转让租赁价总额的_10___%承担违约责任,给对方造成损失的,违约方还应当依法承担赔偿责任。</p>
					<p>4.乙方按本合同约定支付建设用地使用权租金的,甲方必须按照本合同约定按时交付出让土地。由于甲方未按时提供转让土地而致使乙方本合同项下宗地占有延期的,每延期一日,甲方应当按乙方已经支付的建设用地使用权租货总价的_%向乙方给付违约金,土地使用年期自实际交付土地之日起算.甲方延期交付土地超过日,经乙方催交后仍不能交付土地的,乙方有权解除合同,退还已经支付建设用地使用权租金,并可请求甲方赔偿损失。</p>
					<p>5.甲乙双方应在本合同签署之日起___30_日内,共同到建设用地二级市场交易服务中心申请办理租赁鉴证手续,同时按规定缴纳相关税费。一方逾期不配合办理的,每逾期一日,按租金总额的_15‰支付违约金。</p>
				</div>
				<div class="signlist signlist7">
					<p class="signlistTi">第六条 约定事项</p>
					<p>1.对本合同的任何变更,需经双方同意并以书面形式作出方可生效,双方需持变更后的书面协议到建设用地二级市场交易服务中心办理租赁鉴证变更。</p>
					<div>
						2.有下列情形之一,本合同终止:
						<p>(1)本合同约定的租赁期限届满;</p>
						<p>(2)租赁期内,双方就合同终止达成一致;</p>
						<p>(3)任何一方因地震、水灾、战争等不可抗力丧失继续履行本合同的能力;</p>
						<p>(4)根据法律、法规的规定,或有管辖权的法院或仲裁机构所作出的终止本合同的判决、裁定或决定而终止本合同;</p>
						<p>(5)其它</p>
					</div>

					<p>3.建设用地使用权及地上建筑物、其他附着物所有权租赁期限届清后,乙方需要继续租赁的,应当在期限届满前___3_月前申请续期,在同等条件下,乙方口是口否享有优先承租权,甲方同意续期的,乙方应当与甲方重新签订租赁合同,并到建设用地二级市场交易服务中心办理租赁鉴证。</p>
					<p>4.甲乙双方应遵守国家相关政策、法规,并按规定交纳税费。以划拨方式取得的建设用地使用权出租的,应经依法批准,并按照有关规定上缴应缴的土地出让收益金。</p>
					<p>5.本合同经双方签字、盖章生效。</p>
					<p>6.本合同一式份,甲方执份,乙方执份,建设用地二级市场交易服务中心鉴证壹份,每份具有同等法律效力。</p>
					<p>7.甲乙双方确定,若以下约定内容与本合同其他款项约定约定存在不一致的,以本条约定内容为准:</p>
				</div>
				<div class="signlist signlist8">
					<p class="signlistTi">第七条 争议解决</p>
					<p>双方在履行本合同过程中如有纠纷,可由甲乙双方协商解决,也可向行政主管部门申请行政调解。协商或调解不成的,可选择以下第种方式解决纠纷。</p>
					<p>1.向成都仲裁委员会申请仲裁。</p>
					<p>2.向不动产所在地人民法院提起诉讼。</p>
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
				<div class="signlist signlist9">
					<p class="signlistTi">附件</p>
					<ul class="signlistenclosure" v-if="tableData">
						<li v-for="(item,index) in tableData" :key="index">
							<a :href="baseUrl + item.files[0].fid" v-if="item.files&&item.files[0]&&item.files[0].fid">
								<span v-if="item.files.length!= 0">{{index+1}}.</span>
								<span style="color: #4671d5;">{{item.files.length== 0?'':item.files[0].fname}}</span>
							</a>
						</li>
					</ul>
					<ul class="signlistenclosure" v-else>暂无</ul>
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
					<ul class="signlistenclosure" v-else>暂无</ul>
				</div>
				</div>
				<div style="margin:10px auto 10px 0">
					<el-button type="warning" plain style="width: 98px;" @click="back">返回</el-button>
					<!-- <el-button type="warning" style="width: 98px;" @click="autoExamine">自动检验</el-button> -->

					<!-- v-if="this.mydata.contractStatus<4" -->
					<el-button type="warning" @click="findAudit(obj)" style="width: 98px;" v-if="!this.contractView" v-show="!signShow">审核</el-button>
					<!-- <el-button v-else type="warning" @click="findAudit(obj)" style="width: 130px;">审核</el-button> -->
				</div>
				<div style="clear:both;"></div>
			</div>
		</div>
		<el-dialog title="审核" :visible.sync="dialogForm" width="40%">
			<div id="dialog">
				<actDialog :actInfo="actInfo" @patch="actResult" />
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import { mapActions, mapState } from "vuex";
	import baseURL1 from '../../../../../../utils/config'
	import qs from "qs";
	import Axios from "axios";
	//引入打印功能
	import html2canvas from "html2canvas"
	import JsPDF from 'jspdf'
	
	export default {
		props: ["signShow"],
		data() {
			return {
				formLabelWidth: "48%",
				baseUrl: '', //地址前缀
				tableDataSign: [],
				mydata: {},
				obj: {
					businessId: "",
					procInsId: "",
					procDefId: "",
					taskId: ""
				},
				actInfo: {},
				dialogVisible: false,
				statekey: 1,
				state: 1,
				isShowHeader: false,
				searchBarFixed: false,
				dialogForm: false,
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
					"签字部分",
					"附件"
				],
				contractId: null,
				tableData: [],
				belong: null,
				areaCode: null,
				contractView: null,
				tableSignData: null
			};
		},
		computed: {
			top() {
				return -this.activeIndex * 50 + "px";
			}
		},
		created() {
			this.baseUrl = baseURL1.baseURL1 + '/epf-document/document/downloadById?id='
			window.scrollTo(0, 0);
			// this.getOneLease(this.$route.query.contractId);
			this.init();
			this.contractId = this.$route.query.contractId;
			this.contractView = this.$route.query.contractView;
		},
		methods: {
			...mapActions(["deleteTab", "setTabsList"]),
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
						that.mydata = res.data.list[0];
						that.belong = res.data.list[0].fileId;
						that.signId = res.data.list[0].signId;
						that.areaCode = res.data.list[0].cantonArea;
						console.log("===res====", res.data.list[0]);
						that
							.$get(
								`/epf-document/docTemplete/getTempleteTreeByArea?id=0&belong=${res.data.list[0].fileId}&areaCode=${res.data.list[0].cantonArea}`, {}
							)
							.then(res => {
								let resData = JSON.parse(res.ztreeJson);
								for(let i = 0; i < resData.length; i++) {
									if(resData[i].code.indexOf("CONTRACT") != -1) {
										//附件清单
										console.log("======resData===", resData);
										that.tableData = resData[i].childData;
									}
								}
							});
						console.log("===tableData====", that.tableData);
						that.$get("/epf-document/document/getOneGroupFilsById", {
							id: res.data.list[0].signId
						}).then(files => {
							that.tableSignData = files.fileList;
						});
					}
				});
			},
			getOneLease: async function(id) {
				const res = await this.$http.post(
					"/api/epf-contract/transContract/selectOne",
					qs.stringify({
						contractId: id
					})
				);
				var that = this;
				console.log(res);
				if(res.code == "0000") {
					that.mydata = res.data.list[0];
					that.belong = res.data.list[0].fileId;
					that.areaCode = res.data.list[0].cantonArea;
					that
						.$get(
							`/epf-document/docTemplete/getTempleteTreeByArea?id=0&belong=${that.belong}&areaCode=${that.areaCode}`, {}
						)
						.then(res => {
							let resData = JSON.parse(res.ztreeJson);
							for(let i = 0; i < resData.length; i++) {
								if(resData[i].code.indexOf("CONTRACT") != -1) {
									//附件清单
									console.log("======resData===", resData);
									that.tableData = resData[i].childData;
								}
							}
						});
					console.log("===tableData====", that.tableData);
					that
						.$get(
							`/epf-document/docTemplete/getTempleteTreeByArea?id=0&belong=${res.data.list[0].signId}&areaCode=${res.data.list[0].cantonArea}`, {}
						)
						.then(res => {
							let resData = JSON.parse(res.ztreeJson);
							for(let i = 0; i < resData.length; i++) {
								if(resData[i].code.indexOf("CONTRACT") != -1) {
									//附件清单
									console.log("======resData===", resData);
									that.tableDataSign = resData[i].childData;
								}
							}
						});
					console.log("===tableDataSign====", that.tableDataSign);
				}
			},
			init() {
				this.obj.businessId = this.$route.query.businessId;
				this.obj.procInsId = this.$route.query.procInsId;
				this.obj.procDefId = this.$route.query.procDefId;
				this.obj.taskId = this.$route.query.taskId;
				this.contractView = this.$route.query.contractView;
			},
			handleScroll() {
				var scrollTop =
					window.pageYOffset ||
					document.documentElement.scrollTop ||
					document.body.scrollTop;
				if(scrollTop > 410) {
					this.searchBarFixed = true;
				} else {
					this.searchBarFixed = false;
				}
			},
			selectli(item) {
				this.statekey = item;
				var el = document.getElementsByClassName(`signlist${item}`)[0];
				this.$nextTick(function() {
					el.scrollIntoView() - 50;
				});
			},
			autoExamine() {
				let routerPath = "leaseImmovables";
				let title = "不动产自动核验";
				let tabObj = {
					title,
					routerPath
				};
				this.setTabsList(tabObj);
				this.$router.push({
					path: "/leaseImmovables"
				});
			},
			findAudit(obj) {
				this.actInfo = null;
				this.actInfo = obj;
        this.dialogForm = true;

				this.$nextTick(() => {
					this.$bus.$emit("transferaudit", "examine"); //需要审核
				});
			},
			actResult(re, node) {
				//取消：cancel，流转：success,流转结束：end,审核未通过：failed
				if(re === "cancel") {
					//取消关闭弹框，不做任何事件
				} else if(re === "success") {
					// this.$bus.$emit("refreshPage", ["home"]);
					this.$bus.$emit("closeTabsItem", this.$route.name);
					//刷新页面
					this.reload();
					
					let routerPath = "rentalSignContract";
			        let title = "出租合同申请列表";
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
					this.reload();
				} else if(re === "end") {
					//修改状态
					this.setState("success");
					// this.$bus.$emit("refreshPage", ["home"]);
					this.$bus.$emit("closeTabsItem", this.$route.name);
					//刷新页面
					this.reload();
				}
				this.dialogForm = false;
			},
			setState(state) {
				if(this.mydata.contractStatus == "contract_status-003") {
					this.mydata.contractStatus = "";
					if(state === "success") {
						this.mydata.contractStatus = "contract_status-007";
					} else if(state === "failed") {
						console.log("failed1");
						this.mydata.contractStatus = "contract_status-006";
					}
				} else if(this.mydata.contractStatus == "contract_status-004") {
					this.mydata.contractStatus = "";
					if(state === "success") {
						this.mydata.contractStatus = "contract_status-005";
					} else if(state === "failed") {
						console.log("failed");
						this.mydata.contractStatus = "contract_status-006";
					}
				}

				console.log("改变状态1");
				let token = sessionStorage.getItem("token");
				console.log("------------------------" + this.mydata.contractType);
				//改变状态
				Axios.post(
					"/api/epf-contract/transContract/change",
					qs.stringify({
						token: token,
						contractId: this.contractId,
						status: this.mydata.contractStatus
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
			reload() {
				this.getOneLease(this.$route.query.contractId);
			},
			back() {
				// this.$bus.$emit("refreshPage", ["home"]);
				this.$bus.$emit("closeTabsItem", this.$route.name);
				// let routerPath = `/rentalContractTemplate?contractId=${this.$route.query.contractId}&businessId=${this.$route.query.businessId}&procDefId=${this.$route.query.procDefId}&procInsId=${this.$route.query.procInsId}&taskId=${this.$route.query.taskId}`;
				// this.deleteTab(routerPath);
				// this.$router.replace("/rentalSignContract");
			},
//			打印
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
				console.log(val);
				this.removeTab(val);
				// this.refresh();
			});
			//刷新指定页面
			// this.$bus.$on("refreshPage", val => {
			//   this.needRefresh.push(...val);
			//   this.needRefresh = Array.from(new Set(this.needRefresh));
			// });
			this.getSelectOneData();
			window.addEventListener("scroll", this.handleScroll, true);
			this.screenWidth = document.body.clientWidth;
			const _this = this;
			window.onresize = () => {
				return(() => {
					window.screenWidth = document.body.clientWidth;
					_this.screenWidth = window.screenWidth;
					if(_this.screenWidth < 1700) {
						_this.searchBarFixed = false;
					} else {
						_this.searchBarFixed = true;
					}
				})();
			};

			//其他组件需要关闭标签页
			this.$bus.$on("closeTabsItem", val => {
				console.log(val);
				this.removeTab(val);
				// this.refresh();
			});
			//刷新指定页面
			// this.$bus.$on("refreshPage", val => {
			//   this.needRefresh.push(...val);
			//   this.needRefresh = Array.from(new Set(this.needRefresh));
			// });
		},
		watch: {
			screenWidth(oldval, newval) {
				this.screenWidth = oldval;
			}
		},
		destroyed() {
			// 销毁绑定
			window.removeEventListener("scroll", this.handleScroll);
			this.screenWidth = null;
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
	}

	.signaturelist .signaturelistcon {
		width: 50%;
		height: 50px;
		line-height: 75px;
		float: left;
	}

	.signaturelist .signaturelistcon span {
		color: #fe3f45;
		margin-right: 2px;
	}

	.signaturelist .signaturelistcon .signaturelistconTitle {
		float: left;
		width: 28%;
		height: 100%;
		border-bottom: none;
		color: #999999;
	}

	.signaturelist .signaturelistcon .signaturelistdetail {
		width: 50%;
		float: left;
		height: 100%;
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