<template>
    <epf-container title="节点">
        <div class="epf_term_box">
            <el-row>
                <el-col :span="2">
                    <span class="filter_title">节点名称 :</span>
                </el-col>
                <el-col :span="5">
                    <el-input v-model="nodeParams.name" placeholder="请输入节点名称"></el-input>
                </el-col>
                <el-col :span="3">
                    <span class="filter_title">节点类型 :</span>
                </el-col>
                <el-col :span="5">
                    <selectInput v-model="nodeParams.ptype" :groupCode="'node_type'" :default="nodeParams.ptype"></selectInput>
                </el-col>
                <el-col :span="3">
                    <span class="filter_title">节点编号:</span>
                </el-col>
                <el-col :span="5">
                <!--                    <el-input v-model="nodeParams.turn" placeholder="请输入节点编号"></el-input>-->
                <el-input-number v-model="nodeParams.turn" :step="1" :min="1"></el-input-number>
                </el-col>
            </el-row>
            <el-row >
                <el-col :span="2">
                    <span class="filter_title">指标:</span>
                </el-col>
                <el-col :span="5">
                    <selectInput v-model="nodeParams.qtype" :groupCode="'quota_type'" :default="nodeParams.qtype"></selectInput>
                </el-col>
                <el-col :span="3">
                    <span class="filter_title">是否允许报价 :</span>
                </el-col>
                <el-col :span="5">
                    <el-select v-model="nodeParams.isoffer" style="width:100%" placeholder="请选择">
                        <el-option label="是" :value="0"></el-option>
                        <el-option label="否" :value="1"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="2">
                    <span class="filter_title">备注 :</span>
                </el-col>
                <el-col :span="22">
                    <el-input v-model="nodeParams.remark" placeholder="请输入名称关键字"></el-input>
                </el-col>
            </el-row>
        </div>
        <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}">
            <div class="epf_toolbar addRule">
                <span class="titleRule">网关配置</span>
                <el-button class="primary addInput" :disabled="!modify" @click="addNode()">
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
                        type="index"
                        label="排序"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="元素名称"
                        min-width="180">
                        <template slot-scope="scope">
                        <el-input v-model="scope.row.name" placeholder="请输入元素名称" v-if="relationIndex==scope.$index"></el-input>
                        <el-input v-model="scope.row.name" placeholder="请输入元素名称" disabled  v-else></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="elementType"
                        label="类型"
                        min-width="180">
                        <template slot-scope="scope">
                        <el-select placeholder="请选择" v-model="scope.row.elementType"
                                    v-if="relationIndex==scope.$index">
                            <el-option
                            v-for="item in gateway_type"
                            :key="item.dictKey"
                            :label="item.zhCn"
                            :value="item.dictValue">
                            </el-option>
                        </el-select>
                        <el-select placeholder="请选择" v-model="scope.row.elementType"
                                    v-else>
                            <el-option
                            v-for="item in gateway_type"
                            :key="item.dictKey"
                            disabled
                            :label="item.zhCn"
                            :value="item.dictValue">
                            </el-option>
                        </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="symbol"
                        label="表达方式"
                        min-width="180">
                        <template slot-scope="scope">

                        <el-select placeholder="请选择" v-model="scope.row.symbol"
                                    v-if="relationIndex==scope.$index">
                            <el-option
                            v-for="item in expressions_type"
                            :key="item.dictKey"
                            :label="item.zhCn"
                            :value="item.dictValue">
                            </el-option>
                        </el-select>
                        <el-select placeholder="请选择" v-model="scope.row.symbol"
                                    v-else>
                            <el-option
                            v-for="item in expressions_type"
                            :key="item.dictKey"
                            disabled
                            :label="item.zhCn"
                            :value="item.dictKey">
                            </el-option>
                        </el-select>

                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="threshold"
                        label="阈值(数字类型)"
                        min-width="180">
                        <template slot-scope="scope">
                        <el-input v-model="scope.row.threshold" placeholder="请输入阈值" v-if="relationIndex==scope.$index"></el-input>
                        <el-input v-model="scope.row.threshold" placeholder="请输入阈值" disabled  v-else></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="numbers"
                        label="是否流标"
                        min-width="180">
                        <template slot-scope="scope">
                        <el-select v-model="scope.row.isFail" v-if="relationIndex==scope.$index" style="width:100%" placeholder="请选择">
                            <el-option label="是" :value="0"></el-option>
                            <el-option label="否" :value="1"></el-option>
                        </el-select>
                        <span v-else>
                                    <el-input placeholder="是" v-if="scope.row.isFail == 0" disabled ></el-input>
                                    <el-input placeholder="否" v-else-if="scope.row.isFail == 1" disabled ></el-input>
                                    <el-input placeholder="请输入内容" v-else disabled ></el-input>
                                    </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="templateId"
                        label="模板"
                        min-width="180">
                        <template slot-scope="scope">
                        <el-select placeholder="请选择" v-model="scope.row.templateId"
                                    v-if="relationIndex==scope.$index">
                            <el-option
                            v-for="item in getaway_model"
                            :key="item.dictKey"
                            :label="item.zhCn"
                            :value="item.dictValue">
                            </el-option>
                        </el-select>
                        <el-select placeholder="请选择" v-model="scope.row.templateId"
                                    v-else>
                            <el-option
                            v-for="item in getaway_model"
                            :key="item.dictKey"
                            disabled
                            :label="item.zhCn"
                            :value="item.dictValue">
                            </el-option>
                        </el-select>

                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        min-width="180">
                        <template slot-scope="scope">
                        <el-button type="text"
                                    v-if='!disabled&&relationIndex==scope.$index'
                                    @click="submiData(scope.$index)"
                                    :disabled='!(relationIndex==scope.$index)'>
                            提交
                        </el-button>
                        <el-button type="text"
                                    v-else
                                    @click="modifyData(scope.$index)">
                            修改
                        </el-button>
                        <el-button type="text"
                                    @click="tableDataDel(scope.$index)"
                                    :disabled='!(relationIndex==scope.$index)'>
                            删除
                        </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="margin-top:25px;">
                    <div class="MapBtns" @click="nodeSub">确定</div>
                    <div class="MapBtns deleteBtn" @click="exitThis">取消</div>
                </div>
            </div>
        </div> 
    </epf-container>
