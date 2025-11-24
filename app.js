const express = require("express");
const path = require("path");
const appRouter = require("./routes/appRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", appRouter);

app.listen(3000, (err) => {
  if (err) {
    throw err;
  } else {
    console.log("runnng in 3000");
  }
});
