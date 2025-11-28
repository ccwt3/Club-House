const passport = require("passport");
const db = require("../database/queries");

function loginGet(req, res) {
  res.render("log-in");
}

const loginPost = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
});

module.exports = {
  loginGet,
  loginPost,
};
