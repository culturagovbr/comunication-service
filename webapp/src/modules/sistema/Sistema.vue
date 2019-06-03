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
                            :items="sistemasRenderizados"
                            :search="modeloBuscar"
                            :rows-per-page-items="[ 10, 25, 40 ]"
                            :rows-per-page-text="'Registros por página'"
                            light
                            class="elevation-1">
                            <template
                                slot="items"
                                slot-scope="props">
                                <td class="text-xs-center">{{ props.item.sistema_id }}</td>
                                <td
                                    class="text-xs-center"
                                    v-html="props.item.descricao"/>
                                <td
                                    class="text-xs-center"
                                    v-html="props.item.url"/>
                                <td class="text-xs-center">{{ props.item.is_ativo ? "Ativo" : "Inativo" }}</td>
                                <td class="justify-center layout px-0">
                                    <v-btn icon>
                                        <v-icon
                                            color="grey darken-1"
                                            @click="editItem(props.item)">edit
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
                                    @click="obterSistemas">Reset</v-btn>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-layout>

            <v-dialog
                v-model="dialog"
                max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }} Sistema</span>
                    </v-card-title>

                    <v-card-text>
                        <sistema-formulario
                            :item="itemEditado"
                            :dialog.sync="dialog"/>
                    </v-card-text>
                </v-card>
                <v-btn
                    slot="activator"
                    color="success"
                    dark
                    fixed
                    bottom
                    right
                    fab>
                    <v-icon>add</v-icon>
                </v-btn>
            </v-dialog>
        </v-container>
    </v-content>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';
import SistemaFormulario from './SistemaFormulario.vue';

export default {
    components: { SistemaFormulario },
    data: () => ({
        carregando: false,
        dialog: false,
        modeloBuscar: '',
        headers: [
            {
                text: 'Identificador',
                align: 'center',
                sortable: true,
                value: 'name',
            },
            {
                text: 'Descrição',
                value: 'descricao',
                align: 'center',
            },
            {
                text: 'Url',
                value: 'url',
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
        sistemasRenderizados: [],
        indiceEditado: -1,
        itemEditado: {
            sistema_id: null,
            descricao: null,
            url: null,
            is_ativo: true,
        },
        defaultItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
    }),

    computed: {
        formTitle() {
            return this.indiceEditado === -1 ? 'Criar' : 'Editar';
        },
        ...mapGetters({
            sistemas: 'communicationSistema/sistema',
        }),
    },

    watch: {
        sistemas(value) {
            if ('error' in value) {
                this.sistemasRenderizados = [];
            } else {
                this.sistemasRenderizados = value;
            }
        },

    },

    created() {
        this.obterSistemas();
    },

    methods: {

        ...mapActions({
            obterSistemas: 'communicationSistema/obterSistemas',
            removerSistema: 'communicationSistema/removerSistema',
            cadastrarSistema: 'communicationSistema/cadastrarSistema',
            atualizarSistema: 'communicationSistema/atualizarSistema',
        }),

        editItem(item) {
            this.indiceEditado = this.sistemas.indexOf(item);
            this.itemEditado = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            // eslint-disable-next-line
            if (confirm('Deseja remover esse item?')) {
                this.removerSistema(item.sistema_id);
            }
        },
    },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
