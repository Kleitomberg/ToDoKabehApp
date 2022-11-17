import { useState } from 'react'

import './App.css'
import About from './pages/about/About'
import Home from './pages/home/Home'
import {createBrowserRouter , BrowserRouter as Rota, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login/Login'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import AuthProvider from './context/AuthContext'
import Cadastro from './pages/cadastro/Cadastro'



const AppRoutes = () => {

    const Private = ({children}) => {
        const {authenticated,loadingAuth} = useContext(AuthContext)
        if(loadingAuth){
            return <h1>Carregando...</h1>
        }else{

        return authenticated ? children : <Navigate to="/login"/>
    }
    }


    const { authenticated } = useContext(AuthContext)
    return (
        <Rota>
            <AuthProvider>
            <Routes>

                <Route exact path="/" element={<Private> <Home /> </Private> }/>
                <Route path="/about" element={<About />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/cadastro" element={<Cadastro />}/>
            </Routes>

            </AuthProvider>
        </Rota>
    )
}
export default AppRoutes
