<template>
  <div class="page-body">
    <div class="filter_wrap">
      <div class="tradePublicDetail_warp">
        <div class="tradePublicDetail_cont">
          <div class="landshow_main_listtop_con">
            <div class="landshow_text">
              <p class="landshowtext_header">{{transTargetEntityMap.publictTitle}}</p>
              <p class="landshowtext_subheader">{{transTargetEntityMap.targetNo}}</p>
              <p style="text-align:right;margin-right:35px;">发布时间：{{transTargetEntityMap.insertTime}}</p>
              <!-- <p
                class="landshow_textcon"
              >按照《土地管理法》、《城市房地产管理法》、《招标拍卖挂牌出让国有土地使用权规定》和《招标拍卖挂牌出让国有
              土地使用权规范》等有关法律法规，遵循公开、公正、公平的原则。我局于 {{transTargetEntityMap.targStartTime}}
              至 {{transTargetEntityMap.targEndTime}} {{transTargetEntityMap.transTypeName}}转让 {{transTargetEntityMap.targetNo}} 国有土地使用权。
              现将有关情况公示如下：</p> -->
              <p class="landshow_textcon" v-html="transTargetEntityMap.publictContext"></p>
            </div>
            <div class="landshow_main_title">
              <div class="landshow_title_icon f-left"></div>
              <h2 class="title f-left">地块基本情况</h2>
            </div>
            <div class="landshow_main_cont">
              <div width="100%;" class="landshow_tableTitle">标的编号：{{transTargetEntityMap.targetNo}}</div>
              <table class="landshow_table1" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>地块编号</td>
                  <td style="width:300px">地块位置</td>
                  <td>土地面积（m²）</td>
                  <td v-if="transGoodsEntityList[0] && transGoodsEntityList[0].circulation=='transfer'">剩余使用年限</td>
                  <td v-if="transGoodsEntityList[0] && transGoodsEntityList[0].circulation=='rent'">出租年限</td>
                  <td>土地用途</td>
                </tr>
                <tr v-for="(item,index) in transGoodsEntityList" :key="index">
                  <td>{{item.goodsNo}}</td>
                  <td>
                    <!-- bug3659 {{item.cantonProvinceName}}-{{item.cantonCityName}}-{{item.cantonAreaName}}- -->
                    {{item.location?item.location+',':null}}{{item.east?'东至'+item.east+'，':null}}{{item.west?'西至'+item.west+'，':null}}{{item.south?'南至'+item.south+'，':null}}{{item.north?'北至'+item.north:null}}
                  </td>
                  <td>{{item.area}}</td>
                  <td>{{item.years}}</td>
                  <td>{{item.firstClassUseName}}-{{item.secondClassUseName}}</td>
                </tr>
                <tr>
                  <td>起始价（万元）</td>
                  <td>{{transTargetEntityMap.beginPrice}}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>成交价（万元）</td>
                  <td>{{transTargetEntityMap.transPrice}}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>成交时间</td>
                  <td>{{transTargetEntityMap.endTransTime}}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              <!-- <span v-if="ruleForm.circulationName=='转让'">剩余使用年限：</span>
              <span v-else>{{ ruleForm.circulationName }}年限：</span>
              <span>{{ruleForm.years ? ruleForm.years + "年" : null}}</span> -->
                <tr>
                  <td>
                    <span v-if="transGoodsEntityList[0].circulation=='transfer'">转让方</span>
                    <span v-if="transGoodsEntityList[0].circulation=='rent'">出租方</span>
                  </td>
                  <td>{{transTargetEntityMap.ownerShipName}}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <span v-if="transGoodsEntityList[0].circulation=='transfer'">受让方</span>
                    <span v-if="transGoodsEntityList[0].circulation=='rent'">承租方</span>
                  </td>
                  <td>{{transTargetEntityMap.winnerId}}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </table>
            </div>
            <div class="landshow_main_title">
              <div class="landshow_title_icon f-left"></div>
              <h2 class="title f-left">联系方式</h2>
            </div>
            <div class="landshow_main_cont">
              <div class="applyBidde_text">
                <p>
                  联系人单位：
                  <span>{{userInfo.orgName}}</span>
                </p>
                <p>
                  单位地址：
                  <span>{{userInfo.address}}</span>
                </p>
                <p>
                  邮政编码：
                  <span>{{userInfo.postalCode}}</span>
                </p>
                <p>
                  联系电话：
                  <span>{{userInfo.telPhone}}</span>
                </p>
                <p class="myp">
                  联系人：
                  <span>{{userInfo.liaison}}</span>
                </p>
                <p>
                  电子邮件：
                <span>{{userInfo.email}}</span>
                </p>
                <p style="text-align:right;">{{userInfo.orgName}}</p>
                <p style="text-align:right;">{{insertTime}}</p>
                <p style="clear:both;"></p>
              </div>
            </div>
            <!-- <div class="opera">
              <el-button type="warning" style="background:#ffa000;">下载</el-button>
              <el-button type="warning" plain style="border:1px solid #ffa000;">打印</el-button>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      transGoodsEntityList:{
        id: "005",
        circulation: "transfer",
        landChar: "state-owned_construction_land",
        channel: "supply_and_demand",
        tSellId: null,
        goodsNo: "005",
        authentication: "1",
        cantonProvince: "shanxi",//行政区编号-省
        cantonCity: "taiyuan",//行政区编号-市
        cantonArea: "xiaodian",//行政区编号-区
        useType: "transfer2",
        landType: "personal_land",
        firstClassUse: "warehousing_land",//地块一级用途
        secondClassUse: "land_use-007",//地块二级用途
        area: 5000, //面积
        endDate: "2019-12-12",
        years: 50, //剩余年限
        location: "小店区88号", //土地坐落详细地址
        coordinate: "132°,52°",
        mapIdentification: null,
        north: "工业南路", //北至
        south: "经十路", //南至
        west: "顺风路", //西至
        east: "舜华路", //东至
        price: 8000,
        warrantNumType: "real_estate_no",
        warrantNum: "quanzhenghao001",
        registration: "shanxishengtudiju",
        unitNum: "budognchandanyuanhao001",
        isAdjunct: "1",
        isDevelope: 1,
        isPercent: 1,
        buildArea: 20,
        buildingStructure: "ferroconcrete",
        greenSpaceRate: "10",
        greenSpaceRate2: "30",
        greenSpaceRateSymbol1: "<",
        greenSpaceRateSymbol2: "<",
        buildingDensity: "10",
        buildingDensity2: "30",
        buildingDensitySymbol1: "<",
        buildingDensitySymbol2: "<",
        heightLimit: "100",
        plotRatio: "10",
        plotRatio2: "30",
        plotRatioSymbol1: "<",
        plotRatioSymbol2: "<",
        publishStatus: "draft",
        examineTime: "2019-12-12",
        landLevel: "grade_type-001",
        img: "tupian001",
        fileTemplateId: "fujianmuban001",
        fileId: "shipin001",
        remark: "其他说明",
        isUnion: null,
        amount: null,
        amountStatus: null,
        insertTime: "5019-05-07", //发布时间
        insertUser: "003",
        updateTime: "2019-05-15",
        updateUser: "测试",
        deleteFlag: 0,
        isBinding: 0,
      },
      transTargetEntityMap: {
        insertTime: "2019-05-18",
        publictContext: "公示内容",
        beginPrice: "100.00",
        winnerId: "测试数据",
        tradingCenter: "交易中心(对应关联的ID)",
        endTransTime: "2019-05-16", //成交时间
        targetNo: "005,006",
        id: "666",
        transPrice: "100.00",
        ownerShipName: "gaojie,gaojie",
        publictTitle: "公示标的"
      },
      params:{ //请求参数
        token:'',
        targetId:'',
      },
      userInfo:{},
      insertTime: ""
    };
  },
  methods:{
    queryData(){
      this.$get('/epf-trade/admin/transtarget/getTransResultsPublic',this.params).then(res=>{
        console.log('这是接口返回',res);
        if(res.code == '0'){
          this.transGoodsEntityList = res.map.transGoodsEntityList;
          this.transTargetEntityMap = res.map.transTargetEntityMap;
          this.userInfo = res.map.orgInfo;
          this.insertTime = res.map.insertTime;
        }
      });
    }
  },
  mounted(){
    const id = this.$route.query.id; //标的ID赋值
    // this.params.targetId = id
    this.params.targetId = id;
    this.params.token = sessionStorage.getItem('token') //登录session
    console.log('这是是是是是参数',this.params);
    this.queryData();
  },
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}


