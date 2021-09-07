import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, {useContext} from "react";
import RSocketContext from "../contexts/RSocketContext";
import RSocketProvider from "../contexts/RSocketProvider";
import useTicker from "../hooks/useTicker";

const ConnectedState = () => {
    const btcData = useTicker('BTC-USD');
    const ethData = useTicker('ETH-USD');
    const dogeData = useTicker('DOGE-USD');
    const values = [
        btcData,
        ethData,
        dogeData
    ];
    return (
        <pre>
            <code>
                {JSON.stringify(values, null, 2)}
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
