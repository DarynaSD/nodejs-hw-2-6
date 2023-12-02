const app = require("./app");
const mongoose = require("mongoose");
const DB_HOST = require("./helpers/db_config")

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("DB connect successfull");
    app.listen(3000);
    console.log("Server running. Use our API on port: 3000");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
