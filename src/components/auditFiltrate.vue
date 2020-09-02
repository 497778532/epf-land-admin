<template>
  <div class="filter_wrap">
    <div class="switchHeight_box">
      <el-row :gutter="2">
      <el-col :span="2">
        <span class="filter_title">审核人 :</span>
      </el-col>
      <el-col :span="3">
        <el-input v-model="filterData.people" size="small" placeholder="请输入"></el-input>
      </el-col>
      <el-col :span="2">
        <span class="filter_title">审核批次 :</span>
      </el-col>
      <el-col :span="3">
        <el-input v-model="filterData.batch" size="small" placeholder="请输入审核批次"></el-input>
      </el-col>
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
            @change="selectDatarange">
        </el-date-picker>
      </el-col>  
      <el-col v-if="!typeClose" :span="1">
        <span class="filter_title">状态 :</span>
      </el-col>
      <el-col v-if="!typeClose" :span="3">
        <el-select 
          size="small"
          class="filterCirculatemode" 
          v-model="filterData.publishStatusName" 
          placeholder="请选择状态" 
          @change="publishStatusSelect(dictionary.purchasr_status,filterData.publishStatusName,$event)" >
              <el-option v-for="(item,index) in dictionary.purchasr_status" :ref="item.zhCn" 
                  :id="item.id" :dictKey="item.dictKey" :label="item.zhCn" :value="item.zhCn" :key="index">
              </el-option>
          </el-select>
      </el-col>
      
    </el-row>

    <el-row :gutter="3">
      <el-col v-if="!typeClose" :span="2">
        <span class="filter_title">审核类型 :</span>
      </el-col>
      <el-col v-if="!typeClose" :span="3">
        <el-select 
          size="small"
          class="filterCirculatemode" 
          v-model="filterData.publishStatusName" 
          placeholder="请选择状态" 
          @change="publishStatusSelect(dictionary.purchasr_status,filterData.publishStatusName,$event)" >
              <el-option v-for="(item,index) in dictionary.purchasr_status" :ref="item.zhCn" 
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
        filterData: {
            number:'',
          title: '',
          circulation:'',
          publishStatus: '',
          publishStatusName:'',
          publishNo:'',
          type: '',
          cantonProvinceName:'',
          cantonProvince:'',
          cantonCityName:'',
          cantonCity:'',
          cantonAreaName:'',
          cantonArea:'',
          issueBeginDate:'',
          issueEndDate:'',
        },
        isShowProvince: true,
        temp: {
          address__province: '',
          address__city: '',
          address__dist: ''
        },
        useDate:"",
        // pickerOptions: {//日期范围快速选择配置
        //   shortcuts: [{
        //     text: '最近一周',
        //     onClick(picker) {
        //       const end = new Date();
        //       const start = new Date();
        //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        //       picker.$emit('pick', [start, end]);
        //     }
        //   }, {
        //     text: '最近一个月',
        //     onClick(picker) {
        //       const end = new Date();
        //       const start = new Date();
        //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        //       picker.$emit('pick', [start, end]);
        //     }
        //   }, {
        //     text: '最近三个月',
        //     onClick(picker) {
        //       const end = new Date();
        //       const start = new Date();
        //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
        //       picker.$emit('pick', [start, end]);
        //     }
        //   }]
        //  },
        // flexibleSwitch:'展开',
        // flexibleSwitchIcon:'el-icon-caret-bottom',
        switchHeight: 49,
        flexibleOpen: false,
        dicRequest:['purchasr_status','purchasr_demand'],//字典码请求
        dictionary:{//字典码结果
            purchasr_status:"",
            purchasr_demand:"",
        },
        dicNum:0,
      }
    },
    created(){
      console.log('created');
      
      // 请求字典
      let reqArr = this.dicRequest.map((item,index,arr)=>{
            let reqFun = new Promise((resolve,reject)=>{
                  this.$get(`/epf-supply/dictionaries/getDictEbyDictGroup/${item}`,{}).then(res => {
                      resolve(res);
                  })
            })
            return reqFun
        })
        Promise.all(reqArr).then(res=>{
            console.log(res);
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
                console.log(dicArr[this.dicNum]);
                this.dictionary[item] = dicArr[this.dicNum];
                this.dicNum++;
            }
            
            this.dicFinsh = true;
            console.log('字典结果',this.dictionary);
        });
    },
    methods: {
      flexSwitch () {
        this.flexibleOpen = !this.flexibleOpen
        this.switchHeight = this.flexibleOpen ? 147 : 49
      },
      publishStatusSelect(dic,publishStatusName,event){
          this.filterData.publishStatus = this.$refs[publishStatusName][0].$attrs.dictKey;
      },
      selectDatarange(){//选择日期范围后的回调
        this.filterData.issueBeginDate = this.useDate[0];
        this.filterData.issueEndDate = this.useDate[1];
      },
      findInfo(){
        this.$emit('filterInfo',this.filterData);
      },
      resetFilter(){
        for(let item in this.filterData){
          this.filterData[item] = "";
        }
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