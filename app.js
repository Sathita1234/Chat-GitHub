const express = require('express')
const app = express()
const line = require('@line/bot-sdk')
const lineConfig = require('./lineConfig')

const lineMiddleware = line.middleware(lineConfig)
app.get('/', (request, response) => response.send('Server online'))
app.post('/line', lineMiddleware, require('./lineBot'))

const { WebhookClient } = require('dialogflow-fulfillment')

app.post('/dialogflow', express.json(), (req, res) => {
  const agent = new WebhookClient({ request: req, response: res })

  function welcome () {
    agent.add('Welcome to my agent!')
  }

  let intentMap = new Map()
  intentMap.set('Default Welcome Intent', welcome)
  agent.handleRequest(intentMap)
})

module.exports = app
