import './Cadastro.css'
import { useState, useEffect } from 'react'
import { auth } from '../../services/firebase';
import {AuthContext} from '../../context/AuthContext'
import { useContext } from "react";
import {toast} from 'react-toastify';
import { Link } from 'react-router-dom';

import { onAuthStateChanged, updateProfile,createUserWithEmailAndPassword } from "firebase/auth";
export default function Cadastro(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { authenticated, login } = useContext(AuthContext)

    function updateuser(user)
    {
        updateProfile(user, {
            displayName: name
          }).then(() => {
            // Update successful
            // ...
          }).catch((error) => {

            // An error occurred
            // ...
          });
    }
    function handleCadastro(e){
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            updateuser(userCredential.user)
            login(email, password)
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                toast.error('Erro: O usuario já está existe!')
            }

            const errorCode = error.code;
            const errorMessage = error.message;

            // ..
  });

    }

    return (
        <div className="container ">
            <div className="row">
                <div className="col-12 container-cadastro">
                    <h1 className='text-center mb-3'>Cadastro</h1>

                    <form>
                    <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Nome</label>
                            <input value={name} onChange={e=>setName(e.target.value)} placeholder='Seu nome' type="text" className="form-control" id="name" aria-describedby="emailHelp"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input value={email} onChange={e=> setEmail(e.target.value)} placeholder='Seu e-mail' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
                            <input value={password} onChange={e=>setPassword(e.target.value)} placeholder='Sua senha' type="password" className="form-control" id="exampleInputPassword1"/>
                        </div>
                        <div className="mb-3 text-center">
                        <button onClick={e=>handleCadastro(e)} type="submit" className="btn btn-primary text-center">Cadastrar</button>
                        </div>
                        <div>
                            <p className='text-center'>Já tem uma conta? <Link className='link' to='/login'>Faça login</Link></p>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
