<template>
  <!-- 抵押模板 -->
  <div class="signatureDetails_warp">
    <div
      class="signatureDetails_left"
      ref="signLeft"
      :class="searchBarFixed == true ? 'isFixed' :''"
    >
      <ul>
        <li
          v-for="(item,index) in detailsleftData"
          :key="index"
          @click="selectli(index)"
          :class="{liActive:statekey===index}"
        >{{item}}</li>
      </ul>
    </div>
    <div class="signatureDetails_list">
      <div style="margin: 10px auto;width: 100%;height: 40px;" v-if="this.contractView">
        <el-button type="warning" plain style="width: 98px;float: right;margin-left: 10px" @click="downUp()">下载</el-button>
        <el-button type="warning" plain style="width: 98px;float: right;" @click="printing()">打印</el-button>
      </div>
      <div class="signatureDetails_cont signlist0 signlist1">
      	<div ref="imageWrapper" style="padding: 20px;">
        <div class="signNum">
          <div class="signNumCon">
            <p v-if="rules.contractStatus!=='contract_status-008'">合同编号：{{rules.code?rules.code:''}}</p>
            <p v-if="rules.contractStatus=='contract_status-008'">合同鉴证号：{{rules.recordNo}}</p>
          </div>
        </div>
        <div class="signtitle">
          {{rules.contractName}}
          <div v-if="rules.contractStatus==='contract_status-007'" class="contractCancel">
            <span></span>合同已撤销
          </div>
          <div v-if="rules.contractStatus==='contract_status-005'" class="contractsuccess">
            <span></span>审核通过
          </div>
          <div v-if="rules.contractStatus==='contract_status-006'" class="contractnosuccess">
            <span></span>审核未通过
          </div>
          <div v-if="rules.contractStatus==='contract_status-004'" class="contractCancel">
            <span></span>审核中
          </div>
          <div v-if="rules.contractStatus==='contract_status-003'" class="contractCancel">
            <span></span>撤销审核中
          </div>
        </div>
        <div class="signDetail">
          <el-form :model="rules"  class="demo-form-inline" :inline="true" label-position="left">
            <el-form-item label="甲方(抵押人)：" required  style="width:96%" class="lineWid">
              <div>{{rules.firstParty}}</div>
            </el-form-item>
            <el-form-item label="甲方证件类型："  required :style="{'width':formLabelWidth}" >
              <div>{{rules.firstIdentificationTypeName}}</div>
            </el-form-item>
            <el-form-item :label="rules.firstIdentificationTypeName+'：'"  required :style="{'width':formLabelWidth}">
              <div>{{rules.firstIdentificationNum}}</div>
            </el-form-item>
            <el-form-item label="法定代表人：" required :style="{'width':formLabelWidth}"  v-if="rules.firstIdentificationType=='business_license'">
              <div>{{rules.firstLegalPerson}}</div>
            </el-form-item>
            <el-form-item label="法人身份证号：" required :style="{'width':formLabelWidth}"  v-if="rules.firstIdentificationType=='business_license'">
              <div>{{rules.firstLegalPersonIdNum}}</div>
            </el-form-item>
            <el-form-item label="委托代理人：" :style="{'width':formLabelWidth}" >
              <div>{{rules.firstAgentPerson}}</div>
            </el-form-item>
            <el-form-item label="代理人身份证号：" :style="{'width':formLabelWidth}" >
              <div>{{rules.firstAgentPersonIdNum}}</div>
            </el-form-item>
            <el-form-item label="甲方联系电话：" required :style="{'width':formLabelWidth}" >
              <div>{{rules.firstPhone}}</div>
            </el-form-item>
            <el-form-item label="甲方联系地址：" required :style="{'width':formLabelWidth}" >
              <div>{{rules.firstAddress}}</div>
            </el-form-item>
            <el-form-item label="乙方(抵押权人)：" required  style="width:96%" class="lineWid">
              <div>{{rules.secondParty}}</div>
            </el-form-item>
            <el-form-item label="乙方证件类型："  required :style="{'width':formLabelWidth}" >
              <div>{{rules.secondIdentificationTypeName}}</div>
            </el-form-item>
            <el-form-item :label="rules.secondIdentificationTypeName+'：'"  required :style="{'width':formLabelWidth}">
              <div>{{rules.secondIdentificationNum}}</div>
            </el-form-item>
            <el-form-item label="法定代表人：" required :style="{'width':formLabelWidth}"  v-if="rules.secondIdentificationType=='business_license'">
              <div>{{rules.secondLegalPerson}}</div>
            </el-form-item>
            <el-form-item label="法人身份证号：" required :style="{'width':formLabelWidth}"  v-if="rules.secondIdentificationType=='business_license'">
              <div>{{rules.secondLegalPersonIdNum}}</div>
            </el-form-item>
            <el-form-item label="委托代理人：" :style="{'width':formLabelWidth}" >
              <div>{{rules.secondAgentPerson}}</div>
            </el-form-item>
            <el-form-item label="代理人身份证号：" :style="{'width':formLabelWidth}" >
              <div>{{rules.secondAgentPersonIdNum}}</div>
            </el-form-item>
            <el-form-item label="乙方联系电话：" required :style="{'width':formLabelWidth}" >
              <div>{{rules.secondPhone}}</div>
            </el-form-item>
            <el-form-item label="乙方联系地址：" required :style="{'width':formLabelWidth}" >
              <div>{{rules.secondAddress}}</div>
            </el-form-item>
          </el-form>
        </div>
        <div class="signlist signlist2">
          <p class="signlistTi">第一条 抵押宗地的基本情况</p>
          <p>1.土地坐落:{{rules.landLocation}}</p>
          <p>2.土地性质:{{rules.landCharName}}</p>
          <p>3.使用权类型:{{rules.useTypeName}}</p>
          <p>4.土地用途:{{rules.firstClassUseName}}{{rules.secondClassUseName}}</p>
          <p>5.不动产权证号（或土地证号）:{{rules.warrantNum}}</p>
          <p>6.房产证号:{{rules.houseNum}}</p>
          <p>7.建设用地使用权出让合同号（或划拨决定书号）:{{rules.contractNum}}</p>
          <p>8.宗地总面积:{{rules.overshipArea?rules.overshipArea:0}}平方米</p>
          <p>9.抵押土地面积:{{rules.area?rules.area:0}}平方米</p>
          <p>10.抵押建筑物面积:{{rules.buildArea?rules.buildArea:0}}平方米</p>
          <p>11.抵押物价值认定方式：口双方协商口委托具有资质的评估机构评估</p>
          <p>12.地块的具体位置详见附图，附图已经双方签字盖章确认。</p>
        </div>
        <div class="signlist signlist3">
          <p class="signlistTi">第二条 本合同担保的主债权</p>
          <p>1.债权人:{{rules.creditor}}</p>
          <p>2.债务人:{{rules.obligor}}</p>
          <p>3.其他当事人:{{rules.otherParties}}</p>
          <!-- <p>4.主债权数额:{{rules.total}}（大写）</p> -->
          <!-- <p>4.主债权数额:（小写）{{rules.amountOfPrincipal}}万元 （大写）{{rules.total}}</p> -->
          <p>4.主债权数额:（小写）{{Division(rules.amountOfPrincipal)}}万元 （大写） {{NumToChinese(rules.amountOfPrincipal)}}</p>
          <p>5.债务履行期限:{{rules.term?rules.term:0}}年</p>
        </div>
        <div class="signlist signlist4">
          <p class="signlistTi">第三条 本合同抵押担保范围</p>
          <p>1.“地块”指本合同项下甲方向乙方出让土地使用权的区域，即本合同第五条界定的区域。</p>
          <p>2.“总体规划”指经中国政府批准的开发区域的开发建设总体规划。</p>
          <p>3.“成片开发规划”指依据总体规划编制的，经中国政府批准的在受让土地使用权区域内各项建设的具体布置和安排。</p>
          <p>4.“公用设施”指依照成片开发规划对地块进行综合性的开发建设，建成的供排水、供电、供热、道路、通信等设施。</p>
        </div>
        <div class="signlist signlist5">
          <p class="signlistTi">第四条 抵押期限</p>
          <p>
            建设用地使用权抵押期限为 {{rules.term}} 年,即{{rules.beginDate}}
            至{{rules.endDate}}(抵押期限不得超过原出让(或出租)合同约定的使用年限减去甲方已使用年限后的剩余年限)。
          </p>
        </div>
        <div class="signlist signlist6">
          <p class="signlistTi">第五条 抵押登记</p>
          <p>1.本合同自生效之日起 30 日内,由甲乙双方共同到不动产登记部门办理抵押登记; 未经抵押登记的,抵押权不得对抗第三人。</p>
          <p>2.抵押登记的事项发生变化,依法需要进行变更登记的,甲乙双方应当自登记事项变更之日起 30 日内共同到不动产登记部门办理抵押权变更登记手续。</p>
          <p>3.抵押权消灭时,甲乙双方应于抵押权消灭之日起日内共同到不动产登记部门办理抵押权注销登记。</p>
          <p>4.本合同甲乙双方应本着诚实信用的原则相互配合,并按照本条1-3款的规定办理相关手续。如果因其中任何一方的原因未能在前述期限内办妥相关手续的,该方应对另一方因此遭受的损失承担赔偿责任。</p>
          <p>5.双方约定的其它事项。</p>
        </div>
        <div class="signlist signlist7">
          <p class="signlistTi">第六条 甲方的义务</p>
          <p>1.甲方合法拥有本次抵押的建设用地使用权(地上建构筑物的所有权,若有),如抵押物属于依法须经有关部门批准或同意方可抵押的,甲方保证其已取得合法有效的批准或同意。</p>
          <p>2.抵押期间,抵押的不动产由甲方占有和管理,甲方应妥善管理、合理使用抵押的不动产,以维护抵押物的价值,并接受乙方的监督和检查,未经乙方书面同意,甲方不得将抵押的不动产全部或部分进行转让、抵偿第三方债务、赠与或以其他方式进行物权处分。但受让人代为清偿债务消灭抵押权的除外。</p>
          <p>3.抵押的不动产在抵押期间被采取查封、扣押等财产保全或执行措施的,抵押的不动产的权属发生争议或受到第三人的侵害,或者抵押的不动产发生其他不利于乙方抵押权实现的情形的,甲方应当在情形发生后30日内及时通知乙方,并配合乙方落实好本合同项下主债权及其他一切相关费用安全偿还的保障措施。</p>
          <p>4.甲方在抵押期间经济情况和信用情况发生重大变化等影响本公同项下主债权清偿的情形时,应在情形发生后30日内及时通知乙卞,并配合乙方落实好本合同项下主债权及其他一切相关费用安全偿还的保障措施。</p>
          <p>5.甲方应承担的其它义务请在附件中写明。</p>
        </div>
        <div class="signlist signlist8">
          <p class="signlistTi">第七条 乙方的义务</p>
          <p>1.乙方应在签订合同之前对抵押的不动产进行现场勘验和认真调查,对其权属、坐落、部位、现状及权属证书记载等有关情况了解清楚。</p>
          <p>2.在本合同抵押担保范围内的全部债权得到清偿后,乙方应协助甲方办理注销抵押登记。</p>
          <p>3.妥善保管抵押登记证明文件以及与本合同相关的其他资料,若遗失或毁损的应当负责补办并承担由此造成的损失。</p>
          <p>4.乙方应承担的其它义务请在附件中写明。</p>
        </div>
        <div class="signlist signlist9">
          <p class="signlistTi">第八条 抵押不动产的再抵押</p>
          <p>甲方将抵押不动产余额部分再次抵押时,应通知乙方并告知新抵押权人抵押不动产已经抵押的情况,但所担保债权不得超出余额部分的 10 %。</p>
        </div>
        <div class="signlist signlist10">
          <p class="signlistTi">第九条 抵押权的实现条件</p>
          <p>抵押期间,出现下列情形之一的,乙方有权实现抵押权,并就抵押不动产所得价款优先受偿:</p>
          <p>1.合同项下主债权履行期届满后,债务人未能按时履行债务或者延长的期限届满后仍不能履行。</p>
          <p>2.本合同项下主债权的债务人死亡或者被宣告死亡而无人代为羼行到期债务的;或者债务的合法继承人、受遗赠人拒绝履行到期债务的。</p>
          <p>3.甲方被依法宣告解散或破产的。</p>
          <p>4.甲方的行为足以使抵押不动产价值减少,乙方请求甲方恢复原炔或提供担保遭到拒绝,或抵押不动产被司法机关等有权机关采取查封等强制措施而甲方未根据乙方的要求落实债务偿还保障措施的。</p>
        </div>
        <div class="signlist signlist11">
          <p class="signlistTi">第十条 抵押权的实现方式</p>
          <p>1.当出现本合同第九条约定的情形之一时,乙方可经下列方式实现抵押权:</p>
          <p>(1)甲方和乙方达成协议直接以抵押不动产折价或者拍卖、变卖抵押物；</p>
          <p>(2)依照法律规定程序处理抵押物。</p>
          <p>2.乙方实现抵押权时,应通过专门的评估机构对抵押不动产的价值进行评估。乙方实现抵押权时不得损害社会公共利益和他人合法权益。</p>
          <p>3.实现抵押权所得价款,按下列顺序分配：</p>
          <p>(1)支付处分抵押物的费用;</p>
          <p>(2)扣缴抵押物应当缴纳的税费;</p>
          <p>(3)支付划拨土地使用权应缴纳的土地出让金;</p>
          <p>(4)偿还抵押权担保范围内的债权;</p>
          <p>(5)剩余价款交还抵押人。</p>
        </div>
        <div class="signlist signlist12">
          <p class="signlistTi">第十一条 抵押权的消灭</p>
          <p>抵押期间,出现下列情形之一时,抵押权消灭;</p>
          <p>1.抵押权因所担保的主债权清偿、提存、抵消、免除,混同等原因全部消灭时,抵押权随之消灭;</p>
          <p>2.抵押不动产因不可抗力发生毁损、灭失等情况且无代位物存在的,抵押权消灭;</p>
          <p>3.抵押权实现;</p>
          <p>4.抵押权存续期间届满,抵押权人没有行使抵押权</p>
        </div>
        <div class="signlist signlist13">
          <p class="signlistTi">第十二条 违约责任</p>
          <p>1.甲、乙任何一方违反本合同约定的义务,不履行或不完全履行合同,给对方造成经济损失的,应承担相应的违约责任,并应当赔偿对方由此遭受的全部损失。</p>
          <p>2.甲方因隐瞒抵押物存在共有、争议、被查封、被扣押、已经设定过抵押权等情况或提供的资料不实,采取欺诈手段取得登记而给乙方造成经济损失的,甲方应当承担赔偿责任。</p>
          <p>3.当甲方未按建设用地出让合同约定进行开发或违反其他有关规定,从而影响抵押权的实现时,由此产生的责任由甲方承担。</p>
          <p>4.甲方逾期不配合办理抵押权登记的,每逾期一日,按抵押物价值总额的 10 ‰支付违约金。</p>
          <p>5.乙方逾期不配合办理抵押权注销登记的,每逾期一日,按抵押物价值总额的 10 ‰支付违约金。</p>
        </div>
        <div class="signlist signlist14">
          <p class="signlistTi">第十三条 争议解决</p>
          <p>双方在履行本合同対程中如有纠纷,可由甲乙双方协商解决,也时向行政主管部门申请行政调解。</p>
          <p>协商或调解不成的,可选择以下第   种方式解决纠纷。</p>
          <p>1.向当地仲裁委员会申请仲裁。</p>
          <p>2.向抵押不动产所在地人民法院提起诉讼。</p>
        </div>
        <div class="signlist signlist15">
          <p class="signlistTi">第十四条 合同生效</p>
          <p>本合同自甲乙双方签字、盖章之日起生效。</p>
        </div>
        <div class="signlist signlist16">
          <p class="signlistTi">第十五条 双方其他约定</p>
          <p>甲乙双方确定,若以下约定内容与本合同其他款项约定存在不一致的,以本条约定内容为准:</p>
        </div>
        <div class="signlist signlist17">
          <p class="signlistTi">第十六条 附则</p>
          <p>本合同一式叁份,甲方执壹份、乙方执壹份,建设用地二级市场交易服务中心存档壹份,每份具有同等法律效力。</p>
          <div class="signlistwarp">
            <div class="signlistwarpTi">
              <span>甲方签字：</span>
            </div>
            <div class="signlistwarpTi">
              <span>乙方签字：</span>
            </div>
            <div class="signlistwarpTi">
              <span>身份证号：</span>
            </div>
            <div class="signlistwarpTi">
              <span>身份证号：</span>
            </div>
            <div class="signlistwarpTi">
              <span>证明人：</span>
            </div>
            <div class="signlistwarpTi">
              <span>证明人：</span>
            </div>
            <div class="signlistwarptime">
              <span>年</span>
              <span>月</span>
              <span>日</span>
            </div>
          </div>
        </div>
        <div class="signlist">
          <p class="signlistTi">附件</p>
          <ul class="signlistenclosure" v-if="tableData">
            <li v-for="(item,index) in tableData" :key="index">
              <span v-if="item.files.length!= 0">{{index+1}}.</span>
              <span style="color: #4671d5;">{{item.files.length== 0?'':item.files[0].fname}}</span>
            </li>
          </ul>
          <ul class="signlistenclosure" v-else>暂无</ul>
        </div>
        <div class="signlist" ref="signlist11" style="margin-top:0" v-show="signShow">
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
          <el-button
            type="warning"
            @click="examine(obj)"
            style="width: 98px;"
            v-if="!this.contractView"
            v-show="!signShow"
          >审核</el-button>
        </div>
        <div style="clear:both;"></div>
        <el-dialog title="审核" width="40%" :visible.sync="dialogForm" :append-to-body="true">
          <template>
            <div id="dialog">
              <actDialog :actInfo="actInfo" @patch="actResult" />
            </div>
          </template>
        </el-dialog>
      </div>
    </div>
    {{screenWidth}}
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import baseURL1 from "../../../../../../utils/config";
import Axios from "axios";
import qs from "qs";
//引入打印功能
import html2canvas from "html2canvas"
import JsPDF from 'jspdf'

