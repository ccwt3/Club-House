const express = require("express");
const path = require("path");
const appRouter = require("./routes/appRouter");
const loginRouter = require("./routes/log-in");
const signupRouter = require("./routes/sign-up");

const app = express();

//config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", appRouter); // Home page
app.use("/sign-up", signupRouter); //Register page
app.use("/log-in", loginRouter); //Login page

// cathing error middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("error", { message: err.message });
});

// App listening
app.listen(3000, (err) => {
  if (err) {
    throw err;
  } else {
    console.log("runnng in 3000");
  }
});
