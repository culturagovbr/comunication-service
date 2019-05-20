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
                                    v-model="formularioValido"
                                    @submit.prevent="tratarSubmissao">
                                    <v-text-field
                                        v-validate="'required'"
                                        v-model="user.nome"
                                        :rules="[rules.required, rules.minLength]"
                                        prepend-icon="face"
                                        label="Nome"
                                        class="form-control"
                                        required
                                    />
                                    <v-text-field
                                        v-validate="'required'"
                                        :mask="'###.###.###-##'"
                                        v-model="user.cpf"
                                        :rules="[rules.required, rules.minLengthCPF]"
                                        prepend-icon="person"
                                        label="CPF"
                                        class="form-control"
                                        required
                                    />
                                    <v-text-field
                                        v-validate="'required'"
                                        v-model="user.email"
                                        :rules="[rules.required, rules.email, rules.minLength]"
                                        prepend-icon="email"
                                        label="E-mail"
                                        class="form-control"
                                        required
                                    />
                                    <v-text-field
                                        v-validate="{ required: true, min: 6 }"
                                        v-model="user.password"
                                        :rules="[rules.required, rules.minLength]"
                                        prepend-icon="lock"
                                        type="password"
                                        label="Senha"
                                        class="form-control"
                                        required
                                    />
                                    <v-flex
                                        xs12
                                        sm6
                                        md12>
                                        <h3> Sistemas </h3>
                                        <v-list style="overflow: auto; max-height: 250px">
                                            <v-list-tile
                                                v-for="sistema in sistemas"
                                                :key="sistema.sistema_id"
                                                avatar>

                                                <v-list-tile-content>

                                                    <v-checkbox
                                                        v-model="user.sistemas"
                                                        :label="sistema.descricao"
                                                        :value="sistema"
                                                        :rules="[rules.required, rules.minLengthCheckBox]"
                                                        color="success"
                                                        required/>
                                                </v-list-tile-content>

                                            </v-list-tile>
                                        </v-list>
                                    </v-flex>
                                    <v-card-actions>
                                        <v-spacer/>
                                        <router-link
                                            to="/login"
                                            class="btn btn-link">Cancel</router-link>
                                        <v-spacer/>
                                        <v-btn
                                            :disabled="!formularioValido"
                                            color="primary"
                                            type="submit"
                                            @click.native="tratarSubmissao"> Cadastrar
                                        </v-btn>
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
import { mapState, mapActions, mapGetters } from 'vuex';
import { TheMask } from 'vue-the-mask';

export default {
    components: { TheMask },
    data() {
        return {
            user: {
                nome: '',
                cpf: '',
                email: '',
                password: '',
                sistemas: [],
                formularioValido: true,
            },
            rules: {
                required: value => !!value || 'Campo obrigatório.',
                minLength: object => object.length > 5 || 'Campo obrigatório.',
                minLengthCPF: object => object.length === 11 || 'Campo obrigatório.',
                email: (value) => {
                    // eslint-disable-next-line
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || 'E-mail obrigatório.';
                },
            },
        };
    },
    computed: {
        ...mapState('communicationAccount', ['status']),
        ...mapGetters({
            sistemas: 'communicationSistema/sistema',
        }),
    },
    mounted() {
        if (this.sistemas.length == null || this.sistemas.length === 0) {
            this.obterSistemas();
        }
    },
    methods: {
        ...mapActions({
            registrar: 'communicationAccount/registrar',
            enviarEmail: 'communicationConta/enviarEmail',
            obterSistemas: 'communicationSistema/obterSistemas',
        }),
        tratarSubmissao() {
            if (this.$refs.form.validate() && this.user.sistemas.length > 0) {
                this.registrar(this.user).then(() => {
                    this.$router.push('/login');
                });
                this.enviarEmail(this.user);
            }
        },
    },
};
</script>
