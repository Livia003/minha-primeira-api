const express = require("express");
const router = express.Router();

const app = express();
const porta = 3333;

const mulheres = [
    
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