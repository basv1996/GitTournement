require('dotenv').config()
const express = require('express')
const indexRoute = require('./routes/index')
const app = express()
const commitsRoute = require('./routes/commits')
const reposRoute = require('./routes/repos')

const PORT = process.env.PORT || 8000

module.exports = 
  app.set('view engine', 'ejs')
  app.set('views', './views')

  app.use(express.static('./public'))

  app.use('/', indexRoute)
  app.use('/commits', commitsRoute)
  app.use('/repos', reposRoute)

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
  