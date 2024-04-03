const nodemailer = require('nodemailer');

module.exports = {
    sendEmail: async (to, subject, body, fromEmail) => {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASS
                }
            });

            const mailOptions = {
                from: fromEmail,
                to: to,
                subject: subject,
                text: body 
            };

            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending the e-mail:', error);
            throw error;
        }
    }
}