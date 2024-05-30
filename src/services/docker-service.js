const { Docker } = require('node-docker-api');

const loadDockerService = () => {
    const docker = new Docker({ socketPath: '/var/run/docker.sock' });

    const countContainers = async () => {
        const containers = await docker.container.list({ all: true }).catch(e => console.error(e))
        const containersRunning = await docker.container.list().catch(e => console.error(e))

        return {
            total: containers.length,
            running: containersRunning.length,
            stopped: containers.length - containersRunning.length
        }
    }

    return {
        countContainers
    }
}

module.exports = {
    loadDockerService
}