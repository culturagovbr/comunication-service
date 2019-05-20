import Vue from 'vue';
import Vuex from 'vuex';

import communicationAccount from './modules/account';
import communicationMensagem from './modules/mensagem';
import communicationNotificacao from './modules/notificacao';
import communicationPlataforma from './modules/plataforma';
import communicationSistema from './modules/sistema';
import communicationWebsocket from './modules/websocket';
import communicationAlert from './modules/alert';
import communicationConta from './modules/conta';


Vue.use(Vuex);

export default new Vuex.Store({

    modules: {
        communicationAccount,
        communicationAlert,
        communicationPlataforma,
        communicationSistema,
        communicationConta,
        communicationMensagem,
        communicationNotificacao,
        communicationWebsocket,
    },
    strict: true,
});
