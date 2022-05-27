import Cookies from 'js-cookie';

const tokenKey = '.authx'

export function getToken() {
    return Cookies.get(tokenKey);
}


export function setToken(token) {
    // console.log(`正在设置 token： ${token}`)
    // 服务器上是30天过期
    return Cookies.set(tokenKey, token, { expires: 30 });
}


export function removeToken() {
    return Cookies.remove(tokenKey);
}
