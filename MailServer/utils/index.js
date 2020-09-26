const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: 'ivae.store@gmail.com',
    clientId: '290048590933-08oj5or91lu4hpkbnbjs1d0gl6tcied5.apps.googleusercontent.com',
    clientSecret: 'L7LymkIW7MkeT821LZcwTZcs',
    refreshToken: '1//04qggu9z7BfDZCgYIARAAGAQSNwF-L9IrK03e5MDDcRl35vV6w2rwWQDe1Too2SFvP9T1WpIeH9u3ce7qKVOfU1mfxAMnvv2FtGA',
    accessToken: 'ya29.a0AfH6SMDUv7teUjyw6ewwR7Tm_zhEaPVEuHAF0UMPoJymULv8FP5lQ7S5hkbmVMSCFi9eBwoystgf9StjBDuEqbbn9BxmIwc4sITLz-lBsFb4VRLIdYmGIuTYHDnmkdhPHD7maWsBLWw5Cl6w3K5lysGdaN2ORHJqBvA'
  }
})

async function sendEmail(to, subject, html, user) {
  const mailOptions = {
    from: user,
    to,
    subject,
    html
  }
  return transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err)
    } else {
      console.log('email sent')
      res.send('email sent successfully..!')
    }
  });
}

module.exports = sendEmail;