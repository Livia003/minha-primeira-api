const express = require("express");
const router = express.Router();

const app = express();
const porta = 3333;

const mulheres = [
    {
        nome: 'Lívia Rocha',

        imagem: 'https://media.licdn.com/dms/image/D4D03AQFoGQiudYM4Xw/profile-displayphoto-shrink_400_400/0/1701909327555?e=1713398400&v=beta&t=oS2hhAOetWhJAgEf90A6U1gad38X31kUyHlwdU_e0eE',

        minibio: 'Líder Regional.'
    },
    
    {

        nome: 'Simara Conceição',
     
        imagem: 'https://bit.ly/3LJIyOF',
     
        minibio: 'Desenvolvedora e instrutora',
     
    },
     
    {
     
        nome: 'Iana Chan',
     
        imagem: 'https://bit.ly/3JCXBqP',
     
        minibio: 'CEO & Founder da PrograMaria',
     
    }


]

function mostrarMulheres(request, response){
    response.json(mulheres);
}

function mostrarPorta() {
    console.log("Servidor criado e rodando na porta ", porta);
}

app.use(router.get('/mulheres', mostrarMulheres));
app.listen(porta, mostrarPorta);