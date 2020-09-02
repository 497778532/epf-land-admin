<template>
  <epf-container title='机构管理'>
    <el-row :gutter="20">
      <!--<el-col :span="5">
        <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
          <div class="epf_toolbar">
            <div class="epf_fr_search">
              <span>区域信息</span>
            </div>
          </div>
          <div class="epf_fr_content" :style="{height:boxHeight - 55 +'px'}">
            <el-tree
              :data="treeData"
              v-loading="loading"
              element-loading-text="数据加载中"
              element-loading-background="rgba(255, 255, 255,0.95)"
              :props="areadefaultProps"
              node-key="id"
              :expand-on-click-node="false"
              class="menuManage_List"
              :default-expanded-keys="['000000']"
              draggable
              @node-click="orghandleNodeClick">
            </el-tree>
          </div>
        </div>
      </el-col>-->
      <el-col :span="5">
        <div class="epf_fr_box" :style="{height:boxHeight +'px'}">
          <!--<div class="epf_toolbar">
            <div class="epf_fr_search">
              <button class="epf_btn epf_btn_bg"
                      @click="add()"> 添 加</button>
              <el-input placeholder="请输入机构名称"
                v-model="orgKeywords"
                style="padding:5px 10px;">
                <el-button slot="append"
                  @click="queryOrg"
                  icon="el-icon-search"
                  size="small">
                </el-button>
              </el-input>
            </div>
          </div>-->
          <div class="epf_fr_content epf_fr_content_tree" :style="{height:boxHeight - 5 +'px'}">
              <el-tree
                :data="orgtreeData"
                v-loading="orgloading"
                element-loading-text="数据加载中"
                element-loading-background="rgba(255, 255, 255,0.95)"
                :props="orgdefaultProps"
                :default-expanded-keys="[openValue]"
                node-key="id"
                :expand-on-click-node="false"
                class="menuManage_List"
                draggable
                @node-click="orghandleNodeClickshowData">
              </el-tree>
          </div>
        </div>
      </el-col>

      <el-col :span="19">
        <div class="epf_fr_box" :style="{height:boxHeight +'px'}"  v-loading="loadingView">
          <div class="epf_toolbar">
            <button class="epf_btn epf_btn_bg" @click="add()">添加</button>
            <button class="epf_btn epf_btn_bg" @click="edit">修改</button>
            <button class="epf_btn epf_btn_def" @click="del">删除</button>
          </div>
          <div class="epf_fr_content" :style="{height:boxHeight - 55 +'px'}">
            <el-form
              class="formBox"
              style="width:95%"
              :data='orgContent'
              label-width="100px">
              <el-row :gutter="2" class="bom_border">
                <el-col :span="12">
                  <el-form-item label="机构名称：" class="text_padding">
                  <span class="span-fit">{{orgContent.orgName}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="机构编号：" class="text_padding">
                    <span class="span-fit">{{orgContent.orgCode}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="2" class="bom_border">
                <el-col :span="12">
                  <el-form-item label="详细地址：" class="text_padding">
                    <span class="span-fit">{{orgContent.address}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话：" class="text_padding">
                    <span class="span-fit">{{orgContent.telPhone}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="2" class="bom_border">
                <el-col :span="12">
                  <el-form-item label="机构类型：" class="text_padding">
                    <span class="span-fit">{{orgContent.orgTypeName}}</span>
                    <!-- <el-select v-model="orgContent.orgType" style="width:100%;" disabled>
                      <el-option v-for="orgType of orgTypes" :key="orgType.id" :label="orgType.zhCn" :value="orgType.dictValue" style="width:100%;"/>
                    </el-select> -->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所属区域：" class="text_padding">
                    <span class="span-fit">{{orgContent.regionalSname}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="2" class="bom_border">
                <el-col :span="12">
                  <el-form-item label="父节点：" class="text_padding">
                    <span class="span-fit">{{orgContent.parentName}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="级别：" class="text_padding">
                    <span class="span-fit">{{orgContent.orgLevelName}}</span>
                    <!-- <el-select v-model="orgContent.orgLevel"  style="width:100%;" disabled>
                      <el-option v-for="orgLevel of orgLevels" :key="orgLevel.id" :label="orgLevel.zhCn" :value="orgLevel.dictValue" style="width:100%;"/>
                    </el-select> -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="2" class="bom_border">
                <el-col :span="12">
                  <el-form-item label="排序：" class="text_padding">
                    <span class="span-fit">{{orgContent.rank}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮编：" class="text_padding">
                    <span class="span-fit">{{orgContent.postalCode}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="2" class="bom_border">
                <el-col :span="12">
                  <el-form-item label="联系人：" class="text_padding">
                    <span class="span-fit">{{orgContent.liaison}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮箱：" class="text_padding">
                    <span class="span-fit">{{orgContent.email}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="2" class="bom_border">
                <el-col :span="20" >
                  <el-form-item label="对社会公众显示状态：" class="text_padding"   >
                      <span class="span-fit">{{orgContent.showstate=='0'?'不显示':'显示'}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :title="dialogData.title"
      :visible.sync="dialogData.visible"
      :width="dialogData.width"
      append-to-body>
      <component
        v-if="dialogData.comp"
        :is="dialogData.comp"
        :ref="'dialogData.comp'"
        @closeDialog="closeDialog"
        @refreshPage="refreshPage"
        v-bind:model-param="modelParam">
      </component>
      <div v-if="!dialogData.comp" v-html="dialogData.content"></div>
      <div v-if="!dialogData.comp" class="epf_align_right">
        <button
          class="epf_btn epf_btn_bg"
          @click="ensureDel">
          确 定
        </button>
        <button
          class="epf_btn epf_btn_def"
          @click="dialogData.visible = false">
          取 消
        </button>
      </div>
    </el-dialog>
  </epf-container>
</template>

<script>
    import editOrg from './edit';
    import addOrg from './add';
    import orgTree from '../../components/orgTree';
    export default {
        name: "org",
        components: {addOrg, editOrg, orgTree},
        data() {
            return {
                dialogData: {visible: false, title: "", comp: ""},
                orgContent: {parentName: '',regionalSname: '',orgTypeName: '',orgLevelName: ''},
                currentOrg:{},// 选中的当前机构
                defaultProps: {children: 'children', label: 'name',id: 'id'},
                orgLevels: [],// 机构级别
                orgTypes: [],// 机构类型
                boxHeight: 700,
                orgKeywords:'',// 机构树查询条件
                modelParam:{},
                regionData:[],
                areaName:"",// 区域名称
                data:[],
                parentMenu: '',
                getoneorgId: '', //获取当前机构一级机构
                loading: false,
               // treeData:[], //树结构数据
               // areadefaultProps: {children: 'children', label: 'zhCn',id: 'id'},
                orgtreeData:[], //机构树结构数据
                orgdefaultProps: {children: 'children', label: 'orgName',id: 'id'},
                orgloading: false,
                loadingView: false,
                openValue: ''
            };
        },
        created() {
            //this.getTree();
            this.getoneorgId=sessionStorage.getItem('orgId');
            this.boxHeight = window.innerHeight - 250;
            //this.showOrgInfo({id:this.getoneorgId});
            //this.queryDictList ("org_level");
            //this.queryDictList ("org_type");
            this.orghandleNodeClick(this.orgContent);
        },
        methods: {
            edit() {
                this.dialogData = {
                    visible: true,
                    title: "修改机构",
                    comp: "editOrg",
                    width: "50%"
                };
            },
            add() {
                this.modelParam["org"]=this.orgContent;
                this.dialogData = {
                    visible: true,
                    title: "新增机构",
                    comp: "addOrg",
                    width: "50%"
                };
            },
            del() {
                this.dialogData = {
                    visible: true,
                    title: "删除机构",
                    content: "确认要删除该条信息吗?",
                    width: "20%",
                    orgContent: this.orgContent
                };
            },
            handleClose() {
                this.dialogData = {visible: false, title: "", content: ""};
            },
            // 点击树查询详情
            showOrgInfo(data) {
                let that=this;
                that.parentMenu=data.parentName;
                this.loading=true;
                that.$get(this.$API.EPF_ADMIN.ORG.QUERY, {id:data.id}).then(r => {
                    this.loading=false;
                    if(r.code != '0'){
                        that.$message.error(r.msg);
                        return 0;
                    }
                    that.orgContent = r.org;
                    that.orgTypes = r.orgTypes;
                    that.orgLevels = r.orgLevels;
                    that.modelParam["org"]= r.org;
                    that.regionData=r.regionData;
                    that.modelParam["regionData"]=r.regionData;
                    that.areaName=r.areaName;
                });
            },
            loadtreeData(data){
                let that=this;
                this.loading = true;
                that.$get(this.$API.EPF_ADMIN.ORG.GET_ORGTREE_FORTREE, {id:data.id}).then(r => {
                    this.loading = false;
                    if(r.code != '0'){
                        that.$message.error(r.msg);
                        return 0;
                    }
                    that.data = JSON.parse(r.ztreeJson.replace(/'/g, '"'))
                    /*that.orgTypes = r.orgTypes;
                    that.orgLevels = r.orgLevels;
                    that.modelParam["org"]= r.org;
                    that.regionData=r.regionData;
                    that.modelParam["regionData"]=r.regionData;
                    that.areaName=r.areaName;*/
                });
            },
            queryDictList(code) {
                var that = this;
                that
                    .$get("/epf-admin/admin/dictionaries/getDictEbyDictGroup/" + code)
                    .then(res => {
                        if (res.code === 0) {
                            if (code == "org_level") {
                                if (res.dictionariesList != null) {
                                    that.orgLevels = res.dictionariesList;
                                } else {
                                    that.orgLevels = [];
                                }
                            } else if (code == "org_type") {
                                if (res.dictionariesList != null) {
                                    that.orgTypes = res.dictionariesList;
                                } else {
                                    that.orgTypes = [];
                                }
                            }
                        } else {
                            that.$message.warning(res.msg);
                        }
                    });
            },
            handleDragEnd(draggingNode, dropNode, dropType, ev) {
                var orgId = draggingNode.data.id;
                var pId = '';
                if (dropType == "inner") {
                    pId = dropNode.data.id;
                } else{
                    pId = dropNode.data.pId;
                }
                var paramsData = { id: orgId, parentId: pId, };
                this.$post("/epf-admin/admin/org/update", paramsData).then(res => {
                    if (res.code == 0) {
                        this.$message.warning("保存成功！");
                    } else {
                        this.$message.warning(res.msg);
                    }
                   // this.getTree();
                    this.orghandleNodeClick(this.orgContent);
                });
            },
            // 关闭对话框
            closeDialog() {
                this.dialogData = {};
               // this.$refs.orgTree.loadTree();
            },
            // 确认删除
            ensureDel(){
                this.$get(this.$API.EPF_ADMIN.ORG.DELETE,{id:this.orgContent.id}).then(r => {
                    this.$message.success(r.msg);
                    this.orgContent={};
                    /*this.$refs.orgTree.loadTree();*/
                    //this.getTree();
                    this.orghandleNodeClick(this.orgContent);
                    this.dialogData.visible=false;

                });
            },
            /**
             * @author Hua.Jeao
             * @date 2019-11-28
             * @see 关键字过滤机构树
             */
            queryOrg(){
                this.modelParam["orgKeywords"]=this.orgKeywords;
                //this.getTree();
                this.orghandleNodeClick(this.orgContent);
            },
            // 刷新页面数据
            refreshPage(data){
                this.orghandleNodeClick(this.orgContent);
                //this.getTree();
                this.dialogData.visible=false;
            },
            /**
             * @author Hua.Jeao
             * @date 2019-12-12
             * @see 节点单击时渲染右边数据
             */
            orghandleNodeClick(data){//加载机构树
                const that = this;
                this.orgContent={};
                this.orgloading = true;
                this.loadingView= true;
                that.$post(that.$API.EPF_ADMIN.ORG.getRegionalsorgdataTrees,{areaId: '',keyWords:''}).then(res => {
                    debugger
                    that.orgloading = false;
                    this.loadingView= false;
                    if (res.code === 0) {
                        that.orgtreeData = res.data.dataTree;
                        if(res.data.dataTree.length>0){
                            this.orgContent=res.data.dataTree[0];
                            if(this.openValue==""){
                                this.openValue=this.orgContent.id;
                            }
                        }
                    }else{
                        that.$message.warning(res.msg);
                    }
                })
            },
            /*getTree(){ //获取树结构区域数据
                const that = this;
                this.loading = true;
                this.orgContent={};
                that.$post(that.$API.EPF_ADMIN.REGIONAL.GET_ALLDATA_TREE).then(res => {
                    that.loading = false;
                    if (res.code === 0) {
                        that.treeData = res.data.dataTree;
                        if(res.data.dataTree.length>0) {
                            that.orghandleNodeClick(res.data.dataTree[0]);
                        }
                    }else{
                        that.$message.warning(res.msg);
                    }
                })
            },*/
            orghandleNodeClickshowData(data){
                this.modelParam["org"]=data;
                this.orgContent=data;
                this.openValue=data.parentId;
            }
        }
    }
</script>

<style lang="less" scoped>
  .bom_border{
    border-bottom:1px solid rgb(230, 230, 230);
  }
  .text_padding{
    margin:10px 22px;
  }
  .formBox{
    margin: 0 auto;
  }


</style>

<style type="text/css">
  .span-fit{
    position:relative;
    top:13px;
  }
  .epf_fr_content_tree{
    top:0 !important;
  }
/*  .epf_fr_content .el-form-item__label{
    width: 180px !important;
  }
  .epf_fr_content  .el-form-item__content{
    margin-left: 5px !important;
  }*/
</style>
