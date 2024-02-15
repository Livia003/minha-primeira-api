const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');
require('dotenv').config();

async function conectarBancoDeDados(){
    try {

        console.log('A conexão com o banco de dados foi iniciada.');

        await mongoose.connect(process.env.MONGO_URL);
    
        console.log('Conexão feita com sucesso!');

    } catch(erro){
        console.log(erro);
    }
   
}

module.exports = conectarBancoDeDados;