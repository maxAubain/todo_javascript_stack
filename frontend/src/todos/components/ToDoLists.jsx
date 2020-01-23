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

const devServerPath = "http://localhost:3001/";
// const prodServerPath = "https://todo-list-is-here.herokuapp.com/";
const postTodos = (serverPath, toDoLists) => axios.post(serverPath, toDoLists);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const getPersonalTodos = () => {
  return sleep(1000).then(() =>
    axios.get(devServerPath).then(response => Promise.resolve(response.data))
  );
};

export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState({});
  const [activeList, setActiveList] = useState();

  useEffect(() => {
    getPersonalTodos().then(setToDoLists);
  }, []);

  if (!Object.keys(toDoLists).length) return null;

  postTodos(devServerPath, toDoLists);

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
