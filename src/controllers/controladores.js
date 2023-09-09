const { horario } = require('../helpers/marcadorDeHora')
let { contas, saques, depositos, transferencias } = require('../dataBase/bancodedados')
let id = 1


function listarContas(req, res) {
    res.status(200).json(contas)
}

function criarConta(req, res) {

    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    const cpfExiste = contas.find((conta) => {
        return conta.usuario.cpf === cpf
    })

    const emailExiste = contas.find((conta) => {
        return conta.usuario.email === email
    })

    if (cpfExiste || emailExiste) {
        return res.status(409).json({
            "mensagem": "Já existe uma conta com o cpf ou e-mail informado!"
        })
    }

    let novoUsuario = {
        numero: id++,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }

    contas.push(novoUsuario)
    res.status(201).json()
}

function atualizarUsuario(req, res) {
    const { numeroConta } = req.params
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    const cpfExiste = contas.find((conta) => {
        return conta.usuario.cpf === cpf
    })

    const emailExiste = contas.find((conta) => {
        return conta.usuario.email === email
    })

    if (cpfExiste || emailExiste) {
        return res.status(409).json({
            "mensagem": "Já existe uma conta com o cpf ou e-mail informado!"
        })
    }

    const contaParaAtualizar = contas.find(conta => {
        return conta.numero === Number(numeroConta)
    })

    if(!contaParaAtualizar){
        return res.status(404).json({mensagem: "A conta "})
    }

    contaParaAtualizar.usuario = {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    }
    return res.status(200).json()
}

function exluirConta(req, res) {
    const { numeroConta } = req.params
    // numeroConta = Number(numeroConta)

    let contaParaApagar = contas.find((conta) => {
        return conta.numero === Number(numeroConta)
    })

    if(!contaParaApagar){
        return res.status(404).json({mensagem: "A conta não foi encontada!"})
    }

    if (contaParaApagar.saldo !== 0) {
        return res.status(403).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" })
    }

    contas = contas.filter((conta) => {
        return conta.numero !== Number(numeroConta)
    })

    res.status(200).json()
}

function depositar(req, res) {
    let { numero_conta, valor } = req.body
    numero_conta = Number(numero_conta)
    valor = Number(valor)

    if (!numero_conta || valor <= 0 || !valor) {
        return res.status(400).json({ mensagem: "O número da conta e o valor são obrigatórios!" })
    }

    const contaParaDeposito = contas.find((conta) => {
        return conta.numero === numero_conta
    })

    contaParaDeposito.saldo += valor

    const registro = {
        data: horario(),
        numero_conta,
        valor
    }

    depositos.push(registro)
    res.status(200).json()
}

function sacar(req, res) {
    let { numero_conta, valor } = req.body
    numero_conta = Number(numero_conta)
    valor = Number(valor)

    const contaParaSaque = contas.find((conta) => {
        return conta.numero === numero_conta
    })

    if (valor > contaParaSaque.saldo) {
        return res.status(400).json({ mensagem: "Saldo insuficiente!" })
    }

    contaParaSaque.saldo -= valor

    const registro = {
        data: horario(),
        numero_conta,
        valor
    }

    saques.push(registro)
    res.status(200).json()
}

function transferir(req, res) {
    let { numero_conta_origem, numero_conta_destino, valor } = req.body
    numero_conta_origem = Number(numero_conta_origem)
    numero_conta_destino = Number(numero_conta_destino)
    valor = Number(valor)

    const contaOrigem = contas.find((conta) => {
        return conta.numero === numero_conta_origem
    })

    const contaDestino = contas.find((conta) => {
        return conta.numero === numero_conta_destino
    })

    contaOrigem.saldo -= valor
    contaDestino.saldo += valor

    const registro = {
        data: horario(),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    transferencias.push(registro)
    res.status(200).json()
}

function saldo(req, res) {
    const { numero_conta } = req.query

    const contaParaVerificar = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })

    res.status(200).json({ saldo: contaParaVerificar.saldo })
}

function extrato(req, res) {
    let { numero_conta } = req.query
    numero_conta = Number(numero_conta)

    const depositosDaConta = depositos.filter((deposito) => {
        return deposito.numero_conta === numero_conta
    })

    const saquesDaConta = saques.filter((saques) => {
        return saques.numero_conta === numero_conta
    })

    const transferenciasEnviadas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_origem === numero_conta
    })

    const transferenciasRecebidas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_destino === numero_conta
    })


    res.status(200).json({
        depositos: depositosDaConta,
        saques: saquesDaConta,
        transferenciasEnviadas,
        transferenciasRecebidas
    })

}

module.exports = {
    listarContas,
    criarConta,
    atualizarUsuario,
    exluirConta,
    depositar,
    sacar,
    transferir,
    saldo,
    extrato
}