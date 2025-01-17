const express = require('express')
//const bodyParser = require('body-parser')
const cors = require('cors')
const KJUR = require('jsrsasign')

const app = express()
const port = 8080
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json(), cors())
app.options('*', cors())

app.post('/', (req, res) => {
  const requestBody = (req.body)
  const { role } = requestBody
  console.log('role:', role);

  const iat = Math.floor(new Date().getTime() / 1000)
  const user_id = Math.random().toString(36).substring(2)
  const user_name = user_id
  const exp = iat + 60 * 60 * 2
  const oHeader = { alg: 'HS256', typ: 'JWT' }
  const oPayload = {
    app_key: process.env.ZOOM_SDK_KEY,
    role_type: role,
    user_id,
    user_name,
    iat,
    exp
  }
  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const sdkToken = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.ZOOM_SDK_SECRET)
  console.log('sdkToken:', sdkToken);
  res.json({
    sdkToken: sdkToken
  })
})

app.listen(port, () => console.log(`Zoom Video SDK for Web Sample. port: ${port}! Open http://localhost:${port} with your browser.`))
