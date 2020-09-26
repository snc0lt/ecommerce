const express = require('express');
const app = express();
const cors = require('cors')
const mail = require('./controler/mailer')

app.use(express.json())
app.use(cors())


app.post('/complete_buy', mail.sendBuy)
app.post('/dispatch_buy', mail.sendDespacho)
app.post('/cancel_buy', mail.sendCancel)

app.listen(4000, () => console.log('server running on server 4000'))