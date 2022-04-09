const mongoose = require("mongoose");
require("dotenv").config();

const init = () => {
  // set this so we can see errors
  mongoose.set("debug", true);

  mongoose
    .connect(process.env.DB_ATLAS_URL, {
      useNewUrlParser: true,
    })
    .catch((err) => {
      console.log("error" + err.stack);
      // stop the server
      process.exit(1);
    });

  mongoose.connection.on("open", () => {
    // log this when connection is open
    console.log("connected to database");
  });
};

mongoose.Promise = global.Promise;

module.exports = init;
