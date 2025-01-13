const pantalla = document.getElementById("pantalla");

const validaciones = {
    0: {
        regex: /^[6789][0-9]{8}$/,
        test: function(valor) {
            return this.regex.test.valor
        }
    },
    1: {
        regex: /^#[0-9]{3}$/,
        test: function(valor) {
            return this.regex.test.valor
        }
    },
    2: {
        regex: /^[6789][0-9]{8}#[0-9]{3}$/,
        test: function(valor) {
            return this.regex.test.valor
        }
    }
}

document.addEventListener("keyup", (ev) =>{
    
    ev.preventDefault();
    const {code} = ev;

    switch(code){
        case "Numpad0":
            pantalla.innerHTML += `0`
            break;
        case "Numpad1":
            pantalla.innerHTML += `1`
            break;
        case "Numpad2":
            pantalla.innerHTML += `2`
            break;
        case "Numpad3":
            pantalla.innerHTML += `3`
            break;
        case "Numpad4":
            pantalla.innerHTML += `4`
            break;
        case "Numpad5":
            pantalla.innerHTML += `5`
            break;
        case "Numpad6":
            pantalla.innerHTML += `6`
            break;
        case "Numpad7":
            pantalla.innerHTML += `7`
            break;
        case "Numpad8":
            pantalla.innerHTML += `8`
            break;
        case "Numpad9":
            pantalla.innerHTML += `9`
            break;
        case "NumpadMultiply":
            pantalla.innerHTML += `*`
            break;
        case "NumpadSubtract":
            pantalla.innerHTML += `#`
            break;
    }
})

const numero1 = document.getElementById("1").addEventListener("click", function() { pantalla.innerHTML += "1";})
const numero2 = document.getElementById(`2`).addEventListener("click", function() { pantalla.innerHTML += "2";})
const numero3 = document.getElementById(`3`).addEventListener("click", function() { pantalla.innerHTML += "3";})
const numero4 = document.getElementById(`4`).addEventListener("click", function() { pantalla.innerHTML += "4";})
const numero5 = document.getElementById(`5`).addEventListener("click", function() { pantalla.innerHTML += "5";})
const numero6 = document.getElementById(`6`).addEventListener("click", function() { pantalla.innerHTML += "6";})
const numero7 = document.getElementById(`7`).addEventListener("click", function() { pantalla.innerHTML += "7";})
const numero8 = document.getElementById(`8`).addEventListener("click", function() { pantalla.innerHTML += "8";})
const numero9 = document.getElementById(`9`).addEventListener("click", function() { pantalla.innerHTML += "9";})
const numero0 = document.getElementById(`0`).addEventListener("click", function() { pantalla.innerHTML += "0";})
const asterisco = document.getElementById(`*`).addEventListener("click", function() { pantalla.innerHTML += "*";})
const almoadilla = document.getElementById(`#`).addEventListener("click", function() { pantalla.innerHTML += "#";})
const llamada = document.getElementById(`llamada`).addEventListener("click", guardar())
const colgar = document.getElementById(`colgar`).addEventListener("click", function() { pantalla.innerHTML = '';})

function guardar(){
    if(validar(pantalla)){
    localStorage.setItem('numero', pantalla.innerHTML);
    }
}


function validar(pantalla) {
    const valor = pantalla.innerhtml;
    for(i = 0; i < 3; i++){
        const validacion = validaciones[i];
        if (validacion && validacion.test(valor)) {
            campo.classList.remove('invalido');
            campo.classList.add('valido');
            return true;
        } else {
            campo.classList.remove('valid');
            campo.classList.add('invalid');
            return false;
        }
    }
}