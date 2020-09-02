<template>
  <m-navbar
    id="topbar"
    class="epf_absolute epf_flex epf_not_choice"
    :style="{'background':theme.NavBg}"
  >
    <div id="topbarLogo">
      <img
        id="topbarLogoImg"
        :src="'/api/epf-document/document/downloadById?id='+InfoConfigBase.logoUrl"
        :onerror="defaultImg"
        style="width:51px;height:51px;"
      />
    </div>
    <div id="topbarLogoName" :style="{color:theme.NavColor}">{{ InfoConfigBase.systemManageName }}</div>

    <div id="topMenu" :style="{'width':setTopMentWidth}">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-header"
        mode="horizontal"
        @select="handleSelect1"
        :background-color="theme.NavBg"
        :text-color="theme.NavColor"
        :active-text-color="theme.NavActiveColor"
      >
        <el-menu-item
          v-for="(item,index) in outMenu"
          :key="index"
          :index="item.url"
          @click="submenuFun()"
          :style="{padding:'0 25px',fontSize:fontSize}"
        >
          <i :class="item.iconCls"></i>
          {{item.menuname}}
        </el-menu-item>
        <el-submenu v-show="hasMore" class="more" index="2">
          <template slot="title">
            <i class="fa fa-ellipsis-h"></i>更多
          </template>
          <el-menu-item
            v-for="(item,index) in hiddenMenu"
            :key="index"
            @click="submenuFun()"
            :index="item.url"
          >
            <i :class="item.iconCls"></i>
            {{item.menuname}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="btn user-op" :style="{color:theme.NavColor}">
      <img :src="imageUrl" class="headImage" :onerror="defaultImg" />
      <span :style="{fontSize:fontSize}">欢迎您，{{userRealName}}</span>
      <i class="iconfont el-icon-arrow-down"></i>
      <ul :style="{color:theme.NavColor,background:theme.NavBg,fontSize:fontSize}">
        <li @click="setuserinfo">
          <i class="iconfont el-icon-user"></i>
          个人信息
        </li>
        <li @click="updatepswd">
          <i class="iconfont el-icon-edit-outline"></i>
          修改密码
        </li>
        <li @click="outSystem">
          <i class="iconfont el-icon-switch-button"></i>
          退出登录
        </li>
      </ul>
    </div>

    <ul class="iconBtn" >
      <li @click.stop.prevent="handleSwitchScreen" :style="{color:theme.NavColor}">
        <i class="fa" :class="isFullScreen ? 'fa-compress' : 'fa-expand'"></i>
      </li>
      <li @click.stop="setUpFun" :style="{color:theme.NavColor}">
        <i class="fa fa-gears"></i>
      </li>
    </ul>

    <!-- 密码修改弹框 -->
    <el-dialog
      title="修改密码"
      top="17vh"
      width="30%"
      :visible.sync="psddialogFormVisible"
      :modal-append-to-body="false"
    >
      <el-form :model="passwordForm" status-icon :label-position="labelPosition" label-width="82px">
        <el-form-item label="原密码：">
          <el-input
            type="password"
            v-model="passwordForm.oldpass"
            autocomplete="off"
            style="width:100%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码：">
          <el-input
            type="password"
            v-model="passwordForm.newPass"
            autocomplete="off"
            style="width:100%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="强度：">
          <div class="input_span">
            <span id="one"></span>
            <span id="two"></span>
            <span id="three"></span>
          </div>
          <div id="font">
            <span>弱</span>
            <span>中</span>
            <span>强</span>
          </div>
        </el-form-item>
        <el-form-item label="确认密码：">
          <el-input
            type="password"
            v-model="passwordForm.relnewPass"
            autocomplete="off"
            style="width:100%;"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="psddialogFormVisible = false">取 消</el-button>

        <el-button type="primary" @click="updatepassword">保存</el-button>
      </div>
    </el-dialog>
    <!--信息修改弹框 -->

    <el-dialog
      title="信息修改"
      width="42%"
      top="17vh"
      :visible.sync="baseinfodialogFormVisible"
      :modal-append-to-body="false"
    >
      <el-row>
        <el-col :span="4" style="text-align: center;">
          <h2>上传头像</h2>
          <el-upload
            class="avatar-uploader"
            action="/api/epf-document/document/upload"
            name="files"
            :show-file-list="false"
            :http-request="userUploadFile"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" :onerror="defaultImg" class="avatar" width="150px" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
        <el-col :span="20">
          <el-form :model="singleuser" :rules="rules" ref="ruleForm">
            <el-form-item label="账号" prop="username" label-width="100px">
              <el-input
                v-model="singleuser.username"
                auto-complete="off"
                :disabled="true"
                style="width:100%;"
              ></el-input>
            </el-form-item>
            <el-form-item label="所属机构" label-width="100px">
              <el-input
                v-model="singleuser.orgName"
                auto-complete="off"
                :disabled="true"
                style="width:100%;"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="realname" label-width="100px">
              <el-input v-model="singleuser.realname" auto-complete="off" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="telPhone" label-width="100px">
              <el-input v-model="singleuser.telPhone" auto-complete="off" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex" label-width="100px">
              <el-switch
                style="margin-left:20px;"
                v-model="singleuser.sex"
                active-color="#13ce66"
                inactive-color="#b9ccfd"
                active-value="0"
                inactive-value="1"
                active-text="女"
                inactive-text="男"
              ></el-switch>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" label-width="100px">
              <el-input v-model="singleuser.email" auto-complete="off" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="deleteType" label-width="100px">
              <el-tooltip :content="singleuser.deleteType=='0'?'正常':'已禁用'" placement="top">
                <el-switch
                  style="margin-left:20px;"
                  v-model="singleuser.deleteType"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="0"
                  inactive-value="1"
                ></el-switch>
              </el-tooltip>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="baseinfodialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateuserinfo('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </m-navbar>
</template>
<script type="text/javascript">
import qs from "qs";
import { mapActions, mapState } from "vuex";
import Bus from "../utils/bus.js";
import { requestFullScreen, exitFullscreen } from "@/utils";

export default {
  name: "app-header",
  data() {
    return {
      theme: {
        NavBg: "#282f32", //导航背景色
        NavColor: "#ffffff", //导航字体颜色
        NavActiveColor: "#fea200", //导航字体焦点颜色
        MenuBg: "#282f32", //菜单背景色
        MenuColor: "#ffffff", //菜单字体颜色
        MenuActiveColor: "#fea200" //菜单字体焦点颜色
      },
      fontSize: "14px",
      dialogData: {
        //弹框数据
        visible: false, //开启状态
        title: "", //标题
        comp: "", //唯一标识
        width: "50%", //宽度
        top: "15vh" //顶部距离
      },

      userRealName: "管理员",
      mini: false,
      isFullScreen: false,
      themeType: "",
      showAside: true,

      activeIndex2: "supplyDemand",
      menuGroups: [],
      outMenu: [],
      hiddenMenu: [],
      canJoin: 0,
      topMenuPopover: false,
      baseinfodialogFormVisible: false,
      userinfo: {},
      singleuser: {},
      imageUrl: "",
      orgdata: [],
      orgdataprops: {
        value: "id",
        children: "children",
        label: "name",
        disabled: "disabled"
      },
      slectdefall: [],
      psddialogFormVisible: false,
      labelPosition: "right",
      passwordForm: {
        oldpass: "",
        newPass: "",
        relnewPass: ""
      },
      menuData: null,
      InfoConfigBase: {},
      defaultImg: 'this.src="' + require("../assets//logo.png") + '"', // 默认图片
      setTopMentWidth: 100,
      hasMore: false,
      //  编辑 表单验证
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        realname: [
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        telPhone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入正确的手机格式",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      user: ({ user }) => user.user
    })
  },
  watch: {
    "passwordForm.newPass": {
      handler: function(newname, oldname) {
        this.msgText = this.checkStrong(newname);
        if (this.msgText > 1 || this.msgText == 1) {
          document.getElementById("one").style.background = "red";
        } else {
          document.getElementById("one").style.background = "#eee";
        }
        if (this.msgText > 2 || this.msgText == 2) {
          document.getElementById("two").style.background = "orange";
        } else {
          document.getElementById("two").style.background = "#eee";
        }
        if (this.msgText == 4) {
          document.getElementById("three").style.background = "#00D1B2";
        } else {
          document.getElementById("three").style.background = "#eee";
        }
      }
    }
  },
  methods: {
    ...mapActions(["getLoginUser", "logout", "clearTab", "setTabsList"]),
    checkStrong(sValue) {
      var modes = 0;
      //正则表达式验证符合要求的
      if (sValue.length < 1) return modes;
      if (/\d/.test(sValue)) modes++; //数字
      if (/[a-z]/.test(sValue)) modes++; //小写
      if (/[A-Z]/.test(sValue)) modes++; //大写
      if (/\W/.test(sValue)) modes++; //特殊字符
      //逻辑处理
      switch (modes) {
        case 1:
          return 1;
          break;
        case 2:
          return 2;
          break;
        case 3:
        case 4:
          return sValue.length < 4 ? 3 : 4;
          break;
      }
      return modes;
    },
    submenuFun() {
      this.$bus.$emit("sidebarBroadcast");
    },
    setUpFun(){ //主题按钮
      this.$bus.$emit('setUpFun')
    },
    handleSwitchSide() {
      this.mini = !this.mini;
      this.$emit("switch", this.mini);
    },
    updatepswd() {
      this.passwordForm = {};
      this.psddialogFormVisible = true;
    },
    setuserinfo() {
      let that = this;
      that.baseinfodialogFormVisible = true;
      that.singleuser = {};
      that.$get(that.$API.EPF_ADMIN.USER.INFO).then(res => {
        that.singleuser = res.userInfo;
        that.imageUrl = that.getImgUrl(res.userInfo.iconImg);
      });
    },
    updateuserinfo(formName) {
      var that = this;
      debugger
      delete that.singleuser.updateTime;
      delete that.singleuser.org;
      delete that.singleuser.permissions;
      delete that.singleuser.orgName;
      delete that.singleuser.region;
      delete that.singleuser.roles;
      that.$refs[formName].validate(valid => {
        if (valid) {
          var sg = that.singleuser;
          var url = "";

          url = "/epf-admin/admin/user/editUser";

          sg.createTime = "";
          that.$post(url, sg).then(res => {
            if (res.code != "0") {
              that.$message.error(res.msg); //失败
              return;
            }
            that.baseinfodialogFormVisible = false;
            that.$message.success("修改成功");
          });
        } else {
          return false;
        }
      });
    },
    updatepassword() {
      var that = this;
      if (!that.passwordForm.relnewPass) {
        that.$message.warning("密码不能为空！");
        return false;
      }
      if (that.passwordForm.relnewPass != that.passwordForm.newPass) {
        that.$message.warning("新密码输入不一致！");
        return false;
      }

      var params = {
        phone: that.user.username,
        oldPassword: that.passwordForm.oldpass,
        newPassword: that.passwordForm.newPass,
        relnewPassword: that.passwordForm.relnewPass
      };
      that
        .$post("/epf-admin/admin/user/updatepssd", {
          oldPassword: that.passwordForm.oldpass,
          newPassword: that.passwordForm.newPass
        })
        .then(res => {
          console.log(res);
          if (res.code != 0) {
            that.$message.warning(res.msg);
            return;
          }
          that.$message.warning(res.msg);
          that.psddialogFormVisible = false;
        });
    },
    handleSwitchScreen() {
      if (this.isFullScreen) {
        exitFullscreen();
        this.isFullScreen = false;
      } else {
        requestFullScreen();
        this.isFullScreen = true;
      }
    },
    handleSwitchHideSide() {
      console.log("change");
      this.$emit("hide-side");
    },
    changeSide(e) {
      let describe = e.currentTarget.getAttribute("describe");
      Bus.$emit("describe", describe);
    },
    handleSelect1(key, keyPath) {
      this.activeIndex2 = key;
      Bus.$emit("describe", key);
    },

    outSystem() {
      localStorage.clear();
      sessionStorage.clear();
      //清除tabs
      this.clearTab();
      this.$router.push({ path: "/transfer/login" });
    },
    helpInfoCenter() {
      let routerPath = "HelpCenter";
      let title = "帮助中心";
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({ path: "/HelpCenter" });
    },
    handleChange(value) {
      console.log(this.slectdefall);
      this.singleuser.orgId = value[value.length - 1];
    },
    getImgUrl(id) {
      return "/api/epf-document/document/downloadById?id=" + id;
    },
    //  开始上传
    userUploadFile(files) {
      const file = files.file;

      const formData = new FormData();

      formData.append("files", file);

      this.$useAppend("/epf-document/document/upload", formData).then(res => {
        console.log(res);
        files.onProgress(file);
        if (res.state != "SUCCESS") {
          this.$message.error("图片上传失败，请重新上传");
          return null;
        }
        this.singleuser.iconImg = res.data[0].id;
        this.imageUrl =
          "/api/epf-document/document/downloadById?id=" + res.data[0].id;
        files.onSuccess(res);
      });
    },
    //  上传成功
    handleAvatarSuccess(res, file) {},
    //  上传限制
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isLt6M = file.size / 1024 / 1024 < 6;
      if (file.size === 0) {
        this.$message.error("上传土地照片大小不能为0");
        return false;
      }
      if (!isPNG && !isJPG && !isGIF) {
        this.$message.error("上传土地照片只能是 jpg , png , gif 格式!");
        return false;
      }
      if (!isLt6M) {
        this.$message.error("上传土地照片大小不能超过 6MB!");
        return false;
      }
    },
    rednderTopMenu(menuData) {
      let topMenuWidth =
        document.getElementById("navBarId") != null
          ? document.getElementById("navBarId").clientWidth
          : window.innerWidth;
      topMenuWidth = topMenuWidth - 550 - 30 - 255 - 130 - 30;
      let canIn = Math.floor(topMenuWidth / 142); // 容器能放多少个菜单
      if (this.canJoin == canIn) {
        return;
      }
      this.canJoin = canIn;
      this.setTopMentWidth = 142 * this.canJoin;
      if(this.setTopMentWidth  == '0'){
        this.setTopMentWidth = 95
      }
      let newoutMenu = [];
      let newhiddenMenu = [];
      console.log("容器能放", this.canJoin);
      menuData.map((val, index) => {
        if (index < this.canJoin) {
          newoutMenu.push(val);
        } else {
          newhiddenMenu.push(val);
        }
      });
      if (newhiddenMenu.length == 0) {
        this.hasMore = false;
      } else {
        this.hasMore = true;
      }

      if (newhiddenMenu.length == 0) {
        this.hasMore = false;
        console.log(this.hasMore);
      }
      this.outMenu = newoutMenu;
      this.hiddenMenu = newhiddenMenu;
      console.log("菜单数据", menuData);
    }
  },
  mounted() {
    window.onresize = () => {
      this.rednderTopMenu(this.menuGroups);
    };
    this.$bus.$on("setTheme", res => {
      this.theme = res;
    });
    this.$bus.$on("setFontSize", res => {
      //设置字体尺寸
      this.fontSize = res;
    });
  },
  created() {
    let that = this;
    this.$bus.$emit("describe", "taizhangSystem");
    this.$bus.$on("describe", value => {
      this.activeIndex2 = value;
    });
    this.getLoginUser();
    let user = JSON.parse(sessionStorage.getItem("user")).username;
    var theme = localStorage.getItem("theme") || "dark";
    // if (localStorage.getItem("userTheme")) {
    //   let uTheme = JSON.parse(localStorage.getItem("userTheme"));
    //   if (uTheme.userName == user) {
    //     theme = uTheme.userTheme;
    //   }
    // }
    this.userRealName =
      sessionStorage.getItem("userName") == "undefined"
        ? JSON.parse(sessionStorage.getItem("user")).username
        : sessionStorage.getItem("userName");
    this.themeType = theme;
    // this.changeMenu(this.themeType);
    if (localStorage.getItem("menuData")) {
      console.log("本地存储有getMenuList");
      let menuGroups = JSON.parse(localStorage.getItem("menuData")).menus;
      this.menuGroups = menuGroups;
      this.activeIndex2 = menuGroups[0].url;

      this.handleSelect1(menuGroups[0].url, [menuGroups[0].url]);
      this.rednderTopMenu(menuGroups);
      this.$bus.$emit("menuData", JSON.parse(localStorage.getItem("menuData")));
    } else {
      this.$get("/epf-admin/admin/menu/getMenuList").then(res => {
        if (res.code == 0) {
          console.log("本地没有存储getMenuList");
          localStorage.setItem("menuData", JSON.stringify(res));
          let menuGroups = res.menus;
          this.menuGroups = menuGroups;
          this.activeIndex2 = menuGroups[0].url;

          this.handleSelect1(menuGroups[0].url, [menuGroups[0].url]);
          this.rednderTopMenu(menuGroups);
          // this.$bus.$emit("menuData", res);
        } else {
          this.$message.error(res.msg);
        }
      });
    }

    that.$get("/epf-admin/admin/user/geUserInfo").then(res => {
      that.singleuser = res;
      that.imageUrl = that.getImgUrl(res.userInfo.iconImg);
      // sessionStorage.setItem("userTenantCode", res.userInfo.tenantCode);
      // var params = { tenantCode: res.userInfo.tenantCode };
    });
    that.$get("/epf-cms/cms/basics/getInformationList", {}).then(res => {
      //获取首页信息
      console.log("首页信息", res);
      if (res.code != "0") {
        that.$message.error(res.msg); //失败
        return;
      }
      that.InfoConfigBase = res.information;
      this.$bus.$emit("homeInformation", res.information);
    });
  }
};
</script>
<style lang="less" scoped>
.navBarBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0px 10px 36px -20px rgba(0, 0, 0, 0.3);
}
#topMenu {
  margin-left: auto;
  margin-right: 0px;
  height: 100%;
  flex-shrink: 1;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  width: 120px;
  border-radius: 10px;
  height: 120px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
