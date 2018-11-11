const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const request = require('request')
const randomWords = require('random-words')

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const url =
  'https://raw.githubusercontent.com/duckduckgo/zeroclickinfo-goodies/master/share/goodie/cheat_sheets/json/english-braille.json'

function convertBrailleFormat(braille) {
  return braille
    .charCodeAt(0)
    .toString(2)
    .split('')
    .reverse()
    .join('')
    .substring(0, 6)
}

app.get('/api/braille/list', (req, res) => {
  request(url, (error, response, body) => {
    if (error) console.log(error)
    else if (response.statusCode != 200) console.log(response)
    else {
      body = JSON.parse(body)

      // Read all braille
      let braille_list = []
      body.section_order.forEach(section => {
        braille_list = braille_list.concat(
          Object.values(body.sections[section])
        )
      })

      // Convert braille to own format
      let own_braille_list = []
      braille_list.forEach(braille => {
        if (braille.val.length === 1) {
          own_braille_list.push({
            character: braille.val,
            braille: convertBrailleFormat(braille.key)
          })
        }
      })

      res.send(own_braille_list)
    }
  })
})

app.get('/api/braille/word/random', (req, res) => {
  request(url, (error, response, body) => {
    if (error) console.log(error)
    else if (response.statusCode != 200) console.log(response)
    else {
      body = JSON.parse(body)

      // Read all braille
      let braille_list = []
      body.section_order.forEach(section => {
        braille_list = braille_list.concat(
          Object.values(body.sections[section])
        )
      })

      // Random a word and convert to braille
      let word = randomWords({ exactly: 1, maxLength: 5 })[0]
      let word_brailles = []
      word.split('').forEach(ch => {
        let braille = braille_list.find(obj => obj.val === ch)
        word_brailles.push(convertBrailleFormat(braille.key))
      })

      res.send({ word: word, brailles: word_brailles })
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
