<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/logo.png">
      <div class="blueLine"></div>
    </div>
    <div class="formContent">
      <input type="text" v-model.trim="loginValidate.name" @blur="validateName" placeholder="用户名" autofocus />
      <p class="error" v-show="!nameIsRight">用户名格式错误</p>
      <input type="password" v-model.trim="loginValidate.password" @blur="validatePassword" placeholder="密码" />
      <p class="error" v-show="!passwordIsRight">密码格式错误</p>
      <button :disabled="!nameIsRight||!passwordIsRight" :style="{opacity: !nameIsRight||!passwordIsRight ? '0.8' : '1'}" @click="handleLogin">登录</button>
      <div class="mt40">
        <!--<CheckboxGroup class="width50 fl">-->
          <!--<Checkbox label="记住密码" v-model="isRememberPassword"></Checkbox>-->
        <!--</CheckboxGroup>-->
        <a href="javascript:;">忘记密码?</a>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
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
        },
        nameIsRight: true,
        passwordIsRight: true,
        isRememberPassword: true
      }
    },
    mounted() {
//      const href = window.location.href;
//      let hasQuestionMark = href.indexOf('?');
//      if (hasQuestionMark !== -1) {
//        let params = this.analisyParams(href.substring(hasQuestionMark).replace('?', ''));
//        if (Array.isArray(params)) {
//
//        } else {
//          this.$Message.error('登录超时，请重新登录');
//        }
//      }
    },
    methods: {
      validateName() {
        this.nameIsRight = this.loginValidate.name === "" ? true : this.loginRule.nameRule.test(this.loginValidate.name);
      },
      validatePassword() {
        this.passwordIsRight = this.loginValidate.password === "" ? true : this.loginRule.passwordRule.test(this.loginValidate.password);
      },
      handleLogin() {
        let data = {
          loginName: this.loginValidate.name,
          password: this.loginValidate.password,
          verifyCode: ''
        };
        axios({
          method: "POST",
          url: this.getBasePath(process.env.env) + '/login',
          data: data,
        }).then(response => {
          switch (response.data.code) {
            case 0:
              window.localStorage.setItem('userInfo', JSON.stringify(response.data.object));
              this.$router.push({name: 'menu'});
              break;
            default:
              this.$Message.error('用户名或密码错误');
              break;
          }
        })
      },
      getBasePath(env) {
        let basePath = '';
        switch (env) {
          case 'dev':
            basePath = 'http://172.16.9.31';
            break;
          case 'sit':
            basePath = 'http://172.16.9.24';
            break;
          case 'uat':
            basePath = 'http://172.16.9.56';
            break;
          case 'prod':
            basePath = 'http://172.16.9.60';
            break;
          default:
            basePath = 'http://localhost';
            break;
        }
        return `${basePath}:9621/api`;
      },
      analisyParams(params) {
        const hasAndMark = params.indexOf('&');
        let paramsArr = [];
        if (hasAndMark !== -1) {
          paramsArr = hasAndMark.split('&');
          paramsArr.forEach((param, index, arr) => {
            const hasQuestionMark = param.indexOf('=');
            if (hasQuestionMark !== -1) {
              const tmpArr = param.split('=');
              let tmpObj = {};
              tmpObj[tmpArr[0]] = tmpArr[1]
              paramsArr[index] = tmpObj;
            }
          })
        } else {
          const hasQuestionMark = params.indexOf('=');
          if (hasQuestionMark !== -1) {
            paramsArr = params.split('=');
            let tmpObj = {};
            tmpObj[paramsArr[0]] = paramsArr[1];
            paramsArr = tmpObj;
          }
        }
        return paramsArr;
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
