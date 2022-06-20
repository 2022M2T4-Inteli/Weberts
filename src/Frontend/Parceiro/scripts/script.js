function load(){

   //Info hotel
   var text = ''
   var i = 0
   var url = "http://127.0.0.1:3031/hotelReserva";
   var xhttp = new XMLHttpRequest();
   xhttp.open("GET", url, false);
   xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
   var retorno = JSON.parse(xhttp.responseText);
   for(Element in retorno){
       text += '<div class="reserveContainer" id="reserveContainer"' + i + '>' + 
      ' <input type="checkbox" name="D+15" class="agree" id="agree' + i + '" onclick="javaScript:check()" />' +
       '<div class="reserveInfos">'+
         '<div class="textInfos">' + 
           '<h1 class="hotelName" id="hotel' + i + '">' + retorno[i].nome + '</h1>' + 
           '<div class="codeAndCheckOutDate">' +
             '<div class="ccBoxLeft">' + 
               '<p class="ccText">Código</p>' + 
               '<p class="ccNumber" id="code' + i + '">' + retorno[i].code + '</p>' +
             '</div>' + 
             '<div class="ccBoxRight">' + 
               '<p class="ccText">Check-Out</p>' + 
               '<p class="ccNumber" id="checkOut' + i +'">' + retorno[i].data_checkout + '</p>' +
             '</div>'+
           '</div>' + 
         '</div>' + 
         '<div class="valueInfos">' + 
           '<p class="valueText">Valor</p>' + 
           '<p class="valueNumber" id="value' + i +'"> R$ ' + retorno[i].valor + '</p>' + 
         '</div>' + 
       '</div>' + 
     '</div>'
     i++
   }
 document.getElementById('scrollContainer').innerHTML = text
 document.getElementById('Data').innerHTML = 'Sem Data Ainda'
}

//Soma dos itens selecionados

function check(){
    var soma = 0
    var i = 0
    var retorno
    var scrollContainer = Array.from(document.getElementsByClassName('reserveContainer'))
        for(i; i < scrollContainer.length; i++){
        if(document.getElementById("agree" + i).checked){
            retorno = document.getElementById('value' + i).innerHTML
            soma += parseInt(retorno.substring(3))
        }
        // if(document.getElementById('D+15').checked){
        //   soma * (94/100)
        // }else if(document.getElementById('D+7')){
        //   soma * (91/100)
        // }else if(document.getElementById('D+2')){
        //   soma * (88/100)
        // }
        document.getElementById('fullValue').innerHTML = 'R$ ' + soma
    };
}

//Data de recebimento

function regra(){
    var D30 = document.getElementById('D+30')
    var D15 = document.getElementById('D+15')
    var D7 = document.getElementById('D+7')
    var D2 = document.getElementById('D+2')
    var today = new Date();
    if(D30.checked){
      document.getElementById('selectedAntecipationText').innerHTML = 'D+30'
      today.setDate(today.getDate() + 30)
    }else if(D15.checked){
      document.getElementById('selectedAntecipationText').innerHTML = 'D+15'
      today.setDate( today.getDate() + 15)
    }else if(D7.checked){
      document.getElementById('selectedAntecipationText').innerHTML = 'D+7'
      today.setDate( today.getDate() + 7)
    }else if(D2.checked){
      document.getElementById('selectedAntecipationText').innerHTML = 'D+2'
      today.setDate( today.getDate() + 2)
    }
    document.getElementById('Data').innerHTML = today.toLocaleDateString([], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  } 

  function abrir(){
    var url = "http://127.0.0.1:3031/mandarAntecipacao";
    var regra = document.getElementById('selectedAntecipationText').innerHTML
    var data_pedido = new Date().toLocaleDateString([], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    var data_recebimento = document.getElementById('Data').innerHTML
    var montante = (document.getElementById('fullValue').innerHTML).substring(3)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("popUp").style.display = "block";
        document.getElementById("bodyBlur").style.display = "block";
      }
    };
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("regra=" + regra + "&data_pedido=" + data_pedido + "&data_recebimento=" + data_recebimento + "&montante=" + montante + "&reserva_code=1");
}