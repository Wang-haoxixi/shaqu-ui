# 项目管理软件前端

## 项目设置

```
yarn install
```

### 开发调试命令

```
yarn serve --port [8081] --mode [htwl|cqhtwl]
```

### 打包命令

```
yarn build --mode [htwl|cqhtwl]
```

### 修正文件

```
yarn lint
```

### 关于路由树权限
```
路由树提交时  相应页面如果是组件没有关键字，需要额外增加调用api的关键字代码 this.$api.monitor.queryConfig()；可参照statistics/declare/CzDeclareStatistics
```

### 自定义配置

See [Configuration Reference](https://cli.vuejs.org/config/).

### API 接口编写规范

API 文件夹：

```
└─src
    └─api
```

请按照如下方式编写：

```js
updateUser(data){
  return request({
    url :`/user/${data.id}`,   //实际请求的 url ，会将id替换掉
    data :data,
    method :'POST',
    originalUrl :'/user/{id}'  //接口文档上的 url ，请一定要配置该字段
  });
},
```

### API 调用规范

请使用如下方式调用 API:

```json
// 推荐方式
this.$api.monitor.queryConfig()

// 禁止方式
this["$api"].monitor.queryConfig()
this.$api["monitor"].queryConfig()
```
