<template>
    <div>
        <el-tree :data="permisssionTreeDatas"
                 v-loading="loading"
                 element-loading-text="数据加载中"
                 element-loading-background="rgba(255, 255, 255,0.95)"
                 :props="defaultProps"
                 node-key="id"
                 :check-strictly="true"
                 ref="permisssionTre"
                 @check-change="handleNodeClick"
                 :expand-on-click-node="false"
                 class="orgManange_List"
                 draggable
                 show-checkbox
        />
    </div>
</template>

<script>
  /**
   * @author Hua.Jeao
   * @see 权限树可选择组件
   * @date 2019-12-07
   */
    export default {
        name: "checkTree",
        props:{
            modelParam:{type:Object,default:{"keywords":""}},
        },
        data() {
            return {
                loading: true,
                permisssionTreeDatas:[{id:"",orgName:""}],
                defaultProps: {children: 'children',label: 'name'},
                curNodeId:'',
                checkPowerDatas:[],// 选择的权限数据

            };
        },created(){
            this.loadTree(null);
        },methods:{
            handleNodeClick(data, checked, indeterminate) {
              let that = this;
              let perArrays =that.checkPowerDatas;
              let arrays=[];
              if (checked) {
                if (typeof data != "undefined") {
                  perArrays.push(data.id);
                }
              } else {
                perArrays.forEach(function (perId) {
                  let id = data.id;
                  if (perId!= id) {
                    arrays.push(perId);
                  }
                });
                perArrays=arrays;
              }
              that.checkPowerDatas=perArrays;
               this.$emit('node-click',perArrays);
            },
            loadTree(e) {
                let that=this;
                let queryCondition={keyWords:that.modelParam["keywords"]};
                that.$get(this.$API.EPF_ADMIN.PERMISSION.GET_TREE,queryCondition).then(res => {
                    that.permisssionTreeDatas = res.data.ztreeJson;
                    e=e!=null?e.id:res.data.ztreeJson[0];
                    that.curNodeId=e.id;
                    that.loading=false;
                });

            },
        }
    }
</script>

<style scoped>
    .orgManange_List .el-tree-node__content {
        margin-bottom: 5px;
    }
</style>
