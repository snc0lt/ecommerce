const server = require('express').Router()

server.post('/', (req, res) => {
const names = req.files.map((img) => img.filename)
console.log(names);
res.send(JSON.stringify(names))

})

module.exports = server
