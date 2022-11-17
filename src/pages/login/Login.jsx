import React from "react";
import { useState } from "react";
import './Login.css'
import {toast} from 'react-toastify';
import {auth} from '../../services/firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {AuthContext} from '../../context/AuthContext'
import { useContext } from "react";
import Menu from "../../components/menu/Menu";

export default function Login(props) {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { authenticated, login } = useContext(AuthContext)



    function handleLogin(e){

        e.preventDefault();
        login(email, password)


    }



  return (
    <>

    <div className="container contaner-login">

      <h1>Login</h1>
      <p>{String(authenticated)}</p>
      <div>
        <form>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input onChange={e=>setEmail(e.target.value)} value={email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>

            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <button onClick={e=>{handleLogin(e)}} type="submit" className="btn btn-primary btn-login">Fazer Login</button>
        </form>
      </div>

    </div>
    </>
  );
}
