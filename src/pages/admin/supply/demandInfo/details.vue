<template>
<!-- 需求信息列表信息详情页 -->
  <div class="page-body" style="background:#f0f4f7;height:100%">
    <div class="top">
      <h2>需求详情页11111111111111111</h2>
      <table>
        <tr>
          <td>
            流转方式：<span>{{ ruleForm.circulationName }}</span>
          </td>
          <td>
            标题：<span>{{ ruleForm.title }}</span>
          </td>
          <td>土地性质：<span>{{ruleForm.landChar}}</span></td>
        </tr>
        <tr>
          <td>
            所属行政区：<span
              >{{ ruleForm.cantonProvinceName }}-{{
                ruleForm.cantonCityName
              }}-{{ ruleForm.cantonAreaName }}</span
            >
          </td>
          <td>
            使用权类型：<span>{{ ruleForm.useType }}</span>
          </td>
          <td>
            土地类型：<span>{{ ruleForm.landType }}</span>
          </td>
        </tr>
        <tr>
          <td>
            土地用途：<span
              >{{ ruleForm.firstClassUseName }}-{{
                ruleForm.secondClassUseName
              }}</span
            >
          </td>
          <td>
            转让面积：<span>{{ ruleForm.area }}平方米</span>
          </td>
          <td>
            使用权截止日期：<span>{{ ruleForm.years }}</span>
          </td>
        </tr>
      </table>
    </div>

    <el-tabs type="card" class="bottom">
      <el-tab-pane label="地块基本信息">
        <table>
          <tr>
            <td>
              <span v-if="ruleForm.circulationName=='转让'">剩余使用年限：</span>
              <span v-else>{{ ruleForm.circulationName }}年限：</span>
              <span>{{ruleForm.years ? ruleForm.years + "年" : 0}}</span>
            </td>
            <td>
              拟{{ruleForm.circulationName}}价格：<span>{{ ruleForm.price?Division(ruleForm.price)+"万元":'无' }}</span>
            </td>
            <td>
              权证号类型：<span>{{ ruleForm.warrantNumType }}</span>
            </td>
          </tr>
          <tr>
            <td>
              权证号：<span
                >{{ ruleForm.warrantNum }}</span
              >
            </td>
            <td>
              登记机构：<span
                >{{ ruleForm.registration }}</span
              >
            </td>
            <td>
              不动产单元号：<span>{{ ruleForm.unitNum }}</span>
            </td>
          </tr>
          <tr>
            <td>
              是否有附着物：<span>{{ ruleForm.adjunct == 0 ? "有" : "否" }}</span>
            </td>
            <td>
              房屋建设工程是否完成投资总额的25%以上：<span>{{ ruleForm.isPercent == 0 ? "是" : "否" }}</span>
            </td>
            <!-- <td>
              土地成片开发是否形成工业用地或其他建设用地条件：
              <span>{{ ruleForm.isDevelope == 0 ? "是" : "否" }}</span>
            </td> -->
            <td>
              容积率:
              <span
                v-if="
                  ruleForm.plotRatio ||
                    ruleForm.plotRatioSymbol1 ||
                    ruleForm.plotRatio2 ||
                    ruleForm.plotRatioSymbol2
                "
                >{{ ruleForm.plotRatio ? ruleForm.plotRatio : ""
                }}{{ ruleForm.plotRatioSymbol1 }}容积率{{
                  ruleForm.plotRatioSymbol2
                }}{{ ruleForm.plotRatio2 ? ruleForm.plotRatio2 : "" }}
              </span>
              <span v-else></span>
            </td>
          </tr>
          <tr v-if="ruleForm.adjunct == 0">
            <td>
              建筑面积：<span>{{ruleForm.buildArea ? ruleForm.buildArea + "平方米" : ""}}</span>
            </td>
            <td>
              建筑结构：<span>{{ruleForm.buildingStructureName}}</span>
            </td>
            <td>
              建筑限高：<span>{{ruleForm.heightLimit ? ruleForm.heightLimit + "米" : ""}}</span>
            </td>
          </tr>
          <tr v-if="ruleForm.adjunct == 0">
            <td>
              绿地率:
              <span
                v-if="
                  ruleForm.greenSpaceRate ||
                    ruleForm.greenSpaceRateSymbol1 ||
                    ruleForm.greenSpaceRate2 ||
                    ruleForm.greenSpaceRateSymbol2
                "
               >
                {{ ruleForm.greenSpaceRate ? ruleForm.greenSpaceRate + "%" : ""
                }}{{ ruleForm.greenSpaceRateSymbol1 }}绿地率{{
                  ruleForm.greenSpaceRateSymbol2
                }}{{
                  ruleForm.greenSpaceRate2 ? ruleForm.greenSpaceRate2 + "%" : ""
                }}</span
               >
              <span v-else></span>
            </td>
            <td>
              建筑密度：<span v-if="ruleForm.buildingDensity||ruleForm.buildingDensitySymbol1||ruleForm.buildingDensity2||ruleForm.buildingDensitySymbol2">
                {{ruleForm.buildingDensity?ruleForm.buildingDensity+'%':''}}{{ruleForm.buildingDensitySymbol1}}建筑密度{{ruleForm.buildingDensitySymbol2}}{{ruleForm.buildingDensity2?ruleForm.buildingDensity2+'%':''}}</span>
                <span v-else></span>  
            </td>
            <td></td>
          </tr>
          <tr>
            <td>
              土地坐落：<span
                >{{ ruleForm.location }}</span
              >
            </td>
            <td colspan="2">土地坐标：<span>{{ruleForm.coordinate}}</span></td>
            <td></td>
          </tr>
          <tr>
            <td>
              东至：<span>{{ ruleForm.east }}</span>
            </td>
            <td colspan="2">
              西至：<span>{{ ruleForm.west }}</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>
              南至：<span>{{ ruleForm.south }}</span>
            </td>
            <td colspan="2">
              北至：<span>{{ ruleForm.north }}</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan="3">
              其他说明：<span
                >{{ ruleForm.remark }}</span
              >
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colspan="3">
              土地照片：
              <div class="demo-image">
                <div
                  class="block"
                  v-for="(item, index) in ruleForm.fileList"
                  :key="index"
                >
                  <el-image
                    style="width: 146px; height: 146px ;border-radius: 10px; border:1px solid #c0ccda;cursor: pointer;"
                    :src="item.url"
                    :fit="item.url"
                    @click="imgDialog(item.url)"
                  ></el-image>
                </div>
              </div>
              <el-dialog
                :visible.sync="dialogVisible"
                class="seeImg"
                width="40%"
                :append-to-body="true"
              >
                <div>
                  <img
                    style="width:100%;height:auto;"
                    :src="dialogImageUrl"
                    alt
                  />
                </div>
              </el-dialog>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colspan="3">
              土地视频：
              <span
                v-for="(item, index) in ruleForm.fileListVideo"
                :key="index"
              >
                <video
                  height="284px"
                  :src="item.url"
                  controls="controls"
                  class="videoBox"
                >
                  您的浏览器不支持 video 标签。
                </video>
              </span>
            </td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </el-tab-pane>
      <el-tab-pane label="供给人信息">
        <table>
          <tr>
            <td>权属人性质：<span>{{ruleForm.ownerShipNatureName}}</span></td>
            <td>名称：<span>{{ruleForm.ownerShip}}</span></td>
            <td>证件类型：<span>{{ruleForm.identificationTypeName}}</span></td>
          </tr>
          <tr>
            <td>权属人联系电话：<span>{{ruleForm.phone}}</span></td>
            <td>地址：<span>{{ruleForm.address}}</span></td>
            <td>证件号：<span>{{ruleForm.identificationNum}}</span></td>
          </tr>
          <tr>
            <td>联系人/代理人：<span>{{ruleForm.contact}}</span></td>
            <td>联系人/代理人身份证号：<span>{{ruleForm.idCard}}</span></td>
            <td>联系人/代理人联系电话：<span>{{ruleForm.contactPhone}}</span></td>
          </tr>
          <tr>
            <td>联系人/代理人地址：<span>{{ruleForm.contactAddress}}</span></td>
            <td><span></span></td>
            <td><span></span></td>
          </tr>
        </table>
      </el-tab-pane>
      <el-tab-pane label="附件清单">
        <EPF-annexList
          v-if="belong"
          :tableType="true"
          :tableNmae="tableNmae"
          :belong="belong"
          :areaCode="areaCode"
          :fileSize="6"
          :fileType="fileType"
          :annexType="annexType"
        ></EPF-annexList>
      <table>
          <tr>
            <th style="text-align: center">序号</th>
            <th style="width:35%">文件名称</th>
            <th style="width:35%">文件</th>
            <th style="width:20%;padding:8px 5px;">操作</th>
          </tr>
          <tr>
            <td style="text-align: center;padding:8px 5px;">1</td>
            <td style="width:35%;padding:8px 5px;">不动产证</td>
            <td style="width:35%;padding:8px 5px;">不动产证.pdf</td>
            <td style="width:20%;padding:8px 5px;">
              <el-button type="primary" plain style="margin-left: 10px"
                >下载</el-button
              >
              <el-button type="primary" plain style="">查看</el-button>
            </td>
          </tr>
        </table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// import Map from '../components/tianditu/tianditu.vue'
