<template>
  <div class="bg">
    <div class="menuContent">
      <ul v-for="(centerRouter, index) in centerRouters" :key="index">
        <li v-for="(row, index) in centerRouter" :key="index">
          <a @click="validateToken(row.url)">
            <img :src="row.imgSrc" />
            <p>{{row.name}}</p>
          </a>
        </li>
      </ul>
    </div>
    <div class="menu">
      <div class="menuInfo">
        <span class="message"><span class="f16">欢迎您！<strong>{{userInfo.displayName}}</strong></span><br/>工号：{{userInfo.employeeNumber}}</span>
        <span class="arrow"></span>
        <Poptip trigger="hover" placement="bottom">
          <Badge count="0" overflow-count="999">
            <a href="javascript:;" class="icon">
              <img width="100%" :src="userInfo.headPortrait" alt="" />
            </a>
          </Badge>
          <div class="mylist" slot="content">
            <a href="http://172.16.9.25:8100/#/pending_approves">我的审批</a>
            <a href="javascript:;" @click="isActive = !isActive">我的任务单 {{isActive ? "▲" : "▼"}}</a>
            <div :class="[isActive ? 'changeToH' : 'changeToZ', 'myTaskList']">
              <a :href="task.url" v-for="(task, index) in taskList" :key="index">{{task.label}}</a>
            </div>
            <a href="javascript:;">站内信</a>
            <a href="javascript:;">用户手册</a>
            <a href="javascript:;" @click="resetPassword">修改密码</a>
            <a href="javascript:;" @click="logout">退出登录</a>
          </div>
        </Poptip >
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import {CrossStorageClient, CrossStorageHub} from 'cross-storage'
  export default {
    data() {
      return {
        isActive: false,
        userInfo: {},
        centerRouters: [
          [
            {url: `${this.getBasePath(process.env.env).basePath}:8100/`, imgSrc: 'static/img/menu/sales_center.png', name: '销售中心'},
            {url: `${this.getBasePath(process.env.env).basePath}:8106/`, imgSrc: 'static/img/menu/product_center.png', name: '产品中心'},
            {url: `${this.getBasePath(process.env.env).basePath}:8105/`, imgSrc: 'static/img/menu/supporter_manage_center.png', name: '供应商管理中心'},
            {url: `${this.getBasePath(process.env.env).basePath}:8103/`, imgSrc: 'static/img/menu/foreign_service_center.png', name: '客服中心'},
            {url: `${this.getBasePath(process.env.env).basePath}:8101/`, imgSrc: 'static/img/menu/foreign_employee_center.png', name: '雇员中心'},
          ],
          [
            {url: `${this.getBasePath(process.env.env).basePath}:8108/#/main/`, imgSrc: 'static/img/menu/foreign_support_center.png', name: '外企支持中心'},
            {url: `${this.getBasePath(process.env.env).basePath}:8109/#/`, imgSrc: 'static/img/menu/proxy_center.png', name: '代理中心'},
            {url: `${this.getBasePath(process.env.env).basePath}:8107/#/`, imgSrc: 'static/img/menu/foreign_control_center.png', name: '外企内控中心'},
            {url: `${this.getBasePath(process.env.env).basePath}:8112/#/`, imgSrc: 'static/img/menu/finance_advisory_business_center.png', name: '财务咨询业务中心'},
            {url: `${this.getBasePath(process.env.env).basePath}:8113/#/`, imgSrc: 'static/img/menu/finance_advisory_operator_center.png', name: '财务咨询运营中心'},
          ],
          [
            {url: `${this.getBasePath(process.env.env).basePath}:8104/`, imgSrc: 'static/img/menu/service_outsourcing_business_center.png', name: '服务外包业务中心'},
            {url: `${this.getBasePath(process.env.env).basePath}:8110/#/`, imgSrc: 'static/img/menu/bill_center.png', name: '账单中心'},
            {url: `${this.getBasePath(process.env.env).basePath}:8111/#/`, imgSrc: 'static/img/menu/settlement_center.png', name: '结算中心'},
            {url: '#', imgSrc: 'static/img/menu/finance_advisory_report_center.png', name: '报表中心'},
            {url: '#', imgSrc: 'static/img/menu/business_intelligence_center.png', name: '商业智能中心'},
          ],
        ],
        taskList: [
          {label: "雇员预录用-预增", url: `${this.getBasePath(process.env.env).basePath}:8101/workOrder/main/preEmploy`},
          {label: "雇员预录用-发放offer", url: `${this.getBasePath(process.env.env).basePath}:8101/workOrder/main/preEmploy`},
          {label: "雇员预录用-入职体检", url: `${this.getBasePath(process.env.env).basePath}:8101/workOrder/main/preEmploy`},
          {label: "雇员预录用-背景调查", url: `${this.getBasePath(process.env.env).basePath}:8101/workOrder/main/preEmploy`},
          {label: "雇员新进-新入职", url: `${this.getBasePath(process.env.env).basePath}:8101/workOrder/main/preEmploy`},
          {label: "雇员新进-集体转入,无需用工", url: `${this.getBasePath(process.env.env).basePath}:8101/workOrder/main/preEmploy`},
          {label: "雇员变更-外地社保转上海", url: `${this.getBasePath(process.env.env).basePath}:8101/workOrder/main/preEmploy`},
          {label: "雇员变更-上海社保转外地", url: `${this.getBasePath(process.env.env).basePath}:8101/workOrder/main/preEmploy`},
          {label: "雇员变更-翻牌（更改用工单位）", url: `${this.getBasePath(process.env.env).basePath}:8101/workOrder/main/preEmploy`},
          {label: "雇员变更-上海基数调整", url: `${this.getBasePath(process.env.env).basePath}:8101/workOrder/main/preEmploy`},
          {label: "雇员变更-外地基数调整", url: `${this.getBasePath(process.env.env).basePath}:8101/workOrder/main/preEmploy`},
          {label: "雇员变更-暂停缴费", url: `${this.getBasePath(process.env.env).basePath}:8101/workOrder/main/preEmploy`},
          {label: "雇员变更-恢复缴费", url: `${this.getBasePath(process.env.env).basePath}:8101/workOrder/main/preEmploy`},
          {label: "雇员终止-离职", url: `${this.getBasePath(process.env.env).basePath}:8101/workOrder/main/preEmploy`},
          {label: "雇员终止-集体转出，无需退工", url: `${this.getBasePath(process.env.env).basePath}:8101/workOrder/main/preEmploy`},
          {label: "雇员变更-人员性质转换", url: `${this.getBasePath(process.env.env).basePath}:8101/workOrder/main/preEmploy`},
          {label: "雇员变更-修改用退工信息", url: `${this.getBasePath(process.env.env).basePath}:8101/workOrder/main/preEmploy`}
        ]
      }
    },
    mounted() {
      this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      const currentEnv = this.getBasePath(process.env.env);
      CrossStorageHub.init([
        {origin: currentEnv.originReg, allow: ['get', 'set', 'del', 'getKeys', 'clear']}
      ])
    },
    methods: {
      validateToken(url) {
        const that = this;
        let param = new URLSearchParams();
        param.append("token", that.userInfo.token);
        axios({
          method: "POST",
          url: `${this.getBasePath(process.env.env).serverPath}/api/getUserInfoByToken`,
          data: param,
        }).then(response => {
          if(response.data.code !== 0) {
            this.backToLogin();
            return;
          } else {
            that.setCrossToken(url)
          }
        })
      },
      setCrossToken(url) {
        let that = this;
        const currentEnv = this.getBasePath(process.env.env);
        let storage = new CrossStorageClient(`${currentEnv.basePath}:8070/#/menu`);
        storage.onConnect().then(() => {
          window.location.href = url;
          return storage.set('token', JSON.stringify(that.userInfo));
        }).catch(function(err) {
          this.backToLogin();
        })
      },
      logout() {
        window.localStorage.removeItem('userInfo');
        let that = this;
        const currentEnv = this.getBasePath(process.env.env);
        let storage = new CrossStorageClient(`${currentEnv.basePath}:8070/#/menu`);
        storage.onConnect().then(() => {
          that.backToLogin();
          return storage.clear()
        }).catch(function(err) {
          console.log(err);
        })
      },
      resetPassword() {
        this.$router.push('changePassword');
      },
      getBasePath(env) {
        let basePath = '';
        let serverPath = '';
        let originReg;
        switch (env) {
          case 'dev':
            basePath = 'http://localhost';
            serverPath = 'http://172.16.9.31';
            originReg = /localhost:.*$/;
            break
          case 'sit':
            basePath = 'http://172.16.9.25';
            serverPath = 'http://172.16.9.24';
            originReg = /172.16.9.25:.*$/;
            break
          case 'uat':
            basePath = 'http://172.16.9.60';
            serverPath = 'http://172.16.9.56';
            originReg = /172.16.9.60:.*$/;
            break
          case 'prod':
            basePath = 'http://172.16.9.60';
            serverPath = 'http://172.16.9.60';
            originReg = /172.16.9.60:.*$/;
            break
          default:
            basePath = 'http://localhost';
            serverPath = 'http://172.16.9.31';
            originReg = /localhost:.*$/;
            break
        }
        return {basePath: basePath, serverPath: `${serverPath}:9621`, originReg: originReg}
      },
      openMessageBox() {
        this.$Notice.open({
          desc: '<div style="max-height: 100px; overflow-y: auto;"><h3>标题1</h3><p>我是标题1的内容</p><br/><h3>标题2</h3><p>我是标题2的内容</p><br/><h3>标题3</h3><p>我是标题3的内容</p></div>',
          duration: 0
        });
      },
      backToLogin() {
        this.$router.push('/')
      }
    }
  }

</script>
<style scoped>
  * {margin: 0; padding: 0;}
  html, body {width: 100%; height: 100%; min-height: 100%; overflow: hidden;}
  .bg {height: 480px; position: relative; z-index: 1; background: #3d6e8a url('../assets/menu-bg.png') no-repeat center top;}
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
  .menuItem .email {width: 28px; height: 28px; border-radius: 14px; background: url('../assets/email.png') no-repeat center center;}
  .menuItem .bag {width: 28px; height: 28px; border-radius: 10px; background: url('../assets/bag.png') no-repeat center center;}
  .menuItem .help {width: 28px; height: 28px; border-radius: 14px; background: url('../assets/help.png') no-repeat center center;}

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
