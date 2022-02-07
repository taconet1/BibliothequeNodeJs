'use strict';

const nodemailer = require('nodemailer');

const { Service } = require('@hapipal/schmervice');

module.exports = class MailerService extends Service {
    async getTransporter() {
        const env = process.env;
        const testAccount = await nodemailer.createTestAccount();

        return nodemailer.createTransport({
            host: env.NODEMAILER_HOST,
            port: env.NODEMAILER_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass // generated ethereal password
            }
        });
    }

    async send(email) {
        const transporter = await this.getTransporter();
        const info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: email, // list of receivers
            subject: 'Welcome ✔', // Subject line
            text: 'Welcome to our library!', // plain text body
            html: '<b>Welcome to our library!</b>' // html body
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    async sendNotificationNewMovie(email) {
        const transporter = await this.getTransporter();
        const info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            bcc: email, // list of receivers
            subject: 'New Movie ✔', // Subject line
            text: 'Watch the movie with us!', // plain text body
            html: '<b>Watch the movie with us!</b>' // html body
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
};
