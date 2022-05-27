import request from '@/utils/request';


export default {
    listTodo() {
        // 项目列表
        return request.get('/dashboard/listTodo');
    },
    getTodo(data) {
        return request.get('/dashboard/getTodo', {params: data});
    },
    auditTodo(data) {
        return request.post('/dashboard/auditTodo', data);
    }
}
