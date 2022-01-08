const express = require('express')
const app = express()
const routes = require('./services/router')

app.use(express.json())
app.use('/api', routes)
app.use((req, res, next) => {
  res.json({
    status: 'success',
    message: 'hello world'
  })
})
app.use((err, req, res, next) => {
  res.json({
    status: 'error',
    message: 'something went wrong'
  })
  if (err) console.error(err)
})


module.exports = app