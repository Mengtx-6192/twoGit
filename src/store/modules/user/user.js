const state = {
    rAuth: {} || localStorage.getItem('r-auth'),
    isLogin: localStorage.getItem('isLogin') || false,
    accountInfo: JSON.parse(localStorage.getItem('accountInfo')) || {}
};
const getters = {
    rAuth(state) {
        return state.rAuth;
    },
    isLogin(state) {
        return state.isLogin;
    },
    accountInfo(state) {
        return state.accountInfo;
    }
};
const mutations = {
    setRAuth(state, value) {
        state.rAuth = value;
        localStorage.setItem('r-auth', value);
    },
    setLoginStatus(state, value) {
        state.isLogin = value;
        localStorage.setItem('isLogin', value);
    },
    setAccountInfo(state, value) {
        state.accountInfo = value;
        localStorage.setItem('accountInfo', JSON.stringify(value));
    }
};
const actions = {
    setAccountInfo({ commit }, account) {
        let rAuth = account.token_type + ' ' + account.access_token;

        localStorage.setItem('refreshToken', account.refresh_token);
        commit('setAccountInfo', account);
        commit('setLoginStatus', true);
        commit('setRAuth', rAuth);
    },
    clearAccountInfo({ commit }) {
        localStorage.setItem('refreshToken', '');
        commit('setAccountInfo', '');
        commit('setLoginStatus', false);
        commit('setRAuth', '');
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
