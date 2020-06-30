import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import './../styles/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-fancybox/lib/fancybox.css'
import 'aos/dist/aos.css'
// import { ThemeProvider } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import theme from '../theme'; 
// import { Provider } from 'mobx-react' 
// import { getStores, StoreProvider } from '../store/store'; 

export default function MyApp(props) {
  const { Component, pageProps } = props; 
  // const store = getStores();

  //make stores available to all pages 


  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
        <Component {...pageProps} />
      {/* <ThemeProvider theme={theme}>
       
        <CssBaseline />
        <StoreProvider value={store}> 
             <Component {...pageProps} />
        </StoreProvider>
      </ThemeProvider> */}
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

//  <Provider store={store}>