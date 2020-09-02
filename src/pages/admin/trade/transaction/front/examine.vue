<!--qmufufhe-->
<template>
  <div class="page-body">
    <div class="filter_wrap">
      <div class="titles">
        <span></span>
        <b>
          {{titles}}
        </b>
      </div>
      <div class="contents">

        <el-row :gutter="20">
          <el-col :span="24">
            <div style="text-align:right;margin-buttom:200px;">
              <el-button @click="cancel" size="small">取消</el-button>
              <el-button type="success" @click="examine" size="small">审核</el-button>
            </div>
          </el-col>
        </el-row>

        <el-form ref="form" :model="form" label-width="160px">
          <div class="content_right">
            <el-form-item label="标的编号：">
              <el-input disabled v-model="license.targetNo"></el-input>
            </el-form-item>
            <el-form-item label="竞买号：">
              <el-input disabled v-model="license.licenseNo"></el-input>
            </el-form-item>
            <el-form-item label="是否成立全资子公司：">
              <el-radio-group v-model="license.isNewCompany" disabled>
                <el-radio label="0">成立全资子公司</el-radio>
                <el-radio label="1">不成立全资子公司</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="交易方式：">
              <el-input disabled v-model="license.transType"></el-input>
            </el-form-item>
            <el-form-item label="条件设置部门：">
              <el-input disabled v-model="license.conditionOrganName"></el-input>
            </el-form-item>
          </div>
          <div class="content_btns">
            <el-button type="primary" size="small" style="float:left;margin-left:12px;margin-top:1px;"
                       @click="peopleInfo()">查看
            </el-button>
          </div>
          <div class="content_left">
            <el-form-item label="竞买人：">
              <el-input disabled v-model="license.bidderName"></el-input>
            </el-form-item>
            <el-form-item label="交易份额：">
              <el-input disabled v-model="license.percent"></el-input>
            </el-form-item>
            <el-form-item label="是否联合竞买：" prop="resource">
              <el-radio-group v-model="license.buyType" disabled>
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="竞买资格条件：">
              <el-input disabled v-model="license.transCondition"></el-input>
            </el-form-item>
          </div>
          <div class="text_domain">
            <div class="content_bottom">
              <el-form-item label="竞买人资料：">
                <el-row>
                  <el-col :span="3" >
                    <div  class="showBut" style="cursor:pointer" @click="bids_for_books = true" v-if="TransCertificateInfo && TransCertificateInfo.isBidder == 0">竞买申请书</div>
                  </el-col>
                </el-row>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <!-- <el-dialog title="公司详情" class="companyInfo" width="60%" :visible.sync="companyForm" :append-to-body='true'> -->
      <div class="companyInfoBox" v-if="license.isNewCompany == 0">
        <!-- 股东信息 -->
        <div class="holdersTop">
          <span class="leftDot"></span>
          <span class="leftTitle">子公司信息</span>
        </div>
        <div class="companyInfoBorder" v-if="childCompany&&childCompany!=null" style="border-top:1px solid rgb(206, 206, 206);">
          <el-row>
            <el-col :span="12">公司名称: <span class="txt">{{childCompany.name}}</span></el-col>
            <el-col :span="12">联系人: <span class="txt">{{childCompany.contact}}</span></el-col>
          </el-row>

          <el-row>
            <el-col :span="12">传真: <span class="txt">{{childCompany.fax}}</span></el-col>
            <el-col :span="12">联系电话: <span class="txt">{{childCompany.contactTel}}</span></el-col>
          </el-row>

          <el-row>
            <el-col :span="12">公司电话: <span class="txt">{{childCompany.tel}}</span></el-col>
            <el-col :span="12">联系人职务: <span class="txt">{{childCompany.contactOffice}}</span></el-col>
          </el-row>

          <el-row>
            <el-col :span="12">委托人: <span class="txt">{{childCompany.trustName}}</span></el-col>
            <el-col :span="12">法人代表: <span class="txt">{{childCompany.corporation}}</span></el-col>
          </el-row>

          <el-row>
            <el-col :span="12">注册资金(万元): <span class="txt">{{childCompany.regCapital}}</span></el-col>
            <el-col :span="12">备注: <span class="txt">{{childCompany.reamrk}}</span></el-col>
          </el-row>

        </div>
        <!-- 股东信息 -->
        <div class="holdersTop">
          <span class="leftDot"></span>
          <span class="leftTitle">股东信息</span>
        </div>
        <div>
          <div class="companyInfoBorder" v-if="holdersData!=null&&holdersData"  :style="index==0?'border-top:1px solid rgb(206, 206, 206)':''"
               v-for="(item,index) in holdersData" :key="index">
            <el-row>
              <el-col :span="12">股东名称: <span class="txt">{{item.name}}</span></el-col>
              <el-col :span="12">地址: <span class="txt">{{item.address}}</span></el-col>
            </el-row>

            <el-row>
              <el-col :span="12">股东证件号: <span class="txt">{{item.idno}}</span></el-col>
              <el-col :span="12">电子邮箱: <span class="txt">{{item.email}}</span></el-col>
            </el-row>

            <el-row>
              <el-col :span="12">电话: <span class="txt">{{item.tel}}</span></el-col>
              <el-col :span="12">投资比例: <span class="txt">{{item.percent}}</span></el-col>
            </el-row>

            <el-row>
              <el-col :span="24">备注: <span class="txt">{{item.remark}}</span></el-col>
            </el-row>

          </div>
        </div>
      </div>


      <!-- </el-dialog> -->

    </div>
    <el-dialog title="查看详情" class="peopleInfo" width="60%" :visible.sync="dialogForm" :append-to-body='true'>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane :label="item.username" :name="item.id" v-for="(item,index) in peopleData" :key="index">
          <div class="peopleInfoBox">
            <div class="peopleBorder">
              <el-row :gutter="24">
                <el-col :span="12" >姓名：{{item.username}}</el-col>
                <el-col :span="12">证件类型：{{item.certificatetype}}</el-col>
              </el-row>

              <el-row :gutter="24" style="margin-top: 3%">
                <el-col :span="12" >手机号码：{{item.telPhone}}</el-col>
                <el-col :span="12">证件号码：{{item.idnumber}}</el-col>
              </el-row>


              <el-row :gutter="24" style="margin-top: 3%">
                <el-col :span="12" >占比：{{item.percent}}</el-col>
                <el-col :span="12">邮箱：{{item.emial}}</el-col>
              </el-row>

              <el-row :gutter="24" style="margin-top: 3%">
                <el-col :span="24" >联系地址：{{item.address}}</el-col>
              </el-row>

            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>


    <el-dialog title="审核" width="40%" :visible.sync="RedialogForm" :append-to-body='true' v-if="RedialogForm">
      <template>
        <div id="dialog" v-if="RedialogForm">
          <actDialog :actInfo="actInfo" @patch="actResult"/>
        </div>
      </template>
    </el-dialog>

    <!-- 竞买申请书 -->
    <el-dialog
      class="companyInfo includedBox bids_for_books"
      width="600px"
      :visible.sync="bids_for_books"
      top="10px"
      :append-to-body="true"
      :show-close="false"
    >
      <div style="height:720px;box-sizing:border-box;padding:20px;position: relative;">
        <div class="borderImg">
          <img
            src="../../../../../assets/images/included_border.png"
            style="width:100%;height:100%"
          >
        </div>
        <div style="padding: 30px;position: absolute;z-index: 10;top: 11px;">
          <div id="printApplyBook">
            <div style="text-align:center;margin:0 auto;font-size:20px;font-weight:800;"
            >{{TransCertificateInfo.cantonCityName}}国有建设用地使用权转让竞买申请书</div>
            <div>
              <p style="font-weight:700;margin:20px 0;">{{TransCertificateInfo.tradingCenterName}}</p>
              <p style="text-indent: 2em;">
                经认真阅读
                <b>{{TransCertificateInfo.targetNo}}</b>标的物，即
                <b>{{TransCertificateInfo.targetNo}}{{TransCertificateInfo.ransactionType}}{{TransCertificateInfo.circulation}}</b>交易文件及相关资料，我方完全接受并愿意
                遵守该文件的规定和要求，且对该交易文件及相关资料均无异议。我方现在正式申请你参加你方组织的该标的网上交易活动。
              </p>
              <p style="text-indent: 2em;margin:20px 0;">
                我方愿意按{{TransCertificateInfo.ransactionType}}{{TransCertificateInfo.circulation}}文件规定，缴纳竞买保证金：
                <b>{{TransCertificateInfo.amount}}万元</b>。
              </p>
              <p style="text-indent: 2em;">
                若能竞得该标的物。我方保证按照本次{{TransCertificateInfo.ransactionType}}{{TransCertificateInfo.circulation}}交易文件的规定和要求提交所有资料，并对其真实性和完整性负责，履行全部
                义务。如未按规定要求提交资料或出现不能按期付款等违规违约行为，我方愿意按交易文件约定，承担全部责任，并赔偿由此产生的损失。
              </p>
              <p
                style="text-indent: 2em;margin:16px 0;"
              >我方承诺在竞得该标的物使用权后，5个工作日内将成交额余款转入指定资金托管账户，全权委托并配合贵方办理不动产登记相关手续。</p>
              <p style="text-indent: 2em;margin:25px 0;">特此申请。</p>
              <p>
                申请人：
                <span>{{TransCertificateInfo.applyName}}</span>
              </p>
              <p>
                法定代表人签字：
                <span></span>
              </p>
              <p>
                联系人：
                <span>{{TransCertificateInfo.contactName}}</span>
              </p>
              <p>
                地址：
                <span>{{TransCertificateInfo.applyAddress}}</span>
              </p>
              <p>
                电话：
                <span>{{TransCertificateInfo.applyTel}}</span>
              </p>
              <p>
                邮政编码：
                <span>{{TransCertificateInfo.zipCode}}</span>
                <i style="float:right;">
                  申请日期：
                  <i style="color:#000;">{{TransCertificateInfo.bidderTime}}</i>
                </i>
              </p>
            </div>
          </div>
          <div style="text-align:center;margin-top:3%;">
            <div class="button_border" @click="downApplyBook()">下载</div>
            <div class="button_bg" v-print="'#printApplyBook'">打印</div>
            <div class="button_default" @click="bids_for_books = false">关闭</div>
          </div>
        </div>
      </div>
    </el-dialog>


  </div>
