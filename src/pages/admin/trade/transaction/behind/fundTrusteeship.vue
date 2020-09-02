<!--zijbtogr-->
<template>
  <div class="page-body">
    <div class="filter_wrap">
      <div class="content">
        <div id="trusteeship">
            <h2 class="title_h">
                <b style="color:#000;">
                  {{TransCertificateInfo.cantonCityName}}建设用地使用权资金托管协议
                </b>
            </h2>
            <div class="surface">
                <p v-if="TransCertificateInfo.transGoodsVoInfoList">甲方：{{TransCertificateInfo.transGoodsVoInfoList[index].ownerShip}}</p>
                <p>乙方：{{TransCertificateInfo.applyName}}</p>
                <p>丙方：{{TransCertificateInfo.tradingCenterName}}</p>
                <p>
                甲、乙、丙三方遵循平等自愿和诚实信用原则，经协商一致同意将国有建设用地使用权转让交易资金交丙方进行托管，现将有关事项订立如下协议：
                </p>
                <p>
                  第一条 甲方与乙方在{{TransCertificateInfo.tradingCenterName}}签订《{{TransCertificateInfo.cantonCityName}}国有建设用地使用权转让合同》（以下简称转让合同），甲方将位于<span v-if="TransCertificateInfo.transGoodsVoInfoList">{{TransCertificateInfo.transGoodsVoInfoList[index].location}}</span>>的国有建设用地使用权及其地
                上建筑物，建筑面积共计{{TransCertificateInfo.buildArea}}平方米，转让给乙方，并一致同意将全部交易价款（含竞得人交纳的竞买保证金）交丙方托管。丙方承诺
                将托管资金存在以下指定资金托管账户，不得挪作它用。
                </p>
                <p>户  名：<span>{{TransCertificateInfo.tradingCenterName}}</span></p>
                <p>账  户：<span>{{TransCertificateInfo.tradingCenterTrusteeAccount}}</span></p>
                <p>开户行：<span>{{TransCertificateInfo.tradingCenterOpeningBank}}</span></p>
                <p>
                    第二条  交易价款总额以转让交易双方签订的交易合同约定金额为准。乙方已缴纳款竞买保证金由丙方转入资金托管账户，合同剩余款项由乙方
                    在约定时间内存入丙方指定资金托管账户并向丙方提交有效凭证
                </p>
                <p>
                    第三条  三方约定，甲方办理托管资金支取时，由以下指定人员办理，资金转入以下指定账户。如指定人员不能亲自办理的，需交经公政的授权
                    委托书，由委托人代为理。
                </p>
                <p>
                    1、支取托管资金时甲方支取经办人员身份信息：
                </p>
                <p>姓   名：<span></span></p>
                <p>性   别：<span></span></p>
                <p>证件名称：<span></span></p>
                <p>证件号码：<span></span></p>
                <p>
                    2、支取托管资金汇入甲方账户信息：
                </p>
                <p>户  名：<span></span></p>
                <p>账  户：<span></span></p>
                <p>开户行：<span></span></p>
                <p>
                   第四条  全部交易价款到达资金托管账户后，丙方将出具《{{TransCertificateInfo.cantonCityName}}国有建设用地使用权二级市场交易资金托管凭证》（以下简称《托管凭证》）给转
                   让交易双方。《托管凭证》是支取托管资金的重要凭证，如果《托管凭证》发送遗失或毁损，需立即到丙方办理登记挂失手续。
                </p>
                <p>
                    第五条  在国有建设用地使用权转移登记已受理并审核通过之日起，可由约定的甲方支取经办人凭《托管凭证》、身份证明材料及《不动产权证书》
                    复印件或办结证明文件，填写《{{TransCertificateInfo.cantonCityName}}国有建设用地使用权二级市场交易资金托管支取凭证》（以下简称《支取凭证》），向丙方办理托管细节支取手续。
                </p>
                <p>
                    第六条   若因法院查封或其他国家机关限制交易，或交易双方约定终止交易的，经丙方同意，交易双方在合同上共同书面确认解除合同，凭交易合同、
                    《托管凭证》、身份证明材料，填写《支取凭证》，由交易双方共同向丙方办理托管资金支取手续。
                </p>
                <p>
                    第七条   甲、乙双方同意托管资金不计利息，丙方同意不收取资金托管费用。
                </p>
                <p>
                    第八条   交易双方因交易产生的任何纠纷与本协议无关，不影响本协议履行。
                </p>
                <p>
                    第九条  甲、乙、丙因协议产生的纠纷协商不成的，申请{{TransCertificateInfo.tradingCenterName}}仲裁委员会仲裁。
                </p>
                <p>
                    第十条   本协议一式三份，甲、乙、丙三方各执一份。
                </p>
                <ul>
                    <li>
                      <p v-if="TransCertificateInfo.transGoodsVoInfoList">甲方：{{TransCertificateInfo.transGoodsVoInfoList[index].ownerShip}}</p>
                      <p>法定代表人（或代理人）：</p>
                      <p>地址：</p>
                      <p>联系电话：</p>
                    </li>
                    <li>
                      <p>乙方：{{TransCertificateInfo.applyName}}</p>
                      <p>法定代表人（或代理人）：</p>
                      <p>地址：</p>
                      <p>联系电话：</p>
                    </li>
                    <li>
                      <p>丙方：{{TransCertificateInfo.tradingCenterName}}</p>
                      <p>法定代表人（或代理人）：</p>
                      <p>地址：{{TransCertificateInfo.tradingCenterAddress}}</p>
                      <p>联系电话：{{TransCertificateInfo.tradingCenterTel}}</p>
                    </li>
                </ul>
            </div>
            </div>
            <div class="btns_box">
                <div class="middleBox" style="text-align:center;">
                    <div class="button_border" @click="trusteeshipBook">下载</div>
                    <div class="button_bg" v-print="'#trusteeship'">打印</div>
                    <div class="button_default" @click="closeTabs">关闭</div>
                </div>
            </div>
      </div>
    </div>
   </div>
