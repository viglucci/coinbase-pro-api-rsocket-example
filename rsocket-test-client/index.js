const {exit} = require('process');
const WebSocket = require('ws');
const {RSocketConnector} = require('@rsocket/rsocket-core');
const {WebsocketClientTransport} = require('@rsocket/rsocket-websocket-client');
const TickerService = require("./src/TickerService");

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
    const tickerService = new TickerService(rsocket);

    tickerService.getTicker("BTC-USD").subscribe({
        next: (payload) => {
            console.log(i, payload);
        },
        error: (e) => {
            console.error(i, e);
        },
        complete: () => {
            console.log(i, "tickerService done")
        }
    });
}

main().catch((error) => {
    console.error(error);
    exit(1);
});
