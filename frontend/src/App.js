import React, { Component } from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { ToDoLists } from "./todos/components/ToDoLists";
import { Hidden } from "@material-ui/core";

const toolbarStyle = {
  display: "flex",
  width: "100vw"
};
const leftToolbarStyle = {
  display: "flex",
  justifyContent: "flex-start",
  width: "40%"
};

const MainAppBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <div style={toolbarStyle}>
          <div style={leftToolbarStyle}>
            <Typography variant="title" color="inherit">
              Things to do
            </Typography>
          </div>
          <div className="right-toolbar-style desktop-view">
            <Typography variant="title" color="inherit">
              <a href="https://www.maxaubain.com/about">Visit Max</a>
            </Typography>
            <Typography variant="title" color="inherit">
              <a href="https://todo-list-js-server.herokuapp.com/">
                View Backend
              </a>
            </Typography>
            <Typography variant="title" color="inherit">
              <a href="https://github.com/sellpy/fullstack-sandbox">
                Forked from Sellpy
              </a>
            </Typography>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const mainWrapperStyle = { display: "flex", flexDirection: "column" };
const centerContentWrapper = { display: "flex", justifyContent: "center" };
const contentWrapperStyle = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "80rem",
  flexGrow: 1
};

const MainWrapper = ({ children }) => {
  return (
    <div style={mainWrapperStyle}>
      <MainAppBar />
      <div style={centerContentWrapper}>
        <div style={contentWrapperStyle}>{children}</div>
      </div>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <MainWrapper>
        <ToDoLists style={{ margin: "1rem" }} />
      </MainWrapper>
    );
  }
}

export default App;
