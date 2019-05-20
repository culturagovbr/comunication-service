import * as types from './types';

export default {
    [types.LOGIN_REQUISICAO](state) {
        state.status = { loggingIn: true };
    },
    [types.LOGIN_SUCESSO](state, token) {
        state.status = { loggedIn: true };
        state.token = token;
    },
    [types.DEFINIR_INFORMACOES_CONTA](state, informacoesConta) {
        state.informacoesConta = informacoesConta;
    },
    [types.LOGIN_FALHA](state) {
        state.status = {};
        state.token = null;
    },
    [types.LOGOUT](state) {
        state.status = {};
        state.token = null;
        state.informacoesConta = null;
    },
    [types.REGISTRAR_REQUISICAO](state) {
        state.status = { registrando: true };
    },
    [types.REGISTRAR_SUCESSO](state) {
        state.status = {};
    },
    [types.REGISTRAR_FALHA](state) {
        state.status = {};
    },
};
