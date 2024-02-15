// Importando o modulo Express, que facilita a criacao de servidores web
const express = require('express'); 

// Criando um objeto Router do Express para gerenciar rotas
const router = express.Router(); 

const cors = require('cors');

const conectarBancoDeDados = require('./bancoDeDados');
conectarBancoDeDados();

const Mulher = require('./mulherModel');

// Inicializando o aplicativo Express
const app = express(); 

app.use(express.json());

app.use(cors());

// Definindo a porta em que o servidor vai ouvir
const porta = 3333; 

// Funcao para lidar com a requisicao de exibicao das mulheres
async function mostrarMulheres(request, response){
    try {
        const mulheresVindasDoBancoDeDados =  await Mulher.find();
        response.json(mulheresVindasDoBancoDeDados);
    } catch(erro){
        console.log(erro);
    }
}

// Funcao para criar uma nova entrada de mulher no array mulheres
async function criarMulher(request, response){
     // Criando um novo objeto mulher com um ID unico gerado pelo UUID e dados fornecidos na requisicao
    const novaMulher = new Mulher ({
       
        nome: request.body.nome, 
        imagem: request.body.imagem, 
        minibio: request.body.minibio,
        citacao: request.body.citacao

    })

    try {
        const mulherCriada = await novaMulher.save();
        response.status(201).json(mulherCriada);
    }catch (erro){
        console.log(erro);
    }
}

async function corrigirDadoMulher(request, response){
    
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id);

        if(request.body.nome){
            mulherEncontrada.nome = request.body.nome;
        }
    
        if(request.body.minibio){
            mulherEncontrada.minibio = request.body.minibio;
        }
    
        if(request.body.imagem){
            mulherEncontrada.imagem = request.body.imagem;
        }

        if(request.body.citacao){
            mulherEncontrada.citacao = request.body.citacao;
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save();
        response.json(mulherAtualizadaNoBancoDeDados);

    } catch (erro){
        console.log(erro);
    }

}

async function deletarMulher(request, response){
    try {
        await Mulher.findByIdAndDelete(request.params.id);
        response.json({messagem: 'Mulher deletada com sucesso!'});
    } catch (erro){
        console.log(erro);
    }
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