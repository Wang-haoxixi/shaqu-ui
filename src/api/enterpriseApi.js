import request from '@/utils/request'

export default {
  getEnterpriseList(data){
    return request({
      url:'/enterprise/base',
      method:'GET',
      params:data,
      type:'postConditionData',
      originalUrl:'/enterprise/base'
    });
  },
  getEnterpriseDetail(data){
    return request({
      url:`/enterprise/base/detail/${data.id}`,
      method:'GET',
      originalUrl:'/enterprise/base/detail/{id}'
    });
  },
  getEnterpriseStaffList(data){
    return request({
      url:'/enterprise/employee',
      method:'GET',
      params:data,
      type:'postConditionData',
      originalUrl:'/enterprise/employee'
    });
  },
  deleteStaff(id){
    return request({
      url:`/enterprise/employee/${id}`,
      method:'DELETE',
      originalUrl:'/enterprise/employee/{id}'
    });
  },
  updateStaff(data,id){
    return request({
      url:`/enterprise/employee/${id}`,
      method:'PATCH',
      data:data,
      originalUrl:'/enterprise/employee/{id}'
    })
  },
  //启用企业账号
  ableEnt(id){
    return request({
      url:`/enterprise/base/enable/${id}`,
      method:'POST',
      originalUrl:'/enterprise/base/enable/{id}'
    })
  },
  //停用企业账号
  disableEnt(id){
    return request({
      url:`/enterprise/base/disable/${id}`,
      method:'POST',
      originalUrl:'/enterprise/base/disable/{id}'
    })
  },
  queryPatyDictionary(data){
    return request({
      url:`/dictionaries/findByParentCode/${data}`,
      method:'GET',
      originalUrl:'/dictionaries/findByParentCode/{data}'
    });
  },
}
