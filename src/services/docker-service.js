const { Docker } = require('node-docker-api');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });


const listContainers = async () => {
    // const containers = await docker.container.list().catch(e => console.error(e));
    // containers.forEach(container => {
    //     console.log(container.data);
    // });
    // return containers;
    return await docker.image.get('ubuntu').status()
}

module.exports = {
    listContainers
}