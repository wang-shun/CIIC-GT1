<template>
  <div class="bg">
    <div class="menuContent">
      <ul>
        <li><a href="http://172.16.9.25:8100/"><img src="../assets/menu/sales_center.png" alt="销售中心" /><p>销售中心</p></a></li>
        <li><a href="http://172.16.9.25:8103/"><img src="../assets/menu/foreign_service_center.png" alt="外企客服中心" /><p>外企客服中心</p></a></li>
        <li><a href="http://172.16.9.25:8109/#/"><img src="../assets/menu/proxy_center.png" alt="代理中心" /><p>代理中心</p></a></li>
        <li><a href="http://172.16.9.25:8101/"><img src="../assets/menu/foreign_employee_center.png" alt="外企雇员中心" /><p>外企雇员中心</p></a></li>
        <li><a href="http://172.16.9.25:8104/"><img src="../assets/menu/service_outsourcing_business_center.png" alt="服务外包业务中心" /><p>服务外包业务中心</p></a></li>
        <li><a href="http://172.16.9.25:8108/#/main/"><img src="../assets/menu/foreign_support_center.png" alt="外企支持中心" /><p>外企支持中心</p></a></li>
        <li><a href="http://172.16.9.25:8112/#/"><img src="../assets/menu/finance_advisory_business_center.png" alt="财务咨询业务中心" /><p>财务咨询业务中心</p></a></li>
        <li><a href="http://172.16.9.25:8110/#/"><img src="../assets/menu/bill_center.png" alt="账单中心" /><p>账单中心</p></a></li>
        <li><a href="http://172.16.9.25:8111/#/"><img src="../assets/menu/settlement_center.png" alt="结算中心" /><p>结算中心</p></a></li>
        <li><a href="#"><img src="../assets/menu/finance_advisory_report_center.png" alt="财务咨询报表中心" /><p>财务咨询报表中心</p></a></li>
        <li><a href="http://172.16.9.25:8106"><img src="../assets/menu/product_center.png" alt="产品中心" /><p>产品中心</p></a></li>
        <li><a href="http://172.16.9.25:8105/"><img src="../assets/menu/supporter_manage_center.png" alt="供应商管理中心" /><p>供应商管理中心</p></a></li>
        <li><a href="http://172.16.9.25:8107/dic_list"><img src="../assets/menu/foreign_control_center.png" alt="外企内控中心" /><p>外企内控中心</p></a></li>
        <li><a href="http://172.16.9.25:8113/#/"><img src="../assets/menu/finance_advisory_operator_center.png" alt="财务咨询运营中心" /><p>财务咨询运营中心</p></a></li>
      </ul>
    </div>
    <div class="menu">
      <div class="menuInfo">
        <span class="message"><span class="f16">欢迎您！<strong>莉莉艾伦</strong></span><br/>工号：1813</span>
        <span class="arrow"></span>
        <Poptip trigger="hover" placement="bottom">
          <Badge count="5" overflow-count="999">
            <span class="icon"></span>
          </Badge>
          <div class="mylist" slot="content">
            <a href="http://172.16.9.25:8100/#/pending_approves">我的审批</a>
            <a href="javascript:;" @click="isActive = !isActive">我的任务单 {{isActive ? "▲" : "▼"}}</a>
            <div :class="[isActive ? 'changeToH' : 'changeToZ', 'myTaskList']">
              <a :href="task.url" v-for="(task, index) in taskList" :key="index">{{task.label}}</a>
            </div>
            <a href="javascript:;" @click="openMessageBox">站内信</a>
            <a href="javascript:;">用户手册</a>
            <a href="javascript:;">修改密码</a>
            <a href="javascript:;" @click="backToLogin">退出登录</a>
          </div>
        </Poptip >
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isActive: false,
        taskList: [
          {label: "雇员预录用-预增", url: "http://172.16.9.25:8101/workOrder/main/preEmploy"},
          {label: "雇员预录用-发放offer", url: "http://172.16.9.25:8101/workOrder/main/preEmploy"},
          {label: "雇员预录用-入职体检", url: "http://172.16.9.25:8101/workOrder/main/preEmploy"},
          {label: "雇员预录用-背景调查", url: "http://172.16.9.25:8101/workOrder/main/preEmploy"},
          {label: "雇员新进-新入职", url: "http://172.16.9.25:8101/workOrder/main/preEmploy"},
          {label: "雇员新进-集体转入,无需用工", url: "http://172.16.9.25:8101/workOrder/main/preEmploy"},
          {label: "雇员变更-外地社保转上海", url: "http://172.16.9.25:8101/workOrder/main/preEmploy"},
          {label: "雇员变更-上海社保转外地", url: "http://172.16.9.25:8101/workOrder/main/preEmploy"},
          {label: "雇员变更-翻牌（更改用工单位）", url: "http://172.16.9.25:8101/workOrder/main/preEmploy"},
          {label: "雇员变更-上海基数调整", url: "http://172.16.9.25:8101/workOrder/main/preEmploy"},
          {label: "雇员变更-外地基数调整", url: "http://172.16.9.25:8101/workOrder/main/preEmploy"},
          {label: "雇员变更-暂停缴费", url: "http://172.16.9.25:8101/workOrder/main/preEmploy"},
          {label: "雇员变更-恢复缴费", url: "http://172.16.9.25:8101/workOrder/main/preEmploy"},
          {label: "雇员终止-离职", url: "http://172.16.9.25:8101/workOrder/main/preEmploy"},
          {label: "雇员终止-集体转出，无需退工", url: "http://172.16.9.25:8101/workOrder/main/preEmploy"},
          {label: "雇员变更-人员性质转换", url: "http://172.16.9.25:8101/workOrder/main/preEmploy"},
          {label: "雇员变更-修改用退工信息", url: "http://172.16.9.25:8101/workOrder/main/preEmploy"}
        ]
      }
    },
    created() {

    },
    watch: {

    },
    mounted() {

    },
    computed: {

    },
    methods: {
      backToLogin() {
        this.$router.push({name: "login"})
      },
      openMessageBox() {
        this.$Notice.open({
          desc: '<div style="max-height: 100px; overflow-y: auto;"><h3>标题1</h3><p>我是标题1的内容</p><br/><h3>标题2</h3><p>我是标题2的内容</p><br/><h3>标题3</h3><p>我是标题3的内容</p></div>',
          duration: 0
        });
      }
    }
  }

