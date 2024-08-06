import "@/styles/global.css";
import type { AppProps } from "next/app";
import "/public/grapes.min.css";

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
