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
        <div class="serviceIcon">
          <a href="javascript:;">
            <Poptip trigger="hover" placement="bottom">
              <Badge :count="alertCount" overflow-count="99">
                <Icon type="md-warning" size="32"/>
              </Badge>
              <div class="mylist" slot="content">
                <div>
                  <input class="mylistSearch" type="text" v-model="searchAlert" @input="searchAlertResult" placeholder="请输入要查找的预警名称" />
                </div>
                <div class="mylistContent" v-for="(alert, index) in mockFilterAlertList" :key="index">
                  <a @click="showMockAlert(alert.alertType)">{{alert.alertName}}</a>
                  <p>
                    <Badge :count="alert.alertNumber" :offset="[10, 0]"></Badge>
                  </p>
                </div>
              </div>
            </Poptip>
          </a>
          <!--<a href="javascript:;">-->
            <!--<Badge :count="notifyCount" overflow-count="99">-->
              <!--<Tooltip content="通知">-->
                <!--<Icon type="md-notifications" size="32"/>-->
              <!--</Tooltip>-->
            <!--</Badge>-->
          <!--</a>-->
        </div>
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
      v-model="isShowAlertList"
      title="预警结果列表"
      width="760px">
      <Table :columns="mockAlertType1Column" :data="mockAlertType1Data" ref="type1" v-if="currentAlertType === 1"></Table>
      <Table :columns="mockAlertType1Column" :data="mockAlertType1Data" ref="type2" v-else-if="currentAlertType === 2"></Table>
      <Table :columns="mockAlertType3Column" :data="mockAlertType3Data" ref="type3" v-else-if="currentAlertType === 3"></Table>
      <Table :columns="mockAlertType4Column" :data="mockAlertType4Data" ref="type4" v-else></Table>
      <div slot="footer">
        <Button type="primary" @click="refresh(currentAlertType)">刷新</Button>
        <Button type="info" @click="exportXls(currentAlertType)">导出</Button>
        <Button type="default" @click="isShowAlertList = false">取消</Button>
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

      currentAlertType: 0,
      searchAlert: '',
      mockFilterAlertList: [],
      mockAlertList: [
        {
          alertType: 1,
          alertName: '合同即将到期预警',
          alertNumber: 3
        },
        {
          alertType: 2,
          alertName: '合同到期预警',
          alertNumber: 1
        },
        {
          alertType: 3,
          alertName: '退休预警',
          alertNumber: 2
        },
        {
          alertType: 4,
          alertName: '子女投保年龄到期前1月预警',
          alertNumber: 2
        }
      ],
      isShowAlertList: false,
      mockAlertType1Column: [
        {
          title: '管理方编号',
          key: 'managerId',
          width: 100
        },
        {
          title: '管理方名称',
          key: 'managerName',
          width: 100
        },
        {
          title: '客户编号',
          key: 'customerId',
          width: 100
        },
        {
          title: '客户名称',
          key: 'customerName',
          width: 200
        },
        {
          title: '雇员编号',
          key: 'employeeId',
          width: 100
        },
        {
          title: '雇员姓名',
          key: 'employeeName',
          width: 200
        },
        {
          title: '合同到期日期',
          key: 'contractDeadline',
          width: 200
        },
        {
          title: '客户服务',
          key: 'customerService',
          width: 100
        },
        {
          title: '咨询顾问',
          key: 'consulateAdviser',
          width: 100
        },
        {
          title: '中心',
          key: 'center',
          width: 100
        }
      ],
      mockAlertType1Data: [
        {managerId: 'm0001', managerName: 'mTest1', customerId: 'c0001', customerName: 'cTest1', employeeId: 'e0001', employeeName: 'eTest1', contractDeadline: '2018-08-23', customerService: 'test', consulateAdviser: 'caTest1', center: '01'},
        {managerId: 'm0002', managerName: 'mTest2', customerId: 'c0002', customerName: 'cTest2', employeeId: 'e0002', employeeName: 'eTest2', contractDeadline: '2018-08-23', customerService: 'test', consulateAdviser: 'caTest2', center: '02'},
        {managerId: 'm0003', managerName: 'mTest3', customerId: 'c0003', customerName: 'cTest3', employeeId: 'e0003', employeeName: 'eTest3', contractDeadline: '2018-08-23', customerService: 'test', consulateAdviser: 'caTest3', center: '03'}
      ],
      mockAlertType3Column: [
        {
          title: '管理方编号',
          key: 'managerId',
          width: 100
        },
        {
          title: '管理方名称',
          key: 'managerName',
          width: 100
        },
        {
          title: '客户编号',
          key: 'customerId',
          width: 100
        },
        {
          title: '客户名称',
          key: 'customerName',
          width: 200
        },
        {
          title: '雇员编号',
          key: 'employeeId',
          width: 100
        },
        {
          title: '雇员姓名',
          key: 'employeeName',
          width: 200
        },
        {
          title: '性别',
          key: 'gender',
          width: 80
        },
        {
          title: '出生日期',
          key: 'birthday',
          width: 100
        },
        {
          title: '客户服务',
          key: 'customerService',
          width: 100
        },
        {
          title: '咨询顾问',
          key: 'consulateAdviser',
          width: 100
        },
        {
          title: '中心',
          key: 'center',
          width: 100
        }
      ],
      mockAlertType3Data: [
        {managerId: 'm0001', managerName: 'mTest1', customerId: 'c0001', customerName: 'cTest1', employeeId: 'e0001', employeeName: 'eTest1', gender: '男', birthday: '1982-10-26', customerService: 'test', consulateAdviser: 'caTest1', center: '01'},
        {managerId: 'm0002', managerName: 'mTest2', customerId: 'c0002', customerName: 'cTest2', employeeId: 'e0002', employeeName: 'eTest2', gender: '女', birthday: '1982-10-26', customerService: 'test', consulateAdviser: 'caTest2', center: '02'},
      ],
      mockAlertType4Column: [
        {
          title: '管理方编号',
          key: 'managerId',
          width: 100
        },
        {
          title: '管理方名称',
          key: 'managerName',
          width: 100
        },
        {
          title: '客户编号',
          key: 'customerId',
          width: 100
        },
        {
          title: '客户名称',
          key: 'customerName',
          width: 200
        },
        {
          title: '雇员编号',
          key: 'employeeId',
          width: 100
        },
        {
          title: '雇员姓名',
          key: 'employeeName',
          width: 200
        },
        {
          title: '子女姓名',
          key: 'childName',
          width: 100
        },
        {
          title: '子女出生日期',
          key: 'childBirthday',
          width: 150
        },
        {
          title: '客户服务',
          key: 'customerService',
          width: 100
        },
        {
          title: '咨询顾问',
          key: 'consulateAdviser',
          width: 100
        },
        {
          title: '中心',
          key: 'center',
          width: 100
        }
      ],
      mockAlertType4Data: [
        {managerId: 'm0001', managerName: 'mTest1', customerId: 'c0001', customerName: 'cTest1', employeeId: 'e0001', employeeName: 'eTest1', childName: 'cnTest1', childBirthday: '2018-03-16', customerService: 'test', consulateAdviser: 'caTest1', center: '01'},
        {managerId: 'm0002', managerName: 'mTest2', customerId: 'c0002', customerName: 'cTest2', employeeId: 'e0002', employeeName: 'eTest2', childName: 'cnTest2', childBirthday: '2018-03-16', customerService: 'test', consulateAdviser: 'caTest2', center: '02'}
      ],
      alertCount: 0
    }
  },
  mounted () {
    !this.userInfo ? this.backToLogin() : this.validateToken()
    this.mockFilterAlertList = this.mockAlertList
  },
  methods: {
    showMockAlert (alertType) {
      this.isShowAlertList = true
      this.currentAlertType = alertType
    },
    getCountResult () {
      api.getCountResult({userId: this.userInfo.userId}).then(res => {
        if (res.code === 0) {
          this.alertCount = res.object
        }
      })
    },
    getListResult () {
      api.getListResult({userId: this.userInfo.userId}).then(res => {
        if (res.code === 0) {
          console.log(res)
        }
      })
    },
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
            this.getCountResult()
            this.getListResult()
            this.getAllMenuAuth()
          }
        }
      })
    },
    getAllMenuAuth () {
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
    exportXls (currentType) {
      this.$refs[`type${currentType}`].exportCsv({filename: `type${currentType}`})
    },
    searchAlertResult (e) {
      this.mockFilterAlertList = this.mockAlertList.filter(alert => {
        return alert.alertName.indexOf(this.searchAlert) !== -1
      })
    },
    refresh (currentAlertType) {

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
