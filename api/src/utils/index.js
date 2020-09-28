const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.user,
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    refreshToken: process.env.refreshToken,
    accessToken: process.env.accessToken
  }
})

async function sendEmail(to, subject, html) {
  const mailOptions = {
    from: process.env.user,
    to,
    subject,
    html
  }
  return transporter.sendMail(mailOptions, (err, response) => {
    // if (err) {
    //   console.log(err)
    // } else {
    //   console.log('email sent')
    //   res.send('email sent successfully..!')
    // }
    if (err) {
      console.log(err)
      res.status(400).send({msg: 'Invalid Token, check expriration date...!'})
    } else {
      console.log('email sent')
      res.status(200).send('email sent successfully..!')
    }
  });
}

module.exports = sendEmail;