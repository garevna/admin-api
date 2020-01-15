const express = require('express')
const fs = require( "fs" )
const path = require('path')
const speedtest = require('speedtest-net')

let historyPath = path.join(__dirname, 'history.json')

function readHistory() {
  return new Promise (
    (resolve, reject) => 
      fs.readFile(
        historyPath, 
        "utf8", 
        (err, data) => err ? reject(err) : resolve(data)
      )
  )
}

async function saveHistory(testResults) {
  
  let history = JSON.parse(await readHistory())
  history.push({
    date: new Date().toLocaleString(),
    testResults: testResults
  })

  fs.writeFile(
    historyPath,
    JSON.stringify(history),
    err => JSON.stringify(err ? {error: err} : {ok: true})
  )
}

function formData(data) {
  return {
    client: {
      ip: data.client.ip,
      lat: data.client.lat,
      lon: data.client.lon,
      country: data.client.country,
    },
    server: {
      host: data.server.host,
      lat: data.server.lat,
      lon: data.server.lon,
      country: data.server.country,
      location: data.server.location,
      distance: [data.server.distance, data.server.distanceMi],
      ping: data.server.ping
    },
    speeds: {
      download: data.speeds.download,
      upload: data.speeds.upload,
    }
  }
}

function runSpeedTest(socket) {
  
  const speedTestInstance = speedtest({maxTime: 5000})
  
  speedTestInstance.on('downloadprogress', function(progress) {
    socket.send(JSON.stringify({downloadProgress: progress}))
  })
  speedTestInstance.on('downloadspeedprogress', speed => {
    socket.send(JSON.stringify({downloadSpeed: (speed * 125).toFixed(2) + 'KB/s' }))
  })
  
  speedTestInstance.on('uploadprogress', function(progress) {
    socket.send(JSON.stringify({uploadProgress: progress}))
  })
  
  speedTestInstance.on('uploadspeedprogress', speed => {
    socket.send(JSON.stringify({uploadSpeed: (speed * 125).toFixed(2) + 'KB/s' }))
  })
  
  speedTestInstance.on('testserver', function(server) {
    socket.send(JSON.stringify({result: server}))
    socket.send(JSON.stringify({testServer: server}))
    
  })
  
  speedTestInstance.on('data', function(data) {
    let response = formData(data)
    saveHistory({
      data: new Date().toLocaleString(),
      testResults: response
    })
    socket.send(JSON.stringify({speedTestResult: response}))
  })
}

module.exports = runSpeedTest