<template>
  <div class="page-body">
    <el-row class="searchBox">
      <el-col :span="1">
        <span class="filter_title">名称 :</span>
      </el-col>
      <el-col :span="6">
        <el-input v-model="processedParams.name" placeholder="请输入名称"></el-input>
      </el-col>
      <el-col :span="2">
        <span class="filter_title">交易方式类型 :</span>
      </el-col>
      <el-col :span="6">
        <selectInput v-model="processedParams.transType" :groupCode="'trans_type'"
                     :default="processedParams.transType"></selectInput>
      </el-col>
      <el-col :span="2" style="margin-left:30px;">
        <span class="filter_title">是否网上交易 :</span>
      </el-col>
      <el-col :span="6">
        <el-select v-model="processedParams.isOnlineTrans" placeholder="请选择">
          <el-option label="是" :value="0"></el-option>
          <el-option label="否" :value="1"></el-option>
        </el-select>
      </el-col>
    </el-row>

    <div class="addRule" style="margin-top:25px;">
      <span class="titleRule">节点设置</span>
      <div class="button_bg" style="margin:0 0 0 25px;float:right;" @click="addNode">新增</div>
      <div class="button_bg" style="margin:0;float:right;" @click="choiceNode">选择节点</div>
    </div>

    <el-table
      :data="tableData"
      border
      :header-cell-style="{background:'#f5f8fa',color:'#5f6264',fontWeight:'normal'}"
      style="width: 100%">
      <el-table-column
        prop="id"
        type="index"
        label="节点编号"
        width="180">
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
          <el-button type="text" @click="removeData(scope.$index)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top:30px;">
      <div class="MapBtns" @click="putTransaction">确定</div>
      <div class="MapBtns deleteBtn" @click="exitTransaction">取消</div>
    </div>

    <!-- 选择节点 -->
    <el-dialog
      id="choiceNodeBox"
      :modal="true"
      width="50%"
      top="20vh"
      left
      title='提示'
      :close-on-click-modal='false'
      :visible.sync="choiceNodeBox"
      @close="choiceNodeBox = false"
    >
      <div>
        <el-table
          :data="nodeData"
          border
          :header-cell-style="{background:'#f5f8fa',color:'#5f6264',fontWeight:'normal'}"
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            fixed
            width="55">
          </el-table-column>
          <el-table-column
            prop="id"
            type="index"
            label="节点编号"
            width="180">
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
              <span v-if="scope.row.isoffer == 0">否</span>
              <span v-else-if="scope.row.isoffer == 1">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column
            background
            layout="total,prev, pager, next,sizes,jumper"
            :page-sizes="[5,10,15,20]"
            @size-change="nodeSizeChange"
            @current-change="nodeCurrentChange"
            :total="nodeParams.totalRecord"
            :current-page="nodeParams.pageNo"
            :page-size="nodeParams.pageSize"
          >
          </el-table-column>
        </el-table>

        <div style="text-align: center;margin-top:25px;">
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
      </div>
      <div class="btnBox">
        <div class="MapBtns" @click="nodeParamsTrue">确定</div>
        <div class="MapBtns deleteBtn" @click="choiceNodeBox = false">关闭</div>
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
        <div class="MapBtns" @click="markerDown">确定</div>
        <div class="MapBtns deleteBtn" @click="deleteNodeYes = false">关闭</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    name: 'addTransactionRule',
    components: {},
    data () {
      return {
        processedParams: {}, //交易方式收集数据对象
        searchContent: '',
        value: '',
        tableData: [],
        deleteNodeYes: false,
        choiceNodeBox: false,
        nodeData: [],
        nodeParams: { //节点
          title: '',
          pageNo: 1,
          pageSize: 5,
          totalRecord: 2,
          totalPage: 1
        },
        multipleSelection: '',
      }
    },
    created () {

    },
    mounted () {
      //获取的节点ID
      if (this.$route.query.id) {
        //调用接口进行页面数据的查询
        // nodeParams:{}, //节点参数收集对象
        // transElements:[],  //网关配置集合
        this.$get('/epf-tradeengine/transtransactiontype/getTransTransactionType', {id: this.$route.query.id}).then(res => {
          // res 是返回结果
          if (res.code != 0) {
            this.$message.error(res.msg)
            return
          }
          console.log('获取到的数据是：', res.transTransactionTypeEntity)
          //取出相关的数据进行赋值
          this.processedParams = res.transTransactionTypeEntity
          this.tableData = this.processedParams.transNodes
        })
      }
    },
    methods: {
      ...mapActions(['setTabsList']),
      addNode () {
        let title = '新增节点'
        let routerPath = '/addTransactionNode'
        let tabObj = {title, routerPath}
        this.setTabsList(tabObj)
        this.$router.push({path: '/addTransactionNode'})
      },
      choiceNode () {
        this.choiceNodeBox = true
        this.nodeParamsSearch()
      },
      removeData (index) {
        // this.deleteNodeYes = true
        this.$confirm('是否确认移除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '关闭',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(index, 1)
        }).catch(() => {
        })
      },
      markerDown () {
        //移除节点的确认方法
        console.log('移除节点的确认方法')
      },
      putTransaction () {
        //确认添加节点的方法
        console.log('确认添加节点的方法')
        //交易方式添加接口传参
        let url = ''
        let Params = {}
        let message = ''
        let table = this.tableData
        let nodes = ''
        //循环表格数据
        for (var j = 0; j < table.length; j++) {
          nodes = nodes + table[j].id + ','
        }
        if (this.processedParams.id) {
          message = '修改成功'
          url = '/epf-tradeengine/transtransactiontype/editTransTransactionType'
          Params = {
            'transAllJson': {
              'transTypeJson': {
                'id': this.processedParams.id,
                'name': this.processedParams.name,
                'transType': this.processedParams.transType,
                'isOnlineTrans':this.processedParams.isOnlineTrans,
                'transNodeIds': nodes
              }
            }
          }
        } else {
          message = '添加成功'
          url = '/epf-tradeengine/transtransactiontype/addTransTransactionType'
          Params = {
            'transAllJson': {
              'transTypeJson': {
                'name': this.processedParams.name,
                'transType': this.processedParams.transType,
                'isOnlineTrans':this.processedParams.isOnlineTrans,
                'transNodeIds': nodes
              }
            }
          }
        }
        this.$useAppend(url, {
          transTypeAndNode: Params
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
      //节点弹出层操作开始
      nodeParamsSearch () {
        //节点查询事件
        this.nodeParams.page = this.nodeParams.pageNo
        this.nodeParams.rows = this.nodeParams.pageSize

        this.nodeParamsList(this.nodeParams)
      },
      nodeParamsList (Params) {
        //调用接口查询节点列表接口数据
        this.$get('/epf-tradeengine/transnodetemplate/getTransNodeTemplateJson', Params).then(res => {
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
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      nodeParamsTrue () {
        //节点点击确定触发的事件
        // console.log('选中的ID是：',this.multipleSelection);
        let table = this.tableData
        if (!this.tableData) {
          this.tableData = []
          table = this.tableData
        }
        //判断该节点是否可以加入到当前的交易方式中
        for (var i = 0; i < this.multipleSelection.length; i++) {
          let id = this.multipleSelection[i].id
          //判断该节点是否可以插入到对象中
          for (var j = 0; j < table.length; j++) {
            if (table[j].id) {
              let mid = table[j].id
              if (mid == id) {
                this.$message.error('存在重复的节点，请重新选择')
                this.choiceNodeBox = false
                this.multipleSelection = []
                return false
              }
            }
          }
        }
        //完全没有问题，循环变量插入到当前表格数据中
        for (var i = 0; i < this.multipleSelection.length; i++) {
          table.push(this.multipleSelection[i])
        }
        //完成中后关闭弹窗
        this.choiceNodeBox = false
        this.multipleSelection = []
        return true
      }
      //节点弹出层操作结束
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
</style>
