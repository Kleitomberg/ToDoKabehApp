import React, { useEffect, useState } from "react";
import TodoForm from "../../components/form/TodoFomr";
import Menu from "../../components/menu/Menu";
import {toast} from 'react-toastify';
import { db } from '../../services/firebase';
import { signOut } from 'firebase/auth';
import { AuthContext } from "../../context/AuthContext";
import { collection, onSnapshot,query,orderBy, setDoc, addDoc, deleteDoc, doc,updateDoc, where } from 'firebase/firestore'
import { useContext } from "react";
import './Home.css'
import Footer from "../../components/footer/Footer";






export default function Home() {

    const { authenticated, user } = useContext(AuthContext)

    const usuariologado = JSON.parse(localStorage.getItem('usuarioLogado'))
    console.log(authenticated.uid)
    console.log(user.uid)


    const [tarefas, setTarefas] = useState([]);

    function aadcionarTarefa(tarefa, e) {
        e.preventDefault();
        const usuariologado = JSON.parse(localStorage.getItem('usuarioLogado'))

        if (tarefa !== "") {
            addDoc(collection(db, "tarefas"), {
                title: tarefa,
                done: false,
                user_id:user.uid,
                created: new Date()
            }).then(() => {
                toast.success('Tarefa Adicionada com sucesso!', {
                    position: "bottom-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
            ).catch((error) => {
                toast.error('Error ao adicionar tarefa!', {
                    position: "bottom-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
            );

        }
    }

    async function deleteTask(id){
        await deleteDoc(doc(db, 'tarefas', id))
        .then(() => {
        toast.success('Tarefa deletada com sucesso!',{
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
        })
        .catch((error) => {
        toast.error('Erro ao deletar tarefa')
        })
    }

    async function updateTask(id, type){
        const task = doc(db, 'tarefas', id)

        if(type === 'done'){
        updateDoc(task, {
            done: true
            })
            .then(() => {
            toast.success('Tarefa marcada como concluida!',
            {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            })
            })
            .catch((error) => {
            toast.error('Erro ao atualizar tarefa',{
                position: "bottom-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
            })
            })
        }else{
        updateDoc(task, {
            done: false
            })
            .then(() => {
            toast.success('Tarefa marcada como não concluida!',{
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            })
            .catch((error) => {
            toast.error('Erro ao atualizar tarefa',{
                position: "bottom-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
            })
            })
        }
    }


    useEffect(() => {
        const mytarefas =  collection(db, 'tarefas')
        console.log(mytarefas)

        const q = query(mytarefas, orderBy('created', 'desc'), where('user_id', '==', user.uid || usuariologado.uid))


        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            const docs = [];

            querySnapshot.forEach((doc) => {
                console.log(doc.data().title)

                docs.push(
                    {   id: doc.id,
                        title:doc.data().title,
                        done:doc.data().done,

                    });
            });

            setTarefas(docs);
        });


    }, []);

    return (
        <div className="">
            <Menu /> <br />

        <h2 className="container"> <i className="fa-solid fa-clipboard-list"> </i>  Tarefas</h2>

         <TodoForm onAdd={aadcionarTarefa}/>

        <div className="container mt-3">

            {!tarefas.length && <div className="alert alert-info">Nenhuma tarefa encontrada</div>}

            { tarefas.map((tarefa) => (
                <div className="card mt-2" key={tarefa.id}>
                    <div className="card-body d-flex justify-content-between">
                        <div className="">
                        <h5 className="card-title">{tarefa.title}</h5>
                        <p className="card-text">Status: {tarefa.done ? "Concluída" : "Pendente"}</p>
                        </div>
                        <div>
                        { tarefa.done ?

                        <div className="d-flex">
                            <button className="btn btn-danger" onClick={e=>deleteTask(tarefa.id)}><i className="fa-solid fa-trash"></i></button>
                            <button  onClick={e=>updateTask(tarefa.id,'reset')} className="btn btn-warning  ms-2"><i className="fa-solid fa-arrows-rotate"></i></button>
                        </div>
                        :  <button onClick={e=>updateTask(tarefa.id,'done')} className="btn btn-success"><i className="fa-solid fa-check"></i></button>

                        }

                        </div>
                    </div>
                </div>
            ))}
        </div>
        <Footer/>
        </div>
    );
}
