import moment from 'moment';
import * as types from './types';

export const mutations = {
    [types.SOCKET_CONNECT](state, data) {
        console.log(data);
        state.isConnected = true;
    },

    [types.SOCKET_DISCONNECT](state, data) {
        console.log(data);
        state.isConnected = false;
    },

    [types.SOCKET_SERVER_ENTRAREMSALA](state, data) {
        console.log(data);
    },

    [types.SOCKET_SERVER_MENSAGEMSALA](state, data) {
        console.log(data);
    },

    [types.SOCKET_CLIENT_CONNECTEDUSERS](state, data) {
        state.connectedUsers = data;
    },

    [types.SOCKET_CLIENT_ENTRAREMSALA](state, data) {
        const { sala } = data;
        const indiceSala = state.salas.findIndex(valor => valor.sala === sala);
        if (indiceSala === -1) {
            state.indiceSalaAtual = state.salas.push({
                sala,
                mensagens: [],
            }) - 1;
        }
    },

    [types.SOCKET_CLIENT_SAIRDASALA](state, data) {
        const { sala } = data;
        const { usuario } = data;
        const indiceSalaPesquisada = state.salas.findIndex(valor => valor.sala === sala);
        if (indiceSalaPesquisada === -1) {
            return false;
        }
        const indiceUsuarioSalaPesquisada = state.salas[indiceSalaPesquisada]
            .membros
            .findIndex(membro => membro.email === usuario.email);

        if (indiceUsuarioSalaPesquisada === -1) {
            return false;
        }

        state.salas[indiceSalaPesquisada].membros.splice(indiceUsuarioSalaPesquisada, 1);
    },

    [types.SOCKET_CLIENT_MENSAGEMSALA](state, data) {
        const { sala } = data;
        const { mensagem } = data;
        const horario = moment().format();
        const indiceSala = state.salas.findIndex(valor => valor.sala === sala);
        if (indiceSala !== -1) {
            state.salas[indiceSala].mensagens.push({
                mensagem,
                horario,
                usuario: {
                    email: data.usuario.email,
                    name: data.usuario.name,
                },
            });
            state.indiceSalaAtual = indiceSala;
        }
    },

    [types.SOCKET_CLIENT_MEMBROSSALA](state, data) {
        const { membros } = data;
        console.log('SOCKET_CLIENT_MEMBROSSALA');
        console.log(data);
        state.salas[state.indiceSalaAtual].membros = membros;
    },

    [types.DEFINIR_NOME_SALA_ATUAL](state, data) {
        const { nomeSalaAtual } = data;
        state.nomeSalaAtual = nomeSalaAtual;
    },
};
