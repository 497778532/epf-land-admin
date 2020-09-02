<template>
  <div class="page-body">
    <div class="filter_wrap">
      <div class="titles">
        <span></span>
        <b>审核信息</b>
      </div>
      <div class="contents">

        <el-row :gutter="20">
          <el-col :span="24">
            <div  style="text-align:right;margin-buttom:200px;" >
              <el-button @click="cancel" size="small">取消</el-button>
              <el-button type="success" @click="examine" size="small">审核</el-button>
            </div>
          </el-col>
        </el-row>

        <el-form ref="form"  :model="list" label-width="160px">
        <div class="content_right">
            <el-form-item label="标的编号：">
              <el-input disabled v-model="list.targetNo"></el-input>
            </el-form-item>
            <el-form-item label="竞买号：">
              <el-input disabled v-model="list.licenseNo"></el-input>
            </el-form-item>
            <el-form-item label="是否成立全资子公司：">
              <el-radio-group v-model="list.isNewCompany" disabled>
                <el-radio label="0">成立全资子公司</el-radio>
                <el-radio label="1">不成立全资子公司</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item v-if="list.isNewCompany=='1'" label="公司名称：">
              <template>
                <span style="cursor: pointer;" @click="companyInfo()">{{list.bidderId}}</span>
              </template>
            </el-form-item> -->
            <el-form-item label="交易方式：">
              <el-input disabled v-model="list.transType"></el-input>
            </el-form-item>
            <el-form-item label="条件设置部门：">
              <el-input disabled v-model="list.conditionOrganName"></el-input>
            </el-form-item>
          </div>
          <div class="content_btns">
            <el-button
              type="primary"
              size="small"
              style="float:left;margin-left:12px;margin-top:1px;"
              @click="peopleInfo()"
            >查看</el-button>
          </div>
          <div class="content_left">
            <el-form-item label="竞买人：" disabled>
              <el-input v-model="list.bidderName" disabled></el-input>
            </el-form-item>
            <el-form-item label="是否联合竞买：" prop="resource">
              <el-radio-group v-model="list.buyType" disabled>
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="交易份额%：" v-if="list.union=='1'">
              <el-input v-model="list.percent"></el-input>
            </el-form-item>
            <el-form-item label="成交价：">
              <el-input v-model="list.transPrice" disabled></el-input>
            </el-form-item>
            <el-form-item label="竞买资格条件：">
              <el-input v-model="list.transCondition" disabled></el-input>
            </el-form-item>
          </div>
          <div class="text_domain">
            <div class="content_bottom">
              <el-form-item label="竞买人资料：">
                <ul class="bidder_information">
                  <li @click="bids_for_books = true">竞买申请书</li>
                  <!-- <li @click="account_entry = true">入账申请书</li> -->
                  <li @click="qualifications = true">资格确认书</li>
                  <li @click="candidates">竞得入选人确认书</li>
                  <li @click="toNotice">成交确认书</li>
                  <li @click="clinch = true">成交款缴款通知书</li>
                  <li @click="tradeService = true">交易服务费缴费通知书</li>
                  <li @click="toFundTrusteeship">资金托管协议</li>
                </ul>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <el-dialog
      title="查看详情"
      class="peopleInfo"
      width="60%"
      :visible.sync="dialogForm"
      :append-to-body="true"
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane :label="item.username" :name="item.id" v-for="(item,index) in peopleData" :key="index">
          <div class="peopleInfoBox">
              <div class="peopleBorder">
                  <el-row :gutter="24">
                    <el-col :span="12">姓名 ：{{item.username}}</el-col>
                    <el-col :span="12">证件类型 ：{{item.certificatetype}}</el-col>
                  </el-row>
                  <el-row :gutter="24" style="margin-top: 3%">
                      <el-col :span="12">手机号码 ：{{item.telPhone}}</el-col>
                      <el-col :span="12">证件号码 ：{{item.idnumber}}</el-col>
                  </el-row>    
                  <el-row :gutter="24" style="margin-top: 3%">
                      <el-col :span="12">占比 ：{{item.percent}}</el-col>
                      <el-col :span="12">邮箱 ：{{item.emial}}</el-col>
                  </el-row>
                  <el-row :gutter="24" style="margin-top: 3%">
                      <el-col :span="24">联系地址 ：{{item.address}}</el-col>
                  </el-row>
              </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <div class="companyInfoBox" v-if="list.isNewCompany == 0">
            <!-- 股东信息 -->
            <div class="holdersTop">
                <span class="leftDot"></span>
                <span class="leftTitle">子公司信息</span>
            </div>
            <div class="companyInfoBorder" style="border-top:1px solid rgb(206, 206, 206);">

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
                <div class="companyInfoBorder" :style="index==0?'border-top:1px solid rgb(206, 206, 206)':''" v-for="(item,index) in holdersData" :key="index">
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

    <!-- 交易服务费缴费通知书 -->
    <el-dialog
      :title="title"
      class="companyInfo"
      width="60%"
      top="10px"
      :visible.sync="tradeService"
      :append-to-body="true"
    >
      <div class="companyInfoBox">
        <div id="printTransBook1">
          <h1 class="titleFont">{{title}}</h1>
          <h1 class="titleFont">交易服务费缴费通知书</h1>
          <div class="middleBox">
            <table border="1" width="100%" class="tradeServiceTable">
              <tr>
                <td width="120" class="headerBg">标的编号</td>
                <td colspan="2" style="color:#4573d6;">{{transBook.targetNo}}</td>
              </tr>
              <tr>
                <td rowspan="5" class="headerBg">项目名称</td>
                <td width="200" class="titleColor">付款人名称</td>
                <td>{{transBook.winnerPerson}}</td>
              </tr>
              <tr>
                <td class="titleColor">成交万元（万元）</td>
                <td>{{transBook.endPrice}}</td>
              </tr>
              <tr>
                <td class="titleColor">保证金（万元）</td>
                <td>{{transBook.amount}}</td>
              </tr>
              <tr>
                <td class="titleColor">交易服务费（元）</td>
                <td>
                  <p>小写：{{transBook.serviceMoney}}</p>
                  <p>大写：{{transBook.serviceMoneyUp}}</p>
                </td>
              </tr>
              <tr>
                <td class="titleColor">联系电话</td>
                <td>{{transBook.winnerTel}}</td>
              </tr>
              <tr>
                <td rowspan="4" class="headerBg">收款人信息</td>
                <td class="titleColor">开户单位</td>
                <td>{{transBook.openAccountOrg}}</td>
              </tr>
              <tr>
                <td class="titleColor">开户行</td>
                <td>{{transBook.openBank}}</td>
              </tr>
              <tr>
                <td class="titleColor">账户</td>
                <td>{{transBook.account}}</td>
              </tr>
              <tr>
                <td class="titleColor">联系电话</td>
                <td>{{transBook.payeeTel}}</td>
              </tr>
            </table>
          </div>
          <div class="middleBox">
            <p>
              <span style="font-weight:800;">特别提示：</span>本交易剩余价款应该网上交易结束后3个工作日内缴纳。
            </p>
            <p style="margin-top:10px;">根据中共XX省委XX省人民政府《关于开展降低企业成本优化发展环境专项行动的通知书》文件的精神，交易服务费减半收取。</p>
            <h3 class="btnInfo">{{transBook.tradingCenter}}</h3>
            <h3 class="btnInfo" style="margin-top:8px;">{{transBook.transDate}}</h3>
          </div>
        </div>
        <div class="middleBox" style="text-align:center;">
          <div class="button_border" @click="serviceFeeBook">下载</div>
          <div class="button_bg" v-print="'#printTransBook1'">打印</div>
          <div class="button_default" @click="tradeService = false">关闭</div>
        </div>
      </div>
    </el-dialog>

    <!-- 竞得入选人确认书 -->
    <el-dialog
      class="companyInfo includedBox"
      width="610px"
      :visible.sync="included"
      top="10px"
      :append-to-body="true"
      :show-close="false"
    >
      <div style="height:690px;box-sizing:border-box;padding:20px;position: relative;">
        <div class="borderImg">
          <img
            src="@/assets/images/included_border.png"
            style="width:100%;height:100%"
          >
        </div>
        <div style="padding:38px;position:relative;z-index:10;">
          <div id="printWinner">
            <div
              style="width:330px;text-align:center;margin:0 auto;font-size:20px;font-weight:800;"
            >{{transEndDetail.region}}国有建设用地使用权二级市场竞得入选人通知确认书</div>
            <table width="100%" class="includedTable">
              <tr>
                <td colspan="3">
                  项目编号：
                  <span style="font-weight:800;">{{transEndDetail.targetNo}}</span>
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  原使用权人：
                  <span style="font-weight:800;">{{transEndDetail.oldPerson}}</span>
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  竞得入选人名称：
                  <span style="font-weight:800;">{{transEndDetail.newPerson}}</span>
                </td>
              </tr>
              <tr>
                <td rowspan="2" width="30px">
                  <span style="font-weight:800;">最高报价</span>
                </td>
                <td width="80px">单价（元/平方米）</td>
                <td>
                  <p>
                    大写：
                    <span style="color:#ffa000;font-weight:800;">￥{{transEndDetail.endPriceUnitUp}}</span>
                  </p>
                  <p>
                    小写：
                    <span style="color:#ffa000;font-weight:800;">￥{{transEndDetail.endPriceUnit}}</span>
                  </p>
                </td>
              </tr>
              <tr>
                <td>总价（万元）</td>
                <td>
                  <p>
                    大写：
                    <span style="color:#ffa000;font-weight:800;">￥{{transEndDetail.endPriceUp}}</span>
                  </p>
                  <p>
                    小写：
                    <span style="color:#ffa000;font-weight:800;">￥{{transEndDetail.endPrice}}</span>
                  </p>
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  竞价结束日期：
                  <span style="font-weight:800;">{{transEndDetail.transEndTime}}</span>
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  <span style="font-weight:800;">特别提示</span>
                  <br>
                  <p>请您于网上交易结束后3个工作日内，携带相关资料到{{transEndDetail.tradingCenter}}进行资格审查。</p>
                </td>
              </tr>
            </table>
            <h5 style="text-align:right;margin-top:15px;font-weight:800;">{{transEndDetail.tradingCenter}}</h5>
          </div>
          <div  style="text-align:center;margin-top:30px;">
            <div class="button_border" @click="winnerIntoBook">下载</div>
            <div class="button_bg" v-print="'#printWinner'">打印</div>
            <div class="button_default" @click="included = false">关闭</div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 资格确认书 -->
    <el-dialog
      class="companyInfo includedBox"
      width="600px"
      :visible.sync="qualifications"
      top="14vh"
      :append-to-body="true"
      :show-close="false"
    >
      <div style="height:500px;box-sizing:border-box;padding:20px;position: relative;">
        <div class="borderImg">
          <img
            src="@/assets/images/included_border.png"
            style="width:100%;height:100%"
          >
        </div>
        <div style="padding:38px;position:relative;z-index:10;">
          <div id="printConfigBook">
            <div
              style="width:330px;text-align:center;margin:0 auto;font-size:20px;font-weight:800;"
            >{{area}}国有建设用地使用权{{targetData.transTarget.transTypeName}}竞买资格确认书</div>
            <div>
              <p style="margin-top:45px;">
                <b v-if="targetData.bidding">
                  {{targetData.bidding.bidderId}}：
                </b>
              </p>
              <p
                style="margin-top:25px;text-indent:2em;line-height:25px;"
                class="qualifications_content"
              >
                按照
                <b>{{targetData.transTarget.targetNo}}</b>标的相关转让相关文件的规定，经审查，你方已具备参与本次{{targetData.transTarget.transTypeName}}交易的
                条件，现确认：你方已取得
                <b>{{targetData.transTarget.targetNo}}</b>标的国有建设用地使用权{{targetData.transTarget.transTypeName}}转让的竞买资格。请
                仔细阅读该标的转让文件中有关{{targetData.transTarget.transTypeName}}的规则和程序，并按要求参与竞买。
              </p>
              <div style="margin-top:37px;text-align:right;">
                <p style="font-weight: 600;margin:5px 0;">{{transEndDetail.tradingCenter}}</p>
                <p v-if="targetData.bidding">{{targetData.bidding.updateTime}}</p>
              </div>
            </div>
          </div>
          <div style="text-align:center;margin-top:30px;">
            <div class="button_border" @click="downConfigBook">下载</div>
            <div class="button_bg" v-print="'#printConfigBook'">打印</div>
            <div class="button_default" @click="qualifications = false">关闭</div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 履约金申请书 -->
    <el-dialog
      class="companyInfo includedBox"
      width="600px"
      :visible.sync="account_entry"
      top="20px"
      :append-to-body="true"
      :show-close="false"
    >
      <div style="height:700px;box-sizing:border-box;padding:20px;position: relative;">
        <table border="1" width="100%" class="account_entry">
          <tr>
            <td colspan="4">履约保证金入帐申请单</td>
          </tr>
          <tr>
            <td colspan="4">
              欢迎您申请竞买
              <b>{{list.targetNo}}</b>，您选择了
              <b>独立竞买</b>，
              请按公告要求按时、足额向以下账户交纳本次竞买申请的履约
              保证金
              <b>人民币1万元</b>：
            </td>
          </tr>
          <tr>
            <td rowspan="3">
              <b>收款人</b>
            </td>
            <td colspan="2">交易中心：</td>
            <td>
              <b>{{area}}地产交易中心</b>
            </td>
          </tr>
          <tr>
            <td colspan="2">开户账户：</td>
            <td>
              <b>133 6646 5669</b>
              <button>复制</button>
            </td>
          </tr>
          <tr>
            <td colspan="2">开户行：</td>
            <td>
              <b>江西银行</b>
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <p>
                <b>重要提示</b>
              </p>
              <p>1、一个标的物对应一个竞买银行账户，需要同时竞买多个标的，应在系统中分别申请。</p>
              <p>2、生成入帐申请单后，您务必打印、仔细保存该申请单及相关信息。</p>
              <p>
                3、本系统采用的是唯一随机账户的交易模式，保证金需要按本入帐单信息并不足额缴纳到以上
                子账户，系统方能开通网上报价资格。直接缴纳交易中心基本账号的，本系统不识别。
              </p>
              <p>
                4、银行柜台转账手续办理完毕后，请您务必登陆网上交易系统查看履约保证金到账情况。跨行转
                账缴纳保证金的，请至少提前半天缴纳。
              </p>
              <p>5、独立竞买交易份额为万科房地产开发有限公司（100%）</p>
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <div style="text-align:center;margin-top:30px;">
                <div class="button_border">下载</div>
                <div class="button_bg">打印</div>
                <div class="button_default" @click="account_entry = false">关闭</div>
              </div>
            </td>
          </tr>
        </table>
      </div>
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
      <div style="height:820px;box-sizing:border-box;padding:20px;position: relative;">
        <div class="borderImg">
          <img
            src="@/assets/images/included_border.png"
            style="width:100%;height:100%"
          >
        </div>
        <div style="padding:38px;position:relative;z-index:10;">
          <div id="printApplyBook">
            <div style="text-align:center;margin:0 auto;font-size:20px;font-weight:800;"
            >{{area}}国有建设用地使用权转让竞买申请书</div>
            <div>
              <p style="font-weight:700;margin:20px 0;">{{targetData.transTarget.tradingCenterName}}</p>
              <p style="text-indent: 2em;">
                经认真阅读
                <b>{{targetData.transTarget.targetNo}}</b>标的物，即
                <b>{{targetData.transTarget.targetNo}}</b>挂牌转让交易文件及相关资料，我方完全接受并愿意
                遵守该文件的规定和要求，且对该交易文件及相关资料均无异议。我方现在正式申请你参加你方组织的该标的网上交易活动。
              </p>
              <p style="text-indent: 2em;margin:20px 0;">
                我方愿意按出让文件规定，缴纳竞买保证金：
                <b>{{targetData.transTarget.amount}}</b>。
              </p>
              <p style="text-indent: 2em;">
                若能竞得该标的物。我方保证按照本次挂牌转让交易文件的规定和要求提交所有资料，并对其真实性和完整性负责，履行全部
                义务。如未按规定要求提交资料或出现不能按期付款等违规违约行为，我方愿意按交易文件约定，承担全部责任，并赔偿由此产生的损失。
              </p>
              <p
                style="text-indent: 2em;margin:16px 0;"
              >我方承诺在竞得该标的物使用权后，5个工作日内将成交额余款转入指定资金托管账户，全权委托并配合贵方办理不动产登记相关手续。</p>
              <p style="text-indent: 2em;margin:25px 0;">特此申请。</p>
              <p>
                申请人：
                <span>{{userInfo.realname}}</span>
              </p>
              <p>
                身份证号：
                <span>{{userInfo.idCardNo}}</span>
              </p>
              <!-- <p>
                法定代表人签字：
                <span>{{application.sign}}</span>
              </p> -->
              <!-- <p>
                联系人：
                <span>{{application.name}}</span>
              </p> -->
              <p>
                地址：
                <span>{{userInfo.address}}</span>
              </p>
              <p>
                电话：
                <span>{{userInfo.telPhone}}</span>
              </p>
              <p>
                邮政编码：
                <span>{{userInfo.zipCode}}</span>
                <i style="float:right;">
                  申请日期：
                  <i style="color:#000;">{{userInfo.currentDate}}</i>
                </i>
              </p>
            </div>
          </div>
          <div style="text-align:center;margin-top:30px;">
            <div class="button_border" @click="downApplyBook()">下载</div>
            <div class="button_bg" v-print="'#printApplyBook'">打印</div>
            <div class="button_default" @click="bids_for_books = false">关闭</div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 成交款缴款通知书 -->
    <el-dialog
      :title="title"
      class="companyInfo"
      width="60%"
      top="10px"
      :visible.sync="clinch"
      :append-to-body="true"
    >
      <div class="companyInfoBox">
        <div id="printTransBook">
          <h1 class="titleFont">{{title}}</h1>
          <h1 class="titleFont">剩余价款缴款通知书</h1>
          <div class="middleBox">
            <table border="1" width="100%" class="tradeServiceTable">
              <tr>
                <td width="120" class="headerBg">标的编号</td>
                <td colspan="2" style="color:#4573d6;">{{transBook.targetNo}}</td>
              </tr>
              <tr>
                <td rowspan="5" class="headerBg">收款人信息</td>
                <td width="200" class="titleColor">付款人名称</td>
                <td>{{transBook.winnerPerson}}</td>
              </tr>
              <tr>
                <td class="titleColor">总金额（万元）</td>
                <td>{{transBook.endPrice}}</td>
              </tr>
              <tr>
                <td class="titleColor">保证金（万元）</td>
                <td>{{transBook.amount}}</td>
              </tr>
              <tr>
                <td class="titleColor">剩余价款（万元）</td>
                <td>
                  <p>大写：{{transBook.otherMoneyUp}}</p>
                  <p>小写：{{transBook.otherMoney}}</p>
                </td>
              </tr>
              <tr>
                <td class="titleColor">联系电话</td>
                <td>{{transBook.winnerTel}}</td>
              </tr>
              <tr>
                <td rowspan="4" class="headerBg">收款人信息</td>
                <td class="titleColor">开户单位</td>
                <td>{{transBook.openAccountOrg}}</td>
              </tr>
              <tr>
                <td class="titleColor">开户行</td>
                <td>{{transBook.openBank}}</td>
              </tr>
              <tr>
                <td class="titleColor">账户</td>
                <td>{{transBook.account}}</td>
              </tr>
              <tr>
                <td class="titleColor">联系电话</td>
                <td>{{transBook.payeeTel}}</td>
              </tr>
            </table>
          </div>
          <div class="middleBox">
            <p>
              <span style="font-weight:800;">特别提示：</span>本交易剩余价款应该网上交易结束后3个工作日内缴纳。
            </p>
            <!-- <p style="margin-top:10px;">根据中共XX省委XX省人民政府《关于开展降低企业成本优化发展环境专项行动的通知书》文件的精神，交易服务费减半收取。</p> -->
            <h3 class="btnInfo">{{transBook.tradingCenter}}</h3>
            <h3 class="btnInfo" style="margin-top:8px;">{{transBook.transDate}}</h3>
          </div>
        </div>
        <div class="middleBox" style="text-align:center;">
          <div class="button_border" @click="dealFeeBook">下载</div>
          <div class="button_bg" v-print="'#printTransBook'">打印</div>
          <div class="button_default" @click="clinch = false">关闭</div>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="审核" width="40%" :visible.sync="RedialogForm" :append-to-body='true'>
      <template>
        <div id="dialog">
          <actDialog :actInfo="actInfo" @patch="actResult" />
        </div>
      </template>
    </el-dialog>

  </div>
