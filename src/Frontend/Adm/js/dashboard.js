
function openStates(){
    if ($("#state-options")[0].style.display == "none"){
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

function quitPopup(){
    if ($("#quitPopup")[0].style.display == "none" || $("#quitPopup")[0].style.display == ""){
        $("#quitPopup")[0].style.display = "flex"
        $("#shadow")[0].style.display = "flex"
    } else{
        $("#quitPopup")[0].style.display = "none"
        $("#shadow")[0].style.display = "none"
    }
}

function getStates() {
    $.get("http://localhost:3031/stateFilter", function(resultado){
        resultado.forEach(row => {
            $("#state-options")[0].innerHTML += `<div class="state-unselected" onclick="changeStatus(this)">${row.estado}</div>`;
        });
    });
}
getStates()

function atencipationTest() {
    $.get("http://localhost:3031/antecipations?states=[]", function(resultado){
        
        $("#antecipation-value").innerHTML = resultado;
        
    });
}
atencipationTest()

function openFilter() {
    if (document.getElementById("filterPopup").style.display == "flex") {
        document.getElementById("filterPopup").style.display = "none"
    }
    else {
        document.getElementById("filterPopup").style.display = "flex"
    }
}

function changeStatus(event) {
    var value = event.parentElement.id
    console.log(value)
    if (event.className == "state-unselected")
        switch (value) {
            case "state-options":
                event.className = "state-selected"
                break
        }
    else {
        switch (value) {
            case "state-options":
                event.className = "state-unselected"
                break
        }
    }
    filter()
}

function filter() {
    var stateVector = document.getElementsByClassName("state-selected");
    var stateFiltered = [];
    for(var i = 0; i < stateVector.length; i++){
        stateFiltered.push(stateVector[i].innerText)
        
    }
    $.ajax({                    
        type: 'POST',                    
        url: api + '/userinsert',                    
        data: {stateFiltered: stateFiltered}})
    atencipationTest()
}