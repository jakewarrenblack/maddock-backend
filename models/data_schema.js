const { Schema, model } = require("mongoose");

// Defining what our data is made up of, like a database schema
const maddock = new Schema({
  test: {
    type: String,
  },
  // synopsis: {
  //   type: Object,
  //   required: [true, "Synopsis is required"],
  // },
  // balloch: {
  //   type: Object,
  //   required: [true, "Balloch is required"],
  // },
  // reviews: {
  //   type: [Object],
  //   required: [true, "Reviews are required"],
  // },
  // slides: {
  //   type: [Object],
  //   required: [true, "Slides are required"],
  // },
  // history: {
  //   type: Object,
  //   required: [true, "History is required"],
  // },
});

// Can import this model in another file, referring to it as just 'Data'
// Can use methods on this then, like a class
module.exports = model("Data", maddock);
