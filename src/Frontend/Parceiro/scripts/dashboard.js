
//Abre a seção dos estados no filtro
function openStates(){
    if ($("#state-options")[0].style.display == "none" || $("#state-options")[0].style.display == ""){
        $("#state-options")[0].style.display = "flex"
        off = false
        $("#estados-filter")[0].style.backgroundColor = "#3468FC"
        $("#estados-filter")[0].style.color = "#FFF"
    } else{
        $("#state-options")[0].style.display = "none"
        $("#estados-filter")[0].style.backgroundColor = "#DDE6FF"
        $("#estados-filter")[0].style.color = "#373737"
    }
    
}

//Abre a seção dos parceiros no filtro
function openPartner(){
    if ($("#partner-options")[0].style.display == "none" || $("#partner-options")[0].style.display == ""){
        $("#partner-options")[0].style.display = "flex"
        off = false
        $("#parceiros-filter")[0].style.backgroundColor = "#3468FC"
        $("#parceiros-filter")[0].style.color = "#FFF"
    } else{
        $("#partner-options")[0].style.display = "none"
        $("#parceiros-filter")[0].style.backgroundColor = "#DDE6FF"
        $("#parceiros-filter")[0].style.color = "#373737"
    }
}

//Abre a seção dos tipos de antecipação no filtro
function openType(){
    if ($("#type-options")[0].style.display == "none" || $("#type-options")[0].style.display == ""){
        $("#type-options")[0].style.display = "flex"
        off = false
        $("#tipos-filter")[0].style.backgroundColor = "#3468FC"
        $("#tipos-filter")[0].style.color = "#FFF"
    } else{
        $("#type-options")[0].style.display = "none"
        $("#tipos-filter")[0].style.backgroundColor = "#DDE6FF"
        $("#tipos-filter")[0].style.color = "#373737"
    }

}

//
function quitPopup(){
    if ($("#quitPopup")[0].style.display == "none" || $("#quitPopup")[0].style.display == ""){
        $("#quitPopup")[0].style.display = "flex"
        $("#shadow")[0].style.display = "flex"
    } else{
        $("#quitPopup")[0].style.display = "none"
        $("#shadow")[0].style.display = "none"
    }
}

function attData() {
    
    //Cria as opções de filtro na parte de estados
    $.get("http://localhost:3031/openStates", function(resultado){
        let i = 0
        resultado.forEach(row => {
            $("#state-options")[0].innerHTML += `<div class="state-unselected"><input type="checkbox" onclick="changeState()" id="state` + i + `"><h3 id="stateText` + i + `">${row.estado}</h3></div>`;
            i++
        });
    });


    //Cria as opções de filtro na parte de parceiros
    $.get("http://localhost:3031/openPartner", function(resultado){
        var nomes_usados_qtd = []
        let i = 0
        resultado.forEach(row => {
            var nome_atual = row.nome
            if (!nomes_usados_qtd.includes(nome_atual)){ 
                nomes_usados_qtd.push(nome_atual)             
                $("#partner-options")[0].innerHTML += `<div class="partner-unselected"><input type="checkbox" onclick="changePartner()" id="partner` + i + `"><h3 id="partnerText` + i + `">${row.nome}</h3></div>`;
            }
            i++
    });
            }
    )

    //Cria as opções de filtro na parte de tipos de solicitação
    $.get("http://localhost:3031/openType", function(resultado){
        let i = 0
        resultado.forEach(row => {
            $("#type-options")[0].innerHTML += `<div class="type-unselected"><input type="checkbox" onclick="changeType()" id="type` + i + `"><h3 id="typeText` + i + `">${row.regra}</h3></div>`;
            i++
        });
    });

    //Valor para a div de AntecipaçãoxPrazo
    $.get("http://localhost:3031/antecipations", function(resultado){
        
        $("#antecipation-value")[0].innerHTML = resultado[0]["COUNT (*)"];
        
    });

    //Valor para a div de PagamentosxPrazo
    $.get("http://localhost:3031/montante", function(resultado){
        
        $("#montate-value")[0].innerHTML ="R$"+parseFloat(resultado[0]["SUM (montante)"]);
      
        
    });

    //Valor para a div de Rentabilidade Média
    $.get("http://localhost:3031/rentabilidade", function(resultado){
        
        $("#rentabilidade-value")[0].innerHTML =(resultado[0]["SUM(montante)/SUM(valor)"]*100).toFixed(0)+"%";
        
        
    });


}
attData()

