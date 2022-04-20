require("dotenv").config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
 
const PORT = process.env.PORT || 8877;

var nodemailer = require('nodemailer');

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASSWORD;

app.get('/', (request, response) => {
	return response.send(
		"<body>" +
            "<h1 style='text-align: center'>" + "Rota (POST) disponível:" + "</h1>" +
            "<p>/sendEmail/parametros</p>"+
            "<span><b>Exemplo: <b> http://localhost:8877/sendEmail/pedrito/pedrito@yahoo.com.br/11%209998876-4462/Oi,%20gostaria%20de%20lorem%20ipusum%20lorem%20ipusumlorem%20ipusumlorem%20ipusumlorem%20ipusumlorem%20ipusumlorem%20ipusumlorem%20ipusumlorem%20ipusumlorem%20ipusumlorem%20ipusumlorem%20ipusum</span>"+
		"</body>"
	);
})


app.post('/sendEmail/:nome/:email/:telefone/:mensagem', (request, response) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${emailUser}`,
            pass: `${emailPass}`
        }
    });

    let dadosRequisicao = {
        nome: request.params.nome,
        telefone: request.params.telefone,
        emailContato: request.params.email,
        mensagem: request.params.mensagem,
    }

    function setHorario() {
        function addZero(i) {
            if (i < 10) { i = "0" + i }
            return i;
        }

        const data = new Date();
        return data.toLocaleDateString('pt-br', { timeZone: 'UTC' }) + " às " + addZero(data.getHours()) + ":" + addZero(data.getMinutes());
    }

    var mailOptions = {
        from: `${dadosRequisicao.emailContato}`,
        to: `joaoporfiriocp@gmail.com`,
        subject: `E-mail enviado por ${dadosRequisicao.nome}`,
        html: `
            <h3>Nome do Usuário:</h3>&nbsp;<span>${dadosRequisicao.nome}</span>
            \n
            <h3>E-mail do Usuário:</h3>&nbsp;<span>${dadosRequisicao.emailContato}</span>
            \n
            <h3>Telefone para contato:</h3>&nbsp;<span>${dadosRequisicao.telefone}</span>
            <br/>
            <p>
                ${dadosRequisicao.mensagem} 
            </p>
            <h4>E-mail enviado em ${setHorario()}</h4>
            <br/>
            <br/>
            <span 
                style='
                    font-style: italic;
                    font-size: 12px;
                '
            >
                Envio de E-mails por João Porfirio © 
            </span>
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (!error) {
            return response.json({
                "mensagem": "E-mail enviado com sucesso!",
                "code": "200"
            });
        } else {
            return response.json({
                "mensagem": "Erro ao enviar o e-mail! Por favor, consulte o administrador do site.",
                "code": "500"
            });
        }
    });
})

app.listen(PORT, () => {
})