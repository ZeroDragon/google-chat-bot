const addZ = i => `00${i}`.slice(-2)
const weekly = []
module.exports = (bot) => {
  bot.on(/^ayuda$/i, _ => {
    bot.sendMessage([
      'Bienvenido a *Zero Bot*',
      'Pronto seré tu asistente personal',
      'Puedes usar los siguientes comandos:',
      'ayuda',
      'weekly'
    ].join('\n'))
  })
  bot.on(/^weekly$/i, (matched, message) => {
    let t = new Date()
    t = `${t.getFullYear()}-${addZ(t.getMonth() + 1)}-${addZ(t.getDate())}`
    console.log(message)
    bot.sendMessage([
      `Ok iniciemos el weekly para la semana del ${t}`,
      'Cuando termines, solo escribe /listo'
    ].join('\n'))
  })
  bot.on(/\+(.*)|\+ (.*)/i, matched => {
    weekly.push(matched[1])
    bot.sendMessage('aha, que más? si ya terminaste solo escribe /listo')
  })
  bot.on(/\/listo/i, matched => {
    bot.sendMessage([
      'Ok esto es lo que tengo del weekly:',
      ...weekly
    ].join('\n'))
  })
}
