import React, {  useEffect } from "react";
import { SnackbarProvider } from "notistack";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { LayoutProvider } from "../../utils/admin/LayoutContext";
import { AdminDataStoreProvider } from "../../utils/admin/AdminDataStore";
import AdminLayoutState from './AdminLayoutState'
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import Themes from "../themes";
const theme = createTheme({
  palette: {
    primary: {
      main: '#008060',
    },
  },
});
function Layout(props) {

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <LayoutProvider>
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <AdminDataStoreProvider>
            {/* <PayPalScriptProvider deferLoading={true}> */}
              <ThemeProvider theme={theme}>
                <ThemeProvider theme={Themes.default}>
                  <AdminLayoutState>
                    {props.children}
                  </AdminLayoutState>
                </ThemeProvider>
              </ThemeProvider>
            {/* </PayPalScriptProvider> */}
          </AdminDataStoreProvider>
        </SnackbarProvider>


      </LayoutProvider>
    </>
  );
}

export default Layout;
