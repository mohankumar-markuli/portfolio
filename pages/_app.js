import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isHome = router.pathname === "/";

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      {isHome ? (
        <main style={{ flexGrow: 1 }}>
          <Component {...pageProps} />
        </main>
      ) : (
        <>
          <main className="container section-padding" style={{ flexGrow: 1 }}>
            <Component {...pageProps} />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
