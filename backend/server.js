const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 8081
const routes = require('./routes')
const uploadConfig = require('./config/upload')

app.use(express.json())
app.use(cors())
app.use('/files', express.static(uploadConfig.directory))
app.use('/', routes)

app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
})
