import request from '@/utils/request'
export default {
  wastePackage(data) {
    return request({
      url: '/wastePackage/list',
      originalUrl: '/wastePackage/list',
      method: "post",
      data,
    });
  },
  wastePackageDetail(id) {
    return request({
      url: '/wastePackage/info/'+id,
      originalUrl: '/wastePackage/info/'+id,
      method: "post",
    });
  },
  queryTsWarehouseSyncList(data) {
    return request({
      url: '/wastePackage/queryTsWarehouseSyncList',
      originalUrl: '/wastePackage/queryTsWarehouseSyncList',
      method: "post",
      data
    });
  },
  //企业列表接口
  wmHwmsSyncList(data) {
    return request({
      url: '/wmHwmsSync/list',
      originalUrl: '/wmHwmsSync/list',
      method: "post",
      data
    });
  },
}

