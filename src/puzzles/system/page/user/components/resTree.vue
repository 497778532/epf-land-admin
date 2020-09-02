<template>
    <div>
        <el-tree
                :data="treeData"
                node-key="id"
                ref="tree"
                highlight-current
                :default-expanded-keys="curNodeId"
                :props="defaultProps"
                @node-click="handleNodeClick"
            >
        </el-tree>
    </div>
</template>

<script>
  /**
   * @author Hua.Jeao
   * @date 2019-12-05
   * @see 资源树公共组件
   */
  export default {
        name: "resTree",
        props:{
            modelParam:{type:Object,default:{}},
        },
        data() {
            return {
                loading: true,
                treeData:[],
                defaultProps: {children: 'children',label: 'name'},
                curNodeId:'',
            };
        },created(){
            this.loadTree(null);
        },
    methods:{
            handleNodeClick(data) {
               this.$emit('node-click',data);
            },
            loadTree(e) {
                this.$get(this.$API.EPF_ADMIN.RESOURCE.GET_TREE,{keywords:this.modelParam["keywords"]}).then(res => {
                    this.treeData = res.data.ztreeJson;
                    e=e!=null?e.id:res.data.ztreeJson[0];
                    this.curNodeId=e.id;
                });
            },
        }
    }
</script>

<style scoped>

</style>
