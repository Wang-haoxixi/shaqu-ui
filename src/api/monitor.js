import request from '@/utils/request'

export default{
    getExcel (params) {
        return request({
            url: '/alarm/list/enterprises/excel',
            originalUrl: '/alarm/list/enterprises/excel',
            method: 'get',
            params
        })
    },
    queryConfig(){
        return request({
           url: '/monitorConfig',
           originalUrl: '/monitorConfig',
            method:'get'
        })
    },
    queryAllIndustries(){
        return request({
            url:'/monitorConfig/industries',
            originalUrl:'/monitorConfig/industries',
            method:'get'
        })
    },
    changeThreshold(id,params){
        return request({
            method:'put',
            url:`/monitorConfig/config/number/${id}`,
            originalUrl:`/monitorConfig/config/number/{id}`,
            params,
        })
    },
    toggleActive(id){
        return request({
            url:`/monitorConfig/toggle/${id}`,
            originalUrl:`/monitorConfig/toggle/{id}`,
            method:'post'})
            },
    configIndustryThreshold(id,data){
        return request({
        url: `/monitorConfig/config/industry/${id}`,
        originalUrl: `/monitorConfig/config/industry/{id}`,
        method: "put",
        data,
        contentType: 'application/json;charset=UTF-8'
    })
    },
    configTimeRange(id,data){
        return request({
            url: `/monitorConfig/config/timeScope/${id}`,
            originalUrl: `/monitorConfig/config/timeScope/{id}`,
            method: "put",
            data,
        })
    },
    queryAlarmList(data){
        return request({
            url:'/alarm',
            originalUrl:'/alarm',
            method:'get',
            params:data,
            type:'postConditionData',
        })
    },
    join(params){
        return request({
            url:'/monitorScope/monitor/join',
            originalUrl:'/monitorScope/monitor/join',
            method:'post',
            params,
            type:'postConditionData',
        })
    },
    leave(params){
        return request({
            url:'/monitorScope/monitor/leave',
            originalUrl:'/monitorScope/monitor/leave',
            method:'post',
            params,
            type:'postConditionData',
        })
    },
    joinMonSelected(data){
        return request({
            url:'/monitorScope/monitor/join/selected',
            originalUrl:'/monitorScope/monitor/join/selected',
            method:'post',
            data,
        })
    },
    leaveMonSelected(data){
        return request({
            url:'/monitorScope/monitor/leave/selected',
            originalUrl:'/monitorScope/monitor/leave/selected',
            method:'post',
            data,
        })
    },
    list(params){
        return request({
            url:'/monitorScope/monitoring',
            originalUrl:'/monitorScope/monitoring',
            method:'get',
            params,
            type:'postConditionData',
        })
    },
    undisposedEntList(params){
        return request({
            url:'/alarm/list/enterprises',
            originalUrl:'/alarm/list/enterprises',
            method:'get',
            params,
        })
    },
    disposedEntList(params){
        return request({
            url:'/alarm/file/enterprises',
            originalUrl:'/alarm/file/enterprises',
            method:'get',
            params,
        })
    },
    //处理流程

    handleList(params){
        return request({
            url:'/alarmHandleProcess',
            originalUrl:'/alarmHandleProcess',
            method:'get',
            params,
            type:'postConditionData'
        })
    },

    handleDetail(id){
        return request({
            url:`/alarmHandleProcess/${id}`,
            originalUrl:'/alarmHandleProcess/{id}',
            method:'get',
        })
    },

    editHandle(data){
        return request({
            url:`/alarmHandleProcess/${data.id}`,
            originalUrl:'/alarmHandleProcess/{id}',
            method:'patch',
            data,
        })
    },

    deleteHandle(id){
        return request({
            url:`/alarmHandleProcess/${id}`,
            originalUrl:'/alarmHandleProcess/{id}',
            method:'delete',
        })
    },

    addHandle(data){
        return request({
            url:`/alarmHandleProcess`,
            originalUrl:'/alarmHandleProcess',
            data,
            method:'post',
        })
    },
    alarmHandle(id,params){
        return request({
            url:`/alarmHandle/${id}`,
            originalUrl:'/alarmHandle/{alarmId}',
            params,
            method:'get',
        })
    },

    alarmHandleNotPass(id,data){
        return request({
            url: `/alarmHandle/notPass/${id}`,
            originalUrl: '/alarmHandle/notPass/{alarmId}',
            method: "POST",
            type:'postFormData',
            data,
        })
    },
    alarmHandlePass(id,data){
        return request({
            url: `/alarmHandle/pass/${id}`,
            originalUrl: '/alarmHandle/pass/{alarmId}',
            method: "POST",
            type:'postFormData',
            data,
        })
    },
    //获取企业监控
    getEntVideo(id){  
        return request({
            url: `/video/list/${id}`,
            originalUrl: '/video/list/{enterpriseId}',
            method: "get",
        })
    },
    //监控企业列表
    getVideoList(params){  
        return request({
            url: `/video/enterprises`,
            originalUrl: '/video/enterprises',
            method: "get",
            type:'postConditionData',
            params,
        })
    },
    subAlarm(data){
        return request({
            url: `/videoMonitor/alarm/base64`,
            originalUrl: '/videoMonitor/alarm/base64',
            method: "post",
            type:'postFormData',
            data,
        })
    },
    
    videoAlarmData(id){
        return request({
            url: `/alarm/alarmFileList/${id}`,
            originalUrl: '/alarm/alarmFileList/{alarmId}',
            method: "get",
        })
    },
    //重置监管范围
    resetScope(data){
        return request({
            url: `/monitorScope/monitor/oneClickSetting`,
            originalUrl: '/monitorScope/monitor/oneClickSetting',
            method: "post",
            type:'postFormData',
            data,
        })
    },
    
  getCamList(){  //资源列表
    return request({
    url:`/video/list/admins`,
    originalUrl:`/video/list/admins`,
    method:'get',
    })
  },
  
}
