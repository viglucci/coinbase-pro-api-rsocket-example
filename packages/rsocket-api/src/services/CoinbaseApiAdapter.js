const {Observable, Subject, fromEvent, filter} = require('rxjs');
const {WebsocketClient} = require('coinbase-pro');

class CoinbaseApiAdapter {
    constructor() {
        this.coinbaseWs = new WebsocketClient(
            [],
            'wss://ws-feed-public.sandbox.pro.coinbase.com',
            undefined,
            {channels: []}
        );

        this.coinbaseMessages = fromEvent(this.coinbaseWs, 'message');
        this.coinbaseErrors = fromEvent(this.coinbaseWs, 'error');

        this.coinbaseWs.on('open', () => {
            // by default the coinbase client connects to the BTC-USD heartbeat, which we want to unsubscribe from.
            // we wrap the `unsubscribe` call in a timeout to combat a rather condition with the clients own
            // onOpen handler which is initiating the original subscription.
            setTimeout(() => {
                this.coinbaseWs.unsubscribe({
                    product_ids: ['BTC-USD'],
                    channels: ['heartbeat']
                });
            }, 0);
        });
    }

    getTicker(productId) {
        return new Observable((subscriber) => {
            this.coinbaseWs.subscribe({
                product_ids: [productId],
                channels: ['ticker']
            });

            const subscription = this.coinbaseMessages
                .pipe(filter((message) => {
                    return message.type === 'ticker'
                        && message.product_id === productId;
                }))
                .subscribe((data) => {
                    subscriber.next(data);
                });

            return () => {
                // TODO: also unsubscribe from ticker data if no peers are currently subscribed
                subscription.unsubscribe();
            };
        });
    }
}

module.exports = CoinbaseApiAdapter;