.topMenuIcon {
  display: inline-block;
  width: 100%;
  height: 70px;
  padding: 0 15px;
  transition: 0.3s;
  cursor: pointer;
}
.topMenuIcon > i {
  font-weight: lighter;
  font-size: 16px;
  position: relative;
  top: 2px;
}
.popoverTitle {
  padding: 0 6px;
  font-size: 14px;
}
.topMenuIcon:hover {
  color: #ff9e00 !important;
}
.headImage {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.07);
  vertical-align: middle;
}
// .vertical {
//   width: 1px;
//   height: 100%;
//   display: inline-block;
//   position: relative;
// }
// .vertical::after {
//   content: "";
//   width: 1px;
//   height: 30%;
//   position: absolute;
//   background-color: #d8d8d8;
//   top: 35%;
// }

#topbar {
  // @light-primary: lighten(@primary, 10%);
  // @dark-primary: darken(@primary, 5%);
  height: 70px;
  bottom: auto;
  z-index: 5;
  background: #fff;
  padding: 0 15px;
  box-shadow: 0px 10px 36px -20px rgba(0, 0, 0, 0.3);
  #topbarLogo {
    width: auto;
    height: auto;
    padding: 0;
    img {
      margin-top: 9px;
    }
  }
  #topbarLogoName {
    font-size: 1.3vw;
    padding: 0 10px;
    color: #4f5a72;
    letter-spacing: normal;
    font-weight: normal;
  }
}

