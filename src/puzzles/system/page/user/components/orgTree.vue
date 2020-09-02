<template>
  <div>
    <el-tree
      :data="orgTreeDatas"
      node-key="id"
      ref="tree"
      highlight-current
      :default-expanded-keys="[curNodeId]"
      :props="defaultProps"
      @node-click="handleNodeClick"
    >
    </el-tree>
  </div>
</template>

<script>
    export default {
        name: "orgTree",
        props:{
            modelParam:{type:Object,default:''},
        },
        data() {
          return {
                loading: true,
                orgTreeDatas:[{id:"",orgName:""}],
                defaultProps: {children: 'children', label: 'orgName',id: 'id'},
                curNodeId:'',
            };
        },created(){
            this.loadTree(null);
        },methods:{
            handleNodeClick(data) {
                this.$emit('node-click',data);
            },
            loadTree(e) {
                // let queryCondition={keyWords: this.modelParam["orgKeywords"]};
                // this.$get(this.$API.EPF_ADMIN.ORG.REGIONALSORGTREE,queryCondition).then(res => {
                //     debugger
                //     this.orgTreeDatas = res.data.ztreeJson;
                // });
              const that = this;
              that.$post(that.$API.EPF_ADMIN.ORG.getRegionalsorgdataTrees,{areaId: '',keyWords:''}).then(res => {
                that.orgloading = false;
                if (res.code === 0) {
                  that.orgTreeDatas = res.data.dataTree;
                  if(res.data.dataTree.length>0){
                    if(this.curNodeId==""){
                      this.curNodeId=this.orgContent.id;
                    }
                  }
                }else{
                  that.$message.warning(res.msg);
                }
              })
            },
        }
    }
</script>

<style scoped>

</style>
