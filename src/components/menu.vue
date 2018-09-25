<template>
  <div class="bg">
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
        <!--<div class="serviceIcon">-->
          <!--<a href="javascript:;">-->
            <!--<Poptip trigger="hover" placement="bottom">-->
              <!--<Badge :count="alertCount" overflow-count="99">-->
                <!--<Icon type="md-warning" size="32"/>-->
              <!--</Badge>-->
              <!--<div class="mylist" slot="content">-->
                <!--<div>-->
                  <!--<input class="mylistSearch" type="text" v-model="searchAlert" @input="searchAlertResult" placeholder="请输入要查找的预警名称" />-->
                <!--</div>-->
                <!--<div class="mylistContent" v-for="(alert, index) in filterAlertList" :key="index">-->
                  <!--<a @click="showAlertDetail(alert.alertId, alert.type)">{{alert.alertName}}</a>-->
                  <!--<p>-->
                    <!--<Badge v-if="(alert.count > 0) && (alert.readStatus !== 1)" :count="alert.count" :offset="[10, 0]"></Badge>-->
                  <!--</p>-->
                <!--</div>-->
              <!--</div>-->
            <!--</Poptip>-->
          <!--</a>-->
          <!--<a href="javascript:;">-->
            <!--<Badge :count="notifyCount" overflow-count="99">-->
              <!--<Tooltip content="通知">-->
                <!--<Icon type="md-notifications" size="32"/>-->
              <!--</Tooltip>-->
            <!--</Badge>-->
          <!--</a>-->
        <!--</div>-->
        <span class="message"><span class="f16">欢迎您！<strong>{{userInfo ? userInfo.displayName : ''}}</strong></span><br/>工号：{{userInfo ? userInfo.employeeNumber : ''}}</span>
        <span class="arrow"></span>
        <Poptip trigger="hover" placement="bottom" width="150">
          <Badge :count="0" overflow-count="999">
            <a href="javascript:;" class="icon">
              <img width="100%" :src="userInfo && userInfo.headPortrait ? userInfo.headPortrait : 'static/img/menu/defaultPortal.jpg'" alt="" />
            </a>
          </Badge>
          <div class="mylist" slot="content" style="width: 118px!important;">
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
        </Poptip>
      </div>
    </div>
    <Modal
      v-model="isShowAlertDetailList"
      title="预警结果列表"
      width="760px">
      <Table ref="alertDetailList" :columns="currentAlertDetailColumns" :data="alertDetailList" border></Table>
      <div slot="footer">
        <!--<Button type="primary" @click="run" v-if="alertDetailList.length > 0">立即执行</Button>-->
        <Button type="primary" @click="refresh">刷新</Button>
        <Button type="info" @click="exportXls">导出</Button>
        <Button type="default" @click="isShowAlertDetailList = false">取消</Button>
      </div>
    </Modal>
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
      postCount: 1,
      currentAlertId: -1,
      currentAlertType: -1,
      alertCount: 0,
      isShowAlertDetailList: false,
      searchAlert: '',
      alertList: [],
      filterAlertList: [],
      alertDetailColumns: [],
      currentAlertDetailColumns: [],
      alertDetailList: []
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
            if (this.platformIds.has(this.clickPlatformId)) {
              common.goto.SET_CURRENT_GOTO(url)
              this.postCrossToken()
            } else {
              this.$Message.error('您没有访问该中心的权限~')
              return
            }
          } else {
//            this.getListAllTypeAndConfig()
//            this.getCountResult()
//            this.getListResult()
            this.getAllMenuAuth()
          }
        }
      })
    },
    getListAllTypeAndConfig () {
      api.listAllTypeAndConfig({configType: '1'}).then(res => {
        this.createTypeAndConfigColumn(res.data)
      })
    },
    createTypeAndConfigColumn (data) {
      const _self = this
      data.forEach(column => {
        let alertDetail = {
          id: -1,
          name: '',
          columns: []
        }
        alertDetail.id = column.id
        alertDetail.name = column.name
        column.alertFieldResponseDTOS.forEach(field => {
          let c = {
            title: '',
            key: '',
          }
          c.title = field.field
          c.key = field.name
          alertDetail.columns.push(c)
        })
        _self.alertDetailColumns.push(alertDetail)
      })
    },
    getCountResult () { // 预警总数
      api.getCountResult({userId: this.userInfo.userId}).then(res => {
        if (res.code === 0) {
          this.alertCount = res.data
        }
      })
    },
    getListResult () { // 预警结果列表
      const _self = this
      api.getListResult({userId: _self.userInfo.userId}).then(res => {
        if (res.code === 0) {
          _self.filterAlertList = _self.alertList = res.data
        }
      })
    },
    getAllMenuAuth () { // 获得可操作中心的权限
      const _self = this
      api.getPlatformAuth(this.userInfo.userId).then(res => {
        if (res.code !== 0) {
          this.removeIFrame()
          this.backToLogin()
        } else {
          this.platformIds = new Set(res.data.replace(/\[|\]/g, '').replace(/ /g,'').split(','))
          centerRouters.forEach(row => {
            row.forEach(center => {
              _self.createIFrame(center)
            })
          })
        }
      })
    },
    createIFrame (center) {
      if (document.getElementById(center.platformId) !== null) {
        return
      }
      let crossFrame = document.createElement('iframe')
      crossFrame.setAttribute('id', center.platformId)
      crossFrame.style.display = 'none'
      crossFrame.style.position = 'absolute'
      crossFrame.style.left = '-999px'
      crossFrame.style.top = '-999px'
      crossFrame.style.zIndex = 999 + parseInt(center.platformId)
      crossFrame.src = center.url
      document.body.appendChild(crossFrame)
    },
    postCrossToken () {
      const _self = this
      const currentGoto = common.goto.CURRENT_GOTO()
      this.postMessageInterval = setInterval(() => {
        if (_self.postCount >= common.COUNT_OUT) {
          clearInterval(_self.postMessageInterval)
        }
        _self.postCount++
        document.getElementById(this.clickPlatformId).contentWindow.postMessage(JSON.stringify(_self.userInfo), currentGoto)
      }, 100)
    },
    showAlertDetail (alertId, type) {
      const _self = this
      _self.currentAlertId = alertId
      _self.currentAlertType = type
      api.getResultDetail({userId: _self.userInfo.userId, alertId: alertId}).then(res => {
        _self.alertDetailColumns.forEach(column => {
          if (column.id === parseInt(type)) {
            _self.currentAlertDetailColumns = column.columns
            _self.alertDetailList = JSON.parse(res.data.result)
            _self.isShowAlertDetailList = true
          }
        })
      })
      api.markAsRead(({userId: _self.userInfo.userId, alertId: alertId})).then(res => {
        if (res.code === 0) {
          _self.getCountResult()
          _self.getListResult()
        }
      })
    },
    searchAlertResult (e) {
      this.filterAlertList = this.alertList.filter(alert => {
        return alert.alertName.indexOf(this.searchAlert) !== -1
      })
    },
    refresh () {
      this.showAlertDetail(this.currentAlertId, this.currentAlertType)
    },
    run () {
      api.run({alertId: this.currentAlertId}).then(res => {
        this.$Message.success('已执行，请稍后刷新查看结果')
      })
    },
    removeIFrame () {
      [...this.platformIds].forEach(id => {
        const frame = document.getElementById(id)
        if (frame) {
          document.body.removeChild(frame)
        }
      })
    },
    logout () {
      const CLEAR_AND_BACK = () => {
        common.user.REMOVE_USER_INFO()
        this.removeIFrame()
        this.backToLogin()
      }
      api.logout({token: this.userInfo.token}).then(res => {
        if (res.code === 0) {
          CLEAR_AND_BACK()
        }
      })
    },
    exportXls () {
      this.$refs['alertDetailList'].exportCsv()
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