</template>
<script>
import transferTable from "@/components/transferTable";
import axios from "axios";
import {mapActions,mapState} from "vuex";
import baseURL1 from "../../../../../utils/config.js";

export default {
  name: "fundTrusteeship",
  components: {
    transferTable
  },
  data() {
    return {
        TransCertificateInfo: {},
        titles: "",
        userId:"",
        index:0,
    };
  },
  created(){
    if(this.$route.query.index){
      this.index = this.$route.query.index;
    }

    this.userId = this.$route.query.userId;
   this.getTransCertificateInfoBytargetId();
  },
  methods: {
    ...mapActions(['setTabsList','closeAndTo']),
    closeTabs(){
        window.history.go(-1);
    },
    // 下载资金委托协议
    trusteeshipBook(){
      let url = baseURL1.baseURL1 + "/epf-trade/pdf/downloadTrusteeshipBook?licenseId=" + this.$route.query.id+"&index="+this.index
      window.open(url);
    },
    //获取证书的信息
    getTransCertificateInfoBytargetId(){
      this.$get("/epf-trade/transcertificateinfo/getTransCertificateInfoBylicenseId?licenseId=" + this.$route.query.id,{}).then(res => {
        if(res.code == 0){
          console.log('获取的信息是--------------：'+res.TransCertificateInfo);
          this.TransCertificateInfo = res.TransCertificateInfo;
          this.titles = res.TransCertificateInfo.area+'建设用地使用权资金托管协议';
        }
      });
    },
  }
};
</script>
<style scoped>
.filter_wrap{
  box-sizing: border-box;
  padding: 40px 70px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.content{
    padding: 70px 80px;
    background-color: #fafafa;
}
.title_h{
    text-align: center;
    font-size: 18px;
}
.surface{
    margin-top: 70px;
    padding: 5px 45px;
}
.btns_box{
    width: 300px;
    margin: 0 auto;
    margin-top: 45px;
}
.surface span{
    color: #205ee4;
}
.surface ul{
    display: flex;
    justify-content:space-around;
    margin-top: 45px;
}
.surface p{
    line-height: 24px;
    letter-spacing:2px;
}
</style>
