const axios = require("axios");

export const Get = () => {
  const path = "http://localhost:3001/"
  axios.get(path)
    .then(response => console.log(response))
};

export default Get;
