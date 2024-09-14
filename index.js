const express = require("express");
const dotenv= require('dotenv').config();
const app = express();
const port = dotenv.parsed.PORT;



const routers = require("./routers/client/index.route");
app.set("view engine", "pug");
app.set("views", "./views");

routers(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
