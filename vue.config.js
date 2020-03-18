// let dev = 'http://192.168.11.30:20064';
let local = 'http://192.168.2.232:8000';

module.exports = {
    lintOnSave: false,
    assetsDir: 'assets',
    devServer: {
        host: '127.0.0.1',
        port: 8080,
        proxy: {
            // todo 配置跨域路径
            '/api': {
                target: local,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        },
        sockHost: 'http://127.0.0.1:8080'
    }
};
