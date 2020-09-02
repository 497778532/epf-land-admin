<template>
  <epf-container title='字典管理'>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
          <div class="epf_toolbar">
            <el-row>
              <el-col :span="10">
                <button class="epf_btn epf_btn_bg"
                  @click="deleteData">
                  删 除
                </button>
                <button class="epf_btn epf_btn_bg"
                  @click="showUpdate">
                  修 改
                </button>
                <button class="epf_btn epf_btn_def"
                  @click="showAdd">
                  添 加
                </button>
              </el-col>
              <el-col :span="14" class="epf_box_title">
                <el-input
                  placeholder="请输入内容"
                  v-model="searchData"
                  class="inputBox"
                  clearable
                  highlight-current>
                  <el-button slot="append" @click="init">
                    搜索
                  </el-button>
                </el-input>
              </el-col>
            </el-row>
          </div>
          <div class="epf_fr_content epf_no_border" :style="{height:boxHeight - 55 +'px'}">
            <el-table
              :data="dictGroups"
              v-loading="loadingOne"
              element-loading-text="数据加载中"
              element-loading-background="rgba(255, 255, 255,0.95)"
              @row-click="dictList"
              :height="boxHeight-55"
              style="width: 100%"
              tooltip-effect="dark"
              border
              @selection-change="handleSelectionChange"
              :highlight-current-row="true">
              <el-table-column
                type="selection"
                style="cursor: pointer;"
                min-width="50">
              </el-table-column>
              <el-table-column
                property="code"
                label="分组标识"
                min-width="120">
                <template slot-scope="scope">
                  <span >{{ scope.row.code }}</span>
                </template>
              </el-table-column>
              <el-table-column
                property="name"
                label="分组名称"
                min-width="100">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
          <div class="epf_toolbar">
            <button class="epf_btn epf_btn_bg"
              @click="deleteDict">
              删 除
            </button>
            <button class="epf_btn epf_btn_bg"
              @click="showDict">
              修 改
            </button>
            <button class="epf_btn epf_btn_def"
              @click="showAddDict">
              添 加
            </button>
            <button class="epf_btn epf_btn_def"
              @click="cleanRedis">
              清空缓存
            </button>
          </div>
          <div class="epf_fr_content contents epf_no_border" :style="{height:boxHeight - 55 +'px'}">
            <el-table
              :data="data"
              v-loading="loadingToW"
              element-loading-text="数据加载中"
              element-loading-background="rgba(255, 255, 255,0.95)"
              :height="boxHeight-55"
              style="width: 100%"
              tooltip-effect="dark"
              border
              @selection-change="handleSelectionChange1"
              :highlight-current-row="true"
              row-key="id">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="dictKey"
                label="字典Key"
                sortable
                width="180">
              </el-table-column>
              <el-table-column
                prop="dictValue"
                label="字典Value"
                sortable
                width="180">
              </el-table-column>
              <el-table-column
                prop="zhCn"
                label="中文名称">
              </el-table-column>
              <el-table-column
                prop="enUs"
                label="英文名称">
              </el-table-column>
              <el-table-column
                prop="dictOrder"
                label="排序">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 添加分组 -->
    <el-dialog :append-to-body="true" title="添加分组" :visible.sync="dialogFormVisible">
      <el-form :model="group" :rules="rules" ref="group">
        <el-form-item label="分组标识" prop="code" :label-width="formLabelWidth">
          <el-input v-model="group.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分组名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="group.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="insert">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改分组 -->
    <el-dialog :append-to-body="true" title="修改分组" :visible.sync="dialogUpdate">
      <el-form :model="group" :rules="rules" ref="group">
        <el-form-item label="分组标识" prop="code" :label-width="formLabelWidth">
          <el-input v-model="group.code" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分组名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="group.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdate = false">取 消</el-button>
        <el-button type="primary" @click="editGroup">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加字典 -->
    <el-dialog :append-to-body="true" title="添加字典" :visible.sync="dialogAddDict">
      <el-form :model="dict" :rules="rulesTwo" ref="dict">
        <el-form-item label="字典key" prop="dictKey" :label-width="formLabelWidth">
          <el-input v-model="dictKey"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典value" prop="dictValue" :label-width="formLabelWidth">
          <el-input v-model="dict.dictValue" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="中文名称" prop="zhCn" :label-width="formLabelWidth">
          <el-input v-model="dict.zhCn" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="英文名称" prop="enUs" :label-width="formLabelWidth">
          <el-input v-model="dict.enUs" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input type="number" v-model="dict.dictOrder"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="父节点" :label-width="formLabelWidth">
          <el-input v-model="parentName" :disabled="true" style="float:left; width:90%"></el-input>
          <el-button @click="checkParent" style="float:left; width:10%">选择</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddDict = false">取 消</el-button>
        <el-button type="primary" @click="addDict">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 选择父节点 -->
    <el-dialog :append-to-body="true" title="选择父节点" :visible.sync="dialogParentCheck">
      <el-form>
        <el-tree
          :data="data"
          :props="defaultProps"
          node-key="id"
          @node-click="handleNodeClick"
          :expand-on-click-node="false">
        </el-tree>
      </el-form>
    </el-dialog>
    <!-- 修改字典 -->
    <el-dialog :append-to-body="true" title="修改字典" :visible.sync="dialogEditDict">
      <el-form :model="dict" :rules="rulesTwo" ref="dict">
        <el-form-item label="字典key" prop="dictKey" :label-width="formLabelWidth">
          <el-input v-model="dict.dictKey"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典value" prop="dictValue" :label-width="formLabelWidth">
          <el-input v-model="dict.dictValue" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="中文名称" prop="zhCn" :label-width="formLabelWidth">
          <el-input v-model="dict.zhCn" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="英文名称" prop="enUs" :label-width="formLabelWidth">
          <el-input v-model="dict.enUs" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="dict.dictOrder"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="父节点" :label-width="formLabelWidth">
          <el-input v-model="parentName" :disabled="true" style="float:left; width:90%"></el-input>
          <el-button @click="checkParent" style="float:left; width:10%">选择</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditDict = false">取 消</el-button>
        <el-button type="primary" @click="editDict">确 定</el-button>
      </div>
    </el-dialog>
  </epf-container>
