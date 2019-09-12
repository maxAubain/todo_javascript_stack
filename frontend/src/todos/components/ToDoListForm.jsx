import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { TextField } from "../../shared/FormFields";

const useStyles = makeStyles({
  card: {
    margin: "1rem"
  },
  todoLine: {
    display: "flex",
    alignItems: "center"
  },
  textField: {
    flexGrow: 1
  },
  standardSpace: {
    margin: "8px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  }
});

let saved = false;
let autosaveTimerStart = false;
let autosaveID;
const TIMER = 1000;

export const ToDoListForm = ({ toDoList, saveToDoList }) => {
  const classes = useStyles();
  const [todos, setTodos] = useState(toDoList.todos);
  console.log("Are todos saved by render?", saved);
  console.log("Has autosave timer initiated by render", autosaveTimerStart);

  const save = () => {
    saveToDoList(toDoList.id, { todos });
    saved = true;
    console.log("Todos have saved", saved);
  };

  const handleAutosaveReset = () => {
    if (autosaveTimerStart === true) {
      saved = false;
      autosaveTimerStart = false;
      clearTimeout(autosaveID);
    }
  };

  if (saved === false && autosaveTimerStart === false) {
    autosaveID = setTimeout(save, TIMER);
    autosaveTimerStart = true;
    console.log("Autosave timer initiated with ID:", autosaveID);
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="headline" component="h2">
          {toDoList.title}
        </Typography>

        <form onChange={handleAutosaveReset} className={classes.form}>
          {todos.map((name, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant="title">
                {index + 1}
              </Typography>
              <TextField
                label="What to do?"
                value={name}
                onChange={event => {
                  setTodos([
                    ...todos.slice(0, index),
                    event.target.value,
                    ...todos.slice(index + 1)
                  ]);
                }}
                className={classes.textField}
              />
              <Button
                size="small"
                color="secondary"
                className={classes.standardSpace}
                onClick={() => {
                  setTodos([
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1)
                  ]);
                  handleAutosaveReset();
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type="button"
              color="primary"
              onClick={() => {
                setTodos([...todos, ""]);
                handleAutosaveReset();
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};
