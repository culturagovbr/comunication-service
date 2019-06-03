 <template>
    <v-content>
        <v-container fluid>
            <v-layout
                column
                justify-center>
                <v-card flat>
                    <v-toolbar
                        dark
                        color="primary">
                        <v-dialog
                            v-model="dialog"
                            max-width="500px">
                            <v-card>
                                <v-card-title light>
                                    <span class="headline">{{ formTitle }} Notificação</span>
                                </v-card-title>
                                <v-card-text>
                                    <notificacao-formulario
                                        :item="itemEditado"
                                        :dialog.sync="dialog"/>
                                </v-card-text>

                            </v-card>

                        </v-dialog>
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
                            :items="notificacoesRenderizadas"
                            :search="modeloBuscar"
                            :pagination.sync="pagination"
                            :rows-per-page-items="[ 10, 25, 40 ]"
                            :rows-per-page-text="'Registros por página'"
                            :no-data-text="'Não Há Notificações.'"
                            light
                            class="elevation-1">
                            <template
                                slot="items"
                                slot-scope="props">
                                <td class="text-xs-center">{{ props.item.notificacao_id }}</td>
                                <td class="text-xs-center">{{ props.item.codigo_destinatario }}</td>
                                <td class="text-xs-center">{{ props.item.titulo }}</td>
                                <td class="text-xs-center">{{ props.item.sistema }}</td>
                                <td class="text-xs-center">{{ props.item.data_envio | formataData }}</td>
                                <td class="text-xs-center">
                                    <v-scroll-y-transition >
                                        <v-icon
                                            v-show="props.item.is_notificacao_lida"
                                            color="blue">thumb_up</v-icon>
                                    </v-scroll-y-transition>
                                    <v-scroll-y-transition :origin="'bottom center 0'">
                                        <v-icon
                                            v-show="!props.item.is_notificacao_lida"
                                            color="red">thumb_down</v-icon>
                                    </v-scroll-y-transition>
                                </td>
                                <td
                                    v-if="informacoesConta.is_admin"
                                    class="justify-center layout px-0">
                                    <v-btn icon>
                                        <v-icon
                                            color="grey darken-1"
                                            @click="deleteItem(props.item)">delete
                                        </v-icon>
                                    </v-btn>
                                </td>
                                <td
                                    v-else
                                    class="justify-center layout px-0 pt-3"> -
                                </td>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-layout>
            <v-scale-transition v-if="informacoesConta.is_admin">
                <v-btn
                    v-show="!carregando"
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
        </v-container>
    </v-content>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';
import NotificacaoFormulario from './NotificacaoFormulario.vue';
import { notificacaoService } from './service';

export default {
    components: { NotificacaoFormulario },
    mixins: [notificacaoService],
    data: () => ({
        carregando: false,
        dialog: false,
        notificacaoLida: true,
        exibirBotaoGravar: true,
        modeloBuscar: '',
        pagination: {
            sortBy: 'data_envio',
            descending: true,
        },
        headers: [
            {
                text: 'Identificador',
                align: 'center',
                sortable: true,
                value: 'notificacao_id',
            },
            {
                text: 'Código Destinatário',
                value: 'codigo_destinatario',
                align: 'center',
            },
            {
                text: 'Mensagem',
                value: 'titulo',
                align: 'center',
            },
            {
                text: 'Sistema',
                value: 'sistema',
                align: 'center',
            },
            {
                text: 'Data de envio',
                value: 'data_envio',
                align: 'center',
            },
            {
                text: 'Notificação Lida',
                value: 'is_notificacao_lida',
                align: 'center',
            },
            {
                text: 'Ação',
                value: 'acao',
                align: 'center',
                sortable: false,
            },
        ],
        notificacoesRenderizadas: [],
        itemEditado: {},
        defaultItem: {
            notificacao_id: null,
            autor_id: null,
            mensagem_id: null,
            mensagem: null,
            descricao: '',
            is_ativo: true,
            plataformas: [],
        },
    }),
    computed: {
        formTitle() {
            return this.itemEditado.notificacao_id === null ? 'Criar' : 'Editar';
        },
        ...mapGetters({
            notificacoes: 'communicationNotificacao/notificacoes',
            contas: 'communicationConta/conta',
            plataformas: 'communicationPlataforma/plataforma',
            informacoesConta: 'communicationAccount/informacoesConta',
        }),
    },
    watch: {
        dialog() {
            if (this.itemEditado.autor_id == null) {
                this.itemEditado.autor_id = this.informacoesConta.user_id;
            }
            this.exibirBotaoGravar = true;
            if (this.itemEditado.notificacao_id != null) {
                this.exibirBotaoGravar = false;
            }
        },
        notificacoes(value) {
            if ('error' in value) {
                this.notificacoesRenderizadas = [];
            } else {
                this.notificacoesRenderizadas = value;
            }
            if (this.dialog === false) {
                const params = {
                    usuarioId: this.informacoesConta.user_id,
                    isNotificacaoLida: this.notificacaoLida,
                };
                this.obterNotificacoes(params);
            }
        },
        itemEditado() {
            if (this.itemEditado.autor_id == null) {
                this.itemEditado.autor_id = this.informacoesConta.user_id;
            }
        },
    },
    mounted() {
        this.itemEditado = Object.assign({}, this.defaultItem);
        if (this.notificacoes == null || this.notificacoes.length === 0) {
            const params = {
                usuarioId: this.informacoesConta.user_id,
                isNotificacaoLida: this.notificacaoLida,
            };
            this.obterNotificacoes(params);
        }
        if (this.notificacoes.length > 0) {
            this.notificacoesRenderizadas = this.notificacoes;
        }

        if (this.contas == null || this.contas.length === 0) {
            this.obterContas();
        }
        if (this.plataformas == null || this.plataformas.length === 0) {
            this.obterPlataformas();
        }
    },
    methods: {
        ...mapActions({
            obterNotificacoes: 'communicationNotificacao/obterNotificacoes',
            obterContas: 'communicationConta/obterContas',
            obterPlataformas: 'communicationPlataforma/obterPlataformas',
            removerNotificacao: 'communicationNotificacao/removerNotificacao',
        }),
        newItem() {
            this.itemEditado = Object.assign({}, this.defaultItem);
            this.dialog = true;
        },
        editItem(item) {
            this.itemEditado = Object.assign({}, item);
            this.dialog = true;
        },
        deleteItem(item) {
            // eslint-disable-next-line
            if (!confirm('Deseja remover esse item?')) {
                return false;
            }
            if (this.informacoesConta.is_admin !== true) {
                this.$store.dispatch('communicationAlert/error', 'Usuário sem privilégios administrativos.', { root: true });
                return false;
            }
            return this.removerNotificacao(item.notificacao_id);
        },
    },
};

</script>
