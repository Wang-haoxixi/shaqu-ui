import request from '@/utils/request'
export default {
    transList(data) {
      return request({
        url: '/trans/list',
        originalUrl: '/trans/list',
        method: "post",
        data,
      });
    },
    transDetail(id) {
      return request({
        url: '/trans/info/'+id,
        originalUrl: '/trans/info/'+id,
        method: "post",
      });
    },
    transCrossProvince(data){
      return request({
        url: '/transCrossProvince/list',
        originalUrl: '/transCrossProvince/list',
        method: "post",
        data,
      });
    },
    transCrossProvinceInfo(id){
      return request({
        url: `/transCrossProvince/info/${id}`,
        originalUrl: `/transCrossProvince/info/${id}`,
        method: "post",
      });
    }
}

