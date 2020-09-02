<template>
    <div id="setUp" class="page">
        <i class="btn icon iconfont icon-type"></i>&nbsp;&nbsp;字体
        <div class="division"></div>
        <el-row class="bottom-Margin">
            <el-col :span="8" class="margin-class">
                <div class="set-Btn" @click="choiceFontSize('12px')">
                    <i class="btn icon iconfont icon-type"></i>小
                </div>
            </el-col>
            <el-col :span="8" class="margin-class">
                <div class="set-Btn" @click="choiceFontSize('14px')">
                    <i class="btn icon iconfont icon-type"></i>中
                </div>
            </el-col>
            <el-col :span="8" class="margin-class">
                <div class="set-Btn" @click="choiceFontSize('16px')">
                    <i class="btn icon iconfont icon-type"></i>大
                </div>
            </el-col>
        </el-row>
        <i class="btn icon iconfont icon-hash"></i>&nbsp;&nbsp;主题
        <div class="division"></div>
        <el-row>
            <el-col :span="8" class="margin-class">
                <div class="theme-Btn" @click="choiceFun(null)">
                    <div class="theme-top"></div>
                    <div class="theme-left"></div>
                </div>
            </el-col>
            <el-col :span="8" v-for="(item,index) in theme" :key="index" class="margin-class">
                <div class="theme-Btn" @click="choiceFun(item)">
                    <div class="theme-top"
                        :style="{background:item.NavBg,borderColor:item.NavBg}"></div>
                    <div class="theme-left"
                        :style="{background:item.MenuBg}"></div>
                </div>
            </el-col>
            <i class="btn icon iconfont icon-hash"></i>&nbsp;&nbsp;进入系统
            <div class="division"></div>
            <button type="button" class="el-button el-button--primary" style="width: 100%"><!----><!----><span>
                    进入系统管理后台
            </span></button>
        </el-row>
    </div>
</template>
<script>
import THEME from './theme'
export default {
    name: "setUp",
    data(){
        return{
            theme:[],
            defaultTheme:{ //默认主题
                NavBg:'#fff',
                NavColor:'#4f5a72',
                NavActiveColor:'#409EFF',

                MenuBg:'#323a40',
                MenuColor:'#fff',
                MenuActiveColor:'#409EFF',

                contentBg:'#fff',
                contentColor:'#464C5B',
                contentButtonBgColor:'#409EFF',
                contentButtonColor:'#fff',

                footerBg:'#fff',
                footerColor:'#8b949e',
                footerBorderColor:'#D3D3D3',
            }
        }
    },
    created(){
        this.theme = THEME
    },
    methods:{
        choiceFontSize(type){
            this.$bus.$emit('setFontSize',type)
        },
        //切换主题
        choiceFun(data){
            if(data!==null){
                this.$bus.$emit('setTheme',data)
            }else{
                this.$bus.$emit('setTheme',this.defaultTheme)
            }
        }
    }
}
</script>
<style lang="less" scoped>
#setUp{
    position: fixed;
    right: 0px;
    top: 70px;
    height: 100%;
    width: 350px;
    margin: 0;
    z-index: 9000;
    background: #fff;
    padding: 10px;
    box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.3);
    .division{
        width: 100%;
        height: 1px;
        background: #f0f0f0;
        margin: 15px 0;
    }
    .margin-class{
        padding: 10px;
    }
    .set-Btn{
        padding: 10px;
        border: solid 1px #dfdfdf;
        text-align: center;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .set-Btn::after{
        content: '';
        width: 100%;
        height: 100%;
        display: inline-block;
        background:#f9f9fa;
        position: absolute;
        top: -100px;
        left: 0;
        z-index: -1;
        transition: top .2s;
    }
    .set-Btn:hover.set-Btn::after{
        top: 0px;
    }
    .bottom-Margin{
        margin-bottom: 35px;
    }
    .theme-Btn{
        width: 80px;
        height: 50px;
        background: #f2f2f2;
        cursor: pointer;
        position: relative;
    }
    .theme-Btn::after{
        content: '';
        width:96px;
        height: 66px;
        display: inline-block;
        border: solid 2px rgb(211, 224, 224);
        position:absolute;
        top: -8px;
        left: -8px;
        opacity: 0;
        transition: opacity .2s;
    }
    .theme-Btn:hover.theme-Btn::after{
        opacity: 1;
    }
    .theme-top{
        width: 80px;
        height: 9px;
        position: absolute;
        top: 0;
        border: solid 1px #f2f2f2;
        border-bottom: none;
        background: white;
        z-index: 102;
    }
    .theme-left{
        width: 15px;
        height: 50px;
        position: absolute;
        left: 0;
        background: #444;
        z-index: 101;
    }
}
</style>
