import Service from '../service';

export default {
    // 根据id获取详情
    getVoteMeetingInfo(params) {
        return this.post('/rdp-prj/prj/voteMeeting/getVoteMeetingInfo', params);
    },
    // 更新信息
    updateVoteMeetingInfo(params) {
        return this.post('/rdp-prj/prj/voteMeeting/updateVoteMeetingInfo', params);
    }
};
