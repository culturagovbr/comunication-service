import * as types from './types';

export const mutations = {
    [types.LOGINREQUEST](state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    [types.LOGINSUCCESS](state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    [types.LOGINFAILURE](state) {
        state.status = {};
        state.user = null;
    },
    [types.LOGOUT](state) {
        state.status = {};
        state.user = null;
    },
    [types.REGISTERREQUEST](state, user) {
        state.status = { registering: true };
    },
    [types.REGISTERSUCCESS](state, user) {
        state.status = {};
    },
    [types.REGISTERFAILURE](state, error) {
        state.status = {};
    }
}