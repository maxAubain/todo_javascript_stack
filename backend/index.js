const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;
const targetPath = "http://localhost:3000";

app.use(cors({ origin: targetPath })); // Enables cross-origin HTTP requests (CORS) with white-listed client address.
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

/* "Database" */
const initTodos = {
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
};

let currentTodos = {};

/* Server methods */

app.get("/init-todos", (req, res) => {
  res.send(initTodos);
});

app.post("/todos", (req, res) => {
  res.send('Got a POST request');
  console.log(req)
  //currentTodos = req.data;
});