.btn {
  display: inline-block;
  padding: 0 12px;
  font-size: 21px;
  line-height: 70px;
  color: rgb(79, 90, 114);
  cursor: pointer;
  transition: all 0.2s;
}
.btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.user-op {
  position: relative;
  margin-left: 19px;
  cursor: pointer;
  &:hover {
    ul {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
    }
  }
  &:after {
    position: absolute;
    content: "";
    left: -10px;
    background: rgba(0, 0, 0, 0.07);
    top: 10px;
    bottom: 10px;
    width: 1px;
  }
  .icon-user {
    display: inline-block;
    vertical-align: top;
    font-size: 21px;
    line-height: 54px;
    color: rgb(79, 90, 114);
  }
  .icon-chevron-down {
    vertical-align: middle;
    margin-top: -5px;
    font-size: 14px;
    font-weight: bold;
  }
  span {
    display: inline-block;
    padding: 0 6px;
    font-size: 14px;
    vertical-align: top;
  }
  ul {
    position: absolute;
    top: 70px;
    right: 0;
    left: 0;
    background: #fff;
    box-shadow: 0px 12px 10px -5px rgba(0, 0, 0, 0.3);
    color: #444;
    padding: 8px 0;
    border-radius: 0 0 3px 3px;
    transition: all 0.2s;
    visibility: hidden;
    opacity: 0;
    cursor: pointer;
    transform: translateY(10px);
    li {
      text-align: center;
      font-weight: bold;
      line-height: 34px;
      i {
        margin-right: 6px;
        font-size: 14px;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.07);
      }
    }
  }
}

