import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ToastContainer autoClose={1500} />
      <App/>
  </React.StrictMode>
)
