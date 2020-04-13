import service from '../service';

const api = {
    codeList() {
        return service.get('/rdp-system/dict-biz/list');
    },
    i18nList(data) {
        return service.get('/rdp-system/i18n/list', data);
    },
    i18nMessage(data) {
        return service.get('/rdp-system/i18n_message/list', data);
    },
    // 用户菜单
    getMenus() {
        return service.post('/rdp-user/user/queryUserRoleMenuOperate')
    }
};
export default api;
