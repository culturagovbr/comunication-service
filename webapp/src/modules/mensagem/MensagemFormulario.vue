<template>
    <v-container grid-list-md>
        <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="save()">
            <v-layout wrap>
                <v-flex
                    xs12
                    sm6
                    md12>
                    <v-text-field
                        v-model="itemEditado.titulo"
                        :rules="[(object) => object!= null && object.length > 3 || 'Campo obrigatório.']"
                        label="Título"
                        box
                        minlength="3"
                        required/>
                    <v-textarea
                        v-model="itemEditado.descricao"
                        :rules="[(object) => object!= null && object.length > 3 || 'Campo obrigatório.']"
                        auto-grow
                        box
                        color="deep-purple"
                        label="Descrição"
                        required
                        rows="5"
                    />
                    <div
                        v-if="itemEditado.mensagem_id == null"
                        style="overflow: auto; max-height: 300px">
                        <h3> Plataformas </h3>
                        <v-list>
                            <v-list-tile
                                v-for="plataforma in plataformas"
                                :key="plataforma.plataforma_id"
                                avatar>
                                <v-list-tile-content>
                                    <v-checkbox
                                        v-model="itemEditado.plataformas"
                                        :label="plataforma.descricao"
                                        :value="plataforma"
                                        color="success"
                                        required/>
                                </v-list-tile-content>

                            </v-list-tile>
                        </v-list>
                    </div>
                    <br>
                    <v-select
                        v-model="itemEditado.sistema_id"
                        :disabled="itemEditado.mensagem_id != null"
                        :items="sistemasRenderizados"
                        :rules="[v => !!v || 'Campo obrigatório']"
                        label="Sistema"
                        box
                        item-text="descricao"
                        item-value="sistema_id"
                        required/>
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
            </v-layout>
            <v-layout class="text-xs-center">
                <v-flex md12>
                    <v-btn
                        color="error"
                        @click.native="close">Fechar</v-btn>
                    <v-btn
                        v-if="!carregando"
                        dark
                        color="blue darken-1"
                        @click.native="save">
                        Gravar
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </v-container>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

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
        valid: true,
        carregando: false,
        plataformasSelecionadas: [],
        sistemasRenderizados: [],
        itemEditado: {},
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
    }),
    computed: {
        ...mapGetters({
            sistemas: 'communicationSistema/sistema',
            contas: 'communicationConta/conta',
            plataformas: 'communicationPlataforma/plataforma',
            informacoesConta: 'communicationAccount/informacoesConta',
        }),
    },
    watch: {
        dialog(val) {
            if (val === true) {
                this.itemEditado = Object.assign({}, this.item);
            }
        },
        // item(val) {
        //     this.itemEditado = Object.assign({}, val);
        // },
        sistemas(value) {
            if ('error' in value) {
                this.sistemasRenderizados = [];
            } else {
                this.sistemasRenderizados = value;
            }
        },
    },
    mounted() {
        this.itemEditado = Object.assign({}, this.defaultItem);
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
            obterContas: 'communicationConta/obterContas',
            obterPlataformas: 'communicationPlataforma/obterPlataformas',
            removerMensagem: 'communicationMensagem/removerMensagem',
            cadastrarMensagem: 'communicationMensagem/cadastrarMensagem',
            atualizarMensagem: 'communicationMensagem/atualizarMensagem',
        }),
        save() {
            const self = this;
            self.carregando = true;

            if (self.itemEditado.mensagem_id !== null) {
                this.atualizarMensagem(self.itemEditado);
            } else {
                this.cadastrarMensagem(self.itemEditado);
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
