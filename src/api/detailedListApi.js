import request from '@/utils/request'
export default {
    findAllByPage(data) {
      return request({
        url: '/enterprise/sync/list/findAllByPage',
        originalUrl: '/enterprise/sync/list/findAllByPage',
        method: "post",
        data,
      });
    },
    keyFindAllByPage(data) {
      return request({
        url: '/enterprise/sync/list/key/findAllByPage',
        originalUrl: '/enterprise/sync/list/key/findAllByPage',
        method: "post",
        data,
      });
    },
    keyAdd(data) {
      return request({
        url: '/enterprise/sync/list/key/add',
        originalUrl: '/enterprise/sync/list/key/add',
        method: "post",
        data
      });
    },
    keyAppend(enterpriseId){
      return request({
        url: `/enterprise/sync/list/key/append/${enterpriseId}`,
        originalUrl: `/enterprise/sync/list/key/append/${enterpriseId}`,
        method: "post"
      });
    },
    findSetAllByPage(data){
      return request({
        url: `/enterprise/sync/list/key/findSetAllByPage`,
        originalUrl: `/enterprise/sync/list/key/findSetAllByPage`,
        method: "post",
        data,
      });
    },
    addConfirm(){
      return request({
        url: `/enterprise/sync/list/key/addConfirm`,
        originalUrl: `/enterprise/sync/list/key/addConfirm`,
        method: "post",
      });
    },
    delete(id){
      return request({
        url: `/enterprise/sync/list/key/delete/${id}`,
        originalUrl: `/enterprise/sync/list/key/delete/${id}`,
        method: "post",
      });
    },
    listAll(data){
      return request({
        url: `/enterprise/facility/sync/listAll`,
        originalUrl: `/enterprise/facility/sync/listAll`,
        method: "post",
        data,
      });
    },
    appendConfirm(){
      return request({
        url: `/enterprise/sync/list/key/appendConfirm`,
        originalUrl: `/enterprise/sync/list/key/appendConfirm`,
        method: "post"
      });
    },
}

