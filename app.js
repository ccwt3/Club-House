const express = require("express");
const path = require("path");
const appRouter = require("./routes/appRouter");
const loginRouter = require("./routes/log-in");
const signupRouter = require("./routes/sign-up");

const app = express();

//config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
/* CSS CONFIG
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
*/
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", appRouter);
app.use("/log-in", loginRouter)
app.use("/sign-up", signupRouter);

// working app
app.listen(3000, (err) => {
  if (err) {
    throw err;
  } else {
    console.log("runnng in 3000");
  }
});
