const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

require("dotenv").config();
require("./db")();

const { getAll, update } = require("./controllers/data_controller");
const {
  register,
  login,
  loginRequired,
} = require("./controllers/user_controller");

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

// ----- Adding middleware ---- //

// Decode the token if it exists, otherwise set the user to undefined, and continue
app.use((req, res, next) => {
  // Split by spaces to explode auth headers into array
  // Auth header will look like 'Bearer 12345678', make sure 0 === 'Bearer'
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      "maddock_backend",
      (err, decode) => {
        // Check if all is well, or not
        if (err) req.user = undefined;
        // Decode == the decoded version of the token
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    // Next says move on to the next step in the queue
    // So move to the routing, in our case
    next();
  }
});

// ---------- Routes ------------- //
app.get("/api", getAll);

// We run the above middleware always, but on this specific route, run loginRequired
// Login is required to update the data
app.put("/api/:id", loginRequired, update);

// User routes
app.post("/register", register);
app.post("/login", login);

////////////////////////////////////

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
