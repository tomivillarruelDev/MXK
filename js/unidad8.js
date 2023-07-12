
var mostrarmenucompleto = document.getElementById('section2-contenedor-imagenes2')

function menu(){
    var edad = prompt('Para acceder a todo el menu indica tu edad')
    if(edad>=18){
        mostrarmenucompleto.style.display='flex'
    }else{
        alert('Disculpanos! Debes ser mayor de edad para poder acceder el menu completo.')
    }

}


