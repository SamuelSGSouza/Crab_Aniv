function adicionaPontuacao(pontos) {
    console.log("Total de pontos adicionados: " + pontos);
    //mudando a classe plus-button para display block
    $(".plus-button").css("display", "inline-block");
    var pontosRestantes = getCookie("pontosRestantes");
    if (pontosRestantes == "" || pontosRestantes == "undefined" || pontosRestantes == null) {
        setCookie("pontosRestantes", pontos, 365);
        pontosRestantes = getCookie("pontosRestantes");
        console.log("Ressetei os pontos")
    }
    else {
        pontosRestantes = parseInt(pontosRestantes) + pontos;
        setCookie("PontosRestantes", pontosRestantes, 365)
        console.log("Adicionei os pontos")
    }

    //atualizando o text das classes pontos_restantes
    $(".pontos_restantes").text(pontosRestantes);
}
function removePontuacao(pontos) {
    var pontosRestantes = getCookie("pontosRestantes");
    var novospontosRestantes = parseInt(pontosRestantes) - pontos;
    setCookie("pontosRestantes", novospontosRestantes, 365)
    var novoValor = getCookie("pontosRestantes");
    console.log(novoValor);

    if (novospontosRestantes == 0) {
        $(".plus-button").css("display", "none");
    }
    //atualizando o text das classes pontos_restantes
    $(".pontos_restantes").text(novospontosRestantes);
}

function addPontos(atributo){
    var pontos = getCookie("pontos"+atributo);
    if (pontos == "" || pontos == "undefined" || pontos == null){
        pontos = 1;        
    }
    else{
        pontos = parseInt(pontos) + 1;
    }
    if (pontos <= 9){
        pontos = "0"+pontos;
    }
    setCookie("pontos"+atributo, pontos, 365);
    
    removePontuacao(1);
    //pegando os elementos com a classe atributo pontos_ e setando o valor do cookie
    $(".pontos_"+atributo).text(pontos);
}