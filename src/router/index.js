import Vue from 'vue'
import Router from 'vue-router'

import AppView from '@/components/app-view'
//首页
import home from '@/pages/home.vue'
//登录
import login from '@/pages/login'
//菜单管理
//import menuManage from '@/pages/admin/system/menu/menuManage'
import menuManage from '@/puzzles/system/page/system/views/menu/menuMg'
// 委托交易
const detailList = name => () =>
    import ('@/pages/admin/trade/entrustDeal/detailList/' + name)
const entrustautomaticheck = name => () =>
    import ('@/pages/admin/trade/entrustDeal/detailList/entrustautomaticheck/' + name)
const entrustedTradeDetailsAdd = name => () =>
    import ('@/pages/admin/trade/entrustDeal/detailList/entrustedTradeDetailsAdd/' + name)
const entrustedForm = name => () =>
        import ('@/pages/admin/trade/entrustDeal/detailList/entrustedForm/' + name)


// 文库管理上传
import libraryUpload from '@/pages/admin/document/libraryManage/libraryUpload';
// 文库管理新增
import articleManage from '@/pages/admin/document/libraryManage/articleManage';
// 浏览/审核文档
import documentBrowse from '@/pages/admin/document/documentBrowse/documentBrowse';
// 标签管理新增;
import labelAdd from '@/pages/admin/document/labelManage/labelAdd';
// 工作文档
import workFiles from '@/pages/admin/document/workFiles/workFiles';
// 标签管理编辑
import labelEdit from '@/pages/admin/document/labelManage/labelEdit';
// 上传记录
import knowledgeConsult from '@/pages/admin/document/knowledge/knowledgeConsult';
// 审核文档
import auditDocument from '@/pages/admin/document/myAudit/auditDocument'
// 审核记录
//import workAuditDocument from '@/pages/admin/document/workAudit/workAuditDocument'
// 工作文档标签新增
import workLabelAdd from '@/pages/admin/document/workLabelManage/workLabelAdd'
// 标签管理编辑
import workLabelEdit from '@/pages/admin/document/workLabelManage/workLabelEdit'
// 工作文档管理上传
import workDocUpload from '@/pages/admin/document/workDocMange/workDocUpload'
// 工作文档管理新增
import workDocAdd from '@/pages/admin/document/workDocMange/workDocAdd'
// 工作文档审核记录
import workAuditConsult from '@/pages/admin/document/workAudit/workAuditConsult'

//代码生成器设置
import config from '@/pages/admin/system/code/config'
//代码生成器设置
import preview from '@/pages/admin/system/code/preview'

// markdown编辑
import markdown from '@/pages/admin/document/libraryManage/markdown'
//账号管理
import accountPage from '@/pages/admin/system/bankManage/accountManage/accountManage';

//标的信息
import landmarkInfoAdd from '@/pages/admin/trade/land/landmarkInfo/landmarkInfoAdd';
import landmarkInfoDetail from '@/pages/admin/trade/land/landmarkInfo/landmarkInfoDetail';
const landmarkInfo = name => () =>
    import ('@/pages/admin/trade/land/landmarkInfo/' + name)
    // import landmarkInfoDetail from '@/pages/admin/trade/tradingPlatform/landmarkInfoDetail'
    // 地块信息
const parcelInfo = name => () =>
    import ('@/pages/admin/trade/land/landMass/' + name)

// 公告信息
const announcement = name => () =>
    import ('@/pages/admin/trade/land/announcement/' + name)
    // 公告新增
const announcementAdd = name => () =>
    import ('@/pages/admin/trade/land/announcement/add/' + name)
    // 公告修改
const announcementAmend = name => () =>
    import ('@/pages/admin/trade/land/announcement/amend/' + name)
    // 变更公告
const changeAnnounce = name => () =>
    import ('@/pages/admin/trade/land/announcement/changeAnnounce/' + name)
const announceDetail = name => () =>
    import ('@/pages/admin/trade/land/announcement/detail/' + name)
