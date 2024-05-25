const express = require('express')
const { create } = require('express-handlebars')
const config = require('./config')
const { main: mainDb } = require('./databases')

const app = express()

// Set up static file serving
app.use(express.static('public'));

const hbs = create({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('index', {
        title: 'HomeLab Dashboard',
    })
})

app.get('/docker-test', (req, res) => {
    const { testService } = require('./services/docker-service')
    testService()
    res.send('Docker test running')
})

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`)
})