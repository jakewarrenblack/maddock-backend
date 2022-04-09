const res = require("express/lib/response");
const Data = require("../models/data_schema");

// Now define methods, so what happens when you run a specific line of code

const getAll = (req, res) => {
  // 'find' is a mongoose method, find all documents from mongo
  Data.find()
    .then((data) => {
      // data = actual data from mongo
      if (data) {
        // if data exists:
        console.log("something found!!");
        res.status(200).json(data);
      } else {
        res.status(404).json("No data found");
      }
    })
    .catch((err) => {
      console.error(err);
      // respond with status 500 and some json with the server error
      res.status(500, json(err));
    });
};

const update = (req, res) => {
  // The data provided by the user's request
  let data = convertToDotNotation(req.body);

  // id will always be the same, it's just one big JSON object, but also receive the data to update with (req.body)
  Data.findByIdAndUpdate(req.params.id, data, {
    useFindAndModify: false,
    new: false,
  })
    .then((data) => {
      console.log("Data updated!");
      // 201 = success, something was modified
      res.status(201).json(data);
    })
    .catch((err) => {
      // 'ValidationError' is part of mongoose, if it tries to add some data but it doesn't follow the schema rules
      if (err.name === "ValidationError") {
        console.error("Error Validating!", err);
        // if updating, you'll never get a 404 not found, so instead throw 422 unprocessable entity
        res.status(422).json(err);
      } else {
        // If we don't get a validation error, throw 500 internal server error
        console.error(err);
        res.status(500).json(err);
      }
    });
};

function convertToDotNotation(obj, newObj = {}, prefix = "") {
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      convertToDotNotation(obj[key], newObj, prefix + key + ".");
    } else {
      newObj[prefix + key] = obj[key];
    }
  }

  return newObj;
}
module.exports = {
  getAll,
  update,
};
