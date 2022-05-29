import '../styles/globals.css'
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { LayoutProvider } from "../utils/LayoutContext";
import Themes from "../themes";
import Head from 'next/head'
import { DataStoreProvider } from '../utils/DataStore';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Microsoft Engage Project</title>
        <meta name="description" content="Microsoft Engage Project" />
        <link rel="icon" href="/favicon.ico" />
        {/* <!-- MDB --> */}
<link
  href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/4.1.0/mdb.min.css"
  rel="stylesheet"
/>
      </Head>
   
      <DataStoreProvider>
        <LayoutProvider>
          <ThemeProvider theme={Themes.default}>
          <SnackbarProvider
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
            <CssBaseline />
            <Component {...pageProps} />
            </SnackbarProvider>
          </ThemeProvider>
        </LayoutProvider>
      </DataStoreProvider>
      </>
  )
}

export default MyApp