//Permite abrir o filtro
function openFilter() {
    if (document.getElementById("filterPopup").style.display == "flex") {
        document.getElementById("filterPopup").style.display = "none"
    }
    else {
        document.getElementById("filterPopup").style.display = "flex"
    }
}

//Filtra o ranking a partir do estado
function changeState(){
    var estado
    var scrollContainer = Array.from(document.getElementsByClassName('state-unselected'))
    for(var a = 0; a < scrollContainer.length; a++){
        if(document.getElementById("state" + a).checked){ //Busca um por um se há algum estado selecionado
            estado = document.getElementById("stateText" + a).innerHTML //Define qual o estado selecionado
            var url = "http://127.0.0.1:3031/stateFilter";
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", url, false);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("estado=" + estado); //Busca no banco as informações relacionadas ao estado selecionado
            var retorno = JSON.parse(xhttp.responseText);
            //Código HTML que define cada coluna do ranking
            var number = '<div class="label-roll">' + 
            '<div class="label1">' + 
                '<h5>Nº</h5>' + 
                '<br>' + 
            '</div>' + 
        '</div>'
            var partner = '<div class="label-roll">' + 
            '<div class="label1">' + 
                '<h5>Parceiro</h5>' + 
                '<br>' + 
            '</div>' + 
        '</div>'
            var regra = '<div class="label-roll">' + 
            '<div class="label1">' + 
                '<h5>Tipo Solicitação</h5>' + 
            '</div>' + 
        '</div>'
            var estado = '<div class="label-roll">' + 
            '<div class="label1">' + 
                '<h5>Estado</h5>' +
                '<br>' + 
            '</div>' + 
        '</div>'
            var qtd = '<div class="label-roll">' + 
            '<div class="label1">' + 
                '<h5>Qtd Solicitações</h5>' + 
            '</div>' + 
        '</div>'
            var divValor = '<div class="label-roll">' +
            '<div class="label1">' +
                '<h5>Valor Antecipado    </h5>' +
            '</div>' +
        '</div>'
            var i = 0
            var semrep = {};
            for (Element of retorno){
                if(Element.nome in semrep){ //Caso o parceiro tenha aparecido antes no retorno do banco:
                    semrep[Element.nome]["montante_total"] += Element.montante //Adiciona ao montante do parceiro que está na lista semrep  
                    semrep[Element.nome]["qtds"] += 1   //Conta quantas vezes o parceiro solicitou antecipações
                }else{
                    semrep[Element.nome] = {"nome": Element.nome, "montante_total": Element.montante, "regra": Element.regra, "qtds": 1, "estado": Element.estado}  //Caso o parceiro não tenha aparecido ainda, cria uma linha para ele na lista dos elementos do ranking
                }
            }
            semrep = Object.values(semrep).sort(function(a,b){return b["montante_total"]- a["montante_total"]});    //Organiza de forma crescente os parceiros da lista do ranking
            for(Element of semrep){
            //Define o código html que será colocado no front junto com os dados recebidos
                number += '<div class="label-roll">' + 
                '<div class="label2" id="number' + i + '">' + 
                    '<h5>' + (i + 1) + '</h5>' +
            '</div>' + 
            '</div>'
                partner += '<div class="label-roll">' +
                '<div class="label2" id="partner' + i + '">' +
                    '<h5>' + Element.nome + '</h5>' +
                '</div>' + 
            '</div>'
                regra += '<div class="label-roll">' +
                '<div class="label2" id="regra' + i + '">' +
                    '<h5>' + Element.regra + '</h5>' + 
                '</div>' + 
            '</div>'
                estado += '<div class="label-roll">' + 
                '<div class="label2" id="estado' + i + '">'+
                    '<h5>' + Element.estado + '</h5>' + 
                '</div>' + 
            '</div>'
                qtd += '<div class="label-roll">' +
                '<div class="label2" id="qtd' + i + '">' +
                    '<h5>' + Element.qtds + '</h5>' +
                '</div>' +
            '</div>'
                divValor += '<div class="label-roll">' + 
                '<div class="label2" id="value' + i + '">' +
                    '<h5>R$ ' + Element.montante_total + '</h5>' +
                '</div>' +
            '</div>'
                i++
            }
        }
        }
    if(estado == undefined){    //Caso nenhum filtro esteja selecionado:
                var url = "http://127.0.0.1:3031/ranking";
                var xhttp = new XMLHttpRequest();
                xhttp.open("GET", url, false);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.send();   //Pega as informações necessárias no banco de dados
                var retorno = JSON.parse(xhttp.responseText);
                //Código HTML que define cada coluna do ranking
                var number = '<div class="label-roll">' + 
                '<div class="label1">' + 
                    '<h5>Nº</h5>' + 
                    '<br>' + 
                '</div>' + 
            '</div>'
                var partner = '<div class="label-roll">' + 
                '<div class="label1">' + 
                    '<h5>Parceiro</h5>' + 
                    '<br>' + 
                '</div>' + 
            '</div>'
                var regra = '<div class="label-roll">' + 
                '<div class="label1">' + 
                    '<h5>Tipo Solicitação</h5>' + 
                '</div>' + 
            '</div>'
                var estado = '<div class="label-roll">' + 
                '<div class="label1">' + 
                    '<h5>Estado</h5>' +
                    '<br>' + 
                '</div>' + 
            '</div>'
                var qtd = '<div class="label-roll">' + 
                '<div class="label1">' + 
                    '<h5>Qtd Solicitações</h5>' + 
                '</div>' + 
            '</div>'
                var divValor = '<div class="label-roll">' +
                '<div class="label1">' +
                    '<h5>Valor Antecipado    </h5>' +
                '</div>' +
            '</div>'
                var i = 0
                var semrep = {}
                for (Element of retorno){
                    if(Element.nome in semrep){ //Caso o parceiro tenha aparecido antes no retorno do banco:
                        semrep[Element.nome]["montante_total"] += Element.montante  //Adiciona ao montante do parceiro que está na lista semrep
                        semrep[Element.nome]["qtds"] += 1   //Conta quantas vezes o parceiro solicitou antecipações
                    }else{
                        semrep[Element.nome] = {"nome": Element.nome, "montante_total": Element.montante, "regra": Element.regra, "qtds": 1, "estado": Element.estado}  //Caso o parceiro não tenha aparecido ainda, cria uma linha para ele na lista dos elementos do ranking
                    }
                }
                semrep = Object.values(semrep).sort(function(a,b){return b["montante_total"]- a["montante_total"]});    //Organiza de forma crescente os parceiros da lista do ranking
                for(Element of semrep){
                    //Define o código html que será colocado no front junto com os dados recebidos
                    number += '<div class="label-roll">' + 
                    '<div class="label2" id="number' + i + '">' + 
                        '<h5>' + (i + 1) + '</h5>' +
                '</div>' + 
                '</div>'
                    partner += '<div class="label-roll">' +
                    '<div class="label2" id="partner' + i + '">' +
                        '<h5>' + Element.nome + '</h5>' +
                    '</div>' + 
                '</div>'
                    regra += '<div class="label-roll">' +
                    '<div class="label2" id="regra' + i + '">' +
                        '<h5>' + Element.regra + '</h5>' + 
                    '</div>' + 
                '</div>'
                    estado += '<div class="label-roll">' + 
                    '<div class="label2" id="estado' + i + '">'+
                        '<h5>' + Element.estado + '</h5>' + 
                    '</div>' + 
                '</div>'
                    qtd += '<div class="label-roll">' +
                    '<div class="label2" id="qtd' + i + '">' +
                        '<h5>' + Element.qtds + '</h5>' +
                    '</div>' +
                '</div>'
                    divValor += '<div class="label-roll">' + 
                    '<div class="label2" id="value' + i + '">' +
                        '<h5>R$ ' + Element.montante_total + '</h5>' +
                    '</div>' +
                '</div>'
                    i++
                }
    }
    //Coloca o código HTML com os dados do banco na página
    document.getElementById('col_number').innerHTML = number
    document.getElementById('partner_col').innerHTML = partner
    document.getElementById('rule_col').innerHTML = regra
    document.getElementById('state_col').innerHTML = estado
    document.getElementById('qtd').innerHTML = qtd
    document.getElementById('antecipatedValue').innerHTML = divValor
}


