import * as jsonwebtoken from 'jsonwebtoken';

export function obterInformacoesJWT(token) {
    try {
        if (process.env.VUE_APP_JWT_SECRET == null) {
            const error = 'Variável de ambiente `VUE_APP_JWT_SECRET` não definida no arquivo `.env`.';
            throw error;
        }

        let finalToken = token;
        if (finalToken == null) {
            finalToken = localStorage.getItem('communication_token');
        }
        return finalToken != null ? jsonwebtoken.verify(finalToken, process.env.VUE_APP_JWT_SECRET) : '';
    } catch (Exception) {
        return '';
        // throw Exception;
    }
}

export function obterCabecalhoComToken(token) {
    let finalToken = token;
    if (finalToken == null) {
        finalToken = localStorage.getItem('communication_token');
    }
    if (finalToken) {
        return {
            headers: {
                Authorization: `Bearer ${finalToken}`,
            },
        };
    }
    return {};
}
