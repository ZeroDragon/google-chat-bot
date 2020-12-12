const fs = require('fs')
const path = require('path')

class Brain {
  constructor (database) {
    this.fileDB = path.join(__dirname, database)
    const fileExists = fs.existsSync(this.fileDB)
    let dbRaw
    if (fileExists) {
      dbRaw = fs.readFileSync(this.fileDB, 'UTF8') || '{}'
    } else {
      dbRaw = '{}'
    }
    this.db = JSON.parse(dbRaw)
    this.saveData()
  }

  saveData () {
    console.log('Saving Brain...')
    fs.writeFileSync(this.fileDB, JSON.stringify(this.db))
    const timer = setTimeout(() => {
      clearTimeout(timer)
      this.saveData()
    }, 6e4)
  }

  add (key, value) {
    if (!this.db[key]) this.db[key] = []
    this.db[key].push(value)
    this.db[key] = [...new Set(this.db[key])]
    return 'Ok'
  }

  remove (key, value) {
    if (!this.db[key]) return null
    this.db[key] = this.db[key].filter(itm => itm !== value)
    return 'Ok'
  }

  get (key) {
    return this.db[key]
  }
}

module.exports = Brain
