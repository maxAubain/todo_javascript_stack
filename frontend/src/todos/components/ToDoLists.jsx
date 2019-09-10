import React, { Fragment, useState, useEffect } from "react";
// useState https://reactjs.org/docs/hooks-state.html
// useEffect https://reactjs.org/docs/hooks-effect.html

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Typography from "@material-ui/core/Typography";
import { ToDoListForm } from "./ToDoListForm";

/* Define sleep function with argument in miliseconds using JS setTimeout()
https://www.w3schools.com/jsref/met_win_settimeout.asp */
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const getPersonalTodos = () => {
  return sleep(1000).then(() =>
    /* "Hardcoded" todos upon startup. */
    Promise.resolve({
      "0000000001": {
        id: "0000000001",
        title: "First List",
        todos: ["First todo of first list!"]
      },
      "0000000002": {
        id: "0000000002",
        title: "Second List",
        todos: ["First todo of second list!"]
      }
    })
  );
};

export const ToDoLists = ({ style }) => {
  /* Instantiating the todo lists */
  const [toDoLists, setToDoLists] = useState({});

  /* Instantiating the activeList that appears when a todo list is clicked on */
  const [activeList, setActiveList] = useState();

  useEffect(() => {
    getPersonalTodos().then(setToDoLists);
  }, []);

  if (!Object.keys(toDoLists).length) return null;

  return (
    <Fragment>
      {/* Top section with My ToDo Lists, and selection of First and Second List */}
      <Card style={style}>
        <CardContent>
          <Typography variant="headline" component="h2">
            My ToDo Lists
          </Typography>
          <List>
            {Object.keys(toDoLists).map(key => (
              <ListItem key={key} button onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={toDoLists[key].title} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* ToDoList form which appears on clicking above list */}
      {toDoLists[activeList] && (
        <ToDoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          toDoList={toDoLists[activeList]}
          saveToDoList={(id, { todos }) => {
            const listToUpdate = toDoLists[id];
            setToDoLists({
              ...toDoLists,
              [id]: { ...listToUpdate, todos }
            });
          }}
        />
      )}
    </Fragment>
  );
};
