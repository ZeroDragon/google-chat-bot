const { addWeeks } = require('date-fns')
const { google } = require('googleapis')

const auth = new google.auth.GoogleAuth({
  keyFile: './google-secrets.json',
  scopes: ['https://www.googleapis.com/auth/calendar']
})

google.options(auth)

const calendar = google.calendar({ version: 'v3', auth })

const getEvents = async _ => {
  const response = await calendar.events.list({
    calendarId: process.env.CALENDAR_ID,
    timeMin: new Date().toISOString(),
    timeMax: addWeeks(new Date(), 1).toISOString(),
    singleEvents: true,
    orderBy: 'startTime'
  })
  const toBroadcast = response.data.items
    .filter(evt => {
      const epoch = new Date(evt.start.dateTime).getTime()
      const now = new Date().getTime()
      const diff = (epoch - now) / 60000
      return diff < 15
    })
    .map(evt => ({ desc: evt.description, link: evt.hangoutLink }))
  console.log(toBroadcast)
}

module.exports = {
  getEvents
}
