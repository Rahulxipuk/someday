import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router';
import { App } from './App';
import { ChainProvider } from './chain';
import { config } from './config';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/moment.css';
import './styles/pages.css';

/** The testnet site lives on a static host, which only knows the one page. */
const Router = config.network === 'testnet' ? HashRouter : BrowserRouter;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ChainProvider>
        <App />
      </ChainProvider>
    </Router>
  </StrictMode>,
);
