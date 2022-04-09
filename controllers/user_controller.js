const res = require("express/lib/response");
const User = require("../models/user_schema");
const bcrypt = require("bcrypt");

// Now define methods, so what happens when you run a specific line of code

const register = (req, res) => {
  // Create a new User object from the schema,
  // passing in the request body to the object
  let newUser = new User(req.body);

  // Use bcrypt to hash the user's password
  newUser.password = bcrypt.hashSync(req.body.password, 10);

  // Save the user to the database
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      // Unset password before responding, we don't want to see it in the response
      user.password = undefined;
      return res.json(user);
    }
  });
};

const login = (req, res) => {};

module.exports = {
  register,
  login,
};
