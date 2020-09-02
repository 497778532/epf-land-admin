<template>
  <div class="page-body">
    <div class="filter_wrap">
      <div class="content">
        <div id="printTransBook">
          <h2 class="title_h">
              <b style="color:#000;">{{transEndDetail.region}}建设用地使用权二级市场成交确认书</b>
          </h2>
          <div class="surface">
             <table border= "1" width= "100%">
                <tr>
                    <td width="10%" class="text_center">交易结束日期</td>
                    <td class="text_center" width="15%">{{transEndDetail.transEndTime}}</td>
                    <td class="text_center">交易方式</td>
                    <td class="text_center">{{transEndDetail.transType}}</td>
                </tr>
                <tr>
                    <td width="10%" rowspan="11" class="text_center">交易地块</td>
                    <td width="15%" class="text_right">标的编号</td>
                    <td width="25%" colspan="2">{{transEndDetail.targetNo}}</td>
                </tr>
                <tr>
                    <td width="15%" class="text_right">交易地点</td>
                    <td width="25%" colspan="2">{{transEndDetail.tradingCenter}}</td>
                </tr>
                <tr>
                    <td width="15%" class="text_right">土地四至范围</td>
                    <td width="25%" colspan="2">{{transEndDetail.range}}</td>
                </tr>
                <tr>
                    <td width="15%" class="text_right">土地面积</td>
                    <td width="25%" colspan="2">{{transEndDetail.area}}平方米</td>
                </tr>
                <tr>
                    <td width="15%" class="text_right">土地用途</td>
                    <td width="25%" colspan="2">{{transEndDetail.landUse}}</td>
                </tr>
                <tr>
                    <td width="15%" class="text_right">土地截止日期</td>
                    <td width="25%" colspan="2">{{transEndDetail.landEndTime}}</td>
                </tr>
                <tr>
                    <td width="15%" class="text_right">地上建（构）筑物</td>
                    <td width="25%" colspan="2">{{transEndDetail.buildArea}}平方米</td>
                </tr>
                <tr>
                    <td width="15%" rowspan="2" class="text_right">成交单价（元/平方米）</td>
                    <td width="25%" colspan="2">大写：{{transEndDetail.endPriceUnitUp}}</td>
                </tr>
                <tr>
                    <td width="25%" colspan="2">小写：{{transEndDetail.endPriceUnit}}</td>
                </tr>
                <tr>
                    <td width="15%" rowspan="2" class="text_right">成交总价（万元）</td>
                    <td width="25%" colspan="2" class="text_color">大写：{{transEndDetail.endPriceUp}}</td>
                </tr>
                <tr>
                    <td width="25%" colspan="2" class="text_color">小写：{{transEndDetail.endPrice}}</td>
                </tr>
                <tr>
                    <td width="10%" rowspan="2" class="text_center">说明事项</td>
                    <td width="25%" rowspan="2" colspan="3">
                        一、本《成交确认书》为买卖（租赁）双方签订《转入、出租合同》的凭证。<br/>

                        二、交易双方应当在签订本《成交确认书》后10个工作如内签订《转入、出租合同》

                        交易双方逾期或拒绝签订《转入、出租合同》的竞得人放弃竞得标的的转入（出租）

                        人或交易机构擅自变更交易结果的，均应当承担违规违约和法律责任。<br/>

                        三、签订《转入、出租合同》后，竞得人交纳的竞买保证金转作合同定金，定金以《

                        转让、出租合同》约定金额为准。<br/>

                        四、本《成交确认书》一式五份，双方各执两份，交易机构留存一份。
                    </td>
                </tr>
                <tr>
                </tr>
            </table>
            <table class="bottom_table" border= "1"  width= "100%" >
                <tr>
                    <td widht="33.3%">
                        <p>原权利人：{{transEndDetail.oldPerson}}</p>
                        <p>法定代表人（委托代理人）：{{transEndDetail.oldLawPerson}}</p>
                        <p>地址：{{transEndDetail.oldAddress}}</p>
                        <p>法人联系电话：{{transEndDetail.oldTel}}</p>
                    </td>
                    <td widht="33.3%">
                        <p>交易机构：{{transEndDetail.transOrg}}</p>
                        <p>法定代表人：{{transEndDetail.orgUser}}</p>
                        <p>地址：{{transEndDetail.orgAdderss}}</p>
                        <p>联系电话：{{transEndDetail.orgTel}}</p>
                    </td>
                    <td widht="33.3%">
                        <p>竞得人：{{transEndDetail.newPerson}}</p>
                        <p>法定代表人（或委托代理人）：{{transEndDetail.newLawPerson}}</p>
                        <p>地址：{{transEndDetail.newAdderss}}</p>
                        <p>联系电话：{{transEndDetail.newTel}}</p>
                    </td>
                </tr>
            </table>
        </div>
        <div class="text_right" style="margin-top:40px;">
            签订时间：{{transEndDetail.transEndTime}}
        </div>
        </div>
        <div class="btns_box">
            <div class="middleBox" style="text-align:center;">
                <div class="button_border" @click="transEndBook">下载</div>
                <div class="button_bg"  v-print="'#printTransBook'">打印</div>
                <div class="button_default" @click="closeTabs">关闭</div>
            </div>
        </div>
      </div>
    </div>
   </div>
</template>
<script>
import baseURL1 from "../../index.js";
export default {
  name: "postpose",
  data() {
    return {
        LaterGetCheckvoId:'',//ID
        transEndDetail:{}
    };
  },
  created(){
    this.$bus.$on('Confirmation',val =>{ //传递的参数
      this.LaterGetCheckvoId = val; //审核ID赋值
    })
    this.$get(this.$API.EPF_TRADE.TRADE.END_DETAIL,{targetId:that.$route.query.targetId},{}).then(res => {
      console.log('标的详情返回',res)
      if(res.code == 0){
        this.transEndDetail = res.transEnd;
      }
    });
  },
  methods: {
    queryData(){ //请求方法
        const url = '';
        const params = {
            parameter:this.LaterGetCheckvoId
        };
        this.$get(url,params).then(res=>{
            console.log("这是返回状态码",res.code);
            if (res.code == "0") {
                console.log("这是返回",res);
            } else {
            this.$message.error(res.msg); //失败
                return;
            }
        });
    },
    closeTabs(){  //关闭
        window.history.go(-1);
    },
    // 下载成交确认书
    transEndBook(){
      let url = baseURL1.baseURL1 + "/epf-trade/pdf/downloadTransEndBook?targetId="+this.$route.query.targetId+"&userId="
      window.open(url);
    },
  },
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
    background-color: #f5f5f5;
}
.title_h{
    text-align: center;
    font-size: 18px;
}
.surface{
    margin-top: 70px;
}
.surface table{
    border-color: #e2e2e2;
}
.surface tr td{
    padding: 14px 25px;
}
.text_center{
    text-align: center;
}
.text_right{
    text-align: right;
}
.text_color{
    color: #ffa300;
}
.bottom_table{
    border-top: 0;
    border-color: #e2e2e2;
}
.btns_box{
    width: 300px;
    margin: 0 auto;
    margin-top: 10px;
}
</style>