.tradePublicDetail_warp {
  margin: 0 auto;
  padding: 30px 80px 0 80px;
  .tradePublicDetail_cont {
    @include size(100%, auto);
    box-sizing: border-box;
    padding: 50px 150px;
    background: #fbfbfb;
    color: #666666;
    .landshow_main_listtop_con {
      box-sizing: border-box;
      .landshow_text {
        @include size(100%, auto);
        color: #bebebf;
        font-size: 14px;
        line-height: 30px;
        .landshowtext_header {
          text-align: center;
          color: #333333;
          font-size: 20px;
          font-weight: bold;
          line-height: 50px;
        }
        .landshowtext_subheader {
          text-align: center;
          color: #333333;
          font-size: 18px;
          line-height: 50px;
        }
      }
      .landshow_textcon {
        box-sizing: border-box;
        padding: 0 24px;
        text-indent: 2rem;
        color: #666666;
      }
      p {
        color: #666666;
        font-size: 14px;
        line-height: 30px;
      }
      .landshow_main_title {
        @include size(100%, 56px);
        margin: 24px;
        .landshow_title_icon {
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
      .landshow_main_cont {
        box-sizing: border-box;
        padding: 0 24px;
        .applyBidde_text {
          p {
            font-size: 14px;
            line-height: 24px;
            color: #999999;
            margin: 10px;

            span {
              color: #666666;
            }
          }
        }
      }
      .landshow_table {
        border-top: 1px solid #f2f2f2;
        border-left: 1px solid #f2f2f2;
        clear: both;
        td {
          line-height: 25px;
          color: #333333;
          font-size: 14px;
          padding: 10px 15px;
          border-right: 1px solid #f2f2f2;
          border-bottom: 1px solid #f2f2f2;
          text-align: center;
        }
        .td1 {
          width: 120px;
          background: #f2f5f7;
          color: #666666;
          text-align: right;
        }
        .td2 {
          width: 460px;
          background: #fff;
          text-align: left;
        }
      }
      .landshow_tableTitle {
        line-height: 62px;
        border: 1px solid #f2f2f2;
        border-bottom: 0px solid #f2f2f2;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        color: #666666;
      }
      .landshow_table1 {
        border: 1px solid #f2f2f2;
        td {
          border-right: 1px solid #f2f2f2;
          border-bottom: 1px solid #f2f2f2;
          text-align: center;
          color: #555555;
          line-height: 50px;
          font-size: 14px;
          border-bottom: 1px solid #eee;
        }
      }
      .opera {
        text-align: center;
      }
    }
  }
}
p.myp {
  margin-left: 10px;
}
</style>
<style>
.el-button--warning.is-plain:focus,
.el-button--warning.is-plain:hover {
  background: #fff;
  color: #00af00;
}
</style>
