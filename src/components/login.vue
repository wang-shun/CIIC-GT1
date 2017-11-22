<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/logo.png">
      <div class="blueLine"></div>
    </div>
    <div class="formContent">
      <form>
        <input type="text" v-model.trim="loginValidate.name" placeholder="用户名" autofocus />
        <p class="error" v-show="!validateName">用户名格式错误</p>
        <input type="password" v-model.trim="loginValidate.password" placeholder="密码" />
        <p class="error" v-show="!validatePassword">密码格式错误</p>
        <button :disabled="!valid" @click="handleLogin">登录</button>
        <div class="mt40">
          <CheckboxGroup class="width50 fl">
            <Checkbox label="记住密码"></Checkbox>
          </CheckboxGroup>
          <a href="javascript:;">忘记密码</a>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loginValidate: {
          name: '',
          password: '',
        },
        loginRule: {
          nameRule: /^[a-zA-Z0-9_-]{4,16}$/, //用户名正则，4到16位(字母，数字，下划线，减号)
          passwordRule: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/ //6-21字母和数字组成
        }
      }
    },
    mounted() {
      
    },
    computed: {
      valid() {
        return this.validateName && this.validatePassword;
      },
      validateName() {
        return this.loginValidate.name === "" ? true : this.loginRule.nameRule.test(this.loginValidate.name);
      },
      validatePassword() {
        return this.loginValidate.password === "" ? true : this.loginRule.passwordRule.test(this.loginValidate.password);
      }
    },
    methods: {
      handleLogin() {
        // let names = this.loginValidate.name;
        // let password = this.loginValidate.password;
        // this.$local.save('userName', names);
        this.$router.push({name: 'menu'});
      }
    }
  }

</script>
<style scoped>
  * {margin: 0; padding: 0;}
  html, body {width: 100%; height: 100%; min-height: 100%; overflow: hidden;}
  .fl {float: left;}
  .width50 {width: 50%;}
  .mt40 {margin-top: 40px;}
  .login {width: 100%; height: 100%; position: relative; background: #3d6e8a url('../assets/login-bg.jpg') no-repeat fixed top;}
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
