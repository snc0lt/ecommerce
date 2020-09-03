const server = require('express').Router()
const { User } = require('../db.js')

server.get( "/", (req, res) => {
    User.create({
        firstName: "Admin",
        lastName: "Prueba",
        email: "hola@gmail.com",
        password: "1234Prueba",
        isAdmin: true
    }).then(() => {
        res.status(201).send("creado")
    }).catch(err => console.log( "error de usuario" + err))
} ) 

module.exports = server
