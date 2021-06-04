// API REST das Categorias
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Movel = require('../model/Movel')

/*****************************
 * GET /categorias/
 * Listar todas as categorias
 ****************************/

router.get("/", async(req, res) => {
    try{
        const moveis = await Movel.find()
        res.json(moveis)
    }catch (err){
        res.status(500).send({
            errors: [{message: 'Não foi possível obter os Móveis!'}]
        })
    }
})

/*****************************
 * GET /categorias/:id
 * Listar a categoria pelo id
 ****************************/
router.get('/:id', async(req, res)=>{
    try{
       const moveis = await Movel.findById(req.params.id)
       res.json(moveis)
    } catch (err){
      res.status(500).send({
       errors: [{message: `Não foi possível obter o Móvel com o id ${req.params.id}`}]
      })
    }
})

/*****************************
 * POST /categorias/
 * Inclui uma nova categoria
 ****************************/
 const validaMoveis = [
    check('movel','Nome do Movel é obrigatório').not().isEmpty(),
    check('comodo','Informe um status válido para categoria').not().isEmpty(),
    check('cor', 'Por favor, informe a cor desejada!').not().isEmpty(),
    check('valor','Por favor, insira o valor do Móvel!').not().isEmpty().isNumeric()
]

router.post('/', validaMoveis,
  async(req, res)=> {
      const errors = validationResult(req)
      if(!errors.isEmpty()){
          return res.status(400).json({
              errors: errors.array()
          })
      }
      //Verifica se a categoria já existe
      const { nome } = req.body
     
         let moveis = new Movel(req.body)
         await moveis.save()
         res.send(moveis)
     
       
     } )     
  

/*****************************
 * DELETE /categorias/:id
 * Apaga a categoria pelo id informado
 ****************************/
router.delete("/:id", async(req, res) => {
    await Movel.findByIdAndRemove(req.params.id)
    .then(moveis => {res.send(
        {message: `Móvel ${moveis.nome} removido com sucesso`}
        )
    }).catch(err => {
        return res.status(500).send(
            {errors: 
            [{message: `Não foi possível apagar o Móvel com o id ${req.params.id}`}]
            })
    })
})

/*******************************************
 * PUT /categorias
 * Altera os dados da categoria informada
 *******************************************/
router.put('/', validaMoveis,
async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    let dados = req.body
    await Movel.findByIdAndUpdate(req.body._id, {
        $set: dados
    },{new: true})
    .then(moveis => {
        res.send({message: `Móvel ${moveis.nome} alterado com sucesso!`})
    }).catch(err => {
        return res.status(500).send({
            errors: [{
        message:`Não foi possível alterar o Móvel com o id ${req.body._id}`}]
        })
    })
})


module.exports = router
