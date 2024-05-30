const { readFileSync, writeFileSync } = require('fs')

const loadConfig = (basepath) => {
    const config = JSON.parse(readFileSync(`${basepath}/config/config.json`))

    const get = (key) => {
        if (config[key] === undefined) return null
        return config[key]
    }

    const set = (key, value) => {
        config[key] = value
        writeFileSync(`${__dirname}/config/config.json`, JSON.stringify(config, null, 2))
    }

    return {
        get,
        set
    }
}


module.exports = {
    loadConfig
}