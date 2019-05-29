<template>
    <v-app>
        <barra-lateral v-model="drawer"/>
        <v-toolbar
            :clipped-left="clipped"
            app
            dark
            color="teal darken-4">
            <v-toolbar-side-icon
                v-if="status.loggedIn"
                @click.stop="drawer = !drawer"/>
            <v-toolbar-title v-text="this.$route.name"/>
            <notificacao-badge
                v-show="carregando"
                v-if="status.loggedIn"/>
            <v-spacer/>
            <Status
            />
        </v-toolbar>

        <alerta />
        <router-view/>
        <v-footer
            dark
            height="auto">
            <v-card
                class="flex"
                flat
                color="teal darken-4"
                tile>
                <v-card-actions class="justify-center">
                    <strong>{{ title }}</strong>
                </v-card-actions>
            </v-card>
        </v-footer>
    </v-app>
</template>

<script>

import { mapGetters } from 'vuex';
import NotificacaoBadge from './modules/notificacao/NotificacaoBadge.vue';
import BarraLateral from './modules/core/BarraLateral.vue';
import Alerta from './modules/alert/Alerta.vue';
import Status from './modules/websocket/Status.vue';

export default {
    name: 'App',
    components: {
        NotificacaoBadge,
        BarraLateral,
        Alerta,
        Status,
    },
    data() {
        return {
            carregando: false,
            clipped: false,
            drawer: false,
            fixed: false,
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Notification WebApp',
        };
    },
    computed: {

        ...mapGetters({
            status: 'communicationAccount/status',
            user: 'communicationAccount/user',
            isConnected: 'communicationWebsocket/isConnected',
        }),
    },
    mounted() {
        this.carregando = true;
    },
};
</script>
