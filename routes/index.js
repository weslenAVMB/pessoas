var express = require('express');
const { json } = require('body-parser');
var router = express.Router();

var accountBalance = 100;

var list = [
  {id:2, nome:"Weslen",cpf:"038.864.890-27",saldo:500},
  {id:3, nome:"Maria",cpf:"056.862.892-00",saldo:600},
  {id:4, nome:"João",cpf:"036.689.120-58",saldo:700},
  {id:5, nome:"Jorge",cpf:"380.468.098-37",saldo:800},
  {id:6, nome:"Eduarda",cpf:"963.852.741-72",saldo:900},
]

var match;

function hasRegister(id) {
  let index = list.findIndex(i => i.id == id);
  if(index < 0) {
      console.log('Inserir')
      return false
  } else {
      //checkOne.splice(index, 1);
      console.log('Esta pessoa já possui cadastro!')
      return true
  }
}

function find(id){
  let index = list.findIndex(i => i.id == id);
  if(index >= 0){
    console.log('encontrado')
    return true
  }else{
    return false
  }
}





/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', accountBalance: accountBalance });
});*/


/* GET pessoas page. */
router.get('/', function(req, res, next) {
  res.render('pessoas', {list, title:"Lista de Usuários"});
});

router.get('/drag', function(req, res, next) {
  res.render('drag', {title:"Drag And Drop"});
});

//Route Add Pessoa
router.post('/addPerson', function(req, res) {
  try {    
    if(!hasRegister(req.body.id)){
      var person = {
        id: req.body.id_pessoa,
        nome : req.body.nome,
        cpf: req.body.cpf,
        saldo: parseFloat(req.body.saldo)
      }
      list = [...list, person]
      console.log(list)
      res.status(200).send({newList: person, message: person.nome + " Cadastrado(a) com sucesso!"})
    }else{
      res.status(400).send({message:"Pessoa Já cadastrada no sistema!"})
    }
  } catch (error) {
    res.status(400).send({message:"Não foi possível realizar o cadastro. Por favor tente mais tarde"});
  }
});

//Route Depósito Pessoa
router.post('/depPerson', function(req, res) {
  try {    
      if(find(req.body.id)){
        for(let i=0; i < list.length; i++){
          if(list[i].id == req.body.id){
            match = list[i];
          }
        }
        match.saldo += parseFloat(req.body.valor);
        res.status(200).send({match, message: "Depósito realizado com sucesso!", type:"success"})
      }else{
        res.status(400).send({message:"Conta inexistente!", type:"error"})
      }  
  } catch (error) {
    res.status(400).send({message:"Não foi possível realizar o depósito. Por favor tente mais tarde"});
  }
});

//Route Depósito Pessoa
router.post('/saquePerson', function(req, res) {
  try {    
      if(find(req.body.id)){
        for(let i=0; i < list.length; i++){
          if(list[i].id == req.body.id){
            match = list[i];
          }
        }
        match.saldo -= parseFloat(req.body.valor);
        res.status(200).send({match, message: "Saque realizado com sucesso!", type:"success"})
      }else{
        res.status(400).send({message:"Conta inexistente!", type:"error"})
      }  
  } catch (error) {
    res.status(400).send({message:"Não foi possível realizar o depósito. Por favor tente mais tarde"});
  }
});
















/* GET add deposit. */
router.get('/deposit', function(req, res) {
  try {    
    accountBalance += parseFloat(req.query.depositValue);
    console.log(accountBalance);
    
    res.status(200).send({newAccountBallance: accountBalance, message: "Depósito realizado com sucesso"});
  } catch (error) {
    res.status(400).send("Não foi possível realizar esse depósito. Por favor tente mais tarde");
  }
});


/* GET add deposit. */
router.get('/saque', function(req, res) {
  try {    

    if(req.query.saque > accountBalance){
      res.status(200).send({message:"Voce não possui saldo"})
    }else{
      accountBalance -= parseFloat(req.query.saque);
      console.log(accountBalance);
  }
    res.status(200).send({newAccountBallance: accountBalance, message: "Saque realizado com sucesso"});
  } catch (error) {
    res.status(400).send("Não foi possível realizar esse depósito. Por favor tente mais tarde");
  }
});


module.exports = router;
