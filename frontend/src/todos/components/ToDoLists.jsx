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

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const serverPath = "http://localhost:3001/";
const postTodos = (serverPath, toDoLists) => axios.post(serverPath, toDoLists).then(response => console.log("response", response)).catch(err => console.log(err));

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const getPersonalTodos = () => {
  return sleep(1000).then(() =>
    axios.get(serverPath).then(response => Promise.resolve(response.data))
  );
};

export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState({});
  const [activeList, setActiveList] = useState();

  useEffect(() => {
    getPersonalTodos().then(setToDoLists);
  }, []);

  if (!Object.keys(toDoLists).length) return null;

  console.log("todo lists", toDoLists)
  postTodos(serverPath, toDoLists);

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
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
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
            console.log("todos", todos)
          }}
        />
      )}
    </Fragment>
  );
};
