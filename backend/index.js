const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;
const targetPath = "http://localhost:3000";
const jsonParser = bodyParser.json();

app.use(cors({ origin: targetPath })); // Enables cross-origin HTTP requests (CORS) with white-listed client address.
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

/* Data storage variables */
const initTodos = {
  "0000000001": {
    id: "0000000001",
    title: "First List",
    todos: ["First todo of first list!"],
    finished: [false],
    dueDates: [""]
  },
  "0000000002": {
    id: "0000000002",
    title: "Second List",
    todos: ["First todo of second list!"],
    finished: [false],
    dueDates: [""]
  }
};

let currentTodos = 0;

/* HTTP request methods */
app.get("/", (req, res) => {
  currentTodos == 0 ? res.send(initTodos) : res.send(currentTodos);
});

app.post("/", jsonParser, (req, res) => {
  currentTodos = req.body;
});
