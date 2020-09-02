<template>
    <epf-container title="交易规则配置">
        <div class="epf_fr_box" :style="{height:boxHeight- 165 +'px'}">
            <el-tabs v-model="activeTabs" type="border-card" @tab-click="handleClick">
                <el-tab-pane label="竞买申请步骤" name="pending">
                    <div style="padding:30px;">
                        <EPF-switchTitle titles_h='竞买申请步骤' :shutOff='false'>
                            <el-row class="searchBox">
                            <el-col :span="1">
                                <span class="filter_title">名称 :</span>
                            </el-col>
                            <el-col :span="8">
                                <el-input v-model="pendingParams.title" placeholder="请输入名称"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <button class="epf_btn epf_btn_bg orange" @click="pendingParamsSearch"> 查 询</button>
                            </el-col>
                            </el-row>
                            <div class="addRule">
                            <span class="titleRule">竞买申请步骤</span>
                            <el-button class="primary addInput orange" :disabled="!modify" @click="addTableData()" style="float: right;">
                                新增
                            </el-button>
                            </div>
                            <div class="tableBox">
                            <el-table
                                :data="pendingData"
                                border
                                
                                :header-cell-style="{background:'#f5f8fa',color:'#5f6264',fontWeight:'normal'}"
                                style="width: 100%">
                                <el-table-column
                                prop="name"
                                label="名称"
                                min-width="180">
                                <template slot-scope="scope">
                                    <el-row class="modifyBox" v-if="!update && scope.$index == index">
                                    <el-col :span="12" style="padding: 0 15px;">
                                        <el-input placeholder="请输入竞买步骤名称" v-model="scope.row.name"></el-input>
                                    </el-col>
                                    </el-row>
                                    <span v-else>
                                    {{scope.row.name}}
                                    </span>
                                </template>
                                </el-table-column>
                                <el-table-column
                                prop="moduleUrl"
                                label="地址"
                                min-width="180">

                                <template slot-scope="scope">
                                    <el-row class="modifyBox" v-if="!update && scope.$index == index">
                                    <el-col :span="12" style="padding: 0 15px;">
                                        <el-input placeholder="请输入页面地址" v-model="scope.row.moduleUrl"></el-input>
                                    </el-col>
                                    </el-row>
                                    <span v-else>
                                    {{scope.row.moduleUrl}}
                                    </span>
                                </template>

                                </el-table-column>
                                <el-table-column
                                label="操作"
                                min-width="180">
                                <template slot-scope="scope">
                                    <!--                    已有数据，的修改功能，需要判断是否在新增状态，两种操作不能同时进行-->
                                    <el-button type="text" v-if="scope.row.id && update" @click="pendingUpd(scope.$index)">修改
                                    </el-button>
                                    <!--                    添加数据的修改功能,没有ID，并且正在添加状态才显示提交按钮-->
                                    <el-button type="text" v-else-if="!scope.row.id && !modify" @click="pendingSub">提交</el-button>
                                    <!--                    正常情况下列表的删除，需要进行判断是否关联-->
                                    <el-button type="text" v-if="modify && update" @click="deletependingFun(scope.row)">删除</el-button>
                                    <!--                    添加过程中的删除，只删除数组里面的数据-->
                                    <el-button type="text" @click="delTabelData()" v-else-if="!modify && update">删除</el-button>
                                    <!--                    修改状态的提交按钮-->
                                    <el-button type="text" v-if="scope.row.id && !update && scope.$index == index"
                                            @click="pendingEdit(scope.row)">提交
                                    </el-button>
                                    <!--                    修改状态的取消按钮-->
                                    <el-button type="text" v-if="scope.row.id && !update && scope.$index == index" @click="pendingExit">
                                    取消
                                    </el-button>
                                    <!--                    虚拟的修改和删除按钮-->
                                    <el-button type="text" v-if="scope.$index != index && !update" @click="pendingDisable">修改
                                    </el-button>
                                    <el-button type="text" v-if="scope.$index != index && !update" @click="pendingDisable">删除
                                    </el-button>
                                </template>
                                </el-table-column>
                            </el-table>
                            <el-row class="modifyBox" v-show="!modify">
                                <el-col :span="12" style="padding: 0 15px;">
                                <el-input size="small" placeholder="请输入竞买步骤名称" v-model="competeName"></el-input>
                                </el-col>
                                <el-col :span="12" style="padding: 0 15px;">
                                <el-input size="small" placeholder="请输入页面地址" v-model="pageAddress"></el-input>
                                </el-col>
                            </el-row>
                            </div>
                            <!-- 分页控件 -->
                            <div class="epf_paging_fixe" style="text-align:right">
                            <el-pagination
                                background
                                layout="total,prev, pager, next,sizes,jumper"
                                :page-sizes="[5,10,15,20]"
                                @size-change="pendingSizeChange"
                                @current-change="pendingCurrentChange"
                                :total="pendingParams.totalRecord"
                                :current-page="pendingParams.pageNo"
                                :page-size="pendingParams.pageSize">
                            </el-pagination>
                            </div>
                        </EPF-switchTitle>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="交易方式" name="processed">
                    <div style="padding:30px;">
                        <EPF-switchTitle titles_h='交易方式' :shutOff='false'>
                            <el-row class="searchBox">
                            <el-col :span="1">
                                <span class="filter_title">名称 :</span>
                            </el-col>
                            <el-col :span="8">
                                <el-input v-model="processedParams.title" placeholder="请输入交易方式名称"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <button class="epf_btn epf_btn_bg orange" @click="processedParamsSearch"> 查 询</button>
                            </el-col>
                            </el-row>
                            <div class="addRule">
                            <span class="titleRule">交易方式</span>
                            
                            <span class="button_bg" @click="addTransaction('add','')" style="float: right;">新增</span>
                            </div>
                            <el-table
                                :data="processedData"
                                border
                                
                                :header-cell-style="{background:'#f5f8fa',color:'#5f6264',fontWeight:'normal'}"
                                style="width: 100%">
                                <el-table-column
                                    label="序号"
                                    prop="id"
                                    type="index"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="名称"
                                    min-width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="transTypeName"
                                    label="交易方式类型"
                                    min-width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="allowMultiTrade"
                                    label="是否网上交易"
                                    min-width="180">
                                    <template slot-scope="scope">
                                    <span v-if="scope.row.allowMultiTrade == 0">是</span>
                                    <span v-else>否</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="操作"
                                    min-width="180">
                                    <template slot-scope="scope">
                                    <el-button type="text" @click="addTransaction('upd',scope.row)">修改</el-button>
                                    <el-button type="text" @click="TransactionCheck(scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- 分页控件 -->
                            <div class="epf_paging_fixe" style="text-align:right">
                                <el-pagination
                                    background
                                    layout="total,prev, pager, next,sizes,jumper"
                                    :page-sizes="[5,10,15,20]"
                                    @size-change="processedSizeChange"
                                    @current-change="processedCurrentChange"
                                    :total="processedParams.totalRecord"
                                    :current-page="processedParams.pageNo"
                                    :page-size="processedParams.pageSize"
                                >
                            </el-pagination>
                            </div>
                        </EPF-switchTitle>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="节点" name='node'>
                    <div style="padding:30px;">
                        <EPF-switchTitle titles_h='节点管理' :shutOff='false'>
                            <el-row class="searchBox">
                            <el-col :span="2">
                                <span class="filter_title">节点名称 :</span>
                            </el-col>
                            <el-col :span="8">
                                <el-input v-model="nodeParams.title" placeholder="请输入节点名称"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <button class="epf_btn epf_btn_bg orange" @click="nodeParamsSearch"> 查 询</button>
                            </el-col>
                            </el-row>
                            <div class="addRule">
                            <span class="titleRule">节点管理</span>
                            <span class="button_bg" @click="addTrasNode" style="float: right;">新增</span>
                            </div>
                            <el-table
                            :data="nodeData"
                            border
                            :header-cell-style="{background:'#f5f8fa',color:'#5f6264',fontWeight:'normal'}"
                            style="width: 100%">
                            <el-table-column
                                prop="id"
                                type="index"
                                label="节点编号"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="节点名称"
                                min-width="180">
                            </el-table-column>
                            <el-table-column
                                prop="ptypeName"
                                label="节点类型"
                                min-width="180">
                            </el-table-column>
                            <el-table-column
                                prop="isoffer"
                                label="是否允许报价"
                                min-width="180">
                                <template slot-scope="scope">
                                <span v-if="scope.row.isoffer == 0">是</span>
                                <span v-else>否</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="qtypeName"
                                label="指标"
                                min-width="180">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                min-width="180">
                                <template slot-scope="scope">
                                <el-button type="text" @click="nodeUpd(scope.row)">修改</el-button>
                                <el-button type="text" @click="nodeCheck(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                            </el-table>
                            <!-- 分页控件 -->
                            <div class="epf_paging_fixe" style="text-align:right">
                            <el-pagination
                                background
                                layout="total,prev, pager, next,sizes,jumper"
                                :page-sizes="[5,10,15,20]"
                                @size-change="nodeSizeChange"
                                @current-change="nodeCurrentChange"
                                :total="nodeParams.totalRecord"
                                :current-page="nodeParams.pageNo"
                                :page-size="nodeParams.pageSize"
                            >
                            </el-pagination>
                            </div>
                        </EPF-switchTitle>
                    </div>
                </el-tab-pane>
                </el-tabs>

                <EPF-switchTitle titles_h='业务模型' :shutOff='false' style="margin-top:25px;">
                    <div class="addRule" style="margin-top:25px;">
                        <span class="titleRule">业务模型</span>
                        <span class="button_bg" @click="addBusModel('add','')" style="float: right;">新增</span>
                    </div>
                    <el-table
                        :data="paginatorData"
                        border
                        
                        :header-cell-style="{background:'#f5f8fa',color:'#5f6264',fontWeight:'normal'}"
                        style="width: 100%">
                        <el-table-column
                        label="序号"
                        prop="id"
                        type="index"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="名称"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="businessTypeName"
                        label="业务类别"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="goodsTypeName"
                        label="交易物类别"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        min-width="180">
                        <template slot-scope="scope">
                            <el-button type="text" @click="addBusModel('upd',scope.row)">修改</el-button>
                            <el-button type="text" @click="deleteRuleFun(scope.row)">删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页控件 -->
                    <div class="epf_paging_fixe" style="text-align:right">
                        <el-pagination
                        background
                        layout="total,prev, pager, next,sizes,jumper"
                        :page-sizes="[5,10,15,20]"
                        @size-change="paginatorSizeChange"
                        @current-change="paginatorCurrentChange"
                        :total="paginatorParams.totalRecord"
                        :current-page="paginatorParams.pageNo"
                        :page-size="paginatorParams.pageSize"
                        >
                        </el-pagination>
                    </div>
                </EPF-switchTitle>
        </div>
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
            @close="deleteNodeYes = false"
            >
            <div>
                <p class="Pcontent">是否确认删除？</p>
            </div>
            <div class="btnBox">
                <div class="MapBtns" @click="deleteTransNode">确定</div>
                <div class="MapBtns deleteBtn" @click="deleteNodeYes = false">关闭</div>
            </div>
        </el-dialog>
        <!-- 竞买步骤不可删除 -->
        <el-dialog
            id="deleteRuleDialog"
            :modal="true"
            width="30%"
            top="30vh"
            left
            title='提示'
            :close-on-click-modal='false'
            :visible.sync="deleteBusiness"
            @close="deleteBusiness = false"
            >
            <div>
                <p>当前竞买步骤正被业务模型引用，不可删除</p>
            </div>
            <div class="btnBox">
                <div class="MapBtns" @click="markerDown">确定</div>
                <div class="MapBtns deleteBtn" @click="deleteBusiness = false">关闭</div>
            </div>
        </el-dialog>
        <!-- 节点不可删除 -->
        <el-dialog
            id="deleteNodeNo"
            :modal="true"
            width="20%"
            top="30vh"
            left
            title='提示'
            :close-on-click-modal='false'
            :visible.sync="deleteNodeNo"
            @close="deleteNodeNo = false"
            >
            <div>
                <p class="Pcontent">当前节点正被交易方式引用，不能删除。</p>
            </div>
            <div class="btnBox">
                <div class="MapBtns" @click="markerDown">确定</div>
                <div class="MapBtns deleteBtn" @click="deleteNodeNo = false">关闭</div>
            </div>
        </el-dialog>
        <!-- 交易方式不可删除 -->
        <el-dialog
            id="delTransaction"
            :modal="true"
            width="20%"
            top="30vh"
            left
            title='提示'
            :close-on-click-modal='false'
            :visible.sync="delTransaction"
            @close="delTransaction = false"
            >
            <div>
                <p class="Pcontent">当前节点正被业务模型引用，不能删除。</p>
            </div>
            <div class="btnBox">
                <div class="MapBtns" @click="markerDown">确定</div>
                <div class="MapBtns deleteBtn" @click="delTransaction = false">关闭</div>
            </div>
        </el-dialog>
        <!-- 业务模型删除提示 -->
        <el-dialog
            id="deleteRuleDialog"
            :modal="true"
            width="30%"
            top="30vh"
            left
            title='提示'
            :close-on-click-modal='false'
            :visible.sync="deleteRule"
            @close="deleteRule = false"
            >
            <p>确定要删除选择的业务模型 <span style="color:#ffa001" v-if="busObj">{{busObj.name}}</span>？</p>
            <div class="btnBox" v-if="busObj">
                <div class="MapBtns" @click="deleteRuleData(busObj.id)">确定</div>
                <div class="MapBtns deleteBtn" @click="deleteRule = false">关闭</div>
            </div>
        </el-dialog>
    </epf-container>