</template>

<script>
export default {
  name: "area",
  data() {
    return {
      boxHeight: 700,
      rules: {
        name: [
          { required: true, message: '请输入分组名称', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入分组标识', trigger: 'blur' },
        ]
      },
      rulesTwo: {
        dictKey: [
          { required: true, message: '请输入字典key', trigger: 'blur' },
        ],
        dictValue: [
          { required: true, message: '请输入字典value', trigger: 'blur' },
        ],
        zhCn: [
          { required: true, message: '请输入中文名称', trigger: 'blur' },
        ],
        enUs: [
          { required: true, message: '请输入英文名称', trigger: 'blur' },
        ]
      },
      searchData:'',
      menuListHeight:100,
      dialogFormVisible: false,
      dialogUpdate: false,
      dialogAddDict: false,
      dialogEditDict: false,
      dialogParent: false,
      dialogParentCheck: false,
      group: {'code': '', 'name': ''},
      dictGroups: [],
      selectGroups: [],
      selectDicts: [],
      formLabelWidth: '120px',
      groupId: "",
      code:"",
      dict: {},
      data: [],
      loadingOne:false,
      loadingToW:false,
      restaurants: [],
      parentName: '',
      parentId: '0',
      refIsCheck: false,
      dictKey: "",
      defaultProps: {
        children: 'children',
        label: 'zhCn',
        id: 'dictValue'
      },
    }
  },
  created() {
    this.boxHeight = window.innerHeight - 250
  },
  mounted(){
    this.init()
  },
  methods: {
    createKey () {
      const _this = this
      let code = this.code
      let dict = {}
      var url = this.$API.EPF_ADMIN.DICT.GET_DIC + code
      let data = new FormData()
      this.$get(url, data).then(res => {
        if (res.code === 0) {
          _this.dictKey = res.dictKey
        } else {
          _this.$message.error(res.msg)
        }
      })
      .catch(res => {
        _this.$message.error(res.msg)
      })
    },
    init () {
      let _this = this
      this.loadingOne = true
      var url = this.$API.EPF_ADMIN.DICT.SELECT
      let data = new FormData()
      data.append('keyword',_this.searchData)
      this.$useAppend(url,data).then(res => {
        if (res.code === 0) {
          _this.dictGroups = res.dictGroupList
          _this.loadingOne = false
        } else {
          _this.$message.error(res.msg)
          _this.loadingOne = false
        }
      }).catch(res => {
        _this.$message.warning(res.msg)
        _this.loadingOne = false
      })
      this.queryDictList("aaaaa");
    },
    insert () {
      let that = this
      var url = this.$API.EPF_ADMIN.DICT_GROUP.ADD
      if(this.group.code == '' || this.group.code == null){
        this.$message.warning('请输入分组标识')
        return
      }
      if(this.group.name == '' || this.group.name == null){
        this.$message.warning('请输入分组名称')
        return
      }
      let dictGroup = {'code': this.group.code, 'name': this.group.name}
      this.$post(url,dictGroup)
        .then(res => {
          if (res.code === 0) {
            this.groupId = res.group.id;
            this.code = res.group.code;
            this.$message.success("保存成功!");
            that.dialogFormVisible = false
          } else {
            this.$message.error(res.msg)
            that.dialogFormVisible = false
          }
        }).catch(res => {})
      this.dictGroups.push(this.group)
    },
    // 行单击事件
    dictList (row) {
      if(row.id){
        this.groupId = row.id
      }
      this.code = row.code
      let code = row.code
      this.refIsCheck = true;
      this.queryDictList(code)
    },
    queryDictList (code){
      this.data = [];
      this.loadingToW = true
      let that = this
      let url = this.$API.EPF_ADMIN.DICT.GET_TREE
      let data = {'code': code, 'parentId': ''}
      this.$get(url, data).then(res => {
          if (res.code === 0) {
            if(res.treeTableData != ''){
              that.data = JSON.parse(res.treeTableData)
              this.loadingToW = false
            }else{
              that.data = []
              this.loadingToW = false
            }
          } else {
            that.$message.warning(res.msg)
            this.loadingToW = false
          }
        })
    },
    // 左边数据添加
    showAdd () {
      this.group= {}
      this.dialogFormVisible = true
    },
    handleSelectionChange (val) {
      this.selectGroups = val;
    },
    // 左边数据删除
    deleteData () {
      let that = this
      if(this.selectGroups.length < 1){
        this.$message.warning('请选择要删除的数据！')
        return
      }else{
        let ids = ""
        for(var i = 0; i < this.selectGroups.length; i++){
          ids += this.selectGroups[i].id+","
        }
        let url = this.$API.EPF_ADMIN.DICT_GROUP.DEL
        let data = {'id': ids}
        this.$confirm('确定要删除吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$post(url,data)
          .then(res => {
            if (res.code === 0) {
              that.$message.success("删除成功!")
              that.init()
            } else {
              that.$message.error(res.msg)
            }
          })
        }).catch(() => {});
      }

    },
    // 左边数据修改
    showUpdate () {
      if(this.selectGroups.length < 1){
        this.$message.warning('请选择要修改的数据！')
        return
      }else if(this.selectGroups.length > 1){
        this.$message.warning('不能同时进行多条数据修改，请选择一条！')
        return
      }else{
        this.group = {}
        let id = "";
        if(this.selectGroups[0].id){
          id = this.selectGroups[0].id
        }else{
          id = this.groupId;
        }
        this.queryGroup(id)
        this.dialogUpdate = true
      }
    },
    // 修改分组
    editGroup () {
      let that = this
      var url = this.$API.EPF_ADMIN.DICT_GROUP.EDI
      if(this.group.code == '' || this.group.code == null){
        this.$message.warning('请输入分组标识')
        return
      }
      if(this.group.name == '' || this.group.name == null){
        this.$message.warning('请输入分组名称')
        return
      }
      let id = "";
        if(this.selectGroups[0].id){
          id = this.selectGroups[0].id
        }else{
          id = this.groupId;
        }
      let dictGroup = {'id': id, 'code': this.group.code, 'name': this.group.name}
      this.$post(url,dictGroup).then(res => {
          if (res.code === 0) {
            that.$message.success("保存成功!")
            that.dialogUpdate = false;
            that.init();
          } else {
            that.$message.error(res.msg)
            that.dialogUpdate = false;
          }
        })
        .catch(res => {})
    },
    // 传递修改数据
    queryGroup (id) {
      let that = this
      var url = this.$API.EPF_ADMIN.DICT_GROUP.INOF + id
      this.$get(url).then(res => {
          if (res.code === 0) {
            that.group = res.dictGroup
          } else {
            that.$message.warning(res.msg)
          }
        })
        .catch(res => {
          that.$message.warning(res.msg)
        })
    },
    // 清空缓存
    cleanRedis() {
      let that =this
      let url = this.$API.EPF_ADMIN.DICT.CLEAN
      this.$confirm('确定要清空redis缓存吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.$post(url,null).then(res => {
          if(res.code === 0){
            that.$message.success("清空成功!")
          }else{
            that.$message.error(res.msg)
          }
        })
      });
    },
    // 右边数据添加
    showAddDict () {
      if(this.code==""||this.code==null){
        this.$message.warning('请选择字典组！')
        return false;
      }
      this.createKey()
      this.queryDictList(this.code)
      this.dict = {}
      this.parentName = '';
      this.parentId = '0';
      // this.dictKey =this.code+;
      this.dialogAddDict = true
    },
    // 添加字典
    addDict () {
      let groupId = this.groupId;
      let that = this
      var url = this.$API.EPF_ADMIN.DICT.ADD
      if(this.dict.dictValue == '' || this.dict.dictValue == null){
        this.$message.warning('请输入字典值')
        return
      }
      if(this.dict.zhCn == '' || this.dict.zhCn == null){
        this.$message.warning('请输入字典中文名称')
        return
      }
      if(this.dict.enUs == '' || this.dict.enUs == null){
        this.$message.warning('请输入字典英文名称')
        return
      }
      let dict = {'dictKey': this.dictKey, 'dictValue': this.dict.dictValue, 'zhCn': this.dict.zhCn, 'enUs': this.dict.enUs, 'groupId': groupId, 'parentId': this.parentId,dictOrder:this.dict.dictOrder}
      this.$post(url,dict)
        .then(res => {
          if (res.code === 0) {
            that.$message.success("保存成功!")
            that.dialogAddDict = false
            that.queryDictList(that.code)
          } else {
            that.$message.error(res.msg)
          }
        })
        .catch(res => {
          that.$message.warning(res.msg)
        })
      this.data.push(this.dict)
    },
    handleSelectionChange1 (val) {
      this.selectDicts = val;
    },
    //  右边数据删除
    deleteDict () {
      let that = this
      let idArray = this.selectDicts
      if(idArray.length < 1){
        this.$message.warning('请选择要删除的数据！')
        return
      }
      let ids = ""
      for(var i = 0; i < idArray.length; i++){
        ids += idArray[i].id+","
      }
      let url = this.$API.EPF_ADMIN.DICT.DELT
      let data = {'id': ids}
      this.$confirm('确定要删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.$post(url, data).then(res => {
          if(res.code === 0){
            that.$message.success("删除成功!")
            that.queryDictList(that.code)
          }else{
            that.$message.error(res.msg)
          }
        })
      }).catch(() => {});
    },
    // 右边数据修改
    showDict () {
      let idArray = this.selectDicts
      if(idArray.length < 1){
        this.$message.warning('请选择要修改的数据！')
        return
      }else if(idArray.length > 1){
        this.$message.warning('不能同时进行多条数据修改，请选择一条！')
        return
      }else{
        this.dict = {}
        let id = this.selectDicts[0].id
        let parentId = this.selectDicts[0].parentId
        this.queryDict(id)
        if(parentId==='0'){
          this.parentId = '0'
          this.parentName = ''
        }else{
          this.queryParentDict(parentId);
        }
        this.dialogEditDict = true
      }
    },
    // 修改字典
    editDict () {
      let that = this
      var url = this.$API.EPF_ADMIN.DICT.EDIT
      if(this.dict.dictValue == '' || this.dict.dictValue == null){
        this.$message.warning('请输入字典值')
        return
      }
      if(this.dict.zhCn == '' || this.dict.zhCn == null){
        this.$message.warning('请输入字典中文名称')
        return
      }
      if(this.dict.enUs == '' || this.dict.enUs == null){
        this.$message.warning('请输入字典英文名称')
        return
      }
      let dict = {'id': this.selectDicts[0].id, 'dictKey': this.dict.dictKey, 'dictValue': this.dict.dictValue, 'zhCn': this.dict.zhCn, 'enUs': this.dict.enUs, 'parentId': this.parentId,dictOrder:this.dict.dictOrder}
      this
        .$post(url,dict)
        .then(res => {
          if (res.code === 0) {
            that.$message.success("保存成功!")
            that.dialogEditDict = false
            that.queryDictList(that.code)
          } else {
            that.$message.error(res.msg)
          }
        })
        .catch(res => {
          that.$message.warning(res.msg)
        })
    },
    // 获取左边树数据
    queryDict (id) {
      let that = this
      var url = this.$API.EPF_ADMIN.DICT.dictGroupInfo + id
      this
        .$get(url)
        .then(res => {
          if (res.code === 0) {
            that.dict = res.dictionaries
          } else {
            that.$message.error(res.msg)
          }
        })
        .catch(res => {
          that.$message.warning(res.msg)
        })
    },
    // 获取右边列表数据
    queryParentDict (parentId) {
      let that = this
      var url = this.$API.EPF_ADMIN.DICT.dictionariesInfo + parentId
      this.$get(url).then(res => {
          if (res.code === 0) {
            that.parentName = res.dictionaries.zhCn
            that.parentId = res.dictionaries.id
          } else {
            that.$message.error(res.msg)
          }
        })
        .catch(res => {
          that.$message.warning(res.msg)
        })
    },
    // 选择父节点
    handleNodeClick (data) {
      this.parentId = data.id
      this.parentName = data.zhCn
      this.dialogParentCheck = false;
    },
    // 父节点选择
    checkParent(){
      this.dialogParentCheck = true;
    }
  }
}
</script>
<style lang="less" scoped>

</style>
