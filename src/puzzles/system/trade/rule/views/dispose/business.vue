<template>
    <epf-container title="业务模型">
        <div class="epf_term_box">
            <el-row class="searchBox">
                <el-col :span="1">
                    <span class="filter_title">编号 :</span>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="busParams.modelNo" placeholder="请输入编号"></el-input>
                </el-col>
                <el-col :span="1" style="margin-left:30px;">
                    <span class="filter_title">名称 :</span>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="busParams.name" placeholder="请输入名称"></el-input>
                </el-col>
                <el-col :span="2" style="margin-left:30px;">
                    <span class="filter_title">选择交易物类别 :</span>
                </el-col>
                <el-col :span="4">
                    <selectInput v-model="busParams.goodsType"
                    :groupCode="'goods_type'"
                    :default="busParams.goodsType">
                    </selectInput>
                </el-col>
                <el-col :span="2" style="margin-left:30px;">
                    <span class="filter_title">选择业务类别 :</span>
                </el-col>
                <el-col :span="4">
                    <selectInput v-model="busParams.businessType"
                    :groupCode="'flow_mode'"
                    :default="busParams.businessType">
                    </selectInput>
                </el-col>
            </el-row>
        </div>
        <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}">
            <div class="epf_toolbar addRule">
                <span class="titleRule">交易方式设置</span>
                <el-button class="primary addInput" :disabled="!modify" @click="addModleFun()">
                    新增
                </el-button>
            </div>
            <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 205 +'px'}">
                <el-table
                    :data="tableData"
                    border
                    :header-cell-style="{background:'#f5f8fa',color:'#5f6264',fontWeight:'normal'}"
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="名称"
                        min-width="180">
                        <template slot-scope="scope">
                        <el-input v-model="scope.row.name"
                            v-if="scope.$index!==modifyIndex+1"
                            :disabled="!modify"
                            placeholder="请输入名称"></el-input>
                        <el-input v-model="scope.row.name"
                            v-if="addModifyBtn&&scope.$index==modifyIndex+1"
                            placeholder="请输入名称"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="transTypeId"
                        label="引用交易方式"
                        min-width="180">
                        <template slot-scope="scope">

                        <el-select v-model="scope.row.transTypeId"
                            v-if="scope.$index!==modifyIndex+1"
                            :disabled="!modify"
                            style="width:100%"
                            placeholder="请选择">
                            <el-option
                            v-for="item in processedData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>

                        <el-select v-model="scope.row.transTypeId"
                            v-if="addModifyBtn&&scope.$index==modifyIndex+1"
                            style="width:100%"
                            placeholder="请选择">
                            <el-option
                            v-for="item in processedData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>

                        </template>
                    </el-table-column>
                    <el-table-column
                        label="竞买申请步骤"
                        min-width="180">
                        <template slot-scope="scope">
                        <el-button type="text" :disabled="!modify"
                            v-if="scope.$index!==modifyIndex+1"
                            @click="setUp(scope.$index)">
                            设置
                        </el-button>

                        <el-button type="text"
                            v-if="addModifyBtn&&scope.$index==modifyIndex+1"
                            @click="setUp(scope.$index)">
                            设置
                        </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        min-width="180">
                        <template slot-scope="scope">
                        <el-button type="text"
                            :disabled="!modify"
                            v-if="scope.$index!==modifyIndex+1"
                            @click="romveData(scope.$index)">
                            删除
                        </el-button>

                        <el-button type="text"
                            v-if="addModifyBtn&&scope.$index==modifyIndex+1"
                            @click="romveModify(scope.$index)">
                            删除
                        </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                    
                <div style="margin-top:30px;">
                    <div class="MapBtns" @click="putTransaction">确定</div>
                    <div class="MapBtns deleteBtn" @click="exitTransaction">取消</div>
                </div>
            </div>
        </div> 
        <!-- 设置竞买申请步骤 -->
        <el-dialog
            id="addBusModelDialog"
            :modal="true"
            width="40%"
            top="18vh"
            left
            title='设置竞买申请步骤'
            :close-on-click-modal='false'
            :visible.sync="procedures"
            @close="procedures = false">
            <div style="text-align: right;">
                <div class="MapBtns" style="width:60px;height:34px;" @click="empty()">清空</div>
            </div>
            <el-row class="stepBox">
                <el-col :span="7">
                <h3>步骤名称</h3>
                <el-checkbox-group v-model="checkList" class="checkBoxList" @change='checkFunction()'>
                    <el-checkbox :label="ind" v-for="(item,ind) in pendingData" :value="ind" :key="ind">{{item.name}}</el-checkbox>
                </el-checkbox-group>
                </el-col>
                <el-col :span="17">
                <el-table
                    :data="stepData"
                    border
                    :header-cell-style="{background:'#f5f8fa',color:'#5f6264',fontWeight:'normal'}"
                    style="width: 100%">
                    <el-table-column
                    label="所选步骤"
                    prop="name"
                    min-width="80">
                    <template slot-scope="scope">
                        {{scope.row.name}}
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="排序"
                    prop="turn"
                    min-width="80">
                    <template slot-scope="scope" v-if="stepData.length!==1">
                        <span class="el-icon-bottom sortBox"
                        v-if="scope.$index==0"
                        @click="sortBottomFun(scope.$index)">
                        </span>
                        <span v-if="scope.$index!=0&&scope.$index!=stepData.length-1"
                        style="text-align:center;width: 138px;display: inline-block;">
                        <span class="el-icon-bottom middle"
                            @click="sortBottomFun(scope.$index)"
                            style="text-align:right;">
                        </span>
                        <span class="el-icon-top middle"
                            @click="sortTopFun(scope.$index)">
                        </span>
                        </span>
                        <span class="el-icon-top sortBox"
                        v-if="scope.$index==stepData.length-1"
                        @click="sortTopFun(scope.$index)">
                        </span>
                    </template>
                    </el-table-column>
                </el-table>
                </el-col>
            </el-row>
            <div class="btnBox">
                <div class="MapBtns" @click="proceduresDown">确定</div>
                <div class="MapBtns deleteBtn" @click="proceduresClose">关闭</div>
            </div>
        </el-dialog>

        <!-- 可删除弹框 -->
        <el-dialog
            id="deleteNodeYes"
            :modal="true"
            width="20%"
            top="30vh"
            left
            title='提示'
            :close-on-click-modal='false'
            :visible.sync="deleteNodeYes"
            @close="deleteNodeYes = false">
            <div>
                <p class="Pcontent">是否确认移除？</p>
            </div>
            <div class="btnBox">
                <div class="MapBtns" @click="markerRemove">确定</div>
                <div class="MapBtns deleteBtn" @click="deleteNodeYes = false">关闭</div>
            </div>
        </el-dialog>
    </epf-container>
