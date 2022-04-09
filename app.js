const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./db")();

const { getAll } = require("./controllers/data_controller");

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", getAll);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
