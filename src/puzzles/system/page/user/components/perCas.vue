<template>
    <el-cascader
            :options="orgCas.options"
            :props="orgCas.props"
            v-model="values"
            @change="cascaderSelectChange"
            clearable></el-cascader>
</template>

<script>
  /**
   * @see 权限级联数据选择公共组件
   * @author Hua.Jeao
   * @date 2019-12-05
   */
  export default {
        name: "perCas",
        props: {
            modelParam: {
                // 多选条件
                checkStrictly: {
                    type: Boolean,
                    default: true
                },
                // 单选条件
                multiple: {
                    type: Boolean,
                    default: false
                },
                values:{
                    type:Array,
                    default:[]
                }
            },
        },
        data() {
            return {
                orgCas: {options: [],props: {}},
                values:[],
            };
        }, created() {
            this.loadOrgSelectTree();
        }, methods: {
            /**
             * @see 加载机构树选择框
             * @author Jeao.Hua
             * @date 2019-11-28
             */
            loadOrgSelectTree() {
                this.orgCas.props = {
                    multiple: this.modelParam.multiple,
                    checkStrictly: this.modelParam.checkStrictly,
                    emitPath:false
                };
                this.selectCascaderDatas=this.modelParam.values;
                this.$get(this.$API.EPF_ADMIN.PERMISSION).then(response => {
                    this.orgCas.options = response.data.casaders;
                });

            },
            cascaderSelectChange() {
                this.$emit('selectChanged',this.values);
            }
        }
    }
</script>

<style scoped>

</style>
