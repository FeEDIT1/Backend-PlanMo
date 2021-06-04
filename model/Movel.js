const mongoose = require('mongoose')
//Criando o schema Categoria

const MovelSchema = mongoose.Schema({
    movel: { type: String, unique:true },
    comodo: { type:String, unique:true},
    cor:{type:String, unique:true},
    tamanho:{type:String, unique:true},
    valor: {type:Number, unique:true}
 
},{timestamps:true})

module.exports = mongoose.model('moveis',MovelSchema)