function adicionaQuests(titulo, historia,objetivo, recompensas) {
    //se uma das variáveis for vazia ou null, retorna
    if (titulo == "" || titulo == "undefined" || titulo == null || historia == "" || historia == "undefined" || historia == null || objetivo == "" || objetivo == "undefined" || objetivo == null || recompensas == "" || recompensas == "undefined" || recompensas == null){
        return;
    }
    var questsAdicionadas = getCookie("questsAdicionadas");
    if (questsAdicionadas == "" || questsAdicionadas == "undefined" || questsAdicionadas == null){
        var quests = "[]";
        setCookie("questsAdicionadas", quests, 365);
        questsAdicionadas = quests;
    }
    var quests = JSON.parse(questsAdicionadas);
    
    //pegando o dict de quests
    var quest = {
        "titulo": titulo,
        "historia": historia,
        "objetivo": objetivo,
        "recompensas": recompensas
    }
    quests.push(quest);
    setCookie("questsAdicionadas", JSON.stringify(quests), 365);
}

function criaQuest(titulo, historia,objetivo, recompensas) {
    $(".nova_missao_alert").css("display", "block");
    $("#titulo_missao").text(titulo);
    $("#historia_missao").text(historia);
    $("#objetivo_missao").text(objetivo);

    //excluindo tudo com classe recompensa_missao
    $(".recompensa_missao").remove();

    //adicionando recompensas
    for (var i = 0; i < recompensas.length; i++) {
        //criando um p com classe "recompensa_missao" e text = recompensa
        var p = document.createElement("p");
        p.className = "recompensa_missao";
        p.textContent = recompensas[i];
        //adicionando p ao div de recompensas
        $("#recompensas_wrap").append(p);
    }

}

function atualizaUserQuests(){
    var questsAdicionadas = getCookie("questsAdicionadas");
    var quests = JSON.parse(questsAdicionadas);
    //excluindo tudo com classe userQuest
    $(".userQuest").remove();

    `
    <div class="userQuest">
        <p class="mt-2">COLHA PLANTAS</p>
        <div class="hr-quest"></div>
        <p>Vá até a floresta e colha 10 plantas</p>
        <p class="mt-2">RECOMPENSAS:</p>
        <p>100 XP</p>
        <p>+1 SAB</p>
        <p>+1 INT</p>
        <p>TÍTULO: Aprensentador de Flores</p> 
        
        <!-- botões de concluir e desistir -->
        <div>
            <button class="btn-concluir" onclick="concluirQuest(0)">Concluir</button>
            <button class="btn-desistir" onclick="desistirQuest(0)">Desistir</button>
        </div>
    </div>
    `
    console.log(quests);
    for (var i = 0; i < quests.length; i++) {
        var quest = quests[i];
        //criando div com classe userQuest
        var div = document.createElement("div");
        div.className = "userQuest";
        //criando p com titulo da quest
        var p = document.createElement("p");
        p.className = "mt-2";
        p.textContent = quest.titulo;
        //adicionando p a div
        div.appendChild(p);
        //criando hr
        var hr = document.createElement("div");
        hr.className = "hr-quest";
        //adicionando hr a div
        div.appendChild(hr);
        //criando p com historia da quest
        var p = document.createElement("p");
        p.textContent = quest.historia;
        //adicionando p a div
        div.appendChild(p);
        //criando p com recompensas
        var p = document.createElement("p");
        p.className = "mt-2";
        p.textContent = "RECOMPENSAS:";
        //adicionando p a div
        div.appendChild(p);
        //adicionando recompensas
        for (var j = 0; j < quest.recompensas.length; j++) {
            //criando p com recompensa
            var p = document.createElement("p");
            p.textContent = quest.recompensas[j];
            //adicionando p a div
            div.appendChild(p);
        }

        //criando botões de concluir e desistir
        var div2 = document.createElement("div");
        //criando botão de concluir
        var button = document.createElement("button");
        button.className = "btn-concluir";
        button.textContent = "Concluir";
        button.setAttribute("onclick", "concluirQuest(" + i + ")");
        //adicionando botão a div2
        div2.appendChild(button);

        //criando span com classe space
        var span = document.createElement("span");
        span.className = "space";
        span.textContent = " ";
        //adicionando span a div2
        div2.appendChild(span);


        //criando botão de desistir
        var button = document.createElement("button");
        button.className = "btn-desistir";
        button.textContent = "Desistir";
        button.setAttribute("onclick", "desistirQuest(" + i + ")");
        //adicionando botão a div2
        div2.appendChild(button);
        //adicionando div2 a div
        div.appendChild(div2);


        //adicionando div a div de quests
        $("#userQuestsWrap").append(div);
    }
}

