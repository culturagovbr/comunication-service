import * as types from './types';
import { requisicaoAutorizada } from '../account/_auxiliares/requisicao-autorizada';

export const storeInit = () => {};

export const obterMensagems = ({ dispatch, commit }) => {
    requisicaoAutorizada.get(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/v1/mensagem`)
        .then((response) => {
            const { data } = response;
            commit(types.DEFINIR_MENSAGENS, data.data);
        })
        .catch((error) => {
            dispatch('communicationAlert/error', error.response.data.error, {
                root: true,
            });
        });
};

export const removerMensagem = ({ dispatch, commit }, mensagemId) => {
    requisicaoAutorizada.delete(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/v1/mensagem/${mensagemId}`)
        .then(() => {
            commit(types.REMOVER_MENSAGEM, mensagemId);
        }).catch((error) => {
            dispatch('communicationAlert/error', error.response.data.error, {
                root: true,
            });
        });
};

export const cadastrarMensagem = ({ dispatch, commit }, mensagem) => {
    requisicaoAutorizada.post(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/v1/mensagem`, mensagem)
        .then((response) => {
            const { data } = response;
            commit(types.ACRESCENTAR_MENSAGEM, data.data);
            dispatch('communicationAlert/success', 'Cadastro realizado com sucesso!', { root: true });
        }).catch((error) => {
            dispatch('communicationAlert/error', error.response.data.error, {
                root: true,
            });
        });
};

export const atualizarMensagem = ({ dispatch, commit }, mensagem) => requisicaoAutorizada.patch(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/v1/mensagem/${mensagem.mensagem_id}`, mensagem)
    .then(() => {
        commit(types.ATUALIZAR_MENSAGEM, mensagem);
    })
    .catch((error) => {
        dispatch('communicationAlert/error', error.response.data.error, {
            root: true,
        });
    });