</template>
<script>
import actDialog from '@/components/activity/activity-dialog'
import baseURL1 from "../../index.js";

export default {
  name: "postpose",
  components: {actDialog},
  data() {
    return {
      list: {},
      peopleData: [],
      //股东信息
      holdersData: [],
      dialogForm: false,
      companyForm: false,
      //交易服务费缴费通知书弹窗
      tradeService: false,
      //竞得入选人确认书
      qualifications: false,
      //资格确认书
      account_entry: false,
      //入账申请书
      included: false,
      //竞买申请书
      bids_for_books: false,
      //成交 / 剩余缴费通知书
      clinch: false,
      activeName: "",
      RedialogForm:false,   //是否显示审核窗
      actInfo:{   //传入审核窗的数据
        taskId:'',
        procDefId:'',
        procInsId:'',
        businessId:'',
      },
      childCompany:{},
      area:'',
      targetData:[],
      userInfo:{},
      transEndDetail:{},
      transBook:{},
      title: ""
    };
  },
  methods: {
    queryData(targetId, licenseId) {
      var that = this;
      that.$get(this.$API.EPF_TRADE.TRADE.LATER_AUDIT,{targetId:targetId, licenseId: licenseId}
      ).then(res => {
        if (res.code == 0) {
          console.log("1111111111", res);
          that.list = res.map.laterGetCheckvo;
          that.childCompany = res.map.transProjectDealerErntity; //子公司
          that.holdersData = res.map.transProjectDealeList; //子公司股东列表
          that.peopleData = res.map.bidders; // 联合竞买人
          console.log("11111这是审核页面返回", that.list);
          // 标的详情
          that.$get(this.$API.EPF_TRADE.TRADE.TARGET_DETAILS,{targetId:that.$route.query.targetId,userId:that.list.bidderId},{}).then(res => {
            console.log('标的详情返回',res)
            if(res.code == 0){
              that.targetData = res.map;
              that.area = res.map.area;
              if(typeof(res.userInfo) !== 'undefined'){
                that.userInfo = res.userInfo;
              }
            }
          });

          // 竞得人选人通知
          that.$get(this.$API.EPF_TRADE.TRADE.END_DETAIL,{targetId:that.$route.query.targetId,userId:that.list.bidderId},{}).then(res => {
            console.log('成交详情返回',res)
            if(res.code == 0){
              that.transEndDetail = res.transEnd;
            }
          });

          // 剩余价款
          that.$get(his.$API.EPF_TRADE.TRADE.END_BOOK,{targetId:that.$route.query.targetId,userId:that.list.bidderId},{}).then(res => {
            console.log('成交详情返回',res)
            if(res.code == 0){
              that.transBook = res.transBook;
              that.title = res.transBook.area+'建设用地使用权'+res.transBook.transType;
            }
          });

        } else {
          console.log("2222", res);
          this.$message.error(res.msg); //失败

          //如果没有数据
          if(res.msg == '后置审核流程没有启动'){
            //关闭当前页面
            this.$bus.$emit('closeTabsItem',this.$route.name);
          }

          return;
        }
        that.activeName = this.peopleData[0].id;
      });
    },
    //关闭当前窗口
    cancel(){
      //关闭当前tab
      this.$bus.$emit('closeTabsItem',this.$route.name);
    },
    //审核窗的回调方法
    actResult(re){
      // alert("回调方法")
      //取消：cancel，流转：success,流转结束：end,审核未通过：failed
      if(re==="cancel"){
        //取消关闭弹框，不做任何事件
      }else if(re==="success"){
        //刷新页面
        this.$bus.$emit('refreshPage',['home','tradSufReview']);
        let routes = '/system/trade/trade/views/postpose/examine'
        this.$bus.$emit('close_tab',routes)
        let routerPath = "/system/trade/trade/views/postpose/index";
        this.$router.push({path:routerPath})
        setTimeout(() => {
          this.$router.push({ path: routerPath})
        }, 100);
      }else if(re==="failed"){
        //状态改为未通过
        var id = this.actInfo.businessId;
        this.changeStatus(id,"license_status-005");
      }else if(re==="end"){
        var id = this.actInfo.businessId;
        //状态改为已竟得
        this.changeStatus(id,"license_status-009");
        //刷新页面
        this.$bus.$emit('refreshPage',['home','tradSufReview']);
        let routes = '/system/trade/trade/views/postpose/examine'
        this.$bus.$emit('close_tab',routes)
        let routerPath = "/system/trade/trade/views/postpose/index";
        this.$router.push({path:routerPath})
        setTimeout(() => {
          this.$router.push({ path: routerPath})
        }, 100);
      }
      this.RedialogForm = false;
    },
    //审核按钮
    examine(){
      // this.actInfo=obj;
      console.log('工作流数据：', this.actInfo);
      this.RedialogForm = true;
      this.$nextTick(()=>{
        this.$bus.$emit('transferaudit', 'examine')//需要审核
      })
    },
    onSubmit() {
      //提交按钮
      if (this.list.opinion != null && this.list.conclusion != null) {
        console.log("提交成功");
        alert("提交成功")
      } else {
        this.$message.error("您还没有/*选择审核/*填写意见，它们是必填项！");
      }
    },
    companyInfo() {
      //查看公司详情按钮
      this.companyForm = true;
    },
    peopleInfo(id, index) {
      //查看竞得人按钮
      this.dialogForm = true;
    },
    toNotice() {
      let title = "成交确认书";
      let routerPath = '/system/trade/trade/views/postpose/confirm';
      let item = {url:routerPath,menuname:title}
      //将当前点击的选项添加到vuex中
      this.$router.push({path:routerPath,query:{targetId: this.$route.query.targetId}});
      this.$store.commit("ADD_TAB", item)
    },
    candidates() {
      //竞得入选人确认书
      this.included = true;
    },
    toFundTrusteeship() {
      let title = "资金托管协议";
      let routerPath = '/system/trade/trade/views/postpose/treaty';
      let item = {url:routerPath,menuname:title}
      //将当前点击的选项添加到vuex中
      this.$router.push({path:routerPath,query:{targetId: this.$route.query.targetId}});
      this.$store.commit("ADD_TAB", item)
    },
    //交易服务费缴费通知书表格合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 1 || rowIndex === 5) {
          return {
            rowspan: 4,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if (rowIndex === 0) {
        if (columnIndex === 2) {
          return {
            rowspan: 1,
            colspan: 2
          };
        }
      }
    },
    changeStatus(id,status){
      // params 的类型是对象
      this.$post(this.$API.EPF_TRADE.TRADE.UPDATE_STATE, {id:id,status:status}).then(res => {
        console.log("请求接口返回的结果是:",res)
        // res 是返回结果
        if (res.code == '0') {
          // alert("修改成功")
        }else{
          this.$message.error(res.msg);
        }
      })
    },


    // 下载竞买申请书
    downApplyBook(){
      let url = baseURL1.baseURL1 + "/epf-trade/pdf/download?targetId="+this.$route.query.targetId+"&userId="+this.list.bidderId
      window.open(url);
    },
    // 下载资格确认书
    downConfigBook(){
      let url = baseURL1.baseURL1 + "/epf-trade/pdf/downloadConfig?targetId="+this.$route.query.targetId+"&userId="+this.list.bidderId
      window.open(url);
    },
    // 下载竞得人选入通知书
    winnerIntoBook(){
      let url = baseURL1.baseURL1 + "/epf-trade/pdf/downloadWinnerIntoBook?targetId="+this.$route.query.targetId+"&userId="+this.list.bidderId
      window.open(url);
    },
    // 下载剩余价款缴费通知
    dealFeeBook(){
      let url = baseURL1.baseURL1 + "/epf-trade/pdf/downloadDealFeeBook?targetId="+this.$route.query.targetId+"&userId="+this.list.bidderId
      window.open(url);
    },
    // 下载交易服务缴费通知
    serviceFeeBook(){
      let url = baseURL1.baseURL1 + "/epf-trade/pdf/downloadServiceFeeBook?targetId="+this.$route.query.targetId+"&userId="+this.list.bidderId
      window.open(url);
    },
  },
  created() {
    var that = this;
    that.queryData(that.$route.query.targetId, that.$route.query.id); //调用请求
    that.targetId = that.$route.query.targetId;
    that.licenseId = that.$route.query.id;

    //组件加载时初始化必要信息
    that.actInfo = {
      businessId: that.$route.query.businessId,
      taskId: that.$route.query.taskId,
      procInsId: that.$route.query.procInsId,
      procDefId: that.$route.query.procDefId
    }
    console.log("获取的actInfo对象是：",that.actInfo);

  },
  mounted() {
    if (window.history && window.history.pushState) {
      this.$bus.$emit('refreshPage',['examine']);
    }

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
  overflow: auto;
}
.content_bottom {
  float: left;
  width: 90%;
}
.text_domain {
  width: 100%;
  position: relative;
  overflow: auto;
}
.text_domain span {
  float: right;
  position: absolute;
  left: 91%;
  bottom: 20px;
}
.peopleInfoBox {
  padding: 50px 40px;
}
.companyInfoBox {
  padding: 30px 30px;
  max-height: 600px;
  overflow-y: auto;
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
.bidder_information {
  display: flex;
  display: -webkit-flex;
  justify-content: space-around;
}
.bidder_information li {
  color: #409eff;
  cursor: pointer;
}
.titleFont {
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
.tradeServiceTable {
  border-color: rgb(255, 255, 255);
}
.tradeServiceTable tr td {
  padding: 12px 8px;
  border-color: rgb(228, 228, 228);
}
.tradeServiceTable tr td:nth-child(2) {
  padding: 12px 8px;
  border-color: rgb(228, 228, 228);
}
.includedTable {
  margin-top: 20px;
}
.includedTable tr td {
  padding: 14px 12px;
  border: 1px solid rgb(224, 224, 224);
}
.headerBg {
  background: #f7f7f7;
  font-weight: 800;
  text-align: right;
  padding-right: 20px !important;
}
.titleColor {
  color: #9b9b9b;
}
.middleBox {
  width: 85%;
  margin: 30px auto;
}
.btnInfo {
  margin-top: 20px;
  text-align: right;
  font-size: 16px;
  letter-spacing: 3px;
}
.borderImg {
  width: 100%;
  height: 100%;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
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
</style>
