import * as types from './types';

export const storeInit = () => {};

export const success = ({ commit }, message) => {
    commit(types.SUCCESS, message);
};
export const error = ({ commit }, message) => {
    commit(types.ERROR, message);
};
export const info = ({ commit }, message) => {
    commit(types.INFO, message);
};
export const limpar = ({ commit }, message) => {
    commit(types.LIMPAR, message);
};
