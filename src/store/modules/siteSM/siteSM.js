export default {
    namespaced: true,
    state: {
        siteDetail: {}
    },
    getters: {
        siteDetail(state) {
            return state.siteDetail;
        }
    },
    mutations: {
        setSiteDetailData(state, params) {
            state.siteDetail = params;
        }
    },
    actions: {}
};
