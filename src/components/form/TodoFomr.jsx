import React from "react";

import "./TodoForm.css";

export default function TodoForm(props) {
    const [tarefa, setTarefa] = React.useState("");

    function handleAddTodo(e) {
        props.onAdd(tarefa,e);
        setTarefa("");
    }

    return (
        <div className="container mt-4">
            <div className="d-flex">
        <input
        className="form-control"
            placeholder="Digite uma tarefa"
            type="text"
            value={tarefa}
            onChange={(e) => setTarefa(e.target.value)}
        />
        <button className="btn btn-primary ms-2" onClick={e=>{handleAddTodo(e)}}>Adicionar</button>
        </div>
        </div>
    );
    }

