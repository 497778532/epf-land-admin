<template>
<div class="testBody">
  <div>
    <h1 style="font-size:26px;">模拟交款</h1>
    <el-row style="margin-top:60px;">
      <el-col :span="2" class="title">
        <span>子账号：</span>
      </el-col>
      <el-col :span="6">
        <el-input v-model="params.childNo" size="large" placeholder="请输入"></el-input>
      </el-col>
      <el-col :span="2" class="title">
        <span>金额：</span>
      </el-col>
      <el-col :span="6">
        <el-input v-model="params.amount" size="large" placeholder="请输入" style="width:80%"></el-input>万元
      </el-col>
    </el-row>
    <el-row style="margin-top:40px;">
      <el-col :span="2" class="title">
        <span>币种：</span>
      </el-col>
      <el-col :span="6">
        <selectInput v-model="params.currency"
          :groupCode="'trade_currency'"
          :default="params.currency">
        </selectInput>
      </el-col>
      <el-col :span="2" class="title">
        <span>入账时间：</span>
      </el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="params.transTime"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-col>
    </el-row>
    <div style="text-align:center;margin-top:60px;">
      <button class="btns" @click="Submission()">提交</button>
    </div>
  </div>
  <div>
  </div>
</div>
<!-- <form-create v-model="$f" :rule="rule" @on-submit="onSubmit"></form-create> -->
<!-- <el-form :model="rule" status-icon ref="rule" label-width="120px" class="demo-ruleForm">
  <el-form-item v-for="(item, index) in rule" :key="index"
  :label="item.alias !== '' ? item.alias+':' : ''"
  :style="{'display':( item.name === '省' || item.name === '市' || item.name === '区')?'inline-block' : ''}"
  >
    <el-input :v-model="item.value" v-if="item.texttype=='input'" style="width:200px"></el-input>
    <el-input :v-model="item.value" v-if="item.texttype=='textarea'" type="textarea" style="width:200px"></el-input>
    <el-upload action="http://192.168.1.200:8081/epf-document/document/upload/" v-if="item.texttype=='file'"
                          ref="photoUploader"
                          list-type="picture-card"
                          multiple
                          :limit="5"
                          :http-request="first_photoUploadFile"
                          :on-preview="handlePictureCardPreview"
                          :on-remove="file_List_Remove"
                          :before-upload="beforeAvatarUploadImg"
                          :on-success="first_UploadSuccess"
                          :on-error="upLoadError"
                          :file-list="transGoods.fileList"></el-upload>
    <el-select v-model="item.value" v-if="item.texttype=='select' && item.name !== '省' && item.name !== '市' && item.name !== '区'" style="width:200px">

    </el-select>
    <el-select v-model="transGoods.cantonProvinceName" v-if="item.texttype=='select' && item.name === '省'" @change="provinceSelect(dictionary.administrative_regions,transGoods.cantonProvinceName,$event)">
      <el-option
        v-for="(item,index) in dictionary.administrative_regions"
        :ref="item.regionName"
        :id="item.id"
        :regionCode="item.regionCode"
        :label="item.regionName"
        :value="item.regionName"
        :key="index"
      ></el-option>
    </el-select>
    <el-select v-model="transGoods.cantonCityName" v-if="item.texttype=='select' && item.name === '市'" @change="citySelect(dictionary.cantonCity,transGoods.cantonCityName,$event)">
      <el-option
        v-for="(item,index) in dictionary.cantonCity"
        :ref="item.regionName"
        :id="item.id"
        :regionCode="item.regionCode"
        :label="item.regionName"
        :value="item.regionName"
        :key="index"
      ></el-option>
    </el-select>
    <el-select v-model="transGoods.cantonAreaName" v-if="item.texttype=='select' && item.name === '区'" @change="areaSelect(dictionary.cantonAreaName,transGoods.cantonAreaName,$event)">
      <el-option
        v-for="(item,index) in dictionary.cantonArea"
        :ref="item.regionName"
        :id="item.id"
        :regionCode="item.regionCode"
        :label="item.regionName"
        :value="item.regionName"
        :key="index"
      ></el-option>
    </el-select>
    <el-radio-group :v-model="item.value" v-if="item.texttype=='radio'">
      <el-radio
        v-for="(item1,index) in dictionary.land_type"
        :label="item1.dictKey"
        :key="index"
      >{{item1.zhCn}}</el-radio>
    </el-radio-group> -->
  </el-form-item>
