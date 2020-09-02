<template>
  <epf-container title='日期管理'>
    <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
      <div class="epf_toolbar">
        <el-row>
          <el-col :span="4" class="paddingBox">
            <el-input
              class="filterIpt"
              v-model="filterData.yearname"
              placeholder="请输入年份">
            </el-input>
          </el-col>
          <el-col :span="4" class="paddingBox">
            <el-input
              class="filterIpt"
              v-model="filterData.rqtime"
              placeholder="请输入日期">
            </el-input>
          </el-col>
          <el-col :span="4" class="paddingBox">
            <el-select
              v-model="filterData.datetypecode"
              placeholder="全部"
              style="width:100%"
              @change="transactionSelect()">
                <el-option
                  v-for="item in datetypecode"
                  :ref="item.label"
                  :id="item.label"
                  :dictKey="item.label"
                  :label="item.label"
                  :value="item.value"
                  :key="item.label">
                </el-option>
              </el-select>
          </el-col>
          <el-col :span="6" class="paddingBox">
            <el-date-picker
              v-model="checkDate"
              type="daterange"
              style="width:100%"
              unlink-panels
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="起始日期"
              end-placeholder="截止日期"
              @change="selectCheckDate"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-col>
          <el-col :span="3" class="paddingBox epf_align_right">
            <button class="epf_btn epf_btn_bg" @click="searchData">查询</button>
            <button class="epf_btn epf_btn_def" @click="resetFilter">重置</button>
          </el-col>
          <el-col :span="3" class="paddingBox epf_align_right">
            <button class="epf_btn epf_btn_bg" @click="add">新增</button>
            <button class="epf_btn epf_btn_def" @click="deldata">删除</button>
          </el-col>
        </el-row>
      </div>
      <div class="epf_fr_content epf_no_border" :style="{height:boxHeight - 55 +'px'}">
        <el-table
          :data="tableData"
          style="width: 100%"
          :height="boxHeight-120"
          border
          v-loading="loading"
          element-loading-text="数据加载中"
          element-loading-background="rgba(255, 255, 255,0.95)">
          <el-table-column
            label="序号"
            type="index"
            min-width="180">
            <template slot-scope="scope">
              <span hit size="medium">
                {{ pageSize*(pageNo-1)+scope.$index+1 }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="年份" min-width="180">
            <template slot-scope="scope">
              <span hit size="medium">{{ scope.row.yearname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="日期" min-width="180">
            <template slot-scope="scope">
              <span hit size="medium">{{ scope.row.specificdate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="星期" min-width="180">
            <template slot-scope="scope">
              <span hit size="medium">{{ scope.row.weekname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="日期状态" min-width="180">
            <template slot-scope="scope">
              <span hit size="medium">{{ scope.row.datetype }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" align="center" min-width="80" >
            <template slot-scope="scope">
              <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row)">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="epf_paging_fixe">
          <el-pagination
            background
            layout="prev, pager, next,sizes,jumper"
            :page-sizes="[5,10, 15, 20]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="totalRecord"
            :page-size="pageSize"
            :current-page="pageNo">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 新增弹窗 -->
    <el-dialog title="新增" class="companyInfo" width="700px" :visible.sync="addsysdatemanage" :append-to-body='true'>
      <div class="middleBox">
        <el-form :model="sysdatemanage" :rules="rules" ref="sysdatemanage" label-width="50px" label-position="left"
                 size="small">
          <el-form-item label="年份" prop="yearname">
            <el-input v-model="sysdatemanage.yearname"  type="number" maxlength="4" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="middleBox_btn" style="text-align:center;">
        <el-button type="success" plain @click="addData('sysdatemanage')">保存</el-button>
        <el-button type="warning" plain @click="addsysdatemanage = false" style="padding-left: 20px;">关闭</el-button>
      </div>
    </el-dialog>
    <!--删除弹窗-->
    <el-dialog title="删除年份下的日期" class="companyInfo" width="700px" :visible.sync="delsysdatemanage" :append-to-body='true'>
      <div class="middleBox">
        <el-form :model="sysdatemanage" :rules="rules" ref="sysdatemanage" label-width="50px" label-position="left"
                 size="small">
          <el-form-item label="年份" prop="yearname">
            <el-select
              v-model="sysdatemanage.yearname"
              placeholder="...请选择..."
              style="width:100%"
              @change="transactionSelect()">
              <el-option
                v-for="item in getyearnamelist"
                :ref="item.label"
                :id="item.label"
                :dictKey="item.label"
                :label="item.label"
                :value="item.value"
                :key="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="middleBox_btn" style="text-align:center;">
        <el-button type="success" plain @click="delData('sysdatemanage')">保存</el-button>
        <el-button type="warning" plain @click="delsysdatemanage = false" style="padding-left: 20px;">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑" class="companyInfo" width="700px" :visible.sync="editsysdatemanage" :append-to-body='true'>
      <div class="middleBox">
        <el-form :model="sysdatemanage" :rules="rules" ref="sysdatemanage" label-width="100px" label-position="left"
                 size="small">
          <el-form-item label="年份：" prop="yearname">
            {{sysdatemanage.yearname}}
          </el-form-item>
          <el-form-item label="日期：" prop="weekname">
            {{sysdatemanage.specificdate}}
          </el-form-item>
          <el-form-item label="星期：" prop="datetype">
            {{sysdatemanage.weekname}}
          </el-form-item>
          <el-form-item label="日期状态：" prop="datetype">
          <el-select
            v-model="sysdatemanage.datetypecode"
            placeholder="请选择"
            style="width:100%"
            @change="transactionSelect()">
            <el-option
              v-for="item in datetypecode"
              :ref="item.label"
              :id="item.label"
              :dictKey="item.label"
              :label="item.label"
              :value="item.value"
              :key="item.label"
            ></el-option>
          </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="middleBox_btn" style="text-align:center;">
        <el-button type="success" plain @click="addData('sysdatemanage')">保存</el-button>
        <el-button type="warning" plain @click="editsysdatemanage = false" style="padding-left: 20px;">关闭</el-button>
      </div>
    </el-dialog>
  </epf-container>
</template>

<script>
import userSelection from '../../../../../../components/userSelection'

export default {
  name: "date",
  components: {
    userSelection
  },
  data() {
    return {
      boxHeight: 700,

      landRes: '',
        useRes: '',
        filterData: {},
        //  表格数据
        tableData: [],
        //  编辑 表单验证
        rules: {
        },
        pageNo: 1,// 当前页
        pageSize: 10,// 当前每页条数
        totalPage: 1,// 总页数
        totalRecord: 1,// 总条数，
        addsysdatemanage: false,//  控制新增弹窗
        editsysdatemanage: false,//  控制编辑弹窗
        delsysdatemanage: false,//  控制删除弹窗
        editorPopup: false,//  控制编辑弹窗
        currentEditorIndex: 0,//  当前选中编辑的下表
        loading: true, //控制loading动画显示隐藏
        sysdatemanage: {yearname:''},
        searchInfo: {},
        checkDate: [],
          pickerOptions: {
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
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                      picker.$emit('pick', [start, end]);
                  }
              }]
          },
          datetypecode: [
              {
                  value: '0',
                  label: '工作日'
              },{
                  value: '1',
                  label: '节假日'
              },{
                  value: '2',
                  label: '调休补班'
              },{
                  value: '3',
                  label: '休息日'
              }],
          params: {},
          getyearnamelist: [],
    }
  },
  created() {
    this.boxHeight = window.innerHeight - 250
    this.searchInfo['page'] = this.pageNo
    this.searchInfo['rows'] = this.pageSize
    this.getList()
  },
  mounted(){
    
  },
  methods: {
    //新增按钮点击事件
      add () {
        this.addsysdatemanage = true
        this.sysdatemanage = {}
      },
        //删除按钮点击事件
        deldata() {
            var that = this
            //调用添加接口传输数据
            that.$post(this.$API.EPF_ADMIN.SYS_DATE.QUERY, {}).then(res => {
                if (res.code != '0') {
                    that.$message.error(res.msg)//失败
                    return
                }
                //结束
                this.sysdatemanage = {}
                this.sysdatemanage = res.list

                if(res.list.length>0){
                    for(let i=0;i<res.list.length;i++){
                        this.getyearnamelist.push({
                            value: res.list[i].YEARNAME,
                            label: res.list[i].YEARNAME
                        })
                    }
                }
                this.delsysdatemanage = true

            })
        },
        transactionSelect(mode,event){
        },
        selectCheckDate(){//选择审核日期范围后的回调
            this.filterData.beginCheckDate = this.checkDate[0];
            this.filterData.endCheckDate = this.checkDate[1];
        },
      //  新增 确定 点击事件
      addData (sysdatemanage) {
        var that = this
        if(that.sysdatemanage.yearname!=""&&that.sysdatemanage.yearname!=undefined){
            this.sysdatemanage["cjtime"]=""
            //调用添加接口传输数据
            that.$post(this.$API.EPF_ADMIN.SYS_DATE.ADD, this.sysdatemanage).then(res => {
                let result=eval('('+res.result+')')
                if (result.code != '0') {
                    that.$message.error(result.msg)//失败
                    return
                }
                if(result.type=='add'){
                    //结束
                    this.addsysdatemanage = false
                }
                if(result.type=='edit'){
                    //结束
                    this.editsysdatemanage = false
                }
                //this.$ref[sysdatemanage].resetFields()
                this.$message.success(result.msg)
                this.getList()
            })
        }else{
            that.$message.error('请输入年份')//失败
            return
        }
      },
      // 删除弹框的保存
        delData (sysdatemanage) {
            var that = this
            if(that.sysdatemanage.yearname!=""&&that.sysdatemanage.yearname!=undefined){
                //调用添加接口传输数据
                that.$post(this.$API.EPF_ADMIN.SYS_DATE.DEL_SYS, this.sysdatemanage).then(res => {
                    if (res.code != '0') {
                        that.$message.error(res.msg)//失败
                        return
                    }
                    //结束
                    this.delsysdatemanage = false
                    // this.$ref[sysdatemanage].resetFields()
                    this.$message.success(res.msg)
                    this.getList()
                })
            }else{
                that.$message.error('请选择要删除年份的日期数据！')//失败
                return
            }
        },
//  查询 点击事件
      searchData () {
        var that = this
        var json = {}
         json['yearname'] = this.filterData.yearname;
         json['beginCheckDate'] = this.filterData.beginCheckDate;
         json['endCheckDate'] = this.filterData.endCheckDate;
         json['datetypecode'] = this.filterData.datetypecode;
          json['rqtime'] = this.filterData.rqtime;

        //把json对象转为json字符串
        var filters = JSON.stringify(json)
        //插入搜索条件
        that.searchInfo['filterData'] = filters
        that.getList()
      },
//  重置 点击事件
      resetFilter () {
        this.filterData = {}
        this.checkDate=[]
        var that = this
        var json = {}
        var filters = JSON.stringify(json)
        that.searchInfo['filterData'] = filters
        that.getList()
      },
//  编辑 点击事件
      handleEdit (index, row) {
        this.currentEditorIndex = index
        var id = row.id
        this.getObject(id)
        //显示编辑层
        this.editorPopup = true
      },

//  编辑  提交
      editorSubmit (sysdatemanage) {
        var that = this
        // this.$ref[sysdatemanage].validate((valid) => {
        //     if (valid) {
        //调用修改接口传输数据
        that.$post(this.$API.EPF_ADMIN.SYS_DATE.EDIT, that.sysdatemanage).then(res => {
          if (res.code != '0') {
            that.$message.error(res.msg)//失败
            return
          }
          //结束
          this.editorPopup = false
          this.$ref[sysdatemanage].resetFields()
          this.$message.success('修改成功!')
          this.getList()
        })
        //     } else {
        //         return false;
        //     }
        // });
      },
//  确定 删除 点击事件
      delOneData (index, row) {
        var that = this
        //调用添加接口传输数据
        that.$post(this.$API.EPF_ADMIN.SYS_DATE.DELETE, {id: row.id}).then(res => {
          if (res.code != '0') {
            that.$message.error(res.msg)//失败
            return
          }
          //结束
          this.$message.success('删除成功!')
          //  关闭删除提示框
          this.$ref[`popover2-${index}`].doClose()
          this.getList()
        })
      },
//  每页条数改变时触发
      handleSizeChange (val) {
        this.pageSize = val
        this.searchInfo['page'] = this.pageNo
        this.searchInfo['rows'] = val
        this.getList()
      },
//  翻页时触发
      handleCurrentChange (val) {
//获取当前页
        this.searchInfo['page'] = val
        this.pageNo = val
        this.searchInfo['rows'] = this.pageSize
        this.getList()
      },
      getList () {
        let that = this
        that.$post(this.$API.EPF_ADMIN.SYS_DATE.JSON, this.searchInfo).then(res => {
          if (res.code != '0') {
            that.$message.error(res.msg)//失败
            return
          }
          //返回的数据
          that.tableData = res.pager.results
          //数据条数
          that.totalRecord = res.pager.totalRecord
          //总页数
          that.totalPage = res.pager.totalPage
          //隐藏进度条
          this.loading = false
        })
      },
      getObject (id) {
        var that = this
        //调用添加接口传输数据
        that.$post(this.$API.EPF_ADMIN.SYS_DATE.MANAGE, {id: id}).then(res => {
          if (res.code != '0') {
            that.$message.error(res.msg)//失败
            return
          }
          //结束
          this.sysdatemanage = {}
          this.sysdatemanage = res.sysdatemanage
        })
      },
        //编辑功能
        handleEdit (index, row) {
            let self = this
            self.editsysdatemanage = true
            this.getObject(row.id)
        }
    
  }
}
</script>
<style lang="less" scoped>
.paddingBox{
  padding: 0 20px;
}
</style>
