export default {
    namespaced: true,
    state: {
        measureDetail: {}
    },
    getters: {
        measureDetail(state) {
            return state.measureDetail;
        }
    },
    mutations: {
        setMeasureDetailData(state, params) {
            state.measureDetail = params;
        }
    },
    actions: {}
};
