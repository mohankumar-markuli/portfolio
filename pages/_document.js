import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const basePath = process.env.NODE_ENV === 'production' ? '/mohankumar-markuli' : '';
  
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href={`${basePath}/profile-pic.png`} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
