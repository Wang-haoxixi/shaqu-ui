import request from '@/utils/request'

export default {
  getSearchWay() {
    return request({
      url:'/statistics/jointOrder/type',
      originalUrl:'/statistics/jointOrder/type',
      method:'get'
  });
  },
  getJointOrderList(data){
    return request({
      url:'/statistics/jointOrder/list',
      originalUrl:'/statistics/jointOrder/list',
      method:'POST',
      params:data.query,
      data:data.data,
    });
  },
  // getRankList(data){
  //   return request({
  //     url:'/statistics/production/list',
  //     originalUrl:'/statistics/production/list',
  //     method:'POST',
  //     data:data,
  //   });
  // },
  getRankList(data){
    return request({
      url:'/statistics/production/list2',
      originalUrl:'/statistics/production/list2',
      method:'POST',
      data:data,
    });
  },
  getRankDetailList(data){
    return request({
      url:'/statistics/production/detailList',
      originalUrl:'/statistics/production/detailList',
      method:'POST',
      data:data,
    });
  },
  getPieData(data){
    return request({
      url:'/statistics/production/pieChart',
      originalUrl:'/statistics/production/pieChart',
      method:'POST',
      data:data,
    });
  },
  getRankChartBarList(data){
    return request({
      url:'/statistics/production/chartList',
      originalUrl:'/statistics/production/chartList',
      method:'POST',
      data:data,
    });
  },
  getDealRankList2(data){
    return request({
      url:'/statistics/disposal/list2',
      originalUrl:'/statistics/disposal/list2',
      method:'POST',
      data:data,
    });
  },
  getDealRankList(data){
    return request({
      url:'/statistics/disposal/list',
      originalUrl:'/statistics/disposal/list',
      method:'POST',
      data:data,
    });
  },
  getDealRankDetailList(data){
    return request({
      url:'/statistics/disposal/detailList',
      originalUrl:'/statistics/disposal/detailList',
      method:'POST',
      data:data,
    });
  },
  getDealRankChartBarList(data){
    return request({
      url:'/statistics/disposal/chartList',
      originalUrl:'/statistics/disposal/chartList',
      method:'POST',
      data:data,
    });
  },
  
  getManagementPlanList(data){
    return request({
      url:'/statistics/management/search',
      originalUrl:'/statistics/management/search',
      method:'GET',
      params:data,
    });
  },
  //获取管理计划详情列表
  getPlanDetailList(data){
    return request({
      url:'/statistics/management/detail',
      originalUrl:'/statistics/management/detail',
      method:'GET',
      params:data,
    });
  },
  //危废产生年报列表
  getDeclareList(data){
    return request({
      url:'/statistics/report/wf/pro',
      originalUrl:'/statistics/report/wf/pro',
      method:'GET',
      params:data,
    });
  },
  //危废产生年报详情
  getDeclareDetail(data){
    return request({
      url:'/statistics/report/wf/pro/detail',
      originalUrl:'/statistics/report/wf/pro/detail',
      method:'GET',
      params:data,
    });
  },
  //医废年报列表
  getYFDeclareList(data){
    return request({
      url:'/statistics/report/med/pro',
      originalUrl:'/statistics/report/med/pro',
      method:'GET',
      params:data,
    });
  },
  //医废年报详情
  getYFDeclareDetail(data){
    return request({
      url:'/statistics/report/med/pro/detail',
      originalUrl:'/statistics/report/med/pro/detail',
      method:'GET',
      params:data,
    });
  },
  //豁免年报列表
  getHMDeclareList(data){
    return request({
      url:'/statistics/report/wf/exempt',
      originalUrl:'/statistics/report/wf/exempt',
      method:'GET',
      params:data,
    });
  },
  //豁免年报详情
  getHMDeclareDetail(data){
    return request({
      url:'/statistics/report/wf/exempt/detail',
      originalUrl:'/statistics/report/wf/exempt/detail',
      method:'GET',
      params:data,
    });
  },
  //危废经营年报列表
  getJYDeclareList(data){
    return request({
      url:'/statistics/report/wf/deal',
      originalUrl:'/statistics/report/wf/deal',
      method:'GET',
      params:data,
    });
  },
  //危废经营年报详情
  getJYDeclareDetail(data){
    return request({
      url:'/statistics/report/wf/deal/detail',
      originalUrl:'/statistics/report/wf/deal/detail',
      method:'GET',
      params:data,
    });
  },
  //预警异常统计
  getMonitorList(){
    return request({
      url:'/statistics/monitor',
      originalUrl:'/statistics/monitor',
      method:'GET'
    });
  },
  // 登录列表
  getLoginCount (data) {
    return request({
      url:'/account/findAccountLoginRecord',
      originalUrl:'/account/findAccountLoginRecord',
      method:'POST',
      data
    }); 
  },
  // 获取联单细分类型
  getOrderList() {
    return request({
      url: '/statistics/jointOrder/type',
      originalUrl: '/statistics/jointOrder/type',
      method: 'get'
    })
  },
  // 产生量排名列表
  getProductionList(data) {
    return request({
      url: '/disposalStatistics/production/list',
      originalUrl: '/disposalStatistics/production/list',
      method: 'post',
      data
    })
  },
  // 处置量利用量排名列表
  getDisposalList(data) {
    return request({
      url: '/disposalStatistics/disposal/list',
      originalUrl: '/disposalStatistics/disposal/list',
      method: 'post',
      data
    })
  }
}
