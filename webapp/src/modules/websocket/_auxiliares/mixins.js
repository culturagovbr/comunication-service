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
        let token = localStorage.getItem('communication_token');
        if (!token && !this._.isEmpty([
            this.cpf,
            this.email,
            this.nome,
            this.sistema,
        ])) {
            token = this.login({
                cpf: this.cpf,
                email: this.email,
                nome: this.nome,
                sistema: this.sistema,
            });
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
