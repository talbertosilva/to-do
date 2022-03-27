import { BsListTask } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";

import React, { useState, useEffect } from "react";

import { format } from "date-fns";

import "./App.css";
import { TodoItem } from "./Components/TodoItem";

export default function App() {
  const today = new Date(), date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const [novaTarefa, setNovaTarefa] = useState('');
  const [novaData, setNovaData] = useState(format(new Date(date), "yyyy-MM-dd"));
  const [id, setId] = useState(0);
  const [mensagem, setMensagem] = useState('');

  const [tarefas, setTarefas] = useState([]);

  const tarefaHandler = (tarefaObj) => {
    setTarefas([...tarefas, tarefaObj].sort((a, b) => new Date(...a.data.split('/').reverse()) - new Date(...b.data.split('/').reverse())));
    setMensagem("Tarefa adicionada com sucesso!");
  };

  const addHandler = () => {
    const tarefaObj = { id: id, text: novaTarefa, data: novaData };
    setId(id + 1);
    setNovaTarefa('');
    setNovaData(format(new Date(date), "yyyy-MM-dd"));
    tarefaHandler(tarefaObj);
  };

  const delHandler = (id) => {
    const filteredTasks = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(filteredTasks);
  }

  const editHandler = (id, editedText, editedDate) => {
    const tarefasEditar = [...tarefas];

    tarefasEditar.splice(id, 1, {id: id , text: editedText, data: editedDate});
    setTarefas(tarefasEditar);
  }
  
  setTimeout(() => {
    setMensagem(" ");
  }, 3000);

  useEffect(() => {
    tarefas.sort((a, b) => new Date(...a.data.split('/').reverse()) - new Date(...b.data.split('/').reverse()));
  }, [tarefas]);
  

  return (
    <div className="Background">
      <div className="App">
        <div className="AddTask">
          <div className="InputTask">
            <BsListTask size={24} color="#626262" />
            <input
              value={novaTarefa}
              placeholder="Nova tarefa"
              onChange={e => setNovaTarefa(e.target.value)}
            />
          </div>
          <div className="dateAdd">
            <div className="InputDate">
              <input
                type={"date"}
                min={format(new Date(date), "yyyy-MM-dd")}
                placeholder="Nova tarefa"
                onChange={e => setNovaData(e.target.value)}
              />
            </div>
            <AiFillPlusCircle
              className="addButton"
              onClick={addHandler}
              size={36}
              color="#44E854"
            />
          </div>
        </div>

        <div id="mensagem">
          <span>{mensagem}</span>
        </div>

        <div className="ListTasks">
          {tarefas.map((tarefa) =>
            <TodoItem key={tarefa.id} tarefa={tarefa} setMensagem={setMensagem} delHandler={delHandler} editHandler={editHandler}/>
          )}
        </div>
      </div>
    </div>
  );
}
