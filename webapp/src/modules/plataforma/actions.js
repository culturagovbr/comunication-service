import * as types from './types';
import { requisicaoAutorizada } from '../account/_auxiliares/requisicao-autorizada';

export const storeInit = () => {};

export const obterPlataformas = ({ dispatch, commit }) => requisicaoAutorizada.get(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/v1/plataforma`)
    .then((response) => {
        const { data } = response;
        commit(types.SET_PLATAFORMA, data.data);
    })
    .catch((error) => {
        dispatch('communicationAlert/error', error.response.data.error, {
            root: true,
        });
    });

export const removerPlataforma = ({ dispatch, commit }, plataformaId) => requisicaoAutorizada.delete(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/v1/plataforma/${plataformaId}`)
    .then(() => {
        commit(types.DELETE_PLATAFORMA, plataformaId);
    }).catch((error) => {
        dispatch('communicationAlert/error', error.response.data.error, {
            root: true,
        });
    });

export const cadastrarPlataforma = ({ dispatch, commit }, plataforma) => requisicaoAutorizada.post(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/v1/plataforma`, plataforma)
    .then((response) => {
        const { data } = response;
        commit(types.ACRESCENTAR_PLATAFORMA, data.data);
        dispatch('communicationAlert/success', 'Cadastro realizado com sucesso!', { root: true });
    }).catch((error) => {
        dispatch('communicationAlert/error', error.response.data.error, {
            root: true,
        });
    });

export const atualizarPlataforma = ({ dispatch, commit }, plataforma) => requisicaoAutorizada.patch(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/v1/plataforma/${plataforma.plataforma_id}`, plataforma)
    .then(() => {
        commit(types.ATUALIZAR_PLATAFORMA, plataforma);
    })
    .catch((error) => {
        dispatch('communicationAlert/error', error.response.data.error, {
            root: true,
        });
    });
