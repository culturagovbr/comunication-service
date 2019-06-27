import * as types from './types';
import $socket from './_auxiliares/socket-client-instance';

export const storeInit = () => {};

export const Socket_connect = ({ commit }, dados) => {
    commit(types.SOCKET_CONNECT, dados);
};

export const Socket_disconect = ({ commit }, dados) => {
    commit(types.SOCKET_DISCONNECT, dados);
};

export const Socket_serverEntrarEmSala = ({ commit }, dados) => {
    const { sala } = dados;
    $socket.emit('serverEntrarEmSala', {
        sala,
    });
    commit(types.SOCKET_SERVER_ENTRAREMSALA, dados);
};

export const Socket_serverMensagemSala = ({ commit }, dados) => {
    const { sala } = dados;
    const { mensagem } = dados;
    $socket.emit('serverMensagemSala', {
        sala,
        mensagem,
    });
    commit(types.SOCKET_SERVER_MENSAGEMSALA, dados);
};

export const Socket_clientConnectedUsers = ({ commit }, dados) => {
    commit(types.SOCKET_CLIENT_CONNECTEDUSERS, dados);
};

export const Socket_clientEntrarEmSala = ({ commit, dispatch }, dados) => {
    commit(types.SOCKET_CLIENT_ENTRAREMSALA, dados);
    const { sala } = dados;
    const mensagem = 'Entrou na sala.';
    dispatch('Socket_serverMensagemSala', {
        sala,
        mensagem,
    });
};

export const Socket_clientSairDaSala = ({ commit, dispatch }, dados) => {
    commit(types.SOCKET_CLIENT_SAIRDASALA, dados);
    const { sala } = dados;
    const { usuario } = dados;
    const mensagem = `${usuario.name} Saiu na sala.`;
    dispatch('Socket_serverMensagemSala', {
        sala,
        mensagem,
    });
};

export const Socket_clientMensagemSala = ({ commit }, dados) => {
    commit(types.SOCKET_CLIENT_MENSAGEMSALA, dados);
};

export const Socket_clientMembrosSala = ({ commit }, dados) => {
    commit(types.SOCKET_CLIENT_MEMBROSSALA, dados);
};

export const definirNomeSalaAtual = ({ commit }, dados) => {
    commit(types.DEFINIR_NOME_SALA_ATUAL, dados);
};
