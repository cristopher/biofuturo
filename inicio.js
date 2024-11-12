import {make, the, these} from './wetrust.js';

the("inicioBtn").onclick = function(e){
    the("home").classList.remove("d-none");
    the("inicioBtn").classList.add("bg-success");
    the("listado").classList.add("d-none");
    the("listadoBtn").classList.remove("bg-success");
    the("navInicio").classList.remove("d-none")
}

the("listadoBtn").onclick = function(e){
    the("home").classList.add("d-none");
    the("inicioBtn").classList.remove("bg-success");
    the("listado").classList.remove("d-none");
    the("listadoBtn").classList.add("bg-success");
    the("navInicio").classList.add("d-none")
}