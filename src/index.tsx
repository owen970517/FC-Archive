import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import { store } from './store/store';
import './styles/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={Router}/>
      </Provider>
      <ReactQueryDevtools initialIsOpen={true}/>
    </QueryClientProvider>
  </React.StrictMode>
);

