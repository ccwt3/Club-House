const passport = require("passport");
const db = require("../database/queries");

function loginGet(req, res) {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("log-in", { err: [req.flash("error") || null] });
}

const loginPost = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
  failureFlash: true,
});

module.exports = {
  loginGet,
  loginPost,
};
