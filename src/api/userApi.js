import request from '@/utils/request'


export default {

    getUserPermission(data){
        return request({
            url:'/system/client/elements',
            method:'GET',
            params:data,
            originalUrl:'/system/client/elements',
        });
    }
}
