<template>
    <div class="supplyLand_top_right" :model="tPurchase">
        <p style="font-weight:800;font-size:18px;color:#333;margin-bottom:26px;">{{tPurchase.title}}</p>
        <table width="100%" border="1" cellpadding="0" cellspacing="0" bordercolor="#eeeeee">
            <tr height="46px">
            <td>
                <span style="font-size:14px;color:#999;margin-left:10px;">行政区域：</span>
                {{tPurchase.cantonProvinceName}}{{tPurchase.cantonCityName}}{{tPurchase.cantonAreaName}}
            </td>
            <td>
                <span style="font-size:14px;color:#999;margin-left:10px;">使用时间：</span>
                {{tPurchase.useBeginDate}} - {{tPurchase.useEndDate}}
            </td>
            <td>
                <span style="font-size:14px;color:#999;margin-left:10px;">土地用途：</span>
                {{tPurchase.firstClassUseName}} - {{tPurchase.secondClassUseName}}
            </td>
            <td>
                <span style="font-size:14px;color:#999;margin-left:10px;">土地面积：</span>
                {{tPurchase.area?tPurchase.area+'平方米':''}}
            </td>
            </tr>
            <tr height="46px">
            <td>
                <span style="font-size:14px;color:#999;margin-left:10px;">意向价格：</span>
                {{tPurchase.price?'¥'+Division(tPurchase.price) + ' 万元':'面议'}}
            </td>
            <td>
                <span style="font-size:14px;color:#999;margin-left:10px;">使用年限：</span>
                {{tPurchase.years?tPurchase.years+'年':''}}
            </td>
            <td colspan="2">
                <span style="font-size:14px;color:#999;margin-left:10px;">土地位置：</span>
                {{tPurchase.location}}
            </td>
            </tr>
            <tr height="46px">
            <td colspan="4">
                <el-row>
                <el-col :span="4">
                    <span style="font-size:14px;color:#999;margin-left:10px;line-height:46px;">联系人：</span>
                    <span v-if="!isLogin">{{tPurchase.contact}}</span>
                    <span v-else>{{tPurchase.contact.substring(0,1)}}***</span>
                </el-col>
                <el-col :span="5">
                    <span style="font-size:14px;color:#999;line-height:46px;">联系电话:</span>
                    <span v-if="!isLogin">{{tPurchase.phone}}</span>
                    <span v-else>{{tPurchase.phone.substring(0,3)}}****{{tPurchase.phone.substring(7,11)}}</span>
                </el-col>
                <el-col :span="9">
                    <span style="font-size:14px;color:#999;line-height:46px;">联系地址:</span>
                    <span>{{tPurchase.address}}</span>
                </el-col>
                <el-col :span="7">
                    <p v-if="isLogin">
                    <span class="supplyLandP_active" @click="toLogin">登录</span>后查看完整信息
                    </p>
                </el-col>
                </el-row>
            </td>
            </tr>
            <tr height="46px">
            <td colspan="4">
                <span style="font-size:14px;color:#999;margin-left:10px;">需求说明：</span>
                {{tPurchase.remark?tPurchase.remark:'暂无'}}
            </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tPurchase: {
                img: "",
                isCollect: 0,
                title: "",
                demand: "",
                phone: "",
                contact: "",
                cantonProvinceName: "",
                cantonCityName: "",
                cantonAreaName: "",
                useBeginDate: "",
                useEndDate: "",
                firstClassUseName: "",
                secondClassUseName: "",
                location: "",
                remark: "",
                area: "",
                price: "",
                years: "",
                address:""
            },
            isLogin: false,
        }
    },
    created(){
        this.messDetail();
    },
    methods:{
        messDetail(id,index){
            function getChangeDate(date) {
                return (
                date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
                );
            }	
            this.tPurchase = {}
            this.$get("/epf-supply/tpurchase/getTPurchase?id="+id).then(res=>{
                if(res.code != 0){
                    this.$message.error(res.msg); //失败
                    return
                }else{
                    if ( res.tPurchase.useBeginDate == "" || res.tPurchase.useBeginDate == null ) {
                    res.tPurchase.useBeginDate = "";
                    } else {
                    res.tPurchase.useBeginDate = getChangeDate(new Date(res.tPurchase.useBeginDate));
                    }
                    if ( res.tPurchase.useEndDate == "" || res.tPurchase.useEndDate == null ) {
                    res.tPurchase.useEndDate = "";
                    } else {
                    res.tPurchase.useEndDate = getChangeDate(new Date(res.tPurchase.useEndDate));
                    }
                }
                
                this.tPurchase = res.tPurchase;
                let params = {
                    demand: res.tPurchase.demand == 1 ? "求租" : "求购",
                    cantonProvince: res.tPurchase.cantonProvince,
                    cantonCity: res.tPurchase.cantonCity,
                    cantonArea: res.tPurchase.cantonArea,
                    firstClassUse: res.tPurchase.firstClassUse,
                    secondClassUse: res.tPurchase.secondClassUse
                };
                this.$get("/epf-supply/tsell/getListDemandSimilarityRecommend",params).then(data =>{
                    this.landData = data.pager.results;
                })
            })
        }
    }

}
</script>

<style>

</style>