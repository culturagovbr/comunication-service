import axios from 'axios';
import * as types from './types';
import { requisicaoAutorizada } from '../account/_auxiliares/requisicao-autorizada';

export const storeInit = () => {};

export const obterContas = ({ dispatch, commit }) => {
    requisicaoAutorizada.get(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/v1/conta`).then((response) => {
        const { data } = response;
        commit(types.OBTER_CONTAS, data.data);
    }).catch((error) => {
        dispatch('communicationAlert/error', error.response.data.error, {
            root: true,
        });
    });
};

export const removerConta = ({ dispatch, commit }, usuarioId) => {
    requisicaoAutorizada.delete(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/v1/conta/${usuarioId}`).then(() => {
        commit(types.DELETE_CONTA, usuarioId);
    }).catch((error) => {
        dispatch('communicationAlert/error', error.response.data.error, {
            root: true,
        });
    });
};

export const cadastrarConta = ({ dispatch, commit }, conta) => axios.post(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/v1/conta`, conta).then((response) => {
    const { data } = response;
    commit(types.ACRESCENTAR_CONTA, data.data);
    dispatch('communicationAlert/success', 'Cadastro realizado com sucesso!', { root: true });
}).catch((error) => {
    dispatch('communicationAlert/error', error.response.data.error, {
        root: true,
    });
});

export const atualizarConta = ({ dispatch, commit }, conta) => requisicaoAutorizada.patch(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/v1/conta/${conta.usuario_id}`, conta).then(() => {
    commit(types.ATUALIZAR_CONTA, conta);
}).catch((error) => {
    dispatch('communicationAlert/error', error.response.data.error, {
        root: true,
    });
});

export const recuperarSenha = ({ dispatch, commit }, conta) => {
    requisicaoAutorizada.post(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/v1/recuperarSenha`, conta).then((response) => {
        const { data } = response;
        console.log(data.data);
        dispatch('communicationAlert/success', 'Senha alterada com sucesso!', { root: true });
    }).catch((error) => {
        dispatch('communicationAlert/error', error.response.data.error, {
            root: true,
        });
    });
};
