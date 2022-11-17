import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ToastContainer } from 'react-toastify';

import {RouterProvider} from 'react-router-dom'
import routers from './App'
import Menu from './components/menu/Menu'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ToastContainer autoClose={1500} />
    <RouterProvider router={routers}/>
  </React.StrictMode>
)
