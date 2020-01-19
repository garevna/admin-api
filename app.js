const express = require('express')
const path = require('path')
const logger = require('morgan')
const expressWs = require('express-ws')

/** Web Routes */
const { blog, map, mail } = require('./routes')

/** Create Express App */
const app = express()

/** WS Middlewares */
expressWs(app)

/** Middlewares */
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

/** Disable Cors */
app.options('/*', (req, res) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,HEADERS,OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
	res.sendStatus(200)
})

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', req.headers.origin)
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})


/** Set Routes */
app.use('/blog', blog)
app.use('/map', map)
app.use('/mail', mail)

/** Catch 404 and return JSON */
app.use((req, res) => res.status(404).json({ message: 'Not Found' }))

/** Error handler */
app.use((err, req, res) => {
	/** Set locals, only providing error in development */
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	/** Render the error page */
	res.status(err.status || 500)
	return res.json({ message: err.message })
})

module.exports = app
