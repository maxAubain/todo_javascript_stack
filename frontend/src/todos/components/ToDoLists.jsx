import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Typography from "@material-ui/core/Typography";
import { ToDoListForm } from "./ToDoListForm";

const targetPath = "http://localhost:3001"

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const getPersonalTodos = () => {
  return sleep(1000).then(() =>
    axios
      .get(`${targetPath}/init-todos`)
      .then(response => Promise.resolve(response.data))
  );
};

export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState({});
  const [activeList, setActiveList] = useState();

  /* Hook that functions similarly to componentDidMount() */
  useEffect(() => {
    getPersonalTodos().then(setToDoLists);
    console.log("COMPONENT MOUNT");
  }, []);

  /* Monitor state variables */
  console.log("All todo lists", toDoLists);
  console.log("Current list", activeList);

  /* This is an oh-shit warning if no todo list info loads */
  if (!Object.keys(toDoLists).length) return null;

  axios.post(`${targetPath}/todos`, toDoLists)

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
