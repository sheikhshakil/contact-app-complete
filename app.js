const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const contactRoute = require('./contactRouter')

const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/contacts', contactRoute);

app.get('*', (req, res) => {
    res.render('common.ejs')
})


const PORT = process.env.PORT || 8080

//connect db
mongoose.connect('mongodb://localhost:27017/contacts', {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            app.listen(PORT, () => {
                console.log('Server Started')
            })
        })
        .catch(e => {
            console.log(e)
        })