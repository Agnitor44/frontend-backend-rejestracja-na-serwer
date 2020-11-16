
const express = require('express')
const fs = require('fs')
const app = express()

const data = fs.readFileSync('server.json')
const rejestr = JSON.parse(data)

const port = 5000
app.use(express.static('public'))
app.use(express.json())

app.post('/', (req, res) => {

  const newArray = [...rejestr, req.body]
  const newJson = JSON.stringify(newArray)
  fs.writeFileSync('server.json', newJson)
  res.end()
})
app.post('/passChange/hiddenRouteXD', (req, res) => {
  const newPass = req.body.pass
  const id = req.body.id
  const rej = [...rejestr]
  rej[id].pass = newPass
  const newJson = JSON.stringify(rej)
  fs.writeFileSync('server.json', newJson)
  res.end()
})
app.post('/ChangeEmail/hiddenRouteXD', (req, res) => {
 
  const newEmail = req.body.email
  const id = req.body.id
  const rej = [...rejestr]
  rej[id].email = newEmail
  const newJson = JSON.stringify(rej)
  fs.writeFileSync('server.json', newJson)
  res.end()
})
app.post('/api/delete', (req, res) => {
  const id = rejestr.findIndex(item => item.email === req.body.email)
  const rejNowy = [...rejestr]
 rejNowy.splice(id, 1)
  const newJson = JSON.stringify(rejNowy)
  console.log(newJson)
  fs.writeFileSync('server.json', newJson)
  res.end()
})
app.get('/api/registered', (req, res) => {
    res.json(rejestr)
    res.end()
})

app.listen(port, () => {console.log("server słucha i rozumiee")})