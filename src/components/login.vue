<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/img/logo.png">
      <div class="blueLine"></div>
    </div>
    <div class="formContent">
      <input type="text" v-model.trim="loginValidate.loginName" @blur="validateName" placeholder="用户名" autofocus @keyup.13="handleLogin" />
      <p class="error" v-show="!loginNameIsRight">用户名格式错误</p>
      <input type="password" v-model.trim="loginValidate.password" @blur="validatePassword" placeholder="密码" @keyup.13="handleLogin" />
      <p class="error" v-show="!passwordIsRight">密码格式错误</p>
      <button :style="{opacity: !loginNameIsRight||!passwordIsRight ? '0.8' : '1'}" @click="handleLogin" style="cursor: pointer;">登录</button>
      <div class="mt40">
        <div class="w50 fl">
          <Checkbox v-model="isRememberPassword">记住密码</Checkbox>
        </div>
        <div class="w50 fl">
          <a href="javascript:;">忘记密码?</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../assets/api/index'

  export default {
    data() {
      return {
        loginValidate: {
          loginName: '',
          password: '',
          verifyCode: ''
        },
        loginRule: {
          loginNameRule: /^[a-zA-Z0-9_-]{4,16}$/, // 用户名正则，4到16位(字母，数字，下划线，减号)
          passwordRule: /^(?![\d]+$)(?![a-zA-Z]+$)(?![!@#$%^&*]+$)[\da-zA-Z!@#$%^&*]{6,20}$/ // 6-21位数字和字母、特殊字符
        },
        loginNameIsRight: true,
        passwordIsRight: true,
        isRememberPassword: true
      }
    },
    mounted() {
      this.loginNameIsRight = true;
      this.passwordIsRight = true;
    },
    methods: {
      validateName() {
        this.loginNameIsRight = this.loginValidate.loginName === "" ? true : this.loginRule.loginNameRule.test(this.loginValidate.loginName);
      },
      validatePassword() {
        this.passwordIsRight = this.loginValidate.password === "" ? true : this.loginRule.passwordRule.test(this.loginValidate.password);
      },
      handleLogin() {
        api.login(this.loginValidate).then(res => {
          this.saveUserInfo(res);
        });
      },
      saveUserInfo(userInfo) {
        window.localStorage.setItem('userInfo', JSON.stringify(userInfo.object));
        this.$router.push({name: 'menu'});
      }
    }
  }
</script>
<style scoped>
  .login {width: 100%; height: 100%; position: relative; background: #3d6e8a url('../assets/img/login-bg.jpg') no-repeat fixed top;}
  .logo {padding-top: 124px; text-align: center;}
  .logo > img {margin-bottom: 36px;}
  .logo > .blueLine {width: 400px; height: 12px; margin: 0 auto; background: #348ac9;}
  .formContent {width: 440px; height: 360px; margin: 0 auto; padding: 45px 45px; background: white;}
  .formContent input {font-size: 14px; color: #999; line-height: 50px; width: 100%; height: 50px; margin-bottom: 10px; outline: none; border: none; border-bottom: 1px solid #e2e2e2;}
  .formContent .error {font-size: 12px; color: red; line-height: 20px; height: 20px;}
  .formContent button {font-size: 16px; color: white; line-height: 50px; width: 100%; height: 50px; margin-top: 25px; outline: none; border: none; border-radius: 5px; background: #3393d6;}
  .formContent button:hover {background: #2c98e3;}
  .formContent a {color: #495060; line-height: 20px; text-align: right; width: 50%; height: 20px; float: right;}
</style>