</template>
<script>
export default {
    name:'dispose',
    data(){
        return{
            activeTabs: 'pending',
            currentTabs: 'pending',
            // 竞买申请步骤
            dictionaryRules: '',//字典规则input内容
            // competeTableData: [{name: '字典规则', date: '123'}],//竞买table数据
            addTabel: {name: '', moduleUrl: ''},//竞买table增加行数据
            update: true, // 竞买修改添加行控制变量
            modify: true, // 竞买新增添加行控制变量
            //弹框********
            deleteRule: false,
            deleteBusiness: false,
            delTransaction:false,
            deleteNodeYes: false,
            deleteNodeNo: false,
            tab: 0,   //当前标签所在的位置
            paginatorData: [],//业务模型数据
            paginatorParams: {  //业务模型步骤
            pageNo: 1,
            pageSize: 5,
            totalRecord: 2,
            totalPage: 1
            },
            //初始化查询数据
            pendingData: [],

            competeName: '',//新增 竞买名
            pageAddress: '',//新增 页面地址

            pendingParams: {  //竞买申请步骤
            title: '',
            pageNo: 1,
            pageSize: 5,
            totalRecord: 2,
            totalPage: 1
            },
            processedData: [],
            processedParams: { //交易方式
            title: '',
            pageNo: 1,
            pageSize: 5,
            totalRecord: 2,
            totalPage: 1
            },
            nodeData: [],
            nodeParams: { //节点
            title: '',
            pageNo: 1,
            pageSize: 5,
            totalRecord: 2,
            totalPage: 1
            },
            index: -1, //点击修改的下标
            nodeID: '',//要删除的节点id
            busObj:{},
        }
    },
    created () {
        
        if (this.activeTabs == 'pending') {
            this.tab = 1
        } else if (this.activeTabs == 'processed') {
            this.tab = 2
        } else {
            this.tab = 3
        }
        //默认查询数据
        this.getTab()
        //查询业务模型的数据
        this.paginatorParamsSearch()
    },
    methods: {
      getTab () {
        //根据tab查询数据
        if (this.tab == 1) {
          this.pendingParams.page = this.pendingParams.pageNo
          this.pendingParams.rows = this.pendingParams.pageSize

          this.pendingParamsList(this.pendingParams)
        } else if (this.tab == 2) {
          this.processedParams.page = this.processedParams.pageNo
          this.processedParams.rows = this.processedParams.pageSize

          this.processedParamsList(this.processedParams)
        } else {
          this.nodeParams.page = this.nodeParams.pageNo
          this.nodeParams.rows = this.nodeParams.pageSize

          this.nodeParamsList(this.nodeParams)
        }
      },
      handleClick (val) {
        if (val.name == this.currentTabs) {
          return
        }
        this.currentTabs = val.name
        if (this.activeTabs == 'pending') {
          this.pendingParams.page = this.pendingParams.pageNo
          this.pendingParams.rows = this.pendingParams.pageSize

          this.pendingParamsList(this.pendingParams)
        } else if (this.activeTabs == 'processed') {
          this.processedParams.page = this.processedParams.pageNo
          this.processedParams.rows = this.processedParams.pageSize

          this.processedParamsList(this.processedParams)
        } else {
          this.nodeParams.page = this.nodeParams.pageNo
          this.nodeParams.rows = this.nodeParams.pageSize

          this.nodeParamsList(this.nodeParams)
        }
      },
      deleteRuleFun (row) { //删除业务模型
        this.deleteRule = true
        //当前行的数据直接储存到对象中
        this.busObj = row;
      },
      deletependingFun (row) {
        this.pendingCheck(row)
      },
      //竞买申请点击提交
      pendingSub () {
        //获取用户输入的数据
        this.modify = true
        //数据入库
        let addTabel = {
          name: this.competeName,
          moduleUrl: this.pageAddress
        }
        this.pendingParamsAdd(addTabel)
      },
      //竞买申请修改
      pendingUpd (index) {
        //判断是否在添加的状态
        if (!this.modify) {
          this.$message.error('请先完成添加的操作再执行此操作')
        }
        //显示输入框
        this.update = false
        //保存下标
        this.index = index
      },
      //竞买申请修改取消
      pendingExit () {
        this.update = true
        this.index = -1
      },
      //修改中其他行的操作事件
      pendingDisable () {
        if (!this.update) {
          this.$message.error('请先完成当前修改操作后，再进行该操作')
        }
      },
      markerDown () {
        this.deleteRule = false
        this.deleteBusiness = false
        this.deleteNodeNo = false
        this.deleteNodeYes = false
        this.delTransaction = false
      },
      addTransaction (type,row) { //新增&修改交易方式页面
        if (type != 'upd') {
          let title = "新增交易方式";
          let routerPath = '/system/trade/rule/views/dispose/mode';
          let item = {url:routerPath,menuname:title}
          //将当前点击的选项添加到vuex中
          this.$router.push({path:routerPath});
          this.$store.commit("ADD_TAB", item)
        } else {
          //获取所点击的节点ID，并且跳转页面
          console.log('获取的交易方式ID是：' + row.id)
          let title = "修改交易方式";
          let routerPath = '/system/trade/rule/views/dispose/mode?id=' + row.id;
          let item = {url:routerPath,menuname:title}
          //将当前点击的选项添加到vuex中
          this.$router.push({path:routerPath,query: {id: row.id}});
          this.$store.commit("ADD_TAB", item)
        }
      },
      addBusModel (type,row) { //新增&修改业务模型页面
        if (type != 'upd') {
          let title = "新增业务模型";
          let routerPath = '/system/trade/rule/views/dispose/business';
          let item = {url:routerPath,menuname:title}
          //将当前点击的选项添加到vuex中
          this.$router.push({path:routerPath});
          this.$store.commit("ADD_TAB", item)
        } else {
          let title = "修改业务模型";
          let routerPath = '/system/trade/rule/views/dispose/business?id=' + row.id;
          let item = {url:routerPath,menuname:title}
          //将当前点击的选项添加到vuex中
          this.$router.push({path:routerPath,query: {id: row.id}});
          this.$store.commit("ADD_TAB", item)
        }

      },
      addTrasNode () {  //新增节点页面
        let title = "新增节点";
        let routerPath = '/system/trade/rule/views/dispose/node';
        let item = {url:routerPath,menuname:title}
        //将当前点击的选项添加到vuex中
        this.$router.push({path:routerPath});
        this.$store.commit("ADD_TAB", item)
      },
      addTableData () { //新增竞买table添加行
        if (!this.update) {
          this.$message.error('请先完成修改的操作在进行添加的操作')
          return false
        }
        this.pageAddress = ''
        this.competeName = ''
        let addTabel = {
          name: this.competeName,
          moduleUrl: this.pageAddress
        }
        this.pendingData.push(addTabel)
        this.modify = false
      },
      delTabelData () { //删除竞买table新增行
        this.pendingData.pop()
        this.modify = true
      },
      dictionaryQuery () { //规则字典查询按钮
        if (this.dictionaryRules != '') {

        } else {
          this.$message.warning('名称不能为空')
        }
      },
      //分页处理开始
      processedSizeChange (val) {
        //交易方式每页条数改变
        this.processedParams.pageNo = 1
        this.processedParams.pageSize = val

        this.processedParamsSearch()
      },
      processedCurrentChange (val) {
        //交易方式页码改变
        this.processedParams.pageNo = val

        this.processedParamsSearch()
      },
      nodeSizeChange (val) {
        //节点每页条数改变
        this.nodeParams.pageNo = 1
        this.nodeParams.pageSize = val

        this.nodeParamsSearch()
      },
      nodeCurrentChange (val) {
        //节点页码改变
        this.nodeParams.pageNo = val

        this.nodeParamsSearch()
      },
      pendingSizeChange (val) {
        //竞买申请步骤每页条数改变
        this.pendingParams.pageNo = 1
        this.pendingParams.pageSize = val

        this.pendingParamsSearch()
      },
      pendingCurrentChange (val) {
        //竞买申请步骤页码改变
        this.pendingParams.pageNo = val

        this.pendingParamsSearch()
      },
      paginatorSizeChange (val) {
        //业务模型每页条数改变
        this.paginatorParams.pageNo = 1
        this.paginatorParams.pageSize = val

        this.paginatorParamsSearch()
      },
      paginatorCurrentChange (val) {
        //业务模型页码改变
        this.paginatorParams.pageNo = val

        this.paginatorParamsSearch()
      },
      //分页处理结束
      //查询处理开始
      processedParamsSearch () {
        //交易查询事件
        this.processedParams.page = this.processedParams.pageNo
        this.processedParams.rows = this.processedParams.pageSize

        this.processedParamsList(this.processedParams)
      },
      nodeParamsSearch () {
        //节点查询事件
        this.nodeParams.page = this.nodeParams.pageNo
        this.nodeParams.rows = this.nodeParams.pageSize

        this.nodeParamsList(this.nodeParams)
      },
      pendingParamsSearch () {
        if (!this.modify) {
          this.$message.error('请先操作完正在添加的数据在进行该操作！！')
          return false
        }
        if (!this.update) {
          this.update = true
        }
        //竞买申请步骤查询事件
        this.pendingParams.page = this.pendingParams.pageNo
        this.pendingParams.rows = this.pendingParams.pageSize

        this.pendingParamsList(this.pendingParams)
      },
      paginatorParamsSearch () {
        //业务模型查询事件
        this.paginatorParams.page = this.paginatorParams.pageNo
        this.paginatorParams.rows = this.paginatorParams.pageSize

        this.paginatorParamsList(this.paginatorParams)
      },
      //查询处理结束
      //列表数据 开始
      processedParamsList (Params) {
        //调用接口查询交易方式接口数据 
        this.$get(this.$API.EPF_TRADEENGINE.LOG.TRANS_JSON, Params).then(res => {
          // res 是返回结果
          if (res.code != 0) {
            this.$message.error(res.msg)
            return
          }
          this.processedParams.pageNo = res.pager.pageNo
          this.processedParams.pageSize = res.pager.pageSize
          this.processedParams.totalRecord = res.pager.totalRecord
          this.processedParams.totalPage = res.pager.totalPage
          //设置表格的数据
          this.processedData = res.pager.results
        })
      },
      nodeParamsList (Params) {
        //调用接口查询节点列表接口数据
        this.$get(this.$API.EPF_TRADEENGINE.LOG.TEMPLATE_JSON, Params).then(res => {
          // res 是返回结果
          if (res.code != 0) {
            this.$message.error(res.msg)
            return
          }
          this.nodeParams.pageNo = res.pager.pageNo
          this.nodeParams.pageSize = res.pager.pageSize
          this.nodeParams.totalRecord = res.pager.totalRecord
          this.nodeParams.totalPage = res.pager.totalPage
          //设置表格的数据
          this.nodeData = res.pager.results
        })
      },
      pendingParamsList (Params) {
        //调用接口查询竞买申请步骤列表接口数据
        this.$get(this.$API.EPF_TRADE.RULE.STEP_JSON, Params).then(res => {
          // res 是返回结果
          if (res.code != 0) {
            this.$message.error(res.msg)
            return
          }
          this.pendingParams.pageNo = res.pager.pageNo
          this.pendingParams.pageSize = res.pager.pageSize
          this.pendingParams.totalRecord = res.pager.totalRecord
          this.pendingParams.totalPage = res.pager.totalPage
          //设置表格的数据
          this.pendingData = res.pager.results
        })
      },
      paginatorParamsList (Params) {
        //业务模型查询节点列表接口数据
        this.$get(this.$API.EPF_TRADE.RULE.STEP_JSON, Params).then(res => {
          // res 是返回结果
          if (res.code != 0) {
            this.$message.error(res.msg)
            return
          }
          this.paginatorParams.pageNo = res.pager.pageNo
          this.paginatorParams.pageSize = res.pager.pageSize
          this.paginatorParams.totalRecord = res.pager.totalRecord
          this.paginatorParams.totalPage = res.pager.totalPage
          //设置表格的数据
          this.paginatorData = res.pager.results
        })
      },
      //列表数据结束
      //数据添加接口开始
      pendingParamsAdd (Params) {
        //调用接口添加竞买申请步骤数据
        this.$post(this.$API.EPF_TRADE.RULE.ADD_STEP, Params).then(res => {
          // res 是返回结果
          if (res.code != 0) {
            this.$message.error(res.msg)
            return
          }
          //提示信息
          this.$message.success('添加成功')
          //查询数据
          this.pendingParamsSearch()
        })
      },
      //添加数据接口结束
      //根据ID查询数据开始
      pendingParamsById (id) {
        //调用接口添加竞买申请步骤数据 
        this.$get(this.$API.EPF_TRADE.RULE.GET_STEP, {id: id}).then(res => {
          // res 是返回结果
          if (res.code != 0) {
            this.$message.error(res.msg)
            return
          }
        })
      },
      //根据ID查询数据结束
      //修改数据接口开始
      pendingEdit (row) {
        let self = this
        //调用接口修改竞买申请步骤数据 
        this.$post(this.$API.EPF_TRADE.RULE.EDIT_STEP, row).then(res => {
          // res 是返回结果
          if (res.code != 0) {
            self.$message.error(res.msg)
            return
          }
          //释放index
          self.index = -1
          //刷新列表查询数据
          self.pendingParamsSearch()
          //提示信息
          self.$message.success('修改成功')
        })
      },
      //修改数据接口结束
      //删除方法开始
      pendingDel (row) {
        let self = this
        //调用接口修改竞买申请步骤数据 
        this.$post(this.$API.EPF_TRADE.RULE.DEL_STEP, {id: row.id}).then(res => {
          // res 是返回结果
          if (res.code != 0) {
            self.$message.error(res.msg)
            return
          }
          //刷新列表查询数据
          self.pendingParamsSearch()
          //提示信息
          self.$message.success('删除成功')
        })
      },
      //删除方法结束
      //业务上需要请求接口的方法开始
      pendingCheck (row) {
        let self = this
        //deleteBusiness
        //通过ID判断该条数据是否被引用中
        //调用接口修改竞买申请步骤数据 
        this.$get(this.$API.EPF_TRADE.RULE.GET_DEL_STEP, {id:row.id}).then(res => {
          // res 是返回结果
          if (res.code != 0) {
            self.$message.error(res.msg)
            return
          }
          if (res.flag) {
            //不能被删除//todo deleteRuleDialog
            this.deleteBusiness = true
          } else {
            //可以被删除
            this.deleteBusiness = false
            this.pendingDel(row)
          }
        })
      },
      nodeCheck (row) {
        //判断当前节点是否可以被删除
        //checkTransNode 
        this.$get(this.$API.EPF_TRADEENGINE.LOG.CKECK_NODE, {id: row.id}).then(res => {
          // res 是返回结果
          if (res.code != 0) {
            this.$message.error(res.msg)
            return
          }
          //获取数据的状态
          if (res.state) {
            //不可以被删除
            this.deleteNodeNo = true
            this.deleteNodeYes = false
          } else {
            //可以被删除
            this.deleteNodeNo = false
            this.deleteNodeYes = true
            this.nodeID = row.id
          }
        })
      },
      deleteTransNode () {
        //调用删除接口进行数据的删除 
        this.$get(this.$API.EPF_TRADEENGINE.LOG.DEL_TEMPLATE, {id: this.nodeID}).then(res => {
          // res 是返回结果
          if (res.code != 0) {
            this.$message.error(res.msg)
            return
          }
          //关闭窗口，重新查询节点列表数据
          this.nodeParamsSearch()
          this.deleteNodeYes = false

          this.$message.success('删除成功')
        })
      },
      nodeUpd (row) {
        //获取所点击的节点ID，并且跳转页面
        console.log('获取的节点ID是：' + row.id)
        let title = "修改节点";
        let routerPath = '/system/trade/rule/views/dispose/node?id=' + row.id;
        let item = {url:routerPath,menuname:title}
        //将当前点击的选项添加到vuex中
        this.$router.push({path:routerPath,query: {id: row.id}});
        this.$store.commit("ADD_TAB", item)
      },
      TransactionCheck(row){
        //删除交易信息
        //调用接口判断关联表是否存在数据 
        this.$get(this.$API.EPF_TRADEENGINE.LOG.CKECK_TYPE, {id: row.id}).then(res => {
          // res 是返回结果
          if (res.code != 0) {
            this.$message.error(res.msg)
            return
          }
          //获取数据的状态
          if (res.isTransType) {
            //不可以被删除
            this.delTransaction = true
          } else {
            //可以被删除
            this.deleteNodeNo = false
            //调用接口进行删除操作 
            this.$get(this.$API.EPF_TRADEENGINE.LOG.DEL_TYPE, {id: row.id}).then(res2 => {
              // res 是返回结果
              if (res2.code != 0) {
                this.$message.error(res2.msg)
                return
              }
              this.$message.success('删除成功');
              this.processedParamsSearch();
            })
          }
        })
      },
      deleteRuleData(id){
        //根据业务模型删除数据的接口
        //调用接口进行删除操作 
        this.$post(this.$API.EPF_TRADE.RULE.DEL_MODEL, {id: id}).then(res2 => {
          // res 是返回结果
          if (res2.code != 0) {
            this.$message.error(res2.msg)
            return
          }
          this.deleteRule = false;
          this.$message.success('删除成功');
          //查新查询模板列表数据
          //查询业务模型的数据
          this.paginatorParamsSearch()
        })
      },
      //业务上需要请求接口的方法结束
    },
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
    .orange{
        border: 1px solid #ffa202;
        background-color: #ffa202;
        color: #fff;
    }
    .searchBox {
        border: solid 1px #ebeff5 !important;
        padding: 30px 25px;
        margin: 25px 0;
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
        display: inline-block;
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
        width: 120px;
        display: inline-block;
        background-color: #ffa100;
        color: white;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        margin-left: 20px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .MapBtns:active {
        transform: translateY(1px);
    }

    .btnBox {
        text-align: center;
        margin-top: 20px;
    }

    #deleteRuleDialog .el-dialog {
        margin-top: 30vh !important;
        width: 30% !important;
    }

    #deleteRuleDialog p {
        font-weight: 600;
        line-height: 20px;
    }

    .deleteBtn {
        border: solid 1px #dce0e6;
        color: #606365;
        background: #fff;
    }

    .Pcontent {
        text-align: center;
    }

    .tableBox {
        position: relative;
    }

    .modifyBox {
        width: 67%;
        position: absolute;
        bottom: 17px;
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