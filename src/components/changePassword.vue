<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/img/logo.png">
      <div class="blueLine"></div>
    </div>
    <div class="formContent">
      <input type="password" v-model.trim="passwordValidate.origin" @blur="validatePassword('origin')" placeholder="原密码" autofocus />
      <p class="error" v-show="!originIsRight">格式错误</p>
      <input type="password" v-model.trim="passwordValidate.new" @blur="validatePassword('new')" placeholder="新密码" />
      <p class="error" v-show="!newIsRight">格式错误</p>
      <input type="password" v-model.trim="passwordValidate.comfirm" @blur="validatePassword('comfirm')" placeholder="确认新密码" />
      <p class="error" v-show="!comfirmIsRight">格式错误</p>
      <button :disabled="!originIsRight || !newIsRight || !comfirmIsRight" :style="{opacity: !originIsRight || !newIsRight || !comfirmIsRight ? '0.8' : '1'}" @click="handleChangePassword">修改</button>
      <a href="javascript:;" class="assist" @click="$router.push({name: 'menu'})">返回</a>
      <a href="javascript:;" style="text-align: left;" class="assist" @click="$router.push('/')">去登录</a>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        passwordValidate: {
          origin: '',
          new: '',
          comfirm: ''
        },
        passwordRule: {
          passwordRule: /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,21}$/ //6-21字母和数字组成
        },
        originIsRight: true,
        newIsRight: true,
        comfirmIsRight: true,
        loginName: ''
      }
    },
    mounted() {
      const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      this.loginName = userInfo.loginName;
    },
    methods: {
      validatePassword(type) {
        switch (type) {
          case 'origin':
            this.originIsRight = this.passwordValidate.origin === "" ? true : this.passwordRule.passwordRule.test(this.passwordValidate.origin);
            break;
          case 'new':
            this.newIsRight = this.passwordValidate.new === "" ? true : this.passwordRule.passwordRule.test(this.passwordValidate.new);
            break;
          case 'comfirm':
            this.comfirmIsRight = this.passwordValidate.comfirm === "" ? true : this.passwordRule.passwordRule.test(this.passwordValidate.comfirm);
            break;
        }
      },
      handleChangePassword() {
        if (this.passwordValidate.new !== this.passwordValidate.comfirm) {
          this.$Message.error('两次输入的新密码不一致');
          return;
        }
        let data = {
          loginName: this.loginName,
          password: this.passwordValidate.origin,
          newPassword: this.passwordValidate.new
        };
        axios({
          method: "POST",
          url: this.getBasePath(process.env.env) + '/resetPassword',
          data: data,
        }).then(response => {
          switch (response.data.code) {
            case 0:
              window.localStorage.setItem('userInfo', JSON.stringify(response.data.object));
              this.$router.push('/');
              break;
            default:
              this.$Message.error('修改密码失败');
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
          case 'prd':
            basePath = 'http://172.16.100.103';
            break;
          default:
            basePath = 'http://localhost';
            break;
        }
        return `${basePath}:9621/api`;
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
  .login {width: 100%; height: 100%; position: relative; background: #3d6e8a url('../assets/img/login-bg.jpg') no-repeat fixed top;}
  .logo {padding-top: 124px; text-align: center;}
  .logo > img {margin-bottom: 36px;}
  .logo > .blueLine {width: 400px; height: 12px; margin: 0 auto; background: #348ac9;}
  .formContent {width: 440px; margin: 0 auto; padding: 45px 45px; background: white;}
  .formContent input {font-size: 14px; color: #999; line-height: 50px; width: 100%; height: 50px; margin-bottom: 10px; outline: none; border: none; border-bottom: 1px solid #e2e2e2;}
  .formContent .error {font-size: 12px; color: red; line-height: 20px; height: 20px;}
  .formContent button {font-size: 16px; color: white; line-height: 50px; width: 100%; height: 50px; margin-top: 25px; outline: none; border: none; border-radius: 5px; background: #3393d6;}
  .formContent button:hover {background: #2c98e3;}
  .formContent a {color: #495060; line-height: 20px; text-align: right; width: 50%; height: 20px; float: right;}
  .assist {margin-top: 10px!important; color: #5cadff!important;}
</style>
