// const page = name => () => import('@/pages/' + name)
// const systemMenage = name => () => import('@/pages/systemMenage/' + name)
// const tradingPlatform = name => () => import('@/pages/tradingPlatform/' + name)
// const secondLevel = (name1,name2) => () => import('@/pages/'+name1+'/' +name2)
// // 标的信息
// const landmarkInfo = name => () => import('@/pages/tradingPlatform/landmarkInfo/' + name)
// // 服务机构管理
// const serverOrgMenage = name => () => import('@/pages/serviceOrgManage/' + name)

// export default[
//     {path: '/home', name: 'home', component:  page('home')},
//     {path: '/transferPlace', name: 'transferPlace', component: page('transferPlace')},
//     {path: '/rentPlace', name: 'rentPlace', component: page('rentPlace')},
//     {path: '/pledgePlace', name: 'pledgePlace', component: page('pledgePlace')},
//     {path: '/needBuyPlace', name: 'needBuyPlace', component: page('needBuyPlace')},
    
//     {path: '/infoManage', name: 'infoManage', component: page('infoManage')},
//     {path: '/infoMenuManage', name: 'infoMenuManage', component: page('infoMenuManage')},
//     {path: '/advertManage', name: 'advertManage', component: page('advertManage')},
	  
//     {path: '/needRentPlace', name: 'needRentPlace', component: page('needRentPlace')},
//     {path: '/dictManager', name: 'dictManager', component: secondLevel('dict','dictManager')},
//     {path: '/infosearch', name: 'infosearch', component: page('infosearch')},
//     {path: '/infomenu', name: 'infomenu', component: page('infomenu')},
//     {path: '/infomenu', name: 'infomenu', component: page('infomenu')},
//     {path: '/infowebset', name: 'infowebset', component: page('infowebset')},
//     {path: '/infomodleset', name: 'infomodleset', component: page('infomodleset')},
//     {path: '/menuManage', name: 'menuManage', component: systemMenage('menuManage')},
//     // 到账查询	arrivalInquiry
//     {path: '/arrivalInquiry', name: 'arrivalInquiry', component: tradingPlatform('arrivalInquiry')},
//     // 公告信息	announcementInfo
//     {path: '/announcementInfo', name: 'announcementInfo', component: tradingPlatform('announcementInfo')},


//     // 标地信息	landmarkInfo
//     {path: '/landmarkInfo', name: 'landmarkInfo', component: landmarkInfo('landmarkInfo')},
//     // 标地信息--标地信息详情	
//     {path: '/landmarkInfoDetail', name: 'landmarkInfoDetail', component: landmarkInfo('landmarkInfoDetail')},
//     // 标地信息--审核结果	
//     {path: '/landmarkInfoExamineResult', name: 'landmarkInfoExamineResult', component: landmarkInfo('landmarkInfoExamineResult')},
//     // 标地信息--增加	
//     {path: '/landmarkInfoAdd', name: 'landmarkInfoAdd', component: landmarkInfo('landmarkInfoAdd')},
//     // 标地信息--成交结果	
//     {path: '/landmarkInfoDealresult', name: 'landmarkInfoDealresult', component: landmarkInfo('landmarkInfoDealresult')},
//     // 标地信息--公示发布
//     {path: '/publicityDetails', name: 'publicityDetails', component: landmarkInfo('publicityDetails')},
//     // 标地信息--公示详情
//     {path: '/publicityRelease', name: 'publicityRelease', component: landmarkInfo('publicityRelease')},
    
//     // 地块信息	parcelInfo
//     {path: '/parcelInfo', name: 'parcelInfo', component: tradingPlatform('parcelInfo')},
//     // 地块信息--地块信息详情	
//     {path: '/parcelInfoDetail', name: 'parcelInfoDetail', component: tradingPlatform('parcelInfoDetail')},
//     // 地块信息--审核结果	
//     {path: '/parcelInfoExamineResult', name: 'parcelInfoExamineResult', component: tradingPlatform('parcelInfoExamineResult')},
//     // 地块信息--增加	
//     {path: '/parcelInfoAdd', name: 'parcelInfoAdd', component: tradingPlatform('parcelInfoAdd')},


//     // 成交公示	transactionAnnounce
//     {path: '/transactionAnnounce', name: 'transactionAnnounce', component: tradingPlatform('transactionAnnounce')},
//     {path: '/transactionAnnounceDetail', name: 'transactionAnnounceDetail', component: tradingPlatform('transactionAnnounceDetail')},

    
//     // 交易中止	tradSuspend
//     {path: '/tradSuspend', name: 'tradSuspend', component: tradingPlatform('tradSuspend')},
//     // 交易前置资格审核	tradPreReview
//     {path: '/tradPreReview', name: 'tradPreReview', component: tradingPlatform('tradPreReview')},
//     // 交易后置资格审核	tradSufReview
//     {path: '/tradSufReview', name: 'tradSufReview', component: tradingPlatform('tradSufReview')},
//     // 资格审核结果	aualificationReviewResult
//     {path: '/aualificationReviewResult', name: 'aualificationReviewResult', component: tradingPlatform('aualificationReviewResult')},
//     // 短信发送	sendMessage
//     // {path: '/sendMessage', name: 'sendMessage', component: tradingPlatform('sendMessage')},  
//     // {path: '/menuManage', name: 'menuManage', component: systemMenage('menuManage')},
//     // {path: '/templateManage', name: 'templateManage', component: templateManage},
//     // {path: '/menuManage', name: 'menuManage', component: systemMenage('menuManage')},
//     // // 详情页
//     // {path:'/demandSupplyDetails',name: 'demandSupplyDetails',component:secondLevel('demandSupplyDetails','demandSupplyDetails')},
//     // // 不动产自动校验
//     {path:'/automaticheck',name: 'automaticheck',component:secondLevel('automaticheck','automaticheck')},
//     {path:'/demandSupplyDetail',name: 'demandSupplyDetails',component:secondLevel('demandSupplyDetails','demandSupplyDetails')},
//     //委托交易管理
//     {path:'/entrustedTradeDetails',name: 'entrustedTradeDetails',component:secondLevel('tradingPlatform','entrustedTradeManage')},
//     // //富文本编辑器
//     {path:'/editor',name: 'editor',component:secondLevel('editor','editor')},
//     {path: '/serverOrgManage', name: 'serverOrgManage', component: serverOrgMenage('serverOrgManage')},
    // {path: '/templateManage', name: 'templateManage', component: secondLevel('filesManage','templateManage')},
    
//   ]