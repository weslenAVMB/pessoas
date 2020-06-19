$(function () {

    //Vars
    const btnSalvar = $("#btn-salvar");
    const btnDep = $("#btn-dep");
    const btnSaque = $("#btn-saque-modal")

    //Events
    btnSalvar.click(addPerson);
    btnDep.click(deposito);
    btnSaque.click(saquePerson);

    //Masks
    $("#txtCpf").mask('000.000.000-00');
})

function addPerson() {
    var nome = $("#txtNome").val();
    var cpf = $("#txtCpf").val();
    var saldo = $("#txtSaldo").val();
    
    if (nome == "" || cpf == "" || saldo == "") {
        notification("error","Por favor, preencha todos os campos!")
    } else if(cpf.length < 14) {
        notification("warn","CPF inválido!")
    } else {
       console.log(saldo)
        $.ajax({
            url: '/addPerson',
            type: "POST",
            data: {
                'id_pessoa': Math.floor((Math.random() * 100) + 10),
                'nome': nome,
                'cpf': cpf,
                'saldo': saldo,
            },
            success: function (data) {
                addRow(data);
            },
            error: function (data) {
                notification('error', data.responseJSON.message);
            }
        })
    }
}

function notification(type, message){
    $("body").overhang({
        type: type,
        message: message,
        duration: 3,
        overlay:true
    });
}

function addRow(data){
    var newDataTable = `
    <tr>
        <th scope="row">${data.newList.id}</th>
        <th scope="row">${data.newList.nome}</th>
        <td>${data.newList.cpf}</td>
        <td><span class="saldo" id="${data.newList.id}">R$ ${data.newList.saldo}</span></>
    </tr>
    `
    notification('success', data.message);
    $("table").append(newDataTable);
    $('#form-add-person')[0].reset();
    $('.modal').modal('hide');
}


function deposito(){
    var conta = $("#conta-dep").val();
    var valor = $("#valor-dep").val();

    if (conta == "" || valor == "") {
        notification("error","Por favor, preencha todos os campos!")
    } else if(valor <= 0 ){
        notification("error","O valor precisa ser maior que zero")
    } else {
        $.ajax({
            url: '/depPerson',
            type: "POST",
            data: {
                'id': conta,
                'valor': valor,
            },
            success: function (data) {                
                let spanSaldo;
                if(data.match){
                    for(let i=0; i < $('.saldo').length; i++){
                        if($('.saldo')[i].getAttribute("id") == data.match.id){
                            spanSaldo = $('.saldo')[i];        
                        }
                    }
                    spanSaldo.innerText = 'R$ ' + data.match.saldo
                    notification(data.type, data.message)
                    $('#form-deposito')[0].reset();
                    $('.modal').modal('hide');
                }else{
                    notification(data.type, data.message)
                }

            },
            error: function (data) {
                notification('error', data.responseJSON.message);
            }
        })
    }

}

function saquePerson(){
    var conta = $("#conta-saque").val();
    var valor = $("#valor-saque").val();

    if (conta == "" || valor == "") {
        notification("error","Por favor, preencha todos os campos!")
    } else if(valor <= 0 ){
        notification("error","O valor precisa ser maior que zero")
    } else {
        $.ajax({
            url: '/saquePerson',
            type: "POST",
            data: {
                'id': conta,
                'valor': valor,
            },
            success: function (data) {                
                let spanSaldo;
                if(data.match){
                    for(let i=0; i < $('.saldo').length; i++){
                        if($('.saldo')[i].getAttribute("id") == data.match.id){
                            spanSaldo = $('.saldo')[i];        
                        }
                    }
                    spanSaldo.innerText = 'R$ ' + data.match.saldo
                    notification(data.type, data.message)
                    $('#form-deposito')[0].reset();
                    $('.modal').modal('hide');
                }else{
                    notification(data.type, data.message)
                }

            },
            error: function (data) {
                notification('error', data.responseJSON.message);
            }
        })
    }    
}