</el-form>
</template>
<script>
export default {
  name:"test",
  data() {
    return {
     //表单json
    //  rule:[
    //         {
    //             "proportion": 0,
    //             "type": "VARCHART2",
    //             "cantonProvince": "123",
    //             "sourceCode": "123456789",
    //             "updateId": null,
    //             "isNulll": 0,
    //             "alias": "土地流转方式",
    //             "id": "756e136c-2753-458a-853f-95bf00220be2",
    //             "state": 1,
    //             "texttype": "select",
    //             "landType": null,
    //             "transDicId": "09ffd703-242e-4f04-9de0-afb93c740c3f",
    //             "tradeType": null,
    //             "deleteFlagx": 0,
    //             "length": 200,
    //             "updateTime": null,
    //             "sort": 1,
    //             "updateName": null,
    //             "unit": null,
    //             "system": null,
    //             "createTime": "2020-06-16 17:14:36",
    //             "createId": "66666666",
    //             "circulation": null,
    //             "name": "土地流转方式",
    //             "cantonProvinceName": "123",
    //             "createName": "测试用户",
    //             "value": "flow_mode",
    //             "remarks": "测试基础数据的新增"
    //         },
    //         {
    //             "proportion": 0,
    //             "type": "VARCHART2",
    //             "cantonProvince": "123",
    //             "sourceCode": "123456789",
    //             "updateId": null,
    //             "isNulll": 0,
    //             "alias": "所属区域",
    //             "id": "756e136c-2753-458a-853f-95bf00220be7",
    //             "state": 1,
    //             "texttype": "select",
    //             "landType": null,
    //             "transDicId": "09ffd703-242e-4f04-9de0-afb93c740c3f",
    //             "tradeType": null,
    //             "deleteFlagx": 0,
    //             "length": 200,
    //             "updateTime": null,
    //             "sort": 1,
    //             "updateName": null,
    //             "unit": null,
    //             "system": null,
    //             "createTime": "2020-06-16 17:14:36",
    //             "createId": "66666666",
    //             "circulation": null,
    //             "name": "省",
    //             "cantonProvinceName": "123",
    //             "createName": "测试用户",
    //             "value": "canton_province",
    //             "remarks": "测试基础数据的新增"
    //         },
    //         {
    //             "proportion": 0,
    //             "type": "VARCHART2",
    //             "cantonProvince": "123",
    //             "sourceCode": "123456789",
    //             "updateId": null,
    //             "isNulll": 0,
    //             "alias": "",
    //             "id": "756e136c-2753-458a-853f-95bf00220be8",
    //             "state": 1,
    //             "texttype": "select",
    //             "landType": null,
    //             "transDicId": "09ffd703-242e-4f04-9de0-afb93c740c3f",
    //             "tradeType": null,
    //             "deleteFlagx": 0,
    //             "length": 200,
    //             "updateTime": null,
    //             "sort": 1,
    //             "updateName": null,
    //             "unit": null,
    //             "system": null,
    //             "createTime": "2020-06-16 17:14:36",
    //             "createId": "66666666",
    //             "circulation": null,
    //             "name": "市",
    //             "cantonProvinceName": "123",
    //             "createName": "测试用户",
    //             "value": "canton_city",
    //             "remarks": "测试基础数据的新增"
    //         },
    //         {
    //             "proportion": 0,
    //             "type": "VARCHART2",
    //             "cantonProvince": "123",
    //             "sourceCode": "123456789",
    //             "updateId": null,
    //             "isNulll": 0,
    //             "alias": "",
    //             "id": "756e136c-2753-458a-853f-95bf00220be9",
    //             "state": 1,
    //             "texttype": "select",
    //             "landType": null,
    //             "transDicId": "09ffd703-242e-4f04-9de0-afb93c740c3f",
    //             "tradeType": null,
    //             "deleteFlagx": 0,
    //             "length": 200,
    //             "updateTime": null,
    //             "sort": 1,
    //             "updateName": null,
    //             "unit": null,
    //             "system": null,
    //             "createTime": "2020-06-16 17:14:36",
    //             "createId": "66666666",
    //             "circulation": null,
    //             "name": "区",
    //             "cantonProvinceName": "123",
    //             "createName": "测试用户",
    //             "value": "canton_area",
    //             "remarks": "测试基础数据的新增"
    //         },
    //         {
    //             "proportion": 0,
    //             "type": "VARCHART2",
    //             "cantonProvince": "123",
    //             "sourceCode": "123456789",
    //             "updateId": null,
    //             "isNulll": 0,
    //             "alias": "地名",
    //             "id": "efb8e1b4-2b8f-44e8-8ffa-0f359bdd80fe",
    //             "state": 1,
    //             "texttype": "input",
    //             "landType": null,
    //             "transDicId": "a822877f-a0a6-4d4a-a0ad-bd13e906fc84",
    //             "tradeType": null,
    //             "deleteFlagx": 0,
    //             "length": 200,
    //             "updateTime": null,
    //             "sort": 2,
    //             "updateName": null,
    //             "unit": null,
    //             "system": null,
    //             "createTime": "2020-06-16 17:14:36",
    //             "createId": "66666666",
    //             "circulation": null,
    //             "name": "地块名称",
    //             "value": "name",
    //             "cantonProvinceName": "123",
    //             "createName": "测试用户",
    //             "remarks": "测试基础数据的新增"
    //         },
    //         {
    //             "proportion": 0,
    //             "type": "VARCHART2",
    //             "cantonProvince": "123",
    //             "sourceCode": "123456789",
    //             "updateId": null,
    //             "isNulll": 0,
    //             "alias": "地址",
    //             "id": "efb8e1b4-2b8f-44e8-8ffa-0f359bdd80f1",
    //             "state": 1,
    //             "texttype": "input",
    //             "landType": null,
    //             "transDicId": "a822877f-a0a6-4d4a-a0ad-bd13e906fc84",
    //             "tradeType": null,
    //             "deleteFlagx": 0,
    //             "length": 200,
    //             "updateTime": null,
    //             "sort": 3,
    //             "updateName": null,
    //             "unit": null,
    //             "system": null,
    //             "createTime": "2020-06-16 17:14:36",
    //             "createId": "66666666",
    //             "circulation": null,
    //             "name": "详细地址",
    //             "value": "address",
    //             "cantonProvinceName": "123",
    //             "createName": "测试用户",
    //             "remarks": "测试基础数据的新增"
    //         },
    //         {
    //             "proportion": 0,
    //             "type": "VARCHART2",
    //             "cantonProvince": "123",
    //             "sourceCode": "123456789",
    //             "updateId": null,
    //             "isNulll": 0,
    //             "alias": "面积",
    //             "id": "efb8e1b4-2b8f-44e8-8ffa-0f359bdd80f4",
    //             "state": 1,
    //             "texttype": "input",
    //             "landType": null,
    //             "transDicId": "a822877f-a0a6-4d4a-a0ad-bd13e906fc84",
    //             "tradeType": null,
    //             "deleteFlagx": 0,
    //             "length": 200,
    //             "updateTime": null,
    //             "sort": 4,
    //             "updateName": null,
    //             "unit": null,
    //             "system": null,
    //             "createTime": "2020-06-16 17:14:36",
    //             "createId": "66666666",
    //             "circulation": null,
    //             "name": "地块面积",
    //             "value": "area",
    //             "cantonProvinceName": "123",
    //             "createName": "测试用户",
    //             "remarks": "测试基础数据的新增"
    //         },
    //         {
    //             "proportion": 0,
    //             "type": "VARCHART2",
    //             "cantonProvince": "123",
    //             "sourceCode": "123456789",
    //             "updateId": null,
    //             "isNulll": 0,
    //             "alias": "使用权类型",
    //             "id": "efb8e1b4-2b8f-44e8-8ffa-0f359bdd80f5",
    //             "state": 1,
    //             "texttype": "radio",
    //             "landType": null,
    //             "transDicId": "a822877f-a0a6-4d4a-a0ad-bd13e906fc84",
    //             "tradeType": null,
    //             "deleteFlagx": 0,
    //             "length": 200,
    //             "updateTime": null,
    //             "sort": 5,
    //             "updateName": null,
    //             "unit": null,
    //             "system": null,
    //             "createTime": "2020-06-16 17:14:36",
    //             "createId": "66666666",
    //             "circulation": null,
    //             "name": "使用权类型",
    //             "value": "use_type",
    //             "cantonProvinceName": "123",
    //             "createName": "测试用户",
    //             "remarks": "测试基础数据的新增"
    //         },
    //         {
    //             "proportion": 0,
    //             "type": "VARCHART2",
    //             "cantonProvince": "123",
    //             "sourceCode": "123456789",
    //             "updateId": null,
    //             "isNulll": 0,
    //             "alias": "土地性质",
    //             "id": "efb8e1b4-2b8f-44e8-8ffa-0f359bdd80f5",
    //             "state": 1,
    //             "texttype": "radio",
    //             "landType": null,
    //             "transDicId": "a822877f-a0a6-4d4a-a0ad-bd13e906fc84",
    //             "tradeType": null,
    //             "deleteFlagx": 0,
    //             "length": 200,
    //             "updateTime": null,
    //             "sort": 5,
    //             "updateName": null,
    //             "unit": null,
    //             "system": null,
    //             "createTime": "2020-06-16 17:14:36",
    //             "createId": "66666666",
    //             "circulation": null,
    //             "name": "土地性质",
    //             "value": "land_type",
    //             "cantonProvinceName": "123",
    //             "createName": "测试用户",
    //             "remarks": "测试基础数据的新增"
    //         },{
    //             "proportion": 0,
    //             "type": "VARCHART2",
    //             "cantonProvince": "123",
    //             "sourceCode": "123456789",
    //             "updateId": null,
    //             "isNulll": 0,
    //             "alias": "图片",
    //             "id": "efb8e1b4-2b8f-44e8-8ffa-0f359bdd80f6",
    //             "state": 1,
    //             "texttype": "file",
    //             "landType": null,
    //             "transDicId": "a822877f-a0a6-4d4a-a0ad-bd13e906fc84",
    //             "tradeType": null,
    //             "deleteFlagx": 0,
    //             "length": 200,
    //             "updateTime": null,
    //             "sort": 5,
    //             "updateName": null,
    //             "unit": null,
    //             "system": null,
    //             "createTime": "2020-06-16 17:14:36",
    //             "createId": "66666666",
    //             "circulation": null,
    //             "name": "图片",
    //             "value": "fileList",
    //             "cantonProvinceName": "123",
    //             "createName": "测试用户",
    //             "remarks": "测试基础数据的新增"
    //         },
    //         {
    //             "proportion": 0,
    //             "type": "VARCHART2",
    //             "cantonProvince": "123",
    //             "sourceCode": "123456789",
    //             "updateId": null,
    //             "isNulll": 0,
    //             "alias": "备注",
    //             "id": "efb8e1b4-2b8f-44e8-8ffa-0f359bdd80f6",
    //             "state": 1,
    //             "texttype": "textarea",
    //             "landType": null,
    //             "transDicId": "a822877f-a0a6-4d4a-a0ad-bd13e906fc84",
    //             "tradeType": null,
    //             "deleteFlagx": 0,
    //             "length": 200,
    //             "updateTime": null,
    //             "sort": 5,
    //             "updateName": null,
    //             "unit": null,
    //             "system": null,
    //             "createTime": "2020-06-16 17:14:36",
    //             "createId": "66666666",
    //             "circulation": null,
    //             "name": "备注",
    //             "value": "mark",
    //             "cantonProvinceName": "123",
    //             "createName": "测试用户",
    //             "remarks": "测试基础数据的新增"
    //         }
    //     ],
      params:{
        childNo:'',
        amount:'',
        currency:'CNY',
        transTime:'',
        bankid:'BK08'
      },
      pickerOptions: { //时间选择
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      tableNmae:['序号','文件名','文件','操作'],
      belong:'fd2ed843-580a-4e8b-953d-9552005bba75',
      areaCode:'440000',
      fileType:['zip','GIF','png','pdf','jpg'],
      annexType:'LAND',
      entrust:'TRANS',
      annexData:[],
      // dicRequest: [
      //   "flow_mode",
      //   "land_nature",
      //   "use_type",
      //   "land_type",
      //   "land_use",
      //   "own_no_type",
      //   "register_organization",
      //   "building_structure",
      //   "tans_owner_type",
      //   "certifiate_type"
      // ], 
      // //字典码请求
      // dictionary: {
      //   //字典码结果
      //   flow_mode: "",
      //   land_nature: "",
      //   use_type: "",
      //   land_type: "",
      //   land_use: "",
      //   own_no_type: "",
      //   register_organization: "",
      //   building_structure: "",
      //   tans_owner_type: "",
      //   certifiate_type: "",
      //   land_use_second: "",
      //   administrative_regions: "",
      //   cantonCity: "",
      //   cantonArea: ""
      // },
      // dicNum: 0, //字典循环下标
      // transGoods: {
      //   //省
      //   cantonProvince: "",
      //   cantonProvinceName: "",
      //   //市
      //   cantonCity: "",
      //   cantonCityName: "",
      //   //区
      //   cantonArea: "",
      //   cantonAreaName: "",
      // },
    };
  },
  created(){
    this.$get(`/epf-document/docTemplete/getTempleteTreeByArea?id=0&belong=${this.belong}&areaCode=${this.areaCode}`,{}).then(res => {
      let resData = JSON.parse(res.ztreeJson)
      console.log('公用的附件清单',resData)
      this.annexData = resData
    });
    // this.$get(`/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=000000`,{}).then(res => {
    //       // console.log("",res)
    //       this.dictionary.administrative_regions = res.dictionariesList;
    //   }).catch(error=>{});
    // let reqArr = this.dicRequest.map((item, index, arr) => {
    //   let reqFun = new Promise((resolve, reject) => {
    //     if (item == "land_use") {
    //       this.$get(
    //         `/epf-trade/dictionaries/getDictsByCodeOrParentId?code=${item}`,
    //         { parentId: 0 }
    //       ).then(res => {
    //         resolve(res);
    //       });
    //     } 
    //     else {
    //       this.$get(
    //         `/epf-trade/dictionaries/getDictEbyDictGroup/${item}`,
    //         {}
    //       ).then(res => {
    //         resolve(res);
    //       });
    //     }
    //   });
    //   return reqFun;
    // });
    // Promise.all(reqArr).then(res => {
    //   console.log(res);
    //   let dicArr = res.map(item => {
    //     console.log(item);
    //     let dicArr = item.dictionariesList.map(item => {
    //       return {
    //         dictKey: item.dictKey,
    //         zhCn: item.zhCn,
    //         id: item.id
    //       };
    //     });
    //     return dicArr;
    //   });
    //   for (let item in this.dictionary) {
    //     if("administrative_regions" != item){
    //        this.dictionary[item] = dicArr[this.dicNum];
    //        this.dicNum++;
    //     }
    //   }
    //   this.dicFinsh = true;
    // });
  },
  mounted(){
    // this.init()
  },
  methods: {
    onSubmit(formData){
          //TODO 提交表单
      },
    Submission(){ //提交按钮
      this.$post("/epf-trade/bank/send10002", this.params).then(res => {
        if(res.code == 0){
          this.$message({
            message: '入账成功',
            type: 'success'
          })
        }else{
          this.$message({
            message: '请求错误',
            type: 'warning'
          })
        }
      })
    },
    // provinceSelect(dic, cantonCode, event) {
    //   this.transGoods.cantonAreaName = "";
    //   this.transGoods.cantonArea = "";
    //   this.cantonArea = "";
    //   this.transGoods.cantonCityName = "";
    //   this.transGoods.cantonCity = "";
    //   this.cantonCity = "";
    //   let pId = this.$refs[cantonCode][0].$attrs.id;
    //   this.transGoods.cantonProvince = this.$refs[cantonCode][0].$attrs.regionCode;
    //   this.dictionary.cantonArea = [];
    //   this.$get(
    //     `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
    //     {}
    //   ).then(res => {
    //     console.log(res);
    //     if (res.dictionariesList.length != 0) {
    //       this.dictionary.cantonCity = res.dictionariesList;
    //       return;
    //     }
    //     this.dictionary.cantonCity = "";
    //   });
    //   this.orgselect();
    // },
    // citySelect(dic, cantonCity, event) {
    //   this.transGoods.cantonArea = "";
    //   this.transGoods.cantonAreaName = "";
    //   this.cantonArea = "";
    //   let pId = this.$refs[cantonCity][0].$attrs.id;
    //   this.transGoods.cantonCity = this.$refs[cantonCity][0].$attrs.regionCode;
    //   this.$get(
    //     `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
    //     {}
    //   ).then(res => {
    //     console.log(res);
    //     if (res.dictionariesList.length != 0) {
    //       this.dictionary.cantonArea = res.dictionariesList;
    //       return;
    //     }
    //     this.dictionary.cantonArea = "";
    //   });
    //   this.orgselect();
    // },
    // areaSelect(dic, cantonCity, event) {
    //   this.transGoods.cantonArea = this.$refs[cantonCity][0].$attrs.regionCode;
    //   this.orgselect();
    // },
  }
}
</script>
<style scoped>
.testBody{
  padding: 20px;
}
.testBody h1{
  text-align: center;
}
.title{
  text-align: center;
  margin-left: 120px;
}
.title span{
  line-height: 40px;
  font-size: 18px;
}
.btns{
  cursor: pointer;
  border-radius: 3px;
  width: 120px;
  background-color: #ffa100;
  color:white;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  outline: none;
  border: none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.btns:active{
  transform: translateY(1px);
}
</style>

