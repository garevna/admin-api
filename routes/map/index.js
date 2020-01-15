const express = require('express')
const Promise = require('promise')
const async = require('async')
const path = require('path')
const fs = require('fs')

const router = express.Router()

const bodyParser = require('body-parser')

router.use(bodyParser.json())

const readFile = require ('../readFile.js')

function errorHandler(err, res) {
  console.log(err)
  res.json({ error: err })
}

router.get('/markers', function(req, res) {
  readFile (__dirname, '/markers.json')
    .then (json => res.send(json))
      .catch (err => errorHandler(err, res))
})
router.get('/polygons', function(req, res) {
  readFile (__dirname, '/polygons.json')
    .then (json => res.send(json))
      .catch (err => errorHandler(err, res))
})
router.get('/points', function(req, res) {
  readFile (__dirname, '/points.json')
    .then (json => res.send(json))
      .catch (err => errorHandler(err, res))
})

module.exports = router