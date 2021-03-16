import { useEffect } from "react";
import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import { themeDark, themeLight } from "lib/theme";

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);
  return (
    <CssBaseline>
      <ThemeProvider theme={false ? themeDark : themeLight}>
        <Component {...pageProps} />
      </ThemeProvider>
    </CssBaseline>
  );
};

export default MyApp;
