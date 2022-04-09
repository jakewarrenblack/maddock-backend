const res = require("express/lib/response");
const User = require("../models/user_schema");
const bcrypt = require("bcrypt");
// json web token generator
const jwt = require("jsonwebtoken");

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

const login = (req, res) => {
  // Connect to db, find the user matching the email provided in request body
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      // If user not found, or passwords don't match
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({
          message: "Authentication failed. Invalid user or password.",
        });
      }
      // If we've reached this point, the user was found and the password was correct
      // Create a token
      res.json({
        token: jwt.sign(
          {
            email: user.email,
            fullName: user.fullName,
            _id: user._id,
          },
          "maddock_backend"
        ),
      });
    })

    .catch((err) => {
      throw err;
    });
};

module.exports = {
  register,
  login,
};
