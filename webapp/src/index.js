import VueSocketIO from 'vue-socket.io';
import communicationAccount from './modules/account';
import communicationMensagem from './modules/mensagem';
import communicationNotificacao from './modules/notificacao';
import communicationPlataforma from './modules/plataforma';
import communicationSistema from './modules/sistema';
import communicationWebsocket from './modules/websocket';

import CommunicationServiceChat from './modules/websocket/Chat.vue';
import CommunicationServiceStatus from './modules/websocket/Status.vue';
import CommunicationServiceNotificacaoBadge from './modules/notificacao/NotificacaoBadge.vue';
import filters from './filters';
import $socket from './modules/websocket/_auxiliares/socket-client-instance';

function install(Vue, { store }) {
    if (install.installed) return;
    install.installed = true;

    if (!store) console.log('Informe uma store.');

    Vue.component('communication-service-chat', CommunicationServiceChat);
    Vue.component('communication-service-status', CommunicationServiceStatus);
    Vue.component('communication-service-notificacao-badge', CommunicationServiceNotificacaoBadge);

    store.registerModule('communicationAccount', communicationAccount);
    store.registerModule('communicationMensagem', communicationMensagem);
    store.registerModule('communicationNotificacao', communicationNotificacao);
    store.registerModule('communicationPlataforma', communicationPlataforma);
    store.registerModule('communicationSistema', communicationSistema);
    store.registerModule('communicationWebsocket', communicationWebsocket);

    filters.create(Vue);

    Vue.use(new VueSocketIO({
        debug: false,
        connection: $socket,
        vuex: {
            store,
            actionPrefix: 'Socket_',
            mutationPrefix: 'Socket_',
        },
    }));
}

// Cria a definição do módulo para Vue.use()
const plugin = {
    install,
};

// Auto-instala quando o Vue é encontrado (no navegador via <script>)
let GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}

// Para permitir o uso como um módulo exportável (npm/webpack/etc.)
export default {
    install,
    CommunicationServiceChat,
    CommunicationServiceStatus,
    CommunicationServiceNotificacaoBadge,
};
