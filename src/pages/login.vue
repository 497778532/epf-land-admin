<template>
  <div class="fullscreen">
    <div class="login-box">
      <!-- <div style="text-align: center">
        <img src="@/assets/logo.png" alt class="logo"> <span style="color: #fff;line-height: 50px;font-size: 26px;font-weight: bold">部二级市场平台</span>
      </div>
      <p class="text-tips">你好，欢迎登录</p>
      <form action class="login-form">
        <div class="m-list-group">
          <div class="m-list-group-item">
            <input type="text" placeholder="用户名" class="m-input" v-model="username">
          </div>
          <div class="m-list-group-item">
            <input type="password" placeholder="密码" class="m-input" v-model="password">
          </div>
        </div> -->
       <!-- <p class="text-tips">免密码，点击登录按钮进入</p>-->
        <!-- <button
        class="m-btn sub select-none"
        @click.prevent="handleLogin"
        v-loading="isLoging"
        :disabled='disabled'
        >
          <span v-if="stateFront">登录</span>
          <span class="el-icon-loading" v-if="stateAfter"></span>
        </button>
      </form>
      <div style="margin-top: 50px"></div>
      <p class="text-tips">
        <i class="fa fa-meetup" style="color: #29ABE2"></i>&nbsp;
        <span class="footer-text">
          {{appName}} &nbsp;
          <el-tag size="mini">{{version}}</el-tag>
          <br>©make by
          <a href="https://www.github.com/mengdu" target="_blank">{{author}}</a>
        </span>
      </p> -->
      <div class="login_left">
        <img src="../assets/login_left.png" alt="">
      </div>
      <div class="login_right">
        <div class="login_right_title">
          <!-- <div class="login_logo">
            <img src="../assets/logo.png" alt="">
          </div> -->
          <div v-if="InfoConfigBase">
            <strong style="margin-top:8px;">{{InfoConfigBase.systemManageName.substr(0,14)}}</strong>
            <strong>{{InfoConfigBase.systemManageName.substr(14,4)}}</strong>
             
          </div>
        </div>
        <form action="" class="login-form">
            <div class="m-list-group">
            <div class="m-list-group-item" style="margin-top:20px">
              <img class="icon"  src="../assets/icon-login05.png" width="22" height="22" style="vertical-align: middle" alt=""/>
              <input type="text"  autofocus placeholder="请输入您的用户名" class="m-input" v-model="username" style="width:86%;line-height:36px;height:36px;"  @keyup.enter="handleLogin">
            </div>
            <div class="validate"><span v-if="username===''">{{errors.errorsName}}</span></div>
            <div class="m-list-group-item" style="margin-top:10px">
              <img class="icon"  src="../assets/icon-login03.png" width="22" height="22" style="vertical-align: middle" alt=""/>
              <input type="text" v-if="pwdType" placeholder="请输入密码" class="m-input" v-model="password" style="width: 73%;height:40px;" @keyup.enter="handleLogin">
              <input type="password" v-else placeholder="请输入密码" class="m-input" v-model="password" style="width: 73%;height:40px;" @keyup.enter="handleLogin">
              <img :src="seen ? seenImg : unseenImg" @click="changeType()" class="eye_img" style="margin-left:30px;vertical-align: middle;"/>
            </div>
            <div class="validate"><span v-if="password===''">{{errors.errorsPassword}}</span></div>
            <div class="m-list-group-item" style="margin-top:10px;width:60%">
              <span>
                <img src="../assets/icon-login12.png" width="22" height="22" style="vertical-align: middle" alt=""/>
                <input type="text" placeholder="请输入图形验证码" v-model="picCode"  style="width:64%;height:40px;" @keyup.enter="handleLogin"/>
              </span>
              <img class="identifycode" :src="identifyCode"/>
              <i class="el-icon-refresh"  @click="refreshIdentifyCode" style="position:absolute;right:-167px;top:12px;color:#363636;font-size:30px;"></i>
            </div>
            <div class="validate"><span v-if="picCode===''">{{errors.errorsPic}}</span></div>
            <div style="margin:-5px 0;">
              <el-checkbox v-model="checked">记住密码</el-checkbox>
            </div>
          </div>
        </form>
        <div class="buttonBox" style="margin-bottom:10px;">
          <div
          class="button_bg"
          style="width:100%;height:48px;line-height:48px;font-size:24px;font-weight:bold"
          @click.prevent="handleLogin"
          v-loading="isLoging"
          :disabled='disabled'
          >
            <span v-if="stateFront">登录</span>
            <span class="el-icon-loading" v-if="stateAfter"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bd">
      <p v-if="InfoConfigBase">
        <span>主办：{{InfoConfigBase.sponsor}}</span>
        <b></b>
        <span>承办：{{InfoConfigBase.undertake}}</span>
        <b></b>
        <img src="../assets/beian.png" alt="">
        <span>鉴证号：{{InfoConfigBase.filingNumber}}</span>
      </p>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import axios from "axios";
