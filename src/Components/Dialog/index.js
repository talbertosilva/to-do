import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useState } from "react";
import { format } from "date-fns";


import "./dialog.css";

export const FormDialog = ({ open, dialogHandler, tarefa, editHandler, setMensagem }) => {
    const today = new Date(), date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


  const [editedText, setEditedText] = useState(tarefa.text);
  const [editedDate, setEditedDate] = useState(tarefa.data);

  const editedHandler = () => {
    editHandler(tarefa.id, editedText, editedDate)
    dialogHandler();
    setMensagem("Editado com sucesso!");
  };

  return (
    <div>
      <Dialog className="Dialog" open={open} onClose={dialogHandler}>
        <div className="seila">
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <TextField
              defaultValue={editedText}
              onChange={e => setEditedText(e.target.value)}
              type="text"
              fullWidth
              variant="standard"
            />
            <input min={format(new Date(date), "yyyy-MM-dd")} defaultValue={editedDate} onChange={(e) => setEditedDate(e.target.value)} type="date" />
          </DialogContent>
          <DialogActions>
            <Button className="cancel" onClick={dialogHandler}>
              Cancel
            </Button>
            <Button onClick={() => editedHandler(tarefa.id, editedText, editedDate)}>
              Edit
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};
