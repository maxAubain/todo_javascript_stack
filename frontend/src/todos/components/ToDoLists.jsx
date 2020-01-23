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
import loadingGifFile from "../../../src/img/loading.gif";

// const devServerPath = "http://localhost:3001/";
const prodServerPath = "https://todo-list-is-here.herokuapp.com/";

export const ToDoLists = ({ style }) => {
  // 1. Instantiate todo list data var and active list selection var.
  const [toDoLists, setToDoLists] = useState({});
  const [activeList, setActiveList] = useState();

  // 2. Define: Post GET request to prodServerPath for todo list data.
  const prodServerPath = "https://todo-list-js-server.herokuapp.com/";
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const getPersonalTodos = () => {
    return sleep(1000).then(() =>
      axios.get(prodServerPath).then(response => Promise.resolve(response.data))
    );
  };

  // 3. Send GET request.
  useEffect(() => {
    getPersonalTodos().then(setToDoLists);
  }, []);

  // 4. Define loading gif object.
  const loadingGif = (
    <img height="200px" width="300px" src={loadingGifFile}></img>
  );

  // 5. If GET request is not-yet successful, return loading gif.
  if (!Object.keys(toDoLists).length)
    return (
      <Card style={style}>
        <CardContent>{loadingGif}</CardContent>
      </Card>
    );

  // 6. If ToDoLists state changes, post changes to server.
  const postTodos = (serverPath, toDoLists) =>
    axios.post(serverPath, toDoLists);
  postTodos(prodServerPath, toDoLists);

  return (
    <Fragment>
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

      {toDoLists[activeList] && (
        <ToDoListForm
          key={activeList}
          toDoList={toDoLists[activeList]}
          saveToDoList={(id, { todos, finished, dueDates }) => {
            const listToUpdate = toDoLists[id];
            setToDoLists({
              ...toDoLists,
              [id]: { ...listToUpdate, todos, finished, dueDates }
            });
          }}
        />
      )}
    </Fragment>
  );
};
