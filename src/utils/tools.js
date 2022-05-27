import request from '@/utils/request';
// 把对象转换成相应的FormData类型，用于form-data请求方法中
export const transToFormdata = (obj_data) => {
  let formdata = new FormData();
  for(let key in obj_data) {
    if(obj_data[key]) {
      formdata.append(key, obj_data[key])
    }
  }
  return formdata;
}

export const formatDate= (inputTime) => {
  if(!inputTime){
      return ""
  }
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  return y + '-' + m + '-' + d
}

export const formatDateTime = (inputTime) => {
  if(!inputTime){
    return ""
  }
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var min = date.getMinutes();
  min = min < 10 ? ('0' + min) : min;
  var sec = date.getSeconds();
  sec = sec < 10 ? ('0' + sec) : sec;

  return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + sec
}
/**
 * 条件查询方法
 */
export const conds = {
  and: (values) => (values ? { op: "and", values:values.filter(it=>it!=null) } : null), //并且
  or: (values) => (values ? { op: "or", values:values.filter(it=>it!=null) } : null), //或者
  like: (field, value) => (value ? { op: 'like', field, value } : null),//模糊匹配
  in: (field, values) => (values ? { op: 'in', field, values:values.filter(it=>it!=null) } : null),//in 多个
  isNull: (field) => ({ op: 'isNull', field }),//为空
  isNotNull: (field) => ({ op: 'isNotNull', field }),//不为空
  eq: (field, value) => (value ? { op: 'eq', field, value } : null),//等于
  ne: (field, value) => (value ? { op: 'ne', field, value } : null),//不等于
  gt: (field, value) => (value ? { op: 'gt', field, value } : null),//大于
  gte: (field, value) => (value ? { op: 'gte', field, value } : null),//大于等于
  lt: (field, value) => (value ? { op: 'lt', field, value } : null),//小于
  lte: (field, value) => (value ? { op: 'lte', field, value } : null),//小于等于
  between: (field, value1, value2) => (value1 && value2 ? { op: 'between', field, value1, value2 } : null),//在两个值之间
  asConditionString: (condition) => (window.btoa(unescape(encodeURIComponent(condition)))),//转成字符串
}
// 请求并导出二进制文档流
export const exportBlobFile = ({url, filename, params, method = 'GET',type}) => {
  let requestPromise;
  //数据放condition里面
  if( type === 'postConditionData'){
    if (method.toUpperCase() === 'GET') {
      requestPromise = request({
        url: url,
        responseType: 'blob',
        method:method,
        params: params,
        type:'postConditionData',
        originalUrl:url
      });
    } else if(method.toUpperCase() === 'POST') {
      requestPromise = request({
        url: url,
        method:'POST',
        responseType: 'blob',
        data: params,
        type:'postConditionData',
        originalUrl:url
      });
    }
  }else {
    // 兼容各种请求方式
    if (method.toUpperCase() === 'GET') {
      requestPromise = request({
        url: url,
        responseType: 'blob',
        method:'GET',
        params: params,
        originalUrl:url
      });
    } else if(method.toUpperCase() === 'POST') {
      requestPromise = request({
        url: url,
        method:'POST',
        responseType: 'blob',
        data: params,
        originalUrl:url
      });
    }
  }

  // 处理文档流
  return requestPromise.then(resource => {
    const blob = new Blob([resource], {type: "application/vnd.ms-excel"});
    const elink = document.createElement('a');
    const now = formatDate(new Date());
    filename = filename || now;
    elink.download = filename;
    elink.style.display = 'none';
    elink.href = window.URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    window.URL.revokeObjectURL(elink.href); // 释放URL对象（释放内存）
    document.body.removeChild(elink);
    return true;
  }).catch(err => {
    console.log('导出失败', err);
    return true;
  })
}
