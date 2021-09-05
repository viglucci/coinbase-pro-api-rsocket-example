const {Observable} = require('rxjs');

class TickerDao {
    getTicker() {
        return new Observable((subscriber) => {
            const interval = setInterval(() => {
                subscriber.next({data: new Date().toISOString()});
            }, 1000);
            return function unsubscribe() {
                clearInterval(interval);
            };
        });
    }
}

const tickerDao = new TickerDao();

class TickerService {

    get routes() {
        return [{
            name: "TickerService.getTicker",
            handle: this.getTicker.bind(this)
        }];
    }

    getTicker({data, metadata, requestN}) {
        return tickerDao.getTicker();
    }
}

module.exports = TickerService;
