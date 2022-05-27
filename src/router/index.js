import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import routes from './routeList'
import {getToken,removeToken} from '@/utils/auth'
import store from '@/store';
import userApi from '@/api/userApi';
import {Message} from "element-ui";
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {

    return originalPush.call(this, location).catch(err => err)

}
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    NProgress.start();
    if (to.path === '/user/login' ) {
        store.commit('removePermissionList')
        removeToken();
        // 钉钉扫码登录授权回调
        // console.log('需要登录授权判断，放行')
        next()
    } else if (!getToken()){
        // console.log('需要登录授权，重定向')
        next({path: '/user/login'});
        store.commit('removePermissionList')

    }else {
        // console.log('已登录，我是谁，我在哪')
        if (store.state.permissionList.length === 0) {
            userApi.getUserPermission({userOnly:1})
                .then(resp => {
                    console.log("resp",resp)
                    var permissionList = resp.map(function (item) {
                        return {
                            uuid:item.uuid,
                            parentUuid:item.parentUuid
                        }
                    });
                    store.commit('savePermissionList', permissionList);
                    next();
                })
                .catch(err => {
                    Message.error(err.msg);
                    next();
                });
        } else {
            if(to.path ===  '/changepassword' || to.path==='/submitTree' || JSON.stringify(store.state.permissionList).includes(to.path.slice(1).replace('/',':'))){
                next();
            }else{
                Message.error('暂无权限')
            }
        }
    }
});

router.afterEach(() => {
    NProgress.done() // finish progress bar
})

export default router
