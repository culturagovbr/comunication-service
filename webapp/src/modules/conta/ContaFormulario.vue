<template>
    <v-form
        ref="form"
        v-model="valid">
        <v-container grid-list-md>
            <v-layout wrap>
                <v-flex
                    xs12
                    sm6
                    md12>
                    <v-text-field
                        v-model="itemEditado.nome"
                        :rules="[rules.required, rules.minLength]"
                        prepend-icon="face"
                        required
                        label="Nome"/>
                    <v-text-field
                        v-model="itemEditado.email"
                        :rules="[rules.required, rules.email, rules.minLength]"
                        prepend-icon="person"
                        required
                        label="E-mail"/>
                    <v-text-field
                            :mask="'###.###.###-##'"
                            v-model="itemEditado.cpf"
                            :rules="[rules.required, rules.minLengthCPF]"
                            prepend-icon="person"
                            required
                            label="CPF"/>
                    <v-text-field
                        v-if="informacoesConta.user_id === itemEditado.user_id || indiceEditado === -1"
                        v-validate="{ required: true, min: 6 }"
                        v-model="itemEditado.password"
                        :rules="[rules.required, rules.minLength]"
                        prepend-icon="lock"
                        type="password"
                        label="Senha"
                        class="form-control"
                        required />
                </v-flex>
                <v-flex
                    xs12
                    sm6
                    md12>
                    <h3>Administração</h3>
                    <v-switch
                        :label="`${itemEditado.is_admin ? 'É Administrador' : 'Não é Administrador'}`"
                        v-model="itemEditado.is_admin"/>
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
                <v-flex
                    xs12
                    sm6
                    md12>
                    <h3> Sistemas </h3>
                    <v-list style="overflow: auto; max-height: 300px">
                        <v-list-tile
                            v-for="sistema in sistemas"
                            :key="sistema.title"
                            avatar>

                            <v-list-tile-content>

                                <v-checkbox
                                    v-model="itemEditado.sistemas"
                                    :label="sistema.descricao"
                                    :value="sistema"
                                    :rules="[rules.required, rules.minLengthCheckBox]"
                                    color="success"
                                    required/>
                            </v-list-tile-content>

                        </v-list-tile>
                    </v-list>
                </v-flex>
                <v-flex class="text-xs-center">
                    <v-btn
                        color="error"
                        dark
                        @click.native="close">Fechar</v-btn>
                    <v-btn
                        v-if="!carregando"
                        :disabled="!valid"
                        dark
                        color="blue darken-1"
                        @click.native="save">Gravar
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-form>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

export default {
    props: {
        item: {
            type: Object,
            default: () => {},
        },
        indiceEditado: {
            type: Number,
            default: 0,
        },
    },
    data: () => ({
        carregando: false,
        valid: true,
        itemEditado: {},
        emailEnviado: '',
        defaultItem: {
            usuario_id: null,
            descricao: '',
            is_ativo: true,
            is_admin: false,
            sistemas: [],
            cpf: '',
        },
        rules: {
            required: value => !!value || 'Campo Obrigatório.',
            minLength: object => (object != null && object.length != null && object.length > 3) || 'Campo obrigatório.',
            minLengthCheckBox: array => (array != null && array.length != null && array.length > 0) || 'Campo obrigatório.',
            email: (value) => {
                // eslint-disable-next-line
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(value) || 'E-mail inválido.';
            },
            minLengthCPF: object => (object != null && object.length != null && object.length === 11) || 'Campo obrigatório.',
        },
    }),

    computed: {
        ...mapGetters({
            sistemas: 'communicationSistema/sistema',
            informacoesConta: 'communicationAccount/informacoesConta',
        }),
    },

    watch: {
        item(value) {
            this.itemEditado = Object.assign({}, value);
        },
    },
    mounted() {
        this.itemEditado = Object.assign({}, this.defaultItem);
        if (this.sistemas.length == null || this.sistemas.length === 0) {
            this.obterSistemas();
        }
    },

    methods: {

        ...mapActions({
            cadastrarConta: 'communicationConta/cadastrarConta',
            obterSistemas: 'communicationSistema/obterSistemas',
            atualizarConta: 'communicationConta/atualizarConta',
        }),

        save() {
            const self = this;
            self.carregando = true;

            if (self.itemEditado.usuario_id !== null) {
                this.atualizarConta(self.itemEditado);
            } else {
                this.cadastrarConta(self.itemEditado);
            }
            self.carregando = false;
            self.close();
        },

        close() {
            this.itemEditado = Object.assign({}, this.defaultItem);
            this.$emit('update:dialog', false);
            this.$emit('update:indiceEditado', -1);
        },
    },
};

</script>
