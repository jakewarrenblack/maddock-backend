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

module.exports = {
  getAll,
};