const reviewAnnounce = name => () =>
    import ('@/pages/admin/trade/land/announcement/reviewAnnounce/' + name)
    // 成交公示
const publicity = name => () =>
    import ('@/pages/admin/trade/land/publicity/' + name)

// 公告详情
import announcementInfoDetail from '@/pages/admin/trade/land/announcement/detail/announcementInfoDetail'
// // 公告新增
// import announcementInfoAdd from '@/pages/admin/trade/land/announcement/add/announcementInfoAdd'
// // 公告修改
// import announcementInfoAmend from '@/pages/admin/trade/land/announcement/amend/announcementInfoAmend'
// import announctInfoDealresultNosuccess from '@/pages/admin/trade/land/announcement/announctInfoDealresultNosuccess'
// import announctInfoDealresultsuccess from '@/pages/admin/trade/land/announcement/announctInfoDealresultsuccess'
// import announcementInfoChangeAdd from '@/pages/admin/trade/land/announcement/changeAnnounce/announcementInfoChangeAdd'
// import announcementInfoChangedetail from '@/pages/admin/trade/land/announcement/changeAnnounce/announcementInfoChangedetail'
// import announcementInfodetail from '@/pages/admin/trade/land/announcement/announcementInfodetail'

// import transferContract from '@/pages/admin/contract/transferContract/transferContract'
// import rentalContract from '@/pages/admin/contract/rentalContract/rentalContract'
// import mortgageContract from '@/pages/admin/contract/mortgageContract/mortgageContract'


const contract = name => () =>
    import ('@/pages/admin/contract' + name)

const getPages = name => () =>
    import ('@/' + name)



// 财务管理 竞买-- 转入主账户
import bidShiftToMainAccount from '@/pages/admin/trade/financial/administration/bidBondAdministration/bidShiftToMainAccount';
// 财务管理 竞买-- 转入托管账户
import bidShiftToTrusteeshipAccount from '@/pages/admin/trade/financial/administration/bidBondAdministration/bidShiftToTrusteeshipAccount';
// 财务管理 竞买-- 申请退款
import bidRefund from '@/pages/admin/trade/financial/administration/bidBondAdministration/bidRefund';
// 财务管理 -竞买- 销户
import bidCancellation from '@/pages/admin/trade/financial/administration/bidBondAdministration/bidCancellation';


// 财务管理履约-- 转入主账户
import perShiftToMainAccount from '@/pages/admin/trade/financial/administration/performanceBondAdministration/perShiftToMainAccount';

// 财务管理履约-- 申请退款
import perRefund from '@/pages/admin/trade/financial/administration/performanceBondAdministration/perRefund';
// 财务管理履约-- 销户
import perCancellation from '@/pages/admin/trade/financial/administration/performanceBondAdministration/perCancellation';

//财务管理--查询
//托管账户到账查询
const escrowAccount = name => () =>
    import ('@/pages/admin/trade/financial/accountCheck/escrowAccount/' + name)
    //竞买保证金到账查询
const bidBond = name => () =>
    import ('@/pages/admin/trade/financial/accountCheck/bidBond/' + name)
    //履约保证金到账查询
const performanceBond = name => () =>
    import ('@/pages/admin/trade/financial/accountCheck/performanceBond/' + name)

const transactionRule = name => () =>
    import ('@/pages/admin/trade/transactionRules/' + name)

// 添加、显示服务机构
import addOrg from '@/pages/admin/supply/serviceOrgManage/addOrg'
import serverOrgManage from '@/pages/admin/supply/serviceOrgManage/serverOrgManage'

import previewPage from '@/pages/admin/system/landFeaches/previewPage'


let pages = name => () =>
    import ('@/pages' + name)

//委托交易详情
import toEntrustDetail from "@/pages/admin/trade/entrustDeal/detailList/toEntrustDetail";
//委托交易修改
import entrustedTradeDetailsAmend from "@/pages/admin/trade/entrustDeal/detailList/entrustedTradeDetailsAmend/entrustedTradeDetailsAmend";

