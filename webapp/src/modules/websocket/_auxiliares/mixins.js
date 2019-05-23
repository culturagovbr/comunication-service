import { mapGetters, mapActions } from 'vuex';
import { tratarConexaoWebsocket } from './tratar-conexao-websocket';

export default {

    props: {
        communicationToken: {
            type: String,
            default: localStorage.getItem('communication_token'),
        },
        nome: {
            type: String,
            default: '',
        },
        email: {
            type: String,
            default: '',
        },
        cpf: {
            type: String,
            default: '',
        },
        sistema: {
            type: String,
            default: '',
        },
    },
    computed: {
        ...mapGetters({
            informacoesConta: 'communicationAccount/informacoesConta',
            tokenJWT: 'communicationAccount/token',
        }),
    },
    watch: {
        communicationToken(valor) {
            localStorage.setItem('communication_token', valor);
        },
    },
    mounted() {
        if (this.informacoesConta == null || this.informacoesConta.email == null) {
            this.definirInformacoesConta(this.communicationToken);
        }

        if (!this.tokenJWT && !this._.isEmpty([
            this.cpf,
            this.email,
            this.nome,
            this.sistema,
        ])) {
            this.login({
                cpf: this.cpf,
                email: this.email,
                nome: this.nome,
                sistema: this.sistema,
                password: 12345,
            }).then((response) => {
                console.log(response);
            });
        }

        let token = localStorage.getItem('communication_token');
        if(this._.isEmpty(token)) {
            token = this.tokenJWT;
        }
        tratarConexaoWebsocket({
            store: this.$store,
            token,
        });
    },
    methods: {
        ...mapActions({
            definirInformacoesConta: 'communicationAccount/definirInformacoesConta',
            login: 'communicationAccount/login',
        }),
    },
};
