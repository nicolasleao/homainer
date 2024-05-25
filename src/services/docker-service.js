const { Docker } = require('node-docker-api');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

const testService = () => {
    docker.container.create({
        Image: 'ubuntu',
        name: 'test'
    })
    .then(container => container.start())
    .then(container => container.stop())
}

module.exports = {
    testService
}