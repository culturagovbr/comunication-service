import axios from 'axios';
import * as types from './types';
import { obterInformacoesJWT } from './_auxiliares/jwt';
import { requisicaoAutorizada } from './_auxiliares/requisicao-autorizada';

export const storeInit = () => {};

export const login = ({ dispatch, commit }, {
    cpf, password, nome, sistema,
}) => {
    commit(types.LOGIN_REQUISICAO, { cpf });
    return requisicaoAutorizada.post(
        `http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/v1/autenticacao/login`,
        {
            cpf, password, nome, sistema,
        },
    ).then((response) => {
        try {
            if (response.data && response.data.data) {
                const { data } = response.data;
                if (data && data.token) {
                    commit(types.LOGIN_SUCESSO, data.token);
                    localStorage.setItem('communication_token', data.token);
                    dispatch('communicationAlert/info', 'Login realizado com sucesso!', {
                        root: true,
                    });
                    dispatch('definirInformacoesConta', data.token);
                } else {
                    dispatch('communicationAlert/error', 'Falha ao realizar login.', {
                        root: true,
                    });
                }
            }
        } catch (Exception) {
            dispatch('communicationAlert/error', `Erro: ${Exception}`, {
                root: true,
            });
        }
        return response;
    }).catch((error) => {
        if (error.response && error.response.data) {
            commit(types.LOGIN_FALHA, error.response.data.error);
            dispatch('communicationAlert/error', `Erro: ${error.response.data.error}`, {
                root: true,
            });
        }
    });
};

export const definirInformacoesConta = ({ commit }, token) => {
    const objetoJWT = obterInformacoesJWT(token);
    commit(types.DEFINIR_INFORMACOES_CONTA, objetoJWT.user);
};

export const logout = ({ commit }) => {
    localStorage.removeItem('token');
    commit(types.LOGOUT);
};

export const registrar = ({ dispatch, commit }, user) => {
    commit(types.REGISTRAR_REQUISICAO);
    axios.post(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/v1/conta`, JSON.parse(JSON.stringify(user))).then(
        (response) => {
            commit(types.REGISTRAR_SUCESSO);
            dispatch('communicationAlert/success', 'Cadastro realizado com sucesso!', { root: true });
            return response;
        },
        (error) => {
            if (error.response && error.response.data) {
                commit(types.REGISTRAR_FALHA);
                dispatch('communicationAlert/error', error.response.data.error, {
                    root: true,
                });
            }
        },
    );
};