//Filtra o ranking a partir do parceiro
function changePartner(){
    var parceiro
    var scrollContainer = Array.from(document.getElementsByClassName('partner-unselected'))
    for(var a = 0; a < scrollContainer.length; a++){
        if(document.getElementById("partner" + a).checked){ //Busca um por um se há algum parceiro selecionado
            parceiro = document.getElementById("partnerText" + a).innerHTML //Define qual o parceiro selecionado
            var url = "http://127.0.0.1:3031/partnerFilter";
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", url, false);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("partner=" + parceiro);  //Busca no banco as informações relacionadas ao parceiro selecionado
            var retorno = JSON.parse(xhttp.responseText);
            //Código HTML que define cada coluna do ranking
            var number = '<div class="label-roll">' + 
            '<div class="label1">' + 
                '<h5>Nº</h5>' + 
                '<br>' + 
            '</div>' + 
        '</div>'
            var partner = '<div class="label-roll">' + 
            '<div class="label1">' + 
                '<h5>Parceiro</h5>' + 
                '<br>' + 
            '</div>' + 
        '</div>'
            var regra = '<div class="label-roll">' + 
            '<div class="label1">' + 
                '<h5>Tipo Solicitação</h5>' + 
            '</div>' + 
        '</div>'
            var estado = '<div class="label-roll">' + 
            '<div class="label1">' + 
                '<h5>Estado</h5>' +
                '<br>' + 
            '</div>' + 
        '</div>'
            var qtd = '<div class="label-roll">' + 
            '<div class="label1">' + 
                '<h5>Qtd Solicitações</h5>' + 
            '</div>' + 
        '</div>'
            var divValor = '<div class="label-roll">' +
            '<div class="label1">' +
                '<h5>Valor Antecipado    </h5>' +
            '</div>' +
        '</div>'
            var semrep = {}
            var i = 0
            for (Element of retorno){
                if(Element.nome in semrep){ //Caso o parceiro tenha aparecido antes no retorno do banco:
                    semrep[Element.nome]["montante_total"] += Element.montante  //Adiciona ao montante do parceiro que está na lista semrep  
                    semrep[Element.nome]["qtds"] += 1   //Conta quantas vezes o parceiro solicitou antecipações
                }else{
                    semrep[Element.nome] = {"nome": Element.nome, "montante_total": Element.montante, "regra": Element.regra, "qtds": 1, "estado": Element.estado}  //Caso o parceiro não tenha aparecido ainda, cria uma linha para ele na lista dos elementos do ranking
                }
            }
            semrep = Object.values(semrep).sort(function(a,b){return b["montante_total"]- a["montante_total"]});    //Organiza de forma crescente os parceiros da lista do ranking
            for(Element of semrep){
                //Define o código html que será colocado no front junto com os dados recebidos
                number += '<div class="label-roll">' + 
                '<div class="label2" id="number' + i + '">' + 
                    '<h5>' + (i + 1) + '</h5>' +
            '</div>' + 
            '</div>'
                partner += '<div class="label-roll">' +
                '<div class="label2" id="partner' + i + '">' +
                    '<h5>' + Element.nome + '</h5>' +
                '</div>' + 
            '</div>'
                regra += '<div class="label-roll">' +
                '<div class="label2" id="regra' + i + '">' +
                    '<h5>' + Element.regra + '</h5>' + 
                '</div>' + 
            '</div>'
                estado += '<div class="label-roll">' + 
                '<div class="label2" id="estado' + i + '">'+
                    '<h5>' + Element.estado + '</h5>' + 
                '</div>' + 
            '</div>'
                qtd += '<div class="label-roll">' +
                '<div class="label2" id="qtd' + i + '">' +
                    '<h5>' + Element.qtds + '</h5>' +
                '</div>' +
            '</div>'
                divValor += '<div class="label-roll">' + 
                '<div class="label2" id="value' + i + '">' +
                    '<h5>R$ ' + Element.montante_total + '</h5>' +
                '</div>' +
            '</div>'
                i++
            }
        }
    }
    if(parceiro == undefined){  //Caso nenhum filtro esteja selecionado:
        for(var a = 0; a < scrollContainer.length; a++){
            if(!document.getElementById("partner" + a).checked){
                var i = 0
                var url = "http://127.0.0.1:3031/ranking";
                var xhttp = new XMLHttpRequest();
                xhttp.open("GET", url, false);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.send();   //Pega as informações necessárias no banco de dados
                var retorno = JSON.parse(xhttp.responseText);
                //Código HTML que define cada coluna do ranking
                var number = '<div class="label-roll">' + 
                '<div class="label1">' + 
                    '<h5>Nº</h5>' + 
                    '<br>' + 
                '</div>' + 
            '</div>'
                var partner = '<div class="label-roll">' + 
                '<div class="label1">' + 
                    '<h5>Parceiro</h5>' + 
                    '<br>' + 
                '</div>' + 
            '</div>'
                var regra = '<div class="label-roll">' + 
                '<div class="label1">' + 
                    '<h5>Tipo Solicitação</h5>' + 
                '</div>' + 
            '</div>'
                var estado = '<div class="label-roll">' + 
                '<div class="label1">' + 
                    '<h5>Estado</h5>' +
                    '<br>' + 
                '</div>' + 
            '</div>'
                var qtd = '<div class="label-roll">' + 
                '<div class="label1">' + 
                    '<h5>Qtd Solicitações</h5>' + 
                '</div>' + 
            '</div>'
                var divValor = '<div class="label-roll">' +
                '<div class="label1">' +
                    '<h5>Valor Antecipado    </h5>' +
                '</div>' +
            '</div>'
                var i = 0
                var semrep = {}
                for (Element of retorno){
                    if(Element.nome in semrep){ //Caso o parceiro tenha aparecido antes no retorno do banco:
                        semrep[Element.nome]["montante_total"] += Element.montante  //Adiciona ao montante do parceiro que está na lista semrep
                        semrep[Element.nome]["qtds"] += 1   //Conta quantas vezes o parceiro solicitou antecipações
                    }else{
                        semrep[Element.nome] = {"nome": Element.nome, "montante_total": Element.montante, "regra": Element.regra, "qtds": 1, "estado": Element.estado}//Caso o parceiro não tenha aparecido ainda, cria uma linha para ele na lista dos elementos do ranking
                    }
                }
                semrep = Object.values(semrep).sort(function(a,b){return b["montante_total"]- a["montante_total"]});    //Organiza de forma crescente os parceiros da lista do ranking
                for(Element of semrep){
                    //Define o código html que será colocado no front junto com os dados recebidos
                    number += '<div class="label-roll">' + 
                    '<div class="label2" id="number' + i + '">' + 
                        '<h5>' + (i + 1) + '</h5>' +
                '</div>' + 
                '</div>'
                    partner += '<div class="label-roll">' +
                    '<div class="label2" id="partner' + i + '">' +
                        '<h5>' + Element.nome + '</h5>' +
                    '</div>' + 
                '</div>'
                    regra += '<div class="label-roll">' +
                    '<div class="label2" id="regra' + i + '">' +
                        '<h5>' + Element.regra + '</h5>' + 
                    '</div>' + 
                '</div>'
                    estado += '<div class="label-roll">' + 
                    '<div class="label2" id="estado' + i + '">'+
                        '<h5>' + Element.estado + '</h5>' + 
                    '</div>' + 
                '</div>'
                    qtd += '<div class="label-roll">' +
                    '<div class="label2" id="qtd' + i + '">' +
                        '<h5>' + Element.qtds + '</h5>' +
                    '</div>' +
                '</div>'
                    divValor += '<div class="label-roll">' + 
                    '<div class="label2" id="value' + i + '">' +
                        '<h5>R$ ' + Element.montante_total + '</h5>' +
                    '</div>' +
                '</div>'
                    i++
                }
            }
                
          }
    }
    //Coloca o código HTML com os dados do banco na página
    document.getElementById('col_number').innerHTML = number
    document.getElementById('partner_col').innerHTML = partner
    document.getElementById('rule_col').innerHTML = regra
    document.getElementById('state_col').innerHTML = estado
    document.getElementById('qtd').innerHTML = qtd
    document.getElementById('antecipatedValue').innerHTML = divValor
}


