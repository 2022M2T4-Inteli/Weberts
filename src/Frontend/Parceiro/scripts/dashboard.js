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

// function openCities(){
//     if ($("#city-options")[0].style.display == "none" || $("#city-options")[0].style.display == ""){
//         $("#city-options")[0].style.display = "flex"
//         off = false
//         $("#cidades-filter")[0].style.backgroundColor = "#3468FC"
//         $("#cidades-filter")[0].style.color = "#FFF"
//     } else{
//         $("#city-options")[0].style.display = "none"
//         $("#cidades-filter")[0].style.backgroundColor = "#DDE6FF"
//         $("#cidades-filter")[0].style.color = "#373737"
//     }

// }
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

function openPeriod(){
    if ($("#period-options")[0].style.display == "none" || $("#period-options")[0].style.display == ""){
        $("#period-options")[0].style.display = "flex"
        off = false
        $("#periodos-filter")[0].style.backgroundColor = "#3468FC"
        $("#periodos-filter")[0].style.color = "#FFF"
    } else{
        $("#period-options")[0].style.display = "none"
        $("#periodos-filter")[0].style.backgroundColor = "#DDE6FF"
        $("#periodos-filter")[0].style.color = "#373737"
    }

}

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

// const { Console } = require("console")

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
    
    $.get("http://localhost:3031/openStates", function(resultado){
        let i = 0
        resultado.forEach(row => {
            $("#state-options")[0].innerHTML += `<div class="state-unselected"><input type="checkbox" onclick="changeState()" id="state` + i + `"><h3 id="stateText` + i + `">${row.estado}</h3></div>`;
            i++
        });
    });

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

    $.get("http://localhost:3031/openType", function(resultado){
        let i = 0
        resultado.forEach(row => {
            $("#type-options")[0].innerHTML += `<div class="type-unselected"><input type="checkbox" onclick="changeType()" id="type` + i + `"><h3 id="typeText` + i + `">${row.regra}</h3></div>`;
            i++
        });
    });


    $.get("http://localhost:3031/antecipations", function(resultado){
        
        $("#antecipation-value")[0].innerHTML = resultado[0]["COUNT (*)"];
        
    });

    $.get("http://localhost:3031/montante", function(resultado){
        
        $("#montate-value")[0].innerHTML ="R$"+parseFloat(resultado[0]["SUM (montante)"]);
      
        
    });

    $.get("http://localhost:3031/rentabilidade", function(resultado){
        
        $("#rentabilidade-value")[0].innerHTML =(resultado[0]["SUM(montante)/SUM(valor)"]*100).toFixed(0)+"%";
        
        
    });


}
attData()

function openFilter() {
    if (document.getElementById("filterPopup").style.display == "flex") {
        document.getElementById("filterPopup").style.display = "none"
    }
    else {
        document.getElementById("filterPopup").style.display = "flex"
    }
}

