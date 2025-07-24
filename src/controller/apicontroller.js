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
    console.log(req)
    try{

        res.send("EVENT_RECEIVED");
    }catch(e){
        console.log(e);
        res.send("EVENT_RECEIVED");
    }
}

module.exports = {
    verificar,
    recibir
}