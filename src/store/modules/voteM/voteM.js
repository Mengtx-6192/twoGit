export default {
    namespaced: true,
    state: {
        voteDetail: {}
    },
    getters: {
        voteDetail(state) {
            return state.voteDetail;
        }
    },
    mutations: {
        setVoteDetailData(state, params) {
            state.voteDetail = params;
        }
    },
    actions: {}
};
