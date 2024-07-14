//caso a página seja aberta em um dispositivo não-mobile, apaga todo o conteudo da página
function apagaConteudo(){
    if (window.innerWidth > 768){
        document.body.innerHTML = "";
    }
}
apagaConteudo

//contando quantos segundos faltam para às 1 da manhã e atualizando o id "tempo_restante"
function atualizaTempoRestante(){
    //data é dia 31 de agosto de 2024 ás 19h
    var now = new Date();
    var midnight = new Date(2024, 7, 31, 19, 0, 0);
    var seconds = (midnight - now) / 1000;
    var hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    var minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds % 60);

    
    document.getElementById("tempo_restante").innerHTML = hours + "h " + minutes + "m " + seconds + "s";
}

function cria_e_envia_id(){
    //verificando se o cookie systemUser já existe
    if (getCookie("systemUser") != "" && getCookie("systemUser") != "undefined" && getCookie("systemUser") != null){
        return;
    }

    //criando um id para o usuário
    var id = Math.floor(Math.random() * 1000000);
    
    //salnvando o id no cookie
    setCookie("systemUser", id, 365);    

    chamaPopup('popup_new_quest');
}

function realizaQuery(endpoint, id, dataToSend, method) {
    // pegando url da página
    var url = window.location.href;

    // gerando a url final
    url = url.split("/");
    url = url[0] + "//" + url[2] + "/" + endpoint + "/" + id;
     
    // fazendo requisição com o ajax
    var response = "";
    $.ajax({
        url: url,
        data: dataToSend,
        type: method,
        async: false,
        success: function(data){
            response = data;
        }
    });
    return response;
}


function startSystem(){    
    setInterval(atualizaTempoRestante, 1000);
    cria_e_envia_id()
    
}
startSystem();
