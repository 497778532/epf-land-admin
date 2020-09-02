<template>
    <div>
        <el-tree
                :data="orgTreeDatas"
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
    export default {
        name: "orgTree",
        props:{
            keyWords:{type:String,default:null},
        },
        data() {
            return {
                loading: true,
                orgTreeDatas:[{id:"",orgName:""}],
                defaultProps: {children: 'children',label: 'name'},
                curNodeId:'',
            };
        },created(){
            this.loadTree(null);
        },methods:{
            handleNodeClick(data) {
               this.$emit('node-click',data);
            },
            loadTree(e) {
                let queryCondition={keyWords:this.keyWords};
                this.$get(this.$API.EPF_ADMIN.ORG.TREE,queryCondition).then(res => {
                    this.orgTreeDatas = res.ztreeJson;
                    e=e!=null?e.id:res.ztreeJson[0];
                    this.curNodeId=e.id;
                });

            },
        }
    }
</script>

<style scoped>

</style>
