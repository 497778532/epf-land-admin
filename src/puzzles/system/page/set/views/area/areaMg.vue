<template>
  <epf-container title='区域管理'>
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
          <!--<div class="epf_toolbar">
            <button class="epf_btn epf_btn_bg"
                    @click="addLevelOne"> 添 加</button>
          </div>-->
          <div class="epf_fr_content treetop" :style="{height:boxHeight - 5 +'px'}">
            <el-tree
              :data="treeData"
              v-loading="loading"
              element-loading-text="数据加载中"
              element-loading-background="rgba(255, 255, 255,0.95)"
              :props="defaultProps"
              node-key="id"
              :expand-on-click-node="false"
              class="menuManage_List"
              :default-expanded-keys="[openValue]"
              draggable
              :allow-drop="allowDrop"
              @node-click="handleNodeClick"
              :render-content="renderContent">
            </el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
          <div class="epf_toolbar">
            <button class="epf_btn epf_btn_bg"
                    @click="editDict"
                    v-if="!isadd">
              保 存
            </button>
            <button class="epf_btn epf_btn_bg"
                    @click="saveMenu"
                    v-if="isadd">
              保 存
            </button>
            <button class="epf_btn epf_btn_def"
                    @click="deleteMenu">
              删 除
            </button>
          </div>
          <div class="epf_fr_content contents" :style="{height:boxHeight - 55 +'px'}"  v-loading="loading">
            <el-form :model="region" :rules="rules" label-width="120px">
              <el-row :gutter="2" class="bom_border">
                <el-col :span="12">
                  <el-form-item :span="12" label="区域编码" prop="regionCode" class="text_padding"><el-input v-model="region.regionCode"  auto-complete="off"/></el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :span="12" label="区域名称" prop="regionName" class="text_padding"><el-input v-model="region.regionName" auto-complete="off"/></el-form-item>
                </el-col>
                <!--<el-col :span="12">
                  <el-form-item :span="12" label="区域名称" prop="zhCn" class="text_padding"><el-input v-model="region.zhCn" auto-complete="off"/></el-form-item>
                </el-col>-->
                <el-col :span="12">
                  <el-form-item label="区域级别" class="text_padding">
                    <el-select v-model="region.regionLevel"  style="width:100%;">
                      <el-option v-for="regionLevel of regionLevels" :key="regionLevel.id" :label="regionLevel.zhCn" :value="regionLevel.dictValue" style="width:100%;"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <!--<el-form-item :span="12" label="排序" prop="sort" class="text_padding">
                    <el-input  v-model="region.sort" auto-complete="off"/></el-form-item>-->
                    <el-form-item label="排序">
                     <!-- <el-input-number v-model="region.sort" controls-position="right" :min="0" style="width: 100%;"></el-input-number>-->
                      <el-input v-model.number="region.sort" type="number" :min="1" style="width: 100%;"/>
                    </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="2" class="bom_border">
                <!--<el-col :span="12">
                  <el-form-item :span="12" label="英文名称"prop="enUs" class="text_padding"><el-input v-model="region.enUs"auto-complete="off"/></el-form-item>
                </el-col>-->
                <el-col :span="12">
                  <el-form-item :span="12" label="父节点" class="text_padding"><el-input v-model="parentName":readonly="true"/></el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :span="12" label="简称" class="text_padding" ><el-input v-model="region.abbreviation" auto-complete="off"/></el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </epf-container>
</template>

