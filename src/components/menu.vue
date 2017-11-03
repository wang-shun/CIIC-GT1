
<template>
  <div class="bg">
    <div class="menuContent">
      <ul>
        <menu-list-item v-for="item in list" :item="item" :key="item.url"></menu-list-item>
      </ul>
    </div>
    <div class="menu">
      <div class="menuInfo">
        <span class="message"><span class="f16"><strong>莉莉艾伦</strong></span><br/>服务支持中心</span>
        <span class="arrow"></span>
        <span class="icon"></span>
      </div>
      <div class="menuItem">
        <span class="message">我的任务单</span>
        <span class="email"></span>
        <span class="bag"></span>
        <span class="help"></span>
      </div>
    </div>
    
  </div>
</template>
<script>
  import menuListItem from "./menuItem.vue"
  export default {
    components: {menuListItem},
    data() {
      return {
        list: [
          {icon: "/static/img/menu/sales-center.png", name: "销售中心", url: "#"},
          {icon: "/static/img/menu/finance-service-center.png", name: "外企客服中心", url: "#"},
          {icon: "/static/img/menu/foreign-proxy-center.png", name: "代理中心", url: "#"},
          {icon: "/static/img/menu/foreign-employee-center.png", name: "外企雇员中心", url: "#"},
          {icon: "/static/img/menu/foreign-customer-center.png", name: "服务外包业务中心", url: "#"},
          {icon: "/static/img/menu/foreign-support-center.png", name: "外企支持中心", url: "#"},
          {icon: "/static/img/menu/finance-support-center.png", name: "财务咨询业务中心", url: "#"},
          {icon: "/static/img/menu/bill-center.png", name: "账单中心", url: "#"},
          {icon: "/static/img/menu/settle-center.png", name: "结算中心", url: "#"},
          {icon: "/static/img/menu/employee-selfhelp-center.png", name: "财务咨询报表中心", url: "#"},
          {icon: "/static/img/menu/product-center.png", name: "产品中心", url: "#"},
          {icon: "/static/img/menu/supporter-center.png", name: "供应商管理中心", url: "#"},
          {icon: "/static/img/menu/foreign-control-center.png", name: "外企内控中心", url: "#"},
          {icon: "/static/img/menu/finance-operator-center.png", name: "财务咨询运营中心", url: "#"},
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

  .menuInfo > span, .menuItem > span {font-size: 14px; color: #579bc2; text-align: right; display: inline-block; vertical-align: middle;}
  .message {padding: 8px 16px; border-radius: 10px; background: #295974;}
  .menuInfo > .arrow {width:0; height:0; margin-left: -5px; border-top:10px solid transparent; border-bottom: 10px solid transparent; border-left: 10px solid #295974;}
  .menuInfo > .icon {width: 48px; height: 48px; border-radius: 24px; background: url('../assets/person.jpg') no-repeat center center;}

  .menuItem > span {margin-left: 24px;}
  .menuItem > .email {width: 28px; height: 28px; border-radius: 14px; background: url('../assets/email.png') no-repeat center center;}
  .menuItem > .bag {width: 28px; height: 28px; border-radius: 10px; background: url('../assets/bag.png') no-repeat center center;}
  .menuItem > .help {width: 28px; height: 28px; border-radius: 14px; background: url('../assets/help.png') no-repeat center center;}

  .menuContent {position: fixed; top: 175px; left: 17%; width: 66%; margin: 0 auto; padding: 1%; box-shadow: 5px 25px 55px rgba(61, 110, 138, 0.3); background: white;}
  
</style>