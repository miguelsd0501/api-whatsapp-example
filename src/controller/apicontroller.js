const enviarmensaje = require("../service/apiservice");
const verificar = (req, res) => {

    try{
        // un token que se genera de lado de mi sistema y que a prior se comparte con Meta
        var tokenandercode = "misupertokenvende";
        var token = req.query["hub.verify_token"]; // meta manda ese token en este parámetro
        var challenge = req.query["hub.challenge"];
        // se valida que el token compartido sea el correcto
        if (challenge != null && token != null && token == tokenandercode){
            res.send(challenge);
        }else{
            res.status(400).send();
        }

    }catch(e){
        res.status(400).send();
    }

}

const recibir = (req, res) => {
    try{
        var entry = (req.body["entry"])[0];
        var changes = (entry["changes"])[0];
        var value = changes["value"];
        var objetoMensaje = value["messages"];
        if (typeof objetoMensaje != "undefined"){
            var messages = objetoMensaje[0];
            var texto = messages["text"]["body"];
            var numero = messages["from"];
            console.log('Enviado desde: ' + numero)
            console.log('Body: ' + texto)
            numero = cleanNumber(numero);
            enviarmensaje.EnviarMensajeWhastpapp(texto,numero);
        } else {
            console.log('Mensaje undefinido:');
            console.log(value)
            var statuses = value["statuses"];
            console.log(statuses)
        }

        res.send("EVENT_RECEIVED");
    }catch(e){
        console.log(e);
        res.send("EVENT_RECEIVED");
    }
}

const cleanNumber = (number) => {
    if (number.length > 12) {
        return number.slice(0, 2) + number.slice(3);
    }

    return number;
}

module.exports = {
    verificar,
    recibir
}