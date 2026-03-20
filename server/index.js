require("dotenv").config();

const api = require("./app");
// use PORT from .env or default to 3000
const port = process.env.PORT  || 3000;

//start server
api.listen(port, () => {
    console.log(`API listening on ${port}`);
})
