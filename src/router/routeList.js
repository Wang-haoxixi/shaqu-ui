import Layout from '../shared/Layout';
import MbQindex from '../shared/mbQindex';
const routes = [
  {
    path: '/',
    component: Layout,
    redirect: 'home',
    uuid: 'home',
    name: '首页',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/Home.vue'),
        name: '首页',
        uuid: 'home:index',

      },
      {
        path: "list",
        component: () => import('@/views/home/WarnList.vue'),
        uuid: 'home:list',
        name: '预警列表',
      },
      {
        path: "message",
        component: () => import('@/views/home/MessageList.vue'),
        uuid: 'home:message',
        name: '消息中心',
      },
      {
        path: "changepassword",
        name: '修改密码',
        component: () => import('@/views/other/ChangePassword')
      }
    ]
  },
  {
    path: '/user/login',
    component: () => import('@/views/user/Login.vue')
  },
  {
    path: '/submitTree',
    component: () => import('@/views/other/SubmitTree.vue')
  },
  {
    path: '/system',
    component: Layout,
    name: "系统管理",
    uuid: 'system',
    children: [
      {
        path: 'user',
        component: () => import('@/views/system/User.vue'),
        name: '用户管理',
        uuid: 'system:user',
      },

      {
        path: 'role',
        component: () => import('@/views/system/Role.vue'),
        name: '角色管理',
        uuid: 'system:role',
      },
      {
        path: 'organization',
        component: () => import('@/views/system/Organization.vue'),
        name: '组织架构',
        uuid: 'system:organization',
      },
      {
        path: 'message',
        component: () => import('@/views/system/Message.vue'),
        name: '短信发送记录',
        uuid: 'system:message',
      },
      {
        path: 'sms',
        component: () => import('@/views/system/Sms.vue'),
        name: '短信通知公告',
        uuid: 'system:sms',
      },
    ]
  },
  {
    path: '/detailedList',
    component: Layout,
    name: "五个清单",
    uuid: 'detailedList',
    children: [
      {
        path: 'wasteProduction',
        component: () => import('@/views/detailedList/wasteProduction.vue'),
        name: '产废单位',
        uuid: 'detailedList:wasteProduction',
      },

      {
        path: 'facilities',
        component: () => import('@/views/detailedList/facilities.vue'),
        name: '自行利用处置设施',
        uuid: 'detailedList:facilities',
      },
      {
        path: 'businessUnit',
        component: () => import('@/views/detailedList/businessUnit.vue'),
        name: '经营单位',
        uuid: 'detailedList:businessUnit',
      },
      {
        path: 'supervisionUnit',
        component: () => import('@/views/detailedList/supervisionUnit.vue'),
        name: '重点监管单位',
        uuid: 'detailedList:supervisionUnit',
      },
      {
        path: 'storageFacilities',
        component: () => import('@/views/detailedList/storageFacilities.vue'),
        name: '重点单位贮存设施',
        uuid: 'detailedList:storageFacilities',
      },
    ]
  },
  {
    path: '/enterprise',
    component: Layout,
    name: "企业管理",
    uuid: 'enterprise',
    children: [
      {
        path: 'enterpriseList',
        component: () => import('@/views/enterprise/EnterpriseList.vue'),
        meta: {
          keepAlive: true,
        },
        name: '企业列表',
        uuid: 'enterprise:enterpriseList',
      },
      {
        path: 'enterpriseDetail',
        component: () => import('@/views/enterprise/EnterpriseDetail.vue'),
        name: '企业详情',
        uuid: 'enterprise:enterpriseDetail',
      },
      {
        path: 'enterpriseStaff',
        component: () => import('@/views/enterprise/EnterpriseStaff.vue'),
        name: '企业人员',
        uuid: 'enterprise:enterpriseStaff',
      }
    ]
  },
  {
    path: '/monitor',
    component: Layout,
    name: '预警与异常',
    uuid: 'monitor',
    children: [
      {
        path: 'list',
        component: () => import('@/views/monitor/list.vue'),
        name: '预警与异常列表',
        uuid: 'monitor:list',
      },
      {
        path: 'listDetail',
        component: () => import('@/views/monitor/ListDetail.vue'),
        name: '列表详情',
        uuid: 'monitor:listDetail',
      },
      {
        path: 'config',
        component: () => import('@/views/monitor/Config.vue'),
        name: '规则配置',
        uuid: 'monitor:config',
      },
      {
        path: 'scope',
        component: () => import('@/views/monitor/Scope.vue'),
        name: '预警与异常范围管理',
        uuid: 'monitor:scope'
      },
      {
        path: 'video',
        component: () => import('@/views/monitor/Video.vue'),
        name: '监控视频查看',
        uuid: 'monitor:video'
      },
      {
        path: 'process',
        component: () => import('@/views/monitor/Process.vue'),
        name: '处理流程设置',
        uuid: 'monitor:process'
      },
      {
        path: 'pigeonhole',
        component: () => import('@/views/monitor/Pigeonhole.vue'),
        name: '预警异常数据归档',
        uuid: 'monitor:pigeonhole'
      },
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    name: '综合查询',
    uuid: 'statistics',
    children: [
      {
        path: 'statisticsJointOrder',
        component: () => import('@/views/statistics/StatisticsJointOrder.vue'),
        name: '电子联单综合查询',
        uuid: 'statistics:statisticsJointOrder',
      },
      {
        path: 'utilizationStatistics',
        component: () => import('@/views/statistics/UtilizationStatistics.vue'),
        name: '利用量统计',
        uuid: 'statistics:utilizationStatistics',
      },
      {
        path: 'outputStatistics',
        component: () => import('@/views/statistics/OutputStatistics.vue'),
        name: '产生量统计',
        uuid: 'statistics:outputStatistics',
      },
      {
        path: 'inputStatistics',
        component: () => import('@/views/statistics/InputStatistics.vue'),
        name: '处置量统计',
        uuid: 'statistics:inputStatistics'
      },
      {
        path: 'planStatistics',
        component: () => import('@/views/statistics/PlanStatistics.vue'),
        name: '管理计划统计',
        uuid: 'statistics:planStatistics',
        meta: {
          keepAlive: true,
        },
      },
      {
        path: 'PlanStatisticsDetail',
        component: () => import('@/views/statistics/PlanStatisticsDetail.vue'),
        name: '管理计划上报情况',
        uuid: 'statistics:PlanStatisticsDetail',
      },

      {
        path: 'monitorStatistics',
        component: () => import('@/views/statistics/MonitorStatistics.vue'),
        name: '预警异常统计',
        uuid: 'statistics:monitorStatistics',
      },
      {
        path: 'monitorStatisticsDetail',
        component: () => import('@/views/statistics/MonitorStatisticsDetail.vue'),
        name: '预警异常统计',
        uuid: 'statistics:monitorStatisticsDetail',
      },
      {
        path: 'loginCount',
        component: () => import('@/views/statistics/LoginCount.vue'),
        name: '登录统计',
        uuid: 'statistics:loginCount'
      },
      {
        path: 'declare',
        name: '申报登记统计',
        component: MbQindex,
        uuid: 'statistics:declare',
        children: [
          {
            path: 'wfdeclareStatistics',
            component: () => import('@/views/statistics/declare/WfDeclareStatistics.vue'),
            name: '危废产生年报申报',
            uuid: 'statistics:declare/wfdeclareStatistics',
          },
          {
            path: 'wfdeclareStatisticsDetail',
            component: () => import('@/views/statistics/declare/WfDeclareStatisticsDetail.vue'),
            name: '危废产生年报申报详情',
            uuid: 'statistics:declare/wfdeclareStatisticsDetail',
          },
          {
            path: 'czdeclareStatistics',
            component: () => import('@/views/statistics/declare/CzDeclareStatistics.vue'),
            name: '危废处置年报申报',
            uuid: 'statistics:declare/czdeclareStatistics',
          },
          {
            path: 'czdeclareStatisticsDetail',
            component: () => import('@/views/statistics/declare/CzDeclareStatisticsDetail.vue'),
            name: '危废处置年报申报详情',
            uuid: 'statistics:declare/czdeclareStatisticsDetail',
          },
          {
            path: 'yfdeclareStatistics',
            component: () => import('@/views/statistics/declare/YfDeclareStatistics.vue'),
            name: '医废产生年报申报',
            uuid: 'statistics:declare/yfdeclareStatistics',
          },
          {
            path: 'yfdeclareStatisticsDetail',
            component: () => import('@/views/statistics/declare/YfDeclareStatisticsDetail.vue'),
            name: '医废产生年报申报详情',
            uuid: 'statistics:declare/yfdeclareStatisticsDetail',
          },
          {
            path: 'hmdeclareStatistics',
            component: () => import('@/views/statistics/declare/HmDeclareStatistics.vue'),
            name: '豁免年报申报',
            uuid: 'statistics:declare/hmdeclareStatistics',
          },
          {
            path: 'hmdeclareStatisticsDetail',
            component: () => import('@/views/statistics/declare/HmDeclareStatisticsDetail.vue'),
            name: '豁免年报申报详情',
            uuid: 'statistics:declare/hmdeclareStatisticsDetail',
          }
        ]
      },
      {
        path: 'refinement',
        name: '全区精细化执行情况',
        component: () => import('@/views/statistics/refinement/index.vue'),
        uuid: 'statistics:refinement',
        children: [
          {
            path: 'list',
            component: () => import('@/views/statistics/refinement/list.vue'),
            name: '全区精细化执行情况查询',
            uuid: 'statistics:refinement/list',
          },
          {
            path: 'unitList',
            component: () => import('@/views/statistics/refinement/unitList.vue'),
            name: '单位清单维护',
            uuid: 'statistics:refinement/unitList',
          }
        ]
      }

    ]
  },
  {
    path: '/mbQuery',
    component: Layout,
    name: '对接数据',
    uuid: 'mbQuery',
    children: [
      {
        path: 'lianDan',
        name: '联单查询',
        component: MbQindex,
        uuid: 'mbQuery:lianDan',
        children: [
          {
            path: 'weiFeiLianDan',
            component: () => import('@/views/mbQuery/liandan/WeiFeiLianDan.vue'),
            name: '危废市内联单',
            uuid: 'mbQuery:lianDan/weiFeiLianDan',
            meta: {
              keepAlive: true,
            },
          },
          {
            path: 'weiFeiLianDanDetail',
            component: () => import('@/views/mbQuery/liandan/WeiFeiLianDanDetail.vue'),
            name: '危废市内联单详情',
            uuid: 'mbQuery:lianDan/weiFeiLianDanDetail',
          },
          {
            path: 'YiFeiLianDan',
            component: () => import('@/views/mbQuery/liandan/YiFeiLianDan.vue'),
            name: '医废市内联单',
            uuid: 'mbQuery:lianDan/YiFeiLianDan',
            meta: {
              keepAlive: true,
            },
          },
          {
            path: 'yiFeiLianDanDetail',
            component: () => import('@/views/mbQuery/liandan/YiFeiLianDanDetail.vue'),
            name: '医废市内联单详情',
            uuid: 'mbQuery:lianDan/yiFeiLianDanDetail',
          },
          {
            path: 'weiFeiKuaSheng',
            component: () => import('@/views/mbQuery/liandan/WeiFeiKuaSheng.vue'),
            name: '危废跨省联单',
            uuid: 'mbQuery:lianDan/weiFeiKuaSheng',
          },
          {
            path: 'weiFeiKuaShengDetail',
            component: () => import('@/views/mbQuery/liandan/WeiFeiKuaShengDetail.vue'),
            name: '危废市内联单详情',
            uuid: 'mbQuery:lianDan/weiFeiKuaShengDetail',
          },
          {
            path: 'weiFeiYingJi',
            component: () => import('@/views/mbQuery/liandan/WeiFeiYingJi.vue'),
            name: '危废应急联单',
            uuid: 'mbQuery:lianDan/weiFeiYingJi',
          },
          {
            path: 'wFYingJiDetail',
            component: () => import('@/views/mbQuery/liandan/WeiFeiYingJiDetail.vue'),
            name: '危废应急联单详情',
            uuid: 'mbQuery:lianDan/wFYingJiDetail',
          },
          {
            path: 'weiFeiHuoMian',
            component: () => import('@/views/mbQuery/liandan/WeiFeiHuoMian.vue'),
            name: '危废豁免联单',
            uuid: 'mbQuery:lianDan/weiFeiHuoMian',
            meta: {
              keepAlive: true,
            },
          },
          {
            path: 'weiFeiHuoMianDetail',
            component: () => import('@/views/mbQuery/liandan/WeiFeiHuoMianDetail.vue'),
            name: '危废豁免联单详情',
            uuid: 'mbQuery:lianDan/weiFeiHuoMianDetail',
          },
        ]
      },
      {
        path: 'report',
        name: '年报查询',
        component: MbQindex,
        uuid: 'mbQuery:report',
        children: [
          {
            path: 'GongYeReport',
            component: () => import('@/views/mbQuery/report/GongYeReport.vue'),
            name: '一般工业固废年报',
            uuid: 'mbQuery:report/GongYeReport',
          },
          {
            path: 'GongYeReportDetail',
            component: () => import('@/views/mbQuery/report/GongYeReportDetail.vue'),
            name: '一般工业固废年报详情',
            uuid: 'mbQuery:report/GongYeReportDetail',
          },
          {
            path: 'weiFeiReport',
            component: () => import('@/views/mbQuery/report/WeiFeiReport.vue'),
            name: '危废产生年报',
            uuid: 'mbQuery:report/weiFeiReport',
          },
          {
            path: 'weiFeiReportDetail',
            component: () => import('@/views/mbQuery/report/WeiFeiReportDetail.vue'),
            name: '危废产生年报详情',
            uuid: 'mbQuery:report/weiFeiReportDetail',
          },
          {
            path: 'huoMianReport',
            component: () => import('@/views/mbQuery/report/HuoMianReport.vue'),
            name: '豁免危废产生年报',
            uuid: 'mbQuery:report/huoMianReport',
          },
          {
            path: 'huoMianReportDetail',
            component: () => import('@/views/mbQuery/report/HuoMianReportDetail.vue'),
            name: '豁免危废产生年报详情',
            uuid: 'mbQuery:report/huoMianReportDetail',
          },
          {
            path: 'yiLiaoReport',
            meta: {
              keepAlive: true,
            },
            component: () => import('@/views/mbQuery/report/YiLiaoReport.vue'),
            name: '医废产生年报',
            uuid: 'mbQuery:report/yiLiaoReport',
          },
          {
            path: 'yiLiaoReportDetail',
            component: () => import('@/views/mbQuery/report/YiLiaoReportDetail.vue'),
            name: '医废产生年报详情',
            uuid: 'mbQuery:report/yiLiaoReportDetail',
          },
          {
            path: 'jingYingReport',
            component: () => import('@/views/mbQuery/report/JingYingReport.vue'),
            name: '危废经营年报',
            uuid: 'mbQuery:report/jingYingReport',
          },
          {
            path: 'jingYingReportDetail',
            component: () => import('@/views/mbQuery/report/JingYingReportDetail.vue'),
            name: '危废经营年报详情',
            uuid: 'mbQuery:report/jingYingReportDetail',
          },
        ]
      },
      {
        path: 'report',
        name: '月报查询',
        component: MbQindex,
        uuid: 'mbQuery:report',
        children: [
          {
            path: 'GongYeReportMonthly',
            component: () => import('@/views/mbQuery/report/WeiFeiReportMonthly.vue'),
            name: '危废经营月报',
            uuid: 'mbQuery:report/GongYeReportMonthly',
          },
          {
            path: 'GongYeReportMonthlyDetail',
            component: () => import('@/views/mbQuery/report/WeiFeiReportMonthlyDetail.vue'),
            name: '危废经营月报详情',
            uuid: 'mbQuery:report/GongYeReportMonthlyDetail',
          }
        ]
      },
      {
        path: 'manage-project',
        component: () => import('@/views/mbQuery/manage-project/index.vue'),
        name: '管理计划查询',
        redirect: 'manage-project/list',
        uuid: 'mbQuery:manage-project',
        children: [
          {
            path: 'list',
            component: () => import('@/views/mbQuery/manage-project/list'),
            name: '管理计划列表',
            uuid: 'mbQuery:manage-project/list',
          },
          {
            path: 'detail',
            component: () => import('@/views/mbQuery/manage-project/detail'),
            name: '管理计划详情',
            uuid: 'mbQuery:manage-project/detail',
          }
        ]
      },
      {
        path: 'transfer-project',
        component: () => import('@/views/mbQuery/transfer-project/index.vue'),
        name: '转移计划查询',
        // redirect: 'transfer-project/provincial/list',
        uuid: 'mbQuery:transfer-project',
        children: [
          {
            path: 'provincial',
            component: () => import('@/views/mbQuery/transfer-project/provincial/index.vue'),
            name: '跨省转移计划',
            uuid: 'mbQuery:transfer-project/provincial',
            meta: {
              keepAlive: true,
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/mbQuery/transfer-project/provincial/list'),
                name: '转移计划列表',
                uuid: 'mbQuery:transfer-project/provincial/list',
              },
              {
                path: 'detail',
                component: () => import('@/views/mbQuery/transfer-project/provincial/detail'),
                name: '转移计划详情',
                uuid: 'mbQuery:transfer-project/provincial/detail',
              }
            ]
          },
          {
            path: 'cityInside',
            component: () => import('@/views/mbQuery/transfer-project/cityInside/index.vue'),
            name: '市内转移计划',
            uuid: 'mbQuery:transfer-project/cityInside',
            meta: {
              keepAlive: true,
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/mbQuery/transfer-project/cityInside/list'),
                name: '转移计划列表',
                uuid: 'mbQuery:transfer-project/cityInside/list',
              },
              {
                path: 'detail',
                component: () => import('@/views/mbQuery/transfer-project/cityInside/detail'),
                name: '转移计划详情',
                uuid: 'mbQuery:transfer-project/cityInside/detail',
              }
            ]
          },
          {
            path: 'exemption',
            component: () => import('@/views/mbQuery/transfer-project/exemption/index.vue'),
            name: '豁免转移计划',
            uuid: 'mbQuery:transfer-project/exemption',
            meta: {
              keepAlive: true,
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/mbQuery/transfer-project/exemption/list'),
                name: '转移计划列表',
                uuid: 'mbQuery:transfer-project/exemption/list',
              },
              {
                path: 'detail',
                component: () => import('@/views/mbQuery/transfer-project/exemption/detail'),
                name: '转移计划详情',
                uuid: 'mbQuery:transfer-project/exemption/detail',
              }
            ]
          },
        ]
      },
      {
        path: 'ratio',
        component: () => import('@/views/mbQuery/ratio'),
        name: '危废环比同比查询',
        uuid: 'mbQuery:ratio'
      }
    ]
  },
  {
    path: '/stockQuery',
    component: Layout,
    name: '库存查询',
    uuid: 'stockQuery',
    children: [
      {
        path: 'inventory-search',
        component: () => import('@/views/stockQuery/inventory-search/index.vue'),
        name: '库存查询',
        uuid: 'stockQuery:inventory-search',
        children: [
          {
            path: 'list',
            component: () => import('@/views/stockQuery/inventory-search/list'),
            name: '库存查询列表',
            uuid: 'stockQuery:inventory-search/list',
          },
          {
            path: 'detail',
            component: () => import('@/views/stockQuery/inventory-search/detail'),
            name: '库存查询详情',
            uuid: 'stockQuery:inventory-search/detail',
          }
        ]
      },
      {
        path: 'trace-back',
        component: () => import('@/views/stockQuery/trace-back/index.vue'),
        name: '危废包追溯',
        uuid: 'stockQuery:trace-back',
        children: [
          {
            path: 'list',
            component: () => import('@/views/stockQuery/trace-back/list'),
            name: '危废包追溯列表',
            uuid: 'stockQuery:trace-back/list',
          },
          {
            path: 'detail',
            component: () => import('@/views/stockQuery/trace-back/detail'),
            name: '危废包追溯详情',
            uuid: 'stockQuery:trace-back/detail',
          }
        ]
      }
    ]
  },
  {
    path: '/sysSettings',
    component: Layout,
    name: '系统优化设置',
    uuid: 'sysSettings',
    children: [
      {
        path: 'question',
        component: () => import('@/views/sysSettings/Question.vue'),
        name: '平台问答',
        uuid: 'sysSettings:question'
      }
    ]
  },
  {
    path: '/underConstruction',
    component: Layout,
    name: '系统优化设置',
    uuid: 'underConstruction',
    children: [
      {
        path: 'lodding',
        component: () => import('@/views/underConstruction/lodding.vue'),
        name: '建设中',
        uuid: 'underConstruction:lodding'
      },
      {
        path: 'lodding1',
        component: () => import('@/views/underConstruction/lodding1.vue'),
        name: '建设中',
        uuid: 'underConstruction:lodding1'
      },
      {
        path: 'lodding2',
        component: () => import('@/views/underConstruction/lodding2.vue'),
        name: '建设中',
        uuid: 'underConstruction:lodding2'
      },
      {
        path: 'lodding3',
        component: () => import('@/views/underConstruction/lodding3.vue'),
        name: '建设中',
        uuid: 'underConstruction:lodding3'
      },
      {
        path: 'lodding4',
        component: () => import('@/views/underConstruction/lodding4.vue'),
        name: '建设中',
        uuid: 'underConstruction:lodding4'
      },
      {
        path: 'lodding5',
        component: () => import('@/views/underConstruction/lodding5.vue'),
        name: '建设中',
        uuid: 'underConstruction:lodding5'
      },
      {
        path: 'lodding6',
        component: () => import('@/views/underConstruction/lodding6.vue'),
        name: '建设中',
        uuid: 'underConstruction:lodding6'
      },
    ]
  },
  {
    path: '/expData',
    component: Layout,
    name: '数据导出',
    uuid: 'expData',
    children: [
      {
        path: 'hazardous',
        component: () => import('@/views/expData/hazardous.vue'),
        name: '危废转移量',
        uuid: 'expData:hazardous'
      }
    ]
  }
];
export default routes
