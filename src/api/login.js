import request from '@/utils/request'
export default {
    login(data) {
      return request({
        url: '/oauth/token',
        originalUrl: '/oauth/token',
        method: "post",
        data,
        type:'postFormData',
      });
    },
    getKeys(){
      return request({
        url: '/account/getks?timestamp='+new Date().getTime(),
        originalUrl: '/account/getks',
        method: "get"
      });
    }
}

