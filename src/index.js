const express = require('express')
const { create } = require('express-handlebars')
const { loadConfigService } = require('./services/configuration-service')
const { loadAppService } = require('./services/app-service')
const { loadStatsService } = require('./services/stats-service')
const { loadDockerService } = require('./services/docker-service')
const router = require('./routes')

let config, apps, stats, docker
const bootstrap = async () => {
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

    config = loadConfigService(__dirname)
    apps = loadAppService(__dirname)
    stats = loadStatsService()
    docker = loadDockerService();

    app.use('/', router(config, apps, stats, docker))

    app.listen(config.get('port'), () => {
        console.log(`Server is running on http://localhost:${config.get('port')}`)
    })
}

bootstrap()