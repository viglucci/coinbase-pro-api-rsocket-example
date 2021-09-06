import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, {useContext, useState} from "react";
import RSocketContext from "../contexts/RSocketContext";
import RSocketProvider from "../contexts/RSocketProvider";

function Contents() {
    const [rsocketState, rsocket] = useContext(RSocketContext);
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
