import Script from "next/script";
import "../styles/globals.css";
import { BaProvider } from "../context/BaContext";

function MyApp({ Component, pageProps }) {
  return (
    <BaProvider>
      <Script
        src="https://cdn.dapi.co/dapi/v2/sdk.js"
        strategy="beforeInteractive"
      />
      <Component {...pageProps} />
    </BaProvider>
  );
}

export default MyApp;