</template>
<script>
import selectInput from '@/components/selectInpt/selectInpt'
export default {
    name:'dispose',
    components: { selectInput },
    data () {
        return {
            disabled: true,
            value: '',
            tableData: [],
            nodeParams: {}, //节点参数收集对象
            nodeId: '',
            relationIndex: null,
            modify: true,
            ContrastIndex: '',
            pendingParams: {  //
            title: '',
            pageNo: 1,
            pageSize: 5,
            totalRecord: 1,
            totalPage: 1
            },
            //   类型 ：gateway_type
            gateway_type: [],
            // 表达方式：expressions_type
            expressions_type: [],
            // 模板：getaway_model
            getaway_model: [],
        }
    },
    mounted () {
        let self = this;
        setTimeout(function () {
            //   类型 ：gateway_type
            self.queryDic('gateway_type')
            setTimeout(function () {
            // 表达方式：expressions_type
            self.queryDic('expressions_type')
            setTimeout(function () {
                // 模板：getaway_model
                self.queryDic('getaway_model')
            },200);
            },200);
        },200);
        //获取的节点ID
        if (this.$route.query.id) {
            //调用接口进行页面数据的查询
            // nodeParams:{}, //节点参数收集对象
            // transElements:[],  //网关配置集合
            this.$get(this.$API.EPF_TRADEENGINE.LOG.GET_TEMPLATE, {id: this.$route.query.id}).then(res => {
            // res 是返回结果
            if (res.code != 0) {
                this.$message.error(res.msg)
                return
            }
            console.log('获取到的数据是：', res.transNodeTemplate)
            //取出相关的数据进行赋值
            this.nodeParams = res.transNodeTemplate
            this.tableData = this.nodeParams.elements

            //给页面ID对象赋值
            this.nodeId = this.nodeParams.id
            })
        }
    },
    methods: {
        //点击确定事件开始
        nodeSub () {   //todo
            let url = ''
            let Params = {}
            let message = ''
            if (this.nodeId) {
            message = '修改成功'
            url = '/epf-tradeengine/transnodetemplate/editTransNodeTemplate'
            Params = {
                'transAllJson': {
                'transNodeJson': {
                    'id': this.nodeId,
                    'ptype': this.nodeParams.ptype,
                    'name': this.nodeParams.name,
                    'qtype': this.nodeParams.qtype,
                    'remark': this.nodeParams.remark,
                    'isoffer': this.nodeParams.isoffer,
                    'turn': this.nodeParams.turn,
                    'transElements': this.tableData
                }
                }
            }
            } else {
            message = '添加成功'
            url = '/epf-tradeengine/transnodetemplate/addTransNodeTemplate'
            Params = {
                'transAllJson': {
                'transNodeJson': {
                    'ptype': this.nodeParams.ptype,
                    'name': this.nodeParams.name,
                    'qtype': this.nodeParams.qtype,
                    'remark': this.nodeParams.remark,
                    'isoffer': this.nodeParams.isoffer,
                    'turn': this.nodeParams.turn,
                    'transElements': this.tableData
                }
                }
            }
            }

            console.log('请求的数据是：', Params)

            this.$useAppend(url, {
            transNode: Params
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
        //点击确定事件结束
        exitThis () {
            //关闭当前页面
            this.$bus.$emit('closeTabsItem', this.$route.name)
        },
        addNode () { //新增节点
            this.modify = false

            let addTable = {
            name: '',
            elementType: '',
            symbol: '',
            threshold: '',
            isFail: '',
            templateId: '',
            }

            this.tableData.push(addTable)
            this.ContrastIndex = this.tableData.length - 1
            this.modifyData(this.ContrastIndex)
        },
        modifyData (index) { //修改按钮
            this.relationIndex = index
            this.disabled = false
        },
        tableDataDel (index) { //删除
            this.modify = true
            this.tableData.splice(index, 1)
            this.ContrastIndex = this.tableData.length - 1

            console.log('已删除第', index + 1, '行数据')
        },
        submiData (index) { //提交按钮
            this.disabled = true
            this.modify = true
            this.relationIndex = -1
            this.ContrastIndex = this.tableData.length - 1

            console.log('已提交第', index + 1, '行数据')
        },
        pendingSizeChange (val) {

        },
        pendingCurrentChange () {

        },
        queryDic (code) { 
            let url = this.$API.EPF_TRADE.BANK.DICT_GROUP + code
            //查询字典值
            this.$get(url, {}).then(res => {
            // res 是返回结果
            if (res.code != 0) {
                this.$message.error(res.msg)
                return
            }
            this[code] = res.dictionariesList
            console.log('查询到的字典值：' + code, this[code])
            })
        },
    },
  }
</script>
<style scoped>
  .searchBox {
    border: solid 1px #ebeff5;
    padding: 30px 35px 30px 0;
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
