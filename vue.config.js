module.exports = {
    publicPath: './',
    productionSourceMap: false,
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = '固体废物综合管理平台';
            return args;
        });
    },
    devServer: {
        disableHostCheck: true,  // 开发时，在内网穿透环境下，这个配置会导致 Invalid Host header，需要关掉，生产环境可以设置为 false
    }
}
