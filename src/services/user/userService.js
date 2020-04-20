import service from '../service';
const qs = require('qs');

const api = {
    login(params) {
        return service.post('/rdp-auth/oauth/token', qs.stringify(params), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            errHandler: false
        });
    },
    refreshToken(params) {
        return service.post('/rdp-auth/oauth/token');
    },
    getCode() {
        return service.get('/rdp-system/dict-biz/list');
    }
};

export default api;
