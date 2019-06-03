<template>
    <v-container grid-list-md>
        <v-layout wrap>
            <v-flex
                xs12
                sm6
                md12>
                <v-text-field
                    v-model="itemEditado.descricao"
                    required
                    label="Descrição"/>
            </v-flex>
            <v-flex
                xs12
                sm6
                md12>
                <v-text-field
                    v-model="itemEditado.url"
                    required
                    label="URL"/>
            </v-flex>
            <v-flex
                xs12
                sm6
                md12>
                <h3>Situação</h3>
                <v-switch
                    :label="`${itemEditado.is_ativo ? 'Ativo' : 'Inativo'}`"
                    v-model="itemEditado.is_ativo"/>
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

import { mapActions } from 'vuex';

export default {
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
        carregando: false,
        itemEditado: {},
        defaultItem: {
            sistema_id: null,
            descricao: '',
            url: '',
            is_ativo: true,
        },
    }),

    watch: {
        item(value) {
            this.itemEditado = Object.assign({}, value);
        },
    },

    mounted() {
        this.itemEditado = Object.assign({}, this.defaultItem);
    },

    methods: {

        ...mapActions({
            cadastrarSistema: 'communicationSistema/cadastrarSistema',
            atualizarSistema: 'communicationSistema/atualizarSistema',
        }),

        save() {
            const self = this;
            if (self.itemEditado.is_ativo === null || self.itemEditado.is_ativo === '') {
                self.itemEditado.is_ativo = false;
            }
            if (self.itemEditado.sistema_id !== null) {
                self.atualizarSistema(self.itemEditado);
            } else {
                self.cadastrarSistema(self.itemEditado);
            }
            this.$emit('update:dialog', false);
        },

        close() {
            this.itemEditado = Object.assign({}, this.defaultItem);
            this.$emit('update:dialog', false);
        },
    },
};

</script>
