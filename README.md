![Título e Imagem de capa](https://i.imgur.com/xG74tOh.png)
# Desafio Módulo 2 - Back-end
## API de um banco digital


![Badges](https://img.shields.io/badge/STATUS-EM%20DESENVOLVIMENTO-GREEN)![Badges](https://img.shields.io/badge/ÚLTIMA%20ATUALIZAÇÃO-SETEMBRO-yellow)

![Badges](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Badges](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
## Descrição do projeto

Como desenvolvedor recém contratado da melhor empresa de tecnologia do mundo: a CUBOS. Recebi a tarefa de desenvolver uma API para um banco digital, um protótipo que será implementado ao passar do tempo.
## Funcionalidades

Foi construída uma API que tem as seguintes funcionalidades:

-   Criar conta bancária;
-   Listar contas bancárias;
-   Atualizar os dados do usuário da conta bancária;
-   Excluir uma conta bancária;
-   Depositar em uma conta bancária;
-   Sacar de uma conta bancária;
-   Transferir valores entre contas bancárias;
-   Consultar saldo da conta bancária;
-   Emitir extrato bancário.


## Pré-requisitos

![VS Code](https://img.shields.io/badge/VS%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white)
## Instalação


Primeiro deve-se *forkar* o repositório no GitHub.

Depois clone o seu repositório para sua máquina através do comando git clone.

```
git clone [endereço]
```

O enreço pode ser obtido seguindo o exemplo da imagem abaixo, primeiro clicando em no botão code (destacado em azul) e em seguida no botão para copiar o endereço (destacado em vermelho).

![imagem](https://i.imgur.com/xcFioNg.png)
<p align="center">  <i><b>FIGURA 1:</b> Obtendo o endereço SSH. </i></p>

Instale na pasta raiz do seu projeto a biblioteca express para gerenciar requisições de diferentes verbos HTTP em diferentes URLs, usando o seguinte comando no seu terminal:

```
  npm install express 
```
E para que  servidor seja reiniciado automaticamente com as novas alterações salvas, instale a biblioteca nodemon como dependência de desenvolvimento usando o seguinte comando no seu terminal:

```
npm install -D nodemon
```
Além disso precisaremos também ter o insomnia ou alguma outra ferramenta de sua preferência para poder enviar suas solicitações HTTP e também obter as suas respostas
    
## Documentação da API

Todas as solicitações usam a porta local 3000 através do endereço `localhost:3000/`

Os arquivos da API estão dividido como o padrão REST, nas seguintes pastas.

- src

  - index.js 
  - .gitignore
  - README.md
  - helpers 
    - horario.js
  - database
    - bancodedados.js
  - controllers
    - controladores.js
  - middlewares
    - intermediarios.js
  - routers
    - roteador.js
    

A seguir são mostrados os endpoints e suas funcionalidades.

### Listar todas as contas


Esse comando  serve para o gerente ou cargos administrativos do banco terem acesso as contas criadas, bem como seus saldos, senhas e transferências feitas.

```http
  GET /contas
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `string` | `quaery` | **Obrigatório**. senha do usuário para ter acesso a essa lista  |

> ***Observação:** Nas demonstrações a seguir iniciamos o aplicativo sem nenhum dado de conta armazenado, assim como seria um banco que não tem clientes.*

#### Retorna

- Exemplo 1: Banco de dados vazio
```javascript
  []
```
- Exemplo 2: Listagem com dois usuário criados:
```javascript
[
	{
		"numero": 1,
		"saldo": 0,
		"usuario": {
			"nome": "usuario",
			"cpf": "12312312355",
			"data_nascimento": "2021-03-15",
			"telefone": "71999998888",
			"email": "usuario@banco.com",
			"senha": "12345"
		}
	},
	{
		"numero": 2,
		"saldo": 0,
		"usuario": {
			"nome": "Segundo usuario",
			"cpf": "45645645688",
			"data_nascimento": "2021-03-15",
			"telefone": "71999998888",
			"email": "segundousuario@banco.com",
			"senha": "12345"
		}
	}
]
```

#### Caso a senha informada seja inválida ou esteja em branco a resposta será:

```javascript
{
	"mensagem": "A senha do banco informada é inválida!"
}
```

### Criar uma conta

Esse é o comando para a criação de uma conta para o usuário.

```http
POST /contas
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `object` | `body` | **Obrigatório**. Objeto com os dados do cliente.  |

Objeto a ser informado no body da requisição deve seguir o seguinte formato.

```javascript
{     
	"nome": "Usuario Original", 
	"cpf": "12312312355",   
	"data_nascimento": "2021-03-15",
	"telefone": "71999998888",  
	"email": "usuariooriginal@banco.com",   
	"senha": "12345"
}
```
Após requisição ser enviada as seguintes mensagens são exibidas.

> ***Observação:* O número atribuído a conta criada é feito de forma automática, sendo que cada conta tenha uma numeração única e todas as contas serão iniciadas com saldo de 0,00.**

#### Resposta bem sucedida:

<p align="center">
  <img src="https://i.imgur.com/HQxbfql.png" alt="Exemplo de resposta bem sucedida." />
</p>
<p align="center">  <i><b>FIGURA 2:</b> Exemplo de resposta bem sucedida. </i></p>




Como mostra a figura 2, o requisição não gera uma resposta ao usuário a não ser o status 201 (created).

#### Falhas na requisição:

Foram implementados alguns métodos de validação para possíveis erros que o usuário venha a cometer. A seguir são alguns são exemplificados:

- **Parâmetro em branco:**

Caso alguma das propriedades não for informada no body da requisição, a API retornará a seguinte mensagem de erro.

![erro formulário incompleto](https://i.imgur.com/yrEoEsq.png)
<p align="center">  <i><b>FIGURA 3:</b> Resposta para o preenchimento incorreto de algum dado. </i></p>

Observa-se na figura 3 que além da `{"mensagem": "Formulário incompleto!"}` tamém é retornado o status code 400 (bad request).

 - **Cadastrar CPF ou E-mail já existentes em outra conta:**

Cada usuário só pode ter uma conta dentro do banco e isso é analisado através do CPF e e-mail.

![erro cpf ou email](https://i.imgur.com/e7fqiQ2.png)
<p align="center">  <i><b>FIGURA 4:</b> Resposta para CPF ou e-mail já cadastrado em outra conta. </i></p>

A figura 4 mostra que a resposta nesse caso será ``{"mensagem": "Já existe uma conta com o cpf ou e-mail informado!`` junto com o status code 409 (conflict).

### Alterar usuário 

Esse comando permite alterar dados do usuário vinculados a uma determinada conta.

```http
PUT /contas/:numeroConta/usuario
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `numeroConta` | `param` | **Obrigatório**. Número da conta a ter as informações alteradas.  |
| `object` | `body` | **Obrigatório**. Dados que serão substituídos na conta informada.

Essa requisição é enviado no seu body o objeto contendo os dados do usuário a der utilizado, sendo o objeto no seguinte formato:

```javascript
{
	"nome": "usuario Original",
  	"cpf": "12312312355",
  	"data_nascimento": "1995-09-28",
  	"telefone": "84999123456",
  	"email": "usuariooriginal@gmail.com",
	"senha": "12345"
}
```
Após o envio da requisição, as seguintes mensages podem ser exibidas:

#### Resposta bem-sucedida

<p align="center">
  <img src="https://i.imgur.com/FLNfQBY.png" alt="Exemplo de resposta bem sucedida." />
</p>
<p align="center">  <i><b>FIGURA 5:</b> Exemplo de alteração bem sucedida. </i></p>

A figura 5 nos mostra que quando a requisição é bem sucedida a API nos retorna apenas o status code 200 (OK).

E na tabela a seguir podes ver o comando `Listar` sendo usado antes e depois da requição de alteração ser enviada.

| Antes   | Depois       | 
| :----------: | :---------: | 
|![antes](https://i.imgur.com/Jv4My33.png) | ![depois](https://i.imgur.com/zVINCsh.png)
<p align="center">  <i><b>TABELA 1:</b> Conta antes e depois das propriedades do usuário serem alteradas. </i></p>


#### Falhas na requisição:

Nossa API está preparada para tratar também alguns tipo de falhas na requisição.

 - **Parâmetro em branco:**

 Caso o usuário ofereça algum parâmetro ou até mesmo todo o formulário em branco.

<p align="center">
  <img src="https://i.imgur.com/Y5OEccG.png" alt="Exemplo de resposta bem sucedida." />
</p>
<p align="center">  <i><b>FIGURA 6:</b> Exemplo de falha por não informar algum parâmetro da requisição. </i></p>

- **Cadastrar CPF ou E-mail já existentes em outra conta:**

Como já citado, no banco de dados só pode ter uma conta vinculada ao mesmo CPF ou e-mail. A figura 7 nos mostra como é reportado esse erro bem como o seu status code.

<p align="center">
  <img src="https://i.imgur.com/iDgvX1s.png" alt="Erro por já existir o CPF e o e-mail informados viculados a outra conta." />
</p>
<p align="center">  <i><b>FIGURA 7:</b> Erro por já existir o CPF e o e-mail informados viculados a outra conta. </i></p>

- **Buscar uma conta que não existe:**

Tendo em vista que é impossível alterar os dados de uma conta que ainda não existe, a API já foi desenvolvida para nos ajudar quando esse erro ocorrer.

<p align="center">
  <img src="https://i.imgur.com/LqOaeZG.png" alt="Erro por Tentando alterar os dados de uma conta que não existe." />
</p>
<p align="center">  <i><b>FIGURA 8:</b> Tentando alterar os dados de uma conta que não existe. </i></p>

Temos, na figura 8, a exemplificação da resposta obtida ao se tentar alterar uma conta que ainda não exite, foi enviado o número 2 no parâmetro do tipo `query`. E como reposta obtivemos ``{"mensagem": "a conta informada não foi encontrada!"}`` e também o status code 404 (Not Found).

### Apagar conta

Essa funcionalidade tem por objetivo apagar uma determinada conta de usuário.

```http
 DELETE /contas/:numeroConta/usuario
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `numeroConta` | `param` | **Obrigatório**. Número da conta que será apagada.  |

Essa requisição necessita apenas de um parâmetro e não deve ser enviado nada no body da requisição.

#### Resposta bem-sucedida

<p align="center">
  <img src="https://i.imgur.com/l9qSiRi.png" alt="Resposta para requisição delete." />
</p>
<p align="center">  <i><b>FIGURA 9:</b> Resposta para requisição delete. </i></p>

Assim como na figura 9, o sistema respode a requisição apenas com o status code 200 (OK).

#### Falhas na requisição:

A seguir são mostradas alguns possíveis erros que o usuário pode cometer na sua requisição.

-  **Apagar uma conta que não exite**

<p align="center">
  <img src="https://i.imgur.com/adqd2h4.png" alt="Resposta ao tentar apagar uma conta que não existe." />
</p>
<p align="center">  <i><b>FIGURA 10:</b> Resposta ao tentar apagar uma conta que não existe.</i></p>

Antes de apagar uma conta, primeiro verifica-se se ela realmente existe no banco de dados. Em caso de não encontrada a resposta é ```{"mensagem": "a conta não foi encontrada!}``` e o status code 404 (Not Found) como mostra a figura 10.

- **Conta com saldo**

<p align="center">
  <img src="https://i.imgur.com/DfBcfv3.png" alt="Resposta ao tentar apagar uma conta que o saldo é diferente de 0." />
</p>
<p align="center">  <i><b>FIGURA 11:</b> Resposta ao tentar apagar uma conta que o saldo é diferente de 0</i></p>

A figura 11, nos mostra a resposta de quando se tenta apagar uma conta que ainda tem dinheiro. Obtemos a resposta `{"mensagem": "A conta só pode ser removida se o saldo for igual a zero!"}` e também o status code 403 (Forbidden), o correto é que se saque todo o dinheiro dessa conta e depois a apague.

### Depósito

Foi implementada também a função para realizar depósitos.

```http
 POST /transacoes/depositar
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `object` | `body` | **Obrigatório**. Objeto com os dados| 

O objeto que deverá ser enviado na requisição deve ter o seguinte formato.

```javascript
{
	"numero_conta": "1",
	"valor": "1000"
}
```

> ***Observação:** O campo valor deve ser preenchido com a quantidade de dinheiro tranformada em centavos. Exemplo: para depositar R$ 1,00, deverá ser informado 100 centavos no campo.*

#### Resposta bem-sucedida

<p align="center">
  <img src="https://i.imgur.com/5FxpCVp.png" alt="Resposta ao efetuar um depósito." />
</p>
<p align="center">  <i><b>FIGURA 12:</b> Resposta ao efetuar um depósito.</i></p>

A resposta para a requisição é um status code 200 (OK), como mostrado na figura 12.

#### Falhas na requisição

- **Parâmetro não informado:**

<p align="center">
  <img src="https://i.imgur.com/U3Gv1zH.png" alt="Resposta ao tentar enviar um depósito sem informar um parâmetro." />
</p>
<p align="center">  <i><b>FIGURA 13:</b> Resposta ao tentar enviar um depósito sem informar um parâmetro.</i></p>

Na figura 13, podemos observar que além do status code 404 (Bad Request,) temos também como resposta a mensagem ```{"mensagem": "O número da conta e o valor são obrigatórios!"}```.

> ***Obervação:** Essa será a reposta caso o valor seja preenchido com zero ou com números negativos.*

- **Depósito em conta que não existe**

<p align="center">
  <img src="https://i.imgur.com/2T5EPrb.png" alt="Resposta ao tentar enviar um depósito sem informar um parâmetro." />
</p>
<p align="center">  <i><b>FIGURA 14:</b> Resposta ao tentar fazer depósito em uma conta que ainda não existe.</i></p>

Aqui temos a figura 14, ilustrando a resposta ``{
	"mensagem": "a conta informada não foi encontrada!"
}`` junto com seu status code 404 (Not Found).

### Saque

Para a função saque o seguinte endereço será usado:

```http
POST /transacoes/sacar
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `object` | `body` | **Obrigatório**. Objeto com os dados da requisição. | 

O objeto deverá ter as seguintes propriedades.

```javascript
{
	"numero_conta": "1",
	"valor": "1000",
	"senha": "12345"
}
```
A API analisa a conta que será sacado o valor, que deverá ser informado em centavos, e a senha dessa conta.

#### Resposta bem-sucedida

<p align="center">
  <img src="https://i.imgur.com/pHb1Pax.png" alt="Resposta ao tentar enviar um depósito sem informar um parâmetro." />
</p>
<p align="center">  <i><b>FIGURA 15:</b> Resposta ao sacar.</i></p>

O saque funciona dimuindo o valor do saldo da conta informada, quando a senha é correta para acessar determinada conta. A figura 15 nos mostra como o servidor responde a essa requisição, nos mostrando o status code 200 (OK!).

#### Falhas na requisição

- **Senha incorreta**

<p align="center">
  <img src="https://i.imgur.com/hzOSCkI.png" alt="Resposta ao tentar sacar o valor de uma conta informado a senha errada." />
</p>
<p align="center">  <i><b>FIGURA 16:</b> Resposta ao tentar sacar o valor de uma conta informado a senha errada.</i></p>

Pode-se notar que a senha informada é diferente da criada junto com a conta no método `Criar conta`, e por isso a API nos retorna o status code 401 (Unauthorized) junto com ``{ "mensagem": "senha incorreta!" }``.

- **Saque de uma conta que não existe**

<p align="center">
  <img src="https://i.imgur.com/jGqSmtI.png" alt="Resposta ao tentar sacar o valor de uma conta informado a senha errada." />
</p>
<p align="center">  <i><b>FIGURA 17:</b> Resposta ao tentar sacar o valor de uma conta que não exista.</i></p>

Ao tentar sacar o valor de uma conta ainda não existente temos a resposta `{
	"mensagem": "a conta informada não foi encontrada!"
}` e seu status code 404 (Not Found).

### Transferir

É possível que seja feito uma tranferência entre contas do mesmo banco.

```http
POST /transacoes/transferir
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `object` | `body` | **Obrigatório**. Objeto com os dados da requisição. | 

O objeto deverá ter as seguintes propriedades.

```javascript
{
	"numero_conta_origem": "1",
	"numero_conta_destino": "2",
	"valor": 500,
	"senha": "12345"
}
```

#### Resposta bem-sucedida

<p align="center">
  <img src="https://i.imgur.com/achqqIH.png" alt="Resposta ao tentar sacar o valor de uma conta informado a senha errada." />
</p>
<p align="center"><i><b>FIGURA 18:</b> Resposta ao tentar sacar o valor de uma conta que não exista.</i></p>

Como obervado na figura 18, temos como reposta apenas o status code 200(OK).

#### Falhas na requisição 

- **Conta de origem ou destino não existem**

<p align="center">
  <img src="https://i.imgur.com/FMqmXbg.png" alt="Resposta ao tentar transferir valores de conta que não existe." />
</p>
<p align="center"><i><b>FIGURA 19:</b> Resposta ao tentar transferir valores de conta de origem ou destino que não existem.</i></p>

Pode-se observar que a API faz a mesma validação para descobrir se a conta de destino ou de origem existe, e com isso nos dá a resposta `{"mesagem": "A conta de destino ou origem não existe!"}` acompanhado do status code 404.

- **Senha da conta de origem incorreta**

<p align="center">
  <img src="https://i.imgur.com/6xVK9g9.png" alt="Resposta ao tentar transferir valores com a senha da conta de origem errada." />
</p>
<p align="center"><i><b>FIGURA 20:</b> Resposta ao tentar transferir valores com a senha da conta de origem errada.</i></p>

A fim de adicionar uma camada de seguraça a API confere a senha que foi informada pelo usuário com a senha que foi criada junto com a conta, caso a senha esteja incorreta será retornado `{"mensagem": "Senha incorreta!"}` como ilustra a figura 20.

- **Saldo insuficiente**

<p align="center">
  <img src="https://i.imgur.com/sD7Sa1W.png" alt="Resposta ao tentar transferir um valor maior que o disponível na conta." />
</p>
<p align="center"><i><b>FIGURA 21:</b> Resposta ao tentar transferir um valor maior que o disponível na conta.</i></p>

Caso o usuário tente transferir um valor maior que o disponível na sua conta o erro da figura 21 será retornado, evitando que usuários tentem alguma forma fraudar o saldo das contas.

> ***Observação:** Em casos onde o valor informado seja zero ou um valor negativo terão essa mesma resposta.*

### Saldo

Para a função saldo, o seguinte endereço será usado:

```http
GET /contas/saldo
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `numero_conta` | `query` | **Obrigatório**. Número da conta. | 
| `senha` | `query` | **Obrigatório**. Senha da conta

#### Resposta bem-sucedida

<p align="center">
  <img src="https://i.imgur.com/cmIAfcX.png" alt="Resposta verificar o saldo da conta." />
</p>
<p align="center"><i><b>FIGURA 22:</b> Resposta verificar o saldo da conta.</i></p>

Nesse caso a reposta é o saldo da conta 1 em centavos.

#### Falhas na requisição

- **Conta informada não existe**

<p align="center">
  <img src="https://i.imgur.com/X2nzyzq.png" alt="Resposta tentar verificar o saldo de uma conta que ainda não existe." />
</p>
<p align="center"><i><b>FIGURA 23:</b> Resposta tentar verificar o saldo de uma conta que ainda não existe.</i></p>

Como observado na figura 23 a resposta obtida para essa falha é ``{"mensagem": "A conta bancária não encontrada!"}`` e seu status code 404 (Not Found).

- **Senha incorreta**
	
<p align="center">
  <img src="https://i.imgur.com/Ru2vYmH.png" alt="Resposta tentar verificar o saldo com uma senha incorreta." />
</p>
<p align="center"><i><b>FIGURA 24:</b> Resposta tentar verificar o saldo com uma senha incorreta.</i></p>

Aqui verificamos que quando a senha informada não é a mesma da conta a resposta nos devolve o status 403 (Forbidden) junto com ``{"mensagem": "senha incorreta!"}``.

### Extrato	

Para a função extrato o seguinte endereço será usado:

```http
POST /contas/extrato
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `numero_conta` | `query` | **Obrigatório**. Número da conta. | 
| `senha` | `query` | **Obrigatório**. Senha da conta

Cada transação é armazenada com seu tipo (saque, depósito, transferência), horário e o valor. Quando se solicita o extrato de determinada conta obtem-se todas as transações que foram feitas. 

#### Resposta bem-sucedida

<p align="center">
  <img src="https://i.imgur.com/rJ2eq14.png" alt="Resposta ao verificar o extrato da conta 1." />
</p>
<p align="center"><i><b>FIGURA 25:</b> Resposta ao verificar o extrato da conta 1.</i></p>

O extrato mostra as transações divididas em depósitos, saque, transferências enviadas e transferências recebidas como ilustrado na figura 25.

#### Falhas na requisição

- **Conta não existente**

<p align="center">
  <img src="https://i.imgur.com/hGRVnQg.png" alt="Resposta ao verificar o extrato de uma conta que ainda não existe." />
</p>
<p align="center"><i><b>FIGURA 26:</b>Resposta ao verificar o extrato de uma conta que ainda não existe.</i></p>

A figura 26 ilustra o caso em que o usuário tenta acessar o extrato de uma conta que ainda não existe.

- **Senha incorreta**

<p align="center">
  <img src="https://i.imgur.com/cW6iefv.png" alt="Resposta ao verificar o extrato de uma conta com a senha incorreta" />
</p>
<p align="center"><i><b>FIGURA 27:</b>Resposta ao verificar o extrato de uma conta que ainda não existe.</i></p>

Aqui temos a figura 27 que nos mostra a resposta da API para um usuário que tentou ver o extrato, mas que errou a senha da sua conta.


Em conclusão, esta documentação da API do nosso banco digital fornece um recurso valioso para desenvolvedores que desejam integrar seus aplicativos e sistemas com nossos serviços financeiros. Ao longo deste documento, detalhamos de forma abrangente os endpoints, parâmetros e autenticação necessários para realizar operações bancárias, consultas de saldo, transferências de fundos e muito mais