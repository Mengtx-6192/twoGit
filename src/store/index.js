import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [
        createPersistedState({
            reducer(state) {
                return {
                    log: {
                        ...state.log
                    }
                };
            }
        })
    ],
    modules
});

export default store;
