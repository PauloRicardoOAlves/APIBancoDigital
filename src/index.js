const express = require('express')
const app = express()

const rotas = require('./routers/roteador')

app.use(express.json())

app.use(rotas)

app.listen(3000)