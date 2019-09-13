import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import { TextField } from "../../shared/FormFields";

const useStyles = makeStyles({
  card: {
    margin: "1rem"
  },
  todoLine: {
    display: "flex",
    alignItems: "center"
  },
  textFieldUnfinished: {
    flexGrow: 1
  },
  textFieldFinished: {
    flexGrow: 1,
    backgroundColor: "lightgrey"
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

let autosaveTimerStart = false;
let autosaveID;
const TIMER = 1000;

export const ToDoListForm = ({ toDoList, saveToDoList }) => {
  const classes = useStyles();
  const [todos, setTodos] = useState(toDoList.todos);

  const save = () => {
    saveToDoList(toDoList.id, { todos });
  };

  const handleAutosaveReset = () => {
    if (autosaveTimerStart === true) {
      autosaveTimerStart = false;
      clearTimeout(autosaveID);
    }
  };

  if (autosaveTimerStart === false) {
    autosaveID = setTimeout(save, TIMER);
    autosaveTimerStart = true;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="headline" component="h2">
          {toDoList.title}
        </Typography>

        <form onChange={handleAutosaveReset} className={classes.form}>
          {todos.map((todo, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant="title">
                {index + 1}
              </Typography>
              <TextField
                label="What to do?"
                value={todo.item}
                onChange={event => {
                  setTodos([
                    ...todos.slice(0, index),
                    event.target.value,
                    ...todos.slice(index + 1)
                  ]);
                }}
                className={classes.textFieldFinished}
              />
              <Checkbox
                checked={todo.finished}
                onChange={() => {}}
                color="primary"
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
