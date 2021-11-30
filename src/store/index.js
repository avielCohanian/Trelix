import Vue from 'vue';
import Vuex from 'vuex';
import { userStore } from './userStore.js';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,

    state: {},
    mutations: {},
    actions: {},
    modules: {
        userStore,
    },
});
