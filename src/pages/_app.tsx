import "@/styles/global.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "/public/grapes.min.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Next.js Web Builder</title>
			</Head>
			<Component {...pageProps} />
		</>
	);
}
