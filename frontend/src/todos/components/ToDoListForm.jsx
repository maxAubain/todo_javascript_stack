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

export const ToDoListForm = ({ toDoList, saveToDoList }) => {
  const classes = useStyles();
  const [todos, setTodos] = useState(toDoList.todos);

  const handleSubmit = event => {
    event.preventDefault();
    saveToDoList(toDoList.id, { todos }); // saveToDoList() as defined in ToDoLists
  };

  /* Monitor state variable */
  console.log("Current todos", todos);

  /* Prototype autosave function */
  const save = () => saveToDoList(toDoList.id, { todos });
  const autosaveID = setTimeout(save, 1000);
  console.log(autosaveID)

  return (
    <Card className={classes.card}>
      <CardContent>
        {/* ToDo list form label "First list", "Second list" */}
        <Typography variant="headline" component="h2">
          {toDoList.title}
        </Typography>

        <form onSubmit={handleSubmit} className={classes.form}>
          {todos.map((name, index) => (
            <div key={index} className={classes.todoLine}>
              {/* ToDo list item number */}
              <Typography className={classes.standardSpace} variant="title">
                {index + 1}
              </Typography>

              {/* ToDo list input field */}
              <TextField
                label="What to do?"
                value={name}
                onChange={event => {
                  setTodos([
                    // immutable update
                    ...todos.slice(0, index),
                    event.target.value, // inserts new todo at array location 'index'
                    ...todos.slice(index + 1)
                  ]);
                }}
                className={classes.textField}
              />

              {/* Delete button */}
              <Button
                size="small"
                color="secondary"
                className={classes.standardSpace}
                onClick={() => {
                  setTodos([
                    // immutable delete
                    ...todos.slice(0, index), // deletes todo at array location 'index'
                    ...todos.slice(index + 1)
                  ]);
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}

          <CardActions>
            {/* Add ToDo button, on click add new empty ToDo form field */}
            <Button
              type="button"
              color="primary"
              onClick={() => {
                setTodos([...todos, ""]);
              }}
            >
              Add Todo <AddIcon />
            </Button>

            {/* Save button, submits form info and triggers handleSubmit() */}
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};
