import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from '../AuthContext';
import Navbar from '../components/Navbar';
import '../styles/globals.css';
import useMediaQuery from '@mui/material/useMediaQuery';

// const theme = createTheme({
//   palette: {
//     mode: 'dark'
//   }
// });

function MyApp({ Component, pageProps }) {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );


  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