</template>
<script>
import selectInput from '@/components/selectInpt/selectInpt'
export default {
    name:'dispose',
    components: { selectInput },
    data () {
        return {
            modifyIndex:'',//修改的index
            addModifyBtn:false,
            modify:true,
            procedures: false,
            deleteNodeYes: false,
            value: '',
            tableData: [],
            stepData: [],
            checkList: [],
            unchangedData: [],
            busParams: {}, // 业务模型主体数据
            index: -1,  //点击移除的数据下标
            setUpRowIndex: -1, //步骤设置下标
            pendingData: [],
            processedData: [],

        }
    },
    created () {
        this.processedParamsList()
        this.pendingParamsList()
    },
    mounted () {
        //获取模型的ID
        if (this.$route.query.id) {
            //调用接口进行页面数据的查询
            // nodeParams:{}, //节点参数收集对象
            // transElements:[],  //网关配置集合 
            this.$get(this.$API.EPF_TRADE.RULE.FET_MODEL, {id: this.$route.query.id}).then(res => {
            // res 是返回结果
            if (res.code != 0) {
                this.$message.error(res.msg)
                return
            }
            console.log('获取到的数据是：', res.transBusinessModelEntity)
            //取出相关的数据进行赋值
            this.busParams = res.transBusinessModelEntity
            if(this.busParams.transTypeRels){
                this.tableData = this.busParams.transTypeRels
                console.log("交易方式的表格数据是：",this.tableData)
            }
            this.modifyIndex = this.tableData.length-1
            })
        }
    },
    methods: {
        markerDown () {
            this.procedures = false
        },
        addModleFun(){
            let index;
            if(this.tableData){
            index = this.tableData.length-1;
            }else{
            this.tableData = [];
            index = -1;
            }
            this.modifyIndex = index
            this.addModifyBtn = true
            this.modify = false

            let addTable={
                name:'',
                transTypeId:''
            }
            this.tableData.push(addTable)
        },
        markerRemove () {
            //移除指定下标的数据
            let table = this.tableData
            //创建新数组用来存数据
            let tableData = []
            if (this.index != -1) {
            for (let i = 0; i < table.length; i++) {
                if (i != this.index) {
                tableData.push(table[i])
                }
            }
            this.tableData = tableData
            }
            this.deleteNodeYes = false
        }
        ,
        setUp (index) {
            debugger
            //显示步骤设置弹框
            this.procedures = true
            //下标储存在变量中
            this.setUpRowIndex = index
            //如果存在ID，代表现在是修改状态
            if(this.tableData[this.setUpRowIndex].transStepRels){
            this.stepData = this.tableData[this.setUpRowIndex].transStepRels
            }else{
            this.tableData[this.setUpRowIndex].transTypeStepRel = [];
            this.stepData = this.tableData[this.setUpRowIndex].transTypeStepRel
            }
        },
        romveData (index) {
            //需要移除的数据下标
            this.index = index
            this.deleteNodeYes = true
        },
        romveModify(){
            this.tableData.pop()
            this.modify = true
            this.addModifyBtn = false
        },
        checkFunction () {
            debugger
            let objList = []
            for (let i = 0; i < this.checkList.length; i++) {
            //获取下标
            let index = this.checkList[i];
            //指定下标值设置进对象中
            objList.push(this.pendingData[index])
            }
            this.stepData = objList
            this.unchangedData = objList
        },
        empty () { //设置弹框清空按钮
            this.stepData = []
            this.checkList = []
            this.unchangedData = []
        },
        sortBottomFun (index) { //设置弹框向下排序
            let oneData = this.unchangedData[index + 1]
            let towData = this.unchangedData[index]
            this.stepData.splice(index, 1, oneData)
            this.stepData.splice(index + 1, 1, towData)
        },
        sortTopFun (index) { //设置弹框向上排序
            let oneData = this.unchangedData[index - 1]
            let towData = this.unchangedData[index]
            this.stepData.splice(index, 1, oneData)
            this.stepData.splice(index - 1, 1, towData)
        },
        //下拉框数据请求接口开始
        processedParamsList () {
            //调用接口查询交易方式接口数据
            this.$get(this.$API.EPF_TRADEENGINE.LOG.TRANS_JSON, {
            page: 1,
            rows: 10000
            }).then(res => {
            // res 是返回结果
            if (res.code != 0) {
                this.$message.error(res.msg)
                return
            }
            //设置下拉框的数据
            this.processedData = res.pager.results
            })
        },
        pendingParamsList () {
            //调用接口查询竞买申请步骤列表接口数据 
            this.$get(this.$API.EPF_TRADE.RULE.STEP_JSON, {page: 1, rows: 10000}).then(res => {
            // res 是返回结果
            if (res.code != 0) {
                this.$message.error(res.msg)
                return
            }
            //设置下拉框的数据
            this.pendingData = res.pager.results
            console.log('选择123',this.pendingData)
            })
        },
        //下拉框数据请求接口结束
        //点击确定、取消按钮事件开始
        putTransaction () {

            //步骤配置表格数据
            console.log("获取的步骤配置表格数据是：",this.stepData)
            //模型添加接口传参
            let url = ''
            let Params = {}
            let message = ''
            let table = this.tableData
            console.log("获取到的表格数据是：",table)
            if (this.busParams.id) {
            message = '修改成功'
            url = '/epf-trade/admin/transbusinessmodel/editTransBusinessModel'
            Params = {
                'transAllJson': {
                    'businessModelJson': {
                        'id': this.busParams.id,
                        'goodsType': this.busParams.goodsType,
                        'businessType': this.busParams.businessType,
                        'name': this.busParams.name,
                        'deleteFlag': 0,
                        'modelNo': this.busParams.modelNo,
                        'transTypeModelRel': this.tableData
                    }
                }
            }
            } else {
                message = '添加成功'
                url = '/epf-trade/admin/transbusinessmodel/addTransBusinessModel'
                Params = {
                    'transAllJson': {
                        'businessModelJson': {
                            'goodsType': this.busParams.goodsType,
                            'businessType': this.busParams.businessType,
                            'name': this.busParams.name,
                            'deleteFlag': 0,
                            'modelNo': this.busParams.modelNo,
                            'transTypeModelRel': this.tableData
                        }
                    }
                }
            }
            this.$useAppend(url, {
                transModelDataJson: Params
            }).then(res => {
                // res 是返回结果
                if (res.code != 0) {
                    this.$message.error(res.msg)
                    return
                }
                this.$message.success(message)
                //关闭当前页面
                this.$bus.$emit('closeTabsItem', this.$route.name)
            })
        },
        exitTransaction () {
            //关闭当前页面
            this.$bus.$emit('closeTabsItem', this.$route.name)
        },
        //点击确定、取消按钮事件结束
        //步骤设置业务处理开始
        proceduresDown(){
            //设置数据
            this.tableData[this.setUpRowIndex].transTypeStepRel = this.stepData;
            //隐藏表格
            this.procedures = false;
            //改变行状态
            this.modify = true
            //执行清空方法
            this.empty();
            // this.addModifyBtn = false
        },
        proceduresClose(){
            //执行清空方法
            this.empty();
            //隐藏表格
            this.procedures = false;
        },
        //步骤设置业务处理结束
    },
  }
