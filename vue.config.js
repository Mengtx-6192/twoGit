const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const productionGzipExtensions = ['js', 'css'];
const isProduction = ['production', 'prod'].includes(process.env.NODE_ENV);
const dev = 'http://192.168.11.30:20064';
const cdn = {
    css: [],
    js: [
        'https://rongzer-oss.oss-cn-hangzhou.aliyuncs.com/libs/vue.js/2.5.21/vue.min.js',
        'https://cdn.bootcss.com/vue-router/3.0.3/vue-router.js',
        'https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js',
        'https://cdn.bootcss.com/axios/0.19.0/axios.min.js',
        'https://unpkg.com/element-ui/lib/index.js',
        'https://cdn.bootcss.com/lodash.js/4.17.15/lodash.min.js'
    ]
};
const local = 'http://192.168.2.242:8000';
const localUser = 'http://192.168.2.139:8000';

module.exports = {
    lintOnSave: false,
    assetsDir: 'assets',
    productionSourceMap: false,
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        proxy: {
            '/api': {
                target: dev,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
            '/api/rdp-user': {
                target: localUser,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': '/rdp-user'
                }
            }
        },
        sockHost: 'http://127.0.0.1:8080'
    },
    parallel: require('os').cpus().length > 1,
    chainWebpack: config => {
        config.optimization.splitChunks({
            chunks: 'all'
        });

        if (isProduction) {
            config.plugin('html').tap(args => {
                args[0].cdn = cdn;
                return args;
            });
        }
    },
    configureWebpack: config => {
        if (isProduction) {
            config.externals = {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                'element-ui': 'ELEMENT',
                vuex: 'Vuex',
                axios: 'axios',
                lodash: '_'
            };

            const plugins = [];
            plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            drop_console: true,
                            drop_debugger: true,
                            pure_funcs: ['console.log'] // 移除console
                        },
                        mangle: false,
                        output: {
                            beautify: true // 压缩注释
                        }
                    },
                    sourceMap: true,
                    parallel: true
                })
            );

            plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
            plugins.push(
                new BundleAnalyzerPlugin({
                    analyzerMode: 'disabled',
                    generateStatsFile: true,
                    statsOptions: { source: false }
                })
            );
            config.plugins = [...config.plugins, ...plugins];

            config.performance = {
                hints: 'warning', // 枚举
                maxAssetSize: 30000000, // 整数类型（以字节为单位）
                maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
                assetFilter: function(assetFilename) {
                    // 提供资源文件名的断言函数
                    return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
                }
            };
        }
    }
};
