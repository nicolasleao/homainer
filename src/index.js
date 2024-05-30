const express = require('express')
const { create } = require('express-handlebars')
const { getConfig } = require('./services/configuration-service')
const { loadApps } = require('./services/apps-service')
const { getApps, addApp, removeApp } = loadApps(__dirname);

const app = express()

// Set up static file serving
app.use(express.static('public'));

app.use('/scripts', express.static(__dirname + '/node_modules/'))

const hbs = create({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.get('/', async (req, res) => {
    const apps = getApps()
    res.render('index', {
        title: 'HomeLab Dashboard',
        apps,
    })
})

app.listen(getConfig('port'), () => {
    console.log(`Server is running on http://localhost:${getConfig('port')}`)
})