<script>
    import { Rules } from '@/puzzles/system/page/user/components/rules'
    export default {
        name: "areaMg",
        data() {
            return {
                boxHeight: 700,
                loading:false,
                treeData:[], //树结构数据
                defaultProps: {children: 'children', label: 'regionName',id: 'id'},
                dialogData: { visible: false, title: "",comp: "", width: "50%"},
                regionLevels:[],// 区域等级
                region:{
                    regionCode: '',
                    regionName: '',
                    sort: '',
                    abbreviation: '',
                    regionLevel: '',
                    parentId: ''
                },
                rules:Rules.REGION ,
                getparentId: '',
                isadd: false,
                parentName: '',
                openValue: '000000'
            }
        },
        created() {
            this.boxHeight = window.innerHeight - 250
            this.getTree();
        },
        methods: {
            getTree(){ //获取树结构数据
                const that = this;
                this.loading = true;
                that.$post(that.$API.EPF_ADMIN.REGIONAL.GET_ALLDATA_TREE).then(res => {
                    debugger
                    that.loading = false;
                    if (res.code === 0) {
                        that.treeData = res.data.dataTree;
                        that.regionLevels=res.data.regionLevel;
                        that.handleNodeClick( res.data.dataTree[0]);
                    }else{
                        that.$message.warning(res.msg);
                    }
                })
            },
            allowDrop(draggingNode, dropNode, type){
                if(draggingNode.level === dropNode.level){
                    // 同级进行处理
                    if(draggingNode.parent.id === dropNode.parent.id){
                        return false
                    }
                }else{
                    // 不同级进行处理,一个root1下的节点，移动到另一个root2下去
                    draggingNode.data.parentId = dropNode.data.id
                    this.region = draggingNode.data
                    this.editDict()
                    return true
                }
            },
            renderContent(h, { node, data, store }) {
                var createElement = arguments[0];
                var level = arguments[1].node.level;
                if(node.label){
                    return (
                        <span on-click={ () => this.getdictInfo(node,data) }
                    style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;height:26px;overflow:hidden;">
                        <span>
                        <i class={data.iconCls} style="padding-right:5px;"></i>
                        <span>{node.label}</span>
                        </span>
                        <span>
                        <el-button style="font-size: 16px;padding:0px;color:#409EFF;"
                    type="text"
                    on-click={ () => this.append(node,data) }>
                <i class="el-icon-circle-plus-outline"></i>
                        </el-button>
                        <el-button style="font-size: 16px;color:#F56C6C;"
                    type="text"
                    on-click={ () => this.remove(node, data) }>
                <i class="el-icon-delete"></i>
                        </el-button>
                        </span>
                        </span>
                )
                }else{
                    return (
                        <span on-click={ () => this.getnewdictInfo(node,data) }
                    style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;height:26px;overflow:hidden;">
                        <span>
                        <span>
                        <input id={node.id+'Name'}
                    type="text"
                    placeholder="请输入名称"
                    autofocus />
                    </span>
                    </span>
                    <span>
                    <el-button style="font-size: 16px;padding:0px;color:#67C23A;"
                    type="text"
                    on-click={ () => this.setName(node,data) }>
                <i class="el-icon-circle-check-outline"></i>
                        </el-button>
                        <el-button style="font-size: 16px;color:#F56C6C;"
                    type="text" on-click={ () => this.remove(node, data) }>
                <i class="el-icon-delete"></i>
                        </el-button>
                        </span>
                        </span>
                )
                }
            },
            append(node,data) {
                if(!node.expanded){
                    node.expanded=true;
                }
                const newChild = { id: '', zhCn: '',children: [] };
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
            },
            addLevelOne(){ //添加按钮
                this.getparentId="0";
                const newMenu = { id: '', zhCn: '',parentId:'0' ,children: [] };
                this.treeData.unshift(newMenu);
            },
            remove(node, data) {
                if(data.children.length>0){
                    this.$message.error("请先删除下级地区！")
                    return;
                }
                this.currentNode=node;
                this.region=data;
                this.deleteMenu();
            },
            setName(node, data){
                data.menuname = document.getElementById(node.id+'Name').value
            },
            saveMenu(){
                var _this=this
                var url = this.$API.EPF_ADMIN.REGIONAL.ADD
                if(_this.region.regionCode == '' || _this.region.regionCode == null){
                    _this.$message.warning('请输入区域编码')
                    return
                }
                if(_this.region.regionName == '' || _this.region.regionName == null){
                    _this.$message.warning('请输入区域名称')
                    return
                }
                let region = {
                    'regionCode': _this.region.regionCode,
                    'regionName': _this.region.regionName,
                    'sort': _this.region.sort,
                    'abbreviation': _this.region.abbreviation,
                    'regionLevel': _this.region.regionLevel,
                    'parentId':_this.region.parentId
                }
                _this.$post(url, region).then(res => {
                    if (res.code === 0) {
                        _this.$message.success("保存成功")
                        _this.getTree()
                    } else {
                        _this.$message.warning(res.msg)
                    }
                }).catch(res => {
                    _this.$message.warning(res.msg)
                })
            },
            editDict () {
                let _this = this
                let url = this.$API.EPF_ADMIN.REGIONAL.EDIT
                if(_this.region.regionCode == '' || _this.region.regionCode == null){
                    _this.$message.warning('请输入区域编码')
                    return
                }
                if(_this.region.regionName == '' || _this.region.regionName == null){
                    _this.$message.warning('请输入区域名称')
                    return
                }
                /*if(_this.region.regionLevel == '' || _this.region.regionLevel == null){
                    _this.$message.warning('请输入区域级别')
                    return
                }*/
                let region = {
                    'id': _this.region.id,
                    'regionCode': _this.region.regionCode,
                    'regionName': _this.region.regionName,
                    'sort': _this.region.sort,
                    'abbreviation': _this.region.abbreviation,
                    'regionLevel': _this.region.regionLevel,
                    'parentId':_this.region.parentId
                }
                _this.$post(url, region).then(res => {
                    if (res.code === 0) {
                        _this.$message.success("保存成功")
                        _this.getTree()
                    } else {
                        _this.$message.error(res.msg)
                    }
                }).catch(res => {
                    _this.$message.warning(res.msg)
                })
            },
            deleteMenu(){
                let _this = this
                let region=_this.region;
                if(region.children!=null&&region.children.length>0){
                    _this.$message.warning("请先删除下级地区！");
                    return false;
                }
                if(_this.region.id==null||_this.region.id==""){
                    const parent = _this.currentNode.parent;
                    const childMenu = parent.data.children || parent.data;
                    const index = childMenu.findIndex(d => d.id === _this.currentData.id);
                    childMenu.splice(index, 1);
                    return false;
                }
                let data = {'id': _this.region.id}
                _this.$confirm("确认删除该条的信息，是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(async () => {
                    _this.$post(_this.$API.EPF_ADMIN.REGIONAL.DEL, data).then(res => {
                        if(res.code!=0){
                            _this.$message.error(res.msg)
                            return false;
                        }
                        _this.$message.success("删除成功!")
                        _this.getTree();
                    })
                }).catch(() => {
                    _this.$message({
                        type: "info",
                        message: "已取消删除"
                    })
                })
            },
            getdictInfo(node, data){
                this.isadd=false;
                this.currentNode = node;
                this.currentData= data;
                this.region = data;
                this.getparentId=data.id;
                this.parentName = node.parent.label;
            },
            getnewdictInfo(node, data){
                let _this = this
                _this.isadd=true;
                _this.currentNode = node;
                _this.currentData= data==null?{}:data;
                var region= data==null?{}:data;
                if(node.parent.data.id==null||node.parent.data.id==undefined){
                    region.parentId="0"
                }else{
                    region.parentId=node.parent.data.id
                    _this.parentName = node.parent.label;
                }
                this.getparentId=region.parentId;
                // let code = _this.grouparea.code
                var url = this.$API.EPF_ADMIN.REGIONAL.GET_KEY
                this.$get(url).then(res => {
                    if (res.code === 0) {
                        _this.dictKey = res.dictKey;
                        region.dictKey=res.dictKey;
                        _this.region=region;
                    } else {
                        _this.$message.warning(res.msg)
                    }
                }).catch(res => {
                    _this.$message.warning(res.msg)
                })
            },
            /**
             * @author Hua.Jeao
             * @date 2019-12-12
             * @see 节点单击时渲染右边数据
             */
            handleNodeClick(data){
                debugger;
                let that=this;
                that.$get(that.$API.EPF_ADMIN.REGIONAL.GET,{id:data.id}).then(r => {
                    that.region = r.regional;
                    if(that.region.parentId!=null&&that.region.parentId!=""){
                        this.openValue=that.region.parentId;
                    }else {
                        this.openValue=that.region.id;
                    }

                });
            }
        }
    }
</script>
<style lang="less" scoped>
  .contents{
    padding:25px;
  }
  .treetop{
    top:0 !important;
  }
</style>
