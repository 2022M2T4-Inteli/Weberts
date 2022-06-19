function abrir(){

    document.getElementById("popUp").style.display = "block";
    document.getElementById("container").style.filter = "blur(10px) brightness(90%)";
    document.getElementById("header").style.filter = "blur(10px) brightness(90%)";
   
}

function fechar(){

    document.getElementById("popUp").style.display = "none";
    document.getElementById("container").style.filter = "none";
    document.getElementById("header").style.filter = "none";

}