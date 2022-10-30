const express = require('express')
const app = express()
const port = 3000

app.use(express.static('data'))

app.listen(port, () => {
  console.log(`Data host listening on port ${port}`)
})