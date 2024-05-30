const { Router } = require('express')


const router = (config, apps, stats) => {
    const r = Router()
    r.get('/', async (req, res) => {
        res.render('index', {
            title: 'HomeLab Dashboard',
            welcomeMessage: config.get('welcomeMessage'),
            searchMessage: config.get('searchMessage'),
            showToolbar: config.get('showToolbar'),
            cssVersion: config.get('cssVersion'),
            apps: apps.get(),
            memory: await stats.memory(),
        })
    })
    return r
}

module.exports = router