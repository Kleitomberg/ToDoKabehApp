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
    const [loadingAuth, setLoadingAuth] = useState(true)

    useEffect(() => {

        const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))
        if(usuario){
            setUser(usuario)
        }
        setLoadingAuth(false)
    }, [])

    function login(email, password){


        if (email === '' || password === '') {
            toast.error('Erro: Preencha todos os campos!')
            return
        }



        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            setUser({
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                displayName: userCredential.user.displayName
            })

            navigate('/')
            localStorage.setItem('usuarioLogado', JSON.stringify(userCredential.user))

            toast.success(`Seja Bem vindo 😁! ${userCredential.user.displayName ||''}`, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });


        })
        .catch((error) => {
            const errorCode = error.code;

            let msg = '';

            if (errorCode === 'auth/wrong-password') {
                msg = 'Senha incorreta!'
            }
            if (errorCode === 'auth/user-not-found') {
                msg = 'Error: verifique se os dados estão corretos e tente novamente!'
            }
            if (errorCode === 'auth/invalid-email') {
                msg = 'Email inválido!'
            }
            if (errorCode === 'auth/internal-error') {
                msg = 'Erro interno, tente novamente mais tarde!'
            }

            toast.error(msg, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });

        });


    }
     const logout = () =>{
        signOut(auth);

        localStorage.removeItem('usuarioLogado');
        localStorage.removeItem('user');
        setUser(false);

        toast.success('Você se deslogou 😞, sentirei sua falta!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }

    return(
        <AuthContext.Provider
            value={{ authenticated: !!user,user,loadingAuth, login,logout
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}