</template>
<script>
  import transferTable from "@/components/transferTable";
  import Bus from "../../../../../utils/bus";
  import axios from "axios";
  import {mapActions, mapState} from "vuex";
  import baseURL1 from "../../../../../utils/config.js";

  export default {
    name: "examine",
    components: {
      transferTable
    },
    data() {
      return {
        titles: '审核信息',
        form: {
          name: 'DAZ2018002',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '', //是否全资子公司
          transaction_share: '', //交易份额
          union: '', //是否联合竞买
          desc: '',
          examine: '',
          compete: '',
          text: '',
          time: ''
        },
        peopleData: [
          {
            id: '',
            name: '',
            cardType: '',
            phone: '',
            cardNum: '',
            email: '',
            address: ''
          }
        ],
        // 子公司信息
        childCompany: {},
        //股东信息
        holdersData: [
          {
            name: '',
            address: '',
            cradNum: '',
            email: '',
            phone: '',
            investment: '',
            remark: '',
          },
        ],
        corporate_name: true,
        dialogForm: false,
        companyForm: true,
        activeName: '',
        license: {},
        RedialogForm: false,   //是否显示审核窗
        actInfo: {   //传入审核窗的数据
          taskId: '',
          procDefId: '',
          procInsId: '',
          businessId: '',
        },
          bids_for_books:false,
          qualifications:false,
          targetData:[],
          userInfo:{},
          transEndDetail:{},
        TransCertificateInfo:{},
        userId:''
      };
    },
    methods: {
      ...mapActions(['setTabsList']),
      //获取证书的信息
      getTransCertificateInfoBytargetId(){
        this.$get("/epf-trade/transcertificateinfo/getTransCertificateInfoBylicenseId?licenseId=" + this.$route.query.id,{}).then(res => {
          if(res.code == 0 && null != res.TransCertificateInfo){
            debugger
            console.log('获取的信息是--------------：'+res.TransCertificateInfo);
            this.TransCertificateInfo = res.TransCertificateInfo;
          }
        });
      },
      queryData(targetId, id) {
        //查询证书数据
        this.getTransCertificateInfoBytargetId();

        var that = this;
        // 审核页面数据请求方法
        that.$get("/epf-trade/admin/translicense/getPreaudit", {targetId: targetId, licenseId: id}).then(res => {
          if (res.code == 0) {
            debugger
            that.license = res.map.befoAuditPageVo;
            //储存用户ID
            this.userId = res.map.befoAuditPageVo.bidderId;

            // 标的详情
            that.$get("/epf-trade/admin/transtarget/transTargetDetails?targetId=" + targetId+"&userId="+res.map.befoAuditPageVo.bidderId,{}).then(res => {
                console.log('标的详情返回',res)
                if(res.code == 0){
                    that.targetData = res.map;
                }
            });

            that.childCompany = res.map.transProjectDealerErntity ? res.map.transProjectDealerErntity : null; //子公司
            that.holdersData = res.map.transProjectDealeList ? res.map.transProjectDealeList : null; //子公司股东列表
            that.peopleData = res.map.bidders // 竞买人信息
          } else {
            this.$message.error(res.msg) //失败
            //如果没有数据
            if (res.msg == '前置审核流程没有启动') {
              //关闭当前页面
              this.$bus.$emit('closeTabsItem', this.$route.name)
            }
          return
        }
        this.activeName = this.peopleData[0].id
        })
      },
      cancel(){ //关闭当前窗口
        //关闭当前tab
        this.$bus.$emit('closeTabsItem',this.$route.name);
      },
      actResult(re){ //审核窗的回调方法
        // alert("回调方法")
        //取消：cancel，流转：success,流转结束：end,审核未通过：failed
        if(re==="cancel"){
          //取消关闭弹框，不做任何事件
        }else if(re==="success"){
          //刷新页面
          this.$bus.$emit('refreshPage',['home','frontAudit']);
          //关闭当前tab
          //关闭当前页面
          this.$bus.$emit('closeTabsItem',this.$route.name);
          //关闭当前页面
          this.$bus.$emit('closeTabsItem','frontAudit');
          let routerPath = "tradPreReview";
          let title = "资格前审";
          let tabObj = { title, routerPath};
          this.setTabsList(tabObj);
          setTimeout(() => {
            this.$router.push({ path: routerPath})
          }, 100);
        }else if(re==="failed"){
          //状态改为资格前审未通过
          var id = this.actInfo.businessId;
          this.changeStatus(id,"license_status-005");
          //刷新页面
          this.$bus.$emit('refreshPage',['home','frontAudit']);
          //关闭当前tab
          //关闭当前页面
          this.$bus.$emit('closeTabsItem',this.$route.name);
          //关闭当前页面
          this.$bus.$emit('closeTabsItem','frontAudit');
          let routerPath = "tradPreReview";
          let title = "资格前审";
          let tabObj = { title, routerPath};
          this.setTabsList(tabObj);
          setTimeout(() => {
            this.$router.push({ path: routerPath})
          }, 100);
        }else if(re==="end"){
          var id = this.actInfo.businessId;
          //状态改为保证金缴纳中
          this.changeStatus(id,"license_status-006");
          //刷新页面
          this.$bus.$emit('refreshPage',['home','frontAudit']);
          //关闭当前页面
          this.$bus.$emit('closeTabsItem',this.$route.name);
          //关闭当前页面
          this.$bus.$emit('closeTabsItem','frontAudit');
          let routerPath = "tradPreReview";
          let title = "资格前审";
          let tabObj = { title, routerPath};
          this.setTabsList(tabObj);
          setTimeout(() => {
            this.$router.push({ path: routerPath})
          }, 100);
        }
        this.RedialogForm = false;
      },
      examine(){ //审核按钮
        this.RedialogForm = true;
        // this.actInfo=obj;
        this.$nextTick(()=>{
          Bus.$emit('transferaudit', 'examine')//需要审核
        })
      },
      // 下载竞买申请书
      downApplyBook(){
          let url = baseURL1.baseURL1 + "/epf-trade/pdf/download?licenseId=" + this.$route.query.id
          window.open(url);
      },

      getTimes(fmt, date) {
        var o = {
          "M+": date.getMonth() + 1, //月份
          "d+": date.getDate(), //日
          "h+": date.getHours(), //小时
          "m+": date.getMinutes(), //分
          "s+": date.getSeconds(), //秒
          "q+": Math.floor((date.getMonth() + 3) / 3), //季度
          "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        this.form.time = fmt;
      },
      companyInfo() {
        this.companyForm = true;
      },
      peopleInfo(id, index) {
        this.dialogForm = true;
      },
      changeStatus(id, status) {
        // params 的类型是对象
        this.$post("/epf-trade/admin/translicense/updateJudgeState", {id: id, status: status,userId:this.userId}).then(res => {
          // res 是返回结果
          if (res.code == '0') {
            // alert("修改成功")
          }else{
            this.$message.error(res.msg);
          }
        })
      }
    },
    created() {
      var that = this;
      //获取的证书信息
      this.$watch("form.resource", function (newValue, oldValue) {
        if (this.form.resource == '成立全资子公司') {
          this.corporate_name = true;
          this.titles = '审核信息';
        } else {
          this.corporate_name = false;
          this.titles = '查看审核结果';
        }
      })
      this.queryData(this.$route.query.targetId, this.$route.query.id); //调用请求

      //组件加载时初始化必要信息
      that.actInfo = {
        businessId: this.$route.query.businessId,
        taskId: this.$route.query.taskId,
        procInsId: this.$route.query.procInsId,
        procDefId: this.$route.query.procDefId
      }
    },
    mounted() {
      this.getTimes('yyyy-MM-dd hh:mm:ss', new Date());
    }
  };
</script>
<style scoped>

  .titles {
    padding: 15px;
    font-size: 16px;
    overflow: auto;
    background-color: #f8f8f8;
  }

  .titles span {
    width: 5px;
    height: 20px;
    float: left;
    background-color: #ffa000;
  }

  .titles b {
    margin-left: 10px;
  }

  .content_right {
    width: 45%;
    float: left;
  }

  .content_left {
    width: 45%;
    float: right;
  }

  .content_btns {
    width: 10%;
    padding-top: 3px;
    float: right;
    text-align: right;
  }

  .contents {
    margin-top: 25px;
  }

  .content_bottom {
    float: left;
    width: 90%;
  }

  .text_domain {
    width: 100%;
    overflow: auto;
  }

  .text_domain span {
    float: right;
    margin: 160px 30px 0 0;
  }

  .peopleInfoBox {
    padding: 50px 40px;
  }

  .companyInfoBox {
    padding: 30px 30px;
    clear: both;
  }

  .peopleBorder {
    width: 100%;
    padding: 10px 10px;
    border: 1px solid rgb(206, 206, 206);
  }

  .companyInfoBorder {
    width: 100%;
    padding: 10px 10px;
    border: 1px solid rgb(206, 206, 206);
    border-top: none;
  }

  .holdersTop {
    margin: 15px 0px;
    height: 20px;
  }

  .holdersTop .leftDot {
    display: block;
    width: 5px;
    height: 22px;
    border-radius: 5px;
    background: #fea200;
    float: left;
  }

  .holdersTop .leftTitle {
    font-size: 16px;
    padding-left: 15px;
  }
</style>

<style scoped>
  .peopleInfo .el-dialog .el-dialog__body {
    padding: 0 !important;
    position: relative;
    top: -1px;
  }

  .companyInfo .el-dialog .el-dialog__body {
    padding: 0 !important;
    position: relative;
    top: -1px;
  }

  .peopleInfo .el-dialog .el-dialog__body {
    padding: 0 !important;
    position: relative;
    top: -1px;
  }
  .companyInfo .el-dialog .el-dialog__body {
    padding: 0 !important;
    position: relative;
    top: -1px;
  }
  .includedBox .el-dialog .el-dialog__header {
    display: none;
  }
  .includedBox .el-dialog {
    border-radius: 10px;
    border: 3px solid #cdd3dc;
  }
  .qualifications_content b {
    color: #ffa100;
  }
  .account_entry {
    border-color: #dfdfdf;
  }
  .bids_for_books p {
    line-height: 24px;
  }
  .bids_for_books span,
  .bids_for_books b {
    color: #fea100;
  }

  /*新增样式开始*/
  .bidder_information {
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
  }
  .bidder_information li {
    color: #409eff;
    cursor: pointer;
  }
  .content_bottom {
    float: left;
    width: 90%;
  }

  .showBut{
    color: #0AADF7;
    margin-top: 1em;
    margin-left: 1em;
  }

</style>