function addXP(xp){
    var userXP = getCookie("userXP");
    if (userXP == "" || userXP == "undefined" || userXP == null){
        userXP = 0;
    }
    userXP = parseInt(userXP) + parseInt(xp);
    var xpProximoNivel = getCookie("xpProximoNivel");
    if (xpProximoNivel == "" || xpProximoNivel == "undefined" || xpProximoNivel == null){
        xpProximoNivel = 100;
    }

    if (userXP >= xpProximoNivel){
        userXP = userXP - xpProximoNivel;
        xpProximoNivel = parseInt(parseInt(xpProximoNivel * 1.3)/10)*10;
        var userLevel = getCookie("userLevel");
        if (userLevel == "" || userLevel == "undefined" || userLevel == null){
            userLevel = 1;
        }
        userLevel = parseInt(userLevel) + 1;
        setCookie("userLevel", userLevel, 365);
        adicionaPontuacao(5);
    }
    setCookie("userXP", userXP, 365);
    setCookie("xpProximoNivel", xpProximoNivel, 365);
    $("#xpUsuario").text(userXP);
    $("#xpProximoNivel").text(xpProximoNivel);
    $("#userLevel").text(userLevel);

}

function addTitulo(titulo){
    setCookie("userTitulo", titulo, 365);
    $("#userTitulo").text(titulo);
}

function addAtributo(atributo, valor){
    var pontos = getCookie("pontos" + atributo);
    if (pontos == "" || pontos == "undefined" || pontos == null){
        pontos = 0;
    }
    pontos = parseInt(pontos) + parseInt(valor);
    if (pontos < 10){
        pontos = "0" + pontos;
    }
    setCookie("pontos" + atributo, pontos, 365);
    $(".pontos_" + atributo).text(pontos);
}

function distribuiRecompensas(recompensas){
    for (var i = 0; i < recompensas.length; i++){
        var recompensa = recompensas[i];
        if (recompensa.includes("XP")){
            var xp = recompensa.split(" ")[0];
            addXP(xp);
        } else if (recompensa.includes("TITULO")){
            var titulo = recompensa.split(" ");
            //pegando a junção de tudo exceto o 0
            titulo = titulo.slice(1, titulo.length).join(" ");
            addTitulo(titulo);
        } else{
            var valor = recompensa.split(" ")[0];
            //tirando o + do valor
            valor = valor.slice(1, valor.length);
            var atributo = recompensa.split(" ")[1];
            addAtributo(atributo, valor);
        
        }
    }
}

function concluirQuest(index){
    var questsAdicionadas = getCookie("questsAdicionadas");
    var quests = JSON.parse(questsAdicionadas);
    distribuiRecompensas(quests[index].recompensas);
    quests.splice(index, 1);
    setCookie("questsAdicionadas", JSON.stringify(quests), 365);
    atualizaUserQuests();
}
function desistirQuest(index){
    var questsAdicionadas = getCookie("questsAdicionadas");
    var quests = JSON.parse(questsAdicionadas);
    quests.splice(index, 1);
    setCookie("questsAdicionadas", JSON.stringify(quests), 365);
    atualizaUserQuests();
}

function aceitarQuest(){
    closePopup();
    //pegando o titulo da quest
    var titulo = $("#titulo_missao").text();
    var historia = $("#historia_missao").text();
    var objetivo = $("#objetivo_missao").text();
    var recompensas = [];
    //pegando as recompensas
    $(".recompensa_missao").each(function(){
        recompensas.push($(this).text());
    });    
    adicionaQuests(titulo, historia,objetivo, recompensas);
    atualizaUserQuests();
}
function rejeitarQuest(){
    closePopup();
    $(".nova_missao_alert").css("display", "none");
}