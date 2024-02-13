const express = require("express");
const router = express.Router();

const app = express();
const porta = 3333;

function mostrarMulher(request, response){
    response.json({
        nome: 'Lívia Rocha',
        imagem: 'https://media.licdn.com/dms/image/D4D03AQFoGQiudYM4Xw/profile-displayphoto-shrink_400_400/0/1701909327555?e=1713398400&v=beta&t=oS2hhAOetWhJAgEf90A6U1gad38X31kUyHlwdU_e0eE',
        minibio: 'Líder Regional.'
    })
}

function mostrarPorta() {
    console.log("Servidor criado e rodando na porta ", porta);
}

app.use(router.get('/mulher', mostrarMulher));
app.listen(porta, mostrarPorta);