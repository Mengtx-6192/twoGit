import Service from '../service';

export default {
    // 点址列表
    getSiteMeetingList(params) {
        return this.post('/rdp-prj/prj/siteMeeting/getSiteMeetingList', params);
    },
    // 获取选址/点址详情
    getSiteMeetingById(params) {
        return this.get('/rdp-prj/prj/siteMeeting/getSiteMeetingById', params);
    },
    // 保存列表
    saveOrUpdateSiteMeeting(params) {
        return this.post('/rdp-prj/prj/siteMeeting/saveOrUpdateSiteMeeting', params);
    },
    // 提交点址(工作流)
    submitSiteMeeting(params) {
        return this.post('/rdp-prj/prj/siteMeeting/submitSiteMeeting', params);
    },
    // gis同步到工程
    DataGisProSynch(params) {
        return this.get('/rdp-prj/prj/siteMeeting/DataGisProSynch', params);
    }
};
