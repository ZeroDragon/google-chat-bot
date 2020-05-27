class Bot {
  constructor() {
    this.responses = []
  }
  setEnv(req, res) {
    this.message = req.body.message
    this.res = res
    this.processMessage()
  }
  sendMessage(message) {
    this.res.json({ text: message })
  }
  processMessage() {
    const input = this.message.argumentText.trim()
    const executed = this.responses
      .filter(r => {
        return new RegExp(r.evaluator).exec(input)
      })
    executed.forEach(r => {
        const evaluation = new RegExp(r.evaluator).exec(input)
        r.callback(evaluation, this.message)
      })
    if (executed.length === 0) {
      this.sendMessage('>.<')
    }
  }
  on(evaluator, callback) {
    this.responses.push({evaluator, callback})
  }
}

module.exports = Bot
