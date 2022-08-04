import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html className="scroll-smooth">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />

          <Script
            src="https://cdn.dapi.co/dapi/v2/sdk.js"
            strategy="beforeInteractive"
          />

          <link rel="icon" href="/favicon.svg" />
        </Head>
        <Main />
        <NextScript />
      </Html>
    );
  }
}

/* 
   <Script
          src="https://cdn.dapi.co/dapi/v2/sdk.js"
          strategy="beforeInteractive"
        />
*/

export default MyDocument;
