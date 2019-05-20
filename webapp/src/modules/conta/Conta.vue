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
                            :items="contasIniciais"
                            :search="modeloBuscar"
                            :rows-per-page-items="[ 10, 25, 40 ]"
                            :rows-per-page-text="'Registros por página'"
                            light
                            class="elevation-1">
                            <template
                                slot="items"
                                slot-scope="props">
                                <td class="text-xs-center">{{ props.item.usuario_id }}</td>
                                <td
                                    class="text-xs-center"
                                    v-html="props.item.nome"/>
                                <td class="text-xs-center">{{ props.item.email }}</td>
                                <td class="text-xs-center">{{ props.item.is_ativo ? "Ativo" : "Inativo" }}</td>
                                <td class="text-xs-center">
                                    <v-icon
                                        v-if="props.item.is_admin"
                                        color="primary">check_circle_outline</v-icon>
                                </td>
                                <td class="justify-center layout px-0">
                                    <v-btn icon>
                                        <v-icon
                                            color="grey darken-1"
                                            @click="editItem(props.item)">edit
                                        </v-icon>
                                    </v-btn>
                                    <v-btn
                                        v-if="informacoesConta.user_id != props.item.usuario_id"
                                        icon>
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
                                    @click="obterContas">Reset</v-btn>
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
                max-width="500px">
                <v-card light>
                    <v-card-title>
                        <span class="headline">{{ formTitle }} Conta</span>
                    </v-card-title>

                    <v-card-text>
                        <conta-formulario
                            :item="itemEditado"
                            :dialog.sync="dialog"
                            :indiceEditado.sync="indiceEditado"/>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-container>
    </v-content>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';
import ContaFormulario from './ContaFormulario.vue';

export default {
    components: { ContaFormulario },
    data: () => ({
        carregando: false,
        dialog: false,
        headers: [
            {
                text: 'Identificador',
                align: 'center',
                sortable: true,
                value: 'name',
            },
            {
                text: 'Nome',
                value: 'nome',
                align: 'center',
            },
            {
                text: 'E-mail',
                value: 'email',
                align: 'center',
            },
            {
                text: 'Situação',
                value: 'situacao',
                align: 'center',
            },
            {
                text: 'Administrador',
                value: 'is_admin',
                align: 'center',
            },
            {
                text: 'Ação',
                value: 'acao',
                align: 'center',
                sortable: false,
            },
        ],
        contasIniciais: [],
        indiceEditado: -1,
        itemEditado: {},
        defaultItem: {
            usuario_id: null,
            descricao: '',
            is_ativo: true,
            is_admin: false,
            sistemas: [],
        },
        modeloBuscar: '',
    }),

    computed: {
        formTitle() {
            return this.indiceEditado === -1 ? 'Criar' : 'Editar';
        },
        ...mapGetters({
            contas: 'communicationConta/conta',
            informacoesConta: 'communicationAccount/informacoesConta',
        }),
    },

    watch: {
        contas(value) {
            if ('error' in value) {
                this.contasIniciais = [];
            } else {
                this.contasIniciais = value;
            }
        },
    },

    created() {
        this.obterContas();
    },
    methods: {

        ...mapActions({
            obterContas: 'communicationConta/obterContas',
            removerConta: 'communicationConta/removerConta',
        }),

        editItem(item) {
            const self = this;
            if (self.informacoesConta.is_admin !== true) {
                self.$store.dispatch('communicationAlert/error', 'Usuário sem privilégios administrativos.', { root: true });
            }
            if (self.informacoesConta.is_admin === true) {
                self.indiceEditado = self.contas.indexOf(item);
                self.itemEditado.sistemas = [];
                self.itemEditado = Object.assign({}, item);
                self.dialog = true;

                if (Object.prototype.hasOwnProperty.call(self.itemEditado, 'sistemas')) {
                    Object.keys(self.itemEditado.sistemas).forEach((indice) => {
                        delete self.itemEditado.sistemas[indice].usuario_has_sistema;
                    });
                }
            }
        },

        deleteItem(item) {
            // eslint-disable-next-line
            if (confirm('Deseja remover esse item?')) {
                if (this.informacoesConta.is_admin !== true) {
                    this.$store.dispatch('communicationAlert/error', 'Usuário sem privilégios administrativos.', { root: true });
                }
                if (this.informacoesConta.is_admin === true) {
                    this.removerConta(item.usuario_id);
                }
            }
        },


    },
};

</script>
