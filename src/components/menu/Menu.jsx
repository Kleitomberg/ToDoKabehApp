import React from "react";
import { Link } from "react-router-dom";
import './Menu.css'
import {AuthContext} from '../../context/AuthContext'

import { useContext } from "react";




export default function Menu(props){

    const { authenticated, user, logout } = useContext(AuthContext)


    async function sair(){
        logout()
    }


    return (

        <div className="">
        <nav className="navbar navbar-expand-lg text-light">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/"> TodokabehApp</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/about">Sobre</Link>
                </li>

            </ul>

            {authenticated ? (
            <div className="me-2 text-end"> {user.displayName}<button className="btn btn-danger ms-3" onClick={sair}><i className="fa-solid fa-right-to-bracket"></i></button></div>
        ) : (
            <div className="btn btn-primary btn-logout text-light text-end" ><Link to="/login">Login</Link></div>
        )}

            </div>
        </div>


        </nav>

        </div>
)
}