import baseURL1 from '@/utils/config.js'
export default {
  components: {},
  data() {
    return {
      tableNmae:['序号','文件名称','文件','操作'],//表头名称
      belong:'',//请求参数 - 附件所属标识（必传）
      areaCode:'',//请求参数 - 区域标识（必传）
      fileType:['rar','zip','doc','docx','pdf','jpg'],
      annexType:'LAND',
      isdecisionNumFile:true,
      isShowUploadVideo:true,
      isShowProvince:true,
      dialogImageUrl: "",
      dialogVisible: false,
      ruleForm: {
          //流转方式：
          circulation : "",
          //标题：
          title: "",
          // 土地性质
          landChar: "国有建设用地",
          //省
          cantonProvince:"",
          cantonProvinceName:"",
          //市
          cantonCity:"",
          cantonCityName:"",
          //区
          cantonArea:"",
          cantonAreaName:"",
          // 使用权类型：
          useType:"划拨",
          // 土地类型
          landType:"个人用地",
          // 土地一级用途
          firstClassUse:"",
          firstClassUseName:"",
          // 土地二级用途
          secondClassUse:"",
          secondClassUseName:"",
          // 转让、出租、抵押面积
          area:"",
          // 使用权截止日期
          endDate:"2018-12-12",
          // 转让、出租、抵押年限
          years:"",
          uselife:"",
          // 土地坐落
          location:"",
          // 坐标
          coordinate:"",
          east:"",
          west:"",
          south:"",
          north:"",
          // 拟转让、出租、抵押价格
          price:"",
          // 权证号类型
          warrantNumType:"不动产证号",
          // 权证号
          warrantNum:"",
          // 登录机构
          registration:"",
          registrationName:"",
          // 不动产单元号
          unitNum:"",
          // 是否连同地上建筑物、其他附着物
          adjunct:"是",
          resource1:"是",
          resource2:"是",
          // 建筑面积
          buildArea:"",
          // 建筑结构
          buildingStructure:"",
          //绿地率
          greenSpaceRate:"",
          greenSpaceRate2:"",
          greenSpaceRateSymbol1:"",
          greenSpaceRateSymbol2:"",
          //建筑密度
          buildingDensity:"",
          buildingDensity2:"",
          buildingDensitySymbol1:"",
          buildingDensitySymbol2:"",
          //建筑限高
          heightLimit:"",
          //容积率
          plotRatio:"",
          plotRatio2:"",
          plotRatioSymbol1:"",
          plotRatioSymbol2:"",
          // 其他说明
          remark:"",
          //图片
          img:"",
          fileList:[],
          fileListVideo:[],
          pId:null,
          photoFirstUpload:true,area:'',
          ownerShipNature:"",//权属人性质
          ownerShip:"",//权属人名字
          identificationType:"",//证件种类
          identificationNum:"",//证件号
          address:"",//地址
          phone:"",//权属人联系电话
          contact:"",//联系人/代理人姓名
          idCard:"",//联系人/代理人身份证号
          contactPhone:"",//联系人/代理人电话
          contactAddress:"",//联系人/代理人地址
      },
      rules: {
          title: [
              { required: true, message: "请输入标题", trigger: "blur" },
              { min: 0,max: 30,message: "请输入标题，30字以内...",trigger: "blur"}
          ],
          landChar: [{ required: true, message: "请选择土地性质", trigger: "blur" }],
          uselife: [{ required: true, message: "请输入剩余年限", trigger: "blur" }],
          area: [{ required: true, message: "请输入面积", trigger: "blur" }],
          cantonProvince: [{ required: true, message: "请选择土地所在省", trigger: "blur" }],
          cantonCity: [{ required: true, message: "请选择土地所在市", trigger: "blur" }],
          cantonArea: [{ required: true, message: "请选择土地所在区", trigger: "blur" }],
          useType: [{ required: true, message: "请选择使用权类型", trigger: "blur" }],
          landType: [{ required: true, message: "请选择土地类型", trigger: "blur" }],
          secondClassUse: [{ required: true, message: "请选择土地用途", trigger: "blur" }],
          area: [{ required: true, message: "请输入面积", trigger: "blur" }],
          years: [{ required: true, message: "请输入使用权截止日期", trigger: "blur" }],
          location: [{ required: true, message: "请输入土地详细地址", trigger: "blur" }],
          warrantNumType: [{ required: true, message: "请选择权证号类型", trigger: "blur" }],
          warrantNum: [{ required: true, message: "请输入权证号", trigger: "blur" }],
          registration: [{ required: true, message: "请选择登记机构", trigger: "blur" }],
          decisionNum: [{ required: true, message: "请输入划拨决定书号", trigger: "blur" }],
          ownerShipNature: [{ required: true, message: "权属人性质：", trigger: "blur" }],
          ownerShip: [{ required: true, message: "请输入姓名", trigger: "blur" }],
          identificationNum:[
                { required: true, message: "请输入证件号", trigger: "blur" },
                { min: 18,max: 18,message: "您输入的证件号有误",trigger: "blur"}
            ],
          identificationType: [{ required: true, message: "请选择证件种类", trigger: "blur" }],
          address: [{ required: true, message: "请输入联系地址", trigger: "blur" }],
          phone: [{ required: true, message: "请输入电话号码", trigger: "blur" }, { min: 11,max: 11,message: "您输入的电话号码有误",trigger: "blur"}],
          // idCard: [{  validator: validateIdCrad ,message: "您输入的证件号有误",trigger: "blur"}],
          // contactPhone: [{ validator: validatePhone, trigger: 'blur' }],
      },
      tableData:[],
      photoPId:'',
      photoUploadError:false,
      dialogVisibleMap:false,//地图找地对话框
      dicRequest:['flow_mode','land_nature','use_type','land_type','land_use','own_no_type','register_organization','building_structure','administrative_regions',],//字典码请求
      dictionary:{//字典码结果
          flow_mode:"",
          land_nature:"",
          use_type:"",
          land_type:"",
          land_use:"",
          own_no_type:"",
          register_organization:"",
          building_structure:"",
          land_use_second:"",
          administrative_regions:"",
          cantonCity:"",
          cantonArea:"",
      },
      dicNum:0,//字典循环下标
      dicFinsh:false,//接口请求完成
      baseUrl:'',
      imgUrlId:[],//图片上传成功返回的图片Id
      videoUrlId:[],//视频上传成功返回的视频Id
      longitude:'',
      latitude:''
    };
  },
  created(){
    window.scrollTo(0,120);
    this.baseUrl = baseURL1.baseURL1 +'/epf-document/document/downloadById?id='
    if(this.$route.query.supply){
        //从个人中心携带Id进入
        this.$get('/epf-supply/tsell/getTSellById',{id:this.$route.query.supply}).then(res=>{
          console.log('详情数据',res);
            function getChangeDate(date) {
            return (
                date.getFullYear()+"-"+(date.getMonth() + 1)+"-"+date.getDate()
                );
            }
            this.belong = res.tSell.id
            this.areaCode = res.tSell.cantonArea

            res.tSell.endDate = getChangeDate(new Date(res.tSell.endDate));
            res.tSell['pId'] = res.tSell.img;
            res.tSell['fileList'] = [];
            res.tSell['fileListVideo'] = [];
            this.pulishName(res.tSell.circulation)
            this.ruleForm = res.tSell;
            if(res.tSell.coordinate && res.tSell.coordinate.split(',').length == 2){
              this.longitude = parseFloat(res.tSell.coordinate.split(',')[0])
              this.latitude = parseFloat(res.tSell.coordinate.split(',')[1])
            }
            if(res.tSell.coordinate && res.tSell.coordinate.split(' ').length == 2){
              this.longitude = parseFloat(res.tSell.coordinate.split(' ')[0])
              this.latitude = parseFloat(res.tSell.coordinate.split(' ')[1])
            }

            //请求附件组
            if(res.tSell.pId){
              this.$get('/epf-document/document/getOneGroupFilsById',{id:res.tSell.pId}).then(files =>{
              console.log('文件组',files);
                let filesData = files.fileList;
                for (let index = 0; index < filesData.length; index++) {
                    console.log(filesData[index]);
                    if(filesData[index].extName == 'png' || filesData[index].extName == 'PNG' || filesData[index].extName == 'jpg' || filesData[index].extName == 'JPG' || filesData[index].extName == 'gif' || filesData[index].extName == 'GIF'){
                        this.ruleForm['fileList'].push({url:this.baseUrl + filesData[index].id,status: 'success',name: filesData[index].name,})
                        this.imgUrlId.push(filesData[index].id)
                    }
                    if(filesData[index].extName == 'mp4'){
                        this.ruleForm['fileListVideo'].push({url:this.baseUrl + filesData[index].id,status: 'success',name: filesData[index].name,})
                        this.videoUrlId.push(filesData[index].id)
                    }
                }
                this.ruleForm['id'] = this.$route.query.id;
            })
            }
            this.$get('/epf-document/docTemplete/getDocTempleteTree?id=0&belong='+res.tSell.id+'&code=AA001',{}).then(res => {
              let resData = JSON.parse(res.ztreeJson);
              this.tableData = resData[0].childData;
              for (let index = 0; index < resData[0].childData.length; index++) {
                this.ruleForm[resData[0].childData[index].tid] = [];
              }
              console.log(resData);

            })
        })
    }else if(this.$store.state.publishLand){
        this.ruleForm = this.$store.state.publishLand

      if(this.ruleForm.coordinate && this.ruleForm.coordinate.split(',').length == 2){
        this.longitude = parseFloat(this.ruleForm.coordinate.split(',')[0])
        this.latitude = parseFloat(this.ruleForm.coordinate.split(',')[1])
      }
      if(this.ruleForm.coordinate && this.ruleForm.coordinate.split(' ').length == 2){
        this.longitude = parseFloat(this.ruleForm.coordinate.split(' ')[0])
        this.latitude = parseFloat(this.ruleForm.coordinate.split(' ')[1])
      }
    }

    // if(this.$route.query.landtype){
    //   this.pulishType(Number(this.$route.query.landtype));
    // }else{
    //     this.pulishName(this.ruleForm.circulation)
    // }
    // 调用字典码相关接口
    let reqArr = this.dicRequest.map((item,index,arr)=>{
        let reqFun = new Promise((resolve,reject)=>{
            if ( item == "land_use") {
              this.$get(
                `/epf-trade/dictionaries/getDictsByCodeOrParentId?code=${item}`,
                { parentId: 0 }
              ).then(res => {
                resolve(res);
              });
            }
            // else if(item == 'administrative_regions'){
            //   this.$get(`/epf-admin/admin/regionals/getAreaByCodeOrParentId`,{parentId:0}).then(res => {
            //         resolve(res);
            //     })
                
            // }
            else{
                this.$get(`/epf-supply/dictionaries/getDictEbyDictGroup/${item}`,{}).then(res => {
                    resolve(res);
                })
            }
        })
        return reqFun
    })
    Promise.all(reqArr).then(res=>{
        let dicArr = res.map((item =>{
            console.log(item);
            let dicArr = item.dictionariesList.map((item => {
                return {
                    dictKey:item.dictKey,
                    zhCn:item.zhCn,
                    id:item.id
                }
            }))
            return dicArr
        }));

        for(let item in this.dictionary){
            this.dictionary[item] = dicArr[this.dicNum];
            this.dicNum++;
        }

        this.dicFinsh = true;

    });
      this.getProvinceData()

    let that = this;
    setTimeout(()=>{
        console.log(this.ruleForm);
    },1500)
  },
  methods: {
    // @name: 行政区域
    // @description: 主要是getAreaByCodeOrParentId接口返回字段修改zhCn -> regionName，dictKey->regionCode
    // @author: gaojie
    // @chageTime:2020-3-2
    getProvinceData() {
      let that = this;
      that.$get(`/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=0`,{}).then(res => {
          // console.log("",res)
          that.dictionary.administrative_regions = res.dictionariesList;
      }).catch(error=>{})
    },
    pulishName(name){
      if(name == "transfer"){
            this.pulishType(1)
        } else if(name == "rent"){
            this.pulishType(2)
        }  else if(name == "mortgage"){
            this.pulishType(3)
        }
    },
    pulishType(typeName){
        if(typeName===1){
             this.publishLandtype="转让";
             this.ruleForm.circulation = "transfer";
             this.ruleForm.circulationName = "转让";
        } else if(typeName===2){
             this.publishLandtype="出租";
             this.ruleForm.circulation = "rent";
             this.ruleForm.circulationName = "出租";
        }  else if(typeName===3){
             this.publishLandtype="抵押";
             this.ruleForm.circulation = "mortgage";
             this.ruleForm.circulationName = "抵押";
        }
    },
    // //上传前判断视频大小
    beforeAvatarUploadVideo(file){
        const isLt300M = file.size / 1024 / 1024 < 300;
        if (['video/mp4'].indexOf(file.type) == -1) {
            this.$message.error('请上传正确的视频格式');
            return false;
        }
        if (!isLt300M) {
            this.$message.error('上传视频大小不能超过300MB哦!');
            return false;
        }
        this.isShowUploadVideo = false;
    },
    beforeAvatarUploadImg(file){
      console.log(file)
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isGIF = file.type === 'image/gif';
        const isLt6M = file.size / 1024 / 1024 < 6;
        if (!isPNG &&!isJPG &&!isGIF) {
            this.$message.error('上传土地照片只能是 PNG 格式!');
            return false;
        }
        if (!isLt6M) {
            this.$message.error('上传土地照片大小不能超过 6MB!');
          return false;
        }
    },
    videoUploadFile(files){//上传方法
        const file = files.file;
        const formData = new FormData()
        formData.append("files",file);
        if(this.ruleForm.pId){
            console.log(1111);
            formData.append("pId",this.ruleForm.pId);
            this.videoUpload(formData,files,file);
            return
        }
        if(!this.ruleForm.pId && this.ruleForm.photoFirstUpload){
            //第一张图片上传
            console.log('第一张图片上传');
            this.ruleForm.photoFirstUpload = false;
            this.videoUpload(formData,files,file,'first');
            return
        }
        if(this.ruleForm.pId && !this.ruleForm.photoFirstUpload){
            //之后的图片上传携带id
            console.log('之后的图片上传携带id');
            this.videoUpload(formData,files,file);
            return
        }
    },
    photoUploadFile(files){
        //上传方法
        const file = files.file;
        const formData = new FormData();
        formData.append("files",file);
        if(this.ruleForm.pId){
            console.log(1111);
            formData.append("pId",this.ruleForm.pId);
            this.photoUpload(formData,files,file);
            return
        }
        if(!this.ruleForm.pId && this.ruleForm.photoFirstUpload){
            //第一张图片上传
            console.log('第一张图片上传');
            this.ruleForm.photoFirstUpload = false;
            this.photoUpload(formData,files,file,'first');
            return
        }
        if(this.ruleForm.pId && !this.ruleForm.photoFirstUpload){
            //之后的图片上传携带id
            console.log('之后的图片上传携带id');
            this.photoUpload(formData,files,file);
            return
        }
    },
    photoUpload(formData,files,file,count){
        //图片上传
        this.$useAppend('/epf-document/document/upload',formData,
            res => {
                console.log(res);
                if(res.data.state != 'SUCCESS'){
                    if(count == 'first'){
                        // 第一张上传出错
                        this.ruleForm.photoFirstUpload = true;
                        this.$refs.photoUploader.submit();
                        return null
                    }
                    console.log('错误了');
                    this.$refs.photoUploader.submit();
                    return null
                }
                if(!this.ruleForm.pId){
                    this.ruleForm.pId = res.data.data[0].pId;
                    this.ruleForm.img = res.data.data[0].id;
                }
                if(this.ruleForm.pId && !this.ruleForm.photoFirstUpload){
                    this.$refs.photoUploader.submit();
                }
                this.imgUrlId.push(res.data.data[0].id);
                files.onSuccess(res);
            },
            function(event){
                //进度条
                file.percent = event.loaded/event.total*100;
                files.onProgress(file);
            },'upload'
        );
    },
    videoUpload(formData,files,file,count){
        //视频上传
        this.$useAppend('/epf-document/document/upload',formData,
            res => {
                console.log(res);
                if(res.data.state != 'SUCCESS'){
                    if(count == 'first'){
                        // 第一张上传出错
                        this.ruleForm.photoFirstUpload = true;
                        this.$refs.videoUploader.submit();
                        return null
                    }
                    console.log('错误了');
                    this.$refs.videoUploader.submit();
                    return null
                }
                if(!this.ruleForm.pId){
                    this.ruleForm.pId = res.data.data[0].pId;
                    this.ruleForm.img = res.data.data[0].id;
                }
                if(this.ruleForm.pId && !this.ruleForm.photoFirstUpload){
                    this.$refs.videoUploader.submit();
                }
                this.videoUrlId.push(res.data.data[0].id);
                files.onSuccess(res);
            },
            function(event){
                //进度条
                file.percent = event.loaded/event.total*100;
                files.onProgress(file);
            },'upload'
        );
    },
    upLoadError(err, file, fileList){
    },
    photoUploadSuccess(res,file,fileList){
        if(!this.ruleForm.pId){
            this.ruleForm.pId = res.data.data[0].pId;
        }
        this.ruleForm.fileList = fileList;
        for(let i=0;i<this.ruleForm.fileList.length;i++){
            this.ruleForm.fileList[i].url = this.baseUrl + this.imgUrlId[i];
        }
        console.log(this.ruleForm);

    },
    videoUploadSuccess(res,file,fileList){
        if(!this.ruleForm.pId){
            this.ruleForm.pId = res.data.data[0].pId;
        }
        this.ruleForm.fileListVideo = fileList;
        for(let i=0;i<this.ruleForm.fileListVideo.length;i++){
            this.ruleForm.fileListVideo[i].url = this.baseUrl + this.videoUrlId[i];
        }
        console.log(this.videoUrlId);
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // handleClose(done){
    //     //关闭地图对话框
    //     done();
    // },
    circulatemodeSelect(dic,circulationName,event){
        this.ruleForm.circulation = this.$refs[circulationName][0].$attrs.dictKey;
        if( this.ruleForm.circulation == "transfer"){
            this.pulishType(1)
        } else if(this.ruleForm.circulation == "rent"){
            this.pulishType(2)
        }  else if(this.ruleForm.circulation == "mortgage"){
            this.pulishType(3)
        }
    },
    firstClassUseSelect(dic,firstClassUse,event){
        this.ruleForm.secondClassUse = '';
        this.ruleForm.secondClassUseName = '';
        this.dictionary.land_use_second = '';
        let pId= this.$refs[firstClassUse][0].$attrs.id;
        this.ruleForm.firstClassUse =  this.$refs[firstClassUse][0].$attrs.dictKey;
        this.$get(`/epf-supply/dictionaries/getDictsByCodeOrParentId?code=land_use&parentId=${pId}`,{}).then(res => {
           console.log(res);
           if(res.dictionariesList.length != 0){
            this.dictionary.land_use_second = res.dictionariesList
            return
           }
           this.dictionary.land_use_second = ''
        })
    },
    secondClassUseSelect(dic,firstClassUse,event){
        this.ruleForm.secondClassUse =  this.$refs[firstClassUse][0].$attrs.dictKey;
        console.log(this.ruleForm);
    },
    provinceSelect(dic,cantonCode,event){
        this.ruleForm.cantonAreaName='';
        this.ruleForm.cantonArea='';
        this.cantonArea = ''
        this.ruleForm.cantonCityName='';
        this.ruleForm.cantonCity='';
        this.cantonCity = '';
        let pId= this.$refs[cantonCode][0].$attrs.id;
        this.ruleForm.cantonProvince = this.$refs[cantonCode][0].$attrs.regionCode;

        this.$get(`/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,{}).then(res => {
            console.log(res);
            if(res.dictionariesList.length != 0){
            this.dictionary.cantonCity = res.dictionariesList
            return
            }
            this.dictionary.cantonCity = ''
        })
    },
    citySelect(dic,cantonCity,event){
        this.ruleForm.cantonArea='';
        this.ruleForm.cantonAreaName='';
        this.cantonArea = ''
        let pId= this.$refs[cantonCity][0].$attrs.id;
        this.ruleForm.cantonCity = this.$refs[cantonCity][0].$attrs.regionCode;
        this.$get(`/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,{}).then(res => {
            console.log(res);
            if(res.dictionariesList.length != 0){
            this.dictionary.cantonArea = res.dictionariesList
            return
            }
            this.dictionary.cantonArea = ''
        })
    },
    areaSelect(dic,cantonCity,event){
        this.ruleForm.cantonArea = this.$refs[cantonCity][0].$attrs.regionCode;
    },
    registrationeSelect(dic,registrationName,event){
        this.ruleForm.registration = this.$refs[registrationName][0].$attrs.dictKey;
    },
    addMoreFile(){
      let tid = this.tableData[this.tableData.length - 1].tid;
      this.tableData.push({isAux:"0",tid:tid + this.tableData.length,tname: "其他",file: [],tsize:0});
    },
    delFile(index,id){
      this.tableData[index].files = [];
      this.tableData[index].tsize = 0;
    }
  },
  components: {
      "v-Map":Map
  },
}
</script>
<style lang="scss" scoped>
@mixin size($width,$height) {
  width: $width;
  height: $height;
}
// .page-body{
//   box-sizing: border-box;
// }
// .filter_wrap{
//   box-sizing: border-box;
//   padding: 32px 22px;
//   -webkit-box-shadow: 0 0px 30px rgba(0,0,0,0.1);
//   box-shadow: 0 0px 30px rgba(0,0,0,0.1);
//   -webkit-transform: translate3d(0, -2px, 0);
//   transform: translate3d(0, -2px, 0);
//   background: #fff;
//   .dsDetailInfo_box{
//     .publish_main {
//       @include size(100%, auto);
//       box-sizing: border-box;
//       padding:0 24px;
//       &_title{
//         @include size(100%, 56px);
//         background: #f5f7fa;
//         box-sizing: border-box;
//         padding: 0 24px;
//         .publish_title_icon{
//           @include size(6px, 21px);
//           background: #ffca73;
//           border-radius: 3px;
//           margin-top: 18px;
//           margin-right: 12px;
//         }
//         .title{
//           font-size: 16px;
//           color: #333333;
//           font-weight: bold;
//           line-height: 56px;
//         }
//         .fold{
//           font-size: 14px;
//           color: #999999;
//           line-height: 56px;
//           cursor: pointer;
//           span{
//             margin-right: 10px;
//           }
//         }
//       }
//       &_cont{
//         box-sizing: border-box;
//         .publish_mainUl{
//           @include size(100%,auto);
//           display: flex;
//           flex-wrap: wrap;
//           margin-top:25px;
//           li{
//             @include size(50%,auto);
//             line-height: 50px;
//             min-height: 50px;
//           }
//         }
//         table{
//           border:1px solid #f3f3f3;
//           margin-top:25px;
//           tr{
//             @include size(100%,50px);
//             border-bottom:1px solid #f3f3f3;
//             &:nth-child(1){
//               background: #f2f5f7;
//               td{
//                 font-weight: bold;
//               }
//             }
//             td{
//               text-align: center;
//               color:#333333;
//               font-size: 14px;
//               &:nth-child(3){
//                 color:#4671d5;
//               }
//               &:nth-child(4){
//                 color:#4671d5;
//               }
//               .text_red{
//                 color:red;
//                 margin-right: 5px;
//                 cursor: auto;
//               }
//               span{
//                 margin-right: 10px;
//                 cursor: pointer;
//               }
//             }
//           }
//         }
//         .findland_input{
//           @include size(94px,40px);
//           background-color: #ffa000;
//           border-radius: 3px;
//           font-size: 12px;
//           color: #fff;
//           text-align: center;
//           line-height: 40px;
//           display: inline-block;
//           margin-left: 24px;
//           cursor: pointer;
//           img{
//             display: inline-block;
//             @include size(14px,16px);
//               margin-top:13px;
//               margin-right:5px;
//           }
//         }
//         p{
//           line-height: 50px;
//           color: #999999;
//           font-size: 14px;
//         }
//       }
//     }
//   }
// }
.page-body {
  .top {
    background: #fff;
    padding: 0 0 31px 45px;
    h2 {
      font-size: 16px;
      font-weight: bold;
      line-height: 77px;
    }
  }
  .bottom {
    margin-top: 20px;
    /deep/ .el-tabs__content {
      padding-top: 20px;
      background: #fff;
    }
    /deep/ .el-tabs__item {
      padding: 0 50px;
      height: 53px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      line-height: 53px;
      display: inline-block;
      list-style: none;
      font-size: 14px;
      color: #666666;
      position: relative;
      border: none;
    }
    /deep/ .el-tabs__item:nth-child(2) {
      padding-left: 50px;
    }
    /deep/ .el-tabs__item:last-child {
      padding-right: 50px;
    }
    /deep/ .el-tabs__item.is-active {
      color: #333;
      font-weight: bold;
      background: #fff;
      border-top: 2px solid #ffa000;
      border-right: none;
      border-left: none;
      border-bottom: none;
      padding: 0 50px;
      height: 53px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
  }
}
table {
  background: #fff;
  width: 100%;
  border-top: 1px solid #dcdfe6;
  border-left: 1px solid #dcdfe6;
  border-spacing: 0;
  td {
    padding: 15px 5px;
    border-bottom: 1px solid #dcdfe6;
    border-right: 1px solid #dcdfe6;
    text-align: left;
    color: #666666;
    span {
      color: #333333;
    }
  }

  th {
    padding: 15px 5px;
    text-align: center;
    border-bottom: 1px solid #dcdfe6;
    border-right: 1px solid #dcdfe6;
    text-align: left;
    color: #666666;
  }
}
</style>
<style>
.el-radio__input.is-checked+.el-radio__label{
  color: #ffa000;
}
.el-radio__input.is-checked .el-radio__inner{
  border:1px solid #ffa000;
  background:#ffa000;
}
/* .filter_wrap .el-input__prefix, .el-input__suffix{
  left:323px;
  right:24px!important;
} */
.el-input--suffix{
  position: relative;
}
.el-radio__inner:hover{
  border:1px solid #ffa000;
}
#publishLandMapDialog .el-dialog .el-dialog__body{
    padding-top: 0px;
}
#publishLandMapDialog .el-dialog .el-dialog__header{
    padding-top:10px;
    padding-bottom: 0px;
    text-align:center;
}
  .filter_wrap .el-input--small .el-input__inner{
    height:40px;
  }
  .filter_wrap .el-row{
    margin-bottom: 10px;
  }
  .filter_wrap .distpicker-address-wrapper select{
    width: 117px;
    height:40px;
    font-size: 14px;
    line-height: 40px;
    padding: 0 10px;
  }
  .filter_wrap .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  }
  .filter_wrap .el-date-editor.el-input .el-input__icon{
    line-height:30px;
    color:#8dc4f7;
  }
  /* .filter_wrap .el-input__prefix, .el-input__suffix{
    width:25px;
    font-size: 16px;
    left:150px;
  } */
  .el-table th, .el-table tr{
    /* border:1px solid #ebeef5; */
  }
  .el-textarea .el-textarea__inner{
    width:100%;
    height:110px !important;
  }
</style>
<style>
.canton_Regions>.el-form-item__content{
    margin-left: 5px !important;
}
.seeImg>.el-dialog>.el-dialog__header{
  border-bottom: none !important;
}
</style>

