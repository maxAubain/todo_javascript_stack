import React, { Component } from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { ToDoLists } from "./todos/components/ToDoLists";

/* MainAppBar contains the header content */
const MainAppBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="title" color="inherit">
          Things to do
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

/* MainWrapper is the entire application wrapper, specifying CSS flex 
parameters for the MainAppBar through mainWrapperStyle centerContentWrapper, 
and contentWrapperStyle. Passes in children components as arguments. */
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

/* App, of course, is returned to index.js.  Specifies ToDoLists component
as child of MainWrapper. */
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