.iconBtn li {
  float: left;
  padding: 0 12px;
  font-size: 21px;
  line-height: 70px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s;
}
.iconBtn li:hover {
  background: rgba(255, 255, 255, 0.1);
}

.el-menu--horizontal > .el-menu-item {
  height: 70px;
  line-height: 70px;
}
#topMenu .el-submenu .el-submenu__title {
  height: 70px !important;
  line-height: 70px !important;
}

.input_span span {
    display: inline-block;
    width: 65px;
    height: 10px;
    background: #eee;
    line-height: 20px;
    font-size: 12px;
  }

  #one {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-right: 0px solid;
    margin-left: 20px;
    margin-right: 3px;
  }

  #two {
    border-left: 0px solid;
    border-right: 0px solid;
    margin-left: -5px;
    margin-right: 3px;
  }

  #three {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-left: 0px solid;
    margin-left: -5px;
  }

  .input_span{
    height: 15px;
    font-size: 12px;
  }
  #font{
    height: 5px;
    font-size: 12px;
  }
  #font span:nth-child(1) {
    color: red;
    margin-left: 51px;
    font-size: 12px;
  }
  #font span:nth-child(2) {
    color: orange;
    margin: 0 50px;
    font-size: 12px;
  }
  #font span:nth-child(3) {
    color: #00d1b2;
    font-size: 12px;
  }
  .el-form-item__content {
    line-height: 10px !important;
  }
  .el-loading-mask{
    z-index: 1000 !important;
  }
</style>
