import React, { useState } from "react";

import "./todo.css";
import { FormDialog } from "../Dialog";

import { format } from "date-fns";

import { BsFillTrashFill } from "react-icons/bs";

export const TodoItem = ({ tarefa, delHandler, editHandler, setMensagem }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const dialogHandler = () => {
    setOpenDialog(!openDialog);
  };

  const dataFormatada = format(new Date(tarefa.data), "dd/MM/yyyy");

  return (
    <>
      <FormDialog open={openDialog} dialogHandler={dialogHandler} tarefa={tarefa} setMensagem={setMensagem} editHandler={editHandler}/>
      <div className="Task">
        <div className="taskBox">
          <div className="checkTarefa">
            <input type="checkbox" />
            <span onClick={() => setOpenDialog(true)}>
              {tarefa.text}
            </span>
          </div>
          <div id="data">
            {dataFormatada}
          </div>
        </div>
        <BsFillTrashFill
          className="delButton"
          size={32}
          color="#FB4949"
          onClick={() => delHandler(tarefa.id)}
        />
      </div>
    </>
  );
};
