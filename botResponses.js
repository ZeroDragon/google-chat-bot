const broadcast = require('./broadcast')

module.exports = (bot) => {
  bot.on(/^ayuda$/i, ([, argument]) => {
    bot.sendMessage([
      'Bienvenido a *Inge Resuelve Bot*',
      'Puedes usar los siguientes comandos:',
      'ayuda',
      'broadcast listaDeCanales Mensaje',
      'config [get|add|remove] key value'
    ].join('\n'))
  })

  bot.on(/^config (.+)$/i, ([, params]) => {
    const [verb, key, ...values] = params.split(' ')
    const value = values.join(' ')
    if (!process.brain[verb]) return bot.sendMessage(`no sé que es: *${verb}*`)
    const response = process.brain[verb](key, value)
    bot.sendMessage([
      '```',
      JSON.stringify(response || 'Nothing to see here', false, 2),
      '```'
    ].join('\n'))
  })

  broadcast.forEach(([match, fn]) => bot.on(match, fn(bot)))
}