import apiConfig  from "../utils/config"
// import allRouter from '../router/allRouter.js'
export default {
  name: "login",
  data() {
    return {
      InfoConfigBase:"",
      username: '',
      password: "",
      picCode:'',
      identifyCode:'',
      random:"",
      isLoging: false,
      checked:false,
      author: window.APP_INFO.author,
      version: window.APP_INFO.version,
      appName: window.APP_INFO.appName,
      disabled:false,
      stateFront:true,
      stateAfter:false,
      seen:'',
      unseenImg:require("../assets/icon-login07.png"),//看不见
      seenImg :require("../assets/icon-login08.png"),//看得见密码
      pwdType:false, //此时文本框隐藏，显示密码框
      errors:{
        errorsName:'',
        errorsPic:'',
        errorsPassword:''
      },
    };
  },
  mounted(){
    if(this.random==null||this.random==""){
       this.random =Math.random();
    }
    this.identifyCode = apiConfig.baseURL1+'/epf-admin/captcha.jpg?random='+this.random;
    this.getCookie();
  },
  methods: {
    refreshIdentifyCode(){
      this.identifyCode = apiConfig.baseURL1+this.$API.EPF_ADMIN.CAPTCHE+'?random='+this.random+"&i="+Math.random();
    },
    handleLogin() {
      var that = this;
      //var url = "/epf-admin/jwt/token";
      var url = this.$API.EPF_ADMIN.LOGIN;
      let data = new FormData();
      data.append("username", this.username);
      data.append("password", this.password);
      data.append("captcha", this.picCode);
      data.append("loginType", 5);
      data.append("random", this.random);
      if (this.username==='') {this.errors.errorsName=('*用户名不能为空');}
      if (this.password==='') {this.errors.errorsPassword=('*密码不能为空');}
      if (this.picCode==='') {this.errors.errorsPic=('*图片验证不能为空');}
      if(that.checked == true){
        console.log("checked == true")
        that.setCookie(that.username, that.password, 7,that.checked);
      }else{
        console.log("清空cookie")
        that.clearCookie()
      }
      if (!this.username || !this.password || !this.picCode) {
        return this.$message.warning("用户名、密码和验证码不能为空");
      }else{
        this.stateFront = false;
        this.stateAfter = true;
        this.disabled = true;
        debugger;
        this.$useAppend(url, data).then(res => {
        // this.$post(url, {username:this.username,password:this.password}).then(res => {
          if (res.code == "0") {
            console.log(res);
            this.$message.success("登录成功");
            sessionStorage.setItem('token', res.token);
            var user ={};
            user.username = that.username;
            sessionStorage.setItem('user', JSON.stringify(user))
            setTimeout(()=>{
              this.$get(this.$API.EPF_ADMIN.USER.INFO).then(res => {
                if(res.code != 0){
                    this.$message.error(res.msg);
                    return;
                }
                let realName = res.userInfo.realname;
                sessionStorage.setItem('userName', realName);
                // sessionStorage.setItem('iconImg', res.userInfo.iconImg);
                sessionStorage.setItem('iconImg', res.userInfo.headerIcon);
                sessionStorage.setItem('orgId',res.userInfo.orgId);
                sessionStorage.setItem('userId',res.userInfo.id);
                //设置用户所在的地区ID
                sessionStorage.setItem("regional",res.userInfo.regional);
                //设置用户所在的地区ID
                sessionStorage.setItem("parentId",res.userInfo.region.parentId);

                //级别
                sessionStorage.removeItem("org_level")
                //供需
                sessionStorage.removeItem("pdProvince")
                //交易
                sessionStorage.removeItem("dealProvince")
                //合同
                sessionStorage.removeItem("tractProvince")
                //省
                sessionStorage.removeItem("jgProvince")
                sessionStorage.removeItem("jgProvinceCode")
                //市
                sessionStorage.removeItem("jgCity")
                sessionStorage.removeItem("jgCityCode")
                //区县
                sessionStorage.removeItem("jgArea")
                sessionStorage.removeItem("jgAreaCode")

        console.log("================url",this.$API.EPF_ADMIN.ORG.getorgdataByorgId)
                if(res.userInfo.orgId != '' && res.userInfo.orgId != null){
                  setTimeout(()=>{
                    this.$get(this.$API.EPF_ADMIN.ORG.getorgdataByorgId, {orgId:res.userInfo.orgId}).then(r => {
                      if(r.code != '0'){
                        that.$message.error(r.msg);
                        return 0;
                      }
                      debugger
                      // r.orgData.levelCode = 'org_level-004'
                      sessionStorage.setItem("org_level",r.orgData.levelCode)
                      if(r.orgData.levelCode != 'org_level-001'){

                        if(r.orgData.levelCode == 'org_level-003'){ //省级
                          sessionStorage.setItem("pdProvince",r.orgData.areaCode_county)
                          sessionStorage.setItem("dealProvince",r.orgData.areaCode_county)
                          sessionStorage.setItem("tractProvince",r.orgData.areaCode_county)
                          sessionStorage.setItem("jgProvince",r.orgData.areaName_county)
                          sessionStorage.setItem("jgProvinceCode",r.orgData.areaCode_county)
                        }else if(r.orgData.levelCode == 'org_level-005'){ //市级
                          sessionStorage.setItem("pdProvince",r.orgData.areaCode_county)
                          sessionStorage.setItem("dealProvince",r.orgData.areaCode_county)
                          sessionStorage.setItem("tractProvince",r.orgData.areaCode_county)
                          sessionStorage.setItem("jgProvince",r.orgData.areaName_county)
                          sessionStorage.setItem("jgProvinceCode",r.orgData.areaCode_county)
                          sessionStorage.setItem("jgCity",r.orgData.areaName_city)
                          sessionStorage.setItem("jgCityCode",r.orgData.areaCode_city)
                        }else{
                          sessionStorage.setItem("pdProvince",r.orgData.areaCode_county)
                          sessionStorage.setItem("dealProvince",r.orgData.areaCode_county)
                          sessionStorage.setItem("tractProvince",r.orgData.areaCode_county)
                          sessionStorage.setItem("jgProvince",r.orgData.areaName_county)
                          sessionStorage.setItem("jgProvinceCode",r.orgData.areaCode_county)
                          sessionStorage.setItem("jgCity",r.orgData.areaName_city)
                          sessionStorage.setItem("jgCityCode",r.orgData.areaCode_city)
                          sessionStorage.setItem("jgArea",r.orgData.areaName_area)
                          sessionStorage.setItem("jgAreaCode",r.orgData.areaCode_area)
                        }
                      }
                    });
                  },500)
                }else{
                  sessionStorage.setItem("org_level",'org_level-001')
                }
                this.$router.push({ path: "/" });

              });
            },100)
          } else {
            this.stateFront = true;
            this.stateAfter = false;
            this.disabled = false;
            this.$message.warning(res.msg);
          }
        })
        .catch(res => {
          this.stateFront = true;
          this.stateAfter = false;
          this.disabled = false;
          this.$message.warning(res.msg);
        });
      }
    },
    //遍历路由方法
    traverse(data){
      let routerData = [];
      traverseData(data);
      function traverseData(data) {
        for(var index = 0,len = data.length; index < len; index++){
          routerData.push(data[index]);
          if(data[index].childMenu && data[index].childMenu.length){
            traverseData(data[index].childMenu)
          }
        }
      }
      return routerData
    },
    getNeedRouter(localRouter,menusData){
      let resultRouter = [];
      //取出需要的路由
      for(let local = 0,dataLength = localRouter.length; local < dataLength; local++){
        for(let menus = 0,menusLength = menusData.length; menus < menusLength; menus++){
          if(localRouter[local].name == menusData[menus].url){
            resultRouter.push(localRouter[local])
          }
        }
      }
      return resultRouter
    },
    changeType:function(){
      this.seen = !this.seen;
      this.pwdType=!this.pwdType;
    },
    //设置cookie
            setCookie(c_name, c_pwd, exdays,checked) {
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
                window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
                window.document.cookie = "checked" + "=" + checked + ";path=/;expires=" + exdate.toGMTString();
            },
            //读取cookie
            getCookie: function() {
                if (document.cookie.length > 0) {
                    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('='); //再次切割
                        //判断查找相对应的值
                        if (arr2[0] == 'userName') {
                            this.username = arr2[1]; //保存到保存数据的地方
                        } else if (arr2[0] == 'userPwd') {
                            this.password = arr2[1];
                        }else if(arr2[0] == 'checked'){
                          this.checked = true;
                        }
                    }
                }
            },
            //清除cookie
            clearCookie: function() {
                this.setCookie("", "", -1,""); //修改2值都为空，天数为负1天就好了
            },
  },
  created(){
    this.$get("/epf-admin/admin/user/geUserInfo").then(res => {
      this.$get("/epf-cms/cms/basics/getInformationList",{}).then(res => {
        //获取首页信息
        console.log("首页信息", res);
        if (res.code != "0") {
          this.$message.error(res.msg); //失败
          return;
        }
        this.InfoConfigBase = res.information;
        console.log(this.InfoConfigBase)
        this.$bus.$emit("homeInformation", res.information);
      });
    });
  }
};
</script>
<style type="text/css">
.validate{
        display: block;
        width: 100%;
        height: 24px;
        color:#fe3f44;
        font-size: 12px;
        line-height: 24px;
      }
