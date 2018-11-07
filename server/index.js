const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/hello', (req, res) => {
  res.send({ message: 'Hello from server' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
