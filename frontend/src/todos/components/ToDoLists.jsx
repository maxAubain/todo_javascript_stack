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
import Get from "../../shared/ServerMethods";

/* Define one time method with setTimeout()
https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout */
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
  /* Instantiates toDoLists state variable using the useState hook.
  Passes no state information other than it is an object.  toDoLists object
  example is shown above, with key, and value as hash with id, title, and
  todos array. */
  const [toDoLists, setToDoLists] = useState({});

  /* Instantiates activeList state variable that stores state information
  about which todo list is shown when when clicked. */
  const [activeList, setActiveList] = useState();

  /* Hook that functions similarly to componentDidMount() */
  useEffect(() => {
    getPersonalTodos().then(setToDoLists);
    console.log("COMPONENT MOUNT");
    Get();
  }, []);

  /* Monitor state variables */
  console.log("All todo lists", toDoLists);
  console.log("Current list", activeList);

  if (!Object.keys(toDoLists).length) return null;
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

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
              <ListItem
                key={key}
                button
                onClick={() => {
                  setActiveList(key);
                  console.log("SET ACTIVE LIST");
                }}
              >
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
