const {Observable} = require("rxjs");
const {MAX_REQUEST_N} = require('@rsocket/rsocket-core');

class TickerService {
    constructor(rsocket) {
        this.rsocket = rsocket;
    }

    getTicker(ticker) {
        const requestPayload = {
            data: Buffer.from(JSON.stringify({
                ticker
            })),
            metadata: Buffer.from(JSON.stringify({
                route: "TickerService.getTicker"
            })),
        };
        return new Observable((subscriber) => {
            this.rsocket.requestStream(requestPayload, MAX_REQUEST_N, {
                onError(error) {
                    subscriber.error(error);
                },
                onNext: (payload, isComplete) => {
                    subscriber.next(payload);
                    if (isComplete) {
                        subscriber.complete();
                    }
                },
                onComplete() {
                    subscriber.complete();
                },
            });
        });
    }
}

module.exports = TickerService;
