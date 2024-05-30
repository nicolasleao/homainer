# Homainer

## Beautiful lightweight server dashboard for creating managing and monitoring docker containers through a web interface.

![Dashboard demo picture](demos/1-homainer-home-demo.png)

## Configuration

The application list is a simple JSON file that you can update, it is located at `/src/config/app-list.json`.

The data structure is very simple, we have three fields: `name`, `icon` and `url`.

example:
```json
[
    {
        "name": "Dockge",
        "icon": "https://dockge.kuma.pet/icon.svg",
        "url": "http://192.168.0.9:5001"
    }
]
```

Note: the frontend will periodically ping your service's url to check if it is still running and update the colored indicator at the top-right of your application icon

You will also find a `config.json` file in the same directory `/src/config/config.json` where you can customize the welcome message, the placeholder text for the search bar and the port in which the server runs.

The showToolbar feature is currently a WIP and shouldn't be enabled. 
```json
{
    "welcomeMessage": "Bem vindo!",
    "searchMessage": "Buscar na internet",
    "port": 8001,
    "showToolbar": false
}
```

## Running

To start the server as a daemon, we need to go to the `/src/` directory and run `npm start &`.

I'm working on containerizing this server so it'll be easier to install and be able to fit in your current docker setup.