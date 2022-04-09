const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// Defining what our data is made up of, like a database schema
const userSchema = new Schema(
  {
    // trim = run trim() on string, removing whitespace
    fullName: {
      type: String,
      trim: true,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.comparePassword = function (password) {
  // 'this' refers to the current user object
  return bcrypt.compareSync(password, this.password, function (result) {
    return result;
  });
};

// Can import this model in another file, referring to it as just 'Data'
// Can use methods on this then, like a class
module.exports = model("User", userSchema, "users");
