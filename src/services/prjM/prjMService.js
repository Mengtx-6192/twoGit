import Service from '../service';

export default {
    // 项目保存
    applyCreate(params) {
        return Service.post('/rdp-prj/projectInfo/save', params);
    },
    // 详情
    applyDetail(params) {
        return Service.get('/rdp-prj/projectInfo/detail', params);
    },
    // 拒绝
    refuse(params) {
        return Service.get('/rdp-prj/projectInfo/detail', params);
    },
    // 通过
    ok(params) {
        return Service.get('/rdp-prj/projectInfo/detail', params);
    }
};
