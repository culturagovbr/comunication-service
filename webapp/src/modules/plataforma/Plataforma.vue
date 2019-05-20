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
                            :items="plataformasIniciais"
                            :search="modeloBuscar"
                            :rows-per-page-items="[ 10, 25, 40 ]"
                            :rows-per-page-text="'Registros por página'"
                            light
                            class="elevation-1">
                            <template
                                slot="items"
                                slot-scope="props">
                                <td class="text-xs-center">{{ props.item.plataforma_id }}</td>
                                <td class="text-xs-center">{{ props.item.descricao }}</td>
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
                                    @click="obterPlataformas">Reset</v-btn>
                            </template>
                        </v-data-table>
                        <v-scale-transition>
                            <v-btn
                                fab
                                color="success"
                                dark
                                fixed
                                bottom
                                right
                                @click="newItem()">
                                <v-icon>add</v-icon>
                            </v-btn>
                        </v-scale-transition>
                    </v-card-text>
                </v-card>
            </v-layout>
            <v-dialog
                v-model="dialog"
                max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }} Plataforma</span>
                    </v-card-title>

                    <v-card-text>
                        <plataforma-formulario
                            :item="itemEditado"
                            :dialog.sync="dialog"/>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-container>
    </v-content>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';
import PlataformaFormulario from './PlataformaFormulario.vue';

export default {
    components: { PlataformaFormulario },
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
        plataformasIniciais: [],
        itemEditado: {
            plataforma_id: null,
            descricao: '',
            is_ativo: true,
        },
    }),

    computed: {
        formTitle() {
            return this.itemEditado.plataforma_id === null ? 'Criar' : 'Editar';
        },
        ...mapGetters({
            plataformas: 'communicationPlataforma/plataforma',
        }),
    },

    watch: {
        plataformas(value) {
            if ('error' in value) {
                this.plataformasIniciais = [];
            } else {
                this.plataformasIniciais = value;
            }
        },

    },

    created() {
        this.obterPlataformas();
    },

    methods: {

        ...mapActions({
            obterPlataformas: 'communicationPlataforma/obterPlataformas',
            removerPlataforma: 'communicationPlataforma/removerPlataforma',
        }),

        newItem() {
            this.itemEditado = Object.assign({}, {
                plataforma_id: null,
                descricao: '',
                is_ativo: true,
            });
            this.dialog = true;
        },

        editItem(item) {
            this.indiceEditado = this.plataformas.indexOf(item);
            this.itemEditado = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            // eslint-disable-next-lineif (confirm('Deseja remover esse item?')) {
            this.removerPlataforma(item.plataforma_id);
        },
    },

    close() {
        this.dialog = false;
        setTimeout(() => {
            this.itemEditado = Object.assign({}, this.defaultItem);
            this.indiceEditado = -1;
        }, 300);
    },
};

</script>
