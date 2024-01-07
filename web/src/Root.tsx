import { ComponentType, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { theme } from './styles/theme';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store';

const store = configureAppStore();

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);


function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <Provider store={store}>
        <HelmetProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </HelmetProvider>
      </Provider>
    </StrictMode>,
  );
}

export default render;
