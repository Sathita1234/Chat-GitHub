const line = require('@line/bot-sdk')
const lineConfig = require('./lineConfig')
const client = new line.Client(lineConfig)
module.exports = (request, response) => {
  return Promise.all(request.body.events.map(handleEvent))
    .then((result) => response.json(result))
    .catch(err => {
      console.error(err)
      response.status(500).end()
    })
}
function handleEvent (event) {
  if (event.type === 'message') {
    return handleMessage(event)
    
  }
  return Promise.resolve(null)
}
function handleMessage (event) {
  console.log(event)

  const reply = { type: 'text', text: 'สวัสดี' }
  client.replyMessage(event.replyToken, reply)

  
}



