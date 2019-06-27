import * as types from './types';
import { requisicaoAutorizada } from '../account/_auxiliares/requisicao-autorizada';

export const storeInit = () => {};

export const obterSistemas = ({ dispatch, commit }) => {
    requisicaoAutorizada.get(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/v1/sistema`).then((response) => {
        const { data } = response.data;
        commit(types.OBTER_SISTEMAS, data);
    }).catch((error) => {
        dispatch('communicationAlert/error', error.response.data.error, {
            root: true,
        });
    });
};

export const removerSistema = ({ dispatch, commit }, sistemaId) => {
    requisicaoAutorizada.delete(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/v1/sistema/${sistemaId}`).then(() => {
        commit(types.REMOVER_SISTEMA, sistemaId);
    }).catch((error) => {
        dispatch('communicationAlert/error', error.response.data.error, {
            root: true,
        });
    });
};

export const cadastrarSistema = ({ dispatch, commit }, sistema) => requisicaoAutorizada.post(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/v1/sistema`, sistema).then((response) => {
    const { data } = response;
    commit(types.ACRESCENTAR_SISTEMA, data.data);
    dispatch('communicationAlert/success', 'Cadastro realizado com sucesso!', { root: true });
}).catch((error) => {
    dispatch('communicationAlert/error', error.response.data.error, {
        root: true,
    });
});

export const atualizarSistema = ({ dispatch, commit }, sistema) => requisicaoAutorizada.patch(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/v1/sistema/${sistema.sistema_id}`, sistema).then(() => {
    commit(types.ATUALIZAR_SISTEMA, sistema);
}).catch((error) => {
    dispatch('communicationAlert/error', error.response.data.error, {
        root: true,
    });
});
