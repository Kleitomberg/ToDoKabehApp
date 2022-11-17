import { useState } from 'react'

import './App.css'
import About from './pages/about/About'
import Home from './pages/home/Home'
import {createBrowserRouter } from 'react-router-dom'

const routers = createBrowserRouter
(

    [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/about',
            element: <About/>
        },

        {
            path: '*',
            element: <h1>404</h1>
        }

    ]

)

export default routers
