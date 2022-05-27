import request from '@/utils/request';

export default {
  getURL(data){    //直播链接
    return request({
      url:`/zwwapi/hkws/getCameraPreviewURL`,
      method:'post',
      data,
    });
  },

//   POST /zwwapi/hkws/getCameraPreviewURL
// 回放：POST /zwwapi/hkws/getPlaybackURLs
// 资源列表：POST /zwwapi/hkws/getCameras
  getHisURL(data){    //cameraIndexCode,beginTime,endTime(yyyy-MM-dd’T’HH:mm:ss.SSSXXX)   相差不超过三天
    return request({
      url:`/zwwapi/hkws/getPlaybackURLs`,
      method:'post',
      data,
    })
  },

}