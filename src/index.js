const express = require('express')
const { create } = require('express-handlebars')
const { loadConfig } = require('./services/configuration-service')
const { loadApps } = require('./services/apps-service')
const router = require('./routes')

let config, apps
const bootstrap = () => {
    const app = express()
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

    config = loadConfig(__dirname)
    apps = loadApps(__dirname)

    app.use('/', router(config, apps))

    app.listen(config.get('port'), () => {
        console.log(`Server is running on http://localhost:${config.get('port')}`)
    })
}

bootstrap()