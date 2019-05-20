import Vue from 'vue';
import Router from 'vue-router';
import Login from './modules/conta/Login.vue';
import Cadastrar from './modules/conta/Cadastrar.vue';
import RecuperarSenha from './modules/conta/RecuperarSenha.vue';
import Chat from './modules/websocket/Chat.vue';
import Administracao from './modules/core/Administracao.vue';
import Home from './modules/core/Home.vue';
import NaoEncontrado from './modules/core/NaoEncontrado.vue';
import Sobre from './modules/core/Sobre.vue';
import Plataforma from './modules/plataforma/Plataforma.vue';
import Sistema from './modules/sistema/Sistema.vue';
import Conta from './modules/conta/Conta.vue';
import Mensagem from './modules/mensagem/Mensagem.vue';
import Notificacao from './modules/notificacao/Notificacao.vue';
import store from './store';
import { obterInformacoesJWT } from './modules/account/_auxiliares/jwt';

Vue.use(Router);

const routesObject = [
    {
        path: '/login',
        component: Login,
        name: 'Login',
    },
    {
        path: '/cadastrar',
        component: Cadastrar,
        name: 'Cadastrar',
    },
    {
        path: '/recuperar',
        component: RecuperarSenha,
        name: 'Recuperar Senha',
    },
    {
        path: '*',
        component: NaoEncontrado,
        name: 'Não Encontrado',
    // redirect: '/'
    },
    {
        path: '/',
        component: Home,
        name: 'Home',
    },
    {
        path: '/chat',
        component: Chat,
        name: 'Chats',
    },
    {
        path: '/notificacao',
        component: Notificacao,
        name: 'Notificações',
    },
    {
        path: '/sobre',
        component: Sobre,
        name: 'Sobre',
    },
    {
        path: '/administracao',
        component: Administracao,
        redirect: '/administracao/plataforma',
        children: [
            {
                path: '/administracao/plataforma',
                component: Plataforma,
                name: 'Administração / Plataformas',
                meta: {
                    title: 'Plataformas',
                },
            },
            {
                path: '/administracao/sistema',
                component: Sistema,
                name: 'Administração / Sistemas',
                meta: {
                    title: 'Sistema',
                },
            },
            {
                path: '/administracao/conta',
                component: Conta,
                name: 'Administração / Contas',
                meta: {
                    title: 'Conta',
                },
            },
            {
                path: '/administracao/mensagem',
                component: Mensagem,
                name: 'Administração / Mensagens',
                meta: {
                    title: 'Mensagem',
                },
            },
        ],
    },
];

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routesObject,
});

export const isEmpty = string => (!string || string.length === 0);

router.beforeEach((to, from, next) => {
    const publicPages = [
        '/login',
        '/cadastrar',
        '/recuperar',
    ];

    const authRequired = !publicPages.includes(to.path);
    const communicationToken = localStorage.getItem('communication_token');
    const tokenValida = !isEmpty(obterInformacoesJWT(communicationToken));

    if (to.path === '/logout') {
        store.dispatch('communicationAlert/info', 'Logout realizado com sucesso.', { root: true });
        return next('/login');
    }


    try {
        if (authRequired && !tokenValida) {
            const error = 'Token Expirada.';
            localStorage.removeItem('token');
            throw error;
        }
        return next();
    } catch (Exception) {
        store.dispatch('communicationAlert/error', `Erro: ${Exception}`, {
            root: true,
        });
        return next('/login');
    }
});

export default router;
