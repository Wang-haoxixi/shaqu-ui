import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    // 通过 sessionStorage 来存储页面刷新时 vuex 的 state 丢失的问题
    state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
        breadCrumbList: [],
        permissionList: [],
        nickname :'游客',
        unReadNum:0,
        types: '沙坪坝区'
    },
    mutations: {
        // 存储当前路径面包屑
        saveBreadCrumbList(state, breadCrumbList) {
            state.breadCrumbList = breadCrumbList;
            sessionStorage.setItem('state', JSON.stringify(state));
        },
        // 存储昵称
        saveNickname(state, nickname){
            state.nickname = nickname;
            sessionStorage.setItem('state', JSON.stringify(state));
        },
        saveUnReadNum(state,unReadNum){
            state.unReadNum=unReadNum;
        },
        // 存储权限列表
        savePermissionList(state, permissions) {
            state.permissionList = permissions;
            // 正在设置
            // console.log(`正在设置权限列表：`);
            // console.log(state.permissionList);
            sessionStorage.setItem('state', JSON.stringify(state));
        },
        removePermissionList(state){
            state.permissionList = [];
            sessionStorage.setItem('state', JSON.stringify(state));
        }
    },
    actions: {},
    modules: {}
})
