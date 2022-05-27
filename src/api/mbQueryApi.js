import request from '@/utils/request'

export default {
  getWeiFeiLianDanList(data) {
    return request({
      url: '/duplicate/wf/inner',
      method: 'POST',
      data: data,
      originalUrl: '/duplicate/wf/inner'
    });
  },
  getWeiFeiLianDanDetail(id) {
    return request({
      url: `/duplicate/wf/inner/${id}`,
      method: 'GET',
      originalUrl: '/duplicate/wf/inner/{id}'
    });
  },
  //危废详情审批流程
  wFDetailSP(id,queryData = {isExemptSingle : false}) {
    return request({
      url: `/duplicate/wf/process/history/${id}`,
      method: 'GET',
      params:queryData,
      originalUrl: '/duplicate/wf/process/history/{id}'
    });
  },
  // 联单类型
  getNewKuponoStateList(params) {
    return request({
      url: '/duplicate/med/state',
      method: 'GET',
      params,
      originalUrl: '/duplicate/med/state'
    })
  },
  //医疗废物--医疗废物联单管理
  duplicateManagement(data) {
    return request({
      url: '/duplicate/med/inner',
      method: 'POST',
      data,
      originalUrl: '/duplicate/med/inner'
    })
  },
  //医疗废物--医疗废物联单详情
  duplicateManagementInfo(kuponoId) {
    return request({
      url: `/duplicate/med/inner/${kuponoId}`,
      method: 'get',
      originalUrl: '/duplicate/med/inner/{kuponoId}'
    })
  },
  // 医疗废物-电子联单-联单状态查询
  getKuponoTypeList() {
    return request({
      url: '/duplicate/med/kuponoType',
      method: 'GET',
      originalUrl: '/duplicate/med/kuponoType'
    })
  },
  //危废详情异常
  wFDetailYC(id) {
    return request({
      url: `/duplicate/wf/abnormal/${id}`,
      method: 'GET',
      originalUrl: '/duplicate/wf/abnormal/{id}'
    });
  },
  //危废跨省联单列表
  wFKuaShengList(data) {
    return request({
      url: `/duplicate/wf/outer`,
      method: 'POST',
      data: data,
      originalUrl: '/duplicate/wf/outer'
    });
  },
  //危废跨省联单详情
  wFKuaShengListDtail(id) {
    return request({
      url: `/duplicate/wf/outer/${id}`,
      method: 'GET',
      originalUrl: '/duplicate/wf/outer/{singleCode}'
    });
  },
  //危废应急联单列表
  wFYingJiList(data) {
    return request({
      url: `/duplicate/wf/emergency`,
      method: 'POST',
      data: data,
      originalUrl: '/duplicate/wf/emergency'
    });
  },
  //危废应急联单详情
  wFYingJiDetail(id){
    return request({
      url:`/duplicate/wf/emergency/${id}`,
      method:'get',
      originalUrl:'/duplicate/wf/emergency/{objectid}'
    });
  },
  //危废豁免列表
  getWeiFeiHuoMianList(data) {
    return request({
      url: '/duplicate/wf/exempt',
      method: 'POST',
      data: data,
      originalUrl: '/duplicate/wf/exempt'
    });
  },
  //危废豁免详情
  getWeiFeiHuoMianDetail(id) {
    return request({
      url: `/duplicate/wf/exempt/${id}`,
      method: 'GET',
      originalUrl: '/duplicate/wf/exempt/{objectid}'
    });
  },
  //医废产生年报列表
  yiLiaoReportList(data) {
    return request({
      url: `/report/med/pro`,
      method: 'POST',
      data,
      originalUrl: '/report/med/pro'
    });
  },
  //医废产生年报详情
  yiLiaoReportDetail(id) {
    return request({
      url: `/report/med/pro/${id}`,
      method: 'get',
      originalUrl: '/report/med/pro/{id}'
    });
  },
  //危废产生年报
  weiFeiReportList(data) {
    return request({
      url: `/report/wf/pro`,
      method: 'POST',
      data,
      originalUrl: '/report/wf/pro'
    });
  },
  //危废产生年报详情
  weiFeiReportDetail(id) {
    return request({
      url: `/report/wf/pro/${id}`,
      method: 'get',
      originalUrl: '/report/wf/pro/{id}'
    });
  },
  //豁免危废产生年报
  huoMianReportList(data) {
    return request({
      url: `/report/wf/exempt`,
      method: 'POST',
      data,
      originalUrl: '/report/wf/exempt'
    });
  },
  //豁免危废产生年报详情
  huoMianReportDetail(id) {
    return request({
      url: `/report/wf/exempt/${id}`,
      method: 'get',
      originalUrl: '/report/wf/exempt/{id}'
    });
  },
  //一般工业固废年报
  GongyeReportList(data){
    return request({
      url:'/report/yb',
      originalUrl:'/report/yb',
      method:'POST',
      data
    });
  },
  //一般工业固废年报详情
  GongyeReportDetail(id) {
    return request({
      url: `/report/yb/${id}`,
      method: 'get',
      originalUrl: '/report/yb/{id}'
    });
  },
  //危废经营月报
  WeiFeiReportMonthList(data){
    return request({
      url:'/report/wf/deal/month',
      originalUrl:'/report/wf/deal/month',
      method:'POST',
      data
    });
  },
  //危废经营月报详情
  WeiFeiReportMonthDetail(id){
    return request({
      url:`/report/wf/deal/month/${id}`,
      originalUrl:'/report/wf/deal/month{id}',
      method: 'get'
    });
  },
  //危废经营年报
  jingYingReportList(data) {
    return request({
      url: `/report/wf/deal`,
      method: 'POST',
      data,
      originalUrl: '/report/wf/deal'
    });
  },
  //危废产生经营详情
  jingYingReportDetail(id) {
    return request({
      url: `/report/wf/deal/${id}`,
      method: 'get',
      originalUrl: '/report/wf/deal/{id}'
    });
  },
  // 管理计划状态
  managementState(){
    return request({
      url: '/management/fillState',
      method: 'get',
      originalUrl: '/management/fillState'
    })
  },
  // 管理计划列表
  managementList(data){
    return request({
      url: '/management/list',
      data,
      method:'post',
      originalUrl: '/management/list'
    })
  },
  // 过程
  managementAudit(declareId){
    return request({
      url: `/management/audit/${declareId}`,
      method: 'get',
      originalUrl: '/management/audit/{declareId}'
    })
  },
  //管理计划表1
  managementTable1(declareId){
    return request({
      url: `/management/table1/${declareId}`,
      method: 'get',
      originalUrl: '/management/table1/{declareId}'
    })
  },
  //管理计划表2 产品
  managementTable2Product(declareId,params){
    return request({
      url: `/management/table2/product/${declareId}`,
      method: 'get',
      params,
      originalUrl: '/management/table2/product/{declareId}'
    })
  },
  //管理计划表2 原辅材料
  managementTable2Material(declareId,params){
    return request({
      url: `/management/table2/material/${declareId}`,
      method: 'get',
      params,
      originalUrl: '/management/table2/material/{declareId}',
    })
  },
  //管理计划表2 生产设备
  managementTable2Equipment(declareId,params){
    return request({
      url: `/management/table2/equipment/${declareId}`,
      method: 'get',
      params,
      originalUrl: '/management/table2/equipment/{declareId}',
    })
  },
  //管理计划表2 生成工艺流程图
  managementTable2Technology(declareId,params){
    return request({
      url: `/management/table2/technology/${declareId}`,
      method: 'get',
      params,
      originalUrl: '/management/table2/technology/{declareId}',
    })
  },
  //管理计划表3
  managementTable3(declareId){
    return request({
      url: `/management/table3/${declareId}`,
      method: 'get',
      originalUrl: '/management/table3/{declareId}'
    })
  },
  //管理计划表4
  managementTable4(declareId){
    return request({
      url: `/management/table4/${declareId}`,
      method: 'get',
      originalUrl: '/management/table4/{declareId}'
    })
  },
  managementTable4Waste(declareId,params){
    return request({
      url: `/management/table4/waste/${declareId}`,
      method: 'get',
      params,
      originalUrl: '/management/table4/{declareId}'
    })
  },
  //管理计划表5
  managementTable5(declareId){
    return request({
      url: `/management/table5/${declareId}`,
      method: 'get',
      originalUrl: '/management/table5/{declareId}'
    })
  },
  //管理计划表6
  managementTable6(declareId){
    return request({
      url: `/management/table6/${declareId}`,
      method: 'get',
      originalUrl: '/management/table6/{declareId}'
    })
  },
  //管理计划表6详情
  managementTable6Detail(declareId){
    return request({
      url: `/management/table6/detail/${declareId}`,
      method: 'get',
      originalUrl: '/management/table6/detail/{declareId}'
    })
  },
  //管理计划表7
  managementTable7(declareId){
    return request({
      url: `/management/table7/${declareId}`,
      method: 'get',
      originalUrl: '/management/table7/{declareId}'
    })
  },
  //管理计划表8
  managementTable8(declareId){
    return request({
      url: `/management/table8/${declareId}`,
      method: 'get',
      originalUrl: '/management/table8/{declareId}'
    })
  },
  //管理计划表9
  managementTable9(declareId){
    return request({
      url: `/management/table9/${declareId}`,
      method: 'get',
      originalUrl: '/management/table9/{declareId}'
    })
  },
  // 危废同比环比
  getQueryCompare(data) {
    return request({
      url: 'wasteDuplicateQuery/queryCompare',
      method: 'post',
      data,
      originalUrl: 'wasteDuplicateQuery/queryCompare'
    })
  }
}
