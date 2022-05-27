import request from '@/utils/request'

export default {
  getWasteList(){
    return request({
      url:'/dictionaries/wasteType',
      originalUrl:'/dictionaries/wasteType',
      method:'GET',
    });
  },
  getWaste(data){
    return request({
      url:'/dictionaries/waste',
      originalUrl:'/dictionaries/waste',
      method:'GET',
      params:data
    });
  },
  //查询危废名录(通过大类ID查询)
  getWaste2(data){
    return request({
      url:'/dictionaries/waste2',
      originalUrl:'/dictionaries/waste2',
      method:'GET',
      params:data
    });
  },
  getHyNode(data){
    return request({
      url:'/dictionaries/industry',
      originalUrl:'/dictionaries/industry',
      method:'GET',
      params:data
    });
  },
  getTrsAreaList(){
    return request({
      url:'/dictionaries/townStreet',
      originalUrl:'/dictionaries/townStreet',
      method:'GET',
    });
  },
  getStatusList(){
    return request({
      url:'/report/flowState/pro',
      originalUrl:'/report/flowState/pro',
      method:'GET',
    });
  },
  getStatusDealList(){
    return request({
      url:'/report/flowState/deal',
      originalUrl:'/report/flowState/deal',
      method:'GET',
    });
  },
  getEnterprise(data){
    return request({
      url:'/enterprise/base',
      method:'GET',
      params:data,
      type:'postConditionData',
      originalUrl:'/enterprise/base'
    })
  },
}
