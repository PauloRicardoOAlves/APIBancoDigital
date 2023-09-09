let { banco, contas } = require('../dataBase/bancodedados')

function senha(req, res, next) {
    const { senha_banco } = req.query

    if (senha_banco === banco.senha) {
        next()
    } else {
        res.status(401).json({
            "mensagem": "A senha do banco informada é inválida!"
        })
    }
}

function validacaoPreenchimento(req, res, next) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        res.status(400).json({ "mensagem": "Formulário incompleto!" })
    } else {
        next()
    }
}

function contaExiste(req, res, next) {
    const { numeroConta } = req.params

    const contaParaAtualizar = contas.find((conta) => {
        return conta.numero === Number(numeroConta)
    })

    if (!contaParaAtualizar) {
        return res.status(404).json({ mensagem: "a conta informada não foi encontrada!" })
    }
    next()
}

function contaExisteSaqueEDeposito(req, res, next) {
    const { numero_conta } = req.body

    const contaParaAtualizar = contas.some((conta) => {
        return conta.numero === Number(numero_conta)
    })

    if (!contaParaAtualizar) {
        return res.status(404).json({ mensagem: "a conta informada não foi encontrada!" })
    } else {
        next()
    }
}

function validacaoSenhaConta(req, res, next) {
    const { numero_conta, senha } = req.body

    const contaParaVerificar = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })

    if (contaParaVerificar.usuario.senha != senha) {
        return res.status(401).json({ mensagem: "senha incorreta!" })
    }

    next()
}

function validacaoContaTransferencia(req, res, next) {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body

    const contaOrigem = contas.find((conta) => {
        return conta.numero === Number(numero_conta_origem)
    })

    const contaDestino = contas.find((conta) => {
        return conta.numero === Number(numero_conta_destino)
    })

    if (!contaOrigem || !contaDestino) {
        return res.status(404).json({ mesagem: "A conta de destino ou origem não existe!" })
    }

    if (Number(senha) != contaOrigem.usuario.senha) {
        return res.status(403).json({ mensagem: "Senha incorreta!" })
    }

    if (valor > contaOrigem.saldo || valor <= 0) {
        return res.status(400).json({ mensagem: "Saldo insufiente!" })
    }

    next()
}

function validacaoSaldoExtrato(req, res, next) {
    const { numero_conta, senha } = req.query

    const contaParaVerificar = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })

    if (!contaParaVerificar) {
        return res.status(404).json({ mensagem: "A conta bancária não foi encontrada!" })
    }
    if (contaParaVerificar.usuario.senha != Number(senha)) {
        return res.status(403).json({ mensagem: "senha incorreta!" })
    }
    next()
}


module.exports = {
    senha,
    validacaoPreenchimento,
    contaExiste,
    contaExisteSaqueEDeposito,
    validacaoSenhaConta,
    validacaoContaTransferencia,
    validacaoSaldoExtrato
}