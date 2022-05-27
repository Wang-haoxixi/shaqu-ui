import request from '@/utils/request'
export default {
  login(params) {
    return request({
      url: 'http://172.21.92.49:7779/search/document',
      originalUrl: 'http://172.21.92.49:7779/search/document',
      method: 'get',
      params:params,
    });
  }
}
