<template>
  <div class="filter_wrap">
    <div class="switchHeight_box">
      <el-row :gutter="2">
        <el-col :span="2">
          <span class="filter_title">信息标题 :</span>
        </el-col>
        <el-col :span="6">
          <el-input v-model="trustTitle" size="small" placeholder="请输入标题"></el-input>
        </el-col>
        <el-col :span="3">
          <span class="filter_title">流转方式 :</span>
        </el-col>
        <el-col :span="5">
          <el-select 
            size="small"
            class="filterCirculatemode" 
            v-model="filterData.circulationName" 
            placeholder="请选择流转方式" 
            @change="circulationSelect(dictionary.purchasr_status,filterData.circulationName,$event)" >
                <el-option 
                  v-for="(item,index) in dictionary.purchasr_status.slice(0,2)" 
                  :ref="item.zhCn" 
                  :id="item.id" 
                  :dictKey="item.dictKey" 
                  :label="item.zhCn" 
                  :value="item.zhCn" 
                  :key="index">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="2">
          <span class="filter_title">地块渠道 :</span>
        </el-col>
        <el-col :span="3">
          <el-select 
            size="small"
            class="filterCirculatemode" 
            v-model="filterData.channelName" 
            placeholder="请选择地块渠道" 
            @change="channelSelect(dictionary.purchasr_hannel,filterData.channelName,$event)" >
                <el-option v-for="(item,index) in dictionary.purchasr_hannel" :ref="item.zhCn" 
                    :id="item.id" :dictKey="item.dictKey" :label="item.zhCn" :value="item.zhCn" :key="index">
                </el-option>
            </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="2">
        <el-col :span="2">
          <span class="filter_title">申请时间 :</span>
        </el-col>
        <el-col :span="6">
          <el-date-picker
              v-model="useDate"
              type="daterange"
              unlink-panels
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="起始日期"
              end-placeholder="截止日期"
              size="small"
              @change="selectDatarange"
              :picker-options="pickerOptions">
          </el-date-picker>
        </el-col>
        <el-col v-if="!closeSelect" :offset=1 :span="2">
          <span class="filter_title">审核 :</span>
        </el-col>
        <el-col v-if="!closeSelect" :span="6">
            <el-select 
            size="small"
            class="filterCirculatemode" 
            v-model="filterData.delegationStatusName" 
            placeholder="请选择审核状态" 
            @change="delegationStatusSelect(dictionary.purchasr_auth,filterData.delegationStatusName,$event)" >
                <el-option v-for="(item,index) in dictionary.purchasr_auth.slice(0,4)" :ref="item.zhCn" 
                    :id="item.id" :dictKey="item.dictKey" :label="item.zhCn" :value="item.zhCn" :key="index">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="2">
          <div class="button_bg" style="margin-left:20px;" @click="findInfo">查询</div>
        </el-col>
        <el-col :span="2">
          <div class="button_bg" @click="resetFilter">重置</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      closeSelectPlace: {
        type: Boolean
      },
      typeClose:{
        type: Boolean
      }
    },
    data () {
      return {
        closeSelect: this.closeSelectPlace,
        filter: [
          {
            inputType: 'input',
            title: '信息标题',
            titleSpan: 2,
            inputSpan: 12
          },
          {
            inputType: 'select',
            title: '流转方式',
            titleSpan: 3,
            inputSpan: 5,
            option: [
              {
                title: '全部'
              },
              {
                title: '转让'
              },
              {
                title: '出租'
              },
              {
                title: '抵押'
              }
            ]
          },
          {
            inputType: 'region'
          },
          {
            inputType: 'select',
            title: '状态',
            titleSpan: 3,
            spanSpan: 5
          }
        ],
        trustTitle: '',
        filterData: {
          trustTitle: '',
          circulation:'',
          channelName:'',
          publishAuthName: '',
          circulationName:'',
          publishNo:'',
          type: '',
          beginDate:'',
          endDate:'',
        },
        isShowProvince: true,
        temp: {
          address__province: '',
          address__city: '',
          address__dist: ''
        },
        useDate:"",
        pickerOptions: {//日期范围快速选择配置
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
              picker.$emit('pick', [start, end]);
            }
          }]
         },
        // flexibleSwitch:'展开',
        // flexibleSwitchIcon:'el-icon-caret-bottom',
        switchHeight: 49,
        flexibleOpen: false,
        dicRequest:['flow_mode','trans_goods_channel','delegation_status'],//字典码请求
        dictionary:{//字典码结果
            purchasr_status:"",
            purchasr_hannel:"",
            purchasr_auth: ""
        },
        dicNum:0,
      }
    },
    created(){
      //请求字典
      let reqArr = this.dicRequest.map((item,index,arr)=>{
            let reqFun = new Promise((resolve,reject)=>{
                 this.$get(`/epf-supply/dictionaries/getDictEbyDictGroup/${item}`,{}).then(res => {
                        resolve(res);
                    })
            })
            return reqFun
        })
        Promise.all(reqArr).then(res=>{
            let dicArr = res.map((item =>{
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
            console.log('字典数据',this.dictionary)
            this.dicFinsh = true;
        }).catch((e) => {})
    },
    methods: {
      flexSwitch () {
        this.flexibleOpen = !this.flexibleOpen
        this.switchHeight = this.flexibleOpen ? 147 : 49
      },
      circulationSelect(dic,circulationName,event){
          this.filterData.circulation = this.$refs[circulationName][0].$attrs.dictKey;
      },
      channelSelect(dic,channelName,event){
          this.filterData.channel = this.$refs[channelName][0].$attrs.dictKey;
      },
      delegationStatusSelect(dic,delegationStatusName,event){
          this.filterData.delegationStatus = this.$refs[delegationStatusName][0].$attrs.dictKey;
      },
      publishStatusSelect(dic,circulationName,event){
          this.filterData.circulation = this.$refs[circulationName][0].$attrs.dictKey;
      },
      
      selectDatarange(){//选择日期范围后的回调
        this.filterData.beginDate = this.useDate[0];
        this.filterData.endDate = this.useDate[1];
      },
      findInfo(){
        this.filterData.trustTitle = encodeURIComponent(this.trustTitle);
        this.$emit('filterInfo',this.filterData);
      },
      resetFilter(){
        for(let item in this.filterData){
          this.filterData[item] = "";
        }
        this.trustTitle = "";
        this.useDate = [];
        this.$emit('filterInfo',this.filterData);
      }
    }
  }
</script>

<style scoped>

.filter_title{
  display: inline-block;
  box-sizing:border-box;
  width: 100%;
  height: 34px;
  padding-right: 10px;
  text-align: right;
  line-height: 34px;
}
</style>
<style>
  .filter_wrap .el-row{
    margin-bottom: 10px;
  }
  .filter_wrap .distpicker-address-wrapper select{
    width: 148px;
    font-size: 14px;
    line-height: 34px;
    padding: 0 10px;
  }
  .filter_wrap .el-date-editor.el-input .el-input__icon{
    line-height:30px;
    color:#8dc4f7;
  }
  .el-date-editor.dataIconStyle>.el-input__prefix{
    width: 25px;
    left: 80%;
  }
  .filter_wrap .el-input--small .el-input__inner{
    height:34px;
  }
  .filter_wrap .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  }
</style>