const { Router } = require('express')


const router = (config, apps) => {
    const r = Router()
    r.get('/', async (req, res) => {
        res.render('index', {
            title: 'HomeLab Dashboard',
            welcomeMessage: config.get('welcomeMessage'),
            apps: apps.get(),
        })
    })
    return r
}

module.exports = router