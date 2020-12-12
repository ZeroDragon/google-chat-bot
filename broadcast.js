const axios = require('axios')

const broadcastMsg = (url, text) => {
  axios({
    method: 'post',
    url,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    data: { text }
  }).then(console.log)
}

module.exports = [
  [/^broadcast$|^ayuda broadcast$/i, bot => _ => {
    bot.sendMessage([
      '*Modo de uso:*',
      'broadcast lista mensaje',
      '*ej:*',
      '```\nbroadcast reviewChannels Hola, @todos los invitamos al review de RTD a las 10am por https://meet.google.com/****\n```'
    ].join('\n'))
  }],

  [/^broadcast (.+)$/i, bot => ([, payload]) => {
    const [list, ...message] = payload.split(' ')
    const msg = message
      .join(' ')
      .replace('@todos', '<users/all>')
      .replace('@all', '<users/all>')
    bot.sendMessage(`Mandando a ${list}...`)
    const channels = process.brain.get(list) || []
    channels.forEach(channel => {
      broadcastMsg(channel, msg)
    })
  }]
]
