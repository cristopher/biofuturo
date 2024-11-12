import {make, the, these} from './wetrust.js';

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

    fetch("https://app.biofuturo.cl/android/login", {method: 'POST',body: datos}).then(response => response.json())
    .then(data => {

        if (data.resultado ==  true){
            the("login").classList.add("d-none")
            the("inicio").classList.remove("d-none")
            the("navInicio").classList.remove("d-none")

            let db = JSON.parse(localStorage["biofuturo"]);

            db.login = true

            localStorage["biofuturo"] = JSON.stringify(db);
        }else{
            make.alert('<p class="text-center">No Autorizado</p>', true) 
        }

    }).catch(error => {
        make.alert('<p class="text-center">Problema de internet o servidor</p>', true) 
    })
}


the("botonLogout").onclick = function(e){
    let db = JSON.parse(localStorage["biofuturo"]);

    db.login = false
    localStorage["biofuturo"] = JSON.stringify(db);

    the("login").classList.remove("d-none")
    the("inicio").classList.add("d-none")
    the("navInicio").classList.add("d-none")
}