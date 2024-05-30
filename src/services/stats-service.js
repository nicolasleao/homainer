
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const loadStatsService = () => {
    
    const memory = async () => {
        const rawMemTotal = await exec('cat /proc/meminfo | grep MemTotal')
        const total = rawMemTotal.stdout.substring(10).trim()
        const rawMemFree = await exec('cat /proc/meminfo | grep MemFree')
        const free = rawMemFree.stdout.substring(10).trim()
        return {
            total: formatBytes(Number(total.substring(0, total.length - 3)) * 1024),
            free: formatBytes(Number(free.substring(0, free.length - 3)) * 1024),
            used: formatBytes(
                    (Number(total.substring(0, total.length - 3)) - Number(free.substring(0, free.length -3))
                    ) * 1024),
            percentage: ((Number(total.substring(0, total.length - 3)) - Number(free.substring(0, free.length -3))) / Number(total.substring(0, total.length - 3)) * 100).toFixed(2)
        }
    }

    const lastCommit = async () => {
        const commit = await exec('git log -1 --pretty=format:"%h"')
        return commit.stdout
    }

    return {
        memory,
        lastCommit
    }
}

module.exports = {
    loadStatsService
}