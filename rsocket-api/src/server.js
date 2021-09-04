const { RSocketServer } = require("@rsocket/rsocket-core");
const { WebsocketServerTransport } = require("@rsocket/rsocket-websocket-server");
const Websocket = require("ws");

const transport = new WebsocketServerTransport({
    wsCreator: () => {
        return new Websocket.Server({
            port: 9090
        });
    }
});

const server = new RSocketServer({
    transport,
    acceptor: {
        accept: async (setupPayload, remotePeer) => {
            console.log(
                `[server] client connected [data: ${setupPayload.data}; metadata: ${setupPayload.metadata}]`
            );
            return {

            };
        },
    }
});

let serverCloseable;

module.exports = {
    start: async function () {
        console.log("[server] starting...");
        serverCloseable = await server.bind();
    },
    stop: async function() {
        console.log("[server] stoping...");
        serverCloseable.close();
    }
};
