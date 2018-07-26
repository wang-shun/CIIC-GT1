<template>
  <div class="bg">
    <div class="menuContent">
      <ul v-for="(centerRouter, index) in centerRouters" :key="index">
        <li v-for="(row, index) in centerRouter" :key="index">
          <a @click="clickPlatformId = row.platformId; validateToken(row.url)">
            <img :src="row.imgSrc" />
            <p>{{row.name}}</p>
          </a>
        </li>
      </ul>
    </div>
    <div class="menu">
      <div class="menuInfo">
        <span class="message"><span class="f16">欢迎您！<strong>{{userInfo ? userInfo.displayName : ''}}</strong></span><br/>工号：{{userInfo ? userInfo.employeeNumber : ''}}</span>
        <span class="arrow"></span>
        <Poptip trigger="hover" placement="bottom">
          <Badge count="0" overflow-count="999">
            <a href="javascript:;" class="icon">
              <img width="100%" :src="userInfo && userInfo.headPortrait ? userInfo.headPortrait : 'static/img/menu/defaultPortal.jpg'" alt="" />
            </a>
          </Badge>
          <div class="mylist" slot="content">
            <!-- <a href="http://172.16.9.25:8100/#/pending_approves">我的审批</a>
            <a href="javascript:;" @click="isActive = !isActive">我的任务单 {{isActive ? "▲" : "▼"}}</a>
            <div :class="[isActive ? 'changeToH' : 'changeToZ', 'myTaskList']">
              <a :href="task.url" v-for="(task, index) in taskList" :key="index" style="cursor: pointer;">{{task.label}}</a>
            </div>
            <a href="javascript:;">站内信</a>
            <a href="javascript:;">用户手册</a> -->
            <a href="javascript:;" @click="resetPassword">修改密码</a>
            <a href="javascript:;" @click="logout">退出登录</a>
          </div>
        </Poptip >
      </div>
    </div>

    <iframe id="crossFrame" class="crossFrame" src="#"></iframe>
  </div>
</template>
<script>
import api from '../assets/api/index'
import centerRouters from '../assets/data/center_routers'

const COUNT_OUT = 10

