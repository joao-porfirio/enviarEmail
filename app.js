const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 8877;

var nodemailer = require('nodemailer');

app.get('/sendEmail/:nome/:email/:telefone/:mensagem', (request, response) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'joaoporfiriocp@gmail.com',
            pass: 'Joaoporfirio@1'
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
                "mensagem": "E-mail enviado",
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