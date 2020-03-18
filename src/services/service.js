import axios from 'axios';
var qs = require('qs');

class Service {
    get(url, options, otherConfig = {}) {
        return axios
            .get(url, {
                params: options,
                ...otherConfig
            })
            .then(res => {
                if (res.status === 200) {
                    return res.data;
                }
                return {};
            });
    }
    post(url, options, otherConfig) {
        return axios.post(url, options, otherConfig).then(res => {
            if (res.status === 200) {
                return res.data;
            }
            return {};
        });
    }
    delete(url, options, otherConfig) {
        return axios
            .delete(url, {
                data: options,
                ...otherConfig
            })
            .then(res => {
                if (res.status === 200) {
                    return res.data;
                }
                return {};
            });
    }
    deleteParams(url, options, otherConfig) {
        return axios
            .delete(url, {
                params: options,
                paramsSerializer: params => {
                    return qs.stringify(params, { indices: false });
                },
                ...otherConfig
            })
            .then(res => {
                if (res.status === 200) {
                    return res.data;
                }
                return {};
            });
    }
    put(url, options, otherConfig) {
        return axios.put(url, options, otherConfig).then(res => {
            if (res.status === 200) {
                return res.data;
            }
            return {};
        });
    }
}

export default Service;
