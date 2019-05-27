<template>
    <div>

        <v-scale-transition>
            <v-tooltip
                v-if="status.loggedIn"
                bottom>
                <v-btn
                    v-show="isConnected === true"
                    slot="activator"
                    small
                    icon
                    fab
                    color="teal">
                    <v-icon>check</v-icon>
                </v-btn>
                <span>Conectado</span>
            </v-tooltip>
        </v-scale-transition>
        <v-scale-transition>
            <v-tooltip
                v-if="status.loggedIn"
                bottom>
                <v-btn
                    v-show="isConnected === false"
                    slot="activator"
                    small
                    icon
                    fab
                    color="warning">
                    <v-icon>warning</v-icon>
                </v-btn>
                <span>Desconectado</span>
            </v-tooltip>
        </v-scale-transition>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import WebSocketMixins from './_auxiliares/mixins';

export default {
    name: 'Chat',
    mixins: [WebSocketMixins],
    computed: {
        ...mapGetters({
            status: 'communicationAccount/status',
            isConnected: 'communicationWebsocket/isConnected',
        }),
    },
};
</script>
