import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import AppContext from './providers';
import Routes from './routes';
import GlobalStyles from './styles/global';
import theme from './styles/theme';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppContext>
          <Routes />
          <GlobalStyles />
        </AppContext>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