function changeState(){
    var estado
    var scrollContainer = Array.from(document.getElementsByClassName('state-unselected'))
    for(var a = 0; a < scrollContainer.length; a++){
        if(document.getElementById("state" + a).checked){
            estado = document.getElementById("stateText" + a).innerHTML
            var url = "http://127.0.0.1:3031/stateFilter";
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", url, false);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("estado=" + estado);
            var retorno = JSON.parse(xhttp.responseText);
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
                if(Element.nome in semrep){
                    semrep[Element.nome]["montante_total"] += Element.montante
                    semrep[Element.nome]["qtds"] += 1
                }else{
                    semrep[Element.nome] = {"nome": Element.nome, "montante_total": Element.montante, "regra": Element.regra, "qtds": 1, "estado": Element.estado}
                }
            }
            semrep = Object.values(semrep).sort(function(a,b){return b["montante_total"]- a["montante_total"]});
            for(Element of semrep){
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
    if(estado == undefined){
        for(var a = 0; a < scrollContainer.length; a++){
            if(!document.getElementById("state" + a).checked){
                var url = "http://127.0.0.1:3031/ranking";
                var xhttp = new XMLHttpRequest();
                xhttp.open("GET", url, false);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.send();
                var retorno = JSON.parse(xhttp.responseText);
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
                    if(Element.nome in semrep){
                        semrep[Element.nome]["montante_total"] += Element.montante
                        semrep[Element.nome]["qtds"] += 1
                    }else{
                        semrep[Element.nome] = {"nome": Element.nome, "montante_total": Element.montante, "regra": Element.regra, "qtds": 1, "estado": Element.estado}
                    }
                }
                semrep = Object.values(semrep).sort(function(a,b){return b["montante_total"]- a["montante_total"]});
                for(Element of semrep){
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
    document.getElementById('col_number').innerHTML = number
    document.getElementById('partner_col').innerHTML = partner
    document.getElementById('rule_col').innerHTML = regra
    document.getElementById('state_col').innerHTML = estado
    document.getElementById('qtd').innerHTML = qtd
    document.getElementById('antecipatedValue').innerHTML = divValor
}


function changePartner(){
    var parceiro
    var scrollContainer = Array.from(document.getElementsByClassName('partner-unselected'))
    console.log(scrollContainer.length)
    for(var a = 0; a < scrollContainer.length; a++){
        if(document.getElementById("partner" + a).checked){
            parceiro = document.getElementById("partnerText" + a).innerHTML
            var url = "http://127.0.0.1:3031/partnerFilter";
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", url, false);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("partner=" + parceiro);
            var retorno = JSON.parse(xhttp.responseText);
            console.log(retorno)
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
                if(Element.nome in semrep){
                    semrep[Element.nome]["montante_total"] += Element.montante
                    semrep[Element.nome]["qtds"] += 1
                }else{
                    semrep[Element.nome] = {"nome": Element.nome, "montante_total": Element.montante, "regra": Element.regra, "qtds": 1, "estado": Element.estado}
                }
            }
            semrep = Object.values(semrep).sort(function(a,b){return b["montante_total"]- a["montante_total"]});
            for(Element of semrep){
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
    if(parceiro == undefined){
        for(var a = 0; a < scrollContainer.length; a++){
            if(!document.getElementById("partner" + a).checked){
                var i = 0
                var url = "http://127.0.0.1:3031/ranking";
                var xhttp = new XMLHttpRequest();
                xhttp.open("GET", url, false);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.send();
                var retorno = JSON.parse(xhttp.responseText);
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
                    if(Element.nome in semrep){
                        semrep[Element.nome]["montante_total"] += Element.montante
                        semrep[Element.nome]["qtds"] += 1
                    }else{
                        semrep[Element.nome] = {"nome": Element.nome, "montante_total": Element.montante, "regra": Element.regra, "qtds": 1, "estado": Element.estado}
                    }
                }
                semrep = Object.values(semrep).sort(function(a,b){return b["montante_total"]- a["montante_total"]});
                for(Element of semrep){
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
                document.getElementById('col_number').innerHTML = number
                document.getElementById('partner_col').innerHTML = partner
                document.getElementById('rule_col').innerHTML = regra
                document.getElementById('state_col').innerHTML = estado
                document.getElementById('qtd').innerHTML = qtd
                document.getElementById('antecipatedValue').innerHTML = divValor
}

function changeType(){
    var type
    var scrollContainer = Array.from(document.getElementsByClassName('type-unselected'))
    for(var a = 0; a < scrollContainer.length; a++){
        if(document.getElementById("type" + a).checked){
            type = document.getElementById("typeText" + a).innerHTML
            console.log(type)
            var url = "http://127.0.0.1:3031/typeFilter";
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", url, false);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("regra=" + type);
            var retorno = JSON.parse(xhttp.responseText);
            console.log(retorno)
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
                if(Element.nome in semrep){
                    semrep[Element.nome]["montante_total"] += Element.montante
                    semrep[Element.nome]["qtds"] += 1
                }else{
                    semrep[Element.nome] = {"nome": Element.nome, "montante_total": Element.montante, "regra": Element.regra, "qtds": 1, "estado": Element.estado}
                }
            }
            semrep = Object.values(semrep).sort(function(a,b){return b["montante_total"]- a["montante_total"]});
            for(Element of semrep){
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
    if(type == undefined){
        for(var a = 0; a < scrollContainer.length; a++){
            if(!document.getElementById("type" + a).checked){
                var url = "http://127.0.0.1:3031/ranking";
                var xhttp = new XMLHttpRequest();
                xhttp.open("GET", url, false);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.send();
                var retorno = JSON.parse(xhttp.responseText);
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
                    if(Element.nome in semrep){
                        semrep[Element.nome]["montante_total"] += Element.montante
                        semrep[Element.nome]["qtds"] += 1
                    }else{
                        semrep[Element.nome] = {"nome": Element.nome, "montante_total": Element.montante, "regra": Element.regra, "qtds": 1, "estado": Element.estado}
                    }
                }
                semrep = Object.values(semrep).sort(function(a,b){return b["montante_total"]- a["montante_total"]});
                for(Element of semrep){
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
    document.getElementById('col_number').innerHTML = number
    document.getElementById('partner_col').innerHTML = partner
    document.getElementById('rule_col').innerHTML = regra
    document.getElementById('state_col').innerHTML = estado
    document.getElementById('qtd').innerHTML = qtd
    document.getElementById('antecipatedValue').innerHTML = divValor
}

function ranking(){
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
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
    var retorno = JSON.parse(xhttp.responseText);
    var semrep = {};
    //Exemplo: semrep = {"Inteli":{"montante_total": 5000, "regra":"D+7"}, "Hurb": {"montante_total": 2000, "regra":"D+7"}
    for (Element of retorno){
        if(Element.nome in semrep){
            semrep[Element.nome]["montante_total"] += Element.montante
            semrep[Element.nome]["qtds"] += 1
        }else{
            semrep[Element.nome] = {"nome": Element.nome, "montante_total": Element.montante, "regra": Element.regra, "qtds": 1, "estado": Element.estado}
        }
    }    
    semrep = Object.values(semrep).sort(function(a,b){return b["montante_total"]- a["montante_total"]});
    for(Element of semrep){
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
    document.getElementById('col_number').innerHTML = number
    document.getElementById('partner_col').innerHTML = partner
    document.getElementById('rule_col').innerHTML = regra
    document.getElementById('state_col').innerHTML = estado
    document.getElementById('qtd').innerHTML = qtd
    document.getElementById('antecipatedValue').innerHTML = divValor
}

