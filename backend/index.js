const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const LOCAL_PORT = 3001;
// const devTargetPath = "http://localhost:3000";
// const prodTargetPath = "https://todo-list-client.netlify.com/";
const jsonParser = bodyParser.json();

app.use(cors(/* { origin: prodTargetPath } */)); // Enables cross-origin HTTP requests (CORS) with white-listed client address.
app.listen(process.env.PORT || LOCAL_PORT);

const initTodos = {
  "0000000001": {
    id: "0000000001",
    title: "First List",
    todos: [""],
    finished: [false],
    dueDates: ["mm/dd/yyyy"]
  },
  "0000000002": {
    id: "0000000002",
    title: "Second List",
    todos: [""],
    finished: [false],
    dueDates: ["mm/dd/yyyy"]
  }
};

let currentTodos = 0;

app.get("/", (req, res) => {
  currentTodos == 0 ? res.send(initTodos) : res.send(currentTodos);
});

app.post("/", jsonParser, (req, res) => {
  currentTodos = req.body;
});
