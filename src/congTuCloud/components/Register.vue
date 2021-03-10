<template>
  <div class="register-wrap">
    <my-title class="my-title" :text="title" />
    <div class="wrap-box" @change="handleInputAccountChange($event)">
      <input-box
        class="input-box inputAccountBox"
        :boxName="accountBoxName"
        :type="textType"
        :placeholder="inputAccount"
        @account="handleGetAccount"
      />
    </div>
    <div class="wrap-box code-box" @change="handleInputCodeChange($event)">
      <input-box
        class="input-box verification-code"
        :type="textType"
        :placeholder="inputCodeTips"
      />
      <button
        class="codeTextTips"
        @click="handleClickCodeText()"
        :disabled="codeTextTipsIsDisabled"
      >
        {{ codeTextTips }}
      </button>
    </div>
    <div class="wrap-box" @change="handleInputPwdChange($event)">
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
      <input-box
        class="input-box pwd-box"
        :type="pwdType"
        :placeholder="inputPwd"
      />
    </div>
    <div
      class="wrap-box pwd-again-box"
      @change="handleInputPwdAgainChange($event)"
    >
      <div
        class="pwd-icon pwd-show-icon"
        @click="handleClickIcon2()"
        v-if="pwdIsShowAgain"
      ></div>
      <div
        class="pwd-icon pwd-hidden-icon"
        @click="handleClickIcon2()"
        v-else
      ></div>
      <input-box
        class="input-box"
        :type="pwdTypeAgain"
        :placeholder="inputPwdAgain"
      />
    </div>
    <div ref="tips" class="tips">{{ tipsText }}</div>
    <div class="button-box" @click="handleClickLogin()">
      <my-button class="my-button" :text="buttonText" />
    </div>
  </div>
