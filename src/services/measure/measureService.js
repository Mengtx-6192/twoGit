import Service from '../service';

export default {
    // 现场测绘提请详情
    requestDetail(params) {
        return Service.get('/rdp-prj/mapping/requestDetail', params);
    },
    // 现场测绘提请修改
    requestUpdate(params) {
        return Service.post('/rdp-prj/mapping/requestUpdate', params);
    },
    // 现场测绘报告详情
    reportDetail(params) {
        return Service.get('/rdp-prj/mapping/reportDetail', params);
    },
    // 现场测绘报告撤回
    withdrawMappingReport(params) {
        return Service.post('/rdp-prj/mapping/withdrawMappingReport', params);
    },
    // 现场测绘报告提交
    submitMappingReport(params) {
        return Service.post('/rdp-prj/mapping/submitMappingReport', params);
    },
    // 现场测绘报告拒绝
    refuseMappingReport(params) {
        return Service.post('/rdp-prj/mapping/refuseMappingReport', params);
    },
    // 现场测绘报告审核
    approvalMappingReport(params) {
        return Service.post('/rdp-prj/mapping/approvalMappingReport', params);
    }
};
