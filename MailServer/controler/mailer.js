const ejs = require('ejs');
const path = require('path');
const sendEmail = require('../utils');

const buyTemplate = path.join(__dirname, '../template/buy.ejs');
const cancelTemplate = path.join(__dirname, '../template/cancel.ejs');
const despachoTemplate = path.join(__dirname, '../template/despacho.ejs');


class Mailer {
    async sendBuy (req, res) {
        const { body: { to, subject, products, user } } = req;
        let emailResult = null;
        try {
            const emailData = { to, subject, products, user };
            const html = await ejs.renderFile(buyTemplate, emailData);
            emailResult = await sendEmail(to, subject, html, 'ivae.store@gmail.com');
        } catch (err) {
            console.error(err);
        }
        res.status(200).send(emailResult);
    }
    async sendCancel (req, res) {
        const { body: { to, subject, user, id } } = req;
        let emailResult = null;
        try {
            const emailData = { to, subject, user, id };
            const html = await ejs.renderFile(cancelTemplate, emailData);
            emailResult = await sendEmail(to, subject, html, 'ivae.store@gmail.com');
        } catch (err) {
            console.error(err);
        }
        res.status(200).send(emailResult);
    }
    async sendDespacho (req, res) {
        const { body: { to, subject, user, id } } = req;
        let emailResult = null;
        try {
            const emailData = { to, subject, user, id };
            const html = await ejs.renderFile(despachoTemplate, emailData);
            emailResult = await sendEmail(to, subject, html, 'ivae.store@gmail.com');
        } catch (err) {
            console.error(err);
        }
        res.status(200).send(emailResult);
    }
}

module.exports = new Mailer();