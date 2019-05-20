<template>
    <v-content>
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
                            <v-card-text>
                                <v-form
                                    ref="form"
                                    v-model="valid"
                                    @submit.prevent="submit()">
                                    <v-text-field
                                        v-model="email"
                                        :rules="emailRules"
                                        prepend-icon="person"
                                        label="E-mail"
                                        type="email"
                                        name="email"
                                        required />
                                    <v-text-field
                                        v-model="password"
                                        :rules="passwordRules"
                                        prepend-icon="lock"
                                        type="password"
                                        label="Senha"
                                        name="password"
                                        browser-autocomplete="new-password"
                                        required />

                                    <v-card-actions>
                                        <v-layout
                                            justify-center
                                            column
                                            fill-height>

                                            <div class="text-xs-right btn-link mt-3">
                                                <v-btn
                                                    to="/recuperar"
                                                    flat
                                                    class="caption"
                                                    small
                                                    color="primary">Recuperar senha</v-btn>
                                            </div>

                                            <v-btn
                                                :disabled="!valid"
                                                color="primary"
                                                block
                                                type="submit"> Entrar
                                            </v-btn>
                                            <v-divider class="mt-2 mb-2" />
                                            <v-tooltip
                                                bottom
                                                class="text-xs-center btn btn-link">
                                                <v-btn
                                                    slot="activator"
                                                    flat
                                                    large
                                                    color="warning"
                                                    to="/cadastrar"
                                                >Cadastre-se</v-btn>
                                                <span>Ir para a tela de cadastro</span>
                                            </v-tooltip>


                                        </v-layout>

                                    </v-card-actions>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            email: '',
            emailRules: [
                v => !!v || 'E-mail obrigatório',
                v => /.+@.+/.test(v) || 'E-mail precisa ser válido',
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Senha obrigatória',
            ],
            valid: true,
        };
    },
    computed: {
        ...mapState('communicationAccount', [
            'status',
            'loggingIn',
        ]),
    },
    mounted() {
    // reset login status
        this.logout();
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                const { email, password } = this;
                if (email && password) {
                    this.login({ email, password }).then((response) => {
                        if (response != null && response.data && response.data.data && response.data.data.token) {
                            this.$router.push('/');
                        }
                    });
                }
            }
        },
        clear() {
            this.$refs.form.reset();
        },
        ...mapActions('communicationAccount', [
            'login',
            'logout',
        ]),
    },
};
</script>
