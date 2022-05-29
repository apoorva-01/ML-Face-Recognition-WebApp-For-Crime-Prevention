import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'
import "../styles/admin/customCSS/global.css";
import "../node_modules/react-quill/dist/quill.snow.css";
import { SnackbarProvider } from 'notistack';
import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
// import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { DataStoreProvider } from '../utils/DataStore';
import { AdminDataStoreProvider } from '../utils/admin/AdminDataStore';
const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />
      <DataStoreProvider>
      <AdminDataStoreProvider>
        {/* <PayPalScriptProvider deferLoading={true}> */}
          <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <ManagedUIContext>
              <Layout pageProps={pageProps}>
                <Component {...pageProps} />
              </Layout>
            </ManagedUIContext>
          </SnackbarProvider>
        {/* </PayPalScriptProvider> */}
      </AdminDataStoreProvider>
      </DataStoreProvider>
    </>
  )
}
