import request from '@/utils/request'

export default {
    getExcel1List(params){
        return request({
            url:'/export/excel1List',
            originalUrl:'/export/excel1List',
            method:'get',
            params
        })
    }
}
