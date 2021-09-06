
class TickerService {

    constructor({ coinbaseAdapter }) {
        this.coinbaseAdapter = coinbaseAdapter;
    }

    get routes() {
        return [{
            name: "TickerService.getTicker",
            handle: this.getTicker.bind(this)
        }];
    }

    getTicker({data, metadata, requestN}) {
        return this.coinbaseAdapter.getTicker(data.productId);
    }
}

module.exports = TickerService;
