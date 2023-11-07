const nodemailer = require('nodemailer');

const { Mailer } = require('../models/models-manager');
const ApiError = require("../exceptions/ApiError");
const logger = require('../log/logger')('mail-service');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});


async function antispam(email){
    // Проверить что мейл не был отправлен недавно
    const mailer = await Mailer.findOne({ email });

    if(!mailer){
        return await new Mailer({ email }).save();
    }

    const updatedAt = new Date(mailer.updatedAt);
    const deltaTime = Date.now() - updatedAt;
    if (deltaTime < (60 * 1000)) {
        const timeLeftToSend = Math.floor(((60 * 1000) - deltaTime) / 1000);
        throw ApiError.BadRequest(`Not enough time has passed since the last letter was sent. Try again after ${timeLeftToSend} seconds`, [{timeLeftToSend: timeLeftToSend}]);
    }

    mailer.updatedAt = Date.now();
    // Обновить время последнего отправления
    await mailer.save();
}


async function sendMail({ email, subject, text, html }){
    await antispam(email);

    const mail = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject,
        text,
        html
    });

    logger.log("mail:", mail)

    return mail;
}


async function sendActivationMail(email, link){
    return await sendMail({
        email,
        subject: `DataVizSurvey: Активация аккаунта ${process.env.API_URL}`,
        text: 'Здравствуйте. Подтвердите свою электронную почту для активации аккаунта в приложении DataVizSurvey.',
        html: `
                <!DOCTYPE html>
                <html style="font-family:arial, 'helvetica neue', helvetica, sans-serif">
                <head>
                <meta charset="UTF-8">
                <meta content="width=device-width, initial-scale=1" name="viewport">
                <meta name="x-apple-disable-message-reformatting">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta content="telephone=no" name="format-detection">
                <title>Активация аккаунта</title>
                <style type="text/css">
                body {
                    width:100%;
                    padding:0;
                    margin:0;
                    font-size: 16px; /* Adjust the base font size as necessary */
                }
                .header {
                    padding: 10px; /* Reduced padding */
                    text-align: center;
                    color: #ffffff;
                    background-color: #1E262F;
                }
                .header h1 {
                    margin:0;
                    font-size: 24px; /* Larger font size for the project name */
                }
                .content {
                    padding: 20px;
                    text-align: center;
                }
                .content h2 {
                    font-weight: bold;
                    font-size: 22px; /* Larger font size for the header */
                    margin-bottom: 20px;
                }
                .content p {
                    font-size: 18px; /* Larger font size for better readability */
                    line-height: 1.6; /* Improved line spacing */
                }
                .content a {
                    background-color: #1E262F;
                    color: #ffffff;
                    padding: 20px 40px; /* Increased padding for a larger button */
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                    font-size: 20px; /* Larger font size for the button text */
                    display: inline-block; /* Ensures proper padding */
                    margin-top: 20px; /* Additional space above the button */
                }
                .footer {
                    padding: 20px;
                    text-align: center;
                    color: #ffffff;
                    background-color: #1E262F;
                    font-size: 14px; /* Smaller font size for the footer */
                }
                </style>
                </head>
                <body>
                <div class="header">
                    <h1>DataVizSurvey</h1>
                </div>
                <div class="content">
                    <h2>Активация аккаунта</h2>
                    <p>Здравствуйте,</p>
                    <p>Для активации вашего аккаунта в приложении DataVizSurvey, пожалуйста, перейдите по следующей ссылке:</p>
                    <a href="${link}" target="_blank">Активировать</a>
                    <p>Если вы не регистрировались в DataVizSurvey, пожалуйста, игнорируйте это письмо.</p>
                </div>
                <div class="footer">
                    <p>© 2023 DataVizSurvey, Астана</p>
                </div>
                </body>
                </html>
            `
    });
}






async function sendResetPasswordMail(email, link){
    return await sendMail({
        email,
        subject: `DataVizSurvey: Восстановление пароля`,
        text: 'Здравствуйте. Инструкция по установке нового пароля',
        html: `
                <!DOCTYPE html>
                <html style="font-family:arial, 'helvetica neue', helvetica, sans-serif">
                <head>
                <meta charset="UTF-8">
                <meta content="width=device-width, initial-scale=1" name="viewport">
                <meta name="x-apple-disable-message-reformatting">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta content="telephone=no" name="format-detection">
                <title>Восстановление пароля</title>
                <style type="text/css">
                body {
                    width:100%;
                    padding:0;
                    margin:0;
                    font-size: 16px; /* Adjust the base font size as necessary */
                }
                .header, .footer {
                    padding: 20px;
                    text-align: center;
                    color: #ffffff;
                    background-color: #1E262F;
                }
                .content {
                    padding: 20px;
                    text-align: center;
                }
                .content h2 {
                    font-weight: bold;
                    font-size: 22px; /* Larger font size for the header */
                    margin-bottom: 20px;
                }
                .content p {
                    font-size: 18px; /* Larger font size for better readability */
                    line-height: 1.6; /* Improved line spacing */
                }
                .content a {
                    background-color: #1E262F;
                    color: #ffffff;
                    padding: 20px 40px; /* Increased padding for a larger button */
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                    font-size: 20px; /* Larger font size for the button text */
                    display: inline-block; /* Ensures proper padding */
                    margin-top: 20px; /* Additional space above the button */
                }
                .footer p {
                    font-size: 14px; /* Smaller font size for the footer */
                }
                </style>
                </head>
                <body>
                <div class="header">
                    <h1>DataVizSurvey</h1>
                </div>
                <div class="content">
                    <h2>Восстановление пароля</h2>
                    <p>Здравствуйте,</p>
                    <p>Вы только что запросили сброс пароля для учетной записи в приложении DataVizSurvey, связанной с этим адресом электронной почты.</p>
                    <p>Нажмите на кнопку ниже, чтобы перейти на страницу сброса пароля:</p>
                    <a href="${link}" target="_blank">Сбросить пароль</a>
                    <p>Если вы не запрашивали сброс пароля, проигнорируйте это письмо.</p>
                </div>
                <div class="footer">
                    <p>© 2023 DataVizSurvey, Астана</p>
                </div>
                </body>
                </html>
            `
    });
}



module.exports = ({
    sendMail,
    sendActivationMail,
    sendResetPasswordMail,
});

// module.exports = () => new MailService();
