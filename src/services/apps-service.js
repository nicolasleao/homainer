const { readFileSync, writeFileSync } = require('fs')

const loadApps = (basepath) => {
    const apps = JSON.parse(readFileSync(`${basepath}/config/apps-list.json`))

    const getApps = () => {
        return apps
    }

    const addApp = (app) => {
        apps.push(app)
        writeFileSync(`${__dirname}/config/apps-list.json`, JSON.stringify(apps, null, 2))
    }

    const removeApp = (appName) => {
        const appIndex = apps.findIndex(app => app.name === appName)
        apps.splice(appIndex, 1)
        writeFileSync(`${__dirname}/config/apps-list.json`, JSON.stringify(apps, null, 2))
    }

    return {
        getApps,
        addApp,
        removeApp
    }
}

module.exports = {
    loadApps
}