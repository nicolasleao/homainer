const { readFileSync, writeFileSync } = require('fs')

const loadApps = (basepath) => {
    const apps = JSON.parse(readFileSync(`${basepath}/config/apps-list.json`))

    const get = () => {
        return apps
    }

    const add = (app) => {
        apps.push(app)
        writeFileSync(`${__dirname}/config/apps-list.json`, JSON.stringify(apps, null, 2))
    }

    const remove = (appName) => {
        const appIndex = apps.findIndex(app => app.name === appName)
        apps.splice(appIndex, 1)
        writeFileSync(`${__dirname}/config/apps-list.json`, JSON.stringify(apps, null, 2))
    }

    return {
        get,
        add,
        remove
    }
}

module.exports = {
    loadApps
}