</script>
<style scoped>
  * {margin: 0; padding: 0;}
  html, body {width: 100%; height: 100%; min-height: 100%; overflow: hidden;}
  .bg {height: 580px; position: relative; z-index: 1; background: #3d6e8a url('../assets/menu-bg.png') no-repeat center top;}
  .f16 {font-size: 16px;}
  .menu {width: 100%; height: 175px;}
  .menu > .menuInfo, .menu > .menuItem {text-align: right; width: 66%; margin: 0 auto;}
  .menu > .menuInfo {padding-top: 40px;}
  .menu > .menuItem {padding: 15px 0;}

  .menuInfo span, .menuItem a {font-size: 14px; color: #579bc2; text-align: right; display: inline-block; vertical-align: middle;}
  .message {padding: 8px 16px; border-radius: 10px; cursor: pointer; background: #295974;}
  .menuInfo > .arrow {width:0; height:0; margin-left: -5px; border-top:10px solid transparent; border-bottom: 10px solid transparent; border-left: 10px solid #295974;}
  .menuInfo .icon {width: 48px; height: 48px; border-radius: 24px; background: url('../assets/person.jpg') no-repeat center center;}

  .menuInfo .mylist a {font-size: 12px; line-height: 40px; text-align: center; color: #666; display: block; height: 40px; border-bottom: 1px dotted #eee;    }
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

  .menuContent {position: fixed; top: 150px; left: 17%; width: 66%; margin: 0 auto; padding: 1%; box-shadow: 5px 25px 55px rgba(61, 110, 138, 0.3); background: white;}

  .menuContent > ul > li {display: block; width: 20%; float: left; border-right: 1px solid #ccc; border-bottom: 1px solid #ccc;}
  .menuContent > ul > li:nth-child(1), li:nth-child(2), li:nth-child(3), li:nth-child(4), li:nth-child(5) {border-top: 1px solid #ccc;}
  .menuContent > ul > li:nth-child(1), li:nth-child(6), li:nth-child(11) {border-left: 1px solid #ccc;}
  .menuContent > ul > li a {text-align: center; display: block; width: 100%; height: 100%; padding: 10% 16%;}
  .menuContent > ul > li a:hover {border: none; -webkit-animation: neon2 1s ease-in-out infinite alternate; -moz-animation: neon2 1s ease-in-out infinite alternate; animation: neon2 1s ease-in-out infinite alternate;}
  .menuContent > ul > li a img {width: 76%;}
  .menuContent > ul > li p {font-size: 16px; color: #747474; width: 100%; height: 50px; line-height: 50px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}

  .mi {
    width: 250px;
    text-align: left;

    border:0;
    padding: 5px 10px;
  }

  @-webkit-keyframes neon2 {
    from {
      box-shadow: 0 0 1px #fff,
                  0 0 5px  #fff,
                  0 0 10px  #fff,
                  0 0 15px  #e4eefc,
                  0 0 20px  #e4eefc,
                  0 0 25px  #e4eefc,
                  0 0 30px #e4eefc,
                  0 0 35px #e4eefc;
    }
    to {
      box-shadow: 0 0 1px #fff,
                  0 0 5px #fff,
                  0 0 10px #fff,
                  0 0 15px #e4eefc,
                  0 0 20px #e4eefc,
                  0 0 25px #e4eefc,
                  0 0 30px #e4eefc,
                  0 0 35px #e4eefc;
    }
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
