<template>
  <div class="login-wrap">
    <my-title class="my-title" :text="title" />
    <div class="wrap-box" @change="handleInputAccountChange($event)">
      <input-box
        class="input-box account-box"
        :boxName="accountBoxName"
        :type="textType"
        :placeholder="inputAccount"
        @account="handleGetAccount"
      />
    </div>
    <div class="wrap-box pwd-box" @change="handleInputPwdChange($event)">
      <div
        class="pwd-icon pwd-show-icon"
        @click="handleClickIcon()"
        v-if="pwdIsShow"
      ></div>
      <div
        class="pwd-icon pwd-hidden-icon"
        @click="handleClickIcon()"
        v-else
      ></div>
      <input-box class="input-box" :type="pwdType" :placeholder="inputPwd" />
    </div>
    <div ref="tips" class="tips">{{ tipsText }}</div>
    <div class="button-box" @click="handleClickLogin()">
      <my-button class="my-button" :text="buttonText" />
    </div>
    <div class="forget-pwd">{{ $t("login.forgetPwd") }}</div>
    <div class="click-register" @click="pushToRegister()">
      {{ $t("register.clickRegister") }}
    </div>
  </div>
</template>
<script>
import MyTitle from "../components/funcComponents/Title";
import InputBox from "../components/funcComponents/InputBox";
import MyButton from "../components/funcComponents/Button";
import { login } from "../../api/index";
import { setCookie } from "../../utlis/index";
export default {
  data() {
    return {
      title: this.$t("login.title"), //标题
      accountBoxName: "loginEmail", //输入框的名字
      textType: "text", //输入框为文本类型
      pwdType: "password", //输入框为密码类型
      inputAccount: this.$t("login.inputAccountTips"), //账户输入框的提示文字
      inputPwd: this.$t("login.inputPwdTips"), //密码输入框的提示文字
      buttonText: this.$t("login.buttonText"), //按钮文字
      inputAccountBoxValue: "", //账户输入框的值
      inputPwdBoxValue: "", //密码输入框的值
      tipsText: this.$t("login.tipsText.signingIn"), //提示文本
      pwdIsShow: false, //密码是否显示
    };
  },
  components: {
    MyTitle,
    InputBox,
    MyButton,
  },
  mounted() {},
  methods: {
    // 账号输入框内容改变时
    handleInputAccountChange: function (e) {
      console.log(e.target.value);
      this.inputAccountBoxValue = e.target.value;
    },
    // 密码输入框内容改变时
    handleInputPwdChange: function (e) {
      console.log(e.target.value);
      this.inputPwdBoxValue = e.target.value;
    },
    // 获取账号
    handleGetAccount: function (data) {
      this.inputAccountBoxValue = data;
    },
    // 点击密码显示状态图标
    handleClickIcon: function () {
      if (this.pwdIsShow) {
        this.pwdType = "password";
        this.pwdIsShow = false;
      } else {
        this.pwdType = "text";
        this.pwdIsShow = true;
      }
    },
    // 点击登录按钮
    handleClickLogin: function () {
      this.tipsText = this.$t("login.tipsText.signingIn");
      this.$refs.tips.style.visibility = "visible";
      login({
        email: this.inputAccountBoxValue,
        pwd: this.inputPwdBoxValue,
        language: "CN",
      })
        .then((res) => {
          console.log(res);
          if (res.status === 1) {
            console.log(res.msg);
            this.tipsText = res.msg + this.$t("login.tipsText.jumping");
            // 设置cookie，有效期1天
            setCookie("login", "login", 1);
            setCookie("email", this.inputAccountBoxValue, 1);
            // 跳转到进入登录页面之前的页面
            this.$router.push("/" + this.$store.state.menuName);
          } else {
            console.log(res.msg);
            this.tipsText = res.msg;
          }
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        })
        .finally(() => {
          console.log("一定会执行的语句");
        });
    },
    pushToRegister: function () {
      this.$router.push("/" + "register");
    },
  },
};
</script>
<style lang="css" scoped>
.login-wrap {
  width: 480px;
  height: 410px;
  background-color: #fafbfb;
  border-radius: 7px;
  box-shadow: 0 0 2px #fafbfb;
}
.my-title {
  margin: 40px auto;
  text-align: center;
}
.wrap-box {
  width: 360px;
  height: 50px;
  margin: 0 auto;
  position: relative;
  margin-bottom: 20px;
}
.input-box {
  width: 100%;
  height: 100%;
}
.pwd-box {
  margin-bottom: 10px;
}
.pwd-icon {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 14px;
  right: 18px;
  z-index: 5;
  background: transparent center no-repeat;
  background-size: cover;
}
.pwd-icon:hover {
  cursor: pointer;
}
.pwd-show-icon {
  background-image: url("../assets/imgs/public/343242@2x.png");
}
.pwd-hidden-icon {
  background-image: url("../assets/imgs/public/434234444@2x.png");
}
.button-box {
  width: 360px;
  margin: 0 auto;
}
.tips {
  text-align: left;
  color: #fb6852;
  margin: 0 0 30px 60px;
  font-size: 14px;
  visibility: hidden;
}
.forget-pwd {
  width: 80px;
  color: #061267;
  text-align: left;
  margin: 16px 0 0 60px;
}
.forget-pwd:hover {
  cursor: pointer;
  text-decoration: underline;
}
.click-register {
  float: right;
  width: 80px;
  color: #061267;
  text-align: right;
  margin: -20px 60px 0 0px;
}
.click-register:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>