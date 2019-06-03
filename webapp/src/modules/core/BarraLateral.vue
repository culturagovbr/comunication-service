<template>
    <v-navigation-drawer
        v-if="status.loggedIn"
        :mini-variant="miniVariant"
        v-model="drawer"
        clipped="clipped"
        enable-resize-watcher
        color="primary"
        temporary
        app>
        <v-card
            dark
            color="cyan darken-4">
            <v-list class="pa-1">
                <v-list-tile
                    avatar
                    tag="div">
                    <v-list-tile-avatar>
                        <i class="material-icons">
                            account_circle
                        </i>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ informacoesConta.name }}</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-btn
                            icon
                            @click.stop="drawer = !drawer">
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-card>
        <v-list class="pt-0">
            <v-divider/>
            <v-list-tile
                v-for="(item, i) in obterMenusLaterais()"
                :key="i"
                :to="item.to"
                value="true">
                <v-list-tile-action>
                    <v-icon v-html="item.icon"/>
                </v-list-tile-action>
                <v-list-tile-content color="white">
                    <v-list-tile-title v-text="item.title"/>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    name: 'App',
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
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
            token: 'communicationAccount/token',
            informacoesConta: 'communicationAccount/informacoesConta',
        }),
    },
    watch: {
        value(val) {
            this.drawer = val;
        },
        drawer(val) {
            this.$emit('input', val);
        },
    },
    methods: {
        obterMenusLaterais() {
            const menusLaterais = [
                {
                    icon: 'home',
                    title: 'Início',
                    to: '/',
                },
                {
                    icon: 'chat',
                    title: 'Notificacao',
                    to: '/notificacao',
                },
                {
                    icon: 'info',
                    title: 'Sobre',
                    to: '/sobre',
                },
                {
                    icon: 'chat',
                    title: 'Chat',
                    to: '/chat',
                },
            ];
            if (this.informacoesConta.is_admin === true) {
                menusLaterais.push({
                    icon: 'edit',
                    title: 'Administração',
                    to: '/administracao',
                });
            }

            menusLaterais.push({
                icon: 'exit_to_app',
                title: 'Sair',
                to: '/logout',
            });

            return menusLaterais;
        },
    },

};
</script>
