const express = require("express");
const cors = require("cors"); 

const app = express();
const PORT = 3001;

app.use(cors({origin: 'http://localhost:3001'})); // Enables cross-origin HTTP requests (CORS) with white-listed client address.

const  getResponse = "Hello world"
app.get("/", (req, res) => {
  res.send(getResponse);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