export default {
  props: ["signShow"],
  data() {
    return {
			formLabelWidth: "48%",
      rules: {},
      baseUrl:null,
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
        "第十条",
        "第十一条",
        "第十二条",
        "第十三条",
        "第十四条",
        "第十五条",
        "第十六条",
        "签字部分",
        "附件"
      ],
      actInfo: {},
      handleData: "",
      dialogForm: false,
      dialogDownLand: false,
      screenWidth: "",
      screenHeight: "",
      contractId: "",
      tableData: [],
      belong: null,
      areaCode: null,
      tableSignData: null,
      contractView: null
    };
  },
  created() {
    window.scrollTo(0, 0);
    this.getSelectOneData();
    this.init();
    this.contractId = this.$route.query.contractId;
    this.baseUrl = baseURL1.baseURL1 + "/epf-document/document/downloadById?id=";
    this.contractView = this.$route.query.contractView;
  },
  methods: {
    ...mapActions(["deleteTab", "setTabsList","removeTab"]),
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
        if (res.code == "0000") {
          that.rules = res.data.list[0];
          that.belong = res.data.list[0].fileId;
          that.areaCode = res.data.list[0].cantonArea;
          that
            .$get(
              `/epf-document/docTemplete/getTempleteTreeByArea?id=0&belong=${that.belong}&areaCode=${that.areaCode}`,
              {}
            )
            .then(res => {
              let resData = JSON.parse(res.ztreeJson);
              for (let i = 0; i < resData.length; i++) {
                if (resData[i].code.indexOf("CONTRACT") != -1) {
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
    init() {
      this.obj.businessId = this.$route.query.businessId;
      this.obj.procInsId = this.$route.query.procInsId;
      this.obj.procDefId = this.$route.query.procDefId;
      this.obj.taskId = this.$route.query.taskId;
    },
    selectli(item) {
      this.statekey = item;
      var el = document.getElementsByClassName(`signlist${item}`)[0];
      this.$nextTick(function() {
        el.scrollIntoView() - 50;
      });
    },
    autoExamine() {
      let routerPath = "autoInspection";
      let title = "不动产自动核验";
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({ path: "/autoInspection" });
    },
    examine(obj, index) {
      this.actInfo = null;
      this.actInfo = obj;
      this.dialogForm = true;

      this.$nextTick(() => {
        this.$bus.$emit("transferaudit", "examine"); //需要审核
      });
    },
    actResult(re, node) {
      //取消：cancel，流转：success,流转结束：end,审核未通过：failed
      if (re === "cancel") {
        //取消关闭弹框，不做任何事件
      } else if (re === "success") {
        // this.$bus.$emit("refreshPage", ["home"]);
        this.$bus.$emit("closeTabsItem", this.$route.name);
        //刷新页面
        this.reload();
        
        let routerPath = "mortgageSignContract";
        let title = "抵押合同申请列表";
        let tabObj = { title, routerPath};
        this.setTabsList(tabObj);
        setTimeout(() => {
            this.$router.push({ path: routerPath})
        }, 100);
      } else if (re === "failed") {
        //修改状态
        this.setState("failed");
        // this.$bus.$emit("refreshPage", ["home"]);
        this.$bus.$emit("closeTabsItem", this.$route.name);
        //刷新页面
        this.reload();
      } else if (re === "end") {
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
      if (this.rules.contractStatus == "contract_status-003") {
        this.rules.contractStatus = "";
        if (state === "success") {
          this.rules.contractStatus = "contract_status-007";
        } else if (state === "failed") {
          console.log("failed1");
          this.rules.contractStatus = "contract_status-006";
        }
      } else if (this.rules.contractStatus == "contract_status-004") {
        this.rules.contractStatus = "";
        if (state === "success") {
          this.rules.contractStatus = "contract_status-005";
        } else if (state === "failed") {
          console.log("failed");
          this.rules.contractStatus = "contract_status-006";
        }
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
    },
    back() {
      // this.$bus.$emit("refreshPage", ["home"]);
      this.$bus.$emit("closeTabsItem", this.$route.name);
      // let routerPath = `/mortgageContractTemplate?contractId=${this.$route.query.contractId}&businessId=${this.$route.query.businessId}&procDefId=${this.$route.query.procDefId}&procInsId=${this.$route.query.procInsId}&taskId=${this.$route.query.taskId}`;
      // this.deleteTab(routerPath);
      // this.$router.replace("/mortgageSignContract");
    },
//  打印
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
  // display: inline-block;
  // position: absolute;
  // right: 110px;
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
  // top:0;
  // top: 104px;
  // z-index: 999;
  // left: 154px;
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
  width: 50%;
  height: 50px;
  line-height: 50px;
  display: flex;
}
.signaturelist .signaturelistcon .signaturelistconTitle {
  width: 30%;
  height: auto;
  border-bottom: none;
  color: #999999;
}
.signaturelist .signaturelistcon .signaturelistconTitle span {
  color: #fe3f45;
  margin-right: 2px;
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