import axios from 'axios';
import { Message } from 'element-ui';
const qs = require('qs');

const service = {
    successHandler(res) {
        if (res.status === 200) {
            return res.data;
        }
        return {};
    },
    errHandler(err, { errHandler = true }) {
        if (errHandler) {
            Message.error(err.message || '接口调用异常');
        }

        return Promise.reject(err);
    },
    get(url, options, otherConfig = {}) {
        return axios
            .get(url, {
                params: options,
                ...otherConfig
            })
            .then(this.successHandler)
            .catch(err => this.errHandler(err, otherConfig));
    },
    post(url, options, otherConfig = {}) {
        return axios
            .post(url, options, otherConfig)
            .then(this.successHandler)
            .catch(err => this.errHandler(err, otherConfig));
    },
    delete(url, options, otherConfig = {}) {
        return axios
            .delete(url, {
                data: options,
                ...otherConfig
            })
            .then(this.successHandler)
            .catch(err => this.errHandler(err, otherConfig));
    },
    deleteParams(url, options, otherConfig = {}) {
        return axios
            .delete(url, {
                params: options,
                paramsSerializer: params => {
                    return qs.stringify(params, { indices: false });
                },
                ...otherConfig
            })
            .then(this.successHandler)
            .catch(err => this.errHandler(err, otherConfig));
    },
    put(url, options, otherConfig = {}) {
        return axios
            .put(url, options, otherConfig)
            .then(this.successHandler)
            .catch(err => this.errHandler(err, otherConfig));
    }
};

export default service;
