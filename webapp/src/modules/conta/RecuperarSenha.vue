<template>
    <v-container
        fluid
        fill-height>
        <v-layout
            align-center
            justify-center>
            <v-flex
                xs12
                sm8
                md4>
                <v-layout
                    column
                    justify-center>
                    <v-card class="elevation-12">
                        <v-toolbar
                            dark
                            color="primary">
                            <v-toolbar-title>Recuperar Senha</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form
                                ref="form"
                                v-model="valid"
                                @submit.prevent="tratarSubmissao">
                                <v-text-field
                                    v-validate="'required'"
                                    v-model="user.email"
                                    :rules="[rules.obrigatorio, rules.email, rules.tamanhoMinimo]"
                                    prepend-icon="person"
                                    label="E-mail"
                                    class="form-control"
                                    autocomplete="off"
                                    required
                                />
                                <v-text-field
                                        v-model="user.novaSenha"
                                        :append-icon="show1 ? 'visibility' : 'visibility_off'"
                                        :rules="[rules.obrigatorio, rules.tamanhoMinimo]"
                                        :type="show1 ? 'text' : 'password'"
                                        name="input-10-1"
                                        v-validate="{ required: true, min: 6 }"
                                        prepend-icon="lock"
                                        label="Nova Senha"
                                        class="form-control"
                                        autocomplete="off"
                                        required
                                        @click:append="show1 = !show1"
                                />
                                <v-text-field
                                        v-model="user.confirmarSenha"
                                        :append-icon="show2 ? 'visibility' : 'visibility_off'"
                                        :rules="[rules.obrigatorio, rules.tamanhoMinimo]"
                                        :type="show2 ? 'text' : 'password'"
                                        name="input-10-2"
                                        v-validate="{ required: true, min: 6 }"
                                        prepend-icon="redo"
                                        label="Confirmar Senha"
                                        class="form-control"
                                        autocomplete="off"
                                        required
                                        @click:append="show2 = !show2"
                                />
                                <v-card-actions>
                                    <v-spacer/>
                                    <router-link
                                        to="/login"
                                        class="btn btn-link">Cancelar</router-link>
                                    <v-spacer/>
                                    <v-btn
                                        v-if="user.novaSenha === user.confirmarSenha && valid === true"
                                        :disabled="!valid"
                                        color="primary"
                                        type="submit"
                                        to="/login"
                                        @click.native="alterarSenha">Recuperar
                                    </v-btn>
                                    <img v-show="status.registrando">
                                </v-card-actions>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            show1: false,
            show2: false,
            password: 'Confirmar Senha',
            user: {
                email: '',
                novaSenha: '',
                confirmarSenha: '',
            },
            rules: {
                obrigatorio: value => !!value || 'Campo obrigatório.',
                tamanhoMinimo: object => object.length > 5 || 'Campo obrigatório.',
                email: (value) => {
                    // eslint-disable-next-line
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || 'E-mail precisa ser válido.';
                },

            },
            valid: true,
        };
    },
    computed: {
        ...mapState('communicationAccount', ['status']),
    },
    methods: {
        ...mapActions({
            registrar: 'communicationAccount/registrar',
            obterContas: 'communicationConta/obterContas',
            recuperarSenha: 'communicationSistema/recuperarSenha',
        }),
        tratarSubmissao() {
            if (this.$refs.form.validate()) {
                this.obterContas();
            }
        },
        alterarSenha() {
            const params = {
                email: this.user.email,
                password: this.user.novaSenha,
            };

            this.recuperarSenha(params);
        },
    },
};
</script>
