import {useContext, useEffect, useState} from "react";
const {MAX_REQUEST_N} = require("@rsocket/rsocket-core");
import RSocketContext from "../contexts/RSocketContext";

function useTicker(ticker) {
    const [_, rsocket] = useContext(RSocketContext);
    const [data, setData] = useState({});

    useEffect(() => {
        const requestPayload = {
            data: Buffer.from(JSON.stringify({
                productId: ticker
            })),
            metadata: Buffer.from(JSON.stringify({
                route: "TickerService.getTicker"
            })),
        };
        const cancellable = rsocket.requestStream(requestPayload, MAX_REQUEST_N, {
            onError(error) {
                // subscriber.error(error);
            },
            onNext: (payload, isComplete) => {
                const data = JSON.parse(payload.data.toString());
                setData(data);
            },
            onComplete() {},
        })
        return () => {
            cancellable.cancel();
        };
    }, []);

    return data;
}

export default useTicker;