</script>
<style scoped>
  .searchBox {
    border: solid 1px #ebeff5;
    padding: 30px 25px;
  }

  .filter_title {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    padding-right: 10px;
    text-align: right;
    line-height: 40px;
  }

  
  .addRule {
    background-color: #f5f8fa;
    overflow: hidden;
    padding: 10px 25px;
  }

  .titleRule {
    color: #5f6264;
    font-weight: 700;
    font-size: 16px;
    margin-top: 7px;
  }

  .paginator {
    text-align: right;
    padding: 15px 10px;
    border: 1px solid #ebeff5;
    border-top: none;
  }

  .MapBtns {
    cursor: pointer;
    border-radius: 3px;
    width: 100px;
    display: inline-block;
    background-color: #ffa100;
    color: white;
    height: 36px;
    text-align: center;
    line-height: 36px;
    font-size: 14px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .MapBtns:active {
    transform: translateY(1px);
  }

  .deleteBtn {
    border: solid 1px #dce0e6;
    color: #606365;
    background: #fff;
    margin-left: 20px;
  }

  .btnBox {
    text-align: center;
    margin-top: 30px;
  }

  #deleteNodeYes p {
    font-weight: 600;
    line-height: 20px;
  }

  .stepBox {
    margin-top: 20px;
  }

  .stepBox h3 {
    font-weight: 700;
    font-size: 15px;
    margin-bottom: 15px;
  }

  .checkBoxList label {
    margin-top: 26px;
  }

  .sortBox {
    cursor: pointer;
    display: inline-block;
    width: 138px;
    font-size: 18px;
    font-weight: 700;
    color: #0b8adf;
    text-align: center;
  }

  .sortBox:active {
    color: #0bc3df;
  }

  .middle {
    width: 25px;
    cursor: pointer;
    display: inline-block;
    font-size: 18px;
    font-weight: 700;
    color: #0b8adf;
    text-align: left;
  }

  .middle:active {
    color: #0bc3df;
  }

  .addInput {
    margin: 0;
    float: right;
    line-height: 0;
    border: none;
  }

  .addInput:active {
    border-color: none;
  }

  .addInput:hover {
    background-color: #ffa100;
    color: white;
  }
</style>