</template>
<script>
import MyTitle from "../components/funcComponents/Title";
import InputBox from "../components/funcComponents/InputBox";
import MyButton from "../components/funcComponents/Button";
import { get_register_code, register } from "../../api/index";
import { setCookie } from "../../utlis/index";
export default {
  data() {
    return {
      title: this.$t("register.title"), //标题
      accountBoxName: "registerEmail", //输入框的名字
      textType: "text", //输入框为文本类型
      pwdType: "password", //输入框为密码类型
      pwdTypeAgain: "password", //输入框为密码类型
      inputAccount: this.$t("register.inputAccountTips"), //账户输入框的提示文字
      inputCodeTips: this.$t("register.inputCodeTips"), //账户输入框的提示文字
      codeTextTips: this.$t("register.codeTextTips.sendCode"), //验证码状态提醒
      timerSecond: 61, //默认60秒
      count: undefined, //计数
      timerFlag: undefined, //计时器标记
      codeTextTipsIsDisabled: false, //验证码按钮默认可用
      inputPwd: this.$t("register.inputPwdTips"), //密码输入框的提示文字
      inputPwdAgain: this.$t("register.inputPwdAgainTips"), //验证密码输入框的提示文字
      buttonText: this.$t("register.buttonText"), //按钮文字
      inputAccountBoxValue: "", //账户输入框的值
      registerCodeValue: "", //验证码输入框的值
      inputPwdBoxValue: "", //密码输入框的值
      inputPwdAgainBoxValue: "", //再次输入密码输入框的值
      tipsText: this.$t("register.tipsText.signingIn"), //提示文字
      pwdIsShow: false, //密码是否显示
      pwdIsShowAgain: false, //密码是否显示
    };
  },
  components: {
    MyTitle,
    InputBox,
    MyButton,
  },
  mounted() {
    this.count = this.timerSecond; //为计数设置默认值
  },
  methods: {
    // 账号输入框内容改变时
    handleInputAccountChange: function (e) {
      this.inputAccountBoxValue = e.target.value;
    },
    // 验证码提示文本
    codeShowText: function () {
      this.codeTextTips =
        this.$t("register.codeTextTips.sendCodeAgainPre") +
        --this.count +
        this.$t("register.codeTextTips.sendCodeAgainNext");
    },
    // 被计时器调用的函数，刷新时间
    codeTimer: function () {
      this.codeShowText();
      if (this.count <= -1) {
        clearInterval(this.timerFlag);
        this.codeTextTips = this.$t("register.codeTextTips.sendCode");
        this.count = this.timerSecond; //还原默认值
        this.codeTextTipsIsDisabled = false; //使验证码按钮恢复可用
      }
    },
    // 点击发送验证码按钮
    handleClickCodeText: function () {
      this.codeTextTipsIsDisabled = true; //验证码按钮暂时不可用
      this.codeShowText(); //在点击的时候就显示倒计时
      this.timerFlag = setInterval(this.codeTimer, 1000);
      this.tipsText = this.$t("register.tipsText.sendingCode");
      this.$refs.tips.style.visibility = "visible"; //让提示文字可见
      // 获取验证码，与后台交互
      get_register_code({
        email: this.inputAccountBoxValue,
        language: "CN",
      })
        .then((res) => {
          console.log(res);
          if (res.status === 1) {
            console.log(res.msg);
          } else {
            console.log(res.msg);
          }
          this.tipsText = res.msg;
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
    // 验证码框内容改变时
    handleInputCodeChange: function (e) {
      this.registerCodeValue = e.target.value;
      console.log(this.registerCodeValue);
    },
    // 密码框内容改变时
    handleInputPwdChange: function (e) {
      this.inputPwdBoxValue = e.target.value;
    },
    // 验证密码框内容改变时
    handleInputPwdAgainChange: function (e) {
      this.inputPwdAgainBoxValue = e.target.value;
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
    // 点击再次输入密码框的显示状态图标
    handleClickIcon2: function () {
      if (this.pwdIsShowAgain) {
        this.pwdTypeAgain = "password";
        this.pwdIsShowAgain = false;
      } else {
        this.pwdTypeAgain = "text";
        this.pwdIsShowAgain = true;
      }
    },
    // 获取固定账号
    handleGetAccount: function (data) {
      this.inputAccountBoxValue = data;
    },
    // 点击注册
    handleClickLogin: function () {
      let _this = this;
      if (this.inputPwdBoxValue !== this.inputPwdAgainBoxValue) {
        this.tipsText = this.$t("register.tipsText.pwdError");
      } else if (
        this.registerCodeValue === "" ||
        this.registerCodeValue === undefined ||
        this.registerCodeValue === null
      ) {
        this.tipsText = this.$t("register.tipsText.registerCodeError");
      } else {
        this.tipsText = this.$t("register.tipsText.registering");
        this.$refs.tips.style.visibility = "visible"; //让提示文字可见
        // 注册，与后台交互
        register({
          email: this.inputAccountBoxValue,
          pwd: this.inputPwdBoxValue,
          code: this.registerCodeValue,
          language: "CN",
        })
          .then((res) => {
            console.log(res);
            if (res.status === 1) {
              console.log(res.msg);
              this.tipsText = res.msg + this.$t("register.tipsText.signingIn");
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
      }
    },
  },
};
</script>
<style lang="css" scoped>
.register-wrap {
  width: 480px;
  height: 500px;
  background-color: #fafbfb;
  border-radius: 7px;
  box-shadow: 0 0 2px #fafbfb;
}
.my-title {
  margin: 40px auto 35px;
  text-align: center;
  /* padding-left: 60px; */
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
.code-box {
  display: flex;
}
.verification-code {
  width: 200px;
}
.codeTextTips:hover {
  cursor: pointer;
}
.codeTextTips {
  display: flex;
  width: 160px;
  font-size: 20px;
  color: #081468;
  justify-content: center;
  align-items: center;
  border: none;
  background: transparent;
  outline: none;
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
.pwd-again-box {
  margin-bottom: 10px;
}
.button-box {
  width: 360px;
  margin: 0 auto;
}
.tips {
  text-align: left;
  color: #fb6852;
  margin: 0 0 25px 60px;
  font-size: 14px;
  visibility: hidden;
}
</style>