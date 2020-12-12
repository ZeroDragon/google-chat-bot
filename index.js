const config = process.env
const express = require('express')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const Bot = require('./bot')
const botResponses = require('./botResponses')
const Brain = require('./brain')
const app = express()
const bot = new Bot()

process.brain = new Brain('data.db')

const gAuth = async (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth) return res.sendStatus(401)
  const jwToken = auth.split(' ')[1]
  const { header, payload } = jwt.decode(jwToken, { complete: true })
  const cert = await axios.get(`${config.GOOGLE_SERVICE_URL}${payload.iss}`)
    .then(({ data }) => data[header.kid])
    .catch(_ => null)
  const { aud } = jwt.verify(jwToken, cert)
  if (aud !== config.GOOGLE_AUDIENCE) {
    return res.sendStatus(401)
  }
  next()
}

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Bot online :)')
})

app.post('/', gAuth, (req, res) => {
  if (!req.body.message) return res.send('noop')
  bot.setEnv(req, res)
})

app.listen(1337, () => {
  botResponses(bot)
  console.log('Bot online')
})