//Filtra o ranking a partir do tipo de solicitação
function changeType(){
    var type
    var scrollContainer = Array.from(document.getElementsByClassName('type-unselected'))
    for(var a = 0; a < scrollContainer.length; a++){
        if(document.getElementById("type" + a).checked){    //Busca um por um se há algum tipo selecionado
            type = document.getElementById("typeText" + a).innerHTML    //Define qual o tipo selecionado
            var url = "http://127.0.0.1:3031/typeFilter";
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", url, false);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("regra=" + type);    //Busca no banco as informações relacionadas ao tipo selecionado
            var retorno = JSON.parse(xhttp.responseText);
            //Código HTML que define cada coluna do ranking
            var number = '<div class="label-roll">' + 
            '<div class="label1">' + 
                '<h5>Nº</h5>' + 
                '<br>' + 
            '</div>' + 
        '</div>'
            var partner = '<div class="label-roll">' + 
            '<div class="label1">' + 
                '<h5>Parceiro</h5>' + 
                '<br>' + 
            '</div>' + 
        '</div>'
            var regra = '<div class="label-roll">' + 
            '<div class="label1">' + 
                '<h5>Tipo Solicitação</h5>' + 
            '</div>' + 
        '</div>'
            var estado = '<div class="label-roll">' + 
            '<div class="label1">' + 
                '<h5>Estado</h5>' +
                '<br>' + 
            '</div>' + 
        '</div>'
            var qtd = '<div class="label-roll">' + 
            '<div class="label1">' + 
                '<h5>Qtd Solicitações</h5>' + 
            '</div>' + 
        '</div>'
            var divValor = '<div class="label-roll">' +
            '<div class="label1">' +
                '<h5>Valor Antecipado    </h5>' +
            '</div>' +
        '</div>'
            var i = 0
            var semrep = {};
            for (Element of retorno){
                if(Element.nome in semrep){ //Caso o parceiro tenha aparecido antes no retorno do banco:
                    semrep[Element.nome]["montante_total"] += Element.montante  //Adiciona ao montante do parceiro que está na lista semrep
                    semrep[Element.nome]["qtds"] += 1   //Conta quantas vezes o parceiro solicitou antecipações
                }else{
                    semrep[Element.nome] = {"nome": Element.nome, "montante_total": Element.montante, "regra": Element.regra, "qtds": 1, "estado": Element.estado}  //Caso o parceiro não tenha aparecido ainda, cria uma linha para ele na lista dos elementos do ranking
                }
            }
            semrep = Object.values(semrep).sort(function(a,b){return b["montante_total"]- a["montante_total"]});    //Organiza de forma crescente os parceiros da lista do ranking
            for(Element of semrep){
                //Define o código html que será colocado no front junto com os dados recebidos
                number += '<div class="label-roll">' + 
                '<div class="label2" id="number' + i + '">' + 
                    '<h5>' + (i + 1) + '</h5>' +
            '</div>' + 
            '</div>'
                partner += '<div class="label-roll">' +
                '<div class="label2" id="partner' + i + '">' +
                    '<h5>' + Element.nome + '</h5>' +
                '</div>' + 
            '</div>'
                regra += '<div class="label-roll">' +
                '<div class="label2" id="regra' + i + '">' +
                    '<h5>' + Element.regra + '</h5>' + 
                '</div>' + 
            '</div>'
                estado += '<div class="label-roll">' + 
                '<div class="label2" id="estado' + i + '">'+
                    '<h5>' + Element.estado + '</h5>' + 
                '</div>' + 
            '</div>'
                qtd += '<div class="label-roll">' +
                '<div class="label2" id="qtd' + i + '">' +
                    '<h5>' + Element.qtds + '</h5>' +
                '</div>' +
            '</div>'
                divValor += '<div class="label-roll">' + 
                '<div class="label2" id="value' + i + '">' +
                    '<h5>R$ ' + Element.montante_total + '</h5>' +
                '</div>' +
            '</div>'
                i++
            }
        }
        }
    if(type == undefined){  //Caso nenhum filtro esteja selecionado:
        for(var a = 0; a < scrollContainer.length; a++){
            if(!document.getElementById("type" + a).checked){
                var url = "http://127.0.0.1:3031/ranking";
                var xhttp = new XMLHttpRequest();
                xhttp.open("GET", url, false);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.send();   //Pega as informações necessárias no banco de dados
                var retorno = JSON.parse(xhttp.responseText);
                 //Código HTML que define cada coluna do ranking
                var number = '<div class="label-roll">' + 
                '<div class="label1">' + 
                    '<h5>Nº</h5>' + 
                    '<br>' + 
                '</div>' + 
            '</div>'
                var partner = '<div class="label-roll">' + 
                '<div class="label1">' + 
                    '<h5>Parceiro</h5>' + 
                    '<br>' + 
                '</div>' + 
            '</div>'
                var regra = '<div class="label-roll">' + 
                '<div class="label1">' + 
                    '<h5>Tipo Solicitação</h5>' + 
                '</div>' + 
            '</div>'
                var estado = '<div class="label-roll">' + 
                '<div class="label1">' + 
                    '<h5>Estado</h5>' +
                    '<br>' + 
                '</div>' + 
            '</div>'
                var qtd = '<div class="label-roll">' + 
                '<div class="label1">' + 
                    '<h5>Qtd Solicitações</h5>' + 
                '</div>' + 
            '</div>'
                var divValor = '<div class="label-roll">' +
                '<div class="label1">' +
                    '<h5>Valor Antecipado    </h5>' +
                '</div>' +
            '</div>'
                var i = 0
                var semrep = {}
                for (Element of retorno){
                    if(Element.nome in semrep){ //Caso o parceiro tenha aparecido antes no retorno do banco:
                        semrep[Element.nome]["montante_total"] += Element.montante  //Adiciona ao montante do parceiro que está na lista semrep
                        semrep[Element.nome]["qtds"] += 1   //Conta quantas vezes o parceiro solicitou antecipações
                    }else{
                        semrep[Element.nome] = {"nome": Element.nome, "montante_total": Element.montante, "regra": Element.regra, "qtds": 1, "estado": Element.estado}  //Caso o parceiro não tenha aparecido ainda, cria uma linha para ele na lista dos elementos do ranking
                    }
                }
                semrep = Object.values(semrep).sort(function(a,b){return b["montante_total"]- a["montante_total"]});    //Organiza de forma crescente os parceiros da lista do ranking
                for(Element of semrep){
                    //Define o código html que será colocado no front junto com os dados recebidos
                    number += '<div class="label-roll">' + 
                    '<div class="label2" id="number' + i + '">' + 
                        '<h5>' + (i + 1) + '</h5>' +
                '</div>' + 
                '</div>'
                    partner += '<div class="label-roll">' +
                    '<div class="label2" id="partner' + i + '">' +
                        '<h5>' + Element.nome + '</h5>' +
                    '</div>' + 
                '</div>'
                    regra += '<div class="label-roll">' +
                    '<div class="label2" id="regra' + i + '">' +
                        '<h5>' + Element.regra + '</h5>' + 
                    '</div>' + 
                '</div>'
                    estado += '<div class="label-roll">' + 
                    '<div class="label2" id="estado' + i + '">'+
                        '<h5>' + Element.estado + '</h5>' + 
                    '</div>' + 
                '</div>'
                    qtd += '<div class="label-roll">' +
                    '<div class="label2" id="qtd' + i + '">' +
                        '<h5>' + Element.qtds + '</h5>' +
                    '</div>' +
                '</div>'
                    divValor += '<div class="label-roll">' + 
                    '<div class="label2" id="value' + i + '">' +
                        '<h5>R$ ' + Element.montante_total + '</h5>' +
                    '</div>' +
                '</div>'
                    i++
                }
            }
                
          }
    }
    //Coloca o código HTML com os dados do banco na página
    document.getElementById('col_number').innerHTML = number
    document.getElementById('partner_col').innerHTML = partner
    document.getElementById('rule_col').innerHTML = regra
    document.getElementById('state_col').innerHTML = estado
    document.getElementById('qtd').innerHTML = qtd
    document.getElementById('antecipatedValue').innerHTML = divValor
}

