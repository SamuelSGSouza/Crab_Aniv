

function realizaQuery(url, dataToSend, method){
    //fazendo requisição com o ajax
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
    //verificando se existe um cookie com o nome systemUser
    if (getCookie("userEmail") == "" || getCookie("userEmail") == "undefined" || getCookie("userEmail") == null){
        chamaPopup('popup_start');

        //adicionando listenner no input com id email
        document.getElementById("email").addEventListener("change", function(){
            //pegando o valor do input
            var email = document.getElementById("email").value;
            //verificando se o email é válido
            if (email != ""){
                //realizando a requisição para verificar se o email já está cadastrado
                var response = realizaQuery("https://www.google.com/", {"email": email}, "POST")
                if (response != ""){
                    //TODO: pegar o response e setar o cookie com os dados do jogador
                }
                else{
                    $("#create_personage").css("display", "block");
                    adicionaPontuacao(10);
                    setCookie("userLevel", 1, 365);
                    setCookie("userTitulo", "Nenhum", 365);
                    setCookie("userXP", 0, 365);
                    setCookie("xpProximoNivel", 100, 365);
                }
            }
        });
    } else {
        //pegando os dados do usuário
        $("#userLevel").text(getCookie("userLevel"));
        $("#userName").text(getCookie("userName"));
        $("#userTitulo").text(getCookie("userTitulo"));
        $("#userEmail").text(getCookie("userEmail"));
        $(".pontos_restantes").text(getCookie("pontosRestantes"));
        if (parseInt(getCookie("pontosRestantes")) > 0){
            $(".plus-button").css("display", "inline-block");
        }
        $(".pontos_FOR").text(getCookie("pontosFOR") || "00");
        $(".pontos_INT").text(getCookie("pontosINT") || "00");
        $(".pontos_DES").text(getCookie("pontosDES") || "00");
        $(".pontos_SAB").text(getCookie("pontosSAB") || "00");
        $(".pontos_CON").text(getCookie("pontosCON") || "00");
        $(".pontos_CAR").text(getCookie("pontosCAR") || "00");


        $("#xpUsuario").text(getCookie("userXP") || "0");
        $("#xpProximoNivel").text(getCookie("xpProximoNivel") || "100");


        criaQuest("COLHA PLANTAS", "Vá até a floresta e colha 10 plantas", "Colher 10 plantas", ["50 XP", "+1 SAB" ]);

        //atualizando quests
        atualizaUserQuests();
    }
}
startSystem();