import { obterInformacoesJWT } from '../../account/_auxiliares/jwt';

export const tratarConexaoWebsocket = ({ store, token }) => {
    const vm = store._vm;
    if (vm.$socket.disconnected === true && token != null) {
        const informacoesToken = obterInformacoesJWT(token);
        if (informacoesToken !== '') {
            vm.$socket.io.opts.query.token = token;
            vm.$socket.open();
        }
    }
};
