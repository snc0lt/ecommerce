const server = require('express').Router()
const { User } = require('../db.js')

server.get( "/", (req, res) => {
    User.create({
        firstName: "Admin",
        lastName: "Admin",
        email: "admin@admin.com",
        password: "admin123",
        isAdmin: true
    }).then((userAdmin) => {
        res.status(201).send(userAdmin)
    }).catch(err => console.log( "error de usuario" + err))
} ) 

module.exports = server
