const {exit} = require('process');
const WebSocket = require('ws');
const {RSocketConnector} = require('@rsocket/rsocket-core');
const {WebsocketClientTransport} = require('@rsocket/rsocket-websocket-client');

function makeConnector() {
    return new RSocketConnector({
        transport: new WebsocketClientTransport({
            url: 'ws://localhost:9090',
            wsCreator: (url) => new WebSocket(url),
        }),
    });
}

async function main() {
    const connector = makeConnector();
    const rsocket = await connector.connect();
}

main()
    .then(() => exit())
    .catch((error) => {
        console.error(error);
        exit(1);
    });
