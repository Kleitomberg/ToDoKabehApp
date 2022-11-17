import { createContext } from "react";
import { useState, useEffect } from "react";
import { auth } from "../services/firebase";
import {signInWithEmailAndPassword} from 'firebase/auth'
import {toast} from 'react-toastify';
import { useNavigate} from 'react-router-dom'
import { signOut } from 'firebase/auth';



export const AuthContext = createContext([false, () => {}]);

export default function AuthProvider(props){

    const navigate = useNavigate();

    const [user, setUser] = useState(null)


    function login(email, password){

        console.log('login')
        console.log(email)
        console.log(password)


        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            setUser({
                email: userCredential.user.email,
                uid: userCredential.user.uid
            })

            navigate('/')
            localStorage.setItem('usuarioLogado', JSON.stringify(userCredential.user))
            toast.success('Login Realizado com Sucesso!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                toast.success('Bem vindo!', {});

        })
        .catch((error) => {
            toast.error('Error ao Tentar Fazer Login!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });

        });


    }
     const logout = () =>{
        signOut(auth);

        localStorage.removeItem('usuarioLogado');
        localStorage.removeItem('user');
        setUser(false);

        toast.success('Usuario deslogado com Sucesso!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }

    return(
        <AuthContext.Provider
            value={{ authenticated: !!user,user, login,logout
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}
