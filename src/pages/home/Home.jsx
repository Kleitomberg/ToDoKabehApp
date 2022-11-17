import React, { useEffect, useState } from "react";
import TodoForm from "../../components/form/TodoFomr";
import Menu from "../../components/menu/Menu";
import {toast} from 'react-toastify';
import { db } from '../../services/firebase';
import { collection, onSnapshot,query,orderBy, setDoc, addDoc, deleteDoc, doc,updateDoc } from 'firebase/firestore'

import './Home.css'

function aadcionarTarefa(tarefa, e) {
    e.preventDefault();

    if (tarefa !== "") {
        addDoc(collection(db, "tarefas"), {
            title: tarefa,
            done: false,
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
    toast.success('Tarefa deletada com sucesso!')
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




export default function Home() {

    const [tarefas, setTarefas] = useState([]);
    useEffect(() => {
        const mytarefas =  collection(db, 'tarefas');
        const q = query(mytarefas, orderBy('created', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
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
        <div className="container">
            <Menu/> <br />
        <h2> <i className="fa-solid fa-clipboard-list"> </i>  Tarefas</h2>

         <TodoForm onAdd={aadcionarTarefa}/>

        <div className="container mt-3">
            {tarefas.map((tarefa) => (
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

        </div>
    );
}
