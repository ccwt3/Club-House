// Librarys
const express = require("express");
const path = require("path");
const passport = require("passport");

// modules
const appRouter = require("./routes/appRouter");
const loginRouter = require("./routes/log-in");
const signupRouter = require("./routes/sign-up");
const passportAuth = require("./middleware/authentication/auth");
const serializeFunctions = require("./middleware/authentication/serial");
const session = require("./middleware/authentication/sessionConfig");

const app = express();

//config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// passport and session middleware
app.use(session);
app.use(passport.authenticate("session"));
app.use(express.urlencoded({ extended: true }));

passport.use(passportAuth);
passport.serializeUser(serializeFunctions.serializeUser);
passport.deserializeUser(serializeFunctions.deserializeUser);

// Routes middleware
app.use("/", appRouter); 
app.use("/sign-up", signupRouter); 
app.use("/log-in", loginRouter); 

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
