import request from '@/utils/request'

export default {
    //注册账号
    register(data) {
        return request({
            url:'/account',
            method:'POST',
            data:data,
            originalUrl:'/account'
        })
      },
    //查询账号列表
    getUserList(data){
        return request({
            url:'/account',
            method:'GET',
            params:data,
            originalUrl:'/account'
        })
    },
    //获取账号信息
    getUserDetail(id){
        return request({
            url:`/account/${id}`,
            method:'GET',
            originalUrl:'/account/{id}'
        })
    },
    //修改账号信息
    updateUser(data){
        return request({
            url:`/account/${data.id}`,
            method:'PATCH',
            data,
            originalUrl:'/account/{id}'
        })
    },
    //删除
    deleteUser(id){
        return request({
            url:`/account/${id}`,
            method:'DELETE',
            originalUrl:'/account/{id}'
        })
    },
    //分配角色
    assignRole(id,data){
        return request({
            url:`/account/bind/roles/${id}`,
            method:'POST',
            data:data,
            originalUrl:'/account/bind/roles/{accountId}'
        })
    },
    listRole(data) {
        // 角色列表
        return request({
            url:'/role',
            method:'GET',
            params:data,
            originalUrl:'/role',
        })
    },
    addRole(data){
        return request({
            url:'/role',
            method:'POST',
            data,
            originalUrl:'/role'
        })
    },
    deleteRole(data){
        return request({
            url:`/role/${data.id}`,
            method:'DELETE',
            originalUrl:'/role/{id}'
        })
    },
    getRolePermission(data){
        return request({
          url:`/role/elements/${data.id}`,
          method:'GET',
          originalUrl:'/role/elements/{id}'
        });
    },
    getRoleTree(data){
        return request({
            url:'/system/client/elements/tree',
            params :data,
            method:'GET',
            originalUrl:'/system/client/elements/tree'
        });
    },
    submitRoleTree(data){
        return request({
            url:`/system/client/elements/tree/submit/${process.env.VUE_APP_CLIENT_ID}`,
            data :data,
            method:'POST',
            originalUrl:'/system/client/elements/tree/submit/{clientId}'
        });
    },
    listPermission(data) {
        // 权限列表
        return request({
            url:'/system/permissionAjax',
            params: data,
            method:'GET',
            originalUrl:'/system/permissionAjax'
        })
    },
    assignPermission(id,data) {
        // 分配权限
        return request({
            url:`/role/bind/elements/${id}`,
            data :data,
            method:'POST',
            originalUrl:'/role/bind/elements/{id}'
        });
    },
    listMenu(data) {
        // 菜单列表
        return request({
            url:'/system/menuAjax',
            params: data,
            method:'GET',
            originalUrl:'/system/menuAjax'
        })
    },
    //组织列表
    organizationList(){
        return request({
            url:'/organization/tree',
            method:'GET',
            originalUrl:'/organization/tree'
        })
    },
    //新增组织
    addOrganization(data){
        return request({
            url:'/organization',
            method:'POST',
            data,
            originalUrl:'/organization'
        })
    },
    //编辑组织
    uopdateOrganization(data){
        return request({
            url:`/organization/${data.id}`,
            method:'PATCH',
            data,
            originalUrl:'/organization/{id}'
        })
    },
    //删除组织
    deleteOrganization(id){
        return request({
            url:`/organization/${id}`,
            method:'DELETE',
            originalUrl:'/organization/{id}'
        })
    },
 //账号绑定组织
    bindOgranization(data,id){
        return request({
            url:`/account/bind/organization/${id}`,
            method:'post',
            data:data,
            originalUrl:'/account/bind/organization/{id}'
        })
    },
    //组织绑定镇街
    bidTown(data,id){
        return request({
            url:`/organization/bind/townstreet/${id}`,
            method:"POST",
            data,
            originalUrl:'/organization/bind/townstreet/{id}'
        })
    },
    changePsw(data,id){
        return request({
            url:`/account/changePassword/${id}`,
            method:"POST",
            data,
            originalUrl:'/account/changePassword/{id}',
            type:'postFormData'
        })
    },
    getUserInfo(){
        return request({
            url:`/system/user/current`,
            method:"get",
            originalUrl:'/system/user/current'
        })
    },
    getOrgUserList(){
        return request({
            url:`/account/byOrg`,
            method:"get",
            originalUrl:'/account/byOrg'
        })
    },
    //短信发送记录
    getMsgList(params){
        return request({
            url:`/smsRecord`,
            method:"get",
            originalUrl:'/smsRecord',
            type:'postConditionData',
            params,
        })
    },
    //短信发送余额
    getMsgBalance(){
        return request({
            url:`/smsRecord/balance`,
            method:"get",
            originalUrl:'/smsRecord/balance',
        })
    },
    //短信内容列表
    getMsmNotification(){
        return request({
            url:`/smsRecord/notification`,
            method:"get",
            originalUrl:'/smsRecord/notification',
        })
    },
    //短信发送
    getMsmSend(data){
        return request({
            url:`/smsRecord/send`,
            method:"post",
            originalUrl:'/smsRecord/send',
            data:data,
        })
    },
    //短信发送
    getMsmSendAll(data){
        return request({
            url:`/smsRecord/send/all`,
            method:"post",
            originalUrl:'/smsRecord/send/all',
            type:'postConditionFormData',
            data:data,
        })
    }
}
