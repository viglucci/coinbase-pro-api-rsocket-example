import React, {useEffect, useRef, useState} from 'react';
const {RSocketConnector} = require('@rsocket/rsocket-core');
const {WebsocketClientTransport} = require('@rsocket/rsocket-websocket-client');
import Context from './RSocketContext';

const RSocketProvider = (props) => {
    const {
        children
    } = props;
    let [connectionState, setConnectionState] = useState('CONNECTING');
    let rsocket = useRef(null);

    useEffect(async () => {
        const connector = new RSocketConnector({
            transport: new WebsocketClientTransport({
                url: 'ws://localhost:9090'
            }),
        });

        try {
            rsocket.current = await connector.connect();
            setConnectionState('CONNECTED');
        } catch (e) {
            setConnectionState('ERROR');
        }

        return () => {
            connector.close();
        };
    }, []);

    return (
        <Context.Provider value={[
            connectionState,
            rsocket.current
        ]}>
            {children}
        </Context.Provider>
    );
};

export default RSocketProvider;
