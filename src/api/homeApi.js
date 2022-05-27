import request from '@/utils/request'

export default {
    getAlarmNum(){
        return request({
            url:'/index/alarm/count',
            originalUrl:'/index/alarm/count',
            method:'get'
        })
    },
    getAlarmList(params){
        return request({
            url:'/index/alarm/list',
            originalUrl:'/index/alarm/list',
            method:'get',
            params,
        })
    },
    getRegisterData(){
        return request({
            url:'/index/enterprise/register',
            originalUrl:'/index/enterprise/register',
            method:'get',
        })
    },
    getWasteOverall(){
        return request({
            url:'/index/first/waste/overall',
            originalUrl:'/index/first/waste/overall',
            method:'get',
        })
    },
    getWasteIndustry(){
        return request({
            url:'/index/first/waste/industry',
            originalUrl:'/index/first/waste/industry',
            method:'get',
        })
    },
    addEP(data){
        return request({
            url:`/enterprise/base/add/${data.type}/${data.id}`,
            originalUrl:`/enterprise/base/add/{type}/{id}`,
            method:'post',
        })
    },
    deleteEP(data){
        return request({
            url:`/enterprise/base/remove/${data.type}/${data.id}`,
            originalUrl:`/enterprise/base/remove/{type}/{id}`,
            method:'DELETE',
        })
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
    getMonthOrDayDetail(params){
        return request({
            url:'/index/second/waste/monthOrDay/detail',
            originalUrl:'/index/second/waste/monthOrDay/detail',
            method:'get',
            params,
        })
    },
    getDayDetail(params){
        return request({
            url:'/index/second/waste/day',
            originalUrl:'/index/second/waste/day',
            method:'get',
            params,
        })
    },
    getMonthDetail(params){
        return request({
            url:'/index/second/waste/month',
            originalUrl:'/index/second/waste/month',
            method:'get',
            params,
        })
    },
    getUnReadNum(){
        return request({
            url:'/systemMessage/unread',
            originalUrl:'/systemMessage/unread',
            method:'get',
        })
    },
    getMsgList(params){
        return request({
            url:'/systemMessage',
            originalUrl:'/systemMessage',
            method:'get',
            params,
            type:'postConditionData'
        })
    },
    setMsgRead(id){
        return request({
            url:`/systemMessage/read/${id}`,
            originalUrl:'/systemMessage/read/{systemMessageId}',
            method:'post',
        })
    },
    getMsgDetail(id){
        return request({
            url:`/alarm/${id}`,
            originalUrl:'/alarm/{id}',
            method:'get',
        })
    },
    //app接口，用于声明
     //企业废物占比
     getWasteDetail(id) {
        return request({
            url: `/enterprise/base/waste/ratio/${id}`,
            method: 'GET',
            originalUrl: '/enterprise/base/waste/ratio/{id}'
        });
    },
    //企业月度废物统计
    getMonthData(id) {
        return request({
            url: `/enterprise/base/waste/month/${id}`,
            method: 'GET',
            originalUrl: '/enterprise/base/waste/month/{id}'
        });
    },
    //企业年度废物统计
    getYearData(id) {
        return request({
            url: `/enterprise/base/waste/year/${id}`,
            method: 'GET',
            originalUrl: '/enterprise/base/waste/year/{id}'
        });
    },
    
    //全区危险废物转移情况
    getWasteTrans() {
        return request({
            url: `/index/waste/hazardous`,
            method: 'GET',
            originalUrl: '/index/waste/hazardous'
        });
    },
    //全区医疗废物转移情况
    getMedTrans() {
        return request({
            url: `/index/waste/medical`,
            method: 'GET',
            originalUrl: '/index/waste/medical'
        });
    },

}