//测试页面
import test from "@/pages/admin/trade/entrustDeal/detailList/test";

//前置资格审核申请列表
import frontAudit from '@/pages/admin/trade/transaction/front/audit'
//前置资格审核申请列表
import frontExamine from '@/pages/admin/trade/transaction/front/examine'
//审核结果
import frontExamineResult from '@/pages/admin/trade/transaction/front/examineResult'
//后置资格审核申请列表
import examine from '@/pages/admin/trade/transaction/behind/examine'
//后置审核结果
import examineResult from '@/pages/admin/trade/transaction/behind/examineResult'
//后置资格审核成交通知书
import notice from '@/pages/admin/trade/transaction/behind/notice'
//资金托管
import fundTrusteeship from '@/pages/admin/trade/transaction/behind/fundTrusteeship'

import parcelInfoDetail from '@/pages/admin/trade/land/landMass/parcelInfoDetail'

//监测监管平台-监控台
const monitoringStation = name => () =>
    import ('@/pages/admin/monitoringSupervision/monitoringStation' + name)
    //监测监管平台-监测监管
const monitoringSuper = name => () =>
    import ('@/pages/admin/monitoringSupervision/monitoringSuper' + name)
    //监测监管平台-统计分析
const statistic = name => () =>
    import ('@/pages/admin/monitoringSupervision/statistic' + name)
    //监测监管平台-监测预警
const warning = name => () =>
    import ('@/pages/admin/monitoringSupervision/warning' + name)

const followUpTrack = name => () =>
    import ('@/pages/admin/monitoringSupervision/track/followUpTrackOperation' + name)
// 合同模板
const contractTemplate = name => () =>
    import ('@/pages/admin/contract/contractTemplate' + name)

