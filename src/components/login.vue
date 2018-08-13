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
  import common from '../assets/js/commonJs'
  import {encryptByDES, decryptByDES} from '../assets/js/cryptojs'

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
          passwordRule: /^(?![\d]+$)(?![a-zA-Z]+$)(?![!@#$%^&*]+$)[\da-zA-Z!@#$%^&*]{6,20}$/ // 6-20位数字和字母、特殊字符
        },
        loginNameIsRight: true,
        passwordIsRight: true,
        isRememberPassword: true,
        loginInfo: common.login.LOGIN_INFO()
      }
    },
    mounted() {
      this.loginNameIsRight = true
      this.passwordIsRight = true
      this.loadLoginInfo()
    },
    methods: {
      loadLoginInfo () {
        if (!this.isRememberPassword || !this.loginInfo) {
          return
        } else {
          this.loginValidate.loginName = this.loginInfo.userName
          this.loginValidate.password = decryptByDES(this.loginInfo.password)
          this.loginValidate.verifyCode = this.loginInfo.verifyCode
        }
      },
      validateName () {
        this.loginNameIsRight = this.loginValidate.loginName === "" ? true : this.loginRule.loginNameRule.test(this.loginValidate.loginName)
      },
      validatePassword () {
        this.passwordIsRight = this.loginValidate.password === "" ? true : this.loginRule.passwordRule.test(this.loginValidate.password)
      },
      handleLogin () {
        api.login(this.loginValidate).then(res => {
          if (res.code === 0) {
            this.saveUserInfo(JSON.stringify(res.object))
          }
        })
      },
      saveUserInfo (userInfo) {
        common.user.SET_USER_INFO(userInfo)
        if (this.isRememberPassword) {
          common.login.SET_LOGIN_INFO(JSON.stringify({userName: this.loginValidate.loginName, password: encryptByDES(this.loginValidate.password), verifyCode: ''}))
        } else {
          const hasLoginInfo = this.loginInfo !== undefined
          if (hasLoginInfo) {
            common.login.REMOVE_LOGIN_INFO()
          }
        }
        this.$router.push({name: 'menu'})
      }
    }
  }
</script>
