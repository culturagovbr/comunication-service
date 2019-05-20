import { mapGetters, mapActions } from 'vuex';
import { tratarConexaoWebsocket } from './tratar-conexao-websocket';

export default {

    props: {
        communicationToken: {
            type: String,
            default: localStorage.getItem('communication_token'),
        },
        // nome: {
        //     type: String,
        //     default: '',
        // },
        // email: {
        //     type: String,
        //     default: localStorage.getItem('communication_token'),
        // },
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
        const token = localStorage.getItem('communication_token');
        tratarConexaoWebsocket({
            store: this.$store,
            token,
        });
    },
    methods: {
        ...mapActions({
            definirInformacoesConta: 'communicationAccount/definirInformacoesConta',
        }),
    },
};
