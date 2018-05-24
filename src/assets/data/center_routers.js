/**
 * Created by huangye on 2018/5/18.
 */
const centerRouters = [
  [
    {url: `${process.env.BASE_PATH}:8100/`, imgSrc: 'static/img/menu/sales_center.png', platformId: '1', name: '销售中心'},
    {url: `${process.env.BASE_PATH}:8106/`, imgSrc: 'static/img/menu/product_center.png', platformId: '11', name: '产品中心'},
    {url: `${process.env.BASE_PATH}:8105/`, imgSrc: 'static/img/menu/supporter_manage_center.png', platformId: '14', name: '供应商管理中心'},
    {url: `${process.env.BASE_PATH}:8103/`, imgSrc: 'static/img/menu/foreign_service_center.png', platformId: '3', name: '客服中心'},
    {url: `${process.env.BASE_PATH}:8101/`, imgSrc: 'static/img/menu/foreign_employee_center.png', platformId: '5', name: '雇员中心'},
  ],
  [
    {url: `${process.env.BASE_PATH}:8108/#/main/`, imgSrc: 'static/img/menu/foreign_support_center.png', platformId: '6', name: '外企支持中心'},
    {url: `${process.env.BASE_PATH}:8109/#/`, imgSrc: 'static/img/menu/proxy_center.png', platformId: '4', name: '代理中心'},
    {url: `${process.env.BASE_PATH}:8107/#/`, imgSrc: 'static/img/menu/foreign_control_center.png', platformId: '2', name: '外企内控中心'},
    {url: `${process.env.BASE_PATH}:8112/#/`, imgSrc: 'static/img/menu/finance_advisory_business_center.png', platformId: '7', name: '财务咨询业务中心'},
    {url: `${process.env.BASE_PATH}:8113/#/`, imgSrc: 'static/img/menu/finance_advisory_operator_center.png', platformId: '9', name: '财务咨询运营中心'},
  ],
  [
    {url: `${process.env.BASE_PATH}:8104/`, imgSrc: 'static/img/menu/service_outsourcing_business_center.png', platformId: '10', name: '服务外包业务中心'},
    {url: `${process.env.BASE_PATH}:8110/#/`, imgSrc: 'static/img/menu/bill_center.png', platformId: '12', name: '账单中心'},
    {url: `${process.env.BASE_PATH}:8111/#/`, imgSrc: 'static/img/menu/settlement_center.png', platformId: '13', name: '结算中心'},
    {url: '#', imgSrc: 'static/img/menu/finance_advisory_report_center.png', platformId: '8', name: '报表中心'},
    {url: '#', imgSrc: 'static/img/menu/business_intelligence_center.png', platformId: '15', name: '商业智能中心'},
  ]
];

export default centerRouters;
