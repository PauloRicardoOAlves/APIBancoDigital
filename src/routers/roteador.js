const { Router } = require('express')
const rotas = Router()
const controlador = require('../controllers/controladores')
const intermediarios = require('../middlewares/intermediarios')

rotas.get('/contas', intermediarios.senha, controlador.listarContas)
rotas.post('/contas', intermediarios.validacaoPreenchimento, controlador.criarConta)
rotas.put('/contas/:numeroConta/usuario', intermediarios.validacaoPreenchimento, intermediarios.contaExiste, controlador.atualizarUsuario)
rotas.delete('/contas/:numeroConta', intermediarios.contaExiste, controlador.exluirConta)
rotas.post('/transacoes/depositar', intermediarios.contaExisteSaqueEDeposito, controlador.depositar)
rotas.post('/transacoes/sacar', intermediarios.contaExisteSaqueEDeposito, intermediarios.validacaoSenhaConta, controlador.sacar)
rotas.post('/transacoes/transferir', intermediarios.validacaoContaTransferencia, controlador.transferir)
rotas.get('/contas/saldo', intermediarios.validacaoSaldoExtrato, controlador.saldo)
rotas.post('/contas/extrato', intermediarios.validacaoSaldoExtrato, controlador.extrato)

module.exports = rotas