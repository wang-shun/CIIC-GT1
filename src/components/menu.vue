<template>
  <div class="bg">
    <div class="menuContent">
      <ul>
        <li><a href="http://172.16.9.25:8100"><img src="../assets/menu/sales-center.png" alt="销售中心" /><p>销售中心</p></a></li>
        <li><a href="http://172.16.9.25:8103"><img src="../assets/menu/finance-service-center.png" alt="外企客服中心" /><p>外企客服中心</p></a></li>
        <li><a href="http://172.16.9.61:8070/proxyCenter/index.html#/"><img src="../assets/menu/foreign-proxy-center.png" alt="代理中心" /><p>代理中心</p></a></li>
        <li><a href="http://172.16.9.25:8101"><img src="../assets/menu/foreign-employee-center.png" alt="外企雇员中心" /><p>外企雇员中心</p></a></li>
        <li><a href="http://172.16.9.25:8104"><img src="../assets/menu/foreign-customer-center.png" alt="服务外包业务中心" /><p>服务外包业务中心</p></a></li>
        <li><a href="#"><img src="../assets/menu/foreign-support-center.png" alt="外企支持中心" /><p>外企支持中心</p></a></li>
        <li><a href="http://172.16.9.61:8070/FCBusinessPortal/#/main"><img src="../assets/menu/finance-support-center.png" alt="财务咨询业务中心" /><p>财务咨询业务中心</p></a></li>
        <li><a href="http://172.16.9.61:8070/BillCenter/iView/index.html"><img src="../assets/menu/bill-center.png" alt="账单中心" /><p>账单中心</p></a></li>
        <li><a href="http://172.16.9.61:8070/SettlementCenter/iview/index.html"><img src="../assets/menu/settle-center.png" alt="结算中心" /><p>结算中心</p></a></li>
        <li><a href="#"><img src="../assets/menu/employee-selfhelp-center.png" alt="财务咨询报表中心" /><p>财务咨询报表中心</p></a></li>
        <li><a href="http://172.16.9.23:7777"><img src="../assets/menu/product-center.png" alt="产品中心" /><p>产品中心</p></a></li>
        <li><a href="http://172.16.9.25:8105"><img src="../assets/menu/supporter-center.png" alt="供应商管理中心" /><p>供应商管理中心</p></a></li>
        <li><a href="http://172.16.9.24/dic_list"><img src="../assets/menu/foreign-control-center.png" alt="外企内控中心" /><p>外企内控中心</p></a></li>
        <li><a href="http://172.16.9.61:8070/OperationCenter/index.html#/"><img src="../assets/menu/finance-operator-center.png" alt="财务咨询运营中心" /><p>财务咨询运营中心</p></a></li>
      </ul>
    </div>
    <div class="menu">
      <div class="menuInfo">
        <span class="message"><span class="f16"><strong>莉莉艾伦</strong></span><br/>服务支持中心</span>
        <span class="arrow"></span>
        <span class="icon"></span>
      </div>
      <div class="menuItem">
        <Badge dot>
          <Poptip trigger="hover" placement="bottom" title="" content="任务单列表" style="text-align: left;">
            <a href="javascript:;" class="message">我的审批</a>
          </Poptip >
        </Badge>
        <Badge dot>
          <Poptip trigger="hover" placement="bottom" title="" content="任务单列表" style="text-align: left;">
            <a href="javascript:;" class="message">我的任务单</a>
          </Poptip >
        </Badge>
        <Badge count="5" overflow-count="999">
          <a href="javascript:;" class="email">&nbsp;</a>
        </Badge>
        <Badge dot>
          <a href="javascript:;" class="bag"></a>
        </Badge>
        <Badge dot>
          <a href="javascript:;" class="help"></a>
        </Badge>
      </div>
    </div>
    
  </div>
</template>
<script>
  export default {
    data() {
      return {

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

  .menuInfo > span, .menuItem a {font-size: 14px; color: #579bc2; text-align: right; display: inline-block; vertical-align: middle;}
  .message {padding: 8px 16px; border-radius: 10px; cursor: pointer; background: #295974;}
  .menuInfo > .arrow {width:0; height:0; margin-left: -5px; border-top:10px solid transparent; border-bottom: 10px solid transparent; border-left: 10px solid #295974;}
  .menuInfo > .icon {width: 48px; height: 48px; border-radius: 24px; background: url('../assets/person.jpg') no-repeat center center;}

  .menuItem a {margin-left: 24px;}
  .menuItem .email {width: 28px; height: 28px; border-radius: 14px; background: url('../assets/email.png') no-repeat center center;}
  .menuItem .bag {width: 28px; height: 28px; border-radius: 10px; background: url('../assets/bag.png') no-repeat center center;}
  .menuItem .help {width: 28px; height: 28px; border-radius: 14px; background: url('../assets/help.png') no-repeat center center;}

  .menuContent {position: fixed; top: 175px; left: 17%; width: 66%; margin: 0 auto; padding: 1%; box-shadow: 5px 25px 55px rgba(61, 110, 138, 0.3); background: white;}

  li {display: block; width: 20%; float: left; border-right: 1px solid #ccc; border-bottom: 1px solid #ccc;}
  li:nth-child(1), li:nth-child(2), li:nth-child(3), li:nth-child(4), li:nth-child(5) {border-top: 1px solid #ccc;}
  li:nth-child(1), li:nth-child(6), li:nth-child(11) {border-left: 1px solid #ccc;}
  li a {text-align: center; display: block; width: 100%; height: 100%; padding: 10% 16%;}
  li a:hover {border: none; -webkit-animation: neon2 1s ease-in-out infinite alternate; -moz-animation: neon2 1s ease-in-out infinite alternate; animation: neon2 1s ease-in-out infinite alternate;}
  li a img {width: 76%;}
  li p {font-size: 16px; color: #747474; width: 100%; height: 50px; line-height: 50px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}

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
</style>