const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const MovelModel = require('../model/Movel')

/*****************************
 * GET /categorias/
 * Listar todas as categorias
 ****************************/

router.get("/", async(req, res) => {
    try{
        const moveis = await MovelModel.find()
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
       const moveis = await MovelModel.findById(req.params.id)
       res.json(moveis)
    } catch (err){
      res.status(500).send({
       errors: [{message: `Não foi possível obter o móvel com o id ${req.params.id}`}]
      })
    }
})

/*****************************
 * POST /categorias/
 * Inclui uma nova categoria
 ****************************/
const validaMovel = [
    check('nomeMovel','Nome do Móvel é obrigatório').not().isEmpty(),
    check('lugar','Informe o lugar em que o móvel será colocado!').not().isEmpty(),
    check('cor','Cor do Móvel é obrigatório').not().isEmpty(),
    check('tamanho','tamanho do Móvel é obrigatório').not().isEmpty(),
    check('valor','valor do Móvel é obrigatório').not().isEmpty().isAlphanumeric()
]

router.post('/', validaMovel,
  async(req, res)=> {
      const errors = validationResult(req)
      if(!errors.isEmpty()){
          return res.status(400).json({
              errors: errors.array()
          })
      }
      try{
         let moveis = new MovelModel(req.body)
         await moveis.save()
         res.send(moveis)
      } catch(err){
        return res.status(500).json({
            errors: [{message: `Erro ao salvar a categoria: ${err.message}`}]
        })
      }
 
  })

/*****************************
 * DELETE /categorias/:id
 * Apaga a categoria pelo id informado
 ****************************/
router.delete("/:id", async(req, res) => {
    await MovelModel.findByIdAndRemove(req.params.id)
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
router.put('/', validaMovel,
async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    let dados = req.body
    await MovelModel.findByIdAndUpdate(req.body._id, {
        $set: dados
    },{new: true})
    .then(moveis => {
        res.send({message: `Móvel ${moveis.nome} alterada com sucesso!`})
    }).catch(err => {
        return res.status(500).send({
            errors: [{
        message:`Não foi possível alterar o Móvel com o id ${req.body._id}`}]
        })
    })
})
module.exports = router