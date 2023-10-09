import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import routes from './routes.tsx';

import './sass/main.sass'
import { RecoilRoot } from 'recoil';
import RecoilNexus from 'recoil-nexus';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RecoilRoot>
        <RecoilNexus />
        <RouterProvider router={routes} />
      </RecoilRoot>
    </Provider>
  </React.StrictMode>,
)
