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
import { ToDoItemStatusMessage } from "./ToDoItemStatusMessage";

const useStyles = makeStyles({
  card: {
    margin: "1rem"
  },
  todoLine: {
    display: "flex",
    alignItems: "center",
    margin: "8px"
  },
  textField: {
    flexGrow: 1
  },
  dateField: {
    marginLeft: "1rem",
    marginRight: "1rem",
    width: 150
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

let autoSaveTriggered = false;
let autoSave;
const TIMER = 1000;

export const ToDoListForm = ({ toDoList, saveToDoList }) => {
  const classes = useStyles();
  const [todos, setTodos] = useState(toDoList.todos);
  const [finished, setFinished] = useState(toDoList.finished);
  const [dueDates, setDueDate] = useState(toDoList.dueDates);

  const retriggerAutoSave = () => {
    if (autoSaveTriggered) {
      autoSaveTriggered = false;
      clearTimeout(autoSave);
    }
  };

  const save = () => {
    saveToDoList(toDoList.id, { todos, finished, dueDates });
  };

  if (!autoSaveTriggered) {
    autoSave = setTimeout(save, TIMER);
    autoSaveTriggered = true;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="headline" component="h2">
          {toDoList.title}
        </Typography>
        <form className={classes.form}>
          {todos.map((todo, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant="title">
                {index + 1}
              </Typography>
              <TextField
                label="What to do?"
                value={todo}
                onChange={event => {
                  setTodos([
                    ...todos.slice(0, index),
                    event.target.value,
                    ...todos.slice(index + 1)
                  ]);
                  retriggerAutoSave();
                }}
                className={classes.textField}
              />
              <TextField
                label="Due date?"
                type="date"
                value={dueDates[index]}
                onChange={event => {
                  setDueDate([
                    ...dueDates.slice(0, index),
                    event.target.value,
                    ...dueDates.slice(index + 1)
                  ]);
                  retriggerAutoSave();
                }}
                className={classes.dateField}
              />
              <ToDoItemStatusMessage
                dueDate={dueDates[index]}
                finished={finished[index]}
              />
              <Typography className={classes.standardSpace}>
                Finished?
              </Typography>
              <Checkbox
                checked={finished[index]}
                value={`${finished[index]}`}
                onChange={() => {
                  setFinished([
                    ...finished.slice(0, index),
                    !finished[index],
                    ...finished.slice(index + 1)
                  ]);
                  retriggerAutoSave();
                }}
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
                  setFinished([
                    ...finished.slice(0, index),
                    ...finished.slice(index + 1)
                  ]);
                  setDueDate([
                    ...dueDates.slice(0, index),
                    ...dueDates.slice(index + 1)
                  ]);
                  retriggerAutoSave();
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
                setFinished([...finished, false]);
                setDueDate([...dueDates, "mm-dd-yyyy"]);
                retriggerAutoSave();
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
