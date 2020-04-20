export default {
    namespaced: true,
    state: {
        prjDetail: {}
    },
    getters: {
        prjDetail(state) {
            return state.prjDetail;
        }
    },
    mutations: {
        setPrjDetailData(state, params) {
            state.prjDetail = params;
        }
    },
    actions: {}
};
