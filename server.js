const express = require('express')
const routes = require('./routes')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.use(routes)

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
})

// TO DEPLOY TO HEROKU
// 1. in the terminal "heroku login" press enter, log in with popup window
// 2. create a new app in heroku
// 3. copy git remote link from herokus deploy page
// 4. paste in terminal and press enter
// 5. git add . || git commit -m "v1" || git push  heroku main
// 6. all doneb 