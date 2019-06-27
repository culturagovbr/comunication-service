<template>
    <div>
        <v-scale-transition>
            <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-width="200"
                offset-x>
                <v-btn
                    slot="activator"
                    flat
                    color="indigo"
                    dark
                    icon>
                    <v-badge
                        right
                        color="red">
                        <span
                            v-if="notificacoesBadge != null && notificacoesBadge.length > 0"
                            slot="badge">{{ notificacoesBadge.length }}</span>
                        <v-icon
                            dark
                            color="white darken-1">
                            notifications
                        </v-icon>
                    </v-badge>
                </v-btn>

                <v-card>
                    <v-card-title>
                        Notificações
                    </v-card-title>

                    <v-list
                        v-if="notificacoesBadge != null && notificacoesBadge.length > 0">
                        <template
                            v-for="(minhaNotificacao, indexNotificacao) in notificacoesBadge">
                            <v-list-tile
                                v-if="indexNotificacao < 4 && minhaNotificacao.is_notificacao_lida == false"
                                :key="indexNotificacao"
                                :to="minhaNotificacao">
                                <v-list-tile-content>
                                    <v-list-tile-title>[{{ minhaNotificacao.sistema }}]</v-list-tile-title>
                                    <v-list-tile-sub-title>{{ minhaNotificacao.titulo }}</v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-tooltip bottom>
                                        <v-btn
                                            slot="activator"
                                            flat
                                            icon
                                            @click="exibirItem(minhaNotificacao)"
                                        >
                                            <v-icon>visibility</v-icon>
                                        </v-btn>
                                        <span>Visualizar Notificação</span>
                                    </v-tooltip>
                                </v-list-tile-action>
                            </v-list-tile>
                        </template>
                    </v-list>

                    <v-card-text v-else-if="notificacoesBadge != null && notificacoesBadge.length === 0">
                        Não há novas notificações.
                    </v-card-text>

                    <v-divider/>

                    <v-card-actions v-if="notificacoesBadge != null && notificacoesBadge.length > 0">
                        <v-spacer/>
                        <v-btn
                            color="primary"
                            flat
                            @click="dialog = !dialog">Visualizar todas</v-btn>
                    </v-card-actions>
                </v-card>
            </v-menu>
        </v-scale-transition>
        <v-dialog
            v-model="dialog"
            max-width="800px"
        >
            <v-card>
                <v-card-title light>
                    <span class="headline">Todas Notificações</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-data-table
                            :headers="headersBadge"
                            :items="notificacoesBadge"
                            :search="modeloBuscarBadge"
                            :rows-per-page-items="[ 10, 25, 40 ]"
                            :rows-per-page-text="'Registros por página'"
                            light
                            class="elevation-1">
                            <template
                                slot="items"
                                slot-scope="props">
                                <td class="text-xs-center">{{ props.item.titulo }}</td>
                                <td class="text-xs-center">{{ props.item.descricao }}</td>
                                <td class="text-xs-center">{{ props.item.data_envio | formataData }}</td>
                                <td class="text-xs-center">
                                    <v-icon v-if="props.item.is_notificacao_lida">thumb_up</v-icon>
                                    <v-icon v-if="!props.item.is_notificacao_lida">thumb_down
                                    </v-icon>
                                </td>
                            </template>
                        </v-data-table>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer/>
                    <v-spacer/>
                    <v-btn
                        color="error"
                        @click.native="fecharDialogoSininho">Fechar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogNotificacao">
            <v-card>
                <v-card-text v-if="notificacao">
                    <v-container
                        grid-list-md
                        text-xs-left>
                        <div>
                            <v-layout
                                justify-space-around
                                row
                                wrap>
                                <v-flex
                                    lg12
                                    dark
                                    class="text-xs-left">
                                    <h4>DADOS DA NOTIFICAÇÃO</h4>
                                    <v-divider class="pb-2"/>
                                </v-flex>
                            </v-layout>
                            <v-layout
                                row
                                justify-space-between>
                                <v-flex xs6>
                                    <b>Títutlo</b><br>
                                    <p
                                        v-if="notificacao.titulo"
                                    >
                                        {{ notificacao.titulo }}
                                    </p>
                                    <p v-else>
                                        -
                                    </p>
                                </v-flex>
                                <v-flex
                                    xs6
                                    class="text-xs-center">
                                    <b>Sistema</b>
                                    <p
                                        v-if="notificacao.sistema"
                                        class="text-xs-center"
                                    >
                                        {{ notificacao.sistema }}
                                    </p>
                                    <p v-else>
                                        -
                                    </p>
                                </v-flex>
                            </v-layout>
                            <v-layout
                                row
                                justify-space-between>
                                <v-flex xs6>
                                    <b>Descrição</b>
                                    <p
                                        v-if="notificacao.descricao"
                                        v-html="notificacao.descricao"/>
                                    <p v-else>
                                        -
                                    </p>
                                </v-flex>
                            </v-layout>
                        </div>
                    </v-container>
                </v-card-text>
                <v-divider/>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                        color="red"
                        flat
                        @click="notificacaoLida(notificacao)"
                    >
                        Fechar
                    </v-btn>

                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import WebSocketMixins from '../websocket/_auxiliares/mixins';

export default {
    name: 'NotificacaoBadge',
    mixins: [WebSocketMixins],
    data() {
        return {
            dialog: false,
            dialogNotificacao: false,
            notificacao: {},
            modeloBuscarBadge: '',
            headersBadge: [
                {
                    text: 'Título Mensagem',
                    value: 'titulo',
                    align: 'center',
                },
                {
                    text: 'Descrição Mensagem',
                    value: 'descricao',
                    align: 'center',
                },
                {
                    text: 'Data',
                    value: 'data_envio',
                    align: 'center',
                },
                {
                    text: 'Notificação Lida',
                    value: 'is_notificacao_lida',
                    align: 'center',
                },
            ],
            // temp
            fav: true,
            menu: false,
            message: false,
            hints: true,
            usuario: {
                nome: '',
                email: '',
                sistema: '',
            },
        };
    },
    computed: {
        ...mapGetters({
            notificacoesBadge: 'communicationNotificacao/notificacoesBadge',
        }),
    },
    mounted() {
        if (this.notificacoesBadge == null || this.notificacoesBadge.length === 0) {
            const params = {
                usuarioId: this.informacoesConta.user_id,
                isNotificacaoLida: null,
            };

            this.obterNotificacoes(params);
        }
    },
    methods: {
        ...mapActions({
            obterNotificacoes: 'communicationNotificacao/obterNotificacoes',
            lerNotificacao: 'communicationNotificacao/lerNotificacao',
        }),
        fecharDialogoSininho() {
            const self = this;
            self.dialog = false;
            setTimeout(() => {
                self.itemEditado = Object.assign({}, this.defaultItem);
                self.indiceEditado = -1;
            }, 300);
        },
        exibirItem(item) {
            this.notificacao = item;
            this.dialogNotificacao = true;
            this.lerNotificacao(item);
        },
        notificacaoLida(item) {
            this.lerNotificacao(item);
            this.dialogNotificacao = false;
        },
    },
};
</script>

<style scoped>

</style>