export default {
  data() {
    return {
      isActive: false,
      userInfo: JSON.parse(window.localStorage.getItem('userInfo')),
      clickPlatformId: -1,
      platformIds: new Set(),
      centerRouters: centerRouters,
      currentApi: '',
      postMessageInterval: {},
      postCount: 1
    }
  },
  mounted () {
    this.validateToken()
  },
  methods: {
    validateToken (url) {
      let params = new URLSearchParams()
      params.append("token", this.userInfo.token)
      api.getUserInfoByToken(params).then(res => {
        if (res.code !== 0) {
          this.backToLogin()
        } else {
          if (url) {
            window.localStorage.setItem('currentGoTo', url)
            this.getMenuAuth()
          }
        }
      })
    },
    getMenuAuth () {
      api.getPlatformAuth(this.userInfo.userId).then(res => {
        res.code !== 0 ? this.backToLogin() : this.setPlatformIds(res)
      })
    },
    setPlatformIds (platformAuto) {
      this.platformIds = new Set(platformAuto.data.replace(/\[|\]/g, '').replace(/ /g,'').split(','))
      if (this.platformIds && [...this.platformIds].length > 0) {
        const isCanRoute = this.platformIds.has(this.clickPlatformId)
        isCanRoute ? this.postCrossToken() : this.$Message.error('没有访问该中心的权限~')
      } else {
        this.$Message.error('没有访问该中心的权限~')
        return
      }
    },
    postCrossToken () {
      const _self = this
      this.registeMessageHandle()
      const currentGoto = window.localStorage.getItem('currentGoTo')
      document.getElementById('crossFrame').src = currentGoto
      this.postMessageInterval = setInterval(() => {
        if (_self.postCount >= COUNT_OUT) {
          clearInterval(_self.postMessageInterval)
        }
        window.frames[0].postMessage(JSON.stringify(_self.userInfo), currentGoto)
        _self.postCount++
      }, 1000)
    },
    registeMessageHandle () {
      const _self = this
      window.addEventListener('message', (event) => {
        const currentGoto = window.localStorage.getItem('currentGoTo').replace('http://', '').replace(/\//g, '').replace(/#/g, '')
        const origin = event.origin.replace('http://', '').replace(/\//g, '').replace(/#/g, '')
        if (currentGoto === origin) {
          const res = JSON.parse(event.data)
          if (res.code === 0) {
            clearInterval(_self.postMessageInterval)
            _self.postCount = 1
            _self.gotoCenter()
          }
        }
      }, false)
    },
    gotoCenter () {
      const currentGoto = window.localStorage.getItem('currentGoTo')
      window.localStorage.removeItem('currentGoTo')
      window.location.href = currentGoto
    },
    logout () {
      const CLEAR_AND_BACK = () => {
        window.localStorage.clear()
        this.backToLogin()
      }
      api.logout(this.userInfo.token).then(res => {
        CLEAR_AND_BACK()
      })
    },
    resetPassword () {
      this.$router.push('changePassword')
    },
    backToLogin () {
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
* {margin: 0; padding: 0;}
html, body {width: 100%; height: 100%; min-height: 100%; overflow: hidden;}
.crossFrame {display: none; position: absolute; z-index: 999; top: -999px; left: -999px;}
.bg {height: 480px; position: relative; z-index: 1; background: #3d6e8a url('../assets/img/menu-bg.png') no-repeat center top;}
.f16 {font-size: 16px;}
.menu {width: 100%; height: 175px;}
.menu > .menuInfo, .menu > .menuItem {text-align: right; width: 66%; margin: 0 auto;}
.menu > .menuInfo {padding-top: 35px;}
.menu > .menuItem {padding: 15px 0;}

.menuInfo span, .menuItem a {font-size: 14px; color: #579bc2; text-align: right; display: inline-block; vertical-align: middle;}
.message {padding: 8px 16px; border-radius: 10px; cursor: pointer; background: #295974;}
.menuInfo > .arrow {width:0; height:0; margin-left: -5px; border-top:10px solid transparent; border-bottom: 10px solid transparent; border-left: 10px solid #295974;}
.menuInfo .icon {display: block; width: 48px; height: 48px; border-radius: 24px; overflow: hidden; border: 1px solid white;}

.menuInfo .mylist a {font-size: 12px; line-height: 40px; text-align: center; color: #666; display: block; height: 40px; border-bottom: 1px dotted #eee;}
.menuInfo .mylist a:last-child {border-bottom: none;}
.menuInfo .mylist a:hover {color: #2d8cf0;}
.menuInfo .mylist .myTaskList {height: 0; overflow-y: auto;}
.menuInfo .mylist .myTaskList a {display: block; padding: 5px; background: #eee;}
.changeToH {animation: changeToHeight 0.5s ease 0s 1 alternate forwards;}
.changeToZ {animation: changeToZero 0s ease 0s 1 alternate forwards;}

.menuItem a {margin-left: 24px;}
.menuItem .email {width: 28px; height: 28px; border-radius: 14px; background: url('../assets/img/email.png') no-repeat center center;}
.menuItem .bag {width: 28px; height: 28px; border-radius: 10px; background: url('../assets/img/bag.png') no-repeat center center;}
.menuItem .help {width: 28px; height: 28px; border-radius: 14px; background: url('../assets/img/help.png') no-repeat center center;}

.menuContent {position: fixed; top: 120px; left: 17%; width: 66%; margin: 0 auto; padding: 1%; box-shadow: 5px 25px 55px rgba(61, 110, 138, 0.3); background: white;}
.menuContent ul {border-top: 1px solid #ccc; border-left: 1px solid #ccc; border-right: 1px solid #ccc; overflow: hidden; margin-top: -1px;}
.menuContent ul:nth-child(3) {border-bottom: 0; border-right: 1px solid white;}
.menuContent ul:nth-child(3) li {border-bottom: 1px solid #ccc;}
.menuContent ul:nth-child(3) li:last-child {border-right: 1px solid #ccc;}

.menuContent > ul > li {display: block; width: 20%; float: left; border-right: 1px solid #ccc; position: relative;}
.menuContent > ul > li:hover {animation: neon2 2s infinite linear alternate;}
.menuContent > ul > li:last-child {border-right: 0;}
.menuContent > ul > li a {text-align: center; display: inline-block; width: 100%; height: 100%; padding: 10% 16%;}
.menuContent > ul > li a img {width: 76%;}
.menuContent > ul > li p {font-size: 16px; color: #747474; width: 100%; height: 50px; line-height: 50px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}

.mi {
  width: 250px;
  text-align: left;

  border:0;
  padding: 5px 10px;
}

@keyframes neon2 {
  from {box-shadow: inset 0 0 10px #5cadff;}
  to {box-shadow: inset 0 0 50px #b6dafe;}
}

@keyframes changeToHeight {
  from {height: 0;}
  to {height: 170px;}
}
@keyframes changeToZero {
  from {height: 170px;}
  to {height: 0;}
}
</style>
