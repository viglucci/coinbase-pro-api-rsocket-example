import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, {useContext, useEffect, useState} from "react";

const {MAX_REQUEST_N} = require('@rsocket/rsocket-core');
import RSocketContext from "../contexts/RSocketContext";
import RSocketProvider from "../contexts/RSocketProvider";

const ConnectedState = () => {
    const [_, rsocket] = useContext(RSocketContext);
    const [data, setData] = useState({});
    useEffect(() => {
        const requestPayload = {
            data: Buffer.from(JSON.stringify({
                productId: 'BTC-USD'
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
    return (
        <pre>
            <code>
                {JSON.stringify(data, null, 2)}
            </code>
        </pre>
    );
};

const Contents = () => {
    const [rsocketState, _] = useContext(RSocketContext);
    return (
        <div className={styles.container}>
            <Head>
                <title>RSocket Coinbase Demo</title>
                <meta name="description"
                      content="Demo application showing ticker values from Coinbase API exposed via RSocket"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    {rsocketState}
                </h1>
                {rsocketState === 'CONNECTED' ? <ConnectedState/> : null}
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
                    </span>
                </a>
            </footer>
        </div>
    )
}

export default function Home() {
    return (
        <RSocketProvider>
            <Contents/>
        </RSocketProvider>
    )
}
