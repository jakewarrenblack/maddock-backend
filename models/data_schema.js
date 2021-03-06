const { Schema, model } = require("mongoose");

// Defining what our data is made up of, like a database schema
const collection = new Schema({
  authorInfo: {
    type: Object,
    required: [true, "Author info is required"],
  },
  mail: {
    type: Object,
    required: [true, "Newsletter info is required"],
  },
  bio: {
    type: Object,
    required: [true, "Bio is required"],
  },
  synopsis: {
    type: Object,
    required: [true, "Synopsis is required"],
  },
  balloch: {
    type: Object,
    required: [true, "Balloch is required"],
  },
  reviews: {
    type: [Object],
    required: [true, "Reviews are required"],
  },
  slides: {
    type: [Object],
    required: [true, "Slides are required"],
  },
  history: {
    type: Object,
    required: [true, "History is required"],
  },
  test: {
    type: String,
  },
  test2: {
    type: String,
  },
});

// Can import this model in another file, referring to it as just 'Data'
// Can use methods on this then, like a class
module.exports = model("Data", collection, "collection");