.m-list-group {
  border-radius: 3px;
  padding: 0;
  margin: 0 0 20px;
}
.m-list-group .m-list-group-item {
  position: relative;
  display: block;
  padding: 6px 10px;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid #e7ecee;
  border-radius: 2px;
}
.m-list-group .m-list-group-item:first-child {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.m-list-group .m-list-group-item:last-child {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
.fullscreen {
  position: absolute;
  width: 100%;
  height: 100%;
  /* background: #6392c2; */
  background: url(../assets/bg.png) no-repeat center center;
  display: flex;
}

.login-box {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: auto;
  padding:20px 38px 20px 20px;
  box-sizing: border-box;
  width: 856px;
	height: 494px;
	background-color: #ffffff;
	box-shadow: 0px 38px 76px 0px
		rgba(90, 112, 132, 0.12);
	border-radius: 6px;
}
.login-box .login_left img{
  width:372px;
  height:454px
}
.login-box .login_right{
  width:394px;
  height:454px;
}
.login_right_title{
 padding-top:22px;
 /* padding-left:3px; */
 margin-bottom:23px;
 /* display: flex; */
 /* justify-content: flex-start; */
 text-align: center;
}
.login_right_title .login_logo img{
  width:68px;
  height:68px;
  margin-right: 14px;
}
.login_right_title strong{
  display: block;
  font-size: 24px;
  line-height: 36px;
}
 .login-box .logo {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    position: absolute;
    background-color: #fff;
    top: -3px;
    left: 50%;
    transform: translate(-50%,-50%);
}
.login-box .logo img{
  display: block;
  width: 70px;
  height:70px;
  margin-top: 10px;
  margin-left: 10px;
}
.m-btn{
        width: 100%;
        height: 32px;
        line-height: 32px;
        font-size:18px;
        background-color: #ffa000;
        border-radius: 3px;
        text-align: center;
        font-weight: bold;
        color:#ffffff;
        cursor: pointer;
        display: inline-block;
        outline: none;
        box-sizing: border-box;
        text-decoration: none;
      }
input{
    color: #999999!important;
    font-size: 14px;
    line-height: 32px;
    /* height: 100%!important; */
    border: none;
    outline: none;
}
.login-box img{
  margin: 4px;
}
.identifycode{
    width: 118px;
    height: 50px;
    float: right;
    margin-top: 5px;
    position: absolute;
    margin-right: 14px;
    background: pink;
    right: -131px;
    top: -4px;
    cursor: pointer;
    border-radius: 3px;
    border: 1px solid rgb(224, 221, 221);
}
/*.login-box .text-tips {
  text-align: center;
  margin-bottom: 20px;
  color: #ffffff;
}
.login-box .m-input {
  width: 100%;
  padding: 10px;
  border: none;
  outline: none;
  box-sizing: border-box;
}
.login-box .m-btn {
  font-size: 18px;
  width: 100%;
  color: #fff;
  background-color: #36c1fa;
  display: inline-block;
  padding: 10px 12px;
  margin-bottom: 5px;
  line-height: 1.42857143;
  text-align: center;
  cursor: pointer;
  outline: none;
  border-radius: 2px;
  border: 1px solid #36c1fa;
  box-sizing: border-box;
  text-decoration: none;
}
.login-box .m-btn.m-btn-text {
  background: #fff;
  color: #36c1fa;
}
.login-box .m-btn:hover {
  background-color: #2db7f5;
}
.login-box .m-btn.m-btn-text:hover {
  background-color: #f4f5f5;
}
.login-box .m-btn:active {
  opacity: 0.8;
} */
.buttonBox{
  display: flex;
  flex-direction: row;
  justify-content: center;
  display:-ms-flexbox;
 -ms-flex-pack:center;
}
.footer-bd{
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%,-50%);
}
.footer-bd b{
  display: inline-block;
  width: 30px;
}
@media (max-width: 768px) {
  .login-box {
    width: auto;
  }
}
</style>