function ranking(){
    //Código HTML que define cada coluna do ranking
    var number = '<div class="label-roll">' + 
    '<div class="label1">' + 
        '<h5>Nº</h5>' + 
        '<br>' + 
    '</div>' + 
'</div>'
    var partner = '<div class="label-roll">' + 
    '<div class="label1">' + 
        '<h5>Parceiro</h5>' + 
        '<br>' + 
    '</div>' + 
'</div>'
    var regra = '<div class="label-roll">' + 
    '<div class="label1">' + 
        '<h5>Tipo Solicitação</h5>' + 
    '</div>' + 
'</div>'
    var estado = '<div class="label-roll">' + 
    '<div class="label1">' + 
        '<h5>Estado</h5>' +
        '<br>' + 
    '</div>' + 
'</div>'
    var qtd = '<div class="label-roll">' + 
    '<div class="label1">' + 
        '<h5>Qtd Solicitações</h5>' + 
    '</div>' + 
'</div>'
    var divValor = '<div class="label-roll">' +
    '<div class="label1">' +
        '<h5>Valor Antecipado    </h5>' +
    '</div>' +
'</div>'
    var i = 0
    var url = "http://127.0.0.1:3031/ranking";
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();//Pega as informações necessárias no banco de dados
    var retorno = JSON.parse(xhttp.responseText);
    var semrep = {};
    for (Element of retorno){
        if(Element.nome in semrep){ //Caso o parceiro tenha aparecido antes no retorno do banco:
            semrep[Element.nome]["montante_total"] += Element.montante  //Adiciona ao montante do parceiro que está na lista semrep
            semrep[Element.nome]["qtds"] += 1   //Conta quantas vezes o parceiro solicitou antecipações
        }else{
            semrep[Element.nome] = {"nome": Element.nome, "montante_total": Element.montante, "regra": Element.regra, "qtds": 1, "estado": Element.estado}  //Caso o parceiro não tenha aparecido ainda, cria uma linha para ele na lista dos elementos do ranking
        }
    }    
    semrep = Object.values(semrep).sort(function(a,b){return b["montante_total"]- a["montante_total"]});    //Organiza de forma crescente os parceiros da lista do ranking
    for(Element of semrep){
        //Define o código html que será colocado no front junto com os dados recebidos
        number += '<div class="label-roll">' + 
        '<div class="label2" id="number' + i + '">' + 
            '<h5>' + (i + 1) + '</h5>' +
       '</div>' + 
    '</div>'
        partner += '<div class="label-roll">' +
        '<div class="label2" id="partner' + i + '">' +
            '<h5>' + Element.nome + '</h5>' +
        '</div>' + 
    '</div>'
        regra += '<div class="label-roll">' +
        '<div class="label2" id="regra' + i + '">' +
            '<h5>' + Element.regra + '</h5>' + 
        '</div>' + 
    '</div>'
        estado += '<div class="label-roll">' + 
        '<div class="label2" id="estado' + i + '">'+
            '<h5>' + Element.estado + '</h5>' + 
        '</div>' + 
    '</div>'
        qtd += '<div class="label-roll">' +
        '<div class="label2" id="qtd' + i + '">' +
            '<h5>' + Element.qtds + '</h5>' +
        '</div>' +
    '</div>'
        divValor += '<div class="label-roll">' + 
        '<div class="label2" id="value' + i + '">' +
            '<h5>R$ ' + Element.montante_total + '</h5>' +
        '</div>' +
    '</div>'
    i++
    }
    //Coloca o código HTML com os dados do banco na página
    document.getElementById('col_number').innerHTML = number
    document.getElementById('partner_col').innerHTML = partner
    document.getElementById('rule_col').innerHTML = regra
    document.getElementById('state_col').innerHTML = estado
    document.getElementById('qtd').innerHTML = qtd
    document.getElementById('antecipatedValue').innerHTML = divValor
}

