<template>

    <v-container grid-list-md>
        <v-layout wrap>
            <v-flex
                xs12
                sm6
                md12>
                <v-textarea
                    v-model="itemEditado.codigo_destinatario"
                    :rules="[(object) => object != null && object.length != null && object.length > 3 || 'Campo obrigatório.']"
                    label="Código Destinatário"
                    auto-grow
                    box
                    color="deep-purple"
                    required
                    rows="5"/>

                <v-select
                    v-model="itemEditado.mensagem_id"
                    :disabled="itemEditado.notificacao_id != null"
                    :items="mensagensRenderizadas"
                    :rules="[v => !!v || 'Campo obrigatório']"
                    label="Mensagem"
                    box
                    item-text="descricao"
                    item-value="mensagem_id"
                    required/>

            </v-flex>
            <v-flex class="text-xs-center">
                <v-btn
                    color="error"
                    dark
                    @click.native="close">Fechar</v-btn>
                <v-btn
                    v-if="!carregando"
                    dark
                    color="blue darken-1"
                    @click.native="save">Gravar
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';
import { notificacaoService } from './service';

export default {
    mixins: [notificacaoService],
    props: {
        item: {
            type: Object,
            default: () => {
            },
        },
        dialog: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    data: () => ({
        mensagensRenderizadas: [],
        mensagensComVinculo: [],
        carregando: false,
        itemEditado: {},
        defaultItem: {
            notificacao_id: null,
            autor_id: null,
            mensagem_id: null,
            mensagem: null,
            descricao: '',
            is_ativo: true,
            notificacaos: [],
        },
        websocket: {
            connection: null,
        },
    }),
    computed: {
        ...mapGetters({
            mensagens: 'communicationMensagem/mensagens',
            informacoesConta: 'communicationAccount/informacoesConta',
        }),
    },
    watch: {
        item(value) {
            this.itemEditado = Object.assign({}, value);
        },
        mensagens(value) {
            if ('error' in value) {
                this.mensagensRenderizadas = [];
            } else {
                this.mensagensRenderizadas = this.filtrarMensagensVinculadas(value);
            }
        },
    },
    mounted() {
        this.websocket.connection = new WebSocket(`ws://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}`);

        this.websocket.connection.onopen = () => {
            console.log('Conexão estabelecida');
        };

        this.itemEditado = Object.assign({}, this.defaultItem);
        if (this.mensagens.length > 0) {
            this.mensagensRenderizadas = this.filtrarMensagensVinculadas(this.mensagens);
        }
        if (this.mensagens.length == null || this.mensagens.length === 0) {
            this.obterMensagems();
        }
    },
    methods: {

        ...mapActions({
            cadastrarNotificacao: 'communicationNotificacao/cadastrarNotificacao',
            atualizarNotificacao: 'communicationNotificacao/atualizarNotificacao',
            obterMensagems: 'communicationMensagem/obterMensagems',
        }),

        save() {
            const self = this;
            self.carregando = true;

            if (self.itemEditado.notificacao_id !== null) {
                this.atualizarNotificacao(self.itemEditado);
            } else {
                this.cadastrarNotificacao(self.itemEditado);
                this.enviarNotificacao(self.itemEditado);
            }
            this.$emit('update:dialog', false);
        },

        enviarNotificacao(itemEditado) {
            let objetoMensagem = {};
            Object.keys(this.mensagensRenderizadas).forEach((indice) => {
                if (this.mensagensRenderizadas[indice].mensagem_id === itemEditado.mensagem_id) {
                    objetoMensagem = this.mensagensRenderizadas[indice];
                }
            });

            if (Object.keys(objetoMensagem).length > 0) {
                const objetoNotificacao = {
                    sistema: itemEditado.sistema_id,
                    codigo_destinatario: itemEditado.codigo_destinatario,
                    mensagem: objetoMensagem,
                    data_envio: itemEditado.data_envio,
                };
                this.enviarMensagem(JSON.stringify(objetoNotificacao));
            }
        },

        close() {
            this.itemEditado = Object.assign({}, this.defaultItem);
            this.$emit('update:dialog', false);
        },

        enviarMensagem(message) {
            const self = this;
            self.carregando = true;
            setTimeout(() => {
                self.carregando = false;
            }, 1000);

            this.websocket.connection.send(message);
        },
    },
};

</script>
