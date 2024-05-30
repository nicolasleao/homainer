const config = require('../config/config')

const getConfig = (key) => {
    if (config[key] === undefined) return null
    return config[key]
}

module.exports = {
    getConfig
}