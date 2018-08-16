<template>
  <div class="bg" @click="clickPlatformId = -1">
    <div class="menuContent">
      <ul v-for="(centerRouter, index) in centerRouters" :key="index">
        <li v-for="(row, index) in centerRouter" :key="index">
          <a @click.stop="clickPlatformId = row.platformId; validateToken(row.url)">
            <img :src="row.imgSrc" />
            <p>{{row.name}}</p>
          </a>
          <!--<div class="mask" v-if="clickPlatformId === row.platformId">-->
            <!--<div>-->
              <!--<p>跳转中...</p>-->
            <!--</div>-->
          <!--</div>-->
        </li>
      </ul>
    </div>
    <div class="menu">
      <div class="menuInfo">
        <div class="serviceIcon">
          <a href="javascript:;">
            <Badge :count="99" overflow-count="99">
              <Tooltip content="通知">
                <Icon type="md-notifications" size="32"/>
              </Tooltip>
            </Badge>
          </a>
          <a href="javascript:;">
            <Badge :count="99" overflow-count="99">
              <Tooltip content="预警">
                <Icon type="md-warning" size="32"/>
              </Tooltip>
            </Badge>
          </a>
          <!--<span class="help"></span>-->
        </div>
        <span class="message"><span class="f16">欢迎您！<strong>{{userInfo ? userInfo.displayName : ''}}</strong></span><br/>工号：{{userInfo ? userInfo.employeeNumber : ''}}</span>
        <span class="arrow"></span>
        <Poptip trigger="hover" placement="bottom">
          <Badge :count="0" overflow-count="999">
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
  </div>
</template>
<script>
import api from '../assets/api/index'
import common from '../assets/js/commonJs'
import centerRouters from '../assets/data/center_routers'

export default {
  data() {
    return {
      isActive: false,
      userInfo: common.user.USER_INFO(),
      clickPlatformId: -1,
      platformIds: new Set(),
      centerRouters: centerRouters,
      postMessageInterval: {},
      postCount: 1
    }
  },
  mounted () {
    !this.userInfo ? this.backToLogin() : this.validateToken()
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
            this.createIFrame(url)
            common.goto.SET_CURRENT_GOTO(url)
            this.getMenuAuth()
          }
        }
      })
    },
    getMenuAuth () {
      api.getPlatformAuth(this.userInfo.userId).then(res => {
        if (res.code !== 0) {
          this.removeIFrame()
          this.backToLogin()
        } else {
          this.setPlatformIds(res)
        }
      })
    },
    setPlatformIds (platformAuth) {
      this.platformIds = new Set(platformAuth.data.replace(/\[|\]/g, '').replace(/ /g,'').split(','))
      if (this.platformIds && [...this.platformIds].length > 0 && this.platformIds.has(this.clickPlatformId)) {
        this.postCrossToken()
      } else {
        this.removeIFrame()
        this.$Message.error('没有访问该中心的权限~')
      }
    },
    postCrossToken () {
      const _self = this
      const currentGoto = common.goto.CURRENT_GOTO()
      this.postMessageInterval = setInterval(() => {
        if (_self.postCount >= common.COUNT_OUT) {
          clearInterval(_self.postMessageInterval)
        }
        _self.postCount++
        window.frames[0].postMessage(JSON.stringify(_self.userInfo), currentGoto)
      }, 100)
    },
    createIFrame (url) {
      if (document.getElementById('crossFrame') !== null) {
        return
      }
      let crossFrame = document.createElement('iframe')
      crossFrame.setAttribute('id', 'crossFrame')
      crossFrame.style.display = 'none'
      crossFrame.style.position = 'absolute'
      crossFrame.style.left = '-999px'
      crossFrame.style.top = '-999px'
      crossFrame.style.zIndex = '999'
      crossFrame.src = url
      document.body.appendChild(crossFrame)
    },
    removeIFrame () {
      document.body.removeChild(document.getElementById('crossFrame'))
    },
    logout () {
      const CLEAR_AND_BACK = () => {
        common.user.REMOVE_USER_INFO()
        this.backToLogin()
      }
      api.logout({token: this.userInfo.token}).then(res => {
        if (res.code === 0) {
          CLEAR_AND_BACK()
        }
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
