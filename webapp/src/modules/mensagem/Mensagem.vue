<template>
    <v-content>
        <v-container fluid>
            <v-layout
                column
                justify-center>
                <v-card
                    flat
                    dark>
                    <v-toolbar
                        dark
                        color="primary">
                        <v-spacer/>
                        <v-spacer/>
                        <v-spacer/>
                        <v-text-field
                            v-model="modeloBuscar"
                            append-icon="search"
                            label="Buscar"
                            single-line
                            hide-details
                        />
                    </v-toolbar>
                    <v-card-text>
                        <v-data-table
                            :headers="headers"
                            :items="mensagensRenderizadas"
                            :search="modeloBuscar"
                            :pagination.sync="pagination"
                            :rows-per-page-items="[ 10, 25, 40 ]"
                            :rows-per-page-text="'Registros por página'"
                            light
                            class="elevation-1">
                            <template
                                slot="items"
                                slot-scope="props">
                                <td class="text-xs-center">{{ props.item.mensagem_id }}</td>
                                <td class="text-xs-center">{{ props.item.titulo }}</td>
                                <td class="text-xs-center">{{ props.item.descricao }}</td>
                                <td class="text-xs-center">{{ props.item.created_at | formataData }}</td>
                                <td class="text-xs-center">
                                    {{ props.item.is_ativo ? "Ativo" : "Inativo" }}
                                </td>
                                <td class="justify-center layout px-0">
                                    <v-btn icon>
                                        <v-icon
                                            color="grey darken-1"
                                            @click="editItem(props.item)">search
                                        </v-icon>
                                    </v-btn>
                                    <v-btn icon>
                                        <v-icon
                                            color="grey darken-1"
                                            @click="deleteItem(props.item)">delete
                                        </v-icon>
                                    </v-btn>
                                </td>
                            </template>
                            <template slot="no-data">
                                <v-btn
                                    color="primary"
                                    @click="obterMensagems">Reset</v-btn>
                            </template>
                        </v-data-table>
                        <v-btn
                            fab
                            color="success"
                            dark
                            fixed
                            bottom
                            right
                            @click="dialog = !dialog">
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-layout>
            <v-dialog
                v-model="dialog"
                max-width="500px" >
                <v-card>
                    <v-card-title light>
                        <span class="headline">{{ formTitle }} Mensagem</span>
                    </v-card-title>

                    <v-card-text>
                        <mensagem-formulario
                            :item="itemEditado"
                            :dialog.sync="dialog"
                        />
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-container>
    </v-content>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';
import MensagemFormulario from './MensagemFormulario.vue';

export default {
    components: {
        MensagemFormulario,
    },
    data: () => ({
        dialog: false,
        exibirBotaoGravar: true,
        plataformasSelecionadas: [],
        mensagensRenderizadas: [],
        sistemasRenderizados: [],
        modeloBuscar: '',
        indiceEditado: -1,
        itemEditado: {
            titulo: null,
            autor_id: null,
            created_at: null,
            sistema_id: null,
            descricao: '',
            is_ativo: true,
            plataformas: [],
            mensagem_id: null,
        },
        defaultItem: {
            titulo: null,
            autor_id: null,
            created_at: null,
            sistema_id: null,
            descricao: '',
            is_ativo: true,
            plataformas: [],
            mensagem_id: null,
        },
        pagination: {
            sortBy: 'created_at',
            descending: true,
        },
        headers: [
            {
                text: 'Identificador',
                align: 'center',
                sortable: true,
                value: 'name',
            },
            {
                text: 'Título',
                value: 'titulo',
                align: 'center',
            },
            {
                text: 'Descrição',
                value: 'descricao',
                align: 'center',
            },
            {
                text: 'Data de Criação',
                value: 'created_at',
                align: 'center',
            },
            {
                text: 'Situação',
                value: 'situacao',
                align: 'center',
            },
            {
                text: 'Ação',
                value: 'acao',
                align: 'center',
                sortable: false,
            },
        ],
    }),
    computed: {
        formTitle() {
            return this.indiceEditado === -1 ? 'Criar' : '';
        },
        ...mapGetters({
            mensagens: 'communicationMensagem/mensagens',
            sistemas: 'communicationSistema/sistema',
            contas: 'communicationConta/conta',
            plataformas: 'communicationPlataforma/plataforma',
            informacoesConta: 'communicationAccount/informacoesConta',
        }),
    },
    watch: {
        dialog(value) {
            if (value === false) {
                this.itemEditado = this.defaultItem;
            }
            if (this.itemEditado.autor_id == null && this.informacoesConta.user_id !== null) {
                this.itemEditado.autor_id = this.informacoesConta.user_id;
            }

            this.exibirBotaoGravar = true;
        },
        mensagens(value) {
            if ('error' in value) {
                this.mensagensRenderizadas = [];
            } else {
                this.mensagensRenderizadas = value;
            }
        },
        sistemas(value) {
            if ('error' in value) {
                this.sistemasRenderizados = [];
            } else {
                this.sistemasRenderizados = value;
            }
        },
    },
    mounted() {
        if (this.mensagens.length == null || this.mensagens.length === 0) {
            this.obterMensagems();
        }
        if (this.mensagens.length > 0) {
            this.mensagensRenderizadas = this.mensagens;
        }
        if (this.sistemas.length == null || this.sistemas.length === 0) {
            this.obterSistemas();
        }
        if (this.sistemas.length > 0) {
            this.sistemasRenderizados = this.sistemas;
        }
        if (this.contas.length == null || this.contas.length === 0) {
            this.obterContas();
        }
        if (this.plataformas.length == null || this.plataformas.length === 0) {
            this.obterPlataformas();
        }
    },
    methods: {
        ...mapActions({
            obterSistemas: 'communicationSistema/obterSistemas',
            obterMensagems: 'communicationMensagem/obterMensagems',
            obterContas: 'communicationConta/obterContas',
            obterPlataformas: 'communicationPlataforma/obterPlataformas',
            removerMensagem: 'communicationMensagem/removerMensagem',
            cadastrarMensagem: 'communicationMensagem/cadastrarMensagem',
            atualizarMensagem: 'communicationMensagem/atualizarMensagem',
        }),
        editItem(item) {
            this.indiceEditado = this.mensagens.indexOf(item);
            this.itemEditado = Object.assign({}, item);
            this.dialog = true;
        },
        deleteItem(item) {
            // eslint-disable-next-line
            if (confirm('Deseja remover esse item?')) {
                this.removerMensagem(item.mensagem_id);
            }
        },
        close() {
            this.dialog = false;
            setTimeout(() => {
                this.itemEditado = Object.assign({}, this.defaultItem);
                this.indiceEditado = -1;
            }, 300);
        },

    },
};
</script>
