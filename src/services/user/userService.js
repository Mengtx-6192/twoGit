import Service from '../service';
import Vue from 'vue';
const qs = require('qs');

class UserService extends Service {
    login(params) {
        return this.post('/rdp-auth/oauth/token', qs.stringify(params), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: Vue.$config.tokenAuthorization
            }
        });
    }
    refreshToken(params) {
        return this.post('/rdp-auth/oauth/token');
    }
}
export default UserService;
