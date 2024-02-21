function setCookie(chave, valor, dias ) {
    try {
        localStorage.removeItem(chave);
        localStorage.setItem(chave, JSON.stringify(valor));
        console.log(`Dados salvos com sucesso: chave=${chave}, valor=${JSON.stringify(valor)}`);
    } catch (error) {
        console.error('Erro ao salvar dados no localStorage:', error);
    }
}

function getCookie(chave) {
    try {
        const valor = localStorage.getItem(chave);
        if (valor !== "undefined" && valor !== "null" && valor !== "") {
            return JSON.parse(valor);
        } else {
            console.log(`Nenhum dado encontrado para a chave ${chave}`);
            return null;
        }
    } catch (error) {
        console.error('Erro ao recuperar dados do localStorage:', error);
        return null;
    }
}
