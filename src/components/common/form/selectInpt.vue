<template>
    <div id="selectInpt">
        <el-select v-model="value" style="width:100%" :size="size" :disabled='disabled' placeholder="请选择" @change="changeSelect">
            <el-option
            v-for="(item,index) in options"
            :ref="item.dictKey"
            :dictKey="item.dictKey" 
            :zhCn="item.zhCn"
            :key="index"
            :label="item.zhCn"
            :value="item.dictKey">
            </el-option>
        </el-select>
    </div>
</template>

<script>
export default {
    name:'selectInpt',
    props:['groupCode','default','size','disabled'],
    model:{
        prop:'value',
        event:'result'
    },
    data() {
        return {
            options: [],
            value: null,
        }
    },
    created() {
        let reqUrl = '';
        if( this.groupCode == 'land_use'){
            reqUrl = `/epf-supply/dictionaries/getDictsByCodeOrParentId?code=${this.groupCode}&parentId=0`
        }
        else if(this.groupCode == 'administrative_regions'){
            reqUrl = `/epf-admin/admin/regionals/getAreaByCodeOrParentId?parentId=0`
        }
        else{
            reqUrl = `/epf-supply/dictionaries/getDictEbyDictGroup/${this.groupCode}`
        }
        this.$get(reqUrl).then((res)=>{
            if(res.code == 0){
                this.options = res.dictionariesList
                this.value = this.default?this.default:''
            }else{
                this.options = []
                this.$message.error('字典值请求失败，尝试刷新一下')
            }
        })
    },
    methods: {
        changeSelect(){
            // console.log(this.$refs[this.value][0].$attrs.zhCn);
            this.$emit('result',this.value)
            let name = this.$refs[this.value][0].$attrs.zhCn
            this.$emit('dictObj',{value:this.value,dictName:name})
        }
    },
    watch: {
        default(val){
            console.log(val);
            this.value = val?val:''
        }
    },
}
</script>

<style>
.el-input--small .el-input__inner{
  height:34px;
}
</style>
