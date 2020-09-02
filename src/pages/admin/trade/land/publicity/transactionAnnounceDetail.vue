<template>
  <div class="page-body">
    <div class="filter_wrap">
      <div class="landmain">
        <!-- <div class="landshow_top">
          <div class="landshow_huandeng">
            <div class="bigImg">
              <div class="pic-box">
                <pic-zoom  :url="currentImg" :scale="3"></pic-zoom>
              </div>
            </div>
            <div class="smallImg">
              <div id="imageMenu">
                <div @click="prevImg" class="onlickImg prev-arrow">
                  <img src="@/assets/images/icon-left.png" alt>
                </div>
                <ul>
                  <li class="list-img">
                    <div class="list-img-wrap" ref="carouser">
                      <div
                        @click="getCurImg(item.url, index)"
                        v-for="(item,index) in imgUrl"
                        :key="index"
                        class="single-img"
                        :class="{'img-activce': item.url == curCode && imgActive}"
                      >
                        <img v-if="item.extName == 'png'" :src="item.url" alt="缩略图">
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="onlickImg onlickImg1" @click="nextImg">
                  <img src="@/assets/images/icon-right.png" alt>
                </div>
              </div>
            </div>
          </div>
          <div class="landshow_topcent">
            <p class="landshow_title">标的编号：DAL2018002，DAL2018003</p>
            <p class="landshow_titlebot">
              <span>
                <img src="@/assets/images/icon-time.png" alt style="margin-top:-7px;">
                 2019-02-20  14：00：00
              </span>
            </p>
            <div class="landshow_pice">
              起始价：<span>100000元</span>
              竞价阶梯：<span>￥100000万</span>
              成交价：<span>￥1000000万</span>
            </div>
            <p class="landshow_p"><span>交易方式：</span>网上交易（挂牌）</p>
            <p class="landshow_p"><span>流转方式：</span>土地出租</p>
            <div class="landshow_state">
              <div class="landshow_proesstop" :style="{'left':NewTime+'px'}" v-show="proessTime">
                <ul>
                  <li>
                    <p>当前时间</p>
                    <p>2019-01-22  12:00:00</p>
                    <div class="landshow_proesstopicon"></div>
                  </li>
                </ul>
              </div>
              <ul class="landshow_proess">
                <li>
                  <div class="landshow_icon"><img src="@/assets/images/landStateTime00.png" alt=""></div>
                  <p class="landshow_stateTime">公告开始时间</p>
                  <p>2018-07-01</p>
                  <p>18:00:00</p>
                </li>
                <li>
                  <div class="landshow_icon" v-if="landStatekey===0"><img src="@/assets/images/landStateTime11.png" alt=""></div>
                  <div class="landshow_icon" v-if="landStatekey===1||landStatekey===2"><img src="@/assets/images/landStateTime12.png" alt=""></div>
                  <p class="landshow_stateTime">竞买申请开始时间</p>
                  <p>2018-07-01</p>
                  <p>18:00:00</p>
                </li>
                <li>
                  <div class="landshow_icon" v-if="landStatekey===0||landStatekey===1"><img src="@/assets/images/landStateTime21.png" alt=""></div>
                  <div class="landshow_icon" v-if="landStatekey===2"><img src="@/assets/images/landStateTime22.png" alt=""></div>
                  <p class="landshow_stateTime">挂牌截止时间</p>
                  <p>2018-07-01</p>
                  <p>18:00:00</p>
                </li>
                <li>
                  <div class="landshow_icon" v-if="landStatekey===0||landStatekey===1"><img src="@/assets/images/landStateTime31.png" alt=""></div>
                  <div class="landshow_icon" v-if="landStatekey===2"><img src="@/assets/images/landStateTime32.png" alt=""></div>
                  <p class="landshow_stateTime">限时竞价开始时间</p>
                  <p>2018-07-01</p>
                  <p>18:00:00</p>
                </li>
              </ul>
            </div>
            <div class="input_buy">竞价记录</div>
          </div>
          <div style="clear:both"></div>
          <div class="landshow_download">
            <span class="landshow_download_title">相关附件下载：</span>
            <div class="download">
              <div v-for="(item,index) in downloadEnclosure" :key="index">
                <span>{{item.title}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="landshow_main">
          <div class="landshow_main_tab">
            <div class="listabtop">
              <span :class="{spanActive:landInfoListTitleKey===0}" @click="selectSpan(landInfoListTitleKey=0)">地块信息</span>
              <span :class="{spanActive:landInfoListTitleKey===1}" @click="selectSpan(landInfoListTitleKey=1)">公告详情</span>
            </div>
          </div>
          <div class="landshow_main_con" v-if="landInfoListTitleKey===0">
            <div class="landshow_main_listselect">
              <span @click="landInfoKeySelect(landInfoKey=index)" v-for="(item,index) in landInfoTitle" :key="index" :class="landInfoKey===index?'spanActiveland':''">{{item}}</span>
            </div>
            <div class="landshow_main_table">
              <div class="table_title">EBJ3129113</div>
              <table class="landshow_table" width="100%" height="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="td1">地块编号：</td>
                  <td class="td2">EBJ3129113</td>
                  <td class="td1">区域：</td>
                  <td class="td2">山西省-太原市-小店区</td>
                </tr>
                <tr>
                  <td class="td1">土地面积：</td>
                  <td class="td2">22㎡</td>
                  <td class="td1">类型：</td>
                  <td class="td2">经营性用地</td>
                </tr>
                <tr>
                  <td class="td1">建筑面积：</td>
                  <td class="td2">22㎡</td>
                  <td class="td1">用途：</td>
                  <td class="td2">商业</td>
                </tr>
                <tr>
                  <td class="td1">登记机构：</td>
                  <td class="td2">济南市不动产登记中心</td>
                  <td class="td1">剩余使用年限：</td>
                  <td class="td2">65</td>
                </tr>
                <tr>
                  <td class="td1">土地性质：</td>
                  <td class="td2">国有建设用地</td>
                  <td class="td1">土地坐落：</td>
                  <td class="td2">济南市历下区胜利路28号</td>
                </tr>
                <tr>
                  <td class="td1">权证号类型：</td>
                  <td class="td2">不动产证号</td>
                  <td class="td1">权证号：</td>
                  <td class="td2">鲁（2017）济南市不动产权第0018179</td>
                </tr>
                <tr>
                  <td class="td1">使用权类型：</td>
                  <td class="td2">出让</td>
                  <td class="td1">建设用地使用权出让合同：</td>
                  <td class="td2">济南-01-2019-0003</td>
                </tr>
                <tr>
                  <td class="td1">容积率：</td>
                  <td class="td2">1.5&gt;容积率&gt;1.8</td>
                  <td class="td1">建筑结构：</td>
                  <td class="td2">钢筋混凝土结构</td>
                </tr>
                <tr>
                  <td class="td1">土地等级：</td>
                  <td class="td2">二级等级</td>
                  <td class="td1">建筑限高：</td>
                  <td class="td2">20</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="landshow_main_con" v-if="landInfoListTitleKey===1">
              <div class="tradePublicDetail_cont">
                <div class="tradePublicTable">
                  <ul>
                    <li style="">济国土资告字（2019）2号</li>
                    <li style="height:98px;" class="li1">标的编号</li>
                    <li style="height:98px;" class="li2">
                      <p class="title">DAZ2018002</p>
                      <p class="title">DAZ2018003</p>
                    </li>
                    <li class="li1">{{tableData1.title1}}</li>
                    <li class="li2">{{tableData1.cont1}}</li>
                    <li class="li1">{{tableData1.title2}}</li>
                    <li class="li2">{{tableData1.cont2}}</li>
                    <li class="li1">{{tableData1.title3}}</li>
                    <li class="li2">{{tableData1.cont3}}</li>
                    <li class="li1">{{tableData1.title5}}</li>
                    <li class="li2">{{tableData1.cont5}}</li>
                    <li class="li1">{{tableData1.title6}}</li>
                    <li class="li2">{{tableData1.cont6}}</li>
                    <li class="li1">{{tableData1.title7}}</li>
                    <li class="li2">{{tableData1.cont7}}</li>
                    <li class="li1">{{tableData1.title8}}</li>
                    <li class="li2">{{tableData1.cont8}}</li>
                    <li class="li1">{{tableData1.title9}}</li>
                    <li class="li2">{{tableData1.cont9}}</li>
                    <li class="li1">{{tableData1.title10}}</li>
                    <li class="li2">{{tableData1.cont10}}</li>
                    <li class="explain" style="width:100%;">
                      <div>其他公告说明</div>
                      <div>
                        <p>1、济南万达科技有限公司开发建设于2014年1月25日以挂牌出让方式取得了盖宗地的土地使用权，使
                        用权面积为28210.53平方米，土地用途为住宅，住宅用地面积19737.47平方米，
                        住宅使用年限至2018年1月25日止，</p>
                        <p>2、抵押、查封情况：无（济南市不动产登记中心技术科2018年9月17日《证明》）</p>
                        <p>3、济南市国有资源执法监察支队《关于同意历下区C-16-1地块42亩挂牌转让的函》。</p>
                        <p>4、根据《济南万达房地产建设有限公司提交的股东会决定》，济南市历下区财政局《济南市历下区财政局关于同意新东方片区C-16-1地块42亩挂牌转让的函》（历财函[2018]6号），济南市历下区人民政。</p>
                        <p>5.规划土地用途：住宅用地；容积率：≤2.5；建筑密度：≤30%；绿地率：≥40%；建筑限高不超过100米。</p>
                        <p>6、根据济南XX管理委员会意见，①地块竟买人需在竟买后，签订网签《国有出让地建设用地使用权转让合同》之前，将企业的工商、税务关系注册或变更至XX产业园区内。②宗地开发方案需满足济南万达房地产技术有限公司某某某区门户区域总体规划（经济南XX产业园管理委员会审核后实施）。</p>
                        <p>7、红线范围外通路、通电、通讯、供水、排水；宗地红线范围内自然地貌，已完成拆迁安置补偿。</p>
                        <p>8、委托人与竞得人签订的《国有建设用地使用权转让合同》生效之日起5个工作日内支付全部土地转让价款</p>
                      </div>
                    </li>
                  </ul>
                  <div style="clear:both;"></div>
                </div>
              </div>
              <div class="tradePublic_title">地块信息</div>
              <div class="tradePublic_main_cont">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>地块编号</td>
                    <td>土地权属单位</td>
                    <td>土地位置</td>
                    <td>使用权面积</td>
                    <td>土地用途</td>
                    <td>容积率</td>
                    <td>剩余使用年限（年）</td>
                    <td>竞买保证金（万元）</td>
                  </tr>
                  <tr v-for="(item,index) in detailInfo" :key="index">
                    <td>{{item.land1}}</td>
                    <td>{{item.land2}}</td>
                    <td>{{item.land3}}</td>
                    <td>{{item.land4}}</td>
                    <td>{{item.land5}}</td>
                    <td>{{item.land6}}</td>
                    <td>{{item.land7}}</td>
                    <td>{{item.land8}}</td>
                    <td>{{item.land9}}</td>
                  </tr>
                </table>
                <div style="clear: both;"></div>
              </div>
          </div>
        </div>
        <div v-show="false">{{comNewTime}}</div> -->
        <div class="landshow_main">
          <div class="publish_main_title">
            <div class="publish_title_icon f-left"></div>
            <h2 class="title f-left">地块基本信息</h2>
          </div>
          <div class="publish_main_cont">
            <el-tabs>
              <div class="toolsTitleBox">
                <span class="toolsTitle">标的编号：济DZR[2019]002，济DZR[2019]003</span>
              </div>
              <el-table ref="multipleTable" :data="landInfo" style="width: 100%," border>
                <el-table-column prop="landNo" label="标的编号" width="220"></el-table-column>
                <el-table-column prop="landlocation" label="地块位置"></el-table-column>
                <el-table-column prop="landArea" label="土地面积（m²）" width="180"></el-table-column>
                <el-table-column prop="landYear" label="使用年限" width="180"></el-table-column>
                <el-table-column prop="landUse" label="土地用途" width="370"></el-table-column>
              </el-table>
              <el-table ref="multipleTable" :data="landInfo1" style="width: 100%," border>
                <el-table-column prop="startprice" label="起始价（万元）" width="220"></el-table-column>
                <el-table-column prop="transacteprice" label="成交价（万元）"></el-table-column>
                <el-table-column prop="transactetime" label="成交时间" width="370"></el-table-column>
                <el-table-column prop="assignee" label="受让方" width="370"></el-table-column>
                <el-table-column prop="transferor" label="转让方" width="370"></el-table-column>
              </el-table>
            </el-tabs>
          </div>
          <div class="publish_main_title">
            <div class="publish_title_icon f-left"></div>
            <h2 class="title f-left">联系方式</h2>
          </div>
          <div class="publish_main_cont">
            <el-tabs>
              <el-table ref="multipleTable" :data="contactInfo" style="width: 100%," border>
                <el-table-column prop="contactUnit" label="联系单位" width="350"></el-table-column>
                <el-table-column prop="address" label="单位地址"></el-table-column>
                <el-table-column prop="postalCode" label="邮政编码" width="100"></el-table-column>
                <el-table-column prop="tell" label="联系电话" width="180"></el-table-column>
                <el-table-column prop="contact" label="联系人" width="180"></el-table-column>
                <el-table-column prop="email" label="电子邮箱" width="320"></el-table-column>
              </el-table>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import transferTable from "@/components/transferTable";
import Axios from "axios";

export default {
  components: {
    transferTable
  },
  data() {
    return {NewTime:80,
      proessTime:true,
      landStatekey:1,//土地信息状态(公示、挂牌、成交)
      tableData1:{title1:'挂牌起始时间',cont1:'2018-11-21  10:00:00',title2:'挂牌截止时间',cont2:'2018-11-01  10:00:00',title3:'公告起始时间',cont3:'2018-11-01  10:00:00',title4:'公告截止时间',cont4:'2018-11-01  10:00:00',title5:'竞买申请开始时间',cont5:'2018-11-01  10:00:00',title6:'竞买申请截止时间',cont6:'2018-11-01  10:00:00',title7:'保证金截止时间',cont7:'2018-11-01  10:00:00',title8:'起始价',cont8:'26879万元',title9:'竞买保证金', cont9:'13440万元',title10:'竞价增价幅度',cont10:'269万元',},
      detailInfo: [
        {land1:'DAZ2018002',land2:'济南万达房地产有限公司',land3:'山西省太原市小店区',land4:'28210.53平方米',land5:'商业',land6:'<2.5',land7:'40',land8:'100'},
        {land1:'DAZ2018002',land2:'济南万达房地产有限公司房地产有限公房地...',land3:'山西省太原市小店区',land4:'28210.53平方米',land5:'商业',land6:'<2.5',land7:'40',land8:'100'},
      ],
      collectShow:false,
      intentionData:[
        {REAL_NAME:'q',TEL_PHONE:'w',NUM:'s',INSERT_TIME:'c'},
        {REAL_NAME:'q',TEL_PHONE:'w',NUM:'s',INSERT_TIME:'c'},
        {REAL_NAME:'q',TEL_PHONE:'w',NUM:'s',INSERT_TIME:'c'},
        {REAL_NAME:'q',TEL_PHONE:'w',NUM:'s',INSERT_TIME:'c'},
      ],
      downloadEnclosure:[
        {title:'公告',landtype:0,},
        {title:'变更公告',landtype:0,},
        {title:'公告',landtype:1,},
        {title:'变更公告',landtype:1,},
        {title:'申请竞买书',landtype:1,},
        {title:'入账申请书',landtype:1,},
        {title:'资格确认书',landtype:1,},
        {title:'公告',landtype:2,},
        {title:'变更公告',landtype:2,},
        {title:'申请竞买书',landtype:2,},
        {title:'入账申请书',landtype:2,},
        {title:'资格确认书',landtype:2,},
        {title:'成交确认书',landtype:2,},
        {title:'成交款缴费通知书',landtype:2,},
        {title:'交易服务非缴费通知书',landtype:2,},
        {title:'资金托管协议',landtype:2,},
      ],
      totalRecord:10,
      landInfomatchData:[
        {person:'62333',price:'￥100.00',time:'2019-01-22 14：20：02'},
        {person:'62333',price:'￥100.00',time:'2019-01-22 14：20：02'},
        {person:'62333',price:'￥100.00',time:'2019-01-22 14：20：02'},
        {person:'62333',price:'￥100.00',time:'2019-01-22 14：20：02'},
        {person:'62333',price:'￥100.00',time:'2019-01-22 14：20：02'},
        {person:'62333',price:'￥100.00',time:'2019-01-22 14：20：02'},
        {person:'62333',price:'￥100.00',time:'2019-01-22 14：20：02'},
        {person:'62333',price:'￥100.00',time:'2019-01-22 14：20：02'},
        {person:'62333',price:'￥100.00',time:'2019-01-22 14：20：02'},
        {person:'62333',price:'￥100.00',time:'2019-01-22 14：20：02'},
      ],
      landInfoListTitleKey:1,
      landInfoKey:0,
      landInfoTitle:['DAL20180021','DAL20180022'],
      landInfoListTitle:['地块信息','公告信息','变更公告','竞价记录','公示信息'],
      baseUrl: "",
      location: "交易大厅",
      locationState: "信息详情页",
      locationShow: true,
      searchBarFixed: false,
      spanKey: 1,
      detailData: "",
      tintentionoffer: "", //意向报价价格
      subscribeDialog:false,//预约看地弹窗
      detailData:{landCharName:'国有建设用地',adjunct:'有',landTypeName:'个人用地',buildArea:'1000平方米',cantonProvinceName:'山西省',cantonCityName:'太原市',cantonAreaName:'小店区',
                  buildingStructureName:'混凝块钢筋',firstClassUseName:'商服用地',secondClassUseName:'公用建设经营用地',area:'5000',endDate:'2058-08-08',
                  location:'山西小店区康宁街15号',warrantNum:'赣（2017）南昌市不动产权第0018158号'},
      imgUrl: [
        // { index: 1, url: require("../../../assets/index/icon-demand01.jpg") }
        // { index: 2, url: require("../../../assets/index/icon-demand02.png") },
        // { index: 3, url: require("../../../assets/index/icon-demand03.png") },
        // { index: 4, url: require("../../../assets/index/icon-demand04.png") },
        // { index: 5, url: require("../../../assets/index/icon-demand01.png") },
        // { index: 6, url: require("../../../assets/index/icon-demand02.png") },
        // { index: 7, url: require("../../../assets/index/icon-demand03.png") },
        // { index: 8, url: require("../../../assets/index/icon-demand01.png") },
        // { index: 9, url: require("../../../assets/index/icon-demand02.png") },
        // { index: 10, url: require("../../../assets/index/icon-demand03.png") },
        // { index: 11, url: require("../../../assets/index/icon-demand04.png") }
      ], //大图片默认显示第一张
      mp4Url:[],
      currentImg: "",
      // ImgUrl: require("../../../assets/index/icon-demand01.jpg"),
      offsetCount: 1,
      curCode: 1,
      imgActive: true,
      indexcollect: 1,
      imgScroll:0,//计算跳转位置
      // 意向报价
      intentionData: [],
      // 热门推荐
      popularData: [
        {
          title: "河南洛阳480亩水浇地出...",
          type: "个人地源",
          price: "￥500万/年",
          area: "5000平方米",
          time: "50",
          location: "山西省-永州市-宁远县"
        },
        {
          title: "河南洛阳480亩水浇地出...",
          type: "企业地源",
          price: "￥500万/年",
          area: "5000平方米",
          time: "50",
          location: "山西省-永州市-宁远县"
        }
      ],
      collectionData: [],
       ruleForm: {
          tsellId: '',
          name: '',
          phone: '',
          seeDate:'',
          isSee:'false',
          reservationId:'',
        },
        rules: {
          name: [
            { required: true, message: '请输入您的姓名', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入您的手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号格式有误', trigger: 'blur' }
          ],
          seeDate: [
            {required: true, message: '请选择预约看地时间', trigger: 'change' }
          ],
        },
      tableDataTitle:[
        {prop:'landNo',title:'标的编号'},
        {prop:'startPrice',title:'起始价(万元)'},
        {prop:'bondPrice',title:'保证金(万元)'},
        {prop:'landState',title:'地块状态'},
        {prop:'tradingCenter ',title:'交易中心'},
        {prop:'chargePer',title:'经办人'},
        {prop:'createTime',title:'创建时间'},
      ],
      tableData: [
        {landNo:"DAZ2018002",startPrice:"2000",endPrice:"400",Status:1,landState:"受理中（录件）",winner:"山东中建房地产开发有限公司",dealtime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",startPrice:"2000",endPrice:"400",Status:2,landState:"审核中",winner:"山东中建房地产开发有限公司",dealtime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",startPrice:"2000",endPrice:"400",Status:3,landState:"已审核",winner:"山东中建房地产开发有限公司",dealtime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",startPrice:"2000",endPrice:"400",Status:4,landState:"已公告",winner:"山东中建房地产开发有限公司",dealtime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",startPrice:"2000",endPrice:"400",Status:5,landState:"交易中",winner:"山东中建房地产开发有限公司",dealtime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",startPrice:"2000",endPrice:"400",Status:6,landState:"成交待审核",winner:"山东中建房地产开发有限公司",dealtime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",startPrice:"2000",endPrice:"400",Status:7,landState:"未成交（已流拍）",winner:"山东中建房地产开发有限公司",dealtime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",startPrice:"2000",endPrice:"400",Status:8,landState:"已成交",winner:"山东中建房地产开发有限公司",dealtime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",startPrice:"2000",endPrice:"400",Status:8,landState:"已成交",winner:"山东中建房地产开发有限公司",dealtime:"2019-01-05  12:12:21",},
        {landNo:"DAZ2018002",startPrice:"2000",endPrice:"400",Status:8,landState:"已成交",winner:"山东中建房地产开发有限公司",dealtime:"2019-01-05  12:12:21",},
      ],
      multipleSelection: [],
      handleDataError: [
        {
          type: 'primary',
          title: '查看审核结果'
        }
      ],
      filterData: {
        title: "",
        infoId: "",
        flowType: "",
        type: "",
        start: "",
        end: "",
        max: "",
        min: ""
      },
      isShowProvince: true,
      temp: {
        address__province: "",
        address__city: "",
        address__dist: ""
      },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
      handleDataWait: [
        {
          type: "success",
          title: "审核"
        },
        {
          type: "primary",
          title: "自动核验"
        }
      ],
      handleDataSuccess: [
        {
          type: "primary",
          title: "查看审核结果"
        },
        {
          type: "danger",
          title: "下架"
        }
      ],
      handleDataError: [
        {
          type: "primary",
          title: "查看审核结果"
        }
      ],
      handleData: "",
      dialogForm: false,
      dialogTable: false,
      dialogTest: false,
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: {},
      // tableData1: [],
      labelPosition: "right",
      form: {
        assessor: "",
        opinion: ""
      },
      formTest: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  computed:{
    comNewTime(){
      if(this.landStatekey===0){this.NewTime=80}
      if(this.landStatekey===1){this.NewTime=252}
      if(this.landStatekey===2){this.proessTime=false}
      return null
    }
  },
  created() {
    // console.log(111);
    // this.handleData = this.handle;
    // console.log(this.handleData);
    // this.getTransferPlace({});
  },
  methods: {
    handleAdd(){
      this.$router.push('/landmarkInfoAdd')
    },
    handleDelete(index, row) {
      this.$confirm('确认要删除该条信息吗?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    handleDetail(item){
      this.$router.push({path:'/landmarkInfoDetail',query:{landNo:item.landNo}})
    },
    handleExamine(item){
      this.$router.push({path:'/landmarkInfoExamineResult',query:{landNo:item.landNo}})
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick(){

    },
    // getTransferPlace(params) {
    //   console.log(params);
    //   Axios.get("/epf-supply/tlandSearch/getListTLandSearch", {
    //     params: params
    //   }).then(res => {
    //     this.pageNo = res.pager.pageNo;
    //     this.pageSize = res.pager.pageSize;
    //     this.totalPage = res.pager.totalPage;
    //     this.totalRecord = res.pager.totalRecord;
    //     console.log(res);
    //     this.tableData1 = res.pager.results;
    //   });
    // },
    // handleEdit(index, row, btnText) {
    //   if (btnText === "审核") {
    //     this.dialogForm = true;
    //   }
    // },
    handleSizeChange(val) {
      //每页条数改变时触发
      this.pageNo = 1;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = val;
      // this.getTransferPlace(this.searchInfo);
    },
    handleCurrentChange(val) {
      //获取当前页
      this.searchInfo["page"] = val;
      this.searchInfo["rows"] = this.pageSize;
      // this.getTransferPlace(this.searchInfo);
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    subscribeDialogClick(){
      if(!this.isLogin()){
        return
      }
      this.subscribeDialog = true;
    },
    subscribe(formName){
      //预约看地
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.tsellId = this.detailData.id;
            this.ruleForm.reservationId = localStorage.getItem('userId');

            //调用新增预约看地接口
            this.$post('/epf-supply/admin/treservations/addTReservations',this.ruleForm,res=>{
              if(res.msg == 'success'){
                this.$message({
                  message: '预约成功',
                  type: 'success'
                });
              }else{
                this.$message.error(res.msg);
              }
              this.subscribeDialog = false;
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    nocollect(id) {
      if(!this.isLogin()){
        return
      }
      //收藏
      this.$post(
        "/epf-landweb/transwebcollect/addTransWebCollect",
        {
          targetId: id,
          collectType:'tsell'
        },
        res => {
          console.log(res);
        }
      );
      if (this.collectionData) {
        this.collectionData.push(id);
      } else {
        this.collectionData = [id];
      }

      localStorage.setItem(
        "collectionData",
        JSON.stringify(this.collectionData)
      );
    },
    collect(id) {
      if(!this.isLogin()){
        return
      }
      //取消收藏
      let nowIndex = this.collectionData.findIndex((value, index, arr) => {
        return value == id;
      });
      this.collectionData.splice(nowIndex, 1);
      localStorage.setItem(
        "collectionData",
        JSON.stringify(this.collectionData)
      );
    },

    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 700) {
        this.searchBarFixed = true;
        if (scrollTop >= 700) {
          this.spanKey = 1;
        }
        if (scrollTop >= 1140) {
          this.spanKey = 2;
        }
        if (scrollTop >= 1140 + (this.imgScroll * 340)) {
          this.spanKey = 3;
        }
        if (scrollTop >= 1140 + (this.imgScroll * 340) + 520) {
          this.spanKey = 4;
        }
      } else {
        this.searchBarFixed = false;
      }
    },
    selectSpan(item) {
      this.spanKey = item;
      // if (item === 1) {
      //   this.spanKey = 1;
      //   window.scrollTo(0, 700);
      // }
      // if (item === 2) {
      //   this.spanKey = 2;
      //   window.scrollTo(0, 1180);
      // }
      // if (item === 3) {
      //   this.spanKey = 3;

      //   window.scrollTo(0, 1180 + (this.imgScroll * 340));
      // }
      // if (item === 4) {
      //   this.spanKey = 4;
      //   window.scrollTo(0, 1180 + (this.imgScroll * 340) + 520);
      // }
    },
    getCurImg(imgUrl) {
      this.currentImg = imgUrl;
    },
    prevImg() {
      if (this.imgUrl.length - 6 > 0) {
        if (this.offsetCount > 0) {
          this.offsetCount--;
          this.$refs.carouser.style.left = "-" + 78 * this.offsetCount + "px";
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    addIintentionoffer() {
      console.log(this.detailData);

      if(!this.isLogin()){
        return
      }
      if (this.tintentionoffer == "") {
        this.$message({
          message: "请输入您的意向报价",
          type: "warning"
        });
        return;
      }
      this.$post(
        "/epf-supply/admin/tintentionoffer/addTIntentionOffer",
       { tsellId: this.detailData.id, price: this.tintentionoffer },
        res => {
          if (res.code == 0) {
            this.$message({
              message: "提交报价成功",
              type: "success"
            });
            this.tintentionoffer = "";
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    },
    isLogin(){
      if (!sessionStorage.getItem("login")) {
        this.$message({
          message: "您还未登录，请先登录",
          type: "warning"
        });
        this.collectionData = [];
        return false
      }
      return true
    },
    nextImg() {
      if (this.imgUrl.length - 6 > 0) {
        if (this.offsetCount < this.imgUrl.length - 6) {
          this.offsetCount++;
          this.$refs.carouser.style.left = "-" + 78 * this.offsetCount + "px";
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    // nocollect() {
    //   this.indexcollect = 2;
    // },
    // collect() {
    //   this.indexcollect = 1;
    // },
    openDetail(id) {
      let routeUrl = this.$router.resolve({
        path: "/DemandLandDetails",
        query: { demand: id }
      });
      window.open(routeUrl.href, "_blank");
    },
    toLogin(){
      this.$router.push('/login');
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.landmain {
  @include size(100%, auto);
  background: #ffffff;
  .landshow_top {
    box-sizing: border-box;
    .landshow_huandeng {
      @include size(525px, 447px);
      float: left;
      position: relative;
      background: skyblue;
      .bigImg {
        @include size(525px, 354px);
        background: pink;
        .pic-box {
          @include size(525px, 354px);
          overflow: hidden;
          .magnifier-box {
            img {
              width: 100% !important;
              height: 100% !important;
              display: block;
              border: 1px solid red;
            }
          }
        }
      }
      .smallImg {
        margin-top: 15px;
        @include size(100%, 50px);
        #imageMenu {
          @include size(100%, 50px);
          overflow: hidden;
          box-sizing: border-box;
          margin-top: 15px;
          clear: both;
          .onlickImg {
            @include size(20px, 50px);
            margin-right: 10px;
            text-align: center;
            line-height: 50px;
            font-size: 20px;
            color: #fff;
            cursor: pointer;
            float: left;
            img {
              margin-top: 8px;
            }
          }
          .onlickImg1 {
            margin-left: 0px;
            margin-right: 0px;
          }
          ul {
            @include size(475px, 50px);
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: flex-start;
            float: left;
            .list-img {
              @include size(475px, 50px);
              position: relative; //最外层的宽度，父级定位
              overflow: hidden;
              .list-img-wrap {
                position: absolute; //子级定位，dom操作偏移
                left: 0;
                top: 0;
                .single-img {
                  @include size(70px, 50px);
                  float: left;
                  margin-right: 8px;
                  text-align: center;
                  line-height: 50px;
                  font-size: 20px;
                  color: #fff;
                  cursor: pointer;
                  img {
                    display: block;
                    width: 70px;
                    height: 50px;
                  }
                }
                .img-activce {
                  border: 1px solid #c12022;
                }
              }
            }
          }
        }
      }
    }
    .landshow_topcent {
      @include size(640px, 354px);
      box-sizing: border-box;
      float: left;
      margin-left: 35px;
      .landshow_title {
        line-height: 35px;
        color: #333333;
        font-size: 18px;
        font-weight: bold;
      }
      .landshow_titlebot {
        line-height: 14px;
        color: #999999;
        font-size: 14px;
        margin: 20px 0;
        span {
          padding-right: 70px;
          img {
            margin-right: 5px;
          }
        }
      }
      .landshow_pice {
        @include size(100%, 72px);
        line-height: 72px;
        color: #999;
        font-size: 14px;
        background: #f5f5f5;
        box-sizing: border-box;
        padding-left: 13px;
        margin-bottom: 15px;
        span {
          font-weight: bold;
          color: #ffa000;
          font-size: 20px;
          font-weight: 500;
          margin-right: 50px;
        }
        .landshow_sc {
          display: inline;
          font-size: 14px;
          padding: 6px 15px;
          border-radius: 0px 8px 0px 8px;
          margin-left: 11px;
        }
        .landshow_rz {
          color: #ffa000;
          border: solid 1px #ffa000;
          margin-left: 20px;
        }
        .landshow_type {
          color: #4875cf;
          border: solid 1px #4875cf;
        }
      }
      .landshow_p {
        line-height: 30px;
        color: #333333;
        font-size: 14px;
        display: inline-block;
        width: 49%;
        span {
          color: #999999;
        }
      }
      .landshow_state{
        width: 632px;
        height: 193px;
        margin-top:15px;
        border-top:1px solid #f5f5f5;
        position: relative;
        .landshow_proesstop{
          position: absolute;
          left:80px;
          bottom: 112px;
          // @include size(70%,auto);
          ul{
            li{
              overflow: hidden;
              width:200px;
              p{
                font-size: 14px;
                color: #696969;
                line-height: 22px;
              }
              .landshow_proesstopicon{
                width: 19px;
                height: 31px;
                background-color: #dd122f;
                margin-left: 20px;
              }
            }
          }
        }
        .landshow_proess{
          width:100%;
          position: absolute;
          left:20px;
          top:80px;
          li{
            float: left;
            @include size(173px,auto);
            box-sizing: border-box;
            border-left: 1px solid #d8d8d8;
            border-top: 1px solid #d8d8d8;
            padding-top:27px;
            padding-left:5px;
            position: relative;
            &:nth-last-child(1){
              width:110px;
              border-top:none;
            }
            p{
              font-size: 12px;
              line-height: 18px;
              color:#999999;
            }
            .landshow_stateTime{
              color: #696969;
            }
            .landshow_icon{
              @include size(46px,46px);
              background: #e2efff;
              border-radius: 50px;
              position: absolute;
              top:-23px;
              left:-23px;
            }
          }
        }
      }
      .input_buy {
        @include size(128px, 40px);
        border-radius: 2px;
        line-height: 40px;
        font-size: 14px;
        color: #fff;
        border: none;
        text-align: center;
        margin-right: 10px;
        cursor: pointer;
        border:1px solid #ffa000;
        display: inline-block;
        background: #ffa000;
        color:#fff;
        img{
          margin-top:10px;
          margin-right:5px;
        }
      }
    }
    .landshow_download{
      @include size(100%, auto);
      box-sizing: border-box;
      padding: 50px 0;
      &_title{
        font-size:14px;
        color: rgb(56,56,56);
        @include size(100px, auto);
        display: inline-block;
        vertical-align: top;
        line-height: 30px;
      }
      .download{
        width:calc(100% - 110px);
        display: inline-block;
        span{
          border-radius: 3px;
          border: solid 1px #e0dfdf;
          padding: 7px 16px;
          margin-right: 10px;
          margin-bottom: 10px;
          cursor: pointer;
          font-size: 14px;
          color: #4572d5;
          display: inline-block;
          float: left;
        }
      }
    }
  }
  .landshow_main {
    @include size(100%, auto);
    box-sizing: border-box;
    border:1px solid rgb(243,243,243);
    &_tab{
      @include size(100%,auto);
      line-height: 60px;
      border-bottom:1px solid rgb(243,243,243);
      .listabtop{
        display: inline;
        span {
          line-height: 50px;
          padding-bottom: 16px;
          margin-left: 50px;
          cursor: pointer;
          font-size: 16px;
          text-align: center;
        }
        .spanActive {
          box-sizing: border-box;
          border-bottom: 2px solid#ffa000;
          color: #ffa000;
          font-weight: bold;
        }
      }
    }
    &_con{
      @include size(100%, auto);
      .landshow_main_listselect{
        margin-top:15px;
        padding-left: 23px;
        span{
          padding:7px 20px;
          font-size: 16px;
          color: #666666;
          border-radius: 4px;
          border: solid 1px #e0dfdf;
          cursor: pointer;
          margin-right: 16px;
          display: inline-block;
        }
        .spanActiveland{
          background-color: #fff7f1;
          border: solid 1px #ffa000;
        }
      }
      .landshow_main_table{
        .table_title{
          width:100%;
          line-height: 80px;
          font-size: 18px;
          font-weight: bold;
          text-align: center;
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
            width: 20%;
            color: #999999;
            text-align: right;
          }
          .td2 {
            width: 30%;
            background: #fff;
            text-align: left;
          }
        }
      }
      .tradePublicDetail_cont {
        .tradePublicTable{
          width: 100%;
          ul{
            @include size(100%,100%);
            li{
              line-height: 48px;
              box-sizing: border-box;
              padding: 0 50px;
              width:339px;
              border-bottom: 1px solid rgb(243,243,243);
              border-left: 1px solid rgb(243,243,243);
              border-right: 1px solid rgb(243,243,243);
              float: left;
              text-align: left;
              &:nth-child(1){
                @include size(100%,70px);
                line-height: 70px;
                text-align: center;
                font-size: 20px;
                font-weight: bold;
              }
              &:nth-child(2n){
                // width:340px;
                text-align: right;
                width:238px;
              }
              .title{
                line-height: 49px;
              }
              p{
                text-align: left;
              }
            }
            .explain{
              @include size(1157px,100%);
              div{
                float: left;
                &:nth-child(1){
                  width:187px;
                  box-sizing: border-box;
                  padding-top: 50px;
                  padding-right: 50px;
                }
                &:nth-child(2){
                  border-left: 1px solid rgb(243,243,243);
                  width:815px;
                  box-sizing: border-box;
                  padding: 20px 50px;
                }
              }
            }
          }
        }
      }
      .tradePublic_title{
        width:100%;
        line-height: 100px;
        font-size:20px;
        font-weight: bold;
        text-align: center;
      }
      .tradePublic_main_cont{
        table{
          border:1px solid #f3f3f3;
          tr{
            @include size(100%,60px);
            border-bottom:1px solid #f3f3f3;
            &:nth-child(1){
              background: #f2f5f7;
              height:50px;
              td{
                font-weight: bold;
              }
            }
            td{
              text-align: center;
              color:#333333;
              font-size: 14px;
              span{
                margin-right: 10px;
                cursor: pointer;
              }
            }
          }
        }
        p{
            margin:18px 0 18px 0px;
            color: #999999;
        }
        .enclosure{
          p{
            color: #517cd2;
            cursor: pointer;
            margin:0;
          }
        }
      }
    }
  }
}
  </style>
