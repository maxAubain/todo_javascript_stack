const express = require("express");
const cors = require("cors"); 

const app = express();
const PORT = 3001;
const path = 'http://localhost:3000';

app.use(cors({ origin: path })); // Enables cross-origin HTTP requests (CORS) with white-listed client address.
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));


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
}

app.get("/init-todos", (req, res) => {
  res.send(initTodos);
});


