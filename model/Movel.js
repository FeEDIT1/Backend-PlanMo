const mongoose = require('mongoose')
//Criando o schema Categoria

const MovelSchema = mongoose.Schema({
    nomeMovel: { type: String, unique:true },
    lugar: { type:String, unique:true},
    cor:{type:String, unique:true},
    tamanho:{type:String, unique:true},
    valor: {type:Number, unique:true}
 
},{timestamps:true})

module.exports = mongoose.model('movel',MovelSchema)