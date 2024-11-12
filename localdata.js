import {make, the, these} from './wetrust.js';

if (storageAvailable('localStorage')) {
    checkDatabase();
}

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
        }
}

function checkDatabase() {
    if (haveDatabase() == true) {
        checkIntegrity();
        verifyLogin();
    } else {
        makeDatabase();
    }
}

function haveDatabase() {
    if (localStorage.biofuturo != null) {
        return true;
    }
    return false;
}

function checkIntegrity() {
    let biofuturo = localStorage["biofuturo"];
    if (biofuturo){
        let db = JSON.parse(localStorage["biofuturo"]);

        let tables = ['login'];
    
        for (var j = 0; j < tables.length; j++) {
            let table = false;

            Object.keys(db).forEach(function(key) {
                if (key == tables[j]) {
                    table = true;
                }
            });
    
            if (table == false) {
                let element = JSON.parse('{"' + tables[j] + '":[]}');
                db = { ...db, ...element };
            }
        }
    
        localStorage["biofuturo"] = JSON.stringify(db);
    }
}

function makeDatabase() {
    var db = JSON.parse('{\"login\":false}');
    localStorage["biofuturo"] = JSON.stringify(db);
}

function verifyLogin() {
    let db = JSON.parse(localStorage["biofuturo"]);

    if (db.login == true){
        the("login").classList.add("d-none")
        the("inicio").classList.remove("d-none")
        the("navInicio").classList.remove("d-none")
    }
}