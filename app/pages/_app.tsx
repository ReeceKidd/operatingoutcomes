import { useEffect, useState } from 'react'
import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'lib/apollo'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'

import { themeDark, themeLight } from 'lib/theme'
import { AuthProvider } from 'lib/useAuth'

const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloClient)
  const [darkState, setDarkState] = useState(false)
  const handleThemeChange = () => {
    setDarkState(!darkState)
  }
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={darkState ? themeDark : themeLight}>
        <CssBaseline>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </CssBaseline>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default MyApp
