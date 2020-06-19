var express = require('express');
var router = express.Router();
const { json } = require('body-parser');

var users = [
    {id:1, nome:"Weslen"}
]
var match;

router.get('/', function(req, res, next) {
    res.json({
        title:"Exercicio de Requisição REST",
        data: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString('pt-BR'),
        professor:"Lucas",
        empresa:"AVMB",
        type:"Curso"
    });
});


router.get('/user/:id', function(req, res, next) {  
    try {
        for(let i=0; i < users.length; i++){
            if(users[i].id == req.params.id){
              match = users[i];
            }
          }
    
          if(match){
            res.json({
                match,
                statusCode:200,
                statusText: 'OK',
                message:"Usuário encontrado" 
            })
          }else{
              res.json({
                statusCode:200,
                statusText: "OK",
                message:"Usuário não encontrado"
              })
          }   
    } catch (error) {
        res.send(error)
    }

});

module.exports = router;
