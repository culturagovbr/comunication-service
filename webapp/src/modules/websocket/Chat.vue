<template>
    <v-content>
        <v-container
            fluid>
            <v-layout
                align-space-around
                column>

                <v-card
                    class="mx-auto"
                    light>

                    <v-toolbar
                        style="background: linear-gradient(70deg, #006064, #4DD0E1)"
                        dark
                        prominent
                        color="primary">
                        <v-btn
                            v-if="numeroJanela === 2"
                            :disabled="numeroJanela === 1"
                            icon>
                            <v-icon
                                @click="numeroJanela--">arrow_back
                            </v-icon>
                        </v-btn>
                        <v-toolbar-title>
                            {{ (nomeSalaAtual) ? `Sala ${nomeSalaAtual}` : 'Selecione um sistema' }}

                        </v-toolbar-title>

                        <v-spacer/>

                        <v-scale-transition>
                            <v-tooltip
                                bottom>
                                <v-badge
                                    v-if="numeroJanela === 2
                                        && typeof salas[indiceSalaAtual] != 'undefined'
                                    && typeof salas[indiceSalaAtual].membros != 'undefined'"
                                    slot="activator"
                                    right
                                    color="red">
                                    <span slot="badge">{{ salas[indiceSalaAtual].membros.length }}</span>
                                    <v-icon
                                        color="glue lighten-1"
                                        large>
                                        account_circle
                                    </v-icon>
                                </v-badge>
                                <template
                                    v-if="numeroJanela === 2 && typeof salas[indiceSalaAtual] != 'undefined'">
                                    <h3>Membros da Sala:</h3>
                                    <div
                                        v-for="(membro) in salas[indiceSalaAtual].membros"
                                        :key="membro.email">
                                        <div>{{ membro.nome }} [{{ membro.email }}]</div>
                                    </div>
                                </template>
                            </v-tooltip>
                        </v-scale-transition>
                    </v-toolbar>
                    <v-card-text style="height:calc(100vh - 300px); overflow-y: auto">
                        <v-window v-model="numeroJanela">
                            <v-window-item :value="1">
                                <v-card-text>
                                    <v-select
                                        v-model="sistema"
                                        :items="sistemas"
                                        :return-object="true"
                                        item-text="descricao"
                                        label="Sistemas"
                                        light
                                        solo />
                                </v-card-text>
                            </v-window-item>

                            <v-window-item :value="2">
                                <v-card-text>
                                    <v-list
                                        v-if="salas.length > 0 && indiceSalaAtual != null"
                                        subheader>
                                        <template
                                            v-for="(chat) in salas[indiceSalaAtual].mensagens">

                                            <v-list-tile
                                                :key="chat.mensagem"
                                                avatar>
                                                <v-list-tile-content>
                                                    <v-list-tile-title v-html="obterTituloMensagem(chat)"/>
                                                    <v-list-tile-sub-title v-html="obterTextoMensagem(chat)"/>

                                                </v-list-tile-content>
                                            </v-list-tile>
                                            <v-divider
                                                :key="chat.mensagem"
                                            />
                                        </template>
                                    </v-list>
                                </v-card-text>
                            </v-window-item>
                        </v-window>
                    </v-card-text>

                    <v-divider/>

                    <v-card-actions>

                        <v-spacer />
                        <v-btn
                            v-if="numeroJanela === 1"
                            color="primary"
                            depressed
                            right
                            @click="entrarEmSala">
                            Entrar
                        </v-btn>
                        <div
                            v-if="numeroJanela === 2">
                            <v-form @submit="enviarMensagem">
                                <v-container
                                    grid-list-md
                                    text-xs-center>
                                    <v-layout
                                        text-xs-center
                                        row>
                                        <v-flex xs9>

                                            <v-text-field
                                                ref="mensagem"
                                                v-model="mensagem"
                                                solo
                                                label="mensagem"
                                                light
                                                style="height: 45px;"
                                                required/>
                                        </v-flex>

                                        <v-flex xs3>
                                            <v-btn
                                                :loading="isEnviando"
                                                :disabled="isEnviando"
                                                light
                                                color="primary"
                                                round
                                                @click="enviarMensagem">
                                                Enviar
                                            </v-btn>

                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-form>
                        </div>

                    </v-card-actions>
                </v-card>
            </v-layout>

        </v-container>


    </v-content>


</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import WebSocketMixins from './_auxiliares/mixins';

export default {
    name: 'Chat',
    mixins: [WebSocketMixins],

    data() {
        return {
            isEnviando: false,
            sistema: {},
            mensagem: '',
            sistemas: [],

            numeroJanela: 1,
        };
    },

    computed: {
        ...mapGetters({
            nomeSalaAtual: 'communicationWebsocket/nomeSalaAtual',
            salas: 'communicationWebsocket/salas',
            indiceSalaAtual: 'communicationWebsocket/indiceSalaAtual',
        }),

        hasMembrosNaSalaAtual() {
            if (this.indiceSalaAtual == null) {
                return false;
            }

            if (typeof this.salas[this.indiceSalaAtual] === 'undefined') {
                return false;
            }

            const membrosSalaAtual = this.salas[this.indiceSalaAtual].membros;
            if (typeof membrosSalaAtual === 'undefined') {
                return false;
            }
            return membrosSalaAtual.length > 0;
        },
    },
    mounted() {
        this.sistemas = this.informacoesConta.sistemas;
    },
    methods: {
        ...mapActions({
            entrarEmSalaWebsocket: 'communicationWebsocket/Socket_serverEntrarEmSala',
            mensagemSalaWebsocket: 'communicationWebsocket/Socket_serverMensagemSala',
            definirNomeSalaAtual: 'communicationWebsocket/definirNomeSalaAtual',
        }),

        entrarEmSala() {
            const self = this;

            this.entrarEmSalaWebsocket({
                sala: self.sistema.sistema_id,
            });
            this.definirNomeSalaAtual({
                nomeSalaAtual: self.sistema.descricao,
            });
            self.numeroJanela += self.numeroJanela;
        },
        enviarMensagem(evento) {
            const self = this;

            this.mensagemSalaWebsocket({
                sala: self.sistema.sistema_id,
                mensagem: self.mensagem,
            });
            self.isEnviando = true;
            setTimeout(() => {
                self.isEnviando = false;
                this.$refs.mensagem.reset();
            }, 400);
            evento.preventDefault();
        },

        obterTituloMensagem(chat) {
            return `${chat.usuario.name}`;
        },
        obterTextoMensagem(chat) {
            const horarioFormatado = this.$options.filters.formataData(chat.horario);
            return `[${horarioFormatado}] ${chat.mensagem}`;
        },

    },

};
</script>

<style scoped>

</style>
