const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes/index.js')
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
var passport = require('passport')
var Strategy = require('passport-local').Strategy
var db = require('./db.js')
const bcrypt = require('bcrypt')

const server = express()
server.name = 'API'

passport.use(
	new Strategy(function (username, password, done) {
		db.User.findOne({
			where: { email: username },
		}).then((user) => {
			if (!user) {
				return done(null, false)
			}
			bcrypt.compare(password, user.password).then((res) => {
				if (res) {
					console.log('la comparacion fue verdadera!! se hace login')
					return done(null, user)
				} else {
					console.log('la comparacion es erronea!! no hay login')
					return done(null, false)
				}
			})
		})
	})
)

passport.serializeUser(function (user, done) {
	done(null, user.id)
})

passport.deserializeUser(function (id, done) {
	db.User.findByPk(id)
		.then((user) => {
			done(null, user)
		})
		.catch((err) => {
			return done(err)
		})
})

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
server.use(bodyParser.json({ limit: '50mb' }))
server.use(cookieParser())
server.use(morgan('dev'))
server.use(
	require('express-session')({
		secret: 'secret',
		resave: false,
		saveUninitialized: false,
	})
)
server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000') // update to match the domain you will make the request from
	res.header('Access-Control-Allow-Credentials', 'true')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	res.header(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, DELETE'
	)
	next()
})
server.use(passport.initialize())
server.use(passport.session())

server.use((req, res, next) => {
	console.log(req.session)
	console.log(req.user)
	next()
})

const storage = multer.diskStorage({
	destination: path.join(__dirname, '../public/images'),
	filename: (req, file, cb) => {
		cb(null, uuidv4() + path.extname(file.originalname).toLowerCase())
	},
})
const upload = multer({
	storage,
	limits: { fileSize: 2000000 },
	fileFilter: (req, file, cb) => {
		const fileTypes = /jpeg|jpg|png|PNG/
		const mimeType = fileTypes.test(file.mimetype)
		const extName = fileTypes.test(path.extname(file.originalname))
		if (mimeType && extName) {
			return cb(null, true)
		}
		cb('Error: debe subir un archivo valido')
	},
}).array('images')

server.use(upload)

server.use('/', routes)

server.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (err) {
            return res.status(500).json({
				errot: true,
				message: err
			})

        }
        if (!user) {
            return res.status(401).json({
				error: true,
				message: 'usuario o password no valido'
			})
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err)
            }
            return res.json({
				success: true,
				message: 'Login correcto',
				user
			})
        })
    })(req, res, next)
})

server.get('/logout', function (req, res) {
	req.logout()
	res.send('Te desconectaste, capo!')
})

function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		next()
	} else {
		res.send('error!!!!')
	}
}

server.get('/profile', isAuthenticated, function (req, res) {
	res.send('Perfil')
})

server.use(express.static(path.join(__dirname, '../public')))
// Error catching endware.
server.use((err, req, res, next) => {
	// eslint-disable-line no-unused-vars
	const status = err.status || 500
	const message = err.message || err
	console.error(err)
	res.status(status).send(message)
})

module.exports = server
