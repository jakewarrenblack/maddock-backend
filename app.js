const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./db")();

const { getAll, update } = require("./controllers/data_controller");
const { register, login } = require("./controllers/user_controller");

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

// ---------- Routes ------------- //
app.get("/api", getAll);
app.put("/api/:id", update);

// User routes
app.post("/register", register);
app.post("/login", login);

////////////////////////////////////

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
