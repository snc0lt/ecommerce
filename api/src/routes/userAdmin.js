const server = require('express').Router()
const { User } = require('../db.js')

server.get( "/", (req, res) => {
    User.findOne({
        where: {
            email: "admin@admin.com"
        }
    }).then((userAdmin) => {
        if (userAdmin) {
            res.status(400).send('Admin ya creado')
        }
        User.create({
            firstName: "Admin",
            lastName: "Admin",
            email: "admin@admin.com",
            password: "admin123",
            isAdmin: true
        })
        .then((Admin) => {
            res.status(201).send('Admin creado exitosamente')
        })
    }).catch(err => console.log( "error de usuario" + err))
}) 

module.exports = server
