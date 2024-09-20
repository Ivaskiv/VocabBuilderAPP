import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { persistor, store } from './infrastructure/store/store.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import ModalProvider from './features/modals/components/DialogProvider';
import FormProvider from './features/forms/wordForm/components/FormProvider';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              <ModalProvider>
                <FormProvider>
                  <App />
                </FormProvider>
              </ModalProvider>
            </QueryClientProvider>
          </HelmetProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
