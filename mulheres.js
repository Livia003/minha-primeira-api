// Importando o modulo Express, que facilita a criacao de servidores web
const express = require('express'); 

// Criando um objeto Router do Express para gerenciar rotas
const router = express.Router(); 

// Importando a funcao v4 do pacote UUID, que gera identificadores unicos universais
const { v4: uuidv4 } = require('uuid');

// Inicializando o aplicativo Express
const app = express(); 

app.use(express.json());

// Definindo a porta em que o servidor vai ouvir
const porta = 3333; 

// Array de objetos contendo informacaes sobre mulheres na tecnologia
const mulheres = [
    
    {

        id: '1',

        nome: 'Simara Conceição',
     
        imagem: 'https://bit.ly/3LJIyOF',
     
        minibio: 'Desenvolvedora e instrutora',
     
    },
     
    {

        id: '2',
     
        nome: 'Iana Chan',
     
        imagem: 'https://bit.ly/3JCXBqP',
     
        minibio: 'CEO & Founder da PrograMaria',
     
    }


]

// Funcao para lidar com a requisicao de exibicao das mulheres
function mostrarMulheres(request, response){
    response.json(mulheres); // Retorna o array de mulheres como um JSON
}

// Funcao para criar uma nova entrada de mulher no array mulheres
function criarMulher(request, response){
     // Criando um novo objeto mulher com um ID unico gerado pelo UUID e dados fornecidos na requisicao
    const novaMulher = {
        id: uuidv4(), 
        nome: request.body.nome, 
        imagem: request.body.imagem, 
        minibio: request.body.minibio
    }

    mulheres.push(novaMulher);
    response.json(mulheres);
}

function corrigirDadoMulher(request, response){
    function encontrarMulher(mulher){
        if(mulher.id == request.params.id){
            return mulher;
        }
    }

    const mulherEncontrada = mulheres.find(encontrarMulher);

    if(request.body.nome){
        mulherEncontrada.nome = request.body.nome;
    }

    if(request.body.minibio){
        mulherEncontrada.minibio = request.body.minibio;
    }

    if(request.body.imagem){
        mulherEncontrada.imagem = request.body.imagem;
    }

    response.json(mulheres);

}

function deletarMulher(request, response){
    function todasMenosEla(mulher){
        if(mulher.id !== request.params.id){
            return mulher;
        }
    }

    const mulheresQueFicam = mulheres.filter(todasMenosEla);

    response.json(mulheresQueFicam);
}

// Funcao para exibir a porta em que o servidor esta rodando
function mostrarPorta() {
    console.log("Servidor criado e rodando na porta ", porta);
}

// Configurando a rota para exibir as mulheres quando houver uma requisicao HTTP GET em /mulheres
app.use(router.get('/mulheres', mostrarMulheres)); 

// Configurando a rota para criar uma nova mulher quando houver uma requisicao HTTP POST em /mulheres
app.use(router.post('/mulheres', criarMulher));

app.use(router.patch('/mulheres/:id', corrigirDadoMulher));

app.use(router.delete('/mulheres/:id', deletarMulher));

// Iniciando o servidor Express para escutar na porta especificada e exibindo a porta no console
app.listen(porta, mostrarPorta); 