<template>
    <epf-container title='测试页面'>
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

                <!-- <EPF-switchTitle titles_h="土地附件清单">
                    <EPF-annexList
                        :tableType='false'
                        :tableNmae='tableNmae'
                        :belong='belong'
                        v-model='annexData'
                        :fileSize='6'
                        :fileType='fileType'
                        :annexType='annexType'
                        >
                    </EPF-annexList>
                    </EPF-switchTitle>

                    <EPF-switchTitle titles_h="委托附件清单">
                    <EPF-annexList
                        :tableType='false'
                        :tableNmae='tableNmae'
                        :belong='belong'
                        v-model='annexData'
                        :fileSize='6'
                        :fileType='fileType'
                        :annexType='entrust'
                        >
                    </EPF-annexList>
                    </EPF-switchTitle> -->
                <!-- :areaCode='areaCode' -->
            </div>
        </div> 
    </epf-container>
</template>
<script>
import selectInput from '@/components/selectInpt/selectInpt'
export default {
    name:'test',
    components: { selectInput },
    data() {
        return {
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
        };
    },
    created(){
        this.$get(this.$API.EPF_DOCUMENT.DOC_TEMPLETE,{id:0,belong:this.belong,areaCode:this.areaCode},{}).then(res => {
        let resData = JSON.parse(res.ztreeJson)
        console.log('公用的附件清单',resData)
        this.annexData = resData
        })
    },
    mounted(){
        // this.init()
    },
    methods: {
        Submission(){ //提交按钮
            this.$post(this.$API.EPF_TRADE.BANK_SEND, this.params).then(res => {
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
    }
}
</script>
<style scoped>
    .filter_title {
        display: inline-block;
        box-sizing: border-box;
        width: 100%;
        height: 34px;
        padding-right: 10px;
        text-align: right;
        line-height: 34px;
    }
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