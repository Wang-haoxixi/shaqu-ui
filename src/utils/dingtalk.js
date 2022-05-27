// export function ddLogin() {
//     return new Promise(((resolve, reject) => {
//         if (window.DDLogin) {
//             console.log('我是第 NNNN 次');
//             return resolve(window.DDLogin);
//         }
//
//         console.log('让我来');
//         const s = document.createElement('script');
//         s.type = 'text/javascript';
//         s.src = '//g.alicdn.com/dingding/dinglogin/0.0.5/ddLogin.js';
//         s.onerror = reject;
//         s.onload = function () {
//             console.log('我是第 1 次');
//             return resolve(window.DDLogin);
//         }
//         document.head.appendChild(s);
//     }));
// }
