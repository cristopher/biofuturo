import {make, the, these} from './wetrust.js';

botonLogin
password
usuario


the("botonLogin").onclick = function(e){
    var usu = ""
    var pass =""

    e.preventDefault();

    usu = the("usuario").value;
    the("usuario").classList.remove("is-invalid");
    if (usu.length == 0) {
        make.alert('<p class="text-center">Ingrese Usuario</p>', true)
        the("usuario").classList.add("is-invalid");
        return false;
    }

    pass = the("password").value;
    the("password").classList.remove("is-invalid");
    if (pass.length == 0) {
        make.alert('<p class="text-center">Ingrese Contraseña</p>', true)
        the("password").classList.add("is-invalid");
        return false;
    }

    let datos = new FormData()
    datos.append("nombre", usu)
    datos.append("pass", pass)

    fetch("https://app.biofuturo.cl/android/login", {method: 'POST',body: datos}).then(response => response.blob())
    .then(data => {

        if (data.resultado ==  true){
            the("login").classList.add("d-none")
            the("inicio").classList.remove("d-none")
        }else{
            make.alert('<p class="text-center">No Autorizado</p>', true) 
        }

    }).catch(error => {
        make.alert('<p class="text-center">Problema de internet o servidor</p>', true) 
    })
}