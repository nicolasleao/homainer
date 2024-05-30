const { Docker } = require('node-docker-api');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

const listContainers = async () => {
    const containers = await docker.container.list({ all: true }).catch(e => console.error(e))
    
    return containers.map(container => {
        return {
            id: container.data.Id,
            name: container.data.Names[0],
            image: container.data.Image,
            state: container.data.State,
            status: container.data.Status
        }
    })
}

module.exports = {
    listContainers
}