Vue.use(Router)
export default new Router({
    routes: [{
            path: '',
            component: AppView,
            children: [
                { path: '/', name: 'home', component: home },

                //文库管理上传
                { path: '/libraryUpload', name: 'libraryUpload', component: libraryUpload },
                 // 文库管理新增
                {path: '/articleManage', name: 'articleManage',   component: articleManage                },
                    // 文档浏览/审核
                {   path: '/documentBrowse', name: 'documentBrowse',  component: documentBrowse },
                    // 标签管理新增
                {  path: '/labelAdd', name: 'labelAdd',  component: labelAdd    },
                // 工作文档
                {   path: '/workFiles',   name: 'workFiles',  component: workFiles },
                // 标签管理编辑
                {   path: '/labelEdit',   name: 'labelEdit',  component: labelEdit  },
                // 知识文档上传记录
                {  path: '/knowledgeConsult',  name: 'knowledgeConsult',   component: knowledgeConsult  },
                // 审核文档
                {   path: '/auditDocument', name: 'auditDocument',    component: auditDocument    },
                // 工作文档标签管理新增
                {   path: '/workLabelAdd',  name: 'workLabelAdd',    component: workLabelAdd
                },
                // 工作文档标签管理编辑
                {   path: '/workLabelEdit',  name: 'workLabelEdit',     component: workLabelEdit    },
                // 工作文档管理上传
                {   path: '/workDocUpload',name: 'workDocUpload',  component: workDocUpload    },
                // 工作文档管理新增
                {  path: '/workDocAdd',   name: 'workDocAdd',  component: workDocAdd                },
                //  审核记录
                {path:'workAuditConsult',  name: 'workAuditConsult',  component: workAuditConsult   },
                {path:'markdown',  name: 'markdown',  component: markdown   },
                //银行，账号管理
                { path: '/accountPage',name:'accountPage',component:accountPage },
                

                //代码生成器设置
                { path: '/config', name: 'config', component: config },
                //代码生成器设置
                { path: '/preview', name: 'preview', component: preview },
                //出租
                // { path:'/'}
                // {path: '/transferPlace', name: 'transferPlace', component: () => import('@/admin/supplyDemand/supplyInfo/transfer/transferPlace')},
                // {path: '/rentPlace', name: 'rentPlace', component: page('rentPlace')},
                // {path: '/pledgePlace', name: 'pledgePlace', component: page('pledgePlace')},
                // {path: '/needBuyPlace', name: 'needBuyPlace', component: page('needBuyPlace')},

                // {path: '/infoManage', name: 'infoManage', component: page('infoManage')},
                // {path: '/infoMenuManage', name: 'infoMenuManage', component: page('infoMenuManage')},
                // {path: '/advertManage', name: 'advertManage', component: page('advertManage')},

                // {path: '/needRentPlace', name: 'needRentPlace', component: page('needRentPlace')},
                // {path: '/dictManager', name: 'dictManager', component: secondLevel('dict','dictManager')},
                // {path: '/infosearch', name: 'infosearch', component: page('infosearch')},
                // {path: '/infomenu', name: 'infomenu', component: page('infomenu')},
                // // {path: '/infomenu', name: 'infomenu', component: page('infomenu')},
                // {path: '/infowebset', name: 'infowebset', component: page('infowebset')},
                // {path: '/infomodleset', name: 'infomodleset', component: page('infomodleset')},
                { path: '/menuManage', name: 'menuManage', component: menuManage },
                // // 到账查询	arrivalInquiry
                // {path: '/arrivalInquiry', name: 'arrivalInquiry', component: tradingPlatform('arrivalInquiry')},

                //测试页面
                { path: '/test', name: 'test', component: test },

                // 委托交易
                // detailList/entrustautomaticheck
                { path: '/entrustautomaticheck', name: 'entrustautomaticheck', component: entrustautomaticheck('entrustautomaticheck') },
                // 委托地块信息--新增
                { path: '/entrustedTradeDetailsAdd', name: 'entrustedTradeDetailsAdd', component: entrustedTradeDetailsAdd('entrustedTradeDetailsAdd') },
                { path: '/entrustedForm', name: 'entrustedForm', component: entrustedForm('entrustedForm') },
                
                // 公告信息	announcementInfo
                { path: '/announcementInfo', name: 'announcementInfo', component: announcement('announcementInfo') },
                // 新增公告信息
                { path: '/announcementInfoAdd', name: 'announcementInfoAdd', component: announcementAdd('announcementInfoAdd') },
                // 修改公告信息
                { path: '/announcementInfoAmend', name: 'announcementInfoAmend', component: announcementAmend('announcementInfoAmend') },
                // 变更公告
                { path: '/announcementInfoChangeAdd', name: 'announcementInfoChangeAdd', component: changeAnnounce('announcementInfoChangeAdd') },
                { path: '/announcementInfoChangedetail', name: 'announcementInfoChangedetail', component: changeAnnounce('announcementInfoChangedetail') },
                { path: '/announcementInfoChangeAmend', name: 'announcementInfoChangeAmend', component: changeAnnounce('announcementInfoChangeAmend') },
                // // 公告详情
                // { path: '/announcementInfodetail', name: 'announcementInfodetail', component: announceDetail('announcementInfodetail') },
                // 审核结果
                { path: '/announctInfoDealresultNosuccess', name: 'announctInfoDealresultNosuccess', component: reviewAnnounce('announctInfoDealresultNosuccess') },
                { path: '/announctInfoDealresultsuccess', name: 'announctInfoDealresultsuccess', component: reviewAnnounce('announctInfoDealresultsuccess') },

                //首页交易审核开始
                //- 委托交易
                //   { path: '/entrustDetailList', name: 'entrustDetailList', component: reviewAnnounce('entrustDetailList') },
                //首页交易审核结束

                // 标地信息	landmarkInfo
                { path: '/landmarkInfo', name: 'landmarkInfo', component: landmarkInfo('landmarkInfo') },
                // 标地信息--标地信息详情
                { path: '/landmarkInfoDetail', name: 'landmarkInfoDetail', component: landmarkInfo('landmarkInfoDetail') },
                // // 标地信息--审核结果
                // {path: '/landmarkInfoExamineResult', name: 'landmarkInfoExamineResult', component: landmarkInfo('landmarkInfoExamineResult')},
                // // 标地信息--增加	
                { path: '/landmarkInfoAdd', name: 'landmarkInfoAdd', component: landmarkInfoAdd },
                // 标地信息--修改
                { path: '/landmarkInfoAmend', name: 'landmarkInfoAmend', component: landmarkInfo('landmarkInfoAmend') },
                // 标地信息--成交结果	
                { path: '/landmarkInfoDealresult', name: 'landmarkInfoDealresult', component: landmarkInfo('landmarkInfoDealresult') },
                // 标地信息--公示发布
                { path: '/publicityRelease', name: 'publicityRelease', component: landmarkInfo('publicityRelease') },
                // 标地信息--公示详情
                { path: '/publicityDetails', name: 'publicityDetails', component: landmarkInfo('publicityDetails') },
                // 竞买记录
                { path: '/landmarkInfoBidding', name: 'landmarkInfoBidding', component: landmarkInfo('landmarkInfoBidding') },

                //委托交易详情
                { path: '/toEntrustDetail', name: 'toEntrustDetail', component: toEntrustDetail },

                //委托交易修改
                { path: '/entrustedTradeDetailsAmend', name: 'entrustedTradeDetailsAmend', component: entrustedTradeDetailsAmend },
                //前置资格审核申请列表
                { path: '/frontAudit', name: 'frontAudit', component: frontAudit },
                //前置资格审核
                { path: '/frontExamine', name: 'frontExamine', component: frontExamine },
                { path: '/frontExamineResult', name: 'frontExamineResult', component: frontExamineResult },
                //后置资格审核
                { path: '/examine', name: 'examine', component: examine },
                //后置审核结果
                { path: '/examineResult', name: 'examineResult', component: examineResult },
                //后置资格审核成交通知书
                { path: '/notice', name: 'notice', component: notice },
                { path: '/fundTrusteeship', name: 'fundTrusteeship', component: fundTrusteeship },
                // { path: '/landmarkInfoDetail', name: 'landmarkInfoDetail', component: landmarkInfoDetail },
                // // 标地信息--成交结果	
                // {path: '/landmarkInfoDealresult', name: 'landmarkInfoDealresult', component: landmarkInfo('landmarkInfoDealresult')},
                // // 标地信息--公示发布
                // {path: '/publicityDetails', name: 'publicityDetails', component: landmarkInfo('publicityDetails')},
                // // 标地信息--公示详情
                // {path: '/publicityRelease', name: 'publicityRelease', component: landmarkInfo('publicityRelease')},



                //财务管理
                //竞买保证金管理


                // 财务管理竞买保证金----依次是  转入主账户 转入托管账户 申请退款 销户
                { path: '/bidShiftToMainAccount', name: 'bidShiftToMainAccount', component: bidShiftToMainAccount },
                { path: '/bidShiftToTrusteeshipAccount', name: 'bidShiftToTrusteeshipAccount', component: bidShiftToTrusteeshipAccount },
                { path: '/bidRefund', name: 'bidRefund', component: bidRefund },
                { path: '/bidCancellation', name: 'bidCancellation', component: bidCancellation },
                // 财务管理履约保证金----依次是  转入主账户 转入托管账户 申请退款 销户
                { path: '/perShiftToMainAccount', name: 'perShiftToMainAccount', component: perShiftToMainAccount },
                { path: '/perRefund', name: 'perRefund', component: perRefund },
                { path: '/perCancellation', name: 'perCancellation', component: perCancellation },

                //财务管理--查询
                //托管账户到账查询
                { path: '/escrowAccount', name: 'escrowAccount', component: escrowAccount('escrowAccount') },
                //竞买保证金到账查询
                { path: '/bidBond', name: 'bidBond', component: bidBond('bidBond') },
                //竞买保证金到账查询--错转款详情
                { path: '/bidMistakeMoneyDetail', name: 'bidMistakeMoneyDetail', component: bidBond('bidMistakeMoneyDetail') },
                //履约保证金到账查询
                { path: '/performanceBond', name: 'performanceBond', component: performanceBond('performanceBond') },
                

                //交易规则
                {path:'/transactionRule', name: 'transactionRule', component:transactionRule('transactionRule')},
                //新增交易规则
                {path:'/addTransactionRule', name: 'addTransactionRule', component:transactionRule('addTransactionRule')},
                //新增节点
                {path:'/addTransactionNode', name: 'addTransactionNode', component:transactionRule('addTransactionNode')},
                //新增业务模型
                {path:'/addBusModel', name: 'addBusModel', component:transactionRule('addBusModel')},

                //履约保证金到账查询--错转款详情
                { path: '/perMistakeMoneyDetail', name: 'perMistakeMoneyDetail', component: performanceBond('perMistakeMoneyDetail') },

                // // 地块信息--审核结果	
                // {path: '/parcelInfoExamineResult', name: 'ExamineResult', component: tradingPlatform('parcelInfoExamineResult')},

                { path: '/parcelInfoDetail', name: 'parcelInfoDetail', component: parcelInfoDetail },


                // { path: '/landmarkInfoDetail', name: 'landmarkInfoDetail', component: landmarkInfoDetail },
                // 成交公示	transactionAnnounce
                // {path: '/transactionAnnounce', name: 'transactionAnnounce', component: publicity('transactionAnnounce')},
                // {path: '/publicityDetails', name: 'publicityDetails', component: publicity('publicityDetails')},
                // 成交公示	transactionAnnounce
                // {path: '/transactionAnnounce', name: 'transactionAnnounce', component: publicity('transactionAnnounce')},
                // { path: '/publicityDetails', name: 'publicityDetails', component: publicity('publicityDetails') },

                // // 交易中止	tradSuspend
                // {path: '/tradSuspend', name: 'tradSuspend', component: tradingPlatform('tradSuspend')},
                // // 交易前置资格审核	tradPreReview
                // {path: '/tradPreReview', name: 'tradPreReview', component: tradingPlatform('tradPreReview')},
                // // 交易后置资格审核	tradSufReview
                // {path: '/tradSufReview', name: 'tradSufReview', component: tradingPlatform('tradSufReview')},
                // // 资格审核结果	aualificationReviewResult
                // {path: '/aualificationReviewResult', name: 'aualificationReviewResult', component: tradingPlatform('aualificationReviewResult')},
                // // 短信发送	sendMessage
                // // {path: '/sendMessage', name: 'sendMessage', component: tradingPlatform('sendMessage')},  
                // // {path: '/menuManage', name: 'menuManage', component: systemMenage('menuManage')},
                // // {path: '/templateManage', name: 'templateManage', component: templateManage},
                // // {path: '/menuManage', name: 'menuManage', component: systemMenage('menuManage')},
                // // // 详情页
                { path: '/demandSupplyDetails', name: 'demandSupplyDetails', component: pages('/admin/supply/supplyInfo/details.vue') },
                { path: '/demandInfoDetails', name: 'demandInfoDetails', component: pages('/admin/supply/demandInfo/details.vue') },

                // // // 不动产自动校验
                // {path:'/automaticheck',name: 'automaticheck',component:secondLevel('automaticheck','automaticheck')},
                // {path:'/demandSupplyDetail',name: 'demandSupplyDetails',component:secondLevel('demandSupplyDetails','demandSupplyDetails')},
                // //委托交易管理
                // {path:'/entrustedTradeDetails',name: 'entrustedTradeDetails',component:secondLevel('tradingPlatform','entrustedTradeDetails')},
                // // //富文本编辑器
                // {path:'/editor',name: 'editor',component:secondLevel('editor','editor')},

                { path: '/serverOrgManage', name: 'serverOrgManage', component: serverOrgManage },
                { path: '/addOrg', name: 'addOrg', component: addOrg },
                //供需子系统页面预览
                { path: '/previewPage', name: 'previewPage', component: previewPage },
                // 合同表单配置
                { path: '/transferFieldList', name: 'transferFieldList', component: contract('/peaches/transferFieldList')},
                // 合同配置中心
                { path: '/transferField', name: 'transferField', component: contract('/peaches/transferField')},


                // 合同网签鉴证
                // 合同网签列表
                { path: '/transferSignContract', name: 'transferSignContract', component: contract('/transferContract/transferSignContract') },
                { path: '/rentalSignContract', name: 'rentalSignContract', component: contract('/rentalContract/rentalSignContract') },
                { path: '/mortgageSignContract', name: 'mortgageSignContract', component: contract('/mortgageContract/mortgageSignContract') },
                // 合同鉴证列表
                { path: '/transferRecordContract', name: 'transferRecordContract', component: contract('/transferContract/transferRecordContract') },
                { path: '/rentalRecordContract', name: 'rentalRecordContract', component: contract('/rentalContract/rentalRecordContract') },
                { path: '/mortgageRecordContract', name: 'mortgageRecordContract', component: contract('/mortgageContract/mortgageRecordContract') },
                // 合同模板
                { path: '/transferContractTemplate', name: 'transferContractTemplate', component: contractTemplate('/transferContractTemplate.vue') },
                { path: '/rentalContractTemplate', name: 'rentalContractTemplate', component: contractTemplate('/rentalContractTemplate.vue')},
                { path: '/mortgageContractTemplate', name: 'mortgageContractTemplate', component: contractTemplate('/mortgageContractTemplate.vue')},
                //合同归档列表
                { path: '/contractfile', name: 'contractfile', component: contract('/contractfile.vue') },
                // 合同归档详情
                { path: '/filingDetails1', name: 'filingDetails1', component: contract('/filingDetails1.vue') },
                { path: '/filingDetails2', name: 'filingDetails2', component: contract('/filingDetails2.vue') },
                { path: '/filingDetails3', name: 'filingDetails3', component: contract('/filingDetails3.vue') },
                //不动产自动检验
                { path: '/autoInspection', name: 'autoInspection', component: contract('/autoInspection.vue') },
                // 合同撤销详情---合同撤销申请
                { path: '/ContractRevotrailAudit', name: 'ContractRevotrailAudit', component: contract('/ContractRevotrailAudit.vue') },
                // 合同鉴证
                { path: '/contractFiling', name: 'contractFiling', component: contract('/contractFiling.vue') },

                //监测监管平台-监控台
                //交易监控台
                { path: '/deal/dealStation', name: 'dealStation', component: monitoringStation('/deal/dealStation') },
                //合同监控台
                { path: '/contract/contractStation', name: 'contractStation', component: monitoringStation('/contract/contractStation') },
                //供需监控台
                { path: '/provideDemand/provideDemandStation', name: 'provideDemandStation', component: monitoringStation('/provideDemand/provideDemandStation') },
                //监测监管平台-监测监管
                //供给监测
                { path: '/provide/provideMonitor', name: 'provideMonitor', component: monitoringSuper('/provide/provideMonitor') },
                //供给监测--供给详情
                { path: '/provideDetail', name: 'provideDetail', component: monitoringSuper('/provide/provideDetail') },
                //需求监测
                { path: '/demand/demandMonitor', name: 'demandMonitor', component: monitoringSuper('/demand/demandMonitor') },
                //需求监测--需求详情
                { path: '/demandDetail', name: 'demandDetail', component: monitoringSuper('/demand/demandDetail') },
                //交易监测
                { path: '/deal/dealMonitor', name: 'dealMonitor', component: monitoringSuper('/deal/dealMonitor') },
                //交易监测--交易详情
                { path: '/dealDetail', name: 'dealDetail', component: monitoringSuper('/deal/dealDetail') },
                //交易检测--自行交易详情
                { path: '/dealDetailElse', name: 'dealDetailElse', component: monitoringSuper('/deal/dealDetailElse') },
                //合同监测
                { path: '/contract/contractMonitor', name: 'contractMonitor', component: monitoringSuper('/contract/contractMonitor') },
                //合同监测--合同详情
                { path: '/contractDetail', name: 'contractDetail', component: monitoringSuper('/contract/contractDetail') },
                //监测监管平台-供需统计
                //需求统计
                { path: '/supplyAndDemand/demand/demandStatistic', name: 'demandStatistic', component: statistic('/supplyAndDemand/demand/demandStatistic') },
                //需求统计分析
                { path: '/supplyAndDemand/demand/demandAnalyze', name: 'demandAnalyze', component: statistic('/supplyAndDemand/demand/demandAnalyze') },
                //供给统计
                { path: '/supplyAndDemand/supply/supplyStatistic', name: 'supplyStatistic', component: statistic('/supplyAndDemand/supply/supplyStatistic') },
                //供给统计分析
                { path: '/supplyAndDemand/supply/supplyAnalyze', name: 'supplyAnalyze', component: statistic('/supplyAndDemand/supply/supplyAnalyze') },
                //供需对比分析
                { path: '/supplyAndDemand/supplyDemandAnalyze', name: 'supplyDemandAnalyze', component: statistic('/supplyAndDemand/supplyDemandAnalyze') },
                //监测监管平台-交易分析
                //项目交易汇总分析
                { path: '/deal/dealItemCollect', name: 'dealItemCollect', component: statistic('/deal/dealItemCollect') },
                //项目交易汇总分析详情
                { path: '/dealItemCollectDetail', name: 'dealItemCollectDetail', component: statistic('/deal/dealItemCollectDetail') },
                //交易状态对比
                { path: '/deal/dealStatus', name: 'dealStatus', component: statistic('/deal/dealStatus') },
                //区域交易汇总
                { path: '/deal/dealAreaCollect', name: 'dealAreaCollect', component: statistic('/deal/dealAreaCollect') },
                //项目交易结构分析
                { path: '/deal/dealItemStructure', name: 'dealItemStructure', component: statistic('/deal/dealItemStructure') },
                //交易类型区域趋势
                { path: '/deal/dealAreaType', name: 'dealAreaType', component: statistic('/deal/dealAreaType') },
                //区域交易类型趋势
                { path: '/deal/areaDealType', name: 'areaDealType', component: statistic('/deal/areaDealType') },
                //交易用途分析
                { path: '/deal/dealPurpose', name: 'dealPurpose', component: statistic('/deal/dealPurpose') },
                //监测监管平台-合同分析
                //合同综合分析
                { path: '/contract/contractAnalyze', name: 'contractAnalyze', component: statistic('/contract/contractAnalyze') },
                //监测监管平台-监测预警
                //预警列表
                { path: '/warningList', name: 'warningList', component: warning('/warningList') },
                { path: '/warningListDetail', name: 'warningListDetail', component: warning('/warningListDetail') },
                //预警设置
                { path: '/warningSetup', name: 'warningSetup', component: warning('/warningSetup') },


                { path: '/followUpTrackAdd', name: 'followUpTrackAdd', component: followUpTrack('/followUpTrackAdd') },
                { path: '/followUpTrackDetail', name: 'followUpTrackDetail', component: followUpTrack('/followUpTrackDetail') },

                { path: '/followUpTrackEditor', name: 'followUpTrackEditor', component: followUpTrack('/followUpTrackEditor') },
                { path: '/recordAmend', name: 'recordAmend', component: followUpTrack('/recordAmend') },
                { path: '/recordAdd', name: 'recordAdd', component: followUpTrack('/recordAdd') },

            ]
        },
        { path: '/login', name: 'login', component: login }
        // {path: '/cnode', name: 'cnode', component: page('cnode')},
        // // pages
        // {path: '/home-login', name: 'p-login', component: page('home-login')},
        // {path: '/register', name: 'p-register', component: page('register')},
        // {path: '/keyboard', name: 'p-keyboard', component: page('c-keyboard')},
        // {path: '/menuTest', name: 'menuTest', component: systemMenage('menuManage1')},
    ]
})