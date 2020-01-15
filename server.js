const express = require('express')

const map = require ('./routes/map/index.js')
const runSpeedTest = require ('./routes/speedTest/index.js')
const blog = require ('./routes/blog/index.js')
const content = require ('./routes/content/index.js')

const app = express()
const expressWs = require('express-ws')(app)

let port = process.env.PORT || 3000

app.disable('x-powered-by')

app.options( "/*", (req, res, next ) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,HEADERS,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.sendStatus(200);
})

app.use(function(req, res, next) {
  res.header( "Access-Control-Allow-Origin", req.headers.origin )
  res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  )
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
  );
  next()
})


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html')
})


app.ws('/speedtest', runSpeedTest)

app.use ('/blog', blog)

app.listen(port)

app.use ('/map', map)
app.use ('/content', content)
