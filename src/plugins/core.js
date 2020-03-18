/**
 * 插件
 */
import vueRouter from 'vue-router';
import Promise from 'promise-polyfill';
import components from '@/components';
import userService from '@/services/user/userService';
import elementUi, { Message, Loading, MessageBox } from 'element-ui';
import axios from 'axios';
import config from '@/config';
import store from '@/store';

const jwt = require('jsonwebtoken');
let loading;
let requests = [];
let isRefreshing = false;

// 内存中正在请求的数量
let loadingNum = 0;

export default {
    startLoading() {
        if (loadingNum === 0) {
            loading = Loading.service({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        }
        loadingNum++;
    },
    endLoading() {
        loadingNum--;
        if (loadingNum <= 0) {
            loading.close();
        }
    },
    loadGlobalComponents(Vue) {
        _.each(components, componentModules => {
            _.each(componentModules, component => {
                if (component.length) {
                    Vue.component(component[0], component[1]);
                } else {
                    Vue.component(component.name, component);
                }
            });
        });
    },
    defineVueProp(Vue) {
        Vue.prop = (key, value) => {
            Vue[`$${key}`] = Vue.prototype[`$${key}`] = value;
        };
    },

    refreshTokenInfo() {
        this.userService = new userService();

        return this.userService.login({
            refresh_token: localStorage.getItem('refreshToken') || '',
            grant_type: 'refresh_token',
            scope: 'all'
        });
    },

    errHandle(Vue) {
        MessageBox.confirm('token失效，请重新登陆', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
        }).then(() => {
            store.dispatch('user/clearAccountInfo');
            Vue.$router.push({ path: '/login.html' });
        });

        return Promise.reject({});
    },
    install(Vue) {
        // 定义Vue全局属性
        this.defineVueProp(Vue);
        // 加载核心组件
        this.loadGlobalComponents(Vue);

        Vue.use(elementUi);

        // 加载核心插件
        Vue.use(vueRouter);

        // 附加Vue原型属性
        Vue.prop('config', config[process.env.NODE_ENV]);

        // 设置axios默认参数
        axios.defaults.baseURL = Vue.$config.axiosBaseUrl;
        axios.defaults.responseType = Vue.$config.axiosResponseType;
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        axios.defaults.headers.common['Authorization'] = Vue.$config.tokenAuthorization;
        axios.defaults.timeout = 10000;
        axios.defaults.withCredentials = true;

        axios.interceptors.request.use(
            config => {
                let refreshToken = localStorage.getItem('refreshToken'); // 从localStorage中取出token过期时间
                let rAuth = localStorage.getItem('r-auth');

                // 统一添加/api 转发接口
                config.url = `/api${config.url}`;
                this.startLoading();

                // 添加请求头
                config.headers.common['r-auth'] = rAuth;

                // 登录接口和刷新token接口绕过
                if (config.url.indexOf('/api/rdp-auth/oauth/token') >= 0) {
                    return config;
                }

                if (refreshToken) {
                    let rAuthObj = rAuth.split(' ');
                    let token = rAuthObj.length > 1 ? rAuthObj[1] : rAuth;
                    let refreshTokenDecoded = jwt.decode(refreshToken);
                    let tokenDecoded = jwt.decode(token);
                    let expiredTime = new Date(refreshTokenDecoded.exp * 1000).getTime();
                    let expiredTokenTime = new Date(tokenDecoded.exp * 1000).getTime(); // 从localStorage中取出token过期时间
                    let nowTime = new Date().getTime();
                    let isRefreshTokenExpired = expiredTime < nowTime;
                    let isTokenExpired = expiredTokenTime - nowTime < 1 * 6000;

                    if (isTokenExpired && !isRefreshTokenExpired) {
                        // 立即刷新token
                        if (!isRefreshing) {
                            // console.log('刷新token ing');
                            isRefreshing = true;
                            this.refreshTokenInfo()
                                .then(ret => {
                                    store.dispatch('user/setAccountInfo', ret);
                                    isRefreshing = false;
                                    return ret;
                                })
                                .then(token => {
                                    // console.log('刷新token成功，执行队列');
                                    requests.forEach(cb => cb(token));
                                    // 执行完成后，清空队列
                                    requests = [];
                                })
                                .catch(res => {
                                    // console.error('refresh token error: ', res);
                                });
                        }
                        const retryOriginalRequest = new Promise(resolve => {
                            requests.push(ret => {
                                // 因为config中的token是旧的，所以刷新token后要将新token传进来
                                config.headers.common['r-auth'] = ret.token_type + ' ' + ret.access_token;
                                resolve(config);
                            });
                        });
                        return retryOriginalRequest;
                    } else if (isRefreshTokenExpired) {
                        this.errHandle(Vue);
                    }
                } else {
                    this.errHandle(Vue);
                }

                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );

        axios.interceptors.response.use(
            response => {
                this.endLoading();

                if (response.status === 200 && response.config.url === '/api/rdp-auth/oauth/token') {
                    return response;
                }

                if (response.data.code !== 200) {
                    Message.error(response.data.message);
                    return Promise.reject({ response });
                }

                if (response.status >= 200 && response.status < 300) {
                    return response;
                }

                // Message.error('接口异常');
                return Promise.reject({ response });
            },
            error => {
                this.endLoading();
                if (error.response) {
                    // 对响应错误做点什么
                    if (error.response.status === 401) {
                        Message.error('登录状态信息过期,请重新登录');
                        Vue.$router.push({ path: '/login.html' });
                    }
                }
                // Message.error('接口异常');
                return Promise.reject(error.response.data);
            }
        );
    }
};
